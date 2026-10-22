"use client";

import { useCallback, useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import { ColumnChart, LineChart, niceMax, RowBars } from "@/components/parents/charts";
import { call } from "@/lib/classroom";
import { METRIC_SECTIONS, type MetricSection, type SectionMetrics } from "@/lib/adminMetrics";
import type { Detail, DetailView } from "@/lib/adminDetail";
import type { Part, VisitsReport } from "@/lib/traffic";
import { cancelReasonRows } from "@/lib/cancelReasons";
import { FREE_UNITS_PER_COURSE } from "@/lib/plan";
import { DetailModal } from "./DetailModal";
import { ChartShape, Loading, TileShape } from "./Skeleton";

// The admin overview: customers, growth, practice and money, with charts. Counts and sums only here; most
// tiles open a window with the list behind the number.


const btn = "min-h-11 rounded-xl px-4 font-bold disabled:opacity-50";
const primary = `${btn} bg-[#4f8ef7] text-[#0f172a]`;
const quiet = `${btn} border border-line bg-white`;
const card = "rounded-2xl border border-line bg-white p-4";

const num = (n: number) => n.toLocaleString("en-CA");
const money = (cents: number) => (cents / 100).toLocaleString("en-CA", { style: "currency", currency: "CAD", maximumFractionDigits: Math.abs(cents) >= 100_000 ? 0 : 2 });
/** Short money for chart axes: $950, $1.2k, -$300. */
/** US families pay in USD, shown apart and never added to the CAD numbers. */
const moneyUsd = (cents: number) => `US${(cents / 100).toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: Math.abs(cents) >= 100_000 ? 0 : 2 })}`;
const moneyShort = (cents: number) => {
  const d = cents / 100;
  const a = Math.abs(d);
  const s = a >= 1_000_000 ? `${Math.round(a / 100_000) / 10}M` : a >= 1000 ? `${Math.round(a / 100) / 10}k` : String(Math.round(a));
  return `${d < 0 ? "-" : ""}$${s}`;
};
const share = (r: number | null) => (r === null ? "—" : `${Math.round(r * 1000) / 10}%`);

function change(now: number, before: number, what: string): string {
  if (!before) return now ? `up from 0 ${what}` : `none ${what} either`;
  const d = Math.round(((now - before) / before) * 100);
  return d === 0 ? `same as ${what}` : `${d > 0 ? "up" : "down"} ${Math.abs(d)}% on ${what}`;
}

type Source = { view: DetailView } | { detail: Detail };

function Tile({ label, value, sub, onOpen }: { label: string; value: string; sub?: ReactNode; onOpen?: () => void }) {
  const body = (
    <>
      <span className="block text-sm font-semibold text-ink-soft">{label}</span>{" "}
      <span className="block text-2xl font-bold tabular-nums sm:text-3xl">{value}</span>{" "}
      {sub && <span className="block text-sm text-ink-soft">{sub}</span>}
    </>
  );
  if (!onOpen) return <li className={card}>{body}</li>;
  return (
    <li className="flex">
      <button
        type="button"
        onClick={onOpen}
        aria-haspopup="dialog"
        className={`${card} relative flex w-full flex-col pr-8 text-left transition-colors hover:border-[#2a78d6] hover:bg-[#f5f9ff] focus-visible:border-[#2a78d6]`}
      >
        {body}
        <span aria-hidden className="absolute top-3 right-3 text-lg leading-none font-bold text-[#2a5bd7]">
          ›
        </span>
        <span className="sr-only">, show details</span>
      </button>
    </li>
  );
}

/** The month-by-month money breakdown behind the profit and projection tiles, built from the dashboard data. */
function moneyDetail(data: { revenue: SectionMetrics["money"]["revenue"] }, title: string): Detail {
  const r = data.revenue;
  return {
    title,
    intro:
      "Profit is revenue less estimated Stripe fees (2.9% + 30¢ a payment) and the monthly costs you entered. The projection adds monthly recurring revenue for the rest of the year to what has come in so far, and takes off fees and a full year of costs.",
    summary: [
      { label: "Revenue so far", value: r.yearToDate, kind: "money" },
      { label: "Profit so far", value: r.profitYearToDate, kind: "money" },
      { label: "Rest of year at MRR", value: r.projectedYear - r.yearToDate, kind: "money" },
      { label: "Projected revenue", value: r.projectedYear, kind: "money" },
      { label: "Projected profit", value: r.projectedProfitYear, kind: "money" },
    ],
    tables: [
      {
        title: "By month",
        columns: [
          { label: "Month", kind: "text" },
          { label: "Revenue", kind: "money" },
          { label: "Fees (est.)", kind: "money" },
          { label: "Costs", kind: "money" },
          { label: "Profit", kind: "money" },
          { label: "Paying families", kind: "number" },
        ],
        rows: [...r.months].reverse().map((m) => ({ cells: [m.label, m.revenue, m.fees, m.costs, m.profit, m.paying] })),
        total: r.months.length,
      },
    ],
  };
}

function Section({ id, title, intro, children }: { id: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="mt-8 first:mt-4">
      <h3 id={id} className="text-xl font-bold">
        {title}
      </h3>
      {intro && <p className="mt-1 max-w-3xl text-sm text-ink-soft">{intro}</p>}
      {children}
    </section>
  );
}

const tiles = "mt-3 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4";
const charts = "mt-3 grid gap-3 lg:grid-cols-2";

type Parts = {
  money?: SectionMetrics["money"] & { stripe: boolean };
  customers?: SectionMetrics["customers"];
  growth?: SectionMetrics["growth"] & { cancelReasons?: { reason: string; n: number }[] };
  practice?: SectionMetrics["practice"];
};

/** A section's tiles and charts as grey shapes, until its numbers arrive. */
function SectionLoading({ tiles: n, charts: c }: { tiles: number; charts: number }) {
  return (
    <Loading>
      <ul className={tiles}>
        {Array.from({ length: n }, (_, i) => (
          <li key={i}>
            <TileShape />
          </li>
        ))}
      </ul>
      <div className={charts}>
        {Array.from({ length: c }, (_, i) => (
          <ChartShape key={i} />
        ))}
      </div>
    </Loading>
  );
}

function Money({ m, show, onDetail, reload }: { m: NonNullable<Parts["money"]>; show: (view: DetailView) => () => void; onDetail: (d: Detail) => void; reload: () => void }) {
  const r = m.revenue;
  const year = new Date(m.generatedAt).getUTCFullYear();
  const showMoney = (title: string) => () => onDetail(moneyDetail(m, title));
  return (
    <>
      <ul className={tiles}>
        <Tile onOpen={show("paying")} label="Monthly recurring revenue" value={money(r.mrr)} sub={`${money(r.arr)} a year at this rate, from ${num(r.renewing)} ${r.renewing === 1 ? "plan" : "plans"} that renew`} />
        <Tile onOpen={show("payments-month")} label="Revenue this month" value={money(r.thisMonth)} sub={`${money(r.lastMonth)} last month`} />
        <Tile onOpen={showMoney("Profit by month")} label="Profit this month" value={money(r.profitThisMonth)} sub={`after ${money(r.feesThisMonth)} fees and costs so far`} />
        <Tile onOpen={show("payments-year")} label={`Revenue in ${year} so far`} value={money(r.yearToDate)} sub={`profit ${money(r.profitYearToDate)}`} />
        <Tile onOpen={showMoney(`Projection for ${year}`)} label={`Projected revenue for ${year}`} value={money(r.projectedYear)} sub="so far, plus MRR for the rest of the year" />
        <Tile onOpen={showMoney(`Projection for ${year}`)} label={`Projected profit for ${year}`} value={money(r.projectedProfitYear)} sub={`with costs of ${money(r.monthlyCosts)} a month`} />
        <Tile onOpen={show("paying")} label="Revenue per paying family" value={r.arppu === null ? "—" : money(Math.round(r.arppu))} sub="a month, on average, for plans that renew" />
        {r.usd && (
          <Tile
            onOpen={show("paying")}
            label="US families (USD, not in the totals above)"
            value={moneyUsd(r.usd.thisMonth)}
            sub={`this month · ${moneyUsd(r.usd.mrr)} MRR from ${num(r.usd.renewing)} renewing of ${num(r.usd.paying)} paying · ${moneyUsd(r.usd.yearToDate)} in ${year}`}
          />
        )}
        <Tile
          onOpen={show("ltv")}
          label="Customer lifetime value"
          value={r.ltv.average === null ? "—" : money(r.ltv.average)}
          sub={
            r.ltv.average === null
              ? "no paying customers yet"
              : `paid so far, on average, by ${num(r.ltv.customers)} ${r.ltv.customers === 1 ? "customer" : "customers"} · top ${money(r.ltv.top)}${r.lifetimeValue === null ? "" : ` · expected ${money(r.lifetimeValue)} over their time`}${r.ltv.usd?.average == null ? "" : ` · ${moneyUsd(r.ltv.usd.average)} for US families`}`
          }
        />
        <Tile onOpen={show("cancelled")}
          label="Cancelled in 30 days"
          value={num(r.cancelled30)}
          sub={r.churnRate === null ? "no paying families yet" : `${share(r.churnRate)} churn${r.lifetimeValue === null ? "" : `, about ${money(r.lifetimeValue)} per customer over their time`}`}
        />
      </ul>
      <div className={charts}>
        <ColumnChart title="Revenue by Month" subtitle="Collected by Stripe, less refunds" data={r.months.map((m) => ({ label: m.label, value: m.revenue, detail: `${money(m.fees)} fees (est.)` }))} format={moneyShort} unit="revenue" xLabel="Month" floor={10_000} />
        <ColumnChart
          title="Profit by Month"
          subtitle="Revenue less estimated fees and monthly costs"
          data={r.months.map((m) => ({ label: m.label, value: m.profit, detail: `${money(m.revenue)} revenue, ${money(m.fees)} fees, ${money(m.costs)} costs` }))}
          format={moneyShort}
          unit="profit"
          floor={10_000}
          xLabel="Month"
        />
        <LineChart
          title="Paying Families by Month"
          subtitle="Families with a payment covering the month"
          data={r.months.map((m) => ({ label: m.label, value: m.paying }))}
          format={(v) => num(Math.round(v))}
          max={niceMax(Math.max(2, ...r.months.map((m) => m.paying)))}
          xLabel="Month"
        />
      </div>
      <MoneyTools data={m} reload={reload} />
    </>
  );
}
function Customers({ c: d, show }: { c: NonNullable<Parts["customers"]>; show: (view: DetailView) => () => void }) {
  const { people, customers: c } = d;
  const groups = [
    { label: "Paying", value: c.paying, note: share(people.families ? c.paying / people.families : null) },
    { label: "In free trial", value: c.trialing, note: share(people.families ? c.trialing / people.families : null) },
    { label: "Access from a code", value: c.codeAccess, note: share(people.families ? c.codeAccess / people.families : null) },
    { label: "Free (trial over)", value: c.free, note: share(people.families ? c.free / people.families : null) },
  ];
  return (
    <>
      <ul className={tiles}>
        <Tile onOpen={show("families")} label="Families" value={num(people.families)} sub={`${num(people.parents)} parent and teacher accounts`} />
        <Tile onOpen={show("paying")} label="Paying" value={num(c.paying)} sub={`${num(c.monthly)} monthly, ${num(c.yearly)} yearly${c.pastDue ? `, ${num(c.pastDue)} past due` : ""}${c.cancelling ? `, ${num(c.cancelling)} cancelling` : ""}`} />
        <Tile onOpen={show("trialing")} label="In free trial" value={num(c.trialing)} />
        <Tile onOpen={show("free")} label="Free (trial over, not paying)" value={num(c.free)} sub={`first ${FREE_UNITS_PER_COURSE} units of each course`} />
        <Tile onOpen={show("code-access")} label="Access from a code or admin" value={num(c.codeAccess)} sub={`${num(c.lifetime)} lifetime`} />
        <Tile onOpen={show("children")} label="Children" value={num(people.children)} sub={`${(Math.round(people.childrenPerFamily * 10) / 10).toLocaleString("en-CA")} per family`} />
        <Tile onOpen={show("teachers")} label="Teachers" value={num(people.teachers)} sub={`${num(people.classes)} open classes, ${num(people.students)} student accounts`} />
        <Tile onOpen={show("codes")} label="Codes redeemed" value={num(d.other.redemptions)} sub={`${num(d.other.reports)} question reports waiting`} />
      </ul>
      <div className={charts}>
        <RowBars title="Where Families Are" subtitle="Every family is in exactly one group" rows={groups} headers={["Group", "Families", "Share"]} empty="No families yet." />
      </div>
    </>
  );
}
/** Clicks on "Try it free" and "Play free" in the last 28 days, read from Vercel Analytics (the Traffic tab's source), so it loads on its own. */
function TryItFreeTile({ show }: { show: (view: DetailView) => () => void }) {
  const [part, setPart] = useState<Part<VisitsReport> | null>(null);
  useEffect(() => {
    let alive = true;
    call<Part<VisitsReport>>("/api/admin/traffic/?days=28&part=visits").then(
      (r) => alive && setPart(r),
      (e: Error) => alive && setPart({ state: "error", error: e.message }),
    );
    return () => {
      alive = false;
    };
  }, []);
  const totals = part?.state === "ok" ? part.report.clickTotals : undefined;
  const sub = !part ? "Loading…" : totals ? `last 28 days · ${num(totals.subscribe)} Subscribe clicks` : part.state === "setup" ? "needs Vercel Analytics" : "not available right now";
  return <Tile onOpen={show("try-it-free")} label="Try it free clicks" value={totals ? num(totals.trial) : "—"} sub={sub} />;
}
function Growth({ g, show }: { g: NonNullable<Parts["growth"]>; show: (view: DetailView) => () => void }) {
  const a = g.acquisition;
  return (
    <>
      <ul className={tiles}>
        <Tile onOpen={show("signups")} label="Sign-ups this month" value={num(a.thisMonth)} sub={`${num(a.lastMonth)} last month`} />
        <Tile onOpen={show("signups")} label="Sign-ups, last 30 days" value={num(a.last30)} sub={change(a.last30, a.previous30, "the 30 days before")} />
        <Tile onOpen={show("trial-conversion")} label="Trial to paid" value={share(a.trialConversion)} sub={`${num(a.trialsConverted)} of ${num(a.trialsEnded)} trials that ended`} />
        <Tile onOpen={show("families")} label="Paying share of families" value={share(a.paidShare)} />
        <Tile onOpen={show("activation")} label="Activation" value={share(a.activationRate)} sub="new families who practised" />
        <Tile onOpen={show("unconfirmed")} label="Email confirmed" value={share(a.confirmedRate)} />
        <Tile onOpen={show("referrals")} label="From a referral" value={num(a.referred)} sub={`${share(a.referredRate)} of families`} />
        <Tile onOpen={show("customers-ever")} label="Families who have paid" value={num(g.customersEver)} sub="in the last two years" />
        <TryItFreeTile show={show} />
      </ul>
      <div className={charts}>
        <ColumnChart title="Sign-Ups per Week" subtitle="Last 26 weeks" data={a.weekly} unit="sign-ups" xLabel="Week of" />
        <ColumnChart title="Sign-Ups per Month" subtitle="Last 12 months" data={a.monthly} unit="sign-ups" xLabel="Month" />
        <RowBars
          title="Why Families Cancel"
          subtitle="The reason picked in Stripe's billing portal, last 12 months"
          rows={cancelReasonRows(g.cancelReasons ?? [])}
          headers={["Reason", "Cancellations", "Share"]}
          empty="No cancellations with a reason yet."
        />
      </div>
    </>
  );
}
function Practice({ e, show }: { e: NonNullable<Parts["practice"]>["engagement"]; show: (view: DetailView) => () => void }) {
  return (
    <>
      <ul className={tiles}>
        <Tile onOpen={show("practising")} label="Families practising today" value={num(e.d1)} sub="last 24 hours" />
        <Tile onOpen={show("practising")} label="This week" value={num(e.d7)} sub={`${num(e.d30)} in 30 days`} />
        <Tile onOpen={show("practising")} label="Stickiness" value={share(e.stickiness)} sub="daily ÷ monthly practising families" />
        <Tile onOpen={show("practising")} label="Questions answered, 30 days" value={num(e.answers30)} sub={`${num(e.minutes30)} minutes`} />
        <Tile onOpen={show("guests")} label="Guest players, 30 days" value={num(e.guests.d30)} sub={`no parent account · ${num(e.guests.d7)} this week, ${num(e.guests.d1)} today`} />
      </ul>
      <div className={charts}>
        <ColumnChart title="Families Practising per Day" subtitle="Last 30 days" data={e.daily.map((d) => ({ label: d.label, value: d.families }))} unit="families" />
        <ColumnChart title="Questions Answered per Day" subtitle="Last 30 days" data={e.daily.map((d) => ({ label: d.label, value: d.answers, detail: `${num(d.minutes)} minutes` }))} unit="questions" />
      </div>
    </>
  );
}

export function Dashboard({ onOpenFamily }: { onOpenFamily?: (id: string) => void }) {
  const [parts, setParts] = useState<Parts>({});
  const [errs, setErrs] = useState<Partial<Record<MetricSection, string>>>({});
  const [open, setOpen] = useState<Source | null>(null);
  // Answers from before a refresh are dropped.
  const round = useRef(0);
  const load = useCallback(() => {
    const mine = ++round.current;
    for (const section of METRIC_SECTIONS) {
      call<Parts[typeof section]>(`/api/admin/stats/?section=${section}`).then(
        (r) => {
          if (mine !== round.current) return;
          setParts((p) => ({ ...p, [section]: r }));
          setErrs((e) => ({ ...e, [section]: undefined }));
        },
        (e: Error) => mine === round.current && setErrs((x) => ({ ...x, [section]: e.message })),
      );
    }
  }, []);
  useEffect(load, [load]);
  const refresh = () => {
    setParts({});
    setErrs({});
    load();
  };

  const show = (view: DetailView) => () => setOpen({ view });
  const loaded = METRIC_SECTIONS.flatMap((k) => parts[k] ?? []);
  const generatedAt = loaded.length === METRIC_SECTIONS.length ? Math.min(...loaded.map((p) => p.generatedAt)) : null;
  const failed = (section: MetricSection) =>
    errs[section] ? (
      <p role="alert" className="mt-3 text-nudge-dark">
        {errs[section]}
      </p>
    ) : null;
  return (
    <div>
      {open && (
        <DetailModal
          source={open}
          onClose={() => setOpen(null)}
          onOpenFamily={
            onOpenFamily &&
            ((id) => {
              setOpen(null);
              onOpenFamily(id);
            })
          }
        />
      )}
      <p className="text-sm text-ink-soft">
        Class student accounts are left out, and days and months are UTC. Tiles with an arrow open the list behind them.{" "}
        {generatedAt ? `Updated ${new Date(generatedAt).toLocaleString("en-CA", { dateStyle: "medium", timeStyle: "short" })} ` : "Loading… "}
        <button type="button" className="font-semibold text-[#2a5bd7] underline" onClick={refresh}>
          Refresh
        </button>
      </p>

      <Section id="money-h" title="Revenue and Profit" intro="Money is in Canadian dollars; US families' payments in US dollars are shown on their own tile. Revenue is what Stripe collected, less refunds. Fees are estimated at 2.9% + 30¢ a payment. Monthly recurring revenue uses list prices, with yearly plans counted as a twelfth a month. Profit takes off fees and the monthly costs you enter below.">
        {failed("money") ?? (!parts.money ? <SectionLoading tiles={8} charts={3} /> : <Money m={parts.money} show={show} onDetail={(detail) => setOpen({ detail })} reload={load} />)}
      </Section>


      <Section id="customers-h" title="Customers">
        {failed("customers") ?? (!parts.customers ? <SectionLoading tiles={8} charts={1} /> : <Customers c={parts.customers} show={show} />)}
      </Section>


      <Section id="growth-h" title="Growth" intro="Activation is the share of families who signed up in the last 90 days and have practised at least once. Trial to paid is the share of trials that ended in the last 90 days whose family pays now.">
        {failed("growth") ?? (!parts.growth ? <SectionLoading tiles={8} charts={3} /> : <Growth g={parts.growth} show={show} />)}
      </Section>


      <Section id="practice-h" title="Practice">
        {failed("practice") ?? (!parts.practice ? <SectionLoading tiles={4} charts={2} /> : <Practice e={parts.practice.engagement} show={show} />)}
      </Section>

    </div>
  );
}


/** Monthly costs (for profit) and the Stripe import. */
function MoneyTools({ data, reload }: { data: { revenue: SectionMetrics["money"]["revenue"]; stripe: boolean }; reload: () => void }) {
  const [costs, setCosts] = useState(String(data.revenue.monthlyCosts / 100));
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ ok?: string; err?: string }>({});
  const run = async (body: unknown, done: (res: Record<string, number>) => string) => {
    setBusy(true);
    setMsg({});
    try {
      const res = await call<Record<string, number>>("/api/admin/stats/", "POST", body);
      setMsg({ ok: done(res) });
      reload();
    } catch (e) {
      setMsg({ err: (e as Error).message });
    } finally {
      setBusy(false);
    }
  };
  const save = (ev: FormEvent) => {
    ev.preventDefault();
    run({ action: "costs", monthlyCosts: Number(costs) }, () => "Monthly costs saved.");
  };
  return (
    <div className={`${card} mt-3 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-end`}>
      <form onSubmit={save} className="flex flex-wrap items-end gap-2">
        <label className="flex flex-col text-sm font-semibold">
          Monthly running costs (CAD)
          <input
            className="mt-1 min-h-11 w-40 rounded-xl border border-line bg-white px-3"
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            value={costs}
            onChange={(ev) => setCosts(ev.target.value)}
            aria-describedby="costs-help"
          />
        </label>
        <button disabled={busy} className={primary}>
          Save Costs
        </button>
      </form>
      {data.stripe && (
        <button type="button" disabled={busy} className={quiet} onClick={() => run({ action: "import" }, (res) => `Checked ${num(res.seen ?? 0)} paid invoices; ${num(res.stored ?? 0)} belong to families here.`)}>
          Import Payments From Stripe
        </button>
      )}
      <p id="costs-help" className="text-sm text-ink-soft sm:basis-full">
        Hosting, email, tools and anything else you pay each month. New payments arrive through the Stripe webhook (it needs the invoice.paid and charge.refunded events);
        {data.stripe ? " import fills in older ones." : " set STRIPE_SECRET_KEY to import older ones."}
      </p>
      {msg.err && (
        <p role="alert" className="text-nudge-dark sm:basis-full">
          {msg.err}
        </p>
      )}
      {msg.ok && (
        <p role="status" className="text-[#16794f] sm:basis-full">
          {msg.ok}
        </p>
      )}
    </div>
  );
}
