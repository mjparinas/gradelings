import { createHmac } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it, vi } from "vitest";

// These tests run the real route handlers against a throwaway SQLite file.

const dir = mkdtempSync(join(tmpdir(), "grademap-test-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
process.env.STRIPE_WEBHOOK_SECRET = "whsec_test";
delete process.env.RESEND_API_KEY;
delete process.env.NEXT_PUBLIC_SITE_URL;

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, login: Mod, forgot: Mod, reset: Mod, verify: Mod, resend: Mod, me: Mod, sync: Mod, account: Mod, webhook: Mod, checkout: Mod, sessions: Mod, password: Mod;
let auth: typeof import("@/server/auth");
let dbm: typeof import("@/server/db");
let email: typeof import("@/server/email");

beforeAll(async () => {
  [signup, login, forgot, reset, verify, resend, me, sync, account, webhook, checkout, sessions, password] = (await Promise.all([
    import("@/app/api/auth/signup/route"),
    import("@/app/api/auth/login/route"),
    import("@/app/api/auth/forgot/route"),
    import("@/app/api/auth/reset/route"),
    import("@/app/api/auth/verify/route"),
    import("@/app/api/auth/resend-verification/route"),
    import("@/app/api/auth/me/route"),
    import("@/app/api/sync/route"),
    import("@/app/api/account/route"),
    import("@/app/api/billing/webhook/route"),
    import("@/app/api/billing/checkout/route"),
    import("@/app/api/auth/sessions/route"),
    import("@/app/api/auth/password/route"),
  ])) as unknown as Mod[];
  auth = await import("@/server/auth");
  dbm = await import("@/server/db");
  email = await import("@/server/email");
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let ip = 0;
function post(path: string, body: unknown, cookie?: string, method = "POST"): Request {
  return new Request(`http://localhost${path}`, {
    method,
    headers: { "content-type": "application/json", "x-forwarded-for": `10.0.0.${++ip}`, ...(cookie ? { cookie } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}
const cookieOf = (res: Response) => (res.headers.get("set-cookie") ?? "").split(";")[0];
const lastEmail = () => email.outbox().at(-1)!;
const tokenIn = (text: string) => decodeURIComponent(/token=([^\s&"]+)/.exec(text)![1]);

async function newAccount(address: string, password = "correct horse") {
  const res = await signup.POST(post("/api/auth/signup/", { email: address, password }));
  expect(res.status).toBe(200);
  return { cookie: cookieOf(res), body: await res.json() };
}

describe("signup, login and email confirmation", () => {
  it("creates an unconfirmed account, emails a link, and confirms with it once", async () => {
    const { cookie, body } = await newAccount("a@example.com");
    expect(body.family.account.verified).toBe(false);
    const mail = lastEmail();
    expect(mail.to).toBe("a@example.com");
    expect(mail.text).toContain("/account/verify/?token=");

    const token = tokenIn(mail.text);
    const confirmReq = post("/api/auth/verify/", { token });
    confirmReq.headers.set("cookie", cookie); // confirmed from the device that signed up
    expect((await verify.POST(confirmReq)).status).toBe(200);
    expect((await verify.POST(post("/api/auth/verify/", { token }))).status).toBe(400); // used
    const info = await (await me.GET(new Request("http://localhost/api/auth/me/", { headers: { cookie } }))).json();
    expect(info.family.account.verified).toBe(true);
  });

  it("takes over an unconfirmed account when the owner confirms from another browser", async () => {
    const { cookie: squatter } = await newAccount("squat@example.com", "squatter pw 1");
    const done = await verify.POST(post("/api/auth/verify/", { token: tokenIn(lastEmail().text) }));
    expect(done.status).toBe(200);
    const whoAmI = (c: string) => me.GET(new Request("http://localhost/api/auth/me/", { headers: { cookie: c } }));
    expect((await whoAmI(squatter)).status).toBe(401);
    expect((await whoAmI(cookieOf(done))).status).toBe(200);
    expect((await login.POST(post("/api/auth/login/", { email: "squat@example.com", password: "squatter pw 1" }))).status).toBe(401);
  });

  it("rejects duplicates, short passwords and wrong passwords", async () => {
    await newAccount("b@example.com");
    expect((await signup.POST(post("/api/auth/signup/", { email: "b@example.com", password: "another long one" }))).status).toBe(409);
    expect((await signup.POST(post("/api/auth/signup/", { email: "c@example.com", password: "short" }))).status).toBe(400);
    expect((await login.POST(post("/api/auth/login/", { email: "b@example.com", password: "nope nope nope" }))).status).toBe(401);
    expect((await login.POST(post("/api/auth/login/", { email: "b@example.com", password: "correct horse" }))).status).toBe(200);
  });

  it("makes an account from an email alone for the weekly report, with no password and the report on", async () => {
    const res = await signup.POST(post("/api/auth/signup/", { email: "reports@example.com", passwordless: true }));
    expect(res.status).toBe(200);
    expect((await res.json()).family.account.verified).toBe(false);
    const row = (await dbm.query<{ password_hash: string; weekly_report: number }>("SELECT password_hash, weekly_report FROM parents WHERE email = 'reports@example.com'"))[0];
    expect(row).toEqual({ password_hash: "!", weekly_report: 1 });
    expect(lastEmail().text).toContain("weekly progress report");
    // No password ever matches it, and the address can't be taken twice.
    expect((await login.POST(post("/api/auth/login/", { email: "reports@example.com", password: "!" }))).status).toBe(401);
    expect((await signup.POST(post("/api/auth/signup/", { email: "reports@example.com", passwordless: true }))).status).toBe(409);
    // A password sign-up still needs a real password and leaves the weekly report off.
    await newAccount("with-password@example.com");
    expect((await dbm.query<{ weekly_report: number }>("SELECT weekly_report FROM parents WHERE email = 'with-password@example.com'"))[0].weekly_report).toBe(0);
  });

  it("refuses cross-site posts", async () => {
    const req = post("/api/auth/login/", { email: "b@example.com", password: "correct horse" });
    req.headers.set("origin", "https://evil.example");
    expect((await login.POST(req)).status).toBe(403);
  });

  it("limits resending the confirmation email", async () => {
    const { cookie } = await newAccount("resend@example.com");
    const statuses: number[] = [];
    for (let i = 0; i < 4; i++) statuses.push((await resend.POST(post("/api/auth/resend-verification/", {}, cookie))).status);
    expect(statuses).toEqual([200, 200, 200, 429]);
  });

  it("keeps real checkout closed until the email is confirmed", async () => {
    const { cookie } = await newAccount("pay@example.com");
    expect((await checkout.POST(post("/api/billing/checkout/", { interval: "month" }, cookie))).status).toBe(403);
  });
});

describe("password reset", () => {
  it("answers the same for unknown emails and sends nothing", async () => {
    const before = email.outbox().length;
    const known = await (await forgot.POST(post("/api/auth/forgot/", { email: "nobody@example.com" }))).json();
    expect(known.ok).toBe(true);
    expect(email.outbox().length).toBe(before);
  });

  it("resets once, signs other devices out and confirms the email", async () => {
    const { cookie: oldCookie } = await newAccount("r@example.com", "old password 1");
    const sent = email.outbox().length;
    const res = await forgot.POST(post("/api/auth/forgot/", { email: "R@example.com" }));
    expect(res.status).toBe(200);
    expect(email.outbox().length).toBe(sent + 1);
    const token = tokenIn(lastEmail().text);

    expect((await reset.POST(post("/api/auth/reset/", { token, password: "short" }))).status).toBe(400);
    const done = await reset.POST(post("/api/auth/reset/", { token, password: "brand new pass" }));
    expect(done.status).toBe(200);
    expect((await done.json()).family.account.verified).toBe(true);
    expect((await reset.POST(post("/api/auth/reset/", { token, password: "another pass 22" }))).status).toBe(400);

    // The old session is gone and only the new password works.
    expect((await me.GET(new Request("http://localhost/api/auth/me/", { headers: { cookie: oldCookie } }))).status).toBe(401);
    expect((await login.POST(post("/api/auth/login/", { email: "r@example.com", password: "old password 1" }))).status).toBe(401);
    expect((await login.POST(post("/api/auth/login/", { email: "r@example.com", password: "brand new pass" }))).status).toBe(200);
  });

  it("rejects expired tokens", async () => {
    const { body } = await newAccount("exp@example.com");
    void body;
    const rows = await dbm.query<{ id: string }>("SELECT id FROM parents WHERE email = ?", ["exp@example.com"]);
    const token = await auth.createAuthToken(rows[0].id, "reset", -1000);
    expect((await reset.POST(post("/api/auth/reset/", { token, password: "valid password" }))).status).toBe(400);
  });

  it("does not accept a verification token for a reset", async () => {
    await newAccount("kind@example.com");
    const token = tokenIn(lastEmail().text);
    expect((await reset.POST(post("/api/auth/reset/", { token, password: "valid password" }))).status).toBe(400);
  });
});

describe("rate limiter", () => {
  it("counts per key across calls and starts a new window after it ends", async () => {
    const results: boolean[] = [];
    for (let i = 0; i < 4; i++) results.push(await auth.rateLimited("test:key", 3, 60_000));
    expect(results).toEqual([false, false, false, true]);
    expect(await auth.rateLimited("test:other", 3, 60_000)).toBe(false);
    await dbm.run("UPDATE rate_limits SET reset_at = ? WHERE key = ?", [Date.now() - 1, "test:key"]);
    expect(await auth.rateLimited("test:key", 3, 60_000)).toBe(false);
  });

  it("blocks guessing from one address, but a stranger can't lock the parent out", async () => {
    await newAccount("brute@example.com");
    const from = (ip: string, password: string) =>
      login.POST(new Request("http://localhost/api/auth/login/", { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": ip }, body: JSON.stringify({ email: "brute@example.com", password }) }));
    let last = 0;
    for (let i = 0; i < 12; i++) last = (await from("203.0.113.9", "wrong wrong")).status;
    expect(last).toBe(429);
    expect((await from("198.51.100.4", "correct horse")).status).toBe(200);
  });

  it("blocks guessing spread across many addresses", async () => {
    await newAccount("spread@example.com");
    let last = 0;
    for (let i = 0; i < 62; i++) last = (await login.POST(post("/api/auth/login/", { email: "spread@example.com", password: "wrong wrong" }))).status;
    expect(last).toBe(429);
  });

  it("ignores a forged first X-Forwarded-For entry", () => {
    const ip = (xff: string) => auth.clientIp(new Request("http://localhost/", { headers: { "x-forwarded-for": xff } }));
    expect(ip("1.1.1.1, 9.9.9.9")).toBe("9.9.9.9");
    expect(ip("9.9.9.9")).toBe("9.9.9.9");
    expect(auth.clientIp(new Request("http://localhost/", { headers: { "x-vercel-forwarded-for": "7.7.7.7", "x-forwarded-for": "1.1.1.1" } }))).toBe("7.7.7.7");
  });
});

describe("sync", () => {
  const event = (id: string, profileId: string) => ({ id, profileId, type: "answer", t: Date.now() - 1000, unitKey: "2/math/x", correct: true });
  const profile = (id: string) => ({ id, name: "Maya", grade: "2", avatar: "ollie", colour: "#fff", updatedAt: Date.now() });

  it("stores events once however often a device re-sends them", async () => {
    const { cookie } = await newAccount("sync@example.com");
    const body = { cursor: 0, profiles: [profile("p1")], events: [event("e1", "p1"), event("e2", "p1")] };
    const first = await (await sync.POST(post("/api/sync/", body, cookie))).json();
    expect(first.accepted).toEqual(["e1", "e2"]);
    const again = await (await sync.POST(post("/api/sync/", { ...body, cursor: 0 }, cookie))).json();
    expect(again.events).toHaveLength(2);
  });

  it("keeps opened mystery boxes and drops event types it doesn't know", async () => {
    const { cookie } = await newAccount("mystery@example.com");
    const box = { id: "m1", profileId: "pm", type: "mystery", t: Date.now() - 1000, session: "s1" };
    const odd = { id: "o1", profileId: "pm", type: "lottery", t: Date.now() - 1000 };
    const res = await (await sync.POST(post("/api/sync/", { cursor: 0, profiles: [profile("pm")], events: [box, odd] }, cookie))).json();
    expect(res.accepted).toEqual(["m1"]);
  });

  it("names its database so devices can tell when it was replaced", async () => {
    const { cookie } = await newAccount("epoch@example.com");
    const first = await (await sync.POST(post("/api/sync/", {}, cookie))).json();
    expect(first.epoch).toMatch(/^[0-9a-f]{16}$/);
    expect((await (await sync.POST(post("/api/sync/", {}, cookie))).json()).epoch).toBe(first.epoch);
    process.env.SYNC_EPOCH = "after-restore";
    try {
      const changed = (await (await sync.POST(post("/api/sync/", {}, cookie))).json()).epoch;
      expect(changed).toMatch(/^[0-9a-f]{16}$/);
      expect(changed).not.toBe(first.epoch);
    } finally {
      delete process.env.SYNC_EPOCH;
    }
  });

  it("ignores events for children that belong to another family", async () => {
    const a = await newAccount("fam-a@example.com");
    const b = await newAccount("fam-b@example.com");
    await sync.POST(post("/api/sync/", { profiles: [profile("pa")] }, a.cookie));
    const res = await (await sync.POST(post("/api/sync/", { cursor: 0, events: [event("x1", "pa")] }, b.cookie))).json();
    expect(res.accepted).toEqual([]);
    expect(res.events).toEqual([]);
  });

  it("does not bring back events for a deleted or reset child", async () => {
    const { cookie } = await newAccount("deleted-child@example.com");
    const t0 = Date.now() - 5000;
    await sync.POST(post("/api/sync/", { profiles: [{ ...profile("pd"), updatedAt: t0 }], events: [event("d1", "pd")] }, cookie));
    // Deleted in the same request that still carries a pending event, and again from a later push.
    const gone = await (await sync.POST(post("/api/sync/", { profiles: [{ ...profile("pd"), deleted: true, updatedAt: t0 + 10 }], events: [event("d2", "pd")] }, cookie))).json();
    expect(gone.accepted).toContain("d2");
    const later = await (await sync.POST(post("/api/sync/", { cursor: 0, events: [event("d3", "pd")] }, cookie))).json();
    expect(later.events).toEqual([]);

    await sync.POST(post("/api/sync/", { profiles: [{ ...profile("pr"), updatedAt: t0 }] }, cookie));
    const reset = await (await sync.POST(post("/api/sync/", { cursor: 0, profiles: [{ ...profile("pr"), resetAt: Date.now(), updatedAt: t0 + 10 }], events: [event("r1", "pr")] }, cookie))).json();
    expect(reset.events).toEqual([]);
  });

  it("survives malformed bodies", async () => {
    const { cookie } = await newAccount("malformed@example.com");
    for (const body of [{ profiles: [null] }, { events: "x" }, { events: [null], settings: [null] }]) {
      expect((await sync.POST(post("/api/sync/", body, cookie))).status).toBe(200);
    }
  });

  it("needs a session", async () => {
    expect((await sync.POST(post("/api/sync/", {}))).status).toBe(401);
  });

  it("stores at most five children, and a removed child frees a place", async () => {
    const { cookie } = await newAccount("five-children@example.com");
    const t = Date.now();
    const child = (id: string, updatedAt: number, extra: Record<string, unknown> = {}) => ({ ...profile(id), updatedAt, ...extra });
    const ids = ["lim-a", "lim-b", "lim-c", "lim-d", "lim-e", "lim-f"];
    const first = await (await sync.POST(post("/api/sync/", { profiles: ids.map((id, i) => child(id, t + i)) }, cookie))).json();
    expect(first.profiles.map((p: { id: string }) => p.id).sort()).toEqual(["lim-a", "lim-b", "lim-c", "lim-d", "lim-e"]);
    const renamed = await (await sync.POST(post("/api/sync/", { profiles: [child("lim-a", t + 10, { name: "Ada" })] }, cookie))).json();
    expect(renamed.profiles.find((p: { id: string }) => p.id === "lim-a").name).toBe("Ada");
    await sync.POST(post("/api/sync/", { profiles: [child("lim-e", t + 20, { deleted: true })] }, cookie));
    const added = await (await sync.POST(post("/api/sync/", { profiles: [child("lim-f", t + 30)] }, cookie))).json();
    expect(added.profiles.filter((p: { deleted?: boolean }) => !p.deleted).map((p: { id: string }) => p.id).sort()).toEqual(["lim-a", "lim-b", "lim-c", "lim-d", "lim-f"]);
  });

  it("keeps children already on an account when the family is past the limit", async () => {
    const { cookie, body } = await newAccount("already-four@example.com");
    const familyId = body.family.account.familyId as string;
    const t = Date.now();
    const ids = ["keep-a", "keep-b", "keep-c", "keep-d", "keep-e", "keep-f"];
    await dbm.batch(ids.map((id, i) => ({
      sql: "INSERT INTO profiles (id, family_id, data, updated_at) VALUES (?, ?, ?, ?)",
      args: [id, familyId, JSON.stringify({ ...profile(id), updatedAt: t + i }), t + i],
    })));
    const renamed = await (await sync.POST(post("/api/sync/", { profiles: [{ ...profile("keep-f"), name: "Dee", updatedAt: t + 20 }] }, cookie))).json();
    expect(renamed.profiles.map((p: { id: string }) => p.id).sort()).toEqual(ids);
    expect(renamed.profiles.find((p: { id: string }) => p.id === "keep-f").name).toBe("Dee");
    const extra = await (await sync.POST(post("/api/sync/", { profiles: [{ ...profile("keep-g"), updatedAt: t + 30 }] }, cookie))).json();
    expect(extra.profiles.map((p: { id: string }) => p.id).sort()).toEqual(ids);
  });

  it("refuses a child with no real grade, and cleans the name and province", async () => {
    const { cookie } = await newAccount("odd@example.com");
    const res = await (
      await sync.POST(
        post("/api/sync/", { profiles: [{ ...profile("odd-a"), grade: "zz" }, { ...profile("odd-b"), name: " Ma\u0000ya\r\n ", framework: "nowhere" }] }, cookie),
      )
    ).json();
    expect(res.profiles.map((p: { id: string }) => p.id)).toEqual(["odd-b"]);
    expect(res.profiles[0].name).toBe("Maya");
    expect(res.profiles[0].framework).toBeUndefined();
  });

  it("stores a limited number of child records, deleted ones included", async () => {
    const { cookie } = await newAccount("churn@example.com");
    for (let round = 0; round < 4; round++) {
      const batch = Array.from({ length: 20 }, (_, i) => ({ ...profile(`churn-${round}-${i}`), deleted: true }));
      await sync.POST(post("/api/sync/", { profiles: batch }, cookie));
    }
    const familyId = (await dbm.query<{ family_id: string }>("SELECT family_id FROM parents WHERE email = ?", ["churn@example.com"]))[0].family_id;
    expect(Number((await dbm.query<{ n: number }>("SELECT COUNT(*) AS n FROM profiles WHERE family_id = ?", [familyId]))[0].n)).toBe(50);
  });

  it("skips oversized records instead of storing half a document", async () => {
    const { cookie } = await newAccount("big@example.com");
    const big = { id: "p-big", name: "Big", room: { wall: "x".repeat(5000) }, grade: "1", avatar: "ollie", colour: "#fff", updatedAt: Date.now() };
    const res = await (await sync.POST(post("/api/sync/", { profiles: [big] }, cookie))).json();
    expect(res.profiles).toEqual([]);
  });

  it("refuses cross-site posts", async () => {
    const { cookie } = await newAccount("sync-csrf@example.com");
    const req = post("/api/sync/", { profiles: [profile("csrf-1")] }, cookie);
    req.headers.set("origin", "https://evil.example");
    expect((await sync.POST(req)).status).toBe(403);
  });

  it("keeps a child's practice when the child is renamed, and removes it when they're reset or deleted", async () => {
    const { cookie, body } = await newAccount("history@example.com");
    const familyId = body.family.account.familyId as string;
    const t0 = Date.now() - 60_000;
    const at = (id: string, profileId: string, t: number) => ({ ...event(id, profileId), t });
    const ids = async (profileId: string) => (await dbm.query<{ id: string }>("SELECT id FROM events WHERE family_id = ? AND profile_id = ? ORDER BY id", [familyId, profileId])).map((r) => r.id);
    await sync.POST(post("/api/sync/", { profiles: [{ ...profile("hist"), updatedAt: t0 }], events: [at("h1", "hist", t0 + 1), at("h2", "hist", t0 + 3)] }, cookie));
    await sync.POST(post("/api/sync/", { profiles: [{ ...profile("hist"), name: "Mia", updatedAt: t0 + 10 }] }, cookie));
    expect(await ids("hist")).toEqual(["h1", "h2"]);

    // A reset drops what came before it and keeps what came after.
    await sync.POST(post("/api/sync/", { profiles: [{ ...profile("hist"), resetAt: t0 + 2, updatedAt: t0 + 20 }] }, cookie));
    expect(await ids("hist")).toEqual(["h2"]);

    await dbm.run("INSERT INTO class_members (class_id, profile_id, family_id, joined_at) VALUES ('cls-hist', 'hist', ?, 1)", [familyId]);
    await sync.POST(post("/api/sync/", { profiles: [{ ...profile("hist"), deleted: true, updatedAt: t0 + 30 }] }, cookie));
    expect(await ids("hist")).toEqual([]);
    expect(await dbm.query("SELECT 1 FROM class_members WHERE profile_id = 'hist'")).toHaveLength(0);
  });

  it("never lets one family change another family's child or settings", async () => {
    const a = await newAccount("owner-a@example.com");
    const b = await newAccount("intruder-b@example.com");
    const t = Date.now() - 10_000;
    await sync.POST(post("/api/sync/", { profiles: [{ ...profile("owned"), updatedAt: t }], settings: [{ profileId: "owned", updatedAt: t, dailyGoalMinutes: 15 }] }, a.cookie));
    const res = await (
      await sync.POST(
        post("/api/sync/", { profiles: [{ ...profile("owned"), name: "Hacked", updatedAt: t + 100 }], settings: [{ profileId: "owned", updatedAt: t + 100, dailyGoalMinutes: 99 }], events: [event("intrude", "owned")] }, b.cookie),
      )
    ).json();
    expect(res.profiles).toEqual([]);
    expect(res.settings).toEqual([]);
    expect(res.accepted).toEqual([]);
    const mine = await (await sync.POST(post("/api/sync/", { cursor: 0 }, a.cookie))).json();
    expect(mine.profiles[0].name).toBe("Maya");
    expect(mine.settings[0].dailyGoalMinutes).toBe(15);
    expect(mine.events).toEqual([]);
  });

  it("refuses events from the future, oversized events and settings, and settings for an unknown child", async () => {
    const { cookie } = await newAccount("odd-events@example.com");
    const now = Date.now();
    const res = await (
      await sync.POST(
        post("/api/sync/", {
          profiles: [profile("oe")],
          events: [{ ...event("future", "oe"), t: now + 2 * 86_400_000 }, { ...event("huge", "oe"), note: "x".repeat(2100) }, { ...event("fine", "oe"), t: now + 60_000 }],
          settings: [{ profileId: "oe", updatedAt: now, room: "x".repeat(5000) }, { profileId: "not-mine", updatedAt: now }],
        }, cookie),
      )
    ).json();
    expect(res.accepted).toEqual(["fine"]);
    expect(res.settings).toEqual([]);
  });
});

describe("Stripe webhook", () => {
  const sign = (payload: string, secret = "whsec_test", t = Math.floor(Date.now() / 1000)) => `t=${t},v1=${createHmac("sha256", secret).update(`${t}.${payload}`).digest("hex")}`;
  const hook = (payload: string, header: string | null) =>
    webhook.POST(new Request("http://localhost/api/billing/webhook/", { method: "POST", body: payload, headers: header ? { "stripe-signature": header } : {} }));

  it("rejects missing, wrong and stale signatures", async () => {
    const payload = JSON.stringify({ type: "customer.subscription.updated", data: { object: {} } });
    expect((await hook(payload, null)).status).toBe(400);
    expect((await hook(payload, sign(payload, "whsec_other"))).status).toBe(400);
    expect((await hook(payload, sign(payload, "whsec_test", Math.floor(Date.now() / 1000) - 3600))).status).toBe(400);
  });

  it("accepts a header carrying an old and a new signature while the secret is being rolled", async () => {
    const t = Math.floor(Date.now() / 1000);
    const payload = JSON.stringify({ id: "evt_rolled", created: t, type: "customer.subscription.updated", data: { object: { status: "active", customer: "cus_rolled" } } });
    const old = createHmac("sha256", "whsec_old").update(`${t}.${payload}`).digest("hex");
    expect((await hook(payload, `${sign(payload, "whsec_test", t)},v1=${old}`)).status).toBe(200);
    expect((await hook(payload, `t=${t},v1=${old},v1=short`)).status).toBe(400);
  });

  it("moves a family between premium and free as the subscription changes", async () => {
    const { cookie } = await newAccount("stripe@example.com");
    const familyId = (await dbm.query<{ family_id: string }>("SELECT family_id FROM parents WHERE email = ?", ["stripe@example.com"]))[0].family_id;
    let n = 0;
    const base = Math.floor(Date.now() / 1000) - 1000;
    const send = async (type: string, object: Record<string, unknown>, created = base + ++n, id = `evt_${familyId}_${n}`) => {
      const payload = JSON.stringify({ id, created, type, data: { object } });
      expect((await hook(payload, sign(payload))).status).toBe(200);
    };
    await send("checkout.session.completed", { client_reference_id: familyId, customer: "cus_1", payment_status: "paid", mode: "subscription", subscription: "sub_1" });
    await send("customer.subscription.updated", { status: "active", customer: "cus_1", current_period_end: 2_000_000_000, items: { data: [{ price: { recurring: { interval: "year" } } }] } });
    let info = await (await me.GET(new Request("http://localhost/api/auth/me/", { headers: { cookie } }))).json();
    expect(info.family.plan).toBe("premium");
    expect(info.family.subscription).toMatchObject({ status: "active", interval: "year" });
    await send("customer.subscription.deleted", { status: "canceled", customer: "cus_1" });
    info = await (await me.GET(new Request("http://localhost/api/auth/me/", { headers: { cookie } }))).json();
    expect(info.family.plan).toBe("free");

    // A late, older "active" event must not bring a cancelled family back.
    await send("customer.subscription.updated", { status: "active", customer: "cus_1" }, base + 1, "evt_late");
    info = await (await me.GET(new Request("http://localhost/api/auth/me/", { headers: { cookie } }))).json();
    expect(info.family.plan).toBe("free");

    // Redelivery of an event that was already handled is ignored.
    await send("customer.subscription.updated", { status: "active", customer: "cus_1" }, base + 100, "evt_once");
    await send("customer.subscription.deleted", { status: "canceled", customer: "cus_1" }, base + 101, "evt_cancel");
    await send("customer.subscription.updated", { status: "active", customer: "cus_1" }, base + 102, "evt_once");
    info = await (await me.GET(new Request("http://localhost/api/auth/me/", { headers: { cookie } }))).json();
    expect(info.family.plan).toBe("free");
  });

  it("does not grant premium for a checkout that isn't paid yet", async () => {
    const { cookie } = await newAccount("unpaid@example.com");
    const familyId = (await dbm.query<{ family_id: string }>("SELECT family_id FROM parents WHERE email = ?", ["unpaid@example.com"]))[0].family_id;
    const payload = JSON.stringify({ id: "evt_unpaid", created: Math.floor(Date.now() / 1000), type: "checkout.session.completed", data: { object: { client_reference_id: familyId, customer: "cus_u", payment_status: "unpaid" } } });
    expect((await hook(payload, sign(payload))).status).toBe(200);
    const info = await (await me.GET(new Request("http://localhost/api/auth/me/", { headers: { cookie } }))).json();
    expect(info.family.plan).toBe("trial");
  });

  it("keeps the reason a parent picked when cancelling, without their comment", async () => {
    const { cookie } = await newAccount("leaving@example.com");
    const familyId = (await dbm.query<{ family_id: string }>("SELECT family_id FROM parents WHERE email = ?", ["leaving@example.com"]))[0].family_id;
    const payload = JSON.stringify({
      id: "evt_leaving",
      created: Math.floor(Date.now() / 1000),
      type: "customer.subscription.updated",
      data: { object: { id: "sub_leaving", status: "active", customer: "cus_leaving", metadata: { family_id: familyId }, cancel_at_period_end: true, cancellation_details: { reason: "cancellation_requested", feedback: "too_expensive", comment: "Ava loved it but money is tight" } } },
    });
    expect((await hook(payload, sign(payload))).status).toBe(200);
    const rows = await dbm.query<Record<string, unknown>>("SELECT * FROM cancellations WHERE subscription_id = ?", ["sub_leaving"]);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ family_id: familyId, reason: "too_expensive" });
    expect(JSON.stringify(rows[0])).not.toContain("Ava");
    expect(cookie).toBeTruthy();
  });

  it("grants premium for a subscription checkout once it is paid, or when a code makes it free, and never before", async () => {
    const checkout = async (address: string, payment_status: string) => {
      const { cookie } = await newAccount(address);
      const familyId = (await dbm.query<{ family_id: string }>("SELECT family_id FROM parents WHERE email = ?", [address]))[0].family_id;
      const object = { client_reference_id: familyId, customer: `cus_${payment_status}`, payment_status, mode: "subscription", subscription: `sub_${payment_status}` };
      const payload = JSON.stringify({ id: `evt_${address}`, created: Math.floor(Date.now() / 1000), type: "checkout.session.completed", data: { object } });
      expect((await hook(payload, sign(payload))).status).toBe(200);
      return (await (await me.GET(new Request("http://localhost/api/auth/me/", { headers: { cookie } }))).json()).family.plan;
    };
    expect(await checkout("sub-unpaid@example.com", "unpaid")).toBe("trial");
    expect(await checkout("sub-free@example.com", "no_payment_required")).toBe("premium");
    expect(await checkout("sub-paid@example.com", "paid")).toBe("premium");
  });

  it("reads the renewal date from the subscription item on newer Stripe API versions", async () => {
    const { cookie } = await newAccount("item-period@example.com");
    const familyId = (await dbm.query<{ family_id: string }>("SELECT family_id FROM parents WHERE email = ?", ["item-period@example.com"]))[0].family_id;
    const object = { status: "active", customer: "cus_item", metadata: { family_id: familyId }, items: { data: [{ current_period_end: 2_000_000_000, price: { recurring: { interval: "month" } } }] } };
    const payload = JSON.stringify({ id: "evt_item_period", created: Math.floor(Date.now() / 1000), type: "customer.subscription.updated", data: { object } });
    expect((await hook(payload, sign(payload))).status).toBe(200);
    const row = (await dbm.query<{ current_period_end: number; subscription_interval: string }>("SELECT current_period_end, subscription_interval FROM families WHERE id = ?", [familyId]))[0];
    expect(Number(row.current_period_end)).toBe(2_000_000_000_000);
    expect(row.subscription_interval).toBe("month");
    expect(cookie).toBeTruthy();
  });

  it("tells the parent when a cancelled subscription or trial stops, and forgets it when they undo it", async () => {
    const { cookie } = await newAccount("cancel-later@example.com");
    const familyId = (await dbm.query<{ family_id: string }>("SELECT family_id FROM parents WHERE email = ?", ["cancel-later@example.com"]))[0].family_id;
    const created = Math.floor(Date.now() / 1000);
    const send = async (id: string, object: Record<string, unknown>, at: number) => {
      const payload = JSON.stringify({ id, created: at, type: "customer.subscription.updated", data: { object: { customer: "cus_cancel", metadata: { family_id: familyId }, ...object } } });
      expect((await hook(payload, sign(payload))).status).toBe(200);
      return (await (await me.GET(new Request("http://localhost/api/auth/me/", { headers: { cookie } }))).json()).family;
    };
    // Cancelled during the free trial: it still runs to its end, then stops.
    let family = await send("evt_cancel_1", { status: "trialing", cancel_at_period_end: true, current_period_end: 2_000_000_000 }, created);
    expect(family.plan).toBe("premium");
    expect(family.subscription).toMatchObject({ status: "trialing", currentPeriodEnd: 2_000_000_000_000, cancelAt: 2_000_000_000_000 });
    expect(Number((await dbm.query<{ cancelled_at: number }>("SELECT cancelled_at FROM families WHERE id = ?", [familyId]))[0].cancelled_at)).toBe(created * 1000);
    // Newer Stripe API versions say when with cancel_at instead.
    family = await send("evt_cancel_2", { status: "active", cancel_at: 2_000_100_000, cancel_at_period_end: false, current_period_end: 2_000_000_000 }, created + 1);
    expect(family.subscription.cancelAt).toBe(2_000_100_000_000);
    // "Don't cancel" in the portal.
    family = await send("evt_cancel_3", { status: "active", cancel_at: null, cancel_at_period_end: false, current_period_end: 2_000_000_000 }, created + 2);
    expect(family.subscription.cancelAt).toBeUndefined();
    expect((await dbm.query<{ cancelled_at: number | null }>("SELECT cancelled_at FROM families WHERE id = ?", [familyId]))[0].cancelled_at).toBeNull();
  });

  it("does not grant premium for a paid checkout that isn't a subscription", async () => {
    // A Payment Link on the same Stripe account lets the buyer set client_reference_id themselves.
    const { cookie } = await newAccount("oneoff@example.com");
    const familyId = (await dbm.query<{ family_id: string }>("SELECT family_id FROM parents WHERE email = ?", ["oneoff@example.com"]))[0].family_id;
    const payload = JSON.stringify({ id: "evt_oneoff", created: Math.floor(Date.now() / 1000), type: "checkout.session.completed", data: { object: { client_reference_id: familyId, customer: "cus_o", payment_status: "paid", mode: "payment" } } });
    expect((await hook(payload, sign(payload))).status).toBe(200);
    const info = await (await me.GET(new Request("http://localhost/api/auth/me/", { headers: { cookie } }))).json();
    expect(info.family.plan).toBe("trial");
  });
});

describe("signup race", () => {
  it("answers a duplicate email with 409 and leaves no empty family", async () => {
    const before = (await dbm.query<{ n: number }>("SELECT COUNT(*) AS n FROM families"))[0].n;
    const results = await Promise.all([1, 2, 3].map(() => signup.POST(post("/api/auth/signup/", { email: "race@example.com", password: "correct horse" }))));
    expect(results.map((r) => r.status).sort()).toEqual([200, 409, 409]);
    expect((await dbm.query<{ n: number }>("SELECT COUNT(*) AS n FROM families"))[0].n).toBe(Number(before) + 1);
  });
});

describe("subscriptions", () => {
  const stripeEnv = { STRIPE_SECRET_KEY: "sk_test", STRIPE_PRICE_MONTHLY: "price_m", STRIPE_PRICE_YEARLY: "price_y" };
  async function subscribed(address: string) {
    const { cookie } = await newAccount(address);
    await dbm.run("UPDATE parents SET email_verified_at = 1 WHERE email = ?", [address]);
    await dbm.run("UPDATE families SET stripe_customer = 'cus_x', subscription_status = 'active', plan = 'premium' WHERE id = (SELECT family_id FROM parents WHERE email = ?)", [address]);
    return cookie;
  }

  it("refuses a second checkout while a subscription is live", async () => {
    Object.assign(process.env, stripeEnv);
    try {
      const cookie = await subscribed("double@example.com");
      expect((await checkout.POST(post("/api/billing/checkout/", { interval: "month" }, cookie))).status).toBe(409);
    } finally {
      for (const k of Object.keys(stripeEnv)) delete process.env[k];
    }
  });

  it("cancels the Stripe subscription before deleting the account, and keeps the account if Stripe fails", async () => {
    Object.assign(process.env, stripeEnv);
    try {
      const cookie = await subscribed("cancel@example.com");
      const calls: string[] = [];
      let fail = true;
      vi.stubGlobal("fetch", async (url: string, init?: RequestInit) => {
        calls.push(`${init?.method ?? "GET"} ${url}`);
        if (fail) return new Response(JSON.stringify({ error: { message: "down" } }), { status: 500 });
        return new Response(JSON.stringify(init?.method === "DELETE" ? {} : { data: [{ id: "sub_1", status: "active" }, { id: "sub_0", status: "canceled" }] }));
      });
      expect((await account.DELETE(post("/api/account/", { password: "correct horse" }, cookie, "DELETE"))).status).toBe(502);
      expect(await dbm.query("SELECT 1 FROM parents WHERE email = 'cancel@example.com'")).toHaveLength(1);
      fail = false;
      calls.length = 0;
      expect((await account.DELETE(post("/api/account/", { password: "correct horse" }, cookie, "DELETE"))).status).toBe(200);
      expect(calls.some((c) => c.startsWith("DELETE") && c.endsWith("/subscriptions/sub_1"))).toBe(true);
      expect(calls.some((c) => c.endsWith("sub_0"))).toBe(false);
      expect(await dbm.query("SELECT 1 FROM parents WHERE email = 'cancel@example.com'")).toHaveLength(0);
    } finally {
      vi.unstubAllGlobals();
      for (const k of Object.keys(stripeEnv)) delete process.env[k];
    }
  });

  it("cancels every Stripe subscription when price ids are not configured", async () => {
    process.env.STRIPE_SECRET_KEY = "sk_test";
    delete process.env.STRIPE_PRICE_MONTHLY;
    delete process.env.STRIPE_PRICE_YEARLY;
    try {
      const cookie = await subscribed("cancel-many@example.com");
      const calls: string[] = [];
      vi.stubGlobal("fetch", async (url: string, init?: RequestInit) => {
        calls.push(`${init?.method ?? "GET"} ${url}`);
        if (init?.method === "DELETE") return new Response(JSON.stringify({ id: url.split("/").pop(), status: "canceled" }));
        if (url.includes("starting_after=sub_1")) {
          return new Response(JSON.stringify({ data: [{ id: "sub_2", status: "active" }], has_more: false }));
        }
        return new Response(JSON.stringify({ data: [{ id: "sub_1", status: "active" }], has_more: true }));
      });

      const response = await account.DELETE(post("/api/account/", { password: "correct horse" }, cookie, "DELETE"));
      expect(response.status).toBe(200);
      expect(calls.filter((call) => call.startsWith("GET"))).toHaveLength(2);
      expect(calls.some((call) => call.includes("starting_after=sub_1"))).toBe(true);
      expect(calls.filter((call) => call.startsWith("DELETE"))).toHaveLength(2);
    } finally {
      vi.unstubAllGlobals();
      delete process.env.STRIPE_SECRET_KEY;
    }
  });
});

describe("sessions", () => {
  it("signs out a session once it has expired", async () => {
    const { cookie } = await newAccount("expired@example.com");
    const meNow = () => me.GET(new Request("http://localhost/api/auth/me/", { headers: { cookie } }));
    expect((await (await meNow()).json()).family.account.email).toBe("expired@example.com");
    const parent = (await dbm.query<{ id: string }>("SELECT id FROM parents WHERE email = ?", ["expired@example.com"]))[0];
    await dbm.run("UPDATE sessions SET expires_at = ? WHERE parent_id = ?", [Date.now() - 1000, parent.id]);
    expect((await meNow()).status).toBe(401);
    expect((await sync.POST(post("/api/sync/", {}, cookie))).status).toBe(401);
  });

  it("marks the session cookie Secure in production only", () => {
    expect(auth.sessionCookie("tok", 60)).not.toContain("Secure");
    vi.stubEnv("NODE_ENV", "production");
    try {
      expect(auth.sessionCookie("tok", 60)).toMatch(/; HttpOnly; SameSite=Lax; Max-Age=60; Secure$/);
      expect(auth.clearCookie()).toMatch(/Max-Age=0; Secure$/);
    } finally {
      vi.unstubAllEnvs();
    }
  });
});

describe("account security", () => {
  it("asks for the password before deleting an account", async () => {
    const { cookie } = await newAccount("careful@example.com");
    expect((await account.DELETE(post("/api/account/", undefined, cookie, "DELETE"))).status).toBe(403);
    expect((await account.DELETE(post("/api/account/", { password: "wrong wrong" }, cookie, "DELETE"))).status).toBe(403);
    expect(await dbm.query("SELECT 1 FROM parents WHERE email = 'careful@example.com'")).toHaveLength(1);
  });

  it("changes the password, signs out other devices and lists and revokes devices", async () => {
    const { cookie } = await newAccount("devices@example.com");
    const second = cookieOf(await login.POST(post("/api/auth/login/", { email: "devices@example.com", password: "correct horse" })));
    const list = async (c: string) => (await sessions.GET(post("/api/auth/sessions/", undefined, c, "GET")));
    const { sessions: all } = await (await list(cookie)).json();
    expect(all).toHaveLength(2);
    expect(all.filter((s: { current: boolean }) => s.current)).toHaveLength(1);

    // Wrong current password is refused; the right one changes it and signs the other device out.
    expect((await password.POST(post("/api/auth/password/", { current: "nope nope", password: "brand new pass" }, cookie))).status).toBe(403);
    expect((await password.POST(post("/api/auth/password/", { current: "correct horse", password: "brand new pass" }, cookie))).status).toBe(200);
    expect((await list(second)).status).toBe(401);
    expect((await list(cookie)).status).toBe(200);
    expect((await login.POST(post("/api/auth/login/", { email: "devices@example.com", password: "brand new pass" }))).status).toBe(200);

    // "Sign out everywhere else" keeps the current device.
    expect((await sessions.DELETE(post("/api/auth/sessions/", undefined, cookie, "DELETE"))).status).toBe(200);
    const { sessions: after } = await (await list(cookie)).json();
    expect(after).toHaveLength(1);
  });

  it("emails a heads-up on sign-in for confirmed accounts", async () => {
    await newAccount("alert@example.com");
    await dbm.run("UPDATE parents SET email_verified_at = ? WHERE email = ?", [Date.now(), "alert@example.com"]);
    await login.POST(post("/api/auth/login/", { email: "alert@example.com", password: "correct horse" }));
    expect(lastEmail().subject).toMatch(/New sign-in/);
  });
});

describe("account deletion", () => {
  it("removes every row that belongs to the family", async () => {
    const { cookie } = await newAccount("gone@example.com");
    await sync.POST(post("/api/sync/", { profiles: [{ id: "pg", name: "Kid", grade: "1", avatar: "ollie", colour: "#fff", updatedAt: Date.now() }], events: [{ id: "eg", profileId: "pg", type: "answer", t: Date.now() - 1000 }], settings: [{ profileId: "pg", updatedAt: Date.now() }] }, cookie));
    const parent = (await dbm.query<{ id: string; family_id: string }>("SELECT id, family_id FROM parents WHERE email = ?", ["gone@example.com"]))[0];
    await dbm.run("INSERT INTO report_shares (token_hash, family_id, profile_id, days, created_at, expires_at) VALUES ('h', ?, 'pg', 7, 1, 2)", [parent.family_id]);
    await dbm.run("INSERT INTO class_members (class_id, profile_id, family_id, joined_at) VALUES ('someone-elses-class', 'pg', ?, 1)", [parent.family_id]);
    await dbm.run("INSERT INTO question_reports (id, family_id, unit_key, prompt, reason, created_at) VALUES ('qr-gone', ?, '1/math/x', 'Q', 'wrong', 1)", [parent.family_id]);
    await dbm.run("INSERT INTO experiment_assignments (experiment, family_id, variant, assigned_at) VALUES ('exp-gone', ?, 'a', 1)", [parent.family_id]);
    await dbm.run("INSERT INTO cancellations (subscription_id, family_id, reason, at) VALUES ('sub-gone', ?, 'too_expensive', 1)", [parent.family_id]);

    const res = await account.DELETE(post("/api/account/", { password: "correct horse" }, cookie, "DELETE"));
    expect(res.status).toBe(200);
    for (const [table, col, val] of [
      ["parents", "family_id", parent.family_id],
      ["families", "id", parent.family_id],
      ["profiles", "family_id", parent.family_id],
      ["events", "family_id", parent.family_id],
      ["child_settings", "family_id", parent.family_id],
      ["sessions", "family_id", parent.family_id],
      ["report_shares", "family_id", parent.family_id],
      ["auth_tokens", "parent_id", parent.id],
      ["class_members", "family_id", parent.family_id],
      ["question_reports", "family_id", parent.family_id],
      ["experiment_assignments", "family_id", parent.family_id],
      ["cancellations", "family_id", parent.family_id],
    ]) {
      expect(await dbm.query(`SELECT 1 FROM ${table} WHERE ${col} = ?`, [val]), table).toHaveLength(0);
    }
    // The cancellation reason stays in the totals without pointing at anyone.
    expect(await dbm.query("SELECT family_id FROM cancellations WHERE subscription_id = 'sub-gone'")).toEqual([{ family_id: null }]);
  });
});
