import { pick, randInt, sample, shuffle } from "../random";
import type { Question, Visual } from "../types";
import { aName, fill, highlight, match, mistake, multi, tiles } from "./make";

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
