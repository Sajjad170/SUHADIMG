import Link from "next/link";
import type { Metadata } from "next";
import { Home, Search } from "lucide-react";
import { getPopularTools } from "@/lib/tools";
import { homeTools } from "@/lib/homepageTools";

export const metadata: Metadata = {
  title: "Page Not Found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const popular = getPopularTools().slice(0, 6);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-blue-600 dark:text-blue-400">
        404
      </p>
      <h1 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-white">
        Page Not Found
      </h1>
      <p className="mb-8 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        The page you are looking for does not exist or may have moved. Try one of
        our free image tools or return to the homepage.
      </p>

      <div className="mb-10 flex flex-wrap gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <Home className="h-4 w-4" aria-hidden />
          Back to Home
        </Link>
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <Search className="h-4 w-4" aria-hidden />
          All Tools
        </Link>
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          Blog
        </Link>
      </div>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
          Popular Tools
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {popular.map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/${tool.slug}`}
                className="block rounded-lg border border-zinc-200 px-4 py-3 text-sm font-medium text-blue-600 hover:bg-zinc-50 dark:border-zinc-800 dark:text-blue-400 dark:hover:bg-zinc-900"
              >
                {tool.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
          Featured Tools
        </h2>
        <ul className="flex flex-wrap gap-2">
          {homeTools.slice(0, 8).map((tool) => (
            <li key={tool.slug}>
              <Link
                href={`/${tool.slug}`}
                className="rounded-full border border-zinc-200 px-3 py-1.5 text-xs font-medium text-zinc-700 hover:border-blue-300 hover:text-blue-600 dark:border-zinc-700 dark:text-zinc-300 dark:hover:text-blue-400"
              >
                {tool.titlePrefix}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
