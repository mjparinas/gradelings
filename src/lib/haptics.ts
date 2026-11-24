"use client";

// Light taps and buzzes on phones and tablets.
// Android browsers use the Web Vibration API. iOS Safari does not support it, so the
// App Store shell bridges to UIKit haptics instead (docs/IOS.md).

import { hasIosBridge, iosHaptic } from "./ios";

// The store says whether the active child has vibration on. It's injected rather than
// imported so public pages don't load the store.
let hapticsOn: () => boolean = () => true;
export function setHapticsCheck(check: () => boolean) {
  hapticsOn = check;
}

type Pattern = number | number[];

/** Short, gentle patterns in milliseconds (vibrate, pause, vibrate, ...). */
export const buzz = {
  tap: 8,
  correct: [10, 40, 18],
  tryAgain: 28,
  pop: 10,
} satisfies Record<string, Pattern>;

function kindFor(pattern: Pattern): "tap" | "correct" | "tryAgain" | "pop" {
  if (pattern === buzz.correct) return "correct";
  if (pattern === buzz.tryAgain) return "tryAgain";
  if (pattern === buzz.pop) return "pop";
  return "tap";
}

export function vibrate(pattern: Pattern) {
  if (!hapticsOn()) return;
  // Vibration is motion too: respect the device's reduced-motion setting.
  if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (hasIosBridge()) {
    iosHaptic(kindFor(pattern));
    return;
  }
  if (typeof navigator === "undefined" || typeof navigator.vibrate !== "function") return;
  try {
    navigator.vibrate(pattern);
  } catch {
    // Some browsers throw when vibration is blocked; it is only a nicety.
  }
}
