import Image from "next/image";
import { cn } from "@/lib/utils";

type LogoVariant = "compact" | "default" | "hero";

interface LogoWithNameProps {
  variant?: LogoVariant;
  className?: string;
  priority?: boolean;
}

const heights: Record<LogoVariant, number> = {
  compact: 36,
  default: 48,
  hero: 96,
};

export function LogoWithName({
  variant = "default",
  className,
  priority = false,
}: LogoWithNameProps) {
  const height = heights[variant];
  const width = variant === "hero" ? 420 : variant === "compact" ? 158 : 210;

  return (
    <Image
      src="/logo.png"
      alt="SUHADIMG logo"
      width={width}
      height={height}
      priority={priority}
      sizes={
        variant === "hero"
          ? "(max-width: 640px) 280px, 420px"
          : variant === "compact"
            ? "158px"
            : "210px"
      }
      className={cn("h-auto w-auto object-contain dark:brightness-110", className)}
      style={{ height, width: "auto", maxWidth: width }}
    />
  );
}

/** Square mark for tight spaces (uses favicon asset). */
export function LogoMark({
  size = 32,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <Image
      src="/favicon.png"
      alt="SUHADIMG logo icon"
      width={size}
      height={size}
      className={cn("rounded-md object-contain", className)}
    />
  );
}
