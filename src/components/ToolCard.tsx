import Link from "next/link";
import type { ToolConfig } from "@/lib/tools";
import { getToolVisual } from "@/lib/toolVisuals";

import type { Locale } from "@/lib/i18n/config";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { toolPath } from "@/lib/i18n/paths";

interface ToolCardProps {
  tool: ToolConfig;
  compact?: boolean;
  dense?: boolean;
  locale?: Locale;
}

export function ToolCard({
  tool,
  compact = false,
  dense = false,
  locale = DEFAULT_LOCALE,
}: ToolCardProps) {
  const href = toolPath(tool.slug, locale);
  const visual = getToolVisual(tool.slug, tool.category);
  const Icon = visual.icon;

  if (dense) {
    return (
      <Link
        href={href}
        className="group relative flex items-center gap-2.5 rounded-xl border border-zinc-200 bg-white p-2.5 shadow-sm transition-all hover:border-blue-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800"
      >
        {visual.isNew && (
          <span className="absolute -right-1 -top-1 rounded bg-blue-500 px-1 py-px text-[8px] font-bold uppercase text-white">
            New
          </span>
        )}
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${visual.iconBg}`}
        >
          <Icon className={`h-4 w-4 ${visual.iconColor}`} strokeWidth={1.75} />
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="truncate text-xs font-bold text-zinc-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
            {tool.shortTitle}
          </h3>
          <p className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">
            {tool.description}
          </p>
        </div>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={`group relative flex flex-col rounded-2xl border border-zinc-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-lg dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800 ${
        compact ? "min-h-[140px] p-4" : "min-h-[180px] p-6"
      }`}
    >
      {visual.isNew && (
        <span className="absolute right-3 top-3 rounded-md bg-blue-500 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wide text-white">
          New!
        </span>
      )}

      <div
        className={`mb-3 flex items-center justify-center rounded-xl transition-transform group-hover:scale-105 ${
          compact ? "h-10 w-10" : "h-14 w-14"
        } ${visual.iconBg}`}
      >
        <Icon
          className={`${compact ? "h-5 w-5" : "h-7 w-7"} ${visual.iconColor}`}
          strokeWidth={1.75}
        />
      </div>

      <h3
        className={`mb-1 font-bold leading-snug text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400 ${
          compact ? "text-sm" : "text-base"
        }`}
      >
        {tool.shortTitle}
      </h3>

      <p
        className={`mt-auto leading-relaxed text-zinc-500 dark:text-zinc-400 ${
          compact ? "line-clamp-2 text-xs" : "line-clamp-3 text-sm"
        }`}
      >
        {tool.description}
      </p>
    </Link>
  );
}
