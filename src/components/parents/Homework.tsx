"use client";

import { getUnitRef } from "@/content";
import { getFramework } from "@/content/frameworks";
import { getSubjectMeta } from "@/content/subjects";
import { childHomework } from "@/lib/homework";
import type { Profile } from "@/lib/model";
import { unitLevel } from "@/lib/proficiency";
import { useFlag } from "@/lib/remoteFlags";
import { useLocale, useSay } from "@/lib/say";
import { eventsFor, useDerived, useStore } from "@/lib/store";
import { useNow } from "@/lib/useNow";

/**
 * The teacher's current homework for a child in a class: each unit, when it's due and whether it's done, counted
 * the same way as the child's "From your teacher" list. Renders nothing for a child with no current homework.
 */
export function Homework({ p }: { p: Profile }) {
  const on = useFlag("parent-homework");
  const classwork = useStore((s) => s.classwork);
  const events = useStore((s) => s.events);
  const d = useDerived(p.id);
  const now = useNow();
  const say = useSay();
  const locale = useLocale();
  if (!on) return null;
  // Units from a grade that hasn't loaded on this device are left out rather than guessed at.
  const items = childHomework(classwork, p.id, eventsFor(events, p), (key) => unitLevel(d.units[key]), now).filter((h) => getUnitRef(h.key, p.framework));
  if (!items.length) return null;
  const proficient = getFramework(p.framework).scoringFor(p.grade).levels[2];
  const classes = [...new Set(items.map((h) => h.className))];
  const done = items.filter((h) => h.done).length;
  return (
    <div className="mt-4 rounded-xl bg-paper p-3" role="group" aria-label={`Homework for ${p.name}`}>
      <p className="flex flex-wrap items-baseline justify-between gap-x-2 font-semibold">
        <span>🍎 Homework from {classes.join(" and ")}</span>
        <span className="text-sm font-normal text-ink-soft">
          {done} of {items.length} done
        </span>
      </p>
      <ul className="mt-2 flex flex-col gap-1.5">
        {items.map((h) => {
          const ref = getUnitRef(h.key, p.framework)!;
          const subject = getSubjectMeta(ref.course.subject);
          const due = h.dueAt !== undefined ? new Date(h.dueAt).toLocaleDateString(locale, { weekday: "short", month: "short", day: "numeric" }) : undefined;
          return (
            <li key={h.key} className="flex flex-wrap items-center justify-between gap-x-2 text-sm">
              <span className="font-semibold">
                {ref.unit.emoji} {ref.unit.title}
                <span className="font-normal text-ink-soft"> · {subject.title.big}</span>
              </span>
              <span className={h.done ? "font-semibold text-good-dark" : h.overdue ? "font-semibold text-nudge-dark" : "text-ink-soft"}>
                {h.done ? "Done ✓" : h.goal ? `${h.answered} of ${h.goal} questions` : `Working toward ${proficient?.label ?? "Proficient"}`}
                {!h.done && due ? (h.overdue ? ` · was due ${due}` : ` · due ${due}`) : ""}
              </span>
            </li>
          );
        })}
      </ul>
      <p className="mt-2 text-xs text-ink-soft">
        {say("Set by the teacher. This shows practice in the app, not a report-card mark.")}
      </p>
    </div>
  );
}
