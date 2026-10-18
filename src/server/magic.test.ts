import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, beforeAll, describe, expect, it } from "vitest";

// These tests run the real route handlers against a throwaway SQLite file.

const dir = mkdtempSync(join(tmpdir(), "grademap-magic-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
delete process.env.RESEND_API_KEY;
delete process.env.NEXT_PUBLIC_SITE_URL;
process.env.ADMIN_EMAILS = "boss-magic@example.com";

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, magic: Mod, verify: Mod, me: Mod;
let auth: typeof import("@/server/auth");
let dbm: typeof import("@/server/db");
let email: typeof import("@/server/email");

beforeAll(async () => {
  [signup, magic, verify, me] = (await Promise.all([
    import("@/app/api/auth/signup/route"),
    import("@/app/api/auth/magic/route"),
    import("@/app/api/auth/magic/verify/route"),
    import("@/app/api/auth/me/route"),
  ])) as unknown as Mod[];
  auth = await import("@/server/auth");
  dbm = await import("@/server/db");
  email = await import("@/server/email");
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let ip = 0;
const post = (path: string, body: unknown) =>
  new Request(`http://localhost${path}`, { method: "POST", headers: { "content-type": "application/json", "x-forwarded-for": `10.1.0.${++ip}` }, body: JSON.stringify(body) });
const cookieOf = (res: Response) => (res.headers.get("set-cookie") ?? "").split(";")[0];
const tokenIn = (text: string) => decodeURIComponent(/token=([^\s&"]+)/.exec(text)![1]);
const account = async (address: string) => {
  expect((await signup.POST(post("/api/auth/signup/", { email: address, password: "correct horse" }))).status).toBe(200);
};
const ask = (address: string, extra: object = {}) => magic.POST(post("/api/auth/magic/", { email: address, ...extra }));

describe("sign-in links", () => {
  it("answers the same for unknown emails and sends nothing", async () => {
    const before = email.outbox().length;
    const res = await ask("nobody-magic@example.com");
    expect((await res.json()).ok).toBe(true);
    expect(email.outbox().length).toBe(before);
  });

  it("signs in once, confirms the email and sets a session", async () => {
    await account("m1@example.com");
    const sent = email.outbox().length;
    expect((await ask("M1@example.com")).status).toBe(200);
    expect(email.outbox().length).toBe(sent + 1);
    const mail = email.outbox().at(-1)!;
    expect(mail.text).toContain("/account/magic/?token=");
    const token = tokenIn(mail.text);

    const done = await verify.POST(post("/api/auth/magic/verify/", { token }));
    expect(done.status).toBe(200);
    expect((await done.json()).family.account.verified).toBe(true);
    const cookie = cookieOf(done);
    expect((await me.GET(new Request("http://localhost/api/auth/me/", { headers: { cookie } }))).status).toBe(200);
    expect((await verify.POST(post("/api/auth/magic/verify/", { token }))).status).toBe(400);
  });

  it("sends teachers back to the teacher area", async () => {
    await account("m2@example.com");
    await ask("m2@example.com", { to: "teachers" });
    expect(email.outbox().at(-1)!.text).toContain("&to=teachers");
  });

  it("rejects expired tokens and tokens of another kind", async () => {
    await account("m3@example.com");
    const [row] = await dbm.query<{ id: string }>("SELECT id FROM parents WHERE email = ?", ["m3@example.com"]);
    expect((await verify.POST(post("/api/auth/magic/verify/", { token: await auth.createAuthToken(row.id, "magic", -1000) }))).status).toBe(400);
    expect((await verify.POST(post("/api/auth/magic/verify/", { token: await auth.createAuthToken(row.id, "reset", 60_000) }))).status).toBe(400);
  });

  it("is not sent to admin accounts or accounts with two-step sign-in", async () => {
    await account("boss-magic@example.com");
    await account("twostep-magic@example.com");
    await dbm.run("UPDATE parents SET totp_enabled_at = ? WHERE email = ?", [Date.now(), "twostep-magic@example.com"]);
    const before = email.outbox().length;
    await ask("boss-magic@example.com");
    await ask("twostep-magic@example.com");
    expect(email.outbox().length).toBe(before);
  });

  it("refuses a link sent before the account turned on two-step sign-in", async () => {
    await account("m4@example.com");
    const [row] = await dbm.query<{ id: string }>("SELECT id FROM parents WHERE email = ?", ["m4@example.com"]);
    const token = await auth.createAuthToken(row.id, "magic", 60_000);
    await dbm.run("UPDATE parents SET totp_enabled_at = ? WHERE id = ?", [Date.now(), row.id]);
    expect((await verify.POST(post("/api/auth/magic/verify/", { token }))).status).toBe(400);
  });

  it("limits requests per address", async () => {
    await account("m5@example.com");
    const before = email.outbox().length;
    for (let i = 0; i < 5; i++) await ask("m5@example.com");
    expect(email.outbox().length - before).toBe(3);
  });
});
