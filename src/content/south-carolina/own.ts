import { fromBank, type BankItem } from "../bank";
import { sample } from "../random";
import type { GenerateOptions, Question, Unit } from "../types";
import { sca } from "./cite";

// Units written for South Carolina from hand-written multiple-choice banks. The same bank feeds every difficulty: easy
// sets use only the core items, harder sets mix in the stretch items (marked with `true`). Each bank needs at least
// 24 distinct items (coverage.test.ts).

/** prompt, right answer, wrong answers, hint, and `true` for a stretch item. */
export type Q = readonly [
  prompt: string,
  right: string,
  wrong: string[],
  hint: string,
  hard?: true,
];

interface Spec {
  id: string;
  title: string;
  emoji: string;
  blurb: string;
  parentNote: string;
  /** South Carolina standards codes ("4.2.CX; 4.2.CO"), then a short plain description. */
  standards: readonly [codes: string, text: string];
  items: Q[];
  /** Questions per set (8 by convention). */
  size?: number;
}

const toBank = ([prompt, right, wrong, hint]: Q): BankItem => ({
  prompt,
  right,
  wrong,
  hint,
});

export function bankUnit(spec: Spec): Unit {
  const easy = spec.items.filter((q) => !q[4]).map(toBank);
  const hard = spec.items.filter((q) => q[4]).map(toBank);
  const size = spec.size ?? 8;
  return {
    id: spec.id,
    title: spec.title,
    emoji: spec.emoji,
    blurb: spec.blurb,
    parentNote: spec.parentNote,
    standards: sca(spec.standards[0], spec.standards[1]),
    generate: (opts?: GenerateOptions): Question[] => {
      const d = opts?.difficulty ?? 2;
      const want =
        d === 1 ? 0 : d === 2 ? Math.ceil(size / 3) : Math.ceil((size * 2) / 3);
      const nHard = Math.min(want, hard.length);
      return [
        ...fromBank(easy, size - nHard),
        ...fromBank(sample(hard, nHard), nHard),
      ].slice(0, size);
    },
  };
}
