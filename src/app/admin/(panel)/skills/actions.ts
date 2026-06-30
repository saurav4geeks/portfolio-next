"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { skillGroups } from "@/db/schema";
import { linesToArray, toInt } from "@/lib/admin-forms";

function parse(formData: FormData) {
  return {
    sortOrder: toInt(formData.get("sortOrder")),
    label: String(formData.get("label") ?? "").trim(),
    items: linesToArray(formData.get("items")),
  };
}

function revalidate() {
  revalidatePath("/");
  revalidatePath("/admin/skills");
  revalidatePath("/admin");
}

export async function createSkillGroup(formData: FormData) {
  await getDb().insert(skillGroups).values(parse(formData));
  revalidate();
}

export async function updateSkillGroup(formData: FormData) {
  const id = toInt(formData.get("id"));
  if (!id) return;
  await getDb()
    .update(skillGroups)
    .set({ ...parse(formData), updatedAt: new Date() })
    .where(eq(skillGroups.id, id));
  revalidate();
}

export async function deleteSkillGroup(formData: FormData) {
  const id = toInt(formData.get("id"));
  if (!id) return;
  await getDb().delete(skillGroups).where(eq(skillGroups.id, id));
  revalidate();
}
