import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedPosts } from "@/db/queries";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Writing — Saurav Suman",
  description:
    "Notes on backend engineering, distributed systems, and building production software.",
};

export default async function BlogIndex() {
  const posts = await getPublishedPosts();

  return (
    <div>
      <h1 className="font-serif text-4xl text-ink">Writing</h1>
      <p className="mt-2 text-muted">
        Notes on backend engineering and building production software.
      </p>

      {posts.length === 0 ? (
        <p className="mt-10 text-muted">No posts yet — check back soon.</p>
      ) : (
        <ul className="mt-10 space-y-8">
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.slug}`} className="group block">
                <time className="text-xs uppercase tracking-wide text-muted">
                  {formatDate(post.publishedAt)}
                </time>
                <h2 className="mt-1 font-serif text-2xl text-ink transition-colors group-hover:text-accent">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="mt-1 text-muted">{post.excerpt}</p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
