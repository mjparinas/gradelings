import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// These tests run the real route handlers against a throwaway SQLite file.

const dir = mkdtempSync(join(tmpdir(), "gradelings-adults-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
delete process.env.RESEND_API_KEY;
delete process.env.NEXT_PUBLIC_SITE_URL;
process.env.ADMIN_EMAILS = "boss-adults@example.com";

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, adults: Mod, accept: Mod, me: Mod, checkout: Mod, redeem: Mod, account: Mod, login: Mod;
let dbm: typeof import("@/server/db");
let email: typeof import("@/server/email");

beforeAll(async () => {
  [signup, adults, accept, me, checkout, redeem, account, login] = (await Promise.all([
    import("@/server/testing/signupWithSession"),
    import("@/app/api/account/adults/route"),
    import("@/app/api/account/adults/accept/route"),
    import("@/app/api/auth/me/route"),
    import("@/app/api/billing/checkout/route"),
    import("@/app/api/codes/redeem/route"),
    import("@/app/api/account/route"),
    import("@/app/api/auth/login/route"),
  ])) as unknown as Mod[];
  dbm = await import("@/server/db");
  email = await import("@/server/email");
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let ip = 0;
const req = (path: string, method: string, body?: unknown, cookie = "") =>
  new Request(`http://localhost${path}`, {
    method,
    headers: { "content-type": "application/json", "x-forwarded-for": `10.2.0.${++ip}`, ...(cookie ? { cookie } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
const cookieOf = (res: Response) => (res.headers.get("set-cookie") ?? "").split(";")[0];
const lastInviteToken = () => {
  const mail = [...email.outbox()].reverse().find((m) => m.kind === "family-invite")!;
  return decodeURIComponent(/token=([^\s&"]+)/.exec(mail.text)![1]);
};

/** A confirmed owner with a session cookie. */
async function owner(address: string): Promise<string> {
  const res = await signup.POST(req("/api/auth/signup/", "POST", { email: address, password: "correct horse" }));
  expect(res.status).toBe(200);
  await dbm.run("UPDATE parents SET email_verified_at = ? WHERE email = ?", [Date.now(), address]);
  return cookieOf(res);
}
async function joinAs(ownerCookie: string, address: string): Promise<string> {
  expect((await adults.POST(req("/api/account/adults/", "POST", { email: address }, ownerCookie))).status).toBe(200);
  const res = await accept.POST(req("/api/account/adults/accept/", "POST", { token: lastInviteToken(), password: "second adult pw" }));
  expect(res.status).toBe(200);
  return cookieOf(res);
}
const list = async (cookie: string) => (await adults.GET(req("/api/account/adults/", "GET", undefined, cookie))).json();

describe("second adult", () => {
  it("is invited by email, joins the same family and signs in", async () => {
    const o = await owner("owner-a@example.com");
    const a = await joinAs(o, "adult-a@example.com");
    const mine = await (await me.GET(req("/api/auth/me/", "GET", undefined, o))).json();
    const theirs = await (await me.GET(req("/api/auth/me/", "GET", undefined, a))).json();
    expect(theirs.family.account.familyId).toBe(mine.family.account.familyId);
    expect(theirs.family.account.adult).toBe(true);
    expect(theirs.family.account.verified).toBe(true);
    expect(mine.family.account.adult).toBeUndefined();
    // They can sign in again with the password they chose, and the flag follows.
    const again = await login.POST(req("/api/auth/login/", "POST", { email: "adult-a@example.com", password: "second adult pw" }));
    expect((await again.json()).family.account.adult).toBe(true);
    const view = await list(o);
    expect(view.adults.map((x: { email: string }) => x.email)).toEqual(["adult-a@example.com"]);
    expect(view.invites).toEqual([]);
  });

  it("keeps billing, codes and inviting with the owner", async () => {
    const o = await owner("owner-b@example.com");
    const a = await joinAs(o, "adult-b@example.com");
    expect((await checkout.POST(req("/api/billing/checkout/", "POST", { interval: "month" }, a))).status).toBe(403);
    expect((await redeem.POST(req("/api/codes/redeem/", "POST", { code: "X" }, a))).status).toBe(403);
    expect((await adults.POST(req("/api/account/adults/", "POST", { email: "third@example.com" }, a))).status).toBe(403);
    expect(await list(a)).toEqual({ owner: false, adults: [], invites: [] });
  });

  it("needs a confirmed owner, a new address and a password", async () => {
    const res = await signup.POST(req("/api/auth/signup/", "POST", { email: "owner-c@example.com", password: "correct horse" }));
    expect((await adults.POST(req("/api/account/adults/", "POST", { email: "x@example.com" }, cookieOf(res)))).status).toBe(403);
    const o = await owner("owner-d@example.com");
    expect((await adults.POST(req("/api/account/adults/", "POST", { email: "owner-d@example.com" }, o))).status).toBe(400);
    expect((await adults.POST(req("/api/account/adults/", "POST", { email: "nope" }, o))).status).toBe(400);
    await adults.POST(req("/api/account/adults/", "POST", { email: "adult-d@example.com" }, o));
    const token = lastInviteToken();
    expect((await accept.POST(req("/api/account/adults/accept/", "POST", { token, password: "short" }))).status).toBe(400);
    expect((await accept.POST(req("/api/account/adults/accept/", "POST", { token: "wrong", password: "long enough pw" }))).status).toBe(400);
    // The link works once.
    expect((await accept.POST(req("/api/account/adults/accept/", "POST", { token, password: "long enough pw" }))).status).toBe(200);
    expect((await accept.POST(req("/api/account/adults/accept/", "POST", { token, password: "long enough pw" }))).status).toBe(400);
  });

  it("refuses an address that already has an account, and expired links", async () => {
    const o = await owner("owner-e@example.com");
    await owner("existing-e@example.com");
    await adults.POST(req("/api/account/adults/", "POST", { email: "existing-e@example.com" }, o));
    const res = await accept.POST(req("/api/account/adults/accept/", "POST", { token: lastInviteToken(), password: "long enough pw" }));
    expect(res.status).toBe(409);
    await adults.POST(req("/api/account/adults/", "POST", { email: "late-e@example.com" }, o));
    await dbm.run("UPDATE family_invites SET expires_at = ? WHERE email = ?", [Date.now() - 1000, "late-e@example.com"]);
    expect((await accept.GET(req(`/api/account/adults/accept/?token=${encodeURIComponent(lastInviteToken())}`, "GET"))).status).toBe(404);
  });

  it("limits how many adults a family has, and lets the owner cancel or remove", async () => {
    const o = await owner("owner-f@example.com");
    await joinAs(o, "f1@example.com");
    await joinAs(o, "f2@example.com");
    expect((await adults.POST(req("/api/account/adults/", "POST", { email: "f3@example.com" }, o))).status).toBe(409);
    const first = (await list(o)).adults[0].id as string;
    const removed = await (await adults.DELETE(req(`/api/account/adults/?id=${encodeURIComponent(first)}`, "DELETE", undefined, o))).json();
    expect(removed.adults).toHaveLength(1);
    await adults.POST(req("/api/account/adults/", "POST", { email: "f4@example.com" }, o));
    const cancelled = await (await adults.DELETE(req("/api/account/adults/?email=f4%40example.com", "DELETE", undefined, o))).json();
    expect(cancelled.invites).toEqual([]);
  });

  it("lets an adult leave, and the owner can't", async () => {
    const o = await owner("owner-g@example.com");
    const a = await joinAs(o, "adult-g@example.com");
    expect((await me.GET(req("/api/auth/me/", "GET", undefined, a))).status).toBe(200);
    expect((await adults.DELETE(req("/api/account/adults/?id=me", "DELETE", undefined, a))).status).toBe(200);
    expect((await me.GET(req("/api/auth/me/", "GET", undefined, a))).status).toBe(401);
    expect((await me.GET(req("/api/auth/me/", "GET", undefined, o))).status).toBe(200);
    expect(await dbm.query("SELECT id FROM parents WHERE email = ?", ["adult-g@example.com"])).toHaveLength(0);
    expect((await adults.DELETE(req("/api/account/adults/?id=me", "DELETE", undefined, o))).status).toBe(400);
  });

  it("deleting an adult's account leaves the family; the owner deleting removes everyone", async () => {
    const o = await owner("owner-h@example.com");
    const a = await joinAs(o, "adult-h@example.com");
    expect((await account.DELETE(req("/api/account/", "DELETE", { password: "nope nope nope" }, a))).status).toBe(403);
    expect((await account.DELETE(req("/api/account/", "DELETE", { password: "second adult pw" }, a))).status).toBe(200);
    expect(await dbm.query("SELECT id FROM parents WHERE email = ?", ["owner-h@example.com"])).toHaveLength(1);
    const b = await joinAs(o, "adult-h2@example.com");
    expect((await account.DELETE(req("/api/account/", "DELETE", { password: "correct horse" }, o))).status).toBe(200);
    expect(await dbm.query("SELECT id FROM parents WHERE email IN (?, ?)", ["owner-h@example.com", "adult-h2@example.com"])).toHaveLength(0);
    expect((await me.GET(req("/api/auth/me/", "GET", undefined, b))).status).toBe(401);
  });
});
