// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import { clearUnfinished, loadUnfinished, resumeHref, saveUnfinished, unfinishedFor, validUnfinished, type Unfinished } from "./resume";

const NOW = new Date(2026, 9, 31, 15, 0).getTime();
const HOUR = 3600_000;
const lesson = (over: Partial<Unfinished> = {}): Unfinished => ({
  mode: "practice",
  scope: "3/math/add",
  title: "Adding",
  icon: "➕",
  results: [true, false, true],
  total: 8,
  ms: 60_000,
  at: NOW - HOUR,
  ...over,
});

beforeEach(() => localStorage.clear());

describe("unfinished lessons", () => {
  it("keeps a lesson left partway for 48 hours", () => {
    expect(validUnfinished(lesson(), NOW)).not.toBeNull();
    expect(validUnfinished(lesson({ at: NOW - 47 * HOUR }), NOW)).not.toBeNull();
    expect(validUnfinished(lesson({ at: NOW - 48 * HOUR }), NOW)).toBeNull();
    expect(validUnfinished(lesson({ at: NOW + HOUR }), NOW)).toBeNull();
  });

  it("forgets lessons with nothing answered, or nothing left", () => {
    expect(validUnfinished(lesson({ results: [] }), NOW)).toBeNull();
    expect(validUnfinished(lesson({ results: Array(8).fill(true) }), NOW)).toBeNull();
  });

  it("only keeps modes with a fixed length and no clock", () => {
    for (const mode of ["practice", "daily", "review", "facts"] as const) expect(validUnfinished(lesson({ mode }), NOW)).not.toBeNull();
    for (const mode of ["adventure", "speed", "challenge"] as const) expect(validUnfinished(lesson({ mode }), NOW)).toBeNull();
  });

  it("lets a Daily Challenge be finished the same day only", () => {
    expect(validUnfinished(lesson({ mode: "daily", at: NOW - 2 * HOUR }), NOW)).not.toBeNull();
    expect(validUnfinished(lesson({ mode: "daily", at: NOW - 16 * HOUR }), NOW)).toBeNull();
  });

  it("saves, loads and clears per child", () => {
    saveUnfinished("p1", lesson());
    expect(loadUnfinished("p1", NOW)?.results).toEqual([true, false, true]);
    expect(loadUnfinished("p2", NOW)).toBeNull();
    expect(unfinishedFor("p1", "practice", "3/math/add", NOW)).not.toBeNull();
    expect(unfinishedFor("p1", "practice", "3/math/sub", NOW)).toBeNull();
    expect(unfinishedFor("p1", "review", "3/math/add", NOW)).toBeNull();
    clearUnfinished("p1");
    expect(loadUnfinished("p1", NOW)).toBeNull();
  });

  it("ignores a saved value it can't read", () => {
    localStorage.setItem("grademap.resume.p1", "{oops");
    expect(loadUnfinished("p1", NOW)).toBeNull();
    localStorage.setItem("grademap.resume.p1", JSON.stringify({ mode: "practice" }));
    expect(loadUnfinished("p1", NOW)).toBeNull();
  });

  it("links back into the same lesson", () => {
    expect(resumeHref(lesson())).toBe("#/session?mode=practice&scope=3%2Fmath%2Fadd&resume=1");
  });
});
