import { frOrder, type Opt } from "./french";
import { sample, shuffle, textChoice } from "./random";
import type { Choice, FrameworkId, GenerateOptions, GradeId, Question, Visual } from "./types";

// Spanish: one beginner course, Grades 3 to 9, written once and offered in every province and state (`everywhere` on
// its subject in ./subjects). Prompts are in English and the Spanish is what children learn, like Core French; Spanish
// inside an English prompt is set in « » (Spanish uses them too), which read-aloud says in a Spanish voice. The Spanish
// is Latin American: "ustedes", never "vosotros".
//
// Each unit cites every framework's own standards through `spanishStandards`: British Columbia's Spanish 5 to 10
// Content, Alberta's Spanish Language and Culture Nine-Year Program, Manitoba's Grade 7 to Senior 4 Spanish framework,
// and everywhere else (and in the grades those three don't teach) the World-Readiness Standards for Learning Languages
// with the proficiency sublevel the grade aims for. The sources are in docs/research/spanish/; spanishCite in
// ./contract checks every citation against them.

export { e, type Opt } from "./french";

/**
 * One multiple-choice item: [prompt, right answer, wrong answers, hint, picture?, choice language?]. A string picture is an
 * emoji shown above the question. The choices are Spanish unless the prompt asks for a meaning ("What does…") or the
 * item says "en".
 */
export type EsItem = [prompt: string, right: Opt, wrong: Opt[], hint: string, visual?: Visual | string, choices?: "en" | "es"];

/** One of the eleven World-Readiness Standards for Learning Languages. */
export type Wrs =
  | "Interpersonal Communication"
  | "Interpretive Communication"
  | "Presentational Communication"
  | "Relating Cultural Practices to Perspectives"
  | "Relating Cultural Products to Perspectives"
  | "Making Connections"
  | "Acquiring Information and Diverse Perspectives"
  | "Language Comparisons"
  | "Cultural Comparisons"
  | "School and Global Communities"
  | "Lifelong Learning";

/** The NCSSFL-ACTFL proficiency sublevel each grade of the course aims for, for a child who started in Grade 3. */
export const SPANISH_LEVEL: Partial<Record<GradeId, string>> = {
  "3": "Novice Low",
  "4": "Novice Low",
  "5": "Novice Mid",
  "6": "Novice Mid",
  "7": "Novice High",
  "8": "Novice High",
  "9": "Intermediate Low",
};

/** What a unit practises, in each source's own words. */
export interface SpanishCitation {
  /** World-Readiness Standards it practises (every framework without its own Spanish curriculum for the grade). */
  wrs: Wrs[];
  /** Plain words after the codes: "greeting people and saying your name". */
  text: string;
  /** British Columbia, Grades 5 to 9: the Content item, as the curriculum writes it ("opinions and preferences"). */
  bc?: string;
  /** Alberta, Grades 4 to 9: the Nine-Year Program's outcome clusters ("A-1", "LC-1"). */
  ab?: string[];
  /** Manitoba, Grades 7 to 9: the framework's numbered strands ("1.1.1", "2.1.3"). */
  mb?: string[];
}

const BC_GRADES = ["5", "6", "7", "8", "9"];
const AB_GRADES = ["4", "5", "6", "7", "8", "9"];
const MB_GRADES = ["7", "8", "9"];

/**
 * A unit's standards: BC's, Alberta's and Manitoba's own Spanish curriculum where it has one for the grade, and the
 * World-Readiness Standards for every other framework (`standardElsewhere`, filled in by mergeCourses). Spread into the unit.
 */
export function spanishStandards(grade: GradeId, c: SpanishCitation): { standards: Partial<Record<FrameworkId, string>>; standardElsewhere: string } {
  const wrs = `${[...c.wrs, SPANISH_LEVEL[grade]].join("; ")} · ${c.text}`;
  const out: Partial<Record<FrameworkId, string>> = {};
  if (BC_GRADES.includes(grade)) {
    if (!c.bc) throw new Error(`Grade ${grade} Spanish "${c.text}" needs its BC Content item`);
    out["ca-bc"] = c.bc;
  }
  if (AB_GRADES.includes(grade)) {
    if (!c.ab) throw new Error(`Grade ${grade} Spanish "${c.text}" needs its Alberta clusters`);
    out["ca-ab"] = `${c.ab.join("; ")} · ${c.text}`;
  }
  if (MB_GRADES.includes(grade)) {
    if (!c.mb) throw new Error(`Grade ${grade} Spanish "${c.text}" needs its Manitoba strands`);
    out["ca-mb"] = `${c.mb.join("; ")} · ${c.text}`;
  }
  return { standards: out, standardElsewhere: wrs };
}

// Prompts whose answer choices are English (the meaning of a Spanish word); every other prompt's choices are Spanish.
const ENGLISH_CHOICES = /^(What does|What do|What number|Which English|What is .* in English|Who is|Who are|What time)/;

/** Marks a question's Spanish for read-aloud: the « » parts of the prompt, and the choices unless they are English. */
export function tagSpanish(q: Question, choices?: "en" | "es"): Question {
  q.quoteLang = "es";
  const english = choices ? choices === "en" : ENGLISH_CHOICES.test(q.prompt);
  if ((q.kind === "choice" || q.kind === "order" || q.kind === "sort") && !english) q.choicesLang = "es";
  if (q.visual?.type === "story" || q.visual?.type === "passage") q.visualLang = "es";
  return q;
}

/** Questions from a bank. Easier levels show fewer wrong answers, so a struggling child isn't faced with a wall of choices. */
export function esQuestions(items: EsItem[], opts: GenerateOptions | undefined, count = 8): Question[] {
  const wrongCount = opts?.difficulty === 1 ? 1 : opts?.difficulty === 3 ? 3 : 2;
  return sample(items, count).map(([prompt, right, wrong, hint, visual, choices]) => {
    const pic: Visual | undefined = typeof visual === "string" ? { type: "emoji", emoji: visual } : visual;
    const q = textChoice(prompt, right as Omit<Choice, "id"> | string, shuffle(wrong).slice(0, wrongCount) as (Omit<Choice, "id"> | string)[], hint, pic);
    return tagSpanish(q, choices);
  });
}

/** A sequencing question in Spanish; `items` are listed in the correct order. */
export function esOrder(prompt: string, hint: string, items: Opt[]): Question {
  return tagSpanish(frOrder(prompt, hint, items));
}

/** [emoji, Spanish, English] for picture vocabulary. Keep a list free of synonyms in both languages. */
export type Word = [emoji: string, es: string, en: string];

/**
 * Three questions per word: what it means, how to say it, and which word goes with the picture. Wrong answers are other
 * words from the same list.
 */
export function wordItems(words: Word[]): EsItem[] {
  return words.flatMap(([emoji, es, en]): EsItem[] => {
    const others = words.filter((w) => w[1] !== es);
    const first = [...es.replace(/^(el|la|los|las|un|una) /, "")].slice(0, 2).join("");
    return [
      [`What does «${es}» mean?`, en, others.map((w) => w[2]), `Picture it in your head. The English word starts with “${en[0]}”.`],
      [`How do you say “${en}” in Spanish?`, es, others.map((w) => w[1]), `It starts with “${first}”.`, emoji],
      ["Which Spanish word goes with the picture?", { emoji, label: es }, others.map((w) => w[1]), `Say what you see. The word starts with “${first}”.`, emoji],
    ];
  });
}

/** Builds 8 questions mixing a bank with a few order questions from `orders` (each [prompt, hint, items]). */
export function mixed(items: EsItem[], orders: [string, string, Opt[]][], opts: GenerateOptions | undefined): Question[] {
  const ordered = sample(orders, Math.min(2, orders.length)).map(([p, h, it]) => esOrder(p, h, it));
  return shuffle([...esQuestions(items, opts, 8 - ordered.length), ...ordered]);
}

// Big Ideas. Everywhere without its own Spanish curriculum for the grade: the five goal areas of the World-Readiness
// Standards, as ACTFL's summary states them.
const WRS_GOALS = [
  "Communication: communicate effectively in more than one language in order to function in a variety of situations and for multiple purposes",
  "Cultures: interact with cultural competence and understanding",
  "Connections: connect with other disciplines and acquire information and diverse perspectives in order to use the language to function in academic and career-related situations",
  "Comparisons: develop insight into the nature of language and culture in order to interact with cultural competence",
  "Communities: communicate and interact with cultural competence in order to participate in multilingual communities at home and around the world",
];

// Alberta's Nine-Year Program: its four general outcomes.
const AB_GENERAL = [
  "Applications: Students will use Spanish in a variety of situations and for a variety of purposes.",
  "Language Competence: Students will use Spanish effectively and competently.",
  "Global Citizenship: Students will acquire the knowledge, skills and attitudes to be effective global citizens.",
  "Strategies: Students will know and use strategies to maximize the effectiveness of learning and communication.",
];

// Manitoba's Grade 7 to Senior 4 framework: its four general learning outcomes.
const MB_GENERAL = [
  "Students will use Spanish in a variety of situations and for a variety of purposes.",
  "Students will use Spanish effectively and competently.",
  "Students will acquire the knowledge, skills, and attitudes to be effective global citizens, through the exploration of the cultures of the Spanish-speaking world.",
  "Students will know and use various strategies to maximize the effectiveness of learning and communication.",
];

/**
 * A grade's overview: `bc` is British Columbia's Big Ideas for Grades 5 to 9, word for word; frameworks without their
 * own get the World-Readiness goals (`bigIdeasElsewhere`). Spread into the course.
 */
export function spanishBigIdeas(grade: GradeId, bc?: string[]): { bigIdeas: Partial<Record<FrameworkId, string[]>>; bigIdeasElsewhere: string[] } {
  const out: Partial<Record<FrameworkId, string[]>> = {};
  if (BC_GRADES.includes(grade)) {
    if (!bc) throw new Error(`Grade ${grade} Spanish needs BC's Big Ideas`);
    out["ca-bc"] = bc;
  }
  if (AB_GRADES.includes(grade)) out["ca-ab"] = AB_GENERAL;
  if (MB_GRADES.includes(grade)) out["ca-mb"] = MB_GENERAL;
  return { bigIdeas: out, bigIdeasElsewhere: WRS_GOALS };
}
