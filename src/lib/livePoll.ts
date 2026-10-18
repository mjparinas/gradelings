import type { ClassGoal } from "./classGoal";
import { TIMER_POLL_OPEN_MS, type ClassTimer } from "./classTimer";
import { LIVE_POLL_IDLE_MS, LIVE_POLL_OPEN_MS, type LiveForChild } from "./live";

// One poll per device for everything a teacher can send to a child live: the open question and the class timer.
// The question card and the timer pill both listen here, so a device makes one request at a time, not one for
// each. It runs only while something is listening (a child in a class), the page is visible and the device is
// online, and it asks quickly while a question is open or a timer is showing and slowly otherwise.

export interface LivePollData {
  live: LiveForChild | null;
  timer: (ClassTimer & { className: string }) | null;
  goal: (ClassGoal & { className: string }) | null;
  /** When the answer arrived (a timer's `left` counts from here). */
  at: number;
}

export type LivePollEvent = { data: LivePollData } | { error: true } | { offline: true };

type Listener = (event: LivePollEvent) => void;

class Poller {
  private listeners = new Set<Listener>();
  private timer: ReturnType<typeof setTimeout> | undefined;
  private stopped = false;
  private last: LivePollData | null = null;

  constructor(private profileId: string) {
    document.addEventListener("visibilitychange", this.onVisible);
    window.addEventListener("online", this.onVisible);
    void this.poll();
  }

  add(listener: Listener): void {
    this.listeners.add(listener);
    if (this.last) listener({ data: this.last });
  }

  remove(listener: Listener): boolean {
    this.listeners.delete(listener);
    return this.listeners.size === 0;
  }

  stop(): void {
    this.stopped = true;
    clearTimeout(this.timer);
    document.removeEventListener("visibilitychange", this.onVisible);
    window.removeEventListener("online", this.onVisible);
  }

  private emit(event: LivePollEvent): void {
    for (const l of [...this.listeners]) l(event);
  }

  private onVisible = (): void => {
    if (document.visibilityState === "visible") {
      clearTimeout(this.timer);
      void this.poll();
    }
  };

  private schedule(): void {
    if (this.stopped) return;
    const ms = this.last?.live ? LIVE_POLL_OPEN_MS : this.last?.timer ? TIMER_POLL_OPEN_MS : LIVE_POLL_IDLE_MS;
    this.timer = setTimeout(() => void this.poll(), ms);
  }

  private async poll(): Promise<void> {
    if (document.visibilityState !== "visible") return this.schedule();
    if (navigator.onLine === false) {
      this.emit({ offline: true });
      return this.schedule();
    }
    try {
      const res = await fetch(`/api/live/?profile=${encodeURIComponent(this.profileId)}`, { credentials: "same-origin", cache: "no-store" });
      if (!res.ok) throw new Error(String(res.status));
      const body = (await res.json()) as { live?: LiveForChild | null; timer?: LivePollData["timer"]; goal?: LivePollData["goal"] };
      if (!this.stopped) {
        this.last = { live: body.live ?? null, timer: body.timer ?? null, goal: body.goal ?? null, at: Date.now() };
        this.emit({ data: this.last });
      }
    } catch {
      // Offline, maintenance or a server hiccup: listeners keep what is on screen.
      if (!this.stopped) this.emit({ error: true });
    }
    this.schedule();
  }
}

const pollers = new Map<string, Poller>();

/** Listens to the device's live poll for one child, starting it if nothing else is. Returns the way to stop listening. */
export function subscribeLivePoll(profileId: string, listener: Listener): () => void {
  let poller = pollers.get(profileId);
  if (!poller) {
    poller = new Poller(profileId);
    pollers.set(profileId, poller);
  }
  poller.add(listener);
  return () => {
    const p = pollers.get(profileId);
    if (p && p.remove(listener)) {
      p.stop();
      pollers.delete(profileId);
    }
  };
}
