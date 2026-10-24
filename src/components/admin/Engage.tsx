"use client";

import { useCallback, useEffect, useId, useState, type ReactNode } from "react";
import { SelectMenu } from "@/components/SelectMenu";
import { fillMessage, LIMITS, MESSAGE_PRESETS, paragraphs, SEGMENTS, type AdminMessage, type Segment } from "@/lib/adminEmails";
import { call } from "@/lib/classroom";
import { EMAIL_KINDS, EMAIL_STATUSES, emailKindLabel, emailStatusLabel } from "@/lib/emailKinds";
import { fillReply, REPLY_LIMITS, type SavedReply } from "@/lib/savedReplies";
import { Bars, LoadingCards, LoadingRows } from "./Skeleton";

// The admin panel's engagement tools: the to-do list, writing and sending emails (to one family or a group),
// the email log and the inbox of mail people send us. Children's first names only go into an email when it's
// sent; the preview shows a stand-in, so the panel never shows them.

const btn = "min-h-11 rounded-xl px-4 font-bold disabled:opacity-50";
const primary = `${btn} bg-[#4f8ef7] text-[#0f172a]`;
const quiet = `${btn} border border-line bg-white`;
const field = "mt-1 min-h-11 rounded-xl border border-line bg-white px-3";
const card = "rounded-2xl border border-line bg-white p-5";

const day = (t: number | null | undefined) => (t ? new Date(t).toLocaleDateString("en-CA", { year: "numeric", month: "short", day: "numeric" }) : "—");
const when = (t: number) => new Date(t).toLocaleString("en-CA", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
const ago = (t: number, now = Date.now()) => {
  const d = Math.floor((now - t) / 86_400_000);
  if (d <= 0) return "today";
  return d === 1 ? "yesterday" : `${d} days ago`;
};

function Notice({ err, ok }: { err?: string; ok?: string }) {
  if (err)
    return (
      <p role="alert" className="mt-2 text-nudge-dark">
        {err}
      </p>
    );
  if (ok)
    return (
      <p role="status" className="mt-2 text-[#16794f]">
        {ok}
      </p>
    );
  return null;
}

function Badge({ children, tone = "plain" }: { children: ReactNode; tone?: "plain" | "good" | "bad" }) {
  const c = tone === "good" ? "bg-[#e3f6ee] text-[#105c3c]" : tone === "bad" ? "bg-[#fdeee2] text-[#8a3b00]" : "bg-[#eef2f7] text-[#334155]";
  return <span className={`inline-block rounded-full px-2 py-0.5 text-sm font-semibold whitespace-nowrap ${c}`}>{children}</span>;
}

const statusTone = (s: string) => (s === "delivered" || s === "sent" ? "good" : s === "bounced" || s === "complained" || s === "failed" ? "bad" : "plain");

// ---------- Writing an email ----------

const fromPreset = (id: string): AdminMessage => {
  const p = MESSAGE_PRESETS.find((x) => x.id === id) ?? MESSAGE_PRESETS[0];
  return { subject: p.subject, body: p.body, button: p.button ? { ...p.button } : null };
};

/** What the email will look like, with a stand-in for the children's names. */
export function Preview({ m }: { m: AdminMessage }) {
  return (
    <div className="rounded-xl border border-line bg-[#f7f5f0] p-4" aria-label="Preview">
      <p className="text-sm font-semibold text-ink-soft">Preview</p>
      <p className="mt-1 font-bold">{fillMessage(m.subject, null) || "(no subject)"}</p>
      <div className="mt-2 rounded-xl bg-white p-3 font-read">
        {paragraphs(fillMessage(m.body, null)).map((p, i) => (
          <p key={i} className="mb-2 whitespace-pre-line last:mb-0">
            {p}
          </p>
        ))}
        {m.button && <p className="mt-3 inline-block rounded-xl bg-[#25b47e] px-4 py-2 font-bold text-[#0f172a]">{fillMessage(m.button.label, null)}</p>}
      </div>
      <p className="mt-2 text-sm text-ink-soft">
        Each email ends with an unsubscribe link for news and tips, and your mailing address. {"{children}"} becomes the children&apos;s first names when it&apos;s sent.
      </p>
    </div>
  );
}

/**
 * Writes and sends an email: to one family (`familyId`), or to a group (`segment`), which shows who it reaches
 * and needs the number typed back before it sends.
 */
export function Composer({ familyId, segment, preset = "miss-you", onSent }: { familyId?: string; segment?: Segment; preset?: string; onSent?: () => void }) {
  const ids = useId();
  const [presetId, setPresetId] = useState(preset);
  const [m, setM] = useState<AdminMessage>(() => fromPreset(preset));
  const [confirm, setConfirm] = useState("");
  const [audience, setAudience] = useState<{ ready: number; batch: number; total: number; skipped: Record<string, number>; sample: { email: string }[] } | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ err?: string; ok?: string }>({});
  const loadAudience = useCallback(() => {
    if (!segment) return;
    call<NonNullable<typeof audience>>(`/api/admin/email/?segment=${segment}`).then(setAudience, (e: Error) => setMsg({ err: e.message }));
  }, [segment]);
  useEffect(loadAudience, [loadAudience]);

  const pick = (id: string) => {
    setPresetId(id);
    setM(fromPreset(id));
  };
  const send = async () => {
    setBusy(true);
    setMsg({});
    try {
      if (segment) {
        const r = await call<{ sent: number; failed: number; remaining: number }>("/api/admin/email/", "POST", { action: "send-segment", segment, message: m, confirm });
        setMsg({ ok: `Sent ${r.sent}${r.failed ? `, ${r.failed} failed` : ""}.${r.remaining ? ` ${r.remaining} more in this group: send again to continue.` : ""}` });
        setConfirm("");
        loadAudience();
      } else {
        await call("/api/admin/email/", "POST", { action: "send", familyId, message: m });
        setMsg({ ok: "Email sent." });
      }
      onSent?.();
    } catch (e) {
      setMsg({ err: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };
  const need = audience ? `SEND ${audience.batch}` : "";
  return (
    <div className="flex flex-col gap-3">
      <SelectMenu
        label="Message"
        value={presetId}
        onChange={pick}
        options={MESSAGE_PRESETS.map((p) => ({ value: p.id, label: `${p.name} (${p.when.toLowerCase()})` }))}
      />
      <label className="flex flex-col text-sm font-semibold" htmlFor={`${ids}-s`}>
        Subject
        <input id={`${ids}-s`} className={field} maxLength={LIMITS.subject} value={m.subject} onChange={(e) => setM({ ...m, subject: e.target.value })} />
      </label>
      <label className="flex flex-col text-sm font-semibold" htmlFor={`${ids}-b`}>
        Message (a blank line starts a new paragraph)
        <textarea id={`${ids}-b`} className={`${field} min-h-40 py-2 font-normal`} maxLength={LIMITS.body} value={m.body} onChange={(e) => setM({ ...m, body: e.target.value })} />
      </label>
      <div className="flex flex-wrap items-end gap-2">
        <label className="flex items-center gap-2 text-sm font-semibold">
          <input type="checkbox" className="h-5 w-5" checked={m.button !== null} onChange={(e) => setM({ ...m, button: e.target.checked ? { label: "Open {app}", path: "/play/" } : null })} />
          Add a button
        </label>
        {m.button && (
          <>
            <label className="flex flex-col text-sm font-semibold">
              Button text
              <input className={`${field} w-48`} maxLength={LIMITS.buttonLabel} value={m.button.label} onChange={(e) => setM({ ...m, button: { ...m.button!, label: e.target.value } })} />
            </label>
            <label className="flex flex-col text-sm font-semibold">
              Opens page
              <input className={`${field} w-48 font-mono`} maxLength={LIMITS.path} value={m.button.path} onChange={(e) => setM({ ...m, button: { ...m.button!, path: e.target.value } })} />
            </label>
          </>
        )}
      </div>
      <p className="text-sm text-ink-soft">Use {"{children}"} for the children&apos;s first names and {"{app}"} for the app&apos;s name.</p>
      <Preview m={m} />

      {segment && (
        <div className="rounded-xl bg-[#f1f5f9] p-3">
          {!audience ? (
            <p className="font-read" aria-busy="true">
              Counting who this reaches…
              <Bars widths={["w-1/2", "w-3/4"]} className="mt-2" />
            </p>
          ) : (
            <>
              <p className="font-semibold">
                {audience.batch === 0 ? "Nobody in this group can be emailed right now." : `This send reaches ${audience.batch} ${audience.batch === 1 ? "family" : "families"}`}
                {audience.ready > audience.batch ? ` (${audience.ready} in all; up to ${audience.batch} at a time)` : ""}.
              </p>
              <p className="text-sm text-ink-soft">
                {audience.total} in the group. Left out: {audience.skipped.unconfirmed ?? 0} unconfirmed, {audience.skipped.unsubscribed ?? 0} unsubscribed, {audience.skipped.bounced ?? 0} bouncing,{" "}
                {audience.skipped.recent ?? 0} emailed from here in the last few days.
              </p>
              {audience.sample.length > 0 && <p className="mt-1 text-sm break-all text-ink-soft">First few: {audience.sample.map((s) => s.email).join(", ")}</p>}
              {audience.batch > 0 && (
                <label className="mt-2 flex flex-col text-sm font-semibold">
                  Type {need} to confirm
                  <input className={`${field} w-48 font-mono`} value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="off" />
                </label>
              )}
            </>
          )}
        </div>
      )}
      <div>
        <button type="button" className={primary} disabled={busy || (segment ? !audience?.batch || confirm !== need : false)} onClick={() => void send()}>
          {busy ? "Sending…" : segment ? "Send to the Group" : "Send Email"}
        </button>
      </div>
      <Notice {...msg} />
    </div>
  );
}

// ---------- The email log ----------

export interface EmailRow {
  id: string;
  familyId: string;
  email: string | null;
  kind: string;
  label: string | null;
  status: string;
  sentAt: number;
  sentBy: string | null;
}

export function EmailTable({ emails, onOpenFamily, showAccount = true }: { emails: EmailRow[]; onOpenFamily?: (id: string) => void; showAccount?: boolean }) {
  if (!emails.length) return <p className="mt-2 font-read text-ink-soft">No emails yet.</p>;
  return (
    <div className="mt-2 max-h-[32rem] overflow-auto rounded-xl border border-line" tabIndex={0} role="region" aria-label="Emails sent">
      <table className="w-full text-left text-sm">
        <thead className="sticky top-0 bg-[#f8fafc]">
          <tr>
            <th scope="col" className="px-3 py-2">Sent</th>
            {showAccount && <th scope="col" className="px-3 py-2">To</th>}
            <th scope="col" className="px-3 py-2">Email</th>
            <th scope="col" className="px-3 py-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {emails.map((e) => (
            <tr key={e.id} className="border-t border-line">
              <td className="px-3 py-2 whitespace-nowrap">{when(e.sentAt)}</td>
              {showAccount && (
                <td className="px-3 py-2">
                  {onOpenFamily && e.email ? (
                    <button type="button" className="min-h-11 text-left font-semibold break-all text-[#2a5bd7] underline" onClick={() => onOpenFamily(e.familyId)}>
                      {e.email}
                    </button>
                  ) : (
                    (e.email ?? "—")
                  )}
                </td>
              )}
              <td className="px-3 py-2">
                {emailKindLabel(e.kind)}
                {(e.kind === "admin" || e.kind === "reply") && e.label && <span className="block text-ink-soft">{e.label}</span>}
              </td>
              <td className="px-3 py-2">
                <Badge tone={statusTone(e.status)}>{emailStatusLabel(e.status)}</Badge>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** The Emails tab: what went out and what happened to it, and sending to a group. */
export function Emails({ onOpenFamily, initialSegment = "quiet-7" }: { onOpenFamily: (id: string) => void; initialSegment?: Segment }) {
  const [kind, setKind] = useState("");
  const [status, setStatus] = useState("");
  const [data, setData] = useState<{ emails: EmailRow[]; counts30: Record<string, number>; resendWebhook: boolean } | null>(null);
  const [err, setErr] = useState("");
  const [segment, setSegment] = useState<Segment>(initialSegment);
  const load = useCallback(() => {
    const q = new URLSearchParams({ ...(kind ? { kind } : {}), ...(status ? { status } : {}) });
    call<NonNullable<typeof data>>(`/api/admin/email/?${q}`).then(setData, (e: Error) => setErr(e.message));
  }, [kind, status]);
  useEffect(load, [load]);
  const c = data?.counts30 ?? {};
  const total = Object.values(c).reduce((s, n) => s + n, 0);
  const rate = (n: number) => (total ? `${Math.round((n / total) * 1000) / 10}%` : "—");
  return (
    <section aria-labelledby="emails-h" className="flex flex-col gap-4">
      <h2 id="emails-h" className="text-2xl font-bold">
        Emails
      </h2>
      <div className={card}>
        <h3 className="text-xl font-bold">Last 30 Days</h3>
        <dl className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {[
            ["Sent", total],
            ["Delivered", c.delivered ?? 0],
            ["Bounced", `${c.bounced ?? 0} (${rate(c.bounced ?? 0)})`],
            ["Marked as spam", `${c.complained ?? 0} (${rate(c.complained ?? 0)})`],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl bg-[#f1f5f9] p-3">
              <dt className="text-sm font-semibold text-ink-soft">{label}</dt>
              <dd className="text-xl font-bold tabular-nums">{data ? value : <Bars widths={["w-1/2"]} className="mt-2" />}</dd>
            </div>
          ))}
        </dl>
        {data && !data.resendWebhook && (
          <p className="mt-2 text-sm text-ink-soft">
            Delivery reports are off. In Resend, add a webhook to /api/email/webhook/ for the delivered, delayed, bounced and complained events, and set RESEND_WEBHOOK_SECRET to its signing
            secret.
          </p>
        )}
      </div>

      <div className={card}>
        <h3 className="text-xl font-bold">Email a Group</h3>
        <p className="text-sm text-ink-soft">
          Goes only to confirmed accounts that haven&apos;t turned off news and tips. Anyone emailed from here in the last few days is skipped, so sending again continues with the rest.
        </p>
        <div className="mt-3">
          <SelectMenu
            label="Group"
            value={segment}
            onChange={(v) => setSegment(v as Segment)}
            options={Object.entries(SEGMENTS).map(([k, s]) => ({ value: k, label: `${s.name}: ${s.description}` }))}
          />
        </div>
        <div className="mt-3">
          <Composer key={segment} segment={segment} preset={SEGMENT_PRESET[segment]} onSent={load} />
        </div>
      </div>

      <div className={card}>
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-xl font-bold">Sent Emails</h3>
          <a className="min-h-11 font-semibold text-[#2a5bd7] underline" href="/api/admin/export/?type=emails" download>
            Download CSV
          </a>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <SelectMenu label="Kind" block={false} value={kind} onChange={setKind} options={[{ value: "", label: "Every kind" }, ...Object.entries(EMAIL_KINDS).map(([k, l]) => ({ value: k, label: l }))]} />
          <SelectMenu label="Status" block={false} value={status} onChange={setStatus} options={[{ value: "", label: "Any status" }, ...Object.entries(EMAIL_STATUSES).map(([k, l]) => ({ value: k, label: l }))]} />
        </div>
        <Notice err={err} />
        {data ? <EmailTable emails={data.emails} onOpenFamily={onOpenFamily} /> : !err && <LoadingRows rows={6} />}
      </div>
    </section>
  );
}

const SEGMENT_PRESET: Record<Segment, string> = {
  "quiet-7": "miss-you",
  "never-practised": "getting-started",
  "no-child": "getting-started",
  "tried-few": "miss-you",
  "engaged-not-paying": "keep-going",
  "trial-ending": "trial-ending",
  "trial-over": "come-back",
  cancelled: "feedback",
  everyone: "custom",
};

// ---------- The to-do list ----------

interface QueueItem {
  key: string;
  kind: string;
  title: string;
  detail: string;
  familyId?: string;
  email?: string;
  at: number;
  action: { type: "email"; preset: string } | { type: "verify" } | { type: "open" } | { type: "reports" } | { type: "feedback" } | { type: "inbox"; id: string } | { type: "task" };
}

export function Queue({ onOpenFamily, onReports, onFeedback, onInbox, onCount }: { onOpenFamily: (id: string) => void; onReports: () => void; onFeedback?: () => void; onInbox: (id: string) => void; onCount?: (n: number) => void }) {
  const [items, setItems] = useState<QueueItem[] | null>(null);
  const [err, setErr] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const [done, setDone] = useState<Record<string, string>>({});
  const load = useCallback(() => {
    call<{ items: QueueItem[] }>("/api/admin/queue/").then(
      (r) => {
        setItems(r.items);
        onCount?.(r.items.length);
      },
      (e: Error) => setErr(e.message),
    );
  }, [onCount]);
  useEffect(load, [load]);
  const hide = async (key: string, days: number | null) => {
    try {
      await call("/api/admin/queue/", "POST", { key, days });
      setItems((xs) => {
        const next = xs?.filter((x) => x.key !== key) ?? null;
        onCount?.(next?.length ?? 0);
        return next;
      });
    } catch (e) {
      setErr((e as Error).message);
    }
  };
  const verify = async (it: QueueItem) => {
    try {
      await call("/api/admin/email/", "POST", { action: "verify", familyId: it.familyId });
      setDone((d) => ({ ...d, [it.key]: "Confirmation email sent." }));
    } catch (e) {
      setDone((d) => ({ ...d, [it.key]: (e as Error).message }));
    }
  };
  return (
    <section aria-labelledby="queue-h" className="flex flex-col gap-3">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="queue-h" className="text-2xl font-bold">
          To Do
        </h2>
        <button type="button" className="font-semibold text-[#2a5bd7] underline" onClick={load}>
          Refresh
        </button>
      </div>
      <p className="max-w-3xl text-sm text-ink-soft">
        Families worth a nudge today, worked out fresh from the data, plus setup tasks still open. An item goes away once the family moves on (or for a week after you email them from here), or once the task is done.
      </p>
      <Notice err={err} />
      {!items ? (
        !err && <LoadingCards count={4} className="" />
      ) : items.length === 0 ? (
        <p className={`${card} font-read`}>Nothing to do right now. 🎉</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {items.map((it) => (
            <li key={it.key} className={card}>
              <div className="flex flex-wrap items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="font-bold">{it.title}</p>
                  <p className="font-read">{it.detail}</p>
                  {it.email && it.action.type !== "inbox" && (
                    <p className="text-sm break-all">
                      {it.familyId ? (
                        <button type="button" className="min-h-11 text-left font-semibold text-[#2a5bd7] underline" onClick={() => onOpenFamily(it.familyId!)}>
                          {it.email}
                        </button>
                      ) : (
                        it.email
                      )}
                    </p>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {it.action.type === "email" && (
                    <button type="button" className={primary} aria-expanded={open === it.key} onClick={() => setOpen(open === it.key ? null : it.key)}>
                      Write Email
                    </button>
                  )}
                  {it.action.type === "verify" && (
                    <button type="button" className={primary} onClick={() => void verify(it)}>
                      Resend Confirmation
                    </button>
                  )}
                  {it.action.type === "open" && it.familyId && (
                    <button type="button" className={primary} onClick={() => onOpenFamily(it.familyId!)}>
                      Open Family
                    </button>
                  )}
                  {it.action.type === "reports" && (
                    <button type="button" className={primary} onClick={onReports}>
                      Open Reports
                    </button>
                  )}
                  {it.action.type === "feedback" && (
                    <button type="button" className={primary} onClick={onFeedback}>
                      Open Feedback
                    </button>
                  )}
                  {it.action.type === "inbox" && (
                    <button type="button" className={primary} onClick={() => onInbox((it.action as { id: string }).id)}>
                      Read and Reply
                    </button>
                  )}
                  <button type="button" className={quiet} onClick={() => void hide(it.key, 7)}>
                    Snooze a Week
                  </button>
                  <button type="button" className={quiet} onClick={() => void hide(it.key, null)}>
                    Dismiss
                  </button>
                </div>
              </div>
              {done[it.key] && <Notice ok={done[it.key]} />}
              {open === it.key && it.action.type === "email" && it.familyId && (
                <div className="mt-3 border-t border-line pt-3">
                  <Composer familyId={it.familyId} preset={it.action.preset} onSent={() => setTimeout(load, 1500)} />
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

// ---------- The inbox ----------

interface InboxItem {
  id: string;
  from: string;
  fromEmail: string;
  subject: string;
  receivedAt: number;
  attachments: number;
  familyId: string | null;
  handledAt: number | null;
  repliedAt: number | null;
  archivedAt?: number | null;
}
interface InboxMessage extends InboxItem {
  text: string;
  hasHtml?: boolean;
  remoteImages?: boolean;
  replyTo: string;
  attachmentNames: string[];
}

/** Not yet answered, marked as done or archived. The server counts the same way (`isWaiting` in `src/server/inbox.ts`). */
const waiting = (m: InboxItem) => !m.handledAt && !m.repliedAt && !m.archivedAt;

/** `onWaiting` gets how many listed messages are waiting each time the list loads, so the tab's count stays current. */
export function Inbox({ initialId = null, onOpenFamily, onWaiting }: { initialId?: string | null; onOpenFamily: (id: string) => void; onWaiting?: (n: number) => void }) {
  const [list, setList] = useState<{ configured: boolean; items: InboxItem[]; hasMore: boolean } | null>(null);
  const [err, setErr] = useState("");
  const [openId, setOpenId] = useState<string | null>(initialId);
  // Archived mail leaves the Inbox list and shows under Archived, where it can be moved back.
  const [archived, setArchived] = useState(false);
  const [busy, setBusy] = useState<string | null>(null);
  const load = useCallback(() => {
    call<NonNullable<typeof list>>("/api/admin/inbox/").then(
      (r) => {
        setList(r);
        onWaiting?.(r.items.filter(waiting).length);
      },
      (e: Error) => setErr(e.message),
    );
  }, [onWaiting]);
  useEffect(load, [load]);
  const archive = async (id: string, value: boolean) => {
    setBusy(id);
    setErr("");
    try {
      await call("/api/admin/inbox/", "POST", { id, action: "archive", archived: value });
      load();
    } catch (e) {
      setErr((e as Error).message);
    } finally {
      setBusy(null);
    }
  };
  if (openId) return <InboxRead id={openId} onBack={() => (setOpenId(null), load())} onOpenFamily={onOpenFamily} />;
  const shown = list?.items.filter((m) => Boolean(m.archivedAt) === archived) ?? [];
  const archivedCount = list?.items.filter((m) => m.archivedAt).length ?? 0;
  return (
    <section aria-labelledby="inbox-h" className="flex flex-col gap-3">
      <h2 id="inbox-h" className="text-2xl font-bold">
        Inbox
      </h2>
      <p className="max-w-3xl text-sm text-ink-soft">Mail people send to your Resend receiving address. Messages stay in Resend; they&apos;re shown here as plain text.</p>
      <Notice err={err} />
      <SavedRepliesEditor />
      {list?.configured && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Show">
          <button type="button" aria-pressed={!archived} className={`${btn} ${!archived ? "bg-[#0f172a] text-white" : "border border-line bg-white"}`} onClick={() => setArchived(false)}>
            Inbox
          </button>
          <button type="button" aria-pressed={archived} className={`${btn} ${archived ? "bg-[#0f172a] text-white" : "border border-line bg-white"}`} onClick={() => setArchived(true)}>
            Archived{archivedCount ? ` (${archivedCount})` : ""}
          </button>
        </div>
      )}
      {!list ? (
        !err && <LoadingRows rows={6} className="" />
      ) : !list.configured ? (
        <p className={`${card} font-read`}>Email isn&apos;t set up yet (RESEND_API_KEY and EMAIL_FROM).</p>
      ) : shown.length === 0 ? (
        <p className={`${card} font-read`}>{archived ? "Nothing archived." : list.items.length ? "Nothing waiting here. Archived mail is under Archived." : "No mail yet."}</p>
      ) : (
        <ul className="divide-y divide-line rounded-2xl border border-line bg-white">
          {shown.map((m) => (
            <li key={m.id} className="flex items-center gap-2 pr-3">
              <button type="button" className="flex min-h-11 min-w-0 flex-1 flex-wrap items-baseline justify-between gap-2 px-4 py-3 text-left" onClick={() => setOpenId(m.id)}>
                <span className="min-w-0">
                  <span className={`block break-words ${waiting(m) ? "font-bold" : "font-normal"}`}>{m.subject}</span>
                  <span className="block text-sm break-all text-ink-soft">
                    {m.from}
                    {m.familyId ? " · has an account" : ""}
                    {m.attachments ? ` · ${m.attachments} attachment${m.attachments === 1 ? "" : "s"}` : ""}
                  </span>
                </span>
                <span className="flex items-center gap-2 text-sm">
                  {m.repliedAt ? <Badge tone="good">Answered</Badge> : m.handledAt ? <Badge>Done</Badge> : m.archivedAt ? null : <Badge tone="bad">Waiting</Badge>}
                  {when(m.receivedAt)}
                </span>
              </button>
              <button type="button" className={`${quiet} shrink-0 text-sm`} disabled={busy === m.id} aria-label={`${archived ? "Move to Inbox" : "Archive"}: ${m.subject}`} onClick={() => void archive(m.id, !archived)}>
                {archived ? "Move to Inbox" : "Archive"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

function InboxRead({ id, onBack, onOpenFamily }: { id: string; onBack: () => void; onOpenFamily: (id: string) => void }) {
  const [replies] = useSavedReplies();
  const [m, setM] = useState<InboxMessage | null>(null);
  const [canDraft, setCanDraft] = useState(false);
  const [err, setErr] = useState("");
  const [reply, setReply] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ err?: string; ok?: string }>({});
  const load = useCallback(() => {
    call<{ message: InboxMessage; canDraft?: boolean }>(`/api/admin/inbox/?id=${encodeURIComponent(id)}`).then(
      (r) => (setM(r.message), setCanDraft(Boolean(r.canDraft))),
      (e: Error) => setErr(e.message),
    );
  }, [id]);
  // Claude writes a first draft into the reply box; nothing is sent until the admin presses Send reply.
  const draft = async () => {
    setBusy(true);
    setMsg({});
    try {
      const r = await call<{ draft: string }>("/api/admin/inbox/", "POST", { id, action: "draft" });
      setReply((cur) => (cur.trim() ? `${cur.trimEnd()}\n\n${r.draft}` : r.draft));
      setMsg({ ok: "Draft added. Read it and change anything before sending." });
    } catch (e) {
      setMsg({ err: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };
  useEffect(load, [load]);
  const post = async (body: Record<string, unknown>, ok: string) => {
    setBusy(true);
    setMsg({});
    try {
      await call("/api/admin/inbox/", "POST", { id, ...body });
      setMsg({ ok });
      load();
      return true;
    } catch (e) {
      setMsg({ err: (e as Error).message });
      return false;
    } finally {
      setBusy(false);
    }
  };
  return (
    <section aria-labelledby="mail-h" className="flex flex-col gap-3">
      <button type="button" className="self-start font-semibold underline" onClick={onBack}>
        ← Inbox
      </button>
      <Notice err={err} />
      {!m ? (
        !err && <LoadingCards count={2} className="" />
      ) : (
        <>
          <div className={card}>
            <h2 id="mail-h" className="text-2xl font-bold break-words">
              {m.subject}
            </h2>
            <p className="mt-1 text-sm break-all text-ink-soft">
              From {m.from} · {when(m.receivedAt)}
            </p>
            {m.familyId && (
              <button type="button" className="min-h-11 font-semibold text-[#2a5bd7] underline" onClick={() => onOpenFamily(m.familyId!)}>
                Open Their Account
              </button>
            )}
            <MessageBody id={id} m={m} />
            {m.attachmentNames.length > 0 && <p className="mt-2 text-sm text-ink-soft">Attachments (open them in Resend): {m.attachmentNames.join(", ")}</p>}
          </div>
          <div className={card}>
            <h3 className="text-xl font-bold">Reply to {m.replyTo}</h3>
            {m.repliedAt && <p className="text-sm text-ink-soft">You answered this {ago(m.repliedAt)}.</p>}
            {replies && replies.length > 0 && (
              <div className="mt-2">
                <SelectMenu
                  label="Insert a saved reply"
                  block={false}
                  value=""
                  onChange={(rid) => {
                    const r = replies.find((x) => x.id === rid);
                    if (r) setReply((cur) => (cur.trim() ? `${cur.trimEnd()}\n\n${fillReply(r.body)}` : fillReply(r.body)));
                  }}
                  options={[{ value: "", label: "Pick one…" }, ...replies.map((r) => ({ value: r.id, label: r.title }))]}
                />
              </div>
            )}
            <label className="mt-2 flex flex-col text-sm font-semibold">
              Your reply
              <textarea className={`${field} min-h-36 py-2 font-normal`} maxLength={10_000} value={reply} onChange={(e) => setReply(e.target.value)} />
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              <button
                type="button"
                className={primary}
                disabled={busy || !reply.trim()}
                onClick={async () => {
                  if (await post({ action: "reply", text: reply }, "Reply sent.")) setReply("");
                }}
              >
                Send Reply
              </button>
              {canDraft && (
                <button type="button" className={quiet} disabled={busy} onClick={() => void draft()}>
                  Draft With AI
                </button>
              )}
              <button type="button" className={quiet} disabled={busy} onClick={() => void post({ action: "handled", handled: !m.handledAt }, m.handledAt ? "Moved back to waiting." : "Marked as done.")}>
                {m.handledAt ? "Mark as Waiting" : "Mark as Done"}
              </button>
              <button
                type="button"
                className={quiet}
                disabled={busy}
                onClick={async () => {
                  const wasArchived = Boolean(m.archivedAt);
                  if ((await post({ action: "archive", archived: !wasArchived }, wasArchived ? "Moved back to the Inbox." : "Archived.")) && !wasArchived) onBack();
                }}
              >
                {m.archivedAt ? "Move to Inbox" : "Archive"}
              </button>
            </div>
            <Notice {...msg} />
          </div>
        </>
      )}
    </section>
  );
}

/**
 * The message as the sender formatted it, or as plain text. HTML is sanitized on the server and shown from its own
 * address in a sandboxed frame with no scripts and no access to the panel (`src/server/emailHtml.ts`). Images from
 * the internet stay blocked until asked for, since loading one tells the sender the mail was opened.
 */
function MessageBody({ id, m }: { id: string; m: InboxMessage }) {
  const [plain, setPlain] = useState(false);
  const [images, setImages] = useState(false);
  const textView = (
    <div className="mt-3 max-h-[28rem] overflow-auto rounded-xl bg-[#f7f5f0] p-3 font-read whitespace-pre-wrap" tabIndex={0} role="region" aria-label="Message">
      {m.text || "(empty message)"}
    </div>
  );
  if (!m.hasHtml) return textView;
  return (
    <>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button type="button" className={quiet} aria-pressed={plain} onClick={() => setPlain(!plain)}>
          {plain ? "Show Formatted" : "Show Plain Text"}
        </button>
        {!plain && m.remoteImages && !images && (
          <>
            <button type="button" className={quiet} onClick={() => setImages(true)}>
              Load Images
            </button>
            <span className="text-sm text-ink-soft">Images are blocked, because loading them can tell the sender you opened this.</span>
          </>
        )}
      </div>
      {plain ? (
        textView
      ) : (
        <iframe
          title="Message"
          src={`/api/admin/inbox/view/?id=${encodeURIComponent(id)}${images ? "&images=1" : ""}`}
          sandbox="allow-popups allow-popups-to-escape-sandbox"
          referrerPolicy="no-referrer"
          className="mt-2 h-[32rem] w-full rounded-xl border border-line bg-white"
        />
      )}
    </>
  );
}

// ---------- Saved replies ----------

function useSavedReplies(): [SavedReply[] | null, () => void, string] {
  const [list, setList] = useState<SavedReply[] | null>(null);
  const [err, setErr] = useState("");
  const load = useCallback(() => {
    call<{ replies: SavedReply[] }>("/api/admin/replies/").then((r) => setList(r.replies), (e: Error) => setErr(e.message));
  }, []);
  useEffect(load, [load]);
  return [list, load, err];
}

/** Adding, changing and removing the inbox's saved replies. The whole list is saved at once. */
function SavedRepliesEditor() {
  const [list, reload, loadErr] = useSavedReplies();
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState<SavedReply[] | null>(null);
  const [msg, setMsg] = useState<{ err?: string; ok?: string }>({});
  const [busy, setBusy] = useState(false);
  const items = draft ?? list ?? [];
  const edit = (i: number, patch: Partial<SavedReply>) => setDraft(items.map((r, j) => (j === i ? { ...r, ...patch } : r)));
  const save = async () => {
    setBusy(true);
    setMsg({});
    try {
      await call("/api/admin/replies/", "PUT", { replies: items });
      setMsg({ ok: "Saved replies updated." });
      setDraft(null);
      reload();
    } catch (e) {
      setMsg({ err: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };
  return (
    <div className={card}>
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h3 className="text-xl font-bold">Saved Replies</h3>
        <button type="button" className="min-h-11 font-semibold text-[#2a5bd7] underline" aria-expanded={open} onClick={() => setOpen(!open)}>
          {open ? "Close" : `Edit (${list?.length ?? 0})`}
        </button>
      </div>
      <p className="text-sm text-ink-soft">Answers to common questions you can insert into a reply and change before sending. {"{app}"} becomes the app&apos;s name.</p>
      <Notice err={loadErr} />
      {open && (
        <div className="mt-3 flex flex-col gap-3">
          {items.map((r, i) => (
            <div key={r.id} className="rounded-xl border border-line p-3">
              <label className="flex flex-col text-sm font-semibold">
                Title
                <input className={field} maxLength={REPLY_LIMITS.title} value={r.title} onChange={(e) => edit(i, { title: e.target.value })} />
              </label>
              <label className="mt-2 flex flex-col text-sm font-semibold">
                Reply
                <textarea className={`${field} min-h-28 py-2 font-normal`} maxLength={REPLY_LIMITS.body} value={r.body} onChange={(e) => edit(i, { body: e.target.value })} />
              </label>
              <button type="button" className={`${quiet} mt-2`} onClick={() => setDraft(items.filter((_, j) => j !== i))}>
                Remove
              </button>
            </div>
          ))}
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className={quiet}
              disabled={items.length >= REPLY_LIMITS.count}
              onClick={() => setDraft([...items, { id: `reply-${Date.now().toString(36)}`, title: "New reply", body: "" }])}
            >
              Add a Reply
            </button>
            <button type="button" className={primary} disabled={busy || !draft} onClick={() => void save()}>
              Save Replies
            </button>
          </div>
          <Notice {...msg} />
        </div>
      )}
    </div>
  );
}

// ---------- On a family's page ----------

export interface FamilyEmailState {
  verified: boolean;
  newsAndTips: boolean;
  bouncedAt: number | null;
  lastLogin: number | null;
}

/** Emailing one family, and what they've been sent. */
export function FamilyEmail({ familyId, parent, emails }: { familyId: string; parent: FamilyEmailState | undefined; emails: EmailRow[] }) {
  const [msg, setMsg] = useState<{ err?: string; ok?: string }>({});
  const [busy, setBusy] = useState(false);
  const lastPanel = emails.find((e) => e.kind === "admin");
  const blocked = !parent ? "No account email." : parent.bouncedAt ? "Email to this address bounced or was marked as spam." : !parent.newsAndTips ? "They turned off news and tips." : null;
  return (
    <div className="flex flex-col gap-4">
      <div className={card}>
        <h3 className="text-xl font-bold">Email This Family</h3>
        {lastPanel && <p className="text-sm text-ink-soft">Last emailed from here {ago(lastPanel.sentAt)}.</p>}
        {parent && !parent.verified ? (
          <>
            <p className="mt-1 font-read">Their email isn&apos;t confirmed, so only the confirmation email can go out.</p>
            <button
              type="button"
              className={`${primary} mt-2`}
              disabled={busy}
              onClick={async () => {
                setBusy(true);
                setMsg({});
                try {
                  await call("/api/admin/email/", "POST", { action: "verify", familyId });
                  setMsg({ ok: "Confirmation email sent." });
                } catch (e) {
                  setMsg({ err: (e as Error).message });
                } finally {
                  setBusy(false);
                }
              }}
            >
              Resend Confirmation Email
            </button>
            <Notice {...msg} />
          </>
        ) : blocked ? (
          <p className="mt-1 font-read">{blocked}</p>
        ) : (
          <div className="mt-2">
            <Composer familyId={familyId} />
          </div>
        )}
      </div>
      <div className={card}>
        <h3 className="text-xl font-bold">Emails Sent</h3>
        <EmailTable emails={emails} showAccount={false} />
      </div>
    </div>
  );
}

export { day as formatDay, ago as formatAgo, Badge, Notice };
