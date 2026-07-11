import { getPageMetadata } from "@/lib/seo";
import { blogPosts } from "@/lib/blogPosts";
import Link from "next/link";

export const metadata = getPageMetadata(
  "Blog — Image Tips & Guides",
  "SUHADIMG blog: 30+ original guides on PNG vs JPG, compression, resizing, WebP, social media sizes, and SEO image optimization.",
  "/blog"
);

export default function BlogPage() {
  const categories = [...new Set(blogPosts.map((p) => p.category))];

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-2 text-3xl font-bold text-zinc-900 dark:text-white">Blog</h1>
      <p className="mb-4 text-zinc-600 dark:text-zinc-400">
        {blogPosts.length} original guides and tutorials — written and reviewed by
        the SUHADIMG team at Suhad Tech Solutions. No copied content; every article
        is tested against our free tools on suhadimg.site.
      </p>
      <p className="mb-8 text-sm text-zinc-500">
        Categories: {categories.join(" · ")}
      </p>
      <div className="space-y-6">
        {blogPosts.map((post) => (
          <article
            key={post.slug}
            className="rounded-xl border border-zinc-200 p-6 dark:border-zinc-800"
          >
            <div className="mb-2 flex flex-wrap items-center gap-3 text-sm text-zinc-500">
              <span className="font-medium text-blue-600 dark:text-blue-400">
                {post.category}
              </span>
              <time dateTime={post.date}>{post.date}</time>
              <span>{post.readTime}</span>
            </div>
            <h2 className="mb-2 text-xl font-semibold text-zinc-900 dark:text-white">
              <Link
                href={`/blog/${post.slug}`}
                className="hover:text-blue-600 dark:hover:text-blue-400"
              >
                {post.title}
              </Link>
            </h2>
            <p className="text-zinc-600 dark:text-zinc-400">{post.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
