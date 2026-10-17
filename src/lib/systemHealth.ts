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
  { id: "deploys", title: "Deploys (Vercel)" },
  { id: "builds", title: "Builds (GitHub Actions)" },
  { id: "errors", title: "Errors (Sentry)" },
  { id: "payments", title: "Payments (Stripe)" },
  { id: "email", title: "Email (Resend)" },
  { id: "job", title: "Daily email job" },
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
  { names: ["ANTHROPIC_API_KEY"], label: "AI drafts key", need: "optional", what: "Draft with AI in the Inbox." },
  { names: ["GITHUB_TOKEN"], label: "GitHub read token", need: "optional", what: "Uptime and builds on this page." },
];

/** Settings that must never be on in production. */
export const NEVER_IN_PRODUCTION = ["ALLOW_DEV_BILLING"];
