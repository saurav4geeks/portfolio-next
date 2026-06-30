import { drizzle, type PostgresJsDatabase } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";

type DB = PostgresJsDatabase<typeof schema>;

// Cache the client across hot-reloads in dev and across warm serverless
// invocations in prod, so we don't open a new pool on every request.
const globalForDb = globalThis as unknown as {
  __pgClient?: ReturnType<typeof postgres>;
  __db?: DB;
};

/**
 * Lazily create the Drizzle client. We avoid touching DATABASE_URL at module
 * load so `next build` (which imports route modules to read their config)
 * never fails when the env var is absent — it's only required at request time.
 */
export function getDb(): DB {
  if (globalForDb.__db) return globalForDb.__db;

  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error("DATABASE_URL is not set");
  }

  // Supabase (and other hosted Postgres) require TLS; local dev does not.
  const isLocal =
    connectionString.includes("localhost") ||
    connectionString.includes("127.0.0.1");
  const client =
    globalForDb.__pgClient ??
    postgres(connectionString, {
      prepare: false, // required for transaction-mode poolers (Supabase/PgBouncer)
      ssl: isLocal ? false : "require",
    });
  const db = drizzle(client, { schema });

  if (process.env.NODE_ENV !== "production") {
    globalForDb.__pgClient = client;
    globalForDb.__db = db;
  }
  return db;
}
