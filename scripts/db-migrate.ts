/**
 * Applies every SQL file in scripts/db/ in filename order against DATABASE_URL.
 * All statements are idempotent (IF NOT EXISTS), so re-running is safe.
 *
 * Usage: bun run db:migrate   (Bun loads .env automatically)
 */
import { readFile, readdir } from "node:fs/promises";
import { join } from "node:path";
import { neon } from "@neondatabase/serverless";

const url = process.env.DATABASE_URL;
if (!url) {
  console.error("DATABASE_URL is not set. Put the Neon pooled connection string in .env first.");
  process.exit(1);
}

const db = neon(url);
const dir = join(import.meta.dirname, "db");
const files = (await readdir(dir)).filter((f) => f.endsWith(".sql")).sort();

for (const file of files) {
  const sql = await readFile(join(dir, file), "utf8");
  console.log(`Applying ${file}…`);
  // The HTTP driver runs one statement per call, so split on the blank-line
  // boundary between statements (comments ride along with their statement).
  for (const statement of sql
    .split(/;\s*\n/)
    .map((s) => s.trim())
    .filter(Boolean)) {
    await db.query(statement);
  }
}

console.log(`Done — ${files.length} migration file(s) applied.`);
