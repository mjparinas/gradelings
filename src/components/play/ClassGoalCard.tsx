"use client";

import { useEffect, useState } from "react";
import type { ClassGoal } from "@/lib/classGoal";
import { subscribeLivePoll } from "@/lib/livePoll";
import { useChildSay } from "@/lib/say";
import { useActiveProfile, useStore } from "@/lib/store";
import { ProgressBar } from "../ui";

// The class's shared weekly goal on the home screen, for a child in a class. Counts only: no names, no ranking.
// It comes from the device's live poll, so it shows only while online and stays as last seen if the connection drops.

export function useClassGoal(): (ClassGoal & { className: string }) | null {
  const profileId = useActiveProfile()?.id ?? "";
  const inClass = useStore((s) => s.classwork.some((c) => c.profileId === profileId));
  const [goal, setGoal] = useState<(ClassGoal & { className: string }) | null>(null);
  useEffect(() => {
    if (!inClass || !profileId) return;
    return subscribeLivePoll(profileId, (event) => {
      if ("data" in event) setGoal(event.data.goal);
    });
  }, [inClass, profileId]);
  return inClass ? goal : null;
}

export function ClassGoalCard() {
  const say = useChildSay();
  const goal = useClassGoal();
  if (!goal) return null;
  return (
    <section className="card p-4 sm:p-5" aria-label={say("Class goal")}>
      <h2 className="mb-2 flex items-center justify-between gap-2 text-xl font-bold sm:text-2xl">
        <span>🏫 {say("Our class this week")}</span>
        <span className="text-sm font-semibold text-ink-soft">{say("New goal on Monday")}</span>
      </h2>
      {goal.met ? (
        <p className="font-read text-lg font-bold text-good-dark">{say(`Your class answered ${goal.answers} questions together. Amazing!`)} 🎉</p>
      ) : (
        <>
          <ProgressBar value={Math.min(goal.answers, goal.target)} max={goal.target} height={14} label={`${say("Class goal")}: ${goal.answers} of ${goal.target} questions`} />
          <p className="mt-1 font-read text-base font-semibold text-ink-soft">{goal.answers} of {goal.target} questions answered by everyone in {goal.className}.</p>
        </>
      )}
    </section>
  );
}
