import { createSign } from "node:crypto";
import { periodDates, SEARCH_LAG_DAYS, type Part, type SearchReport, type SearchRow, type SitemapInfo, type TrafficData, type TrafficPeriod, type VisitsReport } from "@/lib/traffic";

// The admin panel's Traffic tab, read on the server so no credential reaches the browser:
// - Google Search Console through a service account with the read-only scope (webmasters.readonly);
// - Vercel Web Analytics (cookieless page views on the public pages) with the same VERCEL_TOKEN the System page uses.
// Each part fails on its own, and results are cached for 10 minutes per period.

const TIMEOUT = 10_000;
const DAY = 86_400_000;
export const TRAFFIC_CACHE_MS = 10 * 60_000;
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const TOKEN_URL = "https://oauth2.googleapis.com/token";

const env = (name: string) => process.env[name]?.trim() || "";

async function fetchJson<T>(service: string, url: string, init: RequestInit = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, { ...init, cache: "no-store", signal: AbortSignal.timeout(TIMEOUT) });
  } catch (e) {
    throw new Error((e as Error).name === "TimeoutError" ? `${service} didn't answer in time.` : `Couldn't reach ${service}.`);
  }
  if (!res.ok) {
    let why = "";
    try {
      const body = (await res.json()) as { error?: { message?: string } | string; error_description?: string };
      why = typeof body.error === "string" ? (body.error_description ?? body.error) : (body.error?.message ?? "");
    } catch {
      // No JSON body: the status is enough.
    }
    throw new Error(`${service} answered ${res.status}${why ? `: ${why.slice(0, 200)}` : "."}`);
  }
  return (await res.json()) as T;
}

// ---------- Google Search Console ----------

interface ServiceAccount {
  client_email: string;
  private_key: string;
}

export const SEARCH_SETUP =
  "Set GOOGLE_SERVICE_ACCOUNT_KEY (the service account's JSON key, as is or base64) and SEARCH_CONSOLE_SITE (the property, such as sc-domain:example.com or https://www.example.com/). Add the service account's email to the property in Search Console as a Restricted user.";

/** The key from the environment, as JSON or base64 JSON; null when it isn't set or can't be read. */
export function serviceAccount(): ServiceAccount | null {
  const raw = env("GOOGLE_SERVICE_ACCOUNT_KEY");
  if (!raw) return null;
  for (const text of [raw, Buffer.from(raw, "base64").toString("utf8")]) {
    try {
      const k = JSON.parse(text) as Partial<ServiceAccount>;
      if (typeof k.client_email === "string" && typeof k.private_key === "string") return { client_email: k.client_email, private_key: k.private_key.replace(/\\n/g, "\n") };
    } catch {
      // Try the next reading.
    }
  }
  return null;
}

const b64url = (s: string | Buffer) => Buffer.from(s).toString("base64url");

/** A signed JWT asking Google for a read-only Search Console token (RS256, one hour). */
export function signedAssertion(key: ServiceAccount, now = Date.now()): string {
  const iat = Math.floor(now / 1000);
  const head = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(JSON.stringify({ iss: key.client_email, scope: SCOPE, aud: TOKEN_URL, iat, exp: iat + 3600 }));
  const signer = createSign("RSA-SHA256");
  signer.update(`${head}.${claims}`);
  return `${head}.${claims}.${b64url(signer.sign(key.private_key))}`;
}

let token: { value: string; until: number; email: string } | null = null;

async function accessToken(key: ServiceAccount, now: number): Promise<string> {
  if (token && token.email === key.client_email && token.until > now + 60_000) return token.value;
  const body = new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: signedAssertion(key, now) });
  const r = await fetchJson<{ access_token: string; expires_in: number }>("Google sign-in", TOKEN_URL, { method: "POST", headers: { "content-type": "application/x-www-form-urlencoded" }, body });
  token = { value: r.access_token, until: now + r.expires_in * 1000, email: key.client_email };
  return r.access_token;
}

interface GscRow {
  keys?: string[];
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export async function searchReport(days: TrafficPeriod, now = Date.now()): Promise<Part<SearchReport>> {
  const key = serviceAccount();
  const site = env("SEARCH_CONSOLE_SITE");
  if (!key || !site) return { state: "setup", setup: env("GOOGLE_SERVICE_ACCOUNT_KEY") && !key ? `GOOGLE_SERVICE_ACCOUNT_KEY can't be read as a JSON key. ${SEARCH_SETUP}` : SEARCH_SETUP };
  try {
    const bearer = await accessToken(key, now);
    const base = `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(site)}`;
    const headers = { authorization: `Bearer ${bearer}`, "content-type": "application/json", accept: "application/json" };
    const d = periodDates(days, now, SEARCH_LAG_DAYS);
    const query = (startDate: string, endDate: string, dimensions: string[], rowLimit = 10) =>
      fetchJson<{ rows?: GscRow[] }>("Search Console", `${base}/searchAnalytics/query`, { method: "POST", headers, body: JSON.stringify({ startDate, endDate, dimensions, rowLimit, dataState: "final" }) }).then((r) => r.rows ?? []);
    const [totals, previous, daily, queries, pages, maps] = await Promise.all([
      query(d.start, d.end, []),
      query(d.prevStart, d.prevEnd, []),
      query(d.start, d.end, ["date"], 100),
      query(d.start, d.end, ["query"]),
      query(d.start, d.end, ["page"]),
      fetchJson<{ sitemap?: { path: string; lastDownloaded?: string; errors?: string; warnings?: string; contents?: { submitted?: string }[] }[] }>("Search Console", `${base}/sitemaps`, { headers }),
    ]);
    const sum = (rows: GscRow[]) => ({ clicks: rows[0]?.clicks ?? 0, impressions: rows[0]?.impressions ?? 0, ctr: rows[0]?.ctr ?? 0, position: rows[0]?.position ?? 0 });
    const row = (r: GscRow): SearchRow => ({ key: r.keys?.[0] ?? "", clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position });
    const byDate = new Map(daily.map((r) => [r.keys?.[0] ?? "", r]));
    const dates: string[] = [];
    for (let t = Date.parse(d.start); t <= Date.parse(d.end); t += DAY) dates.push(new Date(t).toISOString().slice(0, 10));
    const sitemaps: SitemapInfo[] = (maps.sitemap ?? []).map((m) => ({
      path: m.path,
      lastDownloaded: m.lastDownloaded ? Date.parse(m.lastDownloaded) : null,
      errors: Number(m.errors ?? 0),
      warnings: Number(m.warnings ?? 0),
      submitted: (m.contents ?? []).reduce((n, c) => n + Number(c.submitted ?? 0), 0),
    }));
    return {
      state: "ok",
      report: {
        site,
        start: d.start,
        end: d.end,
        totals: sum(totals),
        previous: sum(previous),
        daily: dates.map((date) => ({ date, clicks: byDate.get(date)?.clicks ?? 0, impressions: byDate.get(date)?.impressions ?? 0 })),
        queries: queries.map(row),
        pages: pages.map(row),
        sitemaps,
      },
    };
  } catch (e) {
    return { state: "error", error: (e as Error).message };
  }
}

// ---------- Vercel Web Analytics ----------

export const VISITS_SETUP =
  "Set VERCEL_TOKEN (read-only, scoped to the team) and VERCEL_PROJECT_ID, plus VERCEL_TEAM_ID for a team project. The System page uses the same settings.";

type VisitRow = Record<string, string | number | undefined> & { visitors?: number; pageviews?: number };

export async function visitsReport(days: TrafficPeriod, now = Date.now()): Promise<Part<VisitsReport>> {
  const bearer = env("VERCEL_TOKEN");
  const project = env("VERCEL_PROJECT_ID");
  if (!bearer || !project) return { state: "setup", setup: VISITS_SETUP };
  const team = env("VERCEL_TEAM_ID");
  const d = periodDates(days, now);
  const since = `${d.start}T00:00:00.000Z`;
  const until = `${d.end}T23:59:59.999Z`;
  const ask = async (by: string, from = since, to = until, limit = 10) => {
    const q = new URLSearchParams({ projectId: project, since: from, until: to, by, limit: String(limit), ...(team ? { teamId: team } : {}) });
    const r = await fetchJson<{ data?: VisitRow[]; result?: { data?: VisitRow[] } }>("Vercel Analytics", `https://api.vercel.com/v1/query/web-analytics/visits/aggregate?${q}`, {
      headers: { authorization: `Bearer ${bearer}`, accept: "application/json" },
    });
    return r.data ?? r.result?.data ?? [];
  };
  try {
    // Totals by year so a visitor counts once (daily rows would count them once a day); only a period across
    // New Year counts them twice.
    const [totals, previous, daily, pages, referrers, countries] = await Promise.all([
      ask("year"),
      ask("year", `${d.prevStart}T00:00:00.000Z`, `${d.prevEnd}T23:59:59.999Z`),
      ask("day", since, until, 100),
      ask("requestPath"),
      ask("referrerHostname"),
      ask("country"),
    ]);
    const n = (v: unknown) => (typeof v === "number" ? v : 0);
    const total = (rows: VisitRow[]) => ({ visitors: rows.reduce((s, r) => s + n(r.visitors), 0), pageviews: rows.reduce((s, r) => s + n(r.pageviews), 0) });
    const list = (rows: VisitRow[], dim: string) => rows.filter((r) => r[dim] && r[dim] !== "Others").map((r) => ({ key: String(r[dim]), visitors: n(r.visitors), pageviews: n(r.pageviews) }));
    const t = total(totals);
    return {
      state: "ok",
      report: {
        start: d.start,
        end: d.end,
        visitors: t.visitors,
        pageviews: t.pageviews,
        previous: total(previous),
        daily: daily.map((r) => ({ date: String(r.timestamp ?? "").slice(0, 10), visitors: n(r.visitors), pageviews: n(r.pageviews) })),
        pages: list(pages, "requestPath"),
        referrers: list(referrers, "referrerHostname"),
        countries: list(countries, "country"),
      },
    };
  } catch (e) {
    return { state: "error", error: (e as Error).message };
  }
}

// ---------- Both ----------

const cache = new Map<number, { at: number; data: TrafficData }>();

export async function trafficReport(days: TrafficPeriod, opts: { refresh?: boolean; now?: number } = {}): Promise<TrafficData> {
  const now = opts.now ?? Date.now();
  const hit = cache.get(days);
  if (!opts.refresh && hit && now - hit.at < TRAFFIC_CACHE_MS) return hit.data;
  const [search, visits] = await Promise.all([searchReport(days, now), visitsReport(days, now)]);
  const data = { days, search, visits };
  cache.set(days, { at: now, data });
  return data;
}

/** For tests. */
export function clearTrafficCache() {
  cache.clear();
  token = null;
}
