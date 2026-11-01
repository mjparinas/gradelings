"use client";

import { GrowthPanel } from "./GrowthPanel";
import { Milestones } from "./Milestones";
import { useMemo, useState } from "react";
import { getFramework } from "@/content/frameworks";
import { getSubjectMeta, SUBJECTS } from "@/content/subjects";
import { gradeLabel } from "@/lib/gradeLabel";
import { estimateReadingLevel, readingLevelNote } from "@/lib/readingLevel";
import type { GradeId } from "@/content/types";
import { buildReport } from "@/lib/reports";
import { factSetsFor, factSummary, factText, type FactStat } from "@/lib/facts";
import { useSay } from "@/lib/say";
import { eventsFor, useChildSettings, useDerived, useStore, useSubjectGrades } from "@/lib/store";
import { getTrophy, TIER_STYLE } from "@/lib/trophies";
import { ColumnChart, LevelStacks, LineChart, RowBars, StatTile } from "./charts";
import { ShareReport } from "./ShareReport";
import { Disclosure } from "../Disclosure";
import { ChildTabs, NoChildren, PageTitle, Panel, useChild } from "./common";
import { MembersOnly, useFullReports } from "./MembersOnly";

/** Report periods; the free plan keeps the first two (flag `members-reports`). */
const PERIODS = [7, 14, 30, 90];
const FREE_PERIODS = 2;

const pct = (v: number) => `${Math.round(v * 100)}%`;

export function ReportsPage({ childId }: { childId?: string }) {
  const child = useChild(childId);
  const events = useStore((s) => s.events);
  const d = useDerived(child?.id ?? null);
  const settings = useChildSettings(child?.id);
  const [picked, setPeriod] = useState(14);
  const full = useFullReports();
  const lastFree = PERIODS[FREE_PERIODS - 1];
  const period = full || picked <= lastFree ? picked : lastFree;
  const say = useSay();
  const subjectGrades = useSubjectGrades(child?.id ?? null);
  const report = useMemo(
    () => (child ? buildReport(eventsFor(events, child), d, child.grade, child.framework, period, undefined, subjectGrades) : null),
    [child, events, d, period, subjectGrades],
  );
  if (!child || !report) return <NoChildren />;
  const scheme = getFramework(child.framework).scoringFor(child.grade);
  const t = report.totals;
  const readingLevel = estimateReadingLevel(d.reading, child.grade);
  const readingGrade: GradeId | undefined =
    readingLevel === undefined ? undefined : readingLevel < 0.5 ? "k" : (String(Math.min(9, Math.round(readingLevel))) as GradeId);
  const readingNote = readingLevel === undefined ? undefined : readingLevelNote(readingLevel, child.grade);
  const prev = report.previous;
  const acc = t.answers ? t.correct / t.answers : 0;
  const prevAcc = prev.answers ? prev.correct / prev.answers : 0;

  return (
    <>
      <PageTitle
        title={`${child.name}'s report`}
        sub={`${gradeLabel(child.grade, child.framework)} · ${getFramework(child.framework).curriculumName}`}
        action={
          <div className="flex flex-wrap gap-2 print:hidden">
            {(full ? PERIODS : PERIODS.slice(0, FREE_PERIODS)).map((p) => (
              <button key={p} type="button" onClick={() => setPeriod(p)} className={`rounded-xl border px-3 py-2 text-sm font-semibold ${period === p ? "border-[#253047] bg-[#253047] text-white" : "border-line bg-white"}`}>
                {p} days
              </button>
            ))}
            {full && (
              <>
                <ShareReport profileId={child.id} name={child.name} days={period} />
                <button type="button" onClick={() => window.print()} className="rounded-xl border border-line bg-white px-3 py-2 text-sm font-semibold">
                  🖨️ Print
                </button>
              </>
            )}
          </div>
        }
      />
      <div className="print:hidden">
        <ChildTabs base="reports" current={child} />
      </div>

      <Milestones p={child} />
      {full && <GrowthPanel p={child} />}

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatTile
          label="Time learning"
          value={`${Math.round(t.minutes)} min`}
          sub={`${t.activeDays} active day${t.activeDays === 1 ? "" : "s"}`}
          delta={prev.minutes ? { text: `${Math.round(Math.abs(t.minutes - prev.minutes))} min vs previous ${period} days`, good: t.minutes >= prev.minutes } : undefined}
        />
        <StatTile label="Questions answered" value={String(t.answers)} sub={`${t.sessions} sessions finished`} />
        <StatTile
          label="Right on the first try"
          value={t.answers ? pct(acc) : "–"}
          delta={prev.answers && t.answers ? { text: `${Math.round(Math.abs(acc - prevAcc) * 100)} points vs before`, good: acc >= prevAcc } : undefined}
        />
        <StatTile label="Average time per question" value={t.answers ? `${Math.round(t.avgSeconds)} s` : "–"} sub={`Streak: ${d.streak.current} days (best ${d.streak.best})`} />
      </div>

      {t.hints > 0 && (
        <p className="mt-3 rounded-xl bg-help-soft px-4 py-2 font-read">
          💡 Hints opened before answering: <b>{t.hints}</b> of {t.answers} questions.{" "}
          {settings?.freeHints ? "These still count as first-try answers for this child." : "These count like a retry, so they don’t add to “right on the first try”."}
        </p>
      )}

      {readingGrade && readingLevel !== undefined && (
        <p className="mt-3 rounded-xl bg-help-soft px-4 py-2 font-read">
          📖 Reading level: {child.name} is doing well with passages that read at about <b>{gradeLabel(readingGrade, child.framework)}</b> level
          {readingNote === "above" ? ", ahead of grade." : readingNote === "below" ? ", a little under grade." : ", right on grade."}{" "}
          This is an estimate from {d.reading.length} recent passage answers, not a report-card mark.
        </p>
      )}

      <FactsLine name={child.name} grade={child.grade} facts={d.facts} />

      {full && <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <ColumnChart
          title="Minutes learning per day"
          subtitle={`Last ${period} days`}
          unit="min"
          data={report.days.map((x) => ({ label: x.label, value: Math.round(x.minutes * 10) / 10, detail: `${x.answers} questions` }))}
          format={(v) => String(Math.round(v))}
        />
        <LineChart
          title="Right on the first try, by week"
          subtitle="Last 12 weeks (weeks with 5+ questions)"
          data={report.weeks.map((w) => ({ label: w.label, value: w.accuracy, detail: `${w.answers} questions` }))}
          format={pct}
        />
        <RowBars
          title="Questions by subject"
          subtitle={`Last ${period} days`}
          rows={report.subjects.map((s) => ({
            label: getSubjectMeta(s.subject).title.big,
            value: s.answers,
            note: `${pct(s.correct / s.answers)} first try · ${Math.round(s.minutes)} min`,
          }))}
        />
        <LevelStacks
          title="Proficiency by subject"
          subtitle={`Units at each level on the ${scheme.name}`}
          levels={scheme.levels.map((l) => l.label)}
          rows={SUBJECTS.map((s) => {
            const units = report.units.filter((u) => u.ref.course.subject === s.id);
            return {
              label: s.title.big,
              counts: [0, 1, 2, 3].map((i) => units.filter((u) => u.level === i).length),
              notStarted: units.filter((u) => u.level < 0).length,
            };
          }).filter((r) => r.counts.some(Boolean) || r.notStarted)}
        />
      </div>}

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Panel title="🌟 Strengths">
          {report.strengths.length ? (
            <ul className="flex flex-col gap-2">
              {report.strengths.map((u) => (
                <li key={u.ref.key} className="flex justify-between gap-2">
                  <span>
                    {u.ref.unit.emoji} <b>{u.ref.unit.title}</b> <span className="text-sm text-ink-soft">({getSubjectMeta(u.ref.course.subject).title.big})</span>
                  </span>
                  <span className="text-sm text-ink-soft">{pct(u.accuracy)} recent</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-read text-ink-soft">Strengths show up after a few lessons in a unit.</p>
          )}
        </Panel>
        <Panel title="🌱 Worth practising">
          {report.needs.length ? (
            <ul className="flex flex-col gap-2">
              {report.needs.map((u) => (
                <li key={u.ref.key}>
                  <p className="flex justify-between gap-2">
                    <span>
                      {u.ref.unit.emoji} <b>{u.ref.unit.title}</b>
                    </span>
                    <span className="text-sm text-ink-soft">{pct(u.accuracy)} recent</span>
                  </p>
                  <p className="text-sm text-ink-soft">{u.ref.unit.parentNote}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="font-read text-ink-soft">Nothing stands out as tricky right now. 🎉 Adventure and Review mode automatically focus on weaker spots.</p>
          )}
          {report.notStarted > 0 && <p className="mt-3 text-sm text-ink-soft">{report.notStarted} units in {gradeLabel(child.grade, child.framework)} haven&apos;t been started yet.</p>}
        </Panel>
      </div>

      {!full && <FullReportPreview name={child.name} units={report.units} proficientLabel={scheme.levels[2]?.label} />}

      {full && <Panel title="Every unit" className="mt-5">
        <p className="mb-3 text-sm text-ink-soft">
          Levels use the {scheme.name}, based on recent first-try answers. They show progress in practice, not a report card mark: your child&apos;s teacher decides proficiency.
        </p>
        {SUBJECTS.map((s) => {
          const units = report.units.filter((u) => u.ref.course.subject === s.id);
          if (!units.length) return null;
          return (
            <Disclosure key={s.id} className="border-t border-line py-2" titleClassName="py-1 text-lg font-bold" title={`${s.emoji} ${s.title.big}${subjectGrades[s.id] ? ` · ${gradeLabel(subjectGrades[s.id]!, child.framework)} lessons` : ""}`} open={period <= 14}>
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="text-ink-soft">
                      <th className="py-1 pr-3">Unit</th>
                      <th className="py-1 pr-3">Learning standard</th>
                      <th className="py-1 pr-3">Level</th>
                      <th className="py-1 pr-3">Recent</th>
                      <th className="py-1">{say("Last practised")}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {units.map((u) => {
                      const level = scheme.levels[u.level];
                      return (
                        <tr key={u.ref.key} className="border-t border-line/60 align-top">
                          <td className="py-1.5 pr-3 font-semibold">
                            {u.ref.unit.emoji} {u.ref.unit.title}
                            {u.ref.course.grade !== child.grade && <span className="ml-1 text-xs font-normal text-ink-soft">({gradeLabel(u.ref.course.grade, child.framework)})</span>}
                          </td>
                          <td className="py-1.5 pr-3 text-ink-soft">{u.ref.unit.standards[child.framework]}</td>
                          <td className="py-1.5 pr-3 whitespace-nowrap">{level ? `${level.icon} ${level.label}` : "Not started"}</td>
                          <td className="py-1.5 pr-3 tabular-nums">{u.attempts ? pct(u.accuracy) : "–"}</td>
                          <td className="py-1.5 whitespace-nowrap text-ink-soft">{u.lastT ? new Date(u.lastT).toLocaleDateString("en-CA", { month: "short", day: "numeric" }) : "–"}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </Disclosure>
          );
        })}
      </Panel>}

      <Panel title="🏆 Trophies this period" className="mt-5">
        {report.trophies.length ? (
          <ul className="flex flex-wrap gap-2">
            {report.trophies.map((tr) => {
              const trophy = getTrophy(tr.id);
              if (!trophy) return null;
              return (
                <li key={tr.id} className="flex items-center gap-2 rounded-xl bg-paper px-3 py-2 text-sm">
                  <span aria-hidden="true">{trophy.icon}</span> <b>{say(trophy.name)}</b>
                  <span className="text-ink-soft">{TIER_STYLE[trophy.tier].label}</span>
                </li>
              );
            })}
          </ul>
        ) : (
          <p className="font-read text-ink-soft">No new trophies in this period.</p>
        )}
      </Panel>
    </>
  );
}

/** "Knows 64 of 100 times-table facts", for each fact set the child has practised in Math Facts. */
export function FactsLine({ name, grade, facts }: { name: string; grade: GradeId; facts: Record<string, FactStat> }) {
  const sets = factSetsFor(grade)
    .map((s) => factSummary(s, facts))
    .filter((s) => s.tried > 0);
  if (sets.length === 0) return null;
  const tricky = [...new Map(sets.flatMap((s) => s.tricky).map((f) => [f.id, f])).values()].slice(0, 5);
  return (
    <p className="mt-3 rounded-xl bg-help-soft px-4 py-2 font-read">
      🧮 Math facts: {name} knows{" "}
      {sets.map((s, i) => (
        <span key={s.set.id}>
          {i > 0 && (i === sets.length - 1 ? " and " : ", ")}
          <b>
            {s.known} of {s.total}
          </b>{" "}
          {s.set.noun}
        </span>
      ))}
      .{tricky.length > 0 && <> Still practising: {tricky.map(factText).join(", ")}.</>} A fact counts as known after two right answers in a row on the first
      try. This is practice, not a report-card mark.
    </p>
  );
}

/** What the full report adds, with the child's own numbers, on the free plan (flag `members-reports`). */
export function FullReportPreview({ name, units, proficientLabel }: { name: string; units: { level: number; attempts: number }[]; proficientLabel?: string }) {
  const started = units.filter((u) => u.attempts > 0).length;
  const grown = units.filter((u) => u.level >= 2).length;
  return (
    <MembersOnly title={`${name}'s full report`} className="mt-5">
      <p>The family plan opens the rest of this report:</p>
      <ul className="mt-2 flex list-disc flex-col gap-1 pl-5">
        <li>
          Every unit: {started} of {units.length} started{proficientLabel ? `, ${grown} at ${proficientLabel} or higher` : ""}, with each one&apos;s level, learning standard and recent answers
        </li>
        <li>Charts of minutes per day and right-on-the-first-try week by week</li>
        <li>&ldquo;Is it working?&rdquo;: units grown since 30, 90 or 180 days ago</li>
        <li>30 and 90 day views, printing, and a link to share with a teacher</li>
        <li>The report-card conversation sheet and Year in review</li>
      </ul>
    </MembersOnly>
  );
}
