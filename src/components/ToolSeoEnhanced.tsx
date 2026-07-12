import Link from "next/link";
import { Check, Shield, Cpu } from "lucide-react";
import { IndustryUseCaseTabs } from "./IndustryUseCaseTabs";
import { SectionHeading } from "./SectionHeading";
import { ToolCard } from "./ToolCard";
import type { ToolConfig } from "@/lib/tools";
import { getRelatedTools } from "@/lib/tools";
import type { EnhancedToolSeo } from "@/lib/toolSeoEnhanced";
import { COMPANY } from "@/lib/site";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";

interface ToolSeoEnhancedProps {
  tool: ToolConfig;
  seo: EnhancedToolSeo;
}

export function ToolSeoEnhanced({ tool, seo }: ToolSeoEnhancedProps) {
  const related = getRelatedTools(tool.slug);
  const { sections } = seo;

  return (
    <div className="space-y-10">
      {/* Trust signals */}
      <div className="flex flex-wrap gap-2">
        {seo.trustSignals.map((label) => (
          <span
            key={label}
            className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-800 dark:border-blue-900 dark:bg-blue-950/50 dark:text-blue-200"
          >
            {label}
          </span>
        ))}
      </div>

      {/* Comparison table */}
      <section>
        <SectionHeading title="Why users choose SUHADIMG" subtitle="Feature comparison" />
        <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-zinc-800">
          <table className="w-full min-w-[280px] text-left text-sm">
            <thead>
              <tr className="border-b border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900/80">
                <th className="px-4 py-3 font-semibold text-zinc-900 dark:text-white">Feature</th>
                <th className="px-4 py-3 font-semibold text-blue-600 dark:text-blue-400">SUHADIMG</th>
              </tr>
            </thead>
            <tbody>
              {seo.comparisonFeatures.map((row) => (
                <tr
                  key={row.feature}
                  className="border-b border-zinc-100 last:border-0 dark:border-zinc-800"
                >
                  <td className="px-4 py-2.5 text-zinc-700 dark:text-zinc-300">{row.feature}</td>
                  <td className="px-4 py-2.5 text-green-600 dark:text-green-400">
                    {row.suhadimg ? "✓" : "—"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Core content */}
      <section>
        <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-white">
          What This Tool Does
        </h2>
        <p className="mb-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
          {sections.introduction}
        </p>
        <p className="leading-relaxed text-zinc-600 dark:text-zinc-400">{sections.whatItDoes}</p>
      </section>

      {/* Statistics */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
          {tool.operation === "compress" ? "Why compress images?" : "Why optimize images?"}
        </h2>
        <ul className="list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
          {seo.statistics.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      {seo.showImageSeo && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
            Image compression for SEO
          </h2>
          <p className="mb-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
            Image optimization supports search performance and user experience. Google PageSpeed
            Insights, Lighthouse, and Core Web Vitals — including Largest Contentful Paint (LCP) —
            all benefit when photos and graphics load faster.
          </p>
          <ul className="list-inside list-disc space-y-2 text-zinc-600 dark:text-zinc-400">
            {seo.imageSeoBullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      {/* How to */}
      <section>
        <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
          {sections.howToTitle}
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {seo.howToStepsSchema.map((step, i) => (
            <div key={i} className="rounded-xl bg-zinc-50 p-6 dark:bg-zinc-900/50">
              <span className="text-2xl font-bold text-blue-600">0{i + 1}</span>
              <h3 className="mt-2 text-lg font-semibold text-zinc-900 dark:text-white">{step.name}</h3>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">{step.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Supported formats */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
          Supported formats
        </h2>
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">{sections.supportedFormatsBody}</p>
        <div className="flex flex-wrap gap-2">
          {seo.supportedFormats.map((fmt) => (
            <span
              key={fmt}
              className="rounded-lg border border-zinc-200 bg-white px-3 py-1.5 text-xs font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
            >
              ✓ {fmt}
            </span>
          ))}
        </div>
      </section>

      {/* Industry use cases — interactive tabs (all panels in DOM for crawlers) */}
      <section id="industry-use-cases">
        <SectionHeading
          title="Who uses this tool?"
          subtitle="Select an industry to explore use cases"
        />
        <IndustryUseCaseTabs items={seo.industryUseCases} />
      </section>

      {/* Security */}
      <section className="rounded-2xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
        <div className="mb-3 flex items-center gap-2">
          <Shield className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Your privacy matters
          </h2>
        </div>
        <ul className="space-y-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
            HTTPS encryption on every upload and download
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
            No permanent cloud storage — files deleted automatically
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
            Temporary in-memory processing only
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
            No human access to your images
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-600" />
            No account required — minimal data collection
          </li>
        </ul>
      </section>

      {/* Technology */}
      <section>
        <div className="mb-3 flex items-center gap-2">
          <Cpu className="h-5 w-5 text-blue-600" />
          <h2 className="text-xl font-semibold text-zinc-900 dark:text-white">
            Built with modern technology
          </h2>
        </div>
        <p className="mb-3 text-sm text-zinc-600 dark:text-zinc-400">
          SUHADIMG is engineered by{" "}
          <a
            href={COMPANY.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            {COMPANY.name}
          </a>{" "}
          using production-grade tooling:
        </p>
        <div className="flex flex-wrap gap-2 text-xs font-medium text-zinc-600 dark:text-zinc-400">
          {["Next.js", "Sharp", "TypeScript", "Tailwind CSS", "Edge-ready hosting"].map((t) => (
            <span
              key={t}
              className="rounded-md border border-zinc-200 bg-white px-2.5 py-1 dark:border-zinc-700 dark:bg-zinc-900"
            >
              {t}
            </span>
          ))}
        </div>
      </section>

      {/* Why choose — 20 reasons */}
      <section>
        <SectionHeading title="Why choose SUHADIMG?" />
        <ul className="grid gap-2 sm:grid-cols-2">
          {seo.whyChoose.map((reason) => (
            <li
              key={reason}
              className="flex gap-2 text-sm text-zinc-600 dark:text-zinc-400"
            >
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-blue-600" />
              {reason}
            </li>
          ))}
        </ul>
      </section>

      {/* Related articles */}
      {seo.relatedArticles.length > 0 && (
        <section>
          <SectionHeading title="Related guides" subtitle="Learn more on the SUHADIMG blog" />
          <ul className="space-y-2">
            {seo.relatedArticles.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  {post.title} →
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Related tools — direct slug vectors for topical cluster linking */}
      {related.length > 0 && (
        <section id="related-tools">
          <SectionHeading
            title="Related tools"
            subtitle="More free image utilities on SUHADIMG"
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((t) => (
              <ToolCard key={t.slug} tool={t} compact locale={DEFAULT_LOCALE} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
