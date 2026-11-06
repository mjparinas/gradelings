import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";

// The admin insights against a throwaway SQLite file: every query runs, the owner's test account, admins and class
// student accounts are left out, and nothing in an answer names a child.

const dir = mkdtempSync(join(tmpdir(), "gradelings-insights-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
delete process.env.RESEND_API_KEY;
const ADMIN_EMAIL = "owner@example.com";
const DAY = 86_400_000;
const NOW = Date.now();

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, route: Mod;
let dbm: typeof import("@/server/db");
let ins: typeof import("@/server/adminInsights");

beforeAll(async () => {
  [signup, route] = (await Promise.all([import("@/server/testing/signupWithSession"), import("@/app/api/admin/insights/route")])) as unknown as Mod[];
  dbm = await import("@/server/db");
  ins = await import("@/server/adminInsights");
});
beforeEach(() => {
  process.env.ADMIN_EMAILS = ADMIN_EMAIL;
  process.env.ADMIN_2FA = "optional";
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let ip = 0;
const req = (path: string, cookie?: string) => new Request(`http://localhost${path}`, { headers: { host: "localhost", "x-forwarded-for": `10.5.0.${++ip % 250}`, ...(cookie ? { cookie } : {}) } });
const cookieOf = (res: Response) => (res.headers.get("set-cookie") ?? "").split(";")[0]!;

async function account(address: string, createdAgo = 0) {
  const existing = await dbm.query<{ family_id: string }>("SELECT family_id FROM parents WHERE email = ?", [address]);
  if (existing[0]) return { cookie: "", familyId: existing[0].family_id };
  const res = await signup.POST(new Request("http://localhost/api/auth/signup/", { method: "POST", headers: { "content-type": "application/json", host: "localhost", "x-forwarded-for": `10.6.0.${++ip % 250}` }, body: JSON.stringify({ email: address, password: "correct horse" }) }));
  expect(res.status).toBe(200);
  await dbm.run("UPDATE parents SET email_verified_at = ? WHERE email = ?", [NOW - 60_000, address]);
  const familyId = (await dbm.query<{ family_id: string }>("SELECT family_id FROM parents WHERE email = ?", [address]))[0]!.family_id;
  if (createdAgo) await dbm.run("UPDATE families SET created_at = ?, trial_ends_at = ? WHERE id = ?", [NOW - createdAgo, NOW - createdAgo + 30 * DAY, familyId]);
  return { cookie: cookieOf(res), familyId };
}
const child = (familyId: string, id: string) => dbm.run("INSERT INTO profiles (id, family_id, data, updated_at) VALUES (?, ?, ?, ?)", [id, familyId, JSON.stringify({ name: "Zed Secretname", grade: "3", framework: "bc" }), NOW]);
const answer = (familyId: string, profile: string, t: number, extra: Record<string, unknown> = {}) =>
  dbm.run("INSERT INTO events (id, family_id, profile_id, t, data) VALUES (?, ?, ?, ?, ?)", [`e-${Math.random()}`, familyId, profile, t, JSON.stringify({ type: "answer", unit: "3/math/fractions", correct: true, revealed: false, ms: 6000, mode: "adventure", ...extra })]);

let admin: { cookie: string; familyId: string };
beforeAll(async () => {
  admin = await account(ADMIN_EMAIL);
});

describe("who counts", () => {
  it("leaves out the test account, admins and support staff", () => {
    process.env.SUPPORT_EMAILS = "help@example.com";
    expect(ins.excludedEmails().sort()).toEqual(["help@example.com", "mjparinas@gmail.com", ADMIN_EMAIL].sort());
  });

  it("keeps the test account out of every count", async () => {
    // A real family and the owner's test account, both with a child who practised 5 days.
    const real = await account("real@example.com", 40 * DAY);
    const test = await account("mjparinas@gmail.com", 40 * DAY);
    for (const f of [real, test]) {
      await child(f.familyId, `p-${f.familyId}`);
      for (let d = 1; d <= 5; d++) await answer(f.familyId, `p-${f.familyId}`, NOW - d * DAY);
    }
    const trial = await ins.insight("trial", NOW);
    expect("curve" in trial && trial.curve.overall.families).toBe(1);
    const eng = await ins.insight("engagement", NOW);
    expect("activeChildren" in eng && eng.activeChildren).toBe(1);
    const content = await ins.insight("content", NOW);
    expect("hardest" in content).toBe(true);
    const sources = await ins.insight("sources", NOW);
    expect("total" in sources && sources.total).toBe(1);
  });
});

describe("the parts", () => {
  it("finds a locked unit and a payment", async () => {
    const f = await account("payer@example.com", 40 * DAY);
    await child(f.familyId, `p-${f.familyId}`);
    // Three units in one course: one more than the free two.
    for (const [i, u] of ["a", "b", "c"].entries()) await answer(f.familyId, `p-${f.familyId}`, NOW - (35 - i) * DAY, { unit: `3/math/${u}` });
    await dbm.run("INSERT INTO payments (id, family_id, amount, refunded, currency, interval, paid_at) VALUES (?, ?, 1499, 1499, 'cad', 'month', ?)", ["pay-1", f.familyId, NOW - 9 * DAY]);
    await dbm.run("INSERT INTO payments (id, family_id, amount, refunded, currency, interval, paid_at) VALUES (?, ?, 11999, 0, 'cad', 'year', ?)", ["pay-2", f.familyId, NOW - 8 * DAY]);
    const families = await ins.trialFamilies(NOW);
    const mine = families.find((x) => x.practiceDays === 3);
    expect(mine).toMatchObject({ hadLockedUnits: true, paid: true });
    const rev = await ins.insight("revenue", NOW);
    expect("newCustomers" in rev && rev.newCustomers).toBe(1);
    expect("refunded" in rev && rev.refunded).toBe(1);
  });

  it("builds the teacher funnel from classes, students and assignments", async () => {
    const t = await account("teacher@example.com", 10 * DAY);
    const pid = (await dbm.query<{ id: string }>("SELECT id FROM parents WHERE email = ?", ["teacher@example.com"]))[0]!.id;
    await dbm.run("UPDATE parents SET account_type = 'teacher' WHERE id = ?", [pid]);
    await dbm.run("INSERT INTO classes (id, owner_parent_id, name, grade, join_code, created_at) VALUES ('c1', ?, 'Room 1', '3', 'JOINME', ?)", [pid, NOW - 5 * DAY]);
    await dbm.run("INSERT INTO class_members (class_id, profile_id, family_id, joined_at) VALUES ('c1', 'kid-1', ?, ?)", [t.familyId, NOW - 4 * DAY]);
    await answer(t.familyId, "kid-1", NOW - DAY);
    await dbm.run("INSERT INTO class_assignments (class_id, unit_key, created_at) VALUES ('c1', '3/math/fractions', ?)", [NOW - 2 * DAY]);
    const r = await ins.insight("teachers", NOW);
    expect("steps" in r && r.steps.map((s) => s.count)).toEqual([1, 1, 1, 1, 1]);
    expect("classes" in r && r.classes).toMatchObject({ classes: 1, students: 1, active7: 1 });
  });

  it("never carries a child's name", async () => {
    for (const part of ins.INSIGHT_PARTS) expect(JSON.stringify(await ins.insight(part, NOW))).not.toContain("Secretname");
  });
});

describe("app and paywall signals", () => {
  let appMod: typeof import("@/server/appSignals");
  let seen: Mod, sync: Mod;
  beforeAll(async () => {
    appMod = await import("@/server/appSignals");
    [seen, sync] = (await Promise.all([import("@/app/api/paywall/seen/route"), import("@/app/api/sync/route")])) as unknown as Mod[];
  });
  const post = (path: string, cookie: string, body: unknown, headers: Record<string, string> = {}) =>
    new Request(`http://localhost${path}`, { method: "POST", headers: { "content-type": "application/json", host: "localhost", "x-forwarded-for": `10.7.0.${++ip % 250}`, cookie, ...headers }, body: JSON.stringify(body) });

  it("records the kind of app a family syncs from", async () => {
    const f = await account("app-user@example.com");
    const res = await sync.POST!(post("/api/sync/", f.cookie, { cursor: 0, events: [], profiles: [], settings: [] }, { "x-gradelings-app": "android" }));
    expect(res.status).toBe(200);
    const row = (await dbm.query<{ a: number | null; w: number | null }>("SELECT app_android_at AS a, app_web_at AS w FROM families WHERE id = ?", [f.familyId]))[0]!;
    expect(row.a).toBeGreaterThan(0);
    expect(row.w).toBeNull();
    expect(appMod.appOf(new Request("http://x", { headers: { "x-gradelings-app": "weird" } }))).toBe("web");
  });

  it("counts a family in the app mix only inside the window and not the test account", async () => {
    const test = await account("mjparinas@gmail.com");
    await dbm.run("UPDATE families SET app_ios_at = ? WHERE id = ?", [Date.now(), test.familyId]);
    const mix = await ins.insight("apps", NOW);
    expect("active" in mix && mix.active).toBeGreaterThan(0);
    expect("ios" in mix && mix.ios.n).toBe(0);
  });

  it("records a locked part once a day per kind and rejects anything else", async () => {
    const f = await account("wall@example.com");
    for (let i = 0; i < 2; i++) expect((await seen.POST!(post("/api/paywall/seen/", f.cookie, { kind: "locked-unit" }))).status).toBe(200);
    expect((await seen.POST!(post("/api/paywall/seen/", f.cookie, { kind: "anything-else" }))).status).toBe(400);
    expect((await seen.POST!(post("/api/paywall/seen/", "", { kind: "locked-unit" }))).status).toBe(401);
    const rows = await dbm.query<{ kind: string; days: number }>("SELECT kind, days FROM paywall_seen WHERE family_id = ?", [f.familyId]);
    expect(rows).toEqual([{ kind: "locked-unit", days: 1 }]);
    await appMod.recordPaywallSeen(f.familyId, "locked-unit", NOW + 2 * DAY);
    expect((await dbm.query<{ days: number }>("SELECT days FROM paywall_seen WHERE family_id = ?", [f.familyId]))[0]!.days).toBe(2);
  });

  it("links a locked part to a later payment and leaves out the test account", async () => {
    const f = await account("buyer@example.com");
    const test = await account("mjparinas@gmail.com");
    for (const id of [f.familyId, test.familyId]) await appMod.recordPaywallSeen(id, "members-reports", NOW - 10 * DAY);
    await dbm.run("INSERT INTO payments (id, family_id, amount, refunded, currency, interval, paid_at) VALUES ('pay-wall', ?, 1499, 0, 'cad', 'month', ?)", [f.familyId, NOW - 8 * DAY]);
    const out = await ins.insight("paywall", NOW);
    const row = "rows" in out ? out.rows.find((r) => r.kind === "members-reports") : undefined;
    expect(row).toMatchObject({ families: 1, paidWithin7: 1, paidAfter: 1 });
  });

  it("deletes the signals with the family", async () => {
    const f = await account("leaver@example.com");
    await appMod.recordPaywallSeen(f.familyId, "locked-unit");
    const { deleteFamilyData } = await import("@/server/deleteFamily");
    await deleteFamilyData(f.familyId);
    expect(await dbm.query("SELECT 1 FROM paywall_seen WHERE family_id = ?", [f.familyId])).toEqual([]);
  });
});

describe("the route", () => {
  it("answers 404 to anyone who isn't an admin", async () => {
    const other = await account("nobody@example.com");
    expect((await route.GET!(req("/api/admin/insights/?part=trial", other.cookie))).status).toBe(404);
  });

  it("serves each part to an admin and rejects an unknown one", async () => {
    for (const part of ins.INSIGHT_PARTS) expect((await route.GET!(req(`/api/admin/insights/?part=${part}`, admin.cookie))).status).toBe(200);
    expect((await route.GET!(req("/api/admin/insights/?part=nope", admin.cookie))).status).toBe(400);
  });
});
