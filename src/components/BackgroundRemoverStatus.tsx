export function BackgroundRemoverStatus() {
  return (
    <div className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
      <strong className="font-semibold text-zinc-900 dark:text-white">
        AI background remover
      </strong>
      <span className="ml-1">
        — Upload your photo, then click Remove Background. Uses GPU acceleration when
        available for faster results.
      </span>
    </div>
  );
}
