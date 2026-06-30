"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { projectItems } from "@/db/schema";
import { linesToArray, toInt, toNullableText } from "@/lib/admin-forms";

function parse(formData: FormData) {
  return {
    sortOrder: toInt(formData.get("sortOrder")),
    date: String(formData.get("date") ?? "").trim(),
    title: String(formData.get("title") ?? "").trim(),
    stack: String(formData.get("stack") ?? "").trim(),
    highlights: linesToArray(formData.get("highlights")),
    link: toNullableText(formData.get("link")),
    linkLabel: toNullableText(formData.get("linkLabel")),
  };
}

function revalidate() {
  revalidatePath("/");
  revalidatePath("/admin/projects");
  revalidatePath("/admin");
}

export async function createProject(formData: FormData) {
  await getDb().insert(projectItems).values(parse(formData));
  revalidate();
}

export async function updateProject(formData: FormData) {
  const id = toInt(formData.get("id"));
  if (!id) return;
  await getDb()
    .update(projectItems)
    .set({ ...parse(formData), updatedAt: new Date() })
    .where(eq(projectItems.id, id));
  revalidate();
}

export async function deleteProject(formData: FormData) {
  const id = toInt(formData.get("id"));
  if (!id) return;
  await getDb().delete(projectItems).where(eq(projectItems.id, id));
  revalidate();
}
