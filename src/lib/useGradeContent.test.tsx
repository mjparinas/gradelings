// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// The grade registry, faked: which grades have loaded or failed, and who is listening.
const content = vi.hoisted(() => ({
  loaded: new Set<string>(),
  failed: new Set<string>(),
  listeners: new Set<() => void>(),
}));
vi.mock("@/content", () => ({
  AVAILABLE_GRADES: ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
  isGradeLoaded: (g: string, f: string) => content.loaded.has(`${f}:${g}`),
  gradeLoadFailed: (g: string, f: string) => content.failed.has(`${f}:${g}`),
  subscribeToContent: (l: () => void) => {
    content.listeners.add(l);
    return () => content.listeners.delete(l);
  },
  loadGrades: vi.fn(async () => undefined),
  loadGrade: vi.fn(async () => undefined),
}));
vi.mock("./offline", () => ({ cacheLoadedScripts: vi.fn() }));

import * as registry from "@/content";
import type { ContentTarget } from "@/content";
import { cacheLoadedScripts } from "./offline";
import { prefetchGrades, useGradeContent } from "./useGradeContent";

const loadGrades = vi.mocked(registry.loadGrades);
const loadGrade = vi.mocked(registry.loadGrade);
const t = (grade: string, framework = "ca-bc") => ({ grade, framework }) as ContentTarget;
const notify = () => act(() => content.listeners.forEach((l) => l()));

beforeEach(() => {
  content.loaded.clear();
  content.failed.clear();
  loadGrades.mockClear();
  loadGrade.mockClear();
  vi.mocked(cacheLoadedScripts).mockClear();
});
afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

describe("useGradeContent", () => {
  it("loads each grade once, however it is listed, and turns ready when all have arrived", () => {
    const { result } = renderHook(() => useGradeContent([t("3"), t("3"), t("2", "ca-on")]));
    expect(result.current.status).toBe("loading");
    expect(loadGrades).toHaveBeenCalledOnce();
    expect(loadGrades.mock.calls[0][0]).toEqual([t("3"), t("2", "ca-on")]);

    content.loaded.add("ca-bc:3");
    notify();
    expect(result.current.status).toBe("loading");
    content.loaded.add("ca-on:2");
    notify();
    expect(result.current.status).toBe("ready");
  });

  it("doesn't reload when the same grades are passed again in another order", () => {
    const { rerender } = renderHook(({ targets }) => useGradeContent(targets), { initialProps: { targets: [t("3"), t("4")] } });
    rerender({ targets: [t("4"), t("3")] });
    expect(loadGrades).toHaveBeenCalledOnce();
    rerender({ targets: [t("5")] });
    expect(loadGrades).toHaveBeenCalledTimes(2);
  });

  it("reports a grade that couldn't download, and retry tries again", () => {
    content.failed.add("ca-bc:6");
    const { result } = renderHook(() => useGradeContent([t("6")]));
    expect(result.current.status).toBe("failed");
    result.current.retry();
    expect(loadGrades).toHaveBeenCalledTimes(2);
    expect(loadGrades.mock.calls[1][0]).toEqual([t("6")]);
  });

  it("asks for nothing when there are no children yet", () => {
    const { result } = renderHook(() => useGradeContent([]));
    expect(result.current.status).toBe("ready");
    expect(loadGrades).not.toHaveBeenCalled();
  });

  it("keeps working when a download rejects", async () => {
    loadGrades.mockRejectedValueOnce(new Error("offline"));
    const { result } = renderHook(() => useGradeContent([t("1")]));
    await act(async () => undefined);
    expect(result.current.status).toBe("loading");
  });
});

describe("prefetchGrades", () => {
  it("downloads each grade and the grades either side when idle, then caches them for offline", async () => {
    const idle = vi.fn();
    vi.stubGlobal("requestIdleCallback", idle);
    prefetchGrades([t("k"), t("4"), t("5"), t("9", "ca-on")]);
    expect(loadGrade).not.toHaveBeenCalled();
    expect(idle.mock.calls[0][1]).toEqual({ timeout: 10_000 });
    idle.mock.calls[0][0]();
    expect(loadGrade.mock.calls.map(([g, f]) => `${f}:${g}`).sort()).toEqual(
      ["ca-bc:k", "ca-bc:1", "ca-bc:3", "ca-bc:4", "ca-bc:5", "ca-bc:6", "ca-on:8", "ca-on:9"].sort(),
    );
    await vi.waitFor(() => expect(cacheLoadedScripts).toHaveBeenCalledOnce());
  });

  it("caches what did arrive even when some grades fail", async () => {
    vi.useFakeTimers();
    loadGrade.mockRejectedValueOnce(new Error("offline"));
    prefetchGrades([t("2")]);
    await vi.advanceTimersByTimeAsync(2999);
    expect(loadGrade).not.toHaveBeenCalled();
    await vi.advanceTimersByTimeAsync(1);
    expect(loadGrade).toHaveBeenCalledTimes(3);
    await vi.advanceTimersByTimeAsync(0);
    expect(cacheLoadedScripts).toHaveBeenCalledOnce();
  });
});
