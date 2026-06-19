import { notFound } from "next/navigation";
import Link from "next/link";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import type { Metadata } from "next";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jaredalonzo.dev";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { title, description, pubDate, updatedDate, tags, canonical } = post.frontmatter;
  const postUrl = `${BASE_URL}/posts/${slug}`;

  return {
    title,
    description,
    authors: [{ name: "Jared Alonzo", url: BASE_URL }],
    keywords: tags,
    alternates: {
      canonical: canonical ?? postUrl,
    },
    openGraph: {
      type: "article",
      url: postUrl,
      title,
      description,
      publishedTime: pubDate,
      ...(updatedDate && { modifiedTime: updatedDate }),
      authors: ["Jared Alonzo"],
      tags,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { content } = await compileMDX({
    source: post.content,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          [rehypePrettyCode, { theme: { dark: "github-dark", light: "github-light" } }],
        ],
      },
    },
  });

  const { title, description, pubDate, updatedDate, tags, canonical } = post.frontmatter;
  const postUrl = `${BASE_URL}/posts/${slug}`;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description,
    url: canonical ?? postUrl,
    datePublished: pubDate,
    ...(updatedDate && { dateModified: updatedDate }),
    keywords: tags.join(", "),
    author: {
      "@type": "Person",
      name: "Jared Alonzo",
      url: BASE_URL,
    },
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-10 sm:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mb-8 sm:mb-10">
        <Link href="/" className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          ← Home
        </Link>
      </div>
      <header className="mb-8 sm:mb-10">
        <time dateTime={post.frontmatter.pubDate} className="text-sm text-gray-400">{post.frontmatter.pubDate}</time>
        <h1 className="text-3xl font-semibold mt-1">{post.frontmatter.title}</h1>
        {post.frontmatter.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.frontmatter.tags.map((tag) => (
              <span
                key={tag}
                className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 px-2 py-0.5 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>
      <article className="prose prose-lg dark:prose-invert max-w-none">{content}</article>
    </main>
  );
}
