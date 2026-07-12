import { NextRequest, NextResponse } from "next/server";
import { getToolBySlug, MAX_BATCH_FILES, MAX_FILE_SIZE } from "@/lib/tools";
import { processImage, type ProcessOptions } from "@/lib/imageProcessing";
import { fetchImageFromUrl } from "@/lib/imageEffects";

export const runtime = "nodejs";
export const maxDuration = 60;
export const dynamic = "force-dynamic";

function getFileExtension(name: string): string {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (ext === "jpeg") return "jpg";
  return ext;
}

function isFormatAllowed(filename: string, allowedFormats: string[]): boolean {
  const ext = getFileExtension(filename);
  const normalized = allowedFormats.map((f) => (f === "jpeg" ? "jpg" : f));
  return normalized.includes(ext) || normalized.includes(ext === "jpg" ? "jpeg" : ext);
}

function parseOptions(formData: FormData): ProcessOptions {
  const options: ProcessOptions = {};
  const num = (key: string) => {
    const v = formData.get(key);
    return v != null && v !== "" ? Number(v) : undefined;
  };
  const str = (key: string) => {
    const v = formData.get(key);
    return v != null && v !== "" ? String(v) : undefined;
  };

  if (num("quality") != null) options.quality = num("quality");
  if (num("width") != null) options.width = num("width");
  if (num("height") != null) options.height = num("height");
  if (num("scaleFactor") != null) options.scaleFactor = num("scaleFactor");
  if (num("scalePercent") != null) options.scalePercent = num("scalePercent");
  if (num("rotate") != null) options.rotate = num("rotate");
  if (str("flip")) options.flip = str("flip") as "horizontal" | "vertical";
  if (num("blur") != null) options.blur = num("blur");
  if (num("sharpen") != null) options.sharpen = num("sharpen");
  if (num("brightness") != null) options.brightness = num("brightness");
  if (num("contrast") != null) options.contrast = num("contrast");
  if (num("saturation") != null) options.saturation = num("saturation");
  if (num("cropLeft") != null) options.cropLeft = num("cropLeft");
  if (num("cropTop") != null) options.cropTop = num("cropTop");
  if (num("cropWidth") != null) options.cropWidth = num("cropWidth");
  if (num("cropHeight") != null) options.cropHeight = num("cropHeight");
  if (str("watermarkText")) options.watermarkText = str("watermarkText");
  if (str("watermarkPosition"))
    options.watermarkPosition = str("watermarkPosition") as ProcessOptions["watermarkPosition"];
  if (num("watermarkOpacity") != null) options.watermarkOpacity = num("watermarkOpacity");
  if (str("memeTopText")) options.memeTopText = str("memeTopText");
  if (str("memeBottomText")) options.memeBottomText = str("memeBottomText");

  return options;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const slug = formData.get("slug") as string;
    const tool = getToolBySlug(slug);

    if (!tool) {
      return NextResponse.json({ error: "Tool not found" }, { status: 404 });
    }

    const options = parseOptions(formData);

    if (tool.options?.width && tool.options?.height) {
      options.width = tool.options.width;
      options.height = tool.options.height;
      options.resizeFit = "cover";
    }

    const results: {
      filename: string;
      data: string;
      mimeType: string;
      originalSize: number;
      newSize: number;
    }[] = [];

    if (tool.slug === "html-to-image") {
      const pageUrl = formData.get("pageUrl") as string | null;
      if (!pageUrl?.trim()) {
        return NextResponse.json({ error: "Please enter a webpage or image URL." }, { status: 400 });
      }

      const { buffer, filename } = await fetchImageFromUrl(pageUrl.trim());
      const processed = await processImage(buffer, filename, tool, options);

      for (const item of processed) {
        results.push({
          filename: item.filename,
          data: item.buffer.toString("base64"),
          mimeType: item.mimeType,
          originalSize: item.originalSize,
          newSize: item.newSize,
        });
      }

      return NextResponse.json({ results });
    }

    const files = formData.getAll("files") as File[];
    if (!files.length) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    if (tool.operation === "crop" && files.length > 1) {
      return NextResponse.json(
        { error: "Crop supports one image at a time for accurate selection." },
        { status: 400 }
      );
    }

    if (files.length > MAX_BATCH_FILES) {
      return NextResponse.json(
        { error: `Maximum ${MAX_BATCH_FILES} files per batch` },
        { status: 400 }
      );
    }

    for (const file of files) {
      if (file.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: `File "${file.name}" exceeds 10MB limit` },
          { status: 400 }
        );
      }

      if (!isFormatAllowed(file.name, tool.inputFormats)) {
        return NextResponse.json(
          {
            error: `"${file.name}" is not supported. Allowed: ${tool.inputFormats.join(", ").toUpperCase()}`,
          },
          { status: 400 }
        );
      }

      const buffer = Buffer.from(await file.arrayBuffer());
      const processed = await processImage(buffer, file.name, tool, options);

      for (const item of processed) {
        results.push({
          filename: item.filename,
          data: item.buffer.toString("base64"),
          mimeType: item.mimeType,
          originalSize: item.originalSize,
          newSize: item.newSize,
        });
      }
    }

    return NextResponse.json({ results });
  } catch (error) {
    console.error("Processing error:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to process image. Please try a different file.",
      },
      { status: 500 }
    );
  }
}
