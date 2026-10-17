import { createHash } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

// These tests run the real Google sign-in routes against a throwaway SQLite file, with Google's token endpoint faked.

const dir = mkdtempSync(join(tmpdir(), "grademap-google-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
process.env.NEXT_PUBLIC_SITE_URL = "https://gradelings.test";
delete process.env.RESEND_API_KEY;
delete process.env.ADMIN_EMAILS;

type Mod = Record<string, (req: Request) => Promise<Response>>;
let start: Mod, callback: Mod, providers: Mod, signup: Mod, login: Mod, sessions: Mod, passwordRoute: Mod, account: Mod;
let google: typeof import("@/server/google");
let auth: typeof import("@/server/auth");
let dbm: typeof import("@/server/db");
let flags: typeof import("@/server/flags");
let email: typeof import("@/server/email");

beforeAll(async () => {
  [start, callback, providers, signup, login, sessions, passwordRoute, account] = (await Promise.all([
    import("@/app/api/auth/google/route"),
    import("@/app/api/auth/google/callback/route"),
    import("@/app/api/auth/providers/route"),
    import("@/app/api/auth/signup/route"),
    import("@/app/api/auth/login/route"),
    import("@/app/api/auth/sessions/route"),
    import("@/app/api/auth/password/route"),
    import("@/app/api/account/route"),
  ])) as unknown as Mod[];
  google = await import("@/server/google");
  auth = await import("@/server/auth");
  dbm = await import("@/server/db");
  flags = await import("@/server/flags");
  email = await import("@/server/email");
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

const CLIENT_ID = "client-123.apps.googleusercontent.com";
beforeEach(() => {
  process.env.GOOGLE_CLIENT_ID = CLIENT_ID;
  process.env.GOOGLE_CLIENT_SECRET = "secret-xyz";
  delete process.env.ADMIN_EMAILS;
});
afterEach(() => {
  vi.unstubAllGlobals();
});

let ip = 0;
const headers = (extra: Record<string, string> = {}) => ({ "x-forwarded-for": `10.1.0.${++ip}`, ...extra });
const cookieOf = (res: Response, name?: string) => {
  const all = res.headers.getSetCookie().map((c) => c.split(";")[0]);
  return name ? all.find((c) => c.startsWith(`${name}=`)) : all.find((c) => c.startsWith("gm_session="));
};
const post = (path: string, body: unknown, cookie?: string, method = "POST") =>
  new Request(`https://gradelings.test${path}`, { method, headers: headers({ "content-type": "application/json", ...(cookie ? { cookie } : {}) }), body: JSON.stringify(body) });

function idToken(claims: Record<string, unknown>) {
  const payload = { iss: "https://accounts.google.com", aud: CLIENT_ID, exp: Math.floor(Date.now() / 1000) + 3600, email_verified: true, ...claims };
  return `x.${Buffer.from(JSON.stringify(payload)).toString("base64url")}.y`;
}

/** Goes to Google and back, with Google answering as `claims`. Returns the callback's response and what we sent to Google. */
async function signInWithGoogle(claims: { sub: string; email: string; [k: string]: unknown }, opts: { from?: string; query?: string; mutate?: (state: string, cookie: string) => { state: string; cookie: string } } = {}) {
  const startRes = await start.GET(new Request(`https://gradelings.test/api/auth/google/?from=${opts.from ?? "parents"}${opts.query ?? ""}`, { headers: headers() }));
  expect(startRes.status).toBe(303);
  const authUrl = new URL(startRes.headers.get("location")!);
  let state = authUrl.searchParams.get("state")!;
  let stateCookie = cookieOf(startRes, "gm_google")!;
  if (opts.mutate) ({ state, cookie: stateCookie } = opts.mutate(state, stateCookie));
  let tokenCall: { body: URLSearchParams } | null = null;
  vi.stubGlobal(
    "fetch",
    vi.fn(async (_url: string, init: RequestInit) => {
      tokenCall = { body: init.body as URLSearchParams };
      return new Response(JSON.stringify({ id_token: idToken({ nonce: authUrl.searchParams.get("nonce"), ...claims }) }), { status: 200 });
    }),
  );
  const res = await callback.GET(new Request(`https://gradelings.test/api/auth/google/callback/?code=abc&state=${state}`, { headers: headers({ cookie: stateCookie }) }));
  return { res, authUrl, tokenCall: tokenCall as { body: URLSearchParams } | null, session: cookieOf(res) };
}

const parentRow = async (address: string) => (await dbm.query<Record<string, unknown>>("SELECT * FROM parents WHERE email = ?", [address]))[0];

describe("starting a Google sign-in", () => {
  it("only offers the button when Google is set up and switched on", async () => {
    expect(await (await providers.GET(new Request("https://gradelings.test/api/auth/providers/"))).json()).toEqual({ google: true });
    await flags.setFlag("google-sign-in", { enabled: false, rollout: 100 });
    expect(await (await providers.GET(new Request("https://gradelings.test/api/auth/providers/"))).json()).toEqual({ google: false });
    await flags.setFlag("google-sign-in", { enabled: true, rollout: 100 });
    delete process.env.GOOGLE_CLIENT_SECRET;
    expect(await (await providers.GET(new Request("https://gradelings.test/api/auth/providers/"))).json()).toEqual({ google: false });
  });

  it("sends the browser to Google with state, a nonce and a PKCE challenge, and keeps the secrets in an HttpOnly cookie", async () => {
    const res = await start.GET(new Request("https://gradelings.test/api/auth/google/?from=teachers", { headers: headers() }));
    expect(res.status).toBe(303);
    const url = new URL(res.headers.get("location")!);
    expect(url.origin + url.pathname).toBe("https://accounts.google.com/o/oauth2/v2/auth");
    expect(url.searchParams.get("client_id")).toBe(CLIENT_ID);
    expect(url.searchParams.get("redirect_uri")).toBe("https://gradelings.test/api/auth/google/callback/");
    expect(url.searchParams.get("scope")).toBe("openid email");
    expect(url.searchParams.get("code_challenge_method")).toBe("S256");
    const setCookie = res.headers.get("set-cookie")!;
    expect(setCookie).toContain("HttpOnly");
    expect(setCookie).toContain("SameSite=Lax");
    const saved = google.decodeGoogleState(setCookie.split(";")[0].split("=")[1])!;
    expect(saved.from).toBe("teachers");
    expect(saved.state).toBe(url.searchParams.get("state"));
    expect(url.searchParams.get("code_challenge")).toBe(createHash("sha256").update(saved.verifier).digest("base64url"));
  });

  it("refuses a return page it doesn't know, and bounces back with a message when Google sign-in is off", async () => {
    expect((await start.GET(new Request("https://gradelings.test/api/auth/google/?from=https://evil.example", { headers: headers() }))).status).toBe(400);
    expect((await start.GET(new Request("https://gradelings.test/api/auth/google/", { headers: headers() }))).status).toBe(400);
    delete process.env.GOOGLE_CLIENT_ID;
    const off = await start.GET(new Request("https://gradelings.test/api/auth/google/?from=teachers", { headers: headers() }));
    expect(off.headers.get("location")).toBe("https://gradelings.test/teachers/?google_error=off");
    const offParents = await start.GET(new Request("https://gradelings.test/api/auth/google/?from=parents", { headers: headers() }));
    expect(offParents.headers.get("location")).toBe("https://gradelings.test/parents/?google_error=off#/account");
  });
});

describe("coming back from Google", () => {
  it("makes a confirmed account with a trial, signs it in and lands in the parent area", async () => {
    const { res, session, tokenCall } = await signInWithGoogle({ sub: "g-new", email: "New.Parent@Example.com" });
    expect(res.headers.get("location")).toBe("https://gradelings.test/parents/?google=1#/account");
    expect(session).toBeTruthy();
    // The code is traded with the secret and the verifier we kept, never anything from the address.
    expect(tokenCall!.body.get("client_secret")).toBe("secret-xyz");
    expect(tokenCall!.body.get("code_verifier")).toBeTruthy();
    const row = await parentRow("new.parent@example.com");
    expect(row.google_sub).toBe("g-new");
    expect(row.email_verified_at).toBeTruthy();
    expect(row.password_hash).toBe("!");
    const family = (await dbm.query<{ plan: string; trial_ends_at: number }>("SELECT plan, trial_ends_at FROM families WHERE id = ?", [row.family_id as string]))[0];
    expect(family.plan).toBe("trial");
    expect(Number(family.trial_ends_at)).toBeGreaterThan(Date.now());
    // The one-use cookie is cleared.
    expect(res.headers.getSetCookie().some((c) => c.startsWith("gm_google=;") && c.includes("Max-Age=0"))).toBe(true);
    // The signed-in browser can reach its account, and sees there is no password.
    const me = await sessions.GET(new Request("https://gradelings.test/api/auth/sessions/", { headers: headers({ cookie: session! }) }));
    expect((await me.json()).hasPassword).toBe(false);
  });

  it("sends a teacher back to the teacher area, and keeps the trial and invite code the device brought", async () => {
    const { res } = await signInWithGoogle({ sub: "g-teacher", email: "teacher@example.com" }, { from: "teachers", query: `&trial=${Date.now() + 5 * 86_400_000}` });
    expect(res.headers.get("location")).toBe("https://gradelings.test/teachers/");
    const row = await parentRow("teacher@example.com");
    const family = (await dbm.query<{ trial_ends_at: number }>("SELECT trial_ends_at FROM families WHERE id = ?", [row.family_id as string]))[0];
    expect(Number(family.trial_ends_at) - Date.now()).toBeLessThan(5 * 86_400_000 + 1000);
    expect(Number(family.trial_ends_at) - Date.now()).toBeGreaterThan(4 * 86_400_000);
  });

  it("signs the same Google person in again to the same account, with a new-sign-in email", async () => {
    await signInWithGoogle({ sub: "g-again", email: "again@example.com" });
    const before = email.outbox().length;
    const second = await signInWithGoogle({ sub: "g-again", email: "again@example.com" });
    expect(second.session).toBeTruthy();
    expect((await dbm.query("SELECT id FROM parents WHERE email = ?", ["again@example.com"])).length).toBe(1);
    expect(email.outbox().slice(before).some((m) => m.to === "again@example.com" && m.kind === "new-sign-in")).toBe(true);
  });

  it("keeps working for the same Google person if their Google email later changes", async () => {
    await signInWithGoogle({ sub: "g-moved", email: "old-address@example.com" });
    const second = await signInWithGoogle({ sub: "g-moved", email: "new-address@example.com" });
    expect(second.session).toBeTruthy();
    expect(await parentRow("new-address@example.com")).toBeUndefined();
  });

  it("joins an existing confirmed account with the same email, keeping its password, and tells them", async () => {
    const created = await signup.POST(post("/api/auth/signup/", { email: "joined@example.com", password: "correct horse" }));
    expect(created.status).toBe(200);
    const token = decodeURIComponent(/token=([^\s&"]+)/.exec(email.outbox().at(-1)!.text)![1]);
    await (await import("@/app/api/auth/verify/route")).POST(post("/api/auth/verify/", { token }));
    const before = (await parentRow("joined@example.com")).id;

    const { session } = await signInWithGoogle({ sub: "g-joined", email: "joined@example.com" });
    expect(session).toBeTruthy();
    const row = await parentRow("joined@example.com");
    expect(row.id).toBe(before);
    expect(row.google_sub).toBe("g-joined");
    expect(String(row.password_hash)).toMatch(/^scrypt\$/);
    expect(email.outbox().at(-1)!.kind).toBe("google-linked");
    // The password still works, and the sessions that were open stay open.
    expect((await login.POST(post("/api/auth/login/", { email: "joined@example.com", password: "correct horse" }))).status).toBe(200);
    expect(cookieOf(created)).toBeTruthy();
  });

  it("takes over an unconfirmed account: a password set by whoever signed up first stops working", async () => {
    const squatter = await signup.POST(post("/api/auth/signup/", { email: "victim@example.com", password: "squatter pass" }));
    const squatterSession = cookieOf(squatter)!;
    await signInWithGoogle({ sub: "g-victim", email: "victim@example.com" });
    const row = await parentRow("victim@example.com");
    expect(row.email_verified_at).toBeTruthy();
    expect(row.password_hash).toBe("!");
    expect((await login.POST(post("/api/auth/login/", { email: "victim@example.com", password: "squatter pass" }))).status).toBe(401);
    // And the squatter's open session is gone.
    const me = await (await import("@/app/api/auth/me/route")).GET(new Request("https://gradelings.test/api/auth/me/", { headers: headers({ cookie: squatterSession }) }));
    expect(me.status).toBe(401);
  });

  it("won't let a different Google person into an account that is already linked to someone else", async () => {
    await signInWithGoogle({ sub: "g-first", email: "shared@example.com" });
    const { res, session } = await signInWithGoogle({ sub: "g-second", email: "shared@example.com" });
    expect(session).toBeUndefined();
    expect(res.headers.get("location")).toBe("https://gradelings.test/parents/?google_error=other_google#/account");
  });

  it("never signs an admin in, whether the account exists yet or not", async () => {
    process.env.ADMIN_EMAILS = "boss@example.com";
    const fresh = await signInWithGoogle({ sub: "g-boss", email: "boss@example.com" });
    expect(fresh.session).toBeUndefined();
    expect(fresh.res.headers.get("location")).toContain("google_error=admin");
    expect(await parentRow("boss@example.com")).toBeUndefined();

    // An existing admin account isn't linked or signed in either.
    await signup.POST(post("/api/auth/signup/", { email: "boss@example.com", password: "correct horse" }));
    const existing = await signInWithGoogle({ sub: "g-boss", email: "Boss@example.com" });
    expect(existing.session).toBeUndefined();
    expect((await parentRow("boss@example.com")).google_sub).toBeNull();

    // An account already linked to Google that later becomes an admin's is shut out too.
    delete process.env.ADMIN_EMAILS;
    await signInWithGoogle({ sub: "g-later", email: "later@example.com" });
    process.env.ADMIN_EMAILS = "later@example.com";
    expect((await signInWithGoogle({ sub: "g-later", email: "later@example.com" })).session).toBeUndefined();
  });

  it("pauses new accounts with the sign-ups switch but lets existing ones in", async () => {
    await signInWithGoogle({ sub: "g-existing", email: "existing@example.com" });
    await flags.setFlag("signups", { enabled: false, rollout: 100 });
    try {
      const blocked = await signInWithGoogle({ sub: "g-brand-new", email: "brand-new@example.com" });
      expect(blocked.res.headers.get("location")).toContain("google_error=paused");
      expect(await parentRow("brand-new@example.com")).toBeUndefined();
      expect((await signInWithGoogle({ sub: "g-existing", email: "existing@example.com" })).session).toBeTruthy();
    } finally {
      await flags.setFlag("signups", { enabled: true, rollout: 100 });
    }
  });

  it("refuses a sign-in that wasn't started here, was tampered with, or isn't for us", async () => {
    const bad = async (claims: Record<string, unknown>, mutate?: (s: string, c: string) => { state: string; cookie: string }) => {
      const r = await signInWithGoogle({ sub: "g-bad", email: "bad@example.com", ...claims }, { mutate });
      expect(r.session).toBeUndefined();
      expect(r.res.headers.get("location")).toContain("google_error=failed");
    };
    await bad({}, (_s, cookie) => ({ state: "forged", cookie }));
    await bad({}, (state) => ({ state, cookie: "gm_google=" }));
    await bad({ nonce: "someone-elses" });
    await bad({ aud: "another-app" });
    await bad({ iss: "https://evil.example" });
    await bad({ exp: Math.floor(Date.now() / 1000) - 3600 });
    await bad({ email_verified: false });
    await bad({ email: "not-an-email" });
    expect(await parentRow("bad@example.com")).toBeUndefined();
  });

  it("says so when the person cancels at Google, or Google's token call fails", async () => {
    const startRes = await start.GET(new Request("https://gradelings.test/api/auth/google/?from=teachers", { headers: headers() }));
    const cookie = cookieOf(startRes, "gm_google")!;
    const cancelled = await callback.GET(new Request("https://gradelings.test/api/auth/google/callback/?error=access_denied", { headers: headers({ cookie }) }));
    expect(cancelled.headers.get("location")).toBe("https://gradelings.test/teachers/?google_error=cancelled");

    const state = new URL(startRes.headers.get("location")!).searchParams.get("state");
    vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 400 })));
    const failed = await callback.GET(new Request(`https://gradelings.test/api/auth/google/callback/?code=abc&state=${state}`, { headers: headers({ cookie }) }));
    expect(failed.headers.get("location")).toBe("https://gradelings.test/teachers/?google_error=failed");
    vi.stubGlobal("fetch", vi.fn(async () => Promise.reject(new Error("network down"))));
    const down = await callback.GET(new Request(`https://gradelings.test/api/auth/google/callback/?code=abc&state=${state}`, { headers: headers({ cookie }) }));
    expect(down.headers.get("location")).toContain("google_error=failed");
  });
});

describe("an account with no password", () => {
  it("can't use the password routes, but can ask for a reset link to add one", async () => {
    const { session } = await signInWithGoogle({ sub: "g-nopw", email: "nopw@example.com" });
    expect((await login.POST(post("/api/auth/login/", { email: "nopw@example.com", password: "!" }))).status).toBe(401);
    expect((await login.POST(post("/api/auth/login/", { email: "nopw@example.com", password: "" }))).status).toBe(401);
    const change = await passwordRoute.POST(post("/api/auth/password/", { current: "!", password: "new password 1" }, session));
    expect(change.status).toBe(403);
    expect((await change.json()).error).toContain("Google");
    // The forgot-password link works because the email is confirmed.
    await (await import("@/app/api/auth/forgot/route")).POST(post("/api/auth/forgot/", { email: "nopw@example.com" }));
    const mail = email.outbox().at(-1)!;
    expect(mail.kind).toBe("reset");
    const token = decodeURIComponent(/token=([^\s&"]+)/.exec(mail.text)![1]);
    const reset = await (await import("@/app/api/auth/reset/route")).POST(post("/api/auth/reset/", { token, password: "my new password" }));
    expect(reset.status).toBe(200);
    expect((await login.POST(post("/api/auth/login/", { email: "nopw@example.com", password: "my new password" }))).status).toBe(200);
  });

  it("deletes with the email address and a recent sign-in instead of a password", async () => {
    const { session } = await signInWithGoogle({ sub: "g-del", email: "del@example.com" });
    const wrong = await account.DELETE(post("/api/account/", { email: "someone@else.com" }, session, "DELETE"));
    expect(wrong.status).toBe(403);
    expect((await account.DELETE(post("/api/account/", { password: "anything" }, session, "DELETE"))).status).toBe(403);
    expect(await parentRow("del@example.com")).toBeDefined();

    // A sign-in older than half an hour has to be redone first.
    await dbm.run("UPDATE sessions SET created_at = ?", [Date.now() - 31 * 60_000]);
    const stale = await account.DELETE(post("/api/account/", { email: "del@example.com" }, session, "DELETE"));
    expect(stale.status).toBe(403);
    expect((await stale.json()).error).toContain("sign in with Google again");
    await dbm.run("UPDATE sessions SET created_at = ?", [Date.now()]);
    expect((await account.DELETE(post("/api/account/", { email: " DEL@example.com " }, session, "DELETE"))).status).toBe(200);
    expect(await parentRow("del@example.com")).toBeUndefined();
  });
});

describe("reading Google's ID token", () => {
  const nonce = "n-1";
  it("accepts a good token and lowercases the email", () => {
    expect(google.readIdToken(idToken({ nonce, sub: "s", email: "A@B.co" }), nonce)).toEqual({ sub: "s", email: "a@b.co" });
  });
  it("accepts Google's older string form of email_verified and the short issuer", () => {
    expect(google.readIdToken(idToken({ nonce, sub: "s", email: "a@b.co", email_verified: "true", iss: "accounts.google.com" }), nonce)).not.toBeNull();
  });
  it("rejects anything that isn't a token", () => {
    expect(google.readIdToken("nonsense", nonce)).toBeNull();
    expect(google.readIdToken("a.b.c", nonce)).toBeNull();
    expect(google.readIdToken(idToken({ nonce, email: "a@b.co" }), nonce)).toBeNull(); // no sub
  });
  it("keeps a state cookie that was tampered with from being read", () => {
    expect(google.decodeGoogleState("not-base64-json")).toBeNull();
    expect(google.decodeGoogleState(Buffer.from(JSON.stringify({ state: "a", verifier: "b", nonce: "c", from: "elsewhere" })).toString("base64url"))).toBeNull();
    expect(google.decodeGoogleState(undefined)).toBeNull();
  });
});

it("has an unusable password hash that verifyPassword never matches", async () => {
  expect(await auth.verifyPassword("!", "!")).toBe(false);
  expect(await auth.verifyPassword("", "!")).toBe(false);
});
