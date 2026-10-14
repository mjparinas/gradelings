import "server-only";
import { APP_NAME } from "@/lib/brand";
import { query, run } from "./db";
import { emailConfigured, sendEmail } from "./email";

// Mail people send to us, which Resend receives. The panel reads it live from Resend's receiving API, so message
// bodies are never copied into our database; we only keep whether the admin has dealt with or answered each one.

const base = () => (process.env.RESEND_API_BASE ?? "https://api.resend.com").replace(/\/$/, "");

async function resend<T>(path: string): Promise<T> {
  const res = await fetch(`${base()}${path}`, { headers: { authorization: `Bearer ${process.env.RESEND_API_KEY}` }, cache: "no-store" });
  if (!res.ok) throw new Error(res.status === 401 || res.status === 403 ? "Resend refused the API key. It needs full access to read received mail." : `Resend answered ${res.status}.`);
  return (await res.json()) as T;
}

interface ResendReceived {
  id: string;
  from: string;
  to?: string[];
  subject?: string | null;
  created_at: string;
  reply_to?: string[];
  message_id?: string;
  text?: string | null;
  html?: string | null;
  attachments?: { filename?: string; size?: number }[];
}

export interface InboxItem {
  id: string;
  from: string;
  fromEmail: string;
  to: string[];
  subject: string;
  receivedAt: number;
  attachments: number;
  /** The account the sender's address belongs to, if any. */
  familyId: string | null;
  handledAt: number | null;
  repliedAt: number | null;
}

/** "Pat <pat@example.com>" → "pat@example.com". */
export function addressOf(from: string): string {
  const m = /<([^>]+)>/.exec(from);
  return (m ? m[1] : from).trim().toLowerCase();
}

export const inboxConfigured = () => emailConfigured();

async function enrich(items: ResendReceived[]): Promise<InboxItem[]> {
  if (!items.length) return [];
  const ids = items.map((i) => i.id);
  const addrs = [...new Set(items.map((i) => addressOf(i.from)))];
  const marks = ids.length ? "?, ".repeat(ids.length).slice(0, -2) : "''";
  const amarks = "?, ".repeat(addrs.length).slice(0, -2);
  const [states, owners] = await Promise.all([
    query<{ email_id: string; handled_at: number | null; replied_at: number | null }>(`SELECT email_id, handled_at, replied_at FROM inbox_state WHERE email_id IN (${marks})`, ids),
    query<{ email: string; family_id: string }>(`SELECT email, family_id FROM parents WHERE role != 'student' AND email IN (${amarks})`, addrs),
  ]);
  const state = new Map(states.map((s) => [String(s.email_id), s]));
  const owner = new Map(owners.map((o) => [String(o.email), String(o.family_id)]));
  return items.map((i) => {
    const s = state.get(i.id);
    const fromEmail = addressOf(i.from);
    return {
      id: i.id,
      from: i.from,
      fromEmail,
      to: i.to ?? [],
      subject: i.subject?.trim() || "(no subject)",
      receivedAt: Date.parse(i.created_at) || 0,
      attachments: i.attachments?.length ?? 0,
      familyId: owner.get(fromEmail) ?? null,
      handledAt: s?.handled_at == null ? null : Number(s.handled_at),
      repliedAt: s?.replied_at == null ? null : Number(s.replied_at),
    };
  });
}

/** The newest received mail, a page at a time. */
export async function listInbox(opts: { limit?: number; after?: string } = {}): Promise<{ items: InboxItem[]; hasMore: boolean }> {
  const q = new URLSearchParams({ limit: String(Math.min(100, Math.max(1, opts.limit ?? 50))) });
  if (opts.after) q.set("after", opts.after);
  const page = await resend<{ data?: ResendReceived[]; has_more?: boolean }>(`/emails/receiving?${q}`);
  return { items: await enrich(page.data ?? []), hasMore: Boolean(page.has_more) };
}

/** Mail nobody has answered or marked as done yet: the "Waiting" badge in the Inbox list. */
const isWaiting = (m: Pick<InboxItem, "handledAt" | "repliedAt">) => !m.handledAt && !m.repliedAt;

/** How many of the newest messages (the Inbox's first page) are waiting, for the count on the Inbox tab. */
export async function countWaiting(): Promise<number> {
  const { items } = await listInbox();
  return items.filter(isWaiting).length;
}

/** Turns an HTML-only email into plain text, so the panel never renders mail it received. */
export function htmlToText(html: string): string {
  return html
    .replace(/<(script|style)[^>]*>[\s\S]*?<\/\1>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(p|div|li|tr|h[1-6])>/gi, "\n")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

export interface InboxMessage extends InboxItem {
  text: string;
  replyTo: string;
  messageId: string | null;
  attachmentNames: string[];
}

export async function getInboxMessage(id: string): Promise<InboxMessage> {
  const m = await resend<ResendReceived>(`/emails/receiving/${encodeURIComponent(id)}`);
  const [item] = await enrich([m]);
  return {
    ...item,
    text: (m.text?.trim() || htmlToText(m.html ?? "")).slice(0, 50_000),
    replyTo: addressOf(m.reply_to?.[0] ?? m.from),
    messageId: m.message_id ?? null,
    attachmentNames: (m.attachments ?? []).map((a) => a.filename ?? "attachment"),
  };
}

export async function markHandled(id: string, handled: boolean): Promise<void> {
  await run("INSERT INTO inbox_state (email_id, handled_at) VALUES (?, ?) ON CONFLICT (email_id) DO UPDATE SET handled_at = excluded.handled_at", [id, handled ? Date.now() : null]);
}

const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[c]!);

/** Answers a received email as a threaded reply, and marks it answered. */
export async function replyToInbox(id: string, text: string, admin: string): Promise<boolean> {
  const m = await getInboxMessage(id);
  const subject = /^re:/i.test(m.subject) ? m.subject : `Re: ${m.subject === "(no subject)" ? APP_NAME : m.subject}`;
  const paras = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  const sent = await sendEmail({
    to: m.replyTo,
    subject,
    text,
    html: `<!doctype html><html><body style="font-family:system-ui,Segoe UI,Arial,sans-serif;color:#1d2233;line-height:1.55">${paras.map((p) => `<p>${esc(p).replace(/\n/g, "<br>")}</p>`).join("")}</body></html>`,
    kind: "reply",
    label: subject,
    sentBy: admin,
    ...(m.messageId ? { headers: { "In-Reply-To": m.messageId, References: m.messageId } } : {}),
  });
  if (sent.ok) {
    const now = Date.now();
    await run(
      "INSERT INTO inbox_state (email_id, handled_at, replied_at, replied_by) VALUES (?, ?, ?, ?) ON CONFLICT (email_id) DO UPDATE SET handled_at = excluded.handled_at, replied_at = excluded.replied_at, replied_by = excluded.replied_by",
      [id, now, now, admin],
    );
  }
  return sent.ok;
}
