"use client";

import { useCallback, useEffect, useMemo, useState, type FormEvent } from "react";
import { DateField } from "@/components/DateField";
import { SelectMenu } from "@/components/SelectMenu";
import { call } from "@/lib/classroom";
import { countdown, fillPromoText, getPreset, isoDay, offerTerm, presetDates, PROMO_LIMITS, PROMO_LINKS, PROMO_PRESETS, type PromoOffer } from "@/lib/promo";
import { Notice } from "./Engage";

// The Sales tab: site-wide sales shown as a banner on the public pages (src/lib/promo.ts). Pick a preset,
// change the words, link an existing code and pick the dates. The banner shows from the start date to the end
// of the end date, in this browser's time zone.

const btn = "min-h-11 rounded-xl px-4 font-bold disabled:opacity-50";
const primary = `${btn} bg-[#4f8ef7] text-[#0f172a]`;
const quiet = `${btn} border border-line bg-white`;
const danger = `${btn} border border-[#e57a12] bg-white text-nudge-dark`;
const field = "mt-1 min-h-11 rounded-xl border border-line bg-white px-3";
const card = "rounded-2xl border border-line bg-white p-5";
const day = (t: number) => new Date(t).toLocaleDateString("en-CA", { month: "short", day: "numeric", year: "numeric" });

interface CodeRow {
  code: string;
  display: string;
  kind: "access" | "discount";
  days: number | null;
  percent_off: number | null;
  duration: "once" | "repeating" | "forever" | null;
  months: number | null;
  max_uses: number | null;
  uses: number;
  expires_at: number | null;
  disabled_at: number | null;
}

interface PromoRow {
  id: string;
  preset: string;
  emoji: string;
  headline: string;
  body: string;
  code: string;
  link: string;
  starts_at: number;
  ends_at: number;
  stopped_at: number | null;
  status: "live" | "scheduled" | "ended" | "stopped";
}

const offerOf = (c: CodeRow): PromoOffer => ({ code: c.code, kind: c.kind, percentOff: c.percent_off, duration: c.duration, months: c.months, days: c.days });
const usable = (c: CodeRow) => !c.disabled_at && !(c.expires_at && c.expires_at <= Date.now()) && !(c.max_uses != null && c.uses >= c.max_uses);
const codeLabel = (c: CodeRow) =>
  `${c.display} · ${c.kind === "discount" ? `${c.percent_off}% off ${offerTerm(offerOf(c))}` : offerTerm(offerOf(c))}`;

const STATUS: Record<PromoRow["status"], { label: string; cls: string }> = {
  live: { label: "Live", cls: "bg-[#25b47e] text-[#0f172a]" },
  scheduled: { label: "Scheduled", cls: "bg-[#cfe0fb] text-[#0f172a]" },
  ended: { label: "Ended", cls: "bg-[#e3e2de] text-[#0f172a]" },
  stopped: { label: "Stopped", cls: "bg-[#e3e2de] text-[#0f172a]" },
};

/** Midnight at the start of a `YYYY-MM-DD` day, or now when that day is today, so a sale starting today goes live at once. */
export function startOf(v: string, now = Date.now()): number {
  return v === isoDay(new Date(now)) ? now : new Date(`${v}T00:00:00`).getTime();
}
export const endOf = (v: string) => new Date(`${v}T23:59:59`).getTime();

/** The banner as visitors will see it on the first day of the sale. */
function Preview({ emoji, headline, body, code, startsAt, endsAt }: { emoji: string; headline: string; body: string; code: string; startsAt: number; endsAt: number }) {
  return (
    <div className="rounded-xl bg-[#0f172a] p-3 text-white">
      <p>
        <b>
          <span aria-hidden="true">{emoji} </span>
          {headline || "Your headline"}
        </b>
        {body && <span className="font-read text-[#cbd5e1]"> {body}</span>}
      </p>
      <p className="mt-2 flex flex-wrap items-center gap-2">
        <span className="rounded-lg bg-[#ffd84d] px-2 py-1 font-mono font-bold text-[#0f172a]">{code || "CODE"}</span>
        <span className="text-sm text-[#cbd5e1]">{countdown(endsAt, startsAt)}</span>
      </p>
    </div>
  );
}

export function Sales() {
  const [promos, setPromos] = useState<PromoRow[] | null>(null);
  const [codes, setCodes] = useState<CodeRow[]>([]);
  const [preset, setPreset] = useState("founder");
  const first = getPreset("founder")!;
  const [headline, setHeadline] = useState(first.headline);
  const [body, setBody] = useState(first.body);
  const [code, setCode] = useState(first.code ?? "");
  const [link, setLink] = useState<string>(PROMO_LINKS[0].href);
  const firstDates = presetDates(first);
  const [start, setStart] = useState(firstDates.start);
  const [end, setEnd] = useState(firstDates.end);
  const [err, setErr] = useState("");
  const [ok, setOk] = useState("");
  const [busy, setBusy] = useState(false);
  // Read once: the panel is open for minutes, not days.
  const [now] = useState(() => Date.now());

  const load = useCallback(() => {
    call<{ promos: PromoRow[] }>("/api/admin/promos/").then((r) => setPromos(r.promos), () => setPromos([]));
    call<{ codes: CodeRow[] }>("/api/admin/codes/").then((r) => setCodes(r.codes.filter(usable)), () => setCodes([]));
  }, []);
  useEffect(load, [load]);

  // The first working code stands in when the preset's code isn't there (disabled, or never made).
  const picked = codes.find((c) => c.code === code) ?? codes.find((c) => c.kind === "discount") ?? codes[0] ?? null;

  const pickPreset = (id: string) => {
    const p = getPreset(id)!;
    setPreset(id);
    setHeadline(p.headline);
    setBody(p.body);
    if (p.code && codes.some((c) => c.code === p.code)) setCode(p.code);
    const dates = presetDates(p);
    setStart(dates.start);
    setEnd(dates.end);
    setOk("");
    setErr("");
  };

  const filled = useMemo(
    () => (picked ? { headline: fillPromoText(headline, offerOf(picked)), body: fillPromoText(body, offerOf(picked)) } : { headline, body }),
    [picked, headline, body],
  );

  const create = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setErr("");
    setOk("");
    try {
      const startsAt = startOf(start);
      await call("/api/admin/promos/", "POST", { preset, emoji: getPreset(preset)?.emoji, headline, body, code: picked?.code, link, startsAt, endsAt: endOf(end) });
      setOk(startsAt <= Date.now() ? "The sale is live. The banner reaches every page within a minute." : `The sale is scheduled for ${day(startsAt)}.`);
      load();
    } catch (x) {
      setErr((x as Error).message);
    }
    setBusy(false);
  };

  const act = async (method: "PATCH" | "DELETE", id: string, done: string) => {
    setErr("");
    setOk("");
    try {
      await call("/api/admin/promos/", method, { id });
      setOk(done);
      load();
    } catch (x) {
      setErr((x as Error).message);
    }
  };

  return (
    <section aria-labelledby="sales-h">
      <h2 id="sales-h" className="mb-1 text-2xl font-bold">
        Sales
      </h2>
      <p className="mb-4 max-w-3xl font-read text-ink-soft">
        A sale shows a banner at the top of every public page and on the parent area&apos;s Subscription page, with its code and a countdown. Families enter the code under Subscription; it is filled in for them once
        they&apos;ve seen the banner. The store apps never show it. Make the code on the Codes tab first.
      </p>

      <form onSubmit={(e) => void create(e)} className={`${card} mb-6 flex flex-col gap-4`}>
        <fieldset>
          <legend className="font-bold">Start from</legend>
          <div className="mt-2 flex flex-wrap gap-2">
            {PROMO_PRESETS.map((p) => (
              <button key={p.id} type="button" aria-pressed={preset === p.id} onClick={() => pickPreset(p.id)} className={`${btn} ${preset === p.id ? "bg-[#0f172a] text-white" : "border border-line bg-white"}`}>
                <span aria-hidden="true">{p.emoji}</span> {p.name}
              </button>
            ))}
          </div>
        </fieldset>
        <label className="flex flex-col text-sm font-semibold">
          Headline
          <input className={field} value={headline} onChange={(e) => setHeadline(e.target.value)} maxLength={PROMO_LIMITS.headline} required />
        </label>
        <label className="flex flex-col text-sm font-semibold">
          Message (optional)
          <textarea className={`${field} min-h-20 py-2`} value={body} onChange={(e) => setBody(e.target.value)} maxLength={PROMO_LIMITS.body} />
        </label>
        <p className="text-sm text-ink-soft">
          <code>{"{percent}"}</code>, <code>{"{code}"}</code> and <code>{"{for}"}</code> are filled in from the code (for example 33%, FOUNDER and &ldquo;for life&rdquo;).
        </p>
        <div className="flex flex-wrap items-end gap-3">
          {codes.length ? (
            <SelectMenu label="Code" block={false} value={picked?.code ?? ""} onChange={setCode} options={codes.map((c) => ({ value: c.code, label: codeLabel(c) }))} />
          ) : (
            <p className="text-sm font-semibold">No working codes yet. Make one on the Codes tab.</p>
          )}
          <SelectMenu label="Button" block={false} value={link} onChange={setLink} options={PROMO_LINKS.map((l) => ({ value: l.href, label: `${l.label} (${l.href})` }))} />
          <DateField label="Starts" value={start} onChange={setStart} />
          <DateField label="Ends (end of day)" value={end} onChange={setEnd} />
        </div>
        <div>
          <p className="mb-2 font-bold">Preview</p>
          <Preview emoji={getPreset(preset)?.emoji ?? "✨"} headline={filled.headline} body={filled.body} code={picked?.code ?? ""} startsAt={start ? startOf(start, now) : now} endsAt={end ? endOf(end) : now} />
        </div>
        <button disabled={busy || !codes.length} className={`${primary} self-start`}>
          {start && startOf(start, now) > now ? "Schedule sale" : "Start sale"}
        </button>
        <Notice err={err} ok={ok} />
      </form>

      <div className="overflow-x-auto rounded-2xl border border-line bg-white">
        <table className="w-full min-w-[44rem] text-left">
          <thead>
            <tr className="border-b border-line">
              <th scope="col" className="p-3">Sale</th>
              <th scope="col" className="p-3">Code</th>
              <th scope="col" className="p-3">Dates</th>
              <th scope="col" className="p-3">Status</th>
              <th scope="col" className="p-3"><span className="sr-only">Actions</span></th>
            </tr>
          </thead>
          <tbody>
            {promos === null && (
              <tr>
                <td colSpan={5} className="p-3 text-ink-soft">Loading…</td>
              </tr>
            )}
            {promos?.length === 0 && (
              <tr>
                <td colSpan={5} className="p-3 text-ink-soft">No sales yet.</td>
              </tr>
            )}
            {promos?.map((p) => (
              <tr key={p.id} className="border-b border-line last:border-0">
                <th scope="row" className="p-3 font-normal">
                  <span aria-hidden="true">{p.emoji} </span>
                  {p.headline}
                </th>
                <td className="p-3 font-mono">{p.code}</td>
                <td className="p-3">
                  {day(p.starts_at)} to {day(p.ends_at)}
                </td>
                <td className="p-3">
                  <span className={`rounded-full px-2 py-0.5 text-sm font-bold ${STATUS[p.status].cls}`}>{STATUS[p.status].label}</span>
                </td>
                <td className="p-3">
                  <span className="flex flex-wrap gap-2">
                    {(p.status === "live" || p.status === "scheduled") && (
                      <button type="button" className={danger} onClick={() => void act("PATCH", p.id, "Sale stopped. The banner leaves every page within a minute.")}>
                        Stop now
                      </button>
                    )}
                    {(p.status === "ended" || p.status === "stopped" || p.status === "scheduled") && (
                      <button type="button" className={quiet} onClick={() => void act("DELETE", p.id, "Sale deleted.")}>
                        Delete
                      </button>
                    )}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
