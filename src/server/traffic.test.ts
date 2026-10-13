import { createVerify, generateKeyPairSync } from "node:crypto";
import { mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { afterAll, afterEach, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";

// The Traffic tab's server side: Search Console through a read-only service account and Vercel Web Analytics,
// against a stubbed fetch. No credential may reach the response.

const dir = mkdtempSync(join(tmpdir(), "grademap-traffic-"));
process.env.DATABASE_URL = `file:${join(dir, "test.db")}`;
const KEYS = ["GOOGLE_SERVICE_ACCOUNT_KEY", "SEARCH_CONSOLE_SITE", "VERCEL_TOKEN", "VERCEL_PROJECT_ID", "VERCEL_TEAM_ID", "RESEND_API_KEY", "EMAIL_FROM"];
const saved = Object.fromEntries(KEYS.map((k) => [k, process.env[k]]));
const ADMIN_EMAIL = "owner@example.com";
const NOW = Date.UTC(2026, 9, 12, 15);

const { privateKey, publicKey } = generateKeyPairSync("rsa", { modulusLength: 2048, privateKeyEncoding: { type: "pkcs8", format: "pem" }, publicKeyEncoding: { type: "spki", format: "pem" } });
const KEY_JSON = JSON.stringify({ type: "service_account", client_email: "reader@project.iam.gserviceaccount.com", private_key: privateKey });

type Mod = Record<string, (req: Request) => Promise<Response>>;
let signup: Mod, route: Mod;
let dbm: typeof import("@/server/db");
let traffic: typeof import("@/server/traffic");

beforeAll(async () => {
  for (const k of KEYS) delete process.env[k];
  signup = (await import("@/app/api/auth/signup/route")) as unknown as Mod;
  route = (await import("@/app/api/admin/traffic/route")) as unknown as Mod;
  dbm = await import("@/server/db");
  traffic = await import("@/server/traffic");
});
beforeEach(() => {
  process.env.ADMIN_EMAILS = ADMIN_EMAIL;
  traffic.clearTrafficCache();
  vi.stubGlobal("fetch", vi.fn(async () => new Response("{}", { status: 503 })));
});
afterEach(() => {
  vi.unstubAllGlobals();
  for (const k of KEYS) delete process.env[k];
});
afterAll(() => {
  for (const [k, v] of Object.entries(saved)) if (v === undefined) delete process.env[k];
  else process.env[k] = v;
  rmSync(dir, { recursive: true, force: true });
});

let ip = 0;
const req = (path: string, cookie?: string) => new Request(`http://localhost${path}`, { headers: { host: "localhost", "x-forwarded-for": `10.6.0.${++ip % 250}`, ...(cookie ? { cookie } : {}) } });
async function account(address: string) {
  const res = await signup.POST(new Request("http://localhost/api/auth/signup/", { method: "POST", headers: { "content-type": "application/json", host: "localhost", "x-forwarded-for": `10.6.1.${++ip % 250}` }, body: JSON.stringify({ email: address, password: "correct horse" }) }));
  await dbm.run("UPDATE parents SET email_verified_at = ? WHERE email = ?", [Date.now() - 60_000, address]);
  return (res.headers.get("set-cookie") ?? "").split(";")[0];
}

const gscRow = (keys: string[] | undefined, clicks: number, impressions: number, position = 8) => ({ ...(keys ? { keys } : {}), clicks, impressions, ctr: impressions ? clicks / impressions : 0, position });

/** A fake Google and Vercel. Records what was asked. */
function fakeServices() {
  const calls: { url: string; init?: RequestInit }[] = [];
  vi.stubGlobal(
    "fetch",
    vi.fn(async (url: string, init?: RequestInit) => {
      calls.push({ url, init });
      const ok = (body: unknown) => new Response(JSON.stringify(body), { status: 200, headers: { "content-type": "application/json" } });
      if (url === "https://oauth2.googleapis.com/token") return ok({ access_token: "ya29.secret-access", expires_in: 3600 });
      if (url.includes("/searchAnalytics/query")) {
        const body = JSON.parse(String(init?.body)) as { startDate: string; dimensions: string[] };
        const dim = body.dimensions[0];
        if (!dim) return ok({ rows: body.startDate === "2026-09-12" ? [gscRow(undefined, 120, 4000, 9.5)] : [gscRow(undefined, 60, 3000, 12)] });
        if (dim === "date") return ok({ rows: [gscRow(["2026-09-13"], 5, 100), gscRow(["2026-10-09"], 9, 200)] });
        if (dim === "query") return ok({ rows: [gscRow(["grade 4 math practice"], 30, 600, 4.2)] });
        return ok({ rows: [gscRow(["https://www.example.com/guides/bc/grade-4/"], 25, 500, 5)] });
      }
      if (url.endsWith("/sitemaps")) return ok({ sitemap: [{ path: "https://www.example.com/sitemap.xml", lastDownloaded: "2026-10-10T08:00:00Z", errors: "0", warnings: "2", contents: [{ type: "web", submitted: "8400" }] }] });
      if (url.startsWith("https://api.vercel.com/v1/query/web-analytics/visits/aggregate")) {
        const q = new URL(url).searchParams;
        const by = q.get("by");
        const prev = q.get("since")!.startsWith("2026-08");
        if (by === "year") return ok({ data: [{ timestamp: "2026-01-01T00:00:00.000Z", visitors: prev ? 50 : 80, pageviews: prev ? 200 : 300 }] });
        if (by === "day") return ok({ result: { data: [{ timestamp: "2026-10-11T00:00:00.000Z", visitors: 19, pageviews: 70 }, { timestamp: "2026-10-12T00:00:00.000Z", visitors: 25, pageviews: 90 }] } });
        if (by === "requestPath") return ok({ data: [{ requestPath: "/", visitors: 52, pageviews: 141 }, { requestPath: "Others", visitors: 14, pageviews: 30 }] });
        if (by === "referrerHostname") return ok({ data: [{ referrerHostname: "www.google.com", visitors: 20, pageviews: 40 }] });
        return ok({ data: [{ country: "CA", visitors: 70, pageviews: 260 }] });
      }
      return new Response("{}", { status: 404 });
    }),
  );
  return calls;
}

describe("traffic route", () => {
  it("answers 404 to anyone who isn't an admin and 400 for an unknown period", async () => {
    const other = await account("not-admin-traffic@example.com");
    expect((await route.GET(req("/api/admin/traffic/", other))).status).toBe(404);
    const admin = await account(ADMIN_EMAIL);
    expect((await route.GET(req("/api/admin/traffic/?days=12", admin))).status).toBe(400);
    const res = await route.GET(req("/api/admin/traffic/?days=7", admin));
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body).toMatchObject({ days: 7, search: { state: "setup" }, visits: { state: "setup" } });
    expect(body.search.setup).toMatch(/GOOGLE_SERVICE_ACCOUNT_KEY/);
    const one = await route.GET(req("/api/admin/traffic/?days=7&part=visits", admin));
    expect(await one.json()).toMatchObject({ state: "setup", setup: expect.stringMatching(/VERCEL_TOKEN/) });
    expect((await route.GET(req("/api/admin/traffic/?days=7&part=nope", admin))).status).toBe(400);
  });
});

describe("Search Console", () => {
  it("signs a read-only request with the service account's key", () => {
    const key = traffic.serviceAccount;
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY = Buffer.from(KEY_JSON).toString("base64");
    const k = key()!;
    expect(k.client_email).toBe("reader@project.iam.gserviceaccount.com");
    const jwt = traffic.signedAssertion(k, NOW);
    const [head, claims, sig] = jwt.split(".");
    expect(JSON.parse(Buffer.from(claims, "base64url").toString())).toEqual({
      iss: "reader@project.iam.gserviceaccount.com",
      scope: "https://www.googleapis.com/auth/webmasters.readonly",
      aud: "https://oauth2.googleapis.com/token",
      iat: NOW / 1000,
      exp: NOW / 1000 + 3600,
    });
    const v = createVerify("RSA-SHA256");
    v.update(`${head}.${claims}`);
    expect(v.verify(publicKey, Buffer.from(sig, "base64url"))).toBe(true);
  });

  it("says when the key can't be read", async () => {
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY = "not a key";
    process.env.SEARCH_CONSOLE_SITE = "sc-domain:example.com";
    const r = await traffic.searchReport(28, NOW);
    expect(r).toMatchObject({ state: "setup" });
    expect(r.state === "setup" && r.setup).toMatch(/can't be read/);
  });

  it("reads totals, the period before, days, searches, pages and sitemaps", async () => {
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY = KEY_JSON;
    process.env.SEARCH_CONSOLE_SITE = "sc-domain:example.com";
    const calls = fakeServices();
    const r = await traffic.searchReport(28, NOW);
    if (r.state !== "ok") throw new Error(JSON.stringify(r));
    const s = r.report;
    // Ends three days ago, because Google's numbers settle late.
    expect([s.start, s.end]).toEqual(["2026-09-12", "2026-10-09"]);
    expect(s.totals).toMatchObject({ clicks: 120, impressions: 4000, position: 9.5 });
    expect(s.previous).toMatchObject({ clicks: 60, impressions: 3000 });
    expect(s.daily).toHaveLength(28);
    expect(s.daily.find((d) => d.date === "2026-10-09")).toEqual({ date: "2026-10-09", clicks: 9, impressions: 200 });
    expect(s.daily.find((d) => d.date === "2026-09-20")).toEqual({ date: "2026-09-20", clicks: 0, impressions: 0 });
    expect(s.queries[0]).toMatchObject({ key: "grade 4 math practice", clicks: 30 });
    expect(s.sitemaps).toEqual([{ path: "https://www.example.com/sitemap.xml", lastDownloaded: Date.parse("2026-10-10T08:00:00Z"), errors: 0, warnings: 2, submitted: 8400 }]);

    const tokenCall = calls.find((c) => c.url === "https://oauth2.googleapis.com/token")!;
    expect(String(tokenCall.init?.body)).toContain("grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer");
    const q = calls.find((c) => c.url.includes("searchAnalytics"))!;
    expect(q.url).toBe("https://searchconsole.googleapis.com/webmasters/v3/sites/sc-domain%3Aexample.com/searchAnalytics/query");
    expect((q.init?.headers as Record<string, string>).authorization).toBe("Bearer ya29.secret-access");

    // The token is kept, so a second report doesn't sign in again.
    await traffic.searchReport(7, NOW + 60_000);
    expect(calls.filter((c) => c.url === "https://oauth2.googleapis.com/token")).toHaveLength(1);
  });

  it("turns a refusal into a message", async () => {
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY = KEY_JSON;
    process.env.SEARCH_CONSOLE_SITE = "sc-domain:example.com";
    vi.stubGlobal("fetch", vi.fn(async (url: string) => (url.includes("oauth2") ? new Response(JSON.stringify({ access_token: "t", expires_in: 3600 })) : new Response(JSON.stringify({ error: { message: "User does not have sufficient permission for site" } }), { status: 403 }))));
    const r = await traffic.searchReport(28, NOW);
    expect(r).toEqual({ state: "error", error: "Search Console answered 403: User does not have sufficient permission for site" });
  });
});

describe("Vercel Web Analytics", () => {
  it("reads visitors, page views, pages, sources and countries", async () => {
    process.env.VERCEL_TOKEN = "vercel-secret";
    process.env.VERCEL_PROJECT_ID = "prj_1";
    process.env.VERCEL_TEAM_ID = "team_1";
    const calls = fakeServices();
    const r = await traffic.visitsReport(28, NOW);
    if (r.state !== "ok") throw new Error(JSON.stringify(r));
    expect(r.report).toMatchObject({ start: "2026-09-15", end: "2026-10-12", visitors: 80, pageviews: 300, previous: { visitors: 50, pageviews: 200 } });
    expect(r.report.daily).toEqual([
      { date: "2026-10-11", visitors: 19, pageviews: 70 },
      { date: "2026-10-12", visitors: 25, pageviews: 90 },
    ]);
    // The "Others" bucket isn't a page.
    expect(r.report.pages).toEqual([{ key: "/", visitors: 52, pageviews: 141 }]);
    expect(r.report.referrers[0].key).toBe("www.google.com");
    const u = new URL(calls[0].url);
    expect(u.searchParams.get("projectId")).toBe("prj_1");
    expect(u.searchParams.get("teamId")).toBe("team_1");
    expect((calls[0].init?.headers as Record<string, string>).authorization).toBe("Bearer vercel-secret");
  });

  it("reads the 31 days a Hobby plan keeps, without comparing with a cut-short period", async () => {
    process.env.VERCEL_TOKEN = "vercel-secret";
    process.env.VERCEL_PROJECT_ID = "prj_1";
    const calls = fakeServices();
    const vercel = vi.mocked(fetch).getMockImplementation()!;
    vi.mocked(fetch).mockImplementation(async (input, init) => {
      const since = new URL(String(input)).searchParams.get("since");
      if (since && since < "2026-09-12")
        return new Response(JSON.stringify({ error: { message: "Invalid request: the hobby plan only grants access to the latest 31 days of data." } }), { status: 400 });
      return vercel(input, init);
    });
    const r = await traffic.visitsReport(90, NOW);
    if (r.state !== "ok") throw new Error(JSON.stringify(r));
    expect(r.report).toMatchObject({ start: "2026-09-12", end: "2026-10-12", keptDays: 31, visitors: 80, previous: { visitors: 0, pageviews: 0 } });
    // Every retried question stays inside the 31 days.
    const retried = calls.filter((c) => c.url.includes("since=2026-09-12"));
    expect(retried.length).toBe(5);
    // The default 28 days fit, but the 28 before don't: the period stays whole and the comparison goes.
    const r28 = await traffic.visitsReport(28, NOW);
    if (r28.state !== "ok") throw new Error(JSON.stringify(r28));
    expect(r28.report).toMatchObject({ start: "2026-09-15", keptDays: 31, previous: { visitors: 0, pageviews: 0 } });
  });

  it("asks for the settings it needs", async () => {
    expect(await traffic.visitsReport(28, NOW)).toMatchObject({ state: "setup", setup: expect.stringMatching(/VERCEL_TOKEN/) });
  });
});

describe("the whole report", () => {
  it("caches for 10 minutes, refreshes on request, and never carries a credential", async () => {
    process.env.GOOGLE_SERVICE_ACCOUNT_KEY = KEY_JSON;
    process.env.SEARCH_CONSOLE_SITE = "sc-domain:example.com";
    process.env.VERCEL_TOKEN = "vercel-secret";
    process.env.VERCEL_PROJECT_ID = "prj_1";
    const calls = fakeServices();
    const a = await traffic.trafficReport(28, { now: NOW });
    const n = calls.length;
    await traffic.trafficReport(28, { now: NOW + 5 * 60_000 });
    expect(calls.length).toBe(n);
    await traffic.trafficReport(28, { now: NOW + 5 * 60_000, refresh: true });
    expect(calls.length).toBeGreaterThan(n);
    const text = JSON.stringify(a);
    for (const secret of ["vercel-secret", "ya29.secret-access", "PRIVATE KEY", "reader@project"]) expect(text).not.toContain(secret);
  });

  it("reads one part at a time, calling the service once while it is cached", async () => {
    process.env.VERCEL_TOKEN = "vercel-secret";
    process.env.VERCEL_PROJECT_ID = "prj_1";
    const calls = fakeServices();
    const [a, b] = await Promise.all([traffic.trafficPart("visits", 28, { now: NOW }), traffic.trafficPart("visits", 28, { now: NOW })]);
    expect(a).toEqual(b);
    expect(a.state).toBe("ok");
    const n = calls.length;
    expect(calls.some((c) => c.url.includes("/searchAnalytics/"))).toBe(false);
    await traffic.trafficPart("visits", 28, { now: NOW + 60_000 });
    expect(calls.length).toBe(n);
    expect((await traffic.trafficPart("search", 28, { now: NOW })).state).toBe("setup");
  });
});
