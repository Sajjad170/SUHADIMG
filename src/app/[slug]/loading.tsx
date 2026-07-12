import { UploadZoneShell } from "@/components/UploadZoneShell";

export default function ToolLoading() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
      <div className="mb-6 h-4 w-48 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
      <div className="mb-8 flex items-start gap-5">
        <div className="h-16 w-16 shrink-0 animate-pulse rounded-2xl bg-zinc-200 dark:bg-zinc-800" />
        <div className="flex-1 space-y-3">
          <div className="h-8 w-2/3 max-w-md animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
          <div className="h-4 w-full animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
          <div className="h-4 w-4/5 animate-pulse rounded bg-zinc-100 dark:bg-zinc-900" />
        </div>
      </div>
      <div className="mb-10 overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-md dark:border-zinc-800 dark:bg-zinc-900">
        <div className="border-b border-zinc-100 bg-zinc-50/80 px-6 py-3 dark:border-zinc-800 dark:bg-zinc-900/50">
          <div className="h-4 w-40 animate-pulse rounded bg-zinc-200 dark:bg-zinc-800" />
        </div>
        <div className="p-6 sm:p-8">
          <UploadZoneShell />
        </div>
      </div>
    </div>
  );
}
