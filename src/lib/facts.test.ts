import { describe, expect, it } from "vitest";
import { withSeed } from "@/content/random";
import { checkQuestion } from "@/content/fairness/question";
import { GRADE_ORDER } from "@/content/subjects";
import { FACT_SETS, factKnown, factQuestion, factSetsFor, factSummary, factsIn, factText, factWeight, getFactSet, parseFact, pickFact, type FactStat } from "./facts";

const stat = (...recent: boolean[]): FactStat => ({ attempts: recent.length, recent, lastT: Date.now() });

/** Works out "7 × 8 = ?" from the prompt itself, so the answer is checked against what the child reads. */
function solve(prompt: string): number {
  const m = /^(\d+) ([+−×÷]) (\d+) = \?$/.exec(prompt);
  if (!m) throw new Error(`not a fact prompt: ${prompt}`);
  const a = Number(m[1]);
  const b = Number(m[3]);
  return m[2] === "+" ? a + b : m[2] === "−" ? a - b : m[2] === "×" ? a * b : a / b;
}

describe("fact sets", () => {
  it("have 100 facts to 20 and to 10 × 10, and 45 to 10, each fact once", () => {
    const sizes = Object.fromEntries(FACT_SETS.map((s) => [s.id, factsIn(s.id).length]));
    expect(sizes).toEqual({ add10: 45, sub10: 45, add: 100, sub: 100, mul: 100, div: 100 });
    for (const s of FACT_SETS) expect(new Set(factsIn(s.id).map((f) => f.id)).size).toBe(factsIn(s.id).length);
  });

  it("keep the facts to 10 inside the facts to 20, so practice on one counts for both", () => {
    const add = new Set(factsIn("add").map((f) => f.id));
    const sub = new Set(factsIn("sub").map((f) => f.id));
    for (const f of factsIn("add10")) expect(add.has(f.id)).toBe(true);
    for (const f of factsIn("sub10")) expect(sub.has(f.id)).toBe(true);
  });

  it("stay within 20 for adding and taking away, and whole numbers for division", () => {
    for (const f of [...factsIn("add"), ...factsIn("sub")]) {
      expect(Math.max(f.a, f.b, f.answer)).toBeLessThanOrEqual(20);
      expect(f.answer).toBeGreaterThan(0);
    }
    for (const f of factsIn("add10")) expect(f.answer).toBeLessThanOrEqual(10);
    for (const f of factsIn("sub10")) expect(f.a).toBeLessThanOrEqual(10);
    for (const f of factsIn("div")) expect(f.a % f.b).toBe(0);
  });

  it("are offered by grade: none in Pre-K or Kindergarten, to 10 in Grades 1 and 2, times tables from Grade 3", () => {
    expect(factSetsFor("pk")).toEqual([]);
    expect(factSetsFor("k")).toEqual([]);
    expect(factSetsFor("1").map((s) => s.id)).toEqual(["add10", "sub10"]);
    expect(factSetsFor("2").map((s) => s.id)).toEqual(["add10", "sub10", "add", "sub"]);
    for (const g of GRADE_ORDER.slice(GRADE_ORDER.indexOf("3"))) expect(factSetsFor(g).map((s) => s.id)).toEqual(["add", "sub", "mul", "div"]);
  });

  it("each carry a short lesson for little kids", () => {
    for (const s of FACT_SETS) {
      expect(s.lesson.steps.length).toBeGreaterThanOrEqual(2);
      expect(s.lesson.steps.length).toBeLessThanOrEqual(4);
      for (const step of s.lesson.steps) expect(step.length, step).toBeLessThanOrEqual(80);
      expect(solve(s.lesson.example.question)).toBe(Number(s.lesson.example.answer));
    }
    expect(getFactSet("mul")?.title).toBe("Times tables");
    expect(getFactSet("nope")).toBeUndefined();
  });
});

describe("fact questions", () => {
  it("are fair, fit the keypad and have the right answer, in every grade that sees them", () => {
    for (const grade of GRADE_ORDER) {
      for (const s of factSetsFor(grade)) {
        for (const f of factsIn(s.id)) {
          const q = factQuestion(f);
          checkQuestion(q, { grade });
          expect(Number(q.answer), q.prompt).toBe(solve(q.prompt));
          expect(q.hint).not.toMatch(new RegExp(`= ${f.answer}\\b`));
          expect(q.speak).toMatch(/^What is \d+ (plus|minus|times|divided by) \d+\?$/);
        }
      }
    }
  });

  it("round-trip through their ids", () => {
    for (const s of FACT_SETS) for (const f of factsIn(s.id)) expect(parseFact(f.id)).toEqual(f);
    expect(parseFact("div:7:0")).toBeUndefined();
    expect(parseFact("div:7:2")).toBeUndefined();
    expect(parseFact("pow:2:3")).toBeUndefined();
    expect(factText(parseFact("mul:7:8")!)).toBe("7 × 8");
  });
});

describe("knowing a fact", () => {
  it("takes the last two tries right the first time", () => {
    expect(factKnown(undefined)).toBe(false);
    expect(factKnown(stat(true))).toBe(false);
    expect(factKnown(stat(true, true))).toBe(true);
    expect(factKnown(stat(true, true, false))).toBe(false);
    expect(factKnown(stat(false, true, true))).toBe(true);
  });

  it("is counted per set, with the latest misses as tricky facts", () => {
    const facts = { "mul:7:8": stat(true, true), "mul:6:9": { ...stat(false), lastT: 5 }, "mul:3:4": { ...stat(true, false), lastT: 9 }, "add:2:2": stat(true, true) };
    const s = factSummary(getFactSet("mul")!, facts);
    expect(s).toMatchObject({ total: 100, known: 1, tried: 3 });
    expect(s.tricky.map((f) => f.id)).toEqual(["mul:3:4", "mul:6:9"]);
  });
});

describe("picking the next fact", () => {
  const now = Date.now();

  it("brings missed facts back more often than new or known ones", () => {
    const facts = { "mul:7:8": stat(false), "mul:6:6": stat(true, true) };
    const missed = factWeight(parseFact("mul:7:8")!, facts, 1, now);
    const fresh = factWeight(parseFact("mul:2:3")!, facts, 1, now);
    const known = factWeight(parseFact("mul:6:6")!, facts, 1, now);
    expect(missed).toBeGreaterThan(fresh);
    expect(fresh).toBeGreaterThan(known);
    // A known fact not seen for a few days comes back a little more.
    expect(factWeight(parseFact("mul:6:6")!, { "mul:6:6": { ...stat(true, true), lastT: now - 4 * 86_400_000 } }, 1, now)).toBeGreaterThan(known);
  });

  it("slows down new facts while a handful are still being learned", () => {
    expect(factWeight(parseFact("mul:2:3")!, {}, 8, now)).toBeLessThan(factWeight(parseFact("mul:2:3")!, {}, 0, now));
  });

  it("asks a missed fact far more often in a round", () => {
    const facts = { "mul:7:8": stat(false) };
    const picks = withSeed(42, () => Array.from({ length: 2000 }, () => pickFact("mul", facts, [], now).id));
    const missed = picks.filter((id) => id === "mul:7:8").length;
    // Evenly, each fact would come up about 20 times in 2000.
    expect(missed).toBeGreaterThan(40);
  });

  it("never repeats one of the last few facts asked, and stays in its set", () => {
    const recent = ["add:1:1", "add:1:2", "add:2:1", "add:3:4", "add:5:5"];
    withSeed(7, () => {
      for (let i = 0; i < 500; i++) {
        const f = pickFact("add10", {}, recent, now);
        expect(recent).not.toContain(f.id);
        expect(f.op).toBe("add");
        expect(f.answer).toBeLessThanOrEqual(10);
      }
    });
  });
});
