import "server-only";
import { query, run } from "./db";
import { inboxConfigured, listInbox } from "./inbox";
import { CONTACT_EMAIL, missingSocialPlatforms } from "@/lib/brand";

// The admin panel's to-do list: families worth acting on now, each with the action that fits. It is worked out
// fresh each time from the data, so an item goes away once the family moves on (pays, practises, confirms).
// The admin can snooze an item or dismiss it; a family emailed from the panel recently is left out for a week.

const DAY = 86_400_000;
const REAL = "NOT EXISTS (SELECT 1 FROM parents s WHERE s.family_id = f.id AND s.role = 'student')";
const EMAIL = "(SELECT p.email FROM parents p WHERE p.family_id = f.id ORDER BY p.created_at LIMIT 1)";
const VERIFIED = "EXISTS (SELECT 1 FROM parents p WHERE p.family_id = f.id AND p.email_verified_at IS NOT NULL)";
const LAST_PRACTICE = "(SELECT MAX(e.t) FROM events e WHERE e.family_id = f.id)";
const RECENT_PANEL_MAIL = "EXISTS (SELECT 1 FROM email_log l WHERE l.family_id = f.id AND l.kind = 'admin' AND l.status != 'failed' AND l.sent_at > ?)";
/** Items of one kind shown at most. */
const PER_KIND = 50;

export type QueueAction = { type: "email"; preset: string } | { type: "verify" } | { type: "open" } | { type: "reports" } | { type: "inbox"; id: string } | { type: "task" };

export interface QueueItem {
  key: string;
  kind: QueueKind;
  title: string;
  detail: string;
  familyId?: string;
  email?: string;
  /** The time the item is about (trial end, sign-up, last practice...). */
  at: number;
  action: QueueAction;
}

export const QUEUE_KINDS = {
  inbox: "Email waiting for an answer",
  "past-due": "Payment failed",
  "trial-ending": "Trial ending, child practised",
  cancelled: "Just cancelled",
  "quiet-paying": "Paying but gone quiet",
  "never-practised": "Signed up, never practised",
  unconfirmed: "Email not confirmed",
  bounced: "Email bouncing",
  reports: "Question reports",
  setup: "Set up the social accounts",
} as const;
export type QueueKind = keyof typeof QUEUE_KINDS;

const days = (ms: number) => Math.max(0, Math.round(ms / DAY));
const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? "" : "s"}`;
const listOf = (xs: string[]) => (xs.length < 2 ? xs.join("") : `${xs.slice(0, -1).join(", ")} and ${xs[xs.length - 1]}`);
/** When the owner picked the social platforms. */
const SOCIAL_DECIDED = Date.UTC(2026, 9, 14);
type Row = Record<string, unknown>;

export async function queueItems(now = Date.now()): Promise<QueueItem[]> {
  const fam = (where: string, args: number[], order: string, extra = "") =>
    query<Row>(`SELECT f.id, ${EMAIL} AS email, f.created_at, f.trial_ends_at, f.billing_event_at, ${LAST_PRACTICE} AS last ${extra} FROM families f WHERE ${REAL} AND ${where} ORDER BY ${order} LIMIT ${PER_KIND}`, args);
  const weekAgo = now - 7 * DAY;
  const [pastDue, trialEnding, cancelled, quiet, never, unconfirmed, bounced, reports] = await Promise.all([
    fam("f.subscription_status = 'past_due'", [], "f.billing_event_at"),
    fam(`f.plan != 'premium' AND f.trial_ends_at > ? AND f.trial_ends_at <= ? AND COALESCE(f.access_until, 0) <= ? AND ${VERIFIED} AND ${LAST_PRACTICE} IS NOT NULL AND NOT ${RECENT_PANEL_MAIL}`, [now, now + 3 * DAY, now, weekAgo], "f.trial_ends_at"),
    fam(`f.plan != 'premium' AND f.subscription_status = 'canceled' AND f.billing_event_at > ? AND ${VERIFIED} AND NOT ${RECENT_PANEL_MAIL}`, [now - 14 * DAY, weekAgo], "f.billing_event_at DESC"),
    fam(`f.plan = 'premium' AND f.created_at < ? AND COALESCE(${LAST_PRACTICE}, 0) < ? AND ${VERIFIED} AND NOT ${RECENT_PANEL_MAIL}`, [now - 14 * DAY, now - 14 * DAY, weekAgo], "last"),
    fam(`f.created_at < ? AND f.created_at > ? AND ${LAST_PRACTICE} IS NULL AND ${VERIFIED} AND NOT ${RECENT_PANEL_MAIL}`, [now - 2 * DAY, now - 14 * DAY, weekAgo], "f.created_at"),
    fam(
      `f.created_at < ? AND f.created_at > ? AND NOT ${VERIFIED} AND NOT EXISTS (SELECT 1 FROM email_log l WHERE l.family_id = f.id AND l.kind = 'verify' AND l.sent_at > ?)`,
      [now - DAY, now - 14 * DAY, now - 2 * DAY],
      "f.created_at",
    ),
    fam("EXISTS (SELECT 1 FROM parents p WHERE p.family_id = f.id AND p.email_bounced_at > ?)", [now - 30 * DAY], "f.created_at DESC", ", (SELECT MAX(p.email_bounced_at) FROM parents p WHERE p.family_id = f.id) AS bounced_at"),
    query<{ n: number; first: number | null }>("SELECT COUNT(*) AS n, MIN(created_at) AS first FROM question_reports"),
  ]);
  const item = (kind: QueueKind, r: Row, at: number, detail: string, action: QueueAction): QueueItem => ({
    key: `${kind}:${r.id}`,
    kind,
    title: QUEUE_KINDS[kind],
    detail,
    familyId: String(r.id),
    email: (r.email as string | null) ?? undefined,
    at,
    action,
  });
  const items: QueueItem[] = [
    ...pastDue.map((r) => item("past-due", r, Number(r.billing_event_at), `Stripe couldn't take the payment. Past due for ${plural(days(now - Number(r.billing_event_at)), "day")}.`, { type: "open" })),
    ...trialEnding.map((r) =>
      item("trial-ending", r, Number(r.trial_ends_at), `Trial ends in ${plural(Math.max(1, Math.ceil((Number(r.trial_ends_at) - now) / DAY)), "day")}. A child has practised, and they haven't subscribed.`, {
        type: "email",
        preset: "trial-ending",
      }),
    ),
    ...cancelled.map((r) => item("cancelled", r, Number(r.billing_event_at), `Cancelled ${plural(days(now - Number(r.billing_event_at)), "day")} ago. Ask what didn't work.`, { type: "email", preset: "feedback" })),
    ...quiet.map((r) =>
      item("quiet-paying", r, Number(r.last ?? r.created_at), r.last == null ? "Pays, but no child has practised yet." : `Pays, but no practice for ${plural(days(now - Number(r.last)), "day")}.`, { type: "email", preset: "miss-you" }),
    ),
    ...never.map((r) => item("never-practised", r, Number(r.created_at), `Signed up ${plural(days(now - Number(r.created_at)), "day")} ago. No child has practised yet.`, { type: "email", preset: "getting-started" })),
    ...unconfirmed.map((r) => item("unconfirmed", r, Number(r.created_at), `Signed up ${plural(days(now - Number(r.created_at)), "day")} ago and hasn't confirmed the email.`, { type: "verify" })),
    ...bounced.map((r) => item("bounced", r, Number(r.bounced_at), "Email to this address bounced or was marked as spam. The panel won't email it.", { type: "open" })),
  ];
  const n = Number(reports[0]?.n ?? 0);
  if (n) items.push({ key: "reports", kind: "reports", title: QUEUE_KINDS.reports, detail: `${plural(n, "question report")} waiting to be looked at.`, at: Number(reports[0]?.first ?? now), action: { type: "reports" } });

  // Owner tasks that live in code, not the data. The social accounts item stays until every chosen platform's URL is
  // in SOCIAL_PROFILES (src/lib/brand.ts).
  const social = missingSocialPlatforms();
  if (social.length)
    items.push({
      key: "setup:social",
      kind: "setup",
      title: QUEUE_KINDS.setup,
      detail: `Create the ${listOf(social)} accounts with ${CONTACT_EMAIL}, then send their links so they go in SOCIAL_PROFILES (src/lib/brand.ts) and search engines tie them to the site.`,
      at: SOCIAL_DECIDED,
      action: { type: "task" },
    });

  // Mail people sent us in the last 2 weeks that nobody has answered or set aside. Resend being unreachable
  // never stops the rest of the list.
  if (inboxConfigured()) {
    const inbox = await listInbox({ limit: 50 }).catch(() => ({ items: [] }));
    for (const m of inbox.items) {
      if (m.handledAt || m.repliedAt || m.receivedAt < now - 14 * DAY) continue;
      items.unshift({ key: `inbox:${m.id}`, kind: "inbox", title: QUEUE_KINDS.inbox, detail: `“${m.subject}” from ${m.from}`, familyId: m.familyId ?? undefined, email: m.fromEmail, at: m.receivedAt, action: { type: "inbox", id: m.id } });
    }
  }

  const hidden = new Set((await query<{ key: string }>("SELECT key FROM admin_queue_hidden WHERE until > ?", [now])).map((h) => String(h.key)));
  return items.filter((i) => !hidden.has(i.key));
}

/** Snoozes an item for some days, or with `days` null dismisses it for good. */
export async function hideQueueItem(key: string, snoozeDays: number | null, now = Date.now()): Promise<void> {
  const until = snoozeDays === null ? Number.MAX_SAFE_INTEGER : now + snoozeDays * DAY;
  await run("INSERT INTO admin_queue_hidden (key, until, at) VALUES (?, ?, ?) ON CONFLICT (key) DO UPDATE SET until = excluded.until, at = excluded.at", [key, until, now]);
  // Old entries are cleared now and then, so the table stays small.
  await run("DELETE FROM admin_queue_hidden WHERE until < ?", [now]);
}
