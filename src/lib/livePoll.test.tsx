// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const h = vi.hoisted(() => ({ classwork: [{ profileId: "p1" }] as { profileId: string }[] }));
vi.mock("@/lib/store", () => ({
  useActiveProfile: () => ({ id: "p1" }),
  useStore: (select: (s: unknown) => unknown) => select({ classwork: h.classwork }),
  useChildSettings: () => ({}),
}));
vi.mock("@/lib/say", () => ({ useChildSay: () => (t: string) => t }));

import { useClassTimer } from "@/components/play/ClassTimer";
import { useLiveQuestion } from "@/components/play/LiveQuestion";

const respond = (body: unknown) => Promise.resolve({ ok: true, status: 200, json: () => Promise.resolve(body) } as Response);
let fetchMock: ReturnType<typeof vi.fn>;
beforeEach(() => {
  vi.useFakeTimers();
  fetchMock = vi.fn(() => respond({ live: null, timer: { label: "", totalMs: 60_000, left: 30_000, running: true, className: "Room 4" } }));
  vi.stubGlobal("fetch", fetchMock);
  Object.defineProperty(navigator, "onLine", { configurable: true, value: true });
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("the device's live poll", () => {
  it("is one request for the question and the timer together, and stops with the last listener", async () => {
    const live = renderHook(() => useLiveQuestion());
    const timer = renderHook(() => useClassTimer());
    await act(() => vi.advanceTimersByTimeAsync(0));
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(timer.result.current?.timer.className).toBe("Room 4");
    expect(live.result.current.live).toBeNull();
    // A timer is showing, so it asks again after the quick wait, once, not once for each listener.
    await act(() => vi.advanceTimersByTimeAsync(5_000));
    expect(fetchMock).toHaveBeenCalledTimes(2);
    live.unmount();
    await act(() => vi.advanceTimersByTimeAsync(5_000));
    expect(fetchMock).toHaveBeenCalledTimes(3);
    timer.unmount();
    await act(() => vi.advanceTimersByTimeAsync(60_000));
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });
});
