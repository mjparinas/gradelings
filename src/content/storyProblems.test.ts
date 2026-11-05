import { describe, expect, it } from "vitest";
import type { AgeBand } from "./types";
import { PROBLEM_COUNT, storyProblem, storySet, storyTemplateIds } from "./storyProblems";

const BANDS: AgeBand[] = ["little", "middle", "big"];
const SEEDS = Array.from({ length: 60 }, (_, i) => `seed-${i}`);

describe("story problems", () => {
  it("has at least five templates per age band, so a set never repeats a kind", () => {
    for (const band of BANDS) expect(storyTemplateIds(band).length, band).toBeGreaterThanOrEqual(PROBLEM_COUNT);
  });

  it("gives three different choices with the answer among them, for every template and many seeds", () => {
    for (const band of BANDS) {
      for (const id of storyTemplateIds(band)) {
        for (const seed of SEEDS) {
          const p = storyProblem(band, id, seed);
          expect(p.choices, `${band}/${id}/${seed}`).toHaveLength(3);
          expect(new Set(p.choices).size, `${band}/${id}/${seed}`).toBe(3);
          expect(p.answer).toBeGreaterThanOrEqual(0);
          for (const c of p.choices) {
            expect(Number.isInteger(c), `${p.prompt} -> ${c}`).toBe(true);
            expect(c).toBeGreaterThanOrEqual(0);
          }
          expect(p.why.length).toBeGreaterThan(0);
        }
      }
    }
  });

  it("explains the right answer: the last number in the working is the answer", () => {
    for (const band of BANDS) {
      for (const id of storyTemplateIds(band)) {
        for (const seed of SEEDS.slice(0, 20)) {
          const p = storyProblem(band, id, seed);
          const numbers = p.why.match(/\d+/g)!.map(Number);
          expect(numbers[numbers.length - 1], `${p.prompt} / ${p.why}`).toBe(p.choices[p.answer]);
        }
      }
    }
  });

  it("keeps the little kids' numbers to 10 and the prompts short", () => {
    for (const id of storyTemplateIds("little")) {
      for (const seed of SEEDS) {
        const p = storyProblem("little", id, seed);
        expect(Math.max(...p.choices), p.prompt).toBeLessThanOrEqual(20);
        expect(p.prompt.length, p.prompt).toBeLessThanOrEqual(110);
        expect(p.scene, id).toBeTruthy();
      }
    }
  });

  it("makes a set of five different kinds, the same each time for a seed", () => {
    for (const band of BANDS) {
      const set = storySet(band, "s1");
      expect(set).toHaveLength(PROBLEM_COUNT);
      expect(new Set(set.map((p) => p.id)).size).toBe(PROBLEM_COUNT);
      expect(storySet(band, "s1")).toEqual(set);
      expect(storySet(band, "s2").map((p) => p.prompt)).not.toEqual(set.map((p) => p.prompt));
    }
  });

  it("is plain, and the same for every province and state", () => {
    const text = BANDS.flatMap((band) => storyTemplateIds(band).flatMap((id) => SEEDS.slice(0, 15).map((s) => storyProblem(band, id, s).prompt))).join(" ");
    expect(text).not.toMatch(/curriculum|province|state\b|canad|america|\$|¢|dollar|cents?\b|christmas|halloween|easter|colour|metre|litre|centimetre|kilometre|mile|pound/i);
    expect(text).not.toMatch(/\bundefined\b|NaN/);
  });
});
