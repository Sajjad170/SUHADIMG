import sharp from "sharp";

function escapeXml(text: string): string {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function createMemeSvg(
  width: number,
  height: number,
  topText: string,
  bottomText: string
): Buffer {
  const fontSize = Math.max(28, Math.min(72, Math.floor(width / 12)));
  const stroke = Math.max(2, Math.floor(fontSize / 12));
  const top = escapeXml(topText.trim().toUpperCase());
  const bottom = escapeXml(bottomText.trim().toUpperCase());

  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <style>
      .meme { fill: #fff; stroke: #000; stroke-width: ${stroke}px; paint-order: stroke;
        font-size: ${fontSize}px; font-family: Impact, Haettenschweiler, Arial Black, sans-serif;
        font-weight: 900; text-anchor: middle; }
    </style>
    ${top ? `<text x="50%" y="${fontSize + 16}" class="meme">${top}</text>` : ""}
    ${bottom ? `<text x="50%" y="${height - 24}" class="meme">${bottom}</text>` : ""}
  </svg>`;

  return Buffer.from(svg);
}

export function createWatermarkSvg(
  width: number,
  height: number,
  text: string,
  position: "bottom-right" | "bottom-left" | "center" | "top-right" = "bottom-right",
  opacity = 0.5
): Buffer {
  const fontSize = Math.max(16, Math.min(48, Math.floor(width / 20)));
  const pad = 20;
  const positions: Record<string, { x: string; y: number; anchor: string }> = {
    "bottom-right": { x: `${width - pad}`, y: height - pad, anchor: "end" },
    "bottom-left": { x: `${pad}`, y: height - pad, anchor: "start" },
    center: { x: "50%", y: height / 2, anchor: "middle" },
    "top-right": { x: `${width - pad}`, y: pad + fontSize, anchor: "end" },
  };
  const pos = positions[position];
  const svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
    <text x="${pos.x}" y="${pos.y}" text-anchor="${pos.anchor}"
      font-size="${fontSize}px" font-family="Arial, sans-serif" font-weight="600"
      fill="white" fill-opacity="${opacity}" stroke="black" stroke-opacity="${opacity * 0.6}" stroke-width="1">
      ${escapeXml(text)}
    </text>
  </svg>`;
  return Buffer.from(svg);
}

export async function fetchImageFromUrl(url: string): Promise<{ buffer: Buffer; filename: string }> {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error("Please enter a valid URL.");
  }

  if (!["http:", "https:"].includes(parsed.protocol)) {
    throw new Error("Only HTTP/HTTPS URLs are supported.");
  }

  const res = await fetch(url, {
    headers: { "User-Agent": "SUHADIMG/1.0 ImageFetcher" },
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) {
    throw new Error(`Could not fetch URL (HTTP ${res.status}).`);
  }

  const contentType = res.headers.get("content-type") ?? "";
  const buffer = Buffer.from(await res.arrayBuffer());

  if (contentType.includes("text/html")) {
    const html = buffer.toString("utf8");
    const imgMatch =
      html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i) ||
      html.match(/<img[^>]+src=["']([^"']+)["']/i);

    if (!imgMatch?.[1]) {
      throw new Error("No image found on that page. Try a direct image URL.");
    }

    const imgUrl = new URL(imgMatch[1], url).href;
    return fetchImageFromUrl(imgUrl);
  }

  if (
    !contentType.startsWith("image/") &&
    buffer.length < 100
  ) {
    throw new Error("URL did not return an image.");
  }

  const ext = contentType.includes("png")
    ? "png"
    : contentType.includes("webp")
      ? "webp"
      : contentType.includes("gif")
        ? "gif"
        : "jpg";

  return { buffer, filename: `webpage-image.${ext}` };
}
