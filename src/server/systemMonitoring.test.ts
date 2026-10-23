import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { sealSecret } from "@/server/totp";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

// The System page's Backups, Speed, Admin security and Capacity cards, and the failed staff sign-ins they read.
// Real route handlers against a throwaway SQLite file; Sentry is a stubbed fetch.

const dir = mkdtempSync(join(tmpdir(), "grademap-monitoring-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
const ADMIN = "owner@example.com";
const SUPPORT = "helper@example.com";
const PASSWORD = "correct horse";
const DAY = 86_400_000;
const NOW = Date.parse("2026-10-23T16:00:00Z");

const KEYS = ["SENTRY_READ_TOKEN", "SENTRY_AUTH_TOKEN", "SENTRY_ORG", "SENTRY_PROJECT", "SENTRY_API_BASE", "SENTRY_TRACES_SCALE", "DATABASE_SIZE_LIMIT_MB", "GITHUB_REPOSITORY", "TURSO_DATABASE_URL", "ADMIN_2FA"];
const saved = Object.fromEntries([...KEYS, "DATABASE_URL", "ADMIN_EMAILS", "SUPPORT_EMAILS"].map((k) => [k, process.env[k]]));

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, login: Mod, system: Mod;
let dbm: typeof import("@/server/db");
let health: typeof import("@/server/systemHealth");
let alerts: typeof import("@/server/alerts");
let staff: typeof import("@/server/staffSignIns");

let ip = 0;
function req(path: string, method = "GET", body?: unknown, headers: Record<string, string> = {}): Request {
  return new Request(`http://localhost${path}`, {
    method,
    headers: { "content-type": "application/json", host: "localhost", "x-forwarded-for": `10.5.0.${++ip % 250}`, ...headers },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}
async function account(address: string) {
  const res = await signup.POST(req("/api/auth/signup/", "POST", { email: address, password: PASSWORD }));
  expect(res.status).toBe(200);
  await dbm.run("UPDATE parents SET email_verified_at = ? WHERE email = ?", [Date.now() - 60_000, address]);
  return (res.headers.get("set-cookie") ?? "").split(";")[0];
}
const signIn = (email: string, password = PASSWORD) => login.POST(req("/api/auth/login/", "POST", { email, password }));

beforeAll(async () => {
  [signup, login, system] = (await Promise.all([import("@/app/api/auth/signup/route"), import("@/app/api/auth/login/route"), import("@/app/api/admin/system/route")])) as unknown as Mod[];
  dbm = await import("@/server/db");
  health = await import("@/server/systemHealth");
  alerts = await import("@/server/alerts");
  staff = await import("@/server/staffSignIns");
});
beforeEach(async () => {
  for (const k of KEYS) delete process.env[k];
  process.env.ADMIN_EMAILS = ADMIN;
  process.env.SUPPORT_EMAILS = SUPPORT;
  process.env.ADMIN_2FA = "optional";
  health.clearSystemCache();
  await dbm.run("DELETE FROM admin_settings");
  await dbm.run("DELETE FROM staff_sign_in_failures");
  await dbm.run("DELETE FROM sessions");
  await dbm.run("DELETE FROM parents");
  await dbm.run("DELETE FROM rate_limits");
});
afterEach(() => vi.unstubAllGlobals());
afterAll(() => {
  for (const [k, v] of Object.entries(saved)) if (v === undefined) delete process.env[k];
  else process.env[k] = v;
  rmSync(dir, { recursive: true, force: true });
});

describe("backups", () => {
  it("doesn't apply to a local database file", async () => {
    const c = await health.backupsCheck(NOW);
    expect(c.state).toBe("off");
  });

  it("warns until a restore practice is recorded, then goes quiet, then warns again when stale", async () => {
    process.env.TURSO_DATABASE_URL = "libsql://example.turso.io";
    delete process.env.DATABASE_URL;
    try {
      const never = await health.backupsCheck(NOW);
      expect(never.state).toBe("warn");
      expect(never.rows[0]).toMatchObject({ label: "Last restore practised", value: "Never recorded" });

      await health.recordRestoreDrill(ADMIN, NOW - 3 * DAY, NOW);
      const fresh = await health.backupsCheck(NOW);
      expect(fresh.state).toBe("ok");
      expect(fresh.rows[0]).toMatchObject({ at: NOW - 3 * DAY, value: `Recorded by ${ADMIN}` });

      const stale = await health.backupsCheck(NOW + 40 * DAY);
      expect(stale.state).toBe("warn");
      expect(stale.summary).toMatch(/over 35 days/);
    } finally {
      process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
    }
  });

  it("refuses a date in the future or over a year ago, and logs a recorded one", async () => {
    await expect(health.recordRestoreDrill(ADMIN, NOW + 3 * DAY, NOW)).rejects.toThrow(/future/);
    await expect(health.recordRestoreDrill(ADMIN, NOW - 500 * DAY, NOW)).rejects.toThrow(/over a year/);
    await health.recordRestoreDrill(ADMIN, NOW - DAY, NOW);
    const [row] = await dbm.query<{ admin: string; action: string }>("SELECT admin, action FROM admin_audit WHERE action = 'restore-drill.record'");
    expect(row).toMatchObject({ admin: ADMIN });
  });

  it("is recorded through the route by an admin only", async () => {
    const other = await account("someone@example.com");
    expect((await system.POST(req("/api/admin/system/", "POST", { restoreDrill: "2026-10-20" }, { cookie: other }))).status).toBe(404);
    const admin = await account(ADMIN);
    expect((await system.POST(req("/api/admin/system/", "POST", { restoreDrill: "yesterday" }, { cookie: admin }))).status).toBe(400);
    const ok = await system.POST(req("/api/admin/system/", "POST", { restoreDrill: new Date().toISOString().slice(0, 10) }, { cookie: admin }));
    expect(ok.status).toBe(200);
    expect((await health.lastRestoreDrill())?.by).toBe(ADMIN);
    // A change from another site is refused.
    const cross = await system.POST(req("/api/admin/system/", "POST", { restoreDrill: "2026-10-20" }, { cookie: admin, origin: "https://evil.example" }));
    expect(cross.status).toBe(403);
  });
});

describe("speed (Sync)", () => {
  const setup = () => {
    process.env.SENTRY_READ_TOKEN = "token";
    process.env.SENTRY_ORG = "gradelings";
    process.env.SENTRY_PROJECT = "web";
  };
  function stub(timing: unknown, fetchFailed: unknown) {
    const calls: string[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: string | URL) => {
        const url = String(input);
        calls.push(url);
        const body = url.includes("dataset=errors") ? fetchFailed : timing;
        if (body instanceof Response) return body;
        return new Response(JSON.stringify(body), { status: 200, headers: { "content-type": "application/json" } });
      }),
    );
    return calls;
  }

  it("isn't set up without Sentry", async () => {
    expect((await health.speedCheck()).state).toBe("off");
  });

  it("shows sync timing and fetch failures, asking Sentry for exactly those", async () => {
    setup();
    const calls = stub({ data: [{ "count()": 240, "p50(span.duration)": 180, "p95(span.duration)": 900, "failure_rate()": 0.004 }] }, { data: [{ "count()": 1 }] });
    const c = await health.speedCheck();
    expect(c.state).toBe("ok");
    const text = JSON.stringify(c.rows);
    expect(text).toContain("900 ms");
    expect(text).toContain("0.4%");
    expect(text).toContain("about 1 in 10 are timed");
    const timing = decodeURIComponent(calls.find((u) => u.includes("dataset=spans"))!.replace(/\+/g, " "));
    expect(timing).toContain('transaction:"POST /api/sync/"');
    expect(timing).toContain("statsPeriod=24h");
    expect(timing).toContain("project:web");
    expect(decodeURIComponent(calls.find((u) => u.includes("dataset=errors"))!.replace(/\+/g, " "))).toContain('message:"fetch failed"');
  });

  it("warns when sync is slow, failing, or the server can't reach services", async () => {
    setup();
    stub({ data: [{ "count()": 10, "p50(span.duration)": 400, "p95(span.duration)": 4200, "failure_rate()": 0 }] }, { data: [{ "count()": 0 }] });
    expect((await health.speedCheck()).state).toBe("warn");
    stub({ data: [{ "count()": 10, "p50(span.duration)": 100, "p95(span.duration)": 200, "failure_rate()": 0.2 }] }, { data: [{ "count()": 0 }] });
    expect((await health.speedCheck()).state).toBe("warn");
    stub({ data: [{ "count()": 10, "p50(span.duration)": 100, "p95(span.duration)": 200, "failure_rate()": 0 }] }, { data: [{ "count()": 7 }] });
    const c = await health.speedCheck();
    expect(c.state).toBe("warn");
    expect(c.rows.find((r) => r.label.includes("fetch failed"))).toMatchObject({ value: "7", state: "warn" });
  });

  it("says plainly when the token can't read events, and keeps the other number when one query fails", async () => {
    setup();
    stub(new Response("no", { status: 403 }), { data: [{ "count()": 0 }] });
    const refused = await health.speedCheck();
    expect(refused.state).toBe("down");
    expect(refused.setup).toMatch(/org:read/);
    stub(new Response("oops", { status: 500 }), { data: [{ "count()": 2 }] });
    const partial = await health.speedCheck();
    expect(partial.state).toBe("warn");
    expect(JSON.stringify(partial.rows)).toContain("Couldn't read it");
    expect(partial.rows.find((r) => r.label.includes("fetch failed"))?.value).toBe("2");
  });
});

describe("failed staff sign-ins", () => {
  it("records a wrong password or code only for listed staff addresses", async () => {
    await account(ADMIN);
    await account("parent@example.com");
    expect((await signIn(ADMIN, "wrong password")).status).toBe(401);
    expect((await signIn("parent@example.com", "wrong password")).status).toBe(401);
    expect((await signIn("nobody@example.com")).status).toBe(401);
    const rows = await dbm.query<{ email: string; step: string }>("SELECT email, step FROM staff_sign_in_failures");
    expect(rows).toEqual([{ email: ADMIN, step: "password" }]);
  });

  it("records a wrong second-step code", async () => {
    await account(ADMIN);
    await dbm.run("UPDATE parents SET totp_enabled_at = ?, totp_secret = ? WHERE email = ?", [NOW, sealSecret("JBSWY3DPEHPK3PXP"), ADMIN]);
    const res = await login.POST(req("/api/auth/login/", "POST", { email: ADMIN, password: PASSWORD, code: "000000" }));
    expect(res.status).toBe(401);
    expect((await dbm.query<{ step: string }>("SELECT step FROM staff_sign_in_failures")).map((r) => r.step)).toEqual(["code"]);
  });

  it("keeps 30 days and counts by address", async () => {
    await staff.recordStaffFailure(ADMIN, "password", NOW - 40 * DAY);
    await staff.recordStaffFailure(ADMIN, "password", NOW - DAY);
    await staff.recordStaffFailure(SUPPORT, "code", NOW - 1000);
    expect((await dbm.query("SELECT 1 FROM staff_sign_in_failures")).length).toBe(2);
    const w = await staff.staffFailuresSince(NOW - 7 * DAY);
    expect(w.total).toBe(2);
    expect(w.byEmail.map((r) => r.email).sort()).toEqual([ADMIN, SUPPORT].sort());
  });

  it("alerts the admins once five fail within fifteen minutes", async () => {
    await account(ADMIN);
    for (let i = 0; i < 4; i++) await alerts.reportStaffFailure(ADMIN, "password", NOW + i * 1000);
    expect(await dbm.query("SELECT 1 FROM admin_settings WHERE key = 'alert-sent:staff-login-failures'")).toHaveLength(0);
    await alerts.reportStaffFailure(ADMIN, "password", NOW + 5000);
    expect(await dbm.query("SELECT 1 FROM admin_settings WHERE key = 'alert-sent:staff-login-failures'")).toHaveLength(1);
  });

  it("ignores a visitor's address", async () => {
    await alerts.reportStaffFailure("stranger@example.com", "password", NOW);
    expect(await dbm.query("SELECT 1 FROM staff_sign_in_failures")).toHaveLength(0);
  });
});

describe("admin security", () => {
  it("lists each staff account's two-step state and warns about one without it", async () => {
    await account(ADMIN);
    await account(SUPPORT);
    await dbm.run("UPDATE parents SET totp_enabled_at = ? WHERE email = ?", [NOW - DAY, ADMIN]);
    const c = await health.securityCheck(NOW);
    expect(c.rows.find((r) => r.label === `Admin ${ADMIN}`)).toMatchObject({ value: "Two-step on", state: "ok" });
    expect(c.rows.find((r) => r.label === `Support ${SUPPORT}`)?.state).toBe("warn");
    expect(c.state).toBe("warn");
    expect(c.summary).toMatch(/1 staff account without two-step/);
  });

  it("is ok when every account has two-step, two-step is required and nothing failed", async () => {
    process.env.ADMIN_2FA = "required";
    delete process.env.SUPPORT_EMAILS;
    await account(ADMIN);
    await dbm.run("UPDATE parents SET totp_enabled_at = ? WHERE email = ?", [NOW - DAY, ADMIN]);
    const c = await health.securityCheck(NOW);
    expect(c.state).toBe("ok");
    expect(c.summary).toMatch(/Every staff account/);
  });

  it("counts failed sign-ins and shows the alerts of the last week", async () => {
    process.env.ADMIN_2FA = "required";
    delete process.env.SUPPORT_EMAILS;
    await account(ADMIN);
    await dbm.run("UPDATE parents SET totp_enabled_at = ? WHERE email = ?", [NOW - DAY, ADMIN]);
    for (let i = 0; i < 11; i++) await staff.recordStaffFailure(ADMIN, "password", NOW - i * 60_000);
    await dbm.run("INSERT INTO admin_settings (key, value, updated_at) VALUES ('alert-sent:student-login-guessing:one-code', ?, ?)", [String(NOW - DAY), NOW - DAY]);
    await dbm.run("INSERT INTO admin_settings (key, value, updated_at) VALUES ('alert-sent:staff-login-failures', ?, ?)", [String(NOW - 2 * DAY), NOW - 2 * DAY]);
    const c = await health.securityCheck(NOW);
    expect(c.state).toBe("warn");
    expect(c.rows.find((r) => r.label === "Failed sign-ins in 24 hours")).toMatchObject({ value: "11", state: "warn" });
    expect(c.rows.find((r) => r.label === "Admin sign-in alert")).toMatchObject({ value: "Sent", at: NOW - 2 * DAY });
    expect(c.rows.find((r) => r.label === "Class sign-in guessing alert")).toMatchObject({ value: "Sent", at: NOW - DAY });
  });

  it("isn't set up without ADMIN_EMAILS", async () => {
    delete process.env.ADMIN_EMAILS;
    delete process.env.SUPPORT_EMAILS;
    expect((await health.securityCheck(NOW)).state).toBe("off");
  });
});

describe("capacity", () => {
  it("shows the database size and events, and asks for the plan limit", async () => {
    const c = await health.capacityCheck(NOW);
    expect(c.state).toBe("ok");
    expect(c.rows.find((r) => r.label === "Database size")?.value).toMatch(/MB$/);
    expect(c.summary).toMatch(/DATABASE_SIZE_LIMIT_MB|storage limit/);
    expect(c.setup).toMatch(/DATABASE_SIZE_LIMIT_MB/);
  });

  it("warns at 70% and goes down at 90% of the limit", async () => {
    const [size] = await dbm.query<{ pages: number; page_size: number }>("SELECT (SELECT page_count FROM pragma_page_count) AS pages, (SELECT page_size FROM pragma_page_size) AS page_size");
    const mb = (Number(size.pages) * Number(size.page_size)) / 1_048_576;
    process.env.DATABASE_SIZE_LIMIT_MB = String(mb / 0.8);
    expect((await health.capacityCheck(NOW)).state).toBe("warn");
    process.env.DATABASE_SIZE_LIMIT_MB = String(mb / 0.95);
    expect((await health.capacityCheck(NOW + DAY)).state).toBe("down");
    process.env.DATABASE_SIZE_LIMIT_MB = String(mb * 4);
    expect((await health.capacityCheck(NOW + 2 * DAY)).state).toBe("ok");
  });

  it("keeps one size sample a day and reports growth after a week", async () => {
    const [size] = await dbm.query<{ pages: number; page_size: number }>("SELECT (SELECT page_count FROM pragma_page_count) AS pages, (SELECT page_size FROM pragma_page_size) AS page_size");
    const bytes = Number(size.pages) * Number(size.page_size);
    await dbm.run("INSERT INTO admin_settings (key, value, updated_at) VALUES ('capacity-samples', ?, ?)", [JSON.stringify([{ at: NOW - 10 * DAY, bytes: Math.max(0, bytes - 5 * 1_048_576) }]), NOW]);
    process.env.DATABASE_SIZE_LIMIT_MB = String(bytes / 1_048_576 + 100);
    const c = await health.capacityCheck(NOW);
    expect(c.rows.some((r) => r.label.startsWith("Growth over 10 days"))).toBe(true);
    expect(c.rows.some((r) => r.label === "Full in about")).toBe(true);
    await health.capacityCheck(NOW + 1000);
    const samples = JSON.parse((await dbm.query<{ value: string }>("SELECT value FROM admin_settings WHERE key = 'capacity-samples'"))[0].value) as unknown[];
    expect(samples).toHaveLength(2);
  });
});
