"use client";

import { useSyncExternalStore } from "react";
import { ambientEmoji, PARTICLES } from "@/lib/ambient";
import { currentHoliday } from "@/lib/holidays";
import { dayKey } from "@/lib/model";

/** Drifting holiday or festival emoji behind the page. Chosen after mount so the server and browser draw the same thing. */
export function Ambient() {
  // The server snapshot is "nothing", so the first browser draw matches the server's.
  const emoji = useSyncExternalStore(
    () => () => {},
    () => ambientEmoji(dayKey(Date.now()), currentHoliday()),
    () => null,
  );
  if (!emoji) return null;
  return (
    <div aria-hidden="true" data-ambient className="ambient pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {PARTICLES.map((p, i) => (
        <span key={i} className="absolute top-0 animate-ambient-fall opacity-40" style={{ left: p.left, fontSize: p.size, animationDuration: `${p.duration}s`, animationDelay: `${p.delay}s` }}>
          {emoji}
        </span>
      ))}
    </div>
  );
}
