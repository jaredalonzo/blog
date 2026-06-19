import { getAllPosts } from "@/lib/posts";

function cdata(str: string): string {
  return `<![CDATA[${str.replace(/]]>/g, "]]]]><![CDATA[>")}]]>`;
}

function escapeXml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://jaredalonzo.dev";
const SITE_TITLE = "Jared Alonzo";
const SITE_DESCRIPTION = "Engineering writing by Jared Alonzo.";
const AUTHOR_EMAIL = "jared.alonzo@icloud.com";
const AUTHOR_NAME = "Jared Alonzo";

function toRfc822(dateStr: string): string {
  return new Date(`${dateStr}T12:00:00Z`).toUTCString();
}

export function GET() {
  const posts = getAllPosts();

  const lastBuildDate = posts.length > 0 ? toRfc822(posts[0].frontmatter.pubDate) : new Date().toUTCString();

  const items = posts
    .map(
      (post) => `
    <item>
      <title>${cdata(post.frontmatter.title)}</title>
      <link>${SITE_URL}/posts/${escapeXml(post.slug)}</link>
      <guid isPermaLink="true">${SITE_URL}/posts/${escapeXml(post.slug)}</guid>
      <pubDate>${toRfc822(post.frontmatter.pubDate)}</pubDate>
      <author>${escapeXml(AUTHOR_EMAIL)} (${escapeXml(AUTHOR_NAME)})</author>
      <description>${cdata(post.frontmatter.description)}</description>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en</language>
    <managingEditor>${escapeXml(AUTHOR_EMAIL)} (${escapeXml(AUTHOR_NAME)})</managingEditor>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
    <atom:link href="${SITE_URL}/rss.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
