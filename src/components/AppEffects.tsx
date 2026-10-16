"use client";

import { useEffect } from "react";
import { replay, warmConfetti } from "@/lib/juice";
import { cacheLoadedScripts } from "@/lib/offline";
import { sounds } from "@/lib/sound";

/** Registers the offline service worker and makes every button juicy. */
export function AppEffects() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    const register = () =>
      navigator.serviceWorker.register("/sw.js").catch(() => {
        // Offline support is a bonus; the site works without it.
      });
    // On a first visit, lessons load before the worker takes control; hand them over once it does.
    navigator.serviceWorker.addEventListener("controllerchange", cacheLoadedScripts);
    cacheLoadedScripts();
    if (isApp(window.location.pathname)) {
      register();
      return;
    }
    // On a public page, installing the worker downloads both apps (about 370 KB), which would compete with
    // prefetching the pages a visitor is about to open. Wait until the page has settled.
    return whenSettled(register);
  }, []);

  // Public pages never celebrate, so only the apps warm the confetti library.
  useEffect(() => {
    if (isApp(window.location.pathname)) warmConfetti();
  }, []);

  // Every .btn gets a little click sound on press and a jelly spring on release.
  useEffect(() => {
    const target = (e: Event) => {
      const el = (e.target as Element | null)?.closest?.(".btn");
      return el instanceof HTMLButtonElement && el.disabled ? null : el;
    };
    const down = (e: PointerEvent) => {
      const el = target(e);
      if (el && !el.hasAttribute("data-quiet")) sounds.tap();
    };
    const up = (e: PointerEvent) => replay(target(e) ?? null, "jelly");
    document.addEventListener("pointerdown", down);
    document.addEventListener("pointerup", up);
    return () => {
      document.removeEventListener("pointerdown", down);
      document.removeEventListener("pointerup", up);
    };
  }, []);

  return null;
}

/** The kids' app and parent area, which the service worker keeps for offline use. */
function isApp(path: string): boolean {
  return path.startsWith("/play") || path.startsWith("/parents");
}

/** How long a public page waits after loading before it installs the service worker. */
export const SW_DELAY_MS = 8000;

/** Runs `fn` once the page has loaded, `SW_DELAY_MS` has passed and the browser is idle. Returns a cancel. */
function whenSettled(fn: () => void): () => void {
  let timer: ReturnType<typeof setTimeout> | undefined;
  let idle: number | undefined;
  const start = () => {
    timer = setTimeout(() => {
      if ("requestIdleCallback" in window) idle = window.requestIdleCallback(fn, { timeout: SW_DELAY_MS });
      else fn();
    }, SW_DELAY_MS);
  };
  if (document.readyState === "complete") start();
  else window.addEventListener("load", start, { once: true });
  return () => {
    window.removeEventListener("load", start);
    clearTimeout(timer);
    if (idle !== undefined) window.cancelIdleCallback(idle);
  };
}
