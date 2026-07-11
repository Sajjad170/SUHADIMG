import type { LucideIcon } from "lucide-react";
import {
  Minimize2,
  Maximize2,
  Crop,
  FileImage,
  FileOutput,
  Pencil,
  ZoomIn,
  Eraser,
  Stamp,
  Smile,
  RotateCw,
  Code,
  ScanFace,
} from "lucide-react";

export type HomeFilter =
  | "all"
  | "optimize"
  | "create"
  | "edit"
  | "convert"
  | "security";

export const HOME_FILTERS: { id: HomeFilter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "optimize", label: "Optimize" },
  { id: "create", label: "Create" },
  { id: "edit", label: "Edit" },
  { id: "convert", label: "Convert" },
  { id: "security", label: "Security" },
];

export interface HomeTool {
  slug: string;
  titlePrefix: string;
  description: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  filters: HomeFilter[];
  isNew?: boolean;
  suffix?: "image" | "none";
}

export const homeTools: HomeTool[] = [
  {
    slug: "compress-image",
    titlePrefix: "Compress",
    description:
      "Compress JPG, PNG, SVG, and GIFs while saving space and maintaining quality.",
    icon: Minimize2,
    iconBg: "bg-emerald-100 dark:bg-emerald-950",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    filters: ["all", "optimize"],
    suffix: "image",
  },
  {
    slug: "resize-image",
    titlePrefix: "Resize",
    description:
      "Define your dimensions, by percent or pixel, and resize your JPG, PNG, SVG, and GIF images.",
    icon: Maximize2,
    iconBg: "bg-cyan-100 dark:bg-cyan-950",
    iconColor: "text-cyan-600 dark:text-cyan-400",
    filters: ["all", "optimize"],
    suffix: "image",
  },
  {
    slug: "crop-image",
    titlePrefix: "Crop",
    description:
      "Crop JPG, PNG, or GIFs with ease. Choose pixels to define your rectangle or use our visual editor.",
    icon: Crop,
    iconBg: "bg-blue-100 dark:bg-blue-950",
    iconColor: "text-blue-600 dark:text-blue-400",
    filters: ["all", "edit"],
    suffix: "image",
  },
  {
    slug: "convert-to-jpg",
    titlePrefix: "Convert to JPG",
    description:
      "Turn PNG, GIF, TIF, PSD, SVG, WEBP, HEIC, or RAW format images to JPG in bulk with ease.",
    icon: FileImage,
    iconBg: "bg-amber-100 dark:bg-amber-950",
    iconColor: "text-amber-600 dark:text-amber-400",
    filters: ["all", "convert"],
    suffix: "none",
  },
  {
    slug: "convert-from-jpg",
    titlePrefix: "Convert from JPG",
    description:
      "Turn JPG images to PNG and GIF. Choose several JPGs to create an animated GIF in seconds!",
    icon: FileOutput,
    iconBg: "bg-yellow-100 dark:bg-yellow-950",
    iconColor: "text-yellow-600 dark:text-yellow-500",
    filters: ["all", "convert"],
    suffix: "none",
  },
  {
    slug: "photo-editor",
    titlePrefix: "Photo editor",
    description:
      "Spice up your pictures with text, effects, frames or stickers. Simple editing tools for your image needs.",
    icon: Pencil,
    iconBg: "bg-violet-100 dark:bg-violet-950",
    iconColor: "text-violet-600 dark:text-violet-400",
    filters: ["all", "edit"],
    suffix: "none",
  },
  {
    slug: "image-upscaler",
    titlePrefix: "Upscale",
    description:
      "Enlarge your images with high resolution. Easily increase the size of your JPG and PNG images while maintaining visual quality.",
    icon: ZoomIn,
    iconBg: "bg-emerald-100 dark:bg-emerald-950",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    filters: ["all", "edit"],
    isNew: true,
    suffix: "image",
  },
  {
    slug: "background-remover",
    titlePrefix: "Remove background",
    description:
      "Quickly remove image backgrounds with high accuracy. Instantly detect objects and cut out backgrounds with ease.",
    icon: Eraser,
    iconBg: "bg-teal-100 dark:bg-teal-950",
    iconColor: "text-teal-600 dark:text-teal-400",
    filters: ["all", "edit", "security"],
    isNew: true,
    suffix: "none",
  },
  {
    slug: "watermark-image",
    titlePrefix: "Watermark",
    description:
      "Stamp an image or text over your images in seconds. Choose the typography, transparency and position.",
    icon: Stamp,
    iconBg: "bg-sky-100 dark:bg-sky-950",
    iconColor: "text-sky-600 dark:text-sky-400",
    filters: ["all", "create", "security"],
    suffix: "image",
  },
  {
    slug: "meme-generator",
    titlePrefix: "Meme generator",
    description:
      "Create your memes online with ease. Caption meme images or upload your pictures to make custom memes.",
    icon: Smile,
    iconBg: "bg-purple-100 dark:bg-purple-950",
    iconColor: "text-purple-600 dark:text-purple-400",
    filters: ["all", "create"],
    suffix: "none",
  },
  {
    slug: "rotate-image",
    titlePrefix: "Rotate",
    description:
      "Rotate many images JPG, PNG or GIF at same time. Choose to rotate only landscape or portrait images!",
    icon: RotateCw,
    iconBg: "bg-blue-100 dark:bg-blue-950",
    iconColor: "text-blue-600 dark:text-blue-400",
    filters: ["all", "edit"],
    suffix: "image",
  },
  {
    slug: "html-to-image",
    titlePrefix: "HTML to IMAGE",
    description:
      "Convert webpages in HTML to JPG or SVG. Copy and paste the URL of the page you want and convert it to IMAGE with a click.",
    icon: Code,
    iconBg: "bg-amber-100 dark:bg-amber-950",
    iconColor: "text-amber-600 dark:text-amber-400",
    filters: ["all", "convert", "create"],
    suffix: "none",
  },
  {
    slug: "blur-face",
    titlePrefix: "Blur face",
    description:
      "Automatically blur faces in your photos to protect privacy. Perfect for sharing images safely online.",
    icon: ScanFace,
    iconBg: "bg-indigo-100 dark:bg-indigo-950",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    filters: ["all", "security", "edit"],
    isNew: true,
    suffix: "none",
  },
];

export function getHomeToolsByFilter(filter: HomeFilter): HomeTool[] {
  if (filter === "all") return homeTools;
  return homeTools.filter((t) => t.filters.includes(filter));
}

export const homeToolSlugs = new Set(homeTools.map((t) => t.slug));
