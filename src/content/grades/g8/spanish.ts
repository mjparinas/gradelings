import { esQuestions, spanishBigIdeas, spanishStandards, wordItems, type EsItem, type Word } from "../../spanish";
import { numberWord } from "../../spanishNumbers";
import type { Course } from "../../types";

// Spanish, Grade 8: -er and -ir verbs, the near future, time and routines, shopping and the environment. Prompts are
// English; the Spanish in « » is what children learn (see ../../spanish).

// ---------- Verbos en -er y en -ir ----------

const VERBS: [verb: string, en: string, she: string][] = [
  ["comer", "eat", "eats"],
  ["beber", "drink", "drinks"],
  ["leer", "read", "reads"],
  ["correr", "run", "runs"],
  ["aprender", "learn", "learns"],
  ["vender", "sell", "sells"],
  ["vivir", "live", "lives"],
  ["escribir", "write", "writes"],
  ["abrir", "open", "opens"],
  ["compartir", "share", "shares"],
];

const PEOPLE: [pronoun: string, er: string, ir: string, en: string][] = [
  ["Yo", "o", "o", "I"],
  ["Tú", "es", "es", "You"],
  ["Ella", "e", "e", "She"],
  ["Nosotros", "emos", "imos", "We"],
  ["Ellos", "en", "en", "They"],
];

const ER_IR: EsItem[] = VERBS.flatMap(([verb, en, she]): EsItem[] => {
  const stem = verb.slice(0, -2);
  const ir = verb.endsWith("ir");
  const forms = PEOPLE.map((p) => stem + (ir ? p[2] : p[1]));
  return PEOPLE.flatMap(([pronoun, , , who], i): EsItem[] => [
    [`Pick the right form: «${pronoun} ___ (${verb})»`, forms[i], forms.filter((f) => f !== forms[i]), `Drop «${verb.slice(-2)}» and add the ending for «${pronoun.toLowerCase()}».`],
    [`What does «${pronoun} ${forms[i]}» mean?`, `${who} ${who === "She" ? she : en}.`, PEOPLE.filter((_, j) => j !== i).map((p) => `${p[3]} ${p[3] === "She" ? she : en}.`), `«${pronoun}» means “${who === "I" ? who : who.toLowerCase()}”.`],
  ]);
});

// ---------- Ir a + infinitivo ----------

const IR: [pronoun: string, form: string][] = [
  ["Yo", "voy"],
  ["Tú", "vas"],
  ["Mi hermano", "va"],
  ["Nosotros", "vamos"],
  ["Mis amigos", "van"],
];

const PLANS: [es: string, en: string][] = [
  ["nadar", "swim"],
  ["estudiar", "study"],
  ["comer pizza", "eat pizza"],
  ["visitar a mi abuela", "visit my grandmother"],
  ["jugar al fútbol", "play soccer"],
];

const FUTURE: EsItem[] = [
  ...IR.flatMap(([who, form]): EsItem[] =>
    PLANS.slice(0, 3).map(([plan]): EsItem => [`Pick the right form: «Mañana ${who.toLowerCase() === "yo" ? "yo" : who === "Tú" ? "tú" : who.toLowerCase()} ___ a ${plan}.»`, form, IR.filter((x) => x[1] !== form).map((x) => x[1]), "«ir»: voy, vas, va, vamos, van. Then «a» and the verb as it is."]),
  ),
  ...PLANS.map(([es, en], i): EsItem => [`How do you say “We are going to ${en}”?`, `Vamos a ${es}.`, [`Vamos ${es}.`, `Van a ${es}.`, `Vamos a ${PLANS[(i + 1) % PLANS.length][0]}.`], "«ir a» + the verb as it is: «Vamos a…»."]),
  ["What does «Ella va a estudiar» mean?", "She is going to study.", ["She studies.", "She studied.", "She is going to the school."], "«va a» + a verb talks about the future."],
  ["What does «Voy a la biblioteca» mean?", "I'm going to the library.", ["I'm going to read.", "I was at the library.", "The library is open."], "«ir a» + a place means going there."],
  ["What does «esta noche» mean?", "tonight", ["tomorrow", "this morning", "next week"], "«noche» is night; «esta» is this."],
  ["What does «el fin de semana» mean?", "the weekend", ["the end of the day", "next month", "every week"], "«fin» is end and «semana» is week."],
  ["What does «la próxima semana» mean?", "next week", ["last week", "this weekend", "every week"], "«próxima» means next."],
  ["Which sentence talks about the future?", "Voy a leer un libro.", ["Leo un libro.", "Me gusta leer.", "Tengo un libro."], "«voy a» + a verb is what you are going to do."],
];

// ---------- La hora y la frecuencia ----------

const HOURS = ["", "una", "dos", "tres", "cuatro", "cinco", "seis", "siete", "ocho", "nueve", "diez", "once", "doce"];

function time(h: number, m: number): string {
  const tail = m === 15 ? " y cuarto" : m === 30 ? " y media" : "";
  return h === 1 ? `Es la una${tail}.` : `Son las ${HOURS[h]}${tail}.`;
}

const CLOCKS: EsItem[] = [1, 3, 4, 6, 7, 9, 10, 12].flatMap((h): EsItem[] =>
  [0, 15, 30].map((m): EsItem => {
    const next = (h % 12) + 1;
    const wrong = [time(next, m), time(h, m === 30 ? 0 : 30), time(h === 1 ? 2 : h - 1, m)];
    return ["«¿Qué hora es?» Which answer fits the clock?", time(h, m), [...new Set(wrong)], "Read the short hand for the hour. «y cuarto» is quarter past and «y media» is half past.", { type: "clock", hour: h, minute: m }];
  }),
);

const OFTEN: EsItem[] = [
  ["What does «siempre» mean?", "always", ["never", "sometimes", "every day"], "«siempre» is the opposite of «nunca»."],
  ["What does «nunca» mean?", "never", ["always", "sometimes", "once a week"], "«nunca» is the opposite of «siempre»."],
  ["What does «a veces» mean?", "sometimes", ["always", "never", "every day"], "«a veces» is now and then."],
  ["What does «todos los días» mean?", "every day", ["sometimes", "on Mondays", "never"], "«todos» is all and «días» is days."],
  ["What does «una vez a la semana» mean?", "once a week", ["every day", "twice a day", "on weekends"], "«una vez» is one time."],
  ["What does «los sábados» mean?", "on Saturdays", ["on Sundays", "every day", "this Saturday"], "«los» + a day means every one of those days."],
  ["What does «Me levanto a las siete» mean?", "I get up at seven.", ["I go to bed at seven.", "I eat at seven.", "It is seven o'clock."], "«levantarse» is to get up."],
  ["How do you say “I never eat fish”?", "Nunca como pescado.", ["Siempre como pescado.", "A veces como pescado.", "No como nunca pescado siempre."], "«nunca» goes before the verb."],
  ["How do you say “I always read at night”?", "Siempre leo por la noche.", ["Nunca leo por la noche.", "A veces leo por la mañana.", "Siempre leo por la mañana."], "«siempre» is always; «por la noche» is at night."],
];

// ---------- De compras ----------

const PRICES: EsItem[] = [45, 120, 250, 380, 99, 515, 760, 1000, 15, 230, 470, 640, 850].map((n): EsItem => {
  const wrong = [n + 100, n - 10, n + 1, n - 100, n + 50].filter((x) => x > 0 && x <= 1000).slice(0, 3);
  return [`«Cuesta ${numberWord(n)} pesos.» How much does it cost?`, `${n} pesos`, wrong.map((x) => `${x} pesos`), "«ciento» is one hundred-something, «doscientos» two hundred, «quinientos» five hundred, «mil» a thousand.", undefined, "en"];
});

const SHOPPING: EsItem[] = [
  ...PRICES,
  ["How do you ask “How much does it cost?”", "¿Cuánto cuesta?", ["¿Cuántos años tiene?", "¿Qué hora es?", "¿Dónde está?"], "«costar» is to cost."],
  ["What does «Es muy caro» mean?", "It's very expensive.", ["It's very cheap.", "It's very big.", "It's on sale."], "«caro» is the opposite of «barato»."],
  ["What does «Es barato» mean?", "It's cheap.", ["It's expensive.", "It's small.", "It's sold out."], "«barato» is the opposite of «caro»."],
  ["What does «¿Me lo puedo probar?» mean?", "Can I try it on?", ["Can I buy it?", "How much is it?", "Where is the store?"], "«probar» means to try."],
  ["What does «¿Qué talla usas?» mean?", "What size do you wear?", ["What colour do you like?", "How much money do you have?", "What time is it?"], "«la talla» is a clothing size."],
  ["How do you say “I would like to buy this shirt”?", "Quisiera comprar esta camisa.", ["Quisiera vender esta camisa.", "Tengo esta camisa.", "Me gusta este camisa."], "«comprar» is to buy; «esta» goes with «camisa»."],
  ["Pick the word that fits: «Me gusta ___ camisa.»", "esta", ["este", "estos", "estas"], "«camisa» is «la», one thing: «esta»."],
  ["Pick the word that fits: «¿Cuánto cuestan ___ zapatos?»", "estos", ["este", "esta", "estas"], "«zapatos» is «los», many things: «estos»."],
  ["Pick the word that fits: «___ libro es interesante.»", "Este", ["Esta", "Estos", "Estas"], "«libro» is «el», one thing: «este»."],
  ["Pick the word that fits: «Quiero comprar ___ flores.»", "estas", ["este", "esta", "estos"], "«flores» is «las», many things: «estas»."],
  ["What does «Voy a pagar con tarjeta» mean?", "I'm going to pay by card.", ["I'm going to pay in cash.", "I lost my card.", "I'm going to buy a card."], "«pagar» is to pay; «la tarjeta» is a card."],
  ["What does «la tienda» mean?", "the store", ["the money", "the size", "the street"], "You go shopping at «la tienda»."],
  ["What does «el dinero» mean?", "money", ["the price", "the card", "the store"], "You pay with «dinero»."],
  ["What does «Está en oferta» mean?", "It's on sale.", ["It's sold out.", "It's very expensive.", "It's too big."], "«en oferta» means on sale."],
  ["How do you say “It's too big”?", "Es demasiado grande.", ["Es demasiado pequeño.", "Es muy barato.", "Es más grande que."], "«demasiado» means too much."],
  ["What does «¿Puedo ayudarle?» mean?", "Can I help you?", ["Can I try it on?", "Can I pay?", "Can I go?"], "«ayudar» is to help."],
  ["How do you say “I'm just looking”?", "Solo estoy mirando.", ["Solo estoy comprando.", "Solo estoy pagando.", "Estoy buscando la tienda."], "«mirar» is to look."],
  ["The shirt is too small. What do you ask?", "¿Tiene una talla más grande?", ["¿Tiene una talla más pequeña?", "¿Es muy barato?", "¿Dónde está el banco?"], "You need a bigger size: «más grande»."],
];

// ---------- El medio ambiente ----------

const NATURE: Word[] = [
  ["♻️", "reciclar", "to recycle"],
  ["🗑️", "la basura", "garbage"],
  ["🌳", "el árbol", "tree"],
  ["🌊", "el océano", "ocean"],
  ["🌍", "el planeta", "planet"],
  ["🐝", "la abeja", "bee"],
  ["🌱", "la planta", "plant"],
  ["💡", "la luz", "light"],
  ["🔋", "la batería", "battery"],
];

const ENVIRONMENT: EsItem[] = [
  ...wordItems(NATURE),
  ["What does «Hay que ahorrar agua» mean?", "We have to save water.", ["We have to drink water.", "There is no water.", "Water is expensive."], "«ahorrar» is to save; «hay que» means we have to."],
  ["What does «Creo que…» mean?", "I think that…", ["I know that…", "I want…", "I don't believe…"], "«creer» means to believe or think."],
  ["What does «Estoy de acuerdo» mean?", "I agree.", ["I disagree.", "I don't know.", "I'm ready."], "«de acuerdo» means in agreement."],
  ["What does «No estoy de acuerdo» mean?", "I disagree.", ["I agree.", "I'm not ready.", "I'm not sure where."], "Put «No» in front: not in agreement."],
  ["What does «¿Qué opinas?» mean?", "What do you think?", ["What do you want?", "What is it?", "Where are you?"], "«opinar» is to give an opinion."],
  ["How do you say “It's important to recycle”?", "Es importante reciclar.", ["Es importante la basura.", "No es importante reciclar.", "Reciclar es la basura."], "«Es importante» + the verb as it is."],
  ["How do you say “Turn off the light”?", "Apaga la luz.", ["Enciende la luz.", "Apaga el agua.", "La luz es apagada."], "«apagar» is to turn off; «encender» is to turn on."],
  ["Which sentence gives an opinion?", "Creo que el plástico es un problema.", ["El océano es grande.", "Hay tres árboles.", "Son las dos."], "Opinions often start with «Creo que…» or «Pienso que…»."],
  ["Which is a way to help the planet?", "Ir a la escuela en bicicleta.", ["Tirar basura en el río.", "Dejar la luz encendida.", "Usar más plástico."], "Riding a bike makes no smoke."],
];

export const course: Course = {
  grade: "8",
  subject: "spanish",
  ...spanishBigIdeas("8", [
    "Listening and viewing with intent supports our acquisition and understanding of a new language.",
    "We can express ourselves and talk about the world around us in a new language.",
    "With increased fluency, we can participate actively in reciprocal interactions.",
    "We can share our experiences and perspectives through stories.",
    "Creative works are an expression of language and culture.",
    "Acquiring a new language and learning about another culture deepens our understanding of our own language and culture.",
  ]),
  units: [
    {
      id: "verbos-er-ir",
      title: "-er and -ir verbs",
      emoji: "✍️",
      blurb: "Como, vivo, escribimos",
      parentNote: "The present tense of regular -er and -ir verbs, which share most endings and differ only with nosotros (comemos, vivimos).",
      ...spanishStandards("8", { wrs: ["Language Comparisons", "Presentational Communication"], text: "the present tense of regular -er and -ir verbs", bc: "common, high-frequency vocabulary, sentence structures, and expressions", ab: ["LC-1"], mb: ["2.1.4"] }),
      generate: (o) => esQuestions(ER_IR, o),
    },
    {
      id: "ir-a",
      title: "Going to…",
      emoji: "🚀",
      blurb: "Voy a nadar mañana",
      parentNote: "Talking about plans with ir a + a verb (voy a nadar, vamos a estudiar), and words for later times like tonight and next week.",
      ...spanishStandards("8", { wrs: ["Presentational Communication", "Interpersonal Communication"], text: "talking about plans with ir a", bc: "past, present, and future time frames", ab: ["A-1", "LC-1"], mb: ["1.3.2", "2.1.4"] }),
      generate: (o) => esQuestions(FUTURE, o),
    },
    {
      id: "hora-y-frecuencia",
      title: "Time and how often",
      emoji: "⏰",
      blurb: "Son las tres, siempre, nunca",
      parentNote: "Telling the time on a clock, and saying how often you do things: always, sometimes, never, every day.",
      ...spanishStandards("8", { wrs: ["Interpretive Communication", "Interpersonal Communication"], text: "telling time and saying how often", bc: "time and frequency", ab: ["A-1", "LC-1"], mb: ["1.1.1", "2.1.3"] }),
      generate: (o) => esQuestions([...CLOCKS, ...OFTEN], o),
    },
    {
      id: "compras",
      title: "Shopping",
      emoji: "🛍️",
      blurb: "¿Cuánto cuesta?",
      parentNote: "Asking prices, understanding big numbers, describing what you want to buy, and pointing things out with este, esta, estos and estas.",
      ...spanishStandards("8", { wrs: ["Interpersonal Communication", "Relating Cultural Products to Perspectives"], text: "shopping, prices and describing things to buy", bc: "descriptions of people and objects", ab: ["A-3", "LC-1"], mb: ["1.3.1", "2.1.3"] }),
      generate: (o) => esQuestions(SHOPPING, o),
    },
    {
      id: "medio-ambiente",
      title: "Our planet",
      emoji: "♻️",
      blurb: "Hay que reciclar",
      parentNote: "Words about nature and the environment, and giving and asking for opinions: creo que, estoy de acuerdo, ¿qué opinas?",
      ...spanishStandards("8", { wrs: ["Making Connections", "Presentational Communication"], text: "the environment and giving opinions", bc: "beliefs and opinions", ab: ["A-5", "LC-1"], mb: ["1.4.4", "2.1.3"] }),
      generate: (o) => esQuestions(ENVIRONMENT, o),
    },
  ],
};
