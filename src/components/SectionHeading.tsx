interface SectionHeadingProps {
  title: string;
  subtitle?: string;
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-[1.65rem]">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>
      )}
      <div className="mt-3 h-1 w-12 rounded-full bg-blue-500" />
    </div>
  );
}
