import Link from "next/link";
import { getPageMetadata } from "@/lib/seo";
import { COMPANY } from "@/lib/site";
import { ContactForm } from "@/components/ContactForm";
import { SocialLinks } from "@/components/SocialLinks";

export const metadata = getPageMetadata(
  "Contact SUHADIMG",
  "Contact SUHADIMG and Suhad Tech Solutions. Questions, feedback, or partnership inquiries — we respond within 2–3 business days.",
  "/contact"
);

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-white">Contact Us</h1>
      <div className="space-y-8 leading-relaxed text-zinc-600 dark:text-zinc-400">
        <p>
          Have a question, suggestion, or found a bug? We&apos;d love to hear from
          you. SUHADIMG is built and maintained by{" "}
          <a
            href={COMPANY.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-600 hover:underline dark:text-blue-400"
          >
            {COMPANY.name}
          </a>
          . AdSense reviewers and users can reach us using the form below or email
          directly.
        </p>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-white">
            Send a Message
          </h2>
          <ContactForm />
        </div>

        <div className="rounded-xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900">
          <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">
            Direct Contact
          </h2>
          <ul className="space-y-2 text-sm">
            <li>
              <span className="font-medium text-zinc-900 dark:text-white">Email: </span>
              <a
                href={`mailto:${COMPANY.email}`}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {COMPANY.email}
              </a>
            </li>
            <li>
              <span className="font-medium text-zinc-900 dark:text-white">Phone: </span>
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {COMPANY.phone}
              </a>
            </li>
            <li>
              <span className="font-medium text-zinc-900 dark:text-white">Website: </span>
              <a
                href={COMPANY.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                suhadtechsolutions.site
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-lg font-semibold text-zinc-900 dark:text-white">
            Follow SUHADIMG
          </h2>
          <SocialLinks showLabels />
        </div>

        <p className="text-sm">
          We typically respond within 2–3 business days. For privacy-related
          inquiries, include &quot;Privacy&quot; in your subject line. Read our{" "}
          <Link href="/privacy" className="text-blue-600 hover:underline dark:text-blue-400">
            Privacy Policy
          </Link>
          ,{" "}
          <Link href="/terms" className="text-blue-600 hover:underline dark:text-blue-400">
            Terms &amp; Conditions
          </Link>
          , and{" "}
          <Link href="/about" className="text-blue-600 hover:underline dark:text-blue-400">
            About page
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
