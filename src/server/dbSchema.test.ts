import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

// The schema setup runs against a real SQLite file: it must create everything, add indexes the live database
// lacks, and do nothing but one read once a database is current (a hosted database charges a round trip per statement).

const dir = mkdtempSync(join(tmpdir(), "gradelings-schema-"));
const url = `file:${join(dir, "test.db")}`;
afterAll(() => rmSync(dir, { recursive: true, force: true }));

beforeAll(() => {
  vi.stubEnv("DATABASE_URL", url);
});

const INDEXES = [
  "child_settings_family",
  "parents_family",
  "sessions_parent",
  "sessions_family",
  "sessions_expires",
  "rate_limits_reset",
  "families_stripe_customer",
  "families_consent_token",
  "email_log_sent_by",
  "students_prev_code",
  "parents_unsub_legacy",
];

describe("schema setup", () => {
  it("creates the indexes the hot queries rely on", async () => {
    vi.resetModules();
    const { query } = await import("./db");
    const names = new Set((await query<{ name: string }>("SELECT name FROM sqlite_master WHERE type = 'index'")).map((r) => r.name));
    for (const n of INDEXES) expect(names.has(n), n).toBe(true);
  });

  it("uses them: settings by family, sessions by parent, a Stripe customer", async () => {
    vi.resetModules();
    const { query } = await import("./db");
    const plan = async (sql: string) => (await query<{ detail: string }>(`EXPLAIN QUERY PLAN ${sql}`, ["x"])).map((r) => r.detail).join(" | ");
    expect(await plan("SELECT data FROM child_settings WHERE family_id = ?")).toContain("child_settings_family");
    expect(await plan("DELETE FROM sessions WHERE parent_id = ?")).toContain("sessions_parent");
    expect(await plan("SELECT id FROM families WHERE stripe_customer = ?")).toContain("families_stripe_customer");
    expect(await plan("SELECT id FROM parents WHERE family_id = ?")).toContain("parents_family");
  });

  it("does one read, and no writes, when the database is already current", async () => {
    vi.resetModules();
    const { db } = await import("./db");
    await db(); // brings it up to date
    vi.resetModules();
    const libsql = await import("@libsql/client");
    const seen: string[] = [];
    vi.doMock("@libsql/client", () => ({
      createClient: (cfg: Parameters<typeof libsql.createClient>[0]) => {
        const c = libsql.createClient(cfg);
        const execute = c.execute.bind(c);
        const batch = c.batch.bind(c);
        c.execute = ((s: string | { sql: string }) => (seen.push(typeof s === "string" ? s : s.sql), execute(s as never))) as typeof c.execute;
        c.batch = ((s: Parameters<typeof batch>[0], m?: Parameters<typeof batch>[1]) => (seen.push("BATCH"), batch(s, m))) as typeof c.batch;
        return c;
      },
    }));
    const again = await import("./db");
    await again.db();
    expect(seen).toHaveLength(1);
    expect(seen[0]).toMatch(/^SELECT value FROM admin_settings/);
    vi.doUnmock("@libsql/client");
  });

  it("brings an older database up to date: missing indexes and columns are added, data is kept", async () => {
    vi.resetModules();
    const { query, run } = await import("./db");
    await run("DROP INDEX child_settings_family");
    await run("DROP INDEX sessions_parent");
    await run("DELETE FROM admin_settings WHERE key = 'schema-fingerprint'");
    await run("INSERT INTO families (id, created_at, trial_ends_at, updated_at) VALUES ('f1', 1, 2, 3)");
    vi.resetModules();
    const fresh = await import("./db");
    await fresh.db();
    const names = new Set((await fresh.query<{ name: string }>("SELECT name FROM sqlite_master WHERE type = 'index'")).map((r) => r.name));
    expect(names.has("child_settings_family")).toBe(true);
    expect(names.has("sessions_parent")).toBe(true);
    expect((await query("SELECT id FROM families WHERE id = 'f1'")).length).toBe(1);
  });

  it("a network error while checking is not mistaken for a new database", async () => {
    vi.resetModules();
    vi.spyOn(console, "error").mockImplementation(() => {});
    vi.doMock("@libsql/client", () => ({
      createClient: () => ({
        execute: async () => {
          throw new Error("network down");
        },
        batch: async () => {
          throw new Error("batch must not run");
        },
      }),
    }));
    const { db } = await import("./db");
    await expect(db()).rejects.toThrow("network down");
    vi.doUnmock("@libsql/client");
  });
});
