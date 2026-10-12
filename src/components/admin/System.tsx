"use client";

import { useCallback, useEffect, useState } from "react";
import { call } from "@/lib/classroom";
import { STATE_LABEL, worst, type CheckState, type HealthCheck, type StatusPage, type SystemReport } from "@/lib/systemHealth";

// The admin panel's System page: one card per part of the stack, then the providers' status pages.
// Every token stays on the server; this page only ever sees the results.

const card = "rounded-2xl border border-line bg-white p-5";

const TONE: Record<CheckState, string> = {
  ok: "bg-[#e3f6ee] text-[#105c3c]",
  warn: "bg-[#fff4d6] text-[#7a4b00]",
  down: "bg-[#fde4e4] text-[#9b1c1c]",
  off: "bg-[#eef2f7] text-[#334155]",
};
const ICON: Record<CheckState, string> = { ok: "✓", warn: "!", down: "✕", off: "–" };

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

function StatusPages({ pages, now }: { pages: StatusPage[]; now: number }) {
  return (
    <section aria-labelledby="status-h" className="flex flex-col gap-2">
      <h3 id="status-h" className="text-xl font-bold">
        Provider status pages
      </h3>
      <ul className="grid gap-2 sm:grid-cols-2">
        {pages.map((p) => (
          <li key={p.name} className={card}>
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
        ))}
      </ul>
    </section>
  );
}

export function System() {
  const [report, setReport] = useState<SystemReport | null>(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(true);
  const load = useCallback((refresh: boolean) => {
    call<SystemReport>(`/api/admin/system/${refresh ? "?refresh=1" : ""}`).then(
      (r) => {
        setReport(r);
        setErr("");
        setBusy(false);
      },
      (e: Error) => {
        setErr(e.message);
        setBusy(false);
      },
    );
  }, []);
  useEffect(() => load(false), [load]);

  const overall = report ? worst([...report.checks.map((c) => c.state), ...report.statusPages.map((p) => p.state)]) : null;
  const problems = report ? report.checks.filter((c) => c.state === "down" || c.state === "warn") : [];
  return (
    <section aria-labelledby="system-h" className="flex flex-col gap-4">
      <div className="flex flex-wrap items-baseline justify-between gap-2">
        <h2 id="system-h" className="text-2xl font-bold">
          System
        </h2>
        <button type="button" className="min-h-11 font-semibold text-[#2a5bd7] underline disabled:opacity-50" onClick={() => {
            setBusy(true);
            load(true);
          }} disabled={busy}>
          {busy ? "Checking…" : "Check again"}
        </button>
      </div>
      {err && (
        <p role="alert" className="text-nudge-dark">
          {err}
        </p>
      )}
      {!report ? (
        !err && <p className="font-read">Checking every service…</p>
      ) : (
        <>
          <div className={`${card} flex flex-wrap items-center justify-between gap-2`} role="status">
            <p className="text-lg font-bold">
              {overall === "ok" ? "Everything is working." : overall === "down" ? `Something is down: ${problems.map((c) => c.title).join(", ")}.` : `Worth a look: ${problems.map((c) => c.title).join(", ") || "a provider's status page"}.`}
            </p>
            <p className="text-sm text-ink-soft">Checked {sinceText(report.checkedAt)}</p>
          </div>
          <ul className="grid gap-3 lg:grid-cols-2">
            {report.checks.map((c) => (
              <CheckCard key={c.id} c={c} now={report.checkedAt} />
            ))}
          </ul>
          <StatusPages pages={report.statusPages} now={report.checkedAt} />
        </>
      )}
    </section>
  );
}
