"use client";

import { useState } from "react";
import type { IndustryUseCase } from "@/lib/toolSeoEnhanced";

interface IndustryUseCaseTabsProps {
  items: IndustryUseCase[];
}

export function IndustryUseCaseTabs({ items }: IndustryUseCaseTabsProps) {
  const [active, setActive] = useState(0);

  if (items.length === 0) return null;

  return (
    <div>
      <div
        role="tablist"
        aria-label="Industry use cases"
        className="mb-4 flex gap-2 overflow-x-auto pb-1 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, index) => {
          const isActive = active === index;
          return (
            <button
              key={item.role}
              type="button"
              role="tab"
              id={`use-case-tab-${index}`}
              aria-selected={isActive}
              aria-controls={`use-case-panel-${index}`}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActive(index)}
              className={`shrink-0 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                isActive
                  ? "border-blue-600 bg-blue-600 text-white shadow-sm"
                  : "border-zinc-200 bg-white text-zinc-700 hover:border-blue-200 hover:bg-blue-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-blue-800 dark:hover:bg-blue-950/40"
              }`}
            >
              {item.tabLabel}
            </button>
          );
        })}
      </div>

      <div className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        {items.map((item, index) => (
          <div
            key={item.role}
            id={`use-case-panel-${index}`}
            role="tabpanel"
            aria-labelledby={`use-case-tab-${index}`}
            hidden={active !== index}
            className="px-5 py-4"
          >
            <h3 className="mb-2 text-sm font-semibold text-zinc-900 dark:text-white">
              {item.role}
            </h3>
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {item.body}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
