import { questionText } from "../../locale";
import { shuffle } from "../../random";
import type { GenerateOptions, Question, Unit } from "../../types";
import { fromItems, timelineQuestions, factQuestions, type Dated } from "../../oregon/units/social-kit";
import { OTHER_STATE as MN_OTHER_STATE } from "../../minnesota/units/kit";
import { az } from "../cite";
import type { Q } from "../own";

export { fromItems, timelineQuestions, factQuestions, type Dated };

// Helpers for Arizona's own units: mixed units (a hand-written bank plus generated questions), timelines, and Arizona
// copies of other states' units with their state-specific questions left out. The question builders are Oregon's
// (../../oregon/units/social-kit), shared by every US state.

export type Difficulty = 1 | 2 | 3;
export const level = (opts?: GenerateOptions): Difficulty => opts?.difficulty ?? 2;

export interface Meta {
  id: string;
  title: string;
  emoji: string;
  blurb: string;
  parentNote: string;
  /** Arizona standards ("SS.3.1.23.1; SS.3.1.20.1"), then a short plain description. */
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
    standards: az(meta.standards[0], meta.standards[1]),
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

// ---------------------------------------------------------------------------------------------------------------
// Copies without other states

/**
 * Other states as places: Washington, Oregon and California and the places their units are built around (Minnesota's
 * list, ../../minnesota/units/kit.ts), plus the states other units are written for (Texas, New York, Minnesota, Maine and
 * Alaska). George Washington, Washington, D.C., the Oregon Trail and the California Gold Rush are fine.
 */
const OTHER_STATE = new RegExp(`${MN_OTHER_STATE.source}|Texas|Texan|New York|Minnesota|Maine\\b|Alaska|Wyoming`);

/** Words that mark a question about Tribes or treaties; other states' Tribal content stays theirs. */
const TRIBAL = /\b(Tribes?|Tribal|treaty|treaties|California Indian)\b|\bNative\b/;

/** Whether a question names another state, or is about Tribes or treaties. */
export const leaveOut = (q: Question): boolean => {
  const text = questionText(q);
  return TRIBAL.test(text) || text.split("\n").some((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));
};

/**
 * An Arizona copy of another state's unit: every question that names another state, or that is about Tribes or treaties,
 * is left out, and Arizona-written items (`extra`) fill some of each set. It draws more sets from the original to fill
 * each set. A copy gets its own `az-` id, because its question set differs from the original.
 */
export function copyOf(base: Unit, meta: Meta, extra: Q[] = []): Unit {
  return {
    id: meta.id,
    title: meta.title,
    emoji: meta.emoji,
    blurb: meta.blurb,
    parentNote: meta.parentNote,
    standards: az(meta.standards[0], meta.standards[1]),
    generate: (opts) => {
      const first = base.generate(opts);
      const size = first.length;
      const nExtra = extra.length ? Math.min(extra.length, Math.max(2, Math.round((size * extra.length) / (extra.length + 20)))) : 0;
      const out: Question[] = [];
      const seen = new Set<string>();
      let batch = first;
      for (let tries = 0; tries < 30 && out.length < size - nExtra; tries++) {
        for (const q of batch) {
          if (out.length >= size - nExtra) break;
          if (leaveOut(q) || seen.has(q.prompt)) continue;
          seen.add(q.prompt);
          out.push(q);
        }
        batch = base.generate(opts);
      }
      const added = fromItems(extra, nExtra, level(opts)).filter((q) => !seen.has(q.prompt));
      return shuffle([...out, ...added]);
    },
  };
}

/** Finds a unit by id in a list, for copies. */
export const from = (units: readonly Unit[], id: string): Unit => {
  const u = units.find((x) => x.id === id);
  if (!u) throw new Error(`Arizona: no unit "${id}" to copy`);
  return u;
};
