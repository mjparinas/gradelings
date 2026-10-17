"use client";

import { useMemo } from "react";
import { togetherProgress } from "@/lib/togetherGoal";
import { derivedFor, useProfiles, useStore } from "@/lib/store";
import { useNow } from "@/lib/useNow";
import { Panel } from "./common";

/** The family's shared weekly goal, when there are two or more children. Counts only. */
export function TogetherPanel() {
  const profiles = useProfiles();
  const events = useStore((s) => s.events);
  const now = useNow();
  const progress = useMemo(() => togetherProgress(profiles.map((p) => derivedFor({ events, profiles }, p.id)), now), [profiles, events, now]);
  if (!progress) return null;
  return (
    <Panel title="👨‍👩‍👧 Together this week" className="mb-5">
      <p className="text-sm text-ink-soft">
        Everyone&apos;s answers add up to one family goal that each child sees on their home screen. No names, no scores to beat.
      </p>
      <p className="mt-2 font-semibold">
        {progress.met ? `${progress.answers} questions answered. Goal reached! 🎉` : `${progress.answers} of ${progress.target} questions answered`}
      </p>
    </Panel>
  );
}
