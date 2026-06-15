import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jaredalonzo.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/resume`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    ...posts.map((post) => ({
      url: `${BASE_URL}/posts/${post.slug}`,
      lastModified: new Date(post.frontmatter.updatedDate ?? post.frontmatter.pubDate),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
