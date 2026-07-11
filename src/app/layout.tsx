import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Analytics } from "@/components/Analytics";
import { JsonLd } from "@/components/JsonLd";
import { ThemeProvider } from "@/components/ThemeProvider";
import { CookieConsent } from "@/components/CookieConsentLazy";
import { LanguageBanner } from "@/components/LanguageBanner";
import { HtmlLangSetter } from "@/components/HtmlLangSetter";
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
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col bg-white font-sans text-zinc-900 antialiased dark:bg-zinc-950 dark:text-zinc-100`}
      >
        <JsonLd
          data={[organizationJsonLd(), websiteJsonLd(), siteNavigationJsonLd()]}
        />
        <Analytics />
        <HtmlLangSetter />
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
