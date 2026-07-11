import Link from "next/link";
import { getPageMetadata } from "@/lib/seo";
import { COMPANY } from "@/lib/site";

export const metadata = getPageMetadata(
  "Terms & Conditions",
  "Terms and conditions for using SUHADIMG free online image tools — acceptable use, liability, and service rules.",
  "/terms"
);

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-white">
        Terms &amp; Conditions
      </h1>
      <p className="mb-6 text-sm text-zinc-500">Last updated: July 12, 2026</p>
      <div className="space-y-6 leading-relaxed text-zinc-600 dark:text-zinc-400">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            Agreement
          </h2>
          <p>
            By accessing SUHADIMG (suhadimg.site), operated by {COMPANY.name},
            you agree to these Terms &amp; Conditions. If you do not agree, please
            do not use our website or tools.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            Service Description
          </h2>
          <p>
            SUHADIMG provides free online image conversion, compression, resizing,
            cropping, editing, and related utilities. Tools are offered &quot;as
            available&quot; and may be updated, added, or removed without notice.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            Acceptable Use
          </h2>
          <ul className="list-inside list-disc space-y-2">
            <li>Use tools for lawful personal or commercial purposes.</li>
            <li>Do not upload illegal, harmful, or copyrighted content without permission.</li>
            <li>Do not attempt to overload, scrape, or reverse-engineer our systems.</li>
            <li>Do not misrepresent SUHADIMG or {COMPANY.name} in public communications.</li>
          </ul>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            Intellectual Property
          </h2>
          <p>
            You retain ownership of images you upload. SUHADIMG branding, logo,
            original blog content, and site design belong to {COMPANY.name}. You
            may not copy our text or layout from other websites — all SUHADIMG
            content is original.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            No Warranty
          </h2>
          <p>
            Services are provided &quot;as is&quot; without warranty of any kind. We do
            not guarantee error-free processing, specific file sizes, or that
            results meet official requirements (passport, print, etc.). Keep
            backups of originals.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            Limitation of Liability
          </h2>
          <p>
            {COMPANY.name} and SUHADIMG shall not be liable for indirect,
            incidental, or consequential damages arising from use of our tools,
            including loss of data, revenue, or image quality. Our total liability
            is limited to the amount you paid us (zero for free services).
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            Related Policies
          </h2>
          <p>
            Also read our{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline dark:text-blue-400">
              Privacy Policy
            </Link>
            ,{" "}
            <Link href="/disclaimer" className="text-blue-600 hover:underline dark:text-blue-400">
              Disclaimer
            </Link>
            , and{" "}
            <Link href="/cookies" className="text-blue-600 hover:underline dark:text-blue-400">
              Cookie Policy
            </Link>
            .
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            Changes &amp; Contact
          </h2>
          <p>
            We may update these terms at any time. Continued use after changes
            means acceptance. Contact{" "}
            <a
              href={`mailto:${COMPANY.email}`}
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              {COMPANY.email}
            </a>{" "}
            with questions.
          </p>
        </section>
      </div>
    </div>
  );
}
