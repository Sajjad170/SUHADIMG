interface SectionHeadingProps {
  id?: string;
  title: string;
  subtitle?: string;
  level?: "h2" | "h3";
}

export function SectionHeading({
  id,
  title,
  subtitle,
  level = "h2",
}: SectionHeadingProps) {
  const Heading = level;
  const sizeClass =
    level === "h3"
      ? "text-lg font-bold tracking-tight text-zinc-900 dark:text-white sm:text-xl"
      : "text-2xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-[1.65rem]";

  return (
    <div className="mb-6">
      <Heading id={id} className={sizeClass}>
        {title}
      </Heading>
      {subtitle && (
        <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>
      )}
      <div className="mt-3 h-1 w-12 rounded-full bg-blue-500" />
    </div>
  );
}
