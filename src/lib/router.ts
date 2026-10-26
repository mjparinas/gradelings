"use client";

import { useDeferredValue, useSyncExternalStore } from "react";

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

// Every screen change starts at the top, whether it came from go(), a link or a tile.
if (typeof window !== "undefined") window.addEventListener("hashchange", () => window.scrollTo({ top: 0 }));

function subscribe(cb: () => void) {
  window.addEventListener("hashchange", cb);
  return () => window.removeEventListener("hashchange", cb);
}

export function parse(hash: string): Route {
  const [p, q = ""] = hash.split("?");
  return { path: p.split("/").filter(Boolean).map(decodeURIComponent), query: new URLSearchParams(q) };
}

export function useRoute(): Route {
  return parse(useHash());
}

/** The address after the #, as a string (cheap to compare and to pass to a memoised screen). */
export function useHash(): string {
  return useSyncExternalStore(subscribe, read, () => "/");
}

/**
 * For an app's screen switcher: the address whose screen is on show, and whether a newer one is still being
 * drawn. A tap changes the address at once; the new screen is drawn in the background while the old one stays
 * up with a progress bar (`RouteProgress`), so a screen that takes a while to draw never leaves a tap unanswered.
 * Pass `shown` to a `memo` component, or the old screen is drawn again in the meantime.
 */
export function useShownHash(): { shown: string; pending: boolean } {
  const hash = useHash();
  const shown = useDeferredValue(hash);
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
