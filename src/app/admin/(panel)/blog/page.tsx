import Link from "next/link";
import { getAllPostsAdmin } from "@/db/queries";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function BlogAdmin() {
  const posts = await getAllPostsAdmin();

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <h1 className="font-serif text-3xl text-ink">Blog</h1>
        <Link
          href="/admin/blog/new"
          className="bg-accent px-5 py-2 text-sm font-semibold text-white transition-colors hover:bg-accent-hover"
        >
          New post
        </Link>
      </div>

      {posts.length === 0 ? (
        <p className="mt-8 text-muted">No posts yet.</p>
      ) : (
        <ul className="mt-8 divide-y divide-border border-y border-border">
          {posts.map((post) => (
            <li
              key={post.id}
              className="flex items-center justify-between gap-4 py-4"
            >
              <div>
                <Link
                  href={`/admin/blog/${post.id}`}
                  className="font-medium text-ink transition-colors hover:text-accent"
                >
                  {post.title}
                </Link>
                <p className="text-xs text-muted">
                  /{post.slug} · updated {formatDate(post.updatedAt)}
                </p>
              </div>
              <span
                className={
                  post.published
                    ? "rounded-full bg-heading/15 px-3 py-1 text-xs font-semibold text-heading"
                    : "rounded-full bg-muted/15 px-3 py-1 text-xs font-semibold text-muted"
                }
              >
                {post.published ? "Published" : "Draft"}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
