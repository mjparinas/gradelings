// @vitest-environment jsdom
import { beforeEach, describe, expect, it } from "vitest";
import type { Profile } from "./model";
import { cardDismissed, dismissCard, gradeUpFor, gradeYearOf, isBackToSchool, isSummer, nextGrade, reportCardSeason, schoolYearLines, schoolYearOf, summerCardId, summerPeekFor } from "./schoolYear";

const at = (y: number, m: number, d: number) => new Date(y, m - 1, d, 12).getTime();
const kid = (over: Partial<Profile> = {}): Profile => ({ id: "a", name: "Ava", avatar: "ollie", colour: "#fff", grade: "4", framework: "ca-bc", createdAt: at(2026, 3, 1), updatedAt: 1, ...over });

beforeEach(() => localStorage.clear());

describe("the school year", () => {
  it("starts on August 1", () => {
    expect(schoolYearOf(at(2026, 7, 31))).toBe(2025);
    expect(schoolYearOf(at(2026, 8, 1))).toBe(2026);
    expect(schoolYearOf(at(2027, 6, 30))).toBe(2026);
  });

  it("knows the next grade, and that Grade 9 is the last", () => {
    expect(nextGrade("k")).toBe("1");
    expect(nextGrade("4")).toBe("5");
    expect(nextGrade("9")).toBeNull();
  });

  it("has a back-to-school window, a summer and report-card seasons", () => {
    expect(isBackToSchool(at(2026, 7, 31))).toBe(false);
    expect(isBackToSchool(at(2026, 8, 1))).toBe(true);
    expect(isBackToSchool(at(2026, 9, 30))).toBe(true);
    expect(isBackToSchool(at(2026, 10, 1))).toBe(false);
    expect(isSummer(at(2026, 6, 14))).toBe(false);
    expect(isSummer(at(2026, 6, 15))).toBe(true);
    expect(isSummer(at(2026, 8, 31))).toBe(true);
    expect(isSummer(at(2026, 9, 1))).toBe(false);
    expect(reportCardSeason(at(2026, 11, 20))).toBe("2026-fall");
    expect(reportCardSeason(at(2027, 2, 29 - 1))).toBe("2026-winter");
    expect(reportCardSeason(at(2027, 6, 10))).toBe("2026-spring");
    expect(reportCardSeason(at(2026, 10, 23))).toBeNull();
    expect(reportCardSeason(at(2027, 1, 5))).toBeNull();
  });
});

describe("moving up a grade", () => {
  it("asks once school starts, for a grade set last school year", () => {
    expect(gradeUpFor(kid(), at(2026, 8, 20))).toBe("5");
    expect(gradeUpFor(kid(), at(2026, 7, 20))).toBeNull(); // not yet
    expect(gradeUpFor(kid(), at(2026, 10, 5))).toBeNull(); // window over
  });

  it("counts a child from before gradeYear existed from when they were added", () => {
    expect(gradeYearOf(kid({ createdAt: at(2026, 8, 5) }))).toBe(2026);
    expect(gradeUpFor(kid({ createdAt: at(2026, 8, 5) }), at(2026, 8, 20))).toBeNull(); // added this school year
  });

  it("stops asking once the grade is set or kept for this year, and never for Grade 9", () => {
    expect(gradeUpFor(kid({ gradeYear: 2026 }), at(2026, 9, 2))).toBeNull();
    expect(gradeUpFor(kid({ gradeYear: 2025 }), at(2026, 9, 2))).toBe("5");
    expect(gradeUpFor(kid({ grade: "9" }), at(2026, 9, 2))).toBeNull();
    expect(gradeUpFor(kid({ deleted: true }), at(2026, 9, 2))).toBeNull();
  });
});

describe("summer sneak peek", () => {
  it("offers the next grade in summer only", () => {
    expect(summerPeekFor(kid(), at(2026, 7, 10))).toBe("5");
    expect(summerPeekFor(kid({ grade: "k" }), at(2026, 7, 10))).toBe("1");
    expect(summerPeekFor(kid(), at(2026, 9, 10))).toBeNull();
    expect(summerPeekFor(kid({ grade: "9" }), at(2026, 7, 10))).toBeNull();
    expect(summerCardId(at(2026, 7, 10))).toBe("summer-2026");
  });
});

describe("Got it", () => {
  it("hides one card on this device and keeps the list short", () => {
    expect(cardDismissed("2026-fall")).toBe(false);
    dismissCard("2026-fall");
    expect(cardDismissed("2026-fall")).toBe(true);
    expect(cardDismissed("2026-winter")).toBe(false);
    for (let i = 0; i < 20; i++) dismissCard(`x-${i}`);
    expect(JSON.parse(localStorage.getItem("gradelings.schoolYear")!)).toHaveLength(8);
  });
});

describe("weekly email lines", () => {
  it("asks about the grade on the first Sunday of August and of September only", () => {
    expect(schoolYearLines([kid()], at(2026, 8, 2))).toEqual(["New school year: is Ava starting Grade 5? You can move Ava up in one tap on the parent Overview."]);
    expect(schoolYearLines([kid()], at(2026, 8, 9))).toEqual([]);
    expect(schoolYearLines([kid()], at(2026, 9, 6))).toHaveLength(1);
    expect(schoolYearLines([kid({ gradeYear: 2026 })], at(2026, 9, 6))).toEqual([]);
  });

  it("uses US grade names for a US child", () => {
    expect(schoolYearLines([kid({ framework: "us-wa" })], at(2026, 8, 2))[0]).toContain("starting 5th grade?");
  });

  it("mentions the summer peek and report cards once, in the first week of each", () => {
    expect(schoolYearLines([kid()], at(2026, 6, 3))).toEqual([
      "Report cards often come home around now. The parent area has a printable conversation sheet with what to ask the teacher (it reflects practice, not a report-card mark).",
    ]);
    expect(schoolYearLines([kid()], at(2026, 6, 15))).toEqual(["Summer sneak peek: Ava can try Grade 5 lessons from the Lessons screen. Whatever they practise counts once they move up."]);
    expect(schoolYearLines([kid()], at(2026, 6, 22))).toEqual([]);
    expect(schoolYearLines([kid()], at(2026, 11, 12))).toHaveLength(1);
    expect(schoolYearLines([kid()], at(2026, 11, 19))).toEqual([]);
    expect(schoolYearLines([], at(2026, 11, 12))).toEqual([]);
  });
});
