import { gradeNumber } from "@/content/subjects";
import { pick, sample, shuffle } from "@/content/random";
import type { GradeId, QuestionLanguage, SubjectId } from "@/content/types";
import { spanishBridgeQuestion } from "./bridgeSpanish";

// Word Bridge: French or Spanish words and grammar. Each right answer lays a plank on the bridge.
// The step depends on the French the child takes: Immersion moves faster than Core French. Spanish rounds are in
// ./bridgeSpanish; a child with both languages on gets a mix.

export interface BridgeQuestion {
  /** A picture or English word, or a French sentence with a gap. */
  prompt: string;
  /** Shown bigger above the prompt (an emoji), when there is one. */
  picture?: string;
  /** Read aloud in English (Core French, Spanish) or French (Immersion). */
  speak: string;
  speakLang: "en" | QuestionLanguage;
  /** The language of the choices: French unless set. */
  answerLang?: QuestionLanguage;
  answer: string;
  choices: string[];
}

interface Word {
  fr: string;
  en: string;
  emoji: string;
}

const w = (emoji: string, fr: string, en: string): Word => ({ emoji, fr, en });

const ANIMALS = [w("🐱", "le chat", "cat"), w("🐶", "le chien", "dog"), w("🐟", "le poisson", "fish"), w("🐦", "l'oiseau", "bird"), w("🐴", "le cheval", "horse"), w("🐮", "la vache", "cow"), w("🐭", "la souris", "mouse"), w("🐰", "le lapin", "rabbit")];
const FOOD = [w("🍎", "la pomme", "apple"), w("🍞", "le pain", "bread"), w("🧀", "le fromage", "cheese"), w("🥛", "le lait", "milk"), w("🥕", "la carotte", "carrot"), w("🍌", "la banane", "banana"), w("🍓", "la fraise", "strawberry"), w("🥚", "l'œuf", "egg")];
const COLOURS = [w("🟥", "rouge", "red"), w("🟦", "bleu", "blue"), w("🟩", "vert", "green"), w("🟨", "jaune", "yellow"), w("🟧", "orange", "orange"), w("🟪", "violet", "purple"), w("⬛", "noir", "black"), w("⬜", "blanc", "white")];
const BODY = [w("👁️", "l'œil", "eye"), w("👃", "le nez", "nose"), w("👂", "l'oreille", "ear"), w("✋", "la main", "hand"), w("🦶", "le pied", "foot"), w("👄", "la bouche", "mouth")];
const SCHOOL = [w("✏️", "le crayon", "pencil"), w("📕", "le livre", "book"), w("✂️", "les ciseaux", "scissors"), w("🎒", "le sac à dos", "backpack"), w("📏", "la règle", "ruler"), w("🖍️", "le crayon de cire", "crayon")];
const WEATHER = [w("☀️", "Il fait soleil.", "It's sunny."), w("🌧️", "Il pleut.", "It's raining."), w("❄️", "Il neige.", "It's snowing."), w("🥵", "Il fait chaud.", "It's hot."), w("🥶", "Il fait froid.", "It's cold."), w("💨", "Il fait du vent.", "It's windy.")];
const NUMBERS = ["zéro", "un", "deux", "trois", "quatre", "cinq", "six", "sept", "huit", "neuf", "dix", "onze", "douze", "treize", "quatorze", "quinze", "seize", "dix-sept", "dix-huit", "dix-neuf", "vingt"];
const TENS: [number, string][] = [[20, "vingt"], [30, "trente"], [40, "quarante"], [50, "cinquante"], [60, "soixante"], [70, "soixante-dix"], [80, "quatre-vingts"], [90, "quatre-vingt-dix"], [100, "cent"]];
const DAYS: [string, string][] = [["Monday", "lundi"], ["Tuesday", "mardi"], ["Wednesday", "mercredi"], ["Thursday", "jeudi"], ["Friday", "vendredi"], ["Saturday", "samedi"], ["Sunday", "dimanche"]];
const MONTHS: [string, string][] = [["January", "janvier"], ["February", "février"], ["March", "mars"], ["April", "avril"], ["May", "mai"], ["June", "juin"], ["July", "juillet"], ["August", "août"], ["September", "septembre"], ["October", "octobre"], ["November", "novembre"], ["December", "décembre"]];

/** Nouns with their gender, for "le, la or l'?" (no article shown). */
const GENDER: [string, "le" | "la" | "l'"][] = [
  ["chat", "le"], ["maison", "la"], ["livre", "le"], ["pomme", "la"], ["école", "l'"], ["ami", "l'"], ["table", "la"], ["soleil", "le"],
  ["fenêtre", "la"], ["arbre", "l'"], ["jardin", "le"], ["voiture", "la"], ["hiver", "l'"], ["crayon", "le"], ["lune", "la"], ["orange", "l'"],
];

/** Present tense: pronoun, infinitive, answer. Every other form of the verb is a wrong choice. */
const VERBS: Record<string, Record<string, string>> = {
  être: { je: "suis", tu: "es", "il/elle": "est", nous: "sommes", vous: "êtes", "ils/elles": "sont" },
  avoir: { "j'": "ai", tu: "as", "il/elle": "a", nous: "avons", vous: "avez", "ils/elles": "ont" },
  aller: { je: "vais", tu: "vas", "il/elle": "va", nous: "allons", vous: "allez", "ils/elles": "vont" },
  faire: { je: "fais", tu: "fais", "il/elle": "fait", nous: "faisons", vous: "faites", "ils/elles": "font" },
};

/** Adjective agreement: masculine and feminine forms, and whether the adjective goes before the noun. */
const ADJECTIVES: [string, string, boolean][] = [
  ["grand", "grande", true], ["petit", "petite", true], ["joli", "jolie", true], ["beau", "belle", true], ["nouveau", "nouvelle", true],
  ["vert", "verte", false], ["blanc", "blanche", false], ["noir", "noire", false],
];
/** Things only, and no masculine noun starting with a vowel (that would need "bel" or "nouvel"). */
const FEMININE_NOUNS = ["une maison", "une voiture", "une fleur", "une table", "une robe"];
const MASCULINE_NOUNS = ["un chien", "un livre", "un chapeau", "un jardin", "un vélo"];

/** Passé composé: which helper verb (avoir or être)? */
const PASSE: [string, string][] = [
  ["Nous ___ mangé une pomme.", "avons"],
  ["Elle ___ allée au parc.", "est"],
  ["J'___ fini mes devoirs.", "ai"],
  ["Ils ___ arrivés hier.", "sont"],
  ["Tu ___ joué au soccer.", "as"],
  ["Je ___ venu à l'école.", "suis"],
  ["Vous ___ regardé le film.", "avez"],
  ["Elles ___ parties tôt.", "sont"],
];

const choicesFrom = (answer: string, pool: string[], count = 3) => shuffle([answer, ...sample(pool.filter((p) => p !== answer), count - 1)]);

/** How far along the child is, 0 (first words) to 3 (verb tenses). */
export function frenchStep(grade: GradeId, subjects: readonly SubjectId[] = []): 0 | 1 | 2 | 3 {
  const g = Math.max(0, gradeNumber(grade));
  if (subjects.includes("immersion")) return g <= 1 ? 0 : g <= 3 ? 1 : g <= 5 ? 2 : 3;
  return g <= 4 ? 0 : g <= 6 ? 1 : g <= 8 ? 2 : 3;
}

function pictureWord(immersion: boolean): BridgeQuestion {
  const set = pick([ANIMALS, FOOD, COLOURS, BODY, SCHOOL]);
  const word = pick(set);
  return {
    picture: word.emoji,
    prompt: immersion ? "Quel est le bon mot ?" : `Which is “${word.en}” in French?`,
    speak: immersion ? "Quel est le bon mot ?" : `Which is ${word.en} in French?`,
    speakLang: immersion ? "fr" : "en",
    answer: word.fr,
    choices: choicesFrom(
      word.fr,
      set.map((x) => x.fr),
    ),
  };
}

/** Immersion asks in French; Core French asks in English. */
const numberPrompt = (immersion: boolean) =>
  immersion ? { prompt: "Choisis le bon nombre", speak: "Choisis le bon nombre", speakLang: "fr" as const } : { prompt: "Pick the French number", speak: "Pick the French number", speakLang: "en" as const };

function numberWord(max: number, immersion: boolean): BridgeQuestion {
  const n = pick(Array.from({ length: max + 1 }, (_, i) => i));
  return { picture: String(n), ...numberPrompt(immersion), answer: NUMBERS[n], choices: choicesFrom(NUMBERS[n], NUMBERS.slice(0, max + 1)) };
}

function tensWord(immersion: boolean): BridgeQuestion {
  const [n, fr] = pick(TENS);
  return { picture: String(n), ...numberPrompt(immersion), answer: fr, choices: choicesFrom(fr, TENS.map((t) => t[1])) };
}

function calendarWord(): BridgeQuestion {
  const list = pick([DAYS, MONTHS]);
  const [en, fr] = pick(list);
  return { picture: "📅", prompt: `Which is “${en}” in French?`, speak: `Which is ${en} in French?`, speakLang: "en", answer: fr, choices: choicesFrom(fr, list.map((x) => x[1])) };
}

function weather(immersion: boolean): BridgeQuestion {
  const word = pick(WEATHER);
  return {
    picture: word.emoji,
    prompt: immersion ? "Quel temps fait-il ?" : `How do you say “${word.en}”?`,
    speak: immersion ? "Quel temps fait-il ?" : `How do you say ${word.en}`,
    speakLang: immersion ? "fr" : "en",
    answer: word.fr,
    choices: choicesFrom(
      word.fr,
      WEATHER.map((x) => x.fr),
    ),
  };
}

function gender(): BridgeQuestion {
  const [noun, art] = pick(GENDER);
  return { prompt: `___ ${noun}`, speak: "Le, la ou l'?", speakLang: "fr", answer: art, choices: ["le", "la", "l'"] };
}

function verb(): BridgeQuestion {
  const v = pick(Object.keys(VERBS));
  const forms = VERBS[v];
  const pronoun = pick(Object.keys(forms));
  const answer = forms[pronoun];
  const others = [...new Set(Object.values(forms))];
  const gap = pronoun.endsWith("'") ? `${pronoun}___` : `${pronoun} ___`;
  return { prompt: `${gap} (${v})`, speak: `Conjugue le verbe ${v}`, speakLang: "fr", answer, choices: choicesFrom(answer, others, 4) };
}

function agreement(): BridgeQuestion {
  const [m, f, before] = pick(ADJECTIVES);
  const feminine = pick([true, false]);
  const noun = feminine ? pick(FEMININE_NOUNS) : pick(MASCULINE_NOUNS);
  const [article, word] = noun.split(" ");
  const prompt = before ? `${article} ___ ${word}` : `${noun} ___`;
  return { prompt, speak: "Choisis le bon adjectif", speakLang: "fr", answer: feminine ? f : m, choices: shuffle([m, f]) };
}

function passe(): BridgeQuestion {
  const [sentence, answer] = pick(PASSE);
  return { prompt: sentence, speak: "Avoir ou être ?", speakLang: "fr", answer, choices: choicesFrom(answer, ["ai", "as", "a", "avons", "avez", "ont", "suis", "es", "est", "sommes", "êtes", "sont"], 4) };
}

/** A question in French or Spanish, whichever the child has on (either, when both are). */
export function bridgeQuestion(grade: GradeId, subjects: readonly SubjectId[] = []): BridgeQuestion {
  const french = subjects.some((s) => s === "immersion" || s === "core-french");
  const spanish = subjects.includes("spanish");
  if (spanish && (!french || pick([true, false]))) return spanishBridgeQuestion(grade);
  return frenchQuestion(grade, subjects);
}

function frenchQuestion(grade: GradeId, subjects: readonly SubjectId[]): BridgeQuestion {
  const step = frenchStep(grade, subjects);
  const immersion = subjects.includes("immersion");
  const options: (() => BridgeQuestion)[] =
    step === 0
      ? [() => pictureWord(immersion), () => pictureWord(immersion), () => numberWord(10, immersion)]
      : step === 1
        ? // The calendar question asks in English, so it is for Core French only.
          [() => pictureWord(immersion), () => numberWord(20, immersion), ...(immersion ? [] : [calendarWord]), () => weather(immersion)]
        : step === 2
          ? [gender, gender, verb, () => weather(immersion), () => tensWord(immersion)]
          : [verb, verb, agreement, passe, gender];
  return pick(options)();
}
