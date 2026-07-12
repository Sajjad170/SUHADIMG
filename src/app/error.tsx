"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Home, RefreshCw, Wrench } from "lucide-react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:px-8">
      <p className="mb-2 text-sm font-semibold uppercase tracking-wide text-amber-600 dark:text-amber-400">
        Something went wrong
      </p>
      <h1 className="mb-4 text-3xl font-bold text-zinc-900 dark:text-white">
        Temporary Server Error
      </h1>
      <p className="mb-8 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
        SUHADIMG could not load this page right now. This is usually temporary —
        try refreshing, or return to the homepage and open the tool again.
      </p>

      <div className="mb-10 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
        >
          <RefreshCw className="h-4 w-4" aria-hidden />
          Try Again
        </button>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <Home className="h-4 w-4" aria-hidden />
          Back to Home
        </Link>
        <Link
          href="/tools"
          className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-800 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
        >
          <Wrench className="h-4 w-4" aria-hidden />
          All Tools
        </Link>
      </div>

      <p className="text-sm text-zinc-500 dark:text-zinc-400">
        If this keeps happening, your hosting server may be restarting or under
        heavy load. Wait a minute and try again, or contact{" "}
        <Link href="/contact" className="text-blue-600 hover:underline dark:text-blue-400">
          support
        </Link>
        .
      </p>
    </div>
  );
}
