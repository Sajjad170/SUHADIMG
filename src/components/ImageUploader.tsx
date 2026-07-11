"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import JSZip from "jszip";
import {
  Upload,
  X,
  Download,
  Loader2,
  Image as ImageIcon,
  Archive,
} from "lucide-react";
import type { ToolConfig } from "@/lib/tools";
import { MAX_BATCH_FILES, MAX_FILE_SIZE } from "@/lib/tools/constants";
import { CropEditor, type CropArea } from "./CropEditor";
import { formatBytes, savingsPercent } from "@/lib/format";
import { BackgroundRemoverStatus } from "./BackgroundRemoverStatus";

interface UploadedFile {
  file: File;
  preview: string;
}

interface ProcessedFile {
  filename: string;
  blob: Blob;
  preview: string;
  originalSize: number;
  newSize: number;
}

interface ImageUploaderProps {
  tool: ToolConfig;
}

export function ImageUploader({ tool }: ImageUploaderProps) {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  const [processed, setProcessed] = useState<ProcessedFile[]>([]);
  const [processing, setProcessing] = useState(false);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [dragOver, setDragOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const [quality, setQuality] = useState(tool.options?.quality ?? 85);
  const [width, setWidth] = useState(tool.options?.width?.toString() ?? "");
  const [height, setHeight] = useState(tool.options?.height?.toString() ?? "");
  const [rotate, setRotate] = useState(tool.options?.rotate?.toString() ?? "90");
  const [flip, setFlip] = useState<"horizontal" | "vertical">(
    tool.options?.flip ?? "horizontal"
  );
  const [blur, setBlur] = useState(tool.options?.blur ?? 5);
  const [brightness, setBrightness] = useState(
    tool.operation === "photoEdit" ? (tool.options?.brightness ?? 1) : (tool.options?.brightness ?? 1.1)
  );
  const [contrast, setContrast] = useState(
    tool.operation === "photoEdit" ? (tool.options?.contrast ?? 1) : (tool.options?.contrast ?? 1.2)
  );
  const [sharpen, setSharpen] = useState(
    tool.operation === "photoEdit" ? (tool.options?.sharpen ?? 1) : (tool.options?.sharpen ?? 2)
  );
  const [saturation, setSaturation] = useState(1);
  const [cropArea, setCropArea] = useState<CropArea | null>(null);
  const [scaleFactor, setScaleFactor] = useState(2);
  const [resizeMode, setResizeMode] = useState<"pixels" | "percent">("pixels");
  const [scalePercent, setScalePercent] = useState("50");
  const [watermarkText, setWatermarkText] = useState("");
  const [watermarkPosition, setWatermarkPosition] = useState<
    "bottom-right" | "bottom-left" | "center" | "top-right"
  >("bottom-right");
  const [watermarkOpacity, setWatermarkOpacity] = useState(0.5);
  const [memeTopText, setMemeTopText] = useState("");
  const [memeBottomText, setMemeBottomText] = useState("");
  const [pageUrl, setPageUrl] = useState("");
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const acceptMap: Record<string, string> = {
    jpeg: ".jpg,.jpeg",
    jpg: ".jpg,.jpeg",
    png: ".png",
    webp: ".webp",
    gif: ".gif",
    bmp: ".bmp",
    tiff: ".tiff,.tif",
    tif: ".tiff,.tif",
    svg: ".svg",
    heic: ".heic,.heif",
    heif: ".heic,.heif",
    avif: ".avif",
  };

  const accept = tool.inputFormats
    .map((f) => acceptMap[f] ?? `.${f}`)
    .join(",");

  useEffect(() => {
    if (tool.operation === "removeBackground") {
      void import("@/lib/clientBackgroundRemoval").then((m) =>
        m.warmBackgroundRemovalModel()
      );
    }
  }, [tool.operation]);

  const addFiles = useCallback(
    (newFiles: FileList | File[]) => {
      setError(null);
      setProcessed([]);
      if (tool.operation === "removeBackground") {
        void import("@/lib/clientBackgroundRemoval").then((m) =>
          m.warmBackgroundRemovalModel()
        );
      }
      const arr = Array.from(newFiles);
      const valid: UploadedFile[] = [];

      for (const file of arr) {
        if (file.size > MAX_FILE_SIZE) {
          setError(`"${file.name}" exceeds 10MB limit`);
          continue;
        }
        if (tool.operation === "crop" && valid.length >= 1) {
          setError("Crop works with one image at a time.");
          break;
        }
        valid.push({ file, preview: URL.createObjectURL(file) });
      }

      setCropArea(null);

      setFiles((prev) => {
        const combined = [...prev, ...valid].slice(0, MAX_BATCH_FILES);
        return combined;
      });
    },
    [tool.operation]
  );

  const removeFile = (index: number) => {
    setFiles((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
    setCropArea(null);
    setProcessed([]);
  };

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      if (e.dataTransfer.files.length) addFiles(e.dataTransfer.files);
    },
    [addFiles]
  );

  const processFiles = async () => {
    if (tool.slug === "html-to-image") {
      if (!pageUrl.trim()) {
        setError("Please enter a webpage or image URL.");
        return;
      }
    } else if (!files.length) {
      return;
    }

    if (tool.operation === "crop" && !cropArea) {
      setError("Please select a crop area on the image.");
      return;
    }

    if (
      tool.operation === "resize" &&
      !tool.options?.width &&
      resizeMode === "pixels" &&
      !width &&
      !height
    ) {
      setError("Please enter a width or height to resize.");
      return;
    }

    if (
      tool.operation === "resize" &&
      resizeMode === "percent" &&
      (!scalePercent || Number(scalePercent) <= 0)
    ) {
      setError("Please enter a valid resize percentage.");
      return;
    }

    if (tool.operation === "watermark" && !watermarkText.trim()) {
      setError("Please enter watermark text.");
      return;
    }

    if (
      tool.operation === "meme" &&
      !memeTopText.trim() &&
      !memeBottomText.trim()
    ) {
      setError("Please enter top or bottom meme text.");
      return;
    }

    setProcessing(true);
    setError(null);
    setStatusMessage(null);
    setProgress(10);

    try {
      if (tool.operation === "removeBackground") {
        const { removeBackgroundWithAI, noBgFilename } = await import(
          "@/lib/clientBackgroundRemoval"
        );
        const results: ProcessedFile[] = [];

        for (let i = 0; i < files.length; i++) {
          const { file } = files[i];
          setStatusMessage(
            files.length > 1
              ? `Removing background (${i + 1} of ${files.length})...`
              : "Removing background..."
          );

          const blob = await removeBackgroundWithAI(file, (p) => {
            setStatusMessage(p.message);
            const slice = 80 / files.length;
            setProgress(10 + i * slice + (p.percent / 100) * slice);
          });

          results.push({
            filename: noBgFilename(file.name),
            blob,
            preview: URL.createObjectURL(blob),
            originalSize: file.size,
            newSize: blob.size,
          });
        }

        setProcessed(results);
        setProgress(100);
        setStatusMessage(null);
        return;
      }

      const formData = new FormData();
      formData.append("slug", tool.slug);

      if (tool.slug === "html-to-image") {
        formData.append("pageUrl", pageUrl.trim());
      } else {
        files.forEach(({ file }) => formData.append("files", file));
      }

      if (tool.operation === "compress") formData.append("quality", String(quality));
      if (tool.operation === "resize") {
        if (resizeMode === "percent") {
          formData.append("scalePercent", scalePercent);
        } else {
          if (width) formData.append("width", width);
          if (height) formData.append("height", height);
        }
      }
      if (tool.operation === "upscale") {
        formData.append("scaleFactor", String(scaleFactor));
      }
      if (tool.operation === "rotate") formData.append("rotate", rotate);
      if (tool.operation === "flip") formData.append("flip", flip);
      if (tool.operation === "blur") formData.append("blur", String(blur));
      if (tool.operation === "sharpen") formData.append("sharpen", String(sharpen));
      if (tool.operation === "brightness") {
        formData.append("brightness", String(brightness));
      }
      if (tool.operation === "contrast") {
        formData.append("contrast", String(contrast));
        formData.append("brightness", "1");
      }
      if (tool.operation === "photoEdit") {
        formData.append("brightness", String(brightness));
        formData.append("contrast", String(contrast));
        formData.append("saturation", String(saturation));
        formData.append("sharpen", String(sharpen));
      }
      if (tool.operation === "watermark") {
        formData.append("watermarkText", watermarkText.trim());
        formData.append("watermarkPosition", watermarkPosition);
        formData.append("watermarkOpacity", String(watermarkOpacity));
      }
      if (tool.operation === "meme") {
        formData.append("memeTopText", memeTopText);
        formData.append("memeBottomText", memeBottomText);
      }
      if (tool.operation === "crop" && cropArea) {
        formData.append("cropLeft", String(cropArea.cropLeft));
        formData.append("cropTop", String(cropArea.cropTop));
        formData.append("cropWidth", String(cropArea.cropWidth));
        formData.append("cropHeight", String(cropArea.cropHeight));
      }

      setProgress(40);

      const res = await fetch("/api/process", { method: "POST", body: formData });
      const data = await res.json();

      setProgress(80);

      if (!res.ok) {
        throw new Error(data.error ?? "Processing failed");
      }

      const results: ProcessedFile[] = data.results.map(
        (r: {
          filename: string;
          data: string;
          mimeType: string;
          originalSize: number;
          newSize: number;
        }) => {
          const bytes = Uint8Array.from(atob(r.data), (c) => c.charCodeAt(0));
          const blob = new Blob([bytes], { type: r.mimeType });
          return {
            filename: r.filename,
            blob,
            preview: URL.createObjectURL(blob),
            originalSize: r.originalSize,
            newSize: r.newSize,
          };
        }
      );

      setProcessed(results);
      setProgress(100);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setProcessing(false);
      setTimeout(() => setProgress(0), 1000);
    }
  };

  const downloadFile = (item: ProcessedFile) => {
    const url = URL.createObjectURL(item.blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = item.filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadAll = async () => {
    if (processed.length === 1) {
      downloadFile(processed[0]);
      return;
    }
    const zip = new JSZip();
    processed.forEach((item) => zip.file(item.filename, item.blob));
    const content = await zip.generateAsync({ type: "blob" });
    const url = URL.createObjectURL(content);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${tool.slug}-converted.zip`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const showQuality = tool.operation === "compress";
  const showResize =
    tool.operation === "resize" && !tool.options?.width;
  const showPresetSize =
    tool.operation === "resize" && tool.options?.width;
  const showUpscale = tool.operation === "upscale";
  const showPhotoEdit = tool.operation === "photoEdit";
  const showWatermark = tool.operation === "watermark";
  const showMeme = tool.operation === "meme";
  const showHtmlToImage = tool.slug === "html-to-image";
  const showRotate = tool.operation === "rotate";
  const showFlip = tool.operation === "flip";
  const showBlur = tool.operation === "blur";
  const showSharpen = tool.operation === "sharpen";
  const showBrightness = tool.operation === "brightness";
  const showContrast = tool.operation === "contrast";
  const showCrop = tool.operation === "crop";
  const showBgRemover = tool.operation === "removeBackground";

  const processLabel =
    tool.operation === "convert"
      ? "Convert"
      : tool.operation === "compress"
        ? "Compress"
        : tool.operation === "resize"
          ? "Resize"
          : tool.operation === "crop"
            ? "Crop"
            : tool.operation === "upscale"
              ? "Upscale"
              : tool.operation === "removeBackground"
                ? "Remove Background"
                : tool.operation === "watermark"
                  ? "Add Watermark"
                  : tool.operation === "meme"
                    ? "Create Meme"
                    : tool.operation === "photoEdit"
                      ? "Apply Edits"
                      : tool.slug === "html-to-image"
                        ? "Convert URL"
                        : "Process";

  const canProcess =
    tool.slug === "html-to-image" ? pageUrl.trim().length > 0 : files.length > 0;

  const totalOriginal = processed.reduce((s, f) => s + f.originalSize, 0);
  const totalNew = processed.reduce((s, f) => s + f.newSize, 0);

  return (
    <div className="space-y-6">
      {showBgRemover && <BackgroundRemoverStatus />}
      {showHtmlToImage ? (
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-700 dark:bg-zinc-900">
          <label className="block">
            <span className="mb-2 block text-sm font-medium text-zinc-900 dark:text-white">
              Webpage or image URL
            </span>
            <input
              type="url"
              value={pageUrl}
              onChange={(e) => setPageUrl(e.target.value)}
              placeholder="https://example.com/page-or-image.jpg"
              className="w-full rounded-lg border border-zinc-300 px-4 py-3 text-sm dark:border-zinc-600 dark:bg-zinc-800"
            />
          </label>
          <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
            Paste a direct image URL or webpage link. We fetch the page image (og:image) and convert it to PNG.
          </p>
        </div>
      ) : (
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`cursor-pointer rounded-2xl border-2 border-dashed p-10 text-center transition-colors ${
          dragOver
            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30"
            : "border-zinc-300 hover:border-blue-400 dark:border-zinc-700 dark:hover:border-blue-600"
        }`}
      >
        <input
          ref={inputRef}
          type="file"
          accept={accept}
          multiple={!showCrop}
          className="hidden"
          onChange={(e) => e.target.files && addFiles(e.target.files)}
        />
        <Upload className="mx-auto mb-4 h-10 w-10 text-zinc-400" />
        <p className="mb-1 text-lg font-medium text-zinc-900 dark:text-white">
          Drag & drop {showCrop ? "an image" : "images"} here
        </p>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          or click to browse · {showCrop ? "1 file" : `Up to ${MAX_BATCH_FILES} files`} · Max 10MB each
        </p>
      </div>
      )}

      {files.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {files.map((item, i) => (
            <div
              key={i}
              className="relative overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-700"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.preview}
                alt={`Preview of uploaded image: ${item.file.name}`}
                className="h-32 w-full object-cover"
              />
              <div className="flex items-center justify-between bg-zinc-50 px-3 py-2 dark:bg-zinc-800">
                <span className="truncate text-xs text-zinc-600 dark:text-zinc-400">
                  {item.file.name}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFile(i);
                  }}
                  className="rounded p-1 text-zinc-400 hover:text-red-500"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {showCrop && files.length === 1 && (
        <CropEditor
          imageUrl={files[0].preview}
          onCropChange={setCropArea}
        />
      )}

      {(showQuality ||
        showResize ||
        showUpscale ||
        showPhotoEdit ||
        showWatermark ||
        showMeme ||
        showRotate ||
        showFlip ||
        showBlur ||
        showSharpen ||
        showBrightness ||
        showContrast) && (
        <div className="rounded-xl border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-900">
          <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-white">
            Settings
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {showQuality && (
              <label className="block">
                <span className="mb-1 block text-xs text-zinc-600 dark:text-zinc-400">
                  Quality: {quality}%
                </span>
                <input
                  type="range"
                  min={10}
                  max={100}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full"
                />
              </label>
            )}
            {showResize && (
              <>
                <label className="block sm:col-span-2">
                  <span className="mb-1 block text-xs text-zinc-600 dark:text-zinc-400">
                    Resize mode
                  </span>
                  <select
                    value={resizeMode}
                    onChange={(e) =>
                      setResizeMode(e.target.value as "pixels" | "percent")
                    }
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
                  >
                    <option value="pixels">By pixels</option>
                    <option value="percent">By percentage</option>
                  </select>
                </label>
                {resizeMode === "percent" ? (
                  <label className="block sm:col-span-2">
                    <span className="mb-1 block text-xs text-zinc-600 dark:text-zinc-400">
                      Scale: {scalePercent}%
                    </span>
                    <input
                      type="range"
                      min={10}
                      max={200}
                      value={scalePercent}
                      onChange={(e) => setScalePercent(e.target.value)}
                      className="w-full"
                    />
                  </label>
                ) : (
                  <>
                    <label className="block">
                      <span className="mb-1 block text-xs text-zinc-600 dark:text-zinc-400">
                        Width (px)
                      </span>
                      <input
                        type="number"
                        value={width}
                        onChange={(e) => setWidth(e.target.value)}
                        placeholder="Auto"
                        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
                      />
                    </label>
                    <label className="block">
                      <span className="mb-1 block text-xs text-zinc-600 dark:text-zinc-400">
                        Height (px)
                      </span>
                      <input
                        type="number"
                        value={height}
                        onChange={(e) => setHeight(e.target.value)}
                        placeholder="Auto"
                        className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
                      />
                    </label>
                  </>
                )}
              </>
            )}
            {showUpscale && (
              <label className="block sm:col-span-2">
                <span className="mb-1 block text-xs text-zinc-600 dark:text-zinc-400">
                  Upscale factor
                </span>
                <select
                  value={scaleFactor}
                  onChange={(e) => setScaleFactor(Number(e.target.value))}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
                >
                  <option value={2}>2× (double size)</option>
                  <option value={3}>3× (triple size)</option>
                  <option value={4}>4× (quadruple size)</option>
                </select>
              </label>
            )}
            {showPhotoEdit && (
              <>
                <label className="block">
                  <span className="mb-1 block text-xs text-zinc-600 dark:text-zinc-400">
                    Brightness: {brightness.toFixed(1)}x
                  </span>
                  <input
                    type="range"
                    min={0.5}
                    max={2}
                    step={0.05}
                    value={brightness}
                    onChange={(e) => setBrightness(Number(e.target.value))}
                    className="w-full"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs text-zinc-600 dark:text-zinc-400">
                    Contrast: {contrast.toFixed(1)}x
                  </span>
                  <input
                    type="range"
                    min={0.5}
                    max={2}
                    step={0.05}
                    value={contrast}
                    onChange={(e) => setContrast(Number(e.target.value))}
                    className="w-full"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs text-zinc-600 dark:text-zinc-400">
                    Saturation: {saturation.toFixed(1)}x
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={2}
                    step={0.05}
                    value={saturation}
                    onChange={(e) => setSaturation(Number(e.target.value))}
                    className="w-full"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs text-zinc-600 dark:text-zinc-400">
                    Sharpen: {sharpen}
                  </span>
                  <input
                    type="range"
                    min={0}
                    max={5}
                    step={0.5}
                    value={sharpen}
                    onChange={(e) => setSharpen(Number(e.target.value))}
                    className="w-full"
                  />
                </label>
              </>
            )}
            {showWatermark && (
              <>
                <label className="block sm:col-span-2">
                  <span className="mb-1 block text-xs text-zinc-600 dark:text-zinc-400">
                    Watermark text
                  </span>
                  <input
                    type="text"
                    value={watermarkText}
                    onChange={(e) => setWatermarkText(e.target.value)}
                    placeholder="© Your Name"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
                  />
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs text-zinc-600 dark:text-zinc-400">
                    Position
                  </span>
                  <select
                    value={watermarkPosition}
                    onChange={(e) =>
                      setWatermarkPosition(
                        e.target.value as typeof watermarkPosition
                      )
                    }
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
                  >
                    <option value="bottom-right">Bottom right</option>
                    <option value="bottom-left">Bottom left</option>
                    <option value="center">Center</option>
                    <option value="top-right">Top right</option>
                  </select>
                </label>
                <label className="block">
                  <span className="mb-1 block text-xs text-zinc-600 dark:text-zinc-400">
                    Opacity: {Math.round(watermarkOpacity * 100)}%
                  </span>
                  <input
                    type="range"
                    min={0.1}
                    max={1}
                    step={0.05}
                    value={watermarkOpacity}
                    onChange={(e) => setWatermarkOpacity(Number(e.target.value))}
                    className="w-full"
                  />
                </label>
              </>
            )}
            {showMeme && (
              <>
                <label className="block sm:col-span-2">
                  <span className="mb-1 block text-xs text-zinc-600 dark:text-zinc-400">
                    Top text
                  </span>
                  <input
                    type="text"
                    value={memeTopText}
                    onChange={(e) => setMemeTopText(e.target.value)}
                    placeholder="TOP TEXT"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="mb-1 block text-xs text-zinc-600 dark:text-zinc-400">
                    Bottom text
                  </span>
                  <input
                    type="text"
                    value={memeBottomText}
                    onChange={(e) => setMemeBottomText(e.target.value)}
                    placeholder="BOTTOM TEXT"
                    className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
                  />
                </label>
              </>
            )}
            {showPresetSize && (
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Output size: {tool.options?.width}×{tool.options?.height}px
              </p>
            )}
            {showRotate && (
              <label className="block">
                <span className="mb-1 block text-xs text-zinc-600 dark:text-zinc-400">
                  Rotation
                </span>
                <select
                  value={rotate}
                  onChange={(e) => setRotate(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
                >
                  <option value="90">90° clockwise</option>
                  <option value="180">180°</option>
                  <option value="270">90° counter-clockwise</option>
                </select>
              </label>
            )}
            {showFlip && (
              <label className="block">
                <span className="mb-1 block text-xs text-zinc-600 dark:text-zinc-400">
                  Flip direction
                </span>
                <select
                  value={flip}
                  onChange={(e) =>
                    setFlip(e.target.value as "horizontal" | "vertical")
                  }
                  className="w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm dark:border-zinc-600 dark:bg-zinc-800"
                >
                  <option value="horizontal">Horizontal (mirror)</option>
                  <option value="vertical">Vertical</option>
                </select>
              </label>
            )}
            {showBlur && (
              <label className="block">
                <span className="mb-1 block text-xs text-zinc-600 dark:text-zinc-400">
                  Blur strength: {blur}
                </span>
                <input
                  type="range"
                  min={1}
                  max={20}
                  value={blur}
                  onChange={(e) => setBlur(Number(e.target.value))}
                  className="w-full"
                />
              </label>
            )}
            {showSharpen && (
              <label className="block">
                <span className="mb-1 block text-xs text-zinc-600 dark:text-zinc-400">
                  Sharpen: {sharpen}
                </span>
                <input
                  type="range"
                  min={1}
                  max={10}
                  value={sharpen}
                  onChange={(e) => setSharpen(Number(e.target.value))}
                  className="w-full"
                />
              </label>
            )}
            {showBrightness && (
              <label className="block">
                <span className="mb-1 block text-xs text-zinc-600 dark:text-zinc-400">
                  Brightness: {brightness.toFixed(1)}x
                </span>
                <input
                  type="range"
                  min={0.5}
                  max={2}
                  step={0.1}
                  value={brightness}
                  onChange={(e) => setBrightness(Number(e.target.value))}
                  className="w-full"
                />
              </label>
            )}
            {showContrast && (
              <label className="block">
                <span className="mb-1 block text-xs text-zinc-600 dark:text-zinc-400">
                  Contrast: {contrast.toFixed(1)}x
                </span>
                <input
                  type="range"
                  min={0.5}
                  max={2}
                  step={0.1}
                  value={contrast}
                  onChange={(e) => setContrast(Number(e.target.value))}
                  className="w-full"
                />
              </label>
            )}
          </div>
        </div>
      )}

      {statusMessage && processing && (
        <p className="text-center text-sm text-zinc-600 dark:text-zinc-400">
          {statusMessage}
        </p>
      )}

      {progress > 0 && (
        <div className="h-2 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300">
          {error}
        </div>
      )}

      {canProcess && !processed.length && (
        <button
          onClick={processFiles}
          disabled={processing}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        >
          {processing ? (
            <>
              <Loader2 className="h-5 w-5 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <ImageIcon className="h-5 w-5" />
              {processLabel}{" "}
              {tool.slug === "html-to-image"
                ? "to Image"
                : files.length > 1
                  ? `${files.length} Images`
                  : "Image"}
            </>
          )}
        </button>
      )}

      {processed.length > 0 && (
        <div className="space-y-4">
          {tool.operation === "compress" && (
            <div className="rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm dark:border-green-900 dark:bg-green-950">
              <span className="font-medium text-green-800 dark:text-green-200">
                {formatBytes(totalOriginal)} → {formatBytes(totalNew)}
              </span>
              <span className="ml-2 text-green-700 dark:text-green-300">
                ({savingsPercent(totalOriginal, totalNew)}% smaller)
              </span>
            </div>
          )}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={downloadAll}
              className="flex items-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 font-semibold text-white hover:bg-green-700"
            >
              {processed.length > 1 ? (
                <>
                  <Archive className="h-5 w-5" />
                  Download All (ZIP)
                </>
              ) : (
                <>
                  <Download className="h-5 w-5" />
                  Download
                </>
              )}
            </button>
            <button
              onClick={() => {
                setProcessed([]);
                setFiles([]);
              }}
              className="rounded-xl border border-zinc-300 px-5 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Start Over
            </button>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {processed.map((item, i) => (
              <div
                key={i}
                className="overflow-hidden rounded-lg border border-green-200 dark:border-green-900"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={item.preview}
                  alt={`Processed image ready to download: ${item.filename}`}
                  className="h-32 w-full object-cover"
                />
                <div className="bg-green-50 px-3 py-2 dark:bg-green-950">
                  <div className="flex items-center justify-between">
                    <span className="truncate text-xs font-medium text-green-800 dark:text-green-200">
                      {item.filename}
                    </span>
                    <button
                      onClick={() => downloadFile(item)}
                      className="rounded p-1 text-green-600 hover:text-green-800 dark:text-green-400"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-0.5 text-[10px] text-green-700 dark:text-green-300">
                    {formatBytes(item.originalSize)} → {formatBytes(item.newSize)}
                    {item.newSize < item.originalSize && (
                      <span> · {savingsPercent(item.originalSize, item.newSize)}% saved</span>
                    )}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
