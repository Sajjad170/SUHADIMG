import Link from "next/link";
import { Shield, Zap, Lock } from "lucide-react";
import { ImageUploader } from "./ImageUploaderLazy";
import { JsonLd } from "./JsonLd";
import { ToolCard } from "./ToolCard";
import { ToolSeoContent } from "./ToolSeoContent";
import { SectionHeading } from "./SectionHeading";
import { GLOBAL_FAQS } from "@/lib/globalFaqs";
import type { ToolConfig } from "@/lib/tools";
import { getRelatedTools } from "@/lib/tools";
import { getToolVisual } from "@/lib/toolVisuals";
import type { Locale } from "@/lib/i18n/config";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { localePath } from "@/lib/i18n/paths";
import { getLocalizedTool } from "@/lib/i18n/toolLocale";
import { ui } from "@/lib/i18n/ui";
import {
  toolBreadcrumbJsonLd,
  toolFaqJsonLd,
  toolSoftwareApplicationJsonLd,
} from "@/lib/structuredData";

interface ToolPageContentProps {
  tool: ToolConfig;
  locale?: Locale;
}

export function ToolPageContent({
  tool,
  locale = DEFAULT_LOCALE,
}: ToolPageContentProps) {
  const related = getRelatedTools(tool.slug);
  const visual = getToolVisual(tool.slug, tool.category);
  const Icon = visual.icon;
  const localized = getLocalizedTool(tool, locale);
  const strings = ui(locale);
  const allFaqs =
    locale === DEFAULT_LOCALE
      ? [...tool.faqs, ...GLOBAL_FAQS]
      : localized.faqs;

  return (
    <>
      <JsonLd
        data={[
          toolSoftwareApplicationJsonLd(tool),
          toolBreadcrumbJsonLd(tool),
          toolFaqJsonLd({ ...tool, faqs: allFaqs }),
        ]}
      />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <nav className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
          <Link
            href={localePath("/", locale)}
            className="hover:text-blue-600 dark:hover:text-blue-400"
          >
            {strings.toolPage.home}
          </Link>
          <span className="mx-2">/</span>
          <span>{localized.categoryLabel}</span>
          <span className="mx-2">/</span>
          <span className="text-zinc-900 dark:text-white">{localized.shortTitle}</span>
        </nav>

        <div className="mb-8 flex items-start gap-5">
          <div
            className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl shadow-sm ${visual.iconBg}`}
          >
            <Icon className={`h-8 w-8 ${visual.iconColor}`} strokeWidth={1.75} />
          </div>
          <div>
            <div className="mb-1 flex items-center gap-2">
              <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
                {localized.title}
              </h1>
              {visual.isNew && (
                <span className="rounded-md bg-blue-500 px-2 py-0.5 text-[10px] font-bold uppercase text-white">
                  New
                </span>
              )}
            </div>
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
              {localized.description}
            </p>
          </div>
        </div>

        <div className="mb-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-md dark:border-zinc-800 dark:bg-zinc-900">
          <div className="border-b border-zinc-100 bg-zinc-50/80 px-6 py-3 dark:border-zinc-800 dark:bg-zinc-900/50">
            <p className="text-sm font-medium text-zinc-600 dark:text-zinc-400">
              {strings.toolPage.dropHint}
            </p>
          </div>
          <div className="p-6 sm:p-8">
            <ImageUploader tool={tool} />
          </div>
        </div>

        <div className="mb-10 grid gap-4 sm:grid-cols-3">
          {[
            { icon: Zap, title: strings.toolPage.fast, desc: strings.toolPage.fastDesc },
            { icon: Lock, title: strings.toolPage.private, desc: strings.toolPage.privateDesc },
            { icon: Shield, title: strings.toolPage.free, desc: strings.toolPage.freeDesc },
          ].map(({ icon: BadgeIcon, title, desc }) => (
            <div
              key={title}
              className="flex items-start gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
            >
              <BadgeIcon className="mt-0.5 h-5 w-5 shrink-0 text-blue-600" />
              <div>
                <p className="font-semibold text-zinc-900 dark:text-white">{title}</p>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <ToolSeoContent tool={tool} locale={locale} localized={localized} />

        <section className="mb-10">
          <SectionHeading title={strings.toolPage.faqTitle} />
          <div className="space-y-3">
            {allFaqs.map((faq, i) => (
              <details
                key={i}
                className="group overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900"
              >
                <summary className="cursor-pointer px-5 py-4 font-medium text-zinc-900 marker:content-none hover:bg-zinc-50 dark:text-white dark:hover:bg-zinc-800/50">
                  {faq.question}
                </summary>
                <p className="border-t border-zinc-100 px-5 py-4 text-sm leading-relaxed text-zinc-600 dark:border-zinc-800 dark:text-zinc-400">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {related.length > 0 && (
          <section>
            <SectionHeading
              title={strings.toolPage.relatedTitle}
              subtitle={strings.toolPage.relatedSubtitle}
            />
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((t) => (
                <ToolCard key={t.slug} tool={t} compact locale={locale} />
              ))}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
