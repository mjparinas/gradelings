// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const confetti = vi.hoisted(() => {
  const fn = vi.fn() as ReturnType<typeof vi.fn> & { shapeFromText: ReturnType<typeof vi.fn> };
  fn.shapeFromText = vi.fn((o: { text: string }) => ({ text: o.text }));
  return fn;
});
vi.mock("canvas-confetti", () => ({ default: confetti }));

import { burstFrom, celebrate, floatText, MIN_BURST_GAP_MS, prefersReducedMotion, replay, setCalmCheck, warmConfetti } from "./juice";

let reduce = false;
const matchMedia = vi.fn((q: string) => ({ matches: q === "(prefers-reduced-motion: reduce)" && reduce }));

function box(left: number, top: number, width: number, height: number) {
  const el = document.createElement("button");
  el.getBoundingClientRect = () => ({ left, top, width, height }) as DOMRect;
  document.body.appendChild(el);
  return el;
}
const flush = () => new Promise((r) => setTimeout(r, 0));

beforeEach(() => {
  reduce = false;
  setCalmCheck(() => false);
  confetti.mockClear();
  confetti.shapeFromText.mockClear();
  vi.stubGlobal("matchMedia", matchMedia);
  window.innerWidth = 1000;
  window.innerHeight = 500;
  document.body.innerHTML = "";
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("reduced motion", () => {
  it("follows the device setting, and the child's calm motion option overrides it", () => {
    expect(prefersReducedMotion()).toBe(false);
    reduce = true;
    expect(prefersReducedMotion()).toBe(true);
    reduce = false;
    setCalmCheck(() => true);
    expect(prefersReducedMotion()).toBe(true);
  });

  it("stops every burst, floating number and celebration", async () => {
    reduce = true;
    const el = box(0, 0, 10, 10);
    burstFrom(el);
    floatText(el, "+10");
    celebrate();
    await flush();
    expect(confetti).not.toHaveBeenCalled();
    expect(document.querySelector(".float-text")).toBeNull();
  });

  it("calm motion stops them even when the device allows motion", async () => {
    setCalmCheck(() => true);
    burstFrom(box(0, 0, 10, 10));
    celebrate(["⭐"]);
    await flush();
    expect(confetti).not.toHaveBeenCalled();
  });
});

describe("bursts and floating text", () => {
  it("bursts stars from the centre of the element, as a share of the window", async () => {
    burstFrom(box(100, 200, 50, 100), 12);
    await vi.waitFor(() => expect(confetti).toHaveBeenCalledOnce());
    expect(confetti.mock.calls[0][0]).toMatchObject({ particleCount: 12, origin: { x: 0.125, y: 0.5 }, disableForReducedMotion: true });
  });

  it("ignores a missing element", async () => {
    burstFrom(null);
    floatText(null, "+1");
    replay(null, "pop");
    await flush();
    expect(confetti).not.toHaveBeenCalled();
  });

  it("floats text above the element and removes it when the animation ends", () => {
    floatText(box(100, 200, 50, 100), "+10 XP", "#123456");
    const span = document.querySelector<HTMLSpanElement>(".float-text")!;
    expect(span.textContent).toBe("+10 XP");
    expect(span.style.left).toBe("125px");
    expect(span.style.top).toBe("230px");
    expect(span.style.color).toBe("rgb(18, 52, 86)");
    span.dispatchEvent(new Event("animationend"));
    expect(document.querySelector(".float-text")).toBeNull();
  });

  it("replays a one-shot animation class and clears it afterwards", () => {
    const el = box(0, 0, 1, 1);
    el.classList.add("thump");
    replay(el, "thump");
    expect(el.classList.contains("thump")).toBe(true);
    el.dispatchEvent(new Event("animationend"));
    expect(el.classList.contains("thump")).toBe(false);
  });
});

describe("celebrate", () => {
  it("fires from both sides, then once more from the middle", async () => {
    vi.useFakeTimers();
    celebrate();
    await vi.advanceTimersByTimeAsync(0);
    await vi.waitFor(() => expect(confetti).toHaveBeenCalledTimes(2));
    expect(confetti.mock.calls.map((c) => c[0].angle)).toEqual([60, 120]);
    expect(confetti.mock.calls[0][0].particleCount).toBe(90);
    await vi.advanceTimersByTimeAsync(380);
    expect(confetti).toHaveBeenCalledTimes(3);
    expect(confetti.mock.calls[2][0]).toMatchObject({ particleCount: 140, origin: { x: 0.5, y: 0.3 } });
  });

  it("uses emoji shapes, with fewer and bigger pieces, for a themed style", async () => {
    vi.useFakeTimers();
    celebrate(["🍁", "⭐"]);
    await vi.advanceTimersByTimeAsync(400);
    expect(confetti.shapeFromText.mock.calls.map((c) => c[0].text)).toEqual(["🍁", "⭐"]);
    expect(confetti.mock.calls[0][0]).toMatchObject({ particleCount: 40, scalar: 2, shapes: [{ text: "🍁" }, { text: "⭐" }] });
    expect(confetti.mock.calls[2][0]).toMatchObject({ particleCount: 50, shapes: [{ text: "🍁" }, { text: "⭐" }] });
  });
});

describe("celebration patterns", () => {
  const PATTERNS = ["cannons", "fall", "float", "fireworks"] as const;

  /** The times (ms after the first) at which each confetti call fired. */
  async function timeline(pattern: (typeof PATTERNS)[number]) {
    vi.useFakeTimers();
    const times: number[] = [];
    confetti.mockImplementation(() => times.push(Date.now()));
    const start = Date.now();
    celebrate(["⭐"], pattern);
    await vi.advanceTimersByTimeAsync(5000);
    confetti.mockImplementation(() => undefined);
    return times.map((t) => t - start);
  }

  it("drifts down from above the top for a falling style", async () => {
    await timeline("fall");
    const calls = confetti.mock.calls.map((c) => c[0]);
    expect(calls).toHaveLength(3);
    for (const o of calls) expect(o).toMatchObject({ angle: 270, origin: { y: -0.1 } });
  });

  it("rises from below the bottom and floats up for a floating style", async () => {
    await timeline("float");
    const calls = confetti.mock.calls.map((c) => c[0]);
    expect(calls).toHaveLength(3);
    for (const o of calls) {
      expect(o).toMatchObject({ angle: 90, origin: { y: 1.05 } });
      expect(o.gravity).toBeLessThan(0);
    }
  });

  it("bursts fireworks all the way round, high on the screen", async () => {
    await timeline("fireworks");
    const calls = confetti.mock.calls.map((c) => c[0]);
    expect(calls).toHaveLength(3);
    for (const o of calls) {
      expect(o.spread).toBe(360);
      expect(o.origin.y).toBeLessThan(0.5);
    }
  });

  it.each(PATTERNS)("never fires bursts close enough to flicker more than 3 times a second (%s)", async (pattern) => {
    expect(MIN_BURST_GAP_MS).toBeGreaterThan(1000 / 3);
    const times = await timeline(pattern);
    expect(times.length).toBeGreaterThan(1);
    const starts = [...new Set(times)].sort((a, b) => a - b);
    for (let i = 1; i < starts.length; i++) expect(starts[i] - starts[i - 1]).toBeGreaterThanOrEqual(MIN_BURST_GAP_MS);
    // Within any one second there are at most 3 separate bursts.
    for (const t of starts) expect(starts.filter((u) => u >= t && u < t + 1000).length).toBeLessThanOrEqual(3);
  });

  it.each(PATTERNS)("plays nothing with reduced motion or calm mode (%s)", async (pattern) => {
    setCalmCheck(() => true);
    await timeline(pattern);
    expect(confetti).not.toHaveBeenCalled();
    setCalmCheck(() => false);
    reduce = true;
    await timeline(pattern);
    expect(confetti).not.toHaveBeenCalled();
  });

  it("keeps every burst behind the reduced-motion guard of the library too", async () => {
    for (const pattern of PATTERNS) await timeline(pattern);
    expect(confetti.mock.calls.length).toBeGreaterThan(0);
    for (const c of confetti.mock.calls) expect(c[0].disableForReducedMotion).toBe(true);
  });
});

describe("warmConfetti", () => {
  it("loads the library when the browser is idle", () => {
    const idle = vi.fn();
    vi.stubGlobal("requestIdleCallback", idle);
    warmConfetti();
    expect(idle).toHaveBeenCalledWith(expect.any(Function), { timeout: 8000 });
    expect(() => idle.mock.calls[0][0]()).not.toThrow();
  });

  it("falls back to a timer where there is no idle callback", () => {
    vi.useFakeTimers();
    const spy = vi.spyOn(window, "setTimeout");
    // jsdom has no requestIdleCallback.
    expect("requestIdleCallback" in window).toBe(false);
    warmConfetti();
    expect(spy).toHaveBeenCalledWith(expect.any(Function), 4000);
  });
});
