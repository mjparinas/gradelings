"use client";

import { useEffect, useMemo, useState, useSyncExternalStore, type ReactNode } from "react";
import { getUnitRef, parseUnitKey } from "@/content";
import { getFramework } from "@/content/frameworks";
import { loadStories, type Story } from "@/content/stories";
import { getSubjectMeta } from "@/content/subjects";
import type { SubjectId } from "@/content/types";
import { APP_NAME } from "@/lib/brand";
import { gradeLabel } from "@/lib/gradeLabel";
import { dayKey } from "@/lib/model";
import { endOfDay, hoursCsv, hoursLog, hoursText, minutesOf, parseDay, portfolio, rangeFor, type RangeKind } from "@/lib/homeschool";
import { canUse, SUBSCRIBE_HREF } from "@/lib/plan";
import { useFlag } from "@/lib/remoteFlags";
import { useLocale, useSay } from "@/lib/say";
import { eventsFor, useStore } from "@/lib/store";
import { isStoreApp } from "@/lib/twa";
import { useGradeContent } from "@/lib/useGradeContent";
import { ChildTabs, NoChildren, Panel, useChild } from "./common";

// The homeschool pack (flag `homeschool-pack`, members only): an hours log and a printable portfolio for one child
// between two days, read from events only (src/lib/homeschool.ts).

const noSubscribe = () => () => {};

const RANGES: { kind: RangeKind; label: string }[] = [
  { kind: "week", label: "This week" },
  { kind: "month", label: "This month" },
  { kind: "year", label: "This school year" },
];

const subjectName = (s: SubjectId) => getSubjectMeta(s).title.big;

/** A unit whose grade isn't loaded: its id, made readable. */
const unitIdText = (key: string) => {
  const id = parseUnitKey(key)?.unitId ?? key;
  return id.charAt(0).toUpperCase() + id.slice(1).replace(/-/g, " ");
};

/** The two days a log or portfolio covers, with quick picks. Fixed to "now" when the page opened, so it doesn't move while printing. */
function useRange() {
  const [now] = useState(() => Date.now());
  const [range, setRange] = useState(() => rangeFor("year", now));
  return { now, range, setRange };
}

function RangePicker({ now, range, onChange }: { now: number; range: { from: number; to: number }; onChange: (r: { from: number; to: number }) => void }) {
  const fromValue = dayKey(range.from);
  const toValue = dayKey(range.to);
  const today = dayKey(now);
  return (
    <div className="flex flex-col gap-3 print:hidden">
      <div className="flex flex-wrap gap-2">
        {RANGES.map((r) => {
          const preset = rangeFor(r.kind, now);
          const on = dayKey(preset.from) === fromValue && dayKey(preset.to) === toValue;
          return (
            <button
              key={r.kind}
              type="button"
              aria-pressed={on}
              onClick={() => onChange(preset)}
              className={`min-h-11 rounded-full border-2 px-4 text-sm font-semibold ${on ? "border-[#253047] bg-[#253047] text-white" : "border-line bg-white"}`}
            >
              {r.label}
            </button>
          );
        })}
      </div>
      <div className="flex flex-wrap items-end gap-3">
        <label className="flex flex-col text-sm font-semibold">
          From
          <input
            type="date"
            value={fromValue}
            max={toValue}
            onChange={(e) => {
              const t = parseDay(e.target.value);
              if (!Number.isNaN(t) && t <= range.to) onChange({ from: t, to: range.to });
            }}
            className="min-h-11 rounded-xl border border-line bg-white px-3 font-read"
          />
        </label>
        <label className="flex flex-col text-sm font-semibold">
          To
          <input
            type="date"
            value={toValue}
            min={fromValue}
            max={today}
            onChange={(e) => {
              const t = parseDay(e.target.value);
              if (!Number.isNaN(t) && t >= range.from) onChange({ from: range.from, to: endOfDay(t) });
            }}
            className="min-h-11 rounded-xl border border-line bg-white px-3 font-read"
          />
        </label>
      </div>
    </div>
  );
}

/** The free plan sees what the pack is and, outside the store apps, where to get it. */
function MembersOnly({ what }: { what: string }) {
  const inStoreApp = useSyncExternalStore(noSubscribe, isStoreApp, () => false);
  const say = useSay();
  return (
    <Panel>
      <h2 className="text-2xl font-bold">{what}</h2>
      <p className="mt-2 font-read">
        {say(
          "Part of the homeschool tools in the family plan: an hours log of learning time per day and subject, ready to print or open as a spreadsheet, and a printable portfolio of the units practised, levels reached, sample questions and stories read between any two days.",
        )}
      </p>
      {!inStoreApp && (
        <a href={SUBSCRIBE_HREF} className="mt-4 inline-flex min-h-11 items-center rounded-xl bg-[#253047] px-4 py-2 font-bold text-white">
          See the family plan
        </a>
      )}
    </Panel>
  );
}

/** The parts every homeschool view shares: the flag, the child tabs, the plan check and the heading. */
function Frame({ base, childId, what, children }: { base: string; childId?: string; what: string; children: (child: NonNullable<ReturnType<typeof useChild>>) => ReactNode }) {
  const on = useFlag("homeschool-pack");
  const child = useChild(childId);
  const family = useStore((s) => s.family);
  if (!child) return <NoChildren />;
  if (!on) return null;
  return (
    <div className="flex flex-col gap-5">
      <div className="print:hidden">
        <ChildTabs base={base} current={child} />
      </div>
      {canUse(family, "homeschool") ? children(child) : <MembersOnly what={what} />}
    </div>
  );
}

function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="min-h-11 rounded-xl border border-line bg-white px-3 py-2 font-semibold">
      🖨️ Print or save as PDF
    </button>
  );
}

const Footnote = ({ name }: { name: string }) => (
  <p className="mt-5 font-read text-sm text-ink-soft">
    Learning time counts up to a minute per question, so time with the app left open isn&apos;t counted, and games are never counted. This describes practice in {APP_NAME}, not
    a report-card mark. {name}&apos;s teacher or evaluator decides proficiency.
  </p>
);

/** Hours log: learning time per day and subject between two days, to print or download as a spreadsheet. */
export function HoursLogPage({ childId }: { childId?: string }) {
  return <Frame base="hours" childId={childId} what="Hours log">{(child) => <HoursLogView child={child} />}</Frame>;
}

function HoursLogView({ child }: { child: NonNullable<ReturnType<typeof useChild>> }) {
  const events = useStore((s) => s.events);
  const { now, range, setRange } = useRange();
  const say = useSay();
  const locale = useLocale();
  const log = useMemo(() => hoursLog(eventsFor(events, child), range.from, range.to), [events, child, range]);
  const date = (t: number) => new Date(t).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
  const dayText = (day: string) => new Date(`${day}T12:00:00`).toLocaleDateString(locale, { weekday: "short", month: "short", day: "numeric" });
  const download = () => {
    const blob = new Blob([hoursCsv(log, subjectName)], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${APP_NAME.toLowerCase()}-hours-${child.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${dayKey(range.from)}-to-${dayKey(range.to)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Panel className="print:border-0 print:p-0">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">{child.name}&apos;s hours log</h2>
          <p className="font-read text-ink-soft">
            {gradeLabel(child.grade, child.framework)} · {getFramework(child.framework).curriculumName} · {date(range.from)} to {date(range.to)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 print:hidden">
          <button type="button" onClick={download} disabled={!log.days.length} className="min-h-11 rounded-xl border border-line bg-white px-3 py-2 font-semibold disabled:opacity-50">
            ⬇️ Download spreadsheet (CSV)
          </button>
          <PrintButton />
        </div>
      </div>
      <div className="mt-4">
        <RangePicker now={now} range={range} onChange={setRange} />
      </div>

      {log.days.length === 0 ? (
        <p className="mt-4 font-read text-lg">{say(`No learning time between these days yet.`)}</p>
      ) : (
        <>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
            <div className="rounded-xl bg-paper p-3">
              <dt className="text-xs font-semibold text-ink-soft">Total</dt>
              <dd className="text-2xl font-bold">{hoursText(log.seconds)}</dd>
            </div>
            <div className="rounded-xl bg-paper p-3">
              <dt className="text-xs font-semibold text-ink-soft">Days of learning</dt>
              <dd className="text-2xl font-bold">{log.days.length}</dd>
            </div>
            {log.subjects.slice(0, 2).map((s) => (
              <div key={s.subject} className="rounded-xl bg-paper p-3">
                <dt className="text-xs font-semibold text-ink-soft">{subjectName(s.subject)}</dt>
                <dd className="text-2xl font-bold">{hoursText(s.seconds)}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-max border-collapse text-sm">
              <caption className="sr-only">Learning minutes per day and subject</caption>
              <thead>
                <tr className="border-b border-line text-left">
                  <th scope="col" className="py-2 pr-3">
                    Date
                  </th>
                  {log.subjects.map((s) => (
                    <th key={s.subject} scope="col" className="px-2 py-2 text-right">
                      {getSubjectMeta(s.subject).emoji} {subjectName(s.subject)}
                    </th>
                  ))}
                  <th scope="col" className="py-2 pl-2 text-right">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                {log.days.map((d) => (
                  <tr key={d.day} className="break-inside-avoid border-b border-line/60">
                    <th scope="row" className="py-1.5 pr-3 text-left font-semibold">
                      {dayText(d.day)}
                    </th>
                    {log.subjects.map((s) => (
                      <td key={s.subject} className="px-2 py-1.5 text-right tabular-nums">
                        {d.subjects[s.subject] ? `${minutesOf(d.subjects[s.subject] ?? 0)} min` : "–"}
                      </td>
                    ))}
                    <td className="py-1.5 pl-2 text-right font-semibold tabular-nums">{minutesOf(d.seconds)} min</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-bold">
                  <th scope="row" className="py-2 pr-3 text-left">
                    Total
                  </th>
                  {log.subjects.map((s) => (
                    <td key={s.subject} className="px-2 py-2 text-right tabular-nums">
                      {hoursText(s.seconds)}
                    </td>
                  ))}
                  <td className="py-2 pl-2 text-right tabular-nums">{hoursText(log.seconds)}</td>
                </tr>
              </tfoot>
            </table>
          </div>
          <p className="mt-3 font-read text-sm text-ink-soft">Story Library reading counts as {subjectName("language")}. Times are rounded to the minute.</p>
        </>
      )}
      <div className="mt-6 hidden print:block">
        <p className="font-read">Parent or guardian signature: ______________________________ Date: ______________</p>
      </div>
      <Footnote name={child.name} />
    </Panel>
  );
}

/** Portfolio: what a child worked on between two days, by subject and unit, with sample questions and stories read. */
export function PortfolioPage({ childId }: { childId?: string }) {
  return <Frame base="portfolio" childId={childId} what="Portfolio">{(child) => <PortfolioView child={child} />}</Frame>;
}

function PortfolioView({ child }: { child: NonNullable<ReturnType<typeof useChild>> }) {
  const events = useStore((s) => s.events);
  const { now, range, setRange } = useRange();
  const say = useSay();
  const locale = useLocale();
  const framework = getFramework(child.framework);
  const scheme = framework.scoringFor(child.grade);
  const work = useMemo(() => portfolio(eventsFor(events, child), range.from, range.to), [events, child, range]);
  // Units from another grade (before moving up, or a subject set to another grade) need that grade's titles.
  const targets = useMemo(() => {
    const grades = new Set(work.subjects.flatMap((s) => s.units.map((u) => parseUnitKey(u.key)?.grade)).filter((g) => g !== undefined));
    return [...grades].map((grade) => ({ grade, framework: child.framework }));
  }, [work, child.framework]);
  useGradeContent(targets);
  const [stories, setStories] = useState<Map<string, Story> | null>(null);
  useEffect(() => {
    if (!work.stories.length || stories) return;
    let live = true;
    loadStories()
      .then((all) => live && setStories(new Map(all.map((s) => [s.id, s]))))
      .catch(() => {});
    return () => {
      live = false;
    };
  }, [work.stories.length, stories]);
  const date = (t: number) => new Date(t).toLocaleDateString(locale, { year: "numeric", month: "long", day: "numeric" });
  const shortDate = (t: number) => new Date(t).toLocaleDateString(locale, { month: "short", day: "numeric" });
  const levelText = (level: number) => (level < 0 ? "Not started" : (scheme.levels[level]?.label ?? ""));
  const tiles: [string, string][] = [
    ["Learning time", hoursText(work.seconds)],
    ["Days of learning", String(work.daysLearning)],
    ["Questions", work.answers.toLocaleString(locale)],
    ["Units grown", String(work.grown)],
  ];

  return (
    <Panel className="print:border-0 print:p-0">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">{child.name}&apos;s learning portfolio</h2>
          <p className="font-read text-ink-soft">
            {gradeLabel(child.grade, child.framework)} · {framework.curriculumName} · {date(range.from)} to {date(range.to)}
          </p>
        </div>
        <div className="flex flex-wrap gap-2 print:hidden">
          <PrintButton />
        </div>
      </div>
      <div className="mt-4">
        <RangePicker now={now} range={range} onChange={setRange} />
      </div>

      {work.answers === 0 && work.stories.length === 0 ? (
        <p className="mt-4 font-read text-lg">{say(`${child.name} hasn't practised between these days yet.`)}</p>
      ) : (
        <>
          <dl className="mt-4 grid grid-cols-2 gap-3 text-center sm:grid-cols-4">
            {tiles.map(([label, value]) => (
              <div key={label} className="break-inside-avoid rounded-xl bg-paper p-3">
                <dt className="text-xs font-semibold text-ink-soft">{label}</dt>
                <dd className="text-2xl font-bold">{value}</dd>
              </div>
            ))}
          </dl>
          {work.firstTry !== null && <p className="mt-3 font-read">{work.firstTry}% right on the first try.</p>}

          {work.subjects
            .filter((s) => s.units.length > 0 || s.answers > 0)
            .map((s) => (
              <section key={s.subject} className="mt-6">
                <h3 className="break-after-avoid text-lg font-bold">
                  {getSubjectMeta(s.subject).emoji} {subjectName(s.subject)}
                </h3>
                <p className="font-read text-sm text-ink-soft">
                  {hoursText(s.seconds)} · {say(`${s.answers.toLocaleString(locale)} ${s.answers === 1 ? "question" : "questions"} practised`)}
                </p>
                <ul className="mt-2 flex flex-col gap-2">
                  {s.units.map((u) => {
                    const ref = getUnitRef(u.key, framework.id);
                    const grade = parseUnitKey(u.key)?.grade;
                    const otherGrade = grade && grade !== child.grade ? ` (${gradeLabel(grade, child.framework)})` : "";
                    return (
                      <li key={u.key} className="break-inside-avoid rounded-xl border border-line px-3 py-2 text-sm">
                        <div className="flex flex-wrap items-baseline justify-between gap-2">
                          <span className="font-semibold">
                            {ref ? `${ref.unit.emoji} ${ref.unit.title}` : unitIdText(u.key)}
                            {otherGrade}
                          </span>
                          <span className="text-ink-soft">
                            {u.before === u.after ? levelText(u.after) : `${levelText(u.before)} → ${levelText(u.after)}`}
                          </span>
                        </div>
                        <p className="text-ink-soft">
                          {u.answers} {u.answers === 1 ? "question" : "questions"}, {u.firstTry} right on the first try
                        </p>
                        {u.samples.length > 0 && (
                          <ul className="mt-1 list-disc pl-5 font-read">
                            {u.samples.map((q) => (
                              <li key={q}>✓ {q}</li>
                            ))}
                          </ul>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}

          {work.stories.length > 0 && (
            <section className="mt-6">
              <h3 className="text-lg font-bold">📚 Stories read</h3>
              <ul className="mt-2 grid gap-2 sm:grid-cols-2">
                {work.stories.map((s, i) => {
                  const story = stories?.get(s.story);
                  return (
                    <li key={`${s.story}-${i}`} className="break-inside-avoid rounded-xl border border-line px-3 py-2 text-sm">
                      <span className="font-semibold">{story ? story.title : unitIdText(s.story)}</span>
                      <span className="block text-ink-soft">
                        {shortDate(s.t)}
                        {s.questions > 0 && ` · ${s.right} of ${s.questions} right on the first try`}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </section>
          )}
        </>
      )}
      <Footnote name={child.name} />
    </Panel>
  );
}
