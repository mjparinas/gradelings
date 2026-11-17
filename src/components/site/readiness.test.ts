import { describe, expect, it } from "vitest";
import { worksheetGrades } from "./worksheets";
import { READY_GRADES, READY_QUESTIONS, READY_BAND_TEXT, previousGrade, readinessQuestions, readyBand, readyFaqs, readyPath } from "./readiness";

describe("math readiness checks", () => {
  it("cover Grades 1 to 9, each from the grade before and with a math worksheet grade to point at", () => {
    const have = worksheetGrades();
    for (const g of READY_GRADES) {
      const prev = previousGrade(g)!;
      expect(prev, g).toBeTruthy();
      expect(have, g).toContain(prev);
    }
  });

  it("have ten fair, text-only questions in each grade: the answer is among different choices, and the skill and its worksheet are named", () => {
    for (const g of READY_GRADES) {
      const qs = readinessQuestions(g);
      expect(qs, g).toHaveLength(READY_QUESTIONS);
      expect(new Set(qs.map((q) => q.prompt)).size, g).toBe(qs.length);
      for (const q of qs) {
        const ids = q.choices.map((c) => c.id);
        if (q.typed) {
          expect(ids, q.prompt).toHaveLength(0);
          expect(q.typed.accept, q.prompt).toContain(q.answer);
        } else expect(ids, q.prompt).toContain(q.answer);
        expect(new Set(ids).size, q.prompt).toBe(ids.length);
        expect(new Set(q.choices.map((c) => c.label)).size, q.prompt).toBe(q.choices.length);
        expect(q.hint.length, q.prompt).toBeGreaterThan(0);
        expect(q.skill.length).toBeGreaterThan(0);
        expect(q.skillPath).toMatch(/^\/worksheets\/.+\/$/);
      }
    }
  });

  it("is region-free: no question names money, a province or a country", () => {
    const bad = /\$|¢|canad|province|ontario|alberta|\bbc\b|toonie|loonie/i;
    for (const g of READY_GRADES) for (const q of readinessQuestions(g)) expect(bad.test(JSON.stringify(q)), q.prompt).toBe(false);
  });

  it("is the same on every build", () => {
    expect(readinessQuestions("4")).toEqual(readinessQuestions("4"));
  });

  it("puts a score in a band and has words for every band", () => {
    expect(readyBand(10, 10)).toBe("ready");
    expect(readyBand(9, 10)).toBe("ready");
    expect(readyBand(8, 10)).toBe("close");
    expect(readyBand(5, 10)).toBe("partly");
    expect(readyBand(2, 10)).toBe("reset");
    for (const b of ["ready", "close", "partly", "reset"] as const) {
      expect(READY_BAND_TEXT[b].title.length).toBeGreaterThan(0);
      // Practice, never a mark or a promise.
      expect(READY_BAND_TEXT[b].next).not.toMatch(/fail|behind|grade level/i);
    }
  });

  it("has addresses and answers for each grade", () => {
    expect(readyPath.grade("3")).toBe("/ready/grade-3/");
    for (const g of READY_GRADES) expect(readyFaqs(g).length).toBeGreaterThanOrEqual(3);
  });
});
