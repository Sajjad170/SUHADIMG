import type { Metadata } from "next";
import { headers } from "next/headers";
import { Geist } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { FirebaseAnalytics } from "@/components/FirebaseAnalytics";
import { JsonLd } from "@/components/JsonLd";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CookieConsent } from "@/components/CookieConsentLazy";
import { LanguageBanner } from "@/components/LanguageBannerLazy";
import { SiteDecorations } from "@/components/SiteDecorations";
import { SITE_NAME } from "@/lib/seo";
import { ADSENSE_CLIENT_ID } from "@/lib/adsense";
import { siteRootJsonLd } from "@/lib/structuredData";
import { isLocale, type Locale } from "@/lib/i18n/config";
import "./globals.css";

/** Keep CDN HTML cache short so redeploys don't serve stale CSS chunk URLs. */
export const revalidate = 300;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://suhadimg.site"
  ),
  title: {
    default: "Free Online Image Converter & Editor Tool | SUHADIMG",
    template: `%s | ${SITE_NAME}`,
  },
  description:
    "Free online image tools by SUHADIMG — compress, convert, resize, crop, and edit images in your browser.",
  verification: {
    google: "dpW8D8FVtrz2NhNSZFpZWUbFwZQRVp22eU8FHfDWmd8",
  },
  other: {
    "google-adsense-account": ADSENSE_CLIENT_ID,
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "48x48" }],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
  },
};

const HTML_LANG: Record<Locale, string> = {
  en: "en",
  es: "es",
  ja: "ja",
  de: "de",
  fr: "fr",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const headersList = await headers();
  const localeHeader = headersList.get("x-locale") ?? "en";
  const locale = isLocale(localeHeader) ? localeHeader : "en";
  const htmlLang = HTML_LANG[locale];

  return (
    <html lang={htmlLang} suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content={ADSENSE_CLIENT_ID} />
        <script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} flex min-h-screen flex-col bg-white font-sans text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100`}
      >
        <script
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("suhadimg-theme");if(t==="dark"){document.documentElement.classList.add("dark")}else{document.documentElement.classList.remove("dark");if(t==="system"){localStorage.setItem("suhadimg-theme","light")}}}catch(e){}})();`,
          }}
        />
        <JsonLd data={siteRootJsonLd()} />
        <Analytics />
        <FirebaseAnalytics />
        <SiteDecorations />
        <ThemeProvider>
          <Header />
          <main className="relative flex-1">{children}</main>
          <Footer />
          <CookieConsent />
          <LanguageBanner />
        </ThemeProvider>
      </body>
    </html>
  );
}
