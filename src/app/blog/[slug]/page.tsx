import { notFound } from "next/navigation";
import Link from "next/link";
import { JsonLd } from "@/components/JsonLd";
import { BlogAuthorBox } from "@/components/BlogAuthorBox";
import { BlogPostToolLinks } from "@/components/BlogPostToolLinks";
import { blogPosts, getBlogPost, getFullBlogContent } from "@/lib/blog";
import { getBlogMetadata } from "@/lib/seo";
import { blogPageJsonLdGraph } from "@/lib/structuredData";

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

function parseBoldText(text: string): React.ReactNode[] {
  const boldRegex = /\*\*(.*?)\*\*/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  
  boldRegex.lastIndex = 0;
  
  while ((match = boldRegex.exec(text)) !== null) {
    const textBefore = text.slice(lastIndex, match.index);
    const boldContent = match[1];
    
    if (textBefore) {
      parts.push(textBefore);
    }
    
    parts.push(
      <strong key={match.index} className="font-semibold text-zinc-900 dark:text-white">
        {boldContent}
      </strong>
    );
    
    lastIndex = boldRegex.lastIndex;
  }
  
  const textAfter = text.slice(lastIndex);
  if (textAfter) {
    parts.push(textAfter);
  }
  
  return parts.length > 0 ? parts : [text];
}

function renderInlineText(text: string) {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  
  linkRegex.lastIndex = 0;
  
  while ((match = linkRegex.exec(text)) !== null) {
    const textBefore = text.slice(lastIndex, match.index);
    const linkText = match[1];
    const linkUrl = match[2];
    
    if (textBefore) {
      parts.push(...parseBoldText(textBefore));
    }
    
    const isInternal = linkUrl.startsWith("/");
    if (isInternal) {
      parts.push(
        <Link
          key={match.index}
          href={linkUrl}
          className="font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          {linkText}
        </Link>
      );
    } else {
      parts.push(
        <a
          key={match.index}
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-blue-600 hover:underline dark:text-blue-400"
        >
          {linkText}
        </a>
      );
    }
    
    lastIndex = linkRegex.lastIndex;
  }
  
  const textAfter = text.slice(lastIndex);
  if (textAfter) {
    parts.push(...parseBoldText(textAfter));
  }
  
  return parts.length > 0 ? parts : text;
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
            <h2 className="mb-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-white">
              {heading}
            </h2>
            <ul className="list-inside list-disc space-y-1 text-zinc-600 dark:text-zinc-400">
              {lines.slice(1).map((line, j) => (
                <li key={j}>
                  {renderInlineText(line.replace(/^-\s*/, ""))}
                </li>
              ))}
            </ul>
          </div>
        );
      }
      return (
        <p key={i} className="mb-4 leading-relaxed text-zinc-600 dark:text-zinc-400">
          {renderInlineText(block)}
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
      <JsonLd data={blogPageJsonLdGraph(post)} />
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
        <BlogPostToolLinks category={post.category} />
        <BlogAuthorBox />
      </article>
    </>
  );
}
