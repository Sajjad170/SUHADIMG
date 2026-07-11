import sharp from "sharp";
import type { ToolConfig, ToolOperation } from "./tools";
import {
  createMemeSvg,
  createWatermarkSvg,
} from "./imageEffects";

export interface ProcessOptions {
  quality?: number;
  width?: number;
  height?: number;
  scaleFactor?: number;
  scalePercent?: number;
  rotate?: number;
  flip?: "horizontal" | "vertical";
  blur?: number;
  sharpen?: number;
  brightness?: number;
  contrast?: number;
  saturation?: number;
  cropLeft?: number;
  cropTop?: number;
  cropWidth?: number;
  cropHeight?: number;
  faviconSizes?: number[];
  resizeFit?: "inside" | "cover" | "fill";
  watermarkText?: string;
  watermarkOpacity?: number;
  watermarkPosition?: "bottom-right" | "bottom-left" | "center" | "top-right";
  memeTopText?: string;
  memeBottomText?: string;
}

export interface ProcessResult {
  buffer: Buffer;
  filename: string;
  mimeType: string;
  originalSize: number;
  newSize: number;
}

function getMimeType(format: string): string {
  const map: Record<string, string> = {
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    png: "image/png",
    webp: "image/webp",
    gif: "image/gif",
    tiff: "image/tiff",
    avif: "image/avif",
    bmp: "image/bmp",
  };
  return map[format] ?? "application/octet-stream";
}

function getExtension(format: string): string {
  if (format === "jpeg") return "jpg";
  return format;
}

function baseName(filename: string): string {
  const lastDot = filename.lastIndexOf(".");
  return lastDot > 0 ? filename.slice(0, lastDot) : filename;
}

function createPipeline(input: Buffer, filename?: string): sharp.Sharp {
  const isSvg =
    filename?.toLowerCase().endsWith(".svg") ||
    input.slice(0, 512).toString("utf8", 0, 512).includes("<svg");
  return sharp(input, {
    animated: false,
    failOn: "none",
    density: isSvg ? 300 : 72,
  }).rotate();
}

function applyTransforms(
  pipeline: sharp.Sharp,
  operation: ToolOperation,
  options: ProcessOptions,
  meta?: sharp.Metadata
): sharp.Sharp {
  let img = pipeline;

  if (operation === "crop" && options.cropWidth && options.cropHeight) {
    const maxW = meta?.width ?? options.cropWidth;
    const maxH = meta?.height ?? options.cropHeight;
    const left = Math.min(Math.max(0, options.cropLeft ?? 0), maxW - 1);
    const top = Math.min(Math.max(0, options.cropTop ?? 0), maxH - 1);
    const width = Math.min(options.cropWidth, maxW - left);
    const height = Math.min(options.cropHeight, maxH - top);
    if (width >= 1 && height >= 1) {
      img = img.extract({ left, top, width, height });
    }
  }

  if (operation === "rotate" && options.rotate) {
    img = img.rotate(options.rotate);
  }

  if (operation === "flip") {
    if (options.flip === "horizontal") img = img.flop();
    if (options.flip === "vertical") img = img.flip();
  }

  if (operation === "blur" && options.blur) {
    img = img.blur(Math.min(Math.max(options.blur, 0.3), 100));
  }

  if (operation === "sharpen" && options.sharpen) {
    img = img.sharpen({ sigma: options.sharpen });
  }

  if (operation === "grayscale") {
    img = img.grayscale();
  }

  if (
    operation === "brightness" ||
    operation === "contrast" ||
    operation === "photoEdit"
  ) {
    img = img.modulate({
      brightness: options.brightness ?? 1,
      saturation: options.saturation ?? 1,
    });
    if (options.contrast && options.contrast !== 1) {
      const c = options.contrast;
      img = img.linear(c, -(128 * c) + 128);
    }
    if (operation === "photoEdit" && options.sharpen && options.sharpen > 0) {
      img = img.sharpen({ sigma: options.sharpen });
    }
  }

  if (operation === "upscale") {
    const scale = options.scaleFactor ?? 2;
    const w = meta?.width ?? 0;
    const h = meta?.height ?? 0;
    if (w && h) {
      img = img.resize(Math.round(w * scale), Math.round(h * scale), {
        kernel: sharp.kernel.lanczos3,
        withoutEnlargement: false,
      });
      img = img.sharpen({ sigma: 0.8 });
    }
  }

  if (operation === "resize" && (options.width || options.height || options.scalePercent)) {
    const fit = options.resizeFit ?? "inside";
    let w = options.width;
    let h = options.height;
    if (options.scalePercent && meta?.width && meta?.height) {
      const factor = options.scalePercent / 100;
      w = Math.round(meta.width * factor);
      h = Math.round(meta.height * factor);
    }
    img = img.resize(w, h, {
      fit,
      position: "centre",
      withoutEnlargement: fit === "inside" && !options.scalePercent,
    });
  }

  return img;
}

async function toFormat(
  pipeline: sharp.Sharp,
  format: string,
  quality: number,
  compress = false
): Promise<Buffer> {
  const fmt = format.toLowerCase();

  switch (fmt) {
    case "jpeg":
    case "jpg":
      return pipeline
        .flatten({ background: { r: 255, g: 255, b: 255 } })
        .jpeg({
          quality,
          mozjpeg: true,
          trellisQuantisation: true,
          overshootDeringing: true,
          optimiseScans: true,
        })
        .toBuffer();
    case "png":
      if (compress && quality < 100) {
        return pipeline
          .png({
            compressionLevel: 9,
            effort: 10,
            adaptiveFiltering: true,
            palette: true,
            quality: Math.max(quality, 10),
            colors: quality < 50 ? 128 : 256,
          })
          .toBuffer();
      }
      return pipeline
        .png({ compressionLevel: 9, effort: 10, adaptiveFiltering: true })
        .toBuffer();
    case "webp":
      return pipeline
        .webp({ quality, effort: 6, smartSubsample: true })
        .toBuffer();
    case "gif":
      return pipeline.gif({ effort: 10 }).toBuffer();
    case "tiff":
      return pipeline.tiff({ quality, compression: "jpeg" }).toBuffer();
    case "avif":
      return pipeline.avif({ quality, effort: 6 }).toBuffer();
    case "bmp":
      return pipeline.png().toBuffer();
    default:
      return pipeline.png({ compressionLevel: 9, effort: 10 }).toBuffer();
  }
}

function getOutputFormat(
  tool: ToolConfig,
  metadata: sharp.Metadata
): string {
  if (tool.operation === "convert" && tool.outputFormat) {
    return tool.outputFormat;
  }
  if (tool.outputFormat) return tool.outputFormat;
  return metadata.format ?? "jpeg";
}

async function applyMemeOverlay(
  input: Buffer,
  filename: string,
  options: ProcessOptions
): Promise<Buffer> {
  const meta = await createPipeline(input, filename).metadata();
  const w = meta.width ?? 800;
  const h = meta.height ?? 600;
  const overlay = createMemeSvg(
    w,
    h,
    options.memeTopText ?? "",
    options.memeBottomText ?? ""
  );
  return createPipeline(input, filename)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .png()
    .toBuffer();
}

async function applyWatermark(
  input: Buffer,
  filename: string,
  options: ProcessOptions
): Promise<Buffer> {
  const text = options.watermarkText?.trim();
  if (!text) throw new Error("Please enter watermark text.");

  const meta = await createPipeline(input, filename).metadata();
  const w = meta.width ?? 800;
  const h = meta.height ?? 600;
  const overlay = createWatermarkSvg(
    w,
    h,
    text,
    options.watermarkPosition ?? "bottom-right",
    options.watermarkOpacity ?? 0.5
  );
  return createPipeline(input, filename)
    .composite([{ input: overlay, top: 0, left: 0 }])
    .png()
    .toBuffer();
}

export async function processImage(
  input: Buffer,
  filename: string,
  tool: ToolConfig,
  userOptions: ProcessOptions = {}
): Promise<ProcessResult[]> {
  const merged: ProcessOptions = {
    ...tool.options,
    ...userOptions,
    resizeFit:
      userOptions.resizeFit ??
      (tool.options?.width && tool.options?.height ? "cover" : "inside"),
  };
  const quality = merged.quality ?? 90;
  const originalSize = input.length;

  if (tool.operation === "favicon") {
    const sizes = merged.faviconSizes ?? [16, 32, 180];
    const results: ProcessResult[] = [];
    for (const size of sizes) {
      const buffer = await createPipeline(input, filename)
        .resize(size, size, { fit: "cover", position: "centre" })
        .png({ compressionLevel: 9 })
        .toBuffer();
      results.push({
        buffer,
        filename: `favicon-${size}x${size}.png`,
        mimeType: "image/png",
        originalSize,
        newSize: buffer.length,
      });
    }
    return results;
  }

  if (tool.operation === "removeBackground") {
    throw new Error(
      "Use the Remove Background button on the tool page to process your image."
    );
  }

  if (tool.operation === "meme") {
    if (!merged.memeTopText?.trim() && !merged.memeBottomText?.trim()) {
      throw new Error("Please enter top or bottom meme text.");
    }
    const buffer = await applyMemeOverlay(input, filename, merged);
    return [
      {
        buffer,
        filename: `${baseName(filename)}-meme.png`,
        mimeType: "image/png",
        originalSize,
        newSize: buffer.length,
      },
    ];
  }

  if (tool.operation === "watermark") {
    const buffer = await applyWatermark(input, filename, merged);
    return [
      {
        buffer,
        filename: `${baseName(filename)}-watermarked.png`,
        mimeType: "image/png",
        originalSize,
        newSize: buffer.length,
      },
    ];
  }

  const baseMeta = await createPipeline(input, filename).metadata();

  if (tool.operation === "convert" && tool.outputFormat) {
    const pipeline = applyTransforms(
      createPipeline(input, filename),
      tool.operation,
      merged,
      baseMeta
    );
    const buffer = await toFormat(pipeline, tool.outputFormat, quality);
    const ext = getExtension(tool.outputFormat);
    return [
      {
        buffer,
        filename: `${baseName(filename)}.${ext}`,
        mimeType: getMimeType(tool.outputFormat),
        originalSize,
        newSize: buffer.length,
      },
    ];
  }

  if (tool.operation === "compress") {
    const format = baseMeta.format ?? "jpeg";
    const pipeline = applyTransforms(
      createPipeline(input, filename),
      tool.operation,
      merged,
      baseMeta
    );
    const q = merged.quality ?? 80;
    const buffer = await toFormat(pipeline, format, q, true);
    const ext = getExtension(format);
    return [
      {
        buffer,
        filename: `${baseName(filename)}-compressed.${ext}`,
        mimeType: getMimeType(format),
        originalSize,
        newSize: buffer.length,
      },
    ];
  }

  if (tool.operation === "crop" && (!merged.cropWidth || !merged.cropHeight)) {
    throw new Error("Please select a crop area before processing.");
  }

  if (
    tool.operation === "resize" &&
    !tool.options?.width &&
    !merged.width &&
    !merged.height &&
    !merged.scalePercent
  ) {
    throw new Error("Please enter a width, height, or resize percentage.");
  }

  const pipeline = applyTransforms(
    createPipeline(input, filename),
    tool.operation,
    merged,
    baseMeta
  );

  const format = getOutputFormat(tool, baseMeta);
  const buffer = await toFormat(pipeline, format, quality, false);
  const ext = getExtension(format);

  const suffixMap: Partial<Record<ToolOperation, string>> = {
    resize: "-resized",
    crop: "-cropped",
    rotate: "-rotated",
    flip: "-flipped",
    blur: "-blurred",
    sharpen: "-sharpened",
    grayscale: "-bw",
    brightness: "-brightened",
    contrast: "-contrast",
    upscale: "-upscaled",
    photoEdit: "-edited",
  };

  const suffix = suffixMap[tool.operation] ?? "-processed";

  return [
    {
      buffer,
      filename: `${baseName(filename)}${suffix}.${ext}`,
      mimeType: getMimeType(format),
      originalSize,
      newSize: buffer.length,
    },
  ];
}

export async function getImageMetadata(input: Buffer) {
  const meta = await createPipeline(input).metadata();
  return {
    width: meta.width ?? 0,
    height: meta.height ?? 0,
    format: meta.format ?? "unknown",
  };
}
