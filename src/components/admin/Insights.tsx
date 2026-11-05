"use client";

import { useEffect, useState, type ReactNode } from "react";
import { call } from "@/lib/classroom";
import { MIN_GROUP } from "@/lib/adminInsights";
import type { Bucket, EngagementDepth, AfterTrialReport, RevenueQuality, SourceRow, TeacherStep, UnitGap, UnitStat } from "@/lib/adminInsights";
import { Loading, TileShape } from "./Skeleton";

// More admin numbers (owner request, November 2026): how the trial turns into payment, what happens after it,
// revenue quality, how deeply children practise, the teacher funnel, weak spots in the content and where sign-ups
// come from. Counts and rates only; a group under 5 families shows its count but no rate. Your own test account,
// admins, support staff and class student accounts are left out.

const card = "rounded-2xl border border-line bg-white p-4";
const pct = (r: number | null) => (r === null ? "—" : `${Math.round(r * 1000) / 10}%`);
const num = (n: number) => n.toLocaleString("en-CA");

interface Trial {
  curve: { overall: Bucket; byPractice: Bucket[]; byLock: Bucket[] };
  weeks: { label: string; families: number; paid: number; rate: number | null }[];
  after: AfterTrialReport;
  windowDays: number;
}
type Revenue = RevenueQuality & { windowDays: number };
type Engagement = EngagementDepth & { windowDays: number };
interface Teachers {
  steps: TeacherStep[];
  classes: { classes: number; students: number; active7: number; activeShare: number | null; classesMostlyActive: number };
  windowDays: number;
}
interface Content {
  hardest: UnitGap[];
  flagged: UnitStat[];
  windowDays: number;
}
interface Sources {
  total: number;
  paths: SourceRow[];
  channels: SourceRow[];
  countries: SourceRow[];
  regions: SourceRow[];
  windowDays: number;
}

/** Loads one part; a failure shows its own message and leaves the others alone. */
function usePart<T>(part: string): { data: T | null; error: string | null } {
  const [state, setState] = useState<{ data: T | null; error: string | null }>({ data: null, error: null });
  useEffect(() => {
    let live = true;
    call<T>(`/api/admin/insights/?part=${part}`).then(
      (data) => live && setState({ data, error: null }),
      (e: Error) => live && setState({ data: null, error: e.message }),
    );
    return () => {
      live = false;
    };
  }, [part]);
  return state;
}

function Part<T>({ part, id, title, intro, children }: { part: string; id: string; title: string; intro: string; children: (data: T) => ReactNode }) {
  const { data, error } = usePart<T>(part);
  return (
    <section aria-labelledby={id} className="mt-8">
      <h3 id={id} className="text-xl font-bold">
        {title}
      </h3>
      <p className="mt-1 max-w-3xl text-sm text-ink-soft">{intro}</p>
      {error ? (
        <p role="alert" className="mt-3 text-nudge-dark">
          {error}
        </p>
      ) : !data ? (
        <Loading className="mt-3">
          <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
            <TileShape />
            <TileShape />
          </div>
        </Loading>
      ) : (
        children(data)
      )}
    </section>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <li className={card}>
      <span className="block text-sm font-semibold text-ink-soft">{label}</span> <span className="block text-2xl font-bold tabular-nums sm:text-3xl">{value}</span>{" "}
      {sub && <span className="block text-sm text-ink-soft">{sub}</span>}
    </li>
  );
}
const Stats = ({ children }: { children: ReactNode }) => <ul className="mt-3 grid grid-cols-2 gap-2 sm:gap-3 lg:grid-cols-4">{children}</ul>;

function Table({ caption, head, rows }: { caption: string; head: string[]; rows: ReactNode[][] }) {
  return (
    <div className={`${card} mt-3 overflow-x-auto`}>
      <table className="w-full min-w-[28rem] text-left text-sm">
        <caption className="pb-2 text-left font-bold">{caption}</caption>
        <thead>
          <tr className="text-ink-soft">
            {head.map((h, i) => (
              <th key={h} scope="col" className={`py-1 pr-3 font-semibold ${i ? "text-right" : ""}`}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-line">
              {r.map((c, j) => (
                <td key={j} className={`py-1.5 pr-3 tabular-nums ${j ? "text-right" : ""}`}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

const bucketRows = (b: Bucket[]) => b.map((x) => [x.label, num(x.families), num(x.paid), pct(x.rate)]);
const small = (n: number) => (n > 0 && n < MIN_GROUP ? ` (under ${MIN_GROUP}, so no rate)` : "");

export function Insights() {
  return (
    <div>
      <h2 className="mt-10 text-2xl font-bold">More Insights</h2>
      <Part<Trial>
        part="trial"
        id="ins-trial"
        title="Trial to Paid"
        intro="Families whose 30-day trial ended in the last 120 days (code access leaves out). Practice days count days with an answer in the first 30 days after sign-up. Paid means a payment not refunded in full or a live subscription. Taps on locked units and members-only reports aren't recorded; “started more than the free units” is the closest signal."
      >
        {(t) => (
          <>
            <Stats>
              <Stat label="Trials that ended" value={num(t.curve.overall.families)} sub={`${num(t.curve.overall.paid)} paid`} />
              <Stat label="Trial to paid" value={pct(t.curve.overall.rate)} sub={small(t.curve.overall.families) || "of those trials"} />
            </Stats>
            <Table caption="Paid by days practised in the trial" head={["Days practised", "Trials", "Paid", "Rate"]} rows={bucketRows(t.curve.byPractice)} />
            <Table caption="Paid by whether something would lock" head={["Group", "Trials", "Paid", "Rate"]} rows={bucketRows(t.curve.byLock)} />
            <Table
              caption="Paid by sign-up week (trials that have ended)"
              head={["Week of", "Trials", "Paid", "Rate"]}
              rows={t.weeks.map((w) => [w.label, num(w.families), num(w.paid), pct(w.rate)])}
            />
            <h4 className="mt-6 text-lg font-bold">After the Trial</h4>
            <Stats>
              <Stat label="Paid" value={num(t.after.paid)} sub={`of ${num(t.after.total)} families`} />
              <Stat label="Still practising, free plan" value={num(t.after.freeActive)} sub={`${num(t.after.activeAndLimited)} started more than the free units`} />
              <Stat label="Practised, then went quiet" value={num(t.after.freeQuiet)} sub="nothing in the last 14 days" />
              <Stat label="Never practised" value={num(t.after.freeNever)} />
            </Stats>
          </>
        )}
      </Part>

      <Part<Revenue>
        part="revenue"
        id="ins-revenue"
        title="Revenue Quality"
        intro="New paying families in the last 90 days: which plan they chose, when they paid compared with the end of their trial, and how many payments were refunded."
      >
        {(r) => (
          <>
            <Stats>
              <Stat label="New customers" value={num(r.newCustomers)} sub={`${num(r.monthly)} monthly, ${num(r.yearly)} yearly`} />
              <Stat label="Yearly share" value={pct(r.yearlyShare)} sub={small(r.monthly + r.yearly) || "of new customers"} />
              <Stat label="Median day paid" value={r.medianDaysAfterTrial === null ? "—" : `${r.medianDaysAfterTrial > 0 ? "+" : ""}${r.medianDaysAfterTrial}`} sub="days from the trial's end" />
              <Stat label="Refund rate" value={pct(r.refundRate)} sub={`${num(r.refunded)} of ${num(r.payments)} payments`} />
            </Stats>
            <Table caption="When they first paid" head={["Timing", "Customers"]} rows={r.timing.map((x) => [x.label, num(x.n)])} />
            <p className="mt-2 max-w-3xl text-sm text-ink-soft">Failed-payment recovery isn&apos;t tracked yet: Stripe&apos;s history of a payment going past due and coming back isn&apos;t stored.</p>
          </>
        )}
      </Part>

      <Part<Engagement>
        part="engagement"
        id="ins-engagement"
        title="Engagement Depth"
        intro="Children (never named) who answered a question in the last 28 days. Time per answer is capped at a minute."
      >
        {(e) => (
          <>
            <Stats>
              <Stat label="Active children" value={num(e.activeChildren)} sub="in 28 days" />
              <Stat label="Practise 3+ days a week" value={pct(e.regularShare)} sub={`${num(e.regular)} of ${num(e.active7)} active this week${small(e.active7)}`} />
              <Stat label="Minutes per practice day" value={e.minutesPerActiveDay === null ? "—" : String(e.minutesPerActiveDay)} />
            </Stats>
            <Table caption="Days practised in 28" head={["Days", "Children"]} rows={e.spread.map((s) => [s.label, num(s.n)])} />
            <Table caption="What they do (answers, stories and game sessions)" head={["Mode", "Count", "Share"]} rows={e.modes.map((m) => [m.label, num(m.n), pct(m.share)])} />
          </>
        )}
      </Part>

      <Part<Teachers>
        part="teachers"
        id="ins-teachers"
        title="Teacher Funnel"
        intro="Teacher accounts made in the last 90 days, and how far they got. Classes are open classes only."
      >
        {(t) => (
          <>
            <Table
              caption="Teacher steps"
              head={["Step", "Teachers", "Of sign-ups", "Of previous step"]}
              rows={t.steps.map((s) => [s.label, num(s.count), pct(s.ofStart), pct(s.ofPrevious)])}
            />
            <Stats>
              <Stat label="Open classes with students" value={num(t.classes.classes)} sub={`${num(t.classes.students)} students`} />
              <Stat label="Students active this week" value={pct(t.classes.activeShare)} sub={`${num(t.classes.active7)} of ${num(t.classes.students)}${small(t.classes.students)}`} />
              <Stat label="Classes half or more active" value={num(t.classes.classesMostlyActive)} />
            </Stats>
          </>
        )}
      </Part>

      <Part<Content>
        part="content"
        id="ins-content"
        title="Content Gaps"
        intro="Units from the last 90 days with at least 40 answers from at least 3 families, hardest first by first-try accuracy. A unit is shared by every province and state that has it. “Asks” are times a child asked a grown-up for help; reports are question reports."
      >
        {(c) => (
          <>
            <Table
              caption="Lowest first-try accuracy"
              head={["Unit", "Answers", "First try", "Answer shown", "Asks", "Reports"]}
              rows={c.hardest.map((u) => [u.unit, num(u.answers), pct(u.accuracy), pct(u.revealedRate), num(u.helpAsks), num(u.reports)])}
            />
            <Table caption="Most asked about or reported" head={["Unit", "Asks", "Reports"]} rows={c.flagged.map((u) => [u.unit, num(u.helpAsks), num(u.reports)])} />
          </>
        )}
      </Part>

      <Part<Sources>
        part="sources"
        id="ins-sources"
        title="Where Sign-Ups Come From"
        intro="Families who signed up in the last 90 days (teacher-only accounts left out). Practised means a child answered a question; paid is as above. Which page a visitor came from is in the Traffic tab; it isn't stored with the account."
      >
        {(s) => {
          const rows = (r: SourceRow[]) => r.map((x) => [x.label, num(x.signups), pct(x.practisedRate), pct(x.paidRate)]);
          const head = ["Source", "Sign-ups", "Practised", "Paid"];
          return (
            <>
              <Table caption="How they signed up" head={head} rows={rows(s.paths)} />
              <Table caption="Invited or used a code" head={head} rows={rows(s.channels)} />
              <Table caption="Country" head={head} rows={rows(s.countries)} />
              <Table caption="First child's region" head={head} rows={rows(s.regions)} />
            </>
          );
        }}
      </Part>
    </div>
  );
}
