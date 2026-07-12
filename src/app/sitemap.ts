import type { MetadataRoute } from "next";
import { homeToolSlugs } from "@/lib/homepageTools";
import { tools } from "@/lib/tools";
import { blogPosts } from "@/lib/blogPosts";
import { LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/config";
import { buildHreflangAlternates } from "@/lib/i18n/hreflang";
import { localePath } from "@/lib/i18n/paths";

import { comingSoonTools } from "@/lib/comingSoonTools";

const BASE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://suhadimg.site"
).replace(/\/$/, "");

function withHreflang(path: string) {
  return { languages: buildHreflangAlternates(path) };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages: { path: string; priority: number }[] = [
    { path: "", priority: 1 },
    { path: "/tools", priority: 0.9 },
    { path: "/blog", priority: 0.85 },
    { path: "/about", priority: 0.85 },
    { path: "/contact", priority: 0.7 },
    { path: "/site-map", priority: 0.6 },
    { path: "/privacy", priority: 0.5 },
    { path: "/terms", priority: 0.5 },
    { path: "/disclaimer", priority: 0.5 },
    { path: "/cookies", priority: 0.5 },
  ];

  const homeAlternates = withHreflang("/");

  return [
    ...staticPages.map(({ path, priority }) => ({
      url: `${BASE_URL}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority,
      ...(path === "" ? { alternates: homeAlternates } : {}),
    })),
    ...LOCALES.filter((l) => l !== DEFAULT_LOCALE).map((locale) => ({
      url: `${BASE_URL}${localePath("/", locale)}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.95,
      alternates: homeAlternates,
    })),
    ...tools.flatMap((tool) => {
      const path = `/${tool.slug}`;
      const alternates = withHreflang(path);
      return LOCALES.map((locale) => ({
        url: `${BASE_URL}${localePath(path, locale)}`,
        lastModified: new Date(),
        changeFrequency: "monthly" as const,
        priority: homeToolSlugs.has(tool.slug)
          ? 0.95
          : tool.popular
            ? 0.9
            : 0.7,
        alternates,
      }));
    }),
    ...blogPosts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
    ...comingSoonTools.map((tool) => ({
      url: `${BASE_URL}/coming-soon/${tool.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.65,
    })),
  ];
}
