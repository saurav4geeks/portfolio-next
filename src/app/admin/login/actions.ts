"use server";

import { redirect } from "next/navigation";
import { verifyAdminCredentials, startSession } from "@/lib/admin-auth";

export type LoginState = { error?: string };

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const username = String(formData.get("username") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const from = String(formData.get("from") ?? "/admin");

  if (!username || !password) {
    return { error: "Enter both username and password." };
  }

  let ok = false;
  try {
    ok = await verifyAdminCredentials(username, password);
  } catch {
    return { error: "Admin authentication is not configured on the server." };
  }

  if (!ok) {
    return { error: "Invalid username or password." };
  }

  await startSession(username);
  redirect(from.startsWith("/admin") ? from : "/admin");
}
