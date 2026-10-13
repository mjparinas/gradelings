import { questionText } from "../../locale";
import { shuffle } from "../../random";
import type { GenerateOptions, Question, Unit } from "../../types";
import {
  fromItems,
  timelineQuestions,
  factQuestions,
  type Dated,
} from "../../oregon/units/social-kit";
import { cal } from "../cite";
import type { Q } from "../own";

export { fromItems, timelineQuestions, factQuestions, type Dated };

// Helpers for California's own units: mixed units (a hand-written bank plus generated questions), timelines, and
// California copies of Washington and Oregon units with their state-specific questions left out.

export type Difficulty = 1 | 2 | 3;
export const level = (opts?: GenerateOptions): Difficulty =>
  opts?.difficulty ?? 2;

export interface Meta {
  id: string;
  title: string;
  emoji: string;
  blurb: string;
  parentNote: string;
  /** California codes ("4.2.1; 4.2.3"), then a short plain description. */
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
    standards: cal(meta.standards[0], meta.standards[1]),
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
// Copies without Washington or Oregon

/**
 * Washington or Oregon as a place, and the Pacific Northwest places their units are built around. George Washington,
 * Martha Washington, Washington, D.C. and the Oregon Trail (US history) are fine.
 */
const OTHER_STATE =
  /Washington(?!,? D\.?C\.?)|Oregon(?! Trail)|Puget|Rainier|Cascad|Columbia River|Columbia Gorge|Seattle|Spokane|Tacoma|Olympia|Olympic Peninsula|Olympic Mountains|Yakima|Willamette|Portland|Mount Hood|St\. Helens|Salem(?! witch)|Crater Lake|Pacific Northwest/;

/** Words that mark a question about Tribes or treaties; Washington's and Oregon's Tribal content stays theirs. */
const TRIBAL = /\b(Tribes?|Tribal|treaty|treaties)\b|\bNative\b/;

/** Whether a question is about Washington's or Oregon's Tribes, or Tribes and treaties in general. */
export const mentionsTribes = (q: Question): boolean =>
  TRIBAL.test(questionText(q));

/** Whether a question names Washington State, Oregon or a Pacific Northwest place. */
export const mentionsOtherState = (q: Question): boolean =>
  questionText(q)
    .split("\n")
    .some((line) =>
      OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")),
    );

/**
 * A California copy of a Washington or Oregon unit: every question that names Washington State, Oregon or a Pacific
 * Northwest place, or that is about Tribes or treaties (Washington's and Oregon's Tribal content is never borrowed), is
 * left out, and California-written items (`extra`) fill some of each set. It draws more sets from
 * the original to fill each set. A copy gets its own `ca-` id, because its question set differs from the original.
 */
export function copyOf(base: Unit, meta: Meta, extra: Q[] = []): Unit {
  return {
    id: meta.id,
    title: meta.title,
    emoji: meta.emoji,
    blurb: meta.blurb,
    parentNote: meta.parentNote,
    standards: cal(meta.standards[0], meta.standards[1]),
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
  if (!u) throw new Error(`California: no unit "${id}" to copy`);
  return u;
};
