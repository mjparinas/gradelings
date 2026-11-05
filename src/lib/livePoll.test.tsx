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

  it("holds requests with the signature it has and asks again at once; falls back to timed asks when requests aren't held", async () => {
    // A server that supports watching and answers each held request after a pause.
    let n = 0;
    fetchMock.mockImplementation((url: string) => {
      n++;
      return respond({ live: null, timer: null, goal: null, v: n < 3 ? `s${n}` : "s2", hot: false, _url: url });
    });
    const live = renderHook(() => useLiveQuestion());
    await act(() => vi.advanceTimersByTimeAsync(0));
    expect(fetchMock.mock.calls[0][0]).not.toContain("&v=");
    await act(() => vi.advanceTimersByTimeAsync(0));
    expect(fetchMock.mock.calls[1][0]).toContain("&v=s1");
    // Request 3 comes back unchanged straight away, twice: it was not held, so it falls back to timed asks.
    await act(() => vi.advanceTimersByTimeAsync(10));
    await act(() => vi.advanceTimersByTimeAsync(1_100));
    const count = fetchMock.mock.calls.length;
    // No tight loop: nothing for a good while (the idle wait), then a plain request without the signature.
    await act(() => vi.advanceTimersByTimeAsync(5_000));
    expect(fetchMock.mock.calls.length).toBe(count);
    await act(() => vi.advanceTimersByTimeAsync(11_000));
    expect(fetchMock.mock.calls.length).toBeGreaterThan(count);
    expect(fetchMock.mock.calls.at(-1)![0]).not.toContain("&v=");
    live.unmount();
  });

  it("treats a server that sends no signature as an older one and asks on a timer", async () => {
    const live = renderHook(() => useLiveQuestion());
    await act(() => vi.advanceTimersByTimeAsync(0));
    const first = fetchMock.mock.calls.length;
    await act(() => vi.advanceTimersByTimeAsync(1_000));
    expect(fetchMock.mock.calls.length).toBe(first);
    live.unmount();
  });

  it("falls back when a held request is never answered", async () => {
    let calls = 0;
    fetchMock.mockImplementation((_url: string, init: RequestInit) => {
      calls++;
      if (calls === 1) return respond({ live: null, timer: null, goal: null, v: "s1", hot: false });
      return new Promise((_res, rej) => init.signal!.addEventListener("abort", () => rej(new DOMException("x", "AbortError"))));
    });
    const live = renderHook(() => useLiveQuestion());
    await act(() => vi.advanceTimersByTimeAsync(0));
    await act(() => vi.advanceTimersByTimeAsync(16_000));
    await act(() => vi.advanceTimersByTimeAsync(17_000));
    // Two hung held requests, then a plain one.
    expect(fetchMock.mock.calls.slice(1, 3).every((c) => String(c[0]).includes("&v=s1"))).toBe(true);
    await act(() => vi.advanceTimersByTimeAsync(16_000));
    expect(String(fetchMock.mock.calls.at(-1)![0])).not.toContain("&v=");
    live.unmount();
  });

  it("tells the server when the tab is hidden or the page closes, and only then", async () => {
    const beacon = vi.fn((url: string, data?: BodyInit) => Boolean(url || data));
    Object.defineProperty(navigator, "sendBeacon", { configurable: true, value: beacon });
    const live = renderHook(() => useLiveQuestion());
    await act(() => vi.advanceTimersByTimeAsync(0));
    expect(beacon).not.toHaveBeenCalled();
    Object.defineProperty(document, "visibilityState", { configurable: true, value: "hidden" });
    document.dispatchEvent(new Event("visibilitychange"));
    expect(beacon).toHaveBeenCalledTimes(1);
    expect(beacon.mock.calls[0]?.[0]).toBe("/api/live/");
    window.dispatchEvent(new Event("pagehide"));
    expect(beacon).toHaveBeenCalledTimes(2);
    Object.defineProperty(document, "visibilityState", { configurable: true, value: "visible" });
    live.unmount();
    window.dispatchEvent(new Event("pagehide"));
    expect(beacon).toHaveBeenCalledTimes(2);
  });
});
