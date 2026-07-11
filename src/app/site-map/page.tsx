import Link from "next/link";
import { blogPosts } from "@/lib/blogPosts";
import { getPageMetadata, SITE_URL } from "@/lib/seo";
import { CATEGORY_LABELS, tools, type ToolCategory } from "@/lib/tools";

export const metadata = getPageMetadata(
  "Sitemap",
  "Complete HTML sitemap of SUHADIMG — all image tools, blog articles, and pages at suhadimg.site.",
  "/site-map"
);

const categoryOrder: ToolCategory[] = [
  "compression",
  "resize",
  "conversion",
  "editing",
  "advanced",
];

const staticPages = [
  { href: "/", label: "Home" },
  { href: "/tools", label: "All Tools" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/privacy", label: "Privacy Policy" },
  { href: "/terms", label: "Terms & Conditions" },
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/cookies", label: "Cookie Policy" },
];

export default function SiteMapPage() {
  const toolsByCategory = categoryOrder.map((category) => ({
    category,
    label: CATEGORY_LABELS[category],
    items: tools.filter((t) => t.category === category),
  }));

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-3 text-3xl font-bold text-zinc-900 dark:text-white">Sitemap</h1>
      <p className="mb-8 text-zinc-600 dark:text-zinc-400">
        All pages on SUHADIMG. XML sitemap for search engines:{" "}
        <a
          href={`${SITE_URL}/sitemap.xml`}
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          {SITE_URL}/sitemap.xml
        </a>
      </p>

      <section className="mb-10">
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
          Main Pages
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {staticPages.map((page) => (
            <li key={page.href}>
              <Link
                href={page.href}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {page.label}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {toolsByCategory.map(({ category, label, items }) => (
        <section key={category} className="mb-10">
          <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
            {label}
          </h2>
          <ul className="grid gap-2 sm:grid-cols-2">
            {items.map((tool) => (
              <li key={tool.slug}>
                <Link
                  href={`/${tool.slug}`}
                  className="text-blue-600 hover:underline dark:text-blue-400"
                >
                  {tool.title}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}

      <section>
        <h2 className="mb-4 text-xl font-semibold text-zinc-900 dark:text-white">
          Blog Articles
        </h2>
        <ul className="grid gap-2 sm:grid-cols-2">
          {blogPosts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="text-blue-600 hover:underline dark:text-blue-400"
              >
                {post.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
