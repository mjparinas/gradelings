import { esQuestions, spanishBigIdeas, spanishStandards, wordItems, type EsItem, type Word } from "../../spanish";
import { NUMBERS } from "../../spanishNumbers";
import type { Course } from "../../types";

// Spanish, Grade 5: sounds, el and la, likes, talking about yourself and celebrations. Prompts are English; the Spanish
// in « » is what children learn (see ../../spanish).

// ---------- Los sonidos ----------

const SOUNDS: EsItem[] = [
  ["In Spanish, how does the «h» in «hola» sound?", "It is silent.", ["Like the h in hat.", "Like the j in jam.", "Like a k."], "Spanish «h» makes no sound at all: «hola» sounds like “OH-la”.", undefined, "en"],
  ["In Spanish, «j» sounds like…", "the h in hello", ["the j in jam", "the y in yes", "the s in sun"], "«j» is a breathy sound, as in «jugo».", undefined, "en"],
  ["In «llama», the «ll» sounds like…", "the y in yes", ["the l in lamp", "the j in jam", "the ch in chair"], "In most of Latin America, «ll» sounds like the y in yes.", undefined, "en"],
  ["The Spanish «ñ» sounds like…", "the ny in canyon", ["the n in no", "the g in go", "the ch in chin"], "«niño» sounds like “NEE-nyo”.", undefined, "en"],
  ["Spanish «a» sounds like the a in…", "father", ["cake", "cat", "bag"], "Spanish vowels are short and clear: «a» as in «casa».", undefined, "en"],
  ["Spanish «i» sounds like the ee in…", "see", ["sit", "bike", "ice"], "«i» always sounds like ee: «sí», «libro».", undefined, "en"],
  ["Spanish «u» sounds like the oo in…", "moon", ["cup", "bus", "cute"], "«u» always sounds like oo: «uno», «luna».", undefined, "en"],
  ["In «cielo», the «c» sounds like…", "s", ["k", "ch", "g"], "«c» before «e» or «i» sounds like s in Latin America.", undefined, "en"],
  ["In «casa», the «c» sounds like…", "k", ["s", "ch", "h"], "«c» before «a», «o» or «u» sounds like k.", undefined, "en"],
  ["In «queso», the «qu» sounds like…", "k", ["kw", "ch", "s"], "In Spanish, «qu» sounds like k: «queso», «quince».", undefined, "en"],
  ["In «gente», the «g» sounds like…", "the Spanish «j»", ["the g in go", "the j in jam", "nothing: it is silent"], "«g» before «e» or «i» sounds like the Spanish «j».", undefined, "en"],
  ["In «zapato», the «z» sounds like…", "s", ["z in zoo", "ts", "th"], "In Latin America, «z» sounds like s.", undefined, "en"],
  ["Which word starts with a silent letter?", "hola", ["mesa", "gato", "libro"], "Spanish «h» is silent."],
  ["Which word has a rolled «rr»?", "perro", ["pelo", "gato", "mesa"], "Look for two r's together."],
  ["Which word has the «ch» sound, as in chair?", "chocolate", ["casa", "queso", "cine"], "Look for «ch»."],
  ["Which word starts with the same sound as «gato»?", "goma", ["gente", "jirafa", "hielo"], "«ga», «go» and «gu» sound like the g in go."],
  ["Which word starts with the same sound as «jugo»?", "gente", ["gato", "llave", "queso"], "«ge» and «gi» sound like «j»."],
  ["Which word starts with the same sound as «casa»?", "queso", ["cine", "chico", "llave"], "«ca» and «que» both start with a k sound."],
  ["Which word starts with the same sound as «cine»?", "sol", ["casa", "chocolate", "queso"], "«ci» starts with an s sound."],
  ["Which word starts with the same sound as «llave»?", "yo", ["luna", "chico", "jamón"], "«ll» sounds like y."],
  ["Which word starts with the same sound as «zapato»?", "sopa", ["casa", "gato", "chico"], "«z» sounds like s in Latin America."],
  ["How many syllables are in «mariposa»?", "4", ["2", "3", "5"], "Clap it: ma-ri-po-sa.", undefined, "en"],
  ["How many syllables are in «pelota»?", "3", ["2", "4", "5"], "Clap it: pe-lo-ta.", undefined, "en"],
  ["How many syllables are in «elefante»?", "4", ["2", "3", "5"], "Clap it: e-le-fan-te.", undefined, "en"],
  ["How many syllables are in «gato»?", "2", ["1", "3", "4"], "Clap it: ga-to.", undefined, "en"],
  ["How many syllables are in «sol»?", "1", ["2", "3", "4"], "Clap it: sol.", undefined, "en"],
];

// ---------- El y la ----------

type Noun = [singular: string, gender: "m" | "f", plural: string];

const NOUNS: Noun[] = [
  ["libro", "m", "libros"],
  ["mesa", "f", "mesas"],
  ["casa", "f", "casas"],
  ["perro", "m", "perros"],
  ["flor", "f", "flores"],
  ["lápiz", "m", "lápices"],
  ["ventana", "f", "ventanas"],
  ["árbol", "m", "árboles"],
  ["canción", "f", "canciones"],
  ["papel", "m", "papeles"],
  ["nube", "f", "nubes"],
  ["mano", "f", "manos"],
  ["día", "m", "días"],
  ["mapa", "m", "mapas"],
  ["ciudad", "f", "ciudades"],
  ["camión", "m", "camiones"],
];

const ART = { m: ["el", "los"], f: ["la", "las"] } as const;

const GENDER: EsItem[] = [
  ...NOUNS.flatMap(([one, g, many]): EsItem[] => {
    const tricky = one === "mano" || one === "día" || one === "mapa";
    return [
      [`Which word goes in front of «${one}»?`, ART[g][0], ["el", "la", "los", "las"].filter((a) => a !== ART[g][0]), tricky ? `«${one}» is one of the words that break the rule: «${ART[g][0]} ${one}».` : "Most words ending in «o» use «el», and most ending in «a», «ción» or «dad» use «la»."],
      [`What is the plural of «${ART[g][0]} ${one}»?`, `${ART[g][1]} ${many}`, [`${ART[g === "m" ? "f" : "m"][1]} ${many}`, `${ART[g][1]} ${one}`, `${ART[g][0]} ${many}`], "Plural: «el» becomes «los», «la» becomes «las», and add «s» (or «es» after a consonant)."],
    ];
  }),
  ["Pick the word that fits: «el gato ___»", "negro", ["negra", "negros", "negras"], "One cat, «el»: use the «o» ending, «negro»."],
  ["Pick the word that fits: «la casa ___»", "blanca", ["blanco", "blancos", "blancas"], "One house, «la»: use the «a» ending, «blanca»."],
  ["Pick the word that fits: «los perros ___»", "pequeños", ["pequeño", "pequeña", "pequeñas"], "Many dogs, «los»: use «os», «pequeños»."],
  ["Pick the word that fits: «las flores ___»", "rojas", ["rojo", "roja", "rojos"], "Many flowers, «las»: use «as», «rojas»."],
];

// ---------- Me gusta ----------

const THINGS: [string, string, boolean][] = [
  ["el chocolate", "chocolate", false],
  ["la pizza", "pizza", false],
  ["los perros", "dogs", true],
  ["las manzanas", "apples", true],
  ["el fútbol", "soccer", false],
  ["la música", "music", false],
  ["los libros", "books", true],
  ["las fresas", "strawberries", true],
  ["la lluvia", "rain", false],
  ["los gatos", "cats", true],
];

const LIKES: EsItem[] = [
  ...THINGS.flatMap(([es, en, many]): EsItem[] => [
    [`Pick the word that fits: «Me ___ ${es}.»`, many ? "gustan" : "gusta", many ? ["gusta", "gustas"] : ["gustan", "gustas"], many ? "More than one thing (los, las): use «gustan»." : "One thing (el, la): use «gusta»."],
    [`How do you say “I don't like ${en}”?`, `No me ${many ? "gustan" : "gusta"} ${es}.`, [`Me ${many ? "gustan" : "gusta"} ${es}.`, `Me no ${many ? "gustan" : "gusta"} ${es}.`, `No ${many ? "gustan" : "gusta"} me ${es}.`], "Put «No» first: «No me gusta…»."],
  ]),
  ["What does «Me encanta» mean?", "I love it.", ["I don't like it.", "I want it.", "I have it."], "«Me encanta» is stronger than «Me gusta»."],
  ["What does «¿Te gusta el fútbol?» mean?", "Do you like soccer?", ["Do you play soccer?", "Where is the soccer game?", "I like soccer."], "«¿Te gusta…?» asks “Do you like…?”"],
  ["Someone asks «¿Te gusta nadar?» You love swimming. Which answer fits?", "Sí, me gusta mucho.", ["No, no me gusta.", "Hasta luego.", "Tengo diez años."], "Say yes, you like it a lot: «mucho»."],
  ["Ana says «No me gusta el brócoli.» What does she mean?", "She doesn't like broccoli.", ["She likes broccoli.", "She loves broccoli.", "She wants broccoli."], "«No me gusta» means I don't like.", undefined, "en"],
  ["What does «¿Cuál es tu color favorito?» mean?", "What is your favourite colour?", ["Do you like colours?", "What colour is it?", "Where are the colours?"], "«favorito» means favourite."],
  ["How do you ask “Do you like music?”", "¿Te gusta la música?", ["¿Me gusta la música?", "¿Te gustan la música?", "¿Tú gusta la música?"], "Ask with «¿Te gusta…?»."],
];

// ---------- Sobre mí ----------

const AGES: EsItem[] = [8, 9, 10, 11, 12, 13, 14, 15].map((n): EsItem => [
  `How do you say “I am ${n} years old”?`,
  `Tengo ${NUMBERS[n]} años.`,
  [`Soy ${NUMBERS[n]} años.`, `Estoy ${NUMBERS[n]} años.`, `Tengo ${NUMBERS[n + 1]} años.`],
  "In Spanish you “have” years: «Tengo… años».",
]);

const TENS: EsItem[] = [21, 25, 30, 34, 40, 47, 50, 56, 60, 63, 70, 78, 80, 89, 90, 99, 100].flatMap((n): EsItem[] => {
  const wrong = [n + 10, n - 10, n + 1, n - 1].filter((x) => x >= 0 && x <= 100).slice(0, 3);
  return [
    [`What number is «${NUMBERS[n]}»?`, String(n), wrong.map(String), "«treinta» is 30, «cuarenta» 40, «cincuenta» 50, «sesenta» 60, «setenta» 70, «ochenta» 80, «noventa» 90."],
    [`How do you say ${n} in Spanish?`, NUMBERS[n], wrong.map((x) => NUMBERS[x]), "Tens, then «y», then ones: 34 is «treinta y cuatro»."],
  ];
});

const ABOUT: EsItem[] = [
  ...AGES,
  ...TENS,
  ["What does «¿Cuántos años tienes?» mean?", "How old are you?", ["What is your name?", "Where are you from?", "How are you?"], "«años» means years."],
  ["What does «¿De dónde eres?» mean?", "Where are you from?", ["How old are you?", "Where are you going?", "What is your name?"], "«dónde» means where."],
  ["How do you say “I am from Peru”?", "Soy de Perú.", ["Tengo de Perú.", "Me llamo Perú.", "Estoy de Perú."], "Say where you are from with «Soy de…»."],
  ["What does «Vivo en una casa grande» mean?", "I live in a big house.", ["I have a big house.", "I like big houses.", "I live in a small house."], "«vivo» means I live, «grande» means big."],
  ["What does «Mi cumpleaños es el cinco de mayo» mean?", "My birthday is May 5.", ["My birthday is in March.", "I am five years old.", "My party is on Monday."], "«cumpleaños» is a birthday, «mayo» is May."],
  ["«Mi hermano tiene doce años.» How old is the brother?", "12", ["2", "10", "20"], "«doce» is 12.", undefined, "en"],
];

// ---------- Fiestas ----------

const PARTY: Word[] = [
  ["🎂", "el pastel", "cake"],
  ["🕯️", "la vela", "candle"],
  ["🎁", "el regalo", "gift"],
  ["🎈", "el globo", "balloon"],
  ["🎉", "la fiesta", "party"],
  ["🍬", "el dulce", "candy"],
];

const FESTIVALS: EsItem[] = [
  ...wordItems(PARTY),
  ["How do you say “Happy birthday!”?", "¡Feliz cumpleaños!", ["¡Feliz Año Nuevo!", "¡Buenas noches!", "¡Mucho gusto!"], "«cumpleaños» means birthday."],
  ["How do you say “Happy New Year!”?", "¡Feliz Año Nuevo!", ["¡Feliz cumpleaños!", "¡Buenos días!", "¡Hasta luego!"], "«Año Nuevo» means New Year."],
  ["How do you say “Let's dance!”?", "¡Vamos a bailar!", ["¡Vamos a comer!", "¡Vamos a cantar!", "¡Vamos a jugar!"], "«bailar» means to dance."],
  ["How do you say “Let's sing!”?", "¡Vamos a cantar!", ["¡Vamos a bailar!", "¡Vamos a comer!", "¡Vamos a dormir!"], "«cantar» means to sing."],
  ["A «quinceañera» celebrates a girl turning…", "15", ["10", "18", "21"], "«quince» is 15.", undefined, "en"],
  ["What is «papel picado»?", "paper cut into patterns to decorate", ["a spicy pepper dish", "a birthday song", "a paper airplane"], "«papel» is paper and «picado» means cut up.", undefined, "en"],
  ["In many Spanish-speaking countries, some families eat twelve «uvas» at midnight on New Year's Eve. What are «uvas»?", "grapes", ["cookies", "candles", "balloons"], "One for each month of the new year.", undefined, "en"],
  ["Children take turns hitting a «piñata» at a party. What falls out?", "candy and small treats", ["water", "sand", "leaves"], "A «piñata» is filled with «dulces».", undefined, "en"],
];

export const course: Course = {
  grade: "5",
  subject: "spanish",
  ...spanishBigIdeas("5", [
    "Listening and viewing with intent helps us acquire a new language.",
    "Both verbal and non-verbal cues contribute meaning in language.",
    "Reciprocal communication is possible using high-frequency words and patterns.",
    "We can explore our identity through a new language.",
    "Stories help us to acquire language.",
    "Each culture has traditions and ways of celebrating.",
  ]),
  units: [
    {
      id: "sonidos",
      title: "Spanish sounds",
      emoji: "🔤",
      blurb: "H is silent, ñ, ll and rr",
      parentNote: "How Spanish letters sound: the five clear vowels, the silent h, ñ, ll, j, rr, and the two sounds of c and g.",
      ...spanishStandards("5", { wrs: ["Interpretive Communication", "Language Comparisons"], text: "the sounds of Spanish letters", bc: "Spanish phonemes", ab: ["LC-1"] }),
      generate: (o) => esQuestions(SOUNDS, o),
    },
    {
      id: "el-y-la",
      title: "El, la, los, las",
      emoji: "🏷️",
      blurb: "One or many, el or la",
      parentNote: "Every Spanish noun is masculine or feminine. This practises el, la, los and las, plurals, and describing words that match.",
      ...spanishStandards("5", { wrs: ["Language Comparisons", "Interpretive Communication"], text: "gender and number of nouns and describing words", bc: "gender and number", ab: ["LC-1"] }),
      generate: (o) => esQuestions(GENDER, o),
    },
    {
      id: "gustos",
      title: "I like, I don't like",
      emoji: "😋",
      blurb: "Me gusta, me gustan",
      parentNote: "Saying what you like and don't like, asking a friend, and when to use gusta or gustan.",
      ...spanishStandards("5", { wrs: ["Interpersonal Communication", "Presentational Communication"], text: "saying and asking what people like", bc: "opinions and preferences", ab: ["A-2", "LC-1"] }),
      generate: (o) => esQuestions(LIKES, o),
    },
    {
      id: "sobre-mi",
      title: "About me",
      emoji: "🙋",
      blurb: "Tengo diez años",
      parentNote: "Telling your age, where you are from and your birthday, with the numbers up to 100.",
      ...spanishStandards("5", { wrs: ["Interpersonal Communication", "Presentational Communication"], text: "giving basic information about yourself and others", bc: "basic information about themselves and others", ab: ["A-1", "LC-1"] }),
      generate: (o) => esQuestions(ABOUT, o),
    },
    {
      id: "fiestas",
      title: "Celebrations",
      emoji: "🎉",
      blurb: "¡Feliz cumpleaños!",
      parentNote: "Party words and greetings, and a few celebrations from Spanish-speaking countries, such as the quinceañera and papel picado.",
      ...spanishStandards("5", { wrs: ["Relating Cultural Practices to Perspectives", "Cultural Comparisons"], text: "birthdays, festivals and celebrations in Spanish-speaking countries", bc: "common elements of Hispanic cultural festivals and celebrations", ab: ["GC-1", "LC-1"] }),
      generate: (o) => esQuestions(FESTIVALS, o),
    },
  ],
};
