export interface BackgroundRemovalProgress {
  stage: "processing" | "done";
  message: string;
  percent: number;
}

const MODEL = "isnet_quint8" as const;
const MAX_DIMENSION = 768;
const CDN_PATH =
  "https://staticimgly.com/@imgly/background-removal-data/1.7.0/dist/";

let cachedPublicPath: string | null = null;
let configPromise: Promise<Awaited<ReturnType<typeof buildConfig>>> | null =
  null;

async function resolvePublicPath(): Promise<string> {
  if (cachedPublicPath) return cachedPublicPath;
  if (typeof window === "undefined") return CDN_PATH;

  try {
    const local = `${window.location.origin}/bg-ai/resources.json`;
    const res = await fetch(local, { method: "HEAD" });
    cachedPublicPath = res.ok ? `${window.location.origin}/bg-ai/` : CDN_PATH;
  } catch {
    cachedPublicPath = CDN_PATH;
  }

  return cachedPublicPath;
}

async function buildConfig() {
  return {
    model: MODEL,
    output: { format: "image/png" as const },
    publicPath: await resolvePublicPath(),
    proxyToWorker: true,
    device: "gpu" as const,
  };
}

function getConfig() {
  if (!configPromise) configPromise = buildConfig();
  return configPromise;
}

/** Start loading AI assets silently when user picks a file. */
export function warmBackgroundRemovalModel(): void {
  if (typeof window === "undefined") return;
  void getConfig().then(async (config) => {
    const { preload } = await import("@imgly/background-removal");
    await preload(config).catch(() => undefined);
  });
}

async function prepareImageFile(file: File): Promise<File | Blob> {
  if (!file.type.startsWith("image/")) return file;

  const bitmap = await createImageBitmap(file);
  const { width, height } = bitmap;
  const longest = Math.max(width, height);

  if (longest <= MAX_DIMENSION) {
    bitmap.close();
    return file;
  }

  const scale = MAX_DIMENSION / longest;
  const targetW = Math.round(width * scale);
  const targetH = Math.round(height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = targetW;
  canvas.height = targetH;
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    bitmap.close();
    return file;
  }

  ctx.drawImage(bitmap, 0, 0, targetW, targetH);
  bitmap.close();

  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Could not prepare image."));
      },
      "image/jpeg",
      0.9
    );
  });
}

export async function removeBackgroundWithAI(
  file: File,
  onProgress?: (progress: BackgroundRemovalProgress) => void
): Promise<Blob> {
  onProgress?.({
    stage: "processing",
    message: "Removing background...",
    percent: 15,
  });

  const config = await getConfig();
  const prepared = await prepareImageFile(file);

  onProgress?.({
    stage: "processing",
    message: "Removing background...",
    percent: 35,
  });

  const { removeBackground } = await import("@imgly/background-removal");

  try {
    return await removeBackground(prepared, config);
  } catch {
    return removeBackground(prepared, { ...config, device: "cpu" });
  }
}

function stripExtension(name: string): string {
  const lastDot = name.lastIndexOf(".");
  return lastDot > 0 ? name.slice(0, lastDot) : name;
}

export function noBgFilename(originalName: string): string {
  return `${stripExtension(originalName)}-no-bg.png`;
}
