import { getExperience } from "@/db/queries";
import type { ExperienceRow } from "@/db/schema";
import { Field, TextAreaField } from "@/components/admin/fields";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { arrayToLines } from "@/lib/admin-forms";
import { createExperience, updateExperience, deleteExperience } from "./actions";

export const dynamic = "force-dynamic";

function ExperienceForm({ item }: { item?: ExperienceRow }) {
  const isNew = !item;
  return (
    <form
      action={isNew ? createExperience : updateExperience}
      className="space-y-3 rounded-lg border border-border bg-surface p-5"
    >
      {item && <input type="hidden" name="id" value={item.id} />}
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Position" name="position" defaultValue={item?.position} required />
        <Field label="Company" name="company" defaultValue={item?.company} required />
        <Field label="Start date" name="startDate" defaultValue={item?.startDate} required />
        <Field label="End date" name="endDate" defaultValue={item?.endDate} required />
        <Field label="Location" name="location" defaultValue={item?.location} required />
        <Field label="Sort order" name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} />
      </div>
      <TextAreaField
        label="Highlights"
        name="highlights"
        rows={5}
        hint="One bullet per line."
        defaultValue={arrayToLines(item?.highlights)}
      />
      <div className="flex items-center gap-3">
        <SubmitButton>{isNew ? "Add experience" : "Save"}</SubmitButton>
        {item && (
          <SubmitButton
            variant="ghost"
            formAction={deleteExperience}
            confirm="Delete this experience entry?"
          >
            Delete
          </SubmitButton>
        )}
      </div>
    </form>
  );
}

export default async function ExperienceAdmin() {
  const items = await getExperience();
  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-3xl text-ink">Experience</h1>
      <p className="mt-2 text-sm text-muted">
        Lower sort order appears first. Changes publish immediately.
      </p>

      <h2 className="mt-8 mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
        Add new
      </h2>
      <ExperienceForm />

      <h2 className="mt-10 mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
        Existing ({items.length})
      </h2>
      <div className="space-y-5">
        {items.map((item) => (
          <ExperienceForm key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
