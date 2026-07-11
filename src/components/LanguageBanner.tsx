"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";
import {
  DEFAULT_LOCALE,
  LOCALE_NAMES,
  LOCALES,
  type Locale,
} from "@/lib/i18n/config";
import { localePath, parseLocalePath } from "@/lib/i18n/paths";
import { t, UI } from "@/lib/i18n/ui";

const STORAGE_KEY = "suhadimg-language-preference";

export function LanguageBanner() {
  const pathname = usePathname();
  const router = useRouter();
  const [suggested, setSuggested] = useState<Locale | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY)) return;

    const browserLang = (
      navigator.language || (navigator as { userLanguage?: string }).userLanguage || "en"
    )
      .split("-")[0]
      .toLowerCase();

    if (!LOCALES.includes(browserLang as Locale)) return;
    if (browserLang === DEFAULT_LOCALE) return;

    const { locale, pathWithoutLocale } = parseLocalePath(pathname);
    if (locale === browserLang) return;
    if (!pathWithoutLocale.startsWith("/")) return;

    setSuggested(browserLang as Locale);
  }, [pathname]);

  if (!suggested) return null;

  const langName = LOCALE_NAMES[suggested];
  const { pathWithoutLocale } = parseLocalePath(pathname);

  function dismiss() {
    localStorage.setItem(STORAGE_KEY, "dismissed");
    setSuggested(null);
  }

  function accept() {
    localStorage.setItem(STORAGE_KEY, suggested!);
    router.push(localePath(pathWithoutLocale, suggested!));
    setSuggested(null);
  }

  return (
    <div
      role="dialog"
      aria-live="polite"
      className="fixed bottom-4 left-4 right-4 z-[60] mx-auto flex max-w-lg items-start gap-3 rounded-xl border border-blue-200 bg-white p-4 shadow-lg dark:border-blue-900 dark:bg-zinc-900 sm:left-auto"
    >
      <p className="flex-1 text-sm text-zinc-700 dark:text-zinc-300">
        {t(DEFAULT_LOCALE, UI.banner.message, { lang: langName })}
      </p>
      <div className="flex shrink-0 flex-col gap-1 sm:flex-row">
        <button
          type="button"
          onClick={accept}
          className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700"
        >
          {t(DEFAULT_LOCALE, UI.banner.switch)}
        </button>
        <button
          type="button"
          onClick={dismiss}
          className="rounded-lg px-3 py-1.5 text-xs text-zinc-500 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        >
          {t(DEFAULT_LOCALE, UI.banner.dismiss)}
        </button>
      </div>
      <button
        type="button"
        onClick={dismiss}
        className="shrink-0 rounded p-1 text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800"
        aria-label="Close"
      >
        <X className="h-4 w-4" />
      </button>
    </div>
  );
}
