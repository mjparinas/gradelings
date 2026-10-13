import { fromBank, type BankItem } from "../../bank";
import { questionText } from "../../locale";
import { pick, randInt, sample, shuffle, textChoice } from "../../random";
import type { GenerateOptions, OrderQuestion, Question, Unit } from "../../types";
import { ore } from "../cite";
import type { Q } from "../own";

// Helpers for Oregon's own social studies units: mixed units (a hand-written bank plus generated questions),
// timelines from dated events, fact tables (state capitals, county seats) and Oregon copies of other units with
// Washington State items removed.

type Difficulty = 1 | 2 | 3;
const level = (opts?: GenerateOptions): Difficulty => opts?.difficulty ?? 2;

interface Meta {
  id: string;
  title: string;
  emoji: string;
  blurb: string;
  parentNote: string;
  /** Oregon codes ("4.H.CH.1; 4.H.CE.5"), then a short plain description. */
  standards: readonly [codes: string, text: string];
}

const toBank = ([prompt, right, wrong, hint]: Q): BankItem => ({ prompt, right, wrong, hint });

/** Questions from a bank: core items only when easy, more stretch items as difficulty rises (as in bankUnit). */
export function fromItems(items: Q[], count: number, d: Difficulty): Question[] {
  if (count <= 0) return [];
  const easy = items.filter((q) => !q[4]).map(toBank);
  const hard = items.filter((q) => q[4]).map(toBank);
  const want = d === 1 ? 0 : d === 2 ? Math.ceil(count / 3) : Math.ceil((count * 2) / 3);
  const nHard = Math.min(want, hard.length);
  return [...fromBank(easy, count - nHard), ...fromBank(sample(hard, nHard), nHard)].slice(0, count);
}

/** A unit whose 8 questions come from `make`, shuffled. */
export function mixUnit(meta: Meta & { make: (d: Difficulty) => Question[] }): Unit {
  return {
    id: meta.id,
    title: meta.title,
    emoji: meta.emoji,
    blurb: meta.blurb,
    parentNote: meta.parentNote,
    standards: ore(meta.standards[0], meta.standards[1]),
    generate: (opts) => shuffle(meta.make(level(opts))).slice(0, 8),
  };
}

// ---------------------------------------------------------------------------------------------------------------
// Timelines

/** An event and its year (CE). Events in one list may share a year; a question never compares two of them. */
export type Dated = readonly [event: string, year: number];

/** Pick `n` events with different years. */
function distinctYears(events: readonly Dated[], n: number): Dated[] {
  const out: Dated[] = [];
  for (const e of shuffle(events)) {
    if (out.length >= n) break;
    if (out.every((o) => o[1] !== e[1])) out.push(e);
  }
  return out;
}

const listYears = (es: readonly Dated[]) =>
  [...es]
    .sort((a, b) => a[1] - b[1])
    .map(([e, y]) => `${e} (${y})`)
    .join(", ");

/** "Which happened first/last?", "Put these in order" and "In what year…?" questions from dated events. */
export function timelineQuestions(events: readonly Dated[], count: number, d: Difficulty): Question[] {
  const out: Question[] = [];
  for (let i = 0; i < count; i++) {
    const kind = pick(["first", "last", "order", "year"] as const);
    if (kind === "order") {
      const n = d === 1 ? 3 : d === 2 ? 4 : 5;
      const es = distinctYears(events, n).sort((a, b) => a[1] - b[1]);
      const q: OrderQuestion = {
        kind: "order",
        prompt: "Put these events in order, earliest first.",
        hint: `In order: ${listYears(es)}.`,
        items: es.map(([e], j) => ({ id: `e${j}`, label: e })),
      };
      out.push(q);
    } else if (kind === "year") {
      const [right, ...others] = distinctYears(events, 4);
      out.push(
        textChoice(
          `In what year did this happen? ${right[0]}`,
          String(right[1]),
          others.map((o) => String(o[1])),
          `${right[0]}: ${right[1]}.`,
        ),
      );
    } else {
      const es = distinctYears(events, d === 1 ? 3 : 4);
      const sorted = [...es].sort((a, b) => a[1] - b[1]);
      const right = kind === "first" ? sorted[0] : sorted[sorted.length - 1];
      out.push(
        textChoice(
          kind === "first" ? "Which of these happened first?" : "Which of these happened last?",
          right[0],
          es.filter((e) => e !== right).map((e) => e[0]),
          `Put them in order: ${listYears(es)}.`,
        ),
      );
    }
  }
  return out;
}

/** A unit of timeline questions, mixed with a few bank items. */
export function timelineUnit(meta: Meta & { events: readonly Dated[]; items?: Q[] }): Unit {
  const items = meta.items ?? [];
  return mixUnit({
    ...meta,
    make: (d) => [...timelineQuestions(meta.events, items.length ? 6 : 8, d), ...fromItems(items, items.length ? 2 : 0, d)],
  });
}

// ---------------------------------------------------------------------------------------------------------------
// Fact tables

/**
 * Questions from a table of unique key → value pairs, asked both ways: `ask(key)` has the value as its answer,
 * `reverse(value)` has the key. Wrong answers are other rows' values (or keys).
 */
export function factQuestions(
  rows: readonly (readonly [string, string])[],
  count: number,
  opts: {
    ask: (key: string) => string;
    reverse?: (value: string) => string;
    hint: (key: string, value: string) => string;
    /** Wrong answers to leave out for a row, if any could confuse. */
    avoid?: (key: string, value: string) => string[];
    wrong?: number;
  },
): Question[] {
  const nWrong = opts.wrong ?? 3;
  return sample(rows, count).map(([key, value]) => {
    const avoid = new Set(opts.avoid?.(key, value) ?? []);
    const others = rows.filter(([k, v]) => k !== key && !avoid.has(k) && !avoid.has(v));
    const wrongRows = sample(others, nWrong);
    if (opts.reverse && randInt(0, 1) === 1) {
      return textChoice(opts.reverse(value), key, wrongRows.map(([k]) => k), opts.hint(key, value));
    }
    return textChoice(opts.ask(key), value, wrongRows.map(([, v]) => v), opts.hint(key, value));
  });
}

// ---------------------------------------------------------------------------------------------------------------
// Copies without Washington State

/** "Washington" meaning the state (George Washington and Washington, D.C. are fine). */
const STATE = /Washington(?!,? D\.?C\.?)/;
export const mentionsWashingtonState = (q: Question) =>
  questionText(q)
    .split("\n")
    .some((line) => STATE.test(line.replace(/George Washington/g, "")));

/**
 * An Oregon copy of another framework's unit with every question about Washington State left out, so Oregon
 * families never see "our state" meaning Washington. It draws extra sets from the original to fill each set.
 */
export function withoutWashington(base: Unit, meta: Meta): Unit {
  return {
    ...meta,
    standards: ore(meta.standards[0], meta.standards[1]),
    generate: (opts) => {
      const first = base.generate(opts);
      const out: Question[] = [];
      const seen = new Set<string>();
      let batch = first;
      for (let tries = 0; tries < 30 && out.length < first.length; tries++) {
        for (const q of batch) {
          if (out.length >= first.length) break;
          if (mentionsWashingtonState(q) || seen.has(q.prompt)) continue;
          seen.add(q.prompt);
          out.push(q);
        }
        batch = base.generate(opts);
      }
      return out;
    },
  };
}
