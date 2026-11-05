import { describe, expect, it } from "vitest";
import { endWord, mightRhyme, RHYMES, rhymeQuestion, rhymeQuiz } from "./rhymes";

describe("rhymes", () => {
  it("has twelve unique rhymes of four couplets", () => {
    expect(RHYMES).toHaveLength(12);
    expect(new Set(RHYMES.map((r) => r.id)).size).toBe(RHYMES.length);
    expect(new Set(RHYMES.map((r) => r.title)).size).toBe(RHYMES.length);
    for (const r of RHYMES) {
      expect(r.lines, r.id).toHaveLength(8);
      expect(r.pairs, r.id).toHaveLength(4);
    }
  });

  it("ends each couplet's two lines with its declared rhyming words", () => {
    for (const r of RHYMES) {
      r.pairs.forEach(([a, b], i) => {
        expect(endWord(r.lines[2 * i]), `${r.id} line ${2 * i}`).toBe(a);
        expect(endWord(r.lines[2 * i + 1]), `${r.id} line ${2 * i + 1}`).toBe(b);
        expect(a).not.toBe(b);
      });
    }
  });

  it("is short, plain and the same for every province and state", () => {
    const text = RHYMES.flatMap((r) => [r.title, ...r.lines]).join(" ");
    expect(text).not.toMatch(/curriculum|province|state\b|canad|america|\$|¢|dollar|christmas|halloween|easter|colour|metre|litre/i);
    for (const r of RHYMES) for (const l of r.lines) expect(l.length, l).toBeLessThanOrEqual(48);
  });

  it("asks which word rhymes, with one right choice and two clear misses", () => {
    for (const r of RHYMES) {
      r.pairs.forEach(([ask, right], i) => {
        for (const seed of ["a", "b", "c"]) {
          const q = rhymeQuestion(r, i, seed);
          expect(q.choices).toHaveLength(3);
          expect(new Set(q.choices).size).toBe(3);
          expect(q.choices[q.answer]).toBe(right);
          expect(q.prompt).toContain(ask);
          for (const c of q.choices.filter((_, j) => j !== q.answer)) {
            expect(mightRhyme(c, ask), `${c} vs ${ask}`).toBe(false);
            expect(mightRhyme(c, right), `${c} vs ${right}`).toBe(false);
          }
        }
      });
    }
  });

  it("picks two different couplets for a quiz, the same each time for a seed", () => {
    for (const r of RHYMES) {
      const quiz = rhymeQuiz(r, "s1");
      expect(quiz).toHaveLength(2);
      expect(quiz[0].prompt).not.toBe(quiz[1].prompt);
      expect(rhymeQuiz(r, "s1")).toEqual(quiz);
    }
  });
});
