import { pick, shuffle } from "@/content/random";
import type { GradeId } from "@/content/types";

// Map Dash: a neighbourhood map for position and compass words, and a tile map of Canada
// (each province and territory one square, placed roughly where it sits) for older kids.

export interface MapTile {
  id: string;
  /** Shown in the tile. */
  label: string;
  /** Read aloud, and the accessible name. */
  name: string;
  emoji?: string;
  col: number;
  row: number;
}

export interface MapBoard {
  kind: "town" | "canada";
  cols: number;
  rows: number;
  tiles: MapTile[];
  /** Show which way is north (compass questions and the map of Canada). */
  compass?: boolean;
}

export interface MapQuestion {
  board: MapBoard;
  prompt: string;
  speak: string;
  /** Any of these tile ids is right. */
  answers: string[];
  /** Said when the child taps a wrong tile. */
  why: string;
}

const G: Record<GradeId, number> = { k: 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9 };

// ---------- Canada ----------

interface Place {
  id: string;
  abbr: string;
  name: string;
  capital: string;
  col: number;
  row: number;
  kind: "province" | "territory";
}

/** A 6 × 4 tile map: territories across the top, provinces west to east, Atlantic Canada in the bottom-right corner. */
export const CANADA: Place[] = [
  { id: "yt", abbr: "YT", name: "Yukon", capital: "Whitehorse", col: 0, row: 0, kind: "territory" },
  { id: "nt", abbr: "NT", name: "Northwest Territories", capital: "Yellowknife", col: 1, row: 0, kind: "territory" },
  { id: "nu", abbr: "NU", name: "Nunavut", capital: "Iqaluit", col: 2, row: 0, kind: "territory" },
  { id: "nl", abbr: "NL", name: "Newfoundland and Labrador", capital: "St. John's", col: 5, row: 0, kind: "province" },
  { id: "bc", abbr: "BC", name: "British Columbia", capital: "Victoria", col: 0, row: 1, kind: "province" },
  { id: "ab", abbr: "AB", name: "Alberta", capital: "Edmonton", col: 1, row: 1, kind: "province" },
  { id: "sk", abbr: "SK", name: "Saskatchewan", capital: "Regina", col: 2, row: 1, kind: "province" },
  { id: "mb", abbr: "MB", name: "Manitoba", capital: "Winnipeg", col: 3, row: 1, kind: "province" },
  { id: "on", abbr: "ON", name: "Ontario", capital: "Toronto", col: 4, row: 1, kind: "province" },
  { id: "qc", abbr: "QC", name: "Quebec", capital: "Quebec City", col: 5, row: 1, kind: "province" },
  { id: "nb", abbr: "NB", name: "New Brunswick", capital: "Fredericton", col: 4, row: 2, kind: "province" },
  { id: "pe", abbr: "PE", name: "Prince Edward Island", capital: "Charlottetown", col: 5, row: 2, kind: "province" },
  { id: "ns", abbr: "NS", name: "Nova Scotia", capital: "Halifax", col: 5, row: 3, kind: "province" },
];

const OCEANS: MapTile[] = [
  { id: "arctic", label: "Arctic Ocean", name: "Arctic Ocean", emoji: "🧊", col: 3, row: 0 },
  { id: "pacific", label: "Pacific Ocean", name: "Pacific Ocean", emoji: "🌊", col: 0, row: 2 },
  { id: "atlantic", label: "Atlantic Ocean", name: "Atlantic Ocean", emoji: "🐳", col: 4, row: 3 },
];

/** Facts for the older questions. Each set lists every place that fits, so a tap on any of them is right. */
const CANADA_FACTS: { prompt: string; answers: string[]; why: string }[] = [
  { prompt: "Tap a Prairie province", answers: ["ab", "sk", "mb"], why: "The Prairie provinces are Alberta, Saskatchewan and Manitoba." },
  { prompt: "Tap an Atlantic province", answers: ["nb", "ns", "pe", "nl"], why: "The Atlantic provinces are New Brunswick, Nova Scotia, Prince Edward Island, and Newfoundland and Labrador." },
  { prompt: "Tap a territory", answers: ["yt", "nt", "nu"], why: "The three territories are Yukon, the Northwest Territories and Nunavut." },
  { prompt: "Tap a place on the shore of Hudson Bay", answers: ["mb", "on", "qc", "nu"], why: "Hudson Bay touches Manitoba, Ontario, Quebec and Nunavut." },
  { prompt: "Tap the province on the Pacific Ocean", answers: ["bc"], why: "British Columbia is Canada's Pacific province." },
  { prompt: "Tap the largest province or territory by area", answers: ["nu"], why: "Nunavut is the largest, about one fifth of Canada." },
  { prompt: "Tap the smallest province", answers: ["pe"], why: "Prince Edward Island is the smallest province." },
  { prompt: "Tap the province with the most people", answers: ["on"], why: "Ontario has the most people of any province." },
  { prompt: "Tap the province furthest east", answers: ["nl"], why: "Newfoundland and Labrador is Canada's most easterly province." },
  { prompt: "Tap a province with no coastline on an ocean", answers: ["ab", "sk"], why: "Alberta and Saskatchewan are the only provinces with no ocean coast." },
];

function canadaBoard(withOceans: boolean): MapBoard {
  const tiles: MapTile[] = CANADA.map((p) => ({ id: p.id, label: p.abbr, name: p.name, col: p.col, row: p.row }));
  return { kind: "canada", cols: 6, rows: 4, tiles: withOceans ? [...tiles, ...OCEANS] : tiles, compass: true };
}

// ---------- Town (position and compass words) ----------

const PLACES: { emoji: string; name: string }[] = [
  { emoji: "🏫", name: "school" },
  { emoji: "🌳", name: "park" },
  { emoji: "🏠", name: "house" },
  { emoji: "🏪", name: "store" },
  { emoji: "🚒", name: "fire hall" },
  { emoji: "📚", name: "library" },
  { emoji: "🏊", name: "pool" },
  { emoji: "🛝", name: "playground" },
  { emoji: "🏥", name: "hospital" },
];

type Dir = "up" | "down" | "left" | "right";
const STEP: Record<Dir, [number, number]> = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
/** Little kids use position words; from Grade 2 the map has north at the top. */
const WORDS: Record<Dir, { little: string; compass: string }> = {
  up: { little: "above", compass: "north of" },
  down: { little: "below", compass: "south of" },
  left: { little: "to the left of", compass: "west of" },
  right: { little: "to the right of", compass: "east of" },
};

export function townQuestion(compass: boolean): MapQuestion {
  const placed = shuffle(PLACES);
  const tiles: MapTile[] = placed.map((p, i) => ({ id: p.name, label: p.name, name: p.name, emoji: p.emoji, col: i % 3, row: Math.floor(i / 3) }));
  const at = (col: number, row: number) => tiles.find((t) => t.col === col && t.row === row);
  // Pick a place and a direction that has a neighbour, so there is exactly one right answer.
  const options: { from: MapTile; dir: Dir; to: MapTile }[] = [];
  for (const from of tiles) {
    for (const dir of Object.keys(STEP) as Dir[]) {
      const to = at(from.col + STEP[dir][0], from.row + STEP[dir][1]);
      if (to) options.push({ from, dir, to });
    }
  }
  const q = pick(options);
  const word = compass ? WORDS[q.dir].compass : WORDS[q.dir].little;
  return {
    board: { kind: "town", cols: 3, rows: 3, tiles, compass },
    prompt: `Tap the place ${word} the ${q.from.emoji} ${q.from.name}`,
    speak: `Tap the place ${word} the ${q.from.name}`,
    answers: [q.to.id],
    why: `The ${q.to.name} is ${word} the ${q.from.name}.`,
  };
}

function findQuestion(): MapQuestion {
  const p = pick(CANADA);
  return {
    board: canadaBoard(false),
    prompt: `Tap ${p.name}`,
    speak: `Tap ${p.name}`,
    answers: [p.id],
    why: `${p.name} is the square marked ${p.abbr}.`,
  };
}

function capitalQuestion(): MapQuestion {
  const p = pick(CANADA);
  const kind = p.kind === "territory" ? "territory" : "province";
  return {
    board: canadaBoard(false),
    prompt: `Tap the ${kind} whose capital is ${p.capital}`,
    speak: `Tap the ${kind} whose capital is ${p.capital}`,
    answers: [p.id],
    why: `${p.capital} is the capital of ${p.name}.`,
  };
}

function oceanQuestion(): MapQuestion {
  const o = pick(OCEANS);
  const side = o.id === "arctic" ? "north" : o.id === "pacific" ? "west" : "east";
  return {
    board: canadaBoard(true),
    prompt: `Tap the ocean on Canada's ${side} side`,
    speak: `Tap the ocean on Canada's ${side} side`,
    answers: [o.id],
    why: `The ${o.name} is to the ${side}.`,
  };
}

function factQuestion(): MapQuestion {
  const f = pick(CANADA_FACTS);
  return { board: canadaBoard(false), prompt: f.prompt, speak: f.prompt, answers: f.answers, why: f.why };
}

/** One question for the grade: position words, then compass and oceans, then names and capitals, then facts. */
export function mapQuestion(grade: GradeId): MapQuestion {
  const g = G[grade];
  if (g <= 1) return townQuestion(false);
  if (g <= 3) return pick([() => townQuestion(true), () => townQuestion(true), oceanQuestion])();
  if (g <= 5) return pick([findQuestion, capitalQuestion, capitalQuestion, oceanQuestion])();
  return pick([capitalQuestion, factQuestion, factQuestion, factQuestion])();
}
