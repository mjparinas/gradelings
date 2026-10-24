// The admin panel's System page: one check per part of the stack (database, uptime, builds, deploys, errors,
// payments, email, the daily job, settings) plus the providers' public status pages. Shared by the server,
// which runs the checks, and the panel, which shows them. Pure, so it is tested without a network.

/** ok: working. warn: worth a look. down: broken. off: not set up, so not checked. */
export type CheckState = "ok" | "warn" | "down" | "off";

export interface CheckRow {
  label: string;
  value: string;
  state?: CheckState;
  /** A time the row is about, shown as "3 days ago". */
  at?: number;
  href?: string;
}

export interface HealthCheck {
  id: string;
  title: string;
  state: CheckState;
  /** One line: what's going on. */
  summary: string;
  rows: CheckRow[];
  /** What to set up when the check is off, naming settings, never their values. */
  setup?: string;
  link?: { label: string; href: string };
}

export interface StatusIncident {
  name: string;
  startedAt: number | null;
  href: string | null;
}

export interface StatusPage {
  name: string;
  url: string;
  state: CheckState;
  description: string;
  incidents: StatusIncident[];
}

export interface SystemReport {
  checkedAt: number;
  checks: HealthCheck[];
  statusPages: StatusPage[];
}

/** The checks, in the order the page shows them, so it can draw every card before its result arrives. */
export const CHECKS = [
  { id: "database", title: "Database" },
  { id: "uptime", title: "Uptime" },
  { id: "site", title: "Live site" },
  { id: "deploys", title: "Deploys (Vercel)" },
  { id: "builds", title: "Builds (GitHub Actions)" },
  { id: "errors", title: "Errors (Sentry)" },
  { id: "payments", title: "Payments (Stripe)" },
  { id: "email", title: "Email (Resend)" },
  { id: "job", title: "Daily email job" },
  { id: "backups", title: "Backups" },
  { id: "speed", title: "Speed (Sync)" },
  { id: "security", title: "Admin security" },
  { id: "capacity", title: "Capacity" },
  { id: "settings", title: "Settings" },
] as const;
export type CheckId = (typeof CHECKS)[number]["id"];

/** The providers' public status pages, in the order the page shows them. */
export const STATUS_PAGES = [
  { name: "Vercel", url: "https://www.vercel-status.com" },
  { name: "GitHub", url: "https://www.githubstatus.com" },
  { name: "Sentry", url: "https://status.sentry.io" },
  { name: "Resend", url: "https://resend-status.com" },
  { name: "Stripe", url: "https://status.stripe.com" },
  { name: "Turso", url: "https://status.turso.tech" },
] as const;
export type StatusPageName = (typeof STATUS_PAGES)[number]["name"];

/** One card's answer from `/api/admin/system/?check=` or `?page=`: the result and when it was checked. */
export interface CheckResult<T> {
  checkedAt: number;
  result: T;
}

const RANK: Record<CheckState, number> = { off: 0, ok: 1, warn: 2, down: 3 };

/** The worst state among some states, ignoring checks that are off (ok when all are off). */
export function worst(states: CheckState[]): CheckState {
  return states.reduce<CheckState>((w, s) => (s !== "off" && RANK[s] > RANK[w] ? s : w), "ok");
}

export const STATE_LABEL: Record<CheckState, string> = { ok: "Working", warn: "Needs a look", down: "Down", off: "Not set up" };

/** Atlassian Statuspage's `status.indicator`. */
export function statuspageState(indicator: unknown): CheckState {
  if (indicator === "none") return "ok";
  if (indicator === "minor" || indicator === "maintenance") return "warn";
  if (indicator === "major" || indicator === "critical") return "down";
  return "warn";
}

/** Better Stack's `aggregate_state`. */
export function betterStackState(state: unknown): CheckState {
  if (state === "operational") return "ok";
  if (state === "downtime") return "down";
  return "warn";
}

/** Stripe's status page (`largestatus`). */
export function stripeStatusState(state: unknown): CheckState {
  if (state === "up") return "ok";
  if (state === "down") return "down";
  return "warn";
}

/** Share of uptime pings that passed, as a percentage with one decimal, or null with no pings. */
export function uptimePercent(runs: { ok: boolean }[]): number | null {
  if (!runs.length) return null;
  return Math.round((runs.filter((r) => r.ok).length / runs.length) * 1000) / 10;
}

/**
 * Resend's guidance: keep bounces under 4% and spam complaints under 0.08%, or sending can be paused.
 * Below 20 emails a rate says little, so it never warns.
 */
export function emailRateState(sent: number, bounced: number, complained: number): CheckState {
  if (sent < 20) return "ok";
  if (bounced / sent >= 0.04 || complained / sent >= 0.0008) return "warn";
  return "ok";
}

/** A restore drill (docs/RESTORE.md) older than this is stale: monthly, with a few days of slack. */
export const RESTORE_DRILL_DAYS = 35;

/** Warns when no restore drill has been recorded or the last one is stale. */
export function restoreDrillState(at: number | null, now: number): CheckState {
  if (at == null) return "warn";
  return now - at > RESTORE_DRILL_DAYS * 86_400_000 ? "warn" : "ok";
}

/** Sync is slow past a 95th-percentile of 3 seconds, or when 5 in 100 timed requests fail. */
export const SYNC_SLOW_MS = 3000;
export const SYNC_FAILURE_RATE = 0.05;
/** "fetch failed" errors in a day (the server couldn't reach the database or another service). */
export const FETCH_FAILED_WARN = 5;

export function speedState(p95Ms: number | null, failureRate: number | null, fetchFailed: number | null): CheckState {
  if ((p95Ms ?? 0) > SYNC_SLOW_MS || (failureRate ?? 0) >= SYNC_FAILURE_RATE || (fetchFailed ?? 0) >= FETCH_FAILED_WARN) return "warn";
  return "ok";
}

/** Pages the Live site card loads from outside. The first group is prerendered, so each carries its own security policy tag. */
export const SITE_PAGES = ["/", "/play/", "/parents/", "/pricing/"] as const;
/** Other addresses it checks: the service worker, the sitemap and the health answer. */
export const SITE_FILES = ["/sw.js", "/sitemap.xml", "/api/health/"] as const;
/** A page that takes longer than this to answer is worth a look. */
export const SITE_SLOW_MS = 3000;
/** Build files (scripts and styles) fetched from each page, to catch a deploy whose files are missing. */
export const SITE_ASSETS_PER_PAGE = 4;

const POLICY_TAG = /<meta http-equiv="Content-Security-Policy" content="([^"]*)"/i;

/**
 * What is wrong with a prerendered page, in words: it has no policy tag (the build step that writes it didn't run,
 * as on the first Vercel deploys), the tag lets any inline script run, or the header that stops other sites framing
 * the page is missing. Empty when the page is fine.
 */
export function pagePolicyProblems(html: string, contentSecurityPolicy: string | null): string[] {
  const problems: string[] = [];
  const tag = POLICY_TAG.exec(html)?.[1].replace(/&#x27;|&apos;/g, "'");
  if (!tag) problems.push("no security policy tag");
  else if (/script-src[^;]*'unsafe-inline'/.test(tag)) problems.push("the policy allows any inline script");
  if (!/frame-ancestors/.test(contentSecurityPolicy ?? "")) problems.push("no frame-ancestors header");
  return problems;
}

/** Build files a page loads: its first stylesheet, then its scripts, up to `limit`. A `?dpl=` version suffix is kept. */
export function pageAssets(html: string, limit = SITE_ASSETS_PER_PAGE): string[] {
  const found = [...html.matchAll(/(?:src|href)="(\/_next\/static\/[^"#]+?\.(?:js|css)(?:\?[^"#]*)?)"/g)].map((m) => m[1]);
  const unique = [...new Set(found)];
  const scripts = unique.filter((u) => /\.js(\?|$)/.test(u));
  const styles = unique.filter((u) => /\.css(\?|$)/.test(u));
  return [...styles.slice(0, 1), ...scripts].slice(0, limit);
}

/** Failed staff sign-ins in a day before the card warns. */
export const STAFF_FAILURES_WARN = 10;
/** Failed staff sign-ins inside this window, across all staff addresses, send the owner an alert. */
export const STAFF_FLOOD = { count: 5, windowMs: 15 * 60_000 } as const;

/** Share of the database size limit used, as a state: a warning at 70%, down at 90%. */
export function capacityState(usedShare: number | null): CheckState {
  if (usedShare == null) return "ok";
  return usedShare >= 0.9 ? "down" : usedShare >= 0.7 ? "warn" : "ok";
}

/** Whole megabytes with a thousands separator ("1,240 MB"), or one decimal under 10. */
export function megabytes(bytes: number): string {
  const mb = bytes / 1_048_576;
  return mb < 10 ? `${Math.round(mb * 10) / 10} MB` : `${Math.round(mb).toLocaleString("en-CA")} MB`;
}

/** The settings the System page checks are present. Values are never read out, only whether each is set. */
export const SETTINGS: { names: string[]; label: string; need: "required" | "recommended" | "optional"; what: string }[] = [
  { names: ["NEXT_PUBLIC_SITE_URL"], label: "Site address", need: "required", what: "Links in emails." },
  { names: ["DATABASE_URL", "TURSO_DATABASE_URL"], label: "Database", need: "required", what: "Where accounts and progress are stored." },
  { names: ["DATABASE_AUTH_TOKEN", "TURSO_AUTH_TOKEN"], label: "Database token", need: "required", what: "Access to the hosted database." },
  { names: ["RESEND_API_KEY"], label: "Email key", need: "required", what: "Without it no email is sent." },
  { names: ["EMAIL_FROM"], label: "Email sender", need: "required", what: "The From address." },
  { names: ["CRON_SECRET"], label: "Daily job secret", need: "required", what: "Without it the daily email job refuses to run." },
  { names: ["ADMIN_EMAILS"], label: "Admin accounts", need: "required", what: "Who can open this panel." },
  { names: ["TWO_FACTOR_KEY"], label: "Two-step encryption key", need: "recommended", what: "Encrypts admins' authenticator secrets in the database. Without it they are stored as they are." },
  { names: ["STRIPE_SECRET_KEY"], label: "Stripe key", need: "required", what: "Real payments." },
  { names: ["STRIPE_PRICE_MONTHLY"], label: "Monthly price", need: "required", what: "The monthly plan in Stripe." },
  { names: ["STRIPE_PRICE_YEARLY"], label: "Yearly price", need: "required", what: "The yearly plan in Stripe." },
  { names: ["STRIPE_WEBHOOK_SECRET"], label: "Stripe webhook secret", need: "required", what: "Subscriptions and payments reaching the app." },
  { names: ["RESEND_WEBHOOK_SECRET"], label: "Email delivery reports", need: "recommended", what: "Bounces and spam reports in the email log." },
  { names: ["SENTRY_DSN", "NEXT_PUBLIC_SENTRY_DSN"], label: "Error reports", need: "recommended", what: "Crashes reported to Sentry." },
  { names: ["SENTRY_READ_TOKEN", "SENTRY_AUTH_TOKEN"], label: "Sentry read token", need: "optional", what: "Open errors on this page." },
  { names: ["VERCEL_TOKEN"], label: "Vercel read token", need: "optional", what: "Deploys on this page and visits on the Traffic tab." },
  { names: ["GOOGLE_SERVICE_ACCOUNT_KEY"], label: "Search Console key", need: "optional", what: "Google search clicks on the Traffic tab (with SEARCH_CONSOLE_SITE)." },
  { names: ["GOOGLE_CLIENT_ID"], label: "Google sign-in ID", need: "recommended", what: "The \"Continue with Google\" button (with the secret below)." },
  { names: ["GOOGLE_CLIENT_SECRET"], label: "Google sign-in secret", need: "recommended", what: "The \"Continue with Google\" button (with the ID above)." },
  { names: ["ANTHROPIC_API_KEY"], label: "AI drafts key", need: "optional", what: "Draft with AI in the Inbox." },
  { names: ["DATABASE_SIZE_LIMIT_MB"], label: "Database size limit", need: "optional", what: "Your Turso plan's storage, in megabytes, for the Capacity card's warning." },
  { names: ["GITHUB_TOKEN"], label: "GitHub read token", need: "optional", what: "Uptime and builds on this page." },
];

/** Settings that must never be on in production. */
export const NEVER_IN_PRODUCTION = ["ALLOW_DEV_BILLING"];
