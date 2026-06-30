import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getPublishedPostBySlug } from "@/db/queries";
import { Mdx } from "@/components/blog/Mdx";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) return { title: "Not found" };
  return {
    title: `${post.title} — Saurav Suman`,
    description: post.excerpt || undefined,
    openGraph: { title: post.title, description: post.excerpt, type: "article" },
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPublishedPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <Link
        href="/blog"
        className="text-sm text-muted transition-colors hover:text-accent"
      >
        ← All posts
      </Link>
      <h1 className="mt-4 font-serif text-4xl leading-tight text-ink">
        {post.title}
      </h1>
      <time className="mt-3 block text-sm uppercase tracking-wide text-muted">
        {formatDate(post.publishedAt)}
      </time>
      <div className="prose prose-neutral mt-8 max-w-none prose-headings:font-serif prose-a:text-accent prose-a:no-underline hover:prose-a:underline">
        <Mdx source={post.content} />
      </div>
    </article>
  );
}
