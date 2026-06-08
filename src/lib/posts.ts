import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { cache } from "react";

const POSTS_DIR = path.join(process.cwd(), "content/posts");

export interface PostFrontmatter {
  title: string;
  description: string;
  pubDate: string;
  updatedDate?: string;
  tags: string[];
  draft: boolean;
  canonical?: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string;
}

function toDateString(value: unknown): string {
  if (value instanceof Date) return value.toISOString().split("T")[0];
  return String(value);
}

function validate(slug: string, data: Record<string, unknown>): PostFrontmatter {
  if (!data.title || typeof data.title !== "string")
    throw new Error(`${slug}: missing or invalid "title"`);
  if (!data.description || typeof data.description !== "string")
    throw new Error(`${slug}: missing or invalid "description"`);
  if (!data.pubDate)
    throw new Error(`${slug}: missing "pubDate"`);
  if (!Array.isArray(data.tags))
    throw new Error(`${slug}: "tags" must be an array`);

  return {
    title: data.title,
    description: data.description,
    pubDate: toDateString(data.pubDate),
    updatedDate: data.updatedDate ? toDateString(data.updatedDate) : undefined,
    tags: data.tags as string[],
    draft: data.draft === true,
    canonical: data.canonical ? String(data.canonical) : undefined,
  };
}

function readPost(filename: string): Post {
  const slug = filename.replace(/\.mdx$/, "");
  let raw: string;
  try {
    raw = fs.readFileSync(path.join(POSTS_DIR, filename), "utf-8");
  } catch {
    throw new Error(`${slug}: file not found or unreadable`);
  }
  const { data, content } = matter(raw);
  return { slug, frontmatter: validate(slug, data), content };
}

export function getAllPosts(): Post[] {
  const files = fs.readdirSync(POSTS_DIR).filter((f) => f.endsWith(".mdx"));
  const posts: Post[] = [];
  for (const file of files) {
    try {
      posts.push(readPost(file));
    } catch (err) {
      console.error(`Skipping ${file}:`, err);
    }
  }
  const isProduction = process.env.NODE_ENV === "production";
  return posts
    .filter((p) => !isProduction || !p.frontmatter.draft)
    .sort((a, b) => new Date(b.frontmatter.pubDate).getTime() - new Date(a.frontmatter.pubDate).getTime());
}

export const getPostBySlug = cache(function getPostBySlug(slug: string): Post | undefined {
  const filename = `${slug}.mdx`;
  const filepath = path.join(POSTS_DIR, filename);
  if (!filepath.startsWith(POSTS_DIR + path.sep)) return undefined;
  let post: Post;
  try {
    post = readPost(filename);
  } catch {
    return undefined;
  }
  if (process.env.NODE_ENV === "production" && post.frontmatter.draft) return undefined;
  return post;
});
