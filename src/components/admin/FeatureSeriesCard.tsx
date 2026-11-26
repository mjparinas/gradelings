"use client";

import { useState } from "react";
import { TURN_ON } from "@/lib/automations";
import { call } from "@/lib/classroom";
import { FEATURE_EMAILS } from "@/lib/featureSeries";
import { FEATURE_SERIES, SERIES_MAX_CAP, type SeriesConfig } from "@/lib/featureSeriesRules";
import { Badge, formatAgo, formatDay, Notice } from "./Engage";

// The feature series on the Automations tab: one email a day after sign-up, each about one feature. Off until the
// owner types TURN ON (docs/ADMIN.md).

const btn = "min-h-11 rounded-xl px-4 font-bold disabled:opacity-50";
const primary = `${btn} bg-[#4f8ef7] text-[#0f172a]`;
const danger = `${btn} border border-[#e57a12] bg-white text-nudge-dark`;
const field = "mt-1 min-h-11 rounded-xl border border-line bg-white px-3";

export interface SeriesData {
  config: SeriesConfig;
  nextRun: number;
  inWindow: number;
  sent7: number;
  lastSentAt: number | null;
  length: number;
  sentTotal: number;
}

const TIER = { free: "Free", plan: "Family plan", both: "Free + plan" } as const;

export function FeatureSeriesCard({ s, reload }: { s: SeriesData; reload: () => void }) {
  const [asking, setAsking] = useState(false);
  const [confirm, setConfirm] = useState("");
  const [cap, setCap] = useState(String(s.config.dailyCap));
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ err?: string; ok?: string }>({});
  const on = s.config.on;
  const post = async (body: Record<string, unknown>, ok: string) => {
    setBusy(true);
    setMsg({});
    try {
      await call("/api/admin/automations/", "POST", body);
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
  return (
    <section aria-labelledby="series-h" className="rounded-2xl border border-line bg-white p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 id="series-h" className="text-xl font-bold">
          {FEATURE_SERIES.name}
        </h3>
        <Badge tone={on ? "good" : "plain"}>{on ? "On" : "Off"}</Badge>
      </div>
      <p className="font-read">{FEATURE_SERIES.description}</p>
      <p className="mt-1 text-sm text-ink-soft">
        {on ? `On since ${formatDay(s.config.onAt)}${s.config.onBy ? ` (${s.config.onBy})` : ""}. ` : ""}
        {s.inWindow === 0
          ? "Nobody is in the series right now."
          : `${on ? "The next daily run emails" : "If it were on, the next daily run would email"} ${s.nextRun} of the ${s.inWindow} ${s.inWindow === 1 ? "family" : "families"} in the series (limit ${s.config.dailyCap} a day).`}{" "}
        {s.length} emails in all, {s.sentTotal} sent so far, {s.sent7} in the last 7 days{s.lastSentAt ? `, last ${formatAgo(s.lastSentAt)}` : ""}.
      </p>
      <div className="mt-3 flex flex-wrap items-end gap-2">
        {on ? (
          <button type="button" className={danger} disabled={busy} onClick={() => void post({ action: "series-switch", on: false }, "Turned off. Nothing more goes out.")}>
            Turn Off
          </button>
        ) : (
          <button type="button" className={primary} aria-expanded={asking} onClick={() => setAsking(!asking)}>
            Turn On
          </button>
        )}
        <label className="flex flex-col text-sm font-semibold">
          Most families a day (1 to {SERIES_MAX_CAP})
          <input className={`${field} w-28`} inputMode="numeric" value={cap} onChange={(e) => setCap(e.target.value)} />
        </label>
        <button type="button" className={`${btn} border border-line bg-white`} disabled={busy} onClick={() => void post({ action: "series-save", dailyCap: Number(cap) }, "Saved.")}>
          Save Limit
        </button>
      </div>
      {asking && !on && (
        <div className="mt-3 flex flex-wrap items-end gap-2 rounded-xl bg-[#f1f5f9] p-3">
          <p className="w-full font-read">
            Once on, the daily job emails up to {s.config.dailyCap} families a day without asking, one email each, starting with families who signed up in the last 2 weeks. Only confirmed accounts with news and tips on,
            never an address that bounced, and never on a day the family already got another email.
          </p>
          <label className="flex flex-col text-sm font-semibold">
            Type {TURN_ON} to confirm
            <input className={`${field} w-40 font-mono`} value={confirm} onChange={(e) => setConfirm(e.target.value)} autoComplete="off" />
          </label>
          <button type="button" className={primary} disabled={busy || confirm !== TURN_ON} onClick={() => void post({ action: "series-switch", on: true, confirm }, "Turned on. It runs with the next daily job.")}>
            Start Sending
          </button>
        </div>
      )}
      <details className="mt-3">
        <summary className="min-h-11 cursor-pointer font-semibold">The {FEATURE_EMAILS.length} emails, in order</summary>
        <ol className="mt-2 flex flex-col gap-1 text-sm">
          {FEATURE_EMAILS.map((e, i) => (
            <li key={e.id}>
              {i + 1}. <span className="font-semibold">{e.subject}</span> <span className="text-ink-soft">({TIER[e.tier]}{e.flag ? `, waits for ${e.flag}` : ""})</span>
            </li>
          ))}
        </ol>
      </details>
      <Notice {...msg} />
    </section>
  );
}
