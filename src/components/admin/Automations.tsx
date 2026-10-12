"use client";

import { useCallback, useEffect, useId, useState } from "react";
import { LIMITS, type AdminMessage } from "@/lib/adminEmails";
import { AUTOMATIONS, MAX_DAILY_CAP, TURN_ON, type AutomationConfig } from "@/lib/automations";
import { call } from "@/lib/classroom";
import { Badge, formatAgo, formatDay, Notice, Preview } from "./Engage";

// The Automations tab: the owner's alerts and morning digest, and automatic nudges. Every nudge is off until
// the owner switches it on here (typing TURN ON); the daily job then sends it to at most its daily limit.

const btn = "min-h-11 rounded-xl px-4 font-bold disabled:opacity-50";
const primary = `${btn} bg-[#4f8ef7] text-[#0f172a]`;
const quiet = `${btn} border border-line bg-white`;
const danger = `${btn} border border-[#e57a12] bg-white text-nudge-dark`;
const field = "mt-1 min-h-11 rounded-xl border border-line bg-white px-3";
const card = "rounded-2xl border border-line bg-white p-5";

interface Status {
  id: string;
  config: AutomationConfig;
  nextRun: number;
  waiting: number;
  sent7: number;
  lastSentAt: number | null;
}
interface Data {
  automations: Status[];
  alerts: { instant: boolean; digest: boolean };
  alertRecipients: number;
}

function Alerts({ data, reload }: { data: Data; reload: () => void }) {
  const [msg, setMsg] = useState<{ err?: string; ok?: string }>({});
  const save = async (next: { instant: boolean; digest: boolean }) => {
    setMsg({});
    try {
      await call("/api/admin/automations/", "POST", { action: "alerts", ...next });
      setMsg({ ok: "Saved." });
      reload();
    } catch (e) {
      setMsg({ err: (e as Error).message });
    }
  };
  const a = data.alerts;
  return (
    <div className={card}>
      <h3 className="text-xl font-bold">Alerts to you</h3>
      <p className="text-sm text-ink-soft">
        Sent to the {data.alertRecipients === 1 ? "admin account" : `${data.alertRecipients} admin accounts`} with a confirmed email. The same alert goes out at most once every 6 hours.
      </p>
      <ul className="mt-2 flex flex-col gap-2">
        <li>
          <label className="flex min-h-11 items-start gap-3">
            <input type="checkbox" className="mt-1 h-5 w-5" checked={a.instant} onChange={(e) => void save({ ...a, instant: e.target.checked })} />
            <span>
              <span className="font-semibold">Alerts when something goes wrong</span>
              <span className="block text-sm text-ink-soft">A payment fails, a payment is disputed, the daily job fails, or a System check goes down (and when it&apos;s working again).</span>
            </span>
          </label>
        </li>
        <li>
          <label className="flex min-h-11 items-start gap-3">
            <input type="checkbox" className="mt-1 h-5 w-5" checked={a.digest} onChange={(e) => void save({ ...a, digest: e.target.checked })} />
            <span>
              <span className="font-semibold">Morning digest</span>
              <span className="block text-sm text-ink-soft">Once a day with the daily job: yesterday&apos;s sign-ups, payments and cancellations, the To do list and any System problems.</span>
            </span>
          </label>
        </li>
      </ul>
      {data.alertRecipients === 0 && <p className="mt-2 text-sm text-nudge-dark">No admin account has a confirmed email, so nothing can be sent.</p>}
      <p className="mt-2 text-sm text-ink-soft">
        System checks are watched every 15 minutes by the Uptime workflow once the repository secret CRON_SECRET is set (docs/ADMIN.md).
      </p>
      <Notice {...msg} />
    </div>
  );
}

function NudgeCard({ s, reload }: { s: Status; reload: () => void }) {
  const ids = useId();
  const def = AUTOMATIONS.find((a) => a.id === s.id)!;
  const [m, setM] = useState<AdminMessage>(s.config.message);
  const [cap, setCap] = useState(String(s.config.dailyCap));
  const [editing, setEditing] = useState(false);
  const [asking, setAsking] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ err?: string; ok?: string }>({});
  const post = async (body: Record<string, unknown>, ok: string) => {
    setBusy(true);
    setMsg({});
    try {
      await call("/api/admin/automations/", "POST", { id: s.id, ...body });
      setMsg({ ok });
      setAsking(false);
      setConfirm("");
      reload();
    } catch (e) {
      setMsg({ err: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };
  const on = s.config.on;
  return (
    <li className={card}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-lg font-bold">{def.name}</h3>
        <Badge tone={on ? "good" : "plain"}>{on ? "On" : "Off"}</Badge>
      </div>
      <p className="font-read">{def.description}</p>
      <p className="mt-1 text-sm">
        Subject: <span className="font-semibold">{s.config.message.subject}</span>
      </p>
      <p className="mt-1 text-sm text-ink-soft">
        {on ? `On since ${formatDay(s.config.onAt)}${s.config.onBy ? ` (${s.config.onBy})` : ""}. ` : ""}
        {s.waiting === 0 ? "Nobody is waiting for it right now." : `${on ? "The next daily run emails" : "If it were on, the next daily run would email"} ${s.nextRun} of the ${s.waiting} ${s.waiting === 1 ? "family" : "families"} waiting (limit ${s.config.dailyCap} a day).`}{" "}
        Sent {s.sent7} in the last 7 days{s.lastSentAt ? `, last ${formatAgo(s.lastSentAt)}` : ""}.
      </p>
      <div className="mt-3 flex flex-wrap gap-2">
        {on ? (
          <button type="button" className={danger} disabled={busy} onClick={() => void post({ action: "switch", on: false }, "Turned off. Nothing more goes out.")}>
            Turn off
          </button>
        ) : (
          <button type="button" className={primary} aria-expanded={asking} onClick={() => setAsking(!asking)}>
            Turn on
          </button>
        )}
        <button type="button" className={quiet} aria-expanded={editing} onClick={() => setEditing(!editing)}>
          Edit the email
        </button>
      </div>
      {asking && !on && (
        <div className="mt-3 flex flex-wrap items-end gap-2 rounded-xl bg-[#f1f5f9] p-3">
          <p className="w-full font-read">
            Once on, the daily job emails up to {s.config.dailyCap} families a day without asking. Each family gets it at most once a month, never within 3 days of another email from the panel, and only with news
            and tips on.
          </p>
          <label className="flex flex-col text-sm font-semibold">
            Type {TURN_ON} to confirm
            <input className={`${field} w-40 font-mono`} value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="off" />
          </label>
          <button type="button" className={primary} disabled={busy || confirm !== TURN_ON} onClick={() => void post({ action: "switch", on: true, confirm }, "Turned on. It runs with the next daily job.")}>
            Start sending
          </button>
        </div>
      )}
      {editing && (
        <div className="mt-3 flex flex-col gap-3 border-t border-line pt-3">
          <label className="flex flex-col text-sm font-semibold" htmlFor={`${ids}-s`}>
            Subject
            <input id={`${ids}-s`} className={field} maxLength={LIMITS.subject} value={m.subject} onChange={(e) => setM({ ...m, subject: e.target.value })} />
          </label>
          <label className="flex flex-col text-sm font-semibold" htmlFor={`${ids}-b`}>
            Message (a blank line starts a new paragraph)
            <textarea id={`${ids}-b`} className={`${field} min-h-40 py-2 font-normal`} maxLength={LIMITS.body} value={m.body} onChange={(e) => setM({ ...m, body: e.target.value })} />
          </label>
          {m.button && (
            <div className="flex flex-wrap gap-2">
              <label className="flex flex-col text-sm font-semibold">
                Button text
                <input className={`${field} w-48`} maxLength={LIMITS.buttonLabel} value={m.button.label} onChange={(e) => setM({ ...m, button: { ...m.button!, label: e.target.value } })} />
              </label>
              <label className="flex flex-col text-sm font-semibold">
                Opens page
                <input className={`${field} w-48 font-mono`} maxLength={LIMITS.path} value={m.button.path} onChange={(e) => setM({ ...m, button: { ...m.button!, path: e.target.value } })} />
              </label>
            </div>
          )}
          <label className="flex flex-col text-sm font-semibold">
            Most families a day (1 to {MAX_DAILY_CAP})
            <input className={`${field} w-28`} inputMode="numeric" value={cap} onChange={(e) => setCap(e.target.value)} />
          </label>
          <Preview m={m} />
          <div>
            <button type="button" className={primary} disabled={busy} onClick={() => void post({ action: "save", message: m, dailyCap: Number(cap) }, "Saved.")}>
              Save
            </button>
          </div>
        </div>
      )}
      <Notice {...msg} />
    </li>
  );
}

export function Automations() {
  const [data, setData] = useState<Data | null>(null);
  const [err, setErr] = useState("");
  const load = useCallback(() => {
    call<Data>("/api/admin/automations/").then(setData, (e: Error) => setErr(e.message));
  }, []);
  useEffect(load, [load]);
  return (
    <section aria-labelledby="auto-h" className="flex flex-col gap-4">
      <h2 id="auto-h" className="text-2xl font-bold">
        Automations
      </h2>
      <Notice err={err} />
      {!data ? (
        !err && <p className="font-read">Loading…</p>
      ) : (
        <>
          <Alerts data={data} reload={load} />
          <div>
            <h3 className="text-xl font-bold">Automatic nudges</h3>
            <p className="max-w-3xl text-sm text-ink-soft">
              Emails the daily job sends by itself when a family reaches a point. Each is off until you turn it on. They follow the same rules as any email from the panel: confirmed accounts with news and tips on,
              never an address that bounced.
            </p>
          </div>
          <ul className="grid gap-3 lg:grid-cols-2">
            {data.automations.map((s) => (
              <NudgeCard key={`${s.id}:${s.config.on}:${s.config.dailyCap}:${s.config.message.subject}`} s={s} reload={load} />
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
