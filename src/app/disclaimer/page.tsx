import Link from "next/link";
import { getPageMetadata } from "@/lib/seo";
import { COMPANY } from "@/lib/site";

export const metadata = getPageMetadata(
  "Disclaimer",
  "SUHADIMG disclaimer — limitations of liability, accuracy of results, and user responsibilities when using free online image tools.",
  "/disclaimer"
);

export default function DisclaimerPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-white">Disclaimer</h1>
      <p className="mb-6 text-sm text-zinc-500">Last updated: July 12, 2026</p>
      <div className="space-y-6 leading-relaxed text-zinc-600 dark:text-zinc-400">
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            General Information
          </h2>
          <p>
            The information and tools on SUHADIMG (suhadimg.site) are provided by{" "}
            {COMPANY.name} for general informational and utility purposes. By using
            this website, you accept this disclaimer in full. If you disagree with
            any part of it, please do not use our services.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            No Professional Advice
          </h2>
          <p>
            Content on SUHADIMG — including blog articles, tool descriptions, and
            FAQs — is not professional legal, medical, or design advice. Always
            verify format requirements (passport photos, print specs, platform
            upload rules) with official sources before relying on converted or
            resized images.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            Tool Results &amp; Accuracy
          </h2>
          <p>
            We strive for high-quality output using industry-standard processing,
            but we do not guarantee that converted, compressed, resized, or edited
            images will meet every specific requirement. Image quality depends on
            source files, settings you choose, and format limitations. Always
            review output before use and keep originals as backups.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            User Responsibility
          </h2>
          <p>
            You are solely responsible for the images you upload and process. Do
            not use SUHADIMG to handle content you do not have rights to, illegal
            material, or sensitive personal data you cannot risk processing on any
            third-party service. You agree to comply with applicable copyright and
            privacy laws in your jurisdiction.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            External Links
          </h2>
          <p>
            Our site may link to third-party websites (including{" "}
            <a
              href={COMPANY.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline dark:text-blue-400"
            >
              {COMPANY.name}
            </a>
            ). We are not responsible for the content, privacy practices, or
            availability of external sites.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            Advertising
          </h2>
          <p>
            SUHADIMG may display third-party advertisements (e.g. Google AdSense).
            Ad partners may use cookies to serve relevant ads. See our{" "}
            <Link href="/cookies" className="text-blue-600 hover:underline dark:text-blue-400">
              Cookie Policy
            </Link>{" "}
            and{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline dark:text-blue-400">
              Privacy Policy
            </Link>{" "}
            for details.
          </p>
        </section>
        <section>
          <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
            Contact
          </h2>
          <p>
            Questions about this disclaimer? Email{" "}
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
