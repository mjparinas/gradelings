import { esQuestions, spanishBigIdeas, spanishStandards, wordItems, type EsItem, type Word } from "../../spanish";
import { NUMBERS } from "../../spanishNumbers";
import type { Course, Visual } from "../../types";

// Spanish, Grade 7: -ar verbs, describing people, comparisons, Spanish-speaking countries and directions. Prompts are
// English; the Spanish in « » is what children learn (see ../../spanish).

// ---------- Verbos en -ar ----------

const AR: [verb: string, en: string][] = [
  ["hablar", "speak"],
  ["estudiar", "study"],
  ["caminar", "walk"],
  ["bailar", "dance"],
  ["cantar", "sing"],
  ["trabajar", "work"],
  ["escuchar", "listen"],
  ["nadar", "swim"],
  ["cocinar", "cook"],
  ["dibujar", "draw"],
];

const PERSONS: [pronoun: string, ending: string, en: string][] = [
  ["Yo", "o", "I"],
  ["Tú", "as", "You"],
  ["Ella", "a", "She"],
  ["Nosotros", "amos", "We"],
  ["Ellos", "an", "They"],
];

const ENDINGS = ["o", "as", "a", "amos", "an"];

/** The English verb after "she": "speaks", "studies". */
const third = (en: string) => (en.endsWith("y") ? `${en.slice(0, -1)}ies` : `${en}s`);

const VERB_ITEMS: EsItem[] = AR.flatMap(([verb, en]): EsItem[] => {
  const stem = verb.slice(0, -2);
  const say = (who: string) => `${who} ${who === "She" ? third(en) : en}.`;
  return PERSONS.flatMap(([pronoun, ending, who]): EsItem[] => [
    [`Pick the right form: «${pronoun} ___ (${verb})»`, stem + ending, ENDINGS.filter((x) => x !== ending).map((x) => stem + x), `Drop «ar» and add the ending for «${pronoun.toLowerCase()}»: «-${ending}».`],
    [`What does «${pronoun} ${stem + ending}» mean?`, say(who), PERSONS.filter((p) => p[0] !== pronoun).map(([, , w]) => say(w)), `«${pronoun}» means “${who === "I" ? who : who.toLowerCase()}”.`],
  ]);
});

// ---------- Describir personas ----------

const passage = (title: string, paragraphs: string[]): Visual => ({ type: "passage", title, paragraphs });

const LUCIA = passage("Mi mejor amiga", ["Mi mejor amiga se llama Lucía. Tiene trece años. Es alta y tiene el pelo largo y negro. Es muy simpática y un poco tímida. Le gusta pintar y escuchar música."]);
const TOMAS = passage("Mi primo", ["Mi primo Tomás es bajo y fuerte. Tiene el pelo corto y rubio y los ojos azules. Es muy divertido. Le gusta jugar al fútbol con sus amigos."]);
const ABUELA = passage("Mi abuela", ["Mi abuela se llama Rosa. Tiene setenta años. Tiene el pelo blanco y lleva gafas. Es muy trabajadora y cocina muy bien."]);
const ELENA = passage("Mi profesora", ["Mi profesora de música se llama Elena. Es joven y tiene el pelo rizado y castaño. Es paciente y muy alegre. Toca la guitarra y el piano."]);
const MARCO = passage("Mi vecino", ["Mi vecino Marco es pelirrojo y tiene pecas. Es inteligente y le gusta leer libros de ciencia. Tiene un perro grande y negro."]);

const DESCRIBE: EsItem[] = [
  ["How old is Lucía?", "13", ["3", "30", "12"], "«trece» is 13.", LUCIA, "en"],
  ["What does Lucía look like?", "tall, with long black hair", ["short, with short black hair", "tall, with short blond hair", "short, with long red hair"], "Look for «alta» and «el pelo largo y negro».", LUCIA, "en"],
  ["What does Lucía like to do?", "paint and listen to music", ["play soccer", "read science books", "cook"], "«pintar» is to paint; «escuchar música» is to listen to music.", LUCIA, "en"],
  ["Which word describes Lucía?", "simpática", ["divertido", "pelirroja", "baja"], "Find the describing words after «Es».", LUCIA],
  ["What colour is Tomás's hair?", "blond", ["black", "red", "white"], "«rubio» means blond.", TOMAS, "en"],
  ["What is Tomás like?", "funny", ["shy", "hard-working", "tall"], "«divertido» means funny.", TOMAS, "en"],
  ["What colour are Tomás's eyes?", "blue", ["green", "brown", "black"], "«azules» means blue.", TOMAS, "en"],
  ["What does Tomás like to do?", "play soccer with his friends", ["paint", "cook", "read"], "«jugar al fútbol» is to play soccer.", TOMAS, "en"],
  ["How old is Rosa?", "70", ["17", "7", "60"], "«setenta» is 70.", ABUELA, "en"],
  ["What does Rosa wear?", "glasses", ["a hat", "a scarf", "a watch"], "«lleva gafas» means she wears glasses.", ABUELA, "en"],
  ["What does Rosa do very well?", "cook", ["paint", "sing", "swim"], "«cocina muy bien» means she cooks very well.", ABUELA, "en"],
  ["What colour is Rosa's hair?", "white", ["black", "blond", "red"], "«blanco» means white.", ABUELA, "en"],
  ["What does «pelirrojo» mean?", "red-haired", ["blond", "tall", "smart"], "«pelo» is hair and «rojo» is red.", MARCO],
  ["What does Marco like to read?", "science books", ["comics", "stories about dogs", "poems"], "«libros de ciencia» are science books.", MARCO, "en"],
  ["What is Marco's dog like?", "big and black", ["small and white", "big and brown", "small and black"], "«grande y negro».", MARCO, "en"],
  ["Which word describes Marco?", "inteligente", ["tímida", "bajo", "rubio"], "Find the describing words after «Es».", MARCO],
  ["What does Elena teach?", "music", ["science", "art", "math"], "«profesora de música» is a music teacher.", ELENA, "en"],
  ["What is Elena's hair like?", "curly and brown", ["straight and black", "short and blond", "long and red"], "«rizado» is curly and «castaño» is brown.", ELENA, "en"],
  ["Which instruments does Elena play?", "the guitar and the piano", ["the drums and the flute", "the violin", "the trumpet and the piano"], "«Toca» means she plays.", ELENA, "en"],
  ["Which word describes Elena?", "paciente", ["tímida", "bajo", "pelirrojo"], "Find the describing words after «Es».", ELENA],
  ["What does «tímido» mean?", "shy", ["funny", "tall", "strong"], "It looks like the English word “timid”."],
  ["What does «fuerte» mean?", "strong", ["short", "kind", "lazy"], "Think of a fort: it is strong."],
  ["What does «trabajadora» mean?", "hard-working", ["shy", "funny", "tall"], "«trabajar» is to work."],
  ["What does «bajo» mean when it describes a person?", "short", ["tall", "strong", "young"], "The opposite of «alto»."],
  ["How do you say “He has blue eyes”?", "Tiene los ojos azules.", ["Es los ojos azules.", "Tiene los ojos verdes.", "Lleva los ojos azules."], "Eyes use «tener»: «tiene los ojos…»."],
  ["How do you say “She is tall and smart”?", "Es alta e inteligente.", ["Está alta e inteligente.", "Tiene alta e inteligente.", "Es alto e inteligente."], "Describing a girl: «alta»; before «i», «y» becomes «e»."],
  ["Pick the word that fits: «Mi hermano ___ muy simpático.»", "es", ["tiene", "son", "lleva"], "Personality uses «ser»: «es»."],
  ["Pick the word that fits: «Mi abuelo ___ barba.»", "tiene", ["es", "son", "está"], "A beard is something you have: «tiene»."],
  ["How do you say “She wears glasses”?", "Lleva gafas.", ["Tiene gafas largas.", "Es gafas.", "Lleva el pelo."], "«llevar» is to wear."],
  ["How do you say “He has freckles”?", "Tiene pecas.", ["Es pecas.", "Lleva pecas.", "Tengo pecas."], "«pecas» are freckles; he has: «tiene»."],
  ["How do you say “My best friend is funny”?", "Mi mejor amigo es divertido.", ["Mi mejor amigo está divertido.", "Mi mejor amigo tiene divertido.", "Mi amigo mejor es divertida."], "Personality uses «ser»: «es divertido»."],
  ["Pick the word that fits: «Mis hermanas ___ rubias.»", "son", ["es", "están", "tienen"], "Many people, «ser»: «son»."],
  ["Pick the word that fits: «Mi padre ___ el pelo castaño.»", "tiene", ["es", "lleva", "está"], "Hair colour uses «tener»: «tiene el pelo…»."],
  ["Which sentence describes someone with long hair?", "Tiene el pelo largo.", ["Tiene el pelo corto.", "Es bajo.", "Lleva gafas."], "«largo» means long."],
];

// ---------- Comparaciones ----------

const PAIRS: [big: string, small: string, adj: string, en: string][] = [
  ["El elefante", "el ratón", "grande", "The elephant is bigger than the mouse"],
  ["El avión", "la bicicleta", "rápido", "The plane is faster than the bike"],
  ["La montaña", "la colina", "alta", "The mountain is taller than the hill"],
  ["El invierno", "el verano", "frío", "Winter is colder than summer"],
  ["La tortuga", "el conejo", "lenta", "The turtle is slower than the rabbit"],
  ["El río", "el charco", "largo", "The river is longer than the puddle"],
  ["El sol", "la luna", "grande", "The sun is bigger than the moon"],
  ["El tren", "el autobús", "largo", "The train is longer than the bus"],
  ["La jirafa", "el perro", "alta", "The giraffe is taller than the dog"],
  ["El hielo", "el agua", "frío", "Ice is colder than water"],
];

const COMPARE: EsItem[] = [
  ...PAIRS.flatMap(([a, b, adj, en]): EsItem[] => {
    const bCap = b[0].toUpperCase() + b.slice(1);
    const aLow = a[0].toLowerCase() + a.slice(1);
    return [
      ["Which sentence is true?", `${a} es más ${adj} que ${b}.`, [`${bCap} es más ${adj} que ${aLow}.`, `${a} es menos ${adj} que ${b}.`], "«más… que» means more… than; «menos… que» means less… than."],
      [`How do you say “${en}”?`, `${a} es más ${adj} que ${b}.`, [`${a} es menos ${adj} que ${b}.`, `${a} es tan ${adj} como ${b}.`, `${bCap} es más ${adj} que ${aLow}.`], "«más… que» means more… than."],
    ];
  }),
  ["What does «tan alto como» mean?", "as tall as", ["taller than", "shorter than", "the tallest"], "«tan… como» means as… as."],
  ["What does «el más alto de la clase» mean?", "the tallest in the class", ["taller than the class", "as tall as the class", "the shortest in the class"], "«el más…» means the most…, or the …est."],
  ["How do you say “older than”?", "mayor que", ["menor que", "más joven que", "tan viejo como"], "For people's ages: «mayor» is older, «menor» is younger."],
  ["How do you say “better than”?", "mejor que", ["peor que", "más bueno de", "tan bien como"], "«bueno» becomes «mejor»: better."],
  ["What does «menos rápido que» mean?", "slower than", ["faster than", "as fast as", "the fastest"], "«menos» means less: less fast than."],
  ["What does «más pequeño que» mean?", "smaller than", ["bigger than", "as small as", "the smallest"], "«más» means more: more small than."],
  ["How do you say “younger than”?", "menor que", ["mayor que", "más viejo que", "tan joven como"], "For people's ages, «menor» is younger."],
  ["Pick the word that fits: «Mi gato es ___ grande como tu gato.»", "tan", ["más", "menos", "muy"], "«tan… como» means as… as."],
  ["Pick the word that fits: «El perro es más grande ___ el gato.»", "que", ["como", "de", "tan"], "«más… que» means more… than."],
  ["How do you say “worse than”?", "peor que", ["mejor que", "más que", "tan mal como"], "«malo» becomes «peor»: worse."],
  ...[[12, 10], [9, 14], [11, 11], [15, 13], [8, 10]].map(([ana, leo]): EsItem => {
    const right = ana > leo ? "Ana es mayor que Leo." : ana < leo ? "Ana es menor que Leo." : "Ana tiene tantos años como Leo.";
    const all = ["Ana es mayor que Leo.", "Ana es menor que Leo.", "Ana tiene tantos años como Leo."];
    return [`«Ana tiene ${NUMBERS[ana]} años y Leo tiene ${NUMBERS[leo]} años.» Which sentence is true?`, right, all.filter((x) => x !== right), "«mayor» is older, «menor» is younger, «tantos… como» as many… as."];
  }),
];

// ---------- Países hispanohablantes ----------

const CAPITALS: [country: string, capital: string][] = [
  ["México", "Ciudad de México"],
  ["Colombia", "Bogotá"],
  ["Argentina", "Buenos Aires"],
  ["Perú", "Lima"],
  ["Chile", "Santiago"],
  ["España", "Madrid"],
  ["Cuba", "La Habana"],
  ["Ecuador", "Quito"],
  ["Venezuela", "Caracas"],
  ["Uruguay", "Montevideo"],
  ["Paraguay", "Asunción"],
  ["Nicaragua", "Managua"],
];

const DEMONYMS: [country: string, boy: string, girl: string][] = [
  ["México", "mexicano", "mexicana"],
  ["Colombia", "colombiano", "colombiana"],
  ["Argentina", "argentino", "argentina"],
  ["Perú", "peruano", "peruana"],
  ["Chile", "chileno", "chilena"],
  ["Cuba", "cubano", "cubana"],
];

const COUNTRIES: EsItem[] = [
  ...CAPITALS.map(([c, cap], i): EsItem => [`What is the capital of «${c}»?`, cap, CAPITALS.filter((_, j) => j !== i).map((x) => x[1]), "Look at a map of Latin America and Spain."]),
  ...DEMONYMS.flatMap(([c, boy, girl], i): EsItem[] => [
    [`«Sofía es de ${c}.» Sofía es…`, girl, [boy, ...DEMONYMS.filter((_, j) => j !== i).map((x) => x[2])], `A girl from ${c}: the word ends in «a».`],
    [`«Mateo es de ${c}.» Mateo es…`, boy, [girl, ...DEMONYMS.filter((_, j) => j !== i).map((x) => x[1])], `A boy from ${c}: the word ends in «o».`],
  ]),
  ["Which of these Spanish-speaking countries is in Europe?", "España", ["México", "Chile", "Cuba"], "Spain is in Europe.", undefined, "es"],
  ["On which continent is «Argentina»?", "South America", ["Europe", "Africa", "Asia"], "Argentina is at the southern end of the Americas.", undefined, "en"],
  ["Which country is an island in the Caribbean Sea?", "Cuba", ["Chile", "Paraguay", "Bolivia"], "Cuba is an island south of the United States.", undefined, "es"],
  ["Which country has coasts on both the Caribbean Sea and the Pacific Ocean?", "Colombia", ["Uruguay", "Paraguay", "España"], "It is in the north of South America.", undefined, "es"],
];

// ---------- Direcciones ----------

const PLACES: Word[] = [
  ["🏦", "el banco", "bank"],
  ["📚", "la biblioteca", "library"],
  ["🏥", "el hospital", "hospital"],
  ["🛒", "el supermercado", "supermarket"],
  ["🌳", "el parque", "park"],
  ["🍽️", "el restaurante", "restaurant"],
  ["🚉", "la estación", "station"],
  ["🏊", "la piscina", "swimming pool"],
  ["💊", "la farmacia", "pharmacy"],
];

const DIRECTIONS: EsItem[] = [
  ...wordItems(PLACES),
  ["What does «Gira a la derecha» mean?", "Turn right.", ["Turn left.", "Go straight ahead.", "Stop."], "«derecha» is right."],
  ["What does «Gira a la izquierda» mean?", "Turn left.", ["Turn right.", "Cross the street.", "Go back."], "«izquierda» is left."],
  ["What does «Sigue todo recto» mean?", "Go straight ahead.", ["Turn left.", "Turn right.", "Stop here."], "«recto» means straight."],
  ["What does «Cruza la calle» mean?", "Cross the street.", ["Turn right.", "Go straight ahead.", "Wait here."], "«la calle» is the street."],
  ["What does «al lado de» mean?", "next to", ["far from", "across from", "behind"], "«al lado» means at the side."],
  ["What does «enfrente de» mean?", "across from", ["next to", "far from", "behind"], "«enfrente» means facing."],
  ["What does «cerca de» mean?", "near", ["far from", "inside", "behind"], "«cerca» is the opposite of «lejos»."],
  ["What does «lejos de» mean?", "far from", ["near", "next to", "across from"], "«lejos» is the opposite of «cerca»."],
  ["How do you ask “Where is the library?”", "¿Dónde está la biblioteca?", ["¿Qué es la biblioteca?", "¿Cuándo está la biblioteca?", "¿Dónde estás la biblioteca?"], "Ask where with «¿Dónde está…?»."],
  ["How do you say “Turn left”?", "Gira a la izquierda.", ["Gira a la derecha.", "Sigue todo recto.", "Cruza la calle."], "«izquierda» is left."],
  ["How do you say “The bank is next to the park”?", "El banco está al lado del parque.", ["El banco está lejos del parque.", "El banco es al lado del parque.", "El parque está en el banco."], "Location uses «estar»; next to is «al lado de»."],
];

export const course: Course = {
  grade: "7",
  subject: "spanish",
  ...spanishBigIdeas("7", [
    "Listening and viewing with intent helps us understand an increasing variety of messages.",
    "We can explore identity and place through increased understanding of a new language.",
    "Reciprocal interactions help us understand and acquire language.",
    "Stories help us to acquire language and understand the world around us.",
    "Knowing about diverse communities helps us develop cultural awareness.",
  ]),
  units: [
    {
      id: "verbos-ar",
      title: "-ar verbs",
      emoji: "🗣️",
      blurb: "Hablo, hablas, habla",
      parentNote: "The present tense of regular -ar verbs: dropping -ar and adding the ending that matches who is doing it.",
      ...spanishStandards("7", { wrs: ["Language Comparisons", "Presentational Communication"], text: "the present tense of regular -ar verbs", bc: "common, high-frequency vocabulary, sentence structures, and expressions", ab: ["LC-1"], mb: ["2.1.4"] }),
      generate: (o) => esQuestions(VERB_ITEMS, o),
    },
    {
      id: "describir",
      title: "Describing people",
      emoji: "🧑",
      blurb: "Es alta y tiene el pelo largo",
      parentNote: "Reading short descriptions of people (what they look like, what they are like, what they enjoy) and writing your own.",
      ...spanishStandards("7", { wrs: ["Interpretive Communication", "Presentational Communication"], text: "reading and writing descriptions of people", bc: "descriptions of people", ab: ["A-1", "LC-2"], mb: ["1.1.1", "2.3.1"] }),
      generate: (o) => esQuestions(DESCRIBE, o),
    },
    {
      id: "comparaciones",
      title: "Comparing",
      emoji: "⚖️",
      blurb: "Más alto que, tan alto como",
      parentNote: "Comparing people and things with más… que, menos… que and tan… como, and the special words mayor, menor, mejor and peor.",
      ...spanishStandards("7", { wrs: ["Interpretive Communication", "Language Comparisons"], text: "comparing people and things", bc: "instructions and comparisons", ab: ["A-2", "LC-1"], mb: ["1.2.1", "2.1.4"] }),
      generate: (o) => esQuestions(COMPARE, o),
    },
    {
      id: "paises",
      title: "Spanish-speaking countries",
      emoji: "🌎",
      blurb: "México, Perú, España…",
      parentNote: "Countries where Spanish is spoken, their capitals, and how to say where someone is from (mexicano, peruana).",
      ...spanishStandards("7", { wrs: ["Acquiring Information and Diverse Perspectives", "Making Connections"], text: "Spanish-speaking countries, their capitals and nationalities", bc: "Hispanic communities around the world", ab: ["GC-1", "LC-1"], mb: ["3.1.1", "2.1.3"] }),
      generate: (o) => esQuestions(COUNTRIES, o),
    },
    {
      id: "direcciones",
      title: "Around town",
      emoji: "🗺️",
      blurb: "Gira a la derecha",
      parentNote: "Places in a town, asking where something is, and following directions: turn right, turn left, go straight ahead.",
      ...spanishStandards("7", { wrs: ["Interpersonal Communication", "School and Global Communities"], text: "places in town and giving directions", bc: "instructions and comparisons", ab: ["A-3", "LC-1"], mb: ["1.3.1", "2.1.3"] }),
      generate: (o) => esQuestions(DIRECTIONS, o),
    },
  ],
};
