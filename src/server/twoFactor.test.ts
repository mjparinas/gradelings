import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from "vitest";
import { base32Decode, base32Encode, codeAtStep, hashBackupCode, looksLikeBackupCode, newBackupCodes, openSecret, otpauthUri, sealSecret, stepAt, verifyTotp } from "./totp";

describe("time-based codes", () => {
  // RFC 6238 appendix B: the SHA-1 secret is the ASCII string 12345678901234567890; the 8-digit codes end in the 6-digit ones.
  const secret = base32Encode(Buffer.from("12345678901234567890"));
  it("match the RFC 6238 test vectors", () => {
    expect(codeAtStep(secret, stepAt(59_000))).toBe("287082");
    expect(codeAtStep(secret, stepAt(1_111_111_109_000))).toBe("081804");
    expect(codeAtStep(secret, stepAt(1_234_567_890_000))).toBe("005924");
    expect(codeAtStep(secret, stepAt(20_000_000_000_000))).toBe("353130");
  });

  it("round-trips base32", () => {
    for (const n of [1, 5, 20, 33]) {
      const bytes = Buffer.from(Array.from({ length: n }, (_, i) => (i * 37 + 11) % 256));
      expect(base32Decode(base32Encode(bytes))).toEqual(bytes);
    }
    expect(() => base32Decode("not base32!")).toThrow();
  });

  it("accept the current step and one either side, no further", () => {
    const now = 1_700_000_000_000;
    const step = stepAt(now);
    expect(verifyTotp(secret, codeAtStep(secret, step), null, now)).toBe(step);
    expect(verifyTotp(secret, codeAtStep(secret, step - 1), null, now)).toBe(step - 1);
    expect(verifyTotp(secret, codeAtStep(secret, step + 1), null, now)).toBe(step + 1);
    expect(verifyTotp(secret, codeAtStep(secret, step - 2), null, now)).toBeNull();
    expect(verifyTotp(secret, codeAtStep(secret, step + 2), null, now)).toBeNull();
  });

  it("refuse a step that was already used, and anything that isn't six digits", () => {
    const now = 1_700_000_000_000;
    const step = stepAt(now);
    const code = codeAtStep(secret, step);
    expect(verifyTotp(secret, code, step, now)).toBeNull();
    expect(verifyTotp(secret, code, step - 1, now)).toBe(step);
    expect(verifyTotp(secret, ` ${code.slice(0, 3)} ${code.slice(3)} `, null, now)).toBe(step);
    for (const bad of ["", "12345", "1234567", "abcdef", "12 34"]) expect(verifyTotp(secret, bad, null, now)).toBeNull();
  });

  it("builds the link an authenticator app opens", () => {
    const uri = otpauthUri("ABCDEFGH", "owner@example.com", "Gradelings");
    expect(uri).toBe("otpauth://totp/Gradelings:owner%40example.com?secret=ABCDEFGH&issuer=Gradelings&algorithm=SHA1&digits=6&period=30");
  });
});

describe("recovery codes", () => {
  it("are eight different, readable codes that survive being typed carelessly", () => {
    const codes = newBackupCodes();
    expect(codes).toHaveLength(8);
    expect(new Set(codes).size).toBe(8);
    for (const c of codes) {
      expect(c).toMatch(/^[a-z2-9]{5}-[a-z2-9]{5}$/);
      expect(c).not.toMatch(/[ilo01]/);
      expect(looksLikeBackupCode(c)).toBe(true);
      expect(hashBackupCode(c.toUpperCase().replace("-", " "))).toBe(hashBackupCode(c));
    }
    expect(looksLikeBackupCode("123456")).toBe(false);
  });
});

describe("secrets at rest", () => {
  afterEach(() => delete process.env.TWO_FACTOR_KEY);
  it("are encrypted when TWO_FACTOR_KEY is set, and unreadable without it", () => {
    process.env.TWO_FACTOR_KEY = "a long random key";
    const sealed = sealSecret("JBSWY3DPEHPK3PXP");
    expect(sealed.startsWith("v1.")).toBe(true);
    expect(sealed).not.toContain("JBSWY3DPEHPK3PXP");
    expect(openSecret(sealed)).toBe("JBSWY3DPEHPK3PXP");
    expect(sealSecret("JBSWY3DPEHPK3PXP")).not.toBe(sealed); // a new random IV each time
    process.env.TWO_FACTOR_KEY = "another key";
    expect(() => openSecret(sealed)).toThrow();
    delete process.env.TWO_FACTOR_KEY;
    expect(() => openSecret(sealed)).toThrow();
  });
  it("are kept as they are without a key, and still read back", () => {
    expect(openSecret(sealSecret("JBSWY3DPEHPK3PXP"))).toBe("JBSWY3DPEHPK3PXP");
  });
});

// ---------- Through the real routes, against a throwaway SQLite file ----------

const dir = mkdtempSync(join(tmpdir(), "grademap-2fa-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
delete process.env.RESEND_API_KEY;
const ADMIN_EMAIL = "owner-2fa@example.com";
const PASSWORD = "correct horse";

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, login: Mod, adminMe: Mod, mfa: Mod, stats: Mod, auditLog: Mod, reset: Mod;
let dbm: typeof import("@/server/db");
let auth: typeof import("@/server/auth");

let ip = 0;
function req(path: string, method = "GET", body?: unknown, cookie?: string): Request {
  return new Request(`http://localhost${path}`, {
    method,
    headers: { "content-type": "application/json", host: "localhost", "x-forwarded-for": `10.9.${Math.floor(++ip / 250)}.${ip % 250}`, ...(cookie ? { cookie } : {}) },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
}
const cookieOf = (res: Response) => (res.headers.get("set-cookie") ?? "").split(";")[0];
const me = async (cookie: string) => adminMe.GET(req("/api/admin/me/", "GET", undefined, cookie));
const post = (cookie: string, body: unknown) => mfa.POST(req("/api/admin/2fa/", "POST", body, cookie));
const signIn = (body: Record<string, unknown>) => login.POST(req("/api/auth/login/", "POST", { email: ADMIN_EMAIL, password: PASSWORD, ...body }));

beforeAll(async () => {
  [signup, login, adminMe, mfa, stats, auditLog, reset] = (await Promise.all([
    import("@/app/api/auth/signup/route"),
    import("@/app/api/auth/login/route"),
    import("@/app/api/admin/me/route"),
    import("@/app/api/admin/2fa/route"),
    import("@/app/api/admin/stats/route"),
    import("@/app/api/admin/audit/route"),
    import("@/app/api/auth/reset/route"),
  ])) as unknown as Mod[];
  dbm = await import("@/server/db");
  auth = await import("@/server/auth");
});
afterAll(() => {
  vi.useRealTimers();
  rmSync(dir, { recursive: true, force: true });
});

/** A confirmed account on the admin list, signed in after confirming, as an admin is today (password only). */
async function newAdmin(address: string) {
  process.env.ADMIN_EMAILS = [process.env.ADMIN_EMAILS, address].filter(Boolean).join(",");
  expect((await signup.POST(req("/api/auth/signup/", "POST", { email: address, password: PASSWORD }))).status).toBe(200);
  await dbm.run("UPDATE parents SET email_verified_at = ? WHERE email = ?", [Date.now() - 60_000, address]);
  await new Promise((r) => setTimeout(r, 5));
  const res = await login.POST(req("/api/auth/login/", "POST", { email: address, password: PASSWORD }));
  expect(res.status).toBe(200);
  return cookieOf(res);
}

/** Moves the clock on by a minute, which is always a new 30-second step. */
const nextStep = () => vi.setSystemTime(Date.now() + 60_000);

describe("admin access with two-step sign-in required", () => {
  delete process.env.ADMIN_2FA;
  let cookie = "";
  let secret = "";
  let recovery: string[] = [];

  it("lets an admin who hasn't set it up reach only the setup screens", async () => {
    vi.useFakeTimers({ toFake: ["Date"] });
    delete process.env.ADMIN_2FA;
    cookie = await newAdmin(ADMIN_EMAIL);
    const res = await me(cookie);
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ email: ADMIN_EMAIL, ready: false, twoFactor: { enabled: false, required: true } });
    expect((await stats.GET(req("/api/admin/stats/", "GET", undefined, cookie))).status).toBe(404);
    expect((await auditLog.GET(req("/api/admin/audit/", "GET", undefined, cookie))).status).toBe(404);
    expect((await mfa.GET(req("/api/admin/2fa/", "GET", undefined, cookie))).status).toBe(200);
  });

  it("keeps everyone else out of the setup screens", async () => {
    const other = await signup.POST(req("/api/auth/signup/", "POST", { email: "plain-parent@example.com", password: PASSWORD }));
    await dbm.run("UPDATE parents SET email_verified_at = ? WHERE email = ?", [Date.now() - 60_000, "plain-parent@example.com"]);
    expect((await post(cookieOf(other), { action: "start" })).status).toBe(404);
    expect((await mfa.GET(req("/api/admin/2fa/"))).status).toBe(404);
  });

  it("won't turn it on with a wrong code, and only the code from the new secret counts", async () => {
    expect((await post(cookie, { action: "confirm", code: "123456" })).status).toBe(400); // nothing started yet
    const started = await (await post(cookie, { action: "start" })).json();
    secret = started.secret;
    expect(started.uri).toContain(`secret=${secret}`);
    expect(started.uri).toContain(encodeURIComponent(ADMIN_EMAIL));
    const wrong = codeAtStep(secret, stepAt(Date.now())) === "000000" ? "000001" : "000000";
    expect((await post(cookie, { action: "confirm", code: wrong })).status).toBe(400);
    expect((await me(cookie).then((r) => r.json())).twoFactor.enabled).toBe(false);
  });

  it("turns on with a right code, gives eight recovery codes and signs the other sessions out", async () => {
    const other = cookieOf(await signIn({}));
    expect((await me(other)).status).toBe(200);
    const done = await post(cookie, { action: "confirm", code: codeAtStep(secret, stepAt(Date.now())) });
    expect(done.status).toBe(200);
    recovery = (await done.json()).codes;
    expect(recovery).toHaveLength(8);
    expect((await me(other)).status).toBe(404); // signed out
    const now = await (await me(cookie)).json();
    expect(now).toMatchObject({ ready: true, twoFactor: { enabled: true, backupCodesLeft: 8 } });
    expect((await stats.GET(req("/api/admin/stats/", "GET", undefined, cookie))).status).toBe(200);
    const stored = (await dbm.query<{ totp_secret: string }>("SELECT totp_secret FROM parents WHERE email = ?", [ADMIN_EMAIL]))[0].totp_secret;
    expect(stored).toBe(`plain.${secret}`);
    const rows = await dbm.query<{ code_hash: string }>("SELECT code_hash FROM totp_backup_codes WHERE parent_id = (SELECT id FROM parents WHERE email = ?)", [ADMIN_EMAIL]);
    expect(rows).toHaveLength(8);
    expect(rows.map((r) => r.code_hash)).not.toContain(recovery[0]); // only hashes are kept
    expect((await post(cookie, { action: "start" })).status).toBe(409);
  });

  it("asks for the code after a right password, and a password alone opens nothing", async () => {
    const noCode = await signIn({});
    expect(noCode.status).toBe(401);
    expect(await noCode.json()).toMatchObject({ mfaRequired: true });
    expect(noCode.headers.get("set-cookie")).toBeNull();
    // A wrong password still looks like any other wrong password.
    const badPassword = await signIn({ password: "nope nope nope" });
    expect(badPassword.status).toBe(401);
    expect((await badPassword.json()).mfaRequired).toBeUndefined();
    const badCode = await signIn({ code: "000000" });
    expect(badCode.status).toBe(401);
    expect(badCode.headers.get("set-cookie")).toBeNull();
  });

  it("signs in with a right code, once", async () => {
    nextStep();
    const code = codeAtStep(secret, stepAt(Date.now()));
    const ok = await signIn({ code });
    expect(ok.status).toBe(200);
    const session = cookieOf(ok);
    expect((await stats.GET(req("/api/admin/stats/", "GET", undefined, session))).status).toBe(200);
    // The same code a second time (over a shoulder, from a log) is refused.
    expect((await signIn({ code })).status).toBe(401);
  });

  it("signs in with a recovery code once, then it is used up", async () => {
    const ok = await signIn({ code: recovery[0].toUpperCase() });
    expect(ok.status).toBe(200);
    expect((await signIn({ code: recovery[0] })).status).toBe(401);
    expect((await (await me(cookie)).json()).twoFactor.backupCodesLeft).toBe(7);
  });

  it("doesn't count a sign-in that skipped the second step, even a fresh one after a password reset", async () => {
    const parentId = (await dbm.query<{ id: string; family_id: string }>("SELECT id, family_id FROM parents WHERE email = ?", [ADMIN_EMAIL]))[0];
    await new Promise((r) => setTimeout(r, 5));
    const { token } = await auth.createSession(parentId.id, parentId.family_id);
    const passwordOnly = `${process.env.NODE_ENV === "production" ? "__Host-gm_session" : "gm_session"}=${token}`;
    const res = await me(passwordOnly);
    expect(res.status).toBe(200);
    expect(await res.json()).toMatchObject({ ready: false, twoFactor: { enabled: true } });
    expect((await stats.GET(req("/api/admin/stats/", "GET", undefined, passwordOnly))).status).toBe(404);
    // It can't set up a new secret or turn the old one off either.
    expect((await post(passwordOnly, { action: "start" })).status).toBe(409);
    expect((await post(passwordOnly, { action: "disable", code: "123456", password: PASSWORD })).status).toBe(409);
  });

  it("makes new recovery codes only with a current code, and the old ones stop working", async () => {
    expect((await post(cookie, { action: "regenerate", code: "000000" })).status).toBe(400);
    nextStep();
    const done = await post(cookie, { action: "regenerate", code: codeAtStep(secret, stepAt(Date.now())) });
    expect(done.status).toBe(200);
    const fresh = (await done.json()).codes as string[];
    expect(fresh).toHaveLength(8);
    expect((await signIn({ code: recovery[1] })).status).toBe(401);
    expect((await signIn({ code: fresh[0] })).status).toBe(200);
    recovery = fresh;
  });

  it("stops guessing: too many wrong codes lock the code step for a while, even for a right code", async () => {
    let last = 0;
    for (let i = 0; i < 12; i++) last = (await signIn({ code: String(100000 + i) })).status;
    expect(last).toBe(429);
    nextStep();
    expect((await signIn({ code: codeAtStep(secret, stepAt(Date.now())) })).status).toBe(429);
    vi.setSystemTime(Date.now() + 11 * 60_000);
    expect((await signIn({ code: codeAtStep(secret, stepAt(Date.now())) })).status).toBe(200);
  });

  it("turns off only with the password and a code, and the admin is sent back to set it up", async () => {
    nextStep();
    const code = codeAtStep(secret, stepAt(Date.now()));
    expect((await post(cookie, { action: "disable", code, password: "wrong wrong" })).status).toBe(400);
    expect((await post(cookie, { action: "disable", code: "000000", password: PASSWORD })).status).toBe(400);
    expect((await post(cookie, { action: "disable", code, password: PASSWORD })).status).toBe(200);
    expect(await (await me(cookie)).json()).toMatchObject({ ready: false, twoFactor: { enabled: false } });
    expect((await stats.GET(req("/api/admin/stats/", "GET", undefined, cookie))).status).toBe(404);
    expect((await signIn({})).status).toBe(200); // no code needed once it is off
    expect((await dbm.query("SELECT 1 FROM totp_backup_codes WHERE parent_id = (SELECT id FROM parents WHERE email = ?)", [ADMIN_EMAIL])).length).toBe(0);
  });

  it("writes setup changes to the change log", async () => {
    const actions = (await dbm.query<{ action: string }>("SELECT action FROM admin_audit WHERE action LIKE '2fa.%' ORDER BY id")).map((r) => r.action);
    expect(actions).toEqual(["2fa.enable", "2fa.backup-codes", "2fa.disable"]);
  });
});

describe("a password reset can't skip the second step", () => {
  it("leaves the new session short of admin access", async () => {
    const address = "reset-admin@example.com";
    const cookie = await newAdmin(address);
    const started = await (await post(cookie, { action: "start" })).json();
    expect((await post(cookie, { action: "confirm", code: codeAtStep(started.secret, stepAt(Date.now())) })).status).toBe(200);
    const parent = (await dbm.query<{ id: string }>("SELECT id FROM parents WHERE email = ?", [address]))[0];
    const token = await auth.createAuthToken(parent.id, "reset", 60_000);
    const res = await reset.POST(req("/api/auth/reset/", "POST", { token, password: "a brand new password" }));
    expect(res.status).toBe(200);
    const after = cookieOf(res);
    await new Promise((r) => setTimeout(r, 5));
    expect(await (await me(after)).json()).toMatchObject({ ready: false });
    expect((await stats.GET(req("/api/admin/stats/", "GET", undefined, after))).status).toBe(404);
    // The old session was signed out by the reset.
    expect((await me(cookie)).status).toBe(404);
  });
});

describe("optional mode", () => {
  it("lets an admin without two-step in, and still holds one that has it to the code", async () => {
    process.env.ADMIN_2FA = "optional";
    try {
      const address = "optional-admin@example.com";
      const cookie = await newAdmin(address);
      expect(await (await me(cookie)).json()).toMatchObject({ ready: true, twoFactor: { enabled: false, required: false } });
      expect((await stats.GET(req("/api/admin/stats/", "GET", undefined, cookie))).status).toBe(200);
      const started = await (await post(cookie, { action: "start" })).json();
      expect((await post(cookie, { action: "confirm", code: codeAtStep(started.secret, stepAt(Date.now())) })).status).toBe(200);
      const parent = (await dbm.query<{ id: string; family_id: string }>("SELECT id, family_id FROM parents WHERE email = ?", [address]))[0];
      await new Promise((r) => setTimeout(r, 5));
      const { token } = await auth.createSession(parent.id, parent.family_id);
      const passwordOnly = `${process.env.NODE_ENV === "production" ? "__Host-gm_session" : "gm_session"}=${token}`;
      expect((await stats.GET(req("/api/admin/stats/", "GET", undefined, passwordOnly))).status).toBe(404);
    } finally {
      delete process.env.ADMIN_2FA;
    }
  });
});

describe("secrets in the database", () => {
  it("are encrypted at rest when TWO_FACTOR_KEY is set", async () => {
    process.env.TWO_FACTOR_KEY = "test key for the database";
    try {
      const address = "sealed-admin@example.com";
      const cookie = await newAdmin(address);
      const started = await (await post(cookie, { action: "start" })).json();
      const stored = (await dbm.query<{ totp_pending: string }>("SELECT totp_pending FROM parents WHERE email = ?", [address]))[0].totp_pending;
      expect(stored.startsWith("v1.")).toBe(true);
      expect(stored).not.toContain(started.secret);
      expect((await post(cookie, { action: "confirm", code: codeAtStep(started.secret, stepAt(Date.now())) })).status).toBe(200);
      nextStep();
      expect((await signIn({ email: address, code: codeAtStep(started.secret, stepAt(Date.now())) })).status).toBe(200);
    } finally {
      delete process.env.TWO_FACTOR_KEY;
    }
  });
});
