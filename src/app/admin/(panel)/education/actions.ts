"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { educationItems } from "@/db/schema";
import { toInt } from "@/lib/admin-forms";

function parse(formData: FormData) {
  return {
    sortOrder: toInt(formData.get("sortOrder")),
    startDate: String(formData.get("startDate") ?? "").trim(),
    endDate: String(formData.get("endDate") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    institution: String(formData.get("institution") ?? "").trim(),
  };
}

function revalidate() {
  revalidatePath("/");
  revalidatePath("/admin/education");
  revalidatePath("/admin");
}

export async function createEducation(formData: FormData) {
  await getDb().insert(educationItems).values(parse(formData));
  revalidate();
}

export async function updateEducation(formData: FormData) {
  const id = toInt(formData.get("id"));
  if (!id) return;
  await getDb()
    .update(educationItems)
    .set({ ...parse(formData), updatedAt: new Date() })
    .where(eq(educationItems.id, id));
  revalidate();
}

export async function deleteEducation(formData: FormData) {
  const id = toInt(formData.get("id"));
  if (!id) return;
  await getDb().delete(educationItems).where(eq(educationItems.id, id));
  revalidate();
}
