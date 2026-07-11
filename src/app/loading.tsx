export default function Loading() {
  return (
    <div className="mx-auto max-w-4xl animate-pulse px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 h-9 w-56 rounded-lg bg-zinc-200 dark:bg-zinc-800" />
      <div className="mb-4 h-4 w-full max-w-2xl rounded bg-zinc-100 dark:bg-zinc-900" />
      <div className="mb-8 h-4 w-3/4 max-w-xl rounded bg-zinc-100 dark:bg-zinc-900" />
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
          >
            <div className="mb-3 h-4 w-32 rounded bg-zinc-100 dark:bg-zinc-900" />
            <div className="mb-2 h-6 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800" />
            <div className="h-4 w-full rounded bg-zinc-100 dark:bg-zinc-900" />
          </div>
        ))}
      </div>
    </div>
  );
}
