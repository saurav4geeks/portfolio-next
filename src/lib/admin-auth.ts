import "server-only";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_AGE,
  createSessionToken,
  verifySessionToken,
} from "./auth";

/**
 * Resolve the bcrypt hash from its env var. We store it base64-encoded so the
 * `$` characters in a bcrypt hash aren't mangled by dotenv variable expansion
 * in local `.env` files. A raw bcrypt hash (starting with `$2`) is also
 * accepted — handy when set directly in a host dashboard that doesn't expand.
 */
function resolvePasswordHash(raw: string): string {
  if (raw.startsWith("$2")) return raw;
  try {
    return Buffer.from(raw, "base64").toString("utf8");
  } catch {
    return raw;
  }
}

/** Verify a username/password against the env-configured admin credentials. */
export async function verifyAdminCredentials(
  username: string,
  password: string,
): Promise<boolean> {
  const expectedUser = process.env.ADMIN_USERNAME;
  const rawHash = process.env.ADMIN_PASSWORD_HASH;
  if (!expectedUser || !rawHash) {
    throw new Error("ADMIN_USERNAME / ADMIN_PASSWORD_HASH are not configured");
  }
  const passwordHash = resolvePasswordHash(rawHash);
  if (username !== expectedUser) {
    // Still run a compare to keep timing roughly constant.
    await bcrypt.compare(password, passwordHash);
    return false;
  }
  return bcrypt.compare(password, passwordHash);
}

/** Create the session cookie after a successful login. */
export async function startSession(username: string): Promise<void> {
  const token = await createSessionToken(username);
  (await cookies()).set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
}

/** Clear the session cookie (logout). */
export async function endSession(): Promise<void> {
  (await cookies()).delete(SESSION_COOKIE_NAME);
}

/** Read the current admin session, or null. For use in server components/actions. */
export async function getSession() {
  const token = (await cookies()).get(SESSION_COOKIE_NAME)?.value;
  return token ? verifySessionToken(token) : null;
}
