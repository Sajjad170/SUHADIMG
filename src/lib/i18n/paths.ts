import { DEFAULT_LOCALE, isLocale, type Locale } from "./config";

/** Build a path with optional locale prefix (English uses no prefix). */
export function localePath(path: string, locale: Locale = DEFAULT_LOCALE): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (locale === DEFAULT_LOCALE) return normalized;
  return normalized === "/" ? `/${locale}` : `/${locale}${normalized}`;
}

export function toolPath(slug: string, locale: Locale = DEFAULT_LOCALE): string {
  return localePath(`/${slug}`, locale);
}

/** Parse pathname into locale + path without locale prefix. */
export function parseLocalePath(pathname: string): {
  locale: Locale;
  pathWithoutLocale: string;
} {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  if (first && isLocale(first)) {
    const rest = segments.slice(1).join("/");
    return { locale: first, pathWithoutLocale: rest ? `/${rest}` : "/" };
  }
  return { locale: DEFAULT_LOCALE, pathWithoutLocale: pathname || "/" };
}
