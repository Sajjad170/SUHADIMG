import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { comingSoonTools } from "@/lib/comingSoonTools";

function CardIllustration({ type }: { type: "pdf" | "ai" | "api" }) {
  if (type === "pdf") {
    return (
      <div className="relative mx-auto h-32 w-44">
        <div className="absolute inset-0 rounded-lg bg-white shadow-md">
          <div className="border-b border-zinc-200 px-3 py-2 text-[10px] font-bold text-zinc-400">
            DOCUMENT
          </div>
          <div className="space-y-1.5 p-3">
            <div className="h-1.5 w-full rounded bg-blue-200" />
            <div className="h-1.5 w-4/5 rounded bg-zinc-200" />
            <div className="h-1.5 w-full rounded bg-zinc-200" />
            <div className="mt-2 flex gap-1">
              <div className="h-8 w-8 rounded bg-blue-500/20" />
              <div className="h-8 flex-1 rounded bg-blue-100" />
            </div>
          </div>
        </div>
        <div className="absolute -right-2 -top-2 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 text-xs font-bold text-white shadow">
          JPG
        </div>
      </div>
    );
  }
  if (type === "ai") {
    return (
      <div className="relative mx-auto h-32 w-36">
        <div className="overflow-hidden rounded-2xl bg-white p-1 shadow-md">
          <div className="relative h-28 rounded-xl bg-gradient-to-br from-zinc-200 to-zinc-300">
            <div className="absolute inset-x-3 top-6 h-0.5 bg-blue-500/80 shadow-[0_0_8px_#3b82f6]" />
            <div className="absolute bottom-2 left-2 rounded bg-blue-600 px-1.5 py-0.5 text-[8px] font-bold text-white">
              AI
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="relative mx-auto h-32 w-44">
      <div className="overflow-hidden rounded-lg bg-zinc-900 p-2 shadow-md">
        <div className="space-y-1 font-mono text-[8px] leading-tight">
          <p className="text-purple-400">POST /api/v1/resize</p>
          <p className="text-green-400">{"{ ok: true }"}</p>
          <p className="text-zinc-500">{"// batch: 50 images"}</p>
        </div>
      </div>
      <div className="absolute -bottom-1 -right-1 h-12 w-12 rounded-lg border-2 border-white bg-blue-500 shadow" />
    </div>
  );
}

export function ComingSoonSection() {
  return (
    <section className="relative overflow-hidden border-t border-blue-100/80 bg-white/60 py-16 backdrop-blur-[2px] dark:border-blue-950 dark:bg-zinc-950/50 sm:py-20">
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="mb-10 text-center text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-3xl">
          Work your way
        </h2>

        <div className="grid gap-6 sm:grid-cols-3">
          {comingSoonTools.map((tool) => {
            const Icon = tool.icon;
            return (
              <Link
                key={tool.slug}
                href={`/coming-soon/${tool.slug}`}
                aria-label={tool.cardTitle}
                className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-blue-800"
              >
                <div
                  className={`flex min-h-[160px] items-center justify-center bg-gradient-to-br ${tool.accent} p-6`}
                >
                  <CardIllustration type={tool.illustration} />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      Coming soon
                    </span>
                    <Icon className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="mb-2 text-base font-bold text-zinc-900 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                    {tool.cardTitle}
                  </h3>
                  <p className="mb-4 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {tool.cardDescription}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 dark:text-blue-400">
                    Learn more
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </Link>
            );
          })}
        </div>

        <div className="mt-14 flex flex-col items-center text-center">
          <div className="mb-4 h-px w-full max-w-md bg-gradient-to-r from-transparent via-blue-300 to-transparent dark:via-blue-700" />
          <p className="max-w-2xl text-base font-medium text-zinc-700 dark:text-zinc-300 sm:text-lg">
            Your trusted online image editor, loved by users worldwide
          </p>
          <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
            SUHADIMG · suhadimg.site · Free tools with no watermark
          </p>
        </div>
      </div>
    </section>
  );
}
