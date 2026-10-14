import { pick, sample, shuffle } from "../../random";
import type { ChoiceQuestion, GenerateOptions, Question, Unit } from "../../types";
import { type Maker, pickOne } from "../../washington/units/math-kit";
import { nys } from "../cite";
import type { Q } from "../own";

// New York's own math units (`ny-` ids), for the New York standards no other framework's unit practises: exploring
// coins in Kindergarten (NY-K.MD.4) and naming coins and counting dimes and pennies in Grade 1 (NY-1.MD.3b, 3c). Every
// other New York math unit is shared or adopted (../plan/math.ts). A set of 8 questions cycles through the unit's
// question makers in a shuffled order, so every set mixes the kinds of question.

export interface Spec {
  id: string;
  title: string;
  emoji: string;
  blurb: string;
  parentNote: string;
  /** New York codes ("NY-K.MD.4"), then a short plain description. */
  codes: string;
  text: string;
  makers: Maker[];
}

export function mathUnit(spec: Spec): Unit {
  return {
    id: spec.id,
    title: spec.title,
    emoji: spec.emoji,
    blurb: spec.blurb,
    parentNote: spec.parentNote,
    standards: nys(spec.codes, spec.text),
    generate: (opts?: GenerateOptions): Question[] => {
      const d = opts?.difficulty ?? 2;
      const out: Question[] = [];
      let pool: Maker[] = [];
      while (out.length < 8) {
        if (!pool.length) pool = shuffle(spec.makers);
        out.push(pool.pop()!(d));
      }
      return out;
    },
  };
}

// ---------- US coins ----------

export const COIN: Record<number, string> = { 1: "penny", 5: "nickel", 10: "dime", 25: "quarter" };
export const COINS: Record<number, string> = { 1: "pennies", 5: "nickels", 10: "dimes", 25: "quarters" };
export const cents = (c: number): string => `${c}¢`;

/** What each coin looks like, for hints. */
export const COIN_LOOK: Record<number, string> = {
  1: "A penny is the only coin that is not silver. It is worth 1¢.",
  5: "A nickel is silver, bigger and thicker than a dime. It is worth 5¢.",
  10: "A dime is the smallest coin. It is silver and worth 10¢.",
  25: "A quarter is the biggest of these coins. It is silver and worth 25¢.",
};

/** Marks a question as US money, so coin pictures show US coins. */
export const usd = <Q extends ChoiceQuestion>(q: Q): Q => ({ ...q, currency: "USD" });

// ---------- Hand-written items ----------

/**
 * A maker that asks one hand-written item (prompt, right answer, wrong answers, hint, `true` for a stretch item). The
 * easy level uses only the core items; each question shows up to three wrong answers.
 */
export function bank(items: readonly Q[]): Maker {
  const core = items.filter((q) => !q[4]);
  return (d) => {
    const [prompt, right, wrong, hint] = pick(d === 1 && core.length ? core : items);
    return pickOne(prompt, right, sample(wrong, Math.min(3, wrong.length)), hint);
  };
}
