import { Facebook, Globe, Instagram, Linkedin, Youtube } from "lucide-react";
import { SOCIAL_LINKS, type SocialIcon } from "@/lib/site";

/** Official X (formerly Twitter) logo — not the generic Lucide "X" close icon. */
function XLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden
    >
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
}

const LUCIDE_ICONS = {
  facebook: Facebook,
  linkedin: Linkedin,
  instagram: Instagram,
  youtube: Youtube,
  website: Globe,
} as const;

function SocialIconGraphic({
  icon,
  className,
}: {
  icon: SocialIcon;
  className?: string;
}) {
  if (icon === "x") {
    return <XLogo className={className} />;
  }
  const Icon = LUCIDE_ICONS[icon];
  return <Icon className={className} strokeWidth={2} aria-hidden />;
}

interface SocialLinksProps {
  className?: string;
  showLabels?: boolean;
}

export function SocialLinks({ className = "", showLabels = false }: SocialLinksProps) {
  return (
    <ul className={`flex flex-wrap items-center gap-2 ${className}`}>
      {SOCIAL_LINKS.map((link) => (
        <li key={link.href}>
          <a
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            title={link.label}
            aria-label={`SUHADIMG on ${link.label}`}
            className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white p-2 text-zinc-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:border-blue-700 dark:hover:bg-blue-950/50 dark:hover:text-blue-400"
          >
            <SocialIconGraphic icon={link.icon} className="h-4 w-4 shrink-0" />
            {showLabels && (
              <span className="text-sm font-medium">{link.label}</span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );
}
