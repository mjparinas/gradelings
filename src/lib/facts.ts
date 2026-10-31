import { rand } from "@/content/random";
import { GRADE_ORDER } from "@/content/subjects";
import type { GradeId, InputQuestion, Lesson } from "@/content/types";

// Math facts: addition and subtraction facts to 20, then times tables and division facts. Each fact is
// tracked on its own (`FactStat`, worked out from answer events in `derive`, never stored), missed facts
// come back more often, and parents see how many of each set a child knows. It is practice, not a mark.

export type FactSetId = "add10" | "sub10" | "add" | "sub" | "mul" | "div";
export type FactOp = "add" | "sub" | "mul" | "div";

export interface Fact {
  /** `op:a:b`, the two numbers as the child sees them ("mul:7:8" is 7 × 8). Shared by every set the fact is in. */
  id: string;
  op: FactOp;
  a: number;
  b: number;
  answer: number;
}

export interface FactSet {
  id: FactSetId;
  op: FactOp;
  /** Kid-facing name on the picker. */
  title: string;
  /** What a parent reads: "knows 64 of 100 times-table facts". */
  noun: string;
  emoji: string;
  /** The grades that see this set. */
  grades: readonly GradeId[];
  lesson: Lesson;
}

/** What the answer log says about one fact. */
export interface FactStat {
  attempts: number;
  /** First-try results (no hint), most recent last, up to 4. */
  recent: boolean[];
  lastT: number;
}

/** Questions in one round, or half that with short sessions. */
export const FACTS_PER_ROUND = 20;
/** How many facts a child can be learning at once before new ones slow down. */
const WORKING_SET = 8;
/** The fact answer events carry this unit key, so they count as math practice for the child's grade. */
export const FACTS_UNIT_ID = "facts";

const SIGN: Record<FactOp, string> = { add: "+", sub: "−", mul: "×", div: "÷" };
const SAY: Record<FactOp, string> = { add: "plus", sub: "minus", mul: "times", div: "divided by" };

const from = (first: GradeId) => GRADE_ORDER.slice(GRADE_ORDER.indexOf(first));

/** The two numbers 1 to 10 make every fact: 1 + 1 to 10 + 10, and the subtraction, times and division facts that undo them. */
function build(op: FactOp, keep: (x: number, y: number) => boolean = () => true): Fact[] {
  const out: Fact[] = [];
  for (let x = 1; x <= 10; x++) {
    for (let y = 1; y <= 10; y++) {
      if (!keep(x, y)) continue;
      const [a, b, answer] = op === "add" ? [x, y, x + y] : op === "sub" ? [x + y, y, x] : op === "mul" ? [x, y, x * y] : [x * y, y, x];
      out.push({ id: `${op}:${a}:${b}`, op, a, b, answer });
    }
  }
  return out;
}

export const FACT_SETS: readonly FactSet[] = [
  {
    id: "add10",
    op: "add",
    title: "Adding to 10",
    noun: "adding facts to 10",
    emoji: "➕",
    grades: ["1", "2"],
    lesson: {
      steps: ["Start with the bigger number.", "Count on the smaller one.", "Doubles help: 4 + 4 is 8, so 4 + 5 is 9."],
      example: { question: "6 + 3 = ?", work: ["Start at 6.", "Count on 3: 7, 8, 9."], answer: "9" },
    },
  },
  {
    id: "sub10",
    op: "sub",
    title: "Take away to 10",
    noun: "take-away facts to 10",
    emoji: "➖",
    grades: ["1", "2"],
    lesson: {
      steps: ["Think of the adding fact.", "7 − 3 asks: 3 and what make 7?", "Count up from 3 to 7."],
      example: { question: "7 − 3 = ?", work: ["3 and what make 7?", "Count up: 4, 5, 6, 7. That is 4."], answer: "4" },
    },
  },
  {
    id: "add",
    op: "add",
    title: "Addition facts",
    noun: "addition facts to 20",
    emoji: "➕",
    grades: from("2"),
    lesson: {
      steps: ["Doubles are quick: 6 + 6 is 12.", "Near doubles: 6 + 7 is a double plus 1.", "Make a ten: 9 + 5 is the same as 10 + 4."],
      example: { question: "8 + 5 = ?", work: ["8 needs 2 more to make 10.", "Take 2 from the 5. That leaves 3.", "10 + 3 is 13."], answer: "13" },
    },
  },
  {
    id: "sub",
    op: "sub",
    title: "Subtraction facts",
    noun: "subtraction facts to 20",
    emoji: "➖",
    grades: from("2"),
    lesson: {
      steps: ["Think of the adding fact: 13 − 5 asks 5 + ? = 13.", "Or go back to 10 first, then take away the rest."],
      example: { question: "13 − 5 = ?", work: ["13 − 3 is 10.", "Take away 2 more: 8."], answer: "8" },
    },
  },
  {
    id: "mul",
    op: "mul",
    title: "Times tables",
    noun: "times-table facts",
    emoji: "✖️",
    grades: from("3"),
    lesson: {
      steps: ["7 × 8 means 7 groups of 8.", "Turn it around if that is easier: 7 × 8 is 8 × 7.", "Use a fact you know: 7 × 8 is 8 more than 6 × 8."],
      example: { question: "6 × 9 = ?", work: ["6 × 10 is 60.", "6 × 9 is one 6 less.", "60 − 6 is 54."], answer: "54" },
    },
  },
  {
    id: "div",
    op: "div",
    title: "Division facts",
    noun: "division facts",
    emoji: "➗",
    grades: from("3"),
    lesson: {
      steps: ["Division undoes times: 56 ÷ 8 asks 8 × ? = 56.", "Say the times table for 8 until you reach 56."],
      example: { question: "42 ÷ 6 = ?", work: ["6 × ? = 42", "6 × 7 is 42."], answer: "7" },
    },
  },
];

const FACTS: Record<FactSetId, Fact[]> = {
  add10: build("add", (x, y) => x + y <= 10),
  sub10: build("sub", (x, y) => x + y <= 10),
  add: build("add"),
  sub: build("sub"),
  mul: build("mul"),
  div: build("div"),
};

export function getFactSet(id: string): FactSet | undefined {
  return FACT_SETS.find((s) => s.id === id);
}

export function factsIn(set: FactSetId): Fact[] {
  return FACTS[set];
}

/** The sets a grade sees, easiest first. Kindergarten has none: it never asks for typed answers. */
export function factSetsFor(grade: GradeId): FactSet[] {
  return FACT_SETS.filter((s) => s.grades.includes(grade));
}

/** Reads a fact id ("mul:7:8"). Undefined for anything that isn't one. */
export function parseFact(id: string): Fact | undefined {
  const m = /^(add|sub|mul|div):(\d+):(\d+)$/.exec(id);
  if (!m) return undefined;
  const op = m[1] as FactOp;
  const a = Number(m[2]);
  const b = Number(m[3]);
  const answer = op === "add" ? a + b : op === "sub" ? a - b : op === "mul" ? a * b : b ? a / b : NaN;
  return Number.isInteger(answer) ? { id, op, a, b, answer } : undefined;
}

/** A strategy for the fact, shown before answering when asked for, and again with the answer after a second miss. */
export function factHint(f: Fact): string {
  const big = Math.max(f.a, f.b);
  const small = Math.min(f.a, f.b);
  switch (f.op) {
    case "add":
      if (f.a === f.b) return `A double! Think of ${f.a} and ${f.a} more.`;
      if (big - small === 1) return `Near doubles: ${small} + ${small} is ${small * 2}, then 1 more.`;
      if (big === 10) return `10 and ${small} more: one ten and ${small} ones.`;
      if (small <= 3 || big + small <= 10) return `Start at ${big} and count on ${small}.`;
      return `Make a ten: ${big} needs ${10 - big} more to make 10. Then add the ${small - (10 - big)} left over.`;
    case "sub":
      if (f.b === 10) return `Take away the ten: ${f.a} is 10 and ${f.a - 10} more.`;
      if (f.b <= 3) return `Start at ${f.a} and count back ${f.b}.`;
      return `Think adding: ${f.b} and what make ${f.a}? Count up from ${f.b}.`;
    case "mul":
      if (small === 1) return `Any number times 1 stays the same.`;
      if (small === 10 || big === 10) return `Times 10: ${small === 10 ? big : small} tens.`;
      if (small === 2) return `Times 2 is a double: ${big} + ${big}.`;
      if (f.a === 5 || f.b === 5) return `Count by 5s, ${f.a === 5 ? f.b : f.a} times.`;
      if (f.a === 9 || f.b === 9) return `Times 9: do ${f.a === 9 ? f.b : f.a} × 10, then take away ${f.a === 9 ? f.b : f.a}.`;
      if (f.a === 4 || f.b === 4) return `Times 4: double ${f.a === 4 ? f.b : f.a}, then double again.`;
      return `Use a fact you know: ${f.a} × ${f.b} is ${f.b} more than ${f.a - 1} × ${f.b}.`;
    case "div":
      if (f.b === 1) return `Dividing by 1 leaves the number as it is.`;
      return `Think times: ${f.b} × ? = ${f.a}.`;
  }
}

/** "7 × 8" for a fact. */
export function factText(f: Fact): string {
  return `${f.a} ${SIGN[f.op]} ${f.b}`;
}

/** The question for one fact: type the answer on the number keypad. */
export function factQuestion(f: Fact): InputQuestion {
  return {
    kind: "input",
    prompt: `${factText(f)} = ?`,
    speak: `What is ${f.a} ${SAY[f.op]} ${f.b}?`,
    answer: String(f.answer),
    keypad: "number",
    hint: factHint(f),
  };
}

/** Known: the last two tries were right the first time, without a hint. */
export function factKnown(s: FactStat | undefined): boolean {
  return !!s && s.recent.length >= 2 && s.recent[s.recent.length - 1] && s.recent[s.recent.length - 2];
}

export interface FactSetSummary {
  set: FactSet;
  total: number;
  known: number;
  /** Facts tried at least once. */
  tried: number;
  /** Facts missed on the latest try, most recently missed first (up to 5). */
  tricky: Fact[];
}

export function factSummary(set: FactSet, facts: Record<string, FactStat>): FactSetSummary {
  const list = factsIn(set.id);
  const tricky = list
    .filter((f) => facts[f.id] && facts[f.id].recent[facts[f.id].recent.length - 1] === false)
    .sort((x, y) => facts[y.id].lastT - facts[x.id].lastT)
    .slice(0, 5);
  return { set, total: list.length, known: list.filter((f) => factKnown(facts[f.id])).length, tried: list.filter((f) => facts[f.id]).length, tricky };
}

/**
 * How likely each fact is to come next. Missed facts come back the most, facts being learned next, then new ones
 * (slower once a handful are being learned), and known facts now and then (a little more after a few days away).
 */
export function factWeight(f: Fact, facts: Record<string, FactStat>, learning: number, now: number): number {
  const s = facts[f.id];
  if (!s) return learning >= WORKING_SET ? 0.5 : 3;
  if (factKnown(s)) return now - s.lastT >= 3 * 86_400_000 ? 1.5 : 0.4;
  return s.recent[s.recent.length - 1] === false ? 6 : 4;
}

/** The next fact to ask, never one of the last few asked (`recent` holds fact ids). */
export function pickFact(set: FactSetId, facts: Record<string, FactStat>, recent: readonly string[] = [], now = Date.now()): Fact {
  const list = factsIn(set);
  const learning = list.filter((f) => facts[f.id] && !factKnown(facts[f.id])).length;
  const skip = new Set(recent.slice(-5));
  const open = list.filter((f) => !skip.has(f.id));
  const pool = open.length ? open : list;
  const weights = pool.map((f) => factWeight(f, facts, learning, now));
  let r = rand() * weights.reduce((a, w) => a + w, 0);
  for (let i = 0; i < pool.length; i++) {
    r -= weights[i];
    if (r < 0) return pool[i];
  }
  return pool[pool.length - 1];
}

/** Where a child is with one fact: known, missed last time, being learned, or not tried yet. */
export type FactState = "known" | "tricky" | "learning" | "new";

export function factState(s: FactStat | undefined): FactState {
  if (!s) return "new";
  if (factKnown(s)) return "known";
  return s.recent[s.recent.length - 1] === false ? "tricky" : "learning";
}

export interface FactCell {
  /** The row number and column number, 1 to 10. */
  row: number;
  col: number;
  /** Undefined where the set has no fact (the "to 10" sets fill only part of the grid). */
  fact?: Fact;
  state?: FactState;
}

/** Adding and times sets read as a chart (row number, column number, answer where they meet); taking away and dividing don't. */
export function hasGrid(set: FactSet): boolean {
  return set.op === "add" || set.op === "mul";
}

/** A set as a 10 × 10 chart, the way a times-table chart is drawn: 7 × 8 sits at row 7, column 8. */
export function factGrid(set: FactSet, facts: Record<string, FactStat>): FactCell[][] {
  const at = new Map<string, Fact>();
  if (hasGrid(set)) for (const f of factsIn(set.id)) at.set(`${f.a}:${f.b}`, f);
  return Array.from({ length: 10 }, (_, r) =>
    Array.from({ length: 10 }, (_, c) => {
      const fact = at.get(`${r + 1}:${c + 1}`);
      return fact ? { row: r + 1, col: c + 1, fact, state: factState(facts[fact.id]) } : { row: r + 1, col: c + 1 };
    }),
  );
}
