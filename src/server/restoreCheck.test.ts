import { createClient } from "@libsql/client";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, describe, expect, it } from "vitest";
import { compare, readOnly, snapshot } from "../../scripts/restore-check.mjs";

const dir = mkdtempSync(join(tmpdir(), "restore-check-"));
afterAll(() => rmSync(dir, { recursive: true, force: true }));

async function database(name: string, families: number, extra: string[] = []) {
  const c = createClient({ url: `file:${join(dir, name)}` });
  await c.execute("CREATE TABLE families (id TEXT PRIMARY KEY, plan TEXT)");
  await c.execute("CREATE TABLE sessions (token TEXT PRIMARY KEY)");
  for (let i = 0; i < families; i++) await c.execute({ sql: "INSERT INTO families VALUES (?, 'trial')", args: [`f${i}`] });
  for (const sql of extra) await c.execute(sql);
  return c;
}

describe("restore check", () => {
  it("reads tables, columns and counts", async () => {
    const snap = await snapshot(readOnly(await database("a.db", 3)));
    expect(snap.families).toEqual({ columns: ["id", "plan"], count: 3 });
    expect(snap.sessions.count).toBe(0);
  });

  it("refuses to write", async () => {
    const guarded = readOnly(await database("b.db", 1));
    await expect(guarded.execute("DELETE FROM families")).rejects.toThrow(/only reads/);
    await expect(guarded.execute("PRAGMA writable_schema = 1")).rejects.toThrow(/only reads/);
    await expect(guarded.execute("  SELECT 1")).resolves.toBeTruthy();
  });

  it("accepts a restore a little behind production", async () => {
    const prod = await snapshot(await database("c.db", 1000));
    const restored = await snapshot(await database("d.db", 990));
    expect(compare(prod, restored).problems).toEqual([]);
  });

  it("flags a table that is missing, empty or far apart", async () => {
    const prod = await snapshot(await database("e.db", 1000));
    expect(compare(prod, { sessions: prod.sessions }).problems[0]).toMatch(/families: missing/);
    expect(compare(prod, { ...prod, families: { ...prod.families, count: 0 } }).problems[0]).toMatch(/empty/);
    expect(compare(prod, { ...prod, families: { ...prod.families, count: 700 } }).problems[0]).toMatch(/700 restored against 1000/);
  });

  it("flags a missing column but ignores volatile counts", async () => {
    const prod = await snapshot(await database("f.db", 5));
    const restored = JSON.parse(JSON.stringify(prod));
    restored.families.columns = ["id"];
    restored.sessions.count = 500;
    const { problems, lines } = compare(prod, restored);
    expect(problems).toEqual(["families: restored copy lacks column(s) plan"]);
    expect(lines.find((l: { name: string }) => l.name === "sessions")?.status).toBe("changes constantly");
  });

  it("lists tables only the restored copy has", async () => {
    const prod = await snapshot(await database("g.db", 1));
    const restored = await snapshot(await database("h.db", 1, ["CREATE TABLE old_stuff (x)"]));
    expect(compare(prod, restored).extra).toEqual(["old_stuff"]);
  });
});
