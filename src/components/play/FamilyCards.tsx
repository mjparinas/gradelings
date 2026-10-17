"use client";

import { useMemo } from "react";
import { readReward, rewardProgress } from "@/lib/familyReward";
import { togetherProgress } from "@/lib/togetherGoal";
import { derivedFor, useChildSettings, useDerived, useProfiles, useStore } from "@/lib/store";
import { useNow } from "@/lib/useNow";
import { ProgressBar } from "../ui";

/** "Saving up for…": a reward a grown-up promised for coins earned. The coins stay in the child's pocket. */
export function RewardCard() {
  const settings = useChildSettings();
  const d = useDerived();
  const reward = readReward(settings);
  if (!reward) return null;
  const { earned, goal, met } = rewardProgress(reward, d.coinsEarned);
  return (
    <section className="card p-4 sm:p-5" aria-label="A reward from your grown-up">
      <h2 className="mb-2 text-xl font-bold sm:text-2xl">🎁 {met ? "You did it!" : "Saving up for"}</h2>
      <p className="font-read text-lg font-bold sm:text-xl">{reward.name}</p>
      {met ? (
        <p className="mt-1 font-read text-lg text-good-dark">You earned all {goal} coins. Show your grown-up! 🎉</p>
      ) : (
        <>
          <ProgressBar value={earned} max={goal} height={14} className="mt-2" label={`${reward.name}: ${earned} of ${goal} coins`} />
          <p className="mt-1 text-sm font-semibold text-ink-soft">
            🪙 {earned} of {goal} coins earned. Your coins stay yours to spend in the shop.
          </p>
        </>
      )}
    </section>
  );
}

/** Everyone in the family adds up to one weekly goal. Counts only: no names, no ranking. */
export function TogetherCard() {
  const profiles = useProfiles();
  const events = useStore((s) => s.events);
  const now = useNow();
  const progress = useMemo(() => togetherProgress(profiles.map((p) => derivedFor({ events, profiles }, p.id)), now), [profiles, events, now]);
  if (!progress) return null;
  return (
    <section className="card p-4 sm:p-5" aria-label="Family goal">
      <h2 className="mb-2 flex items-center justify-between gap-2 text-xl font-bold sm:text-2xl">
        <span>👨‍👩‍👧 Together this week</span>
        <span className="text-sm font-semibold text-ink-soft">New goal on Monday</span>
      </h2>
      {progress.met ? (
        <p className="font-read text-lg font-bold text-good-dark">Your family answered {progress.answers} questions together. Amazing! 🎉</p>
      ) : (
        <>
          <ProgressBar value={Math.min(progress.answers, progress.target)} max={progress.target} height={14} label={`Family goal: ${progress.answers} of ${progress.target} questions`} />
          <p className="mt-1 font-read text-base font-semibold text-ink-soft">
            {progress.answers} of {progress.target} questions answered by everyone in the family.
          </p>
        </>
      )}
    </section>
  );
}
