import { esQuestions, mixed, spanishBigIdeas, spanishStandards, wordItems, type EsItem, type Word } from "../../spanish";
import { NUMBERS } from "../../spanishNumbers";
import { sample } from "../../random";
import type { Course, GenerateOptions, Question } from "../../types";

// Spanish, Grade 3: first words. Prompts are English; the Spanish in « » is what children learn (see ../../spanish).

// ---------- Saludos ----------

const GREETINGS: EsItem[] = [
  ["How do you say “hello” in Spanish?", "Hola", ["Adiós", "Gracias", "Por favor"], "It is a short word that starts with a silent h."],
  ["How do you say “goodbye” in Spanish?", "Adiós", ["Hola", "Gracias", "Buenas noches"], "It starts with “a”, like “a-dee-OHS”."],
  ["How do you say “thank you” in Spanish?", "Gracias", ["Por favor", "Hola", "De nada"], "It starts with “gra”."],
  ["How do you say “please” in Spanish?", "Por favor", ["Gracias", "Adiós", "Hasta luego"], "Two words; the second one sounds like “favour”."],
  ["How do you say “good morning” in Spanish?", "Buenos días", ["Buenas noches", "Buenas tardes", "Adiós"], "«días» means days. Mornings start the day."],
  ["How do you say “good afternoon” in Spanish?", "Buenas tardes", ["Buenos días", "Buenas noches", "Hola"], "«tarde» is the afternoon."],
  ["How do you say “good night” in Spanish?", "Buenas noches", ["Buenos días", "Buenas tardes", "Gracias"], "«noche» is the night."],
  ["How do you say “you're welcome” in Spanish?", "De nada", ["Gracias", "Por favor", "Hola"], "It means “of nothing”: it was nothing!"],
  ["How do you say “see you later” in Spanish?", "Hasta luego", ["Buenos días", "Gracias", "De nada"], "«hasta» means until, and «luego» means later."],
  ["How do you say “see you tomorrow” in Spanish?", "Hasta mañana", ["Buenas tardes", "Por favor", "De nada"], "«mañana» means tomorrow."],
  ["How do you say “nice to meet you” in Spanish?", "Mucho gusto", ["De nada", "Hasta luego", "Por favor"], "You say it the first time you meet someone. It starts with «mucho»."],
  ["How do you say “I'm sorry” in Spanish?", "Lo siento", ["Gracias", "Hola", "Mucho gusto"], "It means “I feel it”. It starts with «lo»."],
  ["What does «Hola» mean?", "hello", ["goodbye", "thank you", "please"], "You say it when you meet someone."],
  ["What does «Adiós» mean?", "goodbye", ["hello", "please", "good night"], "You say it when you leave."],
  ["What does «Gracias» mean?", "thank you", ["please", "hello", "sorry"], "You say it when someone helps you."],
  ["What does «Por favor» mean?", "please", ["thank you", "goodbye", "good morning"], "You say it when you ask for something."],
  ["What does «¿Cómo te llamas?» mean?", "What is your name?", ["How are you?", "Where are you?", "How old are you?"], "«llamarse» is about your name: «Me llamo Ana» means My name is Ana."],
  ["What does «¿Cómo estás?» mean?", "How are you?", ["What is your name?", "Where do you live?", "How old are you?"], "«estás» asks how you are right now."],
  ["What does «Muy bien» mean?", "very well", ["very bad", "so-so", "thank you"], "«bien» means well."],
  ["What does «Hasta luego» mean?", "see you later", ["good morning", "you're welcome", "thank you"], "«luego» means later."],
  ["What does «Lo siento» mean?", "I'm sorry", ["thank you", "please", "hello"], "You say it when you made a mistake."],
  ["What does «Mucho gusto» mean?", "nice to meet you", ["see you later", "good night", "you're welcome"], "You say it the first time you meet someone."],
  ["How do you say “My name is Ana”?", "Me llamo Ana.", ["¿Cómo te llamas, Ana?", "Adiós, Ana.", "Gracias, Ana."], "Start with «Me llamo»."],
  ["Someone asks «¿Cómo te llamas?» Which answer fits?", "Me llamo Leo.", ["Muy bien, gracias.", "Hasta luego.", "De nada."], "They asked your name. Answer with «Me llamo…»."],
  ["Someone asks «¿Cómo estás?» Which answer fits?", "Muy bien, gracias.", ["Me llamo Leo.", "Buenas noches.", "Por favor."], "They asked how you are. Say how you feel."],
  ["Someone says «Gracias». Which answer fits?", "De nada.", ["Hola.", "Por favor.", "Buenas tardes."], "Answer a thank-you with “you're welcome”."],
  ["It is 8 in the morning. How do you greet your teacher?", "Buenos días", ["Buenas noches", "Adiós", "Buenas tardes"], "Morning greetings use «días»."],
  ["It is bedtime. What do you say to your family?", "Buenas noches", ["Buenos días", "Hola", "Buenas tardes"], "At night, use «noches»."],
  ["You are leaving school for the day. What do you say?", "Hasta mañana", ["Hola", "Buenos días", "Mucho gusto"], "You will see them tomorrow: «mañana»."],
];

// ---------- Los números ----------

function numberItems(max: number): EsItem[] {
  const near = (n: number) => sample([n - 2, n - 1, n + 1, n + 2, n + 10, n - 10].filter((x) => x >= 0 && x <= max && x !== n), 3);
  const items: EsItem[] = [];
  for (let n = 0; n <= max; n++) {
    const wrong = near(n);
    items.push([`What number is «${NUMBERS[n]}»?`, String(n), wrong.map(String), `Count up in Spanish: «uno, dos, tres…» until you reach «${NUMBERS[n]}».`]);
    items.push([`How do you say ${n} in Spanish?`, NUMBERS[n], wrong.map((x) => NUMBERS[x]), `Count up in Spanish from «uno» until you reach ${n}.`]);
    if (n >= 2 && n <= 12) {
      items.push(["Count the dots. Which Spanish number is it?", NUMBERS[n], wrong.map((x) => NUMBERS[x]), "Count the dots in Spanish, touching each one.", { type: "dots", count: n }]);
    }
  }
  return items;
}

function sums(opts?: GenerateOptions): Question[] {
  const items: EsItem[] = [];
  for (let a = 1; a <= 10; a++) {
    for (let b = 1; a + b <= 20 && b <= 10; b++) {
      const n = a + b;
      const wrong = [n - 1, n + 1, n + 2].filter((x) => x <= 20);
      if (wrong.length < 3) wrong.push(n - 2);
      items.push([`«${NUMBERS[a]}» + «${NUMBERS[b]}» = ?`, NUMBERS[n], wrong.map((x) => NUMBERS[x]), `${a} + ${b} = ${n}. Now say ${n} in Spanish.`]);
    }
  }
  return esQuestions(items, opts, 2);
}

// ---------- Los colores ----------

const COLOURS: Word[] = [
  ["🔴", "rojo", "red"],
  ["🔵", "azul", "blue"],
  ["🟢", "verde", "green"],
  ["🟡", "amarillo", "yellow"],
  ["🟠", "anaranjado", "orange"],
  ["🟣", "morado", "purple"],
  ["⚫", "negro", "black"],
  ["⚪", "blanco", "white"],
  ["🟤", "marrón", "brown"],
];

const COLOUR_THINGS: EsItem[] = [
  ["What colour is the grass? Answer in Spanish.", "verde", ["rojo", "azul", "negro"], "Grass is green.", "🌱"],
  ["What colour is a clear sky? Answer in Spanish.", "azul", ["verde", "amarillo", "marrón"], "A clear sky is blue.", "☀️"],
  ["What colour is snow? Answer in Spanish.", "blanco", ["negro", "rojo", "morado"], "Snow is white.", "❄️"],
  ["What colour is a ripe strawberry? Answer in Spanish.", "rojo", ["azul", "blanco", "verde"], "A ripe strawberry is red.", "🍓"],
  ["What colour is a ripe banana? Answer in Spanish.", "amarillo", ["morado", "azul", "negro"], "A ripe banana is yellow.", "🍌"],
  ["What colour is this top hat? Answer in Spanish.", "negro", ["amarillo", "blanco", "verde"], "This hat is black.", "🎩"],
  ["What colour is a pumpkin? Answer in Spanish.", "anaranjado", ["azul", "morado", "blanco"], "A pumpkin is orange.", "🎃"],
  ["What colour are grapes like these? Answer in Spanish.", "morado", ["amarillo", "blanco", "anaranjado"], "These grapes are purple.", "🍇"],
  ["What colour is chocolate? Answer in Spanish.", "marrón", ["verde", "azul", "blanco"], "Chocolate is brown.", "🍫"],
  ["«azul» + «amarillo» make which colour?", "verde", ["rojo", "morado", "negro"], "Mixing blue and yellow paint makes green."],
  ["«rojo» + «azul» make which colour?", "morado", ["verde", "anaranjado", "blanco"], "Mixing red and blue paint makes purple."],
  ["«rojo» + «amarillo» make which colour?", "anaranjado", ["verde", "azul", "negro"], "Mixing red and yellow paint makes orange."],
];

// ---------- Los animales ----------

const ANIMALS: Word[] = [
  ["🐶", "el perro", "dog"],
  ["🐱", "el gato", "cat"],
  ["🐦", "el pájaro", "bird"],
  ["🐟", "el pez", "fish"],
  ["🐴", "el caballo", "horse"],
  ["🐮", "la vaca", "cow"],
  ["🐷", "el cerdo", "pig"],
  ["🐭", "el ratón", "mouse"],
  ["🐸", "la rana", "frog"],
  ["🐻", "el oso", "bear"],
  ["🐰", "el conejo", "rabbit"],
];

// ---------- La familia ----------

const FAMILY: [es: string, en: string][] = [
  ["la madre", "mother"],
  ["el padre", "father"],
  ["el hermano", "brother"],
  ["la hermana", "sister"],
  ["la abuela", "grandmother"],
  ["el abuelo", "grandfather"],
  ["la tía", "aunt"],
  ["el tío", "uncle"],
  ["la prima", "cousin (a girl)"],
  ["el primo", "cousin (a boy)"],
  ["el bebé", "baby"],
];

const FAMILY_ITEMS: EsItem[] = [
  ...FAMILY.flatMap(([es, en]): EsItem[] => {
    const others = FAMILY.filter((f) => f[0] !== es);
    return [
      [`What does «${es}» mean?`, en, others.map((f) => f[1]), "«el» goes with boys and men, «la» with girls and women."],
      [`How do you say “${en}” in Spanish?`, es, others.map((f) => f[0]), `It starts with “${es.split(" ")[1].slice(0, 2)}”.`],
    ];
  }),
  ["Your mother's mother is your…", "abuela", ["tía", "hermana", "prima"], "Your mom's mom is your grandmother: «la abuela»."],
  ["Your father's brother is your…", "tío", ["abuelo", "primo", "hermano"], "Your dad's brother is your uncle: «el tío»."],
  ["Your aunt's son is your…", "primo", ["tío", "hermano", "abuelo"], "Your aunt's son is your cousin: «el primo»."],
  ["Your father's father is your…", "abuelo", ["tío", "primo", "padre"], "Your dad's dad is your grandfather: «el abuelo»."],
  ["Your mother's sister is your…", "tía", ["abuela", "prima", "madre"], "Your mom's sister is your aunt: «la tía»."],
];

export const course: Course = {
  grade: "3",
  subject: "spanish",
  ...spanishBigIdeas("3"),
  units: [
    {
      id: "saludos",
      title: "Hello and goodbye",
      emoji: "👋",
      blurb: "¡Hola! ¿Cómo te llamas?",
      parentNote: "Greetings for different times of day, saying your name, and polite words like please, thank you and you're welcome.",
      ...spanishStandards("3", { wrs: ["Interpersonal Communication", "Relating Cultural Practices to Perspectives"], text: "greeting people, saying your name and using polite words" }),
      generate: (o) => esQuestions(GREETINGS, o),
    },
    {
      id: "numeros-hasta-20",
      title: "Numbers to 20",
      emoji: "🔢",
      blurb: "Uno, dos, tres…",
      parentNote: "Counting, reading and saying the numbers from zero to twenty in Spanish, with a little adding.",
      ...spanishStandards("3", { wrs: ["Interpretive Communication", "Making Connections"], text: "counting and saying the numbers from zero to twenty" }),
      generate: (o) => [...esQuestions(numberItems(20), o, 6), ...sums(o)],
    },
    {
      id: "colores",
      title: "Colours",
      emoji: "🎨",
      blurb: "Rojo, azul, verde",
      parentNote: "The names of nine colours, matched to pictures and to things children know.",
      ...spanishStandards("3", { wrs: ["Interpretive Communication", "Presentational Communication"], text: "naming colours" }),
      generate: (o) => esQuestions([...wordItems(COLOURS), ...COLOUR_THINGS], o),
    },
    {
      id: "animales",
      title: "Animals",
      emoji: "🐶",
      blurb: "El perro, el gato…",
      parentNote: "Eleven common animals, with «el» or «la» in front, the way Spanish names things.",
      ...spanishStandards("3", { wrs: ["Interpretive Communication", "Language Comparisons"], text: "naming common animals with el and la" }),
      generate: (o) => esQuestions(wordItems(ANIMALS), o),
    },
    {
      id: "familia",
      title: "My family",
      emoji: "👨‍👩‍👧",
      blurb: "Mi madre, mi abuelo…",
      parentNote: "Family words, from mother and father to aunts, uncles and cousins, and how family members are related.",
      ...spanishStandards("3", { wrs: ["Interpersonal Communication", "Presentational Communication"], text: "naming family members" }),
      generate: (o) => mixed(FAMILY_ITEMS, [], o),
    },
  ],
};
