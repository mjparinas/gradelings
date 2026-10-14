import { shuffle } from "../../random";
import type { GenerateOptions, Question, Unit } from "../../types";
import { fromItems, timelineQuestions, factQuestions, type Dated } from "../../oregon/units/social-kit";
import { ak } from "../cite";
import type { Q } from "../own";

export { fromItems, timelineQuestions, factQuestions, type Dated };

// Helpers for Alaska's own units: mixed units (a hand-written bank plus generated questions) and timelines. The question
// builders are Oregon's (../../oregon/units/social-kit), shared by every US state.

export type Difficulty = 1 | 2 | 3;
const level = (opts?: GenerateOptions): Difficulty => opts?.difficulty ?? 2;

export interface Meta {
  id: string;
  title: string;
  emoji: string;
  blurb: string;
  parentNote: string;
  /** Alaska standards ("SS.3.1.23.1; SS.3.1.20.1"), then a short plain description. */
  standards: readonly [codes: string, text: string];
}

/** A unit whose 8 questions come from `make`, shuffled. */
export function mixUnit(meta: Meta & { make: (d: Difficulty) => Question[] }): Unit {
  return {
    id: meta.id,
    title: meta.title,
    emoji: meta.emoji,
    blurb: meta.blurb,
    parentNote: meta.parentNote,
    standards: ak(meta.standards[0], meta.standards[1]),
    generate: (opts) => shuffle(meta.make(level(opts))).slice(0, 8),
  };
}

/** A unit of timeline questions, mixed with a few bank items. */
export function timelineUnit(meta: Meta & { events: readonly Dated[]; items?: Q[] }): Unit {
  const items = meta.items ?? [];
  return mixUnit({
    ...meta,
    make: (d) => [...timelineQuestions(meta.events, items.length ? 5 : 8, d), ...fromItems(items, items.length ? 3 : 0, d)],
  });
}
