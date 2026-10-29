import { pick, randInt, sample, shuffle, textChoice } from "../../random";
import { sortQuestion, type SortSet } from "../../bank";
import type { Choice, ChoiceQuestion, Course, GenerateOptions, Question, ShapeName } from "../../types";

// Pre-K math, for four-year-olds who don't read yet. Every question is read aloud and answered by tapping a picture,
// a shape or one number, with at most 3 choices (the Pre-K fairness checks enforce it). The units are shared by every
// province and state that offers Pre-K; each one adds its own early-learning standards (see ../../prek.ts).

type Level = NonNullable<GenerateOptions["difficulty"]>;

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

/** A pick-the-number question: 3 numbers close to the answer, never below 0 or above `max`. */
function numberPick(prompt: string, answer: number, hint: string, max: number, extra: Partial<ChoiceQuestion> = {}): ChoiceQuestion {
  const near = shuffle([1, -1, 2, -2, 3, -3])
    .map((o) => answer + o)
    .filter((n) => n >= 0 && n <= max);
  const wrong = near.slice(0, 2);
  return {
    kind: "choice",
    prompt,
    hint,
    answer: String(answer),
    choices: shuffle([answer, ...wrong]).map((n) => ({ id: String(n), label: String(n), speak: NUMBER_WORDS[n] })),
    ...extra,
  };
}

interface Thing {
  emoji: string;
  /** Plural, as read aloud. */
  name: string;
}

const THINGS: Thing[] = [
  { emoji: "🍎", name: "apples" },
  { emoji: "🐟", name: "fish" },
  { emoji: "⭐", name: "stars" },
  { emoji: "🐞", name: "ladybugs" },
  { emoji: "🌸", name: "flowers" },
  { emoji: "🚗", name: "cars" },
  { emoji: "🐥", name: "chicks" },
  { emoji: "🍓", name: "strawberries" },
  { emoji: "🎈", name: "balloons" },
  { emoji: "🦆", name: "ducks" },
  { emoji: "🍪", name: "cookies" },
  { emoji: "🐸", name: "frogs" },
  { emoji: "🦋", name: "butterflies" },
  { emoji: "🧦", name: "socks" },
  { emoji: "🐢", name: "turtles" },
  { emoji: "🍌", name: "bananas" },
];

/** The biggest number counted at each difficulty. */
const COUNT_MAX: Record<Level, number> = { 1: 5, 2: 7, 3: 10 };

// ---------- Count to 5 (and on to 10) ----------

function howMany(max: number): Question {
  const t = pick(THINGS);
  const n = randInt(1, max);
  return numberPick(`How many ${t.emoji}?`, n, "Touch each one and count. The last number you say is how many!", max, {
    speak: `How many ${t.name}?`,
    visual: { type: "dots", count: n, emoji: t.emoji },
  });
}

function frame(max: number): Question {
  const n = randInt(1, max);
  return numberPick("How many dots?", n, n > 5 ? "The top row has 5. Count on from 5!" : "Point to each dot as you count.", max, {
    visual: { type: "tenFrame", filled: n },
  });
}

function whatComesNext(max: number): Question {
  const start = randInt(1, Math.max(1, max - 3));
  const seq = [start, start + 1, start + 2];
  const answer = start + 3;
  return numberPick("What number comes next?", answer, `Say the numbers out loud: ${seq.join(", ")}, …`, max, {
    speak: `${seq.map((n) => NUMBER_WORDS[n]).join(", ")}. What number comes next?`,
    visual: { type: "equation", text: `${seq.join(", ")}, ☐` },
  });
}

function countToFive({ difficulty = 2 }: GenerateOptions = {}): Question[] {
  const max = COUNT_MAX[difficulty];
  return shuffle([howMany(max), howMany(max), howMany(max), howMany(max), frame(max), frame(max), whatComesNext(max), whatComesNext(max)]);
}

// ---------- Find the Number ----------

/** Numbers children mix up, for the stretch level: 6 and 9, 2 and 5, 1 and 7, 3 and 8. */
const LOOKALIKES: [number, number][] = [
  [6, 9],
  [2, 5],
  [1, 7],
  [3, 8],
];

function findNumber(difficulty: Level): Question {
  if (difficulty === 3 && pick([true, false])) {
    const [a, b] = pick(LOOKALIKES);
    const answer = pick([a, b]);
    const other = answer === a ? b : a;
    const third = pick([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter((n) => n !== a && n !== b));
    return {
      kind: "choice",
      prompt: `Find the number ${answer}.`,
      speak: `Find the number ${NUMBER_WORDS[answer]}.`,
      hint: answer === 6 || answer === 9 ? "6 has its loop at the bottom. 9 has its loop at the top." : `Look closely at the shape of ${answer}.`,
      answer: String(answer),
      choices: shuffle([answer, other, third]).map((n) => ({ id: String(n), label: String(n), speak: NUMBER_WORDS[n] })),
    };
  }
  const max = difficulty === 1 ? 5 : 10;
  const answer = randInt(1, max);
  const wrong = sample(Array.from({ length: max + 1 }, (_, n) => n).filter((n) => n !== answer && n > 0), 2);
  return {
    kind: "choice",
    prompt: `Find the number ${answer}.`,
    speak: `Find the number ${NUMBER_WORDS[answer]}.`,
    hint: `Say each number. Which one is ${NUMBER_WORDS[answer]}?`,
    answer: String(answer),
    choices: shuffle([answer, ...wrong]).map((n) => ({ id: String(n), label: String(n), speak: NUMBER_WORDS[n] })),
  };
}

/** A number shown, then the group that has that many. */
function matchGroup(difficulty: Level): Question {
  const max = difficulty === 1 ? 4 : 5;
  const answer = randInt(1, max);
  const t = pick(THINGS);
  const wrong = sample(
    [1, 2, 3, 4, 5].filter((n) => n !== answer && n <= max + 1),
    2,
  );
  const group = (n: number): Omit<Choice, "id"> => ({ label: String(n), emoji: t.emoji.repeat(n), speak: `${NUMBER_WORDS[n]} ${t.name}` });
  return textChoice(
    `Which group has ${answer} ${t.emoji}?`,
    group(answer),
    wrong.map(group),
    `Count each group. Find the one with ${NUMBER_WORDS[answer]}.`,
    { type: "letter", text: String(answer) },
  );
}

function findTheNumber({ difficulty = 2 }: GenerateOptions = {}): Question[] {
  return shuffle([...Array.from({ length: 5 }, () => findNumber(difficulty)), ...Array.from({ length: 3 }, () => matchGroup(difficulty))]);
}

// ---------- More or Fewer ----------

interface Pair {
  a: Thing & { one: string };
  b: Thing & { one: string };
}

const PAIRS: Pair[] = [
  { a: { emoji: "🐱", name: "cats", one: "cat" }, b: { emoji: "🐶", name: "dogs", one: "dog" } },
  { a: { emoji: "🍎", name: "apples", one: "apple" }, b: { emoji: "🍌", name: "bananas", one: "banana" } },
  { a: { emoji: "🚗", name: "cars", one: "car" }, b: { emoji: "🚌", name: "buses", one: "bus" } },
  { a: { emoji: "🐟", name: "fish", one: "fish" }, b: { emoji: "🐢", name: "turtles", one: "turtle" } },
  { a: { emoji: "⭐", name: "stars", one: "star" }, b: { emoji: "🌙", name: "moons", one: "moon" } },
  { a: { emoji: "🦆", name: "ducks", one: "duck" }, b: { emoji: "🐸", name: "frogs", one: "frog" } },
  { a: { emoji: "🌸", name: "flowers", one: "flower" }, b: { emoji: "🐝", name: "bees", one: "bee" } },
  { a: { emoji: "🧁", name: "cupcakes", one: "cupcake" }, b: { emoji: "🍪", name: "cookies", one: "cookie" } },
];

function moreOrFewer(difficulty: Level): Question {
  const { a, b } = pick(PAIRS);
  const max = difficulty === 1 ? 5 : difficulty === 2 ? 7 : 9;
  const gap = difficulty === 1 ? randInt(2, 3) : difficulty === 2 ? randInt(1, 2) : 1;
  const big = randInt(gap + 1, max);
  const small = big - gap;
  const aMore = pick([true, false]);
  const [na, nb] = aMore ? [big, small] : [small, big];
  const askFewer = difficulty > 1 && pick([true, false]);
  const winner = askFewer ? (aMore ? b : a) : aMore ? a : b;
  const loser = winner === a ? b : a;
  return textChoice(
    askFewer ? "Which has fewer?" : "Which has more?",
    { label: winner.name, emoji: winner.emoji },
    [{ label: loser.name, emoji: loser.emoji }],
    askFewer ? "Match them up, one to one. The group that runs out first has fewer." : "Match them up, one to one. The group with some left over has more.",
    {
      type: "pictograph",
      title: askFewer ? "Which has fewer?" : "Which has more?",
      rows: [
        { label: a.name, emoji: a.emoji, count: na },
        { label: b.name, emoji: b.emoji, count: nb },
      ],
    },
  );
}

function sameOrNot(): Question {
  const { a, b } = pick(PAIRS);
  const n = randInt(2, 5);
  const same = pick([true, false]);
  const nb = same ? n : n + pick([1, 2]);
  const rows = [
    { label: a.name, emoji: a.emoji, count: n },
    { label: b.name, emoji: b.emoji, count: nb },
  ];
  return textChoice(
    "Are they the same?",
    same ? { label: "the same", emoji: "🟰" } : { label: "not the same", emoji: "❌" },
    [same ? { label: "not the same", emoji: "❌" } : { label: "the same", emoji: "🟰" }],
    "Match each one to a partner. If none are left over, they are the same.",
    { type: "pictograph", title: "Same or not?", rows },
  );
}

/** Which number is bigger, said out loud. */
function biggerNumber(difficulty: Level): Question {
  const max = difficulty === 3 ? 10 : 5;
  const x = randInt(1, max - 1);
  const y = randInt(x + 1, max);
  return {
    kind: "choice",
    prompt: "Which number is bigger?",
    hint: "Count up from 1. The number you say later is bigger.",
    answer: String(y),
    choices: shuffle([x, y]).map((n) => ({ id: String(n), label: String(n), speak: NUMBER_WORDS[n] })),
  };
}

function moreFewer({ difficulty = 2 }: GenerateOptions = {}): Question[] {
  const qs = [moreOrFewer(difficulty), moreOrFewer(difficulty), moreOrFewer(difficulty), moreOrFewer(difficulty), sameOrNot(), sameOrNot()];
  if (difficulty > 1) qs.push(biggerNumber(difficulty), biggerNumber(difficulty));
  else qs.push(moreOrFewer(difficulty), sameOrNot());
  return shuffle(qs);
}

// ---------- Shapes ----------

const SHAPE_NAMES: Record<string, string> = { circle: "circle", square: "square", triangle: "triangle", rectangle: "rectangle", oval: "oval", hexagon: "hexagon" };
const FIRST_SHAPES: ShapeName[] = ["circle", "square", "triangle", "rectangle"];
const MORE_SHAPES: ShapeName[] = [...FIRST_SHAPES, "oval", "hexagon"];

const SHAPE_HINT: Record<string, string> = {
  circle: "A circle is round, with no corners.",
  square: "A square has 4 sides, all the same length.",
  triangle: "A triangle has 3 sides and 3 corners.",
  rectangle: "A rectangle has 4 sides: 2 long and 2 short.",
  oval: "An oval is round like an egg, longer one way.",
  hexagon: "A hexagon has 6 sides, like a honeycomb cell.",
};

function findShape(difficulty: Level): Question {
  const pool = difficulty === 3 ? MORE_SHAPES : FIRST_SHAPES;
  const [answer, ...wrong] = sample(pool, 3);
  const shape = (s: ShapeName): Omit<Choice, "id"> => ({ label: SHAPE_NAMES[s], shape: s });
  return textChoice(`Find the ${SHAPE_NAMES[answer]}.`, shape(answer), wrong.map(shape), SHAPE_HINT[answer]);
}

const CORNERS: { prompt: string; answer: ShapeName; hint: string }[] = [
  { prompt: "Which shape is round?", answer: "circle", hint: "Look for the shape with no corners and no straight sides." },
  { prompt: "Which shape has 3 sides?", answer: "triangle", hint: "Count the sides on each shape: 1, 2, 3." },
  { prompt: "Which shape has 3 corners?", answer: "triangle", hint: "Touch each corner as you count." },
  { prompt: "Which shape has no corners?", answer: "circle", hint: "A circle is round all the way around." },
];

function shapeFacts(): Question {
  const q = pick(CORNERS);
  const wrong = sample(
    (["square", "rectangle", ...(q.answer === "circle" ? ["triangle"] : ["circle"])] as ShapeName[]).filter((s) => s !== q.answer),
    2,
  );
  return textChoice(q.prompt, { label: SHAPE_NAMES[q.answer], shape: q.answer }, wrong.map((s) => ({ label: SHAPE_NAMES[s], shape: s })), q.hint);
}

/** Everyday things and the shape they look like. */
const SHAPE_THINGS: { emoji: string; name: string; shape: ShapeName }[] = [
  { emoji: "🍪", name: "a cookie", shape: "circle" },
  { emoji: "🍩", name: "a doughnut", shape: "circle" },
  { emoji: "🕒", name: "a clock", shape: "circle" },
  { emoji: "⚽", name: "a ball", shape: "circle" },
  { emoji: "🍕", name: "a slice of pizza", shape: "triangle" },
  { emoji: "⛺", name: "a tent", shape: "triangle" },
  { emoji: "🔺", name: "a sign", shape: "triangle" },
  { emoji: "🚪", name: "a door", shape: "rectangle" },
  { emoji: "📱", name: "a phone", shape: "rectangle" },
  { emoji: "📕", name: "a book", shape: "rectangle" },
  { emoji: "🧇", name: "a waffle", shape: "square" },
  { emoji: "🎁", name: "a present", shape: "square" },
  { emoji: "🔲", name: "a tile", shape: "square" },
  { emoji: "🥚", name: "an egg", shape: "oval" },
];

function shapeAround(difficulty: Level): Question {
  const thing = pick(SHAPE_THINGS.filter((t) => difficulty === 3 || t.shape !== "oval"));
  const others = (difficulty === 3 ? MORE_SHAPES : FIRST_SHAPES).filter((s) => s !== thing.shape && !(thing.shape === "square" && s === "rectangle") && !(thing.shape === "rectangle" && s === "square"));
  const wrong = sample(others, 2);
  return textChoice(
    `What shape is ${thing.name}?`,
    { label: SHAPE_NAMES[thing.shape], shape: thing.shape },
    wrong.map((s) => ({ label: SHAPE_NAMES[s], shape: s })),
    SHAPE_HINT[thing.shape],
    { type: "emoji", emoji: thing.emoji },
  );
}

function shapes({ difficulty = 2 }: GenerateOptions = {}): Question[] {
  return shuffle([findShape(difficulty), findShape(difficulty), findShape(difficulty), shapeFacts(), shapeFacts(), shapeAround(difficulty), shapeAround(difficulty), shapeAround(difficulty)]);
}

// ---------- Patterns ----------

/** Pictures that make patterns, three to a set, each with the word read aloud. */
const PATTERN_SETS: [emoji: string, name: string][][] = [
  [["🔴", "red"], ["🔵", "blue"], ["🟡", "yellow"]],
  [["🍎", "apple"], ["🍌", "banana"], ["🍇", "grapes"]],
  [["🐶", "dog"], ["🐱", "cat"], ["🐭", "mouse"]],
  [["⭐", "star"], ["🌙", "moon"], ["☀️", "sun"]],
  [["🟥", "red"], ["🟩", "green"], ["🟦", "blue"]],
  [["🌸", "flower"], ["🍃", "leaf"], ["🌼", "daisy"]],
  [["🚗", "car"], ["🚌", "bus"], ["🚲", "bike"]],
  [["🐟", "fish"], ["🐢", "turtle"], ["🐙", "octopus"]],
  [["🧁", "cupcake"], ["🍪", "cookie"], ["🍩", "doughnut"]],
  [["👏", "clap"], ["👣", "stomp"], ["👋", "wave"]],
];

/** The repeating parts for each difficulty: AB first, then AAB and ABB, then ABC. */
const CORES: Record<Level, number[][]> = {
  1: [[0, 1]],
  2: [
    [0, 1],
    [0, 0, 1],
    [0, 1, 1],
  ],
  3: [
    [0, 0, 1],
    [0, 1, 1],
    [0, 1, 2],
  ],
};

function pattern(difficulty: Level): Question {
  const set = shuffle(pick(PATTERN_SETS));
  const core = pick(CORES[difficulty]);
  const length = core.length * 2 + randInt(0, core.length - 1);
  const items = Array.from({ length }, (_, i) => set[core[i % core.length]]);
  const answer = set[core[length % core.length]];
  return {
    kind: "choice",
    prompt: "What comes next?",
    speak: `${items.map(([, name]) => name).join(", ")}. What comes next?`,
    hint: `Say the pattern out loud: ${items
      .slice(0, core.length)
      .map(([, name]) => name)
      .join(", ")}, then again.`,
    visual: { type: "emojiRow", items: items.map(([emoji]) => emoji), showBlank: true },
    answer: answer[0],
    choices: shuffle(set).map(([emoji, name]) => ({ id: emoji, label: name, emoji })),
  };
}

function patterns({ difficulty = 2 }: GenerateOptions = {}): Question[] {
  return Array.from({ length: 8 }, () => pattern(difficulty));
}

// ---------- Big and Small ----------

interface Compare {
  bigger: { emoji: string; name: string };
  smaller: { emoji: string; name: string };
  /** The measuring word: big, tall, long or heavy. */
  word: "big" | "tall" | "long" | "heavy";
}

const COMPARES: Compare[] = [
  { bigger: { emoji: "🐘", name: "elephant" }, smaller: { emoji: "🐭", name: "mouse" }, word: "big" },
  { bigger: { emoji: "🐋", name: "whale" }, smaller: { emoji: "🐟", name: "fish" }, word: "big" },
  { bigger: { emoji: "🏠", name: "house" }, smaller: { emoji: "🐜", name: "ant" }, word: "big" },
  { bigger: { emoji: "🐻", name: "bear" }, smaller: { emoji: "🐰", name: "rabbit" }, word: "big" },
  { bigger: { emoji: "🚌", name: "bus" }, smaller: { emoji: "🚲", name: "bike" }, word: "big" },
  { bigger: { emoji: "🍉", name: "watermelon" }, smaller: { emoji: "🍒", name: "cherry" }, word: "big" },
  { bigger: { emoji: "🦒", name: "giraffe" }, smaller: { emoji: "🦆", name: "duck" }, word: "tall" },
  { bigger: { emoji: "🌳", name: "tree" }, smaller: { emoji: "🌷", name: "tulip" }, word: "tall" },
  { bigger: { emoji: "🏢", name: "tall building" }, smaller: { emoji: "🏠", name: "house" }, word: "tall" },
  { bigger: { emoji: "🧑", name: "grown-up" }, smaller: { emoji: "👶", name: "baby" }, word: "tall" },
  { bigger: { emoji: "🐍", name: "snake" }, smaller: { emoji: "🐛", name: "caterpillar" }, word: "long" },
  { bigger: { emoji: "🚂", name: "train" }, smaller: { emoji: "🚗", name: "car" }, word: "long" },
  { bigger: { emoji: "🐊", name: "crocodile" }, smaller: { emoji: "🦎", name: "lizard" }, word: "long" },
  { bigger: { emoji: "🪨", name: "rock" }, smaller: { emoji: "🪶", name: "feather" }, word: "heavy" },
  { bigger: { emoji: "🎳", name: "bowling ball" }, smaller: { emoji: "🎈", name: "balloon" }, word: "heavy" },
  { bigger: { emoji: "🐄", name: "cow" }, smaller: { emoji: "🐔", name: "chicken" }, word: "heavy" },
  { bigger: { emoji: "🍉", name: "watermelon" }, smaller: { emoji: "🍓", name: "strawberry" }, word: "heavy" },
];

const ASK: Record<Compare["word"], [more: string, less: string]> = {
  big: ["bigger", "smaller"],
  tall: ["taller", "shorter"],
  long: ["longer", "shorter"],
  heavy: ["heavier", "lighter"],
};

function compare(difficulty: Level): Question {
  const c = pick(COMPARES);
  const [more, less] = ASK[c.word];
  const askLess = difficulty > 1 && pick([true, false]);
  const right = askLess ? c.smaller : c.bigger;
  const wrong = askLess ? c.bigger : c.smaller;
  const word = askLess ? less : more;
  return textChoice(
    `Which is ${word}?`,
    { label: right.name, emoji: right.emoji },
    [{ label: wrong.name, emoji: wrong.emoji }],
    c.word === "heavy" ? "Think about lifting each one. Which would be harder to lift?" : `Picture them side by side. Which one is ${word}?`,
  );
}

/** Two towers of blocks: which is taller? */
function towers(difficulty: Level): Question {
  const a = randInt(2, 6);
  const gap = difficulty === 3 ? 1 : randInt(2, 3);
  const b = a + gap;
  const left = pick([true, false]);
  const heights = left ? [b, a] : [a, b];
  const askShort = difficulty > 1 && pick([true, false]);
  const tallIsLeft = left;
  const answer = askShort ? (tallIsLeft ? "right" : "left") : tallIsLeft ? "left" : "right";
  return {
    kind: "choice",
    prompt: askShort ? "Which tower is shorter?" : "Which tower is taller?",
    hint: "Look at the tops of the towers. Which one reaches higher?",
    visual: { type: "towers", heights },
    answer,
    choices: [
      { id: "left", label: "this one", emoji: "👈", speak: "this one, on the left" },
      { id: "right", label: "that one", emoji: "👉", speak: "that one, on the right" },
    ],
  };
}

function bigAndSmall({ difficulty = 2 }: GenerateOptions = {}): Question[] {
  return shuffle([compare(difficulty), compare(difficulty), compare(difficulty), compare(difficulty), compare(difficulty), compare(difficulty), towers(difficulty), towers(difficulty)]);
}

// ---------- Sort It ----------

const SORTS: SortSet[] = [
  {
    prompt: "Sort by colour. Tap a picture, then its basket.",
    hint: "Look at the colour of each one.",
    bins: [
      { id: "red", label: "red", emoji: "🟥" },
      { id: "yellow", label: "yellow", emoji: "🟨" },
    ],
    items: [
      { label: "apple", emoji: "🍎", bin: "red" },
      { label: "strawberry", emoji: "🍓", bin: "red" },
      { label: "fire truck", emoji: "🚒", bin: "red" },
      { label: "cherries", emoji: "🍒", bin: "red" },
      { label: "banana", emoji: "🍌", bin: "yellow" },
      { label: "sun", emoji: "🌞", bin: "yellow" },
      { label: "chick", emoji: "🐥", bin: "yellow" },
      { label: "lemon", emoji: "🍋", bin: "yellow" },
    ],
  },
  {
    prompt: "Animals or food? Tap a picture, then its basket.",
    hint: "Can it walk, swim or fly? Then it's an animal.",
    bins: [
      { id: "animal", label: "animals", emoji: "🐾" },
      { id: "food", label: "food", emoji: "🍽️" },
    ],
    items: [
      { label: "dog", emoji: "🐕", bin: "animal" },
      { label: "fish", emoji: "🐟", bin: "animal" },
      { label: "bird", emoji: "🐦", bin: "animal" },
      { label: "rabbit", emoji: "🐇", bin: "animal" },
      { label: "bread", emoji: "🍞", bin: "food" },
      { label: "carrot", emoji: "🥕", bin: "food" },
      { label: "cheese", emoji: "🧀", bin: "food" },
      { label: "grapes", emoji: "🍇", bin: "food" },
    ],
  },
  {
    prompt: "Things that go, or toys? Tap a picture, then its basket.",
    hint: "Things that go take people places.",
    bins: [
      { id: "go", label: "things that go", emoji: "🚦" },
      { id: "toy", label: "toys", emoji: "🧸" },
    ],
    items: [
      { label: "car", emoji: "🚗", bin: "go" },
      { label: "bus", emoji: "🚌", bin: "go" },
      { label: "boat", emoji: "⛵", bin: "go" },
      { label: "airplane", emoji: "✈️", bin: "go" },
      { label: "teddy bear", emoji: "🧸", bin: "toy" },
      { label: "ball", emoji: "⚽", bin: "toy" },
      { label: "blocks", emoji: "🧱", bin: "toy" },
      { label: "kite", emoji: "🪁", bin: "toy" },
    ],
  },
  {
    prompt: "Sort the shapes. Tap a shape, then its basket.",
    hint: "Circles are round. Squares have 4 corners.",
    bins: [
      { id: "round", label: "round", emoji: "⚪" },
      { id: "corners", label: "corners", emoji: "⬜" },
    ],
    items: [
      { label: "red circle", emoji: "🔴", bin: "round" },
      { label: "blue circle", emoji: "🔵", bin: "round" },
      { label: "green circle", emoji: "🟢", bin: "round" },
      { label: "orange circle", emoji: "🟠", bin: "round" },
      { label: "red square", emoji: "🟥", bin: "corners" },
      { label: "blue square", emoji: "🟦", bin: "corners" },
      { label: "green square", emoji: "🟩", bin: "corners" },
      { label: "orange square", emoji: "🟧", bin: "corners" },
    ],
  },
];

type Pic = [emoji: string, name: string];

const ODD_ONE: { same: Pic[]; odd: Pic[]; hint: string }[] = [
  { same: [["🍎", "apple"], ["🍌", "banana"], ["🍇", "grapes"], ["🍓", "strawberry"]], odd: [["🚗", "car"], ["🧦", "sock"], ["🪑", "chair"]], hint: "Two of them are fruit." },
  { same: [["🐶", "dog"], ["🐱", "cat"], ["🐰", "rabbit"], ["🐮", "cow"]], odd: [["🍞", "bread"], ["⚽", "ball"], ["🌂", "umbrella"]], hint: "Two of them are animals." },
  { same: [["🚗", "car"], ["🚌", "bus"], ["🚲", "bike"], ["🚂", "train"]], odd: [["🐸", "frog"], ["🍪", "cookie"], ["🌻", "sunflower"]], hint: "Two of them take people places." },
  { same: [["🍎", "apple"], ["🍓", "strawberry"], ["🚒", "fire truck"], ["🍒", "cherries"]], odd: [["🍌", "banana"], ["🌳", "tree"], ["💧", "water"]], hint: "Two of them are red." },
  { same: [["🧦", "sock"], ["👕", "shirt"], ["👖", "pants"], ["🧤", "mittens"]], odd: [["🍌", "banana"], ["🐟", "fish"], ["🚲", "bike"]], hint: "Two of them are clothes." },
  { same: [["🌻", "sunflower"], ["🌷", "tulip"], ["🌹", "rose"], ["🌼", "daisy"]], odd: [["🐘", "elephant"], ["🥄", "spoon"], ["🧸", "teddy bear"]], hint: "Two of them are flowers." },
];

function oddOneOut(): Question {
  const set = pick(ODD_ONE);
  const odd = pick(set.odd);
  const same = sample(set.same, 2);
  return textChoice(
    "Which one does not belong?",
    { label: odd[1], emoji: odd[0] },
    same.map(([emoji, label]) => ({ label, emoji })),
    `${set.hint} Which one is different?`,
  );
}

function sortIt({ difficulty = 2 }: GenerateOptions = {}): Question[] {
  const perBin = difficulty === 1 ? 2 : 3;
  const sorts = sample(SORTS, difficulty === 1 ? 2 : 3).map((s) => sortQuestion(s, perBin));
  return shuffle([...sorts, ...Array.from({ length: 8 - sorts.length }, oddOneOut)]);
}

export const course: Course = {
  grade: "pk",
  subject: "math",
  bigIdeas: {
    "ca-bc": [
      "Children construct meaning as they engage with materials, other children and adults, the environment, the community, and the world.",
      "Children develop knowledge and theories as they count, compare, sort and build with familiar objects.",
      "Children use multiple modes of expressive languages, including numbers and symbols, to communicate ideas.",
    ],
  },
  units: [
    {
      id: "count-to-5",
      title: "Count to 5",
      emoji: "🖐️",
      blurb: "How many? Count and see",
      standards: { "ca-bc": "Engagement with others, materials, and the world: Knowledge and theories · counting small groups of objects" },
      parentNote: "Counting small groups one by one, knowing the last number said is how many, and saying the counting numbers in order. Starts at 5 and stretches to 10.",
      generate: countToFive,
    },
    {
      id: "find-the-number",
      title: "Find the Number",
      emoji: "🔢",
      blurb: "Know the numbers 1 to 10",
      standards: { "ca-bc": "Communication and literacies: Vocabulary, symbols, and written language · recognizing the written numerals 1 to 10" },
      parentNote: "Recognizing the written numbers 1 to 10 and matching a number to a group that size. Numbers that look alike (6 and 9) come at the stretch level.",
      generate: findTheNumber,
    },
    {
      id: "more-or-fewer",
      title: "More or Fewer",
      emoji: "⚖️",
      blurb: "Which group has more?",
      standards: { "ca-bc": "Engagement with others, materials, and the world: Knowledge and theories · comparing groups as more, fewer or the same" },
      parentNote: "Comparing two small groups by matching them one to one: which has more, which has fewer, or are they the same.",
      generate: moreFewer,
    },
    {
      id: "shapes",
      title: "Shapes",
      emoji: "🔺",
      blurb: "Circles, squares and triangles",
      standards: { "ca-bc": "Engagement with others, materials, and the world: Spaces, objects, and materials · naming circles, squares, triangles and rectangles" },
      parentNote: "Naming circles, squares, triangles and rectangles, and spotting them in everyday things like a clock or a door.",
      generate: shapes,
    },
    {
      id: "patterns",
      title: "Patterns",
      emoji: "🔁",
      blurb: "What comes next?",
      standards: { "ca-bc": "Engagement with others, materials, and the world: Knowledge and theories · copying and extending simple repeating patterns" },
      parentNote: "Finishing repeating patterns of pictures and colours: first two-part patterns (red, blue, red, blue), then three-part ones.",
      generate: patterns,
    },
    {
      id: "big-and-small",
      title: "Big and Small",
      emoji: "🐘",
      blurb: "Bigger, taller, longer",
      standards: { "ca-bc": "Engagement with others, materials, and the world: Spaces, objects, and materials · comparing size, height, length and weight" },
      parentNote: "Comparing two things by size, height, length and weight, using words like bigger, taller, shorter and heavier.",
      generate: bigAndSmall,
    },
    {
      id: "sort-it",
      title: "Sort It",
      emoji: "🧺",
      blurb: "Put things into groups",
      standards: { "ca-bc": "Engagement with others, materials, and the world: Spaces, objects, and materials · sorting objects by colour, shape and kind" },
      parentNote: "Sorting things into groups by colour, shape or kind, and finding the one that doesn't belong.",
      generate: sortIt,
    },
  ],
};
