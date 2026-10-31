import { lesson, type GradeLessons } from "./index";

export const lessons: GradeLessons = {
  "spanish/verbos-er-ir": lesson(
    ["Drop « er » or « ir » from the verb: « comer » becomes « com- », « vivir » becomes « viv- ».", "Both take the same endings: « yo como », « tú comes », « ella come », « ellos comen ».", "Only « nosotros » is different: « comemos » but « vivimos »."],
    "Pick the right form: « Nosotros ___ (escribir) »",
    ["« escribir » ends in « ir »: « escrib- ».", "« nosotros » with an « ir » verb takes « -imos »."],
    "escribimos",
  ),
  "spanish/ir-a": lesson(
    ["To talk about plans, use « ir a » and a verb: « Voy a nadar » (I'm going to swim).", "« ir » changes for each person: « voy, vas, va, vamos, van ».", "Time words: « mañana » (tomorrow), « esta noche » (tonight), « la próxima semana » (next week)."],
    "How do you say “We are going to study”?",
    ["We are going: « Vamos ».", "Then « a » and the verb « estudiar »."],
    "Vamos a estudiar.",
  ),
  "spanish/hora-y-frecuencia": lesson(
    ["Ask the time with « ¿Qué hora es? » One o'clock is « Es la una »; other hours use « Son las… »: « Son las tres ».", "« y media » adds half an hour: « Son las cuatro y media » (4:30).", "How often: « siempre » (always), « a veces » (sometimes), « nunca » (never), « todos los días » (every day)."],
    "How do you say “It's 7:30”?",
    ["Seven o'clock: « Son las siete ».", "Add « y media » for half past."],
    "Son las siete y media.",
  ),
  "spanish/compras": lesson(
    ["Ask the price with « ¿Cuánto cuesta? » « caro » is expensive and « barato » is cheap.", "Hundreds: « cien » (100), « doscientos » (200), « quinientos » (500), « mil » (1000).", "Point things out with « este » and « esta » (this), « estos » and « estas » (these)."],
    "Pick the word that fits: « ¿Cuánto cuesta ___ camisa? »",
    ["« camisa » is « la »: feminine.", "One feminine thing: « esta »."],
    "esta",
  ),
  "spanish/medio-ambiente": lesson(
    ["« reciclar » is to recycle, « la basura » is garbage and « el planeta » is the planet.", "« Hay que… » means we have to: « Hay que reciclar ».", "Give an opinion with « Creo que… » (I think that) and ask with « ¿Qué opinas? » (What do you think?)."],
    "What does « Hay que cuidar el planeta » mean?",
    ["« Hay que » means we have to.", "« cuidar » is to take care of."],
    "We have to take care of the planet.",
  ),
};
