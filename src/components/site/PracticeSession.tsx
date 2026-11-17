"use client";

import { track } from "@vercel/analytics";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { TRIAL_DAYS } from "@/lib/plan";
import { AppLink } from "./AppLink";

// The sample questions on a unit's public page, played as a short run: a visitor answers a few with no sign-up,
// then is asked to carry on in the app, with how they did. Counts live in this component only; nothing is stored
// or sent about the child. The one analytics event carries no answers (see `SAMPLE_EVENT`).

/** Questions answered before the invitation to carry on shows. */
export const SESSION_THRESHOLD = 3;
export const SAMPLE_EVENT = "Sample questions done";

interface Session {
  report: (firstTry: boolean) => void;
}

const Ctx = createContext<Session | null>(null);

/** A tap-to-answer question inside a session reports when it is finished, and leaves the app link to the session. */
export function useSession(): Session | null {
  return useContext(Ctx);
}

export function PracticeSession({ children, play, playLabel, threshold = SESSION_THRESHOLD, page }: { children: ReactNode; play: string; playLabel: string; threshold?: number; page?: string }) {
  const [done, setDone] = useState(0);
  const [right, setRight] = useState(0);
  const sent = useRef(false);

  const report = useCallback((firstTry: boolean) => {
    setDone((d) => d + 1);
    if (firstTry) setRight((r) => r + 1);
  }, []);

  const ready = done >= threshold;
  useEffect(() => {
    if (ready && !sent.current) {
      sent.current = true;
      try {
        track(SAMPLE_EVENT, { from: page ?? window.location.pathname });
      } catch {
        // Analytics is optional (it isn't loaded off Vercel).
      }
    }
  }, [ready, page]);

  return (
    <Ctx.Provider value={{ report }}>
      {children}
      <div aria-live="polite" className="mt-4">
        {ready && (
          <div className="card flex flex-col gap-3 border-2 border-good-dark p-5" data-testid="session-prompt">
            <p className="text-xl font-bold">
              {right} of {done} right on the first try. Nicely done! 🎉
            </p>
            <p className="font-read text-lg">Save your progress and keep going: new questions every time, with hints, read-aloud and rewards.</p>
            <AppLink href={play} className="btn btn-good min-h-12 self-start px-5 text-lg">
              {playLabel}: keep going →
            </AppLink>
            <p className="font-read text-sm text-ink-soft" data-testid="try-free-note">
              Free for {TRIAL_DAYS} days with everything open. No card needed.
            </p>
          </div>
        )}
      </div>
    </Ctx.Provider>
  );
}
