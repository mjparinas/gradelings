"use client";

import { useMemo, useState } from "react";
import { getUnitRef } from "@/content";
import { problemSolution, recentProblems, PROBLEM_DAYS, type RecentProblem } from "@/lib/recentProblems";
import type { Profile } from "@/lib/model";
import { useFlag } from "@/lib/remoteFlags";
import { useSay } from "@/lib/say";
import { useStore } from "@/lib/store";
import { useNow } from "@/lib/useNow";
import { WorkedSolution } from "../play/WorkedSolution";

const SHOWN = 6;

/**
 * Questions a child missed on the first try in the last two weeks, so a grown-up can sit down with the exact ones
 * (flag `recent-problems`). Shows the child's slip and the right answer when practice kept them, and "Show me how"
 * for plain arithmetic (flag `worked-solutions`). Renders nothing when there are none. Practice, not a mark.
 */
export function RecentProblems({ p }: { p: Profile }) {
  const on = useFlag("recent-problems");
  const workedOn = useFlag("worked-solutions");
  const events = useStore((s) => s.events);
  const now = useNow();
  const say = useSay();
  const [all, setAll] = useState(false);
  const [open, setOpen] = useState<RecentProblem | null>(null);
  const list = useMemo(() => (on ? recentProblems(events, p.id, now, p.resetAt ?? 0) : []), [on, events, p.id, p.resetAt, now]);
  if (!list.length) return null;
  const shown = all ? list : list.slice(0, SHOWN);
  const solution = open && workedOn ? problemSolution(open) : null;
  return (
    <div className="mt-4 rounded-xl bg-[#eef5ff] p-3" role="group" aria-label={`${p.name}'s recent problems`}>
      <p className="font-semibold">🧩 Questions {p.name} found tricky</p>
      <p className="text-sm text-ink-soft">{say(`Missed on the first try in the last ${PROBLEM_DAYS} days. Working through a few together is a gentle way to help. This is practice, not a report-card mark.`)}</p>
      <ul className="mt-2 flex flex-col gap-2">
        {shown.map((x) => {
          const ref = getUnitRef(x.unit, p.framework);
          const how = workedOn ? problemSolution(x) : null;
          return (
            <li key={`${x.unit}|${x.q}`} className="rounded-lg bg-paper p-2.5 text-sm" data-testid="problem">
              <p className="font-read text-base font-semibold">{x.q}</p>
              <p className="text-ink-soft">
                {ref ? `${ref.unit.emoji} ${ref.unit.title}` : "A unit"}
                {x.count > 1 && ` · missed ${x.count} times`}
                {x.gotItSince && " · got it right since ✓"}
              </p>
              {(x.given.length > 0 || x.answer) && (
                <p>
                  {x.given.length > 0 && (
                    <>
                      {p.name} answered <b>{x.given[0]}</b>
                      {x.answer ? "; " : "."}
                    </>
                  )}
                  {x.answer && (
                    <>
                      {x.given.length > 0 ? "the" : "The"} answer is <b>{x.answer}</b>.
                    </>
                  )}
                </p>
              )}
              {how && (
                <button type="button" className="btn mt-1.5 min-h-11 px-3 text-sm" onClick={() => setOpen(x)}>
                  ✏️ Show me how
                </button>
              )}
            </li>
          );
        })}
      </ul>
      {list.length > SHOWN && (
        <button type="button" className="mt-2 min-h-11 text-sm font-semibold underline" onClick={() => setAll(!all)}>
          {all ? "Show fewer" : `Show all ${list.length}`}
        </button>
      )}
      {solution && <WorkedSolution solution={solution} onClose={() => setOpen(null)} />}
    </div>
  );
}
