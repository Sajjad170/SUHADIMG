import type { LucideIcon } from "lucide-react";
import { FileText, Sparkles, Code2 } from "lucide-react";

export interface ComingSoonTool {
  slug: string;
  title: string;
  shortTitle: string;
  cardTitle: string;
  cardDescription: string;
  metaDescription: string;
  icon: LucideIcon;
  accent: string;
  illustration: "pdf" | "ai" | "api";
}

export const comingSoonTools: ComingSoonTool[] = [
  {
    slug: "pdf-to-jpg",
    title: "PDF to JPG Converter",
    shortTitle: "PDF → JPG",
    cardTitle: "Convert PDF pages to JPG",
    cardDescription:
      "Turn multi-page PDFs into high-quality JPG images for web, email, and social — batch-ready, no watermark.",
    metaDescription:
      "PDF to JPG converter coming soon on SUHADIMG. Convert PDF pages to JPEG online — free, fast, and privacy-first at suhadimg.site.",
    icon: FileText,
    accent: "from-sky-100 to-blue-200 dark:from-blue-950 dark:to-blue-900",
    illustration: "pdf",
  },
  {
    slug: "ai-photo-enhancer",
    title: "AI Photo Enhancer",
    shortTitle: "AI Enhance",
    cardTitle: "Enhance photos with AI",
    cardDescription:
      "Automatically improve lighting, sharpness, and color in one click — perfect for product shots and portraits.",
    metaDescription:
      "AI photo enhancer coming soon on SUHADIMG. One-click image quality improvement — free online tool at suhadimg.site.",
    icon: Sparkles,
    accent: "from-blue-100 to-indigo-200 dark:from-indigo-950 dark:to-blue-900",
    illustration: "ai",
  },
  {
    slug: "suhadimg-api",
    title: "SUHADIMG Developer API",
    shortTitle: "API",
    cardTitle: "Scale with the SUHADIMG API",
    cardDescription:
      "Automate compress, resize, convert, and crop at scale — integrate image tools into your app or workflow.",
    metaDescription:
      "SUHADIMG REST API coming soon. Automate image conversion and compression in your product — built by Suhad Tech Solutions.",
    icon: Code2,
    accent: "from-cyan-100 to-blue-200 dark:from-cyan-950 dark:to-blue-900",
    illustration: "api",
  },
];

export function getComingSoonTool(slug: string): ComingSoonTool | undefined {
  return comingSoonTools.find((t) => t.slug === slug);
}
