/** SEO-safe format labels — dedupes JPG/JPEG and avoids "JPG, JPG" repetition. */
const DISPLAY: Record<string, string> = {
  jpeg: "JPEG",
  jpg: "JPG",
  png: "PNG",
  webp: "WebP",
  gif: "GIF",
  svg: "SVG",
  avif: "AVIF",
  bmp: "BMP",
  tiff: "TIFF",
  heic: "HEIC",
  ico: "ICO",
};

export function formatLabel(fmt: string): string {
  return DISPLAY[fmt.toLowerCase()] ?? fmt.toUpperCase();
}

/** Comma-separated list for prose, e.g. "JPG, JPEG, PNG and WebP". */
export function formatListForSeo(formats: string[]): string {
  const labels: string[] = [];
  const seen = new Set<string>();

  for (const fmt of formats) {
    const label = formatLabel(fmt);
    if (seen.has(label)) continue;
    seen.add(label);
    labels.push(label);
  }

  if (labels.length === 0) return "common image formats";
  if (labels.length === 1) return labels[0];
  return `${labels.slice(0, -1).join(", ")} and ${labels[labels.length - 1]}`;
}

/** All major formats for supported-format grids. */
export const STANDARD_IMAGE_FORMATS = [
  "JPG",
  "JPEG",
  "PNG",
  "WebP",
  "GIF",
  "SVG",
  "AVIF",
  "BMP",
  "TIFF",
  "HEIC",
] as const;
