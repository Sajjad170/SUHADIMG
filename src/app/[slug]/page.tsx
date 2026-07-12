import { notFound } from "next/navigation";
import { tools, getToolBySlug } from "@/lib/tools";
import { getToolMetadata, getLocalizedHomeMetadata } from "@/lib/seo";
import { ToolPageContent } from "@/components/ToolPageContent";
import { LocalizedHome } from "@/components/LocalizedHome";
import {
  isLocale,
  LOCALES,
  DEFAULT_LOCALE,
  type Locale,
} from "@/lib/i18n/config";

const RESERVED_SLUGS = new Set([
  "blog",
  "about",
  "privacy",
  "terms",
  "contact",
  "tools",
  "disclaimer",
  "cookies",
  "site-map",
  "coming-soon",
  "api",
  ...LOCALES.filter((l) => l !== DEFAULT_LOCALE),
]);

export function generateStaticParams() {
  return [
    ...tools.map((tool) => ({ slug: tool.slug })),
    ...LOCALES.filter((l) => l !== DEFAULT_LOCALE).map((locale) => ({
      slug: locale,
    })),
  ];
}

/** Unknown slugs must return HTTP 404, not 200 with a soft fallback. */
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (isLocale(slug) && slug !== DEFAULT_LOCALE) {
    return getLocalizedHomeMetadata(slug);
  }
  const tool = getToolBySlug(slug);
  if (!tool) return {};
  return getToolMetadata(tool);
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (isLocale(slug) && slug !== DEFAULT_LOCALE) {
    return <LocalizedHome locale={slug as Locale} />;
  }

  if (RESERVED_SLUGS.has(slug)) notFound();
  const tool = getToolBySlug(slug);
  if (!tool) notFound();
  return <ToolPageContent tool={tool} />;
}
