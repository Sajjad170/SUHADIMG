export const LOCALES = ["en", "es", "ja", "de", "fr"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

export const LOCALE_NAMES: Record<Locale, string> = {
  en: "English",
  es: "Español",
  ja: "日本語",
  de: "Deutsch",
  fr: "Français",
};

export const LOCALE_OG: Record<Locale, string> = {
  en: "en_US",
  es: "es_ES",
  ja: "ja_JP",
  de: "de_DE",
  fr: "fr_FR",
};

/** BCP 47 hreflang values for alternates.languages metadata */
export const HREFLANG_CODES: Record<Locale, string> = {
  en: "en",
  es: "es-ES",
  ja: "ja-JP",
  de: "de-DE",
  fr: "fr-FR",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}
