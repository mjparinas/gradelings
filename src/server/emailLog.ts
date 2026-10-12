import "server-only";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";
import { query, run } from "./db";
import type { Email } from "./email";

// The admin panel's email log: every email to an account, and what Resend reported about it. It keeps the
// kind, time and status, never the body, so children's names (which some emails carry) aren't stored.

/** Records an email just sent. Mail to an address with no account (or a deleted one) isn't logged. */
export async function logEmail(email: Email, status: "sent" | "skipped" | "failed", providerId?: string): Promise<void> {
  if (!email.kind) return;
  const parent = (await query<{ id: string; family_id: string }>("SELECT id, family_id FROM parents WHERE email = ? AND role != 'student'", [email.to.toLowerCase()]))[0];
  if (!parent) return;
  const now = Date.now();
  await run("INSERT INTO email_log (id, family_id, parent_id, kind, label, status, provider_id, sent_at, updated_at, sent_by) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)", [
    randomUUID(),
    parent.family_id,
    parent.id,
    email.kind,
    email.label ?? null,
    status,
    providerId ?? null,
    now,
    now,
    email.sentBy ?? null,
  ]);
}

/** Later reports never undo a final one: a bounce or complaint stays, and "delivered" isn't overwritten by "delayed". */
const RANK: Record<string, number> = { sent: 0, skipped: 0, failed: 0, delayed: 1, delivered: 2, bounced: 3, complained: 4 };
const EVENTS: Record<string, string> = {
  "email.delivered": "delivered",
  "email.delivery_delayed": "delayed",
  "email.bounced": "bounced",
  "email.complained": "complained",
};

/**
 * Checks a Resend webhook (Resend signs with Svix: `svix-id`, `svix-timestamp` and `svix-signature`,
 * an HMAC-SHA256 of `id.timestamp.body` with the base64 secret after `whsec_`).
 */
export function verifyResendSignature(secret: string, headers: Headers, body: string, now = Date.now()): boolean {
  const id = headers.get("svix-id");
  const ts = headers.get("svix-timestamp");
  const sigs = headers.get("svix-signature");
  if (!id || !ts || !sigs || !secret.startsWith("whsec_")) return false;
  if (!/^\d+$/.test(ts) || Math.abs(now / 1000 - Number(ts)) > 5 * 60) return false;
  const expected = createHmac("sha256", Buffer.from(secret.slice(6), "base64")).update(`${id}.${ts}.${body}`).digest();
  return sigs.split(" ").some((s) => {
    const [version, value] = s.split(",");
    if (version !== "v1" || !value) return false;
    const got = Buffer.from(value, "base64");
    return got.length === expected.length && timingSafeEqual(got, expected);
  });
}

/**
 * Applies one Resend event to the log. A bounce or spam complaint also marks the address, so the panel stops
 * emailing it; a complaint turns off the owner's news and tips for that account too.
 */
export async function recordResendEvent(event: { type?: unknown; data?: { email_id?: unknown } }): Promise<boolean> {
  const status = typeof event.type === "string" ? EVENTS[event.type] : undefined;
  const providerId = event.data?.email_id;
  if (!status || typeof providerId !== "string") return false;
  const row = (await query<{ id: string; parent_id: string; status: string }>("SELECT id, parent_id, status FROM email_log WHERE provider_id = ?", [providerId]))[0];
  if (!row) return false;
  const now = Date.now();
  if ((RANK[status] ?? 0) > (RANK[row.status] ?? 0)) await run("UPDATE email_log SET status = ?, updated_at = ? WHERE id = ?", [status, now, row.id]);
  if (status === "bounced" || status === "complained") await run("UPDATE parents SET email_bounced_at = COALESCE(email_bounced_at, ?) WHERE id = ?", [now, row.parent_id]);
  if (status === "complained") await run("UPDATE parents SET admin_mail = 0 WHERE id = ?", [row.parent_id]);
  return true;
}

export interface EmailLogRow {
  id: string;
  familyId: string;
  email: string | null;
  kind: string;
  label: string | null;
  status: string;
  sentAt: number;
  updatedAt: number;
  sentBy: string | null;
}

/** The newest emails, optionally for one family, kind or status. */
export async function emailLog(opts: { familyId?: string; kind?: string; status?: string; limit?: number } = {}): Promise<EmailLogRow[]> {
  const where: string[] = [];
  const args: (string | number)[] = [];
  if (opts.familyId) {
    where.push("l.family_id = ?");
    args.push(opts.familyId);
  }
  if (opts.kind) {
    where.push("l.kind = ?");
    args.push(opts.kind);
  }
  if (opts.status) {
    where.push("l.status = ?");
    args.push(opts.status);
  }
  const rows = await query<Record<string, unknown>>(
    `SELECT l.id, l.family_id, l.kind, l.label, l.status, l.sent_at, l.updated_at, l.sent_by, p.email
     FROM email_log l LEFT JOIN parents p ON p.id = l.parent_id
     ${where.length ? `WHERE ${where.join(" AND ")}` : ""} ORDER BY l.sent_at DESC LIMIT ?`,
    [...args, Math.min(500, Math.max(1, opts.limit ?? 200))],
  );
  return rows.map((r) => ({
    id: String(r.id),
    familyId: String(r.family_id),
    email: (r.email as string | null) ?? null,
    kind: String(r.kind),
    label: (r.label as string | null) ?? null,
    status: String(r.status),
    sentAt: Number(r.sent_at),
    updatedAt: Number(r.updated_at),
    sentBy: (r.sent_by as string | null) ?? null,
  }));
}

/** Counts by status for emails sent since a time. */
export async function emailCounts(since: number): Promise<Record<string, number>> {
  const rows = await query<{ status: string; n: number }>("SELECT status, COUNT(*) AS n FROM email_log WHERE sent_at >= ? GROUP BY status", [since]);
  return Object.fromEntries(rows.map((r) => [String(r.status), Number(r.n)]));
}
