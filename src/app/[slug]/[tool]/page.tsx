import { notFound } from "next/navigation";
import { tools, getToolBySlug } from "@/lib/tools";
import { getToolMetadata } from "@/lib/seo";
import { ToolPageContent } from "@/components/ToolPageContent";
import { isLocale, LOCALES, DEFAULT_LOCALE } from "@/lib/i18n/config";
import type { Locale } from "@/lib/i18n/config";

export function generateStaticParams() {
  return LOCALES.filter((l) => l !== DEFAULT_LOCALE).flatMap((locale) =>
    tools.map((tool) => ({ slug: locale, tool: tool.slug }))
  );
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; tool: string }>;
}) {
  const { slug: locale, tool: toolSlug } = await params;
  if (!isLocale(locale) || locale === DEFAULT_LOCALE) return {};
  const tool = getToolBySlug(toolSlug);
  if (!tool) return {};
  return getToolMetadata(tool, locale);
}

export default async function LocalizedToolPage({
  params,
}: {
  params: Promise<{ slug: string; tool: string }>;
}) {
  const { slug: locale, tool: toolSlug } = await params;
  if (!isLocale(locale) || locale === DEFAULT_LOCALE) notFound();
  const tool = getToolBySlug(toolSlug);
  if (!tool) notFound();
  return <ToolPageContent tool={tool} locale={locale as Locale} />;
}
