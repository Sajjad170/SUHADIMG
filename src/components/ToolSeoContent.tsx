import Link from "next/link";
import { buildToolSeoSections } from "@/lib/toolSeoContent";
import { COMPANY } from "@/lib/site";
import type { ToolConfig } from "@/lib/tools";
import { getRelatedTools } from "@/lib/tools";
import type { Locale } from "@/lib/i18n/config";
import { DEFAULT_LOCALE } from "@/lib/i18n/config";
import { toolPath, localePath } from "@/lib/i18n/paths";
import type { LocalizedToolContent } from "@/lib/i18n/toolLocale";
import { ui } from "@/lib/i18n/ui";

interface ToolSeoContentProps {
  tool: ToolConfig;
  locale?: Locale;
  localized?: LocalizedToolContent;
}

export function ToolSeoContent({
  tool,
  locale = DEFAULT_LOCALE,
  localized,
}: ToolSeoContentProps) {
  const strings = ui(locale);

  if (locale !== DEFAULT_LOCALE && localized) {
    return (
      <article className="mb-10 space-y-10 text-zinc-600 dark:text-zinc-400">
        <section>
          <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-white">
            {strings.seoSections.whatItDoes}
          </h2>
          <p className="mb-4 text-base leading-relaxed">{localized.introduction}</p>
          <p className="text-base leading-relaxed">{localized.whatItDoes}</p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-white">
            {strings.seoSections.whoShouldUse}
          </h2>
          <p className="text-base leading-relaxed">{localized.whoShouldUse}</p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
            {localized.howToTitle}
          </h2>
          <ol className="list-decimal space-y-2 pl-5 text-base leading-relaxed">
            {localized.steps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
            {localized.whyTitle}
          </h2>
          <p className="text-base leading-relaxed">{localized.whyBody}</p>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
            {strings.seoSections.useCases}
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed">
            {localized.useCases.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
            {strings.seoSections.benefits}
          </h2>
          <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed">
            {localized.benefits.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
            SUHADIMG — suhadimg.site
          </h2>
          <p className="text-base leading-relaxed">
            https://suhadimg.site — {COMPANY.name}.{" "}
            <Link
              href={localePath("/tools", locale)}
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              {strings.nav.allTools}
            </Link>
          </p>
        </section>
      </article>
    );
  }

  const sections = buildToolSeoSections(tool);
  const related = getRelatedTools(tool.slug);

  return (
    <article className="mb-10 space-y-10 text-zinc-600 dark:text-zinc-400">
      <section>
        <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-white">
          What This Tool Does
        </h2>
        <p className="mb-4 text-base leading-relaxed">{sections.introduction}</p>
        <p className="text-base leading-relaxed">{sections.whatItDoes}</p>
      </section>

      <section>
        <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-white">
          Who Should Use This Tool
        </h2>
        <p className="text-base leading-relaxed">{sections.whoShouldUse}</p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
          {sections.howToTitle}
        </h2>
        <ol className="list-decimal space-y-2 pl-5 text-base leading-relaxed">
          {sections.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
          Common Use Cases
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed">
          {sections.useCases.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
          Benefits
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed">
          {sections.benefits.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
          Features
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed">
          {sections.features.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
          {sections.supportedFormatsTitle}
        </h2>
        <p className="text-base leading-relaxed">{sections.supportedFormatsBody}</p>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
          Tips for Best Results
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed">
          {sections.tips.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
          Common Mistakes to Avoid
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed">
          {sections.commonMistakes.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
          Why Choose SUHADIMG
        </h2>
        <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed">
          {sections.whyChoose.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
        <p className="mt-4 text-base leading-relaxed">
          SUHADIMG is a product of{" "}
          <a
            href={COMPANY.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            {COMPANY.name}
          </a>
          . Explore our{" "}
          <Link href="/tools" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
            full tool list
          </Link>
          , browse the{" "}
          <Link href="/site-map" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
            sitemap
          </Link>
          , or read guides on the{" "}
          <Link href="/blog" className="font-medium text-blue-600 hover:underline dark:text-blue-400">
            SUHADIMG blog
          </Link>
          .
        </p>
      </section>

      {related.length > 0 && (
        <section>
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
            Related Tools
          </h2>
          <p className="mb-3 text-base leading-relaxed">
            Need something else? Try these popular SUHADIMG tools:
          </p>
          <ul className="list-disc space-y-2 pl-5 text-base leading-relaxed">
            {related.map((t) => (
              <li key={t.slug}>
                <Link
                  href={toolPath(t.slug, locale)}
                  className="font-medium text-blue-600 hover:underline dark:text-blue-400"
                >
                  {t.title}
                </Link>
                {" — "}
                {t.metaDescription}
              </li>
            ))}
          </ul>
        </section>
      )}
    </article>
  );
}
