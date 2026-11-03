import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";

const dir = mkdtempSync(join(tmpdir(), "grademap-auth-rules-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;

let dbm: typeof import("@/server/db");
let auth: typeof import("@/server/auth");

beforeAll(async () => {
  dbm = await import("@/server/db");
  auth = await import("@/server/auth");
  await dbm.db();
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));
afterEach(() => {
  vi.restoreAllMocks();
  vi.unstubAllEnvs();
});

let n = 0;
async function account(opts: { role?: string; hash?: string } = {}) {
  const familyId = `fam_auth_${++n}`;
  const parentId = `par_auth_${n}`;
  await dbm.run("INSERT INTO families (id, plan, created_at, updated_at, trial_ends_at) VALUES (?, 'trial', 1, 1, 1)", [familyId]);
  await dbm.run("INSERT INTO parents (id, family_id, email, password_hash, created_at, role) VALUES (?, ?, ?, ?, 1, ?)", [parentId, familyId, `a${n}@example.com`, opts.hash ?? "!", opts.role ?? "parent"]);
  return { familyId, parentId };
}
const withCookie = (token: string, extra: Record<string, string> = {}, cookieName = "gm_session") =>
  new Request("http://localhost/x", { headers: { cookie: `${cookieName}=${encodeURIComponent(token)}`, ...extra } });
const count = async (sql: string, args: (string | number)[] = []) => Number((await dbm.query<{ n: number }>(sql, args))[0].n);

describe("passwords", () => {
  it("verifies only well-formed scrypt hashes", async () => {
    const hash = await auth.hashPassword("correct horse");
    expect(hash).toMatch(/^scrypt\$[0-9a-f]{32}\$[0-9a-f]{128}$/);
    expect(await auth.verifyPassword("correct horse", hash)).toBe(true);
    expect(await auth.verifyPassword("wrong", hash)).toBe(false);
    const [, salt, key] = hash.split("$");
    expect(await auth.verifyPassword("correct horse", `bcrypt$${salt}$${key}`)).toBe(false);
    expect(await auth.verifyPassword("correct horse", `scrypt$$${key}`)).toBe(false);
    expect(await auth.verifyPassword("correct horse", `scrypt$${salt}$`)).toBe(false);
    expect(await auth.verifyPassword("correct horse", `scrypt$${salt}`)).toBe(false);
    expect(await auth.verifyPassword("correct horse", "!")).toBe(false);
    // a truncated key is the wrong length, so it never matches
    expect(await auth.verifyPassword("correct horse", `scrypt$${salt}$${key.slice(0, 64)}`)).toBe(false);
  });

  it("knows which accounts have a password", async () => {
    const withPw = await account({ hash: await auth.hashPassword("pw pw pw pw") });
    const without = await account({ hash: "!" });
    expect(await auth.hasPassword(withPw.parentId)).toBe(true);
    expect(await auth.hasPassword(without.parentId)).toBe(false);
    expect(await auth.hasPassword("nobody")).toBe(false);
  });

  it("burns a check without throwing", async () => {
    await expect(auth.burnPasswordCheck("anything")).resolves.toBeUndefined();
  });

  it("compares secrets without caring about length", () => {
    expect(auth.secretsMatch("abc", "abc")).toBe(true);
    expect(auth.secretsMatch("abc", "abd")).toBe(false);
    expect(auth.secretsMatch("abc", "abcd")).toBe(false);
  });
});

describe("sessions", () => {
  it("creates a session that getSession reads, then endSession removes it", async () => {
    const { parentId, familyId } = await account();
    const { token, maxAge } = await auth.createSession(parentId, familyId, new Request("http://localhost/", { headers: { "user-agent": "U".repeat(300) } }), { mfa: true });
    expect(maxAge).toBe(90 * 86_400);
    const stored = (await dbm.query<{ user_agent: string; mfa_at: number | null; expires_at: number }>("SELECT user_agent, mfa_at, expires_at FROM sessions WHERE parent_id = ?", [parentId]))[0];
    expect(stored.user_agent).toHaveLength(200);
    expect(stored.mfa_at).not.toBeNull();
    expect(Number(stored.expires_at) - Date.now()).toBeGreaterThan(89 * 86_400_000);
    expect(Number((await dbm.query<{ t: number }>("SELECT last_login_at AS t FROM parents WHERE id = ?", [parentId]))[0].t)).toBeGreaterThan(0);

    const info = await auth.getSession(withCookie(token));
    expect(info).toMatchObject({ parentId, familyId, verified: false, student: false, twoFactor: false, verifiedAt: null });
    expect(info!.mfaAt).not.toBeNull();
    await auth.endSession(withCookie(token));
    expect(await auth.getSession(withCookie(token))).toBeNull();
    // ending with no cookie, or an unknown one, harms nothing
    await auth.endSession(new Request("http://localhost/"));
    await auth.endSession(withCookie("unknown"));
  });

  it("records no mfa time and an empty device when none is given", async () => {
    const { parentId, familyId } = await account();
    await auth.createSession(parentId, familyId);
    const row = (await dbm.query<{ user_agent: string; mfa_at: number | null }>("SELECT user_agent, mfa_at FROM sessions WHERE parent_id = ?", [parentId]))[0];
    expect(row).toEqual({ user_agent: "", mfa_at: null });
  });

  it("ignores an expired session, and reports the email's verified time", async () => {
    const { parentId, familyId } = await account();
    const { token } = await auth.createSession(parentId, familyId);
    await dbm.run("UPDATE parents SET email_verified_at = 555 WHERE id = ?", [parentId]);
    expect(await auth.getSession(withCookie(token))).toMatchObject({ verified: true, verifiedAt: 555 });
    await dbm.run("UPDATE sessions SET expires_at = ? WHERE parent_id = ?", [Date.now() - 1, parentId]);
    expect(await auth.getSession(withCookie(token))).toBeNull();
    // exactly now is still valid
    vi.spyOn(Date, "now").mockReturnValue(5_000);
    await dbm.run("UPDATE sessions SET expires_at = 5000 WHERE parent_id = ?", [parentId]);
    expect(await auth.getSession(withCookie(token))).not.toBeNull();
  });

  it("shows student sessions only to routes that ask for them", async () => {
    const { parentId, familyId } = await account({ role: "student" });
    const { token } = await auth.createSession(parentId, familyId);
    expect(await auth.getSession(withCookie(token))).toBeNull();
    expect(await auth.getSession(withCookie(token), {})).toBeNull();
    expect(await auth.getSession(withCookie(token), { student: true })).toMatchObject({ student: true });
  });

  it("marks accounts with two-step sign-in", async () => {
    const { parentId, familyId } = await account();
    const { token } = await auth.createSession(parentId, familyId);
    await dbm.run("UPDATE parents SET totp_enabled_at = 9 WHERE id = ?", [parentId]);
    expect((await auth.getSession(withCookie(token)))!.twoFactor).toBe(true);
  });

  it("keeps a class active when its owner, co-teacher or linked family signs in", async () => {
    const owner = await account();
    const co = await account();
    const linked = await account();
    const mk = async (id: string, ownerId: string) => dbm.run("INSERT INTO classes (id, owner_parent_id, name, grade, join_code, created_at, last_activity_at, inactive_warning_at) VALUES (?, ?, 'C', '4', ?, 1, 1, 5)", [id, ownerId, id]);
    await mk("c_owner", owner.parentId);
    await mk("c_co", "someone");
    await mk("c_linked", "someone");
    await mk("c_other", "someone");
    await mk("c_closed", owner.parentId);
    await dbm.run("UPDATE classes SET closed_at = 3 WHERE id = 'c_closed'");
    await dbm.run("INSERT INTO class_teachers (class_id, parent_id, joined_at) VALUES ('c_co', ?, 1)", [co.parentId]);
    await dbm.run("INSERT INTO class_members (class_id, profile_id, family_id, joined_at) VALUES ('c_linked', 'pp', ?, 1)", [linked.familyId]);
    await auth.createSession(owner.parentId, owner.familyId);
    await auth.createSession(co.parentId, co.familyId);
    await auth.createSession(linked.parentId, linked.familyId);
    const state = async (id: string) => (await dbm.query<{ last_activity_at: number; inactive_warning_at: number | null }>("SELECT last_activity_at, inactive_warning_at FROM classes WHERE id = ?", [id]))[0];
    for (const id of ["c_owner", "c_co", "c_linked"]) {
      const s = await state(id);
      expect(Number(s.last_activity_at)).toBeGreaterThan(1000);
      expect(s.inactive_warning_at).toBeNull();
    }
    expect(await state("c_other")).toEqual({ last_activity_at: 1, inactive_warning_at: 5 });
    expect(await state("c_closed")).toEqual({ last_activity_at: 1, inactive_warning_at: 5 });
  });

  it("sometimes tidies expired sessions and old limit counters, and otherwise leaves them", async () => {
    const { parentId, familyId } = await account();
    await dbm.run("INSERT INTO sessions (token_hash, parent_id, family_id, expires_at, created_at) VALUES ('old1', 'x', 'y', 1, 1)");
    await dbm.run("INSERT INTO rate_limits (key, count, reset_at) VALUES ('oldkey', 1, 1)");
    vi.spyOn(Math, "random").mockReturnValue(0.5);
    await auth.createSession(parentId, familyId);
    expect(await count("SELECT COUNT(*) AS n FROM sessions WHERE token_hash = 'old1'")).toBe(1);
    expect(await count("SELECT COUNT(*) AS n FROM rate_limits WHERE key = 'oldkey'")).toBe(1);
    vi.spyOn(Math, "random").mockReturnValue(0.049);
    await auth.createSession(parentId, familyId);
    expect(await count("SELECT COUNT(*) AS n FROM sessions WHERE token_hash = 'old1'")).toBe(0);
    expect(await count("SELECT COUNT(*) AS n FROM rate_limits WHERE key = 'oldkey'")).toBe(0);
    vi.spyOn(Math, "random").mockReturnValue(0.05);
    await dbm.run("INSERT INTO sessions (token_hash, parent_id, family_id, expires_at, created_at) VALUES ('old2', 'x', 'y', 1, 1)");
    await auth.createSession(parentId, familyId);
    expect(await count("SELECT COUNT(*) AS n FROM sessions WHERE token_hash = 'old2'")).toBe(1);
  });

  it("lists sessions newest first, marks this one, and labels the device", async () => {
    const { parentId, familyId } = await account();
    const chrome = "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 Chrome/120 Safari/537.36";
    const a = await auth.createSession(parentId, familyId, new Request("http://localhost/", { headers: { "user-agent": chrome } }));
    await dbm.run("UPDATE sessions SET created_at = created_at - 1000 WHERE parent_id = ?", [parentId]);
    const b = await auth.createSession(parentId, familyId, new Request("http://localhost/", { headers: { "user-agent": "Mozilla/5.0 (iPhone) Safari/604" } }));
    await dbm.run("INSERT INTO sessions (token_hash, parent_id, family_id, expires_at, created_at) VALUES ('expired-session-aaaa', ?, ?, 1, 1)", [parentId, familyId]);
    await dbm.run("INSERT INTO sessions (token_hash, parent_id, family_id, expires_at, created_at, user_agent) VALUES ('nullua-session-bbbb', ?, ?, ?, 0, NULL)", [parentId, familyId, Date.now() + 99999]);
    const list = await auth.listSessions(withCookie(a.token), parentId);
    expect(list.map((s) => s.device)).toEqual(["Safari on iPhone/iPad", "Chrome on Windows", "Unknown device"]);
    expect(list.map((s) => s.current)).toEqual([false, true, false]);
    expect(list.every((s) => s.id.length === 16)).toBe(true);
    expect(list.some((s) => s.id === "expired-session-")).toBe(false);
    // nobody is "current" without a cookie
    expect((await auth.listSessions(new Request("http://localhost/"), parentId)).some((s) => s.current)).toBe(false);
    expect(b.token).not.toBe(a.token);
  });

  it("labels devices", () => {
    expect(auth.deviceLabel("Mozilla/5.0 (Macintosh; Intel Mac OS X) Chrome/1 Safari/1")).toBe("Chrome on Mac");
    expect(auth.deviceLabel("Mozilla/5.0 (Windows) Edg/1 Chrome/1 Safari/1")).toBe("Edge on Windows");
    expect(auth.deviceLabel("Mozilla/5.0 (X11; Linux) Firefox/1")).toBe("Firefox on Linux");
    expect(auth.deviceLabel("Mozilla/5.0 (Linux; Android 13) Chrome/1 Safari/1")).toBe("Chrome on Android");
    expect(auth.deviceLabel("Mozilla/5.0 (X11; CrOS x86_64) Chrome/1 Safari/1")).toBe("Chrome on Chromebook");
    expect(auth.deviceLabel("Mozilla/5.0 (iPad; CPU OS) Safari/1")).toBe("Safari on iPhone/iPad");
    expect(auth.deviceLabel("curl/8")).toBe("Unknown device");
    expect(auth.deviceLabel("")).toBe("Unknown device");
  });

  it("signs out one other session by id, or all others, never this one", async () => {
    const { parentId, familyId } = await account();
    const mine = await auth.createSession(parentId, familyId);
    await auth.createSession(parentId, familyId);
    await auth.createSession(parentId, familyId);
    const other = await account();
    await auth.createSession(other.parentId, other.familyId);
    const req = withCookie(mine.token);
    const list = await auth.listSessions(req, parentId);
    const mineId = list.find((s) => s.current)!.id;
    const someoneElse = list.find((s) => !s.current)!.id;
    // this device's own id, or an id from another account, deletes nothing
    expect(await auth.revokeSessions(req, parentId, mineId)).toBe(0);
    expect(await auth.revokeSessions(req, other.parentId, someoneElse)).toBe(0);
    expect(await auth.revokeSessions(req, parentId, someoneElse)).toBe(1);
    expect(await auth.revokeSessions(req, parentId)).toBe(1);
    expect(await count("SELECT COUNT(*) AS n FROM sessions WHERE parent_id = ?", [parentId])).toBe(1);
    expect(await count("SELECT COUNT(*) AS n FROM sessions WHERE parent_id = ?", [other.parentId])).toBe(1);
    expect(await auth.getSession(req)).not.toBeNull();
    // with no cookie of its own, everything goes
    expect(await auth.revokeSessions(new Request("http://localhost/"), parentId)).toBe(1);
  });

  it("reads its cookie by name from a crowded header, including = and encoded values", async () => {
    const { parentId, familyId } = await account();
    const { token } = await auth.createSession(parentId, familyId);
    const crowded = new Request("http://localhost/", { headers: { cookie: `a=1; other_gm_session=zzz ; gm_session=${encodeURIComponent(token)} ; b=2` } });
    expect(await auth.getSession(crowded)).not.toBeNull();
    expect(auth.readCookieToken(crowded)).toHaveLength(64);
    expect(auth.readCookieToken(new Request("http://localhost/"))).toBe("");
    expect(auth.readCookieToken(new Request("http://localhost/", { headers: { cookie: "x=y" } }))).toBe("");
  });

  it("writes cookies with the right flags", () => {
    expect(auth.sessionCookie("a b", 60)).toBe("gm_session=a%20b; Path=/; HttpOnly; SameSite=Lax; Max-Age=60");
    expect(auth.clearCookie()).toBe("gm_session=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0");
  });

  it("marks the sign-up browser for three days and recognises only it", () => {
    const mark = auth.newSignupMark();
    expect(mark.cookie).toContain("Max-Age=259200");
    expect(mark.cookie).toMatch(/^gm_signup=[\w-]+; Path=\/; HttpOnly; SameSite=Lax/);
    const token = /gm_signup=([^;]+)/.exec(mark.cookie)![1];
    const req = new Request("http://localhost/", { headers: { cookie: `gm_signup=${token}` } });
    expect(auth.isSignupBrowser(req, mark.hash)).toBe(true);
    expect(auth.isSignupBrowser(req, "different")).toBe(false);
    expect(auth.isSignupBrowser(req, null)).toBe(false);
    expect(auth.isSignupBrowser(new Request("http://localhost/"), mark.hash)).toBe(false);
  });
});

describe("request safety", () => {
  const req = (headers: Record<string, string>) => new Request("http://localhost/", { headers });
  it("allows same-origin requests and ones without an Origin", () => {
    expect(auth.sameOrigin(req({}))).toBe(true);
    expect(auth.sameOrigin(req({ origin: "https://app.test", host: "app.test" }))).toBe(true);
    expect(auth.sameOrigin(req({ origin: "https://evil.test", host: "app.test" }))).toBe(false);
    expect(auth.sameOrigin(req({ origin: "https://app.test", host: "other", "x-forwarded-host": "app.test" }))).toBe(true);
    expect(auth.sameOrigin(req({ origin: "not a url", host: "app.test" }))).toBe(false);
  });

  it("builds email links from the configured site, not a forged host", () => {
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", " https://gradelings.test/ ");
    expect(auth.appOrigin(new Request("http://evil.test/x"))).toBe("https://gradelings.test");
    vi.stubEnv("NEXT_PUBLIC_SITE_URL", "");
    expect(auth.appOrigin(new Request("http://localhost:3000/x"))).toBe("http://localhost:3000");
  });

  it("finds the caller's address from the right proxy hop, never the first entry", () => {
    expect(auth.clientIp(req({ "x-vercel-forwarded-for": "1.1.1.1, 2.2.2.2", "x-forwarded-for": "9.9.9.9" }))).toBe("1.1.1.1");
    expect(auth.clientIp(req({ "x-forwarded-for": "6.6.6.6, 7.7.7.7" }))).toBe("7.7.7.7");
    vi.stubEnv("TRUSTED_PROXY_HOPS", "2");
    expect(auth.clientIp(req({ "x-forwarded-for": "6.6.6.6, 7.7.7.7, 8.8.8.8" }))).toBe("7.7.7.7");
    expect(auth.clientIp(req({ "x-forwarded-for": "8.8.8.8" }))).toBe("8.8.8.8");
    vi.stubEnv("TRUSTED_PROXY_HOPS", "0");
    expect(auth.clientIp(req({ "x-forwarded-for": "6.6.6.6, 7.7.7.7" }))).toBe("7.7.7.7");
    vi.stubEnv("TRUSTED_PROXY_HOPS", "-3");
    expect(auth.clientIp(req({ "x-forwarded-for": "6.6.6.6, 7.7.7.7" }))).toBe("7.7.7.7");
    vi.stubEnv("TRUSTED_PROXY_HOPS", "3");
    expect(auth.clientIp(req({ "x-forwarded-for": "6.6.6.6, 7.7.7.7" }))).toBe("6.6.6.6");
    vi.stubEnv("TRUSTED_PROXY_HOPS", "");
    expect(auth.clientIp(req({ "x-real-ip": "5.5.5.5" }))).toBe("5.5.5.5");
    expect(auth.clientIp(req({}))).toBe("local");
    expect(auth.clientIp(req({ "x-forwarded-for": " , " }))).toBe("local");
  });

  it("counts attempts per window and lets a refund give one back", async () => {
    const key = `rl-${Date.now()}`;
    expect(await auth.rateLimited(key, 2, 60_000)).toBe(false);
    expect(await auth.rateLimited(key, 2, 60_000)).toBe(false);
    expect(await auth.rateLimited(key, 2, 60_000)).toBe(true);
    await auth.refundRateLimit(key);
    expect(await auth.rateLimited(key, 2, 60_000)).toBe(true);
    await auth.refundRateLimit(key);
    await auth.refundRateLimit(key);
    expect(await auth.rateLimited(key, 2, 60_000)).toBe(false);
    // the counter never goes below zero
    await dbm.run("UPDATE rate_limits SET count = 0 WHERE key = ?", [key]);
    await auth.refundRateLimit(key);
    expect(Number((await dbm.query<{ count: number }>("SELECT count FROM rate_limits WHERE key = ?", [key]))[0].count)).toBe(0);
  });

  it("starts a new window once the old one has run out", async () => {
    const key = `rlw-${Date.now()}`;
    expect(await auth.rateLimited(key, 1, 60_000)).toBe(false);
    expect(await auth.rateLimited(key, 1, 60_000)).toBe(true);
    await dbm.run("UPDATE rate_limits SET reset_at = ? WHERE key = ?", [Date.now() - 1, key]);
    expect(await auth.rateLimited(key, 1, 60_000)).toBe(false);
    const row = (await dbm.query<{ count: number; reset_at: number }>("SELECT count, reset_at FROM rate_limits WHERE key = ?", [key]))[0];
    expect(Number(row.count)).toBe(1);
    expect(Number(row.reset_at)).toBeGreaterThan(Date.now() + 59_000);
    expect(Number(row.reset_at)).toBeLessThanOrEqual(Date.now() + 60_000);
  });

  it("uses a limit of 10 per 10 minutes by default", async () => {
    const key = `rld-${Date.now()}`;
    for (let i = 0; i < 10; i++) expect(await auth.rateLimited(key)).toBe(false);
    expect(await auth.rateLimited(key)).toBe(true);
    const reset = Number((await dbm.query<{ reset_at: number }>("SELECT reset_at FROM rate_limits WHERE key = ?", [key]))[0].reset_at);
    expect(reset - Date.now()).toBeGreaterThan(9 * 60_000);
    expect(reset - Date.now()).toBeLessThanOrEqual(10 * 60_000);
  });
});

describe("one-time tokens", () => {
  it("works once, for its own kind, before it expires", async () => {
    const { parentId } = await account();
    const token = await auth.createAuthToken(parentId, "reset", 60_000);
    expect(await auth.consumeAuthToken(token, "verify")).toBeNull();
    expect(await auth.consumeAuthToken(token, "reset")).toBe(parentId);
    expect(await auth.consumeAuthToken(token, "reset")).toBeNull();
  });
  it("replaces the previous token of the same kind only", async () => {
    const { parentId } = await account();
    const a = await auth.createAuthToken(parentId, "reset", 60_000);
    const v = await auth.createAuthToken(parentId, "verify", 60_000);
    const b = await auth.createAuthToken(parentId, "reset", 60_000);
    expect(await auth.consumeAuthToken(a, "reset")).toBeNull();
    expect(await auth.consumeAuthToken(b, "reset")).toBe(parentId);
    expect(await auth.consumeAuthToken(v, "verify")).toBe(parentId);
  });
  it("refuses expired, empty and oversized tokens", async () => {
    const { parentId } = await account();
    const t = await auth.createAuthToken(parentId, "magic", 60_000);
    await dbm.run("UPDATE auth_tokens SET expires_at = ? WHERE parent_id = ?", [Date.now() - 1, parentId]);
    expect(await auth.consumeAuthToken(t, "magic")).toBeNull();
    expect(await auth.consumeAuthToken("", "magic")).toBeNull();
    expect(await auth.consumeAuthToken("x".repeat(201), "magic")).toBeNull();
  });
  it("accepts a token up to 200 characters long without crashing", async () => {
    expect(await auth.consumeAuthToken("x".repeat(200), "magic")).toBeNull();
    expect(await auth.consumeAuthToken("x".repeat(100), "magic")).toBeNull();
  });
});

describe("unsubscribe tokens", () => {
  it("maps a token back to its account and tidies tokens past 400 days", async () => {
    const { parentId } = await account();
    const old = await auth.unsubscribeToken(parentId);
    await dbm.run("UPDATE unsub_tokens SET created_at = ? WHERE parent_id = ?", [Date.now() - 401 * 86_400_000, parentId]);
    const legacy = await auth.unsubscribeToken(parentId); // also tidies
    expect(await auth.unsubscribeOwner(old)).toBeNull();
    expect(await auth.unsubscribeOwner(legacy)).toBe(parentId);
    // a token just inside 400 days survives
    await dbm.run("UPDATE unsub_tokens SET created_at = ? WHERE parent_id = ?", [Date.now() - 399 * 86_400_000, parentId]);
    await auth.unsubscribeToken(parentId);
    expect(await auth.unsubscribeOwner(legacy)).toBe(parentId);
    // tokens from before they were dated never expire
    await dbm.run("UPDATE unsub_tokens SET created_at = NULL WHERE parent_id = ?", [parentId]);
    await auth.unsubscribeToken(parentId);
    expect(await auth.unsubscribeOwner(legacy)).toBe(parentId);
  });
  it("refuses empty, unknown and oversized tokens", async () => {
    expect(await auth.unsubscribeOwner("")).toBeNull();
    expect(await auth.unsubscribeOwner("nope")).toBeNull();
    expect(await auth.unsubscribeOwner("x".repeat(101))).toBeNull();
    expect(await auth.unsubscribeOwner("x".repeat(100))).toBeNull();
  });
});

describe("request bodies", () => {
  const post = (body: BodyInit | null, headers: Record<string, string> = {}) => new Request("http://localhost/", { method: "POST", body, headers });
  it("reads JSON up to the limit and refuses more", async () => {
    expect(await auth.readJson(post('{"a":1}'))).toEqual({ a: 1 });
    expect(await auth.readJson(post("not json"))).toBeNull();
    expect(await auth.readJson(post(JSON.stringify({ s: "x".repeat(100) })), 50)).toBeNull();
    expect(await auth.readText(post("12345"), 5)).toBe("12345");
    expect(await auth.readText(post("123456"), 5)).toBeNull();
  });
  it("trusts a declared length only to refuse, and stops a stream that lies", async () => {
    expect(await auth.readText(post("abc", { "content-length": "999999" }), 10)).toBeNull();
    expect(await auth.readText(post("abc", { "content-length": "10" }), 10)).toBe("abc");
    const stream = new ReadableStream<Uint8Array>({
      start(c) {
        c.enqueue(new Uint8Array(6));
        c.enqueue(new Uint8Array(6));
        c.close();
      },
    });
    const lying = new Request("http://localhost/", { method: "POST", body: stream, duplex: "half" } as RequestInit);
    expect(await auth.readText(lying, 10)).toBeNull();
  });
  it("treats no body as empty text and no JSON", async () => {
    expect(await auth.readText(new Request("http://localhost/"))).toBe("");
    expect(await auth.readJson(new Request("http://localhost/"))).toBeNull();
    expect(auth.BODY_LIMIT).toBe(64_000);
    expect(auth.ADMIN_BODY_LIMIT).toBe(256_000);
    expect(auth.SYNC_BODY_LIMIT).toBe(4_000_000);
  });
  it("builds JSON responses that are never cached", async () => {
    const r = auth.json({ ok: true }, { status: 201, cookie: "a=b" });
    expect(r.status).toBe(201);
    expect(r.headers.get("content-type")).toBe("application/json");
    expect(r.headers.get("cache-control")).toBe("no-store");
    expect(r.headers.get("set-cookie")).toBe("a=b");
    expect(await r.json()).toEqual({ ok: true });
    const e = auth.error(418, "teapot");
    expect(e.status).toBe(418);
    expect(await e.json()).toEqual({ error: "teapot" });
    expect(auth.json({}).headers.get("set-cookie")).toBeNull();
    expect(auth.newId()).toMatch(/^[0-9a-f-]{36}$/);
  });
});
