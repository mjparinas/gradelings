import { describe, expect, it } from "vitest";
import { COURSES } from "../all";
import { moneyOf } from "../money";
import { ageBandFor } from "../subjects";
import type { Course, FrameworkId, GradeId, Question, Visual } from "../types";

const RUNS = 120;

const KEYPAD_PATTERN: Record<string, RegExp> = {
  number: /^\d+$/,
  integer: /^-?\d+$/,
  decimal: /^-?\d+(\.\d+)?$/,
  fraction: /^-?\d+(\/\d+|\.\d+)?$/,
};

function numericValue(text: string): number {
  if (text.includes("/")) {
    const [a, b] = text.split("/").map(Number);
    return a / b;
  }
  return Number(text);
}

function checkVisual(v: Visual) {
  switch (v.type) {
    case "numberLine":
      expect(v.max).toBeGreaterThan(v.min);
      expect(v.step).toBeGreaterThan(0);
      expect((v.max - v.min) / v.step).toBeLessThanOrEqual(40);
      if (v.blankAt !== undefined) {
        expect(v.blankAt).toBeGreaterThanOrEqual(v.min);
        expect(v.blankAt).toBeLessThanOrEqual(v.max);
      }
      break;
    case "fraction":
      expect(v.denominator).toBeGreaterThan(0);
      expect(v.denominator).toBeLessThanOrEqual(24);
      expect(v.numerator).toBeGreaterThanOrEqual(0);
      expect(v.numerator).toBeLessThanOrEqual(v.denominator * 3);
      break;
    case "clock":
      expect(v.hour).toBeGreaterThanOrEqual(1);
      expect(v.hour).toBeLessThanOrEqual(12);
      expect(v.minute).toBeGreaterThanOrEqual(0);
      expect(v.minute).toBeLessThanOrEqual(59);
      break;
    case "array":
      expect(v.rows).toBeGreaterThanOrEqual(1);
      expect(v.cols).toBeGreaterThanOrEqual(1);
      expect(v.rows * v.cols).toBeLessThanOrEqual(144);
      break;
    case "dots":
      expect(v.count).toBeGreaterThanOrEqual(0);
      expect(v.count).toBeLessThanOrEqual(30);
      break;
    case "blocks":
      expect(v.hundreds ?? 0).toBeLessThanOrEqual(9);
      expect(v.tens).toBeLessThanOrEqual(19);
      expect(v.ones).toBeLessThanOrEqual(19);
      break;
    case "grid":
      for (const p of v.points) {
        expect(Math.abs(p.x)).toBeLessThanOrEqual(v.size);
        expect(Math.abs(p.y)).toBeLessThanOrEqual(v.size);
      }
      break;
    case "bars":
      expect(v.bars.length).toBeGreaterThanOrEqual(2);
      break;
    case "pictograph":
      expect(v.rows.length).toBeGreaterThanOrEqual(2);
      if (v.each !== undefined) expect(Number.isInteger(v.each) && v.each >= 1).toBe(true);
      for (const r of v.rows) expect(r.count).toBeLessThanOrEqual(20);
      break;
    case "angle":
      expect(v.degrees).toBeGreaterThan(0);
      expect(v.degrees).toBeLessThan(360);
      break;
  }
}

/**
 * Evaluates arithmetic like "7 × (-8) + 3" or "(4 + 2) ÷ 3" with the usual order
 * of operations. Returns undefined for anything else (words, unknowns, units).
 */
function evaluate(text: string): number | undefined {
  // Skip mixed numbers ("7 1/2") and spaced thousands ("12 500").
  if (/\d\s+\d/.test(text)) return undefined;
  const src = text.replace(/−/g, "-").replace(/×/g, "*").replace(/÷/g, "/").replace(/\s+/g, "");
  if (!/^[\d.+\-*/()]+$/.test(src) || !/[+\-*/]/.test(src.replace(/^-/, ""))) return undefined;
  let i = 0;
  const expr = (): number => {
    let v = term();
    while (src[i] === "+" || src[i] === "-") v = src[i++] === "+" ? v + term() : v - term();
    return v;
  };
  const term = (): number => {
    let v = factor();
    while (src[i] === "*" || src[i] === "/") v = src[i++] === "*" ? v * factor() : v / factor();
    return v;
  };
  const factor = (): number => {
    if (src[i] === "-") return i++, -factor();
    if (src[i] === "(") {
      i++;
      const v = expr();
      if (src[i++] !== ")") throw new Error("bad");
      return v;
    }
    const m = /^\d+(\.\d+)?/.exec(src.slice(i));
    if (!m) throw new Error("bad");
    i += m[0].length;
    return Number(m[0]);
  };
  try {
    const v = expr();
    return i === src.length && Number.isFinite(v) ? v : undefined;
  } catch {
    return undefined;
  }
}

/** Where a visual fully determines the answer, check the maths. */
function checkMath(q: Question, answerText: string) {
  const v = q.visual;
  const n = numericValue(answerText.replace(/[^\d./-]/g, ""));
  if (v?.type === "equation") {
    const m = v.text.match(/^(.+) = \?$/);
    const expected = m ? evaluate(m[1]) : undefined;
    if (expected !== undefined) expect(n, `${v.text} → ${answerText}`).toBeCloseTo(expected, 6);
    const missing = v.text.match(/^(\d+) \+ ☐ = (\d+)$/);
    if (missing) expect(Number(missing[1]) + n).toBe(Number(missing[2]));
  }
  if (v?.type === "blocks" && q.prompt.startsWith("What number")) {
    expect(n).toBe((v.hundreds ?? 0) * 100 + v.tens * 10 + v.ones);
  }
  if (v?.type === "ruler") expect(n).toBe(v.length);
  if (v?.type === "tenFrame") expect(n).toBe(v.filled + (v.extra ?? 0));
  if (v?.type === "dots" && /^How many/.test(q.prompt)) expect(n).toBe(v.count);
  if (v?.type === "array" && /^How many/.test(q.prompt)) expect(n).toBe(v.rows * v.cols);
}

// The slow part of the content tests, one grade at a time. Each grade has its own test file in this
// folder so the files run in parallel and CI can spread them over machines (see content.test.ts).
function checkQuestion(q: Question, course: Course) {
  const band = ageBandFor(course.grade);
  expect(q.prompt.trim()).not.toBe("");
  expect(q.hint.trim()).not.toBe("");
  if (band === "little") {
    // Little kids hear the prompt read aloud; keep it short.
    expect(q.prompt.length, `prompt too long for K/1: "${q.prompt}"`).toBeLessThanOrEqual(80);
  }
  if (q.visual) checkVisual(q.visual);

  switch (q.kind) {
    case "choice": {
      expect(q.choices.length).toBeGreaterThanOrEqual(2);
      expect(q.choices.length).toBeLessThanOrEqual(band === "little" ? 4 : 5);
      expect(new Set(q.choices.map((c) => c.id)).size).toBe(q.choices.length);
      // Two buttons that look the same would make the question unfair.
      const looks = q.choices.map((c) => `${c.emoji ?? ""}|${c.shape ?? ""}|${c.coin ?? ""}|${c.label}`);
      expect(new Set(looks).size, `duplicate choices in "${q.prompt}"`).toBe(q.choices.length);
      expect(q.choices.map((c) => c.id)).toContain(q.answer);
      checkMath(q, q.choices.find((c) => c.id === q.answer)!.label);
      break;
    }
    case "input": {
      expect(course.grade, "Kindergarten questions can't need typing").not.toBe("k");
      const pad = q.keypad ?? "number";
      expect(q.answer, `"${q.answer}" doesn't fit the ${pad} keypad`).toMatch(KEYPAD_PATTERN[pad]);
      for (const a of q.accept ?? []) expect(a).toMatch(KEYPAD_PATTERN[pad]);
      checkMath(q, q.answer);
      break;
    }
    case "build":
      expect(Number.isInteger(q.target)).toBe(true);
      expect(q.target).toBeGreaterThanOrEqual(1);
      expect(q.target).toBeLessThanOrEqual(q.hundreds ? 999 : 99);
      break;
    case "coins": {
      // Canada has no pennies, so Canadian amounts are multiples of 5¢; US amounts can be any number of cents.
      const smallest = q.currency === "USD" ? 1 : 5;
      expect(q.target % smallest).toBe(0);
      expect(q.target).toBeGreaterThan(0);
      expect(q.coins).toContain(smallest);
      expect(q.coins.every((c) => moneyOf(q.currency).includes(c))).toBe(true);
      break;
    }
    case "order":
      expect(q.items.length).toBeGreaterThanOrEqual(3);
      expect(q.items.length).toBeLessThanOrEqual(6);
      expect(new Set(q.items.map((i) => i.id)).size).toBe(q.items.length);
      expect(new Set(q.items.map((i) => i.label)).size).toBe(q.items.length);
      break;
    case "shade":
      expect(Number.isInteger(q.parts) && q.parts >= 2 && q.parts <= 12, `shade parts ${q.parts}`).toBe(true);
      expect(Number.isInteger(q.target) && q.target >= 1 && q.target <= q.parts, `shade target ${q.target}`).toBe(true);
      break;
    case "place": {
      const ticks = (q.max - q.min) / q.step;
      expect(Math.abs(ticks - Math.round(ticks)) < 1e-9 && ticks >= 2 && ticks <= 12, `place needs 2 to 12 whole steps, got ${ticks}`).toBe(true);
      const at = (q.target - q.min) / q.step;
      expect(Math.abs(at - Math.round(at)) < 1e-9 && q.target >= q.min && q.target <= q.max, `place target ${q.target} must sit on a tick`).toBe(true);
      expect(band, "place needs a pointer or keys, not for the littlest").not.toBe("little");
      break;
    }
    case "sort": {
      const bins = q.bins.map((b) => b.id);
      expect(bins.length).toBeGreaterThanOrEqual(2);
      expect(bins.length).toBeLessThanOrEqual(3);
      for (const item of q.items) expect(bins).toContain(item.bin);
      for (const bin of bins) expect(q.items.some((i) => i.bin === bin)).toBe(true);
      expect(new Set(q.items.map((i) => i.id)).size).toBe(q.items.length);
      expect(q.items.length).toBeLessThanOrEqual(8);
      break;
    }
  }
}

/** Every unit of every framework in one grade generates fair questions. */
export function fairnessTests(grade: GradeId) {
  describe(`curriculum content, grade ${grade}`, () => {
    for (const course of COURSES.filter((c) => c.grade === grade)) {
      describe(`${course.grade}/${course.subject}`, () => {
        it("has an overview and complete unit info for each framework", () => {
          const frameworks = new Set(course.units.flatMap((u) => Object.keys(u.standards)));
          for (const f of frameworks) expect(course.bigIdeas[f as FrameworkId]?.length ?? 0, `${f} overview`).toBeGreaterThan(0);
          for (const u of course.units) {
            expect(u.title.trim()).not.toBe("");
            expect(u.emoji.trim()).not.toBe("");
            expect(u.blurb.trim()).not.toBe("");
            expect(u.parentNote.trim()).not.toBe("");
            expect(Object.keys(u.standards).length, `${u.id} has standards`).toBeGreaterThan(0);
            for (const text of Object.values(u.standards)) expect((text ?? "").trim()).not.toBe("");
          }
        });

        it("lists shared and ordered units that exist", () => {
          const ids = new Set(course.units.map((u) => u.id));
          for (const id of Object.keys(course.shares ?? {})) expect(ids.has(id), `shared unit ${id}`).toBe(true);
          for (const order of Object.values(course.order ?? {})) for (const id of order ?? []) expect(ids.has(id), `ordered unit ${id}`).toBe(true);
        });

        for (const unit of course.units) {
          it(`${unit.id} generates fair questions`, () => {
            for (let run = 0; run < RUNS; run++) {
              const difficulty = ((run % 3) + 1) as 1 | 2 | 3;
              const qs = unit.generate({ difficulty });
              expect(qs.length).toBeGreaterThanOrEqual(6);
              expect(qs.length).toBeLessThanOrEqual(10);
              qs.forEach((q) => checkQuestion(q, course));
            }
          });
        }
      });
    }
  });
}
