import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// Account deletion must leave nothing behind. Rather than list tables, this finds every table keyed by a family
// or a parent in the real schema, puts a row in each for one family and a neighbour, deletes the first, and
// checks only the first one's rows went. A new table keyed by family fails here until `deleteFamilyData` clears it.

const dir = mkdtempSync(join(tmpdir(), "grademap-delfam-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
delete process.env.RESEND_API_KEY;

let dbm: typeof import("@/server/db");
let del: typeof import("@/server/deleteFamily");
let signup: (req: Request) => Promise<Response>;

beforeAll(async () => {
  dbm = await import("@/server/db");
  del = await import("@/server/deleteFamily");
  signup = (await import("@/server/testing/signupWithSession")).POST;
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let n = 0;
async function family(): Promise<{ id: string; parent: string }> {
  const email = `del${++n}@example.com`;
  await signup(new Request("http://localhost/api/auth/signup/", { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": `10.6.0.${n}` }, body: JSON.stringify({ email, password: "correct horse battery" }) }));
  const r = (await dbm.query<{ id: string; family_id: string }>("SELECT id, family_id FROM parents WHERE email = ?", [email]))[0];
  return { id: r.family_id, parent: r.id };
}

interface Col { name: string; type: string; notnull: number; pk: number }
async function tables(): Promise<{ table: string; cols: Col[] }[]> {
  const names = (await dbm.query<{ name: string }>("SELECT name FROM sqlite_master WHERE type = 'table' AND name NOT LIKE 'sqlite_%'")).map((t) => t.name);
  const out = [];
  for (const table of names) out.push({ table, cols: await dbm.query<Col>(`PRAGMA table_info("${table}")`) });
  return out;
}

/** Puts one row in `table`, with the given key columns, with a plain value in every other required column. */
let planted = 0; // keeps every planted key unique, so no row is ignored as a duplicate
async function plant(table: string, cols: Col[], keys: Record<string, string>, tag: string): Promise<boolean> {
  const names: string[] = [];
  const args: (string | number)[] = [];
  for (const c of cols) {
    if (c.name in keys) { names.push(c.name); args.push(keys[c.name]); continue; }
    if (c.pk && /INT/i.test(c.type) && !c.notnull) continue; // autoincrement
    if (!c.notnull && !c.pk) continue;
    names.push(c.name);
    args.push(/INT|REAL|NUM/i.test(c.type) ? 1 : `${tag}${++planted}-${c.name}`);
  }
  try {
    await dbm.run(`INSERT OR IGNORE INTO "${table}" (${names.map((x) => `"${x}"`).join(", ")}) VALUES (${names.map(() => "?").join(", ")})`, args);
    return true;
  } catch {
    return false;
  }
}
const count = async (table: string, column: string, value: string) => Number((await dbm.query<{ c: number }>(`SELECT COUNT(*) AS c FROM "${table}" WHERE "${column}" = ?`, [value]))[0].c);

// Tables that keep a family's rows on purpose: money stays in the revenue totals, pointing at nobody.
const ANONYMISED = new Set(["payments", "cancellations"]);
// Student accounts are keyed by their own hidden family and are removed through their class (`removeStudent`).
const SKIPPED = new Set(["families", "parents", "students"]);

describe("deleteFamilyData", () => {
  it("clears every table keyed by family or parent, for that family only", async () => {
    const [a, b] = [await family(), await family()];
    const rows: { table: string; keys: Record<string, string>; other: Record<string, string>; neighbour: boolean }[] = [];
    for (const { table, cols } of await tables()) {
      if (SKIPPED.has(table)) continue;
      const keysOf = (f: { id: string; parent: string }) => ({ ...(cols.some((c) => c.name === "family_id") ? { family_id: f.id } : {}), ...(cols.some((c) => c.name === "parent_id") ? { parent_id: f.parent } : {}) });
      if (!Object.keys(keysOf(a)).length) continue;
      const okA = await plant(table, cols, keysOf(a), "a");
      const okB = await plant(table, cols, keysOf(b), "b");
      if (okA) rows.push({ table, keys: keysOf(a), other: keysOf(b), neighbour: okB });
    }
    expect(rows.length).toBeGreaterThan(10);

    await del.deleteFamilyData(a.id);

    const left: string[] = [];

    const where = (keys: Record<string, string>) => Object.keys(keys).map((k) => `"${k}" = ?`).join(" AND ");
    const have = async (table: string, keys: Record<string, string>) => Number((await dbm.query<{ c: number }>(`SELECT COUNT(*) AS c FROM "${table}" WHERE ${where(keys)}`, Object.values(keys)))[0].c);
    for (const { table, keys, other, neighbour } of rows) {
      if (!ANONYMISED.has(table) && (await have(table, keys)) > 0) left.push(table);
      if (neighbour && !ANONYMISED.has(table) && (await have(table, other)) === 0) left.push(`${table} (neighbour lost its row)`);
    }
    expect(left).toEqual([]);
    expect(await dbm.query("SELECT id FROM families WHERE id = ?", [a.id])).toHaveLength(0);
    expect(await dbm.query("SELECT id FROM parents WHERE family_id = ?", [a.id])).toHaveLength(0);
    expect(await dbm.query("SELECT id FROM families WHERE id = ?", [b.id])).toHaveLength(1);
    for (const t of ANONYMISED) {
      const cols = (await tables()).find((x) => x.table === t)!.cols;
      if (cols.some((c) => c.name === "family_id")) expect(await count(t, "family_id", a.id)).toBe(0);
    }
  });

  it("deleteChildData removes the children's data and leaves the parent", async () => {
    const [a, b] = [await family(), await family()];
    const childTables = del.childDataStatements(a.id).map((s) => /DELETE FROM (\w+)/.exec(s.sql)![1]);
    const all = await tables();
    const used: string[] = [];
    for (const t of childTables) {
      const cols = all.find((x) => x.table === t)?.cols ?? [];
      if (!cols.some((c) => c.name === "family_id")) continue;
      if (!(await plant(t, cols, { family_id: a.id }, "a"))) continue;
      if (await plant(t, cols, { family_id: b.id }, "b")) used.push(t);
    }
    expect(used.length).toBeGreaterThan(3);
    await del.deleteChildData(a.id);
    for (const t of used) {
      expect(await count(t, "family_id", a.id), t).toBe(0);
      expect(await count(t, "family_id", b.id), t).toBeGreaterThan(0);
    }
    expect(await dbm.query("SELECT id FROM parents WHERE family_id = ?", [a.id])).toHaveLength(1);
    expect(await dbm.query("SELECT id FROM families WHERE id = ?", [a.id])).toHaveLength(1);
  });
});
