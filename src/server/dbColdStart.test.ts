// A server's first query brings the database up to date (SCHEMA and migrate in db.ts). Turso bills every row a query
// reads and each statement is a network hop, so an up-to-date database must cost a few hops and read no table
// (2026-11-16: the old start scanned `classes` and `parents` every time).
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, describe, expect, it, vi } from "vitest";

const dir = mkdtempSync(join(tmpdir(), "gradelings-coldstart-"));
const url = `file:${join(dir, "test.db")}`;
const sent: string[] = [];

/** A fresh server: a new db module whose client records every statement it sends. */
async function coldStart() {
  vi.resetModules();
  vi.stubEnv("DATABASE_URL", url);
  vi.doMock("@libsql/client", async () => {
    const real = await vi.importActual<typeof import("@libsql/client")>("@libsql/client");
    return {
      ...real,
      createClient: (cfg: Parameters<typeof real.createClient>[0]) => {
        const c = real.createClient(cfg);
        return new Proxy(c, {
          get(target, prop, recv) {
            const v = Reflect.get(target, prop, recv) as unknown;
            if (typeof v !== "function") return v;
            const f = (v as (...a: unknown[]) => unknown).bind(target);
            if (prop === "execute") return (s: unknown) => (sent.push(typeof s === "string" ? s : String((s as { sql: string }).sql)), f(s));
            if (prop === "batch") return (s: unknown[], m: unknown) => (sent.push(`batch: ${s.map(String).join("; ")}`), f(s, m));
            return f;
          },
        });
      },
    };
  });
  const dbm = await import("./db");
  sent.length = 0;
  await dbm.db();
  return dbm;
}

afterAll(() => {
  vi.unstubAllEnvs();
  vi.doUnmock("@libsql/client");
  rmSync(dir, { recursive: true, force: true });
});

describe("a server's first query", () => {
  it("makes everything on an empty database, then takes four hops and scans no table", async () => {
    await coldStart();
    const dbm = await coldStart();
    // The schema batch, the column list, the index batch and the legacy unsubscribe check.
    expect(sent).toHaveLength(4);
    expect(sent.join("\n")).not.toMatch(/\bUPDATE\b/);
    const plan = await dbm.query<{ detail: string }>("EXPLAIN QUERY PLAN SELECT id, unsub_token FROM parents WHERE unsub_token IS NOT NULL");
    expect(plan.map((r) => r.detail).join(" ")).toContain("parents_legacy_unsub");
  });

  it("runs a one-off fix only in the start that adds its column", async () => {
    let dbm = await coldStart();
    await dbm.run("ALTER TABLE classes DROP COLUMN last_activity_at");
    dbm = await coldStart();
    expect(sent.join("\n")).toContain("UPDATE classes SET last_activity_at = created_at");
    expect(await dbm.query("SELECT last_activity_at FROM classes")).toEqual([]);
    await coldStart();
    expect(sent).toHaveLength(4);
  });
});
