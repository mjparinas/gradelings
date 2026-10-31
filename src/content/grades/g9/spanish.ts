import { esQuestions, mixed, spanishBigIdeas, spanishStandards, type EsItem, type Opt } from "../../spanish";
import type { Course, Visual } from "../../types";

// Spanish, Grade 9: the past tense, ser and estar, telling events in order, jobs and reading short stories. Prompts are
// English; the Spanish in « » is what children learn (see ../../spanish).

// ---------- El pretérito ----------

const VERBS: [verb: string, en: string][] = [
  ["hablar", "talked"],
  ["bailar", "danced"],
  ["estudiar", "studied"],
  ["cocinar", "cooked"],
  ["caminar", "walked"],
  ["comer", "ate"],
  ["beber", "drank"],
  ["aprender", "learned"],
  ["vivir", "lived"],
  ["escribir", "wrote"],
];

const AR_PAST = ["é", "aste", "ó", "amos", "aron"];
const ER_PAST = ["í", "iste", "ió", "imos", "ieron"];
const WHO: [es: string, en: string][] = [
  ["yo", "I"],
  ["tú", "You"],
  ["ella", "She"],
  ["nosotros", "We"],
  ["ellos", "They"],
];

const PAST: EsItem[] = [
  ...VERBS.flatMap(([verb, en]): EsItem[] => {
    const stem = verb.slice(0, -2);
    const forms = (verb.endsWith("ar") ? AR_PAST : ER_PAST).map((e) => stem + e);
    const presentYo = `${stem}o`;
    return WHO.flatMap(([who, whoEn], i): EsItem[] => {
      const wrong = [...forms.filter((_, j) => j !== i), presentYo].filter((f) => f !== forms[i]);
      return [
        [`Pick the past tense: «Ayer ${who} ___ (${verb})»`, forms[i], wrong, `«Ayer» means yesterday, so use the past tense. Endings: ${verb.endsWith("ar") ? "«-é, -aste, -ó, -amos, -aron»" : "«-í, -iste, -ió, -imos, -ieron»"}.`],
        [`What does «Ayer ${who} ${forms[i]}» mean?`, `Yesterday ${whoEn === "I" ? "I" : whoEn.toLowerCase()} ${en}.`, WHO.filter((_, j) => j !== i).map(([, w]) => `Yesterday ${w === "I" ? "I" : w.toLowerCase()} ${en}.`), "Look at the ending to see who did it."],
      ];
    });
  }),
  ["What does «ayer» mean?", "yesterday", ["tomorrow", "today", "last year"], "«ayer» is the day before today."],
  ["What does «anoche» mean?", "last night", ["tonight", "tomorrow night", "every night"], "«noche» is night; «anoche» is the night that just passed."],
  ["What does «la semana pasada» mean?", "last week", ["next week", "this week", "every week"], "«pasada» means past."],
  ["Which sentence is about the past?", "Comí pizza ayer.", ["Como pizza todos los días.", "Voy a comer pizza.", "Me gusta la pizza."], "Look for a past ending and a past time word, like «ayer»."],
];

// ---------- Ser y estar ----------

const SER_ESTAR: EsItem[] = [
  ["Pick the verb that fits: «Mi madre ___ doctora.»", "es", ["está", "son", "estás"], "A job uses «ser»."],
  ["Pick the verb that fits: «Yo ___ de Colombia.»", "soy", ["estoy", "es", "eres"], "Where you are from uses «ser»."],
  ["Pick the verb that fits: «El libro ___ en la mesa.»", "está", ["es", "son", "estoy"], "Where something is uses «estar»."],
  ["Pick the verb that fits: «Nosotros ___ cansados.»", "estamos", ["somos", "están", "es"], "How someone feels uses «estar»."],
  ["Pick the verb that fits: «Hoy ___ lunes.»", "es", ["está", "están", "soy"], "Days and dates use «ser»."],
  ["Pick the verb that fits: «¿Dónde ___ tus llaves?»", "están", ["son", "es", "estamos"], "Where things are uses «estar»."],
  ["Pick the verb that fits: «Ellos ___ muy altos.»", "son", ["están", "somos", "es"], "What someone is like uses «ser»."],
  ["Pick the verb that fits: «Tú ___ enfermo hoy.»", "estás", ["eres", "está", "son"], "How someone feels today uses «estar»."],
  ["Pick the verb that fits: «Mi abuelo ___ simpático.»", "es", ["está", "somos", "estás"], "Personality uses «ser»."],
  ["Pick the verb that fits: «Lima ___ en Perú.»", "está", ["es", "son", "estamos"], "Where a place is uses «estar»."],
  ["Pick the verb that fits: «___ las cuatro.»", "Son", ["Están", "Es", "Estamos"], "Time uses «ser»: «Son las cuatro»."],
  ["Pick the verb that fits: «Las chicas ___ contentas.»", "están", ["son", "está", "somos"], "How someone feels uses «estar»."],
  ["Pick the verb that fits: «Mi hermano ___ estudiante.»", "es", ["está", "son", "estoy"], "What someone does uses «ser»."],
  ["Pick the verb that fits: «Yo ___ nervioso antes del examen.»", "estoy", ["soy", "está", "estamos"], "How you feel right now uses «estar»."],
  ["Pick the verb that fits: «La ventana ___ abierta.»", "está", ["es", "son", "estoy"], "A condition that can change uses «estar»."],
  ["Pick the verb that fits: «Ustedes ___ en la clase de español.»", "están", ["son", "está", "estamos"], "Where people are uses «estar»."],
  ["Pick the verb that fits: «Nosotros ___ amigos.»", "somos", ["estamos", "son", "es"], "Who people are to each other uses «ser»."],
  ["Pick the verb that fits: «La camiseta ___ de algodón.»", "es", ["está", "son", "estás"], "What something is made of uses «ser»."],
  ["Pick the verb that fits: «Tú ___ muy inteligente.»", "eres", ["estás", "es", "soy"], "What someone is like uses «ser»."],
  ["Pick the verb that fits: «Mis padres ___ en el trabajo.»", "están", ["son", "está", "somos"], "Where people are uses «estar»."],
  ["Pick the verb that fits: «Mi casa ___ grande.»", "es", ["está", "son", "estamos"], "What something is like uses «ser»."],
  ["Pick the verb that fits: «Yo ___ en la biblioteca.»", "estoy", ["soy", "están", "es"], "Where you are uses «estar»."],
  ["We use «estar» for…", "where something is and how someone feels", ["where someone is from", "jobs", "the time and the date"], "Think: location and feelings use «estar».", undefined, "en"],
  ["We use «ser» for…", "what someone is like, jobs, where someone is from and the time", ["how someone feels right now", "where something is", "a condition that will change"], "Think: description, origin, jobs and time use «ser».", undefined, "en"],
  ["What does «Estoy en casa» mean?", "I'm at home.", ["I am a house.", "I'm going home.", "My house is big."], "«estar» + a place says where you are."],
];

// ---------- En orden ----------

const SEQUENCES: [string, string, Opt[]][] = [
  ["Put the steps for making a sandwich in order.", "Look for «Primero», «Luego», «Después» and «Finalmente».", ["Primero, saco el pan.", "Luego, pongo el queso.", "Después, cierro el sándwich.", "Finalmente, me lo como."]],
  ["Put Ana's morning in order.", "Look for «Primero», «Luego», «Después» and «Por último».", ["Primero, Ana se despierta.", "Luego, se ducha.", "Después, desayuna.", "Por último, va a la escuela."]],
  ["Put the story in order.", "Look for the order words at the start of each sentence.", ["Primero, Leo plantó una semilla.", "Luego, la regó todos los días.", "Después de un mes, salió una flor.", "Al final, Leo le dio la flor a su abuela."]],
  ["Put the steps for washing your hands in order.", "Look for «Primero», «Luego», «Después» and «Finalmente».", ["Primero, abro el agua.", "Luego, uso jabón.", "Después, me enjuago las manos.", "Finalmente, me seco las manos."]],
  ["Put the trip in order.", "Look for the order words at the start of each sentence.", ["Primero, hicimos las maletas.", "Luego, fuimos al aeropuerto.", "Después, subimos al avión.", "Al final, llegamos a Lima."]],
  ["Put the steps for a birthday party in order.", "Look for «Primero», «Luego», «Después» and «Finalmente».", ["Primero, decoramos la casa.", "Luego, llegaron los invitados.", "Después, cantamos «Feliz cumpleaños».", "Finalmente, comimos el pastel."]],
];

const ORDER_WORDS: EsItem[] = [
  ["What does «primero» mean?", "first", ["finally", "then", "before"], "«primero» sounds like primary: first."],
  ["What does «luego» mean?", "then", ["first", "finally", "never"], "«luego» moves the story on to the next step."],
  ["What does «finalmente» mean?", "finally", ["first", "then", "suddenly"], "«finalmente» sounds like finally."],
  ["What does «de repente» mean?", "suddenly", ["finally", "first", "slowly"], "Something happens all at once: «de repente»."],
  ["What does «antes de comer» mean?", "before eating", ["after eating", "while eating", "instead of eating"], "«antes» means before."],
  ["What does «después de la escuela» mean?", "after school", ["before school", "at school", "during school"], "«después» means after."],
  ["What does «mientras» mean?", "while", ["after", "before", "because"], "«mientras» joins two things happening at the same time."],
  ["Which word starts a list of steps?", "Primero", ["Finalmente", "Por último", "Al final"], "The first step starts with «Primero»."],
  ["Which word introduces the last step?", "Finalmente", ["Primero", "Luego", "Antes"], "The last step starts with «Finalmente», «Por último» or «Al final»."],
  ["Pick the word that fits: «___, abro la puerta. Luego, entro en la casa.»", "Primero", ["Finalmente", "Por último", "Al final"], "Something comes before «Luego»: «Primero»."],
  ["Pick the word that fits: «Estudié para el examen y ___ saqué una buena nota.»", "después", ["antes", "primero", "mientras"], "The good grade came after studying."],
  ["Pick the word that fits: «Me lavo las manos ___ de comer.»", "antes", ["después", "finalmente", "mientras"], "You wash your hands before you eat."],
  ["How do you say “At the end, we went home”?", "Al final, volvimos a casa.", ["Al principio, volvimos a casa.", "Primero, volvimos a casa.", "Al final, vamos a casa mañana."], "«Al final» means at the end; «volvimos» is we went back."],
  ["How do you say “Suddenly, it started to rain”?", "De repente, empezó a llover.", ["Finalmente, empezó a llover.", "De repente, va a llover.", "Primero, empezó a nevar."], "«De repente» means suddenly; «llover» is to rain."],
  ["What does «Al principio» mean?", "at the beginning", ["at the end", "suddenly", "then"], "«principio» means beginning."],
  ["What does «por último» mean?", "lastly", ["firstly", "suddenly", "meanwhile"], "It introduces the last thing in a list."],
  ["Which sentence tells the first step?", "Primero, lavo las fresas.", ["Finalmente, como las fresas.", "Después, corto las fresas.", "Luego, pongo las fresas en un plato."], "Look for «Primero»."],
  ["Which sentence tells the last step?", "Por último, limpio la cocina.", ["Primero, saco los huevos.", "Luego, cocino los huevos.", "Después, pongo la mesa."], "Look for «Por último»."],
];

// ---------- Las profesiones ----------

const JOBS: [es: string, en: string][] = [
  ["el bombero", "firefighter"],
  ["la enfermera", "nurse"],
  ["el maestro", "teacher"],
  ["la ingeniera", "engineer"],
  ["el abogado", "lawyer"],
  ["la científica", "scientist"],
  ["el veterinario", "veterinarian"],
  ["la periodista", "journalist"],
  ["el carpintero", "carpenter"],
  ["la agricultora", "farmer"],
  ["el piloto", "pilot"],
  ["la cocinera", "cook"],
];

const CAREERS: EsItem[] = [
  ...JOBS.map(([es, en], i): EsItem => [`What does «${es}» mean?`, en, JOBS.filter((_, j) => j !== i).map((x) => x[1]), "Many job words sound like English: «piloto», «veterinario»."]),
  ["Who puts out fires?", "el bombero", ["el abogado", "la periodista", "el maestro"], "«el bombero» works at the fire station."],
  ["Who takes care of sick animals?", "el veterinario", ["el carpintero", "la ingeniera", "la periodista"], "«veterinario» sounds like veterinarian."],
  ["Who flies a plane?", "el piloto", ["la agricultora", "el maestro", "la cocinera"], "«el piloto» works in the sky."],
  ["Who grows food on a farm?", "la agricultora", ["la científica", "el piloto", "el abogado"], "«agricultura» means farming."],
  ["Who builds things out of wood?", "el carpintero", ["la periodista", "el veterinario", "la enfermera"], "«el carpintero» works with wood."],
  ["Who writes the news?", "la periodista", ["el bombero", "la agricultora", "el piloto"], "«el periódico» is a newspaper."],
  ["How do you say “She is a nurse”?", "Ella es enfermera.", ["Ella está enfermera.", "Ella es enfermero.", "Ella es enfermeras."], "Jobs use «ser», and the job word matches the person."],
  ["How do you say “He is a teacher”?", "Él es maestro.", ["Él está maestro.", "Él es maestra.", "Él es maestros."], "Jobs use «ser», and the job word matches the person."],
  ["What does «Quiero ser científica» mean?", "I want to be a scientist.", ["I am a scientist.", "I like science.", "I want to see a scientist."], "«Quiero ser…» means I want to be…"],
  ["What does «Me gustaría ser piloto» mean?", "I would like to be a pilot.", ["I am a pilot.", "I don't want to be a pilot.", "My friend is a pilot."], "«Me gustaría» means I would like."],
  ["Which sentence gives a reason?", "Quiero ser veterinaria porque me gustan los animales.", ["Quiero ser veterinaria.", "Me gustan los animales.", "Mi tía es veterinaria."], "A reason starts with «porque»."],
  ["What does «el trabajo» mean?", "the job", ["the school", "the money", "the office"], "«trabajar» is to work."],
];

// ---------- Cuentos ----------

const story = (title: string, text: string): Visual => ({ type: "passage", title, paragraphs: [text] });

const PERRO = story("El perro perdido", "Era un sábado por la mañana. Camila fue al parque con su perro, Max. De repente, Max vio un gato y corrió detrás de él. Camila buscó a Max por todo el parque. Estaba muy preocupada. Finalmente, encontró a Max debajo de un árbol, durmiendo. Camila se rió y volvieron a casa.");
const TORMENTA = story("La tormenta", "Diego y su hermana Elena estaban en la casa de su abuelo en el campo. Por la tarde, empezó a llover mucho y se fue la luz. Elena tenía miedo. Diego encontró una linterna y el abuelo contó historias de cuando era niño. Al final, todos cantaron canciones hasta que volvió la luz.");
const CONCURSO = story("El concurso", "Sara quería ganar el concurso de ciencias de su escuela. Trabajó dos semanas en un proyecto sobre las abejas. El día del concurso estaba nerviosa, pero explicó su proyecto muy bien. No ganó el primer premio, pero ganó el premio del público. Sara estaba muy orgullosa.");
const MERCADO = story("Un día en el mercado", "Los domingos, Pablo va al mercado con su mamá. Compran frutas, verduras y pan. A Pablo le gustan mucho los mangos. Este domingo, la vendedora le regaló un mango a Pablo. Él le dijo: «¡Muchas gracias!»");

const STORIES: EsItem[] = [
  ["When does the story happen?", "on a Saturday morning", ["on a Sunday night", "on a Monday afternoon", "on a Friday morning"], "Look for «sábado» and «mañana».", PERRO, "en"],
  ["Why did Max run?", "He saw a cat.", ["He was hungry.", "He heard a car.", "He wanted to sleep."], "«vio un gato» means he saw a cat.", PERRO, "en"],
  ["How did Camila feel when Max was lost?", "worried", ["happy", "bored", "tired"], "«preocupada» means worried.", PERRO, "en"],
  ["Where was Max at the end?", "under a tree, sleeping", ["at home, eating", "in the water, swimming", "next to the cat"], "«debajo de un árbol, durmiendo».", PERRO, "en"],
  ["What is the problem in the story?", "Max gets lost.", ["Camila is sick.", "It starts to rain.", "The park is closed."], "The problem is what goes wrong.", PERRO, "en"],
  ["Where were Diego and Elena?", "at their grandfather's house in the country", ["at school", "at the beach", "at their aunt's house in the city"], "«la casa de su abuelo en el campo».", TORMENTA, "en"],
  ["What happened in the afternoon?", "It rained a lot and the power went out.", ["It snowed and school was closed.", "Their parents arrived.", "They went to the park."], "«empezó a llover mucho y se fue la luz».", TORMENTA, "en"],
  ["Who was scared?", "Elena", ["Diego", "the grandfather", "nobody"], "«Elena tenía miedo».", TORMENTA, "en"],
  ["What did Diego find?", "a flashlight", ["a book", "a candle", "a phone"], "«una linterna» is a flashlight.", TORMENTA, "en"],
  ["How does the story end?", "Everyone sang songs until the power came back.", ["Everyone went to sleep.", "They drove home.", "Elena read a story."], "Look for «Al final».", TORMENTA, "en"],
  ["What was Sara's project about?", "bees", ["plants", "the weather", "dogs"], "«las abejas» are bees.", CONCURSO, "en"],
  ["How long did Sara work on her project?", "two weeks", ["two days", "two months", "one week"], "«dos semanas».", CONCURSO, "en"],
  ["Did Sara win first prize?", "No, but she won the audience prize.", ["Yes, she won first prize.", "No, she won nothing.", "Yes, and the audience prize too."], "«No ganó el primer premio, pero ganó el premio del público».", CONCURSO, "en"],
  ["How did Sara feel at the end?", "proud", ["sad", "angry", "bored"], "«orgullosa» means proud.", CONCURSO, "en"],
  ["How did Sara feel on the day of the contest?", "nervous", ["bored", "sleepy", "angry"], "«estaba nerviosa».", CONCURSO, "en"],
  ["When does Pablo go to the market?", "on Sundays", ["on Saturdays", "every day", "on Mondays"], "«Los domingos».", MERCADO, "en"],
  ["Which fruit does Pablo like?", "mangoes", ["apples", "bananas", "strawberries"], "«los mangos».", MERCADO, "en"],
  ["What did the seller do?", "She gave Pablo a mango.", ["She sold Pablo bread.", "She asked Pablo for help.", "She closed her stall."], "«le regaló un mango» means she gave him a mango as a gift.", MERCADO, "en"],
  ["What did Pablo say to the seller?", "¡Muchas gracias!", ["¡Buenos días!", "¡Hasta luego!", "¡Lo siento!"], "He thanked her.", MERCADO],
  ["Who goes to the market with Pablo?", "his mom", ["his dad", "his sister", "his friend"], "«con su mamá».", MERCADO, "en"],
  ["In a story, what is «el personaje»?", "a character", ["the setting", "the title", "the ending"], "«el personaje» sounds like personality: a person in the story.", undefined, "en"],
  ["In a story, what is «el título»?", "the title", ["the ending", "a character", "the problem"], "«título» sounds like title.", undefined, "en"],
  ["In a story, what is «el final»?", "the ending", ["the beginning", "the title", "a character"], "«final» means end.", undefined, "en"],
  ["In a story, what is «el lugar»?", "the place where it happens", ["the person it is about", "the last line", "the author"], "«el lugar» is the place.", undefined, "en"],
  ["In a story, what is «el problema»?", "what goes wrong", ["the happy ending", "the title", "the author's name"], "«problema» sounds like problem.", undefined, "en"],
];

export const course: Course = {
  grade: "9",
  subject: "spanish",
  ...spanishBigIdeas("9", [
    "Listening and viewing with intent supports our acquisition and understanding of a new language.",
    "Acquiring a new language allows us to explore our identity and culture from a new perspective.",
    "Conversing about things we care about can motivate our learning of a new language.",
    "We can share our experiences and perspectives through stories.",
    "Creative works allow us to experience culture and appreciate cultural diversity.",
  ]),
  units: [
    {
      id: "preterito",
      title: "The past tense",
      emoji: "⏪",
      blurb: "Ayer comí, hablé, viví",
      parentNote: "The preterite, the past tense for finished actions: hablé, comí, viví, and time words like ayer and la semana pasada.",
      ...spanishStandards("9", { wrs: ["Presentational Communication", "Language Comparisons"], text: "the past tense of regular verbs", bc: "past, present, and future time frames", ab: ["LC-1"], mb: ["2.1.4"] }),
      generate: (o) => esQuestions(PAST, o),
    },
    {
      id: "ser-y-estar",
      title: "Ser and estar",
      emoji: "⚖️",
      blurb: "Soy de Perú, estoy en casa",
      parentNote: "The two verbs for “to be”: ser for what something is like, jobs, origin and time, and estar for where things are and how people feel.",
      ...spanishStandards("9", { wrs: ["Language Comparisons", "Presentational Communication"], text: "choosing between ser and estar", bc: "descriptions of people, objects, and locations", ab: ["LC-1"], mb: ["2.1.4"] }),
      generate: (o) => esQuestions(SER_ESTAR, o),
    },
    {
      id: "en-orden",
      title: "In order",
      emoji: "🔢",
      blurb: "Primero, luego, finalmente",
      parentNote: "Words that put events in order (primero, luego, después, finalmente) and putting the steps of a story or a recipe in order.",
      ...spanishStandards("9", { wrs: ["Presentational Communication", "Interpretive Communication"], text: "telling events in order", bc: "sequence of events", ab: ["LC-4"], mb: ["2.5.1"] }),
      generate: (o) => mixed(ORDER_WORDS, SEQUENCES, o),
    },
    {
      id: "profesiones",
      title: "Jobs",
      emoji: "👩‍🚒",
      blurb: "Quiero ser veterinaria",
      parentNote: "Names of jobs, what people do in them, and saying what you would like to be and why.",
      ...spanishStandards("9", { wrs: ["Presentational Communication", "Lifelong Learning"], text: "jobs and future plans", bc: "personal interests, needs, and opinions", ab: ["GC-3", "LC-1"], mb: ["1.1.1", "2.1.3"] }),
      generate: (o) => esQuestions(CAREERS, o),
    },
    {
      id: "cuentos",
      title: "Short stories",
      emoji: "📖",
      blurb: "El perro perdido y más",
      parentNote: "Reading short original stories in Spanish and answering questions about what happened, and the words for the parts of a story.",
      ...spanishStandards("9", { wrs: ["Interpretive Communication", "Acquiring Information and Diverse Perspectives"], text: "reading short stories", bc: "common elements of stories", ab: ["A-6", "LC-2"], mb: ["1.5.3", "2.3.1"] }),
      generate: (o) => esQuestions(STORIES, o),
    },
  ],
};
