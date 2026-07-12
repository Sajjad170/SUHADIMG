import Link from "next/link";
import { getToolBySlug } from "@/lib/tools";
import { getToolVisual } from "@/lib/toolVisuals";
import type { HomeTool } from "@/lib/homepageTools";

import type { Locale } from "@/lib/i18n/config";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { toolPath } from "@/lib/i18n/paths";

export function HomeToolCard({
  tool,
  locale = DEFAULT_LOCALE,
}: {
  tool: HomeTool;
  locale?: Locale;
}) {
  const config = getToolBySlug(tool.slug);
  const visual = getToolVisual(tool.slug, config?.category);
  const Icon = visual.icon;
  const showImageSuffix = tool.suffix !== "none";

  return (
    <Link
      href={toolPath(tool.slug, locale)}
      prefetch
      className="group relative flex min-h-[140px] flex-col rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800"
    >
      {(tool.isNew || visual.isNew) && (
        <span className="absolute right-3 top-3 rounded bg-blue-500 px-1.5 py-0.5 text-[9px] font-bold uppercase text-white">
          New!
        </span>
      )}

      <div
        className={`mb-2.5 flex h-11 w-11 items-center justify-center rounded-lg transition-transform group-hover:scale-105 ${visual.iconBg}`}
      >
        <Icon className={`h-5 w-5 ${visual.iconColor}`} strokeWidth={1.75} />
      </div>

      <h3 className="mb-1 text-sm font-bold leading-snug text-zinc-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
        {showImageSuffix ? (
          <>
            {tool.titlePrefix}{" "}
            <span className="text-blue-500 dark:text-blue-400">IMAGE</span>
          </>
        ) : (
          tool.titlePrefix
        )}
      </h3>

      <p className="mt-auto line-clamp-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
        {tool.description}
      </p>
    </Link>
  );
}
