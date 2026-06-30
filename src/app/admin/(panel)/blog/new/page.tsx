import Link from "next/link";
import { PostForm } from "../PostForm";

export const dynamic = "force-dynamic";

export default function NewPostPage() {
  return (
    <div className="max-w-3xl">
      <Link
        href="/admin/blog"
        className="text-sm text-muted transition-colors hover:text-accent"
      >
        ← All posts
      </Link>
      <h1 className="mt-3 mb-6 font-serif text-3xl text-ink">New post</h1>
      <PostForm />
    </div>
  );
}
