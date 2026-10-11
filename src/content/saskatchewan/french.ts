import type { Course, GradeId, Unit } from "../types";
import { course as ontarioCoreFrench4 } from "../ontario/g4-core-french";
import { cf1, cf2, cf3, cf4, cf6, cf8, imm5, imm8 } from "./french-units";
import { SK_FRENCH_OUTCOMES } from "./french-outcomes";
import { reuse, share, sk } from "./kit";

// Saskatchewan French. Sources: the Saskatchewan Curriculum (Ministry of Education), "Core French" Levels 1 to 9
// (curriculum.gov.sk.ca) and "Français en immersion" Grades 3 to 9 with the "Programme d'études interdisciplinaire"
// for Kindergarten to Grade 2 (progetudes.gov.sk.ca). The Ministry describes both as Kindergarten to Grade 12
// programs (saskatchewan.ca, "Studying French in Saskatchewan"); Core French has curriculum levels 1 to 9 listed
// under Grades 1 to 9, and the level is the grade number here. Each school division decides when its students
// start, and a child starting Core French later will find the level above their French. Outcome codes are checked
// against docs/research/saskatchewan/outcomes.json in content.test.ts.
//
// Core French cites the four goals of each level: Communication Skills (CS), General Language Strategies (GL),
// Language Knowledge (LK) and Culture (C). Immersion cites the Grade 3 to 9 strands (VC, CO, CÉ, PO, PÉ) and the
// Kindergarten to Grade 2 components of the interdisciplinary program (É-/AP- codes). Units the BC French courses
// also have are shared; Grades 1 to 4 of Core French are written for Saskatchewan or taken from Ontario's Grade 4.

type Plan = Record<string, readonly [codes: string, text: string]>;

const withLevel = (grade: GradeId, codes: string): string =>
  codes
    .split(", ")
    .map((c) => `${grade}.${c}`)
    .join(", ");

// ---------- Core French ----------

const LISTEN = "understanding spoken French";
const SPEAK = "speaking and interacting in French";
const READ = "reading and understanding French texts";
const WRITE = "writing short texts in French";
const CULTURE = "Francophone, First Nations and Métis cultures";

const CORE_PLAN: Partial<Record<GradeId, Plan>> = {
  "5": {
    salutations: ["CS.2", SPEAK],
    "sons-et-accents": ["CS.1, GL.1", `${LISTEN}, with listening strategies`],
    nombres: ["CS.1, LK.1", `${LISTEN}, and numbers`],
    "genre-et-nombre": ["CS.4, LK.1", `${WRITE}, with noun and adjective agreement`],
    gouts: ["CS.2, LK.1", `${SPEAK}, giving likes and dislikes`],
    descriptions: ["CS.4, LK.1", `${WRITE}, describing people and things`],
    "communautes-francophones": ["C.1", CULTURE],
    respect: ["C.1", `${CULTURE}, and giving credit and showing respect`],
  },
  "6": {
    "motifs-de-lettres": ["CS.1, GL.1", `${LISTEN}, and letter patterns`],
    "mots-interrogatifs": ["CS.2, LK.1", `${SPEAK}, with question words`],
    loisirs: ["CS.2, LK.1", `${SPEAK}, talking about hobbies`],
    "parce-que": ["CS.2", `${SPEAK}, giving reasons`],
    "emotions-et-etats": ["CS.2, LK.1", `${SPEAK}, talking about feelings`],
    famille: ["CS.4, LK.1", `${WRITE}, about family and friends`],
    "communautes-francophones": ["C.1", CULTURE],
    "sources-et-respect": ["C.1", `${CULTURE}, and respect for sources`],
  },
  "7": {
    directions: ["CS.2, LK.1", `${SPEAK}, giving directions`],
    lieux: ["CS.4, LK.1", `${WRITE}, about places in town`],
    comparaisons: ["CS.4, LK.1", `${WRITE}, comparing things`],
    personnalite: ["CS.2, LK.1", `${SPEAK}, describing people`],
    "mots-amis": ["CS.3, GL.3", `${READ}, with reading strategies`],
    histoires: ["CS.3", READ],
    "monde-francophone": ["C.1", CULTURE],
    "cultures-et-respect": ["C.1", `${CULTURE}, and respect`],
  },
  "8": {
    "passe-present-futur": ["CS.4, LK.1", `${WRITE}, in the past, present and future`],
    questions: ["CS.2, LK.1", `${SPEAK}, asking questions`],
    frequence: ["CS.4, LK.1", `${WRITE}, saying how often`],
    "opinions-et-raisons": ["CS.2", `${SPEAK}, giving opinions and reasons`],
    "comparer-et-opposer": ["CS.4", `${WRITE}, comparing and contrasting`],
    "sons-et-lettres": ["CS.1, GL.1", `${LISTEN}, and sounds and letters`],
    histoires: ["CS.3", READ],
    "monde-francophone": ["C.1", CULTURE],
    "culture-et-respect": ["C.1", `${CULTURE}, and respect`],
  },
  "9": {
    "temps-9": ["CS.4, LK.1", `${WRITE}, in the past, present and future`],
    "poser-des-questions": ["CS.2, LK.1", `${SPEAK}, asking questions`],
    sequences: ["CS.4", `${WRITE}, putting events in order`],
    "besoins-et-opinions": ["CS.2", `${SPEAK}, giving needs and opinions`],
    "comparer-9": ["CS.4, LK.1", `${WRITE}, comparing amounts`],
    descriptions: ["CS.4, LK.1", `${WRITE}, describing things and places`],
    "types-de-textes": ["CS.3", `${READ}, of different types`],
    traditions: ["C.1", CULTURE],
    "histoires-9": ["CS.3", `${READ}, with a problem and a resolution`],
    "identite-et-creations": ["CS.4, C.1", `${WRITE}, about identity and creative works`],
    "culture-et-respect-9": ["C.1", `${CULTURE}, and respect`],
  },
};

// Grade 4 Core French units are the ones written for Ontario, whose Core French also starts in Grade 4.
const CORE_4: Record<string, string> = {
  "salutations-4": sk("4.CS.1, 4.CS.2", "understanding and using greetings, courtesy phrases and introductions"),
  "ma-classe": sk("4.CS.1, 4.LK.1", "classroom words and instructions"),
  "couleurs-4": sk("4.LK.1", "colours as adjectives, and key vocabulary"),
  "nombres-4": sk("4.LK.1", "numbers in French, on the way to 69"),
  "calendrier-4": sk("4.CS.3, 4.LK.1", "days, months and seasons"),
  "animaux-4": sk("4.LK.1, 4.CS.2", "animal vocabulary, and saying what you have"),
};

const CORE_UNITS: Partial<Record<GradeId, Unit[]>> = { "1": cf1, "2": cf2, "3": cf3 };

const CORE_IDEAS = [
  "Communication Skills: understand and use French orally, and read and write it, at the level of the grade.",
  "General Language Strategies: use listening, speaking, reading and writing strategies to learn and to make meaning.",
  "Language Knowledge: learn the words, sentences and grammar that go with each theme.",
  "Culture: explore Francophone, First Nations and Métis cultures in Saskatchewan and Canada.",
];

// ---------- French Immersion ----------

const WHAT = {
  CO1: "understanding what is said in French",
  PO1: "speaking in French with the right words and sentences",
  PO2: "preparing and giving a spoken message in French",
  CE1: "understanding French texts",
  CE2: "using reading strategies and knowledge of words in French",
  PE1: "composing texts in French",
  PE2: "writing French with the correct conventions",
};

const grade3to9 = (grade: GradeId, entries: Record<string, [string, string]>): Plan =>
  Object.fromEntries(Object.entries(entries).map(([id, [codes, text]]) => [id, [withLevel(grade, codes), text] as const]));

const IMMERSION_PLAN: Partial<Record<GradeId, Plan>> = {
  // Kindergarten and Grade 1: Programme d'études interdisciplinaire M and 1 (É- components).
  k: {
    "bonjour-et-merci": ["É-GV.2, É-AF.1", "short, courteous French expressions used in familiar situations"],
    "mes-premiers-mots": ["É-AC.1", "a growing French vocabulary for school and home"],
    lettres: ["É-AC.5", "linking spoken French to written letters"],
    "sons-du-debut": ["É-AC.4", "playing with the sounds and parts of words"],
    syllabes: ["É-AC.4", "playing with the sounds and parts of words"],
    rimes: ["É-AC.3, É-AC.6", "the sounds and rhythm of French, and rhymes and songs"],
    histoires: ["É-DV.4", "the beginning, middle and end of a story"],
  },
  "1": {
    "je-me-presente": ["É-GV.2", "giving personal details with short French expressions"],
    "majuscule-et-point": ["É-AC.2, É-AC.5", "kinds of sentences, and linking speech to print"],
    "est-ce-que": ["É-AC.2, É-GV.2", "asking and answering simple questions"],
    "verbes-d-action": ["É-AC.1", "action words in a growing French vocabulary"],
    "couleurs-et-adjectifs": ["É-AC.1", "describing with colours and adjectives"],
    "histoire-ou-texte": ["É-DV.4", "telling stories from information texts"],
    "elements-d-une-histoire": ["É-DV.4", "the parts of a story"],
  },
  // Grade 2: Programme d'études interdisciplinaire 2 (AP- components).
  "2": {
    "le-la-un-une": ["AP-AC.6", "discovering the rules of French, such as articles"],
    "accord-des-adjectifs": ["AP-AC.4, AP-AC.6", "describing with adjectives, and discovering how they change"],
    "ordre-des-mots": ["AP-AC.1, AP-AC.6", "word order in French sentences"],
    "les-contes": ["AP-DV.3", "the plot, characters and order of events in tales"],
    "dabord-ensuite-enfin": ["AP-GV.1", "describing a series of events in simple sentences"],
    "etre-et-avoir": ["AP-AC.6", "the verbs être and avoir"],
  },
  "3": grade3to9("3", {
    "verbes-pronominaux": ["PÉ.2", WHAT.PE2],
    "et-mais-ou-avec": ["PÉ.2", WHAT.PE2],
    "ne-pas": ["PÉ.2", WHAT.PE2],
    "futur-proche": ["PÉ.2", WHAT.PE2],
    "pluriels-en-x": ["PÉ.2", WHAT.PE2],
    "prefixes-et-suffixes": ["CÉ.2", WHAT.CE2],
    "idee-principale": ["CÉ.1", WHAT.CE1],
  }),
  "4": grade3to9("4", {
    "tu-ou-vous": ["PO.1", WHAT.PO1],
    "poser-des-questions": ["PO.1", WHAT.PO1],
    "synonymes-et-contraires": ["CÉ.2", WHAT.CE2],
    "adverbes-en-ment": ["PÉ.2", WHAT.PE2],
    comparer: ["PÉ.2", WHAT.PE2],
    "passe-compose": ["PÉ.2", WHAT.PE2],
    imparfait: ["PÉ.2", WHAT.PE2],
    "comprendre-un-texte": ["CÉ.1", WHAT.CE1],
    "structure-du-recit": ["CÉ.1", WHAT.CE1],
  }),
  "5": grade3to9("5", {
    "pronoms-relatifs": ["PÉ.2", WHAT.PE2],
    negation: ["PÉ.2", WHAT.PE2],
    adverbes: ["PÉ.2", WHAT.PE2],
    ponctuation: ["PÉ.2", WHAT.PE2],
    "bande-dessinee": ["CÉ.1", WHAT.CE1],
    biographie: ["CÉ.1", WHAT.CE1],
    "fait-ou-opinion": ["CÉ.1", WHAT.CE1],
  }),
  "6": grade3to9("6", {
    "imparfait-ou-passe-compose": ["PÉ.2", WHAT.PE2],
    "familles-de-mots": ["CÉ.2", WHAT.CE2],
    legendes: ["CÉ.1", WHAT.CE1],
    "temps-et-lieux": ["CÉ.1", WHAT.CE1],
    "roman-jeunesse": ["CÉ.1", WHAT.CE1],
    "marqueurs-de-relation": ["PÉ.2", WHAT.PE2],
    resumer: ["PÉ.1", WHAT.PE1],
  }),
  "7": grade3to9("7", {
    superlatif: ["PÉ.2", WHAT.PE2],
    "concordance-des-temps": ["PÉ.2", WHAT.PE2],
    "figures-de-style": ["CÉ.1", WHAT.CE1],
    poesie: ["CÉ.1", WHAT.CE1],
    "paragraphe-argumentatif": ["PÉ.1", WHAT.PE1],
    "inferences-et-themes": ["CÉ.1", WHAT.CE1],
    "portrait-de-personnage": ["PÉ.1", WHAT.PE1],
  }),
  "8": grade3to9("8", {
    "registres-de-langue": ["PO.1", WHAT.PO1],
    "communication-verbale": ["PO.2", WHAT.PO2],
    legende: ["CÉ.1", WHAT.CE1],
    theatre: ["CÉ.1", WHAT.CE1],
    "schema-narratif": ["CÉ.1", WHAT.CE1],
    "structure-des-textes": ["CÉ.1", WHAT.CE1],
    "point-virgule-et-guillemets": ["PÉ.2", WHAT.PE2],
    "subordonnees-relatives": ["PÉ.2", WHAT.PE2],
    "accord-du-participe": ["PÉ.2", WHAT.PE2],
    complements: ["PÉ.2", WHAT.PE2],
    "futur-et-conditionnel": ["PÉ.2", WHAT.PE2],
  }),
  "9": grade3to9("9", {
    "registres-et-expose": ["PO.1, PO.2", WHAT.PO2],
    fable: ["CÉ.1", WHAT.CE1],
    roman: ["CÉ.1", WHAT.CE1],
    "figures-de-style": ["CÉ.1", WHAT.CE1],
    "sequence-descriptive": ["PÉ.1", WHAT.PE1],
    "temps-du-passe": ["PÉ.2", WHAT.PE2],
    "pronoms-complements": ["PÉ.2", WHAT.PE2],
    "phrases-hypothetiques": ["PÉ.2", WHAT.PE2],
    "passe-simple": ["PÉ.2", WHAT.PE2],
  }),
};

const IMMERSION_UNITS: Partial<Record<GradeId, Unit[]>> = { "5": imm5, "8": imm8 };

const IMMERSION_IDEAS = [
  "French Immersion is a second-language program in which French is the language of instruction for much of the school day.",
  "Listening and speaking in French grow every day, and students learn to understand and share messages for real purposes.",
  "Reading a range of French texts builds comprehension, and writing builds precision with the conventions of French.",
  "Students value learning French and appreciate Francophone, Métis and First Nations cultures in Canada and the world.",
];

const sharesFor = (plan: Plan): NonNullable<Course["shares"]> =>
  Object.fromEntries(Object.entries(plan).map(([id, [codes, text]]) => [id, share(codes, text)]));

const ids = (plan: Plan | undefined, own: Unit[] = []): string[] => [...Object.keys(plan ?? {}), ...own.map((u) => u.id)];

/** The Saskatchewan Core French (Levels 1 to 9) and French Immersion courses for a grade. */
export function frenchCourses(grade: GradeId): Course[] {
  const out: Course[] = [];
  const overview = SK_FRENCH_OUTCOMES[grade];

  const corePlan = CORE_PLAN[grade];
  if (grade === "4") {
    const adopted = reuse(ontarioCoreFrench4.units, CORE_4);
    const own = cf4;
    out.push({ grade, subject: "core-french", bigIdeas: { "ca-sk": overview?.["core-french"] ?? CORE_IDEAS }, units: [...adopted, ...own], order: { "ca-sk": [...adopted.map((u) => u.id), ...own.map((u) => u.id)] } });
  } else if (CORE_UNITS[grade]) {
    const own = CORE_UNITS[grade]!;
    out.push({ grade, subject: "core-french", bigIdeas: { "ca-sk": overview?.["core-french"] ?? CORE_IDEAS }, units: own, order: { "ca-sk": ids(undefined, own) } });
  } else if (corePlan) {
    const own = grade === "6" ? cf6 : grade === "8" ? cf8 : [];
    out.push({
      grade,
      subject: "core-french",
      bigIdeas: { "ca-sk": overview?.["core-french"] ?? CORE_IDEAS },
      units: own,
      shares: sharesFor(
        Object.fromEntries(Object.entries(corePlan).map(([id, [codes, text]]) => [id, [withLevel(grade, codes), text] as const])),
      ),
      order: { "ca-sk": ids(corePlan, own) },
    });
  }

  const immPlan = IMMERSION_PLAN[grade];
  if (immPlan) {
    const own = IMMERSION_UNITS[grade] ?? [];
    out.push({
      grade,
      subject: "immersion",
      bigIdeas: { "ca-sk": overview?.immersion ?? IMMERSION_IDEAS },
      units: own,
      shares: sharesFor(immPlan),
      order: { "ca-sk": ids(immPlan, own) },
    });
  }
  return out;
}
