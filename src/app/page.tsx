import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

export default function Home() {
  const posts = getAllPosts();

  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <section className="mb-14">
        <div className="flex items-baseline justify-between mb-3">
          <h1 className="text-2xl font-semibold">Jared Alonzo</h1>
          <Link href="/resume" className="text-sm text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
            Resume
          </Link>
        </div>
        <p className="text-gray-600 dark:text-gray-400">
          Customer engineer by day. I&apos;m teaching myself to build agentic systems
          and writing about what I get wrong along the way.
        </p>
      </section>

      <section>
        <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-400 mb-6">
          Writing
        </h2>
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts yet.</p>
        ) : (
          <ul className="space-y-8">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link href={`/posts/${post.slug}`} className="group">
                  <time className="text-sm text-gray-400">
                    {post.frontmatter.pubDate}
                  </time>
                  <h3 className="text-lg font-medium group-hover:underline mt-0.5">
                    {post.frontmatter.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1 text-sm">
                    {post.frontmatter.description}
                  </p>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
