import type { Metadata } from "next";
import type { ToolConfig } from "./tools";
import type { BlogPost } from "./blog";
import { CATEGORY_LABELS } from "./tools";
import { SEO_KEYWORDS, SITE_DOMAIN } from "./site";
import type { Locale } from "./i18n/config";
import { LOCALE_OG } from "./i18n/config";
import { buildHreflangAlternates } from "./i18n/hreflang";
import { localePath, toolPath } from "./i18n/paths";
import {
  buildLocalizedToolSeoTitle,
  getLocalizedTool,
} from "./i18n/toolLocale";

const SITE_NAME = "SUHADIMG";
const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? SITE_DOMAIN
).replace(/\/$/, "");

const OG_IMAGE_PATH = "/og-image.png";
const OG_IMAGE_URL = `${SITE_URL}${OG_IMAGE_PATH}`;
const OG_IMAGE_ALT = "SUHADIMG — free online image converter, compressor, and editor";

function baseOpenGraph(
  title: string,
  description: string,
  url: string,
  type: "website" | "article" = "website",
  locale: Locale = "en"
): Metadata["openGraph"] {
  return {
    title,
    description,
    type,
    siteName: SITE_NAME,
    url,
    locale: LOCALE_OG[locale],
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: OG_IMAGE_ALT,
      },
    ],
  };
}

function baseTwitter(title: string, description: string): Metadata["twitter"] {
  return {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: OG_IMAGE_URL, alt: OG_IMAGE_ALT }],
  };
}

/** SEO title format: "PNG to JPG Converter - Free Online Image Converter | SUHADIMG" */
export function buildToolSeoTitle(tool: ToolConfig): string {
  const suffix =
    tool.category === "conversion"
      ? "Free Online Image Converter"
      : "Free Online Image Tool";
  return `${tool.title} - ${suffix} | ${SITE_NAME}`;
}

export function getHomeMetadata(): Metadata {
  const title = "Free Online Image Converter & Editor Tool | SUHADIMG";
  const description =
    "Free image converter & editor online. Compress, resize, crop & convert JPG, PNG, WebP. Secure, no signup — SUHADIMG.";

  return {
    title: { absolute: title },
    description,
    keywords: [...SEO_KEYWORDS.main, ...SEO_KEYWORDS.longTail],
    openGraph: baseOpenGraph(title, description, SITE_URL),
    twitter: baseTwitter(title, description),
    alternates: {
      canonical: SITE_URL,
      languages: buildHreflangAlternates("/"),
    },
  };
}

export function getToolMetadata(
  tool: ToolConfig,
  locale: Locale = "en"
): Metadata {
  const localized = getLocalizedTool(tool, locale);
  const title =
    locale === "en" ? buildToolSeoTitle(tool) : buildLocalizedToolSeoTitle(tool, locale);
  const url = `${SITE_URL}${toolPath(tool.slug, locale)}`;
  const path = `/${tool.slug}`;

  return {
    title: { absolute: title },
    description: localized.metaDescription,
    keywords: [
      localized.title,
      tool.shortTitle,
      ...SEO_KEYWORDS.main.slice(0, 6),
      "free",
      "online",
      "no watermark",
      SITE_NAME,
      "suhadimg.site",
    ],
    openGraph: baseOpenGraph(title, localized.metaDescription, url, "website", locale),
    twitter: baseTwitter(title, localized.metaDescription),
    alternates: {
      canonical: url,
      languages: buildHreflangAlternates(path),
    },
  };
}

export function getLocalizedHomeMetadata(locale: Locale): Metadata {
  const titles: Record<Locale, string> = {
    en: "Free Online Image Converter & Editor Tool | SUHADIMG",
    es: "Convertidor de Imágenes Gratis | SUHADIMG - Comprimir y Convertir",
    ja: "無料画像変換 | SUHADIMG - 圧縮・リサイズ・変換",
    de: "Kostenloser Bildkonverter | SUHADIMG - Komprimieren & Konvertieren",
    fr: "Convertisseur d'Images Gratuit | SUHADIMG - Compresser & Convertir",
  };
  const descriptions: Record<Locale, string> = {
    en: "Free image converter & editor online. Compress, resize, crop & convert JPG, PNG, WebP. Secure, no signup — SUHADIMG.",
    es: "Convierte JPG, PNG, WEBP y más formatos gratis en suhadimg.site. Rápido, seguro y sin límites con SUHADIMG.",
    ja: "JPG、PNG、WebPなどをsuhadimg.siteで無料変換。高速・安全・制限なしのSUHADIMG。",
    de: "Konvertieren Sie JPG, PNG, WebP kostenlos auf suhadimg.site. Schnell, sicher, ohne Limits mit SUHADIMG.",
    fr: "Convertissez JPG, PNG, WebP gratuitement sur suhadimg.site. Rapide, sécurisé, sans limites avec SUHADIMG.",
  };
  const title = titles[locale];
  const description = descriptions[locale];
  const url = `${SITE_URL}${localePath("/", locale)}`;

  return {
    title: { absolute: title },
    description,
    keywords: [...SEO_KEYWORDS.main, ...SEO_KEYWORDS.longTail, "suhadimg.site"],
    openGraph: baseOpenGraph(title, description, url, "website", locale),
    twitter: baseTwitter(title, description),
    alternates: {
      canonical: url,
      languages: buildHreflangAlternates("/"),
    },
  };
}

export function getBlogMetadata(post: BlogPost): Metadata {
  const fullTitle = `${post.title} | ${SITE_NAME}`;
  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    title: { absolute: fullTitle },
    description: post.description,
    keywords: [post.category, ...SEO_KEYWORDS.main.slice(0, 6), SITE_NAME],
    openGraph: {
      ...baseOpenGraph(fullTitle, post.description, url, "article"),
      type: "article",
      publishedTime: post.date,
      authors: [SITE_NAME],
      section: post.category,
      tags: [post.category, "image tools", "SUHADIMG"],
    },
    twitter: baseTwitter(fullTitle, post.description),
    alternates: { canonical: url },
  };
}

export function getPageMetadata(
  title: string,
  description: string,
  path: string
): Metadata {
  const fullTitle = `${title} | ${SITE_NAME}`;
  const url = `${SITE_URL}${path}`;

  return {
    title: { absolute: fullTitle },
    description,
    keywords: [...SEO_KEYWORDS.main.slice(0, 8), SITE_NAME],
    openGraph: baseOpenGraph(fullTitle, description, url),
    twitter: baseTwitter(fullTitle, description),
    alternates: { canonical: url },
  };
}

export { SITE_NAME, SITE_URL, OG_IMAGE_URL, OG_IMAGE_ALT };
