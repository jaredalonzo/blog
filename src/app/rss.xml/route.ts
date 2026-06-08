import { getAllPosts } from "@/lib/posts";

function cdata(str: string): string {
  return `<![CDATA[${str.replace(/]]>/g, "]]>]]><![CDATA[")}]]>`;
}

function escapeXml(str: string): string {
  return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

const SITE_URL = "https://jaredalonzo.dev";
const SITE_TITLE = "Jared Alonzo";
const SITE_DESCRIPTION = "Engineering writing by Jared Alonzo.";

export function GET() {
  const posts = getAllPosts();

  const items = posts
    .map(
      (post) => `
    <item>
      <title>${cdata(post.frontmatter.title)}</title>
      <link>${SITE_URL}/posts/${escapeXml(post.slug)}</link>
      <guid>${SITE_URL}/posts/${escapeXml(post.slug)}</guid>
      <pubDate>${new Date(`${post.frontmatter.pubDate}T12:00:00Z`).toUTCString()}</pubDate>
      <description>${cdata(post.frontmatter.description)}</description>
    </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>${SITE_TITLE}</title>
    <link>${SITE_URL}</link>
    <description>${SITE_DESCRIPTION}</description>
    <language>en</language>
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: { "Content-Type": "application/xml; charset=utf-8" },
  });
}
