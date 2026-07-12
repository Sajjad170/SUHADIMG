import Link from "next/link";
import { ArrowLeft, Clock } from "lucide-react";
import { SectionHeading } from "@/components/SectionHeading";
import type { ComingSoonTool } from "@/lib/comingSoonTools";
import type { ComingSoonArticle } from "@/lib/comingSoonContent";

interface ComingSoonPageContentProps {
  tool: ComingSoonTool;
  article: ComingSoonArticle;
}

export function ComingSoonPageContent({ tool, article }: ComingSoonPageContentProps) {
  const Icon = tool.icon;

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6 lg:px-8">
      <Link
        href="/"
        className="mb-6 inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <div className="mb-8 flex items-start gap-4">
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 dark:bg-blue-950">
          <Icon className="h-7 w-7 text-blue-600 dark:text-blue-400" />
        </div>
        <div>
          <div className="mb-2 inline-flex items-center gap-2 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-900 dark:bg-amber-950 dark:text-amber-200">
            <Clock className="h-3.5 w-3.5" />
            Coming soon
          </div>
          <h1 className="text-3xl font-bold text-zinc-900 dark:text-white">{tool.title}</h1>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">{article.intro}</p>
        </div>
      </div>

      <div className="mb-10 rounded-2xl border border-dashed border-blue-300 bg-blue-50/80 p-6 text-center dark:border-blue-800 dark:bg-blue-950/30">
        <p className="text-sm font-medium text-blue-900 dark:text-blue-200">
          This tool is not live yet. Explore{" "}
          <Link href="/tools" className="underline hover:text-blue-700">
            46+ free tools
          </Link>{" "}
          on suhadimg.site while we finish development.
        </p>
      </div>

      <article className="space-y-10 text-zinc-600 dark:text-zinc-400">
        {article.sections.map((section) => (
          <section key={section.heading}>
            <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
              {section.heading}
            </h2>
            {section.paragraphs.map((p, i) => (
              <p key={i} className="mb-4 leading-relaxed">
                {p}
              </p>
            ))}
            {section.list && (
              <ul className="list-inside list-disc space-y-2 pl-1">
                {section.list.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </article>

      <section className="mt-12">
        <SectionHeading title="Frequently Asked Questions" />
        <div className="space-y-3">
          {article.faqs.map((faq) => (
            <details
              key={faq.question}
              className="overflow-hidden rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
            >
              <summary className="cursor-pointer px-5 py-4 font-medium text-zinc-900 marker:content-none dark:text-white">
                {faq.question}
              </summary>
              <p className="border-t border-zinc-100 px-5 py-4 text-sm leading-relaxed dark:border-zinc-800">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </section>

      <p className="mt-12 border-t border-zinc-200 pt-8 text-center text-sm text-zinc-500 dark:border-zinc-800">
        Your trusted online image editor, loved by users worldwide —{" "}
        <strong className="text-zinc-700 dark:text-zinc-300">SUHADIMG</strong>
      </p>
    </div>
  );
}
