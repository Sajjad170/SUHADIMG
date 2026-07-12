import { HomeToolsGrid } from "@/components/HomeToolsGrid";
import { CategoryToolsSection } from "@/components/CategoryToolsSection";
import { JsonLd } from "@/components/JsonLd";
import { LogoWithName } from "@/components/Logo";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { ComingSoonSection } from "@/components/ComingSoonSection";
import { blogPosts } from "@/lib/blogPosts";
import { getHomeMetadata } from "@/lib/seo";
import { homepageJsonLdGraph } from "@/lib/structuredData";
import { GLOBAL_FAQS } from "@/lib/globalFaqs";
import { Zap, Shield, Globe, Sparkles, Lock } from "lucide-react";

export const metadata = getHomeMetadata();

export default function HomePage() {
  return (
    <>
      <JsonLd data={homepageJsonLdGraph()} />

      <section className="px-4 pb-2 pt-6 sm:px-6 sm:pt-8 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <LogoWithName variant="hero" priority className="mb-3" />
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
            Free Online Image Converter & Editor Tool
          </h1>
          <p className="max-w-2xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            SUHADIMG is a free online image converter and editor — compress,
            resize, crop, and convert JPG, PNG, WebP, GIF, HEIC, and more in
            your browser. No signup required.
          </p>
        </div>
      </section>

      <section
        aria-labelledby="all-tools-heading"
        className="mx-auto max-w-6xl px-4 pb-4 pt-2 sm:px-6 lg:px-8"
      >
        <h2
          id="all-tools-heading"
          className="sr-only"
        >
          Free Online Image Tools
        </h2>
        <HomeToolsGrid />
        <div className="mt-8">
          <CategoryToolsSection headingLevel="h3" />
        </div>
      </section>

      {/* Trust badges */}
      <section
        aria-labelledby="why-choose-heading"
        className="mx-auto max-w-6xl px-4 pb-6 sm:px-6 lg:px-8"
      >
        <h2
          id="why-choose-heading"
          className="mb-4 text-center text-xl font-bold text-zinc-900 dark:text-white"
        >
          Why Choose SUHADIMG
        </h2>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
          {[
            { icon: Zap, title: "Lightning Fast", desc: "Instant Sharp processing" },
            { icon: Shield, title: "100% Secure", desc: "Files deleted immediately" },
            { icon: Globe, title: "Works Everywhere", desc: "Any device, any browser" },
            { icon: Sparkles, title: "Always Free", desc: "No watermark, no signup" },
          ].map(({ icon: Icon, title, desc }) => (
            <div
              key={title}
              className="flex items-center gap-2.5 rounded-xl border border-zinc-200 bg-white px-3 py-2.5 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-950">
                <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="min-w-0">
                <h3 className="truncate text-sm font-semibold text-zinc-900 dark:text-white">
                  {title}
                </h3>
                <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO content sections */}
      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
            How to Convert Images Online
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Upload your file, choose a tool — convert PNG to JPG, compress images,
            resize for social media, or crop and edit — then download instantly.
            SUHADIMG supports batch processing with no signup and no watermarks.
          </p>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">
                Supported Formats
              </h3>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                JPG, JPEG, PNG, WebP, GIF, BMP, TIFF, SVG, HEIC, AVIF, and ICO.
                Convert between formats, compress to reduce file size, or resize for
                Instagram, Facebook, YouTube, and passport photos.
              </p>
            </div>
            <div>
              <h3 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">
                Features
              </h3>
              <ul className="list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                <li>Free batch image converter — download as ZIP</li>
                <li>Privacy-first — files deleted immediately</li>
                <li>Mobile-friendly with dark mode</li>
                <li>46+ tools: compress, resize, crop, edit and more</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8 [content-visibility:auto] [contain-intrinsic-size:auto_400px]">
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
          <SectionHeading title="From the Blog" subtitle="Guides and tips for better images" />
          <div className="grid gap-3 sm:grid-cols-3">
            {blogPosts.slice(0, 3).map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                prefetch
                className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800"
              >
                <span className="text-[10px] font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
                  {post.category}
                </span>
                <h3 className="mt-1 text-sm font-semibold text-zinc-900 dark:text-white">
                  {post.title}
                </h3>
                <p className="mt-1 line-clamp-2 text-xs text-zinc-600 dark:text-zinc-400">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
          <div className="mt-4 text-center">
            <Link
              href="/blog"
              prefetch
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
            >
              View all articles →
            </Link>
          </div>
        </div>
      </section>

      {/* Homepage Detailed Copy / Helpful Content */}
      <section className="mx-auto max-w-6xl px-4 pb-8 sm:px-6 lg:px-8 [content-visibility:auto] [contain-intrinsic-size:auto_400px]">
        <div className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900 sm:p-8">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
            About the SUHADIMG Image Platform
          </h2>
          <p className="mb-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            SUHADIMG is your all-in-one web platform for batch image processing. Whether you need to compress large photo files to fit email limits, crop design files for social media dimensions, convert modern WebP images to universal JPG format, or edit visual assets on the go, our suite offers production-grade speed without compromising privacy.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <h3 className="mb-2 font-semibold text-zinc-900 dark:text-white">
                ⚡ Lightning-Fast Sharp Processing
              </h3>
              <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                Unlike client-side JavaScript tools that crash on large camera exports, our backend leverages the multi-threaded Sharp library to compress, convert, or resize images instantly.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-zinc-900 dark:text-white">
                Privacy and Data Security First
              </h3>
              <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                Your images are processed purely in-memory. We enforce automatic file deletion, zero tracking databases, and use complete HTTPS encryption. No registration or payment is required.
              </p>
            </div>
            <div>
              <h3 className="mb-2 font-semibold text-zinc-900 dark:text-white">
                Perfect for Social Media and Web Developers
              </h3>
              <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                Convert or resize screenshots to standard social network ratios (Instagram, Facebook, X), or export next-gen WebP formats to pass Google Lighthouse Core Web Vitals checks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Trust Standards Section */}
      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8 [content-visibility:auto] [contain-intrinsic-size:auto_250px]">
        <div className="rounded-2xl border border-zinc-200 bg-gradient-to-r from-zinc-50 to-blue-50/20 p-6 dark:border-zinc-800 dark:from-zinc-900 dark:to-blue-950/10 sm:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="space-y-2">
              <h2 className="text-lg font-bold text-zinc-900 dark:text-white sm:text-xl">
                Security and Trust Standards
              </h2>
              <p className="max-w-xl text-xs text-zinc-500 dark:text-zinc-400">
                SUHADIMG utilizes industry-leading safety protocols. Your privacy is guaranteed through local memory processing, secure HTTPS transmissions, and automatic file deletion.
              </p>
            </div>
            <div className="flex flex-wrap gap-3 text-xs font-semibold text-zinc-700 dark:text-zinc-300">
              <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800">
                <Shield className="h-4 w-4 text-green-600 dark:text-green-400" />
                <span>GDPR and Privacy Compliant</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800">
                <Lock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                <span>HTTPS SSL Secure Encryption</span>
              </div>
              <div className="flex items-center gap-1.5 rounded-lg border border-zinc-200 bg-white px-3 py-2 dark:border-zinc-700 dark:bg-zinc-800">
                <Zap className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                <span>ISO 27001 Security Principles</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        aria-labelledby="faq-heading"
        className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8"
      >
        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50 sm:p-8">
          <h2
            id="faq-heading"
            className="mb-6 text-xl font-bold text-zinc-900 dark:text-white"
          >
            Frequently Asked Questions
          </h2>
          <dl className="space-y-5">
            {GLOBAL_FAQS.map((faq) => (
              <div key={faq.question}>
                <dt className="mb-1 text-sm font-semibold text-zinc-900 dark:text-white">
                  {faq.question}
                </dt>
                <dd className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {faq.answer}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <ComingSoonSection />
    </>
  );
}
