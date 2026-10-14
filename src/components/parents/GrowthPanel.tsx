"use client";

import { useMemo, useState } from "react";
import { getCourse, getUnitRef } from "@/content";
import { getFramework } from "@/content/frameworks";
import { growthSince } from "@/lib/progressSince";
import { LEVEL_WORDS, unitMilestonePath } from "@/lib/milestoneShare";
import { gradeSlug } from "@/content/subjects";
import type { Profile } from "@/lib/model";
import { useSay } from "@/lib/say";
import { eventsFor, useDerived, useStore } from "@/lib/store";
import { useNow } from "@/lib/useNow";
import { Panel } from "./common";
import { ShareMilestone } from "./ShareMilestone";

const PERIODS = [30, 90, 180] as const;

/** "Is it working?": how many units are Proficient now against some time ago, and which ones moved up. */
export function GrowthPanel({ p }: { p: Profile }) {
  const events = useStore((s) => s.events);
  const d = useDerived(p.id);
  const now = useNow();
  const say = useSay();
  const [days, setDays] = useState<number>(90);
  const g = useMemo(() => growthSince(eventsFor(events, p), now, days, d), [events, p, now, days, d]);
  const framework = getFramework(p.framework);
  const scheme = framework.scoringFor(p.grade);
  if (!d.totals.answers) return null;
  const label = (level: number) => scheme.levels[level]?.label ?? "Not started";
  const gained = g.proficientNow - g.proficientThen;
  return (
    <Panel title="📈 Is it working?" className="mb-5">
      <div className="mb-3 flex flex-wrap items-center gap-2 print:hidden">
        <span className="text-sm font-semibold text-ink-soft">Compare with</span>
        {PERIODS.map((x) => (
          <button key={x} type="button" aria-pressed={days === x} onClick={() => setDays(x)} className={`min-h-11 rounded-xl border px-3 text-sm font-semibold ${days === x ? "border-[#253047] bg-[#253047] text-white" : "border-line bg-white"}`}>
            {x} days ago
          </button>
        ))}
      </div>
      <dl className="grid grid-cols-3 gap-3 text-center">
        <div className="rounded-xl bg-paper p-3">
          <dt className="text-xs font-semibold text-ink-soft">Units started</dt>
          <dd className="text-2xl font-bold">{g.startedThen} → {g.startedNow}</dd>
        </div>
        <div className="rounded-xl bg-paper p-3">
          <dt className="text-xs font-semibold text-ink-soft">{scheme.levels[2]?.label} or higher</dt>
          <dd className="text-2xl font-bold">{g.proficientThen} → {g.proficientNow}</dd>
        </div>
        <div className="rounded-xl bg-paper p-3">
          <dt className="text-xs font-semibold text-ink-soft">{say("Days practised")}</dt>
          <dd className="text-2xl font-bold">{g.daysPractisedSince}</dd>
        </div>
      </dl>
      <p className="mt-3 text-sm">
        {gained > 0
          ? `${p.name} is ${scheme.levels[2]?.label} or higher in ${gained} more ${gained === 1 ? "unit" : "units"} than ${days} days ago.`
          : g.answersSince
            ? `${p.name} has answered ${g.answersSince} questions since then. Growth takes time, and every session counts.`
            : `No practice in the last ${days} days. A short session is a good restart.`}
      </p>
      {g.moved.length > 0 && (
        <ul className="mt-3 flex flex-col gap-1.5">
          {g.moved.slice(0, 6).map((m) => {
            const ref = getUnitRef(m.key, framework.id);
            return (
              <li key={m.key} className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-paper px-3 py-2 text-sm">
                <span className="font-semibold">{ref ? `${ref.unit.emoji} ${ref.unit.title}` : m.key}</span>
                <span className="flex items-center gap-2 text-ink-soft">
                  <span>
                    {label(m.from)} → <b>{label(m.to)}</b>
                  </span>
                  {ref && LEVEL_WORDS[m.to] && getCourse(ref.course.grade, ref.course.subject, framework.id)?.units.some((u) => u.id === ref.unit.id && u.standards[framework.id]) && (
                    <ShareMilestone path={unitMilestonePath(framework.slug, gradeSlug(ref.course.grade), ref.course.subject, ref.unit.id, m.to)} what={`${LEVEL_WORDS[m.to].verb} in ${ref.unit.title}`} />
                  )}
                </span>
              </li>
            );
          })}
        </ul>
      )}
      <p className="mt-3 text-xs text-ink-soft">This reflects practice in the app, not a report-card mark. Your child&apos;s teacher decides proficiency.</p>
    </Panel>
  );
}
