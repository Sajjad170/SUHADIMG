/** Minimal site-wide accents — soft wash + a few thin lines (no circles). */
export function SiteDecorations() {
  return (
    <div
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 via-white to-white dark:from-blue-950/20 dark:via-zinc-950 dark:to-zinc-950" />

      {/* Top wave — hidden on very small screens to keep layout clean */}
      <svg
        className="absolute left-0 top-[12%] hidden h-10 w-full text-blue-200/40 sm:block dark:text-blue-800/25"
        viewBox="0 0 1200 40"
        preserveAspectRatio="none"
      >
        <path
          d="M0 20 Q600 4 1200 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>

      {/* Mid dashed line */}
      <svg
        className="absolute left-0 top-[48%] hidden h-8 w-full max-w-4xl text-blue-200/35 sm:block dark:text-blue-800/20"
        viewBox="0 0 800 32"
        preserveAspectRatio="none"
      >
        <path
          d="M0 16 L800 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeDasharray="6 10"
        />
      </svg>

      {/* Bottom accent — one small square only, desktop */}
      <div className="absolute bottom-[22%] right-[8%] hidden h-10 w-10 rotate-12 rounded-sm border border-blue-200/50 md:block dark:border-blue-800/35" />

      {/* Footer area line */}
      <svg
        className="absolute bottom-[14%] left-0 hidden h-8 w-2/3 text-blue-200/30 sm:block dark:text-blue-800/20"
        viewBox="0 0 600 32"
        preserveAspectRatio="none"
      >
        <path
          d="M0 16 Q300 28 600 10"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
        />
      </svg>
    </div>
  );
}
