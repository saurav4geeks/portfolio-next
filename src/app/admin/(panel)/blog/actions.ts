"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { and, eq, ne } from "drizzle-orm";
import { getDb } from "@/db";
import { blogPosts } from "@/db/schema";
import { toInt, toNullableText } from "@/lib/admin-forms";

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** Ensure the slug is unique, appending -2, -3, … if needed. */
async function uniqueSlug(base: string, excludeId?: number): Promise<string> {
  const db = getDb();
  let candidate = base || "post";
  let n = 1;
  for (;;) {
    const rows = await db
      .select({ id: blogPosts.id })
      .from(blogPosts)
      .where(
        excludeId
          ? and(eq(blogPosts.slug, candidate), ne(blogPosts.id, excludeId))
          : eq(blogPosts.slug, candidate),
      )
      .limit(1);
    if (rows.length === 0) return candidate;
    n += 1;
    candidate = `${base}-${n}`;
  }
}

function revalidate(slug?: string) {
  revalidatePath("/blog");
  revalidatePath("/admin/blog");
  revalidatePath("/admin");
  if (slug) revalidatePath(`/blog/${slug}`);
}

export async function createPost(formData: FormData) {
  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const published = formData.get("published") === "on";
  const slug = await uniqueSlug(slugify(slugInput || title));

  await getDb()
    .insert(blogPosts)
    .values({
      slug,
      title,
      excerpt: String(formData.get("excerpt") ?? "").trim(),
      content: String(formData.get("content") ?? ""),
      coverImage: toNullableText(formData.get("coverImage")),
      published,
      publishedAt: published ? new Date() : null,
    });

  revalidate(slug);
  redirect("/admin/blog");
}

export async function updatePost(formData: FormData) {
  const id = toInt(formData.get("id"));
  if (!id) return;

  const existing = await getDb()
    .select()
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .limit(1);
  if (existing.length === 0) return;
  const prev = existing[0];

  const title = String(formData.get("title") ?? "").trim();
  const slugInput = String(formData.get("slug") ?? "").trim();
  const published = formData.get("published") === "on";
  const slug = await uniqueSlug(slugify(slugInput || title), id);

  // Stamp publishedAt the first time a post goes live; keep it thereafter.
  const publishedAt =
    published && !prev.publishedAt ? new Date() : prev.publishedAt;

  await getDb()
    .update(blogPosts)
    .set({
      slug,
      title,
      excerpt: String(formData.get("excerpt") ?? "").trim(),
      content: String(formData.get("content") ?? ""),
      coverImage: toNullableText(formData.get("coverImage")),
      published,
      publishedAt,
      updatedAt: new Date(),
    })
    .where(eq(blogPosts.id, id));

  revalidate(slug);
  if (prev.slug !== slug) revalidate(prev.slug);
  redirect("/admin/blog");
}

export async function deletePost(formData: FormData) {
  const id = toInt(formData.get("id"));
  if (!id) return;
  const [row] = await getDb()
    .select({ slug: blogPosts.slug })
    .from(blogPosts)
    .where(eq(blogPosts.id, id))
    .limit(1);
  await getDb().delete(blogPosts).where(eq(blogPosts.id, id));
  revalidate(row?.slug);
  redirect("/admin/blog");
}
