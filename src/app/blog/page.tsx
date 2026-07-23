import { getPageMetadata } from "@/lib/seo";
import { blogPosts } from "@/lib/blogPosts";
import Link from "next/link";

export const metadata = getPageMetadata(
  "Blog — Image Tips & Guides",
  "SUHADIMG blog: 34+ original guides on PNG vs JPG, compression, resizing, WebP, social media sizes, and SEO image optimization.",
  "/blog"
);

function formatDate(dateStr: string) {
  try {
    const options: Intl.DateTimeFormatOptions = { year: "numeric", month: "short", day: "numeric" };
    const parts = dateStr.split("-");
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const date = new Date(year, month, day);
      return date.toLocaleDateString("en-US", options);
    }
  } catch {
    // Fallback to original string
  }
  return dateStr;
}

export default function BlogPage() {
  const sortedPosts = [...blogPosts].sort((a, b) => b.date.localeCompare(a.date));
  const categoryCounts = sortedPosts.reduce<Record<string, number>>((acc, post) => {
    acc[post.category] = (acc[post.category] ?? 0) + 1;
    return acc;
  }, {});
  const categories = [...new Set(sortedPosts.map((p) => p.category))].filter(
    (cat) => (categoryCounts[cat] ?? 0) >= 3
  );

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-10 text-center sm:text-left">
        <h1 className="mb-3 text-3xl font-bold tracking-tight text-zinc-900 dark:text-white sm:text-4xl">
          Blog
        </h1>
        <p className="max-w-2xl text-base text-zinc-600 dark:text-zinc-400">
          Discover optimization guides, format comparisons, and step-by-step tutorials compiled by the
          SUHADIMG editorial team. All workflows are fully tested. Browse the full{" "}
          <Link href="/site-map" className="text-blue-600 hover:underline dark:text-blue-400">
            HTML sitemap
          </Link>{" "}
          for every tool and article.
        </p>
        <div className="mt-4 flex flex-wrap gap-2 text-xs">
          {categories.map((cat) => (
            <span
              key={cat}
              className="rounded-full bg-zinc-100 px-3 py-1 font-medium text-zinc-600 dark:bg-zinc-800/80 dark:text-zinc-300"
            >
              {cat}
            </span>
          ))}
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sortedPosts.map((post) => (
          <article
            key={post.slug}
            className="group flex flex-col justify-between rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900 dark:hover:border-blue-800"
          >
            <div>
              <div className="mb-3 flex items-center gap-2.5 text-xs text-zinc-500">
                <span className="font-semibold text-blue-600 dark:text-blue-400">
                  {post.category}
                </span>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <time dateTime={post.date}>{formatDate(post.date)}</time>
                <span className="text-zinc-300 dark:text-zinc-700">•</span>
                <span>{post.readTime}</span>
              </div>
              <h2 className="mb-2 text-lg font-bold leading-snug text-zinc-900 transition-colors group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                <Link href={`/blog/${post.slug}`} prefetch>
                  {post.title}
                </Link>
              </h2>
              <p className="line-clamp-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                {post.description}
              </p>
            </div>
            <div className="mt-5 pt-3 border-t border-zinc-100 dark:border-zinc-800/50">
              <Link
                href={`/blog/${post.slug}`}
                prefetch
                className="inline-flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300"
              >
                Read More
                <span className="transition-transform group-hover:translate-x-0.5">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
