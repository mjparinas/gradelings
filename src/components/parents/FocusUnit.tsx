"use client";

import { useMemo, useState } from "react";
import { getUnitRef, practiceUnitRefs } from "@/content";
import { getSubjectMeta } from "@/content/subjects";
import { activeFocus } from "@/lib/focus";
import { dayKey, defaultChildSettings, type Profile } from "@/lib/model";
import { useLocale, useSay } from "@/lib/say";
import { useStore, useSubjectGrades } from "@/lib/store";
import { useNow } from "@/lib/useNow";
import { SelectMenu, type MenuGroup } from "../SelectMenu";

/** "Fri, Oct 23" for a stored local day. */
function dayLabel(day: string, locale: string): string {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString(locale, { weekday: "short", month: "short", day: "numeric" });
}

/** Lets a parent pick one unit for a child to work on, with an optional day it is for ("test on Friday"). */
export function FocusUnit({ p }: { p: Profile }) {
  const stored = useStore((s) => s.settings[p.id]);
  const update = useStore((s) => s.updateSettings);
  const now = useNow();
  const say = useSay();
  const locale = useLocale();
  const s = stored ?? defaultChildSettings(p.id, false, p.grade);
  const focus = activeFocus(s, now);
  const today = dayKey(now);
  const [open, setOpen] = useState(false);
  const [unit, setUnit] = useState("");
  const [until, setUntil] = useState("");
  const subjectGrades = useSubjectGrades(p.id);
  const groups = useMemo<MenuGroup[]>(() => {
    const bySubject = new Map<string, MenuGroup>();
    for (const r of practiceUnitRefs(p.grade, p.framework, subjectGrades)) {
      if (!s.enabledSubjects.includes(r.course.subject)) continue;
      const g = bySubject.get(r.course.subject) ?? { label: getSubjectMeta(r.course.subject).title.big, options: [] };
      g.options.push({ value: r.key, label: `${r.unit.emoji} ${r.unit.title}` });
      bySubject.set(r.course.subject, g);
    }
    return [...bySubject.values()];
  }, [p.grade, p.framework, s.enabledSubjects, subjectGrades]);
  const ref = focus ? getUnitRef(focus.unit, p.framework) : undefined;
  const save = () => {
    if (!unit) return;
    update(p.id, { focus: { unit, ...(until ? { until } : {}), setAt: Date.now() } });
    setOpen(false);
    setUnit("");
    setUntil("");
  };
  return (
    <div className="mt-4 rounded-xl bg-paper p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold">📌 Focus for {p.name}</p>
        {focus && ref ? (
          <button type="button" className="min-h-11 rounded-lg px-3 text-sm font-semibold text-[#2f6fd6] underline" onClick={() => update(p.id, { focus: undefined })}>
            Clear focus
          </button>
        ) : (
          !open && (
            <button type="button" className="btn btn-soft min-h-11 px-4 text-sm" onClick={() => setOpen(true)}>
              Pick a unit
            </button>
          )
        )}
      </div>
      {focus && ref ? (
        <p className="mt-1 text-sm text-ink-soft" role="status">
          {say(`${ref.unit.emoji} ${ref.unit.title} comes up more in ${p.name}'s Adventure and shows on their home screen${focus.until ? ` until ${dayLabel(focus.until, locale)}` : ""}. It stops when they reach Proficient.`)}
        </p>
      ) : (
        !open && <p className="mt-1 text-sm text-ink-soft">{say("Got a test coming up, or something that needs extra practice? Pick a unit and it comes up more in Adventure.")}</p>
      )}
      {open && (
        <div className="mt-3 flex flex-col gap-3">
          <SelectMenu label={`Unit for ${p.name}`} value={unit} onChange={setUnit} groups={groups} options={[{ value: "", label: "Choose a unit…" }]} />
          <label className="flex flex-col gap-1 text-sm font-semibold">
            Until (optional)
            <input type="date" min={today} value={until} onChange={(e) => setUntil(e.target.value)} className="min-h-11 rounded-xl border-2 border-line bg-white px-3 font-normal" />
          </label>
          <div className="flex gap-2">
            <button type="button" className="btn btn-primary min-h-11 px-4 text-sm" disabled={!unit} onClick={save}>
              Set focus
            </button>
            <button type="button" className="btn btn-soft min-h-11 px-4 text-sm" onClick={() => setOpen(false)}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
