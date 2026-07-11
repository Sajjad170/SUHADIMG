import { homeTools } from "@/lib/homepageTools";
import { HomeToolCard } from "./HomeToolCard";

import type { Locale } from "@/lib/i18n/config";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";

export function HomeToolsGrid({ locale = DEFAULT_LOCALE }: { locale?: Locale }) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {homeTools.map((tool) => (
        <HomeToolCard key={tool.slug} tool={tool} locale={locale} />
      ))}
    </div>
  );
}
