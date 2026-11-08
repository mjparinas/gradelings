"use client";

import { useMemo, useState } from "react";
import { getUnitRef, practiceUnitRefs } from "@/content";
import { canUse } from "@/lib/plan";
import { eventsFor, useActiveProfile, useStore, useSubjectGrades } from "@/lib/store";
import { lockedVideos, unlockedVideos, type UnlockedVideo } from "@/lib/videoHelp";
import { useBand } from "../band";
import { Page } from "../ui";
import { MembershipLock } from "./MembershipLock";
import { HelpVideoPlayer } from "./lazyScreens";
import { BackButton } from "./Practice";
import { TreasureBack } from "./Treasures";

// The Videos area: every help video a child has unlocked (to watch again), then the ones still waiting for
// them. A video unlocks the first time it plays (before a unit's first question or after a second miss), so
// nothing is stored: the list is read from the child's events. Rewatching logs nothing, and nothing here is
// scored or counted as practice.

/** The Videos screen for the active child. */
export function Videos() {
  const profile = useActiveProfile()!;
  const band = useBand();
  const family = useStore((s) => s.family);
  const events = useStore((s) => s.events);
  const subjectGrades = useSubjectGrades(profile.id);
  const [playing, setPlaying] = useState<UnlockedVideo | null>(null);
  const [asking, setAsking] = useState(false);
  const member = canUse(family, "videoHelp");

  const { unlocked, locked } = useMemo(() => {
    const mine = unlockedVideos(eventsFor(events, profile), profile.id, profile.resetAt ?? 0);
    const keys = practiceUnitRefs(profile.grade, profile.framework, subjectGrades).map((r) => r.key);
    return { unlocked: mine, locked: lockedVideos(keys, mine) };
  }, [events, profile, subjectGrades]);

  const title = (unit: string, fallback: string) => getUnitRef(unit, profile.framework)?.unit.title ?? fallback;

  return (
    <Page className="gap-5">
      <header className="flex items-center gap-3">
        {band === "little" ? <TreasureBack /> : <BackButton />}
        <h1 className="text-3xl font-bold sm:text-4xl">🎬 Videos</h1>
      </header>
      {!member ? (
        <div className="rounded-2xl bg-help-soft p-5 font-read text-lg">
          <p>Short help videos come with a family membership.</p>
          <button type="button" className="btn btn-good mt-3 min-h-12 px-5" onClick={() => setAsking(true)}>Ask a grown-up</button>
        </div>
      ) : (
        <>
          <section aria-labelledby="videos-unlocked" className="flex flex-col gap-3">
            <h2 id="videos-unlocked" className="text-2xl font-bold">Videos you unlocked</h2>
            {unlocked.length === 0 ? (
              <p className="font-read text-lg text-ink-soft">No videos yet. When you need a hand with a lesson, a short video pops up and lands here, so you can watch it again any time.</p>
            ) : (
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {unlocked.map((u) => (
                  <li key={u.video.id}>
                    <button type="button" className="btn btn-soft min-h-20 w-full items-center justify-start gap-3 p-4 text-left" onClick={() => setPlaying(u)}>
                      <span className="text-4xl" aria-hidden="true">▶️</span>
                      <span className="flex flex-col">
                        <span className="text-xl leading-tight font-bold">{u.video.title}</span>
                        <span className="text-sm font-semibold text-ink-soft">{title(u.unit, u.video.title)} · {u.video.seconds} seconds</span>
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </section>
          {locked.length > 0 && (
            <section aria-labelledby="videos-locked" className="flex flex-col gap-3">
              <h2 id="videos-locked" className="text-2xl font-bold">Waiting to be unlocked</h2>
              <p className="font-read text-lg text-ink-soft">Keep practising and these will pop up when you could use a hand.</p>
              <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {locked.map((l) => (
                  <li key={l.video.id}>
                    <a href={`#/lesson?scope=${encodeURIComponent(l.unit)}`} className="btn btn-soft min-h-20 w-full items-center justify-start gap-3 p-4 text-left opacity-80">
                      <span className="text-4xl" aria-hidden="true">🔒</span>
                      <span className="flex flex-col">
                        <span className="text-xl leading-tight font-bold">{title(l.unit, l.video.title)}</span>
                        <span className="text-sm font-semibold text-ink-soft">Practise this lesson to unlock</span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </section>
          )}
        </>
      )}
      {playing && (
        <HelpVideoPlayer video={playing.video} library onClose={() => setPlaying(null)} onNext={() => undefined} onWatched={() => undefined} />
      )}
      <MembershipLock open={asking} onClose={() => setAsking(false)} />
    </Page>
  );
}
