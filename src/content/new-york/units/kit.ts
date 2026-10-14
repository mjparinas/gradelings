import { questionText } from "../../locale";
import { shuffle } from "../../random";
import type { GenerateOptions, Question, Unit } from "../../types";
import {
  fromItems,
  timelineQuestions,
  factQuestions,
  type Dated,
} from "../../oregon/units/social-kit";
import { nys } from "../cite";
import type { Q } from "../own";

export { fromItems, timelineQuestions, factQuestions, type Dated };

// Helpers for New York's own units: mixed units (a hand-written bank plus generated questions), timelines, and
// New York copies of Washington, Oregon and California units with their state-specific questions left out.

export type Difficulty = 1 | 2 | 3;
export const level = (opts?: GenerateOptions): Difficulty =>
  opts?.difficulty ?? 2;

export interface Meta {
  id: string;
  title: string;
  emoji: string;
  blurb: string;
  parentNote: string;
  /** New York codes ("4.2a; 4.2b"), then a short plain description. */
  standards: readonly [codes: string, text: string];
}

/** A unit whose 8 questions come from `make`, shuffled. */
export function mixUnit(
  meta: Meta & { make: (d: Difficulty) => Question[] },
): Unit {
  return {
    id: meta.id,
    title: meta.title,
    emoji: meta.emoji,
    blurb: meta.blurb,
    parentNote: meta.parentNote,
    standards: nys(meta.standards[0], meta.standards[1]),
    generate: (opts) => shuffle(meta.make(level(opts))).slice(0, 8),
  };
}

/** A unit of timeline questions, mixed with a few bank items. */
export function timelineUnit(
  meta: Meta & { events: readonly Dated[]; items?: Q[] },
): Unit {
  const items = meta.items ?? [];
  return mixUnit({
    ...meta,
    make: (d) => [
      ...timelineQuestions(meta.events, items.length ? 5 : 8, d),
      ...fromItems(items, items.length ? 3 : 0, d),
    ],
  });
}

// ---------------------------------------------------------------------------------------------------------------
// Copies without Washington, Oregon or California

/**
 * Washington, Oregon or California as a place, and the places their units are built around. George Washington, Martha
 * Washington, Washington, D.C., the Oregon Trail and the California Gold Rush (US history) are fine.
 */
export const OTHER_STATE =
  /Washington(?!,? D\.?C\.?)|Oregon(?! Trail)|California(?! Gold Rush)|Californian|Puget|Rainier|Cascad|Columbia River|Columbia Gorge|Seattle|Spokane|Tacoma|Olympia|Olympic Peninsula|Olympic Mountains|Yakima|Willamette|Portland|Mount Hood|St\. Helens|Salem(?! witch)|Crater Lake|Pacific Northwest|Sacramento|Los Angeles|San Diego|San Francisco|San Jose|Sierra Nevada|Mojave|Yosemite|Central Valley|Death Valley|Golden State|mission(s)? (system|period|era)|rancho/;

/** Words that mark a question about Tribes or treaties; Washington's, Oregon's and California's Tribal and California Indian content stays theirs. */
const TRIBAL = /\b(Tribes?|Tribal|treaty|treaties|California Indian)\b|\bNative\b/;

/** Whether a question is about Washington's or Oregon's Tribes, or Tribes and treaties in general. */
export const mentionsTribes = (q: Question): boolean =>
  TRIBAL.test(questionText(q));

/** Whether a question names Washington State, Oregon, California or a place in them. */
export const mentionsOtherState = (q: Question): boolean =>
  questionText(q)
    .split("\n")
    .some((line) =>
      OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")),
    );

/**
 * A New York copy of a Washington, Oregon or California unit: every question that names one of those states or a place
 * in them, or that is about Tribes or treaties (their Tribal and California Indian content is never borrowed), is left
 * out, and New York-written items (`extra`) fill some of each set. It draws more sets from the original to fill each
 * set. A copy gets its own `ny-` id, because its question set differs from the original.
 */
export function copyOf(base: Unit, meta: Meta, extra: Q[] = []): Unit {
  return {
    id: meta.id,
    title: meta.title,
    emoji: meta.emoji,
    blurb: meta.blurb,
    parentNote: meta.parentNote,
    standards: nys(meta.standards[0], meta.standards[1]),
    generate: (opts) => {
      const first = base.generate(opts);
      const size = first.length;
      const nExtra = extra.length
        ? Math.min(
            extra.length,
            Math.max(
              2,
              Math.round((size * extra.length) / (extra.length + 20)),
            ),
          )
        : 0;
      const out: Question[] = [];
      const seen = new Set<string>();
      let batch = first;
      for (let tries = 0; tries < 30 && out.length < size - nExtra; tries++) {
        for (const q of batch) {
          if (out.length >= size - nExtra) break;
          if (mentionsOtherState(q) || mentionsTribes(q) || seen.has(q.prompt))
            continue;
          seen.add(q.prompt);
          out.push(q);
        }
        batch = base.generate(opts);
      }
      const added = fromItems(extra, nExtra, level(opts)).filter(
        (q) => !seen.has(q.prompt),
      );
      return shuffle([...out, ...added]);
    },
  };
}

/** Finds a unit by id in a list, for copies. */
export const from = (units: readonly Unit[], id: string): Unit => {
  const u = units.find((x) => x.id === id);
  if (!u) throw new Error(`New York: no unit "${id}" to copy`);
  return u;
};
