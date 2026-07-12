import type { ToolFAQ } from "@/lib/tools";

interface FaqAccordionProps {
  faqs: ToolFAQ[];
  id?: string;
}

/** Semantic FAQ accordion — visible answers match FAQPage JSON-LD exactly. */
export function FaqAccordion({ faqs, id = "faq" }: FaqAccordionProps) {
  return (
    <div id={id} className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
      {faqs.map((faq, index) => (
        <details
          key={`${faq.question}-${index}`}
          className="group border-b border-zinc-200 px-5 py-3 last:border-b-0 dark:border-zinc-800"
        >
          <summary className="cursor-pointer font-medium text-zinc-900 marker:content-none hover:text-blue-600 dark:text-white dark:hover:text-blue-400">
            {faq.question}
          </summary>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {faq.answer}
          </p>
        </details>
      ))}
    </div>
  );
}
