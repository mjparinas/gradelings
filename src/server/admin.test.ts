import { createHmac } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, beforeEach, describe, expect, it } from "vitest";
import { LIFETIME_ACCESS } from "@/lib/plan";

// The admin panel's API, through the real route handlers against a throwaway SQLite file.

const dir = mkdtempSync(join(tmpdir(), "grademap-admin-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
delete process.env.RESEND_API_KEY;
delete process.env.ADMIN_TOKEN;
delete process.env.STRIPE_SECRET_KEY;
process.env.STRIPE_WEBHOOK_SECRET = "whsec_admin";
const ADMIN_EMAIL = "owner@example.com";

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, login: Mod, me: Mod, adminMe: Mod, stats: Mod, flags: Mod, experiments: Mod, users: Mod, reports: Mod, auditLog: Mod, codes: Mod, publicFlags: Mod, redeem: Mod, classes: Mod, feedback: Mod, webhook: Mod, statsDetail: Mod;
let dbm: typeof import("@/server/db");

beforeAll(async () => {
  [signup, login, me, adminMe, stats, flags, experiments, users, reports, auditLog, codes, publicFlags, redeem, classes, feedback, webhook, statsDetail] = (await Promise.all([
    import("@/app/api/auth/signup/route"),
    import("@/app/api/auth/login/route"),
    import("@/app/api/auth/me/route"),
    import("@/app/api/admin/me/route"),
    import("@/app/api/admin/stats/route"),
    import("@/app/api/admin/flags/route"),
    import("@/app/api/admin/experiments/route"),
    import("@/app/api/admin/users/route"),
    import("@/app/api/admin/reports/route"),
    import("@/app/api/admin/audit/route"),
    import("@/app/api/admin/codes/route"),
    import("@/app/api/flags/route"),
    import("@/app/api/codes/redeem/route"),
    import("@/app/api/classes/route"),
    import("@/app/api/feedback/route"),
    import("@/app/api/billing/webhook/route"),
    import("@/app/api/admin/stats/detail/route"),
  ])) as unknown as Mod[];
  dbm = await import("@/server/db");
});
beforeEach(() => {
  process.env.ADMIN_EMAILS = ` ${ADMIN_EMAIL.toUpperCase()} , someone-else@example.com`;
  process.env.ADMIN_2FA = "optional"; // these tests are about the panel, not the second step (twoFactor.test.ts covers that)
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let ip = 0;
function req(path: string, method = "GET", body?: unknown, cookie?: string, origin?: string): Request {
  return new Request(`http://localhost${path}`, {
    method,
    headers: {
      "content-type": "application/json",
      host: "localhost",
      "x-forwarded-for": `10.2.0.${++ip % 250}`,
      ...(cookie ? { cookie } : {}),
      ...(origin ? { origin } : {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}
const cookieOf = (res: Response) => (res.headers.get("set-cookie") ?? "").split(";")[0];

async function account(address: string, verified = true) {
  const res = await signup.POST(req("/api/auth/signup/", "POST", { email: address, password: "correct horse" }));
  expect(res.status).toBe(200);
  if (verified) await dbm.run("UPDATE parents SET email_verified_at = ? WHERE email = ?", [Date.now() - 60_000, address]);
  const familyId = (await dbm.query<{ family_id: string }>("SELECT family_id FROM parents WHERE email = ?", [address]))[0].family_id;
  return { cookie: cookieOf(res), familyId };
}

let admin: { cookie: string; familyId: string };
let parent: { cookie: string; familyId: string };
beforeAll(async () => {
  admin = await account(ADMIN_EMAIL);
  parent = await account("parent@example.com");
});

const as = (cookie: string) => ({
  get: (mod: Mod, path: string) => mod.GET(req(path, "GET", undefined, cookie)),
  send: (mod: Mod, method: string, path: string, body?: unknown) => mod[method](req(path, method, body, cookie)),
});

describe("who is an admin", () => {
  it("is a confirmed account listed in ADMIN_EMAILS, case and spaces ignored", async () => {
    const res = await as(admin.cookie).get(adminMe, "/api/admin/me/");
    expect(res.status).toBe(200);
    expect((await res.json()).email).toBe(ADMIN_EMAIL);
  });

  it("answers 404 to everyone else, and to everyone when ADMIN_EMAILS is unset", async () => {
    expect((await adminMe.GET(req("/api/admin/me/"))).status).toBe(404);
    expect((await as(parent.cookie).get(adminMe, "/api/admin/me/")).status).toBe(404);
    for (const mod of [stats, flags, experiments, users, reports, auditLog]) expect((await as(parent.cookie).get(mod, "/api/admin/x/")).status).toBe(404);
    expect((await as(parent.cookie).get(codes, "/api/admin/codes/")).status).toBe(404);
    delete process.env.ADMIN_EMAILS;
    expect((await as(admin.cookie).get(adminMe, "/api/admin/me/")).status).toBe(404);
    expect((await as(admin.cookie).get(codes, "/api/admin/codes/")).status).toBe(404);
  });

  it("needs a confirmed email", async () => {
    const unconfirmed = await account("someone-else@example.com", false);
    expect((await as(unconfirmed.cookie).get(adminMe, "/api/admin/me/")).status).toBe(404);
  });

  it("never makes a sign-in from before the email was confirmed an admin", async () => {
    // Someone signs up first with an address listed in ADMIN_EMAILS and keeps that session. Its owner
    // later clicks the confirmation link; the earlier session must stay an ordinary one.
    const address = "someone-else@example.com"; // listed in ADMIN_EMAILS
    if (!(await dbm.query("SELECT 1 FROM parents WHERE email = ?", [address])).length) await account(address, false);
    const login = (await import("@/app/api/auth/login/route")) as unknown as Mod;
    const signIn = async () => cookieOf(await login.POST(req("/api/auth/login/", "POST", { email: address, password: "correct horse" })));
    await dbm.run("UPDATE parents SET email_verified_at = NULL WHERE email = ?", [address]);
    const squatter = await signIn();
    const tick = () => new Promise((r) => setTimeout(r, 5));
    await tick();
    await dbm.run("UPDATE parents SET email_verified_at = ? WHERE email = ?", [Date.now(), address]);
    expect((await as(squatter).get(adminMe, "/api/admin/me/")).status).toBe(404);
    // Signing in after confirming (which needs the password) works.
    await tick();
    expect((await as(await signIn()).get(adminMe, "/api/admin/me/")).status).toBe(200);
    expect((await as(squatter).get(adminMe, "/api/admin/me/")).status).toBe(404);
    await dbm.run("UPDATE parents SET email_verified_at = NULL WHERE email = ?", [address]);
  });

  it("refuses changes from another site", async () => {
    const res = await flags.PUT(req("/api/admin/flags/", "PUT", { key: "shop", enabled: false }, admin.cookie, "https://evil.example"));
    expect(res.status).toBe(403);
    const code = await codes.POST(req("/api/admin/codes/", "POST", { kind: "access" }, admin.cookie, "https://evil.example"));
    expect(code.status).toBe(404);
  });
});

describe("feature flags", () => {
  const forDevice = async (cookie?: string, device = "device-abcdef12") =>
    (await (await publicFlags.GET(req(`/api/flags/?d=${device}`, "GET", undefined, cookie))).json()) as { flags: Record<string, boolean>; variants: Record<string, string> };

  it("start at their defaults for everyone", async () => {
    const list = (await (await as(admin.cookie).get(flags, "/api/admin/flags/")).json()).flags as { key: string; enabled: boolean; changed: boolean }[];
    expect(list.find((f) => f.key === "shop")).toMatchObject({ enabled: true, changed: false });
    expect((await forDevice()).flags.shop).toBe(true);
  });

  it("give unlimited test coins to an admin account's devices only", async () => {
    const res = async (cookie?: string) => (await (await publicFlags.GET(req("/api/flags/?d=device-abcdef12", "GET", undefined, cookie))).json()) as { testCoins?: boolean };
    expect((await res(admin.cookie)).testCoins).toBe(true);
    expect((await res(parent.cookie)).testCoins).toBeUndefined();
    expect((await res()).testCoins).toBeUndefined();
    delete process.env.ADMIN_EMAILS;
    expect((await res(admin.cookie)).testCoins).toBeUndefined();
  });

  it("switch off for everyone, signed in or not, and back on", async () => {
    expect((await as(admin.cookie).send(flags, "PUT", "/api/admin/flags/", { key: "shop", enabled: false })).status).toBe(200);
    expect((await forDevice()).flags.shop).toBe(false);
    expect((await forDevice(parent.cookie)).flags.shop).toBe(false);
    await as(admin.cookie).send(flags, "PUT", "/api/admin/flags/", { key: "shop", enabled: true, rollout: 100 });
    expect((await forDevice(parent.cookie)).flags.shop).toBe(true);
  });

  it("reject unknown flags and bad rollouts", async () => {
    expect((await as(admin.cookie).send(flags, "PUT", "/api/admin/flags/", { key: "made-up", enabled: true })).status).toBe(400);
    expect((await as(admin.cookie).send(flags, "PUT", "/api/admin/flags/", { key: "shop", enabled: "yes" })).status).toBe(400);
    expect((await as(admin.cookie).send(flags, "PUT", "/api/admin/flags/", { key: "shop", enabled: true, rollout: 101 })).status).toBe(400);
  });

  it("roll out to part of the devices, and an override beats it for one family", async () => {
    await as(admin.cookie).send(flags, "PUT", "/api/admin/flags/", { key: "arcade", enabled: true, rollout: 50 });
    const on = await Promise.all(Array.from({ length: 40 }, (_, i) => forDevice(undefined, `device-${String(i).padStart(8, "0")}`)));
    const share = on.filter((r) => r.flags.arcade).length;
    expect(share).toBeGreaterThan(5);
    expect(share).toBeLessThan(35);

    await as(admin.cookie).send(flags, "PUT", "/api/admin/flags/", { key: "arcade", enabled: false });
    expect((await as(admin.cookie).send(users, "POST", "/api/admin/users/", { familyId: parent.familyId, action: "override", key: "arcade", enabled: true })).status).toBe(200);
    expect((await forDevice(parent.cookie)).flags.arcade).toBe(true);
    expect((await forDevice()).flags.arcade).toBe(false);
    const list = (await (await as(admin.cookie).get(flags, "/api/admin/flags/")).json()).flags as { key: string; overrides: number }[];
    expect(list.find((f) => f.key === "arcade")!.overrides).toBe(1);
    await as(admin.cookie).send(users, "POST", "/api/admin/users/", { familyId: parent.familyId, action: "override", key: "arcade", enabled: null });
    expect((await forDevice(parent.cookie)).flags.arcade).toBe(false);
    await as(admin.cookie).send(flags, "PUT", "/api/admin/flags/", { key: "arcade", enabled: true });
  });

  it("pause sign-ups, redeeming codes and new classes on the server", async () => {
    await as(admin.cookie).send(flags, "PUT", "/api/admin/flags/", { key: "signups", enabled: false });
    expect((await signup.POST(req("/api/auth/signup/", "POST", { email: "late@example.com", password: "correct horse" }))).status).toBe(503);
    await as(admin.cookie).send(flags, "PUT", "/api/admin/flags/", { key: "signups", enabled: true });
    expect((await signup.POST(req("/api/auth/signup/", "POST", { email: "late@example.com", password: "correct horse" }))).status).toBe(200);

    await as(admin.cookie).send(flags, "PUT", "/api/admin/flags/", { key: "redeem-codes", enabled: false });
    expect((await as(parent.cookie).send(redeem, "POST", "/api/codes/redeem/", { code: "ABCDEFGHJKMN" })).status).toBe(503);
    await as(admin.cookie).send(flags, "PUT", "/api/admin/flags/", { key: "redeem-codes", enabled: true });
    expect((await as(parent.cookie).send(redeem, "POST", "/api/codes/redeem/", { code: "ABCDEFGHJKMN" })).status).toBe(400);

    await as(admin.cookie).send(flags, "PUT", "/api/admin/flags/", { key: "new-classes", enabled: false });
    expect((await as(parent.cookie).send(classes, "POST", "/api/classes/", { name: "Room 1", grade: "3" })).status).toBe(503);
    await as(admin.cookie).send(flags, "PUT", "/api/admin/flags/", { key: "new-classes", enabled: true });
    expect((await as(parent.cookie).send(classes, "POST", "/api/classes/", { name: "Room 1", grade: "3" })).status).toBe(200);
  });
});

describe("A/B tests", () => {
  const variantsFor = async (cookie?: string) => ((await (await publicFlags.GET(req("/api/flags/", "GET", undefined, cookie))).json()) as { variants: Record<string, string> }).variants;
  const list = async () => (await (await as(admin.cookie).get(experiments, "/api/admin/experiments/")).json()).experiments as { key: string; status: string; winner: string | null; results: { variant: string; families: number; paid: number }[] }[];

  it("go from draft to running to stopped, counting families as they are shown a variant", async () => {
    const variants = [{ name: "control", weight: 50 }, { name: "bright", weight: 50 }];
    expect((await as(admin.cookie).send(experiments, "POST", "/api/admin/experiments/", { key: "home-colours", description: "Brighter home", variants })).status).toBe(200);
    expect((await as(admin.cookie).send(experiments, "POST", "/api/admin/experiments/", { key: "home-colours", variants })).status).toBe(409);
    expect((await as(admin.cookie).send(experiments, "POST", "/api/admin/experiments/", { key: "Bad Key", variants })).status).toBe(400);

    // A draft shows everyone the control and counts nobody.
    expect((await variantsFor(parent.cookie))["home-colours"]).toBe("control");
    expect((await list())[0].results).toEqual([]);
    expect((await as(admin.cookie).send(experiments, "PATCH", "/api/admin/experiments/", { key: "home-colours", action: "edit", variants: [...variants, { name: "dark", weight: 10 }] })).status).toBe(200);

    expect((await as(admin.cookie).send(experiments, "PATCH", "/api/admin/experiments/", { key: "home-colours", action: "start" })).status).toBe(200);
    expect((await as(admin.cookie).send(experiments, "PATCH", "/api/admin/experiments/", { key: "home-colours", action: "start" })).status).toBe(409);
    expect((await as(admin.cookie).send(experiments, "PATCH", "/api/admin/experiments/", { key: "home-colours", action: "edit", variants })).status).toBe(409);

    const seen = (await variantsFor(parent.cookie))["home-colours"];
    expect(["control", "bright", "dark"]).toContain(seen);
    expect((await variantsFor(parent.cookie))["home-colours"]).toBe(seen);
    await variantsFor(); // signed out: bucketed, not counted
    await dbm.run("UPDATE families SET plan = 'premium' WHERE id = ?", [parent.familyId]);
    const results = (await list()).find((e) => e.key === "home-colours")!.results;
    expect(results.map((r) => r.variant)).toEqual(["control", "bright", "dark"]);
    expect(results.reduce((n, r) => n + r.families, 0)).toBe(1);
    expect(results.find((r) => r.variant === seen)).toMatchObject({ families: 1, paid: 1 });

    expect((await as(admin.cookie).send(experiments, "PATCH", "/api/admin/experiments/", { key: "home-colours", action: "stop", winner: "nope" })).status).toBe(400);
    expect((await as(admin.cookie).send(experiments, "PATCH", "/api/admin/experiments/", { key: "home-colours", action: "stop", winner: "bright" })).status).toBe(200);
    expect((await variantsFor(parent.cookie))["home-colours"]).toBe("bright");
    expect((await variantsFor())["home-colours"]).toBe("bright");
    expect((await list()).find((e) => e.key === "home-colours")).toMatchObject({ status: "stopped", winner: "bright" });

    expect((await as(admin.cookie).send(experiments, "DELETE", "/api/admin/experiments/?key=home-colours")).status).toBe(200);
    expect((await variantsFor(parent.cookie))["home-colours"]).toBeUndefined();
    expect(await dbm.query("SELECT * FROM experiment_assignments WHERE experiment = 'home-colours'")).toEqual([]);
    expect((await as(admin.cookie).send(experiments, "DELETE", "/api/admin/experiments/?key=home-colours")).status).toBe(404);
    await dbm.run("UPDATE families SET plan = 'trial' WHERE id = ?", [parent.familyId]);
  });
});

describe("users", () => {
  const detail = async (familyId: string) => (await as(admin.cookie).get(users, `/api/admin/users/?id=${familyId}`)).json();
  const act = (body: Record<string, unknown>) => as(admin.cookie).send(users, "POST", "/api/admin/users/", body);

  it("are found by email, and class student accounts are left out", async () => {
    await dbm.run("INSERT INTO families (id, created_at, trial_ends_at, plan, updated_at) VALUES ('student-fam', 1, 1, 'premium', 1)");
    await dbm.run("INSERT INTO parents (id, family_id, email, password_hash, created_at, role) VALUES ('student-p', 'student-fam', 'student-parent@example.com', 'x', 1, 'student')");
    const found = (await (await as(admin.cookie).get(users, "/api/admin/users/?q=parent")).json()).users as { email: string }[];
    expect(found.map((u) => u.email)).toEqual(["parent@example.com"]);
    const all = (await (await as(admin.cookie).get(users, "/api/admin/users/")).json()).users as { email: string }[];
    expect(all.map((u) => u.email)).toContain(ADMIN_EMAIL);
    expect(all.map((u) => u.email)).not.toContain("student-parent@example.com");
    expect((await as(admin.cookie).get(users, "/api/admin/users/?id=student-fam")).status).toBe(404);
    // A % in the search is a literal, not a wildcard.
    expect((await (await as(admin.cookie).get(users, "/api/admin/users/?q=%25")).json()).users).toEqual([]);
  });

  it("shows a family's plan and children's grades, never their names", async () => {
    await dbm.run("INSERT INTO profiles (id, family_id, data, updated_at) VALUES ('kid-1', ?, ?, 1)", [parent.familyId, JSON.stringify({ id: "kid-1", name: "Secretname", grade: "3", framework: "ca-on" })]);
    const d = await detail(parent.familyId);
    expect(d.children).toEqual([{ grade: "3", framework: "ca-on" }]);
    expect(JSON.stringify(d)).not.toContain("Secretname");
    expect(d.parents[0]).toMatchObject({ email: "parent@example.com", verified: true });
  });

  it("can extend a trial, give and remove access, confirm an email and sign out everywhere", async () => {
    const before = (await detail(parent.familyId)).family.trialEndsAt as number;
    expect((await act({ familyId: parent.familyId, action: "extend-trial", days: 10 })).status).toBe(200);
    expect((await detail(parent.familyId)).family.trialEndsAt).toBe(before + 10 * 86_400_000);
    expect((await act({ familyId: parent.familyId, action: "extend-trial", days: 0 })).status).toBe(400);

    expect((await act({ familyId: parent.familyId, action: "grant-access", days: 30 })).status).toBe(200);
    const until = (await detail(parent.familyId)).family.accessUntil as number;
    expect(until).toBeGreaterThan(Date.now() + 29 * 86_400_000);
    const fam = (await (await me.GET(req("/api/auth/me/", "GET", undefined, parent.cookie))).json()).family;
    expect(fam.accessUntil).toBe(until);
    expect((await act({ familyId: parent.familyId, action: "grant-access", days: null })).status).toBe(200);
    expect((await detail(parent.familyId)).family.accessUntil).toBe(LIFETIME_ACCESS);
    expect((await act({ familyId: parent.familyId, action: "remove-access" })).status).toBe(200);
    expect((await detail(parent.familyId)).family.accessUntil).toBeNull();

    const late = (await dbm.query<{ id: string; family_id: string }>("SELECT id, family_id FROM parents WHERE email = 'late@example.com'"))[0];
    expect((await act({ familyId: late.family_id, action: "verify-email", parentId: parent.familyId })).status).toBe(400);
    expect((await act({ familyId: late.family_id, action: "verify-email", parentId: late.id })).status).toBe(200);
    expect((await detail(late.family_id)).parents[0].verified).toBe(true);

    const second = cookieOf(await login.POST(req("/api/auth/login/", "POST", { email: "parent@example.com", password: "correct horse" })));
    expect((await act({ familyId: parent.familyId, action: "sign-out" })).status).toBe(200);
    expect((await me.GET(req("/api/auth/me/", "GET", undefined, second))).status).toBe(401);
    parent.cookie = cookieOf(await login.POST(req("/api/auth/login/", "POST", { email: "parent@example.com", password: "correct horse" })));

    expect((await act({ familyId: parent.familyId, action: "fly" })).status).toBe(400);
    expect((await act({ familyId: "missing", action: "sign-out" })).status).toBe(404);
  });

  it("deletes an account only with its email typed out, and never the admin's own", async () => {
    const doomed = await account("doomed@example.com");
    await dbm.run("INSERT INTO flag_overrides (key, family_id, enabled, created_at) VALUES ('shop', ?, 0, 1)", [doomed.familyId]);
    expect((await act({ familyId: doomed.familyId, action: "delete", confirm: "parent@example.com" })).status).toBe(400);
    expect((await act({ familyId: admin.familyId, action: "delete", confirm: ADMIN_EMAIL })).status).toBe(400);
    expect((await act({ familyId: doomed.familyId, action: "delete", confirm: " Doomed@Example.com " })).status).toBe(200);
    expect(await dbm.query("SELECT id FROM parents WHERE family_id = ?", [doomed.familyId])).toEqual([]);
    expect(await dbm.query("SELECT key FROM flag_overrides WHERE family_id = ?", [doomed.familyId])).toEqual([]);
    expect((await me.GET(req("/api/auth/me/", "GET", undefined, doomed.cookie))).status).toBe(401);
  });
});

describe("codes, reports, stats and the change log", () => {
  it("lets the signed-in admin make and disable codes without the token", async () => {
    const res = await as(admin.cookie).send(codes, "POST", "/api/admin/codes/", { kind: "access", days: 30, maxUses: 5, note: "Panel test" });
    expect(res.status).toBe(200);
    const made = (await res.json()).code as { code: string };
    const listed = (await (await as(admin.cookie).get(codes, "/api/admin/codes/")).json()).codes as { code: string }[];
    expect(listed.map((c) => c.code)).toContain(made.code);
    expect((await as(admin.cookie).send(codes, "DELETE", "/api/admin/codes/", { code: made.code })).status).toBe(200);
  });

  it("lists question reports by question and clears them", async () => {
    for (let i = 0; i < 2; i++) expect((await feedback.POST(req("/api/feedback/", "POST", { unitKey: "3/math/counting", prompt: "What is 2 + 2?", reason: "wrong-answer" }))).status).toBe(200);
    const list = (await (await as(admin.cookie).get(reports, "/api/admin/reports/")).json()).reports as { unitKey: string; count: number }[];
    expect(list[0]).toMatchObject({ unitKey: "3/math/counting", count: 2 });
    expect((await (await as(admin.cookie).send(reports, "DELETE", "/api/admin/reports/", { unitKey: "3/math/counting", prompt: "What is 2 + 2?" })).json()).removed).toBe(2);
    expect((await (await as(admin.cookie).get(reports, "/api/admin/reports/")).json()).reports).toEqual([]);
  });

  it("keeps the curriculum and what was on screen with a report, and drops what doesn't fit", async () => {
    const details = { choices: ["8", "10", "12", "4"], answer: "8", visual: { type: "equation", text: "2 × 4 = ?" } };
    const send = (framework: unknown, d: unknown) =>
      feedback.POST(req("/api/feedback/", "POST", { unitKey: "3/math/multiplication", prompt: "What is 2 × 4?", reason: "unclear", framework, details: d }));
    expect((await send("ca-bc", { ...details, extra: "<script>" })).status).toBe(200);
    expect((await send("us-wa", details)).status).toBe(200);
    expect((await send("ca-qc", "not details")).status).toBe(200);
    const list = (await (await as(admin.cookie).get(reports, "/api/admin/reports/")).json()).reports as { unitKey: string; count: number; frameworks: string[]; details: unknown }[];
    const row = list.find((r) => r.unitKey === "3/math/multiplication")!;
    expect(row.count).toBe(3);
    expect([...row.frameworks].sort()).toEqual(["ca-bc", "us-wa"]);
    expect(row.details).toEqual(null);
    await as(admin.cookie).send(reports, "DELETE", "/api/admin/reports/", { unitKey: "3/math/multiplication", prompt: "What is 2 × 4?" });
    expect((await send("ca-bc", details)).status).toBe(200);
    const again = (await (await as(admin.cookie).get(reports, "/api/admin/reports/")).json()).reports as { details: unknown }[];
    expect(again[0].details).toEqual(details);
    await as(admin.cookie).send(reports, "DELETE", "/api/admin/reports/", { unitKey: "3/math/multiplication", prompt: "What is 2 × 4?" });
  });

  it("counts families without class student accounts", async () => {
    const s = await (await as(admin.cookie).get(stats, "/api/admin/stats/")).json();
    const real = Number((await dbm.query<{ n: number }>("SELECT COUNT(*) AS n FROM parents WHERE role != 'student'"))[0].n);
    expect(s.people.families).toBe(real);
    expect(s.people.parents).toBe(real);
    expect(s.people.classes).toBe(1);
    expect(s.people.teachers).toBe(1);
    expect(s.people.children).toBe(1);
    expect(s.acquisition.thisMonth + s.acquisition.lastMonth).toBeGreaterThanOrEqual(1);
    expect(s.engagement.daily).toHaveLength(30);
    expect(s.revenue.months).toHaveLength(12);
    expect(s.stripe).toBe(false);
  });

  it("answers for one overview section at a time, with the same numbers as the whole", async () => {
    const whole = await (await as(admin.cookie).get(stats, "/api/admin/stats/")).json();
    const part = async (section: string) => (await as(admin.cookie).get(stats, `/api/admin/stats/?section=${section}`)).json();
    const money = await part("money");
    expect(money.revenue).toEqual(whole.revenue);
    expect(money.stripe).toBe(false);
    const customers = await part("customers");
    expect(customers).toMatchObject({ people: whole.people, customers: whole.customers, other: whole.other });
    const growth = await part("growth");
    expect(growth).toMatchObject({ acquisition: whole.acquisition, customersEver: whole.revenue.customersEver, cancelReasons: whole.cancelReasons });
    const practice = await part("practice");
    expect(practice.engagement.d30).toBe(whole.engagement.d30);
    expect(practice.engagement.daily).toHaveLength(30);
    expect(practice.revenue).toBeUndefined();
    expect((await as(admin.cookie).get(stats, "/api/admin/stats/?section=nope")).status).toBe(400);
    expect((await as(parent.cookie).get(stats, "/api/admin/stats/?section=money")).status).toBe(404);
  });

  it("records paid invoices and refunds from Stripe and shows them as revenue", async () => {
    const payer = await account("payer@example.com");
    await dbm.run("UPDATE families SET stripe_customer = 'cus_payer', plan = 'premium', subscription_interval = 'month' WHERE id = ?", [payer.familyId]);
    const hook = (type: string, object: Record<string, unknown>) => {
      const payload = JSON.stringify({ id: `evt_${type}_${Math.random()}`, created: Math.floor(Date.now() / 1000), type, data: { object } });
      const t = Math.floor(Date.now() / 1000);
      const sig = `t=${t},v1=${createHmac("sha256", "whsec_admin").update(`${t}.${payload}`).digest("hex")}`;
      return webhook.POST(new Request("http://localhost/api/billing/webhook/", { method: "POST", headers: { "stripe-signature": sig }, body: payload }));
    };
    const paidAt = Math.floor(Date.now() / 1000) - 60;
    const invoice = { id: "in_1", customer: "cus_payer", amount_paid: 1499, currency: "cad", status_transitions: { paid_at: paidAt }, lines: { data: [{ price: { recurring: { interval: "month" } } }] } };
    expect((await hook("invoice.paid", invoice)).status).toBe(200);
    expect((await hook("invoice.paid", invoice)).status).toBe(200); // a second event for the same invoice changes nothing
    // An invoice for someone who isn't a family here (another product on the same Stripe account) is ignored.
    expect((await hook("invoice.paid", { ...invoice, id: "in_other", customer: "cus_stranger" })).status).toBe(200);
    const rows = await dbm.query<{ id: string; family_id: string; amount: number; interval: string; paid_at: number }>("SELECT id, family_id, amount, interval, paid_at FROM payments");
    expect(rows).toEqual([{ id: "in_1", family_id: payer.familyId, amount: 1499, interval: "month", paid_at: paidAt * 1000 }]);

    let s = await (await as(admin.cookie).get(stats, "/api/admin/stats/")).json();
    expect(s.revenue.thisMonth).toBe(1499);
    expect(s.customers.paying).toBe(1);
    expect(s.revenue.mrr).toBe(1499);

    // Cancelled in the billing portal: the month already paid still runs, but nothing more is coming.
    const sub = { id: "sub_payer", status: "active", customer: "cus_payer", current_period_end: paidAt + 30 * 86_400, items: { data: [{ price: { recurring: { interval: "month" } } }] } };
    await hook("customer.subscription.updated", { ...sub, cancel_at_period_end: true, canceled_at: paidAt + 10 });
    expect((await dbm.query<{ cancelled_at: number }>("SELECT cancelled_at FROM families WHERE id = ?", [payer.familyId]))[0].cancelled_at).toBe((paidAt + 10) * 1000);
    s = await (await as(admin.cookie).get(stats, "/api/admin/stats/")).json();
    expect(s.customers).toMatchObject({ paying: 1, cancelling: 1 });
    expect(s.revenue).toMatchObject({ mrr: 0, arr: 0, renewing: 0, cancelled30: 1 });
    const cancelled = await (await as(admin.cookie).get(statsDetail, "/api/admin/stats/detail/?view=cancelled")).json();
    expect(cancelled.tables[0].rows).toEqual([expect.objectContaining({ familyId: payer.familyId, cells: expect.arrayContaining(["payer@example.com", (paidAt + 10) * 1000]) })]);
    const payingList = await (await as(admin.cookie).get(statsDetail, "/api/admin/stats/detail/?view=paying")).json();
    expect(payingList.tables[0].rows[0].cells).toEqual(expect.arrayContaining(["cancelling", 0]));
    // "Don't cancel" puts it back.
    await hook("customer.subscription.updated", { ...sub, cancel_at_period_end: false, canceled_at: null });
    s = await (await as(admin.cookie).get(stats, "/api/admin/stats/")).json();
    expect(s.revenue).toMatchObject({ mrr: 1499, cancelled30: 0 });
    expect(s.customers.cancelling).toBe(0);

    // A full refund ends the plan, so it stops counting even before Stripe says the subscription ended.
    await dbm.run("UPDATE payments SET refunded = amount WHERE id = 'in_1'");
    expect((await (await as(admin.cookie).get(stats, "/api/admin/stats/")).json()).revenue.mrr).toBe(0);
    await dbm.run("UPDATE payments SET refunded = 0 WHERE id = 'in_1'");

    await hook("charge.refunded", { id: "ch_1", invoice: "in_1", amount_refunded: 500 });
    s = await (await as(admin.cookie).get(stats, "/api/admin/stats/")).json();
    expect(s.revenue.thisMonth).toBe(999);

    // Deleting the family keeps the money in the totals but unlinks it.
    expect((await as(admin.cookie).send(users, "POST", "/api/admin/users/", { familyId: payer.familyId, action: "delete", confirm: "payer@example.com" })).status).toBe(200);
    expect(await dbm.query("SELECT family_id FROM payments")).toEqual([{ family_id: null }]);
    s = await (await as(admin.cookie).get(stats, "/api/admin/stats/")).json();
    expect(s.revenue.thisMonth).toBe(999);
  });

  it("saves monthly costs for profit, and only imports from Stripe when it is set up", async () => {
    expect((await as(admin.cookie).send(stats, "POST", "/api/admin/stats/", { action: "costs", monthlyCosts: -1 })).status).toBe(400);
    expect((await as(admin.cookie).send(stats, "POST", "/api/admin/stats/", { action: "costs", monthlyCosts: 42.5 })).status).toBe(200);
    const s = await (await as(admin.cookie).get(stats, "/api/admin/stats/")).json();
    expect(s.revenue.monthlyCosts).toBe(4250);
    expect(s.revenue.months[0].costs).toBe(4250);
    expect((await as(admin.cookie).send(stats, "POST", "/api/admin/stats/", { action: "import" })).status).toBe(400);
    expect((await as(admin.cookie).send(stats, "POST", "/api/admin/stats/", { action: "nope" })).status).toBe(400);
    expect((await as(parent.cookie).send(stats, "POST", "/api/admin/stats/", { action: "costs", monthlyCosts: 1 })).status).toBe(404);
  });

  it("opens the list behind each dashboard tile, with emails but never children's names", async () => {
    const { DETAIL_VIEWS } = await import("@/lib/adminDetail");
    const view = (v: string, cookie = admin.cookie) => as(cookie).get(statsDetail, `/api/admin/stats/detail/?view=${v}`);
    expect((await view("families", parent.cookie)).status).toBe(404);
    expect((await view("nope")).status).toBe(400);
    expect((await as(admin.cookie).get(statsDetail, "/api/admin/stats/detail/")).status).toBe(400);

    const coder = await account("coder@example.com");
    await dbm.run("UPDATE families SET plan = 'premium', subscription_interval = 'year', current_period_end = ? WHERE id = ?", [Date.now() + 1e9, coder.familyId]);
    for (const v of DETAIL_VIEWS) {
      const res = await view(v);
      expect(res.status, v).toBe(200);
      const d = await res.json();
      expect(d.title, v).toBeTruthy();
      expect(d.tables.length, v).toBeGreaterThan(0);
      for (const t of d.tables) for (const r of t.rows) expect(r.cells, v).toHaveLength(t.columns.length);
      const text = JSON.stringify(d);
      expect(text, v).not.toContain("Secretname");
      expect(text, v).not.toContain("student-parent@example.com");
    }

    const paying = await (await view("paying")).json();
    expect(paying.tables[0].rows).toEqual([expect.objectContaining({ familyId: coder.familyId, cells: expect.arrayContaining(["coder@example.com", "Yearly"]) })]);
    expect(paying.summary.find((s: { label: string }) => s.label === "Yearly").value).toBe(1);

    const families = await (await view("families")).json();
    const emails = families.tables[0].rows.map((r: { cells: unknown[] }) => r.cells[0]);
    expect(emails).toEqual(expect.arrayContaining([ADMIN_EMAIL, "parent@example.com", "coder@example.com"]));
    expect(families.tables[0].rows.find((r: { cells: unknown[] }) => r.cells[0] === "coder@example.com").cells[2]).toBe("Paying");

    // The refunded payment of the deleted family is still listed, without a link to a family.
    const month = await (await view("payments-month")).json();
    expect(month.tables[0].rows).toEqual([{ cells: [expect.any(Number), "Deleted account", "Monthly", 1499, 500, expect.any(Number)] }]);
    expect(month.summary.find((s: { label: string }) => s.label === "Collected").value).toBe(1499);

    const children = await (await view("children")).json();
    expect(children.tables[0].rows).toEqual([{ cells: ["Grade 3", 1] }]);
    expect(children.tables[1].rows).toEqual([{ cells: ["Ontario", 1] }]);

    const signups = await (await view("signups")).json();
    expect(signups.tables[1].rows).toHaveLength(60);

    const teachers = await (await view("teachers")).json();
    expect(teachers.tables[0].rows).toHaveLength(1);
  });

  it("shows the same number on each tile as in the list it opens", async () => {
    const now = Date.now();
    // A class with two students the teacher added (each also a class member), a child their parent linked and a co-teacher.
    const { addStudents } = await import("@/server/students");
    const cls = (await dbm.query<Record<string, unknown>>("SELECT * FROM classes WHERE closed_at IS NULL LIMIT 1"))[0];
    await addStudents(cls as never, ["Ava", "Ben"]);
    const child = (await dbm.query<{ id: string; family_id: string }>("SELECT id, family_id FROM profiles WHERE family_id NOT IN (SELECT family_id FROM parents WHERE role = 'student') LIMIT 1"))[0];
    await dbm.run("INSERT INTO class_members (class_id, profile_id, family_id, joined_at) VALUES (?, ?, ?, ?)", [cls.id as string, child.id, child.family_id, now]);
    const adminParent = (await dbm.query<{ id: string }>("SELECT id FROM parents WHERE email = ?", [ADMIN_EMAIL]))[0].id;
    await dbm.run("INSERT INTO class_teachers (class_id, parent_id, joined_at) VALUES (?, ?, ?)", [cls.id as string, adminParent, now]);
    // A US family paying in USD, and a family whose only payment was refunded in full.
    const us = await account("us-payer@example.com");
    await dbm.run("UPDATE families SET country = 'US', plan = 'premium', subscription_interval = 'month' WHERE id = ?", [us.familyId]);
    await dbm.run("INSERT INTO payments (id, family_id, amount, refunded, currency, interval, paid_at) VALUES ('in_us', ?, 1499, 0, 'usd', 'month', ?)", [us.familyId, now - 60_000]);
    const refunded = await account("refunded@example.com");
    await dbm.run("INSERT INTO payments (id, family_id, amount, refunded, currency, interval, paid_at) VALUES ('in_back', ?, 1499, 1499, 'cad', 'month', ?)", [refunded.familyId, now - 60_000]);
    // Practice now, near the start of the 30 days, and from a device clock that runs ahead.
    for (const [i, t] of [now - 3_600_000, now - 29.5 * 86_400_000, now + 86_400_000].entries())
      await dbm.run("INSERT INTO events (id, family_id, profile_id, t, data) VALUES (?, ?, ?, ?, ?)", [`tile-${i}`, child.family_id, child.id, t, JSON.stringify({ type: "answer", ms: 5000 })]);

    // Guest devices: today, inside the week and inside the 30 days.
    const today = Math.floor(now / 86_400_000);
    for (const [i, ago] of [0, 3, 20, 40].entries()) await dbm.run("INSERT INTO guest_devices (device_hash, last_day) VALUES (?, ?)", [`tile-guest-${i}`, today - ago]);

    const s = await (await as(admin.cookie).get(stats, "/api/admin/stats/")).json();
    const head = async (v: string, label: string) => {
      const d = await (await as(admin.cookie).get(statsDetail, `/api/admin/stats/detail/?view=${v}`)).json();
      const item = (d.summary as { label: string; value: number }[]).find((x) => x.label === label);
      expect(item, `${v}: ${label}`).toBeTruthy();
      return item!.value;
    };
    const pairs: [string, string, number][] = [
      ["teachers", "Student accounts", s.people.students],
      ["teachers", "Teachers", s.people.teachers],
      ["teachers", "Open classes", s.people.classes],
      ["families", "Families", s.people.families],
      ["children", "Children", s.people.children],
      ["paying", "Paying", s.customers.paying],
      ["paying", "Cancelling", s.customers.cancelling],
      ["paying", "Recurring a month", s.revenue.mrr],
      ["paying", "US recurring a month", s.revenue.usd.mrr],
      ["trialing", "In trial", s.customers.trialing],
      ["free", "Free", s.customers.free],
      ["code-access", "Families", s.customers.codeAccess],
      ["code-access", "Lifetime", s.customers.lifetime],
      ["codes", "Redeemed", s.other.redemptions],
      ["payments-month", "Revenue", s.revenue.thisMonth],
      ["payments-month", "US revenue", s.revenue.usd.thisMonth],
      ["payments-last-month", "Revenue", s.revenue.lastMonth],
      ["payments-year", "Revenue", s.revenue.yearToDate],
      ["payments-year", "US revenue", s.revenue.usd.yearToDate],
      ["cancelled", "Last 30 days", s.revenue.cancelled30],
      ["customers-ever", "Families", s.revenue.customersEver],
      ["signups", "This month", s.acquisition.thisMonth],
      ["trial-conversion", "Trials ended", s.acquisition.trialsEnded],
      ["trial-conversion", "Paying now", s.acquisition.trialsConverted],
      ["referrals", "Referred", s.acquisition.referred],
      ["practising", "Today", s.engagement.d1],
      ["practising", "This week", s.engagement.d7],
      ["practising", "30 days", s.engagement.d30],
      ["practising", "Questions", s.engagement.answers30],
      ["guests", "Today", s.engagement.guests.d1],
      ["guests", "This week", s.engagement.guests.d7],
      ["guests", "Last 30 days", s.engagement.guests.d30],
    ];
    for (const [v, label, tile] of pairs) expect(await head(v, label), `${v}: ${label}`).toBe(tile);
    expect(s.people.students).toBe(2);
    expect(await head("teachers", "Linked by parents")).toBe(1);
    expect(s.revenue.usd.mrr).toBe(1499);
    expect(s.engagement.d1).toBeGreaterThanOrEqual(1);
    // Guest players: 3 of the 4 devices played in the last 30 days, and the list adds up to the tile.
    expect(s.engagement.guests).toEqual({ d1: 1, d7: 2, d30: 3 });
    const guestList = await (await as(admin.cookie).get(statsDetail, "/api/admin/stats/detail/?view=guests")).json();
    expect(guestList.tables[0].rows.reduce((n: number, r: { cells: number[] }) => n + r.cells[1], 0)).toBe(s.engagement.guests.d30);
    expect(JSON.stringify(guestList)).not.toContain("tile-guest");
  });

  it("records every change with who made it", async () => {
    const entries = (await (await as(admin.cookie).get(auditLog, "/api/admin/audit/")).json()).entries as { admin: string; action: string; detail: string | null }[];
    const actions = new Set(entries.map((e) => e.action));
    for (const a of ["flag.set", "user.override", "experiment.create", "experiment.start", "experiment.stop", "experiment.delete", "user.extend-trial", "user.grant-access", "user.remove-access", "user.verify-email", "user.sign-out", "user.delete", "code.create", "code.disable", "reports.clear", "stats.costs"]) {
      expect(actions.has(a), a).toBe(true);
    }
    expect(entries.every((e) => e.admin === ADMIN_EMAIL)).toBe(true);
    expect(entries.find((e) => e.action === "user.delete")!.detail).not.toContain("doomed");
  });
});
