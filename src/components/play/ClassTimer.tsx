"use client";

import { useEffect, useRef, useState } from "react";
import { formatClock, TIMER_POLL_IDLE_MS, TIMER_POLL_OPEN_MS, timeLeft, type ClassTimer } from "@/lib/classTimer";
import { useChildSay } from "@/lib/say";
import { useActiveProfile, useStore } from "@/lib/store";

// The countdown a teacher starts for the class, on every kids' screen while the device is online. Like live
// questions it asks the server only for a child in a class, only while the page is visible and online, and
// only a plain countdown comes back: it never locks anything, makes no sound and never changes practice.

interface Received {
  timer: ClassTimer & { className: string };
  at: number;
}

export function useClassTimer(): Received | null {
  const profileId = useActiveProfile()?.id ?? "";
  const inClass = useStore((s) => s.classwork.some((c) => c.profileId === profileId));
  const [got, setGot] = useState<Received | null>(null);
  const showing = useRef(false);
  useEffect(() => {
    if (!inClass || !profileId) return;
    let stopped = false;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const schedule = () => {
      if (!stopped) timer = setTimeout(poll, showing.current ? TIMER_POLL_OPEN_MS : TIMER_POLL_IDLE_MS);
    };
    const poll = async () => {
      if (document.visibilityState !== "visible" || navigator.onLine === false) return schedule();
      try {
        const res = await fetch(`/api/live/?profile=${encodeURIComponent(profileId)}&timer=1`, { credentials: "same-origin", cache: "no-store" });
        if (!res.ok) throw new Error(String(res.status));
        const data = (await res.json()) as { timer: Received["timer"] | null };
        if (!stopped) {
          showing.current = Boolean(data.timer);
          setGot(data.timer ? { timer: data.timer, at: Date.now() } : null);
        }
      } catch {
        // Offline or a hiccup: the countdown on screen keeps counting from its last answer.
      }
      schedule();
    };
    void poll();
    const onVisible = () => {
      if (document.visibilityState === "visible") {
        clearTimeout(timer);
        void poll();
      }
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("online", onVisible);
    return () => {
      stopped = true;
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("online", onVisible);
    };
  }, [inClass, profileId]);
  return inClass ? got : null;
}

/** A small pill at the top of the screen. It takes no taps, so it can never block a button underneath. */
export function ClassTimerChip() {
  const say = useChildSay();
  const got = useClassTimer();
  const [now, setNow] = useState(() => Date.now());
  const running = Boolean(got?.timer.running);
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setNow(Date.now()), 500);
    return () => clearInterval(t);
  }, [running]);
  if (!got) return null;
  const { timer, at } = got;
  const left = timeLeft(timer, at, Math.max(now, at));
  const done = left <= 0;
  const text = done ? say("Time's up!") : timer.running ? formatClock(left) : `${formatClock(left)} · ${say("paused")}`;
  return (
    <div className="pointer-events-none fixed inset-x-0 top-2 z-40 flex justify-center px-3" data-testid="class-timer">
      <div className="max-w-full rounded-full border-2 border-[#4f8ef7] bg-white px-4 py-1.5 font-read text-base font-bold shadow-md">
        <span aria-hidden="true">⏱️ </span>
        {timer.label && <span className="mr-2 text-ink-soft">{timer.label}</span>}
        <span role="timer" aria-live="off" aria-label={`${timer.label || "Class timer"}: ${text}`}>
          {text}
        </span>
      </div>
      {/* A quiet announcement when it starts and when it ends, not every second. */}
      <p className="sr-only" role="status">
        {done ? say("Class timer: time's up.") : `${say("Class timer")}: ${timer.label || formatClock(timer.totalMs)}`}
      </p>
    </div>
  );
}
