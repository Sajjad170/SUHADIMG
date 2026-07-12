import Link from "next/link";
import { Shield, Zap, Lock } from "lucide-react";
import { ImageUploader } from "./ImageUploader";
import { JsonLd } from "./JsonLd";
import { ToolCard } from "./ToolCard";
import { ToolSeoContent } from "./ToolSeoContent";
import { ToolSeoEnhanced } from "./ToolSeoEnhanced";
import { FaqAccordion } from "./FaqAccordion";
import { SectionHeading } from "./SectionHeading";
import type { ToolConfig } from "@/lib/tools";
import { getRelatedTools } from "@/lib/tools";
import { getToolVisual } from "@/lib/toolVisuals";
import type { Locale } from "@/lib/i18n/config";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { localePath, toolPath } from "@/lib/i18n/paths";
import { getLocalizedTool } from "@/lib/i18n/toolLocale";
import { buildEnhancedToolSeo, categoryBreadcrumbLabel } from "@/lib/toolSeoEnhanced";
import { buildToolSeoSections } from "@/lib/toolSeoContent";
import { howToStepsForSchema } from "@/lib/toolCopyOverrides";
import { ui } from "@/lib/i18n/ui";
import { toolPageJsonLdGraph } from "@/lib/structuredData";

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
  const isEnglish = locale === DEFAULT_LOCALE;
  const enhancedSeo = isEnglish ? buildEnhancedToolSeo(tool) : null;
  const allFaqs = enhancedSeo?.allFaqs ?? localized.faqs;
  const introText = enhancedSeo?.richIntroduction ?? localized.description;
  const categoryLabel = isEnglish ? categoryBreadcrumbLabel(tool) : localized.categoryLabel;
  const howToSchemaSteps =
    enhancedSeo?.howToStepsSchema ??
    howToStepsForSchema(tool, buildToolSeoSections(tool).steps);

  return (
    <>
      <JsonLd data={toolPageJsonLdGraph(tool, allFaqs, howToSchemaSteps)} />
      <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <nav className="mb-6 text-sm text-zinc-500 dark:text-zinc-400" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <li>
              <Link
                href={localePath("/", locale)}
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                {strings.toolPage.home}
              </Link>
            </li>
            <li aria-hidden="true" className="text-zinc-400">
              /
            </li>
            <li>
              <Link
                href={localePath("/tools", locale)}
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                {categoryLabel}
              </Link>
            </li>
            <li aria-hidden="true" className="text-zinc-400">
              /
            </li>
            <li>
              <Link
                href={toolPath(tool.slug, locale)}
                className="font-medium text-zinc-900 hover:text-blue-600 dark:text-white dark:hover:text-blue-400"
                aria-current="page"
              >
                {localized.shortTitle}
              </Link>
            </li>
          </ol>
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
              {introText}
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

        {enhancedSeo ? (
          <div className="[content-visibility:auto] [contain-intrinsic-size:auto_1200px]">
            <ToolSeoEnhanced tool={tool} seo={enhancedSeo} />
          </div>
        ) : (
          <div className="[content-visibility:auto] [contain-intrinsic-size:auto_800px]">
            <ToolSeoContent tool={tool} locale={locale} localized={localized} />
          </div>
        )}

        <section
          className="mb-10 mt-10 [content-visibility:auto] [contain-intrinsic-size:auto_600px]"
          aria-labelledby="tool-faq-heading"
        >
          <SectionHeading id="tool-faq-heading" title={strings.toolPage.faqTitle} />
          <FaqAccordion faqs={allFaqs} id="faq" />
        </section>

        {!enhancedSeo && related.length > 0 && (
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
