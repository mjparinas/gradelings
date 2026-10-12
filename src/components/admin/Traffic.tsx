"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { ColumnChart, RowBars } from "@/components/parents/charts";
import { SelectMenu } from "@/components/SelectMenu";
import { call } from "@/lib/classroom";
import { changeText, pathOf, TRAFFIC_PERIODS, type Part, type SearchReport, type TrafficData, type VisitsReport } from "@/lib/traffic";
import { formatAgo, Notice } from "./Engage";

// The Traffic tab: Google search (Search Console) and visits to the public pages (Vercel Web Analytics). Both are
// read on the server; the page only gets numbers. Charts use the reports' single blue and each has a table view.

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
        <ColumnChart title="Clicks from Google by day" subtitle={`${shortDate(r.start)} to ${shortDate(r.end)}`} data={r.daily.map((d) => ({ label: shortDate(d.date), value: d.clicks, detail: `${num(d.impressions)} times shown` }))} unit="clicks" />
        <ColumnChart title="Times shown in Google by day" subtitle={`${shortDate(r.start)} to ${shortDate(r.end)}`} data={r.daily.map((d) => ({ label: shortDate(d.date), value: d.impressions }))} unit="times shown" />
        <RowBars
          title="Top searches"
          subtitle="What people typed before clicking through, most clicks first"
          rows={r.queries.map((q) => ({ label: q.key, value: q.clicks, note: `${num(q.impressions)} shown · ${pct(q.ctr)} · position ${q.position.toFixed(1)}` }))}
          headers={["Search", "Clicks", "Shown, click rate, position"]}
          empty="No searches with clicks yet."
        />
        <RowBars
          title="Top pages from Google"
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
        <Tile label="Visitors" value={num(r.visitors)} sub={changeText(r.visitors, r.previous.visitors, days)} />
        <Tile label="Page views" value={num(r.pageviews)} sub={changeText(r.pageviews, r.previous.pageviews, days)} />
        <Tile label="Pages per visitor" value={r.visitors ? (r.pageviews / r.visitors).toFixed(1) : "—"} />
        <Tile label="Top source" value={r.referrers[0]?.key ?? "—"} sub={r.referrers[0] ? `${num(r.referrers[0].visitors)} visitors` : "No other site has sent visitors yet"} />
      </div>
      <div className="grid gap-3 lg:grid-cols-2">
        <ColumnChart title="Visitors by day" subtitle={`${shortDate(r.start)} to ${shortDate(r.end)}`} data={r.daily.map((d) => ({ label: shortDate(d.date), value: d.visitors, detail: `${num(d.pageviews)} page views` }))} unit="visitors" />
        <RowBars title="Top pages" subtitle="Public pages, most visitors first" rows={list(r.pages)} headers={["Page", "Visitors", "Page views"]} empty="No visits yet." />
        <RowBars title="Where visitors came from" subtitle="Other sites that linked here" rows={list(r.referrers)} headers={["Site", "Visitors", "Page views"]} empty="No visitors from other sites yet." />
        <RowBars title="Countries" rows={list(r.countries)} headers={["Country", "Visitors", "Page views"]} empty="No visits yet." />
      </div>
    </>
  );
}

export function Traffic() {
  const [days, setDays] = useState("28");
  const [data, setData] = useState<TrafficData | null>(null);
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const load = useCallback(
    (refresh = false) => {
      return call<TrafficData>(`/api/admin/traffic/?days=${days}${refresh ? "&refresh=1" : ""}`).then(
        (r) => {
          setErr("");
          setData(r);
        },
        (e: Error) => setErr(e.message),
      );
    },
    [days],
  );
  useEffect(() => {
    void load();
  }, [load]);
  const d = Number(days);
  return (
    <section aria-labelledby="traffic-h" className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <h2 id="traffic-h" className="text-2xl font-bold">
          Traffic
        </h2>
        <div className="flex flex-wrap items-end gap-2">
          <SelectMenu label="Period" block={false} value={days} onChange={setDays} options={TRAFFIC_PERIODS.map((p) => ({ value: String(p), label: `Last ${p} days` }))} />
          <button
            type="button"
            className={quiet}
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              await load(true);
              setBusy(false);
            }}
          >
            {busy ? "Checking…" : "Check again"}
          </button>
        </div>
      </div>
      <Notice err={err} />
      {!data ? (
        !err && <p className="font-read">Loading…</p>
      ) : (
        <>
          <Section id="search-h" title="Google search" intro="From Google Search Console. Google's numbers settle a few days late, so the period ends three days ago.">
            {data.search.state === "ok" ? <Search r={data.search.report} days={d} /> : <Unavailable part={data.search} />}
          </Section>
          <Section id="visits-h" title="Visits to the public pages" intro="From Vercel Web Analytics, which sets no cookies and is switched off in the kids' app, the parent area and account pages, so nothing a child does is counted.">
            {data.visits.state === "ok" ? <Visits r={data.visits.report} days={d} /> : <Unavailable part={data.visits} />}
          </Section>
        </>
      )}
    </section>
  );
}
