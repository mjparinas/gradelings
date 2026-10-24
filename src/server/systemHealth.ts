import "server-only";
import {
  betterStackState,
  CHECKS,
  STATUS_PAGES,
  type CheckId,
  type CheckResult,
  type StatusPageName,
  emailRateState,
  capacityState,
  FETCH_FAILED_WARN,
  megabytes,
  NEVER_IN_PRODUCTION,
  pageAssets,
  pagePolicyProblems,
  restoreDrillState,
  RESTORE_DRILL_DAYS,
  SETTINGS,
  SITE_FILES,
  SITE_PAGES,
  SITE_SLOW_MS,
  speedState,
  STAFF_FAILURES_WARN,
  SYNC_FAILURE_RATE,
  SYNC_SLOW_MS,
  statuspageState,
  stripeStatusState,
  uptimePercent,
  worst,
  type CheckRow,
  type CheckState,
  type HealthCheck,
  type StatusPage,
  type SystemReport,
} from "@/lib/systemHealth";
import { createHash } from "node:crypto";
import { MAINTENANCE_HEADER } from "@/lib/maintenance";
import { traceRate, traceScale } from "@/lib/sentry-traces";
import { adminEmails, audit, supportEmails, twoFactorMode } from "./admin";
import { STAFF_ALERT_KEY, staffFailuresSince } from "./staffSignIns";
import { PRICES_BY_CURRENCY, type Currency } from "@/lib/plan";
import { query } from "./db";
import { emailCounts } from "./emailLog";
import { recentJobRuns, webhookSummary } from "./monitor";
import { getSetting, setSetting } from "./payments";
import { stripePrices, testCheckout } from "./stripe";

// Runs the System page's checks. Every token stays on the server: each check reads its own settings, asks the
// service with a read-only token, and returns only what the page shows. A check that isn't set up says so
// instead of failing, and one slow or broken service never holds up the rest (each call has a time limit).

const DAY = 86_400_000;
const TIMEOUT = 8_000;
/** Deployments a day each Vercel plan allows (vercel.com/docs/limits); Enterprise is custom, so it has none. */
export const VERCEL_DAILY_DEPLOYS = { hobby: 100, pro: 6000 } as const;

const env = (name: string) => process.env[name]?.trim() || "";
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? "" : "s"}`;

class HttpError extends Error {
  constructor(
    readonly status: number,
    service: string,
  ) {
    super(status === 401 || status === 403 ? `${service} refused the token (${status}).` : `${service} answered ${status}.`);
  }
}

async function getJson<T>(service: string, url: string, headers: Record<string, string> = {}): Promise<T> {
  let res: Response;
  try {
    res = await fetch(url, { headers: { accept: "application/json", ...headers }, cache: "no-store", signal: AbortSignal.timeout(TIMEOUT) });
  } catch (e) {
    throw new Error((e as Error).name === "TimeoutError" ? `${service} didn't answer in time.` : `Couldn't reach ${service}.`);
  }
  if (!res.ok) throw new HttpError(res.status, service);
  return (await res.json()) as T;
}

/** Runs a check, turning an unexpected error into a "down" result rather than a failed page. */
async function safely(id: string, title: string, fn: () => Promise<HealthCheck>): Promise<HealthCheck> {
  try {
    return await fn();
  } catch (e) {
    return { id, title, state: "down", summary: (e as Error).message, rows: [] };
  }
}

// ---------- Database ----------

export async function databaseCheck(): Promise<HealthCheck> {
  const url = env("DATABASE_URL") || env("TURSO_DATABASE_URL");
  const hosted = /^(libsql|https?|wss?):/.test(url);
  const started = Date.now();
  try {
    await query("SELECT 1");
    const ms = Date.now() - started;
    const [counts] = await query<{ families: number; events: number; last: number | null }>(
      "SELECT (SELECT COUNT(*) FROM families) AS families, (SELECT COUNT(*) FROM events) AS events, (SELECT MAX(t) FROM events) AS last",
    );
    const state: CheckState = ms > 1500 ? "warn" : "ok";
    return {
      id: "database",
      title: "Database",
      state,
      summary: `${hosted ? "Turso" : "Local file"} answered in ${ms} ms.`,
      rows: [
        { label: "Answer time", value: `${ms} ms`, state },
        { label: "Families", value: Number(counts?.families ?? 0).toLocaleString("en-CA") },
        { label: "Practice events", value: Number(counts?.events ?? 0).toLocaleString("en-CA") },
        ...(counts?.last ? [{ label: "Last practice saved", value: "", at: Number(counts.last) }] : []),
      ],
      link: hosted ? { label: "Turso dashboard", href: "https://app.turso.tech/" } : undefined,
    };
  } catch (e) {
    return { id: "database", title: "Database", state: "down", summary: `The database didn't answer: ${(e as Error).message}`, rows: [] };
  }
}

// ---------- GitHub: uptime pings and builds ----------

interface GhRun {
  conclusion: string | null;
  status: string;
  created_at: string;
  html_url: string;
  head_commit?: { message?: string } | null;
  display_title?: string;
}

const github = () => ({ token: env("GITHUB_TOKEN"), repo: env("GITHUB_REPOSITORY") });
const GITHUB_SETUP =
  "Set GITHUB_TOKEN (a fine-grained token for this repository with read-only Actions and Issues access) and GITHUB_REPOSITORY (owner/name).";

function ghHeaders(token: string) {
  return { authorization: `Bearer ${token}`, "x-github-api-version": "2022-11-28" };
}

export async function uptimeCheck(now = Date.now()): Promise<HealthCheck> {
  const { token, repo } = github();
  if (!token || !repo) return { id: "uptime", title: "Uptime", state: "off", summary: "Not connected to GitHub.", rows: [], setup: GITHUB_SETUP };
  const base = `https://api.github.com/repos/${repo}`;
  const [runs, issues] = await Promise.all([
    getJson<{ workflow_runs: GhRun[] }>("GitHub", `${base}/actions/workflows/uptime.yml/runs?per_page=100&created=>=${new Date(now - 7 * DAY).toISOString().slice(0, 10)}`, ghHeaders(token)),
    getJson<{ created_at: string; html_url: string }[]>("GitHub", `${base}/issues?labels=uptime&state=open&per_page=5`, ghHeaders(token)),
  ]);
  const done = runs.workflow_runs.filter((r) => r.status === "completed" && (r.conclusion === "success" || r.conclusion === "failure"));
  const pings = done.map((r) => ({ ok: r.conclusion === "success", at: Date.parse(r.created_at) }));
  const day = pings.filter((p) => p.at >= now - DAY);
  const lastFail = pings.find((p) => !p.ok);
  const latest = pings[0];
  const link = { label: "Uptime runs", href: `https://github.com/${repo}/actions/workflows/uptime.yml` };
  if (issues.length) {
    const since = Date.parse(issues[0].created_at);
    return {
      id: "uptime",
      title: "Uptime",
      state: "down",
      summary: "The site is down: the uptime check is failing.",
      rows: [{ label: "Down since", value: "", at: since, state: "down", href: issues[0].html_url }, ...(latest ? [{ label: "Last check", value: latest.ok ? "Passed" : "Failed", at: latest.at }] : [])],
      link,
    };
  }
  if (!latest) {
    return {
      id: "uptime",
      title: "Uptime",
      state: "warn",
      summary: "No uptime checks in the last 7 days.",
      rows: [],
      setup: "Set the repository variable UPTIME_URL to the site's address so the Uptime workflow runs (see .github/workflows/uptime.yml).",
      link,
    };
  }
  const p24 = uptimePercent(day);
  const p7 = uptimePercent(pings);
  const stale = latest.at < now - 2 * 60 * 60 * 1000;
  return {
    id: "uptime",
    title: "Uptime",
    state: !latest.ok || stale ? "warn" : "ok",
    summary: stale ? "Uptime checks have stopped running (GitHub may have paused the schedule)." : latest.ok ? `Up. ${p24 ?? p7}% of checks passed in the last day.` : "The last uptime check failed.",
    rows: [
      { label: "Last check", value: latest.ok ? "Passed" : "Failed", at: latest.at, state: latest.ok ? "ok" : "warn" },
      { label: "Last 24 hours", value: p24 === null ? "No checks" : `${p24}% of ${plural(day.length, "check")}` },
      { label: "Last 7 days", value: `${p7}% of ${plural(pings.length, "check")}` },
      ...(lastFail ? [{ label: "Last failed check", value: "", at: lastFail.at }] : []),
    ],
    link,
  };
}

// ---------- The live site, loaded from outside ----------

interface Probe {
  status: number;
  ms: number;
  headers: Headers;
  body: string;
}

/** Loads one address the way a visitor's browser would, or says why it couldn't. */
async function probe(url: string, text = false): Promise<Probe | { error: string }> {
  const started = Date.now();
  try {
    const res = await fetch(url, { cache: "no-store", redirect: "follow", headers: { "user-agent": "Gradelings-System-Check" }, signal: AbortSignal.timeout(TIMEOUT) });
    const body = text ? await res.text() : "";
    if (!text) await res.body?.cancel();
    return { status: res.status, ms: Date.now() - started, headers: res.headers, body };
  } catch (e) {
    return { error: (e as Error).name === "TimeoutError" ? "didn't answer in time" : "couldn't be reached" };
  }
}

const isProbe = (p: Probe | { error: string }): p is Probe => !("error" in p);

/**
 * Loads the public pages, the app and the parent area from the site's own address and checks what a browser needs:
 * each answers, carries its security policy tag, and the scripts and styles it names are really there. A console
 * error in a browser can't be seen from here; the playthrough tests catch those before a deploy.
 */
export async function siteCheck(): Promise<HealthCheck> {
  const origin = env("NEXT_PUBLIC_SITE_URL").replace(/\/$/, "") || "https://gradelings.com";
  const title = "Live site";
  let host: string;
  try {
    host = new URL(origin).hostname;
  } catch {
    return { id: "site", title, state: "off", summary: "The site address isn't a valid address.", rows: [], setup: "Set NEXT_PUBLIC_SITE_URL to the live address, such as https://gradelings.com." };
  }
  if (host === "localhost" || host === "127.0.0.1" || host.endsWith(".local")) {
    return { id: "site", title, state: "off", summary: "The site address points at this computer, so there is no live site to load.", rows: [], setup: "Set NEXT_PUBLIC_SITE_URL to the live address, such as https://gradelings.com." };
  }

  const pages = await Promise.all(SITE_PAGES.map(async (path) => ({ path, got: await probe(origin + path, true) })));
  const files = await Promise.all(SITE_FILES.map(async (path) => ({ path, got: await probe(origin + path) })));
  if ([...pages, ...files].some((r) => isProbe(r.got) && r.got.headers.has(MAINTENANCE_HEADER) && r.path !== "/")) {
    return { id: "site", title, state: "warn", summary: "Maintenance mode is on, so every page but the home page answers with the maintenance message.", rows: [], link: { label: "Open the site", href: origin } };
  }

  // The build files each page names. A different page often shares them, so each address is fetched once.
  const assetPages = new Map<string, string>();
  for (const { path, got } of pages) if (isProbe(got) && got.status === 200) for (const a of pageAssets(got.body)) if (!assetPages.has(a)) assetPages.set(a, path);
  const assets = await Promise.all([...assetPages].map(async ([a, path]) => ({ a, path, got: await probe(origin + a) })));
  const missing = assets.filter((x) => !isProbe(x.got) || x.got.status !== 200);

  const rows: CheckRow[] = [];
  const problems: string[] = [];
  for (const { path, got } of pages) {
    if (!isProbe(got)) {
      rows.push({ label: path, value: `Page ${got.error}`, state: "down" });
      problems.push(`${path} ${got.error}`);
      continue;
    }
    const wrong = got.status !== 200 ? [`answered ${got.status}`] : pagePolicyProblems(got.body, got.headers.get("content-security-policy"));
    const slow = got.ms > SITE_SLOW_MS;
    rows.push({ label: path, value: wrong.length ? wrong.join(", ") : `Loaded in ${got.ms} ms`, state: wrong.length ? "down" : slow ? "warn" : "ok" });
    if (wrong.length) problems.push(got.status !== 200 ? `${path} ${wrong[0]}` : `${path} has ${wrong.join(" and ")}`);
  }
  for (const { path, got } of files) {
    const bad = !isProbe(got) ? got.error : got.status !== 200 ? `answered ${got.status}` : "";
    rows.push({ label: path, value: bad || `Loaded in ${(got as Probe).ms} ms`, state: bad ? "down" : "ok" });
    if (bad) problems.push(`${path} ${bad}`);
  }
  const checked = assets.length;
  rows.push({
    label: "Scripts and styles",
    value: missing.length ? `${checked - missing.length} of ${checked} loaded; missing: ${missing.slice(0, 3).map((x) => x.a.split("?")[0].split("/").pop()).join(", ")}` : checked ? `All ${checked} loaded` : "None found on the pages",
    state: missing.length ? "down" : checked ? "ok" : "warn",
  });
  if (missing.length) problems.push(`${plural(missing.length, "build file")} named by ${[...new Set(missing.map((x) => x.path))].join(", ")} didn't load`);

  const slow = rows.filter((r) => r.state === "warn");
  const state: CheckState = problems.length ? "down" : slow.length || !checked ? "warn" : "ok";
  const summary = problems.length
    ? `${problems[0].charAt(0).toUpperCase()}${problems[0].slice(1)}.${problems.length > 1 ? ` ${problems.length - 1} more problem${problems.length > 2 ? "s" : ""}.` : ""}`
    : state === "warn"
      ? "Everything answers, but something is slow or the pages named no build files."
      : `All ${SITE_PAGES.length} pages and ${SITE_FILES.length} files load, each page with its security policy.`;
  return { id: "site", title, state, summary, rows, link: { label: "Open the site", href: origin } };
}

export async function buildsCheck(): Promise<HealthCheck> {
  const { token, repo } = github();
  if (!token || !repo) return { id: "builds", title: "Builds (GitHub Actions)", state: "off", summary: "Not connected to GitHub.", rows: [], setup: GITHUB_SETUP };
  const runs = await getJson<{ workflow_runs: GhRun[] }>("GitHub", `https://api.github.com/repos/${repo}/actions/workflows/ci.yml/runs?branch=main&per_page=10`, ghHeaders(token));
  const done = runs.workflow_runs.filter((r) => r.status === "completed" && r.conclusion !== "cancelled" && r.conclusion !== "skipped");
  const running = runs.workflow_runs.find((r) => r.status !== "completed");
  const latest = done[0];
  const link = { label: "CI runs", href: `https://github.com/${repo}/actions/workflows/ci.yml?query=branch%3Amain` };
  if (!latest) return { id: "builds", title: "Builds (GitHub Actions)", state: "warn", summary: "No finished CI runs on main yet.", rows: [], link };
  const ok = latest.conclusion === "success";
  const title = (r: GhRun) => (r.display_title ?? r.head_commit?.message ?? "").split("\n")[0].slice(0, 100);
  return {
    id: "builds",
    title: "Builds (GitHub Actions)",
    state: ok ? "ok" : "down",
    summary: ok ? "The latest build of main passed." : "The latest build of main failed.",
    rows: [
      { label: "Latest on main", value: `${ok ? "Passed" : "Failed"}: ${title(latest)}`, at: Date.parse(latest.created_at), state: ok ? "ok" : "down", href: latest.html_url },
      ...(running ? [{ label: "Running now", value: title(running), at: Date.parse(running.created_at), href: running.html_url }] : []),
      ...done.slice(1, 5).map((r) => ({ label: r.conclusion === "success" ? "Passed" : "Failed", value: title(r), at: Date.parse(r.created_at), href: r.html_url, state: (r.conclusion === "success" ? "ok" : "down") as CheckState })),
    ],
    link,
  };
}

// ---------- Vercel deployments ----------

interface VercelDeployment {
  uid: string;
  url?: string;
  state?: string;
  readyState?: string;
  target?: string | null;
  created: number;
  meta?: { githubCommitMessage?: string };
}

type VercelPlan = "hobby" | "pro" | "enterprise";

/** The plan the project's team (or personal account) is on. Pro if Vercel doesn't say: it's what the site runs on. */
async function vercelPlan(team: string, headers: Record<string, string>): Promise<VercelPlan> {
  try {
    const url = team ? `https://api.vercel.com/v2/teams/${encodeURIComponent(team)}` : "https://api.vercel.com/v2/user";
    const r = await getJson<{ billing?: { plan?: string }; user?: { billing?: { plan?: string } } }>("Vercel", url, headers);
    const plan = (r.billing ?? r.user?.billing)?.plan?.toLowerCase();
    return plan === "hobby" || plan === "enterprise" ? plan : "pro";
  } catch {
    return "pro";
  }
}

export async function deploysCheck(now = Date.now()): Promise<HealthCheck> {
  const token = env("VERCEL_TOKEN");
  const project = env("VERCEL_PROJECT_ID");
  if (!token || !project)
    return {
      id: "deploys",
      title: "Deploys (Vercel)",
      state: "off",
      summary: "Not connected to Vercel.",
      rows: [],
      setup: "Set VERCEL_TOKEN (a read-only token from Vercel's Account Settings > Tokens, scoped to the team) and VERCEL_PROJECT_ID (Project Settings > General); add VERCEL_TEAM_ID if the project is in a team.",
    };
  const q = new URLSearchParams({ projectId: project, limit: "100", since: String(now - DAY) });
  const team = env("VERCEL_TEAM_ID");
  if (team) q.set("teamId", team);
  const recent = new URLSearchParams({ projectId: project, limit: "20", ...(team ? { teamId: team } : {}) });
  const headers = { authorization: `Bearer ${token}` };
  const [today, list, plan] = await Promise.all([
    getJson<{ deployments: VercelDeployment[] }>("Vercel", `https://api.vercel.com/v6/deployments?${q}`, headers),
    getJson<{ deployments: VercelDeployment[] }>("Vercel", `https://api.vercel.com/v6/deployments?${recent}`, headers),
    vercelPlan(team, headers),
  ]);
  const state = (d: VercelDeployment) => (d.state ?? d.readyState ?? "").toUpperCase();
  const prod = list.deployments.filter((d) => d.target === "production");
  const live = prod.find((d) => state(d) === "READY");
  const latestProd = prod[0];
  const failedWeek = list.deployments.filter((d) => state(d) === "ERROR" && d.created >= now - 7 * DAY);
  const used = today.deployments.length;
  const limit = plan === "enterprise" ? null : VERCEL_DAILY_DEPLOYS[plan];
  const planName = plan[0].toUpperCase() + plan.slice(1);
  const nearLimit = limit !== null && used >= limit * 0.8;
  const prodFailed = latestProd && state(latestProd) === "ERROR";
  const label = (d: VercelDeployment) => d.meta?.githubCommitMessage?.split("\n")[0].slice(0, 100) || d.url || d.uid;
  const sha = env("VERCEL_GIT_COMMIT_SHA");
  const checkState: CheckState = prodFailed ? "down" : nearLimit || failedWeek.length ? "warn" : "ok";
  return {
    id: "deploys",
    title: "Deploys (Vercel)",
    state: checkState,
    summary: prodFailed
      ? "The latest production deploy failed; the one before it is still live."
      : nearLimit
        ? `${used} of ${limit?.toLocaleString("en-US")} deploys used in the last 24 hours.`
        : live
          ? "Production is live."
          : "No live production deploy found.",
    rows: [
      ...(live ? [{ label: "Live in production", value: label(live), at: live.created, state: "ok" as CheckState, href: live.url ? `https://${live.url}` : undefined }] : []),
      ...(latestProd && latestProd !== live ? [{ label: "Latest production deploy", value: `${state(latestProd).toLowerCase()}: ${label(latestProd)}`, at: latestProd.created, state: (prodFailed ? "down" : "warn") as CheckState }] : []),
      ...(sha ? [{ label: "This server runs", value: `${sha.slice(0, 7)} (${env("VERCEL_ENV") || "unknown"})` }] : []),
      { label: "Deploys in 24 hours", value: limit === null ? `${used} (${planName}: no set limit)` : `${used} of ${limit.toLocaleString("en-US")} (${planName} limit)`, state: nearLimit ? "warn" : "ok" },
      { label: "Failed deploys in 7 days", value: String(failedWeek.length), state: failedWeek.length ? "warn" : "ok" },
    ],
    link: { label: "Vercel deployments", href: "https://vercel.com/dashboard" },
  };
}

// ---------- Sentry ----------

interface SentryIssue {
  id: string;
  title: string;
  culprit?: string;
  permalink?: string;
  firstSeen: string;
  lastSeen: string;
  count: string;
  level?: string;
}

export async function errorsCheck(now = Date.now()): Promise<HealthCheck> {
  // The Sentry Vercel integration sets SENTRY_AUTH_TOKEN to an upload-only token that can't read issues,
  // so a separate read token wins when it's set.
  const token = env("SENTRY_READ_TOKEN") || env("SENTRY_AUTH_TOKEN");
  const org = env("SENTRY_ORG");
  const project = env("SENTRY_PROJECT");
  const dsn = env("SENTRY_DSN") || env("NEXT_PUBLIC_SENTRY_DSN");
  if (!token || !org || !project)
    return {
      id: "errors",
      title: "Errors (Sentry)",
      state: "off",
      summary: dsn ? "Errors are reported to Sentry, but this page can't read them yet." : "Error reports are off.",
      rows: [],
      setup: `${dsn ? "" : "Set SENTRY_DSN to turn on error reports. "}Set SENTRY_READ_TOKEN (an internal integration token with read access to Issues & Events), SENTRY_ORG and SENTRY_PROJECT (their slugs). Add SENTRY_API_BASE=https://de.sentry.io for an EU organization.`,
    };
  const base = (env("SENTRY_API_BASE") || "https://sentry.io").replace(/\/$/, "");
  let issues: SentryIssue[];
  try {
    issues = await getJson<SentryIssue[]>(
      "Sentry",
      `${base}/api/0/projects/${encodeURIComponent(org)}/${encodeURIComponent(project)}/issues/?query=${encodeURIComponent("is:unresolved")}&statsPeriod=14d&sort=date`,
      { authorization: `Bearer ${token}` },
    );
  } catch (e) {
    if (!(e instanceof HttpError && (e.status === 401 || e.status === 403))) throw e;
    return {
      id: "errors",
      title: "Errors (Sentry)",
      state: "down",
      summary: `${e.message} The token can't read issues.`,
      rows: [],
      setup:
        "Create an internal integration in Sentry (Settings > Developer Settings > Custom Integrations) with Read access to Issue & Event, and set its token as SENTRY_READ_TOKEN. The SENTRY_AUTH_TOKEN the Sentry Vercel integration adds can only upload builds.",
    };
  }
  const lastDay = issues.filter((i) => Date.parse(i.lastSeen) >= now - DAY);
  const rows: CheckRow[] = issues.slice(0, 15).map((i) => ({
    label: i.title.slice(0, 120),
    value: `${Number(i.count) === 1 ? "1 event" : `${Number(i.count).toLocaleString("en-CA")} events`}, open ${plural(Math.max(0, Math.floor((now - Date.parse(i.firstSeen)) / DAY)), "day")}`,
    at: Date.parse(i.lastSeen),
    state: Date.parse(i.lastSeen) >= now - DAY ? "warn" : undefined,
    href: i.permalink,
  }));
  return {
    id: "errors",
    title: "Errors (Sentry)",
    state: lastDay.length ? "warn" : "ok",
    summary: issues.length ? `${plural(issues.length, "open issue")}, ${lastDay.length} seen in the last day.` : "No open issues.",
    rows,
    link: { label: "Sentry issues", href: `https://${org}.sentry.io/issues/` },
  };
}

// ---------- Stripe ----------

/** The events the app's webhook handles (src/app/api/billing/webhook/route.ts, docs/DEPLOY.md). */
export const STRIPE_EVENTS = [
  "checkout.session.completed",
  "customer.subscription.created",
  "customer.subscription.updated",
  "customer.subscription.deleted",
  "invoice.paid",
  "charge.refunded",
  "invoice.payment_failed",
  "charge.dispute.created",
];
/** A passing checkout test is trusted this long (or until the key or a price id changes), so the 15-minute watch doesn't open a session each time. */
export const CHECKOUT_TEST_MS = 6 * 3_600_000;
const CHECKOUT_TEST_KEY = "stripe_checkout_test";

interface StripePrice {
  id: string;
  active: boolean;
  currency: string;
  livemode: boolean;
  unit_amount: number | null;
  recurring: { interval: string } | null;
}

/** A Stripe GET that hands back Stripe's own error message instead of throwing it. */
async function stripeGet<T>(key: string, path: string): Promise<{ ok: true; data: T } | { ok: false; status: number; message: string }> {
  let res: Response;
  try {
    res = await fetch(`https://api.stripe.com/v1/${path}`, { headers: { authorization: `Bearer ${key}` }, cache: "no-store", signal: AbortSignal.timeout(TIMEOUT) });
  } catch (e) {
    return { ok: false, status: 0, message: (e as Error).name === "TimeoutError" ? "Stripe didn't answer in time." : "Couldn't reach Stripe." };
  }
  const body = (await res.json().catch(() => ({}))) as T & { error?: { message?: string } };
  if (!res.ok) return { ok: false, status: res.status, message: body.error?.message ?? `Stripe answered ${res.status}.` };
  return { ok: true, data: body };
}

/** One configured price: it exists for this key, is active, recurring on the right interval, in the right currency and at the advertised amount. */
export async function priceRow(key: string, live: boolean, label: string, id: string, interval: "month" | "year", currency: Currency): Promise<CheckRow> {
  const r = await stripeGet<StripePrice>(key, `prices/${encodeURIComponent(id)}`);
  if (!r.ok) return { label, value: r.status === 404 ? `${id} doesn't exist for this ${live ? "live" : "test"} key.` : r.message, state: "down" };
  const p = r.data;
  const want = Math.round(PRICES_BY_CURRENCY[currency][interval].amount * 100);
  const amount = p.unit_amount === null ? "no set amount" : `${(p.unit_amount / 100).toFixed(2)} ${p.currency.toUpperCase()}`;
  const problem = !p.active
    ? "is archived, so checkout refuses it"
    : p.livemode !== live
      ? `is a ${p.livemode ? "live" : "test"} price but the key is ${live ? "live" : "test"}`
      : p.currency.toLowerCase() !== currency.toLowerCase()
        ? `is in ${p.currency.toUpperCase()}, not ${currency}`
        : p.recurring?.interval !== interval
          ? `bills ${p.recurring ? `every ${p.recurring.interval}` : "once"}, not every ${interval}`
          : p.unit_amount !== want
            ? `charges ${amount} but the site shows ${(want / 100).toFixed(2)} ${currency}`
            : "";
  return { label, value: problem ? `${id} ${problem}.` : `${amount} every ${interval}, active`, state: problem ? "down" : "ok" };
}

interface CheckoutTest {
  at: number;
  fp: string;
  results: { currency: Currency; error?: string }[];
}

/**
 * Opens and at once expires a Checkout Session per currency that's set up (see `testCheckout`). Nobody can pay
 * it, so nothing is charged. A pass is kept for CHECKOUT_TEST_MS; a failure is tried again on the next look.
 */
async function checkoutTest(key: string, currencies: Currency[], now: number): Promise<CheckoutTest> {
  const fp = createHash("sha256")
    .update([key, ...currencies.flatMap((c) => Object.values(stripePrices(c) ?? {}))].join("|"))
    .digest("hex")
    .slice(0, 16);
  const saved = await getSetting(CHECKOUT_TEST_KEY).then((v) => (v ? (JSON.parse(v) as CheckoutTest) : null)).catch(() => null);
  if (saved && saved.fp === fp && now - saved.at < CHECKOUT_TEST_MS && saved.results.every((r) => !r.error)) return saved;
  const origin = env("NEXT_PUBLIC_SITE_URL").replace(/\/$/, "") || "https://gradelings.com";
  const results = await Promise.all(
    currencies.map((currency) =>
      testCheckout(currency, origin, now).then(
        () => ({ currency }),
        (e: Error) => ({ currency, error: e.message }),
      ),
    ),
  );
  const test = { at: now, fp, results };
  await setSetting(CHECKOUT_TEST_KEY, JSON.stringify(test)).catch(() => {});
  return test;
}

/** Whether a webhook endpoint in Stripe sends the events the app needs to this site. */
async function webhookEndpointRows(key: string, live: boolean): Promise<CheckRow[]> {
  const r = await stripeGet<{ data: { id: string; url: string; status: string; enabled_events: string[]; livemode: boolean }[] }>(key, "webhook_endpoints?limit=100");
  if (!r.ok) return [{ label: "Webhook endpoint", value: r.status === 403 ? "The key can't read webhook endpoints." : r.message, state: "warn" }];
  const host = (u: string) => {
    try {
      return new URL(u).hostname.replace(/^www\./, "");
    } catch {
      return "";
    }
  };
  const site = host(env("NEXT_PUBLIC_SITE_URL"));
  const ours = r.data.data.filter((w) => {
    try {
      return new URL(w.url).pathname === "/api/billing/webhook/" && (!site || host(w.url) === site);
    } catch {
      return false;
    }
  });
  const enabled = ours.filter((w) => w.status === "enabled");
  if (!enabled.length) {
    return [{ label: "Webhook endpoint", value: ours.length ? `${ours[0].url} is turned off in Stripe.` : `No ${live ? "live" : "test"} webhook sends to ${site || "this site"}/api/billing/webhook/.`, state: "down" }];
  }
  const w = enabled[0];
  const missing = w.enabled_events.includes("*") ? [] : STRIPE_EVENTS.filter((e) => !w.enabled_events.includes(e));
  return [
    { label: "Webhook endpoint", value: `${w.url}, on`, state: "ok" },
    { label: "Webhook events", value: missing.length ? `Missing: ${missing.join(", ")}` : `All ${STRIPE_EVENTS.length} the app needs`, state: missing.length ? "warn" : "ok" },
    ...(env("STRIPE_WEBHOOK_SECRET") ? [] : [{ label: "Webhook secret", value: "STRIPE_WEBHOOK_SECRET isn't set, so every webhook is refused.", state: "down" as CheckState }]),
  ];
}

export async function paymentsCheck(now = Date.now()): Promise<HealthCheck> {
  const key = env("STRIPE_SECRET_KEY");
  const hooks = await webhookSummary("stripe", now - 7 * DAY);
  const hookRows: CheckRow[] = [
    { label: "Last webhook received", value: hooks.lastAt ? "" : "None yet", at: hooks.lastAt ?? undefined },
    { label: "Webhooks in 7 days", value: `${hooks.received} received, ${hooks.failed} failed`, state: hooks.failed ? "warn" : undefined },
    ...hooks.recentFailures.slice(0, 5).map((f) => ({ label: `Failed: ${f.type ?? "unknown event"}`, value: f.error ?? "", at: f.at, state: "warn" as CheckState })),
  ];
  if (!key) return { id: "payments", title: "Payments (Stripe)", state: "off", summary: "Stripe isn't set up, so billing runs in practice mode.", rows: hookRows, setup: "Set STRIPE_SECRET_KEY, the two price ids and STRIPE_WEBHOOK_SECRET (docs/DEPLOY.md)." };
  const headers = { authorization: `Bearer ${key}` };
  const live = key.startsWith("sk_live_") || key.startsWith("rk_live_");
  // The key works at all; anything else Stripe can't read is shown on its own row below.
  await getJson("Stripe", "https://api.stripe.com/v1/balance", headers);

  const currencies = (["CAD", "USD"] as const).filter((c) => stripePrices(c));
  const [account, failed, prices, endpoint, portal, tax, test] = await Promise.all([
    stripeGet<{ charges_enabled?: boolean; requirements?: { disabled_reason?: string | null; currently_due?: string[] } }>(key, "account"),
    getJson<{ data: { id: string; type: string; created: number }[] }>(
      "Stripe",
      `https://api.stripe.com/v1/events?delivery_success=false&limit=10&created[gte]=${Math.floor((now - 7 * DAY) / 1000)}`,
      headers,
    ).catch(() => null),
    Promise.all(
      (["CAD", "USD"] as const).flatMap((c) => {
        const p = stripePrices(c);
        if (!p) return [];
        return [priceRow(key, live, `${c} monthly price`, p.month, "month", c), priceRow(key, live, `${c} yearly price`, p.year, "year", c)];
      }),
    ),
    webhookEndpointRows(key, live),
    stripeGet<{ data: { active: boolean }[] }>(key, "billing_portal/configurations?is_default=true&limit=1"),
    currencies.includes("USD") ? stripeGet<{ status?: string }>(key, "tax/settings") : null,
    currencies.length ? checkoutTest(key, [...currencies], now) : null,
  ]);

  // A test key on the real site means no family can actually pay; anywhere else it is expected.
  const production = env("VERCEL_ENV") === "production";
  const rows: CheckRow[] = [{ label: "Key", value: live ? "Live mode" : production ? "Test mode on the live site, so no real payment can go through" : "Test mode", state: live ? "ok" : production ? "down" : undefined }];
  if (account.ok) {
    const a = account.data;
    const due = a.requirements?.currently_due?.length ?? 0;
    rows.push({
      label: "Account can take payments",
      value: a.charges_enabled ? (due ? `Yes, but Stripe wants ${plural(due, "detail")} soon` : "Yes") : `No${a.requirements?.disabled_reason ? ` (${a.requirements.disabled_reason})` : ""}`,
      state: !a.charges_enabled ? "down" : due ? "warn" : "ok",
    });
  }
  if (!currencies.length) rows.push({ label: "Prices", value: "STRIPE_PRICE_MONTHLY and STRIPE_PRICE_YEARLY aren't set, so checkout is off.", state: "down" });
  rows.push(...prices);
  if (!currencies.includes("USD")) rows.push({ label: "USD prices", value: "Not set up (only needed for US families)." });
  if (test) {
    for (const r of test.results) {
      rows.push({ label: `Test checkout (${r.currency})`, value: r.error ? `Stripe refused it: ${r.error}` : "Opened and closed a checkout, nothing charged", at: test.at, state: r.error ? "down" : "ok" });
    }
  }
  if (tax) rows.push({ label: "Stripe Tax (US checkout)", value: tax.ok ? (tax.data.status === "active" ? "Active" : "Not finished in Stripe") : tax.message, state: tax.ok && tax.data.status === "active" ? "ok" : "warn" });
  rows.push(...endpoint);
  rows.push({
    label: "Billing portal",
    value: portal.ok ? (portal.data.data.some((c) => c.active) ? "Set up" : "No default portal, so Manage subscription fails") : portal.message,
    state: portal.ok && portal.data.data.some((c) => c.active) ? "ok" : "warn",
  });
  const undelivered = failed?.data ?? [];
  if (failed) rows.push({ label: "Undelivered events in 7 days", value: String(undelivered.length), state: undelivered.length ? "warn" : "ok" });
  rows.push(...undelivered.slice(0, 5).map((e) => ({ label: `Undelivered: ${e.type}`, value: e.id, at: e.created * 1000, state: "warn" as CheckState })));
  rows.push(...hookRows);

  const broken = rows.filter((r) => r.state === "down");
  const state: CheckState = broken.length ? "down" : rows.some((r) => r.state === "warn") || hooks.failed ? "warn" : "ok";
  const summary = broken.length
    ? `Checkout needs fixing: ${broken[0].label}${broken.length > 1 ? ` and ${broken.length - 1} more` : ""}.`
    : undelivered.length
      ? `Stripe couldn't deliver ${plural(undelivered.length, "event")} to the app this week.`
      : hooks.failed
        ? `${plural(hooks.failed, "webhook")} failed in the app this week.`
        : state === "warn"
          ? `Checkout works with the ${live ? "live" : "test"} key; see the rows marked for a look.`
          : `Checkout works with the ${live ? "live" : "test"} key, and nothing was charged to check.`;
  return { id: "payments", title: "Payments (Stripe)", state, summary, rows, link: { label: "Stripe webhooks", href: "https://dashboard.stripe.com/webhooks" } };
}

// ---------- Email (Resend) ----------

export async function emailCheck(now = Date.now()): Promise<HealthCheck> {
  const key = env("RESEND_API_KEY");
  const counts = await emailCounts(now - 30 * DAY);
  // Emails that left for Resend; ones skipped (email off) or refused never reached anyone.
  const sent = Object.entries(counts).reduce((s, [status, n]) => (status === "skipped" || status === "failed" ? s : s + n), 0);
  const bounced = counts.bounced ?? 0;
  const complained = counts.complained ?? 0;
  const rate = (n: number) => (sent ? `${Math.round((n / sent) * 1000) / 10}%` : "—");
  const rateState = emailRateState(sent, bounced, complained);
  const hooks = await webhookSummary("resend", now - 7 * DAY);
  const rows: CheckRow[] = [
    { label: "Emails in 30 days", value: sent.toLocaleString("en-CA") },
    { label: "Bounced", value: `${bounced} (${rate(bounced)})`, state: rateState === "warn" && bounced ? "warn" : undefined },
    { label: "Marked as spam", value: `${complained} (${rate(complained)})`, state: rateState === "warn" && complained ? "warn" : undefined },
    { label: "Last delivery report", value: env("RESEND_WEBHOOK_SECRET") ? (hooks.lastAt ? "" : "None yet") : "Webhook not set up", at: hooks.lastAt ?? undefined },
    ...(hooks.failed ? [{ label: "Refused reports in 7 days", value: String(hooks.failed), state: "warn" as CheckState }] : []),
  ];
  if (!key || !env("EMAIL_FROM")) return { id: "email", title: "Email (Resend)", state: "off", summary: "Email isn't set up, so nothing is sent.", rows, setup: "Set RESEND_API_KEY and EMAIL_FROM (docs/DEPLOY.md)." };
  let domains: { name: string; status: string }[] | null = null;
  let note = "";
  try {
    domains = (await getJson<{ data: { name: string; status: string }[] }>("Resend", "https://api.resend.com/domains", { authorization: `Bearer ${key}` })).data;
  } catch (e) {
    if (e instanceof HttpError && (e.status === 401 || e.status === 403)) note = "The key can only send, so domains can't be checked here.";
    // Resend answers 400 "API key is invalid" for a key it doesn't know, so sending fails too.
    else if (e instanceof HttpError && e.status === 400)
      return {
        id: "email",
        title: "Email (Resend)",
        state: "down",
        summary: "Resend says RESEND_API_KEY isn't a valid key, so no email is sent.",
        rows,
        setup: "Create a full-access key in Resend (API Keys), paste it into RESEND_API_KEY for Production, then redeploy.",
        link: { label: "Resend API keys", href: "https://resend.com/api-keys" },
      };
    else throw e;
  }
  const unverified = (domains ?? []).filter((d) => d.status !== "verified");
  const state: CheckState = unverified.length ? "down" : rateState;
  return {
    id: "email",
    title: "Email (Resend)",
    state,
    summary: unverified.length
      ? `${plural(unverified.length, "sending domain")} not verified: email may not arrive.`
      : rateState === "warn"
        ? "Bounce or spam rate is high: Resend may pause sending."
        : note || "Sending works.",
    rows: [...(domains ?? []).map((d) => ({ label: `Domain ${d.name}`, value: d.status, state: (d.status === "verified" ? "ok" : "down") as CheckState })), ...rows],
    link: { label: "Resend", href: "https://resend.com/emails" },
  };
}

// ---------- The daily job ----------

export async function jobCheck(now = Date.now()): Promise<HealthCheck> {
  const runs = await recentJobRuns("daily", 7);
  const last = runs[0];
  const unfinished = (r: (typeof runs)[number]) => r.ok === true && (jobRemaining(r.detail)?.length ?? 0) > 0;
  const rows: CheckRow[] = runs.map((r) => ({
    label: r.ok === null ? "Still running or stopped" : r.ok ? (unfinished(r) ? "Ran out of time" : "Ran") : "Failed",
    value: r.ok === false ? (r.detail ?? "") : r.detail ? summarizeJob(r.detail) : "",
    at: r.startedAt,
    state: r.ok === false ? "down" : r.ok === null || unfinished(r) ? "warn" : "ok",
  }));
  if (!env("CRON_SECRET")) return { id: "job", title: "Daily email job", state: "down", summary: "CRON_SECRET isn't set, so the daily job refuses to run.", rows, setup: "Set CRON_SECRET (docs/DEPLOY.md)." };
  if (!last) return { id: "job", title: "Daily email job", state: "warn", summary: "The daily job hasn't run yet. It runs at 15:00 UTC.", rows };
  const late = last.startedAt < now - 26 * 60 * 60 * 1000;
  const left = last.ok ? jobRemaining(last.detail) : null;
  const state: CheckState = last.ok === false ? "down" : late || last.ok === null || left?.length ? "warn" : "ok";
  return {
    id: "job",
    title: "Daily email job",
    state,
    summary:
      last.ok === false
        ? "The last run failed."
        : late
          ? "The daily job didn't run in the last day."
          : last.ok === null
            ? "The last run didn't finish."
            : left?.length
              ? `The last run ran out of time with ${left.join(", ")} still to do. The hourly runs after it carry on from there.`
              : "Ran on time.",
    rows,
  };
}

/** The phases a run left undone, from the job's JSON result; null when it doesn't say. */
function jobRemaining(detail: string | null): string[] | null {
  try {
    const r = JSON.parse(detail ?? "") as { remaining?: unknown };
    return Array.isArray(r.remaining) ? r.remaining.map(String) : null;
  } catch {
    return null;
  }
}

/** "3 weekly, 1 reminder" from the job's JSON result. */
function summarizeJob(detail: string): string {
  try {
    const r = JSON.parse(detail) as Record<string, number>;
    const parts = Object.entries(r)
      .filter(([, n]) => typeof n === "number" && n > 0)
      .map(([k, n]) => `${n} ${k.replace(/([A-Z])/g, " $1").toLowerCase()}`);
    return parts.length ? parts.join(", ") : "Nothing to send";
  } catch {
    return "";
  }
}

// ---------- Backups ----------

const DRILL_KEY = "restore-drill";
export interface RestoreDrill {
  /** When the restore was practised (docs/RESTORE.md). */
  at: number;
  by: string;
  /** When it was written down here. */
  recordedAt: number;
}

export async function lastRestoreDrill(): Promise<RestoreDrill | null> {
  try {
    const d = JSON.parse((await getSetting(DRILL_KEY)) ?? "null") as Partial<RestoreDrill> | null;
    return d && typeof d.at === "number" ? { at: d.at, by: String(d.by ?? ""), recordedAt: Number(d.recordedAt ?? d.at) } : null;
  } catch {
    return null;
  }
}

/** Writes down that a restore was practised on a day (not in the future, not over a year ago). Throws a message to show. */
export async function recordRestoreDrill(admin: string, at: number, now = Date.now()): Promise<RestoreDrill> {
  if (!Number.isFinite(at) || at > now + DAY) throw new Error("That date is in the future.");
  if (at < now - 400 * DAY) throw new Error("That date is over a year ago. Practise a restore again.");
  const drill: RestoreDrill = { at: Math.min(at, now), by: admin, recordedAt: now };
  await setSetting(DRILL_KEY, JSON.stringify(drill));
  await audit(admin, "restore-drill.record", null, { at: drill.at });
  return drill;
}

export async function backupsCheck(now = Date.now()): Promise<HealthCheck> {
  const url = env("DATABASE_URL") || env("TURSO_DATABASE_URL");
  const hosted = /^(libsql|https?|wss?):/.test(url);
  const repo = env("GITHUB_REPOSITORY");
  const link = hosted ? { label: "Turso dashboard", href: "https://app.turso.tech/" } : repo ? { label: "Restore runbook", href: `https://github.com/${repo}/blob/main/docs/RESTORE.md` } : undefined;
  if (!hosted) return { id: "backups", title: "Backups", state: "off", summary: "The database is a local file, so Turso's backups don't apply.", rows: [] };
  const drill = await lastRestoreDrill();
  const state = restoreDrillState(drill?.at ?? null, now);
  return {
    id: "backups",
    title: "Backups",
    state,
    summary: !drill
      ? "No restore practice has been recorded. A backup you haven't restored is only a hope."
      : state === "warn"
        ? `The last restore practice was over ${RESTORE_DRILL_DAYS} days ago.`
        : "A restore was practised recently.",
    rows: [
      drill ? { label: "Last restore practised", value: drill.by ? `Recorded by ${drill.by}` : "", at: drill.at, state } : { label: "Last restore practised", value: "Never recorded", state },
      { label: "How", value: "docs/RESTORE.md: restore into a new database, run scripts/restore-check.mjs, delete the copy." },
    ],
    setup: drill && state === "ok" ? undefined : "Practise a restore (docs/RESTORE.md), then record the date below.",
    link,
  };
}

// ---------- Speed ----------

const SYNC_TRANSACTION = "POST /api/sync/";

async function sentryTable(base: string, token: string, org: string, project: string, dataset: string, fields: string[], query: string): Promise<Record<string, unknown>> {
  const p = new URLSearchParams({ dataset, statsPeriod: "24h", query: `project:${project} ${query}`, per_page: "1" });
  for (const f of fields) p.append("field", f);
  const res = await getJson<{ data?: Record<string, unknown>[] }>("Sentry", `${base}/api/0/organizations/${encodeURIComponent(org)}/events/?${p}`, { authorization: `Bearer ${token}` });
  return res.data?.[0] ?? {};
}

const num = (v: unknown): number | null => (typeof v === "number" && Number.isFinite(v) ? v : null);

export async function speedCheck(): Promise<HealthCheck> {
  const token = env("SENTRY_READ_TOKEN") || env("SENTRY_AUTH_TOKEN");
  const org = env("SENTRY_ORG");
  const project = env("SENTRY_PROJECT");
  const title = "Speed (Sync)";
  if (!token || !org || !project)
    return { id: "speed", title, state: "off", summary: "Timing is read from Sentry, which isn't connected to this page.", rows: [], setup: "Set SENTRY_READ_TOKEN (read access to the organization's events), SENTRY_ORG and SENTRY_PROJECT." };
  const base = (env("SENTRY_API_BASE") || "https://sentry.io").replace(/\/$/, "");
  const [timing, fetchFailed] = await Promise.allSettled([
    sentryTable(base, token, org, project, "spans", ["count()", "p50(span.duration)", "p95(span.duration)", "failure_rate()"], `is_transaction:true transaction:"${SYNC_TRANSACTION}"`),
    sentryTable(base, token, org, project, "errors", ["count()"], 'message:"fetch failed"'),
  ]);
  const refused = [timing, fetchFailed].find((r) => r.status === "rejected" && r.reason instanceof HttpError && (r.reason.status === 401 || r.reason.status === 403));
  if (refused)
    return { id: "speed", title, state: "down", summary: `${(refused as PromiseRejectedResult).reason.message} The token can't read the organization's events.`, rows: [], setup: "Give the Sentry token read access to the organization (org:read) as well as Issue & Event." };
  const rows: CheckRow[] = [];
  const t = timing.status === "fulfilled" ? timing.value : null;
  const p95 = t ? num(t["p95(span.duration)"]) : null;
  const rate = t ? num(t["failure_rate()"]) : null;
  const n = t ? num(t["count()"]) : null;
  const failed = fetchFailed.status === "fulfilled" ? num(fetchFailed.value["count()"]) : null;
  // A question Sentry couldn't answer is never "all fine".
  const state: CheckState = !t || fetchFailed.status === "rejected" ? "warn" : speedState(p95, rate, failed);
  if (t) {
    const sample = traceRate(SYNC_TRANSACTION, traceScale(env("SENTRY_TRACES_SCALE")));
    rows.push(
      { label: "Timed syncs in 24 hours", value: `${(n ?? 0).toLocaleString("en-CA")}${sample > 0 && sample < 1 ? ` (about 1 in ${Math.round(1 / sample)} are timed)` : ""}` },
      { label: "Typical sync", value: p50ms(t) },
      { label: "Slowest 1 in 20 syncs", value: p95 == null ? "No data" : `${Math.round(p95).toLocaleString("en-CA")} ms`, state: (p95 ?? 0) > SYNC_SLOW_MS ? "warn" : undefined },
      { label: "Syncs that failed", value: rate == null ? "No data" : `${Math.round(rate * 1000) / 10}%`, state: (rate ?? 0) >= SYNC_FAILURE_RATE ? "warn" : undefined },
    );
  } else rows.push({ label: "Sync timing", value: `Couldn't read it: ${(timing as PromiseRejectedResult).reason.message}`, state: "warn" });
  if (fetchFailed.status === "fulfilled") rows.push({ label: "\"fetch failed\" errors in 24 hours", value: String(failed ?? 0), state: (failed ?? 0) >= FETCH_FAILED_WARN ? "warn" : undefined });
  else rows.push({ label: "\"fetch failed\" errors", value: `Couldn't read them: ${(fetchFailed as PromiseRejectedResult).reason.message}`, state: "warn" });
  const bothFailed = !t && fetchFailed.status === "rejected";
  return {
    id: "speed",
    title,
    state,
    summary: bothFailed
      ? "Sentry didn't answer."
      : !t || fetchFailed.status === "rejected"
        ? "Part of the timing couldn't be read from Sentry."
        : state === "warn"
        ? "Sync is slow or failing: check Sentry."
        : n === 0 && t
          ? "No syncs were timed in the last day."
          : "Sync is fast and not failing.",
    rows,
    link: { label: "Sentry performance", href: `https://${org}.sentry.io/explore/traces/` },
  };
}

function p50ms(t: Record<string, unknown>): string {
  const v = num(t["p50(span.duration)"]);
  return v == null ? "No data" : `${Math.round(v).toLocaleString("en-CA")} ms`;
}

// ---------- Admin security ----------

export async function securityCheck(now = Date.now()): Promise<HealthCheck> {
  const admins = [...adminEmails()];
  const support = [...supportEmails()];
  const staff = [...admins, ...support];
  const title = "Admin security";
  if (!staff.length) return { id: "security", title, state: "off", summary: "No admin accounts are listed.", rows: [], setup: "Set ADMIN_EMAILS." };
  const accounts = await query<{ email: string; verified: number | null; totp: number | null }>(
    `SELECT email, email_verified_at AS verified, totp_enabled_at AS totp FROM parents WHERE role != 'student' AND LOWER(email) IN (${staff.map(() => "?").join(",")})`,
    staff,
  );
  const byEmail = new Map(accounts.map((a) => [String(a.email).toLowerCase(), a]));
  const mode = twoFactorMode();
  const rows: CheckRow[] = staff.map((e) => {
    const a = byEmail.get(e);
    const role = admins.includes(e) ? "Admin" : "Support";
    if (!a) return { label: `${role} ${e}`, value: "No account yet" };
    if (a.totp != null) return { label: `${role} ${e}`, value: "Two-step on", at: Number(a.totp), state: "ok" as CheckState };
    return { label: `${role} ${e}`, value: mode === "required" ? "No two-step: can't open the panel until it's set up" : "No two-step (optional on this server)", state: "warn" as CheckState };
  });
  const without = rows.filter((r) => r.state === "warn").length;
  const day = await staffFailuresSince(now - DAY);
  const week = await staffFailuresSince(now - 7 * DAY);
  const alerts = await query<{ key: string; at: number }>(
    "SELECT key, updated_at AS at FROM admin_settings WHERE (key = ? OR key LIKE 'alert-sent:student-login-guessing%') AND updated_at >= ?",
    [`alert-sent:${STAFF_ALERT_KEY}`, now - 7 * DAY],
  );
  const staffAlert = alerts.filter((a) => a.key === `alert-sent:${STAFF_ALERT_KEY}`).map((a) => Number(a.at))[0];
  const studentAlert = Math.max(0, ...alerts.filter((a) => a.key !== `alert-sent:${STAFF_ALERT_KEY}`).map((a) => Number(a.at)));
  rows.push(
    { label: "Two-step sign-in", value: mode === "required" ? "Required for the panel" : "Optional (ADMIN_2FA=optional)", state: mode === "required" ? "ok" : "warn" },
    { label: "Failed sign-ins in 24 hours", value: String(day.total), state: day.total >= STAFF_FAILURES_WARN ? "warn" : undefined },
    { label: "Failed sign-ins in 7 days", value: week.total ? `${week.total} (${week.byEmail.map((r) => `${r.n} for ${r.email}`).join(", ")})` : "0" },
    staffAlert ? { label: "Admin sign-in alert", value: "Sent", at: staffAlert, state: "warn" } : { label: "Admin sign-in alert", value: "None in 7 days" },
    studentAlert ? { label: "Class sign-in guessing alert", value: "Sent", at: studentAlert, state: "warn" } : { label: "Class sign-in guessing alert", value: "None in 7 days" },
  );
  const state = worst(rows.map((r) => r.state ?? "ok"));
  return {
    id: "security",
    title,
    state,
    summary: without
      ? `${plural(without, "staff account")} without two-step sign-in.`
      : staffAlert || day.total >= STAFF_FAILURES_WARN
        ? "Repeated failed sign-ins to staff accounts."
        : mode === "optional"
          ? "Two-step sign-in is optional on this server."
          : "Every staff account uses two-step sign-in.",
    rows,
  };
}

// ---------- Capacity ----------

const SAMPLES_KEY = "capacity-samples";
interface SizeSample {
  at: number;
  bytes: number;
}

/** The database's size now, one sample a day kept for 90 days so growth can be shown. */
async function sizeSamples(bytes: number, now: number): Promise<SizeSample[]> {
  let samples: SizeSample[] = [];
  try {
    samples = (JSON.parse((await getSetting(SAMPLES_KEY)) ?? "[]") as SizeSample[]).filter((s) => Number.isFinite(s.at) && Number.isFinite(s.bytes));
  } catch {
    samples = [];
  }
  const last = samples[samples.length - 1];
  if (!last || now - last.at >= DAY) {
    samples = [...samples, { at: now, bytes }].filter((s) => s.at >= now - 90 * DAY);
    await setSetting(SAMPLES_KEY, JSON.stringify(samples));
  }
  return samples;
}

export async function capacityCheck(now = Date.now()): Promise<HealthCheck> {
  const title = "Capacity";
  const [size] = await query<{ pages: number; page_size: number }>("SELECT (SELECT page_count FROM pragma_page_count) AS pages, (SELECT page_size FROM pragma_page_size) AS page_size");
  const bytes = Number(size?.pages ?? 0) * Number(size?.page_size ?? 0);
  const [ev] = await query<{ last: number | null }>("SELECT MAX(seq) AS last FROM events");
  const samples = await sizeSamples(bytes, now);
  const limitMb = Number(env("DATABASE_SIZE_LIMIT_MB"));
  const limit = Number.isFinite(limitMb) && limitMb > 0 ? limitMb * 1_048_576 : null;
  const used = limit ? bytes / limit : null;
  const state = capacityState(used);
  const rows: CheckRow[] = [
    { label: "Database size", value: bytes ? megabytes(bytes) : "Unknown", state: state === "ok" ? undefined : state },
    { label: "Practice events written", value: Number(ev?.last ?? 0).toLocaleString("en-CA") },
    { label: "Practice events kept", value: "Forever: nothing deletes them, so this only grows" },
  ];
  const first = samples[0];
  const days = first ? (now - first.at) / DAY : 0;
  let perMonth: number | null = null;
  if (first && days >= 7) {
    perMonth = Math.max(0, ((bytes - first.bytes) / days) * 30);
    rows.push({ label: `Growth over ${Math.round(days)} days`, value: `${megabytes(Math.max(0, bytes - first.bytes))}, about ${megabytes(perMonth)} a month` });
  } else rows.push({ label: "Growth", value: "Measured once a week of history has built up" });
  if (limit) {
    rows.push({ label: "Plan limit", value: `${megabytes(limit)} (${Math.round((used ?? 0) * 100)}% used)`, state });
    if (perMonth && perMonth > 0 && bytes < limit) rows.push({ label: "Full in about", value: plural(Math.max(1, Math.round((limit - bytes) / perMonth)), "month") });
  }
  return {
    id: "capacity",
    title,
    state,
    summary: limit
      ? state === "ok"
        ? `${Math.round((used ?? 0) * 100)}% of the storage limit is used.`
        : `${Math.round((used ?? 0) * 100)}% of the storage limit is used: upgrade the Turso plan or prune data.`
      : "Set the plan's storage limit to get a warning before the database fills.",
    rows,
    setup: limit ? undefined : "Set DATABASE_SIZE_LIMIT_MB to your Turso plan's storage in megabytes (shown on Turso's pricing page and your dashboard).",
    link: { label: "Turso dashboard", href: "https://app.turso.tech/" },
  };
}

// ---------- Settings ----------

export function settingsCheck(): HealthCheck {
  const production = env("VERCEL_ENV") === "production" || process.env.NODE_ENV === "production";
  const rows: CheckRow[] = SETTINGS.map((s) => {
    const set = s.names.some((n) => env(n));
    return { label: s.label, value: set ? `Set (${s.names.find((n) => env(n))})` : `Missing: ${s.names.join(" or ")}. ${s.what}`, state: set ? "ok" : s.need === "required" ? "down" : s.need === "recommended" ? "warn" : undefined };
  });
  // Links in emails and shared pages use this address, so a set-but-wrong value is as bad as a missing one.
  const site = env("NEXT_PUBLIC_SITE_URL");
  if (site) {
    let problem = "";
    try {
      const u = new URL(site);
      if (u.protocol !== "https:") problem = "It should start with https://.";
      else if (/^(localhost|127\.|0\.0\.0\.0)/.test(u.hostname)) problem = "It points at this computer, not the public site.";
      else if (u.pathname !== "/" || u.search) problem = "It should be just the address, with no path.";
      rows.push({ label: "Site address format", value: problem ? `${problem} Now: ${u.origin}${u.pathname}` : `Public address: ${u.host}`, state: problem ? "warn" : "ok" });
    } catch {
      rows.push({ label: "Site address format", value: "It isn't a web address. Use https://www.gradelings.com.", state: "warn" });
    }
  }
  const forbidden = NEVER_IN_PRODUCTION.filter((n) => env(n));
  for (const n of forbidden) rows.unshift({ label: n, value: production ? "Set in production: turn it off" : "Set (fine outside production)", state: production ? "down" : "warn" });
  const missing = SETTINGS.filter((s) => s.need === "required" && !s.names.some((n) => env(n)));
  const state = worst(rows.map((r) => r.state ?? "ok"));
  return {
    id: "settings",
    title: "Settings",
    state,
    summary: missing.length ? `${plural(missing.length, "required setting")} missing.` : forbidden.length && production ? "A test-only setting is on in production." : "Every required setting is present. Values are never shown.",
    rows,
  };
}

// ---------- Providers' status pages ----------

interface StatuspageSummary {
  status?: { indicator?: string; description?: string };
  incidents?: { name: string; started_at?: string; created_at?: string; shortlink?: string; status?: string }[];
}

async function statuspage(name: string, url: string): Promise<StatusPage> {
  const d = await getJson<StatuspageSummary>(name, `${url}/api/v2/summary.json`).catch(() => getJson<StatuspageSummary>(name, `${url}/api/v2/status.json`));
  return {
    name,
    url,
    state: statuspageState(d.status?.indicator),
    description: d.status?.description ?? "Unknown",
    incidents: (d.incidents ?? [])
      .filter((i) => i.status !== "resolved" && i.status !== "postmortem")
      .map((i) => ({ name: i.name, startedAt: Date.parse(i.started_at ?? i.created_at ?? "") || null, href: i.shortlink ?? null })),
  };
}

async function stripeStatus(): Promise<StatusPage> {
  const d = await getJson<{ largestatus?: string; message?: string }>("Stripe", "https://status.stripe.com/current");
  return { name: "Stripe", url: "https://status.stripe.com", state: stripeStatusState(d.largestatus), description: d.message ?? "Unknown", incidents: [] };
}

async function tursoStatus(): Promise<StatusPage> {
  const d = await getJson<{ data?: { attributes?: { aggregate_state?: string } } }>("Turso", "https://status.turso.tech/index.json");
  const s = d.data?.attributes?.aggregate_state;
  return { name: "Turso", url: "https://status.turso.tech", state: betterStackState(s), description: s ? s[0].toUpperCase() + s.slice(1) : "Unknown", incidents: [] };
}

const STATUS_RUNNERS: Record<StatusPageName, () => Promise<StatusPage>> = {
  Vercel: () => statuspage("Vercel", "https://www.vercel-status.com"),
  GitHub: () => statuspage("GitHub", "https://www.githubstatus.com"),
  Sentry: () => statuspage("Sentry", "https://status.sentry.io"),
  Resend: () => statuspage("Resend", "https://resend-status.com"),
  Stripe: stripeStatus,
  Turso: tursoStatus,
};

/** One provider's status page; a page that can't be read is "worth a look", never an error. */
async function readStatusPage(name: StatusPageName): Promise<StatusPage> {
  const url = STATUS_PAGES.find((p) => p.name === name)!.url;
  return STATUS_RUNNERS[name]().catch((e: Error): StatusPage => ({ name, url, state: "warn", description: `Couldn't read the status page: ${e.message}`, incidents: [] }));
}

export async function statusPages(): Promise<StatusPage[]> {
  return Promise.all(STATUS_PAGES.map((p) => readStatusPage(p.name)));
}

// ---------- One card at a time, or all together ----------

const RUNNERS: Record<CheckId, (now: number) => Promise<HealthCheck>> = {
  database: () => databaseCheck(),
  uptime: (now) => uptimeCheck(now),
  site: () => siteCheck(),
  deploys: (now) => deploysCheck(now),
  builds: () => buildsCheck(),
  errors: (now) => errorsCheck(now),
  payments: (now) => paymentsCheck(now),
  email: (now) => emailCheck(now),
  job: (now) => jobCheck(now),
  backups: (now) => backupsCheck(now),
  speed: () => speedCheck(),
  security: (now) => securityCheck(now),
  capacity: (now) => capacityCheck(now),
  settings: async () => settingsCheck(),
};

export const isCheckId = (id: string): id is CheckId => CHECKS.some((c) => c.id === id);
export const isStatusPageName = (name: string): name is StatusPageName => STATUS_PAGES.some((p) => p.name === name);

/** Results are kept this long, so opening the page again doesn't call every service again. */
export const CACHE_MS = 60_000;
// Each card has its own entry, so the page can ask for every card at once and show each as it arrives.
const cache = new Map<string, { at: number; value: Promise<unknown> }>();

function cached<T>(key: string, opts: { refresh?: boolean; now?: number }, run: (now: number) => Promise<T>): Promise<CheckResult<T>> {
  const now = opts.now ?? Date.now();
  const hit = cache.get(key);
  if (!opts.refresh && hit && now - hit.at < CACHE_MS) return hit.value.then((result) => ({ checkedAt: hit.at, result: result as T }));
  const value = run(now);
  cache.set(key, { at: now, value });
  // A failed run isn't kept, so the next look tries again.
  value.catch(() => cache.get(key)?.value === value && cache.delete(key));
  return value.then((result) => ({ checkedAt: now, result }));
}

/** One check, turning an unexpected error into a "down" card. */
export function runCheck(id: CheckId, opts: { refresh?: boolean; now?: number } = {}): Promise<CheckResult<HealthCheck>> {
  const title = CHECKS.find((c) => c.id === id)!.title;
  return cached(`check:${id}`, opts, (now) => safely(id, title, () => RUNNERS[id](now)));
}

/** One provider's status page. */
export function runStatusPage(name: StatusPageName, opts: { refresh?: boolean; now?: number } = {}): Promise<CheckResult<StatusPage>> {
  return cached(`page:${name}`, opts, () => readStatusPage(name));
}

/** Every check and status page together, for the alerts and the morning digest. */
export async function systemReport(opts: { refresh?: boolean; now?: number } = {}): Promise<SystemReport> {
  const [checks, pages] = await Promise.all([Promise.all(CHECKS.map((c) => runCheck(c.id, opts))), Promise.all(STATUS_PAGES.map((p) => runStatusPage(p.name, opts)))]);
  return {
    checkedAt: Math.min(...checks.map((c) => c.checkedAt), ...pages.map((p) => p.checkedAt)),
    checks: checks.map((c) => c.result),
    statusPages: pages.map((p) => p.result),
  };
}

/** For tests. */
export function clearSystemCache() {
  cache.clear();
}
