// @vitest-environment jsdom
import { act, renderHook } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("./localdb", () => ({ setKV: vi.fn(), putEvents: vi.fn(), deleteProfileEvents: vi.fn(), clearAll: vi.fn() }));

import { prefersReducedMotion } from "./juice";
import { defaultChildSettings, type AppEvent, type Profile } from "./model";
import { useActiveProfile, useChildSettings, useDerived, useProfiles, useReady, useStore, useTrophyName } from "./store";

const kid = (id: string, deleted = false): Profile => ({ id, name: id, avatar: "ollie", colour: "#fff", grade: "3", framework: "ca-bc", createdAt: 1, updatedAt: 1, deleted });
const answer = (id: string, profileId: string): AppEvent => ({ id, profileId, t: 1, type: "answer", unit: "math/3/add", correct: true, attempts: 1, revealed: false, ms: 1000, mode: "practice" });

beforeEach(() => {
  vi.stubGlobal("matchMedia", () => ({ matches: false }));
  act(() =>
    useStore.setState({
      ready: true,
      profiles: [kid("a"), kid("b"), kid("gone", true)],
      activeId: "a",
      settings: { a: defaultChildSettings("a", false), b: { ...defaultChildSettings("b", false), sound: false } },
      events: [answer("1", "a"), answer("2", "a"), answer("3", "b")],
    }),
  );
});

describe("store hooks", () => {
  it("list only children who weren't removed, and the active one", () => {
    expect(renderHook(() => useReady()).result.current).toBe(true);
    expect(renderHook(() => useProfiles()).result.current.map((p) => p.id)).toEqual(["a", "b"]);
    const active = renderHook(() => useActiveProfile());
    expect(active.result.current?.id).toBe("a");
    act(() => useStore.setState({ activeId: "gone" }));
    expect(active.result.current).toBeUndefined();
  });

  it("derive stats for the active child, or one named, and follow new events", () => {
    const active = renderHook(() => useDerived());
    const other = renderHook(() => useDerived("b"));
    expect(active.result.current.totals.answers).toBe(2);
    expect(other.result.current.totals.answers).toBe(1);
    act(() => useStore.setState({ events: [...useStore.getState().events, answer("4", "a")] }));
    expect(active.result.current.totals.answers).toBe(3);
    expect(renderHook(() => useDerived(null)).result.current.totals.answers).toBe(0);
  });

  it("read the active or a named child's settings", () => {
    expect(renderHook(() => useChildSettings()).result.current?.profileId).toBe("a");
    expect(renderHook(() => useChildSettings("b")).result.current?.sound).toBe(false);
    act(() => useStore.setState({ activeId: null }));
    expect(renderHook(() => useChildSettings()).result.current).toBeUndefined();
  });

  it("names trophies, falling back to the id", () => {
    expect(renderHook(() => useTrophyName("first-answer")).result.current).toBe("First Steps");
    expect(renderHook(() => useTrophyName("no-such")).result.current).toBe("no-such");
  });
});

describe("the active child's comfort settings reach the page", () => {
  it("puts calm, roomy and contrast classes on the page and calms motion", () => {
    const root = document.documentElement.classList;
    expect(root.contains("calm")).toBe(false);
    expect(prefersReducedMotion()).toBe(false);
    act(() => useStore.getState().updateSettings("a", { calmMotion: true, roomyText: true, highContrast: true }));
    expect([root.contains("calm"), root.contains("roomy"), root.contains("contrast")]).toEqual([true, true, true]);
    expect(prefersReducedMotion()).toBe(true);
    // Switching to a child without them takes them off again.
    act(() => useStore.getState().setActive("b"));
    expect([root.contains("calm"), root.contains("roomy"), root.contains("contrast")]).toEqual([false, false, false]);
    expect(prefersReducedMotion()).toBe(false);
  });

  it("puts the dyslexia font and one reading tint on the page, and takes them off for another child", () => {
    const root = document.documentElement.classList;
    act(() => useStore.getState().updateSettings("a", { dyslexiaFont: true, readingTint: "mint" }));
    expect([root.contains("dyslexic"), root.contains("tint-mint"), root.contains("tint-rose")]).toEqual([true, true, false]);
    act(() => useStore.getState().updateSettings("a", { readingTint: "rose" }));
    expect([root.contains("tint-mint"), root.contains("tint-rose")]).toEqual([false, true]);
    act(() => useStore.getState().setActive("b"));
    expect([root.contains("dyslexic"), root.contains("tint-rose")]).toEqual([false, false]);
  });
});
