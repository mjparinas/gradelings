import type { Framework } from "./frameworks";
import type { Choice, GradeId, Lesson, Question, Unit, Visual } from "./types";

// Content is written once, in Canadian English (colour, centre, 10 000). A US framework shows it in US English:
// US spelling and commas in big numbers. `localizeUnit` wraps a unit so every string it shows is converted, which
// lets a US course share a Canadian unit without copying it. Only plain spelling and number format change here;
// anything that depends on the country (coins, measurement, places) needs its own unit, and `canadianWords` finds
// units that mention Canada so they are never shared with a US framework.

export type Locale = "en-CA" | "en-US";

/** The English a framework's content and copy are shown in. */
export function localeOf(framework: Pick<Framework, "country">): Locale {
  return framework.country === "US" ? "en-US" : "en-CA";
}

/** What a framework's region is called in sentences: "province", "territory" or "state". */
export function regionKind(framework: Pick<Framework, "country" | "id">): "province" | "territory" | "state" {
  if (framework.country === "US") return "state";
  return framework.id === "ca-yt" || framework.id === "ca-nt" || framework.id === "ca-nu" ? "territory" : "province";
}

const ORDINAL: Record<string, string> = { "1": "1st", "2": "2nd", "3": "3rd" };

/** "Grade 4" in Canada, "4th grade" in the US. Kindergarten is the same in both. */
export function gradeName(grade: GradeId, locale: Locale): string {
  if (grade === "k") return "Kindergarten";
  return locale === "en-US" ? `${ORDINAL[grade] ?? `${grade}th`} grade` : `Grade ${grade}`;
}

// Canadian → US spelling, by word stem. Each entry lists the Canadian form and its US form; the forms below are
// expanded with common endings (s, ed, ing, er, ful, ...) by `buildSpelling`.
const STEMS: [string, string][] = [
  ["colour", "color"],
  ["favour", "favor"],
  ["favourite", "favorite"],
  ["flavour", "flavor"],
  ["harbour", "harbor"],
  ["honour", "honor"],
  ["humour", "humor"],
  ["labour", "labor"],
  ["neighbour", "neighbor"],
  ["neighbourhood", "neighborhood"],
  ["odour", "odor"],
  ["rumour", "rumor"],
  ["vapour", "vapor"],
  ["behaviour", "behavior"],
  ["armour", "armor"],
  ["parlour", "parlor"],
  ["savour", "savor"],
  ["vigour", "vigor"],
  ["endeavour", "endeavor"],
  ["centre", "center"],
  ["metre", "meter"],
  ["centimetre", "centimeter"],
  ["millimetre", "millimeter"],
  ["kilometre", "kilometer"],
  ["decimetre", "decimeter"],
  ["litre", "liter"],
  ["millilitre", "milliliter"],
  ["kilolitre", "kiloliter"],
  ["theatre", "theater"],
  ["fibre", "fiber"],
  ["calibre", "caliber"],
  ["sombre", "somber"],
  ["spectre", "specter"],
  ["meagre", "meager"],
  ["defence", "defense"],
  ["offence", "offense"],
  ["pretence", "pretense"],
  ["grey", "gray"],
  ["jewellery", "jewelry"],
  ["catalogue", "catalog"],
  ["aluminium", "aluminum"],
  ["plough", "plow"],
  ["mould", "mold"],
  ["moult", "molt"],
  ["smoulder", "smolder"],
  ["tyre", "tire"],
  ["pyjamas", "pajamas"],
  ["moustache", "mustache"],
  ["cosy", "cozy"],
  ["manoeuvre", "maneuver"],
  ["sceptical", "skeptical"],
  ["enrolment", "enrollment"],
  ["fulfil", "fulfill"],
  ["skilful", "skillful"],
  ["wilful", "willful"],
  ["woollen", "woolen"],
  ["cheque", "check"],
  ["analyse", "analyze"],
  ["paralyse", "paralyze"],
  ["catalyse", "catalyze"],
  ["practise", "practice"],
  ["licence", "license"],
];

// Verbs that double a final l in Canada but not in the US (travelled, labelling).
const DOUBLE_L = ["travel", "label", "model", "cancel", "fuel", "level", "marvel", "signal", "tunnel", "total", "dial", "equal", "jewel", "pedal", "shovel", "snorkel", "channel", "funnel", "quarrel", "rival", "unravel", "panel", "parcel", "pencil", "barrel", "kennel", "duel", "spiral", "counsel", "dishevel", "grovel", "label", "yodel"];

// -ise verbs written -ize in the US (organise → organize). Only words that are always -ize in the US.
const ISE = ["organis", "recognis", "realis", "apologis", "memoris", "summaris", "categoris", "criticis", "emphasis", "prioritis", "minimis", "maximis", "standardis", "symbolis", "visualis", "personalis", "specialis", "sympathis", "colonis", "civilis", "modernis", "industrialis", "urbanis", "familiaris", "harmonis", "fertilis", "sterilis", "magnetis", "crystallis", "evaporis", "capitalis", "finalis", "localis", "normalis", "utilis", "mobilis", "neutralis", "authoris", "characteris", "itemis", "optimis", "theoris", "hypothesis", "scrutinis", "patronis", "publicis", "vocalis", "legalis", "stabilis", "energis", "idealis"];

function buildSpelling(): Map<string, string> {
  const map = new Map<string, string>();
  const endings = ["", "s", "es", "ed", "ing", "er", "ers", "ful", "fully", "less", "able", "ite", "ites", "ism", "ist", "ists", "y"];
  for (const [ca, us] of STEMS) {
    for (const e of endings) {
      // "practise" is the verb in Canada; its endings drop the e (practising), as do the US forms.
      const caWord = ca.endsWith("e") && /^[aeiouy]/.test(e) ? ca.slice(0, -1) + e : ca + e;
      const usWord = us.endsWith("e") && /^[aeiouy]/.test(e) ? us.slice(0, -1) + e : us + e;
      // The first ending to produce a word wins ("metres" from "s", not from "es").
      if (caWord !== usWord && !map.has(caWord)) map.set(caWord, usWord);
    }
  }
  for (const w of DOUBLE_L) {
    for (const e of ["ed", "ing", "er", "ers"]) map.set(`${w}l${e}`, `${w}${e}`);
  }
  for (const stem of ISE) {
    // "emphasis" and "hypothesis" are nouns spelt the same in both; only their -ise verbs change.
    for (const e of ["e", "es", "ed", "ing", "er", "ers", "ation", "ations"]) {
      if ((stem === "emphasis" || stem === "hypothesis") && e.startsWith("ation")) continue;
      map.set(`${stem}${e}`, `${stem.slice(0, -1)}z${e}`);
    }
  }
  // "analyses" is also the plural of the noun "analysis", the same in both.
  map.delete("analyses");
  map.set("programme", "program");
  map.set("programmes", "programs");
  return map;
}

/** Canadian spelling (lower case) → US spelling. */
export const US_SPELLING: ReadonlyMap<string, string> = buildSpelling();

function matchCase(word: string, us: string): string {
  if (word === word.toUpperCase() && word.length > 1) return us.toUpperCase();
  if (word[0] === word[0].toUpperCase()) return us[0].toUpperCase() + us.slice(1);
  return us;
}

// Everyday Canadian words with a different US word, matched as whole phrases.
const US_PHRASES: [RegExp, string][] = [[/\bfire hall(s?)\b/gi, "fire station$1"]];

/** Changes Canadian spellings in a piece of text to US ones. Words the map doesn't know are kept as they are. */
export function usSpelling(text: string): string {
  for (const [ca, us] of US_PHRASES) text = text.replace(ca, (m, ...rest) => matchCase(m, us.replace("$1", String(rest[0] ?? ""))));
  return text.replace(/[A-Za-z]+/g, (word) => {
    const us = US_SPELLING.get(word.toLowerCase());
    return us && us !== word.toLowerCase() ? matchCase(word, us) : word;
  });
}

// Canadian style groups digits with a space (or a no-break space) from 10 000 up; the US uses commas.
const SPACED_NUMBER = /(?<![\d.,])\d{1,3}(?:[   ]\d{3})+(?![\d,]|\.\d)/g;
const SPACED_DECIMAL = /(?<![\d.,])\d{1,3}(?:[   ]\d{3})+(?=\.\d)/g;

/** "345 678" → "345,678", also before a decimal point ("12 345.6" → "12,345.6"). */
export function usNumbers(text: string): string {
  const commas = (m: string) => m.replace(/[   ]/g, ",");
  return text.replace(SPACED_NUMBER, commas).replace(SPACED_DECIMAL, commas);
}

/** All the text changes a locale makes. Canadian text is returned unchanged. */
export function localizeText(text: string, locale: Locale): string {
  return locale === "en-US" ? usNumbers(usSpelling(text)) : text;
}

/** Read-aloud text: spelling only, so numbers are still read as words the way the unit wrote them. */
function localizeSpeak(text: string, locale: Locale): string {
  return locale === "en-US" ? usSpelling(text) : text;
}

function localizeVisual(v: Visual, t: (s: string) => string): Visual {
  switch (v.type) {
    case "equation":
      return { ...v, text: t(v.text) };
    case "emoji":
      return v.caption ? { ...v, caption: t(v.caption) } : v;
    case "letter":
      return v.caption ? { ...v, caption: t(v.caption) } : v;
    case "pictograph":
      return { ...v, title: t(v.title), rows: v.rows.map((r) => ({ ...r, label: t(r.label) })) };
    case "bars":
      return { ...v, title: t(v.title), bars: v.bars.map((b) => ({ ...b, label: t(b.label) })) };
    case "table":
      return {
        ...v,
        title: v.title === undefined ? undefined : t(v.title),
        headers: v.headers.map(t),
        rows: v.rows.map((r) => r.map((c) => (typeof c === "string" ? t(c) : c))),
      };
    case "spinner":
      return { ...v, segments: v.segments.map(t) };
    case "story":
      return { ...v, lines: v.lines.map(t) };
    case "passage":
      return { ...v, title: v.title === undefined ? undefined : t(v.title), paragraphs: v.paragraphs.map(t) };
    default:
      return v;
  }
}

/** A question as a framework with this locale shows it. */
export function localizeQuestion(q: Question, locale: Locale): Question {
  if (locale === "en-CA") return q;
  const t = (s: string) => localizeText(s, locale);
  const sp = (s: string | undefined) => (s === undefined ? undefined : localizeSpeak(s, locale));
  const base = {
    prompt: t(q.prompt),
    speak: sp(q.speak),
    hint: t(q.hint),
    visual: q.visual ? localizeVisual(q.visual, t) : undefined,
  };
  const clean = <T extends object>(o: T): T => {
    for (const k of Object.keys(o) as (keyof T)[]) if (o[k] === undefined) delete o[k];
    return o;
  };
  const choice = (c: Choice): Choice => clean({ ...c, label: t(c.label), speak: sp(c.speak) });
  switch (q.kind) {
    case "choice":
      return clean({ ...q, ...base, choices: q.choices.map(choice) });
    case "order":
      return clean({ ...q, ...base, items: q.items.map((i) => ({ ...i, label: t(i.label) })) });
    case "sort":
      return clean({
        ...q,
        ...base,
        bins: q.bins.map((b) => ({ ...b, label: t(b.label) })),
        items: q.items.map((i) => ({ ...i, label: t(i.label) })),
      });
    case "input":
      return clean({ ...q, ...base, suffix: q.suffix === undefined ? undefined : t(q.suffix) });
    default:
      return clean({ ...q, ...base });
  }
}

function localizeLesson(lesson: Lesson, locale: Locale): Lesson {
  const t = (s: string) => localizeText(s, locale);
  return {
    steps: lesson.steps.map(t),
    example: {
      ...lesson.example,
      question: t(lesson.example.question),
      work: lesson.example.work.map(t),
      answer: t(lesson.example.answer),
      ...(lesson.example.visual ? { visual: localizeVisual(lesson.example.visual, t) } : {}),
    },
  };
}

const cache: Record<Locale, WeakMap<Unit, Unit>> = { "en-CA": new WeakMap(), "en-US": new WeakMap() };

/** A unit as a framework with this locale shows it: the same id and standards, with its text converted. */
export function localizeUnit(unit: Unit, locale: Locale): Unit {
  if (locale === "en-CA") return unit;
  const hit = cache[locale].get(unit);
  if (hit) return hit;
  const t = (s: string) => localizeText(s, locale);
  const out: Unit = {
    ...unit,
    title: t(unit.title),
    blurb: t(unit.blurb),
    parentNote: t(unit.parentNote),
    ...(unit.lesson ? { lesson: localizeLesson(unit.lesson, locale) } : {}),
    generate: (opts) => unit.generate(opts).map((q) => localizeQuestion(q, locale)),
  };
  cache[locale].set(unit, out);
  return out;
}

// Words that tie a question to Canada. A unit whose questions use any of them is not shared with a US framework.
const CANADA = [
  "Canada", "Canadian", "Canadians", "province", "provinces", "provincial",
  "loonie", "loonies", "toonie", "toonies", "Ottawa", "Parliament", "Prime Minister", "premier", "MLA", "MPP",
  "Confederation", "First Nations", "Métis", "Inuit", "Inuk", "Indigenous", "treaty", "treaties", "RCMP",
  "British Columbia", "Alberta", "Saskatchewan", "Manitoba", "Ontario", "Quebec", "Québec", "New Brunswick",
  "Nova Scotia", "Prince Edward Island", "Newfoundland", "Labrador", "Yukon", "Northwest Territories", "Nunavut",
  "Vancouver", "Victoria", "Edmonton", "Calgary", "Regina", "Saskatoon", "Winnipeg", "Toronto", "Montréal",
  "Montreal", "Halifax", "Fredericton", "Charlottetown", "St. John's", "Whitehorse", "Yellowknife", "Iqaluit",
  "Fraser", "Rocky Mountains", "Canadian Shield", "Hudson Bay", "Great Lakes", "St. Lawrence", "maple leaf",
  "Remembrance Day", "Victoria Day", "Canada Day", "Hockey Night", "CN Tower", "Tim Hortons",
  "GST", "HST", "PST", "BEDMAS",
];
const CANADA_RE = new RegExp(`(?<![\\p{L}])(${CANADA.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})(?![\\p{L}])`, "giu");

/** The Canada-specific words in a piece of text (empty when there are none). */
export function canadianWords(text: string): string[] {
  return [...new Set([...text.matchAll(CANADA_RE)].map((m) => m[0]))];
}

/** Every string a question shows or reads, for checks like `canadianWords`. */
export function questionText(q: Question): string {
  const parts: string[] = [q.prompt, q.speak ?? "", q.hint];
  const v = q.visual as Record<string, unknown> | undefined;
  if (v) parts.push(JSON.stringify(v));
  if (q.kind === "choice") for (const c of q.choices) parts.push(c.label, c.speak ?? "");
  if (q.kind === "order") for (const i of q.items) parts.push(i.label);
  if (q.kind === "sort") for (const i of [...q.bins, ...q.items]) parts.push(i.label);
  return parts.join("\n");
}
