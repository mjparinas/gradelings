import { esOrder, esQuestions, spanishBigIdeas, spanishStandards, wordItems, type EsItem, type Word } from "../../spanish";
import { randInt as int, shuffle } from "../../random";
import type { Course, GenerateOptions, Question } from "../../types";

// Spanish, Grade 4: the body, school, the calendar, weather and clothes. Prompts are English; the Spanish in « » is what
// children learn (see ../../spanish).

// ---------- El cuerpo ----------

const BODY: Word[] = [
  ["👁️", "el ojo", "eye"],
  ["👂", "la oreja", "ear"],
  ["👃", "la nariz", "nose"],
  ["👄", "la boca", "mouth"],
  ["✋", "la mano", "hand"],
  ["🦶", "el pie", "foot"],
  ["🦵", "la pierna", "leg"],
  ["💪", "el brazo", "arm"],
  ["🦷", "el diente", "tooth"],
  ["💇", "el pelo", "hair"],
];

const BODY_USES: EsItem[] = [
  ["You see with your…", "ojos", ["orejas", "manos", "pies"], "You see with your eyes: «los ojos»."],
  ["You hear with your…", "orejas", ["ojos", "pies", "dientes"], "You hear with your ears: «las orejas»."],
  ["You smell with your…", "nariz", ["boca", "mano", "pierna"], "You smell with your nose: «la nariz»."],
  ["You walk with your…", "pies", ["orejas", "dientes", "ojos"], "You walk with your feet: «los pies»."],
  ["You clap with your…", "manos", ["pies", "orejas", "ojos"], "You clap with your hands: «las manos»."],
  ["You brush your…", "dientes", ["pies", "orejas", "brazos"], "You brush your teeth: «los dientes»."],
];

// ---------- En la escuela ----------

const SCHOOL: Word[] = [
  ["✏️", "el lápiz", "pencil"],
  ["📕", "el libro", "book"],
  ["📓", "el cuaderno", "notebook"],
  ["🎒", "la mochila", "backpack"],
  ["✂️", "las tijeras", "scissors"],
  ["📏", "la regla", "ruler"],
  ["🖍️", "el crayón", "crayon"],
  ["🪑", "la silla", "chair"],
  ["🖊️", "el bolígrafo", "pen"],
  ["💻", "la computadora", "computer"],
];

const COMMANDS: EsItem[] = [
  ["What does «Escuchen» mean?", "Listen.", ["Sit down.", "Open your books.", "Raise your hand."], "Your teacher says it before reading a story out loud."],
  ["What does «Siéntense» mean?", "Sit down.", ["Listen.", "Stand up.", "Close your books."], "You do it at your desk, on your chair."],
  ["What does «Levántense» mean?", "Stand up.", ["Sit down.", "Listen.", "Raise your hand."], "It is the opposite of «Siéntense»."],
  ["What does «Abran los libros» mean?", "Open your books.", ["Close your books.", "Listen.", "Sit down."], "«los libros» are books. «Abran» is open."],
  ["What does «Cierren los libros» mean?", "Close your books.", ["Open your books.", "Stand up.", "Raise your hand."], "«Cierren» is close, the opposite of «Abran»."],
  ["What does «Levanten la mano» mean?", "Raise your hand.", ["Close your books.", "Sit down.", "Listen."], "«la mano» is your hand."],
  ["How does a teacher ask the class to listen?", "Escuchen.", ["Siéntense.", "Levántense.", "Cierren los libros."], "«Escuchen» means listen."],
  ["How does a teacher ask the class to sit down?", "Siéntense.", ["Escuchen.", "Levántense.", "Abran los libros."], "«Siéntense» means sit down."],
];

// ---------- Los días y los meses ----------

const DAYS = ["lunes", "martes", "miércoles", "jueves", "viernes", "sábado", "domingo"];
const DAYS_EN = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
const MONTHS = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
const MONTHS_EN = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const others = (list: string[], i: number) => list.filter((_, j) => j !== i);

const CALENDAR: EsItem[] = [
  ...DAYS.flatMap((d, i): EsItem[] => [
    [`What does «${d}» mean?`, DAYS_EN[i], others(DAYS_EN, i), "In Spanish the week starts on «lunes», Monday."],
    [`How do you say “${DAYS_EN[i]}” in Spanish?`, d, others(DAYS, i), "Count from «lunes», Monday."],
    [`Which day comes after «${d}»?`, DAYS[(i + 1) % 7], others(DAYS, (i + 1) % 7), "Say the days in order: «lunes, martes, miércoles, jueves, viernes, sábado, domingo»."],
  ]),
  ...MONTHS.flatMap((m, i): EsItem[] => [
    [`What does «${m}» mean?`, MONTHS_EN[i], others(MONTHS_EN, i), "Many Spanish months sound like the English ones."],
    [`How do you say “${MONTHS_EN[i]}” in Spanish?`, m, others(MONTHS, i), "Many Spanish months sound like the English ones."],
  ]),
];

function calendar(opts?: GenerateOptions): Question[] {
  const start = int(0, 3);
  const days = DAYS.slice(start, start + 4);
  const m = int(0, 8);
  const months = MONTHS.slice(m, m + 4);
  const order = [
    esOrder("Put the days in order.", "Say the days in order: «lunes, martes, miércoles, jueves, viernes, sábado, domingo».", days),
    esOrder("Put the months in order.", "Say the months in order, starting with «enero».", months),
  ];
  return shuffle([...esQuestions(CALENDAR, opts, 7), order[int(0, 1)]]);
}

// ---------- El tiempo ----------

const WEATHER: [emoji: string, es: string, en: string, wrong: string[]][] = [
  ["☀️", "Hace sol.", "It's sunny.", ["Llueve.", "Nieva.", "Está nublado."]],
  ["🌧️", "Llueve.", "It's raining.", ["Hace sol.", "Nieva.", "Hace calor."]],
  ["🌨️", "Nieva.", "It's snowing.", ["Hace calor.", "Hace sol.", "Llueve."]],
  ["💨", "Hace viento.", "It's windy.", ["Hace sol.", "Nieva.", "Hace calor."]],
  ["🥵", "Hace calor.", "It's hot.", ["Hace frío.", "Nieva.", "Llueve."]],
  ["🥶", "Hace frío.", "It's cold.", ["Hace calor.", "Hace sol.", "Llueve."]],
  ["☁️", "Está nublado.", "It's cloudy.", ["Hace sol.", "Hace calor.", "Nieva."]],
  ["⛈️", "Hay tormenta.", "There's a storm.", ["Hace sol.", "Nieva.", "Hace calor."]],
];

const SEASONS: [string, string][] = [
  ["la primavera", "spring"],
  ["el verano", "summer"],
  ["el otoño", "fall"],
  ["el invierno", "winter"],
];

const WEATHER_ITEMS: EsItem[] = [
  ...WEATHER.flatMap(([emoji, es, en, wrong]): EsItem[] => [
    ["«¿Qué tiempo hace?» Look at the picture. Which answer fits?", es, wrong, `The picture shows: ${en.toLowerCase()}`, emoji],
    [`What does «${es}» mean?`, en, wrong.map((w) => WEATHER.find((x) => x[1] === w)![2]), "«Hace» is used for sun, heat, cold and wind; «Llueve» and «Nieva» are the rain and snow."],
    [`How do you say “${en}” in Spanish?`, es, wrong, "«Hace» is used for sun, heat, cold and wind; «Llueve» and «Nieva» are the rain and snow."],
  ]),
  ...SEASONS.flatMap(([es, en], i): EsItem[] => [
    [`What does «${es}» mean?`, en, SEASONS.filter((_, j) => j !== i).map((s) => s[1]), "«el verano» is the warmest season, «el invierno» the coldest."],
    [`How do you say “${en}” in Spanish?`, es, SEASONS.filter((_, j) => j !== i).map((s) => s[0]), "«el verano» is the warmest season, «el invierno» the coldest."],
  ]),
];

// ---------- La ropa ----------

const CLOTHES: Word[] = [
  ["👕", "la camiseta", "T-shirt"],
  ["👖", "los pantalones", "pants"],
  ["👗", "el vestido", "dress"],
  ["🧥", "el abrigo", "coat"],
  ["🧢", "la gorra", "cap"],
  ["👞", "los zapatos", "shoes"],
  ["🧦", "los calcetines", "socks"],
  ["🧤", "los guantes", "gloves"],
  ["🧣", "la bufanda", "scarf"],
  ["🩳", "los pantalones cortos", "shorts"],
];

const DRESSING: EsItem[] = [
  ["«Hace calor.» Which of these do you wear?", "los pantalones cortos", ["el abrigo", "la bufanda", "los guantes"], "«Hace calor» means it's hot. Pick something cool."],
  ["«Nieva.» Which of these keeps your hands warm?", "los guantes", ["la camiseta", "los pantalones cortos", "la gorra"], "Gloves keep your hands warm: «los guantes»."],
  ["«Hace frío.» Which of these keeps your neck warm?", "la bufanda", ["los pantalones cortos", "la camiseta", "los zapatos"], "A scarf goes around your neck: «la bufanda»."],
  ["Which of these do you wear on your feet?", "los calcetines", ["la gorra", "la bufanda", "la camiseta"], "Socks go on your feet: «los calcetines»."],
];

export const course: Course = {
  grade: "4",
  subject: "spanish",
  ...spanishBigIdeas("4"),
  units: [
    {
      id: "cuerpo",
      title: "My body",
      emoji: "✋",
      blurb: "La mano, el pie, la boca",
      parentNote: "Words for parts of the body, and what we do with them.",
      ...spanishStandards("4", { wrs: ["Interpretive Communication", "Making Connections"], text: "naming parts of the body", ab: ["A-1", "LC-1"] }),
      generate: (o) => esQuestions([...wordItems(BODY), ...BODY_USES], o),
    },
    {
      id: "escuela",
      title: "At school",
      emoji: "🎒",
      blurb: "El lápiz, el libro, ¡escuchen!",
      parentNote: "Classroom things like pencils and backpacks, and the instructions a Spanish teacher gives the class.",
      ...spanishStandards("4", { wrs: ["Interpretive Communication", "School and Global Communities"], text: "classroom objects and following classroom instructions", ab: ["A-3", "LC-1"] }),
      generate: (o) => esQuestions([...wordItems(SCHOOL), ...COMMANDS], o),
    },
    {
      id: "dias-y-meses",
      title: "Days and months",
      emoji: "📅",
      blurb: "Lunes, martes, enero…",
      parentNote: "The days of the week and the months of the year, in order. In Spanish they start with a small letter, and the week starts on Monday.",
      ...spanishStandards("4", { wrs: ["Interpretive Communication", "Cultural Comparisons"], text: "the days of the week and the months of the year", ab: ["A-1", "LC-1"] }),
      generate: calendar,
    },
    {
      id: "tiempo",
      title: "Weather and seasons",
      emoji: "🌦️",
      blurb: "¿Qué tiempo hace?",
      parentNote: "Saying what the weather is like (hace sol, llueve, nieva) and naming the four seasons.",
      ...spanishStandards("4", { wrs: ["Interpersonal Communication", "Interpretive Communication"], text: "describing the weather and naming the seasons", ab: ["A-1", "LC-1"] }),
      generate: (o) => esQuestions(WEATHER_ITEMS, o),
    },
    {
      id: "ropa",
      title: "Clothes",
      emoji: "🧣",
      blurb: "La camiseta, el abrigo…",
      parentNote: "Clothes for every season, and choosing what to wear for the weather.",
      ...spanishStandards("4", { wrs: ["Interpretive Communication", "Making Connections"], text: "naming clothes and choosing them for the weather", ab: ["A-1", "LC-1"] }),
      generate: (o) => esQuestions([...wordItems(CLOTHES), ...DRESSING], o),
    },
  ],
};
