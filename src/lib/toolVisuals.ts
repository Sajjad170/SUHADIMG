import type { LucideIcon } from "lucide-react";
import {
  Minimize2,
  Maximize2,
  Crop,
  FileImage,
  FileOutput,
  FileType2,
  RotateCw,
  FlipHorizontal2,
  Droplets,
  Focus,
  CircleDot,
  Sun,
  Contrast,
  Pencil,
  ZoomIn,
  Eraser,
  Stamp,
  Smile,
  Code,
  ScanFace,
  Star,
  AppWindow,
  PenTool,
  ImagePlay,
  Camera,
  Sparkles,
  Share2,
  MonitorPlay,
  Briefcase,
  Hash,
  Music2,
  ArrowRightLeft,
  Image,
} from "lucide-react";
import type { ToolCategory } from "./tools";

export interface ToolVisual {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  isNew?: boolean;
}

const categoryDefaults: Record<ToolCategory, ToolVisual> = {
  conversion: {
    icon: FileImage,
    iconBg: "bg-amber-100 dark:bg-amber-950",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  compression: {
    icon: Minimize2,
    iconBg: "bg-emerald-100 dark:bg-emerald-950",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  resize: {
    icon: Maximize2,
    iconBg: "bg-cyan-100 dark:bg-cyan-950",
    iconColor: "text-cyan-600 dark:text-cyan-400",
  },
  editing: {
    icon: Pencil,
    iconBg: "bg-blue-100 dark:bg-blue-950",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  advanced: {
    icon: Sparkles,
    iconBg: "bg-violet-100 dark:bg-violet-950",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
};

const toolVisualMap: Record<string, ToolVisual> = {
  "png-to-jpg": {
    icon: FileImage,
    iconBg: "bg-amber-100 dark:bg-amber-950",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  "jpg-to-png": {
    icon: FileOutput,
    iconBg: "bg-yellow-100 dark:bg-yellow-950",
    iconColor: "text-yellow-600 dark:text-yellow-500",
  },
  "jpeg-to-png": {
    icon: FileOutput,
    iconBg: "bg-yellow-100 dark:bg-yellow-950",
    iconColor: "text-yellow-600 dark:text-yellow-500",
  },
  "png-to-jpeg": {
    icon: FileImage,
    iconBg: "bg-orange-100 dark:bg-orange-950",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  "jpg-to-webp": {
    icon: ArrowRightLeft,
    iconBg: "bg-lime-100 dark:bg-lime-950",
    iconColor: "text-lime-600 dark:text-lime-400",
  },
  "webp-to-jpg": {
    icon: FileImage,
    iconBg: "bg-amber-100 dark:bg-amber-950",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  "png-to-webp": {
    icon: Minimize2,
    iconBg: "bg-green-100 dark:bg-green-950",
    iconColor: "text-green-600 dark:text-green-400",
  },
  "webp-to-png": {
    icon: FileOutput,
    iconBg: "bg-teal-100 dark:bg-teal-950",
    iconColor: "text-teal-600 dark:text-teal-400",
  },
  "heic-to-jpg": {
    icon: Camera,
    iconBg: "bg-sky-100 dark:bg-sky-950",
    iconColor: "text-sky-600 dark:text-sky-400",
  },
  "avif-to-jpg": {
    icon: FileType2,
    iconBg: "bg-indigo-100 dark:bg-indigo-950",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
  "bmp-to-png": {
    icon: Image,
    iconBg: "bg-stone-100 dark:bg-stone-900",
    iconColor: "text-stone-600 dark:text-stone-400",
  },
  "tiff-to-jpg": {
    icon: FileImage,
    iconBg: "bg-amber-100 dark:bg-amber-950",
    iconColor: "text-amber-700 dark:text-amber-400",
  },
  "gif-to-png": {
    icon: ImagePlay,
    iconBg: "bg-purple-100 dark:bg-purple-950",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  "svg-to-png": {
    icon: PenTool,
    iconBg: "bg-rose-100 dark:bg-rose-950",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
  "svg-to-jpg": {
    icon: PenTool,
    iconBg: "bg-rose-100 dark:bg-rose-950",
    iconColor: "text-rose-600 dark:text-rose-400",
  },
  "ico-generator": {
    icon: AppWindow,
    iconBg: "bg-blue-100 dark:bg-blue-950",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  "favicon-generator": {
    icon: Star,
    iconBg: "bg-yellow-100 dark:bg-yellow-950",
    iconColor: "text-yellow-600 dark:text-yellow-400",
  },
  "compress-image": {
    icon: Minimize2,
    iconBg: "bg-emerald-100 dark:bg-emerald-950",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  "compress-jpg": {
    icon: Minimize2,
    iconBg: "bg-emerald-100 dark:bg-emerald-950",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  "compress-png": {
    icon: Minimize2,
    iconBg: "bg-green-100 dark:bg-green-950",
    iconColor: "text-green-600 dark:text-green-400",
  },
  "compress-webp": {
    icon: Minimize2,
    iconBg: "bg-teal-100 dark:bg-teal-950",
    iconColor: "text-teal-600 dark:text-teal-400",
  },
  "compress-jpeg": {
    icon: Minimize2,
    iconBg: "bg-emerald-100 dark:bg-emerald-950",
    iconColor: "text-emerald-600 dark:text-emerald-400",
  },
  "resize-image": {
    icon: Maximize2,
    iconBg: "bg-cyan-100 dark:bg-cyan-950",
    iconColor: "text-cyan-600 dark:text-cyan-400",
  },
  "resize-for-instagram": {
    icon: Share2,
    iconBg: "bg-pink-100 dark:bg-pink-950",
    iconColor: "text-pink-600 dark:text-pink-400",
  },
  "resize-for-facebook": {
    icon: Share2,
    iconBg: "bg-blue-100 dark:bg-blue-950",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  "resize-for-youtube-thumbnail": {
    icon: MonitorPlay,
    iconBg: "bg-red-100 dark:bg-red-950",
    iconColor: "text-red-600 dark:text-red-400",
  },
  "resize-for-linkedin": {
    icon: Briefcase,
    iconBg: "bg-sky-100 dark:bg-sky-950",
    iconColor: "text-sky-700 dark:text-sky-400",
  },
  "resize-for-x": {
    icon: Hash,
    iconBg: "bg-zinc-200 dark:bg-zinc-800",
    iconColor: "text-zinc-800 dark:text-zinc-200",
  },
  "resize-for-tiktok": {
    icon: Music2,
    iconBg: "bg-fuchsia-100 dark:bg-fuchsia-950",
    iconColor: "text-fuchsia-600 dark:text-fuchsia-400",
  },
  "crop-image": {
    icon: Crop,
    iconBg: "bg-blue-100 dark:bg-blue-950",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  "rotate-image": {
    icon: RotateCw,
    iconBg: "bg-blue-100 dark:bg-blue-950",
    iconColor: "text-blue-600 dark:text-blue-400",
  },
  "flip-image": {
    icon: FlipHorizontal2,
    iconBg: "bg-indigo-100 dark:bg-indigo-950",
    iconColor: "text-indigo-600 dark:text-indigo-400",
  },
  "blur-image": {
    icon: Droplets,
    iconBg: "bg-slate-100 dark:bg-slate-900",
    iconColor: "text-slate-600 dark:text-slate-400",
  },
  "sharpen-image": {
    icon: Focus,
    iconBg: "bg-violet-100 dark:bg-violet-950",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  "black-and-white": {
    icon: CircleDot,
    iconBg: "bg-zinc-200 dark:bg-zinc-800",
    iconColor: "text-zinc-700 dark:text-zinc-300",
  },
  "adjust-brightness": {
    icon: Sun,
    iconBg: "bg-yellow-100 dark:bg-yellow-950",
    iconColor: "text-yellow-600 dark:text-yellow-400",
  },
  "adjust-contrast": {
    icon: Contrast,
    iconBg: "bg-orange-100 dark:bg-orange-950",
    iconColor: "text-orange-600 dark:text-orange-400",
  },
  "background-remover": {
    icon: Eraser,
    iconBg: "bg-teal-100 dark:bg-teal-950",
    iconColor: "text-teal-600 dark:text-teal-400",
    isNew: true,
  },
  "image-upscaler": {
    icon: ZoomIn,
    iconBg: "bg-emerald-100 dark:bg-emerald-950",
    iconColor: "text-emerald-600 dark:text-emerald-400",
    isNew: true,
  },
  "convert-to-jpg": {
    icon: FileImage,
    iconBg: "bg-amber-100 dark:bg-amber-950",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  "convert-from-jpg": {
    icon: FileOutput,
    iconBg: "bg-yellow-100 dark:bg-yellow-950",
    iconColor: "text-yellow-600 dark:text-yellow-500",
  },
  "photo-editor": {
    icon: Pencil,
    iconBg: "bg-violet-100 dark:bg-violet-950",
    iconColor: "text-violet-600 dark:text-violet-400",
  },
  "watermark-image": {
    icon: Stamp,
    iconBg: "bg-sky-100 dark:bg-sky-950",
    iconColor: "text-sky-600 dark:text-sky-400",
  },
  "meme-generator": {
    icon: Smile,
    iconBg: "bg-purple-100 dark:bg-purple-950",
    iconColor: "text-purple-600 dark:text-purple-400",
  },
  "html-to-image": {
    icon: Code,
    iconBg: "bg-amber-100 dark:bg-amber-950",
    iconColor: "text-amber-600 dark:text-amber-400",
  },
  "blur-face": {
    icon: ScanFace,
    iconBg: "bg-indigo-100 dark:bg-indigo-950",
    iconColor: "text-indigo-600 dark:text-indigo-400",
    isNew: true,
  },
};

export function getToolVisual(slug: string, category?: ToolCategory): ToolVisual {
  if (toolVisualMap[slug]) return toolVisualMap[slug];
  if (category && categoryDefaults[category]) return categoryDefaults[category];
  return categoryDefaults.conversion;
}
