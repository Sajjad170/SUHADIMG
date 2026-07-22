import Link from "next/link";
import { getPageMetadata } from "@/lib/seo";
import { COMPANY } from "@/lib/site";

export const metadata = getPageMetadata(
  "Cookie Policy",
  "SUHADIMG cookie policy — how we use cookies for analytics, advertising, and your choices to manage them.",
  "/cookies"
);

export default function CookiePolicyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-white">
        Cookie Policy
      </h1>
      <p className="mb-6 text-sm text-zinc-500">Last updated: July 22, 2026</p>
      <div className="space-y-6 leading-relaxed text-zinc-600 dark:text-zinc-400">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            What Are Cookies?
          </h2>
          <p>
            Cookies are small text files stored on your device when you visit a
            website. They help sites remember preferences, measure traffic, and
            (with your consent where required) show relevant advertisements.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            How SUHADIMG Uses Cookies
          </h2>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong className="text-zinc-900 dark:text-white">Essential:</strong>{" "}
              Theme preference (light/dark mode) stored locally so the site looks
              correct on return visits.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-white">Analytics:</strong>{" "}
              We may use Google Analytics to understand page views and tool usage
              in aggregate. This helps us improve SUHADIMG.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-white">Advertising:</strong>{" "}
              We use Google AdSense to show ads and keep SUHADIMG free. Google and
              its partners may set cookies (including the DoubleClick cookie) to
              serve ads based on your visits to this and other websites. We do not
              use cookies to access your uploaded images.
            </li>
          </ul>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            Cookies We Do Not Use for Images
          </h2>
          <p>
            Your uploaded images are never stored in cookies or local storage for
            processing purposes. Image files are handled in server memory and
            deleted immediately after download.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            Managing Cookies
          </h2>
          <p>
            You can block or delete cookies through your browser settings. Note
            that disabling cookies may affect theme persistence or analytics but
            will not prevent you from using our image tools. For Google ad
            settings, visit{" "}
            <a
              href="https://adssettings.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              Google Ads Settings
            </a>
            .
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            Related Policies
          </h2>
          <p>
            See also our{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline dark:text-blue-400">
              Privacy Policy
            </Link>
            ,{" "}
            <Link href="/terms" className="text-blue-600 hover:underline dark:text-blue-400">
              Terms &amp; Conditions
            </Link>
            , and{" "}
            <Link href="/disclaimer" className="text-blue-600 hover:underline dark:text-blue-400">
              Disclaimer
            </Link>
            .
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            Contact
          </h2>
          <p>
            Cookie questions? Email{" "}
            <a
              href={`mailto:${COMPANY.email}`}
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              {COMPANY.email}
            </a>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
