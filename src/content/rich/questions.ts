import { pick, randInt, sample, shuffle } from "../random";
import type { Question, Visual } from "../types";
import { aName, fill, highlight, match, mistake, multi, say, tiles } from "./make";

// ---------- Language ----------

const NOUNS = [
  "The [[rabbit]] hopped across the grass.",
  "A [[turtle]] slept on the warm rock.",
  "My [[cat]] likes the sunny window.",
  "The [[owl]] watched from the tall tree.",
  "A small [[frog]] sat on a lily pad.",
];
const VERBS = [
  "Birds [[sing]] in the morning.",
  "The children [[run]] around the yard.",
  "My sister [[paints]] after school.",
  "The dog [[jumped]] over the log.",
  "We [[walk]] to the library on Fridays.",
];
const ADJECTIVES = [
  "The [[tiny]] puppy slept in a basket.",
  "She wore a [[yellow]] raincoat.",
  "We ate a [[juicy]] peach.",
  "A [[noisy]] bus passed the school.",
  "He climbed the [[steep]] hill.",
];
const ADVERBS = [
  "The turtle walked [[slowly]].",
  "She spoke [[quietly]] in the library.",
  "The team cheered [[loudly]].",
  "He closed the door [[gently]].",
  "We waited [[patiently]] for the bus.",
];

export const wordJobs = (): Question[] => {
  const [kind, prompt, pool, hint] = pick([
    ["noun", "Tap the word that names an animal.", NOUNS, "A noun names a person, place or thing. Which word names an animal?"],
    ["verb", "Tap the verb, the action word.", VERBS, "A verb tells what someone or something does. Which word is the action?"],
    ["adj", "Tap the word that describes something.", ADJECTIVES, "A describing word tells more about a noun, like its size, colour or taste."],
  ] as const);
  void kind;
  return [highlight(prompt, pick(pool), hint)];
};

export const partsOfSpeech = (): Question[] => {
  const [prompt, pool, hint] = pick([
    ["Tap the adverb. It tells how something is done.", ADVERBS, "An adverb tells how, when or where. Many end in -ly."],
    ["Tap the adjective.", ADJECTIVES, "An adjective describes a noun. Which word tells more about the noun?"],
    ["Tap the verb.", VERBS, "A verb is an action word. What is happening in the sentence?"],
  ] as const);
  return [highlight(prompt, pick(pool), hint)];
};

const PAST = [
  "Yesterday, Mia [[painted]] a mural.",
  "We [[baked]] bread this morning.",
  "Last week the class [[visited]] a farm.",
  "The storm [[ended]] before dinner.",
  "Ravi [[carried]] the boxes inside.",
];
export const verbTenses = (): Question[] => [
  highlight("Tap the verb that shows the action already happened.", pick(PAST), "A past tense verb tells about something that already happened. Many end in -ed."),
];

const SENTENCES: string[][] = [
  ["My", "sister", "reads", "books."],
  ["The", "bird", "sings", "softly."],
  ["We", "walk", "to", "school."],
  ["Our", "class", "planted", "seeds."],
  ["The", "dog", "chased", "the", "ball."],
  ["Birds", "build", "nests", "in", "trees."],
];
export const sentenceBuild = (): Question[] => [
  tiles("Put the words in order to make a sentence.", "A sentence starts with a capital letter and ends with a full stop. Try reading it aloud.", pick(SENTENCES), { join: " " }),
];

const WORDS: [string, string][] = [
  ["cat", "🐱"],
  ["dog", "🐶"],
  ["sun", "☀️"],
  ["hat", "🎩"],
  ["pig", "🐷"],
  ["bus", "🚌"],
  ["fox", "🦊"],
  ["bed", "🛏️"],
];
export const buildWord = (): Question[] => {
  const [word, emoji] = pick(WORDS);
  const spare = pick([..."bdfgklmnprstwz"].filter((l) => !word.includes(l)));
  const visual: Visual = { type: "emoji", emoji };
  return [
    {
      ...tiles("Build the word for the picture.", `Say the picture's name slowly. What sound do you hear first? Then next?`, [...word], { join: "", extra: [spare] }),
      speak: "Build the word for the picture. Tap the letters in order.",
      visual,
    },
  ];
};

const PICTURES: [string, string][] = [
  ["cat", "🐱"],
  ["hat", "🎩"],
  ["sun", "☀️"],
  ["bus", "🚌"],
  ["dog", "🐶"],
  ["pig", "🐷"],
];
export const wordPictures = (): Question[] => [
  match(
    "Match each word with its picture.",
    "Sound out each word. Which picture has that name?",
    sample(PICTURES, 3).map(([w, e]) => ({ left: w, right: [w, e], picture: "right" as const })),
  ),
];

// ---------- Science ----------

const LIVING: [string, string][] = [["dog", "🐶"], ["plant", "🌱"], ["bird", "🐦"], ["fish", "🐟"], ["bee", "🐝"], ["tree", "🌳"]];
const NOT_LIVING: [string, string][] = [["rock", "🪨"], ["ball", "⚽"], ["chair", "🪑"], ["bike", "🚲"], ["toy car", "🚗"]];
export const livingThings = (): Question[] => {
  const right = sample(LIVING, randInt(1, 2));
  return [multi("Tap every living thing.", "Living things grow, need food and water, and can have babies. A rock or a ball can't.", right, sample(NOT_LIVING, 4 - right.length))];
};

const BABIES: [string, string, string][] = [
  ["frog", "🐸", "tadpole"],
  ["butterfly", "🦋", "caterpillar"],
  ["hen", "🐔", "chick"],
  ["cow", "🐄", "calf"],
  ["sheep", "🐑", "lamb"],
  ["dog", "🐶", "puppy"],
];
export const babyAnimals = (): Question[] => [
  match(
    "Match each animal with its young.",
    "Think of what each animal is called when it is just born or hatched.",
    sample(BABIES, 4).map(([adult, emoji, baby]) => ({ left: [adult, emoji], right: baby })),
  ),
];

const MAMMALS = ["dog", "whale", "bat", "cow", "dolphin", "rabbit", "bear"];
const NOT_MAMMALS = ["shark", "eagle", "frog", "snake", "trout", "lizard"];
export const mammals = (): Question[] => {
  const right = sample(MAMMALS, randInt(2, 3));
  return [
    multi(
      "Tap every mammal.",
      "Mammals have hair or fur, breathe air with lungs and feed their babies milk. Whales and bats do too!",
      right.map((m) => [m] as [string]),
      sample(NOT_MAMMALS, 5 - right.length).map((m) => [m] as [string]),
    ),
  ];
};

const CHANGES = [
  { word: "Melting", from: "solid", to: "liquid" },
  { word: "Freezing", from: "liquid", to: "solid" },
  { word: "Evaporating", from: "liquid", to: "gas" },
  { word: "Condensing", from: "gas", to: "liquid" },
];
export const phaseChanges = (): Question[] => {
  const c = pick(CHANGES);
  return [fill("Fill in the blanks.", "Think about what the matter is like before and after the change.", `${c.word} changes a ___ into a ___.`, [c.from, c.to], shuffle(["solid", "liquid", "gas", "heat"]))];
};

// ---------- Math ----------

export const timesTableMultiples = (): Question[] => {
  const n = pick([3, 4, 6, 7, 8, 9]);
  const hits = sample(Array.from({ length: 10 }, (_, i) => n * (i + 1)), randInt(2, 3));
  const decoys = shuffle(hits.map((h) => h + pick([-1, 1]))).filter((d) => !hits.includes(d));
  while (decoys.length < 5 - hits.length) {
    const d = n * randInt(1, 10) + pick([-1, 1]);
    if (!hits.includes(d) && !decoys.includes(d) && d > 0) decoys.push(d);
  }
  return [
    multi(
      `Tap every number in the ${n} times table.`,
      `Count by ${n}s: ${[1, 2, 3, 4].map((i) => n * i).join(", ")} … Only numbers you land on are in the ${n} times table.`,
      hits.map((h) => [String(h)] as [string]),
      decoys.slice(0, 5 - hits.length).map((d) => [String(d)] as [string]),
    ),
  ];
};

export const multiplyMistake = (): Question[] => {
  const who = aName();
  const n = randInt(3, 9);
  const m = randInt(6, 9);
  const rest = m - 5;
  // 0: the total is added up wrong. 1: n × 5 is wrong. 2: the other part is wrong. Later steps follow from the
  // earlier ones, so the step with the mistake is the only one that doesn't.
  const kind = randInt(0, 2);
  const five = kind === 1 ? n * 5 + n : n * 5;
  const part = kind === 2 ? n * rest + n : n * rest;
  const total = kind === 0 ? five + part + pick([-10, 10]) : five + part;
  const steps = [`${n} × ${m} = ${n} × 5 + ${n} × ${rest}`, `${n} × 5 = ${five}`, `${n} × ${rest} = ${part}`, `${five} + ${part} = ${total}`];
  const wrong = kind === 0 ? 3 : kind;
  return [mistake(`${who} worked out ${n} × ${m}. Which step has the mistake?`, "Work each step out yourself. Only one step does not follow from the steps before it.", steps, wrong)];
};

export const oneStepMistake = (): Question[] => {
  const who = aName();
  const a = randInt(4, 12);
  const x = randInt(3, 20);
  const b = x + a;
  const addInstead = pick([true, false]);
  const steps = addInstead
    ? [`x + ${a} = ${b}`, `x + ${a} − ${a} = ${b} + ${a}`, `x = ${b + a}`]
    : [`x + ${a} = ${b}`, `x + ${a} − ${a} = ${b} − ${a}`, `x = ${b - a + pick([-1, 1])}`];
  return [mistake(`${who} solved x + ${a} = ${b}. Which step has the mistake?`, "To undo adding a number, take it away from both sides. Check the subtraction too.", steps, addInstead ? 1 : 2)];
};

export const twoStepMistake = (): Question[] => {
  const who = aName();
  const p = randInt(2, 5);
  const a = p * randInt(1, 3);
  const x = randInt(2, 9);
  const b = p * x + a;
  const kind = randInt(0, 2);
  let steps: string[];
  if (kind === 0) {
    steps = [`${p}x + ${a} = ${b}`, `${p}x = ${b} + ${a}`, `${p}x = ${b + a}`, `x = ${b + a} ÷ ${p}`, `x = ${(b + a) / p}`];
  } else if (kind === 1) {
    const off = p * pick([-1, 1]);
    steps = [`${p}x + ${a} = ${b}`, `${p}x = ${b} − ${a}`, `${p}x = ${b - a + off}`, `x = ${b - a + off} ÷ ${p}`, `x = ${x + off / p}`];
  } else {
    steps = [`${p}x + ${a} = ${b}`, `${p}x = ${b} − ${a}`, `${p}x = ${b - a}`, `x = ${b - a} × ${p}`, `x = ${(b - a) * p}`];
  }
  return [mistake(`${who} solved ${p}x + ${a} = ${b}. Which step has the mistake?`, "Undo adding first, then undo multiplying. Work each line out yourself and find the one that doesn't follow.", steps, kind === 0 ? 1 : kind === 1 ? 2 : 3)];
};

export const equivalentFill = (): Question[] => {
  const b = randInt(2, 6);
  const a = randInt(1, b - 1);
  const answers = [String(a * 2), String(a * 3)];
  const decoys = [...new Set([String(a), String(a * 2 + 1), String(a * 3 + 1), String(a + 1)])].filter((d) => !answers.includes(d)).slice(0, 2);
  return [
    fill("Fill in the equivalent fractions.", `Multiply the top and the bottom by the same number. Here the bottom goes from ${b} to ${b * 2}, so the top doubles.`, `${a}/${b} = ___/${b * 2} = ___/${b * 3}`, answers, shuffle([...answers, ...decoys])),
  ];
};

// ---------- Fractions, decimals, percents and the number line ----------

const FRACTION_WORDS: [string, string][] = [
  ["1/2", "one half"],
  ["1/3", "one third"],
  ["1/4", "one quarter"],
  ["2/3", "two thirds"],
  ["3/4", "three quarters"],
];
export const fractionWords = (): Question[] => [
  match(
    "Match each fraction with its name.",
    "The bottom number says how many equal parts. The top number says how many you have.",
    sample(FRACTION_WORDS, 4).map(([f, w]) => ({ left: f, right: w })),
  ),
];

/** Tap every fraction equal to a/b. Wrong choices are checked so none is secretly equal. */
export const equalFractions = (): Question[] => {
  const b = randInt(2, 5);
  const a = randInt(1, b - 1);
  const ks = sample([2, 3, 4], 2);
  const right = ks.map((k) => `${a * k}/${b * k}`);
  const candidates = [`${a + 1}/${b + 1}`, `${a * 2}/${b * 3}`, `${a}/${b + 1}`, `${a + 1}/${b * 2}`, `${a * 3}/${b * 2}`];
  const wrong = candidates.filter((f) => {
    const [x, y] = f.split("/").map(Number);
    return x * b !== y * a && x < y;
  });
  return [
    multi(
      `Tap every fraction equal to ${a}/${b}.`,
      `Equal fractions have the same value. Multiply the top and the bottom of ${a}/${b} by the same number to make one.`,
      right.map((f) => [f] as [string]),
      sample(wrong, Math.min(2, wrong.length)).map((f) => [f] as [string]),
    ),
  ];
};

const DECIMAL_FRACTIONS: [string, string][] = [
  ["0.1", "1/10"],
  ["0.2", "1/5"],
  ["0.25", "1/4"],
  ["0.5", "1/2"],
  ["0.75", "3/4"],
];
export const decimalFractions = (): Question[] => [
  match(
    "Match each decimal with its fraction.",
    "Think of tenths and hundredths. 0.5 is 5 tenths, which is the same as one half.",
    sample(DECIMAL_FRACTIONS, 4).map(([d, f]) => ({ left: d, right: f })),
  ),
];

/** Tap every decimal greater than a benchmark. */
export const biggerDecimals = (): Question[] => {
  const right = sample(["0.6", "0.75", "0.8", "0.9", "0.55"], 2);
  const wrong = sample(["0.45", "0.09", "0.35", "0.05", "0.4", "0.5"], 3);
  return [
    multi(
      "Tap every decimal greater than 0.5.",
      "Line the decimals up by place value. Compare the tenths first.",
      right.map((d) => [d] as [string]),
      wrong.map((d) => [d] as [string]),
    ),
  ];
};

const PERCENT_FRACTIONS: [string, string][] = [
  ["50%", "1/2"],
  ["25%", "1/4"],
  ["75%", "3/4"],
  ["10%", "1/10"],
  ["20%", "1/5"],
  ["40%", "2/5"],
];
export const percentFractions = (): Question[] => [
  match(
    "Match each percent with its fraction.",
    "A percent is a fraction out of 100. Write each fraction out of 100 to compare.",
    sample(PERCENT_FRACTIONS, 4).map(([p, f]) => ({ left: p, right: f })),
  ),
];

export const mixedNumberMistake = (): Question[] => {
  const who = aName();
  const d = randInt(3, 9);
  const w = randInt(1, 5);
  const r = randInt(1, d - 2);
  const n = d * w + r;
  const flip = pick([true, false]);
  const steps = flip
    ? [`${n} ÷ ${d} = ${w} remainder ${r}`, `The whole number is ${w}`, `The fraction part is ${d}/${r}`, `${n}/${d} = ${w} ${d}/${r}`]
    : [`${n} ÷ ${d} = ${w} remainder ${r + 1}`, `The whole number is ${w}`, `The fraction part is ${r + 1}/${d}`, `${n}/${d} = ${w} ${r + 1}/${d}`];
  return [
    mistake(
      `${who} wrote ${n}/${d} as a mixed number. Which step has the mistake?`,
      "Divide the top by the bottom. The remainder goes over the bottom number. Check each line yourself.",
      steps,
      flip ? 2 : 0,
    ),
  ];
};

const FRACTION_DECIMALS: [string, string][] = [
  ["1/8", "0.125"],
  ["3/8", "0.375"],
  ["1/5", "0.2"],
  ["3/5", "0.6"],
  ["1/20", "0.05"],
  ["3/20", "0.15"],
];
export const fractionDecimals = (): Question[] => [
  match(
    "Match each fraction with its decimal.",
    "Divide the top by the bottom, or make the bottom 10, 100 or 1000 and read the decimal.",
    sample(FRACTION_DECIMALS, 4).map(([f, d]) => ({ left: f, right: d })),
  ),
];

/** Adding a positive number to a negative one on a number line: one step goes the wrong way, or the sum is off. */
export const integerLineMistake = (): Question[] => {
  const who = aName();
  const a = randInt(3, 9);
  const b = a + randInt(2, 9);
  const wrongWay = pick([true, false]);
  const steps = wrongWay
    ? [`Start at −${a} on the number line`, `Move ${b} steps to the left`, `−${a} + ${b} = −${a + b}`]
    : [`Start at −${a} on the number line`, `Move ${b} steps to the right`, `−${a} + ${b} = ${b + a}`];
  return [
    mistake(
      `${who} worked out −${a} + ${b} on a number line. Which step has the mistake?`,
      "Adding a positive number moves right. Count the steps from the start yourself to check the answer.",
      steps,
      wrongWay ? 1 : 2,
    ),
  ];
};

// ---------- Say it out loud (voice practice; plain tap questions where voice is off) ----------

const PICTURE_WORDS: [string, string][] = [
  ["cat", "🐱"], ["dog", "🐶"], ["sun", "☀️"], ["ball", "⚽"], ["fish", "🐟"], ["bus", "🚌"], ["hat", "🎩"], ["pig", "🐷"], ["cow", "🐄"], ["duck", "🦆"],
];

/** Name the picture: `startsWith` ones begin with a sound the hint names. */
export const sayPicture = (): Question[] => {
  const [target, ...rest] = sample(PICTURE_WORDS, 3);
  return [
    say(
      "What is this? Say it out loud, or tap it.",
      `Say it slowly. It starts with the sound “${target[0][0]}”.`,
      { word: target[0] },
      [target, ...rest].map(([w, e]) => ({ label: w, emoji: e })),
      0,
      { type: "emoji", emoji: target[1] },
    ),
  ];
};

/** Count the stars out loud, from 1 up to n. */
export const sayCount = (low: number, high: number) => (): Question[] => {
  const n = randInt(low, high);
  const nearby = [...new Set([n - 1, n + 1, n + 2, n - 2].filter((x) => x >= 1 && x !== n))].slice(0, 2);
  return [
    say(
      "Count the stars out loud, or tap how many.",
      `Point to each star and count: ${Array.from({ length: Math.min(n, 5) }, (_, i) => i + 1).join(", ")}${n > 5 ? " …" : ""}`,
      { count: n },
      [n, ...nearby].map((x) => ({ label: String(x) })),
      0,
      { type: "dots", count: n, emoji: "⭐" },
    ),
  ];
};
