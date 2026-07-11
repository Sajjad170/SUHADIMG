import { extraBlogPosts } from "./blogExtra";

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  readTime: string;
  category: string;
}

/** Lightweight blog index — no article body text (fast page loads). */
export const blogPosts: BlogPost[] = [
  {
    slug: "png-vs-jpg",
    title: "PNG vs JPG: Which Format Should You Use?",
    description:
      "Understand the key differences between PNG and JPG to choose the right format for your images.",
    date: "2026-07-01",
    readTime: "5 min read",
    category: "Guides",
  },
  {
    slug: "jpeg-vs-png",
    title: "JPEG vs PNG: A Complete Comparison",
    description:
      "Learn when to use JPEG and when PNG is the better choice for photos, graphics, and web images.",
    date: "2026-06-28",
    readTime: "4 min read",
    category: "Guides",
  },
  {
    slug: "what-is-webp",
    title: "What is WebP? Everything You Need to Know",
    description:
      "WebP is a modern image format that offers superior compression. Here's how it compares to JPG and PNG.",
    date: "2026-06-25",
    readTime: "6 min read",
    category: "Formats",
  },
  {
    slug: "best-image-format-for-websites",
    title: "Best Image Format for Websites in 2026",
    description:
      "Choose the optimal image format for faster page loads, better SEO, and great visual quality.",
    date: "2026-06-20",
    readTime: "7 min read",
    category: "Web Performance",
  },
  {
    slug: "how-to-compress-images-without-losing-quality",
    title: "How to Compress Images Without Losing Quality",
    description:
      "Practical tips and tools for reducing image file size while keeping your photos looking sharp.",
    date: "2026-06-15",
    readTime: "5 min read",
    category: "Tips",
  },
  {
    slug: "webp-vs-png",
    title: "WEBP vs PNG: Which Should You Use?",
    description:
      "Compare WebP and PNG for web performance, transparency, and quality — with practical recommendations.",
    date: "2026-07-05",
    readTime: "6 min read",
    category: "Guides",
  },
  {
    slug: "how-to-resize-images-online",
    title: "How to Resize Images Online (Free Guide)",
    description:
      "Step-by-step guide to resizing photos for social media, websites, passports, and print — without desktop software.",
    date: "2026-07-03",
    readTime: "5 min read",
    category: "Tips",
  },
  {
    slug: "heic-vs-jpg",
    title: "HEIC vs JPG: iPhone Photos Explained",
    description:
      "Why iPhones save HEIC files, how they compare to JPG, and when to convert HEIC to JPEG for sharing.",
    date: "2026-06-30",
    readTime: "5 min read",
    category: "Formats",
  },
  {
    slug: "best-image-size-for-instagram",
    title: "Best Image Size for Instagram in 2026",
    description:
      "Correct dimensions for Instagram posts, stories, reels, and profile photos — plus free resize tools.",
    date: "2026-06-22",
    readTime: "4 min read",
    category: "Social Media",
  },
  {
    slug: "image-compression-guide",
    title: "Complete Image Compression Guide",
    description:
      "Everything you need to know about compressing JPG, PNG, and WebP files for web, email, and apps.",
    date: "2026-06-18",
    readTime: "8 min read",
    category: "Guides",
  },
  {
    slug: "seo-image-optimization-guide",
    title: "SEO Image Optimization Guide",
    description:
      "How image size, format, alt text, and lazy loading affect Google rankings — and how to fix common issues.",
    date: "2026-06-12",
    readTime: "7 min read",
    category: "Web Performance",
  },
  {
    slug: "best-image-converter-2026",
    title: "Best Free Image Converter in 2026",
    description:
      "What to look for in an online image converter — speed, privacy, formats, and why SUHADIMG stands out.",
    date: "2026-06-08",
    readTime: "6 min read",
    category: "Guides",
  },
  ...extraBlogPosts,
];

export function getBlogPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
