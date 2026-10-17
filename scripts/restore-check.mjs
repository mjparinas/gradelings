// Checks a restored copy of the database against production without ever writing to either.
//
//   PROD_URL=libsql://... PROD_TOKEN=<read-only token> \
//   RESTORE_URL=libsql://... RESTORE_TOKEN=<token> \
//   node scripts/restore-check.mjs [--tolerance 2]
//
// Use a read-only token for production (`turso db tokens create <db> --read-only`). Every statement goes
// through readOnly(), which refuses anything but SELECT and the PRAGMAs below, so a slip can't write.
// Do not use src/server/db.ts for this: opening it runs CREATE TABLE and ALTER TABLE.
// Steps and what to do with the result: docs/RESTORE.md.
import { createClient } from "@libsql/client";
import { pathToFileURL } from "node:url";

// Rows that expire or are pruned all the time; a different count here proves nothing.
export const VOLATILE = new Set(["sessions", "rate_limits", "auth_tokens", "live_questions", "live_answers", "class_timers", "webhook_log", "job_runs"]);

const ALLOWED = [/^SELECT\s/i, /^PRAGMA\s+table_info\(/i, /^PRAGMA\s+quick_check/i];

/** Wraps a libsql client so it can only read. */
export function readOnly(client) {
  return {
    async execute(sql) {
      const text = typeof sql === "string" ? sql : sql.sql;
      if (!ALLOWED.some((re) => re.test(text.trim()))) throw new Error(`restore-check only reads; refused: ${text.slice(0, 60)}`);
      return client.execute(sql);
    },
    close: () => client.close(),
  };
}

const quote = (name) => `"${name.replace(/"/g, '""')}"`;

/**
 * Tables with their columns and row counts.
 * @param {{ execute(sql: string): Promise<{ rows: any[] }> }} client
 * @returns {Promise<Record<string, { columns: string[], count: number }>>}
 */
export async function snapshot(client) {
  const tables = (
    await client.execute("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%' AND name NOT LIKE 'libsql_%' AND name NOT LIKE '_litestream%' ORDER BY name")
  ).rows.map((r) => String(r.name));
  /** @type {Record<string, { columns: string[], count: number }>} */
  const out = {};
  for (const name of tables) {
    const columns = (await client.execute(`PRAGMA table_info(${quote(name)})`)).rows.map((r) => String(r.name)).sort();
    const count = Number((await client.execute(`SELECT COUNT(*) AS n FROM ${quote(name)}`)).rows[0].n);
    out[name] = { columns, count };
  }
  return out;
}

/**
 * Compares two snapshots. Production keeps changing after the restore point, so counts are compared with a
 * tolerance (relative, with a floor of 25 rows) and volatile tables only by shape.
 * Returns one line per table plus the problems found.
 * @param {Record<string, { columns: string[], count: number }>} prod
 * @param {Record<string, { columns: string[], count: number }>} restored
 * @param {{ tolerance?: number }} [options]
 */
export function compare(prod, restored, { tolerance = 2 } = {}) {
  const problems = [];
  const lines = [];
  for (const name of Object.keys(prod)) {
    const p = prod[name];
    const r = restored[name];
    if (!r) {
      problems.push(`${name}: missing from the restored copy`);
      lines.push({ name, prod: p.count, restored: null, status: "MISSING" });
      continue;
    }
    const missing = p.columns.filter((c) => !r.columns.includes(c));
    if (missing.length) problems.push(`${name}: restored copy lacks column(s) ${missing.join(", ")}`);
    const diff = Math.abs(p.count - r.count);
    const allowed = Math.max(25, Math.ceil((Math.max(p.count, r.count) * tolerance) / 100));
    let status = "ok";
    if (VOLATILE.has(name)) status = diff ? "changes constantly" : "ok";
    else if (p.count > 0 && r.count === 0) {
      status = "EMPTY";
      problems.push(`${name}: empty in the restored copy but has ${p.count} rows in production`);
    } else if (diff > allowed) {
      status = "DIFFERS";
      problems.push(`${name}: ${r.count} restored against ${p.count} in production (more than ${tolerance}% or 25 rows apart)`);
    } else if (diff) status = "close";
    lines.push({ name, prod: p.count, restored: r.count, status });
  }
  // A table only the restored copy has is an older schema's leftover or a newer one's addition: worth a look, not a failure.
  const extra = Object.keys(restored).filter((n) => !(n in prod));
  return { lines, problems, extra };
}

function sameDatabase(a, b) {
  return a.replace(/\/+$/, "").toLowerCase() === b.replace(/\/+$/, "").toLowerCase();
}

async function main() {
  const { PROD_URL, PROD_TOKEN, RESTORE_URL, RESTORE_TOKEN } = process.env;
  const tolIndex = process.argv.indexOf("--tolerance");
  const tolerance = tolIndex > 0 ? Number(process.argv[tolIndex + 1]) : 2;
  if (!PROD_URL || !RESTORE_URL || !(tolerance >= 0)) {
    console.error("Set PROD_URL, PROD_TOKEN, RESTORE_URL and RESTORE_TOKEN (see the top of this file).");
    process.exit(2);
  }
  if (sameDatabase(PROD_URL, RESTORE_URL)) {
    console.error("PROD_URL and RESTORE_URL are the same database. Nothing to compare.");
    process.exit(2);
  }
  const prod = readOnly(createClient({ url: PROD_URL, authToken: PROD_TOKEN || undefined }));
  const copy = readOnly(createClient({ url: RESTORE_URL, authToken: RESTORE_TOKEN || undefined }));
  try {
    const result = compare(await snapshot(prod), await snapshot(copy), { tolerance });
    const width = Math.max(...result.lines.map((l) => l.name.length));
    for (const l of result.lines) console.log(`${l.name.padEnd(width)}  prod ${String(l.prod).padStart(8)}  restored ${String(l.restored ?? "-").padStart(8)}  ${l.status}`);
    if (result.extra.length) console.log(`\nOnly in the restored copy: ${result.extra.join(", ")}`);
    try {
      const check = (await copy.execute("PRAGMA quick_check")).rows[0];
      console.log(`\nquick_check on the restored copy: ${Object.values(check)[0]}`);
      if (String(Object.values(check)[0]) !== "ok") result.problems.push("quick_check did not say ok");
    } catch (e) {
      console.log(`\nquick_check was not run (${e.message}); run it in \`turso db shell\` instead.`);
    }
    if (result.problems.length) {
      console.log("\nProblems:\n- " + result.problems.join("\n- "));
      process.exitCode = 1;
    } else console.log("\nNo problems found.");
  } finally {
    prod.close();
    copy.close();
  }
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch((e) => {
    console.error(e.message);
    process.exit(1);
  });
}
