import { canadianWords, questionText } from "../../locale";
import { shuffle } from "../../random";
import type { GenerateOptions, Question, Unit } from "../../types";
import { fromItems, timelineQuestions, factQuestions, type Dated } from "../../oregon/units/social-kit";
import { nca } from "../cite";
import type { Q } from "../own";

export { fromItems, timelineQuestions, factQuestions, type Dated };

// Helpers for North Carolina's own units: mixed units (a hand-written bank plus generated questions), timelines, and
// North Carolina copies of other states' units with their state-specific questions left out.

export type Difficulty = 1 | 2 | 3;
export const level = (opts?: GenerateOptions): Difficulty => opts?.difficulty ?? 2;

export interface Meta {
  id: string;
  title: string;
  emoji: string;
  blurb: string;
  parentNote: string;
  /** North Carolina standard codes ("4.H.1.3; 4.G.1.1"), then a short plain description. */
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
    standards: nca(meta.standards[0], meta.standards[1]),
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
 * Washington, Oregon or California as a place, and the places other states' units are built around (New York's
 * mountains, parks and suburbs, and Alabama, Alaska, Arizona, Florida, Illinois, Colorado, Pennsylvania and Georgia among them). George Washington, Washington, D.C., the Oregon Trail, the California Gold
 * Rush, and New York, the Hudson and the Erie Canal in US history are fine.
 */
export const OTHER_STATE =
  /Washington(?!,? D\.?C\.?)|Oregon(?! Trail)|California(?! Gold Rush)|Californian|Puget|Rainier|Cascad|Columbia River|Columbia Gorge|Seattle|Spokane|Tacoma|(?<!at )Olympia|Olympic Peninsula|Olympic Mountains|Yakima|Willamette|Portland|Mount Hood|St\. Helens|Salem(?! witch)|Crater Lake|Pacific Northwest|Sacramento|Los Angeles|San Diego|San Francisco|San Jose|Sierra Nevada|Mojave|Yosemite|Central Valley|Death Valley|Golden State|mission(s)? (system|period|era)|rancho|Adirondack|Catskill|Niagara Falls|Long Island|Levittown|Elwha|Hanford|Palouse|San Andreas|Cascadia|Texas(?! (annexation|Revolution|independence))|Texan|Tejano|Alamo|Houston|Dallas|San Antonio|Minnesota|Minneapolis|Saint Paul|St\. Paul(?!'s)|Maine(?! \(the ship\))|Wabanaki|Penobscot|Passamaquoddy|Alabama(?!-Coushatta)|Montgomery|Birmingham|Huntsville|Mobile Bay|Tuscaloosa|Selma|Alaska|Anchorage|Juneau|Fairbanks|Denali|Arizona|Phoenix|Tucson|Grand Canyon|Sonoran|Arkansas(?! River)|Little Rock|Ozark|(?<!Spanish )Florida|Miami|Tallahassee|Everglades|Orlando|Tampa|Jacksonville|Key West|Seminole|Miccosukee|Illinois|Chicago|Springfield, Illinois|Colorado(?! River)|Coloradan|Denver|Pikes Peak|Mesa Verde|Pittsburgh|Harrisburg|Keystone State|(?<!Spanish Florida and )Georgia(?! colony)|Atlanta|Okefenokee|Chattahoochee|Stone Mountain/;

/** Words that mark a question about Tribes or treaties; other states' Tribal and California Indian content stays theirs. */
const TRIBAL = /\b(Tribes?|Tribal|treaty|treaties|California Indian)\b|\bNative\b/;

/** Whether a question is about another state's Tribes, or Tribes and treaties in general. */
export const mentionsTribes = (q: Question): boolean => TRIBAL.test(questionText(q));

/** Whether a question names Washington State, Oregon, California or a place other states' units are built around. */
export const mentionsOtherState = (q: Question): boolean =>
  questionText(q)
    .split("\n")
    .some((line) => OTHER_STATE.test(line.replace(/(George|Martha) Washington/g, "")));

/**
 * A North Carolina copy of another state's or province's unit: every question that names another state or a place in it,
 * names Canada or a Canadian place, or is about Tribes or treaties (other states' Tribal content is never borrowed), is left out, and North Carolina-written items (`extra`)
 * fill some of each set. It draws more sets from the original to fill each set. A copy gets its own `nc-` id, because
 * its question set differs from the original.
 */
export function copyOf(base: Unit, meta: Meta, extra: Q[] = []): Unit {
  return {
    id: meta.id,
    title: meta.title,
    emoji: meta.emoji,
    blurb: meta.blurb,
    parentNote: meta.parentNote,
    standards: nca(meta.standards[0], meta.standards[1]),
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
          if (mentionsOtherState(q) || mentionsTribes(q) || canadianWords(questionText(q)).length || seen.has(q.prompt)) continue;
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

/**
 * A copy that keeps the original's title and notes and only leaves out the questions that name another state, for
 * units that fit North Carolina except for a few items. `extra` adds North Carolina items and `meta` replaces any wording that needs it.
 */
export const localCopy = (base: Unit, id: string, standards: Meta["standards"], extra: Q[] = [], meta: Partial<Meta> = {}): Unit =>
  copyOf(base, { id, title: base.title, emoji: base.emoji, blurb: base.blurb, parentNote: base.parentNote ?? "", standards, ...meta }, extra);

/** Finds a unit by id in a list, for copies. */
export const from = (units: readonly Unit[], id: string): Unit => {
  const u = units.find((x) => x.id === id);
  if (!u) throw new Error(`North Carolina: no unit "${id}" to copy`);
  return u;
};
