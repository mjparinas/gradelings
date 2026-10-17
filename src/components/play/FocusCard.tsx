"use client";

import { getUnitRef } from "@/content";
import { getSubjectMeta } from "@/content/subjects";
import { activeFocus, focusDaysLeft } from "@/lib/focus";
import { unitLevel } from "@/lib/proficiency";
import { useActiveProfile, useChildSettings, useDerived } from "@/lib/store";
import { useNow } from "@/lib/useNow";
import { useBand } from "../band";
import { LevelChip } from "./Practice";
import { useAllowed } from "./useAllowed";

/** "From your grown-up": the unit a parent picked for this child to work on. Nothing shows when there is none. */
export function FocusCard() {
  const profile = useActiveProfile();
  const settings = useChildSettings();
  const d = useDerived();
  const band = useBand();
  const allowed = useAllowed();
  const now = useNow();
  const focus = activeFocus(settings, now);
  const ref = focus ? getUnitRef(focus.unit, profile?.framework) : undefined;
  if (!focus || !ref || !allowed(ref)) return null;
  const meta = getSubjectMeta(ref.course.subject);
  const level = unitLevel(d.units[ref.key]);
  const left = focusDaysLeft(focus, now);
  const when = left === undefined ? "" : left <= 0 ? " · Last day" : left === 1 ? " · 1 day to go" : ` · ${left} days to go`;
  return (
    <section className="card p-4 sm:p-5" aria-label="From your grown-up">
      <h2 className="mb-3 text-xl font-bold sm:text-2xl">💛 From your grown-up</h2>
      <a href={`#/session?mode=practice&scope=${encodeURIComponent(ref.key)}`} className={`flex min-h-14 items-center gap-3 rounded-2xl border-2 p-2.5 ${level >= 2 ? "bg-good-soft" : "bg-paper"}`} style={{ borderColor: meta.colour }}>
        <span className="text-3xl">{ref.unit.emoji}</span>
        <span className="flex-1">
          <span className="block font-read text-lg font-bold">{ref.unit.title}</span>
          <span className="block text-sm font-semibold text-ink-soft">
            {meta.title[band]}
            {level >= 2 ? " · You've got this! ✓" : " · Let's get good at this one"}
            {when}
          </span>
        </span>
        <LevelChip level={level} />
        <span className="text-xl">▶</span>
      </a>
    </section>
  );
}
