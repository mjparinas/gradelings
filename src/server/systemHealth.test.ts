import { createHmac } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

// The admin panel's System page: each check against a stubbed fetch, the job and webhook records, and the
// route's gate. Real route handlers against a throwaway SQLite file.

const dir = mkdtempSync(join(tmpdir(), "grademap-system-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
const ADMIN_EMAIL = "owner@example.com";
const DAY = 86_400_000;
const NOW = Date.parse("2026-10-12T16:00:00Z");

const KEYS = [
  "GITHUB_TOKEN",
  "GITHUB_REPOSITORY",
  "VERCEL_TOKEN",
  "VERCEL_PROJECT_ID",
  "VERCEL_TEAM_ID",
  "VERCEL_GIT_COMMIT_SHA",
  "VERCEL_ENV",
  "SENTRY_AUTH_TOKEN",
  "SENTRY_READ_TOKEN",
  "SENTRY_ORG",
  "SENTRY_PROJECT",
  "SENTRY_DSN",
  "NEXT_PUBLIC_SENTRY_DSN",
  "STRIPE_SECRET_KEY",
  "STRIPE_WEBHOOK_SECRET",
  "STRIPE_PRICE_MONTHLY",
  "STRIPE_PRICE_YEARLY",
  "STRIPE_PRICE_MONTHLY_USD",
  "STRIPE_PRICE_YEARLY_USD",
  "NEXT_PUBLIC_SITE_URL",
  "RESEND_API_KEY",
  "EMAIL_FROM",
  "RESEND_WEBHOOK_SECRET",
  "CRON_SECRET",
  "ALLOW_DEV_BILLING",
];
const saved = Object.fromEntries(KEYS.map((k) => [k, process.env[k]]));

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, system: Mod, cron: Mod, stripeHook: Mod, resendHook: Mod;
let dbm: typeof import("@/server/db");
let health: typeof import("@/server/systemHealth");
let monitor: typeof import("@/server/monitor");

beforeAll(async () => {
  [signup, system, cron, stripeHook, resendHook] = (await Promise.all([
    import("@/app/api/auth/signup/route"),
    import("@/app/api/admin/system/route"),
    import("@/app/api/cron/weekly/route"),
    import("@/app/api/billing/webhook/route"),
    import("@/app/api/email/webhook/route"),
  ])) as unknown as Mod[];
  dbm = await import("@/server/db");
  health = await import("@/server/systemHealth");
  monitor = await import("@/server/monitor");
});
beforeEach(() => {
  for (const k of KEYS) delete process.env[k];
  process.env.ADMIN_EMAILS = ADMIN_EMAIL;
  process.env.ADMIN_2FA = "optional"; // these tests are about the panel, not the second step (twoFactor.test.ts covers that)
  health.clearSystemCache();
});
afterEach(() => vi.unstubAllGlobals());
afterAll(() => {
  for (const [k, v] of Object.entries(saved)) if (v === undefined) delete process.env[k];
  else process.env[k] = v;
  rmSync(dir, { recursive: true, force: true });
});

let ip = 0;
function req(path: string, method = "GET", body?: string, headers: Record<string, string> = {}): Request {
  return new Request(`http://localhost${path}`, {
    method,
    headers: { "content-type": "application/json", host: "localhost", "x-forwarded-for": `10.4.0.${++ip % 250}`, ...headers },
    body,
  });
}
async function account(address: string) {
  const res = await signup.POST(req("/api/auth/signup/", "POST", JSON.stringify({ email: address, password: "correct horse" })));
  expect(res.status).toBe(200);
  await dbm.run("UPDATE parents SET email_verified_at = ? WHERE email = ?", [Date.now() - 60_000, address]);
  return (res.headers.get("set-cookie") ?? "").split(";")[0];
}

/** A fetch that answers by URL prefix, recording what was asked (and with which headers). */
function stubFetch(routes: Record<string, unknown | ((url: string) => unknown)>) {
  const calls: { url: string; auth: string | null }[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (input: string | URL, init?: RequestInit) => {
      const url = String(input);
      calls.push({ url, auth: new Headers(init?.headers).get("authorization") });
      const key = Object.keys(routes)
        .filter((k) => url.startsWith(k))
        .sort((a, b) => b.length - a.length)[0];
      if (!key) return new Response("not found", { status: 404 });
      const v = routes[key];
      const body = typeof v === "function" ? (v as (u: string) => unknown)(url) : v;
      if (body instanceof Response) return body;
      return new Response(JSON.stringify(body), { status: 200, headers: { "content-type": "application/json" } });
    }),
  );
  return calls;
}
const iso = (t: number) => new Date(t).toISOString();

describe("the route", () => {
  it("answers 404 to anyone who isn't an admin, and the report to an admin", async () => {
    const other = await account("someone@example.com");
    expect((await system.GET(req("/api/admin/system/", "GET", undefined, { cookie: other }))).status).toBe(404);
    expect((await system.GET(req("/api/admin/system/"))).status).toBe(404);
    stubFetch({});
    const admin = await account(ADMIN_EMAIL);
    const res = await system.GET(req("/api/admin/system/", "GET", undefined, { cookie: admin }));
    expect(res.status).toBe(200);
    const r = await res.json();
    expect(r.checks.map((c: { id: string }) => c.id)).toEqual(["database", "uptime", "deploys", "builds", "errors", "payments", "email", "job", "settings"]);
    expect(r.statusPages.map((p: { name: string }) => p.name)).toEqual(["Vercel", "GitHub", "Sentry", "Resend", "Stripe", "Turso"]);
  });

  it("answers for one card at a time, so the page can show each as it is ready", async () => {
    stubFetch({});
    process.env.ADMIN_EMAILS = `${ADMIN_EMAIL},cards@example.com`;
    const admin = await account("cards@example.com");
    const one = await system.GET(req("/api/admin/system/?check=settings", "GET", undefined, { cookie: admin }));
    expect(one.status).toBe(200);
    const c = await one.json();
    expect(c.result).toMatchObject({ id: "settings", title: "Settings" });
    expect(typeof c.checkedAt).toBe("number");
    const page = await (await system.GET(req("/api/admin/system/?page=Turso", "GET", undefined, { cookie: admin }))).json();
    expect(page.result).toMatchObject({ name: "Turso", url: "https://status.turso.tech" });
    expect((await system.GET(req("/api/admin/system/?check=nope", "GET", undefined, { cookie: admin }))).status).toBe(404);
    expect((await system.GET(req("/api/admin/system/?page=nope", "GET", undefined, { cookie: admin }))).status).toBe(404);
    expect((await system.GET(req("/api/admin/system/?check=settings"))).status).toBe(404);
  });

  it("calls each service once while a card's answer is cached", async () => {
    process.env.GITHUB_TOKEN = "t";
    process.env.GITHUB_REPOSITORY = "owner/app";
    const calls = stubFetch({});
    await Promise.all([health.runCheck("builds", { now: NOW }), health.runCheck("builds", { now: NOW })]);
    const n = calls.length;
    expect(n).toBeGreaterThan(0);
    const again = await health.runCheck("builds", { now: NOW + 30_000 });
    expect(calls.length).toBe(n);
    expect(again.checkedAt).toBe(NOW);
    await health.runCheck("builds", { now: NOW + 30_000, refresh: true });
    expect(calls.length).toBe(2 * n);
  });

  it("never sends a token to the browser", async () => {
    process.env.GITHUB_TOKEN = "ghp_secret-github";
    process.env.GITHUB_REPOSITORY = "owner/app";
    process.env.VERCEL_TOKEN = "vercel-secret";
    process.env.VERCEL_PROJECT_ID = "prj_1";
    process.env.SENTRY_AUTH_TOKEN = "sntrys_secret";
    process.env.SENTRY_ORG = "org";
    process.env.SENTRY_PROJECT = "app";
    process.env.STRIPE_SECRET_KEY = "sk_test_secret-stripe";
    process.env.RESEND_API_KEY = "re_secret-resend";
    process.env.EMAIL_FROM = "Hi <hi@example.com>";
    process.env.CRON_SECRET = "cron-secret";
    stubFetch({});
    const text = JSON.stringify(await health.systemReport({ refresh: true, now: NOW }));
    for (const v of ["ghp_secret-github", "vercel-secret", "sntrys_secret", "sk_test_secret-stripe", "re_secret-resend", "cron-secret"]) expect(text).not.toContain(v);
  });

  it("keeps results for a minute unless asked to check again", async () => {
    const calls = stubFetch({});
    await health.systemReport({ now: NOW });
    const n = calls.length;
    await health.systemReport({ now: NOW + 30_000 });
    expect(calls.length).toBe(n);
    await health.systemReport({ now: NOW + 30_000, refresh: true });
    expect(calls.length).toBe(2 * n);
    await health.systemReport({ now: NOW + 120_000 });
    expect(calls.length).toBe(3 * n);
  });
});

describe("checks that aren't set up", () => {
  it("say what to set, by name", async () => {
    stubFetch({});
    for (const c of [await health.uptimeCheck(NOW), await health.buildsCheck(), await health.deploysCheck(NOW), await health.errorsCheck(NOW), await health.paymentsCheck(NOW), await health.emailCheck(NOW)]) {
      expect(c.state).toBe("off");
      expect(c.setup).toMatch(/[A-Z_]{6,}/);
    }
  });

  it("turns a service error into a down card instead of a broken page", async () => {
    process.env.GITHUB_TOKEN = "t";
    process.env.GITHUB_REPOSITORY = "owner/app";
    stubFetch({ "https://api.github.com/": new Response("no", { status: 401 }) });
    const r = await health.systemReport({ refresh: true, now: NOW });
    const builds = r.checks.find((c) => c.id === "builds")!;
    expect(builds.state).toBe("down");
    expect(builds.summary).toBe("GitHub refused the token (401).");
  });
});

describe("database", () => {
  it("answers and counts", async () => {
    const c = await health.databaseCheck();
    expect(c.state).toBe("ok");
    expect(c.summary).toMatch(/^Local file answered in \d+ ms\.$/);
  });
});

describe("uptime and builds (GitHub)", () => {
  beforeEach(() => {
    process.env.GITHUB_TOKEN = "t";
    process.env.GITHUB_REPOSITORY = "owner/app";
  });
  const run = (ago: number, conclusion: string, status = "completed") => ({ conclusion, status, created_at: iso(NOW - ago), html_url: "https://github.com/run", display_title: "Fix things\nmore" });

  it("reports the share of passing pings and sends the token only to GitHub", async () => {
    const calls = stubFetch({
      "https://api.github.com/repos/owner/app/actions/workflows/uptime.yml/runs": { workflow_runs: [run(5 * 60_000, "success"), run(DAY / 2, "failure"), run(2 * DAY, "success"), run(3 * DAY, "success")] },
      "https://api.github.com/repos/owner/app/issues": [],
    });
    const c = await health.uptimeCheck(NOW);
    expect(c.state).toBe("ok");
    expect(c.rows.find((r) => r.label === "Last 24 hours")?.value).toBe("50% of 2 checks");
    expect(c.rows.find((r) => r.label === "Last 7 days")?.value).toBe("75% of 4 checks");
    expect(calls.every((x) => x.url.startsWith("https://api.github.com/") && x.auth === "Bearer t")).toBe(true);
  });

  it("is down while an uptime issue is open, with how long", async () => {
    stubFetch({
      "https://api.github.com/repos/owner/app/actions/workflows/uptime.yml/runs": { workflow_runs: [run(60_000, "failure")] },
      "https://api.github.com/repos/owner/app/issues": [{ created_at: iso(NOW - 3 * 3_600_000), html_url: "https://github.com/issue/1" }],
    });
    const c = await health.uptimeCheck(NOW);
    expect(c.state).toBe("down");
    expect(c.rows[0]).toMatchObject({ label: "Down since", at: NOW - 3 * 3_600_000, href: "https://github.com/issue/1" });
  });

  it("warns when the pings have stopped", async () => {
    stubFetch({
      "https://api.github.com/repos/owner/app/actions/workflows/uptime.yml/runs": { workflow_runs: [run(5 * 3_600_000, "success")] },
      "https://api.github.com/repos/owner/app/issues": [],
    });
    expect((await health.uptimeCheck(NOW)).summary).toMatch(/stopped running/);
  });

  it("shows main's latest build and any running now", async () => {
    stubFetch({ "https://api.github.com/repos/owner/app/actions/workflows/ci.yml/runs": { workflow_runs: [run(60_000, null as unknown as string, "in_progress"), run(DAY, "failure"), run(2 * DAY, "success")] } });
    const c = await health.buildsCheck();
    expect(c.state).toBe("down");
    expect(c.rows[0]).toMatchObject({ label: "Latest on main", value: "Failed: Fix things" });
    expect(c.rows[1].label).toBe("Running now");
  });
});

describe("deploys (Vercel)", () => {
  beforeEach(() => {
    process.env.VERCEL_TOKEN = "v";
    process.env.VERCEL_PROJECT_ID = "prj_1";
    process.env.VERCEL_TEAM_ID = "team_1";
  });
  const dep = (ago: number, state: string, target: string | null = "production") => ({ uid: `d${ago}`, url: "app.vercel.app", state, target, created: NOW - ago, meta: { githubCommitMessage: "Ship it" } });

  it("shows what's live, the daily limit and failures", async () => {
    const calls = stubFetch({
      "https://api.vercel.com/v6/deployments": (url: string) => (url.includes("since=") ? { deployments: Array.from({ length: 85 }, (_, i) => dep(i * 1000, "READY", null)) } : { deployments: [dep(1000, "READY"), dep(DAY, "ERROR", null)] }),
      "https://api.vercel.com/v2/teams/team_1": { id: "team_1", billing: { plan: "hobby" } },
    });
    const c = await health.deploysCheck(NOW);
    expect(c.state).toBe("warn");
    expect(c.summary).toBe("85 of 100 deploys used in the last 24 hours.");
    expect(c.rows.find((r) => r.label === "Deploys in 24 hours")?.value).toBe("85 of 100 (Hobby limit)");
    expect(c.rows[0]).toMatchObject({ label: "Live in production", value: "Ship it", href: "https://app.vercel.app" });
    expect(c.rows.find((r) => r.label === "Failed deploys in 7 days")?.value).toBe("1");
    expect(calls.every((x) => x.url.includes("teamId=team_1") || x.url.endsWith("/v2/teams/team_1"))).toBe(true);
    expect(calls.every((x) => x.auth === "Bearer v")).toBe(true);
  });

  const deploys = (n: number) => ({
    "https://api.vercel.com/v6/deployments": (url: string) => ({ deployments: url.includes("since=") ? Array.from({ length: n }, (_, i) => dep(i * 1000, "READY", null)) : [dep(1000, "READY")] }),
  });
  const deployRow = (c: Awaited<ReturnType<typeof health.deploysCheck>>) => c.rows.find((r) => r.label === "Deploys in 24 hours");

  it("counts against the plan the team is on", async () => {
    stubFetch({ ...deploys(85), "https://api.vercel.com/v2/teams/team_1": { billing: { plan: "pro" } } });
    const c = await health.deploysCheck(NOW);
    expect(c.state).toBe("ok");
    expect(deployRow(c)).toMatchObject({ value: "85 of 6,000 (Pro limit)", state: "ok" });

    stubFetch({ ...deploys(4900), "https://api.vercel.com/v2/teams/team_1": { billing: { plan: "pro" } } });
    expect((await health.deploysCheck(NOW)).summary).toBe("4900 of 6,000 deploys used in the last 24 hours.");

    stubFetch({ ...deploys(85), "https://api.vercel.com/v2/teams/team_1": { billing: { plan: "enterprise" } } });
    expect(deployRow(await health.deploysCheck(NOW))).toMatchObject({ value: "85 (Enterprise: no set limit)", state: "ok" });
  });

  it("reads a personal account's plan, and assumes Pro when Vercel doesn't say", async () => {
    delete process.env.VERCEL_TEAM_ID;
    stubFetch({ ...deploys(3), "https://api.vercel.com/v2/user": { user: { billing: { plan: "hobby" } } } });
    expect(deployRow(await health.deploysCheck(NOW))?.value).toBe("3 of 100 (Hobby limit)");

    stubFetch(deploys(3));
    expect(deployRow(await health.deploysCheck(NOW))?.value).toBe("3 of 6,000 (Pro limit)");
  });

  it("is down when the latest production deploy failed", async () => {
    stubFetch({ "https://api.vercel.com/v6/deployments": { deployments: [dep(1000, "ERROR"), dep(DAY, "READY")] } });
    const c = await health.deploysCheck(NOW);
    expect(c.state).toBe("down");
    expect(c.summary).toMatch(/still live/);
  });
});

describe("errors (Sentry)", () => {
  it("lists open issues with how long each has been open", async () => {
    process.env.SENTRY_AUTH_TOKEN = "s";
    process.env.SENTRY_ORG = "org";
    process.env.SENTRY_PROJECT = "app";
    process.env.SENTRY_API_BASE = "https://de.sentry.io/";
    const calls = stubFetch({
      "https://de.sentry.io/api/0/projects/org/app/issues/": [
        { id: "1", title: "TypeError: x is undefined", firstSeen: iso(NOW - 3 * DAY), lastSeen: iso(NOW - 3_600_000), count: "1200", permalink: "https://org.sentry.io/issues/1/" },
        { id: "2", title: "Old one", firstSeen: iso(NOW - 10 * DAY), lastSeen: iso(NOW - 5 * DAY), count: "1" },
      ],
    });
    const c = await health.errorsCheck(NOW);
    delete process.env.SENTRY_API_BASE;
    expect(c.state).toBe("warn");
    expect(c.summary).toBe("2 open issues, 1 seen in the last day.");
    expect(c.rows[0]).toMatchObject({ label: "TypeError: x is undefined", value: "1,200 events, open 3 days", state: "warn" });
    expect(c.rows[1].value).toBe("1 event, open 10 days");
    expect(calls[0].url).toContain("is%3Aunresolved");
  });
});

describe("payments (Stripe)", () => {
  const S = "https://api.stripe.com/v1/";
  const price = (id: string, unit_amount: number, currency: string, interval: string, extra: object = {}) => ({ id, active: true, livemode: true, unit_amount, currency, recurring: { interval }, ...extra });
  const EVENTS = ["checkout.session.completed", "customer.subscription.created", "customer.subscription.updated", "customer.subscription.deleted", "invoice.paid", "charge.refunded", "invoice.payment_failed", "charge.dispute.created"];
  /** A live Stripe account set up the way docs/DEPLOY.md says, with any route replaced. */
  function healthyStripe(over: Record<string, unknown> = {}) {
    return stubFetch({
      [`${S}balance`]: { available: [] },
      [`${S}events`]: { data: [] },
      [`${S}account`]: { charges_enabled: true, requirements: { currently_due: [] } },
      [`${S}prices/price_m`]: price("price_m", 1499, "cad", "month"),
      [`${S}prices/price_y`]: price("price_y", 11999, "cad", "year"),
      [`${S}prices/price_mu`]: price("price_mu", 1499, "usd", "month"),
      [`${S}prices/price_yu`]: price("price_yu", 11999, "usd", "year"),
      [`${S}webhook_endpoints`]: { data: [{ id: "we_1", url: "https://www.example.com/api/billing/webhook/", status: "enabled", enabled_events: EVENTS, livemode: true }] },
      [`${S}billing_portal/configurations`]: { data: [{ active: true, is_default: true }] },
      [`${S}tax/settings`]: { status: "active" },
      [`${S}checkout/sessions`]: { id: "cs_1" },
      ...over,
    });
  }
  beforeEach(async () => {
    process.env.STRIPE_SECRET_KEY = "sk_live_x";
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_x";
    process.env.STRIPE_PRICE_MONTHLY = "price_m";
    process.env.STRIPE_PRICE_YEARLY = "price_y";
    process.env.STRIPE_PRICE_MONTHLY_USD = "price_mu";
    process.env.STRIPE_PRICE_YEARLY_USD = "price_yu";
    process.env.NEXT_PUBLIC_SITE_URL = "https://example.com";
    await dbm.run("DELETE FROM admin_settings WHERE key = 'stripe_checkout_test'");
    await dbm.run("DELETE FROM webhook_log");
  });
  const row = (c: { rows: { label: string }[] }, label: string) => c.rows.find((r) => r.label === label) as { label: string; value: string; state?: string } | undefined;

  it("proves checkout works without charging: prices, account, webhook, portal, tax and a test checkout", async () => {
    const calls = healthyStripe();
    const c = await health.paymentsCheck(NOW);
    expect(c.state).toBe("ok");
    expect(c.summary).toBe("Checkout works with the live key, and nothing was charged to check.");
    expect(row(c, "Key")).toMatchObject({ value: "Live mode", state: "ok" });
    expect(row(c, "CAD monthly price")).toMatchObject({ value: "14.99 CAD every month, active", state: "ok" });
    expect(row(c, "USD yearly price")).toMatchObject({ value: "119.99 USD every year, active", state: "ok" });
    expect(row(c, "Test checkout (CAD)")).toMatchObject({ state: "ok" });
    expect(row(c, "Test checkout (USD)")).toMatchObject({ state: "ok" });
    expect(row(c, "Webhook events")).toMatchObject({ value: "All 8 the app needs", state: "ok" });
    expect(row(c, "Billing portal")).toMatchObject({ state: "ok" });
    expect(row(c, "Stripe Tax (US checkout)")).toMatchObject({ value: "Active", state: "ok" });
    // Each test checkout is closed straight after it opens, so nobody can pay it.
    expect(calls.filter((x) => x.url === `${S}checkout/sessions`)).toHaveLength(2);
    expect(calls.filter((x) => x.url === `${S}checkout/sessions/cs_1/expire`)).toHaveLength(2);
    // A pass is trusted for hours, so the 15-minute watch doesn't open a checkout every time.
    const again = healthyStripe();
    await health.paymentsCheck(NOW + 3_600_000);
    expect(again.some((x) => x.url.startsWith(`${S}checkout/sessions`))).toBe(false);
    const later = healthyStripe();
    await health.paymentsCheck(NOW + health.CHECKOUT_TEST_MS + 1);
    expect(later.filter((x) => x.url === `${S}checkout/sessions`)).toHaveLength(2);
  });

  it("tests checkout again at once when a price id changes", async () => {
    healthyStripe();
    await health.paymentsCheck(NOW);
    process.env.STRIPE_PRICE_MONTHLY = "price_m2";
    const calls = healthyStripe({ [`${S}prices/price_m2`]: price("price_m2", 1499, "cad", "month") });
    await health.paymentsCheck(NOW + 60_000);
    expect(calls.filter((x) => x.url === `${S}checkout/sessions`)).toHaveLength(2);
  });

  it("is down when checkout would fail, naming what to fix", async () => {
    healthyStripe({
      [`${S}prices/price_m`]: new Response(JSON.stringify({ error: { message: "No such price: 'price_m'; a similar object exists in test mode" } }), { status: 404 }),
      [`${S}prices/price_y`]: price("price_y", 9999, "cad", "year"),
      [`${S}prices/price_mu`]: price("price_mu", 1499, "usd", "month", { active: false }),
      [`${S}webhook_endpoints`]: { data: [{ id: "we_1", url: "https://example.com/api/billing/webhook/", status: "enabled", enabled_events: EVENTS.slice(0, 4), livemode: true }] },
      // Both test checkouts are refused, so each gets its own answer.
      [`${S}checkout/sessions`]: () => new Response(JSON.stringify({ error: { message: "Stripe Tax has not been activated on your account." } }), { status: 400 }),
    });
    const c = await health.paymentsCheck(NOW);
    expect(c.state).toBe("down");
    expect(c.summary).toBe("Checkout needs fixing: CAD monthly price and 4 more.");
    expect(row(c, "CAD monthly price")).toMatchObject({ value: "price_m doesn't exist for this live key.", state: "down" });
    expect(row(c, "CAD yearly price")).toMatchObject({ value: "price_y charges 99.99 CAD but the site shows 119.99 CAD.", state: "down" });
    expect(row(c, "USD monthly price")).toMatchObject({ value: "price_mu is archived, so checkout refuses it.", state: "down" });
    expect(row(c, "Test checkout (USD)")).toMatchObject({ value: "Stripe refused it: Stripe Tax has not been activated on your account.", state: "down" });
    expect(row(c, "Webhook events")).toMatchObject({ value: "Missing: invoice.paid, charge.refunded, invoice.payment_failed, charge.dispute.created", state: "warn" });
  });

  it("is down with a test key on the live site, or no webhook to this site", async () => {
    process.env.STRIPE_SECRET_KEY = "sk_test_x";
    process.env.VERCEL_ENV = "production";
    healthyStripe({ [`${S}webhook_endpoints`]: { data: [{ id: "we_2", url: "https://other.example/api/billing/webhook/", status: "enabled", enabled_events: ["*"], livemode: false }] } });
    const c = await health.paymentsCheck(NOW);
    expect(c.state).toBe("down");
    expect(row(c, "Key")).toMatchObject({ state: "down" });
    expect(row(c, "CAD monthly price")?.value).toBe("price_m is a live price but the key is test.");
    expect(row(c, "Webhook endpoint")).toMatchObject({ value: "No test webhook sends to example.com/api/billing/webhook/.", state: "down" });
  });

  it("checks undelivered events and the app's own webhook log", async () => {
    await monitor.recordWebhook("stripe", false, "invoice.paid", "boom", NOW - DAY);
    healthyStripe({ [`${S}events`]: { data: [{ id: "evt_1", type: "invoice.paid", created: (NOW - DAY) / 1000 }] } });
    const c = await health.paymentsCheck(NOW);
    expect(c.state).toBe("warn");
    expect(c.summary).toBe("Stripe couldn't deliver 1 event to the app this week.");
    expect(c.rows[0]).toMatchObject({ label: "Key", value: "Live mode" });
    expect(row(c, "Webhooks in 7 days")?.value).toBe("1 received, 1 failed");
  });
});

describe("errors (Sentry) tokens", () => {
  beforeEach(() => {
    process.env.SENTRY_ORG = "org";
    process.env.SENTRY_PROJECT = "app";
  });

  it("prefers SENTRY_READ_TOKEN over the integration's upload token", async () => {
    process.env.SENTRY_AUTH_TOKEN = "upload";
    process.env.SENTRY_READ_TOKEN = "read";
    const calls = stubFetch({ "https://sentry.io/api/0/projects/org/app/issues/": [] });
    expect((await health.errorsCheck(NOW)).state).toBe("ok");
    expect(calls[0].auth).toBe("Bearer read");
  });

  it("explains a refused token instead of only the status", async () => {
    process.env.SENTRY_AUTH_TOKEN = "upload";
    stubFetch({ "https://sentry.io/api/0/projects/org/app/issues/": new Response("no", { status: 403 }) });
    const c = await health.errorsCheck(NOW);
    expect(c.state).toBe("down");
    expect(c.summary).toMatch(/403.*can't read issues/);
    expect(c.setup).toMatch(/SENTRY_READ_TOKEN/);
  });
});

describe("email (Resend)", () => {
  beforeEach(() => {
    process.env.RESEND_API_KEY = "re_x";
    process.env.EMAIL_FROM = "Hi <hi@example.com>";
  });

  it("is down when a sending domain isn't verified", async () => {
    stubFetch({ "https://api.resend.com/domains": { data: [{ name: "example.com", status: "pending" }] } });
    const c = await health.emailCheck(NOW);
    expect(c.state).toBe("down");
    expect(c.rows[0]).toMatchObject({ label: "Domain example.com", value: "pending" });
  });

  it("says when Resend doesn't know the key", async () => {
    stubFetch({ "https://api.resend.com/domains": new Response('{"name":"validation_error"}', { status: 400 }) });
    const c = await health.emailCheck(NOW);
    expect(c.state).toBe("down");
    expect(c.summary).toMatch(/isn't a valid key/);
    expect(c.setup).toMatch(/redeploy/);
  });

  it("works with a sending-only key, and warns on a high bounce rate", async () => {
    stubFetch({ "https://api.resend.com/domains": new Response("no", { status: 401 }) });
    expect((await health.emailCheck(NOW)).summary).toMatch(/can only send/);
    const log = (id: string, status: string) =>
      dbm.run("INSERT INTO email_log (id, family_id, parent_id, kind, status, sent_at, updated_at) VALUES (?, 'f', 'p', 'weekly', ?, ?, ?)", [id, status, NOW - DAY, NOW - DAY]);
    for (let i = 0; i < 25; i++) await log(`m${i}`, i < 2 ? "bounced" : "delivered");
    for (let i = 0; i < 30; i++) await log(`s${i}`, "skipped");
    const c = await health.emailCheck(NOW);
    expect(c.state).toBe("warn");
    expect(c.rows.find((r) => r.label === "Emails in 30 days")?.value).toBe("25");
    expect(c.rows.find((r) => r.label === "Bounced")?.value).toBe("2 (8%)");
  });
});

describe("the daily job", () => {
  it("is down without CRON_SECRET", async () => {
    expect((await health.jobCheck(NOW)).state).toBe("down");
  });

  it("records each run of the cron route, and warns when it's late", async () => {
    process.env.CRON_SECRET = "c";
    expect((await health.jobCheck(NOW)).summary).toMatch(/hasn't run yet/);
    const res = await cron.GET(req("/api/cron/weekly/", "GET", undefined, { authorization: "Bearer c" }));
    expect(res.status).toBe(200);
    const runs = await monitor.recentJobRuns("daily");
    expect(runs[0]).toMatchObject({ job: "daily", ok: true });
    const c = await health.jobCheck(Date.now());
    expect(c.state).toBe("ok");
    expect(c.rows[0].label).toBe("Ran");
    expect((await health.jobCheck(Date.now() + 27 * 3_600_000)).state).toBe("warn");
    expect((await cron.GET(req("/api/cron/weekly/"))).status).toBe(401);
    expect((await monitor.recentJobRuns("daily")).length).toBe(1);
  });

  it("warns when a run ran out of time, until the next run finishes the day", async () => {
    process.env.CRON_SECRET = "c";
    const now = Date.now() + 60_000; // after the run the test above recorded
    await dbm.run("INSERT INTO job_runs (job, started_at, finished_at, ok, detail) VALUES ('daily', ?, ?, 1, ?)", [now - 30_000, now - 1000, JSON.stringify({ weekly: 3, complete: false, remaining: ["consent", "digest"] })]);
    const partial = await health.jobCheck(now);
    expect(partial.state).toBe("warn");
    expect(partial.summary).toMatch(/ran out of time with consent, digest still to do/);
    expect(partial.rows[0].label).toBe("Ran out of time");

    await dbm.run("INSERT INTO job_runs (job, started_at, finished_at, ok, detail) VALUES ('daily', ?, ?, 1, ?)", [now, now + 1000, JSON.stringify({ weekly: 1, complete: true, remaining: [] })]);
    const done = await health.jobCheck(now + 2000);
    expect(done.state).toBe("ok");
    expect(done.rows[0].label).toBe("Ran");
    expect(done.rows[1].label).toBe("Ran out of time");
  });

  it("records a failed run and passes the error on", async () => {
    await expect(monitor.trackJob("test", async () => Promise.reject(new Error("nope")), () => NOW)).rejects.toThrow("nope");
    expect((await monitor.recentJobRuns("test"))[0]).toMatchObject({ ok: false, detail: "nope", finishedAt: NOW });
  });
});

describe("webhook records", () => {
  it("logs Resend reports, and refused signatures", async () => {
    const secret = Buffer.from("whsec-test-secret").toString("base64");
    process.env.RESEND_WEBHOOK_SECRET = `whsec_${secret}`;
    const body = JSON.stringify({ type: "email.delivered", data: { email_id: "nope" } });
    const id = "msg_1";
    const ts = String(Math.floor(Date.now() / 1000));
    const sig = createHmac("sha256", Buffer.from(secret, "base64")).update(`${id}.${ts}.${body}`).digest("base64");
    const good = await resendHook.POST(req("/api/email/webhook/", "POST", body, { "svix-id": id, "svix-timestamp": ts, "svix-signature": `v1,${sig}` }));
    expect(good.status).toBe(200);
    const bad = await resendHook.POST(req("/api/email/webhook/", "POST", body, { "svix-id": id, "svix-timestamp": ts, "svix-signature": "v1,wrong" }));
    expect(bad.status).toBe(400);
    const s = await monitor.webhookSummary("resend", 0);
    expect(s).toMatchObject({ received: 2, failed: 1 });
    expect(s.recentFailures[0].error).toBe("Bad signature");
  });

  it("logs a Stripe webhook with a bad signature", async () => {
    process.env.STRIPE_WEBHOOK_SECRET = "whsec_stripe";
    const before = (await monitor.webhookSummary("stripe", 0)).failed;
    const res = await stripeHook.POST(req("/api/billing/webhook/", "POST", "{}", { "stripe-signature": "t=1,v1=bad" }));
    expect(res.status).toBe(400);
    expect((await monitor.webhookSummary("stripe", 0)).failed).toBe(before + 1);
  });
});

describe("settings", () => {
  it("names what's missing and never shows a value", async () => {
    process.env.RESEND_API_KEY = "re_value_never_shown";
    const c = health.settingsCheck();
    expect(c.state).toBe("down");
    expect(c.rows.find((r) => r.label === "Email key")?.value).toBe("Set (RESEND_API_KEY)");
    expect(c.rows.find((r) => r.label === "Daily job secret")?.value).toMatch(/^Missing: CRON_SECRET\./);
    expect(JSON.stringify(c)).not.toContain("re_value_never_shown");
  });

  it("checks the Google sign-in ID and secret, warning when either is missing", async () => {
    delete process.env.GOOGLE_CLIENT_ID;
    process.env.GOOGLE_CLIENT_SECRET = "gs_value_never_shown";
    const c = health.settingsCheck();
    expect(c.rows.find((r) => r.label === "Google sign-in ID")).toMatchObject({ state: "warn", value: expect.stringMatching(/^Missing: GOOGLE_CLIENT_ID\./) });
    expect(c.rows.find((r) => r.label === "Google sign-in secret")).toMatchObject({ state: "ok", value: "Set (GOOGLE_CLIENT_SECRET)" });
    expect(JSON.stringify(c)).not.toContain("gs_value_never_shown");
  });

  it("flags a test-only setting left on in production", async () => {
    process.env.ALLOW_DEV_BILLING = "1";
    process.env.VERCEL_ENV = "production";
    const c = health.settingsCheck();
    expect(c.rows[0]).toMatchObject({ label: "ALLOW_DEV_BILLING", state: "down" });
  });
});

describe("status pages", () => {
  it("reads each provider's own format, and survives one that can't be read", async () => {
    stubFetch({
      "https://www.vercel-status.com/api/v2/summary.json": { status: { indicator: "minor", description: "Minor Service Outage" }, incidents: [{ name: "Slow builds", started_at: iso(NOW - 3_600_000), shortlink: "https://stspg.io/x", status: "investigating" }, { name: "Old", status: "resolved" }] },
      "https://www.githubstatus.com/api/v2/summary.json": { status: { indicator: "none", description: "All Systems Operational" }, incidents: [] },
      "https://status.sentry.io/api/v2/status.json": { status: { indicator: "major", description: "Major outage" } },
      "https://status.stripe.com/current": { largestatus: "up", message: "Stripe is up" },
      "https://status.turso.tech/index.json": { data: { attributes: { aggregate_state: "operational" } } },
    });
    const pages = Object.fromEntries((await health.statusPages()).map((p) => [p.name, p]));
    expect(pages.Vercel).toMatchObject({ state: "warn", description: "Minor Service Outage" });
    expect(pages.Vercel.incidents).toEqual([{ name: "Slow builds", startedAt: NOW - 3_600_000, href: "https://stspg.io/x" }]);
    expect(pages.GitHub.state).toBe("ok");
    expect(pages.Sentry.state).toBe("down");
    expect(pages.Resend.state).toBe("warn");
    expect(pages.Resend.description).toMatch(/^Couldn't read the status page/);
    expect(pages.Stripe).toMatchObject({ state: "ok", description: "Stripe is up" });
    expect(pages.Turso).toMatchObject({ state: "ok", description: "Operational" });
  });
});
