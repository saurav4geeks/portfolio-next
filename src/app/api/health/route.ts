import { NextResponse } from "next/server";
import { sql } from "drizzle-orm";
import { getDb } from "@/db";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Lightweight health check. A daily Vercel Cron hits this to keep the Supabase
 * project active (free-tier projects pause after ~7 days of inactivity), and it
 * doubles as an uptime/DB probe.
 */
export async function GET() {
  try {
    await getDb().execute(sql`select 1`);
    return NextResponse.json({ status: "ok", db: "up" });
  } catch (error) {
    console.error("[health] database probe failed:", error);
    return NextResponse.json({ status: "degraded", db: "down" }, { status: 503 });
  }
}
