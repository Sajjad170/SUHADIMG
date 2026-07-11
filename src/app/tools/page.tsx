import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { SectionHeading } from "@/components/SectionHeading";
import { ToolCard } from "@/components/ToolCard";
import { getPageMetadata } from "@/lib/seo";
import { allToolsItemListJsonLd } from "@/lib/structuredData";
import { CATEGORY_LABELS, tools, type ToolCategory } from "@/lib/tools";

export const metadata = getPageMetadata(
  "All Image Tools",
  "Browse every free SUHADIMG tool — compress, resize, crop, convert, edit photos, remove backgrounds, and more. No signup required.",
  "/tools"
);

const categoryOrder: ToolCategory[] = [
  "compression",
  "resize",
  "conversion",
  "editing",
  "advanced",
];

export default function AllToolsPage() {
  const toolsByCategory = categoryOrder.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    items: tools.filter((tool) => tool.category === category),
  }));

  return (
    <>
      <JsonLd data={allToolsItemListJsonLd(tools)} />

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
            Home
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900 dark:text-white">All Tools</span>
        </nav>

        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          All Image Tools
        </h1>
        <p className="mb-10 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
          Every free tool on SUHADIMG — convert, compress, resize, crop, and edit
          images online. Files are processed instantly and deleted immediately.
        </p>

        <div className="space-y-12">
          {toolsByCategory.map(({ category, label, items }) => (
            <section key={category} id={category}>
              <SectionHeading title={label} />
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((tool) => (
                  <ToolCard key={tool.slug} tool={tool} compact />
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </>
  );
}
