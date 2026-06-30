import { getProjects } from "@/db/queries";
import type { ProjectRow } from "@/db/schema";
import { Field, TextAreaField } from "@/components/admin/fields";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { arrayToLines } from "@/lib/admin-forms";
import { createProject, updateProject, deleteProject } from "./actions";

export const dynamic = "force-dynamic";

function ProjectForm({ item }: { item?: ProjectRow }) {
  const isNew = !item;
  return (
    <form
      action={isNew ? createProject : updateProject}
      className="space-y-3 rounded-lg border border-border bg-surface p-5"
    >
      {item && <input type="hidden" name="id" value={item.id} />}
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Title" name="title" defaultValue={item?.title} required />
        <Field label="Date" name="date" defaultValue={item?.date} required />
        <Field label="Stack" name="stack" defaultValue={item?.stack} required />
        <Field label="Sort order" name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} />
        <Field label="Link (optional)" name="link" defaultValue={item?.link} placeholder="https://…" />
        <Field label="Link label (optional)" name="linkLabel" defaultValue={item?.linkLabel} placeholder="View on GitHub" />
      </div>
      <TextAreaField
        label="Highlights"
        name="highlights"
        rows={5}
        hint="One bullet per line."
        defaultValue={arrayToLines(item?.highlights)}
      />
      <div className="flex items-center gap-3">
        <SubmitButton>{isNew ? "Add project" : "Save"}</SubmitButton>
        {item && (
          <SubmitButton
            variant="ghost"
            formAction={deleteProject}
            confirm="Delete this project?"
          >
            Delete
          </SubmitButton>
        )}
      </div>
    </form>
  );
}

export default async function ProjectsAdmin() {
  const items = await getProjects();
  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-3xl text-ink">Projects</h1>
      <p className="mt-2 text-sm text-muted">
        Lower sort order appears first. Changes publish immediately.
      </p>

      <h2 className="mt-8 mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
        Add new
      </h2>
      <ProjectForm />

      <h2 className="mt-10 mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
        Existing ({items.length})
      </h2>
      <div className="space-y-5">
        {items.map((item) => (
          <ProjectForm key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
