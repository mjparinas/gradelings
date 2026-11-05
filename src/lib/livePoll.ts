import type { ClassGoal } from "./classGoal";
import { TIMER_POLL_OPEN_MS, type ClassTimer } from "./classTimer";
import { LIVE_POLL_HOT_MS, LIVE_POLL_IDLE_MS, LIVE_POLL_OPEN_MS, type LiveForChild } from "./live";

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

/** The server holds a watching request this long when nothing changes (liveWatch.ts); give up a little after. */
export const LONG_POLL_GIVE_UP_MS = 15_000;
/** A held request that comes back unchanged sooner than this was not held: something on the way is not letting it wait. */
const LONG_POLL_MIN_HOLD_MS = 2_000;
/** After this many such requests in a row, ask the old way (every few seconds) instead. */
const LONG_POLL_STRIKES = 2;
/** Long-polling is tried again this long after falling back. */
const LONG_POLL_RETRY_MS = 10 * 60_000;
const ERROR_RETRY_MS = 5_000;

// Two ways of asking, so it works on any school network:
//  - long: the request carries the signature of what the device shows (`v`) and the server holds it until
//    that changes, so a question reaches the device within about a second. One ordinary HTTPS response, no
//    WebSocket or streaming that a filter could break.
//  - short: the old way, a request every few seconds (quicker while a question, timer or teacher is around).
// It starts long and drops to short if the server doesn't support it, or if requests that should wait come
// back at once or never (a proxy that answers early, or cuts the connection), then tries long again later.
class Poller {
  private listeners = new Set<Listener>();
  private timer: ReturnType<typeof setTimeout> | undefined;
  private stopped = false;
  private last: LivePollData | null = null;
  private mode: "long" | "short" = "long";
  private strikes = 0;
  private sig: string | null = null;
  private hot = false;
  private fellBackAt = 0;
  private gen = 0;
  private ctrl: AbortController | undefined;

  constructor(private profileId: string) {
    document.addEventListener("visibilitychange", this.onVisible);
    window.addEventListener("online", this.onVisible);
    window.addEventListener("pagehide", this.leaving);
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
    this.gen++;
    this.ctrl?.abort();
    clearTimeout(this.timer);
    document.removeEventListener("visibilitychange", this.onVisible);
    window.removeEventListener("online", this.onVisible);
    window.removeEventListener("pagehide", this.leaving);
  }

  private emit(event: LivePollEvent): void {
    for (const l of [...this.listeners]) l(event);
  }

  private onVisible = (): void => {
    clearTimeout(this.timer);
    if (document.visibilityState === "visible") void this.poll();
    else {
      // A hidden page doesn't hold a request open; it asks again when it is shown.
      this.gen++;
      this.ctrl?.abort();
      this.leaving();
    }
  };

  /** Tells the server this device is going away (tab hidden or closing), so the teacher's desk can say so. Best effort. */
  private leaving = (): void => {
    try {
      if (typeof navigator.sendBeacon === "function") navigator.sendBeacon("/api/live/", new Blob([JSON.stringify({ profileId: this.profileId, leaving: true })], { type: "application/json" }));
    } catch {
      // A browser that refuses the beacon: the teacher's desk falls back to "not heard from lately".
    }
  };

  private fallBack(): void {
    this.mode = "short";
    this.sig = null;
    this.strikes = 0;
    this.fellBackAt = Date.now();
  }

  private schedule(ms?: number): void {
    if (this.stopped) return;
    if (ms === undefined) {
      if (this.mode === "long") ms = 0;
      else ms = this.last?.live ? LIVE_POLL_OPEN_MS : this.last?.timer ? TIMER_POLL_OPEN_MS : this.hot ? LIVE_POLL_HOT_MS : LIVE_POLL_IDLE_MS;
    }
    this.timer = setTimeout(() => void this.poll(), ms);
  }

  private async poll(): Promise<void> {
    const gen = ++this.gen;
    this.ctrl?.abort();
    clearTimeout(this.timer);
    if (document.visibilityState !== "visible") return;
    if (navigator.onLine === false) {
      this.emit({ offline: true });
      return this.schedule(LIVE_POLL_IDLE_MS);
    }
    if (this.mode === "short" && Date.now() - this.fellBackAt > LONG_POLL_RETRY_MS) this.mode = "long";
    const ctrl = new AbortController();
    this.ctrl = ctrl;
    const sent = this.mode === "long" ? this.sig : null;
    const holds = sent !== null;
    const started = Date.now();
    let gaveUp = false;
    const giveUp = holds ? setTimeout(() => ((gaveUp = true), ctrl.abort()), LONG_POLL_GIVE_UP_MS) : undefined;
    try {
      const url = `/api/live/?profile=${encodeURIComponent(this.profileId)}&watch=1${holds ? `&v=${encodeURIComponent(sent)}` : ""}`;
      const res = await fetch(url, { credentials: "same-origin", cache: "no-store", signal: ctrl.signal });
      if (!res.ok) throw new Error(String(res.status));
      const body = (await res.json()) as { live?: LiveForChild | null; timer?: LivePollData["timer"]; goal?: LivePollData["goal"]; v?: string; hot?: boolean };
      if (this.stopped || gen !== this.gen) return;
      this.last = { live: body.live ?? null, timer: body.timer ?? null, goal: body.goal ?? null, at: Date.now() };
      this.hot = body.hot === true;
      if (typeof body.v !== "string") {
        // An older server (mid-deploy) can't hold requests.
        this.fallBack();
      } else {
        this.sig = body.v;
        if (holds && body.v === sent && Date.now() - started < LONG_POLL_MIN_HOLD_MS) {
          if (++this.strikes >= LONG_POLL_STRIKES) this.fallBack();
        } else this.strikes = 0;
      }
      this.emit({ data: this.last });
      this.schedule(this.mode === "long" && this.strikes > 0 ? ERROR_RETRY_MS / 5 : undefined);
    } catch {
      if (this.stopped || gen !== this.gen) return;
      if (gaveUp) {
        // Held but never answered: a proxy is holding or cutting the connection.
        if (++this.strikes >= LONG_POLL_STRIKES) this.fallBack();
        this.schedule(this.mode === "long" ? 1_000 : undefined);
      } else {
        // Offline, maintenance or a server hiccup: listeners keep what is on screen.
        this.emit({ error: true });
        this.schedule(this.mode === "long" ? ERROR_RETRY_MS : undefined);
      }
    } finally {
      clearTimeout(giveUp);
    }
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
