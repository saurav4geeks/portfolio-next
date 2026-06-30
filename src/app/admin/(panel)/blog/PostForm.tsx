import type { BlogPostRow } from "@/db/schema";
import { Field, TextAreaField } from "@/components/admin/fields";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { createPost, updatePost, deletePost } from "./actions";

export function PostForm({ post }: { post?: BlogPostRow }) {
  const isNew = !post;
  return (
    <form
      action={isNew ? createPost : updatePost}
      className="space-y-4 rounded-lg border border-border bg-surface p-6"
    >
      {post && <input type="hidden" name="id" value={post.id} />}

      <Field label="Title" name="title" defaultValue={post?.title} required />
      <Field
        label="Slug"
        name="slug"
        defaultValue={post?.slug}
        placeholder="leave blank to auto-generate from title"
      />
      <TextAreaField
        label="Excerpt"
        name="excerpt"
        rows={2}
        hint="Short summary shown on the blog index and in search results."
        defaultValue={post?.excerpt}
      />
      <Field
        label="Cover image URL (optional)"
        name="coverImage"
        defaultValue={post?.coverImage}
        placeholder="https://…"
      />

      <label className="flex items-center gap-2 text-sm text-ink">
        <input
          type="checkbox"
          name="published"
          defaultChecked={post?.published}
          className="h-4 w-4"
        />
        Published
      </label>

      <TextAreaField
        label="Content (Markdown / MDX)"
        name="content"
        rows={18}
        hint="Supports Markdown, GFM tables, and fenced code blocks."
        defaultValue={post?.content}
      />

      <div className="flex items-center gap-3">
        <SubmitButton>{isNew ? "Create post" : "Save"}</SubmitButton>
        {post && (
          <SubmitButton
            variant="ghost"
            formAction={deletePost}
            confirm="Delete this post permanently?"
          >
            Delete
          </SubmitButton>
        )}
      </div>
    </form>
  );
}
