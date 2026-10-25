"use client";

import { useRef, useState } from "react";
import { replay, prefersReducedMotion, burstFrom } from "@/lib/juice";
import { dayKey } from "@/lib/model";
import { MYSTERY_MIN_ANSWERS, mysteryReward, offersMystery } from "@/lib/mystery";
import { useFlag } from "@/lib/remoteFlags";
import { go } from "@/lib/router";
import { sounds } from "@/lib/sound";
import { derivedFor, useActiveProfile, useStore } from "@/lib/store";
import { SayButton } from "./BuddySays";

/** How long ago the lesson's event can be and still count as this lesson. */
const RECENT_MS = 60 * 60_000;

/** The lesson just logged: the newest `session` event of this child from the last hour. */
function latestSession(profileId: string, now: number): string | null {
  const events = useStore.getState().events;
  for (let i = events.length - 1; i >= 0; i--) {
    const e = events[i];
    if (e.profileId === profileId && e.type === "session") return now - e.t <= RECENT_MS ? e.id : null;
  }
  return null;
}

/**
 * A mystery box on the finish screen, now and then. Whether this lesson has one is decided once,
 * when the screen shows; what's inside is fixed by the lesson's event id (`mystery.ts`).
 */
export function MysteryBox({ answers }: { answers: number }) {
  const on = useFlag("mystery-rewards");
  const book = useFlag("sticker-book");
  const profile = useActiveProfile();
  const box = useRef<HTMLButtonElement>(null);
  const [session] = useState(() => {
    if (!profile || answers < MYSTERY_MIN_ANSWERS) return null;
    const id = latestSession(profile.id, Date.now());
    if (!id) return null;
    const d = derivedFor(useStore.getState(), profile.id);
    if (d.mysteries[id]) return null;
    const today = dayKey(Date.now());
    const opened = Object.values(d.mysteries);
    return offersMystery(id, answers, opened.filter((day) => day === today).length, opened.length) ? id : null;
  });
  const [state, setState] = useState<"closed" | "opening" | "open">("closed");

  if (!on || !session || !profile) return null;
  const reward = mysteryReward(session);

  function open() {
    if (state !== "closed" || !session) return;
    sounds.pop(2);
    useStore.getState().log([{ type: "mystery", session }]);
    if (prefersReducedMotion()) return setState("open");
    setState("opening");
    replay(box.current, "animate-wiggle");
    setTimeout(() => {
      burstFrom(box.current, 18);
      sounds.clink();
      setState("open");
    }, 600);
  }

  if (state !== "open") {
    return (
      <div className="card flex w-full flex-col items-center gap-2 p-4 animate-rise-in" style={{ animationDelay: "1.4s" }}>
        <p className="text-xl font-bold">A mystery box for your hard work!</p>
        <button
          ref={box}
          type="button"
          onClick={open}
          aria-label="Open the mystery box"
          className="btn btn-soft h-28 w-28 text-7xl"
          disabled={state === "opening"}
        >
          <span aria-hidden="true">🎁</span>
        </button>
        <p className="font-read text-base text-ink-soft">Tap to open it</p>
      </div>
    );
  }

  const count = reward.kind === "sticker" ? (derivedFor(useStore.getState(), profile.id).surprises[reward.sticker.id] ?? 1) : 0;
  const line =
    reward.kind === "coins"
      ? `${reward.coins} coins!`
      : count > 1
        ? `Another ${reward.sticker.name} sticker! You have ${count}.`
        : `A new ${reward.sticker.rare ? "rare " : ""}sticker: ${reward.sticker.name}!`;
  return (
    <div role="status" className="card flex w-full flex-col items-center gap-2 p-4 animate-pop-in">
      <span aria-hidden="true" className={`text-7xl ${reward.kind === "sticker" && reward.sticker.rare ? "drop-shadow-[0_0_10px_#f0bd2a]" : ""}`}>
        {reward.kind === "coins" ? "🪙" : reward.sticker.emoji}
      </span>
      <div className="flex items-center gap-2">
        <p className="text-xl font-bold">{line}</p>
        <SayButton text={line} />
      </div>
      {reward.kind === "sticker" && book && (
        <button type="button" className="btn btn-soft min-h-12 px-4 text-lg" onClick={() => go("/stickers", { page: "surprises" })}>
          📒 See your stickers
        </button>
      )}
    </div>
  );
}
