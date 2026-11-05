import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { checkQuestion } from "../fairness/question";
import { coursesInFramework } from "../index";
import { hashSeed, withSeed } from "../random";
import type { MistakeQuestion, Question } from "../types";
import { withRich } from "./index";
import { betweenZeroAndNegativeOne, distributeMistake, exponentLaws, fractionAddMistake, linearEquationMistake, perfectSquares, rightTriangles, decimalFractions, equalFractions, fractionDecimals, fractionWords, integerLineMistake, mixedNumberMistake, multiplyMistake, oneStepMistake, percentFractions, twoStepMistake, equivalentFill } from "./questions";
import { RICH } from "./units";

const seeds = Array.from({ length: 12 }, (_, i) => i);
const levels = [1, 2, 3] as const;
const gradeId = (g: string) => (/^g\d$/.test(g) ? g.slice(1) : g);

describe("units that mix in newer question kinds", () => {
  for (const [grade, units] of Object.entries(RICH)) {
    for (const [path, source] of Object.entries(units)) {
      it(`${grade} ${path} keeps its questions and adds the newer kind`, () => {
        const [subject, unitId] = path.split("/");
        const course = coursesInFramework(COURSES, "ca-bc").find((c) => String(c.grade) === gradeId(grade) && c.subject === subject);
        const unit = course?.units.find((u) => u.id === unitId);
        expect(unit, path).toBeDefined();
        const expected = withSeed(1, () => source({ difficulty: 2 }))[0].kind;
        for (const s of seeds) {
          for (const difficulty of levels) {
            const qs = withSeed(hashSeed(`${path}:${s}:${difficulty}`), () => unit!.generate({ difficulty }));
            expect(qs.length).toBeGreaterThanOrEqual(6);
            expect(qs.filter((q) => q.kind === expected).length, `${path} should ask ${expected} questions`).toBeGreaterThan(0);
            for (const q of qs) checkQuestion(q, course!);
          }
        }
      });
    }
  }

  it("leaves a unit alone when it isn't listed, and keeps the count", () => {
    const course = COURSES.find((c) => c.grade === "3" && c.subject === "math")!;
    const plain = withRich([course], {})[0];
    expect(plain.units).toEqual(course.units);
    const unit = course.units.find((u) => u.id === "multiplication")!;
    const rich = withRich([course], { "math/multiplication": multiplyMistake })[0].units.find((u) => u.id === "multiplication")!;
    const a = withSeed(5, () => unit.generate({ difficulty: 2 }));
    const b = withSeed(5, () => rich.generate({ difficulty: 2 }));
    expect(b.length).toBe(a.length);
    expect(b.filter((q) => q.kind === "mistake").length).toBe(1);
  });
});

// The step with the mistake must be the only one that doesn't follow from the steps before it.
function wrongSteps(q: MistakeQuestion, kind: "multiply" | "oneStep" | "twoStep"): number[] {
  const bad: number[] = [];
  const s = q.steps;
  if (kind === "multiply") {
    const [, n, m] = s[0].match(/^(\d+) × (\d+) =/)!.map(Number);
    const rest = m - 5;
    const five = Number(s[1].split("= ")[1]);
    const part = Number(s[2].split("= ")[1]);
    const [lhs, total] = s[3].split(" = ");
    if (five !== n * 5) bad.push(1);
    if (part !== n * rest) bad.push(2);
    if (Number(lhs.split(" + ")[0]) !== five || Number(lhs.split(" + ")[1]) !== part || Number(total) !== five + part) bad.push(3);
  } else if (kind === "oneStep") {
    const [, a, b] = s[0].match(/^x \+ (\d+) = (\d+)$/)!.map(Number);
    const op = s[1].split("=")[1].includes("+") ? "+" : "−";
    if (s[1] !== `x + ${a} − ${a} = ${b} ${op} ${a}` || op === "+") bad.push(1);
    // Each step is judged on its own: step 3 must follow from what step 2 says.
    if (s[2] !== `x = ${op === "+" ? b + a : b - a}`) bad.push(2);
  } else {
    const [, p, a, b] = s[0].match(/^(\d+)x \+ (\d+) = (\d+)$/)!.map(Number);
    const op2 = s[1].includes("+") ? "+" : "−";
    const v = op2 === "+" ? b + a : b - a;
    if (op2 !== "−" || s[1] !== `${p}x = ${b} ${op2} ${a}`) bad.push(1);
    const v3 = Number(s[2].split("= ")[1]);
    if (v3 !== v) bad.push(2);
    const op4 = s[3].includes("×") ? "×" : "÷";
    if (s[3] !== `x = ${v3} ${op4} ${p}` || op4 === "×") bad.push(3);
    const v5 = Number(s[4].split("= ")[1]);
    if (v5 !== (op4 === "×" ? v3 * p : v3 / p)) bad.push(4);
  }
  return bad;
}

describe("find-the-mistake generators", () => {
  const cases = [
    ["multiply", multiplyMistake],
    ["oneStep", oneStepMistake],
    ["twoStep", twoStepMistake],
  ] as const;
  for (const [kind, make] of cases) {
    it(`${kind}: exactly one step is wrong and it is the marked one`, () => {
      for (let s = 0; s < 200; s++) {
        const q = withSeed(s, () => make())[0] as MistakeQuestion;
        expect(wrongSteps(q, kind), `${q.steps.join(" | ")}`).toEqual([q.wrong]);
      }
    });
  }

  it("equivalent fraction blanks are right", () => {
    for (let s = 0; s < 100; s++) {
      const q = withSeed(s, () => equivalentFill())[0];
      if (q.kind !== "fill") throw new Error("not fill");
      const m = q.text.match(/^(\d+)\/(\d+) = ___\/(\d+) = ___\/(\d+)$/)!.map(Number);
      expect(q.answers).toEqual([String((m[1] * m[3]) / m[2]), String((m[1] * m[4]) / m[2])]);
    }
  });
});

describe("question kinds shape", () => {
  it("every rich question is one of the new kinds", () => {
    const kinds = new Set<Question["kind"]>();
    for (const units of Object.values(RICH)) for (const source of Object.values(units)) for (const q of withSeed(3, () => source({ difficulty: 2 }))) kinds.add(q.kind);
    expect([...kinds].sort()).toEqual(["fill", "highlight", "match", "mistake", "multi", "say", "tiles"]);
  });
});

describe("every framework gets the same mixed-in questions", () => {
  it("Pre-K and Kindergarten counting asks say-it questions in every framework that has the unit", () => {
    const frameworks = [...new Set(COURSES.flatMap((c) => Object.keys(c.bigIdeas ?? {})))];
    expect(frameworks.length).toBeGreaterThan(5);
    const missing: string[] = [];
    for (const f of frameworks) {
      for (const [grade, id] of [["pk", "count-to-5"], ["k", "count-to-10"]]) {
        const unit = coursesInFramework(COURSES, f as never).find((c) => String(c.grade) === grade && c.subject === "math")?.units.find((u) => u.id === id);
        if (!unit) continue;
        let found = 0;
        for (let s = 0; s < 4; s++) found += withSeed(s, () => unit.generate({ difficulty: 2 })).filter((q) => q.kind === "say").length;
        if (!found) missing.push(`${f}/${grade}/${id}`);
      }
    }
    expect(missing).toEqual([]);
  });
});

describe("fraction, decimal and number-line questions", () => {
  const value = (t: string) => (t.includes("/") ? Number(t.split("/")[0]) / Number(t.split("/")[1]) : t.endsWith("%") ? Number(t.slice(0, -1)) / 100 : Number(t));
  it("equal-fraction choices: the right ones are equal and no wrong one is", () => {
    for (let s = 0; s < 200; s++)
      withSeed(s, () => {
        const q = equalFractions()[0];
        if (q.kind !== "multi") throw new Error("kind");
        const target = value(/equal to (\d+\/\d+)/.exec(q.prompt)![1]);
        for (const c of q.choices) expect(q.answers.includes(c.id), `${q.prompt} ${c.label}`).toBe(Math.abs(value(c.label) - target) < 1e-9);
      });
  });
  it("matching pairs hold the same value on both sides", () => {
    const words: Record<string, number> = { "one half": 1 / 2, "one third": 1 / 3, "one quarter": 1 / 4, "two thirds": 2 / 3, "three quarters": 3 / 4 };
    for (let s = 0; s < 60; s++)
      withSeed(s, () => {
        for (const q of [...fractionWords(), ...decimalFractions(), ...percentFractions(), ...fractionDecimals()]) {
          if (q.kind !== "match") throw new Error("kind");
          for (const p of q.pairs) {
            const l = words[p.left.label] ?? value(p.left.label);
            const r = words[p.right.label] ?? value(p.right.label);
            expect(l, `${p.left.label} = ${p.right.label}`).toBeCloseTo(r, 9);
          }
        }
      });
  });
  it("the mixed-number step marked wrong is the only wrong one", () => {
    for (let s = 0; s < 100; s++)
      withSeed(s, () => {
        const q = mixedNumberMistake()[0] as MistakeQuestion;
        const [, n, d] = /(\d+)\/(\d+) as/.exec(q.prompt)!.map(Number);
        const w = Math.floor(n / d);
        const r = n % d;
        const good = [`${n} ÷ ${d} = ${w} remainder ${r}`, `The whole number is ${w}`, `The fraction part is ${r}/${d}`, `${n}/${d} = ${w} ${r}/${d}`];
        // The marked step differs from the correct one; steps after it follow from it, so only that step is the first to go wrong.
        expect(q.steps[q.wrong]).not.toBe(good[q.wrong]);
        for (let i = 0; i < q.wrong; i++) expect(q.steps[i]).toBe(good[i]);
      });
  });
  it("the integer number-line step marked wrong is the first wrong one", () => {
    for (let s = 0; s < 100; s++)
      withSeed(s, () => {
        const q = integerLineMistake()[0] as MistakeQuestion;
        const [, a, b] = /−(\d+) \+ (\d+) on/.exec(q.prompt)!.map(Number);
        const good = [`Start at −${a} on the number line`, `Move ${b} steps to the right`, `−${a} + ${b} = ${b - a}`];
        expect(q.steps[q.wrong]).not.toBe(good[q.wrong]);
        for (let i = 0; i < q.wrong; i++) expect(q.steps[i]).toBe(good[i]);
      });
  });
});

describe("Grade 8 and 9 questions", () => {
  const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  const unsup = (t: string) => Number(t.split("").map((c) => SUP.indexOf(c)).join(""));
  it("perfect squares: right choices are squares and wrong ones are not", () => {
    for (let s = 0; s < 100; s++)
      withSeed(s, () => {
        const q = perfectSquares()[0];
        if (q.kind !== "multi") throw new Error("kind");
        for (const c of q.choices) expect(q.answers.includes(c.id), c.label).toBe(Number.isInteger(Math.sqrt(Number(c.label))));
      });
  });
  it("right triangles: each pair of short sides gives that long side", () => {
    for (let s = 0; s < 60; s++)
      withSeed(s, () => {
        const q = rightTriangles()[0];
        if (q.kind !== "match") throw new Error("kind");
        for (const p of q.pairs) {
          const [a, b] = p.left.label.split(" and ").map(Number);
          expect(a * a + b * b).toBe(Number(p.right.label) ** 2);
        }
      });
  });
  it("fraction addition: only the last step is wrong", () => {
    for (let s = 0; s < 100; s++)
      withSeed(s, () => {
        const q = fractionAddMistake()[0] as MistakeQuestion;
        const [, a, b, c, d] = /^(\d+)\/(\d+) \+ (\d+)\/(\d+)$/.exec(q.steps[0])!.map(Number);
        expect(q.steps[1]).toBe(`= ${a * d}/${b * d} + ${c * b}/${b * d}`);
        expect(q.steps[2]).not.toBe(`= ${a * d + c * b}/${b * d}`);
        expect(q.wrong).toBe(2);
      });
  });
  it("linear equation: the marked step is the first wrong one", () => {
    for (let s = 0; s < 100; s++)
      withSeed(s, () => {
        const q = linearEquationMistake()[0] as MistakeQuestion;
        const [, p, a, b] = /^(\d+)x − (\d+) = (\d+)$/.exec(q.steps[0])!.map(Number);
        const good1 = `${p}x = ${b + a}`;
        if (q.wrong === 1) expect(q.steps[1]).not.toBe(good1);
        else {
          expect(q.steps[1]).toBe(good1);
          expect(q.steps[2]).not.toBe(`x = ${b + a} ÷ ${p}`);
        }
      });
  });
  it("exponent laws: every pair is equal", () => {
    for (let s = 0; s < 100; s++)
      withSeed(s, () => {
        const q = exponentLaws()[0];
        if (q.kind !== "match") throw new Error("kind");
        const rights = new Set(q.pairs.map((p) => p.right.label));
        expect(rights.size).toBe(q.pairs.length);
        for (const p of q.pairs) {
          const out = unsup(p.right.label.slice(1));
          const l = p.left.label;
          let n: number;
          let m: RegExpExecArray | null;
          if ((m = /^x(\S+) · x(\S+)$/.exec(l))) n = unsup(m[1]) + unsup(m[2]);
          else if ((m = /^x(\S+) ÷ x(\S+)$/.exec(l))) n = unsup(m[1]) - unsup(m[2]);
          else {
            m = /^\(x(\S+)\)(\S+)$/.exec(l)!;
            n = unsup(m[1]) * unsup(m[2]);
          }
          expect(out, l).toBe(n);
        }
      });
  });
  it("distributing: the marked step is the first wrong one", () => {
    for (let s = 0; s < 100; s++)
      withSeed(s, () => {
        const q = distributeMistake()[0] as MistakeQuestion;
        const [, p, a, b] = /^(\d+)\(x \+ (\d+)\) = (\d+)$/.exec(q.steps[0])!.map(Number);
        if (q.wrong === 1) expect(q.steps[1]).not.toBe(`${p}x + ${p * a} = ${b}`);
        else {
          expect(q.steps[1]).toBe(`x + ${a} = ${b} ÷ ${p}`);
          expect(q.steps[2]).not.toBe(`x = ${b / p} − ${a}`);
        }
      });
  });
  it("between −1 and 0: right choices are, wrong ones are not", () => {
    const val = (t: string) => {
      const n = t.replace("−", "-");
      return n.includes("/") ? Number(n.split("/")[0]) / Number(n.split("/")[1]) : Number(n);
    };
    for (let s = 0; s < 100; s++)
      withSeed(s, () => {
        const q = betweenZeroAndNegativeOne()[0];
        if (q.kind !== "multi") throw new Error("kind");
        for (const c of q.choices) expect(q.answers.includes(c.id), c.label).toBe(val(c.label) > -1 && val(c.label) < 0);
      });
  });
});
