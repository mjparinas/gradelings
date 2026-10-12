import { createHmac } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

// The admin panel's action tools: alerts and the morning digest, automatic nudges, billing actions (refunds,
// cancelling, the failed-payment email), the sign-up funnel, saved replies and CSV downloads. Real route
// handlers against a throwaway SQLite file; email goes to the test outbox and Stripe is a stubbed fetch.

const dir = mkdtempSync(join(tmpdir(), "grademap-tools-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
const KEYS = ["RESEND_API_KEY", "EMAIL_FROM", "STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "CRON_SECRET", "GITHUB_TOKEN", "VERCEL_TOKEN", "SENTRY_AUTH_TOKEN", "NEXT_PUBLIC_SITE_URL"];
const saved = Object.fromEntries(KEYS.map((k) => [k, process.env[k]]));
const ADMIN_EMAIL = "owner@example.com";
const DAY = 86_400_000;

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, automations: Mod, billing: Mod, funnel: Mod, replies: Mod, exportRoute: Mod, cron: Mod, watch: Mod, webhook: Mod;
let dbm: typeof import("@/server/db");
let email: typeof import("@/server/email");
let alerts: typeof import("@/server/alerts");
let auto: typeof import("@/server/automations");
let health: typeof import("@/server/systemHealth");

beforeAll(async () => {
  for (const k of KEYS) delete process.env[k];
  [signup, automations, billing, funnel, replies, exportRoute, cron, watch, webhook] = (await Promise.all([
    import("@/app/api/auth/signup/route"),
    import("@/app/api/admin/automations/route"),
    import("@/app/api/admin/billing/route"),
    import("@/app/api/admin/funnel/route"),
    import("@/app/api/admin/replies/route"),
    import("@/app/api/admin/export/route"),
    import("@/app/api/cron/weekly/route"),
    import("@/app/api/cron/watch/route"),
    import("@/app/api/billing/webhook/route"),
  ])) as unknown as Mod[];
  dbm = await import("@/server/db");
  email = await import("@/server/email");
  alerts = await import("@/server/alerts");
  auto = await import("@/server/automations");
  health = await import("@/server/systemHealth");
});
beforeEach(() => {
  process.env.ADMIN_EMAILS = ADMIN_EMAIL;
  email.outbox().length = 0;
  health.clearSystemCache();
  // No network: every outside service looks unreachable unless a test stubs it.
  vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 503 })));
});
afterEach(() => {
  vi.unstubAllGlobals();
  for (const k of ["STRIPE_SECRET_KEY", "STRIPE_WEBHOOK_SECRET", "CRON_SECRET"]) delete process.env[k];
});
afterAll(() => {
  for (const [k, v] of Object.entries(saved)) if (v === undefined) delete process.env[k];
  else process.env[k] = v;
  rmSync(dir, { recursive: true, force: true });
});

let ip = 0;
function req(path: string, method = "GET", body?: unknown, cookie?: string, headers: Record<string, string> = {}): Request {
  return new Request(`http://localhost${path}`, {
    method,
    headers: { "content-type": "application/json", host: "localhost", "x-forwarded-for": `10.5.0.${++ip % 250}`, ...(cookie ? { cookie } : {}), ...headers },
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
  // Signing up sends the confirmation email; drop it so tests count only what the tools send.
  const box = email.outbox();
  box.splice(0, box.length, ...box.filter((m) => m.to !== address));
  return { cookie: cookieOf(res), familyId };
}
const addChild = (familyId: string, name = "Sam") =>
  dbm.run("INSERT INTO profiles (id, family_id, data, updated_at) VALUES (?, ?, ?, ?)", [`p-${familyId}-${name}`, familyId, JSON.stringify({ name, grade: "3" }), Date.now()]);
const practise = (familyId: string, t: number) => dbm.run("INSERT INTO events (id, family_id, profile_id, t, data) VALUES (?, ?, ?, ?, ?)", [`e-${familyId}-${t}-${Math.random()}`, familyId, "p", t, "{}"]);
const sentTo = (address: string) => email.outbox().filter((m) => m.to === address);

let admin: { cookie: string; familyId: string };
beforeAll(async () => {
  admin = await account(ADMIN_EMAIL);
});
const get = (mod: Mod, path: string, cookie = admin.cookie) => mod.GET(req(path, "GET", undefined, cookie));
const post = (mod: Mod, path: string, body: unknown, cookie = admin.cookie) => mod.POST(req(path, "POST", body, cookie));

describe("who can use them", () => {
  it("answers 404 to anyone who isn't an admin", async () => {
    const other = await account("not-admin@example.com");
    for (const [mod, path] of [
      [automations, "/api/admin/automations/"],
      [billing, `/api/admin/billing/?familyId=${other.familyId}`],
      [funnel, "/api/admin/funnel/"],
      [replies, "/api/admin/replies/"],
      [exportRoute, "/api/admin/export/?type=users"],
    ] as const) {
      expect((await get(mod, path, other.cookie)).status).toBe(404);
    }
    expect((await post(automations, "/api/admin/automations/", { action: "alerts", instant: false, digest: false }, other.cookie)).status).toBe(404);
    expect((await post(billing, "/api/admin/billing/", { familyId: other.familyId, action: "card-email" }, other.cookie)).status).toBe(404);
    expect(sentTo("not-admin@example.com")).toHaveLength(0);
  });
});

describe("alerts", () => {
  it("go only to confirmed admin accounts, at most once in a few hours", async () => {
    await account("second-admin@example.com", { verified: false });
    process.env.ADMIN_EMAILS = `${ADMIN_EMAIL},second-admin@example.com`;
    const t = Date.now();
    expect(await alerts.sendAlert("test-a", { subject: "Something broke", lines: ["Details."] }, t)).toBe(true);
    expect(sentTo(ADMIN_EMAIL).map((m) => m.subject)).toEqual(["Alert: Something broke"]);
    expect(sentTo("second-admin@example.com")).toHaveLength(0);
    expect(await alerts.sendAlert("test-a", { subject: "Something broke", lines: [] }, t + 60_000)).toBe(false);
    expect(await alerts.sendAlert("test-a", { subject: "Something broke", lines: [] }, t + alerts.ALERT_GAP + 1)).toBe(true);
  });

  it("can be turned off, and the setting is in the change log", async () => {
    expect(await (await get(automations, "/api/admin/automations/")).json()).toMatchObject({ alerts: { instant: true, digest: true }, alertRecipients: 1 });
    expect((await post(automations, "/api/admin/automations/", { action: "alerts", instant: false, digest: true })).status).toBe(200);
    expect(await alerts.sendAlert("test-b", { subject: "Quiet", lines: [] })).toBe(false);
    expect((await dbm.query<{ action: string }>("SELECT action FROM admin_audit ORDER BY id DESC LIMIT 1"))[0].action).toBe("alerts.save");
    await post(automations, "/api/admin/automations/", { action: "alerts", instant: true, digest: true });
  });

  it("tell the admins when a payment fails, with a link to the family", async () => {
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_tools";
    const payer = await account("payer@example.com");
    await dbm.run("UPDATE families SET stripe_customer = 'cus_fail' WHERE id = ?", [payer.familyId]);
    const payload = JSON.stringify({ id: `evt_${Math.random()}`, created: Math.floor(Date.now() / 1000), type: "invoice.payment_failed", data: { object: { id: "in_x", customer: "cus_fail", amount_due: 1499, currency: "cad", attempt_count: 2 } } });
    const ts = Math.floor(Date.now() / 1000);
    const sig = `t=${ts},v1=${createHmac("sha256", "whsec_tools").update(`${ts}.${payload}`).digest("hex")}`;
    const res = await webhook.POST(new Request("http://localhost/api/billing/webhook/", { method: "POST", headers: { "stripe-signature": sig }, body: payload }));
    expect(res.status).toBe(200);
    const mail = sentTo(ADMIN_EMAIL).at(-1)!;
    expect(mail.subject).toBe("Alert: A payment failed for payer@example.com");
    expect(mail.text).toContain("14.99 CAD (attempt 2)");
    expect(mail.text).toContain(`/admin/?family=${payer.familyId}`);
  });

  it("watch the System checks: an alert when one goes down, and when it's working again", async () => {
    process.env.CRON_SECRET = "watch-secret";
    expect((await watch.GET(req("/api/cron/watch/"))).status).toBe(401);
    const first = await (await watch.GET(req("/api/cron/watch/", "GET", undefined, undefined, { authorization: "Bearer watch-secret" }))).json();
    // With no settings in tests, the Settings check is down (required settings missing).
    expect(first.down).toContain("settings");
    expect(sentTo(ADMIN_EMAIL).at(-1)!.subject).toMatch(/^Alert: .*Settings.* down$/);
    const n = sentTo(ADMIN_EMAIL).length;
    await watch.GET(req("/api/cron/watch/", "GET", undefined, undefined, { authorization: "Bearer watch-secret" }));
    expect(sentTo(ADMIN_EMAIL)).toHaveLength(n);
    // Pretend the database had been down: it's working now, so the admins hear it recovered.
    await dbm.run("UPDATE admin_settings SET value = ? WHERE key = 'alert:down'", [JSON.stringify(["settings", "database"])]);
    await watch.GET(req("/api/cron/watch/", "GET", undefined, undefined, { authorization: "Bearer watch-secret" }));
    expect(sentTo(ADMIN_EMAIL).at(-1)!.subject).toBe("Alert: Database working again");
  });

  it("send the morning digest from the daily job, with counts and no children's names", async () => {
    process.env.CRON_SECRET = "cron-secret";
    const fam = await account("digest-family@example.com", { createdAgo: 5 * DAY });
    await addChild(fam.familyId, "Zelda");
    const res = await cron.GET(req("/api/cron/weekly/", "GET", undefined, undefined, { authorization: "Bearer cron-secret" }));
    expect(res.status).toBe(200);
    expect((await res.json()).digest).toBe(1);
    const mail = sentTo(ADMIN_EMAIL).find((m) => m.subject.startsWith("Today: "))!;
    expect(mail.text).toContain("Last 24 hours:");
    expect(mail.text).toContain("Signed up, never practised");
    expect(mail.text).not.toContain("Zelda");
  });

  it("tell the admins when the daily job fails", async () => {
    process.env.CRON_SECRET = "cron-secret";
    await dbm.run("DELETE FROM admin_settings WHERE key LIKE 'alert-sent:job-failed'");
    const spy = vi.spyOn(auto, "runAutomations").mockRejectedValueOnce(new Error("boom"));
    await expect(cron.GET(req("/api/cron/weekly/", "GET", undefined, undefined, { authorization: "Bearer cron-secret" }))).rejects.toThrow("boom");
    spy.mockRestore();
    expect(sentTo(ADMIN_EMAIL).at(-1)!.subject).toBe("Alert: The daily email job failed");
  });
});

describe("automatic nudges", () => {
  const nudge = (body: Record<string, unknown>) => post(automations, "/api/admin/automations/", { id: "no-child", ...body });

  it("start off, and only turn on with TURN ON typed", async () => {
    const r = await (await get(automations, "/api/admin/automations/")).json();
    expect(r.automations.map((a: { id: string }) => a.id)).toEqual(["quiet-7", "no-child", "tried-few", "trial-over"]);
    expect(r.automations.every((a: { config: { on: boolean } }) => !a.config.on)).toBe(true);
    expect((await nudge({ action: "switch", on: true })).status).toBe(400);
    expect((await nudge({ action: "switch", on: true, confirm: "turn on" })).status).toBe(400);
    expect((await post(automations, "/api/admin/automations/", { id: "nope", action: "switch", on: true, confirm: "TURN ON" })).status).toBe(404);
  });

  it("send nothing while off", async () => {
    const quiet = await account("no-child-1@example.com", { createdAgo: 4 * DAY });
    expect(await auto.runAutomations("http://localhost")).toEqual({});
    expect(sentTo("no-child-1@example.com")).toHaveLength(0);
    const status = (await auto.automationStatuses()).find((s) => s.id === "no-child")!;
    expect(status.waiting).toBeGreaterThanOrEqual(1);
    void quiet;
  });

  it("once on, send up to the daily limit, once a month each, and log who sent them", async () => {
    await account("no-child-2@example.com", { createdAgo: 3 * DAY });
    await account("no-child-3@example.com", { createdAgo: 3 * DAY });
    expect((await nudge({ action: "save", message: { subject: "Add {children}!", body: "Hello from {app}.", button: null }, dailyCap: 2 })).status).toBe(200);
    expect((await nudge({ action: "save", message: { subject: "x", body: "y", button: null }, dailyCap: 51 })).status).toBe(400);
    expect((await nudge({ action: "switch", on: true, confirm: "TURN ON" })).status).toBe(200);
    const first = await auto.runAutomations("http://localhost");
    expect(first["no-child"]).toEqual({ sent: 2, failed: 0 });
    const logged = await dbm.query<{ sent_by: string; label: string }>("SELECT sent_by, label FROM email_log WHERE sent_by = 'auto:no-child'");
    expect(logged).toHaveLength(2);
    expect(logged[0].label).toBe("Add {children}!");
    // The rest go out on the next run; nobody gets it twice.
    const second = await auto.runAutomations("http://localhost", Date.now() + 4 * DAY);
    const waitingAfter = (await auto.automationStatuses(Date.now() + 4 * DAY)).find((s) => s.id === "no-child")!.waiting;
    expect((second["no-child"]?.sent ?? 0) + waitingAfter).toBeGreaterThanOrEqual(1);
    const counts = await dbm.query<{ family_id: string; n: number }>("SELECT family_id, COUNT(*) AS n FROM email_log WHERE sent_by = 'auto:no-child' GROUP BY family_id");
    expect(counts.every((c) => Number(c.n) === 1)).toBe(true);
    expect((await nudge({ action: "switch", on: false })).status).toBe(200);
    expect(await auto.runAutomations("http://localhost", Date.now() + 40 * DAY)).toEqual({});
    const actions = (await dbm.query<{ action: string }>("SELECT action FROM admin_audit WHERE target = 'no-child' ORDER BY id")).map((a) => a.action);
    expect(actions).toEqual(["automation.save", "automation.on", "automation.off"]);
  });

  it("leave out families who already get practice reminders from the gone-quiet nudge", async () => {
    const t = Date.now();
    const a = await account("quiet-a@example.com", { createdAgo: 30 * DAY });
    const b = await account("quiet-b@example.com", { createdAgo: 30 * DAY });
    await practise(a.familyId, t - 10 * DAY);
    await practise(b.familyId, t - 10 * DAY);
    await dbm.run("UPDATE parents SET practice_reminders = 1 WHERE family_id = ?", [b.familyId]);
    const def = (await import("@/lib/automations")).automationDef("quiet-7")!;
    const ids = (await auto.automationAudience(def, t)).map((r) => r.familyId);
    expect(ids).toContain(a.familyId);
    expect(ids).not.toContain(b.familyId);
  });
});

describe("billing", () => {
  let fam: { cookie: string; familyId: string };
  beforeAll(async () => {
    fam = await account("billing@example.com");
    await dbm.run("UPDATE families SET stripe_customer = 'cus_bill', plan = 'premium', subscription_status = 'past_due' WHERE id = ?", [fam.familyId]);
    await dbm.run("INSERT INTO payments (id, family_id, amount, refunded, currency, interval, paid_at) VALUES ('in_bill', ?, 11999, 0, 'CAD', 'year', ?)", [fam.familyId, Date.now() - DAY]);
  });

  function stripeStub() {
    const calls: { url: string; method: string; body: string }[] = [];
    vi.stubGlobal(
      "fetch",
      vi.fn(async (input: string | URL, init?: RequestInit) => {
        const url = String(input);
        const method = init?.method ?? "GET";
        calls.push({ url, method, body: String(init?.body ?? "") });
        const ok = (o: unknown) => new Response(JSON.stringify(o), { status: 200 });
        if (url.startsWith("https://api.stripe.com/v1/subscriptions?")) return ok({ data: [{ id: "sub_1", status: "past_due", cancel_at_period_end: false, items: { data: [{ current_period_end: 1_900_000_000 }] } }] });
        if (url.startsWith("https://api.stripe.com/v1/invoices/in_bill")) return ok({ id: "in_bill", payments: { data: [{ payment: { type: "payment_intent", payment_intent: "pi_1" } }] } });
        if (url === "https://api.stripe.com/v1/refunds") return ok({ id: "re_1", amount: Number(new URLSearchParams(String(init?.body)).get("amount")) });
        if (url.startsWith("https://api.stripe.com/v1/subscriptions/sub_1")) return ok({ id: "sub_1" });
        return new Response("{}", { status: 404 });
      }),
    );
    return calls;
  }

  it("shows payments, and without Stripe refuses refunds and cancelling", async () => {
    const d = await (await get(billing, `/api/admin/billing/?familyId=${fam.familyId}`)).json();
    expect(d).toMatchObject({ stripe: false, customer: "cus_bill", subscriptions: [] });
    expect(d.payments).toEqual([expect.objectContaining({ id: "in_bill", amount: 11999, refunded: 0 })]);
    expect((await post(billing, "/api/admin/billing/", { familyId: fam.familyId, action: "refund", paymentId: "in_bill", amount: 100, confirm: "REFUND" })).status).toBe(400);
  });

  it("emails the family about a failed payment, even with news and tips off", async () => {
    await dbm.run("UPDATE parents SET admin_mail = 0 WHERE family_id = ?", [fam.familyId]);
    expect((await post(billing, "/api/admin/billing/", { familyId: fam.familyId, action: "card-email" })).status).toBe(200);
    const mail = sentTo("billing@example.com").at(-1)!;
    expect(mail.subject).toMatch(/payment didn't go through$/);
    expect(mail.text).toContain("/parents/#/subscription");
    expect((await dbm.query<{ kind: string; sent_by: string }>("SELECT kind, sent_by FROM email_log WHERE family_id = ? ORDER BY sent_at DESC LIMIT 1", [fam.familyId]))[0]).toEqual({ kind: "billing", sent_by: ADMIN_EMAIL });
  });

  it("refunds part of a payment through Stripe, only with REFUND typed and within what's left", async () => {
    process.env.STRIPE_SECRET_KEY = "sk_test_x";
    const calls = stripeStub();
    const refund = (body: Record<string, unknown>) => post(billing, "/api/admin/billing/", { familyId: fam.familyId, action: "refund", paymentId: "in_bill", ...body });
    expect((await refund({ amount: 5000 })).status).toBe(400);
    expect((await refund({ amount: 20000, confirm: "REFUND" })).status).toBe(400);
    expect((await refund({ amount: 0, confirm: "REFUND" })).status).toBe(400);
    expect(calls.filter((c) => c.url.endsWith("/refunds"))).toHaveLength(0);
    expect((await refund({ amount: 5000, confirm: "REFUND" })).status).toBe(200);
    const r = calls.find((c) => c.url.endsWith("/refunds"))!;
    expect(new URLSearchParams(r.body).get("payment_intent")).toBe("pi_1");
    expect(new URLSearchParams(r.body).get("amount")).toBe("5000");
    expect((await dbm.query<{ refunded: number }>("SELECT refunded FROM payments WHERE id = 'in_bill'"))[0].refunded).toBe(5000);
    expect((await refund({ amount: 7000, confirm: "REFUND" })).status).toBe(400);
    expect((await dbm.query<{ action: string }>("SELECT action FROM admin_audit WHERE target = ? ORDER BY id DESC LIMIT 1", [fam.familyId]))[0].action).toBe("billing.refund");
  });

  it("cancels at the end of the period, takes it back, and cancels now only with CANCEL typed", async () => {
    process.env.STRIPE_SECRET_KEY = "sk_test_x";
    const calls = stripeStub();
    const d = await (await get(billing, `/api/admin/billing/?familyId=${fam.familyId}`)).json();
    expect(d.subscriptions).toEqual([{ id: "sub_1", status: "past_due", cancelAtPeriodEnd: false, currentPeriodEnd: 1_900_000_000_000 }]);
    const act = (action: string, extra: Record<string, unknown> = {}) => post(billing, "/api/admin/billing/", { familyId: fam.familyId, action, subscriptionId: "sub_1", ...extra });
    expect((await act("cancel-at-end")).status).toBe(200);
    expect(calls.find((c) => c.method === "POST" && c.url.endsWith("/subscriptions/sub_1"))!.body).toBe("cancel_at_period_end=true");
    expect((await act("resume")).status).toBe(200);
    expect(calls.filter((c) => c.method === "POST" && c.url.endsWith("/subscriptions/sub_1")).at(-1)!.body).toBe("cancel_at_period_end=false");
    expect((await act("cancel-now")).status).toBe(400);
    expect(calls.some((c) => c.method === "DELETE")).toBe(false);
    expect((await act("cancel-now", { confirm: "CANCEL" })).status).toBe(200);
    expect(calls.some((c) => c.method === "DELETE" && c.url.endsWith("/subscriptions/sub_1"))).toBe(true);
    expect((await act("cancel-now", { subscriptionId: "sub_other", confirm: "CANCEL" })).status).toBe(404);
  });
});

describe("the funnel and its groups", () => {
  it("counts how far families got, and the email groups match the steps", async () => {
    const t = Date.now();
    const noChild = await account("f-nochild@example.com", { createdAgo: 3 * DAY });
    const tried = await account("f-tried@example.com", { createdAgo: 20 * DAY });
    await addChild(tried.familyId);
    await practise(tried.familyId, t - 10 * DAY);
    const regular = await account("f-regular@example.com", { createdAgo: 20 * DAY });
    await addChild(regular.familyId);
    for (const d of [2, 3, 4]) await practise(regular.familyId, t - d * DAY);
    const r = await (await get(funnel, "/api/admin/funnel/?days=30")).json();
    const by = Object.fromEntries(r.steps.map((s: { id: string; count: number }) => [s.id, s.count]));
    expect(by["signed-up"]).toBeGreaterThanOrEqual(by.confirmed);
    expect(by.child).toBeGreaterThanOrEqual(by.practised);
    expect(by.practised).toBeGreaterThanOrEqual(by.regular);
    expect(by.regular).toBeGreaterThanOrEqual(1);
    expect((await get(funnel, "/api/admin/funnel/?days=7")).status).toBe(400);

    const { segmentMembers } = await import("@/server/adminEmail");
    const ids = async (s: Parameters<typeof segmentMembers>[0]) => (await segmentMembers(s, t)).ready.map((x) => x.familyId);
    expect(await ids("no-child")).toContain(noChild.familyId);
    expect(await ids("no-child")).not.toContain(tried.familyId);
    expect(await ids("tried-few")).toContain(tried.familyId);
    expect(await ids("tried-few")).not.toContain(regular.familyId);
    expect(await ids("engaged-not-paying")).toContain(regular.familyId);
    expect(await ids("engaged-not-paying")).not.toContain(tried.familyId);
  });
});

describe("saved replies", () => {
  it("start with defaults, and save the owner's own list", async () => {
    const first = await (await get(replies, "/api/admin/replies/")).json();
    expect(first.replies.length).toBeGreaterThanOrEqual(3);
    const put = (body: unknown) => replies.PUT(req("/api/admin/replies/", "PUT", body, admin.cookie));
    expect((await put({ replies: [{ id: "a", title: "", body: "x" }] })).status).toBe(400);
    expect((await put({ replies: [{ id: "a", title: "A", body: "x" }, { id: "a", title: "B", body: "y" }] })).status).toBe(400);
    expect((await put({ replies: [{ id: "hours", title: "Opening hours", body: "  We answer within a day.  " }] })).status).toBe(200);
    expect((await (await get(replies, "/api/admin/replies/")).json()).replies).toEqual([{ id: "hours", title: "Opening hours", body: "We answer within a day." }]);
  });
});

describe("CSV downloads", () => {
  it("download accounts, payments and the email log, without children's names, and log each download", async () => {
    const fam = await account("=cmd@example.com");
    await addChild(fam.familyId, "Quentin");
    const res = await get(exportRoute, "/api/admin/export/?type=users");
    expect(res.headers.get("content-type")).toBe("text/csv; charset=utf-8");
    expect(res.headers.get("content-disposition")).toMatch(/^attachment; filename="users-\d{4}-\d{2}-\d{2}\.csv"$/);
    const text = await res.text();
    expect(text.split("\r\n")[0]).toBe("family_id,email,signed_up,email_confirmed,plan,subscription_status,interval,trial_ends,access_until,last_sign_in,last_practice,children,paid_total,news_and_tips");
    expect(text).toContain("'=cmd@example.com");
    expect(text).not.toContain("Quentin");
    expect(await (await get(exportRoute, "/api/admin/export/?type=payments")).text()).toContain("in_bill");
    expect((await (await get(exportRoute, "/api/admin/export/?type=emails")).text()).split("\r\n")[0]).toBe("sent_at,family_id,to,kind,subject,status,sent_by");
    expect((await get(exportRoute, "/api/admin/export/?type=secrets")).status).toBe(400);
    const logged = await dbm.query<{ target: string }>("SELECT target FROM admin_audit WHERE action = 'export' ORDER BY id");
    expect(logged.map((l) => l.target)).toEqual(["users", "payments", "emails"]);
  });
});
