import { pick, shuffle, textChoice } from "../../random";
import type { Choice, ChoiceQuestion, GenerateOptions, InputQuestion, Question, Unit, Visual } from "../../types";
import { wa } from "../cite";

// Small helpers for Washington's own math units (`wa-` ids). Each unit is a list of question makers; a set of 8
// questions cycles through them in a shuffled order so every set mixes the kinds of question.

export type D = 1 | 2 | 3;
export type Maker = (d: D) => Question;

interface Spec {
  id: string;
  title: string;
  emoji: string;
  blurb: string;
  parentNote: string;
  /** Washington codes ("M.4.SR.MD.1"), then a short plain description. */
  codes: string;
  text: string;
  makers: Maker[];
  size?: number;
}

export function mathUnit(spec: Spec): Unit {
  return {
    id: spec.id,
    title: spec.title,
    emoji: spec.emoji,
    blurb: spec.blurb,
    parentNote: spec.parentNote,
    standards: wa(spec.codes, spec.text),
    generate: (opts?: GenerateOptions) => {
      const d = opts?.difficulty ?? 2;
      const out: Question[] = [];
      let pool: Maker[] = [];
      while (out.length < (spec.size ?? 8)) {
        if (!pool.length) pool = shuffle(spec.makers);
        out.push(pool.pop()!(d));
      }
      return out;
    },
  };
}

/** House style for big numbers: a space every three digits from 10 000 up. */
export function sp(n: number): string {
  const s = String(Math.abs(n));
  const body = Math.abs(n) >= 10000 ? s.replace(/\B(?=(\d{3})+(?!\d))/g, " ") : s;
  return (n < 0 ? "−" : "") + body;
}

/** A number for display: up to 3 decimals, no trailing zeros, a real minus sign. */
export function fmt(n: number): string {
  const r = Math.round(n * 1000) / 1000;
  const s = String(Math.abs(r));
  return (r < 0 ? "−" : "") + s;
}

/** A number for the keypad: plain digits and a hyphen-minus. */
export const key = (n: number): string => String(Math.round(n * 1000) / 1000);

/**
 * A multiple-choice question with number answers. Wrong answers are `answer ± k·step`, plus any `extra` near misses,
 * filtered to [min, max]. Labels go through `label` (default `fmt`).
 */
export function num(
  prompt: string,
  answer: number,
  hint: string,
  o: { step?: number; min?: number; max?: number; count?: number; extra?: number[]; label?: (n: number) => string; visual?: Visual } = {},
): ChoiceQuestion {
  const { step = 1, min = 0, max = Infinity, count = 4, label = fmt } = o;
  const seen = new Set<string>([label(answer)]);
  const wrong: number[] = [];
  const add = (n: number) => {
    const l = label(n);
    if (n < min || n > max || seen.has(l) || Math.abs(n - answer) < 1e-9) return;
    seen.add(l);
    wrong.push(n);
  };
  for (const n of shuffle(o.extra ?? [])) if (wrong.length < count - 1) add(n);
  for (const k of shuffle([1, -1, 2, -2, 3, -3])) if (wrong.length < count - 1) add(answer + k * step);
  for (let k = 4; wrong.length < count - 1 && k < 40; k++) add(answer + k * step);
  const all = shuffle([answer, ...wrong]);
  return {
    kind: "choice",
    prompt,
    hint,
    ...(o.visual ? { visual: o.visual } : {}),
    answer: String(all.indexOf(answer)),
    choices: all.map((n, i) => ({ id: String(i), label: label(n) })),
  };
}

/** A multiple-choice question from text options; the first is right. Duplicates of the right answer are dropped. */
export function pickOne(prompt: string, right: string | Omit<Choice, "id">, wrong: (string | Omit<Choice, "id">)[], hint: string, visual?: Visual): ChoiceQuestion {
  const r = typeof right === "string" ? right : right.label;
  const seen = new Set([r]);
  const ws = wrong.filter((w) => {
    const l = typeof w === "string" ? w : w.label;
    if (seen.has(l)) return false;
    seen.add(l);
    return true;
  });
  return textChoice(prompt, right, ws, hint, visual);
}

/** A typed answer. */
export function typed(prompt: string, answer: number | string, hint: string, o: { keypad?: InputQuestion["keypad"]; suffix?: string; visual?: Visual; accept?: string[] } = {}): InputQuestion {
  return {
    kind: "input",
    prompt,
    hint,
    answer: typeof answer === "number" ? key(answer) : answer,
    keypad: o.keypad ?? "number",
    ...(o.suffix ? { suffix: o.suffix } : {}),
    ...(o.visual ? { visual: o.visual } : {}),
    ...(o.accept ? { accept: o.accept } : {}),
  };
}

/** Big maths shown above a question. */
export const eq = (text: string): Visual => ({ type: "equation", text });

export const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));

/** A fraction in lowest terms, as text ("3/4", "2", "−1/2"). */
export function frac(n: number, d: number): string {
  if (d < 0) [n, d] = [-n, -d];
  const g = gcd(n, d) || 1;
  const [a, b] = [n / g, d / g];
  const sign = a < 0 ? "−" : "";
  return b === 1 ? `${sign}${Math.abs(a)}` : `${sign}${Math.abs(a)}/${b}`;
}

/** A fraction for the fraction keypad ("-1/2"). */
export const fracKey = (n: number, d: number): string => frac(n, d).replace("−", "-");

/** A mixed number in lowest terms ("2 1/4"), or a whole number. */
export function mixed(n: number, d: number): string {
  const g = gcd(n, d) || 1;
  const [a, b] = [n / g, d / g];
  const whole = Math.floor(a / b);
  const rest = a - whole * b;
  if (rest === 0) return String(whole);
  return whole === 0 ? `${rest}/${b}` : `${whole} ${rest}/${b}`;
}

/** Fraction answer choices by value: the right one and wrong ones, each with a different value. */
export function fracChoice(prompt: string, right: [number, number], wrong: [number, number][], hint: string, show: (n: number, d: number) => string = frac, visual?: Visual): ChoiceQuestion {
  const value = ([n, d]: [number, number]) => n / d;
  const seenV = new Set<number>([Math.round(value(right) * 1e9)]);
  const seenL = new Set<string>([show(...right)]);
  const ws: string[] = [];
  for (const w of wrong) {
    if (w[1] === 0 || ws.length >= 3) continue;
    const v = Math.round(value(w) * 1e9);
    const l = show(...w);
    if (seenV.has(v) || seenL.has(l)) continue;
    seenV.add(v);
    seenL.add(l);
    ws.push(l);
  }
  return textChoice(prompt, show(...right), ws, hint, visual);
}

/** Superscript digits for exponents: 2 → "²", -3 → "⁻³". */
export function sup(n: number): string {
  const map: Record<string, string> = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵", "6": "⁶", "7": "⁷", "8": "⁸", "9": "⁹", "-": "⁻" };
  return String(n).split("").map((c) => map[c] ?? c).join("");
}

/** A signed number in brackets when negative, for expressions: 3 → "3", -3 → "(−3)". */
export const par = (n: number): string => (n < 0 ? `(${fmt(n)})` : fmt(n));

/** `+ 3` or `− 3`, for writing ax + b. */
export const signed = (n: number): string => (n < 0 ? `− ${fmt(-n)}` : `+ ${fmt(n)}`);

/** ax + b written neatly: "3x + 2", "x − 4", "−x", "5". */
export function linear(a: number, b: number, v = "x"): string {
  const head = a === 0 ? "" : a === 1 ? v : a === -1 ? `−${v}` : `${fmt(a)}${v}`;
  if (!head) return fmt(b);
  return b === 0 ? head : `${head} ${signed(b)}`;
}

export const names = ["Maya", "Jay", "Amir", "Lena", "Kenji", "Zoe", "Ravi", "Ana", "Noah", "Priya", "Leo", "Mia", "Sam", "Nia"] as const;
export const someone = (): string => pick(names);
