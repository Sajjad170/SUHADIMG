import { notFound } from "next/navigation";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { BlogAuthorBox } from "@/components/BlogAuthorBox";
import { blogPosts, getBlogPost, getFullBlogContent } from "@/lib/blog";
import { getBlogMetadata } from "@/lib/seo";
import { blogArticleJsonLd, blogBreadcrumbJsonLd } from "@/lib/structuredData";

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return getBlogMetadata(post);
}

function renderContent(content: string) {
  return content
    .trim()
    .split("\n\n")
    .map((block, i) => {
      if (block.startsWith("**") && block.includes(":**")) {
        const lines = block.split("\n");
        const heading = lines[0].replace(/\*\*/g, "").replace(":", "");
        return (
          <div key={i} className="mb-4">
            <h3 className="mb-2 font-semibold text-zinc-900 dark:text-white">
              {heading}
            </h3>
            <ul className="list-inside list-disc space-y-1 text-zinc-600 dark:text-zinc-400">
              {lines.slice(1).map((line, j) => (
                <li key={j}>{line.replace(/^-\s*/, "").replace(/\*\*/g, "")}</li>
              ))}
            </ul>
          </div>
        );
      }
      return (
        <p key={i} className="mb-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
          {block.replace(/\*\*(.*?)\*\*/g, "$1")}
        </p>
      );
    });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  const content = getFullBlogContent(slug);
  if (!post || !content) notFound();

  return (
    <>
      <JsonLd data={[blogArticleJsonLd(post), blogBreadcrumbJsonLd(post)]} />
      <article className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <nav className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/blog" className="hover:text-blue-600 dark:hover:text-blue-400">
            Blog
          </Link>
          <span className="mx-2">/</span>
          <span className="text-zinc-900 dark:text-white">{post.title}</span>
        </nav>
        <Link
          href="/blog"
          className="mb-6 inline-block text-sm text-blue-600 hover:text-blue-700 dark:text-blue-400"
        >
          ← Back to Blog
        </Link>
        <div className="mb-4 flex items-center gap-3 text-sm text-zinc-500">
          <span className="font-medium text-blue-600 dark:text-blue-400">
            {post.category}
          </span>
          <time dateTime={post.date}>{post.date}</time>
          <span>{post.readTime}</span>
        </div>
        <h1 className="mb-6 text-3xl font-bold text-zinc-900 dark:text-white sm:text-4xl">
          {post.title}
        </h1>
        <div className="prose-zinc">{renderContent(content)}</div>
        <BlogAuthorBox />
      </article>
    </>
  );
}
