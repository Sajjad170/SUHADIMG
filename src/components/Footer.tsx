import Link from "next/link";
import { COMPANY } from "@/lib/site";
import { LogoWithName } from "./Logo";
import { SocialLinks } from "./SocialLinks";

/** Static footer links — avoids loading full tools.ts on every page. */
const POPULAR_TOOL_LINKS = [
  { slug: "compress-image", label: "Compress Image" },
  { slug: "resize-image", label: "Resize Image" },
  { slug: "png-to-jpg", label: "PNG → JPG" },
  { slug: "jpg-to-png", label: "JPG → PNG" },
  { slug: "crop-image", label: "Crop Image" },
  { slug: "webp-to-jpg", label: "WebP → JPG" },
  { slug: "photo-editor", label: "Photo Editor" },
  { slug: "background-remover", label: "Background Remover" },
];

export function Footer() {
  return (
    <footer className="mt-auto border-t border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-3">
              <LogoWithName variant="default" />
            </div>
            <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Free online image tools. Convert, compress, resize, and edit images
              instantly. No signup, no watermark, privacy-first.
            </p>
            <p className="mb-2 text-xs text-zinc-500 dark:text-zinc-500">
              A product of{" "}
              <a
                href={COMPANY.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                {COMPANY.name}
              </a>
            </p>
            <SocialLinks />
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-white">
              Popular Tools
            </h3>
            <ul className="space-y-2">
              {POPULAR_TOOL_LINKS.map((tool) => (
                <li key={tool.slug}>
                  <Link
                    href={`/${tool.slug}`}
                    prefetch
                    className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400"
                  >
                    {tool.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-white">
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/tools" prefetch className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400">
                  All Tools
                </Link>
              </li>
              <li>
                <Link href="/blog" prefetch className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/about" prefetch className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400">
                  About
                </Link>
              </li>
              <li>
                <Link href="/contact" prefetch className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="mb-3 text-sm font-semibold text-zinc-900 dark:text-white">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" prefetch className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" prefetch className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400">
                  Terms &amp; Conditions
                </Link>
              </li>
              <li>
                <Link href="/disclaimer" prefetch className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400">
                  Disclaimer
                </Link>
              </li>
              <li>
                <Link href="/cookies" prefetch className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400">
                  Cookie Policy
                </Link>
              </li>
              <li>
                <Link href="/site-map" prefetch className="text-sm text-zinc-600 hover:text-blue-600 dark:text-zinc-400 dark:hover:text-blue-400">
                  Sitemap
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-zinc-200 pt-6 dark:border-zinc-800">
          <div className="mb-4 flex flex-wrap justify-center gap-x-4 gap-y-2 text-sm">
            <Link href="/privacy" className="text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400">
              Terms &amp; Conditions
            </Link>
            <Link href="/disclaimer" className="text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400">
              Disclaimer
            </Link>
            <Link href="/cookies" className="text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400">
              Cookie Policy
            </Link>
            <Link href="/contact" className="text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400">
              Contact
            </Link>
            <Link href="/about" className="text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400">
              About
            </Link>
            <Link href="/site-map" className="text-zinc-500 hover:text-blue-600 dark:hover:text-blue-400">
              Sitemap
            </Link>
          </div>
          <div className="mb-4 flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs text-zinc-400 dark:text-zinc-500">
            <span className="flex items-center gap-1">🔒 HTTPS Secure</span>
            <span className="flex items-center gap-1">🛡️ GDPR Compliant</span>
            <span className="flex items-center gap-1">⚙️ ISO 27001 Security Principles</span>
          </div>
          <p className="text-center text-sm text-zinc-500 dark:text-zinc-500">
            © {new Date().getFullYear()} SUHADIMG. All rights reserved.
            Files are processed in memory and deleted immediately.
          </p>
        </div>
      </div>
    </footer>
  );
}