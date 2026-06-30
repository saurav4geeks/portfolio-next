"use server";

import { revalidatePath } from "next/cache";
import { eq } from "drizzle-orm";
import { getDb } from "@/db";
import { contactSubmissions } from "@/db/schema";

export async function deleteSubmission(formData: FormData) {
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;
  await getDb()
    .delete(contactSubmissions)
    .where(eq(contactSubmissions.id, id));
  revalidatePath("/admin/submissions");
}
