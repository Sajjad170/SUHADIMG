import { LOCALES, HREFLANG_CODES } from "./config";
import { localePath } from "./paths";

const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://suhadimg.site"
).replace(/\/$/, "");

/** Build hreflang map for Next.js metadata alternates.languages */
export function buildHreflangAlternates(
  pathWithoutLocale: string
): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const locale of LOCALES) {
    languages[HREFLANG_CODES[locale]] =
      `${SITE_URL}${localePath(pathWithoutLocale, locale)}`;
  }
  languages["x-default"] = `${SITE_URL}${localePath(pathWithoutLocale, "en")}`;
  return languages;
}
