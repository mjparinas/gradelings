import { pick, randInt, sample, shuffle, textChoice } from "../../random";
import type { ChoiceQuestion, Choice, Question, Unit } from "../../types";
import { tx } from "../cite";
import type { Q } from "../own";
import { fromItems, level, type Difficulty, type Meta } from "./kit";

// Helpers for Texas's own math units (`tx-` ids): units built from question makers (with a few hand-written bank items
// mixed in), Texas copies of another framework's unit that keep only the questions that fit the TEKS, and US money.

export type Maker = (d: Difficulty) => Question;

/**
 * A unit whose 8 questions cycle through `makers` in a shuffled order, so every set mixes the kinds of question.
 * `items` (a bank, `true` marking stretch items) fill `nItems` of each set.
 */
export function makerUnit(meta: Meta & { makers: Maker[]; items?: Q[]; nItems?: number }): Unit {
  const items = meta.items ?? [];
  const nItems = items.length ? (meta.nItems ?? 3) : 0;
  return {
    id: meta.id,
    title: meta.title,
    emoji: meta.emoji,
    blurb: meta.blurb,
    parentNote: meta.parentNote,
    standards: tx(meta.standards[0], meta.standards[1]),
    generate: (opts) => {
      const d = level(opts);
      const out: Question[] = fromItems(items, nItems, d);
      let pool: Maker[] = [];
      while (out.length < 8) {
        if (!pool.length) pool = shuffle(meta.makers);
        out.push(pool.pop()!(d));
      }
      return shuffle(out);
    },
  };
}

const looks = (q: Question): string => JSON.stringify([q.prompt, q.visual ?? null, q.kind === "choice" ? q.choices.map((c) => c.label) : null]);

/**
 * A Texas copy of another unit that keeps only the questions `keep` accepts (questions outside the Texas grade's TEKS
 * are left out). It draws more sets from the original until each set is full. A copy gets its own `tx-` id, because
 * its question set differs from the original's.
 */
export function keepOnly(base: Unit, meta: Meta, keep: (q: Question) => boolean): Unit {
  return {
    id: meta.id,
    title: meta.title,
    emoji: meta.emoji,
    blurb: meta.blurb,
    parentNote: meta.parentNote,
    standards: tx(meta.standards[0], meta.standards[1]),
    generate: (opts) => {
      const out: Question[] = [];
      const seen = new Set<string>();
      for (let tries = 0; tries < 40 && out.length < 8; tries++) {
        for (const q of base.generate(opts)) {
          if (out.length >= 8) break;
          const key = looks(q);
          if (!keep(q) || seen.has(key)) continue;
          seen.add(key);
          out.push(q);
        }
      }
      return out;
    },
  };
}

// ---------------------------------------------------------------------------------------------------------------
// US money

export const COIN: Record<number, string> = { 1: "penny", 5: "nickel", 10: "dime", 25: "quarter" };
export const COINS_OF: Record<number, string> = { 1: "pennies", 5: "nickels", 10: "dimes", 25: "quarters" };

/** An amount of money: "35¢" under a dollar, "$2.40" from a dollar up. */
export const money = (cents: number): string => (cents < 100 ? `${cents}¢` : `$${(cents / 100).toFixed(2)}`);

/** Marks a question as US money, so coins show as US coins. */
export const usd = <T extends Question>(q: T): T => ({ ...q, currency: "USD" });

/** A multiple-choice question with money answers: the right amount and up to 3 near misses. */
export function moneyChoice(prompt: string, cents: number, hint: string, near: number[], coins?: number[]): ChoiceQuestion {
  const wrong = [...new Set(near.filter((n) => n > 0 && n !== cents))].slice(0, 3).map(money);
  return usd(textChoice(prompt, money(cents), wrong, hint, coins ? { type: "coins", coins, currency: "USD" } : undefined));
}

/** A multiple-choice question from text options; the first is right. Wrong options equal to it are dropped. */
export function choose(prompt: string, right: string | Omit<Choice, "id">, wrong: (string | Omit<Choice, "id">)[], hint: string): ChoiceQuestion {
  const label = (c: string | Omit<Choice, "id">) => (typeof c === "string" ? c : c.label);
  const seen = new Set([label(right)]);
  const ws = wrong.filter((w) => !seen.has(label(w)) && (seen.add(label(w)), true));
  return textChoice(prompt, right, ws, hint);
}

export { pick, randInt, sample };
