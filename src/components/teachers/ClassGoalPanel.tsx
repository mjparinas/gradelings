"use client";

import { useCallback, useEffect, useState } from "react";
import { call } from "@/lib/classroom";
import { CLASS_GOAL_MAX, CLASS_GOAL_MIN, CLASS_GOAL_PER_STUDENT_CHOICES, type ClassGoal } from "@/lib/classGoal";
import { ProgressBar } from "../ui";

// The class goal, teacher's side: pick how many questions the class answers together this week. Students see
// one shared bar with counts only. A new week starts on Monday and the target stays until it is changed or removed.

const btn = "min-h-11 rounded-xl px-4 font-bold";
const url = (classId: string) => `/api/classes/goal/?classId=${encodeURIComponent(classId)}`;

export function ClassGoalPanel({ classId, students }: { classId: string; students: number }) {
  const [goal, setGoal] = useState<ClassGoal | null>(null);
  const [loaded, setLoaded] = useState(false);
  const [custom, setCustom] = useState("");
  const [err, setErr] = useState("");
  const [busy, setBusy] = useState(false);
  const [changing, setChanging] = useState(false);

  const refresh = useCallback(
    () =>
      call<{ goal: ClassGoal | null }>(url(classId))
        .then((r) => setGoal(r.goal))
        .catch(() => undefined)
        .finally(() => setLoaded(true)),
    [classId],
  );
  useEffect(() => {
    void refresh();
  }, [refresh]);

  const save = async (target: number) => {
    setErr("");
    setBusy(true);
    try {
      const r = await call<{ goal: ClassGoal }>("/api/classes/goal/", "PUT", { classId, target, tzOffset: new Date().getTimezoneOffset() });
      setGoal(r.goal);
      setChanging(false);
      setCustom("");
    } catch (e) {
      setErr((e as Error).message);
    }
    setBusy(false);
  };
  const clear = async () => {
    setErr("");
    setBusy(true);
    try {
      await call(url(classId), "DELETE");
      setGoal(null);
    } catch (e) {
      setErr((e as Error).message);
    }
    setBusy(false);
  };
  const customTarget = Number(custom);
  const customOk = Number.isInteger(customTarget) && customTarget >= CLASS_GOAL_MIN && customTarget <= CLASS_GOAL_MAX;
  if (!loaded) return null;

  const picker = (
    <div className="mt-3">
      {students > 0 && (
        <div className="flex flex-wrap gap-2" role="group" aria-label="Questions for each student">
          {CLASS_GOAL_PER_STUDENT_CHOICES.map((n) => {
            const total = Math.min(CLASS_GOAL_MAX, Math.max(CLASS_GOAL_MIN, n * students));
            return (
              <button key={n} type="button" disabled={busy} className={`${btn} border border-line disabled:opacity-50`} onClick={() => void save(total)}>
                {total} <span className="text-sm font-semibold text-ink-soft">({n} each)</span>
              </button>
            );
          })}
        </div>
      )}
      <div className="mt-3 flex flex-wrap items-end gap-3">
        <label className="flex flex-col text-sm font-semibold">
          Other number of questions
          <input inputMode="numeric" className="mt-1 min-h-11 w-36 rounded-xl border border-line bg-white px-3 font-read" value={custom} onChange={(e) => setCustom(e.target.value.replace(/\D/g, "").slice(0, 4))} />
        </label>
        <button type="button" disabled={!customOk || busy} className={`${btn} bg-[#4f8ef7] text-[#0f172a] disabled:opacity-50`} onClick={() => void save(customTarget)}>
          Set the goal
        </button>
        {changing && (
          <button type="button" className={`${btn} border border-line`} onClick={() => setChanging(false)}>
            Cancel
          </button>
        )}
      </div>
      {custom.trim() !== "" && !customOk && <p className="mt-2 text-sm text-ink-soft">Pick a whole number from {CLASS_GOAL_MIN} to {CLASS_GOAL_MAX}.</p>}
    </div>
  );

  return (
    <section className="mt-4 rounded-2xl border border-line bg-white p-5" aria-label="Class goal">
      <h2 className="text-xl font-bold">Class goal</h2>
      <p className="mt-1 font-read text-ink-soft">One number of questions the whole class answers together this week. Students see a shared bar with counts only: no names, no ranking. It restarts every Monday.</p>
      {!goal || changing ? (
        picker
      ) : (
        <div className="mt-3">
          <p className="font-read text-lg font-bold">
            {goal.answers} of {goal.target} questions {goal.met && "🎉"}
          </p>
          <ProgressBar value={Math.min(goal.answers, goal.target)} max={goal.target} height={14} className="mt-2" label={`Class goal: ${goal.answers} of ${goal.target} questions`} />
          <div className="mt-3 flex flex-wrap gap-3">
            <button type="button" disabled={busy} className={`${btn} border border-line`} onClick={() => setChanging(true)}>
              Change the goal
            </button>
            <button type="button" disabled={busy} className={`${btn} border border-line`} onClick={() => void clear()}>
              Remove it
            </button>
          </div>
        </div>
      )}
      {err && (
        <p role="alert" className="mt-3 text-nudge-dark">
          {err}
        </p>
      )}
    </section>
  );
}
