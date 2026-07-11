import Link from "next/link";
import { getPageMetadata } from "@/lib/seo";
import { COMPANY } from "@/lib/site";

export const metadata = getPageMetadata(
  "About SUHADIMG",
  "Learn about SUHADIMG — free online image converter, compressor, resizer and editor by Suhad Tech Solutions. Privacy-first, no signup, 46+ tools.",
  "/about"
);

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-white">
        About SUHADIMG
      </h1>
      <div className="space-y-6 leading-relaxed text-zinc-600 dark:text-zinc-400">
        <p>
          <strong>SUHADIMG</strong> (suhadimg.site) is a free online suite of image
          tools built for designers, developers, marketers, e-commerce sellers, and
          everyday users who need to convert, compress, resize, or edit images
          quickly — without installing software or creating an account.
        </p>
        <p>
          We believe image tools should be fast, free, and respectful of your
          privacy. Every image is processed in server memory and deleted
          immediately after you download the result. No accounts, no watermarks,
          no cloud storage of your files.
        </p>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-white">
            Who We Are (E-E-A-T)
          </h2>
          <p>
            SUHADIMG is developed by{" "}
            <a
              href={COMPANY.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              {COMPANY.name}
            </a>
            , a technology company based in Pakistan serving clients worldwide with
            website development, UI/UX design, mobile apps, and AI automation. Our
            team has hands-on experience shipping production web applications, which
            is why SUHADIMG uses modern, reliable processing (Sharp, Next.js) instead
            of outdated scripts.
          </p>
          <ul className="mt-3 list-inside list-disc space-y-1 text-sm">
            <li>
              <strong className="text-zinc-900 dark:text-white">Experience:</strong>{" "}
              We run SUHADIMG daily and test every tool with real user workflows.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-white">Expertise:</strong>{" "}
              Our blog and tool guides are written by developers who work with image
              formats professionally.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-white">Authoritativeness:</strong>{" "}
              SUHADIMG is the dedicated image-tools product of {COMPANY.name}.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-white">Trustworthiness:</strong>{" "}
              Clear Privacy Policy, Terms, Contact page, and transparent data handling.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-white">
            Editorial Standards
          </h2>
          <p>
            Our blog articles are original — not copied from other websites. Each
            guide is drafted from practical testing on suhadimg.site, reviewed for
            accuracy, and updated when formats or browser support changes. We do not
            publish placeholder or auto-generated filler without human review.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-white">
            Our Mission
          </h2>
          <p>
            To provide the best free online image tools with a focus on speed,
            simplicity, and privacy — plus educational content that helps you choose
            the right format, size, and compression for every task.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-white">
            What We Offer
          </h2>
          <ul className="list-inside list-disc space-y-2">
            <li>46+ image conversion, compression, resize, and editing tools</li>
            <li>Batch processing with ZIP download</li>
            <li>30+ original blog articles on image formats and optimization</li>
            <li>Mobile-responsive design with dark mode</li>
            <li>Privacy Policy, Terms, Disclaimer, and Cookie Policy</li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-white">
            Contact
          </h2>
          <p>
            Questions or feedback? Email{" "}
            <a
              href={`mailto:${COMPANY.email}`}
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              {COMPANY.email}
            </a>{" "}
            or use our{" "}
            <Link href="/contact" className="text-blue-600 hover:underline dark:text-blue-400">
              contact form
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
