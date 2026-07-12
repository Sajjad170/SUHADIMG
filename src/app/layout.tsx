import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CookieConsent } from "@/components/CookieConsentLazy";
import { LanguageBanner } from "@/components/LanguageBannerLazy";
import { HtmlLangSetter } from "@/components/HtmlLangSetter";
import { SiteDecorations } from "@/components/SiteDecorations";
import { getHomeMetadata, SITE_NAME } from "@/lib/seo";
import {
  organizationJsonLd,
  siteNavigationJsonLd,
  websiteJsonLd,
} from "@/lib/structuredData";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  ...getHomeMetadata(),
  title: {
    default: `${SITE_NAME} | The fastest free web app for easy image modification.`,
    template: `%s | ${SITE_NAME}`,
  },
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://suhadimg.site"
  ),
  verification: {
    google: "dpW8D8FVtrz2NhNSZFpZWUbFwZQRVp22eU8FHfDWmd8",
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png", type: "image/png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preload" href="/logo.png" as="image" type="image/png" fetchPriority="high" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("suhadimg-theme");if(t==="dark"){document.documentElement.classList.add("dark")}else{document.documentElement.classList.remove("dark");if(t==="system"){localStorage.setItem("suhadimg-theme","light")}}}catch(e){}})();`,
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} flex min-h-screen flex-col bg-white font-sans text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100`}
      >
        <JsonLd
          data={[organizationJsonLd(), websiteJsonLd(), siteNavigationJsonLd()]}
        />
        <Analytics />
        <HtmlLangSetter />
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
