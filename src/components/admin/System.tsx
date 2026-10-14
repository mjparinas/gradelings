"use client";

import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { call } from "@/lib/classroom";
import { CHECKS, STATE_LABEL, STATUS_PAGES, worst, type CheckResult, type CheckState, type HealthCheck, type StatusPage } from "@/lib/systemHealth";

// The admin panel's System page: one card per part of the stack, then the providers' status pages.
// Every card is drawn at once as a placeholder and asks the server for its own result, so a slow service
// only holds up its own card. Every token stays on the server; this page only ever sees the results.

const card = "rounded-2xl border border-line bg-white p-5";

const TONE: Record<CheckState, string> = {
  ok: "bg-[#e3f6ee] text-[#105c3c]",
  warn: "bg-[#fff4d6] text-[#7a4b00]",
  down: "bg-[#fde4e4] text-[#9b1c1c]",
  off: "bg-[#eef2f7] text-[#334155]",
};
const ICON: Record<CheckState, string> = { ok: "✓", warn: "!", down: "✕", off: "–" };

/**
 * How often "Auto refresh" looks again. Five minutes keeps every provider far under its rate limit (15 small
 * requests a round, and the server's minute-long cache answers repeats), and the Stripe checkout test keeps its
 * own six-hour cache, so auto refresh never asks for `refresh=1`.
 */
export const AUTO_REFRESH_MS = 5 * 60_000;
/** Remembered per browser, so the choice survives a reload. */
export const AUTO_REFRESH_KEY = "grademap.admin.systemAutoRefresh";

const autoListeners = new Set<() => void>();
function readAuto() {
  try {
    return localStorage.getItem(AUTO_REFRESH_KEY) === "on";
  } catch {
    return false;
  }
}
function writeAuto(on: boolean) {
  try {
    localStorage.setItem(AUTO_REFRESH_KEY, on ? "on" : "off");
  } catch {
    // Private windows can refuse storage; then the switch can't stay on.
  }
  for (const l of autoListeners) l();
}
function subscribeAuto(l: () => void) {
  autoListeners.add(l);
  return () => void autoListeners.delete(l);
}

/** "5 min ago", "3 h ago", "2 days ago". */
export function sinceText(t: number, now = Date.now()) {
  const m = Math.max(0, Math.round((now - t) / 60_000));
  if (m < 1) return "just now";
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  if (h < 48) return `${h} h ago`;
  return `${Math.round(h / 24)} days ago`;
}

function StateBadge({ state }: { state: CheckState }) {
  return (
    <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-sm font-semibold whitespace-nowrap ${TONE[state]}`}>
      <span aria-hidden="true">{ICON[state]}</span>
      {STATE_LABEL[state]}
    </span>
  );
}

function CheckCard({ c, now }: { c: HealthCheck; now: number }) {
  return (
    <li className={card}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <h3 className="text-lg font-bold">{c.title}</h3>
        <StateBadge state={c.state} />
      </div>
      <p className="mt-1 font-read">{c.summary}</p>
      {c.rows.length > 0 && (
        <dl className="mt-3 flex flex-col gap-1 text-sm">
          {c.rows.map((r, i) => (
            <div key={`${r.label}-${i}`} className="flex flex-wrap justify-between gap-x-3 border-t border-line pt-1">
              <dt className="text-ink-soft">{r.label}</dt>
              <dd className="min-w-0 text-right break-words">
                {r.href ? (
                  <a href={r.href} target="_blank" rel="noreferrer" className="font-semibold text-[#2a5bd7] underline">
                    {r.value}
                  </a>
                ) : (
                  <span className={r.state === "down" ? "font-semibold text-[#9b1c1c]" : r.state === "warn" ? "font-semibold text-[#7a4b00]" : ""}>{r.value}</span>
                )}
                {r.at ? <span className="text-ink-soft"> · {sinceText(r.at, now)}</span> : null}
              </dd>
            </div>
          ))}
        </dl>
      )}
      {c.setup && <p className="mt-3 rounded-xl bg-[#f7f5f0] p-3 text-sm">{c.setup}</p>}
      {c.link && (
        <p className="mt-3 text-sm">
          <a href={c.link.href} target="_blank" rel="noreferrer" className="font-semibold text-[#2a5bd7] underline">
            {c.link.label}
          </a>
        </p>
      )}
    </li>
  );
}

/** A card still waiting for its result: the title, a "Checking…" badge and grey bars where the text will go. */
function Skeleton({ title, heading: H = "h3" }: { title: string; heading?: "h3" | "p" }) {
  return (
    <li className={card} aria-busy="true">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <H className="text-lg font-bold">{title}</H>
        <span className="inline-flex items-center rounded-full bg-[#eef2f7] px-2 py-0.5 text-sm font-semibold whitespace-nowrap text-[#334155]">Checking…</span>
      </div>
      <div aria-hidden="true" className="mt-2 flex flex-col gap-2 motion-safe:animate-pulse">
        <div className="h-4 w-3/4 rounded bg-[#eef2f7]" />
        <div className="h-3 w-full rounded bg-[#eef2f7]" />
        <div className="h-3 w-5/6 rounded bg-[#eef2f7]" />
      </div>
    </li>
  );
}

function StatusPageCard({ p, now }: { p: StatusPage; now: number }) {
  return (
    <li className={card}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <a href={p.url} target="_blank" rel="noreferrer" className="font-bold text-[#2a5bd7] underline">
          {p.name}
        </a>
        <StateBadge state={p.state} />
      </div>
      <p className="mt-1 font-read">{p.description}</p>
      {p.incidents.length > 0 && (
        <ul className="mt-2 flex flex-col gap-1 text-sm">
          {p.incidents.map((i, n) => (
            <li key={n}>
              {i.href ? (
                <a href={i.href} target="_blank" rel="noreferrer" className="text-[#2a5bd7] underline">
                  {i.name}
                </a>
              ) : (
                i.name
              )}
              {i.startedAt ? <span className="text-ink-soft"> · open {sinceText(i.startedAt, now).replace(" ago", "")}</span> : null}
            </li>
          ))}
        </ul>
      )}
    </li>
  );
}

type Loaded<T> = Record<string, CheckResult<T> | undefined>;

export function System() {
  const [checks, setChecks] = useState<Loaded<HealthCheck>>({});
  const [pages, setPages] = useState<Loaded<StatusPage>>({});
  const [err, setErr] = useState("");
  // Answers from an earlier round arriving after "Check again" are dropped.
  const round = useRef(0);
  // When the last round started, so a tab coming back into view knows whether it is due.
  const lastLoad = useRef(0);
  const auto = useSyncExternalStore(subscribeAuto, readAuto, () => false);
  const load = useCallback((refresh: boolean) => {
    const mine = ++round.current;
    lastLoad.current = Date.now();
    const q = refresh ? "&refresh=1" : "";
    const fail = (title: string) => (e: Error) => mine === round.current && setErr(`Couldn't check ${title}: ${e.message}`);
    for (const c of CHECKS) {
      call<CheckResult<HealthCheck>>(`/api/admin/system/?check=${c.id}${q}`).then(
        (r) => mine === round.current && setChecks((s) => ({ ...s, [c.id]: r })),
        (e: Error) => {
          fail(c.title)(e);
          if (mine === round.current) setChecks((s) => ({ ...s, [c.id]: { checkedAt: Date.now(), result: { id: c.id, title: c.title, state: "warn", summary: `Couldn't load this check: ${e.message}`, rows: [] } } }));
        },
      );
    }
    for (const p of STATUS_PAGES) {
      call<CheckResult<StatusPage>>(`/api/admin/system/?page=${p.name}${q}`).then(
        (r) => mine === round.current && setPages((s) => ({ ...s, [p.name]: r })),
        (e: Error) => {
          fail(`${p.name}'s status page`)(e);
          if (mine === round.current) setPages((s) => ({ ...s, [p.name]: { checkedAt: Date.now(), result: { name: p.name, url: p.url, state: "warn", description: `Couldn't load: ${e.message}`, incidents: [] } } }));
        },
      );
    }
  }, []);
  useEffect(() => load(false), [load]);

  // Auto refresh: a quiet round every AUTO_REFRESH_MS while the tab is in view. Cards keep their last answer
  // until the new one arrives, so nothing flickers. A hidden tab asks for nothing, and catches up when it is
  // looked at again if a round is due.
  useEffect(() => {
    if (!auto) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const visible = () => document.visibilityState !== "hidden";
    const again = () => {
      setErr("");
      load(false);
    };
    const schedule = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        if (visible()) again();
        schedule();
      }, Math.max(0, lastLoad.current + AUTO_REFRESH_MS - Date.now()));
    };
    const onVisible = () => {
      if (!visible()) return;
      if (Date.now() - lastLoad.current >= AUTO_REFRESH_MS) again();
      schedule();
    };
    schedule();
    document.addEventListener("visibilitychange", onVisible);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, [auto, load]);

  const doneChecks = CHECKS.flatMap((c) => checks[c.id] ?? []);
  const donePages = STATUS_PAGES.flatMap((p) => pages[p.name] ?? []);
  const total = CHECKS.length + STATUS_PAGES.length;
  const done = doneChecks.length + donePages.length;
  const busy = done < total;
  const overall = worst([...doneChecks.map((c) => c.result.state), ...donePages.map((p) => p.result.state)]);
  const problems = doneChecks.map((c) => c.result).filter((c) => c.state === "down" || c.state === "warn");
  const checkedAt = done ? Math.min(...doneChecks.map((c) => c.checkedAt), ...donePages.map((p) => p.checkedAt)) : 0;
  const verdict = busy
    ? problems.length
      ? `Checking… so far worth a look: ${problems.map((c) => c.title).join(", ")}.`
      : `Checking every service… ${done} of ${total} done.`
    : overall === "ok"
      ? "Everything is working."
      : overall === "down"
        ? `Something is down: ${problems.filter((c) => c.state === "down").map((c) => c.title).join(", ") || "a provider's status page"}.`
        : `Worth a look: ${problems.map((c) => c.title).join(", ") || "a provider's status page"}.`;
  return (
    <section aria-labelledby="system-h" className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="system-h" className="text-2xl font-bold">
          System
        </h2>
        <div className="flex flex-wrap items-center gap-4">
          <label className="flex min-h-11 items-center gap-2 font-semibold">
            <input type="checkbox" role="switch" className="h-6 w-6" checked={auto} onChange={(e) => writeAuto(e.target.checked)} />
            Auto refresh
            <span className="text-sm font-normal text-ink-soft">{auto ? `every ${AUTO_REFRESH_MS / 60_000} min` : "off"}</span>
          </label>
          <button type="button" className="min-h-11 font-semibold text-[#2a5bd7] underline disabled:opacity-50" onClick={() => {
              setChecks({});
              setPages({});
              setErr("");
              load(true);
            }} disabled={busy}>
            {busy ? "Checking…" : "Check again"}
          </button>
        </div>
      </div>
      {err && (
        <p role="alert" className="text-nudge-dark">
          {err}
        </p>
      )}
      <div className={`${card} flex flex-wrap items-center justify-between gap-2`} role="status">
        <p className="text-lg font-bold">{verdict}</p>
        {!busy && <p className="text-sm text-ink-soft">Checked {sinceText(checkedAt)}</p>}
      </div>
      <ul className="grid gap-3 lg:grid-cols-2">
        {CHECKS.map((c) => {
          const r = checks[c.id];
          return r ? <CheckCard key={c.id} c={r.result} now={r.checkedAt} /> : <Skeleton key={c.id} title={c.title} />;
        })}
      </ul>
      <section aria-labelledby="status-h" className="flex flex-col gap-2">
        <h3 id="status-h" className="text-xl font-bold">
          Provider status pages
        </h3>
        <ul className="grid gap-2 sm:grid-cols-2">
          {STATUS_PAGES.map((p) => {
            const r = pages[p.name];
            return r ? <StatusPageCard key={p.name} p={r.result} now={r.checkedAt} /> : <Skeleton key={p.name} title={p.name} heading="p" />;
          })}
        </ul>
      </section>
    </section>
  );
}
