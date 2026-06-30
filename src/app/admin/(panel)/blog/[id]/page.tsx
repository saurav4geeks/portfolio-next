import Link from "next/link";
import { notFound } from "next/navigation";
import { getPostById } from "@/db/queries";
import { PostForm } from "../PostForm";

export const dynamic = "force-dynamic";

export default async function EditPostPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPostById(Number(id));
  if (!post) notFound();

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between">
        <Link
          href="/admin/blog"
          className="text-sm text-muted transition-colors hover:text-accent"
        >
          ← All posts
        </Link>
        {post.published && (
          <Link
            href={`/blog/${post.slug}`}
            target="_blank"
            className="text-sm text-muted transition-colors hover:text-accent"
          >
            View live ↗
          </Link>
        )}
      </div>
      <h1 className="mt-3 mb-6 font-serif text-3xl text-ink">Edit post</h1>
      <PostForm post={post} />
    </div>
  );
}
