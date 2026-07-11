"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { parseLocalePath } from "@/lib/i18n/paths";

/** Updates document lang for localized routes without forcing dynamic rendering. */
export function HtmlLangSetter() {
  const pathname = usePathname();

  useEffect(() => {
    const { locale } = parseLocalePath(pathname);
    document.documentElement.lang = locale;
  }, [pathname]);

  return null;
}
