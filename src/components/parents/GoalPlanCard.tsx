"use client";

import { useMemo, useState, useSyncExternalStore } from "react";
import { getUnitRef, practiceUnitRefs } from "@/content";
import { goalName } from "@/lib/goalPlanText";
import { getFramework } from "@/content/frameworks";
import { getSubjectMeta } from "@/content/subjects";
import type { GradeId, SubjectId } from "@/content/types";
import { gradeLabel } from "@/lib/gradeLabel";
import {
  MAX_CATCH_UP_UNITS,
  STATUS_WORDS,
  defaultCatchUpDay,
  defaultReadyDay,
  goalProgress,
  goalRows,
  makeGoalPlan,
  type GoalPlan,
} from "@/lib/goalPlan";
import { dayKey, defaultChildSettings, type Profile } from "@/lib/model";
import { canUse } from "@/lib/plan";
import { unitLevel } from "@/lib/proficiency";
import { useFlag } from "@/lib/remoteFlags";
import { useLocale, useSay } from "@/lib/say";
import { nextGrade } from "@/lib/schoolYear";
import { useDerived, useStore, useSubjectGrades } from "@/lib/store";
import { isStoreApp } from "@/lib/twa";
import { useNow } from "@/lib/useNow";
import { SelectMenu } from "../SelectMenu";

const noSubscribe = () => () => {};

/** "Sep 1" for a stored local day. */
function dayLabel(day: string, locale: string): string {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(locale, { month: "short", day: "numeric" });
}

/**
 * A goal for one child, turned into a week-by-week plan of units (`goalPlan.ts`): set it, see this week's units and
 * whether it's on track, open the whole plan, or remove it. Family plan only; others see what it does.
 */
export function GoalPlanCard({ p }: { p: Profile }) {
  const on = useFlag("goal-plans");
  const family = useStore((s) => s.family);
  const inStoreApp = useSyncExternalStore(noSubscribe, isStoreApp, () => false);
  const say = useSay();
  if (!on) return null;
  if (!canUse(family, "goalPlan")) {
    // The store apps sell nothing, so they don't advertise a members-only tool either.
    if (inStoreApp) return null;
    return (
      <div className="mt-4 rounded-xl bg-paper p-3" role="group" aria-label={`Goal plan for ${p.name}`}>
        <p className="font-semibold">🗺️ Goal plan</p>
        <p className="mt-1 text-sm text-ink-soft">
          {say(`Set a goal like "ready for next grade's math by September" or "catch up on fractions", and get a week-by-week plan for ${p.name}, tracked here and in the weekly email.`)}{" "}
          <a href="#/subscription" className="font-semibold text-[#2f6fd6] underline">
            Part of the family plan
          </a>
        </p>
      </div>
    );
  }
  return <GoalPlanBody p={p} />;
}

function GoalPlanBody({ p }: { p: Profile }) {
  const stored = useStore((s) => s.settings[p.id]);
  const update = useStore((s) => s.updateSettings);
  const d = useDerived(p.id);
  const now = useNow();
  const say = useSay();
  const locale = useLocale();
  const s = stored ?? defaultChildSettings(p.id, false, p.grade);
  const goal = s.goalPlan;
  const level = (key: string) => unitLevel(d.units[key]);
  const proficient = getFramework(p.framework).scoringFor(p.grade).levels[2]?.label ?? "Proficient";
  const [open, setOpen] = useState(false);
  const [whole, setWhole] = useState(false);

  if (!goal) {
    return (
      <div className="mt-4 rounded-xl bg-paper p-3" role="group" aria-label={`Goal plan for ${p.name}`}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="font-semibold">🗺️ Goal plan for {p.name}</p>
          {!open && (
            <button type="button" className="btn btn-soft min-h-11 px-4 text-sm" onClick={() => setOpen(true)}>
              Set a goal
            </button>
          )}
        </div>
        {open ? (
          <GoalForm p={p} enabled={s.enabledSubjects} level={level} onDone={() => setOpen(false)} onSave={(g) => update(p.id, { goalPlan: g })} />
        ) : (
          <p className="mt-1 text-sm text-ink-soft">{say("Getting ready for next grade, or catching up on a topic? Set a goal and get a week-by-week plan of units.")}</p>
        )}
      </div>
    );
  }

  const progress = goalProgress(goal, level, now);
  const unit = (key: string) => getUnitRef(key, p.framework);
  const week = progress.weeks[progress.current];
  const pct = progress.total ? Math.round((progress.done / progress.total) * 100) : 0;
  const statusClass = progress.status === "behind" || progress.status === "ended" ? "text-nudge-dark" : "text-good-dark";
  return (
    <div className="mt-4 rounded-xl bg-paper p-3" role="group" aria-label={`Goal plan for ${p.name}`}>
      <p className="flex flex-wrap items-baseline justify-between gap-x-2 font-semibold">
        <span>🗺️ {say(goalName(goal, p.framework))}</span>
        <span className="text-sm font-normal text-ink-soft">by {dayLabel(goal.until, locale)}</span>
      </p>
      <div
        className="progress-track mt-2 h-2 overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-label={`${p.name}'s goal`}
        aria-valuemin={0}
        aria-valuemax={progress.total}
        aria-valuenow={progress.done}
        aria-valuetext={`${progress.done} of ${progress.total} units at ${proficient}`}
      >
        <div className="progress-fill h-full rounded-full bg-[#2a78d6]" style={{ width: `${pct}%` }} />
      </div>
      <p className="mt-1 text-sm" role="status">
        {progress.done} of {progress.total} units at {proficient} · <span className={`font-semibold ${statusClass}`}>{STATUS_WORDS[progress.status]}</span>
      </p>
      {progress.status !== "done" && progress.status !== "ended" && progress.upNext.length > 0 && (
        <>
          <p className="mt-2 text-sm font-semibold">
            Week {progress.current + 1} of {progress.weeks.length}: up next
          </p>
          <ul className="mt-1 flex flex-col gap-1">
            {progress.upNext.map((key) => {
              const ref = unit(key);
              return (
                <li key={key} className="text-sm">
                  {ref ? `${ref.unit.emoji} ${ref.unit.title}` : "A unit from another grade"}
                  {!week.units.includes(key) && <span className="text-ink-soft"> · from an earlier week</span>}
                </li>
              );
            })}
          </ul>
        </>
      )}
      <div className="mt-2 flex flex-wrap gap-2">
        <button type="button" className="min-h-11 rounded-lg px-1 text-sm font-semibold text-[#2f6fd6] underline" aria-expanded={whole} onClick={() => setWhole(!whole)}>
          {whole ? "Hide the plan" : "See the whole plan"}
        </button>
        <button type="button" className="min-h-11 rounded-lg px-1 text-sm font-semibold text-[#2f6fd6] underline" onClick={() => update(p.id, { goalPlan: undefined })}>
          Remove goal
        </button>
      </div>
      {whole && (
        <ol className="mt-1 flex flex-col gap-2" aria-label={`Week-by-week plan for ${p.name}`}>
          {goalRows(progress.weeks).map((w) => {
            const thisRow = !progress.over && progress.current >= w.first && progress.current <= w.last;
            return (
              <li key={w.first} className="text-sm" aria-current={thisRow ? "step" : undefined}>
                <span className={thisRow ? "font-bold" : "font-semibold"}>
                  {w.first === w.last ? `Week ${w.first + 1}` : `Weeks ${w.first + 1} to ${w.last + 1}`} · {dayLabel(w.start, locale)}
                </span>
                {w.units.length ? (
                  <ul className="ml-4">
                    {w.units.map((key) => {
                      const ref = unit(key);
                      const done = level(key) >= 2;
                      return (
                        <li key={key} className={done ? "text-good-dark" : undefined}>
                          {ref ? `${ref.unit.emoji} ${ref.unit.title}` : "A unit from another grade"}
                          {done && " ✓"}
                        </li>
                      );
                    })}
                  </ul>
                ) : (
                  <span className="text-ink-soft"> · catch-up and review</span>
                )}
              </li>
            );
          })}
        </ol>
      )}
      <p className="mt-2 text-xs text-ink-soft">
        {say(`Adventure brings up the units up next more often. A unit is done at ${proficient}. This shows practice in the app, not a report-card mark.`)}
      </p>
    </div>
  );
}

function GoalForm({
  p,
  enabled,
  level,
  onSave,
  onDone,
}: {
  p: Profile;
  enabled: SubjectId[];
  level: (key: string) => number;
  onSave: (goal: GoalPlan) => void;
  onDone: () => void;
}) {
  const now = useNow();
  const say = useSay();
  const subjectGrades = useSubjectGrades(p.id);
  const refs = useMemo(() => practiceUnitRefs(p.grade, p.framework, subjectGrades).filter((r) => enabled.includes(r.course.subject)), [p.grade, p.framework, subjectGrades, enabled]);
  const subjects = [...new Set(refs.map((r) => r.course.subject))];
  const [kind, setKind] = useState<GoalPlan["kind"]>("grade");
  const [subject, setSubject] = useState<SubjectId>(subjects[0] ?? "math");
  const [picked, setPicked] = useState<string[]>([]);
  const [until, setUntil] = useState(() => defaultReadyDay(now));
  const [error, setError] = useState("");
  const inSubject = refs.filter((r) => r.course.subject === subject);
  const grade: GradeId = inSubject[0]?.course.grade ?? p.grade;
  const next = nextGrade(grade);
  const nextLabel = next && getFramework(p.framework).grades.includes(next) ? gradeLabel(next, p.framework) : undefined;
  const today = dayKey(now);
  const choose = (k: GoalPlan["kind"]) => {
    setKind(k);
    setUntil(k === "grade" ? defaultReadyDay(now) : defaultCatchUpDay(now));
    setError("");
  };
  const toggle = (key: string) => setPicked((xs) => (xs.includes(key) ? xs.filter((x) => x !== key) : xs.length < MAX_CATCH_UP_UNITS ? [...xs, key] : xs));
  const save = () => {
    const candidates = kind === "grade" ? inSubject.map((r) => r.key) : inSubject.filter((r) => picked.includes(r.key)).map((r) => r.key);
    const goal = makeGoalPlan({ kind, subject, grade, candidates, until }, level, now);
    if (goal) {
      onSave(goal);
      onDone();
      return;
    }
    if (kind === "units" && !picked.length) setError("Pick at least one unit.");
    else if (candidates.length && candidates.every((k) => level(k) >= 2)) setError(`${p.name} is already there: every unit picked is done. Try another goal.`);
    else setError("Pick a day between one week and one year from today.");
  };
  return (
    <div className="mt-3 flex flex-col gap-3">
      <fieldset className="flex flex-col gap-1 text-sm">
        <legend className="font-semibold">Goal</legend>
        <label className="flex min-h-11 items-center gap-2">
          <input type="radio" name={`goal-kind-${p.id}`} checked={kind === "grade"} onChange={() => choose("grade")} />
          {nextLabel ? `Get ready for ${nextLabel}` : `Finish ${gradeLabel(grade, p.framework)}`}
        </label>
        <label className="flex min-h-11 items-center gap-2">
          <input type="radio" name={`goal-kind-${p.id}`} checked={kind === "units"} onChange={() => choose("units")} />
          Catch up on a few units
        </label>
      </fieldset>
      <SelectMenu
        label="Subject"
        value={subject}
        onChange={(v) => {
          setSubject(v as SubjectId);
          setPicked([]);
          setError("");
        }}
        options={subjects.map((id) => ({ value: id, label: `${getSubjectMeta(id).emoji} ${getSubjectMeta(id).title.big}` }))}
      />
      {kind === "units" && (
        <fieldset className="flex flex-col gap-0.5 text-sm">
          <legend className="font-semibold">Units (up to {MAX_CATCH_UP_UNITS})</legend>
          {inSubject.map((r) => (
            <label key={r.key} className="flex min-h-11 items-center gap-2">
              <input type="checkbox" checked={picked.includes(r.key)} disabled={!picked.includes(r.key) && picked.length >= MAX_CATCH_UP_UNITS} onChange={() => toggle(r.key)} />
              {r.unit.emoji} {r.unit.title}
              {level(r.key) >= 2 && <span className="text-ink-soft"> · done</span>}
            </label>
          ))}
        </fieldset>
      )}
      <label className="flex flex-col gap-1 text-sm font-semibold">
        By
        <input type="date" min={today} value={until} onChange={(e) => setUntil(e.target.value)} className="min-h-11 rounded-xl border-2 border-line bg-white px-3 font-normal" />
      </label>
      {error && (
        <p className="text-sm font-semibold text-nudge-dark" role="alert">
          {say(error)}
        </p>
      )}
      <div className="flex gap-2">
        <button type="button" className="btn btn-primary min-h-11 px-4 text-sm" onClick={save}>
          Make the plan
        </button>
        <button type="button" className="btn btn-soft min-h-11 px-4 text-sm" onClick={onDone}>
          Cancel
        </button>
      </div>
    </div>
  );
}
