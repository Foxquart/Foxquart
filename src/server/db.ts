import { neon } from "@neondatabase/serverless";

/**
 * Neon's HTTP driver: each query is a fetch, so there is no pool to manage and
 * it works in any serverless runtime. Resolved lazily so importing this module
 * never throws; only actually querying without DATABASE_URL does.
 */
export function getDb() {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL is not set. Add the Neon pooled connection string to the environment.",
    );
  }
  return neon(url);
}
