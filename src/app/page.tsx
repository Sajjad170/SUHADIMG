import { HomeToolsGrid } from "@/components/HomeToolsGrid";
import { CategoryToolsSection } from "@/components/CategoryToolsSection";
import { JsonLd } from "@/components/JsonLd";
import { LogoWithName } from "@/components/Logo";
import Link from "next/link";
import { SectionHeading } from "@/components/SectionHeading";
import { ComingSoonSection } from "@/components/ComingSoonSection";
import { blogPosts } from "@/lib/blogPosts";
import { getHomeMetadata } from "@/lib/seo";
import { homepageItemListJsonLd } from "@/lib/structuredData";
import { Zap, Shield, Globe, Sparkles } from "lucide-react";

export const metadata = getHomeMetadata();

export default function HomePage() {
  return (
    <>
      <JsonLd data={homepageItemListJsonLd()} />

      <section className="px-4 pb-2 pt-8 sm:px-6 sm:pt-10 lg:px-8">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <LogoWithName variant="hero" priority className="mb-4" />
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
            Free Image Converter Online
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            Convert, compress, resize &amp; edit — 100% free, no signup, files deleted instantly.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-4 pt-2 sm:px-6 lg:px-8">
        <HomeToolsGrid />
      </section>

      {/* All tools by category — iloveimg-style cards directly under featured grid */}
      <section className="mx-auto max-w-6xl border-t border-zinc-200 px-4 py-10 sm:px-6 lg:px-8 dark:border-zinc-800 [content-visibility:auto] [contain-intrinsic-size:auto_900px]">
        <CategoryToolsSection />
      </section>

      {/* Trust badges */}
      <section className="mx-auto max-w-6xl px-4 pb-6 sm:px-6 lg:px-8 [content-visibility:auto] [contain-intrinsic-size:auto_200px]">
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
                <h3 className="truncate text-xs font-semibold text-zinc-900 dark:text-white">
                  {title}
                </h3>
                <p className="truncate text-[10px] text-zinc-500 dark:text-zinc-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SEO content sections */}
      <section className="mx-auto max-w-6xl px-4 pb-10 sm:px-6 lg:px-8 [content-visibility:auto] [contain-intrinsic-size:auto_500px]">
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
              <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">
                Supported Formats
              </h2>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                JPG, JPEG, PNG, WebP, GIF, BMP, TIFF, SVG, HEIC, AVIF, and ICO.
                Convert between formats, compress to reduce file size, or resize for
                Instagram, Facebook, YouTube, and passport photos.
              </p>
            </div>
            <div>
              <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">
                Features
              </h2>
              <ul className="list-inside list-disc space-y-1 text-sm text-zinc-600 dark:text-zinc-400">
                <li>Free batch image converter — download as ZIP</li>
                <li>Privacy-first — files deleted immediately</li>
                <li>Mobile-friendly with dark mode</li>
                <li>46+ tools: compress, resize, crop, edit &amp; more</li>
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

      <ComingSoonSection />
    </>
  );
}
