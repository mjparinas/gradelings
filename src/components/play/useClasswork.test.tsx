// @vitest-environment jsdom
import { renderHook } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

const h = vi.hoisted(() => ({
  classwork: [] as { profileId: string; className: string; unitKeys: string[]; due?: Record<string, number>; goal?: Record<string, number>; since?: Record<string, number> }[],
  loaded: new Set(["3/math/add", "3/math/sub", "3/science/rocks"]),
}));

vi.mock("@/lib/store", () => ({
  useActiveProfile: () => ({ id: "p1" }),
  useStore: (select: (s: unknown) => unknown) => select({ classwork: h.classwork }),
}));
vi.mock("@/content", () => ({ getUnitRef: (key: string) => (h.loaded.has(key) ? { key } : undefined) }));

import { useClasswork } from "./useClasswork";

describe("useClasswork", () => {
  it("lists this child's assigned units in the teacher's order, once each, with due dates", () => {
    h.classwork = [
      { profileId: "p1", className: "Room 4", unitKeys: ["3/math/sub", "3/math/add"], due: { "3/math/add": 123 } },
      { profileId: "p2", className: "Room 9", unitKeys: ["3/science/rocks"] },
      { profileId: "p1", className: "Science club", unitKeys: ["3/math/add", "3/science/rocks"] },
    ];
    const { result } = renderHook(() => useClasswork());
    expect(result.current).toEqual([
      { ref: { key: "3/math/sub" }, className: "Room 4", dueAt: undefined, goal: undefined, since: undefined },
      { ref: { key: "3/math/add" }, className: "Room 4", dueAt: 123, goal: undefined, since: undefined },
      { ref: { key: "3/science/rocks" }, className: "Science club", dueAt: undefined, goal: undefined, since: undefined },
    ]);
  });

  it("carries the homework goal and when each unit was assigned", () => {
    h.classwork = [{ profileId: "p1", className: "Room 4", unitKeys: ["3/math/add"], goal: { "3/math/add": 10 }, since: { "3/math/add": 500 } }];
    const { result } = renderHook(() => useClasswork());
    expect(result.current[0]).toMatchObject({ goal: 10, since: 500 });
  });

  it("skips units from a grade that hasn't downloaded rather than guessing", () => {
    h.classwork = [{ profileId: "p1", className: "Room 4", unitKeys: ["4/math/fractions", "3/math/add"] }];
    const { result } = renderHook(() => useClasswork());
    expect(result.current.map((a) => a.ref.key)).toEqual(["3/math/add"]);
  });
});
