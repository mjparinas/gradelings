import { describe, expect, it } from "vitest";
import { FACT_SETS, factsIn } from "@/lib/facts";
import { MATH_FACTS_PAGES, factChart, factQuizzes, factSetOf, mathFactsBySlug } from "./mathFacts";

describe("math facts pages", () => {
  it("has one page for each fact set in the app, with unique slugs", () => {
    expect(MATH_FACTS_PAGES.map((p) => p.set).sort()).toEqual(FACT_SETS.map((s) => s.id).sort());
    expect(new Set(MATH_FACTS_PAGES.map((p) => p.slug)).size).toBe(MATH_FACTS_PAGES.length);
    for (const p of MATH_FACTS_PAGES) expect(mathFactsBySlug(p.slug)).toBe(p);
  });

  it("asks three fair questions per page: the right answer is among four different choices", () => {
    for (const p of MATH_FACTS_PAGES) {
      const quizzes = factQuizzes(p);
      expect(quizzes).toHaveLength(3);
      for (const q of quizzes) {
        const ids = q.choices.map((c) => c.id);
        expect(new Set(ids).size, q.prompt).toBe(4);
        expect(ids, q.prompt).toContain(q.answer);
        expect(ids.every((id) => Number(id) >= 0)).toBe(true);
        expect(q.hint.length).toBeGreaterThan(0);
        const m = /^(\d+) ([+−×÷]) (\d+) = \?$/.exec(q.prompt)!;
        const [a, b] = [Number(m[1]), Number(m[3])];
        expect(Number(q.answer), q.prompt).toBe(m[2] === "+" ? a + b : m[2] === "−" ? a - b : m[2] === "×" ? a * b : a / b);
      }
    }
  });

  it("charts only adding and times sets, with the right answers and blanks only where the set has no fact", () => {
    for (const p of MATH_FACTS_PAGES) {
      const chart = factChart(p);
      const op = factSetOf(p).op;
      if (op === "sub" || op === "div") {
        expect(chart).toBeNull();
        continue;
      }
      expect(chart).not.toBeNull();
      let filled = 0;
      chart!.rows.forEach((row, r) =>
        row.forEach((v, c) => {
          if (v === null) return;
          filled++;
          expect(v).toBe(op === "add" ? r + 1 + c + 1 : (r + 1) * (c + 1));
        }),
      );
      expect(filled).toBe(factsIn(p.set).length);
    }
  });

  it("writes pages with no Canadian-only or region wording", () => {
    const text = JSON.stringify(MATH_FACTS_PAGES);
    expect(text).not.toMatch(/curriculum|province|state|colour|centre/i);
  });
});
