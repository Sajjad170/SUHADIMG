import type { ToolFAQ } from "@/lib/tools";

interface FaqAccordionProps {
  faqs: ToolFAQ[];
  id?: string;
}

/** Always-visible FAQ — full answers in HTML for crawlers and AdSense review. */
export function FaqAccordion({ faqs, id = "faq" }: FaqAccordionProps) {
  return (
    <div
      id={id}
      className="rounded-xl border border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900"
    >
      <dl className="divide-y divide-zinc-200 dark:divide-zinc-800">
        {faqs.map((faq, index) => (
          <div key={`${faq.question}-${index}`} className="px-5 py-4">
            <dt className="font-medium text-zinc-900 dark:text-white">
              {faq.question}
            </dt>
            <dd className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {faq.answer}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
