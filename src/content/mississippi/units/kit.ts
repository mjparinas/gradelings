import { questionText } from "../../locale";
import { shuffle } from "../../random";
import type { GenerateOptions, Question, Unit } from "../../types";
import { fromItems, timelineQuestions, factQuestions, type Dated } from "../../oregon/units/social-kit";
import { mss } from "../cite";
import type { Q } from "../own";

export { fromItems, timelineQuestions, factQuestions, type Dated };

// Helpers for Mississippi's own units: mixed units (a hand-written bank plus generated questions), timelines, and
// Mississippi copies of other states' units with their state-specific questions left out.

export type Difficulty = 1 | 2 | 3;
export const level = (opts?: GenerateOptions): Difficulty => opts?.difficulty ?? 2;

export interface Meta {
  id: string;
  title: string;
  emoji: string;
  blurb: string;
  parentNote: string;
  /** Mississippi standard codes ("4.MS.1; 4.MS.11"), then a short plain description. */
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
    standards: mss(meta.standards[0], meta.standards[1]),
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
 * mountains, parks and suburbs, and Alabama, Alaska, Arizona, Florida, Illinois, Colorado and Ohio among them). George
 * Washington, Washington, D.C., the Oregon Trail, the California Gold Rush, the Ohio River, and New York, the Hudson and
 * the Erie Canal in US history are fine.
 */
export const OTHER_STATE =
  /Washington(?!,? D\.?C\.?)|Oregon(?! Trail)|California(?! Gold Rush)|Californian|Puget|Rainier|Cascad|Columbia River|Columbia Gorge|Seattle|Spokane|Tacoma|(?<!at )Olympia|Olympic Peninsula|Olympic Mountains|Yakima|Willamette|Portland|Mount Hood|St\. Helens|Salem(?! witch)|Crater Lake|Pacific Northwest|Sacramento|Los Angeles|San Diego|San Francisco|San Jose|Sierra Nevada|Mojave|Yosemite|Central Valley|Death Valley|Golden State|mission(s)? (system|period|era)|rancho|Adirondack|Catskill|Niagara Falls|Long Island|Levittown|Elwha|Hanford|Palouse|San Andreas|Cascadia|Texas(?! (annexation|Revolution|independence))|Texan|Tejano|Alamo|Houston|Dallas|San Antonio|Minnesota|Minneapolis|Saint Paul|St\. Paul(?!'s)|Maine(?! \(the ship\))|Wabanaki|Penobscot|Passamaquoddy|Alabama(?!-Coushatta)|Montgomery|Birmingham|Huntsville|Mobile Bay|Tuscaloosa|Selma|Alaska|Anchorage|Juneau|Fairbanks|Denali|Arizona|Phoenix|Tucson|Grand Canyon|Sonoran|Arkansas(?! River)|Little Rock|Ozark|Florida|Miami|Tallahassee|Everglades|Orlando|Tampa|Jacksonville|Key West|Seminole|Miccosukee|Illinois|Chicago|Springfield, Illinois|Colorado(?! River)|Denver|Pikes Peak|Front Range|Mesa Verde|Amache|Sand Creek|Ohio(?! (River|Valley|Country))|Columbus, Ohio|Cleveland|Cincinnati|Toledo|Akron|Lake Erie|Pennsylvania(?! (colony|Colony))|Pittsburgh|Philadelphia(?! Convention)|Harrisburg|Atlanta|Savannah|Okefenokee|Stone Mountain|Tennessee|Nashville|Memphis|Knoxville|Chattanooga|Michigan|Detroit|Wisconsin|Milwaukee|Maryland|Baltimore|Chesapeake|Missouri(?! (River|Compromise))|Kansas City|Massachusetts(?! Bay)|Indiana|Hoosier|North Carolina|South Carolina|New Jersey(?! Plan)|Virginia(?! (Company|Plan|Declaration))|Coloradan|Keystone State|Peach State|Sunshine State|Okeechobee|Pensacola|Ouachita|Serpent Mound|Cuyahoga|Louisiana(?! Purchase)|New Orleans|Baton Rouge|Bayou|Oklahoma|Tulsa|Kentucky|Louisville|Lexington, Kentucky|Nevada|Las Vegas|Reno\b|Carson City|Lake Mead|Great Basin|Comstock|Silver State|Battle Born|Paiute|Washoe|Utah|Salt Lake|Connecticut|Hartford/;

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
 * A Mississippi copy of another state's unit: every question that names another state or a place in it, or that is about
 * Tribes or treaties (other states' Tribal content is never borrowed), is left out, and Mississippi-written items (`extra`)
 * fill some of each set. It draws more sets from the original to fill each set. A copy gets its own `ms-` id, because
 * its question set differs from the original.
 */
export function copyOf(base: Unit, meta: Meta, extra: Q[] = []): Unit {
  return {
    id: meta.id,
    title: meta.title,
    emoji: meta.emoji,
    blurb: meta.blurb,
    parentNote: meta.parentNote,
    standards: mss(meta.standards[0], meta.standards[1]),
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
          if (mentionsOtherState(q) || mentionsTribes(q) || seen.has(q.prompt)) continue;
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
 * units that fit Mississippi except for a few items. `extra` adds Mississippi items and `meta` replaces any wording that needs it.
 */
export const localCopy = (base: Unit, id: string, standards: Meta["standards"], extra: Q[] = [], meta: Partial<Meta> = {}): Unit =>
  copyOf(base, { id, title: base.title, emoji: base.emoji, blurb: base.blurb, parentNote: base.parentNote ?? "", standards, ...meta }, extra);

/** Finds a unit by id in a list, for copies. */
export const from = (units: readonly Unit[], id: string): Unit => {
  const u = units.find((x) => x.id === id);
  if (!u) throw new Error(`Mississippi: no unit "${id}" to copy`);
  return u;
};
