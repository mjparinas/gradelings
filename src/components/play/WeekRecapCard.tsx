"use client";

import { useMemo, useState } from "react";
import { useFlag } from "@/lib/remoteFlags";
import { useChildSay } from "@/lib/say";
import { eventsFor, useActiveProfile, useStore } from "@/lib/store";
import { useNow } from "@/lib/useNow";
import { cachedWeekRecap, markRecapSeen, recapHeadline, recapSeen, type WeekRecap } from "@/lib/weekRecap";
import { useBand } from "../band";

/** Last week's recap for the child on screen, or null when the flag is off or they didn't practise. */
export function useWeekRecap(): WeekRecap | null {
  const on = useFlag("weekly-recap");
  const profile = useActiveProfile();
  const events = useStore((s) => s.events);
  const now = useNow();
  return useMemo(() => (on && profile ? cachedWeekRecap(profile.id, eventsFor(events, profile), now) : null), [on, profile, events, now]);
}

/**
 * "Look how you grew last week": a card that opens the weekly recap. Older kids see it on the home
 * screen until they open or close it that week; little kids find it in My Treasures, so their home
 * screen stays calm.
 */
export function WeekRecapCard() {
  const recap = useWeekRecap();
  const profile = useActiveProfile();
  const band = useBand();
  const say = useChildSay();
  const little = band === "little";
  const [closed, setClosed] = useState<string | null>(null);
  if (!recap || !profile) return null;
  if (!little && (closed === recap.week || recapSeen(profile.id) === recap.week)) return null;
  const close = () => {
    markRecapSeen(profile.id, recap.week);
    setClosed(recap.week);
  };
  return (
    <section className="card flex items-center gap-3 border-2 border-good p-3 sm:p-4" aria-label="Your week" data-testid="week-recap-card">
      <a href="#/grew" className="flex min-h-14 flex-1 items-center gap-3" onClick={() => !little && markRecapSeen(profile.id, recap.week)}>
        <span aria-hidden="true" className="text-5xl">🌱</span>
        <span className="flex-1">
          <span className="block text-xl font-bold sm:text-2xl">{little ? "You grew!" : "Look how you grew!"}</span>
          {!little && <span className="block font-read text-base font-semibold text-ink-soft">{say(recapHeadline(recap))}</span>}
        </span>
        <span aria-hidden="true" className="text-xl">▶</span>
      </a>
      {!little && (
        <button type="button" className="btn btn-soft h-12 w-12 shrink-0 text-xl" aria-label="Close" onClick={close}>
          ✕
        </button>
      )}
    </section>
  );
}
