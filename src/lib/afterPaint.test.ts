import { afterEach, describe, expect, it, vi } from "vitest";
import { afterPaint } from "./afterPaint";

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("afterPaint", () => {
  it("waits for the next frame and then a task, and can be cancelled", () => {
    vi.useFakeTimers();
    const frames = new Map<number, FrameRequestCallback>();
    const runFrame = () => [...frames.entries()].forEach(([id, cb]) => (frames.delete(id), cb(0)));
    vi.stubGlobal("requestAnimationFrame", (cb: FrameRequestCallback) => (frames.set(frames.size + 1, cb), frames.size));
    vi.stubGlobal("cancelAnimationFrame", (id: number) => frames.delete(id));
    vi.stubGlobal("document", { visibilityState: "visible" });
    const fn = vi.fn();
    afterPaint(fn);
    vi.runAllTimers();
    expect(fn).not.toHaveBeenCalled();
    runFrame();
    expect(fn).not.toHaveBeenCalled();
    vi.runAllTimers();
    expect(fn).toHaveBeenCalledTimes(1);

    const later = vi.fn();
    afterPaint(later)();
    runFrame();
    vi.runAllTimers();
    expect(later).not.toHaveBeenCalled();
  });

  it("uses the next task in a hidden tab, where frames don't run", () => {
    vi.useFakeTimers();
    vi.stubGlobal("requestAnimationFrame", vi.fn());
    vi.stubGlobal("document", { visibilityState: "hidden" });
    const fn = vi.fn();
    afterPaint(fn);
    vi.runAllTimers();
    expect(fn).toHaveBeenCalledTimes(1);
    expect(requestAnimationFrame).not.toHaveBeenCalled();
  });
});
