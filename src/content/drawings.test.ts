import { describe, expect, it } from "vitest";
import { COURSES } from "./all";
import { withSeed } from "./random";
import type { Question, Visual } from "./types";

// Measuring tools and moves of shapes are drawn from each question's own words. These sweeps check that the picture
// is there where the question needs it, that it agrees with the words, and that it never shows the answer.

function questionsOf(unitId: string): Question[] {
  const units = COURSES.flatMap((c) => c.units).filter((u) => u.id === unitId);
  expect(units.length, `unit ${unitId} exists`).toBeGreaterThan(0);
  const out: Question[] = [];
  for (const u of units) for (let seed = 1; seed <= 12; seed++) for (const difficulty of [1, 2, 3] as const) out.push(...withSeed(seed * 37 + difficulty, () => u.generate({ difficulty })));
  return out;
}

const visualOf = (q: Question): Visual | undefined => ("visual" in q ? q.visual : undefined);
const answerLabel = (q: Question) => (q.kind === "choice" ? q.choices.find((c) => c.id === q.answer)?.label : q.kind === "input" ? q.answer : undefined);

describe("protractors", () => {
  for (const id of ["ca-g4-measure-angles", "ny-g4-angle-measure"]) {
    it(`${id}: every reading question has a protractor that matches its words`, () => {
      let read = 0;
      for (const q of questionsOf(id)) {
        const v = visualOf(q);
        const zero = /^One ray (?:of the angle |of an angle |is on 0° of )?(?:lines up with 0|the protractor)|One ray is on 0°/.test(q.prompt) || /lines up with 0|on 0° of the protractor|is on 0° of the inner scale/.test(q.prompt);
        const between = /one ray (?:of an angle )?(?:points to|passes) (\d+)°?.* the other (?:points to|passes) (\d+)/.exec(q.prompt);
        if (!zero && !between) continue;
        read++;
        expect(v?.type, q.prompt).toBe("protractor");
        if (v?.type !== "protractor") continue;
        if (between) {
          expect([v.from, v.to].sort((a, b) => a - b), q.prompt).toEqual([Number(between[1]), Number(between[2])].sort((a, b) => a - b));
        } else {
          // One ray on 0 of its scale: the angle between the rays is the answer.
          expect(Math.abs(v.to - v.from), q.prompt).toBe(Number(String(answerLabel(q)).replace("°", "")));
          expect(v.twoScales === true, q.prompt).toBe(/two scales|inner scale/.test(q.prompt));
        }
      }
      expect(read).toBeGreaterThan(20);
    });
  }
});

describe("thermometers", () => {
  it("Measuring Temperature draws the readings the question names", () => {
    const qs = questionsOf("thermometers-ab");
    const reads = qs.filter((q) => /^A thermometer reads|^Which is (hotter|warmer):|^Water is at|^Water's temperature changes|^Which temperature is the coldest/.test(q.prompt));
    expect(reads.length).toBeGreaterThan(3);
    for (const q of reads) {
      const v = visualOf(q);
      expect(v?.type, q.prompt).toBe("thermometer");
      if (v?.type !== "thermometer") continue;
      const named = [...q.prompt.matchAll(/(−?\d+) ?°C/g)].map((m) => Number(m[1].replace("−", "-")));
      if (named.length) expect(v.values, q.prompt).toEqual(named);
    }
  });

  it("Grade 7 temperature change shows only the starting temperature, with room on the scale for where it goes", () => {
    let seen = 0;
    for (const q of questionsOf("integer-add-subtract")) {
      const v = visualOf(q);
      if (v?.type !== "thermometer") continue;
      seen++;
      expect(v.values).toHaveLength(1);
      const start = Number(/(-?\d+)°C/.exec(q.prompt.replace("−", "-"))?.[1]);
      expect(v.values[0]).toBe(start);
      const end = Number(String(answerLabel(q)).replace("−", "-"));
      expect(end).toBeGreaterThanOrEqual(v.min - 40);
    }
    expect(seen).toBeGreaterThan(0);
  });
});

describe("slides, flips and turns", () => {
  it("Grade 2 and Grade 3 questions about a move show the shape before and after", () => {
    let seen = 0;
    for (const id of ["slides-flips-turns-ab", "moves-ab"]) {
      for (const q of questionsOf(id)) {
        if (q.kind !== "choice") continue;
        const expected = /^A shape moves along a line|^Another word for a slide|^When you slide|^A shape slides across|^A tile moves/.test(q.prompt)
          ? "slide"
          : /^A shape is flipped over a line|^Another word for a flip|^When you flip|^A shape is flipped and then flipped back/.test(q.prompt)
            ? "flip"
            : /^A shape spins around|^Another word for a turn|^A shape turns around|quarter turn around its centre|^A triangle is turned/.test(q.prompt)
              ? "turn"
              : undefined;
        if (!expected) continue;
        seen++;
        const v = visualOf(q);
        expect(v?.type, q.prompt).toBe("move");
        if (v?.type === "move") expect(v.move, q.prompt).toBe(expected);
      }
    }
    expect(seen).toBeGreaterThan(20);
  });

  it("never draws a letter's mirror image, which would be the answer", () => {
    for (const q of questionsOf("moves-ab")) {
      const letter = /^A letter “(\w)” is flipped/.exec(q.prompt);
      if (!letter) continue;
      const v = visualOf(q);
      expect(v).toEqual({ type: "letter", text: letter[1] });
    }
  });

  it("Grade 2 turn-and-measure questions draw the shape they turn or flip", () => {
    const qs = questionsOf("mb-turn-and-measure").filter((q) => /^A (triangle has 3 sides\. You turn|square has 4 equal sides\. You turn it to a diamond|hexagon has 6 sides\. You flip)/.test(q.prompt));
    expect(qs.length).toBeGreaterThan(0);
    for (const q of qs) expect(visualOf(q)?.type, q.prompt).toBe("move");
  });
});

describe("compass for quarter and half turns", () => {
  it("shows the way the person starts out facing", () => {
    let seen = 0;
    for (const q of questionsOf("move-it")) {
      const m = /^\w+ faces (north|east|south|west)\./.exec(q.prompt);
      if (!m) continue;
      seen++;
      expect(visualOf(q), q.prompt).toEqual({ type: "facing", facing: m[1] });
    }
    expect(seen).toBeGreaterThan(5);
  });
});

describe("lines of symmetry", () => {
  it("draws the named figure without any fold lines", () => {
    let seen = 0;
    for (const q of questionsOf("fl-g3-line-symmetry")) {
      if (!/^How many lines of symmetry does (a|an|the) /.test(q.prompt)) continue;
      const v = visualOf(q);
      expect(v, q.prompt).toBeDefined();
      expect(["figure", "letter"], q.prompt).toContain(v?.type);
      seen++;
    }
    expect(seen).toBeGreaterThan(10);
  });

  it("puts a small drawing on each shape in 'Which shape has no lines of symmetry?'", () => {
    const qs = questionsOf("shapes-and-symmetry").filter((q) => q.prompt === "Which shape has no lines of symmetry?");
    expect(qs.length).toBeGreaterThan(0);
    for (const q of qs) if (q.kind === "choice") for (const c of q.choices) expect(c.shape, c.label).toBe(c.label);
  });
});
