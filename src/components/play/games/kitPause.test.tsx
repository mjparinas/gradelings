// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { setLivePaused } from "@/lib/livePause";
import { useCountdown } from "./kit";

beforeEach(() => vi.useFakeTimers());
afterEach(() => {
  setLivePaused(false);
  vi.useRealTimers();
});

it("the question timer stops while a live question is up and carries on after", () => {
  const { result } = renderHook(() => useCountdown(10, "q1", () => {}));
  act(() => vi.advanceTimersByTime(1000));
  const before = result.current;
  expect(before).toBeLessThan(10);
  setLivePaused(true);
  act(() => vi.advanceTimersByTime(5000));
  expect(result.current).toBe(before);
  setLivePaused(false);
  act(() => vi.advanceTimersByTime(1000));
  expect(result.current).toBeLessThan(before);
});
