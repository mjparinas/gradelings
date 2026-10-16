import { afterEach, describe, expect, it, vi } from "vitest";
import { addedMessage, agoText, call, checkNameList, classBadge, classInsights, homeworkDone, mostMissed, studentQuestions, homeworkOverview, isHomeworkDone, type StudentRow } from "./classroom";

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

describe("most-missed questions", () => {
  const ans = (unit: string, q: string | undefined, correct: boolean, t = 100) => ({ type: "answer", unit, q, correct, t });

  it("reads one student's questions on the assigned units since they were assigned", () => {
    const since = { "3/math/a": 50 };
    const r = studentQuestions(
      [ans("3/math/a", "7 + 5", false), ans("3/math/a", "7 + 5", true), ans("3/math/a", "2 + 2", true), ans("3/math/a", undefined, false), ans("3/math/a", "old", false, 10), ans("3/math/b", "other", false), { type: "session", t: 100 }],
      since,
    );
    // A miss on any try counts for the student; questions without text, from before the assignment or off the list are left out.
    expect(r).toEqual({ "3/math/a": { "7 + 5": true, "2 + 2": false } });
  });

  it("lists, per unit, questions at least two students missed, worst first, three at most", () => {
    const stu = (qs: Record<string, boolean>) => ({ u: qs });
    const out = mostMissed([stu({ a: true, b: true, c: false, d: true }), stu({ a: true, b: false, c: true, d: true }), stu({ a: true, b: true, c: true, d: true, e: true }), stu({ a: false, d: true })]);
    expect(out.u.map((m) => [m.q, m.missed, m.tried])).toEqual([["d", 4, 4], ["a", 3, 4], ["b", 2, 3]]);
    // One student missing a question isn't a pattern.
    expect(mostMissed([stu({ x: true }), stu({ x: false })])).toEqual({});
  });
});

describe("checkNameList", () => {
  it("reads one name per line", () => {
    expect(checkNameList("Maya\n Sam \n\nAlex P.\r\n")).toEqual({ names: ["Maya", "Sam", "Alex P."], warnings: [] });
  });

  it("still reads a single line of names separated by commas", () => {
    expect(checkNameList("Maya, Sam, Alex").names).toEqual(["Maya", "Sam", "Alex"]);
  });

  it("warns about Last, First lines from a spreadsheet instead of splitting them", () => {
    const { names, warnings } = checkNameList("Smith, Maya\nOkafor, Sam\nLee, Jo");
    expect(names).toEqual(["Smith, Maya", "Okafor, Sam", "Lee, Jo"]);
    expect(warnings).toHaveLength(2);
    expect(warnings[0]).toContain("“Smith, Maya” has a comma");
  });

  it("warns when two students would share a name, or match one already in the class, ignoring case", () => {
    expect(checkNameList("Maya\nmaya\nSam").warnings[0]).toContain("“maya”");
    expect(checkNameList("Sam\nJo", ["sam"]).warnings[0]).toContain("“Sam”");
    expect(checkNameList("Maya P.\nMaya R.", ["Maya"]).warnings).toEqual([]);
  });
});

describe("addedMessage", () => {
  it("counts the students added and says why any were left out", () => {
    expect(addedMessage(1, 0, 40)).toBe("Added 1 student.");
    expect(addedMessage(28, 0, 40)).toBe("Added 28 students.");
    expect(addedMessage(2, 1, 40)).toBe("Added 2 students. 1 wasn’t added because a class holds up to 40 students.");
    expect(addedMessage(2, 3, 40)).toContain("3 weren’t added");
  });
});

describe("class list badges", () => {
  const now = 10 * 86_400_000;
  const stu = (id: string, lastActive: number | null, accuracy = 0.9): StudentRow => ({ profileId: id, name: id, avatar: "otter", grade: "3", lastActive, units: [{ key: "3/math/a", level: 1, attempts: 10, accuracy, done: 0 }] });

  it("counts students to check in with, units past due and the latest practice", () => {
    const students = [stu("Ana", now - 3_600_000), stu("Ben", now - 9 * 86_400_000), stu("Cy", null)];
    const b = classBadge(students, ["3/math/a"], { "3/math/a": now - 1000 }, {}, now);
    expect(b).toEqual({ checkIn: 2, pastDue: 1, lastPractice: now - 3_600_000 });
  });

  it("has no last practice and nothing to check when no work is assigned", () => {
    expect(classBadge([stu("Ana", null)], [], {}, {}, now)).toEqual({ checkIn: 0, pastDue: 0, lastPractice: null });
  });
});

describe("agoText", () => {
  const now = 100 * 86_400_000;
  it("says how long ago in a few plain words", () => {
    expect(agoText(now - 10_000, now)).toBe("just now");
    expect(agoText(now - 60_000, now)).toBe("1 minute ago");
    expect(agoText(now - 5 * 60_000, now)).toBe("5 minutes ago");
    expect(agoText(now - 3 * 3_600_000, now)).toBe("3 hours ago");
    expect(agoText(now - 86_400_000, now)).toBe("1 day ago");
    expect(agoText(now - 40 * 86_400_000, now)).toBe("1 month ago");
    expect(agoText(now + 5000, now)).toBe("just now");
  });
});
