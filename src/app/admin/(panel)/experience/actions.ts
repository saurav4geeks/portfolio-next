"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { experienceItems } from "@/db/schema";
import { linesToArray, toInt } from "@/lib/admin-forms";

function parse(formData: FormData) {
  return {
    sortOrder: toInt(formData.get("sortOrder")),
    startDate: String(formData.get("startDate") ?? "").trim(),
    endDate: String(formData.get("endDate") ?? "").trim(),
    position: String(formData.get("position") ?? "").trim(),
    company: String(formData.get("company") ?? "").trim(),
    location: String(formData.get("location") ?? "").trim(),
    highlights: linesToArray(formData.get("highlights")),
  };
}

function revalidate() {
  revalidatePath("/");
  revalidatePath("/admin/experience");
  revalidatePath("/admin");
}

export async function createExperience(formData: FormData) {
  await getDb().insert(experienceItems).values(parse(formData));
  revalidate();
}

export async function updateExperience(formData: FormData) {
  const id = toInt(formData.get("id"));
  if (!id) return;
  await getDb()
    .update(experienceItems)
    .set({ ...parse(formData), updatedAt: new Date() })
    .where(eq(experienceItems.id, id));
  revalidate();
}

export async function deleteExperience(formData: FormData) {
  const id = toInt(formData.get("id"));
  if (!id) return;
  await getDb().delete(experienceItems).where(eq(experienceItems.id, id));
  revalidate();
}
