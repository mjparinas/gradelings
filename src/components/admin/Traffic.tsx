"use client";

import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { ColumnChart, RowBars } from "@/components/parents/charts";
import { SelectMenu } from "@/components/SelectMenu";
import { call } from "@/lib/classroom";
import { changeText, pathOf, TRAFFIC_PERIODS, type Part, type SearchReport, type TrafficData, type VisitsReport } from "@/lib/traffic";
import { formatAgo, Notice } from "./Engage";

// The Traffic tab: Google search (Search Console) and visits to the public pages (Vercel Web Analytics). Both are
// read on the server; the page only gets numbers. Charts use the reports' single blue and each has a table view.
// Each part is asked for on its own and shows placeholders until it arrives, so a slow service only holds up its
// own section.

const card = "rounded-2xl border border-line bg-white p-4";
const btn = "min-h-11 rounded-xl px-4 font-bold disabled:opacity-50";
const quiet = `${btn} border border-line bg-white`;
const num = (n: number) => Math.round(n).toLocaleString("en-CA");
const pct = (r: number) => `${Math.round(r * 1000) / 10}%`;
const shortDate = (d: string) => new Date(`${d}T12:00:00Z`).toLocaleDateString("en-CA", { month: "short", day: "numeric", timeZone: "UTC" });

function Tile({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div className={card}>
      <p className="text-sm font-semibold text-ink-soft">{label}</p>
      <p className="text-2xl font-bold tabular-nums">{value}</p>
      {sub && <p className="text-sm text-ink-soft">{sub}</p>}
    </div>
  );
}

const bar = "rounded bg-[#eef2f7]";

/** A section still loading: grey tiles and chart blocks in the shape of what's coming. */
function Placeholder() {
  return (
    <>
    <p className="sr-only">Loading…</p>
    <div aria-hidden="true" className="flex flex-col gap-3 motion-safe:animate-pulse">
      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className={`${card} flex flex-col gap-2`}>
            <div className={`h-3 w-2/3 ${bar}`} />
            <div className={`h-7 w-1/2 ${bar}`} />
            <div className={`h-3 w-3/4 ${bar}`} />
          </div>
        ))}
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        {[0, 1].map((i) => (
          <div key={i} className={`${card} flex flex-col gap-2`}>
            <div className={`h-4 w-1/2 ${bar}`} />
            <div className={`h-40 w-full ${bar}`} />
          </div>
        ))}
      </div>
    </div>
    </>
  );
}

function Unavailable({ part }: { part: Exclude<Part<unknown>, { state: "ok" }> }) {
  return part.state === "setup" ? (
    <p className={`${card} font-read`}>
      <span className="font-semibold">Not set up.</span> {part.setup}
    </p>
  ) : (
    <Notice err={`Couldn't read it: ${part.error}`} />
  );
}

function Section({ id, title, intro, children }: { id: string; title: string; intro: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-3">
      <div>
        <h3 id={id} className="text-xl font-bold">
          {title}
        </h3>
        <p className="max-w-3xl text-sm text-ink-soft">{intro}</p>
      </div>
      {children}
    </section>
  );
}

function Search({ r, days }: { r: SearchReport; days: number }) {
  const t = r.totals;
  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
        <Tile label="Clicks from Google" value={num(t.clicks)} sub={changeText(t.clicks, r.previous.clicks, days)} />
        <Tile label="Times shown in results" value={num(t.impressions)} sub={changeText(t.impressions, r.previous.impressions, days)} />
        <Tile label="Click rate" value={pct(t.ctr)} sub={r.previous.impressions ? `${pct(r.previous.ctr)} the ${days} days before` : undefined} />
        <Tile label="Average position" value={t.impressions ? t.position.toFixed(1) : "—"} sub={r.previous.impressions ? `${r.previous.position.toFixed(1)} the ${days} days before (lower is better)` : "1 is the top of the page"} />
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <ColumnChart title="Clicks From Google by Day" subtitle={`${shortDate(r.start)} to ${shortDate(r.end)}`} data={r.daily.map((d) => ({ label: shortDate(d.date), value: d.clicks, detail: `${num(d.impressions)} times shown` }))} unit="clicks" />
        <ColumnChart title="Times Shown in Google by Day" subtitle={`${shortDate(r.start)} to ${shortDate(r.end)}`} data={r.daily.map((d) => ({ label: shortDate(d.date), value: d.impressions }))} unit="times shown" />
        <RowBars
          title="Top Searches"
          subtitle="What people typed before clicking through, most clicks first"
          rows={r.queries.map((q) => ({ label: q.key, value: q.clicks, note: `${num(q.impressions)} shown · ${pct(q.ctr)} · position ${q.position.toFixed(1)}` }))}
          headers={["Search", "Clicks", "Shown, click rate, position"]}
          empty="No searches with clicks yet."
        />
        <RowBars
          title="Top Pages From Google"
          subtitle="Pages people reached from Google, most clicks first"
          rows={r.pages.map((p) => ({ label: pathOf(p.key), value: p.clicks, note: `${num(p.impressions)} shown · ${pct(p.ctr)} · position ${p.position.toFixed(1)}` }))}
          headers={["Page", "Clicks", "Shown, click rate, position"]}
          empty="No pages with clicks yet."
        />
      </div>
      <div className={card}>
        <h4 className="font-bold">Sitemaps</h4>
        {r.sitemaps.length === 0 ? (
          <p className="font-read">No sitemap submitted yet. Submit /sitemap.xml in Search Console so Google finds every guide and curriculum page.</p>
        ) : (
          <ul>
            {r.sitemaps.map((m) => (
              <li key={m.path} className="border-t border-line py-2 break-all first:border-0">
                <span className="font-semibold">{pathOf(m.path)}</span>: {num(m.submitted)} pages listed, read {m.lastDownloaded ? formatAgo(m.lastDownloaded) : "not yet"}
                {m.errors > 0 && <span className="font-semibold text-[#8a3b00]"> · {num(m.errors)} errors</span>}
                {m.warnings > 0 && ` · ${num(m.warnings)} warnings`}
              </li>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}

function Visits({ r, days }: { r: VisitsReport; days: number }) {
  const list = (rows: VisitsReport["pages"]) => rows.map((p) => ({ label: p.key, value: p.visitors, note: `${num(p.pageviews)} page views` }));
  return (
    <>
      <div className="grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">
        <Tile label="Visitors" value={num(r.visitors)} sub={r.keptDays ? undefined : changeText(r.visitors, r.previous.visitors, days)} />
        <Tile label="Page views" value={num(r.pageviews)} sub={r.keptDays ? undefined : changeText(r.pageviews, r.previous.pageviews, days)} />
        <Tile label="Pages per visitor" value={r.visitors ? (r.pageviews / r.visitors).toFixed(1) : "—"} />
        <Tile label="Top source" value={r.referrers[0]?.key ?? "—"} sub={r.referrers[0] ? `${num(r.referrers[0].visitors)} visitors` : "No other site has sent visitors yet"} />
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <ColumnChart title="Visitors by Day" subtitle={`${shortDate(r.start)} to ${shortDate(r.end)}${r.keptDays ? ` (Vercel keeps ${r.keptDays} days on this plan)` : ""}`} data={r.daily.map((d) => ({ label: shortDate(d.date), value: d.visitors, detail: `${num(d.pageviews)} page views` }))} unit="visitors" />
        <RowBars title="Top Pages" subtitle="Public pages, most visitors first" rows={list(r.pages)} headers={["Page", "Visitors", "Page views"]} empty="No visits yet." />
        <RowBars title="Where Visitors Came From" subtitle="Other sites that linked here" rows={list(r.referrers)} headers={["Site", "Visitors", "Page views"]} empty="No visitors from other sites yet." />
        <RowBars title="Countries" rows={list(r.countries)} headers={["Country", "Visitors", "Page views"]} empty="No visits yet." />
        {r.clicks && (
          <RowBars
            title="Pages That Lead to the App"
            subtitle="Clicks on Try it free or Play free, and on Subscribe, by the page they were on"
            rows={r.clicks.map((c) => ({ label: c.key, value: c.trial, note: `${num(c.subscribe)} Subscribe` }))}
            headers={["Page", "Trial clicks", "Subscribe clicks"]}
            empty="No clicks counted yet."
          />
        )}
      </div>
    </>
  );
}

type Parts = { [P in keyof Omit<TrafficData, "days">]?: TrafficData[P] };

export function Traffic() {
  const [days, setDays] = useState("28");
  const [parts, setParts] = useState<Parts>({});
  // Answers for an earlier period, or from before "Check again", are dropped.
  const round = useRef(0);
  const load = useCallback(
    (refresh = false) => {
      const mine = ++round.current;
      for (const part of ["search", "visits"] as const) {
        call<TrafficData[typeof part]>(`/api/admin/traffic/?days=${days}&part=${part}${refresh ? "&refresh=1" : ""}`).then(
          (r) => mine === round.current && setParts((s) => ({ ...s, [part]: r })),
          (e: Error) => mine === round.current && setParts((s) => ({ ...s, [part]: { state: "error", error: e.message } })),
        );
      }
    },
    [days],
  );
  useEffect(() => load(), [load]);
  const d = Number(days);
  const busy = !parts.search || !parts.visits;
  return (
    <section aria-labelledby="traffic-h" className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2 id="traffic-h" className="text-2xl font-bold">
          Traffic
        </h2>
        <div className="flex flex-wrap items-end gap-2">
          <SelectMenu
            label="Period"
            block={false}
            value={days}
            onChange={(v) => {
              if (v === days) return;
              setParts({});
              setDays(v);
            }}
            options={TRAFFIC_PERIODS.map((p) => ({ value: String(p), label: `Last ${p} days` }))}
          />
          <button
            type="button"
            className={quiet}
            disabled={busy}
            onClick={() => {
              setParts({});
              load(true);
            }}
          >
            {busy ? "Checking…" : "Check Again"}
          </button>
        </div>
      </div>
      <Section id="search-h" title="Google Search" intro="From Google Search Console. Google's numbers settle a few days late, so the period ends three days ago.">
        <div aria-busy={!parts.search} className="flex flex-col gap-3">
          {!parts.search ? <Placeholder /> : parts.search.state === "ok" ? <Search r={parts.search.report} days={d} /> : <Unavailable part={parts.search} />}
        </div>
      </Section>
      <Section id="visits-h" title="Visits to the Public Pages" intro="From Vercel Web Analytics, which sets no cookies and is switched off in the kids' app, the parent area and account pages, so nothing a child does is counted.">
        <div aria-busy={!parts.visits} className="flex flex-col gap-3">
          {!parts.visits ? <Placeholder /> : parts.visits.state === "ok" ? <Visits r={parts.visits.report} days={d} /> : <Unavailable part={parts.visits} />}
        </div>
      </Section>
    </section>
  );
}
