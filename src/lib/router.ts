"use client";

import { createContext, useContext, useEffect, useLayoutEffect, useState, useSyncExternalStore } from "react";
import { afterPaint } from "./afterPaint";

// A tiny hash router for the kids' app, the parent area and the teacher area. Hash routes keep
// everything on one cached page, so the app works fully offline and moving
// between screens never waits on the network.

export interface Route {
  path: string[];
  query: URLSearchParams;
}

function read(): string {
  return typeof window === "undefined" ? "" : window.location.hash.replace(/^#/, "") || "/";
}

// When the screen being drawn was asked for (useShownHash times each screen with it).
let drawStart = 0;

// Every screen change starts at the top, whether it came from go(), a link or a tile.
if (typeof window !== "undefined") {
  window.addEventListener("hashchange", () => {
    drawStart = performance.now();
    window.scrollTo({ top: 0 });
  });
}

function subscribe(cb: () => void) {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
}

export function parse(hash: string): Route {
  const [p, q = ""] = hash.split("?");
  return { path: p.split("/").filter(Boolean).map(decodeURIComponent), query: new URLSearchParams(q) };
}

const noSubscribe = () => () => undefined;

// The address of the screen on show, inside a screen switcher (`ShownRoute`). A screen still on show while the next
// one is drawn reads its own address, not the newer one, so it doesn't act on a tap meant for the next screen.
const Shown = createContext<string | null>(null);
export const ShownRoute = Shown.Provider;

export function useRoute(): Route {
  return parse(useHash());
}

/** The address after the #, as a string (cheap to compare and to pass to a memoised screen). */
export function useHash(): string {
  const shown = useContext(Shown);
  const live = useSyncExternalStore(shown === null ? subscribe : noSubscribe, read, () => "/");
  return shown ?? live;
}

/** The address after the #, even inside a screen that is still on show while the next one is drawn. */
function useLiveHash(): string {
  return useSyncExternalStore(subscribe, read, () => "/");
}

/** A screen that took longer than this to draw last time shows the progress bar first. */
export const SLOW_DRAW_MS = 80;
// How long each screen (the address without its query) took to draw last time, on this page load.
const drawMs = new Map<string, number>();
const screenOf = (hash: string) => hash.split("?")[0];

/**
 * For an app's screen switcher: the address whose screen is on show, and whether a newer one is waiting.
 * A screen that drew quickly last time is drawn straight away. One that was slow, or hasn't been drawn yet
 * on this visit, first shows a progress bar (`RouteProgress`) and is drawn once that bar has been painted,
 * so a tap never goes unanswered while a big screen is drawn or downloaded.
 * Pass `shown` to a `memo` component, or the old screen is drawn again in the meantime, and wrap the screens
 * in `<ShownRoute value={shown}>` so `useRoute` inside them reads the address they were drawn for.
 */
export function useShownHash(): { shown: string; pending: boolean } {
  const hash = useLiveHash();
  const [later, setLater] = useState(hash);
  const quick = (drawMs.get(screenOf(hash)) ?? Infinity) < SLOW_DRAW_MS;
  // Kept in step while quick screens go straight through, so a slow one waits on the screen that is really up.
  if (quick && later !== hash) setLater(hash);
  const shown = quick ? hash : later;
  useEffect(
    () =>
      shown === hash
        ? undefined
        : afterPaint(() => {
            drawStart = performance.now();
            setLater(hash);
          }),
    [hash, shown],
  );
  useLayoutEffect(() => {
    if (!drawStart) return;
    drawMs.set(screenOf(shown), performance.now() - drawStart);
    drawStart = 0;
  }, [shown]);
  return { shown, pending: shown !== hash };
}

export function href(path: string, query?: Record<string, string | number | undefined>): string {
  const q = query
    ? new URLSearchParams(Object.entries(query).filter(([, v]) => v !== undefined) as [string, string][]).toString()
    : "";
  return `#${path}${q ? `?${q}` : ""}`;
}

export function go(path: string, query?: Record<string, string | number | undefined>, replace = false) {
  const target = href(path, query);
  if (replace) window.location.replace(target);
  else window.location.hash = target;
}

export function back(fallback = "/") {
  if (window.history.length > 1) window.history.back();
  else go(fallback);
}
