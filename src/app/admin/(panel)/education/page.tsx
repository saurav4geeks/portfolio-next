import { getEducation } from "@/db/queries";
import type { EducationRow } from "@/db/schema";
import { Field } from "@/components/admin/fields";
import { SubmitButton } from "@/components/admin/SubmitButton";
import {
  createEducation,
  updateEducation,
  deleteEducation,
} from "./actions";

export const dynamic = "force-dynamic";

function EducationForm({ item }: { item?: EducationRow }) {
  const isNew = !item;
  return (
    <form
      action={isNew ? createEducation : updateEducation}
      className="space-y-3 rounded-lg border border-border bg-surface p-5"
    >
      {item && <input type="hidden" name="id" value={item.id} />}
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Title" name="title" defaultValue={item?.title} required />
        <Field label="Institution" name="institution" defaultValue={item?.institution} required />
        <Field label="Start date" name="startDate" defaultValue={item?.startDate} required />
        <Field label="End date" name="endDate" defaultValue={item?.endDate} required />
        <Field label="Sort order" name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} />
      </div>
      <div className="flex items-center gap-3">
        <SubmitButton>{isNew ? "Add education" : "Save"}</SubmitButton>
        {item && (
          <SubmitButton
            variant="ghost"
            formAction={deleteEducation}
            confirm="Delete this education entry?"
          >
            Delete
          </SubmitButton>
        )}
      </div>
    </form>
  );
}

export default async function EducationAdmin() {
  const items = await getEducation();
  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-3xl text-ink">Education</h1>
      <p className="mt-2 text-sm text-muted">
        Lower sort order appears first. Changes publish immediately.
      </p>

      <h2 className="mt-8 mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
        Add new
      </h2>
      <EducationForm />

      <h2 className="mt-10 mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
        Existing ({items.length})
      </h2>
      <div className="space-y-5">
        {items.map((item) => (
          <EducationForm key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
