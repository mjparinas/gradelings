"use client";

import type confettiType from "canvas-confetti";
import type { CelebrationPattern } from "./shop";

type Confetti = typeof confettiType;
type ConfettiShape = confettiType.Shape;

// canvas-confetti loads on first use (or when the browser is idle), so it never delays first paint.
let confettiLib: Promise<Confetti> | undefined;
function loadConfetti(): Promise<Confetti> {
  confettiLib ??= import("canvas-confetti").then((m) => m.default);
  return confettiLib;
}

/** Fetch the confetti library when the browser is idle, so it is also cached for offline play. */
export function warmConfetti() {
  if (typeof window === "undefined") return;
  const start = () => void loadConfetti().catch(() => undefined);
  if ("requestIdleCallback" in window) window.requestIdleCallback(start, { timeout: 8000 });
  else setTimeout(start, 4000);
}

const COLOURS = ["#4f8ef7", "#e9559a", "#25b47e", "#ff9636", "#f5b301", "#8b5cf6"];

// The store says whether the active child asked for calm motion. Injected, like the sound check,
// so this module never imports the store.
let calmOn: () => boolean = () => false;
export function setCalmCheck(check: () => boolean) {
  calmOn = check;
}

export function prefersReducedMotion(): boolean {
  return typeof window !== "undefined" && (calmOn() || window.matchMedia("(prefers-reduced-motion: reduce)").matches);
}

function centreOf(el: Element): { x: number; y: number } {
  const r = el.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

/** Stars burst out of an element (a correct answer, a coin, a filled basket). */
export function burstFrom(el: Element | null, count = 26) {
  if (!el || prefersReducedMotion()) return;
  const { x, y } = centreOf(el);
  void loadConfetti().then((confetti) => confetti({
    colors: COLOURS,
    disableForReducedMotion: true,
    zIndex: 60,
    particleCount: count,
    spread: 360,
    startVelocity: 22,
    gravity: 0.7,
    decay: 0.9,
    ticks: 70,
    scalar: 0.9,
    shapes: ["star", "circle"],
    origin: { x: x / window.innerWidth, y: y / window.innerHeight },
  }), () => undefined);
}

/** "+1"-style text that pops up from an element and floats away. */
export function floatText(el: Element | null, text: string, colour?: string) {
  if (!el || prefersReducedMotion()) return;
  const { x, y } = centreOf(el);
  const span = document.createElement("span");
  span.className = "float-text";
  span.textContent = text;
  span.style.left = `${x}px`;
  span.style.top = `${y - 20}px`;
  if (colour) span.style.color = colour;
  document.body.appendChild(span);
  span.addEventListener("animationend", () => span.remove());
}

/** Replay a one-shot CSS animation class on an element. */
export function replay(el: Element | null, className: string) {
  if (!el) return;
  el.classList.remove(className);
  // Force a reflow so the browser restarts the animation.
  void (el as HTMLElement).offsetWidth;
  el.classList.add(className);
  el.addEventListener("animationend", () => el.classList.remove(className), { once: true });
}

/** Shortest gap between two bursts in one celebration. Keeps any flicker under 3 a second (WCAG 2.3.1). */
export const MIN_BURST_GAP_MS = 380;

/**
 * A big celebration for finishing a unit. Pass emoji for a themed style, and a pattern for how the
 * pieces move: cannons from both sides (the default), pieces drifting down from the top, pieces
 * floating up from the bottom, or a few fireworks bursting in the sky one after another.
 */
export function celebrate(emoji: string[] = [], pattern: CelebrationPattern = "cannons") {
  if (prefersReducedMotion()) return;
  void loadConfetti().then((confetti) => {
    const shapes = emoji.length ? emoji.map((text) => confetti.shapeFromText({ text, scalar: 2 })) : undefined;
    const base = { colors: COLOURS, disableForReducedMotion: true, zIndex: 60, ticks: 240, ...(shapes ? { shapes, scalar: 2 } : {}) };
    const plain = { scalar: 1.15, shapes: ["star", "square", "circle"] as ConfettiShape[] };
    const later = (step: number, fire: () => void) => (step === 0 ? fire() : setTimeout(fire, step * MIN_BURST_GAP_MS));
    if (pattern === "fall") {
      // Three soft waves across the top that drift down, like snow.
      for (let step = 0; step < 3; step++) {
        later(step, () =>
          confetti({ ...base, particleCount: shapes ? 24 : 70, spread: 160, angle: 270, startVelocity: 8, gravity: 1, drift: step - 1, ticks: 300, origin: { x: 0.2 + step * 0.3, y: -0.1 } }),
        );
      }
    } else if (pattern === "float") {
      // Pieces rise gently from the bottom and float off the top, like balloons.
      for (let step = 0; step < 3; step++) {
        later(step, () =>
          confetti({ ...base, particleCount: shapes ? 18 : 60, spread: 50, angle: 90, startVelocity: 30, gravity: -0.25, decay: 0.95, ticks: 320, origin: { x: 0.25 + step * 0.25, y: 1.05 } }),
        );
      }
    } else if (pattern === "fireworks") {
      // Round bursts high up, one at a time and never faster than MIN_BURST_GAP_MS.
      const spots = [
        { x: 0.3, y: 0.3 },
        { x: 0.7, y: 0.25 },
        { x: 0.5, y: 0.4 },
      ];
      spots.forEach((origin, step) =>
        later(step, () => confetti({ ...base, particleCount: shapes ? 30 : 80, spread: 360, startVelocity: 26, gravity: 0.6, decay: 0.91, ticks: 200, origin })),
      );
    } else {
      confetti({ ...base, particleCount: shapes ? 40 : 90, spread: 70, angle: 60, origin: { x: 0, y: 0.75 }, startVelocity: 58 });
      confetti({ ...base, particleCount: shapes ? 40 : 90, spread: 70, angle: 120, origin: { x: 1, y: 0.75 }, startVelocity: 58 });
      later(1, () => {
        confetti({
          ...base,
          particleCount: shapes ? 50 : 140,
          spread: 130,
          origin: { x: 0.5, y: 0.3 },
          ...(shapes ? {} : plain),
        });
      });
    }
  }, () => undefined);
}
