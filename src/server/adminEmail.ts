import "server-only";
import { ADMIN_MAIL_GAP_DAYS, fillMessage, paragraphs, SEND_BATCH, type AdminMessage, type Segment } from "@/lib/adminEmails";
import { unsubscribeToken } from "./auth";
import { query } from "./db";
import { emailConfigured, sendEmail } from "./email";
import { adminMessageEmail } from "./emailTemplates";

// Emails the owner sends from the admin panel, to one family or a group. Each goes to the family's first
// account, only if its email is confirmed, it hasn't turned off news and tips, and its address hasn't bounced.
// A group send also skips families that got a panel email in the last few days, so a second send continues
// with the rest instead of emailing anyone twice.

const DAY = 86_400_000;
const REAL = "NOT EXISTS (SELECT 1 FROM parents s WHERE s.family_id = f.id AND s.role = 'student')";
const LAST_PRACTICE = "(SELECT MAX(e.t) FROM events e WHERE e.family_id = f.id)";
/** Days (UTC) with any practice. */
export const PRACTICE_DAYS = "(SELECT COUNT(DISTINCT e.t / 86400000) FROM events e WHERE e.family_id = f.id)";
/** A child profile that hasn't been deleted (deleted ones stay as tombstones for sync). */
export const LIVE_PROFILE = "COALESCE(json_extract(pr.data, '$.deleted'), 0) = 0";

function segmentWhere(segment: Segment, now: number): { sql: string; args: number[] } {
  switch (segment) {
    case "quiet-7":
      return { sql: `${LAST_PRACTICE} BETWEEN ? AND ?`, args: [now - 60 * DAY, now - 7 * DAY] };
    case "never-practised":
      return { sql: "f.created_at < ? AND NOT EXISTS (SELECT 1 FROM events e WHERE e.family_id = f.id)", args: [now - 2 * DAY] };
    case "no-child":
      return { sql: `f.created_at < ? AND f.created_at > ? AND NOT EXISTS (SELECT 1 FROM profiles pr WHERE pr.family_id = f.id AND ${LIVE_PROFILE})`, args: [now - 2 * DAY, now - 60 * DAY] };
    case "tried-few":
      return { sql: `f.plan != 'premium' AND ${PRACTICE_DAYS} BETWEEN 1 AND 2 AND ${LAST_PRACTICE} < ?`, args: [now - 3 * DAY] };
    case "engaged-not-paying":
      return { sql: `f.plan != 'premium' AND COALESCE(f.access_until, 0) <= ? AND ${PRACTICE_DAYS} >= 3`, args: [now] };
    case "trial-ending":
      return { sql: "f.plan != 'premium' AND f.trial_ends_at > ? AND f.trial_ends_at <= ? AND COALESCE(f.access_until, 0) <= ?", args: [now, now + 7 * DAY, now] };
    case "trial-over":
      return { sql: "f.plan != 'premium' AND f.trial_ends_at <= ? AND f.trial_ends_at > ? AND COALESCE(f.access_until, 0) <= ?", args: [now, now - 60 * DAY, now] };
    case "cancelled":
      return { sql: "f.plan != 'premium' AND f.subscription_status = 'canceled' AND f.billing_event_at > ?", args: [now - 90 * DAY] };
    case "everyone":
      return { sql: "1 = 1", args: [] };
  }
}

export interface Recipient {
  familyId: string;
  parentId: string;
  email: string;
  /** Why this family can't get panel email, or null if it can. */
  blocked: "unconfirmed" | "unsubscribed" | "bounced" | null;
  lastAdminMail: number | null;
}

async function recipients(where: string, args: (string | number)[]): Promise<Recipient[]> {
  const rows = await query<Record<string, unknown>>(
    `SELECT f.id AS family_id, p.id AS parent_id, p.email, p.email_verified_at, p.admin_mail, p.email_bounced_at,
       (SELECT MAX(l.sent_at) FROM email_log l WHERE l.family_id = f.id AND l.kind = 'admin' AND l.status != 'failed') AS last_admin
     FROM families f JOIN parents p ON p.id = (SELECT p2.id FROM parents p2 WHERE p2.family_id = f.id ORDER BY p2.created_at LIMIT 1)
     WHERE ${REAL} AND ${where} ORDER BY f.created_at`,
    args,
  );
  return rows.map((r) => ({
    familyId: String(r.family_id),
    parentId: String(r.parent_id),
    email: String(r.email),
    blocked: r.email_bounced_at != null ? "bounced" : r.email_verified_at == null ? "unconfirmed" : !Number(r.admin_mail) ? "unsubscribed" : null,
    lastAdminMail: r.last_admin == null ? null : Number(r.last_admin),
  }));
}

export interface Audience {
  /** Families the next send would email (at most SEND_BATCH). */
  sendTo: Recipient[];
  /** Families in the group that can be emailed, including those beyond this batch. */
  ready: number;
  skipped: { unconfirmed: number; unsubscribed: number; bounced: number; recent: number };
  total: number;
}

/** Everyone in a group, split into who can be emailed now and why the rest can't. */
export async function segmentMembers(segment: Segment, now = Date.now()) {
  const { sql, args } = segmentWhere(segment, now);
  const all = await recipients(sql, args);
  const skipped = { unconfirmed: 0, unsubscribed: 0, bounced: 0, recent: 0 };
  const ready: Recipient[] = [];
  for (const r of all) {
    if (r.blocked) skipped[r.blocked]++;
    else if (r.lastAdminMail != null && r.lastAdminMail > now - ADMIN_MAIL_GAP_DAYS * DAY) skipped.recent++;
    else ready.push(r);
  }
  return { ready, skipped, total: all.length };
}

export async function segmentAudience(segment: Segment, now = Date.now()): Promise<Audience> {
  const { ready, skipped, total } = await segmentMembers(segment, now);
  return { sendTo: ready.slice(0, SEND_BATCH), ready: ready.length, skipped, total };
}

export async function familyRecipient(familyId: string): Promise<Recipient | null> {
  return (await recipients("f.id = ?", [familyId]))[0] ?? null;
}

/** Children's first names, for `{children}`. They go into the email only, never back to the panel. */
async function childNames(familyId: string): Promise<string[]> {
  const rows = await query<{ data: string }>("SELECT data FROM profiles WHERE family_id = ? ORDER BY updated_at", [familyId]);
  return rows.flatMap((r) => {
    try {
      const d = JSON.parse(r.data) as { name?: unknown; deleted?: unknown };
      return !d.deleted && typeof d.name === "string" && d.name.trim() ? [d.name.trim()] : [];
    } catch {
      return [];
    }
  });
}

const pause = (ms: number) => new Promise((r) => setTimeout(r, ms));

/** Sends a message to each recipient, one at a time (Resend allows a couple a second). */
export async function sendMessage(to: Recipient[], m: AdminMessage, origin: string, admin: string): Promise<{ sent: number; failed: number }> {
  let sent = 0;
  let failed = 0;
  for (const [i, r] of to.entries()) {
    if (i && emailConfigured()) await pause(550);
    const names = await childNames(r.familyId);
    const email = adminMessageEmail(
      r.email,
      origin,
      {
        subject: fillMessage(m.subject, names).trim(),
        label: m.subject.trim(),
        paragraphs: paragraphs(fillMessage(m.body, names)),
        button: m.button ? { label: fillMessage(m.button.label, names), path: m.button.path } : null,
      },
      await unsubscribeToken(r.parentId),
      admin,
    );
    if ((await sendEmail(email)).ok) sent++;
    else failed++;
  }
  return { sent, failed };
}
