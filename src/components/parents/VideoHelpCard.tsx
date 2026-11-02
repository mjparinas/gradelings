"use client";

import { getUnitRef } from "@/content";
import type { Profile } from "@/lib/model";
import { useFlag } from "@/lib/remoteFlags";
import { useSay } from "@/lib/say";
import { useStore } from "@/lib/store";
import { useNow } from "@/lib/useNow";
import { videoStats, VIDEO_DAYS } from "@/lib/videoHelp";

/** How a child used help videos lately: how many they watched and how the next question on that unit went. Nothing when none. */
export function VideoHelpCard({ p }: { p: Profile }) {
  const on = useFlag("video-help");
  const events = useStore((s) => s.events);
  const now = useNow();
  const say = useSay();
  if (!on) return null;
  const s = videoStats(events, p.id, now, p.resetAt ?? 0);
  if (!s.watched) return null;
  const titles = s.units.slice(0, 3).map((u) => getUnitRef(u, p.framework)?.unit.title).filter(Boolean);
  return (
    <div className="mt-4 rounded-xl bg-[#eef4ff] p-3" role="group" aria-label={`${p.name} watched help videos`}>
      <p className="font-semibold">🎬 {p.name} watched {s.watched === 1 ? "1 help video" : `${s.watched} help videos`}</p>
      <p className="text-sm text-ink-soft">
        {say(`In the last ${VIDEO_DAYS} days, after missing a question twice.`)}{" "}
        {s.followed > 0 ? `The next question on the same lesson was right on the first try ${s.right} of ${s.followed} ${s.followed === 1 ? "time" : "times"}.` : "They haven't answered another question on those lessons yet."}
        {titles.length > 0 && ` Lessons: ${titles.join(", ")}.`}
      </p>
    </div>
  );
}
