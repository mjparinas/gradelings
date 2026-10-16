import { afterEach, describe, expect, it, vi } from "vitest";
import { call, classInsights, homeworkDone, homeworkOverview, isHomeworkDone, type StudentRow } from "./classroom";

const DAY = 86_400_000;
const NOW = 100 * DAY;
const unit = (key: string, attempts: number, accuracy: number, level = 0) => ({ key, attempts, accuracy, level });
const student = (profileId: string, units: StudentRow["units"], lastActive: number | null = NOW - DAY): StudentRow => ({ profileId, name: profileId.toUpperCase(), avatar: "ollie", grade: "3", lastActive, units });
const name = (k: string) => k.split("/")[2];

describe("classInsights", () => {
  it("leaves out students a unit wasn't given to", () => {
    const away = { ...unit("3/math/fractions", 0, 0, -1), assigned: false };
    const students = [
      student("a", [unit("3/math/fractions", 10, 0.4)]),
      student("b", [away], NOW - 30 * DAY),
      student("c", [{ ...unit("3/math/fractions", 10, 0.4), assigned: true }]),
    ];
    const r = classInsights(students, ["3/math/fractions"], name, NOW);
    // B isn't counted as "not started", and isn't told to check in on a week without practice on work they don't have.
    expect(r.units[0]).toMatchObject({ started: 2, notStarted: 0 });
    expect(r.units[0].needHand).toEqual(["a", "c"]);
    expect(r.checkIn.map((s) => s.name)).toEqual(["A", "C"]);
  });

  it("flags a unit when a good share of those who tried it are struggling", () => {
    const students = [
      student("a", [unit("3/math/fractions", 10, 0.4), unit("3/math/time", 10, 0.9, 2)]),
      student("b", [unit("3/math/fractions", 12, 0.5), unit("3/math/time", 8, 0.8, 2)]),
      student("c", [unit("3/math/fractions", 10, 0.9, 2), unit("3/math/time", 0, 0)]),
    ];
    const r = classInsights(students, ["3/math/fractions", "3/math/time"], name, NOW);
    expect(r.focusUnits.map((u) => u.key)).toEqual(["3/math/fractions"]);
    expect(r.units[0].needHand).toEqual(["a", "b"]);
    expect(r.units[1]).toMatchObject({ started: 2, notStarted: 1, proficient: 2 });
    expect(r.checkIn.map((s) => s.name)).toEqual(["A", "B"]);
    expect(r.checkIn[0].reasons[0]).toBe("Finding fractions tricky");
  });

  it("ignores a low score on too few questions", () => {
    const r = classInsights([student("a", [unit("3/math/time", 3, 0)])], ["3/math/time"], name, NOW);
    expect(r.focusUnits).toEqual([]);
    expect(r.checkIn).toEqual([]);
  });

  it("checks in with students who haven't practised in a week, or not at all", () => {
    const r = classInsights([student("a", [unit("3/math/time", 5, 0.9, 2)], NOW - 9 * DAY), student("b", [unit("3/math/time", 0, 0)], null)], ["3/math/time"], name, NOW);
    expect(r.checkIn).toEqual([
      { profileId: "a", name: "A", reasons: ["No practice this week"] },
      { profileId: "b", name: "B", reasons: ["Hasn’t started yet"] },
    ]);
  });

  it("flags no one when nothing is assigned", () => {
    expect(classInsights([student("a", [], null)], [], name, NOW).checkIn).toEqual([]);
  });
});

describe("call (teacher API helper)", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("sends JSON only when there is a body, with the session cookie", async () => {
    const fetchMock = vi.fn(async () => new Response(JSON.stringify({ classes: [] })));
    vi.stubGlobal("fetch", fetchMock);
    expect(await call("/api/classes/")).toEqual({ classes: [] });
    await call("/api/classes/", "POST", { name: "Room 4" });
    const [, get] = fetchMock.mock.calls[0] as unknown as [string, RequestInit];
    const [, post] = fetchMock.mock.calls[1] as unknown as [string, RequestInit];
    expect(get).toMatchObject({ method: "GET", credentials: "same-origin", headers: undefined, body: undefined });
    expect(post).toMatchObject({ method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ name: "Room 4" }) });
  });

  it("explains refusals, unreadable errors and a lost connection in plain words", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({ error: "That class is full." }), { status: 400 })));
    await expect(call("/api/classes/students/", "POST", {})).rejects.toThrow("That class is full.");
    vi.stubGlobal("fetch", vi.fn(async () => new Response("<html>", { status: 500 })));
    await expect(call("/api/classes/")).rejects.toThrow("Something went wrong (500).");
    vi.stubGlobal("fetch", vi.fn(async () => Promise.reject(new TypeError("Failed to fetch"))));
    await expect(call("/api/classes/")).rejects.toThrow(/offline/);
  });
});

describe("homeworkDone", () => {
  it("counts every answer on the unit since it was assigned, right or not", () => {
    const e = (unit: string, t: number, type = "answer") => ({ type, unit, t });
    const events = [e("3/math/add", 5), e("3/math/add", 10), e("3/math/add", 11), e("3/math/sub", 12), e("3/math/add", 13, "session")];
    expect(homeworkDone(events, "3/math/add", 10)).toBe(2);
    expect(homeworkDone(events, "3/math/add", 0)).toBe(3);
    expect(homeworkDone([], "3/math/add", 0)).toBe(0);
  });
});

describe("homework overview", () => {
  const hw = (key: string, level: number, done: number, assigned = true) => ({ key, level, attempts: done, accuracy: 0.5, done, assigned });

  it("counts a unit done by the questions asked for, or by reaching Proficient when none were", () => {
    expect(isHomeworkDone(hw("k", 0, 10), 10)).toBe(true);
    expect(isHomeworkDone(hw("k", 3, 4), 10)).toBe(false);
    expect(isHomeworkDone(hw("k", 2, 0))).toBe(true);
    expect(isHomeworkDone(hw("k", 1, 30))).toBe(false);
    expect(isHomeworkDone({ key: "k", level: -1, attempts: 0, accuracy: 0 })).toBe(false);
  });

  it("says how many are done, who is behind, and what is past due, leaving out students a unit wasn't given to", () => {
    const students = [
      student("a", [hw("u1", 0, 10), hw("u2", 2, 0)]),
      student("b", [hw("u1", 0, 3), hw("u2", 0, 0, false)]),
      student("c", [hw("u1", 0, 0), hw("u2", 0, 0)]),
    ];
    const [one, two] = homeworkOverview(students, ["u1", "u2"], { u1: NOW - DAY, u2: NOW + DAY }, { u1: 10 }, NOW);
    expect(one).toEqual({ key: "u1", assigned: 3, done: 1, behind: ["B", "C"], overdue: true });
    // Unit 2 isn't for B, is done by A, not by C, and isn't due yet.
    expect(two).toEqual({ key: "u2", assigned: 2, done: 1, behind: ["C"], overdue: false });
  });

  it("isn't overdue once everyone is done, or with no due date", () => {
    const students = [student("a", [hw("u1", 0, 10)])];
    expect(homeworkOverview(students, ["u1"], { u1: NOW - DAY }, { u1: 10 }, NOW)[0].overdue).toBe(false);
    expect(homeworkOverview([student("a", [hw("u1", 0, 0)])], ["u1"], {}, { u1: 10 }, NOW)[0].overdue).toBe(false);
  });
});
