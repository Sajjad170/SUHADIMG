"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, ChevronDown } from "lucide-react";
import { LOCALES, LOCALE_NAMES, type Locale } from "@/lib/i18n/config";
import { localePath, parseLocalePath } from "@/lib/i18n/paths";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { locale: currentLocale, pathWithoutLocale } = parseLocalePath(pathname);

  useEffect(() => {
    function close() {
      setOpen(false);
    }
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, []);

  return (
    <div className="relative" onClick={(e) => e.stopPropagation()}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-1 rounded-lg px-2 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-white"
        aria-label="Select language"
        aria-expanded={open}
      >
        <Globe className="h-4 w-4" />
        <span className="hidden uppercase sm:inline">{currentLocale}</span>
        <ChevronDown className={`h-3.5 w-3.5 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div className="absolute right-0 top-full z-50 mt-1 min-w-[140px] rounded-xl border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900">
          {LOCALES.map((locale) => (
            <Link
              key={locale}
              href={localePath(pathWithoutLocale, locale)}
              prefetch
              onClick={() => setOpen(false)}
              className={`block px-4 py-2 text-sm hover:bg-zinc-50 dark:hover:bg-zinc-800 ${
                locale === currentLocale
                  ? "font-semibold text-blue-600 dark:text-blue-400"
                  : "text-zinc-700 dark:text-zinc-300"
              }`}
              hrefLang={locale}
            >
              {LOCALE_NAMES[locale]}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
