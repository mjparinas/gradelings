"use client";

import { useState } from "react";
import { SelectMenu } from "../SelectMenu";
import { GOAL_CHOICES, NUDGE_PRESETS, activeNudge, weekProgress } from "@/lib/familyGoal";
import { defaultChildSettings, newId, type Profile } from "@/lib/model";
import { useDerived, useStore } from "@/lib/store";
import { useNow } from "@/lib/useNow";

/** A weekly "days practised" goal and a kind note, picked from a dropdown, a parent can send to a child. */
export function FamilyGoal({ p }: { p: Profile }) {
  const d = useDerived(p.id);
  const now = useNow();
  const stored = useStore((s) => s.settings[p.id]);
  const update = useStore((s) => s.updateSettings);
  const s = stored ?? defaultChildSettings(p.id, false, p.grade);
  const goal = s.weeklyGoalDays;
  const progress = goal ? weekProgress(d, goal, now) : undefined;
  const sent = activeNudge(s.nudge, now);
  const [pick, setPick] = useState<string>(NUDGE_PRESETS[0].id);
  return (
    <div className="mt-4 rounded-xl bg-paper p-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <p className="font-semibold">🎯 Weekly goal</p>
        <SelectMenu
          label={`Days a week for ${p.name}`}
          hideLabel
          block={false}
          value={String(goal ?? 0)}
          onChange={(next) => update(p.id, { weeklyGoalDays: Number(next) || undefined })}
          options={[{ value: "0", label: "No goal" }, ...GOAL_CHOICES.map((n) => ({ value: String(n), label: `${n} days a week` }))]}
        />
      </div>
      {progress && (
        <div className="mt-2">
          <ol className="flex gap-1.5" aria-label={`${progress.days} of ${progress.goal} days practised this week`}>
            {progress.dots.map((x, i) => (
              <li key={x.day} className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold ${x.practised ? "bg-[#2a78d6] text-white" : "bg-white text-ink-soft ring-1 ring-line"}`}>
                {"MTWTFSS"[i]}
              </li>
            ))}
          </ol>
          <p className="mt-1 text-sm text-ink-soft">{progress.met ? `${p.name} reached the goal this week. 🎉` : `${progress.days} of ${progress.goal} days so far this week.`}</p>
        </div>
      )}
      <p className="mt-3 text-sm font-semibold">💌 Send {p.name} a note</p>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        <div className="min-w-0 flex-1 basis-56">
          <SelectMenu label={`Note for ${p.name}`} hideLabel value={pick} onChange={setPick} options={NUDGE_PRESETS.map((n) => ({ value: n.id, label: n.text }))} />
        </div>
        <button
          type="button"
          className="btn btn-primary min-h-11 px-4 text-sm"
          onClick={() => update(p.id, { nudge: { id: newId(), preset: pick, sentAt: Date.now() } })}
        >
          Send
        </button>
      </div>
      <p className="mt-1 text-xs text-ink-soft" role="status">
        {sent ? `Sent: "${sent.text}" It shows on ${p.name}'s home screen the next time they open the app.` : "The note appears once on their home screen. We never send a push to children."}
      </p>
    </div>
  );
}
