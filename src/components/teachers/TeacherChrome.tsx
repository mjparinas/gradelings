import type { ReactNode } from "react";
import { Critter } from "@/components/Critter";
import { APP_NAME, WORDMARK_COLOURS } from "@/lib/brand";

/** The brand name in its letter colours. */
export function Wordmark() {
  return (
    <>
      {APP_NAME.split("").map((ch, i) => (
        <span key={i} aria-hidden="true" style={{ color: WORDMARK_COLOURS[i % WORDMARK_COLOURS.length] }}>
          {ch}
        </span>
      ))}
    </>
  );
}

const bar = "block rounded-lg bg-[#e8ecf3]";

/**
 * What the teacher area shows while it finds out who is signed in: Ollie bobbing above a card in the shape of the
 * sign-in form, so the page looks like it is about to appear instead of showing a line of text. The motion only
 * runs when motion is welcome (the global reduced-motion rule stops the float), and a screen reader hears
 * "Loading…" once.
 */
export function TeacherLoading({ children }: { children?: ReactNode }) {
  return (
    <div role="status" aria-live="polite" className="mx-auto mt-6 flex max-w-sm flex-col items-center">
      <p className="sr-only">Loading…</p>
      <Critter id="ollie" mood="wave" size={96} className="-mb-3 relative z-10" />
      <div aria-hidden="true" className="w-full rounded-2xl border border-line bg-white p-5 motion-safe:animate-pulse">
        <span className={`${bar} h-7 w-3/4`} />
        <span className={`${bar} mt-5 h-3 w-1/4`} />
        <span className={`${bar} mt-2 h-11 w-full`} />
        <span className={`${bar} mt-4 h-3 w-1/3`} />
        <span className={`${bar} mt-2 h-11 w-full`} />
        <span className="mt-5 block h-11 w-full rounded-xl bg-[#c9dcfb]" />
        <span className={`${bar} mx-auto mt-4 h-3 w-1/2`} />
      </div>
      <p aria-hidden="true" className="mt-3 text-sm font-semibold text-ink-soft">{children ?? "Getting things ready…"}</p>
    </div>
  );
}
