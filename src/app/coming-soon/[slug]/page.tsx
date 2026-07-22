import { notFound } from "next/navigation";
import { getPageMetadata } from "@/lib/seo";
import { comingSoonTools, getComingSoonTool } from "@/lib/comingSoonTools";
import { getComingSoonArticle } from "@/lib/comingSoonContent";
import { ComingSoonPageContent } from "@/components/ComingSoonPageContent";
import type { Metadata } from "next";

export function generateStaticParams() {
  return comingSoonTools.map((tool) => ({ slug: tool.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tool = getComingSoonTool(slug);
  if (!tool) return {};
  return {
    ...getPageMetadata(
      `${tool.title} — Coming Soon`,
      tool.metaDescription,
      `/coming-soon/${slug}`
    ),
    robots: { index: false, follow: true },
  };
}

export default async function ComingSoonToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = getComingSoonTool(slug);
  const article = getComingSoonArticle(slug);
  if (!tool || !article) notFound();
  return <ComingSoonPageContent tool={tool} article={article} />;
}
