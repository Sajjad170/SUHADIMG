import { ToolCard } from "@/components/ToolCard";
import { SectionHeading } from "@/components/SectionHeading";
import { homeToolSlugs } from "@/lib/homepageTools";
import {
  CATEGORY_LABELS,
  getToolsByCategory,
  type ToolCategory,
} from "@/lib/tools";

const categories: ToolCategory[] = [
  "conversion",
  "compression",
  "resize",
  "editing",
  "advanced",
];

import type { Locale } from "@/lib/i18n/config";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { categoryLabel } from "@/lib/i18n/ui";

export function CategoryToolsSection({
  locale = DEFAULT_LOCALE,
  headingLevel = "h3",
}: {
  locale?: Locale;
  headingLevel?: "h2" | "h3";
}) {
  return (
    <div className="space-y-10">
      {categories.map((cat) => {
        const catTools = getToolsByCategory(cat).filter(
          (t) => !homeToolSlugs.has(t.slug)
        );
        if (catTools.length === 0) return null;

        return (
          <section key={cat}>
            <SectionHeading
              level={headingLevel}
              title={
                locale === DEFAULT_LOCALE
                  ? CATEGORY_LABELS[cat]
                  : categoryLabel(locale, cat)
              }
            />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {catTools.map((tool) => (
                <ToolCard key={tool.slug} tool={tool} compact locale={locale} />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
