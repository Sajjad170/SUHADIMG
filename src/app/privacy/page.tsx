import Link from "next/link";
import { getPageMetadata } from "@/lib/seo";
import { COMPANY } from "@/lib/site";

export const metadata = getPageMetadata(
  "Privacy Policy",
  "SUHADIMG privacy policy — we do not store your images. Learn how we handle data, cookies, analytics, and advertising.",
  "/privacy"
);

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-white">
        Privacy Policy
      </h1>
      <p className="mb-6 text-sm text-zinc-500">Last updated: July 12, 2026</p>
      <div className="space-y-6 leading-relaxed text-zinc-600 dark:text-zinc-400">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            Who We Are
          </h2>
          <p>
            SUHADIMG (suhadimg.site) is operated by {COMPANY.name}. This policy
            explains how we handle information when you use our free online image
            tools, blog, and related pages.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            Image Processing — Your Files Stay Private
          </h2>
          <p>
            Your privacy is our priority. When you upload an image, it is processed
            in server memory only. We do not save, store, index, or share your
            images on any server, cloud storage, or database. Both original and
            processed files are deleted immediately after your download completes
            or your session ends.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            Information We Collect
          </h2>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong className="text-zinc-900 dark:text-white">Image tools:</strong>{" "}
              We do not require accounts and do not collect names, emails, or
              passwords through the converter itself.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-white">Contact:</strong>{" "}
              If you email us at {COMPANY.email}, we receive the information you
              voluntarily send.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-white">Analytics:</strong>{" "}
              We may use Google Analytics to collect anonymous usage data (pages
              visited, device type, country). This does not include your image
              content.
            </li>
          </ul>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            Cookies &amp; Advertising
          </h2>
          <p>
            We use cookies for theme preferences and, with your consent where
            required, analytics and advertising (such as Google AdSense). Ad
            networks may use cookies to serve ads. See our{" "}
            <Link href="/cookies" className="text-blue-600 hover:underline dark:text-blue-400">
              Cookie Policy
            </Link>{" "}
            for full details and how to opt out.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            Third-Party Services
          </h2>
          <p>
            We may use Google Analytics, Google Search Console, Microsoft Clarity,
            and advertising partners. These services have their own privacy
            policies. We never share uploaded images with advertisers or analytics
            providers.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            Children&apos;s Privacy
          </h2>
          <p>
            SUHADIMG is not directed at children under 13. We do not knowingly
            collect personal information from children.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            Your Rights
          </h2>
          <p>
            Depending on your location, you may have rights to access, correct, or
            delete personal data we hold (e.g. from contact emails). Contact us to
            exercise these rights.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            Contact
          </h2>
          <p>
            Questions about this policy? Email{" "}
            <a
              href={`mailto:${COMPANY.email}`}
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              {COMPANY.email}
            </a>{" "}
            or visit our{" "}
            <Link href="/contact" className="text-blue-600 hover:underline dark:text-blue-400">
              contact page
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
