// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useNow } from "./useNow";

afterEach(() => vi.useRealTimers());

describe("useNow", () => {
  it("gives the time rounded down to the step and moves on as time passes", () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date(2026, 9, 12, 9, 30, 45));
    const { result } = renderHook(() => useNow());
    expect(result.current).toBe(new Date(2026, 9, 12, 9, 30, 0).getTime());

    act(() => void vi.advanceTimersByTime(14_000));
    expect(result.current).toBe(new Date(2026, 9, 12, 9, 30, 0).getTime());
    act(() => void vi.advanceTimersByTime(16_000));
    expect(result.current).toBe(new Date(2026, 9, 12, 9, 31, 0).getTime());
  });

  it("checks at least every 30 seconds for long steps, and stops when unmounted", () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
    const setInterval = vi.spyOn(globalThis, "setInterval");
    const clearInterval = vi.spyOn(globalThis, "clearInterval");
    const { result, unmount } = renderHook(() => useNow(3_600_000));
    expect(setInterval).toHaveBeenCalledWith(expect.any(Function), 30_000);
    expect(result.current).toBe(0);
    act(() => void vi.advanceTimersByTime(3_600_000));
    expect(result.current).toBe(3_600_000);
    unmount();
    expect(clearInterval).toHaveBeenCalled();
  });
});
