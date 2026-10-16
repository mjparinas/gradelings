"use client";

import { useEffect, useState, type FocusEvent, type KeyboardEvent } from "react";

/** How long each slide stays before the carousel turns by itself. */
export const TURN_MS = 5000;

function reducedMotion() {
  return typeof window !== "undefined" && !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
}

/**
 * The turning behind the site's preview carousels. It turns by itself every few seconds, stops for
 * good once someone uses the arrows, pauses while hovered or focused, and never turns on its own
 * when motion is reduced or the tab is hidden. Spread `regionProps` on the region.
 */
export function useCarousel(count: number) {
  const [current, setCurrent] = useState(0);
  const [stopped, setStopped] = useState(false);
  const [paused, setPaused] = useState(false);
  const playing = !stopped && !paused;

  useEffect(() => {
    if (!playing || reducedMotion()) return;
    const id = window.setInterval(() => {
      if (document.visibilityState === "visible") setCurrent((c) => (c + 1) % count);
    }, TURN_MS);
    return () => window.clearInterval(id);
  }, [playing, count]);

  const go = (step: number) => {
    setStopped(true);
    setCurrent((c) => (c + step + count) % count);
  };

  const regionProps = {
    onMouseEnter: () => setPaused(true),
    onMouseLeave: () => setPaused(false),
    onFocus: () => setPaused(true),
    onBlur: (e: FocusEvent<HTMLElement>) => {
      if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setPaused(false);
    },
    onKeyDown: (e: KeyboardEvent<HTMLElement>) => {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    },
  };

  return { current, playing, go, regionProps };
}
