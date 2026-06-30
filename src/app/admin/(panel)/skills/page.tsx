import { getSkills } from "@/db/queries";
import type { SkillGroupRow } from "@/db/schema";
import { Field, TextAreaField } from "@/components/admin/fields";
import { SubmitButton } from "@/components/admin/SubmitButton";
import { arrayToLines } from "@/lib/admin-forms";
import {
  createSkillGroup,
  updateSkillGroup,
  deleteSkillGroup,
} from "./actions";

export const dynamic = "force-dynamic";

function SkillForm({ item }: { item?: SkillGroupRow }) {
  const isNew = !item;
  return (
    <form
      action={isNew ? createSkillGroup : updateSkillGroup}
      className="space-y-3 rounded-lg border border-border bg-surface p-5"
    >
      {item && <input type="hidden" name="id" value={item.id} />}
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Group label" name="label" defaultValue={item?.label} required />
        <Field label="Sort order" name="sortOrder" type="number" defaultValue={item?.sortOrder ?? 0} />
      </div>
      <TextAreaField
        label="Skills"
        name="items"
        rows={5}
        hint="One skill per line."
        defaultValue={arrayToLines(item?.items)}
      />
      <div className="flex items-center gap-3">
        <SubmitButton>{isNew ? "Add group" : "Save"}</SubmitButton>
        {item && (
          <SubmitButton
            variant="ghost"
            formAction={deleteSkillGroup}
            confirm="Delete this skill group?"
          >
            Delete
          </SubmitButton>
        )}
      </div>
    </form>
  );
}

export default async function SkillsAdmin() {
  const items = await getSkills();
  return (
    <div className="max-w-3xl">
      <h1 className="font-serif text-3xl text-ink">Skills</h1>
      <p className="mt-2 text-sm text-muted">
        Grouped skill lists shown beside Projects. Lower sort order first.
      </p>

      <h2 className="mt-8 mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
        Add new
      </h2>
      <SkillForm />

      <h2 className="mt-10 mb-3 text-sm font-semibold uppercase tracking-wide text-accent">
        Existing ({items.length})
      </h2>
      <div className="space-y-5">
        {items.map((item) => (
          <SkillForm key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
