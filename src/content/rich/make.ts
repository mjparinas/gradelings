import { pick, randInt, sample, shuffle } from "../random";
import type { FillQuestion, HighlightQuestion, MatchQuestion, MistakeQuestion, MultiQuestion, TilesQuestion } from "../types";

// Builders for the newer question kinds. Each takes plain data, so a unit's pool reads like a list.

/** Words in a sentence with the right ones marked [[like this]]. */
export function highlight(prompt: string, marked: string, hint: string): HighlightQuestion {
  const words = marked.split(" ");
  const answers: number[] = [];
  const clean = words.map((w, i) => {
    const m = w.match(/^(\W*)\[\[(.+)\]\](\W*)$/u);
    if (!m) return w;
    answers.push(i);
    return `${m[1]}${m[2]}${m[3]}`;
  });
  return { kind: "highlight", prompt, hint, words: clean, answers };
}

/** Match pairs; `left` and `right` are [label, emoji?] and a pair's id is its position. */
export function match(
  prompt: string,
  hint: string,
  pairs: { left: string | [string, string]; right: string | [string, string]; picture?: "left" | "right" }[],
): MatchQuestion {
  const side = (x: string | [string, string], picture: boolean) =>
    typeof x === "string" ? { label: x } : { label: x[0], emoji: x[1], ...(picture ? { picture: true } : {}) };
  return {
    kind: "match",
    prompt,
    hint,
    pairs: pairs.map((p, i) => ({ id: `p${i}`, left: side(p.left, p.picture === "left"), right: side(p.right, p.picture === "right") })),
  };
}

/** Select all: `right` and `wrong` are labels with an optional emoji. */
export function multi(prompt: string, hint: string, right: [string, string?][], wrong: [string, string?][]): MultiQuestion {
  const mixed = shuffle([...right.map((r) => ({ r, ok: true })), ...wrong.map((r) => ({ r, ok: false }))]);
  return {
    kind: "multi",
    prompt,
    hint,
    choices: mixed.map((c, i) => ({ id: `m${i}`, label: c.r[0], ...(c.r[1] ? { emoji: c.r[1] } : {}) })),
    answers: mixed.flatMap((c, i) => (c.ok ? [`m${i}`] : [])),
  };
}

export function mistake(prompt: string, hint: string, steps: string[], wrong: number): MistakeQuestion {
  return { kind: "mistake", prompt, hint, steps, wrong };
}

export function fill(prompt: string, hint: string, text: string, answers: string[], bank: string[]): FillQuestion {
  return { kind: "fill", prompt, hint, text, answers, bank };
}

export function tiles(prompt: string, hint: string, parts: string[], opts: Partial<Pick<TilesQuestion, "extra" | "join" | "accept" | "visual">> = {}): TilesQuestion {
  return { kind: "tiles", prompt, hint, tiles: parts, ...opts };
}

export const NAMES = ["Mia", "Ravi", "Zoe", "Kai", "Ana", "Omar", "Priya", "Leo"];
export const aName = () => pick(NAMES);
export { randInt, sample };
