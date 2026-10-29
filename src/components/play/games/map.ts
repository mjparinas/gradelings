import { pick, shuffle } from "@/content/random";
import type { GradeId } from "@/content/types";
import type { Country } from "./types";

// Map Dash: a neighbourhood map for position and compass words, and a tile map of Canada
// (each province and territory one square, placed roughly where it sits) for older kids.
// A child on a US curriculum gets the United States instead: a map of its four regions with
// its neighbours and oceans, and one tile map per region with each state on its own square.

export interface MapTile {
  id: string;
  /** Shown in the tile. */
  label: string;
  /** Read aloud, and the accessible name. */
  name: string;
  emoji?: string;
  /** An ocean, drawn in blue. */
  water?: boolean;
  col: number;
  row: number;
}

export interface MapBoard {
  kind: "town" | "canada" | "usa";
  cols: number;
  rows: number;
  tiles: MapTile[];
  /** Show which way is north (compass questions and the maps of Canada and the United States). */
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

const G: Record<GradeId, number> = { pk: 0, k: 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9 };

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
  { id: "arctic", label: "Arctic Ocean", name: "Arctic Ocean", emoji: "🧊", water: true, col: 3, row: 0 },
  { id: "pacific", label: "Pacific Ocean", name: "Pacific Ocean", emoji: "🌊", water: true, col: 0, row: 2 },
  { id: "atlantic", label: "Atlantic Ocean", name: "Atlantic Ocean", emoji: "🐳", water: true, col: 4, row: 3 },
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

/** Town places that go by another name in a country. */
const PLACE_NAMES: Record<Country, Record<string, string>> = { CA: {}, US: { "fire hall": "fire station" } };

export function townQuestion(compass: boolean, country: Country = "CA"): MapQuestion {
  // A fire hall is a fire station in the US.
  const placed = shuffle(PLACES).map((p) => ({ ...p, name: PLACE_NAMES[country][p.name] ?? p.name }));
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

// ---------- United States ----------

export type UsRegion = "west" | "midwest" | "south" | "northeast";

export interface State {
  id: string;
  /** The postal abbreviation. */
  abbr: string;
  name: string;
  capital: string;
  /** The US Census Bureau region. */
  region: UsRegion;
  /** The square on its region's map. */
  col: number;
  row: number;
}

const state = (abbr: string, name: string, capital: string, region: UsRegion, col: number, row: number): State => ({ id: abbr.toLowerCase(), abbr, name, capital, region, col, row });

/**
 * The 50 states, each on a small tile map of its Census region, placed roughly where it sits (north at the top).
 * Fifty squares on one map would be too small to tap on a phone, so each region is its own map.
 */
export const STATES: State[] = [
  // West: Alaska top left and Hawaii bottom left, as on most US maps.
  state("AK", "Alaska", "Juneau", "west", 0, 0),
  state("WA", "Washington", "Olympia", "west", 1, 0),
  state("ID", "Idaho", "Boise", "west", 2, 0),
  state("MT", "Montana", "Helena", "west", 3, 0),
  state("OR", "Oregon", "Salem", "west", 1, 1),
  state("NV", "Nevada", "Carson City", "west", 2, 1),
  state("WY", "Wyoming", "Cheyenne", "west", 3, 1),
  state("CA", "California", "Sacramento", "west", 1, 2),
  state("UT", "Utah", "Salt Lake City", "west", 2, 2),
  state("CO", "Colorado", "Denver", "west", 3, 2),
  state("HI", "Hawaii", "Honolulu", "west", 0, 3),
  state("AZ", "Arizona", "Phoenix", "west", 2, 3),
  state("NM", "New Mexico", "Santa Fe", "west", 3, 3),
  // Midwest
  state("ND", "North Dakota", "Bismarck", "midwest", 0, 0),
  state("MN", "Minnesota", "Saint Paul", "midwest", 1, 0),
  state("WI", "Wisconsin", "Madison", "midwest", 2, 0),
  state("MI", "Michigan", "Lansing", "midwest", 3, 0),
  state("SD", "South Dakota", "Pierre", "midwest", 0, 1),
  state("IA", "Iowa", "Des Moines", "midwest", 1, 1),
  state("IL", "Illinois", "Springfield", "midwest", 2, 1),
  state("IN", "Indiana", "Indianapolis", "midwest", 3, 1),
  state("OH", "Ohio", "Columbus", "midwest", 4, 1),
  state("NE", "Nebraska", "Lincoln", "midwest", 0, 2),
  state("MO", "Missouri", "Jefferson City", "midwest", 1, 2),
  state("KS", "Kansas", "Topeka", "midwest", 0, 3),
  // South
  state("OK", "Oklahoma", "Oklahoma City", "south", 0, 0),
  state("AR", "Arkansas", "Little Rock", "south", 1, 0),
  state("KY", "Kentucky", "Frankfort", "south", 2, 0),
  state("WV", "West Virginia", "Charleston", "south", 3, 0),
  state("MD", "Maryland", "Annapolis", "south", 4, 0),
  state("DE", "Delaware", "Dover", "south", 5, 0),
  state("TX", "Texas", "Austin", "south", 0, 1),
  state("LA", "Louisiana", "Baton Rouge", "south", 1, 1),
  state("TN", "Tennessee", "Nashville", "south", 2, 1),
  state("VA", "Virginia", "Richmond", "south", 3, 1),
  state("NC", "North Carolina", "Raleigh", "south", 4, 1),
  state("MS", "Mississippi", "Jackson", "south", 1, 2),
  state("AL", "Alabama", "Montgomery", "south", 2, 2),
  state("GA", "Georgia", "Atlanta", "south", 3, 2),
  state("SC", "South Carolina", "Columbia", "south", 4, 2),
  state("FL", "Florida", "Tallahassee", "south", 3, 3),
  // Northeast
  state("VT", "Vermont", "Montpelier", "northeast", 2, 0),
  state("NH", "New Hampshire", "Concord", "northeast", 3, 0),
  state("ME", "Maine", "Augusta", "northeast", 4, 0),
  state("NY", "New York", "Albany", "northeast", 1, 1),
  state("MA", "Massachusetts", "Boston", "northeast", 2, 1),
  state("RI", "Rhode Island", "Providence", "northeast", 3, 1),
  state("PA", "Pennsylvania", "Harrisburg", "northeast", 0, 2),
  state("NJ", "New Jersey", "Trenton", "northeast", 1, 2),
  state("CT", "Connecticut", "Hartford", "northeast", 2, 2),
];

export const US_REGIONS: Record<UsRegion, { name: string; cols: number; rows: number; water: MapTile[] }> = {
  west: { name: "the West", cols: 4, rows: 4, water: [{ id: "pacific", label: "Pacific Ocean", name: "Pacific Ocean", emoji: "🌊", water: true, col: 0, row: 1 }] },
  midwest: { name: "the Midwest", cols: 5, rows: 4, water: [] },
  south: { name: "the South", cols: 6, rows: 4, water: [{ id: "atlantic", label: "Atlantic Ocean", name: "Atlantic Ocean", emoji: "🐳", water: true, col: 5, row: 2 }] },
  northeast: { name: "the Northeast", cols: 5, rows: 3, water: [{ id: "atlantic", label: "Atlantic Ocean", name: "Atlantic Ocean", emoji: "🐳", water: true, col: 4, row: 2 }] },
};

export function regionBoard(region: UsRegion): MapBoard {
  const r = US_REGIONS[region];
  const tiles: MapTile[] = STATES.filter((st) => st.region === region).map((st) => ({ id: st.id, label: st.abbr, name: st.name, col: st.col, row: st.row }));
  return { kind: "usa", cols: r.cols, rows: r.rows, tiles: [...tiles, ...r.water], compass: true };
}

/** The whole country as five squares: its four regions, with Canada to the north, Mexico to the south and an ocean on each coast. */
export function usaBoard(): MapBoard {
  const land = (id: string, label: string, col: number, row: number): MapTile => ({ id, label, name: label, col, row });
  return {
    kind: "usa",
    cols: 5,
    rows: 3,
    compass: true,
    tiles: [
      land("canada", "Canada", 2, 0),
      { id: "pacific", label: "Pacific Ocean", name: "Pacific Ocean", emoji: "🌊", water: true, col: 0, row: 1 },
      land("west", "West", 1, 1),
      land("midwest", "Midwest", 2, 1),
      land("northeast", "Northeast", 3, 1),
      { id: "atlantic", label: "Atlantic Ocean", name: "Atlantic Ocean", emoji: "🐳", water: true, col: 4, row: 1 },
      land("mexico", "Mexico", 1, 2),
      land("south", "South", 2, 2),
    ],
  };
}

/** Facts for the older questions, each on one region's map. Every state on that map that fits is listed. */
export const US_FACTS: { region: UsRegion; prompt: string; answers: string[]; why: string }[] = [
  { region: "west", prompt: "Tap the largest state by area", answers: ["ak"], why: "Alaska is the largest state, more than twice the size of Texas." },
  { region: "west", prompt: "Tap the state made of islands in the Pacific Ocean", answers: ["hi"], why: "Hawaii is a chain of islands in the Pacific Ocean." },
  { region: "west", prompt: "Tap the state with the most people", answers: ["ca"], why: "California has the most people of any state." },
  { region: "west", prompt: "Tap a Four Corners state", answers: ["ut", "co", "az", "nm"], why: "Utah, Colorado, Arizona and New Mexico meet at one point, the Four Corners." },
  { region: "west", prompt: "Tap a state on the Pacific coast", answers: ["wa", "or", "ca", "ak", "hi"], why: "Washington, Oregon, California, Alaska and Hawaii are on the Pacific Ocean." },
  { region: "west", prompt: "Tap a western state with a land border with Canada", answers: ["wa", "id", "mt", "ak"], why: "Washington, Idaho, Montana and Alaska share a land border with Canada." },
  { region: "midwest", prompt: "Tap a state on the shore of Lake Michigan", answers: ["wi", "il", "in", "mi"], why: "Lake Michigan touches Wisconsin, Illinois, Indiana and Michigan." },
  { region: "midwest", prompt: "Tap a state on the shore of Lake Superior", answers: ["mn", "wi", "mi"], why: "Lake Superior touches Minnesota, Wisconsin and Michigan." },
  { region: "midwest", prompt: "Tap the state where the Mississippi River begins", answers: ["mn"], why: "The Mississippi River begins at Lake Itasca in Minnesota." },
  { region: "south", prompt: "Tap the largest state in the South by area", answers: ["tx"], why: "Texas is the largest state in the South, and second largest of all." },
  { region: "south", prompt: "Tap the peninsula state in the far southeast", answers: ["fl"], why: "Florida is a peninsula, with water on three sides." },
  { region: "south", prompt: "Tap the state where the Mississippi River reaches the sea", answers: ["la"], why: "The Mississippi River reaches the sea in Louisiana." },
  { region: "south", prompt: "Tap a southern state that borders Mexico", answers: ["tx"], why: "Texas is the only state in the South that borders Mexico." },
  { region: "northeast", prompt: "Tap the smallest state", answers: ["ri"], why: "Rhode Island is the smallest state." },
  { region: "northeast", prompt: "Tap a New England state", answers: ["me", "nh", "vt", "ma", "ri", "ct"], why: "New England is Maine, New Hampshire, Vermont, Massachusetts, Rhode Island and Connecticut." },
  { region: "northeast", prompt: "Tap the state furthest east", answers: ["me"], why: "Maine is the state furthest east." },
  { region: "northeast", prompt: "Tap a northeastern state with a land border with Canada", answers: ["ny", "vt", "nh", "me"], why: "New York, Vermont, New Hampshire and Maine share a land border with Canada." },
];

function stateQuestion(): MapQuestion {
  const st = pick(STATES);
  return { board: regionBoard(st.region), prompt: `Tap ${st.name}`, speak: `Tap ${st.name}`, answers: [st.id], why: `${st.name} is the square marked ${st.abbr}.` };
}

function stateCapitalQuestion(): MapQuestion {
  const st = pick(STATES);
  const prompt = `Tap the state whose capital is ${st.capital}`;
  return { board: regionBoard(st.region), prompt, speak: prompt, answers: [st.id], why: `${st.capital} is the capital of ${st.name}.` };
}

function regionQuestion(): MapQuestion {
  const st = pick(STATES);
  const name = US_REGIONS[st.region].name;
  const prompt = `Tap the region ${st.name} is in`;
  return { board: usaBoard(), prompt, speak: prompt, answers: [st.region], why: `${st.name} is in ${name}.` };
}

function usaNeighbourQuestion(): MapQuestion {
  const which = pick(["west", "east", "north", "south"] as const);
  const answer = { west: "pacific", east: "atlantic", north: "canada", south: "mexico" }[which];
  const prompt = which === "west" || which === "east" ? `Tap the ocean on the ${which} coast of the United States` : `Tap the country ${which} of the United States`;
  const why = {
    west: "The Pacific Ocean is on the west coast.",
    east: "The Atlantic Ocean is on the east coast.",
    north: "Canada is north of the United States.",
    south: "Mexico is south of the United States.",
  }[which];
  return { board: usaBoard(), prompt, speak: prompt, answers: [answer], why };
}

function usFactQuestion(): MapQuestion {
  const f = pick(US_FACTS);
  return { board: regionBoard(f.region), prompt: f.prompt, speak: f.prompt, answers: f.answers, why: f.why };
}

function usQuestion(g: number): MapQuestion {
  if (g <= 1) return townQuestion(false, "US");
  if (g <= 3) return pick([() => townQuestion(true, "US"), () => townQuestion(true, "US"), usaNeighbourQuestion])();
  if (g <= 5) return pick([stateQuestion, stateCapitalQuestion, stateCapitalQuestion, regionQuestion, usaNeighbourQuestion])();
  return pick([stateCapitalQuestion, regionQuestion, usFactQuestion, usFactQuestion, usFactQuestion])();
}

/**
 * One question for the grade: position words, then compass and oceans, then names and capitals, then facts.
 * Canadian children get Canada's provinces and territories, US children the states.
 */
export function mapQuestion(grade: GradeId, country: Country = "CA"): MapQuestion {
  return COUNTRY_QUESTION[country](G[grade]);
}

/** Canada's rounds: the town, then oceans, provinces and territories, capitals and facts. */
function canadaQuestion(g: number): MapQuestion {
  if (g <= 1) return townQuestion(false);
  if (g <= 3) return pick([() => townQuestion(true), () => townQuestion(true), oceanQuestion])();
  if (g <= 5) return pick([findQuestion, capitalQuestion, capitalQuestion, oceanQuestion])();
  return pick([capitalQuestion, factQuestion, factQuestion, factQuestion])();
}

const COUNTRY_QUESTION: Record<Country, (g: number) => MapQuestion> = { CA: canadaQuestion, US: (g) => usQuestion(g) };
