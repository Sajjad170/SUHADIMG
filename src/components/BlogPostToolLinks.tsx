import Link from "next/link";

const TOOLS_BY_CATEGORY: Record<string, { href: string; label: string }[]> = {
  Guides: [
    { href: "/png-to-jpg", label: "PNG to JPG Converter" },
    { href: "/compress-image", label: "Compress Image" },
    { href: "/resize-image", label: "Resize Image" },
    { href: "/tools", label: "All 46+ Tools" },
  ],
  Formats: [
    { href: "/png-to-jpg", label: "PNG to JPG" },
    { href: "/webp-to-jpg", label: "WebP to JPG" },
    { href: "/heic-to-jpg", label: "HEIC to JPG" },
    { href: "/jpg-to-png", label: "JPG to PNG" },
  ],
  "Web Performance": [
    { href: "/compress-image", label: "Compress Image" },
    { href: "/webp-to-jpg", label: "WebP to JPG" },
    { href: "/resize-image", label: "Resize Image" },
    { href: "/tools", label: "All Tools" },
  ],
  Tips: [
    { href: "/crop-image", label: "Crop Image" },
    { href: "/compress-image", label: "Compress Image" },
    { href: "/photo-editor", label: "Photo Editor" },
    { href: "/resize-image", label: "Resize Image" },
  ],
  "Social Media": [
    { href: "/resize-image", label: "Resize Image" },
    { href: "/compress-image", label: "Compress Image" },
    { href: "/crop-image", label: "Crop Image" },
    { href: "/png-to-jpg", label: "PNG to JPG" },
  ],
};

const DEFAULT_TOOLS = TOOLS_BY_CATEGORY.Guides;

interface BlogPostToolLinksProps {
  category: string;
}

export function BlogPostToolLinks({ category }: BlogPostToolLinksProps) {
  const tools = TOOLS_BY_CATEGORY[category] ?? DEFAULT_TOOLS;

  return (
    <section
      aria-labelledby="blog-tool-links-heading"
      className="mt-10 rounded-xl border border-blue-100 bg-blue-50/50 p-6 dark:border-blue-900/50 dark:bg-blue-950/20"
    >
      <h2
        id="blog-tool-links-heading"
        className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white"
      >
        Try SUHADIMG Free Tools
      </h2>
      <p className="mb-4 text-sm text-zinc-600 dark:text-zinc-400">
        Put this guide into practice — use our free online image tools. No signup,
        no watermark, files deleted after download.
      </p>
      <ul className="grid gap-2 sm:grid-cols-2">
        {tools.map((tool) => (
          <li key={tool.href}>
            <Link
              href={tool.href}
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              {tool.label} →
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
