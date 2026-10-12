import { randInt, shuffle } from "@/content/random";
import type { GradeId } from "@/content/types";

// Equation Tower: an equation on a balance scale; pick the block that balances it.
// Grade 2 fills a box in an addition, Grade 9 solves with x on both sides.

export interface Equation {
  /** Left and right of the scale, e.g. "3x + 4" and "19". */
  left: string;
  right: string;
  /** Read aloud. */
  speak: string;
  /** What the unknown is called on screen: "□" or "x". */
  unknown: string;
  answer: number;
  choices: number[];
}

const G: Partial<Record<GradeId, number>> = { "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9 };

/** Shown with a real minus sign. */
export const num = (n: number) => (n < 0 ? `−${Math.abs(n)}` : String(n));
const sayNum = (n: number) => (n < 0 ? `negative ${Math.abs(n)}` : String(n));
/** "+ 4" or "− 4" after a term. */
const plus = (n: number) => (n < 0 ? `− ${Math.abs(n)}` : `+ ${n}`);
const sayPlus = (n: number) => (n < 0 ? `minus ${Math.abs(n)}` : `plus ${n}`);
const nonZero = (min: number, max: number) => {
  for (;;) {
    const n = randInt(min, max);
    if (n !== 0) return n;
  }
};

/** Three wrong blocks near the answer (off by one or two, or a common slip), all different. */
export function towerChoices(answer: number, slips: number[] = [], allowNegative = false): number[] {
  const out = new Set<number>([answer]);
  const candidates = shuffle([...slips, answer + 1, answer - 1, answer + 2, answer - 2, answer + 3, answer - 3, answer + 10, -answer]);
  for (const c of candidates) {
    if (out.size >= 4) break;
    if (!Number.isInteger(c) || (!allowNegative && c < 0)) continue;
    out.add(c);
  }
  for (let k = 4; out.size < 4; k++) out.add(answer + k);
  return shuffle([...out]);
}

export function equation(grade: GradeId): Equation {
  const g = G[grade] ?? 9;
  if (g <= 3) {
    // □ + a = b, or a + □ = b, or □ − a = b.
    const max = g === 2 ? 20 : 100;
    const x = randInt(1, max - 5);
    const a = randInt(1, max - x);
    const form = randInt(0, 2);
    if (form === 0) return make(`□ + ${a}`, `${x + a}`, `What plus ${a} equals ${x + a}?`, "□", x, [x + 2 * a, a]);
    if (form === 1) return make(`${a} + □`, `${x + a}`, `${a} plus what equals ${x + a}?`, "□", x, [x + 2 * a, a]);
    return make(`□ − ${a}`, `${x}`, `What minus ${a} equals ${x}?`, "□", x + a, [x - a, x]);
  }
  if (g <= 5) {
    // □ × a = b, or □ ÷ a = b (Grade 5 writes the unknown as a letter).
    const u = g === 5 ? "n" : "□";
    const a = randInt(2, g === 4 ? 9 : 12);
    const x = randInt(2, g === 4 ? 9 : 12);
    if (randInt(0, 1) === 0) return make(`${a} × ${u}`, `${a * x}`, `${a} times ${g === 5 ? "n" : "what"} equals ${a * x}`, u, x, [a * x - a, x + a]);
    return make(`${u} ÷ ${a}`, `${x}`, `${g === 5 ? "n" : "What"} divided by ${a} equals ${x}`, u, a * x, [x * (a + 1), x + a]);
  }
  if (g === 6) {
    // One step: x + a = b, ax = b, x ÷ a = b.
    const x = randInt(2, 15);
    const a = randInt(2, 9);
    const form = randInt(0, 2);
    if (form === 0) return make(`x + ${a}`, `${x + a}`, `x plus ${a} equals ${x + a}`, "x", x, [x + 2 * a]);
    if (form === 1) return make(`${a}x`, `${a * x}`, `${a} x equals ${a * x}`, "x", x, [a * x - a]);
    return make(`x ÷ ${a}`, `${x}`, `x divided by ${a} equals ${x}`, "x", a * x, [x + a]);
  }
  if (g === 7) {
    // Two steps, whole-number answers; integers on the right.
    const x = randInt(1, 12);
    const a = randInt(2, 6);
    const b = nonZero(-9, 9);
    return make(`${a}x ${plus(b)}`, num(a * x + b), `${a} x ${sayPlus(b)} equals ${sayNum(a * x + b)}`, "x", x, [x + b, a * x], true);
  }
  if (g === 8) {
    // Two steps with negative answers, or a bracket.
    const x = nonZero(-10, 10);
    const a = randInt(2, 6);
    if (randInt(0, 1) === 0) {
      const b = nonZero(-9, 9);
      return make(`${a}x ${plus(b)}`, num(a * x + b), `${a} x ${sayPlus(b)} equals ${sayNum(a * x + b)}`, "x", x, [-x, x + b], true);
    }
    const b = randInt(1, 6);
    return make(`${a}(x + ${b})`, num(a * (x + b)), `${a} times the quantity x plus ${b} equals ${sayNum(a * (x + b))}`, "x", x, [x + b, -x], true);
  }
  // Grade 9: x on both sides.
  const x = nonZero(-9, 9);
  const c = randInt(1, 5);
  const a = c + randInt(1, 5);
  const b = nonZero(-12, 12);
  const d = (a - c) * x + b;
  return make(`${a}x ${plus(b)}`, `${c}x ${plus(d)}`, `${a} x ${sayPlus(b)} equals ${c} x ${sayPlus(d)}`, "x", x, [-x, x + 1], true);

  function make(left: string, right: string, speak: string, unknown: string, answer: number, slips: number[], allowNegative = false): Equation {
    return { left, right, speak, unknown, answer, choices: towerChoices(answer, slips, allowNegative) };
  }
}
