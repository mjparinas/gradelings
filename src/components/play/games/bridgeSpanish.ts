import { gradeNumber } from "@/content/subjects";
import { pick, sample, shuffle } from "@/content/random";
import type { GradeId } from "@/content/types";
import type { BridgeQuestion } from "./bridge";

// Word Bridge in Spanish (Grades 3 to 9): pictures and numbers first, then days, weather and el or la, then verbs.
// Prompts are in English, like the Spanish course; the choices are Spanish.

const w = (emoji: string, es: string, en: string) => ({ emoji, es, en });

const ANIMALS = [w("🐱", "el gato", "cat"), w("🐶", "el perro", "dog"), w("🐟", "el pez", "fish"), w("🐦", "el pájaro", "bird"), w("🐴", "el caballo", "horse"), w("🐮", "la vaca", "cow"), w("🐭", "el ratón", "mouse"), w("🐸", "la rana", "frog")];
const FOOD = [w("🍎", "la manzana", "apple"), w("🍞", "el pan", "bread"), w("🧀", "el queso", "cheese"), w("🥛", "la leche", "milk"), w("🍌", "el plátano", "banana"), w("🍓", "la fresa", "strawberry"), w("🥚", "el huevo", "egg"), w("💧", "el agua", "water")];
const COLOURS = [w("🟥", "rojo", "red"), w("🟦", "azul", "blue"), w("🟩", "verde", "green"), w("🟨", "amarillo", "yellow"), w("🟧", "anaranjado", "orange"), w("🟪", "morado", "purple"), w("⬛", "negro", "black"), w("⬜", "blanco", "white")];
const BODY = [w("👁️", "el ojo", "eye"), w("👃", "la nariz", "nose"), w("👂", "la oreja", "ear"), w("✋", "la mano", "hand"), w("🦶", "el pie", "foot"), w("👄", "la boca", "mouth")];
const SCHOOL = [w("✏️", "el lápiz", "pencil"), w("📕", "el libro", "book"), w("✂️", "las tijeras", "scissors"), w("🎒", "la mochila", "backpack"), w("📏", "la regla", "ruler"), w("🖍️", "el crayón", "crayon")];
const WEATHER = [w("☀️", "Hace sol.", "It's sunny."), w("🌧️", "Llueve.", "It's raining."), w("❄️", "Nieva.", "It's snowing."), w("🥵", "Hace calor.", "It's hot."), w("🥶", "Hace frío.", "It's cold."), w("💨", "Hace viento.", "It's windy.")];
const NUMBERS = ["cero", "uno", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce", "trece", "catorce", "quince", "dieciséis", "diecisiete", "dieciocho", "diecinueve", "veinte"];
const TENS: [number, string][] = [[20, "veinte"], [30, "treinta"], [40, "cuarenta"], [50, "cincuenta"], [60, "sesenta"], [70, "setenta"], [80, "ochenta"], [90, "noventa"], [100, "cien"]];
const DAYS: [string, string][] = [["Monday", "lunes"], ["Tuesday", "martes"], ["Wednesday", "miércoles"], ["Thursday", "jueves"], ["Friday", "viernes"], ["Saturday", "sábado"], ["Sunday", "domingo"]];
const MONTHS: [string, string][] = [["January", "enero"], ["February", "febrero"], ["March", "marzo"], ["April", "abril"], ["May", "mayo"], ["June", "junio"], ["July", "julio"], ["August", "agosto"], ["September", "septiembre"], ["October", "octubre"], ["November", "noviembre"], ["December", "diciembre"]];

/** Nouns with their article, for "el or la?" (common words whose gender follows the -o and -a rule or is well known). */
const GENDER: [string, "el" | "la"][] = [
  ["libro", "el"], ["casa", "la"], ["perro", "el"], ["mesa", "la"], ["gato", "el"], ["escuela", "la"], ["árbol", "el"], ["flor", "la"],
  ["sol", "el"], ["luna", "la"], ["día", "el"], ["mano", "la"], ["coche", "el"], ["ventana", "la"], ["lápiz", "el"], ["ciudad", "la"],
];

/** Present tense of regular verbs: the right form for each pronoun. Every other form of the verb is a wrong choice. */
const VERBS: Record<string, Record<string, string>> = {
  hablar: { yo: "hablo", tú: "hablas", "él/ella": "habla", nosotros: "hablamos", ellos: "hablan" },
  comer: { yo: "como", tú: "comes", "él/ella": "come", nosotros: "comemos", ellos: "comen" },
  vivir: { yo: "vivo", tú: "vives", "él/ella": "vive", nosotros: "vivimos", ellos: "viven" },
  ser: { yo: "soy", tú: "eres", "él/ella": "es", nosotros: "somos", ellos: "son" },
  tener: { yo: "tengo", tú: "tienes", "él/ella": "tiene", nosotros: "tenemos", ellos: "tienen" },
  ir: { yo: "voy", tú: "vas", "él/ella": "va", nosotros: "vamos", ellos: "van" },
};

/** Ser or estar: a sentence with a gap and the right form. */
const SER_ESTAR: [string, string][] = [
  ["Yo ___ de México.", "soy"],
  ["Ella ___ en la escuela.", "está"],
  ["Nosotros ___ cansados.", "estamos"],
  ["Mi padre ___ médico.", "es"],
  ["Tú ___ muy simpático.", "eres"],
  ["El libro ___ en la mesa.", "está"],
  ["Ellos ___ hermanos.", "son"],
  ["Yo ___ feliz hoy.", "estoy"],
];

/** The preterite of regular verbs, "yo" and "él/ella". */
const PRETERITE: [string, string, string[]][] = [
  ["Ayer yo ___ con mi abuela. (hablar)", "hablé", ["habló", "hablo", "hablaste"]],
  ["Ayer ella ___ pizza. (comer)", "comió", ["comí", "come", "comiste"]],
  ["El año pasado yo ___ en Lima. (vivir)", "viví", ["vivió", "vivo", "viviste"]],
  ["Anoche él ___ la tarea. (terminar)", "terminó", ["terminé", "termina", "terminaste"]],
  ["Ayer yo ___ un libro. (leer)", "leí", ["leyó", "leo", "leíste"]],
  ["El sábado ella ___ en el lago. (nadar)", "nadó", ["nadé", "nada", "nadaste"]],
];

const choicesFrom = (answer: string, pool: string[], count = 3) => shuffle([answer, ...sample(pool.filter((p) => p !== answer), count - 1)]);

/** How far along the child is, 0 (first words) to 3 (verb tenses): the Spanish course starts in Grade 3. */
export function spanishStep(grade: GradeId): 0 | 1 | 2 | 3 {
  const g = gradeNumber(grade);
  return g <= 4 ? 0 : g <= 6 ? 1 : g <= 8 ? 2 : 3;
}

const english = (prompt: string, answer: string, choices: string[], picture?: string): BridgeQuestion => ({
  ...(picture ? { picture } : {}),
  prompt,
  speak: prompt.replace(/[“”]/g, ""),
  speakLang: "en",
  answerLang: "es",
  answer,
  choices,
});

function pictureWord(): BridgeQuestion {
  const set = pick([ANIMALS, FOOD, COLOURS, BODY, SCHOOL]);
  const word = pick(set);
  return english(`Which is “${word.en}” in Spanish?`, word.es, choicesFrom(word.es, set.map((x) => x.es)), word.emoji);
}

function numberWord(max: number): BridgeQuestion {
  const n = pick(Array.from({ length: max + 1 }, (_, i) => i));
  return english("Pick the Spanish number", NUMBERS[n], choicesFrom(NUMBERS[n], NUMBERS.slice(0, max + 1)), String(n));
}

function tensWord(): BridgeQuestion {
  const [n, es] = pick(TENS);
  return english("Pick the Spanish number", es, choicesFrom(es, TENS.map((t) => t[1])), String(n));
}

function calendarWord(): BridgeQuestion {
  const list = pick([DAYS, MONTHS]);
  const [en, es] = pick(list);
  return english(`Which is “${en}” in Spanish?`, es, choicesFrom(es, list.map((x) => x[1])), "📅");
}

function weather(): BridgeQuestion {
  const word = pick(WEATHER);
  return english(`How do you say “${word.en}”?`, word.es, choicesFrom(word.es, WEATHER.map((x) => x.es)), word.emoji);
}

function gender(): BridgeQuestion {
  const [noun, art] = pick(GENDER);
  return { prompt: `___ ${noun}`, speak: "El or la?", speakLang: "en", answerLang: "es", answer: art, choices: ["el", "la"] };
}

function verb(): BridgeQuestion {
  const v = pick(Object.keys(VERBS));
  const forms = VERBS[v];
  const pronoun = pick(Object.keys(forms));
  const answer = forms[pronoun];
  return { prompt: `${pronoun} ___ (${v})`, speak: `Pick the right form of ${v}`, speakLang: "en", answerLang: "es", answer, choices: choicesFrom(answer, Object.values(forms), 4) };
}

function serEstar(): BridgeQuestion {
  const [sentence, answer] = pick(SER_ESTAR);
  return { prompt: sentence, speak: "Ser or estar?", speakLang: "en", answerLang: "es", answer, choices: choicesFrom(answer, ["soy", "eres", "es", "somos", "son", "estoy", "estás", "está", "estamos", "están"], 4) };
}

function preterite(): BridgeQuestion {
  const [sentence, answer, wrong] = pick(PRETERITE);
  return { prompt: sentence, speak: "Pick the past tense", speakLang: "en", answerLang: "es", answer, choices: shuffle([answer, ...wrong]) };
}

export function spanishBridgeQuestion(grade: GradeId): BridgeQuestion {
  const step = spanishStep(grade);
  const options: (() => BridgeQuestion)[] =
    step === 0
      ? [pictureWord, pictureWord, () => numberWord(10), () => numberWord(20)]
      : step === 1
        ? [pictureWord, () => numberWord(20), calendarWord, weather, gender]
        : step === 2
          ? [gender, verb, verb, weather, tensWord, calendarWord]
          : [verb, serEstar, serEstar, preterite, preterite, gender];
  return pick(options)();
}
