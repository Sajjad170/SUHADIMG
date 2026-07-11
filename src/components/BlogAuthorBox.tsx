import Link from "next/link";
import { COMPANY } from "@/lib/site";

export function BlogAuthorBox() {
  return (
    <aside className="mt-10 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
      <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
        Written by
      </p>
      <p className="mb-2 text-lg font-semibold text-zinc-900 dark:text-white">
        SUHADIMG Editorial Team
      </p>
      <p className="mb-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        Guides are researched, written, and reviewed by the team at{" "}
        <a
          href={COMPANY.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          {COMPANY.name}
        </a>
        . We test every workflow on suhadimg.site before publishing and update
        articles when formats or browser support changes.
      </p>
      <Link
        href="/about"
        className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-400"
      >
        About our editorial standards →
      </Link>
    </aside>
  );
}
