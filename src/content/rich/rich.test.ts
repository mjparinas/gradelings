import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { checkQuestion } from "../fairness/question";
import { coursesInFramework } from "../index";
import { hashSeed, withSeed } from "../random";
import type { MistakeQuestion, Question } from "../types";
import { withRich } from "./index";
import { equivalentFill, multiplyMistake, oneStepMistake, twoStepMistake } from "./questions";
import { RICH } from "./units";

const seeds = Array.from({ length: 12 }, (_, i) => i);
const levels = [1, 2, 3] as const;
const gradeId = (g: string) => g.slice(1);

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
    expect([...kinds].sort()).toEqual(["fill", "highlight", "match", "mistake", "multi", "tiles"]);
  });
});
