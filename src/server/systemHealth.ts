import "server-only";
import {
  betterStackState,
  emailRateState,
  NEVER_IN_PRODUCTION,
  SETTINGS,
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
import { query } from "./db";
import { emailCounts } from "./emailLog";
import { recentJobRuns, webhookSummary } from "./monitor";

// Runs the System page's checks. Every token stays on the server: each check reads its own settings, asks the
// service with a read-only token, and returns only what the page shows. A check that isn't set up says so
// instead of failing, and one slow or broken service never holds up the rest (each call has a time limit).

const DAY = 86_400_000;
const TIMEOUT = 8_000;
/** Vercel's Hobby plan allows 100 deployments a day. */
export const VERCEL_DAILY_DEPLOYS = 100;

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
  const [today, list] = await Promise.all([
    getJson<{ deployments: VercelDeployment[] }>("Vercel", `https://api.vercel.com/v6/deployments?${q}`, headers),
    getJson<{ deployments: VercelDeployment[] }>("Vercel", `https://api.vercel.com/v6/deployments?${recent}`, headers),
  ]);
  const state = (d: VercelDeployment) => (d.state ?? d.readyState ?? "").toUpperCase();
  const prod = list.deployments.filter((d) => d.target === "production");
  const live = prod.find((d) => state(d) === "READY");
  const latestProd = prod[0];
  const failedWeek = list.deployments.filter((d) => state(d) === "ERROR" && d.created >= now - 7 * DAY);
  const used = today.deployments.length;
  const nearLimit = used >= VERCEL_DAILY_DEPLOYS * 0.8;
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
        ? `${used} of ${VERCEL_DAILY_DEPLOYS} deploys used in the last 24 hours.`
        : live
          ? "Production is live."
          : "No live production deploy found.",
    rows: [
      ...(live ? [{ label: "Live in production", value: label(live), at: live.created, state: "ok" as CheckState, href: live.url ? `https://${live.url}` : undefined }] : []),
      ...(latestProd && latestProd !== live ? [{ label: "Latest production deploy", value: `${state(latestProd).toLowerCase()}: ${label(latestProd)}`, at: latestProd.created, state: (prodFailed ? "down" : "warn") as CheckState }] : []),
      ...(sha ? [{ label: "This server runs", value: `${sha.slice(0, 7)} (${env("VERCEL_ENV") || "unknown"})` }] : []),
      { label: "Deploys in 24 hours", value: `${used} of ${VERCEL_DAILY_DEPLOYS} (Hobby limit)`, state: nearLimit ? "warn" : "ok" },
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
  const token = env("SENTRY_AUTH_TOKEN");
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
      setup: `${dsn ? "" : "Set SENTRY_DSN to turn on error reports. "}Set SENTRY_AUTH_TOKEN (an internal integration token with read access to Issues & Events), SENTRY_ORG and SENTRY_PROJECT (their slugs). Add SENTRY_API_BASE=https://de.sentry.io for an EU organization.`,
    };
  const base = (env("SENTRY_API_BASE") || "https://sentry.io").replace(/\/$/, "");
  const issues = await getJson<SentryIssue[]>(
    "Sentry",
    `${base}/api/0/projects/${encodeURIComponent(org)}/${encodeURIComponent(project)}/issues/?query=${encodeURIComponent("is:unresolved")}&statsPeriod=14d&sort=date`,
    { authorization: `Bearer ${token}` },
  );
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
  await getJson("Stripe", "https://api.stripe.com/v1/balance", headers);
  const failed = await getJson<{ data: { id: string; type: string; created: number }[] }>(
    "Stripe",
    `https://api.stripe.com/v1/events?delivery_success=false&limit=10&created[gte]=${Math.floor((now - 7 * DAY) / 1000)}`,
    headers,
  ).catch(() => null);
  const undelivered = failed?.data ?? [];
  const state: CheckState = undelivered.length || hooks.failed ? "warn" : "ok";
  return {
    id: "payments",
    title: "Payments (Stripe)",
    state,
    summary: undelivered.length ? `Stripe couldn't deliver ${plural(undelivered.length, "event")} to the app this week.` : hooks.failed ? `${plural(hooks.failed, "webhook")} failed in the app this week.` : `The ${live ? "live" : "test"} key works.`,
    rows: [
      { label: "Key", value: live ? "Live mode" : "Test mode", state: live ? "ok" : "warn" },
      ...(failed ? [{ label: "Undelivered events in 7 days", value: String(undelivered.length), state: (undelivered.length ? "warn" : "ok") as CheckState }] : []),
      ...undelivered.slice(0, 5).map((e) => ({ label: `Undelivered: ${e.type}`, value: e.id, at: e.created * 1000, state: "warn" as CheckState })),
      ...hookRows,
    ],
    link: { label: "Stripe webhooks", href: "https://dashboard.stripe.com/webhooks" },
  };
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
  const rows: CheckRow[] = runs.map((r) => ({
    label: r.ok === null ? "Still running or stopped" : r.ok ? "Ran" : "Failed",
    value: r.ok === false ? (r.detail ?? "") : r.detail ? summarizeJob(r.detail) : "",
    at: r.startedAt,
    state: r.ok === false ? "down" : r.ok === null ? "warn" : "ok",
  }));
  if (!env("CRON_SECRET")) return { id: "job", title: "Daily email job", state: "down", summary: "CRON_SECRET isn't set, so the daily job refuses to run.", rows, setup: "Set CRON_SECRET (docs/DEPLOY.md)." };
  if (!last) return { id: "job", title: "Daily email job", state: "warn", summary: "The daily job hasn't run yet. It runs at 15:00 UTC.", rows };
  const late = last.startedAt < now - 26 * 60 * 60 * 1000;
  const state: CheckState = last.ok === false ? "down" : late || last.ok === null ? "warn" : "ok";
  return {
    id: "job",
    title: "Daily email job",
    state,
    summary: last.ok === false ? "The last run failed." : late ? "The daily job didn't run in the last day." : last.ok === null ? "The last run didn't finish." : "Ran on time.",
    rows,
  };
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

// ---------- Settings ----------

export function settingsCheck(): HealthCheck {
  const production = env("VERCEL_ENV") === "production" || process.env.NODE_ENV === "production";
  const rows: CheckRow[] = SETTINGS.map((s) => {
    const set = s.names.some((n) => env(n));
    return { label: s.label, value: set ? `Set (${s.names.find((n) => env(n))})` : `Missing: ${s.names.join(" or ")}. ${s.what}`, state: set ? "ok" : s.need === "required" ? "down" : s.need === "recommended" ? "warn" : undefined };
  });
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

const STATUSPAGES = [
  { name: "Vercel", url: "https://www.vercel-status.com" },
  { name: "GitHub", url: "https://www.githubstatus.com" },
  { name: "Sentry", url: "https://status.sentry.io" },
  { name: "Resend", url: "https://resend-status.com" },
];

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

export async function statusPages(): Promise<StatusPage[]> {
  const pages = [...STATUSPAGES.map((p) => ({ name: p.name, url: p.url, run: () => statuspage(p.name, p.url) })), { name: "Stripe", url: "https://status.stripe.com", run: stripeStatus }, { name: "Turso", url: "https://status.turso.tech", run: tursoStatus }];
  return Promise.all(pages.map((p) => p.run().catch((e: Error): StatusPage => ({ name: p.name, url: p.url, state: "warn", description: `Couldn't read the status page: ${e.message}`, incidents: [] }))));
}

// ---------- All together ----------

let cache: { at: number; report: SystemReport } | null = null;
/** Results are kept this long, so opening the page again doesn't call every service again. */
export const CACHE_MS = 60_000;

export async function systemReport(opts: { refresh?: boolean; now?: number } = {}): Promise<SystemReport> {
  const now = opts.now ?? Date.now();
  if (!opts.refresh && cache && now - cache.at < CACHE_MS) return cache.report;
  const [checks, pages] = await Promise.all([
    Promise.all([
      safely("database", "Database", databaseCheck),
      safely("uptime", "Uptime", () => uptimeCheck(now)),
      safely("deploys", "Deploys (Vercel)", () => deploysCheck(now)),
      safely("builds", "Builds (GitHub Actions)", buildsCheck),
      safely("errors", "Errors (Sentry)", () => errorsCheck(now)),
      safely("payments", "Payments (Stripe)", () => paymentsCheck(now)),
      safely("email", "Email (Resend)", () => emailCheck(now)),
      safely("job", "Daily email job", () => jobCheck(now)),
      safely("settings", "Settings", async () => settingsCheck()),
    ]),
    statusPages(),
  ]);
  const report = { checkedAt: now, checks, statusPages: pages };
  cache = { at: now, report };
  return report;
}

/** For tests. */
export function clearSystemCache() {
  cache = null;
}
