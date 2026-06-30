import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { contactSubmissions } from "@/db/schema";
import { contactSchema } from "@/lib/contact-schema";

export const runtime = "nodejs";

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Please check the form and try again.",
        fieldErrors: parsed.error.flatten().fieldErrors,
      },
      { status: 422 },
    );
  }

  const { company, phone, ...data } = parsed.data;

  // Honeypot tripped: respond OK so bots can't distinguish, but don't store.
  if (company) {
    return NextResponse.json({ ok: true });
  }

  try {
    await getDb()
      .insert(contactSubmissions)
      .values({ ...data, phone: phone || null });
  } catch (error) {
    console.error("Failed to store contact submission:", error);
    return NextResponse.json(
      { error: "Something went wrong saving your message. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ ok: true }, { status: 201 });
}
