import "server-only";
import { createClient, type Client, type InValue } from "@libsql/client";
import { mkdirSync } from "node:fs";
import { dirname } from "node:path";

// One SQLite-compatible database: a local file in development, or a hosted
// libSQL/Turso database in production (set DATABASE_URL + DATABASE_AUTH_TOKEN, or the
// TURSO_DATABASE_URL + TURSO_AUTH_TOKEN pair that the Vercel Marketplace integration creates).

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS families (
    id TEXT PRIMARY KEY,
    created_at INTEGER NOT NULL,
    trial_ends_at INTEGER NOT NULL,
    plan TEXT NOT NULL DEFAULT 'trial',
    stripe_customer TEXT,
    subscription_status TEXT,
    subscription_interval TEXT,
    current_period_end INTEGER,
    updated_at INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS parents (
    id TEXT PRIMARY KEY,
    family_id TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS sessions (
    token_hash TEXT PRIMARY KEY,
    parent_id TEXT NOT NULL,
    family_id TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    created_at INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS profiles (
    id TEXT PRIMARY KEY,
    family_id TEXT NOT NULL,
    data TEXT NOT NULL,
    updated_at INTEGER NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS profiles_family ON profiles (family_id)`,
  `CREATE TABLE IF NOT EXISTS child_settings (
    profile_id TEXT PRIMARY KEY,
    family_id TEXT NOT NULL,
    data TEXT NOT NULL,
    updated_at INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS events (
    seq INTEGER PRIMARY KEY AUTOINCREMENT,
    id TEXT NOT NULL UNIQUE,
    family_id TEXT NOT NULL,
    profile_id TEXT NOT NULL,
    t INTEGER NOT NULL,
    data TEXT NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS events_family_seq ON events (family_id, seq)`,
  `CREATE INDEX IF NOT EXISTS events_profile ON events (profile_id, t)`,
  // One-time tokens for password reset and email confirmation. Only a hash is stored.
  `CREATE TABLE IF NOT EXISTS auth_tokens (
    token_hash TEXT PRIMARY KEY,
    parent_id TEXT NOT NULL,
    kind TEXT NOT NULL,
    expires_at INTEGER NOT NULL,
    used_at INTEGER
  )`,
  `CREATE INDEX IF NOT EXISTS auth_tokens_parent ON auth_tokens (parent_id)`,
  // Shared across serverless instances, unlike an in-memory counter.
  `CREATE TABLE IF NOT EXISTS rate_limits (
    key TEXT PRIMARY KEY,
    count INTEGER NOT NULL,
    reset_at INTEGER NOT NULL
  )`,
  // Read-only report links a parent can share and revoke.
  `CREATE TABLE IF NOT EXISTS report_shares (
    token_hash TEXT PRIMARY KEY,
    family_id TEXT NOT NULL,
    profile_id TEXT NOT NULL,
    days INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    expires_at INTEGER NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS report_shares_family ON report_shares (family_id)`,
  // "Report a problem" on a question: fixed reasons only, no free text from children.
  `CREATE TABLE IF NOT EXISTS question_reports (
    id TEXT PRIMARY KEY,
    family_id TEXT,
    unit_key TEXT NOT NULL,
    prompt TEXT NOT NULL,
    reason TEXT NOT NULL,
    created_at INTEGER NOT NULL
  )`,
  // Classroom mode. A teacher is an ordinary account; a class never stores anything about a child
  // beyond the link a parent chose to make with the join code.
  `CREATE TABLE IF NOT EXISTS classes (
    id TEXT PRIMARY KEY,
    owner_parent_id TEXT NOT NULL,
    name TEXT NOT NULL,
    grade TEXT NOT NULL,
    join_code TEXT NOT NULL UNIQUE,
    created_at INTEGER NOT NULL,
    closed_at INTEGER
  )`,
  `CREATE INDEX IF NOT EXISTS classes_owner ON classes (owner_parent_id)`,
  `CREATE TABLE IF NOT EXISTS class_members (
    class_id TEXT NOT NULL,
    profile_id TEXT NOT NULL,
    family_id TEXT NOT NULL,
    joined_at INTEGER NOT NULL,
    PRIMARY KEY (class_id, profile_id)
  )`,
  `CREATE INDEX IF NOT EXISTS class_members_family ON class_members (family_id)`,
  // Stripe events already handled, so a redelivered webhook is a no-op.
  `CREATE TABLE IF NOT EXISTS stripe_events (
    id TEXT PRIMARY KEY,
    created_at INTEGER NOT NULL
  )`,
  `CREATE TABLE IF NOT EXISTS class_assignments (
    class_id TEXT NOT NULL,
    unit_key TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    PRIMARY KEY (class_id, unit_key)
  )`,
  // Who an assigned unit is for, when the teacher picked students. No rows for a unit means the whole class.
  `CREATE TABLE IF NOT EXISTS class_assignment_students (
    class_id TEXT NOT NULL,
    unit_key TEXT NOT NULL,
    profile_id TEXT NOT NULL,
    PRIMARY KEY (class_id, unit_key, profile_id)
  )`,
  `CREATE INDEX IF NOT EXISTS class_assignment_students_profile ON class_assignment_students (profile_id)`,
  // Students a teacher added to a class. Each one has their own hidden family record (a profile
  // and its events), owned by the class: it is deleted when the student is removed or the class closes.
  `CREATE TABLE IF NOT EXISTS students (
    id TEXT PRIMARY KEY,
    class_id TEXT NOT NULL,
    family_id TEXT NOT NULL,
    parent_id TEXT NOT NULL,
    profile_id TEXT NOT NULL,
    login_code TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    UNIQUE (class_id, login_code)
  )`,
  `CREATE INDEX IF NOT EXISTS students_class ON students (class_id)`,
  // Ten-character codes sign in on their own, so they are unique across every class. Older eight-character codes are unique per class only.
  `CREATE UNIQUE INDEX IF NOT EXISTS students_one_code ON students (login_code) WHERE length(login_code) = 10`,
  // Co-teachers: other teacher accounts that share a class with its owner. The owner invites by
  // email; the invitation is kept by address only (so it never reveals whether an account exists)
  // and the invitee accepts it while signed in with that confirmed email.
  `CREATE TABLE IF NOT EXISTS class_teachers (
    class_id TEXT NOT NULL,
    parent_id TEXT NOT NULL,
    joined_at INTEGER NOT NULL,
    PRIMARY KEY (class_id, parent_id)
  )`,
  `CREATE INDEX IF NOT EXISTS class_teachers_parent ON class_teachers (parent_id)`,
  `CREATE TABLE IF NOT EXISTS class_invites (
    class_id TEXT NOT NULL,
    email TEXT NOT NULL,
    invited_by TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    PRIMARY KEY (class_id, email)
  )`,
  `CREATE INDEX IF NOT EXISTS class_invites_email ON class_invites (email)`,
  // Live questions a teacher asks the class in real time. Online only and short-lived: rows older
  // than a day are deleted whenever a teacher starts a new one. Answers are a choice id, never free text,
  // and don't touch a child's practice events, so they never change levels, XP or reports.
  `CREATE TABLE IF NOT EXISTS live_questions (
    id TEXT PRIMARY KEY,
    class_id TEXT NOT NULL,
    unit_key TEXT NOT NULL,
    n INTEGER NOT NULL,
    data TEXT NOT NULL,
    started_by TEXT NOT NULL,
    created_at INTEGER NOT NULL,
    revealed_at INTEGER,
    ended_at INTEGER,
    next_swaps INTEGER DEFAULT 0
  )`,
  `CREATE INDEX IF NOT EXISTS live_questions_class ON live_questions (class_id, created_at)`,
  `CREATE TABLE IF NOT EXISTS live_answers (
    question_id TEXT NOT NULL,
    profile_id TEXT NOT NULL,
    family_id TEXT NOT NULL,
    choice TEXT NOT NULL,
    correct INTEGER NOT NULL,
    at INTEGER NOT NULL,
    PRIMARY KEY (question_id, profile_id)
  )`,
  `CREATE INDEX IF NOT EXISTS live_answers_family ON live_answers (family_id)`,
  // A class timer a teacher starts for the whole class: one row per class, deleted when stopped or with the class.
  // It holds a note and times only, nothing about a child.
  `CREATE TABLE IF NOT EXISTS class_timers (
    class_id TEXT PRIMARY KEY,
    label TEXT NOT NULL,
    total_ms INTEGER NOT NULL,
    ends_at INTEGER,
    paused_left INTEGER,
    updated_at INTEGER NOT NULL
  )`,
  // Weekly-report browser notifications were removed (the weekly email says the same); drop any saved push addresses.
  `DROP TABLE IF EXISTS push_subscriptions`,
  // Codes the owner hands out: free access for a number of days (or for life), or a discount at checkout.
  // `code` is stored upper-case. `days` NULL with kind 'access' means lifetime.
  // A discount lasts `duration` ('once', 'repeating' for `months` months, or 'forever'); its Stripe coupon is made on first use.
  `CREATE TABLE IF NOT EXISTS redeem_codes (
    code TEXT PRIMARY KEY,
    kind TEXT NOT NULL,
    days INTEGER,
    percent_off INTEGER,
    duration TEXT,
    months INTEGER,
    stripe_coupon TEXT,
    max_uses INTEGER,
    uses INTEGER NOT NULL DEFAULT 0,
    expires_at INTEGER,
    note TEXT,
    created_at INTEGER NOT NULL,
    disabled_at INTEGER
  )`,
  // Each family can use a code once.
  `CREATE TABLE IF NOT EXISTS code_redemptions (
    code TEXT NOT NULL,
    family_id TEXT NOT NULL,
    redeemed_at INTEGER NOT NULL,
    PRIMARY KEY (code, family_id)
  )`,
  `CREATE INDEX IF NOT EXISTS code_redemptions_family ON code_redemptions (family_id)`,
  // The founding-family code, made once so the owner never has to (FOUNDER_CODE in src/lib/promo.ts): 33% off
  // every payment. Disabling or changing it in the admin panel sticks, because an existing row is left alone.
  `INSERT OR IGNORE INTO redeem_codes (code, kind, percent_off, duration, note, created_at)
    VALUES ('FOUNDER', 'discount', 33, 'forever', 'Founding families: 33% off for life', CAST(strftime('%s', 'now') AS INTEGER) * 1000)`,
  // Site-wide sales (src/server/promo.ts): a banner on the public pages naming a redeem code, from starts_at to ends_at.
  `CREATE TABLE IF NOT EXISTS promotions (
    id TEXT PRIMARY KEY,
    preset TEXT NOT NULL,
    emoji TEXT NOT NULL,
    headline TEXT NOT NULL,
    body TEXT NOT NULL,
    code TEXT NOT NULL,
    link TEXT NOT NULL,
    starts_at INTEGER NOT NULL,
    ends_at INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    created_by TEXT NOT NULL,
    stopped_at INTEGER
  )`,
  // Admin panel. Flags are defined in src/lib/flags.ts; a row exists once an admin has changed one.
  `CREATE TABLE IF NOT EXISTS feature_flags (
    key TEXT PRIMARY KEY,
    enabled INTEGER NOT NULL,
    rollout INTEGER NOT NULL DEFAULT 100,
    updated_at INTEGER NOT NULL
  )`,
  // A flag forced on or off for one family (testers, a school trying something early).
  `CREATE TABLE IF NOT EXISTS flag_overrides (
    key TEXT NOT NULL,
    family_id TEXT NOT NULL,
    enabled INTEGER NOT NULL,
    created_at INTEGER NOT NULL,
    PRIMARY KEY (key, family_id)
  )`,
  `CREATE INDEX IF NOT EXISTS flag_overrides_family ON flag_overrides (family_id)`,
  // A/B tests. `variants` is JSON: [{ name, weight }]; the first is the control.
  `CREATE TABLE IF NOT EXISTS experiments (
    key TEXT PRIMARY KEY,
    description TEXT NOT NULL DEFAULT '',
    status TEXT NOT NULL DEFAULT 'draft',
    variants TEXT NOT NULL,
    winner TEXT,
    created_at INTEGER NOT NULL,
    started_at INTEGER,
    stopped_at INTEGER
  )`,
  // Which variant a signed-in family was shown, recorded the first time it asked, so results can be counted.
  `CREATE TABLE IF NOT EXISTS experiment_assignments (
    experiment TEXT NOT NULL,
    family_id TEXT NOT NULL,
    variant TEXT NOT NULL,
    assigned_at INTEGER NOT NULL,
    PRIMARY KEY (experiment, family_id)
  )`,
  `CREATE INDEX IF NOT EXISTS experiment_assignments_family ON experiment_assignments (family_id)`,
  // Every change made in the admin panel: who, what and when.
  `CREATE TABLE IF NOT EXISTS admin_audit (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    at INTEGER NOT NULL,
    admin TEXT NOT NULL,
    action TEXT NOT NULL,
    target TEXT,
    detail TEXT
  )`,
  // Money Stripe collected, one row per paid invoice, for the admin dashboard's revenue numbers. Amounts in
  // cents. family_id is cleared when a family deletes its account, so the totals stay but nobody is linked.
  `CREATE TABLE IF NOT EXISTS payments (
    id TEXT PRIMARY KEY,
    family_id TEXT,
    amount INTEGER NOT NULL,
    refunded INTEGER NOT NULL DEFAULT 0,
    currency TEXT NOT NULL,
    interval TEXT,
    paid_at INTEGER NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS payments_paid_at ON payments (paid_at)`,
  `CREATE INDEX IF NOT EXISTS payments_family ON payments (family_id)`,
  // Why a subscription was cancelled, from the reason the parent picked in Stripe's billing portal. One row
  // per subscription; the reason only, never the comment. family_id is cleared when a family deletes its account.
  `CREATE TABLE IF NOT EXISTS cancellations (
    subscription_id TEXT PRIMARY KEY,
    family_id TEXT,
    reason TEXT NOT NULL,
    at INTEGER NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS cancellations_at ON cancellations (at)`,
  // Values the admin sets in the panel, such as monthly running costs.
  `CREATE TABLE IF NOT EXISTS admin_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at INTEGER NOT NULL
  )`,
  // Emails sent to accounts: which kind, when, and what Resend reported back (delivered, bounced...).
  // No message bodies, so children's names never land here; an admin email keeps its subject before names are filled in.
  `CREATE TABLE IF NOT EXISTS email_log (
    id TEXT PRIMARY KEY,
    family_id TEXT NOT NULL,
    parent_id TEXT NOT NULL,
    kind TEXT NOT NULL,
    label TEXT,
    status TEXT NOT NULL,
    provider_id TEXT,
    sent_at INTEGER NOT NULL,
    updated_at INTEGER NOT NULL,
    sent_by TEXT
  )`,
  `CREATE INDEX IF NOT EXISTS email_log_family ON email_log (family_id, sent_at)`,
  `CREATE INDEX IF NOT EXISTS email_log_sent ON email_log (sent_at)`,
  `CREATE INDEX IF NOT EXISTS email_log_provider ON email_log (provider_id)`,
  // Mail Resend received for us: only whether the admin has dealt with or answered it. The messages stay in Resend.
  `CREATE TABLE IF NOT EXISTS inbox_state (
    email_id TEXT PRIMARY KEY,
    handled_at INTEGER,
    replied_at INTEGER,
    replied_by TEXT,
    archived_at INTEGER
  )`,
  // To-do items the admin dismissed or snoozed, by item key, until a time.
  `CREATE TABLE IF NOT EXISTS admin_queue_hidden (
    key TEXT PRIMARY KEY,
    until INTEGER NOT NULL,
    at INTEGER NOT NULL
  )`,
  // Scheduled job runs and incoming webhooks, for the admin panel's System page. No personal data:
  // job counts and webhook event types only. Rows older than 60 days are cleared as new ones arrive.
  `CREATE TABLE IF NOT EXISTS job_runs (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    job TEXT NOT NULL,
    started_at INTEGER NOT NULL,
    finished_at INTEGER,
    ok INTEGER,
    detail TEXT
  )`,
  `CREATE INDEX IF NOT EXISTS job_runs_job ON job_runs (job, started_at)`,
  `CREATE TABLE IF NOT EXISTS webhook_log (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    source TEXT NOT NULL,
    at INTEGER NOT NULL,
    ok INTEGER NOT NULL,
    type TEXT,
    error TEXT
  )`,
  `CREATE INDEX IF NOT EXISTS webhook_log_source ON webhook_log (source, at)`,
  // One-time recovery codes for two-step sign-in, kept as hashes. A used code keeps its row (used_at) so it can't be used twice.
  `CREATE TABLE IF NOT EXISTS totp_backup_codes (
    parent_id TEXT NOT NULL,
    code_hash TEXT NOT NULL,
    used_at INTEGER,
    PRIMARY KEY (parent_id, code_hash)
  )`,
  // Devices that played with no parent account, for the admin dashboard's count. A one-way hash of the device's
  // random id and the last UTC day it played (days since 1970): no family, child, grade, province or result. Rows
  // older than 35 days are deleted by the daily job, and a device that signs in to an account is forgotten.
  `CREATE TABLE IF NOT EXISTS guest_devices (
    device_hash TEXT PRIMARY KEY,
    last_day INTEGER NOT NULL
  )`,
  `CREATE INDEX IF NOT EXISTS guest_devices_day ON guest_devices (last_day)`,
];

/** Columns added after the first release. SQLite has no "ADD COLUMN IF NOT EXISTS". */
const PARENT_COLUMNS: [string, string][] = [
  ["email_verified_at", "INTEGER"],
  ["weekly_report", "INTEGER NOT NULL DEFAULT 0"],
  ["unsub_token", "TEXT"],
  ["last_weekly_at", "INTEGER"],
  ["trial_notice_at", "INTEGER"],
  ["trial_recap_at", "INTEGER"],
  ["practice_reminders", "INTEGER NOT NULL DEFAULT 0"],
  ["last_nudge_at", "INTEGER"],
  // 'parent' for ordinary accounts, 'student' for a class-owned student account (no email, no password).
  ["role", "TEXT NOT NULL DEFAULT 'parent'"],
  // Google's permanent id for the person who signs in with "Continue with Google" (src/server/google.ts). Null for password-only accounts.
  ["google_sub", "TEXT"],
  ["last_login_at", "INTEGER"],
  // News and tips the owner sends from the admin panel (on unless the parent unsubscribes).
  ["admin_mail", "INTEGER NOT NULL DEFAULT 1"],
  // Set when Resend reports a bounce or a spam complaint, so the panel stops emailing the address.
  ["email_bounced_at", "INTEGER"],
  // The teacher's classes they have hidden from their own class list (comma-separated class ids).
  ["hidden_classes", "TEXT"],
  // Two-step sign-in with an authenticator app (src/server/twoFactor.ts). The secret is encrypted when TWO_FACTOR_KEY is set.
  // `totp_pending` is a secret shown during setup and not yet confirmed; `totp_last_step` stops a code being used twice.
  ["totp_secret", "TEXT"],
  ["totp_pending", "TEXT"],
  ["totp_enabled_at", "INTEGER"],
  ["totp_last_step", "INTEGER"],
];

/** Which province's curriculum a class assigns units from, and its inactivity-retention state. */
const CLASS_COLUMNS: [string, string][] = [
  ["framework", "TEXT NOT NULL DEFAULT 'ca-bc'"],
  ["last_activity_at", "INTEGER NOT NULL DEFAULT 0"],
  ["inactive_warning_at", "INTEGER"],
  // A split class has a second grade (adjacent to `grade`). NULL for a single-grade class.
  ["grade2", "TEXT"],
];
// The grade a student is in, for a class with two grades. NULL means the class's own grade.
const MEMBER_COLUMNS: [string, string][] = [["grade", "TEXT"]];
/** A due date a teacher can set on an assigned unit (ms since epoch). */
// `goal`: how many questions the teacher asked for (homework); NULL means "until Proficient".
const ASSIGNMENT_COLUMNS: [string, string][] = [["due_at", "INTEGER"], ["goal", "INTEGER"]];
// The login code a student had before a teacher gave them a new one, kept for a few minutes so "Undo" can restore it.
const STUDENT_COLUMNS: [string, string][] = [["prev_login_code", "TEXT"], ["prev_code_at", "INTEGER"]];
// `mfa_at`: when this sign-in passed the second step. Admin access needs it.
const SESSION_COLUMNS: [string, string][] = [["user_agent", "TEXT"], ["mfa_at", "INTEGER"]];
// Mail the admin archived: hidden from the Inbox list (shown under Archived) until moved back.
const INBOX_COLUMNS: [string, string][] = [["archived_at", "INTEGER"]];
// The curriculum the child follows and what was on screen (choices, answer, picture as JSON), so a report can be judged.
const REPORT_COLUMNS: [string, string][] = [
  ["framework", "TEXT"],
  ["details", "TEXT"],
];
const FAMILY_COLUMNS: [string, string][] = [
  ["billing_event_at", "INTEGER NOT NULL DEFAULT 0"],
  // Referrals: this family's shareable code, the family that referred it, and when that family was thanked.
  ["referral_code", "TEXT"],
  ["referred_by", "TEXT"],
  ["referral_rewarded_at", "INTEGER"],
  // How many free months this family has earned by referring others. Kept on the referrer, so deleting
  // and re-creating a referred account can't reset the cap.
  ["referral_rewards", "INTEGER NOT NULL DEFAULT 0"],
  // Free access from a redeemed code ends at this time (ms). Separate from `plan`, so a Stripe webhook never undoes it.
  ["access_until", "INTEGER"],
  // A redeemed discount code applied at the next checkout.
  ["discount_code", "TEXT"],
  // 'US' when the first child added follows a US curriculum (src/lib/coppa.ts); decides the currency and US consent.
  ["country", "TEXT NOT NULL DEFAULT 'CA'"],
  // US parental consent (COPPA): when it was given, to which notice version, how ('email-plus' or 'payment'),
  // the token in the emails' withdraw link, when the delayed confirmation went out and when it was last withdrawn.
  ["consent_at", "INTEGER"],
  ["consent_version", "TEXT"],
  ["consent_method", "TEXT"],
  ["consent_token", "TEXT"],
  ["consent_followup_at", "INTEGER"],
  ["consent_revoked_at", "INTEGER"],
  // When a subscription the parent cancelled stops (ms), from Stripe's cancel_at or cancel_at_period_end. Null while it renews.
  ["cancel_at", "INTEGER"],
  // When that subscription was cancelled (ms), from Stripe's canceled_at. Null while it renews. The dashboard counts
  // a cancellation from this day, not from when the paid period runs out.
  ["cancelled_at", "INTEGER"],
];

// How many times the teacher swapped the previewed next live question (the seed variant it was drawn from).
const LIVE_COLUMNS: [string, string][] = [["next_swaps", "INTEGER DEFAULT 0"]];

async function addColumns(c: Client, table: string, columns: [string, string][]) {
  const have = new Set((await c.execute(`PRAGMA table_info(${table})`)).rows.map((r) => String(r.name)));
  for (const [name, type] of columns) if (!have.has(name)) await c.execute(`ALTER TABLE ${table} ADD COLUMN ${name} ${type}`);
}

async function migrate(c: Client) {
  await addColumns(c, "sessions", SESSION_COLUMNS);
  await addColumns(c, "inbox_state", INBOX_COLUMNS);
  await addColumns(c, "question_reports", REPORT_COLUMNS);
  const hadRewardCount = (await c.execute("PRAGMA table_info(families)")).rows.some((r) => String(r.name) === "referral_rewards");
  await addColumns(c, "families", FAMILY_COLUMNS);
  if (!hadRewardCount) {
    // Once, when the counter arrives: start it from the rewards already given.
    await c.execute("UPDATE families SET referral_rewards = (SELECT COUNT(*) FROM families r WHERE r.referred_by = families.id AND r.referral_rewarded_at IS NOT NULL)");
  }
  await c.execute("CREATE UNIQUE INDEX IF NOT EXISTS families_referral_code ON families (referral_code)");
  await c.execute("CREATE INDEX IF NOT EXISTS families_referred_by ON families (referred_by)");
  await addColumns(c, "live_questions", LIVE_COLUMNS);
  await addColumns(c, "classes", CLASS_COLUMNS);
  // Existing classes start their inactivity period from creation until a later sign-in.
  await c.execute("UPDATE classes SET last_activity_at = created_at WHERE last_activity_at = 0");
  await addColumns(c, "class_assignments", ASSIGNMENT_COLUMNS);
  await addColumns(c, "class_members", MEMBER_COLUMNS);
  await addColumns(c, "students", STUDENT_COLUMNS);
  const have = new Set((await c.execute("PRAGMA table_info(parents)")).rows.map((r) => String(r.name)));
  for (const [name, type] of PARENT_COLUMNS) {
    if (!have.has(name)) await c.execute(`ALTER TABLE parents ADD COLUMN ${name} ${type}`);
  }
  await c.execute("CREATE UNIQUE INDEX IF NOT EXISTS parents_google_sub ON parents (google_sub) WHERE google_sub IS NOT NULL");
}

let client: Client | null = null;
let ready: Promise<void> | null = null;

const LOCAL_DATABASE_URL = "file:./data/grademap.db";

/** Each URL is paired with its own token, so a token from one database is never sent to another. */
export function databaseConfig(): { url: string; authToken?: string } {
  const env = process.env;
  if (env.DATABASE_URL) return { url: env.DATABASE_URL, authToken: env.DATABASE_AUTH_TOKEN || undefined };
  if (env.TURSO_DATABASE_URL) return { url: env.TURSO_DATABASE_URL, authToken: env.TURSO_AUTH_TOKEN || undefined };
  return { url: LOCAL_DATABASE_URL };
}

export function databaseUrl(): string {
  return databaseConfig().url;
}

export async function db(): Promise<Client> {
  if (!client) {
    const { url, authToken } = databaseConfig();
    if (url === LOCAL_DATABASE_URL && process.env.NODE_ENV === "production") {
      console.error("[db] DATABASE_URL and TURSO_DATABASE_URL are both unset; falling back to a local file, which fails on read-only hosts");
    }
    try {
      if (url.startsWith("file:")) mkdirSync(dirname(url.slice(5)), { recursive: true });
      const c = createClient({ url, authToken });
      client = c;
      ready = (async () => {
        for (const sql of SCHEMA) await c.execute(sql);
        await migrate(c);
      })();
    } catch (e) {
      console.error("[db] could not open the database", (e as Error).message);
      throw e;
    }
  }
  const c = client;
  try {
    await ready;
  } catch (e) {
    // Forget the failed attempt so the next request tries again instead of failing forever.
    if (client === c) {
      client = null;
      ready = null;
      console.error("[db] setup failed; will retry on the next request", (e as Error).message);
    }
    throw e;
  }
  return c;
}

export async function query<T = Record<string, unknown>>(sql: string, args: InValue[] = []): Promise<T[]> {
  const res = await (await db()).execute({ sql, args });
  return res.rows as unknown as T[];
}

export async function run(sql: string, args: InValue[] = []): Promise<number> {
  const res = await (await db()).execute({ sql, args });
  return res.rowsAffected;
}

export async function batch(statements: { sql: string; args: InValue[] }[]): Promise<void> {
  if (!statements.length) return;
  await (await db()).batch(statements, "write");
}
