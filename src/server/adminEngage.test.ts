import { createHmac } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { missingSocialPlatforms } from "@/lib/brand";

// The admin panel's engagement tools: the email log and Resend's delivery reports, emailing one family or a
// group, the to-do list and the inbox. Real route handlers against a throwaway SQLite file; email goes to the
// test outbox, and Resend's API is a stubbed fetch.

const dir = mkdtempSync(join(tmpdir(), "grademap-engage-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
delete process.env.RESEND_API_KEY;
delete process.env.EMAIL_FROM;
delete process.env.RESEND_WEBHOOK_SECRET;
const ADMIN_EMAIL = "owner@example.com";
const DAY = 86_400_000;

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, login: Mod, users: Mod, emailRoute: Mod, queue: Mod, inbox: Mod, webhook: Mod, unsub: Mod;
let dbm: typeof import("@/server/db");
let email: typeof import("@/server/email");

beforeAll(async () => {
  [signup, login, users, emailRoute, queue, inbox, webhook, unsub] = (await Promise.all([
    import("@/app/api/auth/signup/route"),
    import("@/app/api/auth/login/route"),
    import("@/app/api/admin/users/route"),
    import("@/app/api/admin/email/route"),
    import("@/app/api/admin/queue/route"),
    import("@/app/api/admin/inbox/route"),
    import("@/app/api/email/webhook/route"),
    import("@/app/api/email/unsubscribe/route"),
  ])) as unknown as Mod[];
  dbm = await import("@/server/db");
  email = await import("@/server/email");
});
beforeEach(() => {
  process.env.ADMIN_EMAILS = ADMIN_EMAIL;
});
afterAll(() => rmSync(dir, { recursive: true, force: true }));

let ip = 0;
function req(path: string, method = "GET", body?: unknown, cookie?: string, headers: Record<string, string> = {}): Request {
  return new Request(`http://localhost${path}`, {
    method,
    headers: { "content-type": "application/json", host: "localhost", "x-forwarded-for": `10.3.0.${++ip % 250}`, ...(cookie ? { cookie } : {}), ...headers },
    body: body === undefined ? undefined : typeof body === "string" ? body : JSON.stringify(body),
  });
}
const cookieOf = (res: Response) => (res.headers.get("set-cookie") ?? "").split(";")[0];

async function account(address: string, opts: { verified?: boolean; createdAgo?: number } = {}) {
  const res = await signup.POST(req("/api/auth/signup/", "POST", { email: address, password: "correct horse" }));
  expect(res.status).toBe(200);
  if (opts.verified !== false) await dbm.run("UPDATE parents SET email_verified_at = ? WHERE email = ?", [Date.now() - 60_000, address]);
  const familyId = (await dbm.query<{ family_id: string }>("SELECT family_id FROM parents WHERE email = ?", [address]))[0].family_id;
  if (opts.createdAgo) await dbm.run("UPDATE families SET created_at = ? WHERE id = ?", [Date.now() - opts.createdAgo, familyId]);
  return { cookie: cookieOf(res), familyId };
}
const addChild = (familyId: string, name: string) =>
  dbm.run("INSERT INTO profiles (id, family_id, data, updated_at) VALUES (?, ?, ?, ?)", [`p-${familyId}-${name}`, familyId, JSON.stringify({ name, grade: "3" }), Date.now()]);
const practise = (familyId: string, t = Date.now()) =>
  dbm.run("INSERT INTO events (id, family_id, profile_id, t, data) VALUES (?, ?, ?, ?, ?)", [`e-${familyId}-${t}-${Math.random()}`, familyId, "p", t, "{}"]);

let admin: { cookie: string; familyId: string };
beforeAll(async () => {
  admin = await account(ADMIN_EMAIL);
});
const get = (mod: Mod, path: string, cookie = admin.cookie) => mod.GET(req(path, "GET", undefined, cookie));
const post = (mod: Mod, path: string, body: unknown, cookie = admin.cookie) => mod.POST(req(path, "POST", body, cookie));
const message = { subject: "Ollie misses {children}!", body: "Hi,\n\n{children} can pick up where they left off in {app}.", button: { label: "Play now", path: "/play/" } };

describe("who can use it", () => {
  it("answers 404 to anyone who isn't an admin", async () => {
    const other = await account("not-admin@example.com");
    for (const [mod, path] of [
      [emailRoute, "/api/admin/email/"],
      [queue, "/api/admin/queue/"],
      [inbox, "/api/admin/inbox/"],
    ] as const) {
      expect((await get(mod, path, other.cookie)).status).toBe(404);
      expect((await post(mod, path, {}, other.cookie)).status).toBe(404);
    }
  });
});

describe("the email log", () => {
  it("records account emails against the family, without bodies", async () => {
    const a = await account("log@example.com", { verified: false });
    const rows = await dbm.query<Record<string, unknown>>("SELECT * FROM email_log WHERE family_id = ?", [a.familyId]);
    expect(rows).toHaveLength(1);
    expect(rows[0]).toMatchObject({ kind: "verify", status: "skipped" });
    expect(Object.keys(rows[0])).not.toContain("html");
    const res = (await (await get(emailRoute, `/api/admin/email/?familyId=${a.familyId}`)).json()) as { emails: { kind: string; email: string }[] };
    expect(res.emails).toEqual([expect.objectContaining({ kind: "verify", email: "log@example.com" })]);
  });

  it("doesn't log mail to an address with no account", async () => {
    const before = (await dbm.query<{ n: number }>("SELECT COUNT(*) AS n FROM email_log"))[0].n;
    await email.sendEmail({ to: "stranger@example.com", subject: "Hi", html: "", text: "", kind: "admin" });
    expect((await dbm.query<{ n: number }>("SELECT COUNT(*) AS n FROM email_log"))[0].n).toBe(before);
  });

  it("is deleted with the family", async () => {
    const a = await account("gone@example.com", { verified: false });
    const { deleteFamilyData } = await import("@/server/deleteFamily");
    await deleteFamilyData(a.familyId);
    expect(await dbm.query("SELECT 1 FROM email_log WHERE family_id = ?", [a.familyId])).toHaveLength(0);
  });
});

describe("Resend delivery reports", () => {
  const secret = `whsec_${Buffer.from("engage-test-secret").toString("base64")}`;
  const sign = (body: string, id = "msg_1", ts = Math.floor(Date.now() / 1000)) => ({
    "svix-id": id,
    "svix-timestamp": String(ts),
    "svix-signature": `v1,${createHmac("sha256", Buffer.from("engage-test-secret")).update(`${id}.${ts}.${body}`).digest("base64")}`,
  });
  const event = (type: string, emailId: string) => JSON.stringify({ type, data: { email_id: emailId } });
  const hook = (body: string, headers: Record<string, string>) => webhook.POST(req("/api/email/webhook/", "POST", body, undefined, headers));
  afterEach(() => {
    delete process.env.RESEND_WEBHOOK_SECRET;
  });

  it("is off without a secret and refuses bad signatures", async () => {
    const body = event("email.delivered", "re_x");
    expect((await hook(body, sign(body))).status).toBe(404);
    process.env.RESEND_WEBHOOK_SECRET = secret;
    expect((await hook(body, { ...sign(body), "svix-signature": "v1,AAAA" })).status).toBe(400);
    expect((await hook(body, sign(body, "msg_1", Math.floor(Date.now() / 1000) - 3600))).status).toBe(400);
  });

  it("updates the status, never back down, and stops panel email after a bounce", async () => {
    process.env.RESEND_WEBHOOK_SECRET = secret;
    const a = await account("bounce@example.com");
    const { logEmail } = await import("@/server/emailLog");
    await logEmail({ to: "bounce@example.com", subject: "x", html: "", text: "", kind: "weekly" }, "sent", "re_bounce");
    const status = async () => (await dbm.query<{ status: string }>("SELECT status FROM email_log WHERE provider_id = ?", ["re_bounce"]))[0].status;
    for (const [type, want] of [
      ["email.delivery_delayed", "delayed"],
      ["email.delivered", "delivered"],
      ["email.delivery_delayed", "delivered"],
      ["email.bounced", "bounced"],
    ]) {
      const body = event(type, "re_bounce");
      expect((await hook(body, sign(body))).status).toBe(200);
      expect(await status()).toBe(want);
    }
    const r = (await (await post(emailRoute, "/api/admin/email/", { action: "send", familyId: a.familyId, message })).json()) as { error: string };
    expect(r.error).toMatch(/bounced/);
  });

  it("turns off news and tips after a spam complaint", async () => {
    process.env.RESEND_WEBHOOK_SECRET = secret;
    await account("spam@example.com");
    const { logEmail } = await import("@/server/emailLog");
    await logEmail({ to: "spam@example.com", subject: "x", html: "", text: "", kind: "admin" }, "sent", "re_spam");
    const body = event("email.complained", "re_spam");
    await hook(body, sign(body));
    const p = (await dbm.query<{ admin_mail: number; email_bounced_at: number | null }>("SELECT admin_mail, email_bounced_at FROM parents WHERE email = ?", ["spam@example.com"]))[0];
    expect(Number(p.admin_mail)).toBe(0);
    expect(p.email_bounced_at).not.toBeNull();
  });
});

describe("emailing one family", () => {
  it("fills in the children's names in the email only, with an unsubscribe link", async () => {
    const a = await account("one@example.com");
    await addChild(a.familyId, "Mia");
    await addChild(a.familyId, "Leo");
    const before = email.outbox().length;
    expect((await post(emailRoute, "/api/admin/email/", { action: "send", familyId: a.familyId, message })).status).toBe(200);
    const sent = email.outbox().slice(before);
    expect(sent).toHaveLength(1);
    expect(sent[0]).toMatchObject({ to: "one@example.com", subject: "Ollie misses Mia and Leo!", kind: "admin", sentBy: ADMIN_EMAIL });
    expect(sent[0].text).toContain("http://localhost/play/");
    expect(sent[0].unsubscribeUrl).toMatch(/kind=updates/);
    // The log keeps the subject as written, so names never reach the panel.
    const log = (await (await get(emailRoute, `/api/admin/email/?familyId=${a.familyId}&kind=admin`)).json()) as { emails: { label: string; sentBy: string }[] };
    expect(log.emails[0]).toMatchObject({ label: "Ollie misses {children}!", sentBy: ADMIN_EMAIL });
    expect(JSON.stringify(log)).not.toContain("Mia");
  });

  it("refuses unconfirmed and unsubscribed accounts, bad messages and unknown families", async () => {
    const unconfirmed = await account("unconf@example.com", { verified: false });
    expect((await post(emailRoute, "/api/admin/email/", { action: "send", familyId: unconfirmed.familyId, message })).status).toBe(400);

    const a = await account("unsub@example.com");
    const { unsubscribeToken } = await import("@/server/auth");
    const parentId = (await dbm.query<{ id: string }>("SELECT id FROM parents WHERE email = ?", ["unsub@example.com"]))[0].id;
    expect((await unsub.POST(req(`/api/email/unsubscribe/?kind=updates&token=${await unsubscribeToken(parentId)}`, "POST"))).status).toBe(200);
    expect(((await (await post(emailRoute, "/api/admin/email/", { action: "send", familyId: a.familyId, message })).json()) as { error: string }).error).toMatch(/turned off/);

    expect((await post(emailRoute, "/api/admin/email/", { action: "send", familyId: "nope", message })).status).toBe(404);
    for (const bad of [{ ...message, subject: "" }, { ...message, button: { label: "Go", path: "https://evil.example/" } }, { ...message, button: { label: "Go", path: "//evil.example/" } }, null])
      expect((await post(emailRoute, "/api/admin/email/", { action: "send", familyId: a.familyId, message: bad })).status).toBe(400);
  });

  it("resends the real confirmation email, and only while unconfirmed", async () => {
    const a = await account("resend-verify@example.com", { verified: false });
    const before = email.outbox().length;
    expect((await post(emailRoute, "/api/admin/email/", { action: "verify", familyId: a.familyId })).status).toBe(200);
    expect(email.outbox().slice(before)[0]).toMatchObject({ to: "resend-verify@example.com", kind: "verify" });
    await dbm.run("UPDATE parents SET email_verified_at = ? WHERE email = ?", [Date.now(), "resend-verify@example.com"]);
    expect((await post(emailRoute, "/api/admin/email/", { action: "verify", familyId: a.familyId })).status).toBe(400);
  });
});

describe("emailing a group", () => {
  it("previews who it reaches, needs the count typed back, and skips families emailed recently", async () => {
    const quiet = await account("quiet-a@example.com");
    await practise(quiet.familyId, Date.now() - 10 * DAY);
    const quiet2 = await account("quiet-b@example.com", { verified: false });
    await practise(quiet2.familyId, Date.now() - 10 * DAY);

    const preview = (await (await get(emailRoute, "/api/admin/email/?segment=quiet-7")).json()) as { batch: number; ready: number; skipped: Record<string, number>; sample: { email: string }[] };
    expect(preview).toMatchObject({ batch: 1, ready: 1 });
    expect(preview.skipped.unconfirmed).toBe(1);
    expect(preview.sample.map((s) => s.email)).toEqual(["quiet-a@example.com"]);
    expect((await get(emailRoute, "/api/admin/email/?segment=made-up")).status).toBe(400);

    const before = email.outbox().length;
    expect((await post(emailRoute, "/api/admin/email/", { action: "send-segment", segment: "quiet-7", message, confirm: "SEND 2" })).status).toBe(400);
    expect((await post(emailRoute, "/api/admin/email/", { action: "send-segment", segment: "quiet-7", message })).status).toBe(400);
    expect(email.outbox().length).toBe(before);

    const res = await post(emailRoute, "/api/admin/email/", { action: "send-segment", segment: "quiet-7", message, confirm: "SEND 1" });
    expect(await res.json()).toEqual({ sent: 1, failed: 0, remaining: 0 });
    expect(email.outbox().slice(before).map((e) => e.to)).toEqual(["quiet-a@example.com"]);

    // Sending again within a few days reaches nobody new.
    const again = (await (await get(emailRoute, "/api/admin/email/?segment=quiet-7")).json()) as { batch: number; skipped: Record<string, number> };
    expect(again.batch).toBe(0);
    expect(again.skipped.recent).toBe(1);
    expect((await post(emailRoute, "/api/admin/email/", { action: "send-segment", segment: "quiet-7", message, confirm: "SEND 0" })).status).toBe(400);

    // A send that failed doesn't count, so the family can be tried again.
    await dbm.run("UPDATE email_log SET status = 'failed' WHERE family_id = ? AND kind = 'admin'", [quiet.familyId]);
    expect(((await (await get(emailRoute, "/api/admin/email/?segment=quiet-7")).json()) as { batch: number }).batch).toBe(1);
  });
});

describe("the to-do list", () => {
  type Item = { key: string; kind: string; familyId?: string; action: { type: string; preset?: string } };
  const items = async () => ((await (await get(queue, "/api/admin/queue/")).json()) as { items: Item[] }).items;

  it("lists families worth acting on, with the action that fits", async () => {
    const trial = await account("todo-trial@example.com");
    await dbm.run("UPDATE families SET trial_ends_at = ? WHERE id = ?", [Date.now() + 2 * DAY, trial.familyId]);
    await practise(trial.familyId);
    const never = await account("todo-never@example.com", { createdAgo: 5 * DAY });
    const unconfirmed = await account("todo-unconf@example.com", { verified: false, createdAgo: 4 * DAY });
    await dbm.run("UPDATE email_log SET sent_at = ? WHERE family_id = ?", [Date.now() - 4 * DAY, unconfirmed.familyId]);
    const pastDue = await account("todo-pastdue@example.com");
    await dbm.run("UPDATE families SET subscription_status = 'past_due', billing_event_at = ? WHERE id = ?", [Date.now() - DAY, pastDue.familyId]);
    await dbm.run("INSERT INTO question_reports (id, family_id, unit_key, prompt, reason, created_at) VALUES ('r1', NULL, 'u', 'p', 'wrong', ?)", [Date.now()]);

    const list = await items();
    const find = (familyId: string) => list.find((i) => i.familyId === familyId);
    expect(find(trial.familyId)).toMatchObject({ kind: "trial-ending", action: { type: "email", preset: "trial-ending" } });
    expect(find(never.familyId)).toMatchObject({ kind: "never-practised", action: { type: "email", preset: "getting-started" } });
    expect(find(unconfirmed.familyId)).toMatchObject({ kind: "unconfirmed", action: { type: "verify" } });
    expect(find(pastDue.familyId)).toMatchObject({ kind: "past-due", action: { type: "open" } });
    expect(list.find((i) => i.kind === "reports")).toBeTruthy();
    // The social accounts task waits until every chosen platform's URL is in SOCIAL_PROFILES.
    const social = list.find((i) => i.key === "setup:social");
    if (missingSocialPlatforms().length) expect(social).toMatchObject({ kind: "setup", action: { type: "task" } });
    else expect(social).toBeUndefined();
    // The admin's own new account isn't in it, and nothing is about a student account.
    expect(find(admin.familyId)).toBeUndefined();
  });

  it("drops a family once it is emailed from the panel, and can snooze or dismiss an item", async () => {
    const never = await account("todo-emailed@example.com", { createdAgo: 5 * DAY });
    expect((await items()).some((i) => i.familyId === never.familyId)).toBe(true);
    await post(emailRoute, "/api/admin/email/", { action: "send", familyId: never.familyId, message });
    expect((await items()).some((i) => i.familyId === never.familyId)).toBe(false);

    const other = await account("todo-snooze@example.com", { createdAgo: 5 * DAY });
    const key = `never-practised:${other.familyId}`;
    expect((await post(queue, "/api/admin/queue/", { key, days: 7 })).status).toBe(200);
    expect((await items()).some((i) => i.key === key)).toBe(false);
    await dbm.run("UPDATE admin_queue_hidden SET until = ? WHERE key = ?", [Date.now() - 1, key]);
    expect((await items()).some((i) => i.key === key)).toBe(true);
    expect((await post(queue, "/api/admin/queue/", { key, days: null })).status).toBe(200);
    expect((await items()).some((i) => i.key === key)).toBe(false);
    expect((await post(queue, "/api/admin/queue/", { key, days: 0 })).status).toBe(400);
    expect((await post(queue, "/api/admin/queue/", { key: "", days: 1 })).status).toBe(400);
  });
});

describe("users list", () => {
  it("shows last sign-in and last practice, and the family's emails", async () => {
    const a = await account("seen@example.com");
    await practise(a.familyId, Date.now() - DAY);
    expect((await login.POST(req("/api/auth/login/", "POST", { email: "seen@example.com", password: "correct horse" }))).status).toBe(200);
    const list = (await (await get(users, "/api/admin/users/?q=seen@example.com")).json()) as { users: { lastLogin: number | null; lastPractice: number | null }[] };
    expect(list.users[0].lastLogin).toBeGreaterThan(Date.now() - 60_000);
    expect(list.users[0].lastPractice).toBeLessThan(Date.now() - DAY / 2);
    const detail = (await (await get(users, `/api/admin/users/?id=${a.familyId}`)).json()) as { parents: { newsAndTips: boolean; lastLogin: number }[]; emails: unknown[] };
    expect(detail.parents[0]).toMatchObject({ newsAndTips: true });
    expect(detail.emails.length).toBeGreaterThan(0);
  });
});

describe("the inbox", () => {
  const received = { id: "rcv-1", from: "Pat <todo-trial@example.com>", to: ["hello@example.com"], subject: "A question", created_at: new Date().toISOString(), attachments: [] };
  let sent: { url: string; body: Record<string, unknown> }[] = [];
  beforeEach(() => {
    process.env.RESEND_API_KEY = "re_test";
    process.env.EMAIL_FROM = "App <hello@example.com>";
    process.env.RESEND_API_BASE = "https://resend.test";
    process.env.RESEND_API_URL = "https://resend.test/emails";
    sent = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (url: string, init?: RequestInit) => {
        if (init?.method === "POST") {
          sent.push({ url, body: JSON.parse(String(init.body)) });
          return new Response(JSON.stringify({ id: "re_reply" }));
        }
        if (url.startsWith("https://resend.test/emails/receiving?")) return new Response(JSON.stringify({ data: [received], has_more: false }));
        if (url === "https://resend.test/emails/receiving/rcv-1")
          return new Response(JSON.stringify({ ...received, html: "<p>Hi &amp; hello</p><script>alert(1)</script><p>Line two</p>", text: null, message_id: "<abc@mail>" }));
        return new Response("{}", { status: 404 });
      }),
    );
  });
  afterEach(() => {
    vi.unstubAllGlobals();
    for (const k of ["RESEND_API_KEY", "EMAIL_FROM", "RESEND_API_BASE", "RESEND_API_URL"]) delete process.env[k];
  });

  it("says when email isn't set up", async () => {
    delete process.env.RESEND_API_KEY;
    expect(await (await get(inbox, "/api/admin/inbox/")).json()).toMatchObject({ configured: false, items: [] });
    expect(await (await get(inbox, "/api/admin/inbox/?count=1")).json()).toMatchObject({ waiting: 0 });
  });

  it("lists received mail, matched to the account, and shows it as plain text", async () => {
    const list = (await (await get(inbox, "/api/admin/inbox/")).json()) as { items: { id: string; fromEmail: string; familyId: string | null }[] };
    expect(list.items[0]).toMatchObject({ id: "rcv-1", fromEmail: "todo-trial@example.com" });
    expect(list.items[0].familyId).toBeTruthy();
    const one = (await (await get(inbox, "/api/admin/inbox/?id=rcv-1")).json()) as { message: { text: string } };
    expect(one.message.text).toBe("Hi & hello\nLine two");
    expect((await get(inbox, "/api/admin/inbox/?id=../x")).status).toBe(400);
    // Unanswered mail shows on the to-do list.
    const todo = ((await (await get(queue, "/api/admin/queue/")).json()) as { items: { key: string }[] }).items;
    expect(todo[0].key).toBe("inbox:rcv-1");
  });

  it("replies in the same thread and marks the message answered", async () => {
    expect((await post(inbox, "/api/admin/inbox/", { action: "reply", id: "rcv-1", text: "" })).status).toBe(400);
    expect((await post(inbox, "/api/admin/inbox/", { action: "reply", id: "rcv-1", text: "Thanks <b>Pat</b>!" })).status).toBe(200);
    expect(sent).toHaveLength(1);
    expect(sent[0].body).toMatchObject({ to: ["todo-trial@example.com"], subject: "Re: A question", headers: { "In-Reply-To": "<abc@mail>", References: "<abc@mail>" } });
    expect(String(sent[0].body.html)).toContain("Thanks &lt;b&gt;Pat&lt;/b&gt;!");
    const list = (await (await get(inbox, "/api/admin/inbox/")).json()) as { items: { repliedAt: number | null }[] };
    expect(list.items[0].repliedAt).not.toBeNull();
    const todo = ((await (await get(queue, "/api/admin/queue/")).json()) as { items: { key: string }[] }).items;
    expect(todo.some((i) => i.key === "inbox:rcv-1")).toBe(false);
  });

  it("can be marked done and waiting again", async () => {
    const count = async () => ((await (await get(inbox, "/api/admin/inbox/?count=1")).json()) as { waiting: number }).waiting;
    await post(inbox, "/api/admin/inbox/", { action: "handled", id: "rcv-1", handled: false });
    await dbm.run("UPDATE inbox_state SET replied_at = NULL WHERE email_id = 'rcv-1'");
    expect(((await (await get(inbox, "/api/admin/inbox/")).json()) as { items: { handledAt: number | null }[] }).items[0].handledAt).toBeNull();
    expect(await count()).toBe(1);
    await post(inbox, "/api/admin/inbox/", { action: "handled", id: "rcv-1" });
    expect(((await (await get(inbox, "/api/admin/inbox/")).json()) as { items: { handledAt: number | null }[] }).items[0].handledAt).not.toBeNull();
    expect(await count()).toBe(0);
  });

  it("archives and restores a message, which then leaves the count and the to-do list", async () => {
    const count = async () => ((await (await get(inbox, "/api/admin/inbox/?count=1")).json()) as { waiting: number }).waiting;
    const listed = async () => ((await (await get(inbox, "/api/admin/inbox/")).json()) as { items: { archivedAt: number | null }[] }).items[0];
    const todo = async () => ((await (await get(queue, "/api/admin/queue/")).json()) as { items: { key: string }[] }).items.some((i) => i.key === "inbox:rcv-1");
    await dbm.run("UPDATE inbox_state SET handled_at = NULL, replied_at = NULL WHERE email_id = 'rcv-1'");
    expect(await count()).toBe(1);
    expect(await todo()).toBe(true);
    expect((await post(inbox, "/api/admin/inbox/", { action: "archive", id: "rcv-1" })).status).toBe(200);
    expect((await listed()).archivedAt).not.toBeNull();
    expect(await count()).toBe(0);
    expect(await todo()).toBe(false);
    await post(inbox, "/api/admin/inbox/", { action: "archive", id: "rcv-1", archived: false });
    expect((await listed()).archivedAt).toBeNull();
    expect(await count()).toBe(1);
  });

  it("drafts a reply with Claude only when asked, without sending anything", async () => {
    const one = async () => (await (await get(inbox, "/api/admin/inbox/?id=rcv-1")).json()) as { canDraft: boolean };
    expect((await one()).canDraft).toBe(false);
    expect((await post(inbox, "/api/admin/inbox/", { action: "draft", id: "rcv-1" })).status).toBe(400);
    process.env.ANTHROPIC_API_KEY = "sk-ant-test";
    process.env.ANTHROPIC_API_BASE = "https://anthropic.test";
    try {
      expect((await one()).canDraft).toBe(true);
      const real = fetch;
      const asked: Record<string, unknown>[] = [];
      vi.stubGlobal(
        "fetch",
        vi.fn(async (url: string, init?: RequestInit) => {
          if (url === "https://anthropic.test/v1/messages") {
            asked.push(JSON.parse(String(init!.body)));
            expect((init!.headers as Record<string, string>)["x-api-key"]).toBe("sk-ant-test");
            return new Response(JSON.stringify({ stop_reason: "end_turn", content: [{ type: "thinking", thinking: "" }, { type: "text", text: "Hi Pat,\n\nHappy to help." }] }));
          }
          return real(url, init);
        }),
      );
      const res = await post(inbox, "/api/admin/inbox/", { action: "draft", id: "rcv-1" });
      expect(await res.json()).toEqual({ draft: "Hi Pat,\n\nHappy to help." });
      // The email goes in the user turn, the help page and saved replies in the system prompt.
      expect(asked).toHaveLength(1);
      expect(JSON.stringify(asked[0].messages)).toContain("Hi & hello");
      expect(JSON.stringify(asked[0].system)).toContain("How do I start?");
      expect(JSON.stringify(asked[0].system)).toContain("Billing and cancelling");
      // Nothing was emailed and the message isn't marked answered.
      expect(sent).toHaveLength(0);
      const list = (await (await get(inbox, "/api/admin/inbox/")).json()) as { items: { repliedAt: number | null }[] };
      expect(list.items[0].repliedAt).toBeNull();
      expect((await dbm.query<{ action: string }>("SELECT action FROM admin_audit WHERE action = 'inbox.draft'")).length).toBe(1);

      vi.stubGlobal(
        "fetch",
        vi.fn(async (url: string, init?: RequestInit) => (url.startsWith("https://anthropic.test") ? new Response(JSON.stringify({ stop_reason: "refusal", content: [] })) : real(url, init))),
      );
      const refused = await post(inbox, "/api/admin/inbox/", { action: "draft", id: "rcv-1" });
      expect(refused.status).toBe(502);
      expect(((await refused.json()) as { error: string }).error).toMatch(/wouldn't draft/);
    } finally {
      delete process.env.ANTHROPIC_API_KEY;
      delete process.env.ANTHROPIC_API_BASE;
    }
  });

  it("reports a Resend error instead of failing", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 403 })));
    const res = await get(inbox, "/api/admin/inbox/");
    expect(res.status).toBe(502);
    expect(((await res.json()) as { error: string }).error).toMatch(/full access/);
  });
});
