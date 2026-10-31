import { esQuestions, spanishBigIdeas, spanishStandards, wordItems, type EsItem, type Word } from "../../spanish";
import type { Course } from "../../types";

// Spanish, Grade 6: questions, food, hobbies, feelings and describing people. Prompts are English; the Spanish in « » is
// what children learn (see ../../spanish).

// ---------- Las preguntas ----------

const WORDS: [es: string, en: string][] = [
  ["¿Por qué?", "why"],
  ["¿Quién?", "who"],
  ["¿Dónde?", "where"],
  ["¿Cuándo?", "when"],
  ["¿Cómo?", "how"],
  ["¿Qué?", "what"],
  ["¿Cuántos?", "how many"],
];

const QUESTIONS: EsItem[] = [
  ...WORDS.map(([es, en], i): EsItem => [`Which question word means “${en}”?`, es, WORDS.filter((_, j) => j !== i).map((w) => w[0]), "Question words: «qué» what, «quién» who, «dónde» where, «cuándo» when, «cómo» how, «por qué» why, «cuántos» how many."]),
  ...WORDS.map(([es, en], i): EsItem => [`What does «${es}» mean?`, en, WORDS.filter((_, j) => j !== i).map((w) => w[1]), "Question words: «qué» what, «quién» who, «dónde» where, «cuándo» when, «cómo» how, «por qué» why, «cuántos» how many."]),
  ["Choose the question word: «¿___ te llamas?» (What is your name?)", "Cómo", ["Dónde", "Cuándo", "Quién"], "Spanish asks “How are you called?”: «¿Cómo te llamas?»"],
  ["Choose the question word: «¿___ vives?» (Where do you live?)", "Dónde", ["Cómo", "Cuándo", "Qué"], "Where: «dónde»."],
  ["Choose the question word: «¿___ es tu cumpleaños?» (When is your birthday?)", "Cuándo", ["Dónde", "Quién", "Cuántos"], "When: «cuándo»."],
  ["Choose the question word: «¿___ es tu maestra?» (Who is your teacher?)", "Quién", ["Cuándo", "Dónde", "Cuántos"], "Who: «quién»."],
  ["Choose the question word: «¿___ hermanos tienes?» (How many brothers do you have?)", "Cuántos", ["Quién", "Dónde", "Por qué"], "How many: «cuántos»."],
  ["Choose the question word: «¿___ quieres comer?» (What do you want to eat?)", "Qué", ["Quién", "Dónde", "Cuándo"], "What: «qué»."],
  ["Which answer fits «¿Dónde vives?»", "Vivo en Lima.", ["Tengo once años.", "Me gusta el arroz.", "Es el lunes."], "«¿Dónde?» asks for a place."],
  ["Which answer fits «¿Cuándo es tu cumpleaños?»", "Es el diez de abril.", ["Vivo en Quito.", "Es mi hermana.", "Porque hace sol."], "«¿Cuándo?» asks for a time or a date."],
  ["Which answer fits «¿Por qué estás feliz?»", "Porque es mi cumpleaños.", ["Es mi hermana.", "Vivo en Bogotá.", "Tengo dos gatos."], "«¿Por qué?» asks for a reason; answer with «Porque…»."],
  ["Which answer fits «¿Quién es ella?»", "Es mi hermana.", ["Es el lunes.", "Vivo en Lima.", "Tengo hambre."], "«¿Quién?» asks about a person."],
  ["Which answer fits «¿Cuántos perros tienes?»", "Tengo dos perros.", ["Es mi perro.", "Vivo con mi perro.", "Me gustan los perros."], "«¿Cuántos?» asks for a number."],
  ["How do you write a question in Spanish?", "with ¿ at the start and ? at the end", ["with ? at the start and at the end", "with ¿ at the end only", "with ! at the start"], "Spanish questions open with an upside-down question mark: «¿Cómo estás?»", undefined, "en"],
  ["What is the difference between «¿Por qué?» and «porque»?", "«¿Por qué?» asks why; «porque» means because.", ["They mean the same thing.", "«¿Por qué?» means because; «porque» asks why.", "«porque» asks where."], "Two words and an accent ask the question; one word gives the reason.", undefined, "en"],
];

// ---------- La comida ----------

const FOOD: Word[] = [
  ["🍎", "la manzana", "apple"],
  ["🍞", "el pan", "bread"],
  ["🥛", "la leche", "milk"],
  ["🧀", "el queso", "cheese"],
  ["🍚", "el arroz", "rice"],
  ["🥚", "el huevo", "egg"],
  ["💧", "el agua", "water"],
  ["🍗", "el pollo", "chicken"],
  ["🥕", "la zanahoria", "carrot"],
  ["🍌", "el plátano", "banana"],
];

const MEALS: EsItem[] = [
  ...wordItems(FOOD),
  ["What does «el desayuno» mean?", "breakfast", ["lunch", "dinner", "snack"], "It is the first meal of the day."],
  ["What does «el almuerzo» mean?", "lunch", ["breakfast", "dinner", "dessert"], "It is the meal in the middle of the day."],
  ["What does «la cena» mean?", "dinner", ["breakfast", "lunch", "snack"], "It is the meal in the evening."],
  ["How do you say “I'm hungry”?", "Tengo hambre.", ["Estoy hambre.", "Soy hambre.", "Tengo sed."], "In Spanish you “have hunger”: «Tengo hambre»."],
  ["How do you say “I'm thirsty”?", "Tengo sed.", ["Estoy sed.", "Tengo hambre.", "Soy sed."], "In Spanish you “have thirst”: «Tengo sed»."],
  ["How do you politely ask for water?", "Quisiera agua, por favor.", ["Tengo agua.", "Me llamo agua.", "No me gusta el agua."], "«Quisiera» is a polite “I would like”."],
  ["What does «¡Buen provecho!» mean?", "Enjoy your meal!", ["Good morning!", "I'm full!", "See you later!"], "People say it to someone who is about to eat."],
  ["What does «Está delicioso» mean?", "It's delicious.", ["It's cold.", "It's too much.", "It's not ready."], "«delicioso» sounds like delicious."],
];

// ---------- Pasatiempos ----------

const HOBBIES: Word[] = [
  ["🏊", "nadar", "to swim"],
  ["📖", "leer", "to read"],
  ["💃", "bailar", "to dance"],
  ["🎤", "cantar", "to sing"],
  ["🎨", "pintar", "to paint"],
  ["🏃", "correr", "to run"],
  ["⚽", "jugar al fútbol", "to play soccer"],
  ["🚲", "montar en bicicleta", "to ride a bike"],
  ["🍳", "cocinar", "to cook"],
  ["🎸", "tocar la guitarra", "to play the guitar"],
];

const FREE_TIME: EsItem[] = [
  ...wordItems(HOBBIES),
  ["How do you say “I like to read”?", "Me gusta leer.", ["Me gusta leo.", "Me gustan leer.", "Yo gusta leer."], "After «Me gusta», use the verb as it is: «leer»."],
  ["How do you say “I like to swim”?", "Me gusta nadar.", ["Me gusta nado.", "Me gustan nadar.", "Yo gusta nadar."], "After «Me gusta», use the verb as it is: «nadar»."],
  ["How do you say “I don't like to run”?", "No me gusta correr.", ["Me no gusta correr.", "No me gusta corro.", "No gusta me correr."], "Put «No» first: «No me gusta…»."],
  ["What does «En mi tiempo libre, dibujo» mean?", "In my free time, I draw.", ["I don't have free time.", "I draw every morning.", "My free time is short."], "«tiempo libre» is free time; «dibujo» is I draw."],
  ["How do you ask “What do you like to do?”", "¿Qué te gusta hacer?", ["¿Qué me gusta hacer?", "¿Dónde te gusta?", "¿Qué haces mañana?"], "«hacer» means to do."],
];

// ---------- Emociones ----------

const FEELINGS: EsItem[] = [
  ["Look at the face. Which sentence fits?", "Estoy feliz.", ["Estoy triste.", "Estoy enojado.", "Estoy nervioso."], "A big smile is «feliz».", "😀"],
  ["Look at the face. Which sentence fits?", "Estoy triste.", ["Estoy feliz.", "Estoy enojado.", "Estoy aburrido."], "Tears are «triste».", "😢"],
  ["Look at the face. Which sentence fits?", "Estoy enojado.", ["Estoy feliz.", "Estoy triste.", "Estoy aburrido."], "An angry face is «enojado».", "😠"],
  ["Look at the face. Which sentence fits?", "Estoy nervioso.", ["Estoy feliz.", "Estoy enojado.", "Estoy aburrido."], "A worried face is «nervioso».", "😬"],
  ["Look at the face. Which sentence fits?", "Estoy enfermo.", ["Estoy feliz.", "Estoy enojado.", "Estoy nervioso."], "Feeling unwell is «enfermo».", "🤒"],
  ["What does «Estoy cansado» mean?", "I'm tired.", ["I'm bored.", "I'm angry.", "I'm happy."], "«cansado» is how you feel after a long day."],
  ["What does «Estoy aburrido» mean?", "I'm bored.", ["I'm tired.", "I'm scared.", "I'm sick."], "«aburrido» is how you feel with nothing to do."],
  ["What does «Estoy triste» mean?", "I'm sad.", ["I'm happy.", "I'm angry.", "I'm tired."], "«triste» is the opposite of «feliz»."],
  ["What does «Estoy enojado» mean?", "I'm angry.", ["I'm sad.", "I'm bored.", "I'm sick."], "«enojado» is how you feel when something is unfair."],
  ["What does «Estoy enfermo» mean?", "I'm sick.", ["I'm tired.", "I'm bored.", "I'm hungry."], "«enfermo» is when you stay home from school."],
  ["How do you say “I'm cold”?", "Tengo frío.", ["Estoy frío.", "Tengo calor.", "Soy frío."], "In Spanish you “have cold”: «Tengo frío»."],
  ["How do you say “I'm hot”?", "Tengo calor.", ["Estoy calor.", "Tengo frío.", "Soy calor."], "In Spanish you “have heat”: «Tengo calor»."],
  ["How do you say “I'm scared”?", "Tengo miedo.", ["Estoy miedo.", "Tengo frío.", "Soy miedo."], "In Spanish you “have fear”: «Tengo miedo»."],
  ["How do you say “I'm sleepy”?", "Tengo sueño.", ["Estoy sueño.", "Tengo hambre.", "Soy sueño."], "In Spanish you “have sleep”: «Tengo sueño»."],
  ["What does «Me duele la cabeza» mean?", "My head hurts.", ["My stomach hurts.", "My throat hurts.", "My foot hurts."], "«la cabeza» is your head."],
  ["What does «Me duele el estómago» mean?", "My stomach hurts.", ["My head hurts.", "My throat hurts.", "My arm hurts."], "«el estómago» sounds like stomach."],
  ["What does «Me duele la garganta» mean?", "My throat hurts.", ["My head hurts.", "My stomach hurts.", "My leg hurts."], "«la garganta» is your throat."],
  ["How do you say “My foot hurts”?", "Me duele el pie.", ["Me duele la mano.", "Tengo el pie.", "Estoy el pie."], "«Me duele» + the body part."],
  ["Pick the word that fits: «Ella está ___.» (She is tired.)", "cansada", ["cansado", "cansados", "cansadas"], "She, one girl: end in «a»."],
  ["Pick the word that fits: «Ellos están ___.» (They are happy.)", "contentos", ["contento", "contenta", "contentas"], "They, a group: end in «os»."],
  ["Pick the word that fits: «Yo ___ nervioso.»", "estoy", ["está", "están", "estás"], "With «yo», «estar» is «estoy»."],
  ["Pick the word that fits: «¿Tú ___ bien?»", "estás", ["estoy", "están", "está"], "With «tú», «estar» is «estás»."],
  ["Someone asks «¿Qué te pasa?» You have a headache. Which answer fits?", "Me duele la cabeza.", ["Estoy muy feliz.", "Tengo doce años.", "Me gusta leer."], "«¿Qué te pasa?» asks what's wrong."],
  ["What does «¿Cómo te sientes?» mean?", "How do you feel?", ["Where do you sit?", "What is your name?", "How old are you?"], "«sentirse» means to feel."],
];

// ---------- Las personas ----------

const TRAITS: [es: string, en: string][] = [
  ["alto", "tall"],
  ["bajo", "short"],
  ["simpático", "friendly"],
  ["divertido", "funny"],
  ["inteligente", "smart"],
  ["tímido", "shy"],
  ["fuerte", "strong"],
  ["trabajador", "hard-working"],
];

const PEOPLE: EsItem[] = [
  ...TRAITS.map(([es, en], i): EsItem => [`What does «${es}» mean?`, en, TRAITS.filter((_, j) => j !== i).map((t) => t[1]), "Think of a word that sounds like it, or the opposite you know."]),
  ...TRAITS.map(([es, en], i): EsItem => [`How do you say “${en}” (about a boy)?`, es, TRAITS.filter((_, j) => j !== i).map((t) => t[0]), "Describing words for a boy often end in «o»."]),
  ["Pick the word that fits: «Mi hermana es ___.» (tall)", "alta", ["alto", "altos", "altas"], "One girl: end in «a»."],
  ["Pick the word that fits: «Mis primos son ___.» (funny)", "divertidos", ["divertido", "divertida", "divertidas"], "A group: end in «os»."],
  ["Pick the word that fits: «Las niñas son ___.» (shy)", "tímidas", ["tímido", "tímida", "tímidos"], "A group of girls: end in «as»."],
  ["Pick the word that fits: «Yo ___ alto.»", "soy", ["es", "eres", "somos"], "With «yo», «ser» is «soy»."],
  ["Pick the word that fits: «Ella ___ simpática.»", "es", ["soy", "son", "somos"], "With «ella», «ser» is «es»."],
  ["Pick the word that fits: «Nosotros ___ amigos.»", "somos", ["son", "soy", "es"], "With «nosotros», «ser» is «somos»."],
  ["Pick the word that fits: «Ellos ___ divertidos.»", "son", ["somos", "es", "eres"], "With «ellos», «ser» is «son»."],
  ["Pick the word that fits: «Tú ___ inteligente.»", "eres", ["es", "soy", "son"], "With «tú», «ser» is «eres»."],
  ["How do you say “He has short hair”?", "Tiene el pelo corto.", ["Es el pelo corto.", "Tiene el pelo largo.", "Tengo el pelo corto."], "«tiene» is he has; «corto» is short."],
  ["What does «Ella tiene los ojos verdes» mean?", "She has green eyes.", ["She has green hair.", "She has blue eyes.", "She likes green."], "«los ojos» are eyes; «verdes» is green."],
];

export const course: Course = {
  grade: "6",
  subject: "spanish",
  ...spanishBigIdeas("6", [
    "Listening and viewing with intent helps us understand a message.",
    "We can explore our identity through a new language.",
    "Reciprocal communication is possible using high-frequency words and patterns.",
    "Stories help us to acquire language and understand the world around us.",
    "Learning about language from diverse communities helps us develop cultural awareness.",
  ]),
  units: [
    {
      id: "preguntas",
      title: "Asking questions",
      emoji: "❓",
      blurb: "¿Qué? ¿Dónde? ¿Por qué?",
      parentNote: "Question words, the upside-down question mark, and choosing an answer that fits the question.",
      ...spanishStandards("6", { wrs: ["Interpersonal Communication", "Interpretive Communication"], text: "asking and answering questions", bc: "questions", ab: ["A-1", "LC-1"] }),
      generate: (o) => esQuestions(QUESTIONS, o),
    },
    {
      id: "comida",
      title: "Food and meals",
      emoji: "🍎",
      blurb: "Tengo hambre",
      parentNote: "Everyday foods and drinks, the three meals of the day, and polite ways to ask for something at the table.",
      ...spanishStandards("6", { wrs: ["Interpersonal Communication", "Relating Cultural Practices to Perspectives"], text: "foods, meals and asking politely", bc: "opinions and preferences", ab: ["A-3", "LC-1"] }),
      generate: (o) => esQuestions(MEALS, o),
    },
    {
      id: "pasatiempos",
      title: "Hobbies",
      emoji: "🎨",
      blurb: "Me gusta nadar",
      parentNote: "Activities children enjoy, and saying what you like to do in your free time.",
      ...spanishStandards("6", { wrs: ["Presentational Communication", "Interpersonal Communication"], text: "hobbies and what you like to do", bc: "hobbies and topics of interest", ab: ["A-2", "LC-1"] }),
      generate: (o) => esQuestions(FREE_TIME, o),
    },
    {
      id: "emociones",
      title: "Feelings and health",
      emoji: "😊",
      blurb: "Estoy feliz, tengo frío",
      parentNote: "Saying how you feel with estar (estoy cansado) and tener (tengo frío), and telling someone what hurts.",
      ...spanishStandards("6", { wrs: ["Interpersonal Communication", "Language Comparisons"], text: "feelings and how you feel physically", bc: "common emotions and states of physical health", ab: ["A-2", "LC-1"] }),
      generate: (o) => esQuestions(FEELINGS, o),
    },
    {
      id: "personas",
      title: "Describing people",
      emoji: "🧑‍🤝‍🧑",
      blurb: "Es alto y simpático",
      parentNote: "Describing what people are like with ser and describing words that match: alto, alta, altos, altas.",
      ...spanishStandards("6", { wrs: ["Presentational Communication", "Interpretive Communication"], text: "describing other people", bc: "descriptions of others", ab: ["A-1", "LC-1"] }),
      generate: (o) => esQuestions(PEOPLE, o),
    },
  ],
};
