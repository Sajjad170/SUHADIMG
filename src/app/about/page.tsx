import Link from "next/link";
import { getPageMetadata, SITE_URL } from "@/lib/seo";
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
      <div className="space-y-8 leading-relaxed text-zinc-600 dark:text-zinc-400">
        <p>
          Welcome to <strong className="text-zinc-900 dark:text-white">SUHADIMG</strong>{" "}
          (accessible at{" "}
          <a
            href={SITE_URL}
            className="text-blue-600 hover:underline dark:text-blue-400"
          >
            {SITE_URL}
          </a>
          ), a high-performance suite of free online image processing tools
          engineered for web developers, designers, content creators, and
          everyday users.
        </p>
        <p>
          SUHADIMG was built to solve a simple problem: traditional online file
          converters are often slow, bloated with intrusive popup ads, or require
          unnecessary user accounts and email subscriptions just to compress a
          simple photo. We set out to create a clean, modern, privacy-first web
          utility platform that delivers fast execution without compromising image
          quality or user security.
        </p>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-white">
            Who We Are
          </h2>
          <p>
            SUHADIMG is developed and maintained by{" "}
            <a
              href={COMPANY.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-blue-600 hover:underline dark:text-blue-400"
            >
              {COMPANY.name}
            </a>
            , an independent digital engineering and mobile application
            development initiative. Our team specializes in building lightweight
            web software, API integrations, and user-centric digital tools
            designed for maximum efficiency, speed, and real-world utility.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-white">
            Our Technology &amp; Infrastructure
          </h2>
          <p className="mb-3">
            We believe web utilities should be as fast as native desktop
            applications. SUHADIMG is built using modern production-grade
            technologies to ensure reliability and global availability:
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong className="text-zinc-900 dark:text-white">
                Next.js &amp; TypeScript:
              </strong>{" "}
              Responsive, serverless web frontend built for speed.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-white">
                Sharp Processing Engine:
              </strong>{" "}
              High-speed image transformation for JPEG, PNG, WebP, AVIF, and
              more.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-white">
                Edge Processing:
              </strong>{" "}
              Requests are routed to serverless networks worldwide to minimize
              latency.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-white">
                Tailwind CSS:
              </strong>{" "}
              Clean, distraction-free interface optimized for desktop and mobile.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-white">
            Privacy &amp; Security First
          </h2>
          <p className="mb-3">
            At SUHADIMG, data privacy for your uploads is fundamental to our
            architecture. We may use analytics and advertising cookies on the
            website itself (see our{" "}
            <Link href="/privacy" className="text-blue-600 hover:underline dark:text-blue-400">
              Privacy Policy
            </Link>
            ), but your image files are handled separately:
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong className="text-zinc-900 dark:text-white">
                In-Memory Processing:
              </strong>{" "}
              Uploaded files are processed temporarily in memory.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-white">
                Immediate Deletion:
              </strong>{" "}
              Your files are automatically deleted after processing completes. We
              do not maintain permanent cloud storage of uploads.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-white">
                No Human Access:
              </strong>{" "}
              Images are processed by algorithms; no human reviews your content.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-white">
                HTTPS Encryption:
              </strong>{" "}
              All transfers between your browser and our servers use SSL/TLS.
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-white">
                No Account Required:
              </strong>{" "}
              Access all core utilities instantly without signup.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-white">
            Our Mission
          </h2>
          <p>
            Our mission is to support a faster web for everyone. Large
            uncompressed images account for over half of average web page
            payloads, slowing mobile browsing, hurting Core Web Vitals, and
            consuming unnecessary hosting bandwidth. By providing free,
            accessible tools like image compressors, converters, and resizers
            alongside{" "}
            <Link href="/blog" className="text-blue-600 hover:underline dark:text-blue-400">
              technical guides
            </Link>
            , SUHADIMG helps creators optimize media assets for lower bounce rates
            and better search rankings.
          </p>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-white">
            What We Offer
          </h2>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <Link href="/tools" className="text-blue-600 hover:underline dark:text-blue-400">
                46+ image tools
              </Link>{" "}
              for conversion, compression, resize, and editing
            </li>
            <li>Batch processing with ZIP download</li>
            <li>30+ original blog articles on image formats and optimization</li>
            <li>Mobile-responsive design with dark mode</li>
            <li>
              <Link href="/privacy" className="text-blue-600 hover:underline dark:text-blue-400">
                Privacy Policy
              </Link>
              ,{" "}
              <Link href="/terms" className="text-blue-600 hover:underline dark:text-blue-400">
                Terms
              </Link>
              ,{" "}
              <Link href="/disclaimer" className="text-blue-600 hover:underline dark:text-blue-400">
                Disclaimer
              </Link>
              , and{" "}
              <Link href="/cookies" className="text-blue-600 hover:underline dark:text-blue-400">
                Cookie Policy
              </Link>
            </li>
          </ul>
        </section>

        <section>
          <h2 className="mb-3 text-xl font-semibold text-zinc-900 dark:text-white">
            Contact &amp; Feedback
          </h2>
          <p className="mb-3">
            We are constantly refining our algorithms and expanding our suite of
            utilities. For feature requests, bug reports, or business inquiries:
          </p>
          <ul className="list-inside list-disc space-y-2">
            <li>
              <strong className="text-zinc-900 dark:text-white">Company:</strong>{" "}
              {COMPANY.name}
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-white">Website:</strong>{" "}
              <a
                href={SITE_URL}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {SITE_URL}
              </a>
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-white">Contact:</strong>{" "}
              <Link href="/contact" className="text-blue-600 hover:underline dark:text-blue-400">
                {SITE_URL}/contact
              </Link>
            </li>
            <li>
              <strong className="text-zinc-900 dark:text-white">Email:</strong>{" "}
              <a
                href={`mailto:${COMPANY.email}`}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {COMPANY.email}
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}
