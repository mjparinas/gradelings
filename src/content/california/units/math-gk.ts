import { pick, shuffle } from "../../random";
import type { ShapeName } from "../../types";
import { num, pickOne, type Maker } from "../../washington/units/math-kit";
import { mathUnit } from "./math";

// Kindergarten: what can be measured about an object (K.MD.1), building shapes from sticks and clay balls (K.G.5)
// and putting shapes together to make bigger ones (K.G.6). The shared helpers are in ./math.ts.

// ---------- What can we measure? (K.MD.1) ----------

interface Thing {
  name: string;
  emoji: string;
  /** Words for what can be measured about it, kid style. */
  measures: ("long" | "tall" | "heavy" | "holds")[];
}

const THINGS: Thing[] = [
  { name: "pencil", emoji: "✏️", measures: ["long", "heavy"] },
  { name: "tree", emoji: "🌳", measures: ["tall", "heavy"] },
  { name: "melon", emoji: "🍉", measures: ["heavy", "long"] },
  { name: "cup", emoji: "🥤", measures: ["holds", "tall", "heavy"] },
  { name: "bucket", emoji: "🪣", measures: ["holds", "tall", "heavy"] },
  { name: "snake", emoji: "🐍", measures: ["long", "heavy"] },
  { name: "rope", emoji: "🪢", measures: ["long", "heavy"] },
  { name: "giraffe", emoji: "🦒", measures: ["tall", "heavy"] },
  { name: "rock", emoji: "🪨", measures: ["heavy", "long"] },
  { name: "bathtub", emoji: "🛁", measures: ["holds", "long", "heavy"] },
  { name: "book", emoji: "📕", measures: ["long", "heavy"] },
  { name: "pumpkin", emoji: "🎃", measures: ["heavy", "tall"] },
];

const PHRASE: Record<Thing["measures"][number], string> = {
  long: "how long it is",
  tall: "how tall it is",
  heavy: "how heavy it is",
  holds: "how much it holds",
};

/** Things about an object that are not measurements. */
const NOT_MEASURE = ["what color it is", "what its name is", "if it is pretty", "who owns it", "if it is fun"];

const canMeasure: Maker = () => {
  const t = pick(THINGS);
  const right = PHRASE[pick(t.measures)];
  return pickOne(
    `What can you measure about a ${t.name}?`,
    right,
    shuffle(NOT_MEASURE).slice(0, 2),
    "You can measure how long, how tall, how heavy or how much it holds. Color is not a measure.",
    { type: "emoji", emoji: t.emoji },
  );
};

const TOOLS: { prompt: string; emoji: string; right: string; wrong: string[] }[] = [
  { prompt: "You put a melon on a scale. What do you find out?", emoji: "🍉", right: "how heavy it is", wrong: ["how tall it is", "what color it is"] },
  { prompt: "You put a rock on a scale. What do you find out?", emoji: "🪨", right: "how heavy it is", wrong: ["how long it is", "what shape it is"] },
  { prompt: "You lay cubes along a snake. What do you find out?", emoji: "🐍", right: "how long it is", wrong: ["how heavy it is", "what color it is"] },
  { prompt: "You lay cubes next to a crayon. What do you find out?", emoji: "🖍️", right: "how long it is", wrong: ["how heavy it is", "how much it holds"] },
  { prompt: "You stand next to a sunflower. What do you find out?", emoji: "🌻", right: "how tall it is", wrong: ["how heavy it is", "what color it is"] },
  { prompt: "You fill a bowl with cups of water. What do you find out?", emoji: "🥣", right: "how much it holds", wrong: ["how tall it is", "what color it is"] },
  { prompt: "You fill a pot with scoops of rice. What do you find out?", emoji: "🍲", right: "how much it holds", wrong: ["how long it is", "who made it"] },
];

const whatYouFind: Maker = () => {
  const t = pick(TOOLS);
  return pickOne(t.prompt, t.right, t.wrong, "A scale tells how heavy. Cubes in a line tell how long. Filling tells how much it holds.", {
    type: "emoji",
    emoji: t.emoji,
  });
};

const WORDS: { word: string; about: string }[] = [
  { word: "heavy", about: "weight" },
  { word: "light", about: "weight" },
  { word: "long", about: "length" },
  { word: "short", about: "length" },
  { word: "full", about: "how much it holds" },
  { word: "empty", about: "how much it holds" },
];

const measureWord: Maker = () => {
  const w = pick(WORDS);
  const others = shuffle([...new Set(WORDS.map((x) => x.about))].filter((a) => a !== w.about)).slice(0, 2);
  return pickOne(
    `The word "${w.word}" tells about…`,
    w.about,
    others,
    `"Heavy" and "light" are about weight. "Long" and "short" are about length. "Full" and "empty" are about how much it holds.`,
  );
};

const twoThings: Maker = () => {
  const t = pick(THINGS.filter((x) => x.measures.length >= 2));
  const [a, b] = t.measures;
  return pickOne(
    `Which two things can you measure about a ${t.name}?`,
    `${PHRASE[a]} and ${PHRASE[b]}`,
    ["what color it is and its name", "if it is fun and who owns it"],
    "One object can have many measures, like length and weight.",
    { type: "emoji", emoji: t.emoji },
  );
};

const notMeasure: Maker = () => {
  const t = pick(THINGS);
  const wrongs = shuffle(t.measures).slice(0, 2).map((m) => PHRASE[m]);
  return pickOne(
    `Which one can you NOT measure about a ${t.name}?`,
    pick(NOT_MEASURE.slice(0, 2)),
    wrongs,
    "You can't measure color or a name with a ruler, a scale or a cup.",
    { type: "emoji", emoji: t.emoji },
  );
};

export const MEASURE_WORDS_K = mathUnit({
  id: "ca-gk-what-to-measure",
  title: "What Can We Measure?",
  emoji: "⚖️",
  blurb: "Long, tall, heavy or full?",
  parentNote:
    "Describing what can be measured about an object, such as how long, how tall, how heavy or how much it holds, and seeing that one object has several measures.",
  codes: "K.MD.1",
  text: "describing measurable attributes of objects, such as length and weight, and several attributes of one object",
  makers: [canMeasure, whatYouFind, measureWord, twoThings, notMeasure],
});

// ---------- Build and join shapes (K.G.5, K.G.6) ----------

const STRAIGHT: { shape: ShapeName; sides: number }[] = [
  { shape: "triangle", sides: 3 },
  { shape: "square", sides: 4 },
  { shape: "rectangle", sides: 4 },
  { shape: "hexagon", sides: 6 },
];
const opt = (s: ShapeName) => ({ label: s, shape: s });

const sticksFor: Maker = (d) => {
  const s = pick(d === 1 ? STRAIGHT.slice(0, 3) : STRAIGHT);
  return num(`You make a ${s.shape} with sticks. How many sticks do you need?`, s.sides, `One stick for each side. A ${s.shape} has ${s.sides} sides.`, {
    min: 2,
    max: 8,
    visual: { type: "shape", shape: s.shape },
  });
};

const ballsFor: Maker = (d) => {
  const s = pick(d === 1 ? STRAIGHT.slice(0, 3) : STRAIGHT);
  return num(`A clay ball goes on each corner of a ${s.shape}. How many balls?`, s.sides, `Count the corners. A ${s.shape} has ${s.sides} corners.`, {
    min: 2,
    max: 8,
    visual: { type: "shape", shape: s.shape },
  });
};

const fromSticks: Maker = (d) => {
  const s = pick(d === 1 ? [STRAIGHT[0], STRAIGHT[3]] : STRAIGHT.filter((x) => x.shape !== "rectangle"));
  const wrong = STRAIGHT.filter((x) => x.sides !== s.sides).map((x) => opt(x.shape));
  return pickOne(
    `You join ${s.sides} same-size sticks end to end in a closed shape. What is it?`,
    opt(s.shape),
    [...wrong.slice(0, 2), opt("circle")],
    `Each stick is one side. Count the sides: ${s.sides}.`,
  );
};

const noSticks: Maker = () =>
  pickOne(
    "Which shape can you NOT make with straight sticks?",
    opt("circle"),
    shuffle(STRAIGHT.map((x) => opt(x.shape))).slice(0, 2),
    "Sticks are straight. A circle is curved all the way around.",
  );

const JOINS: { prompt: string; right: ShapeName; wrong: ShapeName[]; hint: string }[] = [
  { prompt: "Join 2 triangles with full sides touching. What can you make?", right: "rectangle", wrong: ["circle", "hexagon"], hint: "Put the long sides of two triangles together to make a box shape." },
  { prompt: "Put 2 squares side by side. What shape do you make?", right: "rectangle", wrong: ["triangle", "circle"], hint: "Two squares side by side make a long box shape with 4 corners." },
  { prompt: "Join 2 half circles. What shape do you make?", right: "circle", wrong: ["square", "triangle"], hint: "Two halves make one whole circle." },
  { prompt: "Put 4 small squares together in 2 rows. What do you make?", right: "square", wrong: ["triangle", "circle"], hint: "2 rows of 2 squares make a bigger square." },
  { prompt: "Put 6 triangle blocks around one point. What do you make?", right: "hexagon", wrong: ["circle", "square"], hint: "6 triangle blocks fit together to make a hexagon." },
  { prompt: "Stack 2 same squares, one on top of the other. What shape is it?", right: "rectangle", wrong: ["circle", "hexagon"], hint: "Two squares stacked make a tall box shape with 4 corners." },
  { prompt: "Cut a square from corner to corner. What 2 shapes do you get?", right: "triangle", wrong: ["circle", "square"], hint: "A cut from corner to corner makes 2 triangles." },
];

const joinShapes: Maker = () => {
  const j = pick(JOINS);
  return pickOne(j.prompt, opt(j.right), j.wrong.map(opt), j.hint);
};

const howManyParts: Maker = () => {
  const parts = pick([
    { prompt: "How many half circles make a whole circle?", n: 2, shape: "circle" as ShapeName, hint: "Two halves make one whole." },
    { prompt: "How many small triangle blocks make a hexagon block?", n: 6, shape: "hexagon" as ShapeName, hint: "6 triangle blocks fill a hexagon." },
    { prompt: "How many small squares make a big square with 2 in each row?", n: 4, shape: "square" as ShapeName, hint: "2 rows of 2 is 4 squares." },
  ]);
  return num(parts.prompt, parts.n, parts.hint, { min: 1, max: 8, visual: { type: "shape", shape: parts.shape } });
};

const twoShapes: Maker = (d) => {
  const pool = d === 1 ? STRAIGHT.slice(0, 2) : STRAIGHT.slice(0, 3);
  const [x, y] = [pick(pool), pick(pool)];
  const same = x.shape === y.shape;
  return num(
    same ? `You make 2 ${x.shape}s with sticks. How many sticks in all?` : `You make a ${x.shape} and a ${y.shape} with sticks. How many sticks?`,
    x.sides + y.sides,
    `${x.sides} sticks + ${y.sides} sticks = ${x.sides + y.sides} sticks.`,
    { min: 2, max: 12 },
  );
};

export const BUILD_SHAPES_K = mathUnit({
  id: "ca-gk-build-shapes",
  title: "Build & Join Shapes",
  emoji: "🧩",
  blurb: "Make shapes from sticks and pieces",
  parentNote:
    "Building shapes from parts, like sticks for sides and clay balls for corners, and joining small shapes to make bigger ones, like two triangles making a rectangle. At home, build shapes with straws or toothpicks.",
  codes: "K.G.5; K.G.6",
  text: "building shapes from sticks and corners, and joining simple shapes to make larger shapes",
  makers: [sticksFor, ballsFor, fromSticks, noSticks, joinShapes, howManyParts, twoShapes],
});

export const MATH_K = [MEASURE_WORDS_K, BUILD_SHAPES_K];
