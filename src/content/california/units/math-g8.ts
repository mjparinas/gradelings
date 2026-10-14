import { pick, randInt, shuffle } from "../../random";
import { fmt, num, pickOne, typed, type Maker } from "../../washington/units/math-kit";
import { mathUnit } from "./math";

// Grade 8: similar figures through transformations and dilations (8.G.4), the distance between two points with the
// Pythagorean Theorem (8.G.8), and using a linear model of bivariate data (8.SP.3). The shared helpers are in ./math.ts.

// ---------- Similar figures and distance (8.G.4, 8.G.8) ----------

const SEQUENCES: { steps: string; similar: boolean; congruent: boolean }[] = [
  { steps: "a rotation of 90° and then a dilation by a scale factor of 2", similar: true, congruent: false },
  { steps: "a reflection across the y-axis and then a dilation by a scale factor of 1/2", similar: true, congruent: false },
  { steps: "a translation 3 units right and then a dilation by a scale factor of 3", similar: true, congruent: false },
  { steps: "a reflection across the x-axis and then a translation 4 units up", similar: true, congruent: true },
  { steps: "a rotation of 180° about the origin", similar: true, congruent: true },
  { steps: "stretching it to twice as wide but keeping the same height", similar: false, congruent: false },
];
const verdict = (s: { similar: boolean; congruent: boolean }) =>
  s.congruent ? "Similar and congruent: same shape and same size" : s.similar ? "Similar but not congruent: same shape, different size" : "Not similar: the shape changes";

const isSimilar: Maker = () => {
  const s = pick(SEQUENCES);
  return pickOne(
    `Figure B is figure A after ${s.steps}. Which describes A and B?`,
    verdict(s),
    [
      { similar: true, congruent: true },
      { similar: true, congruent: false },
      { similar: false, congruent: false },
    ]
      .filter((x) => verdict(x) !== verdict(s))
      .map(verdict),
    "Rotations, reflections and translations keep shape and size. A dilation keeps shape but changes size. Stretching one way changes the shape.",
  );
};

const scaleFromPoints: Maker = (d) => {
  const k = pick(d === 1 ? [2, 3] : [2, 3, 4, 5]);
  const [x, y] = [randInt(1, 3), randInt(1, 3)];
  return num(
    `A figure is dilated about the origin. Point (${x}, ${y}) moves to (${k * x}, ${k * y}). What is the scale factor?`,
    k,
    `Every coordinate is multiplied by the scale factor: ${x} × ${k} = ${k * x}.`,
    { min: 1, max: 9, extra: [k * x - x, k + 1] },
  );
};

const similarSide: Maker = (d) => {
  const k = pick([2, 3, 4]);
  const side = randInt(2, 9);
  const prompt = `Triangle B is similar to triangle A, made by a rotation and a dilation by a scale factor of ${k}. A side of A is ${side} cm. How long is the matching side of B?`;
  const hint = `Rotations don't change lengths; the dilation multiplies them by ${k}: ${side} × ${k} = ${side * k} cm.`;
  if (d === 3) return typed(prompt, side * k, hint, { suffix: "cm" });
  return num(prompt, side * k, hint, { min: 1, extra: [side + k, side], label: (n) => `${n} cm` });
};

const angleKept: Maker = () => {
  const a = randInt(25, 80);
  return num(
    `A triangle with a ${a}° angle is dilated by a scale factor of 3. What is the matching angle in the new triangle?`,
    a,
    "Dilations change side lengths but keep every angle the same.",
    { step: 10, min: 1, max: 179, extra: [3 * a].filter((x) => x < 180), label: (n) => `${n}°` },
  );
};

const TRIPLES: [number, number, number][] = [
  [3, 4, 5],
  [6, 8, 10],
  [5, 12, 13],
  [8, 6, 10],
  [4, 3, 5],
  [12, 5, 13],
];

const distance: Maker = (d) => {
  const [dx, dy, c] = pick(d === 1 ? TRIPLES.filter((t) => t[2] <= 10) : TRIPLES);
  const x1 = randInt(-3, 2);
  const y1 = randInt(-3, 2);
  const [x2, y2] = [x1 + dx, y1 + dy];
  const prompt = `What is the distance between (${fmt(x1)}, ${fmt(y1)}) and (${fmt(x2)}, ${fmt(y2)})?`;
  const hint = `Make a right triangle: legs ${dx} and ${dy}. ${dx}² + ${dy}² = ${dx * dx + dy * dy}, and √${dx * dx + dy * dy} = ${c}.`;
  const size = Math.max(Math.abs(x1), Math.abs(y1), x2, y2);
  const visual = size <= 10 ? { type: "grid" as const, size: 10, min: -10, points: [{ x: x1, y: y1, label: "P" }, { x: x2, y: y2, label: "Q" }] } : undefined;
  if (d >= 2) return typed(prompt, c, hint, { ...(visual ? { visual } : {}) });
  return num(prompt, c, hint, { min: 1, extra: [dx + dy, Math.abs(dx - dy)], ...(visual ? { visual } : {}) });
};

const legLengths: Maker = () => {
  const [dx, dy] = pick(TRIPLES);
  const x1 = randInt(-4, 2);
  const y1 = randInt(-4, 2);
  const horizontal = pick([true, false]);
  return num(
    `To find the distance from (${fmt(x1)}, ${fmt(y1)}) to (${fmt(x1 + dx)}, ${fmt(y1 + dy)}), you draw a right triangle. How long is its ${horizontal ? "horizontal" : "vertical"} leg?`,
    horizontal ? dx : dy,
    `The horizontal leg is the change in x: ${dx}. The vertical leg is the change in y: ${dy}.`,
    { min: 1, extra: [horizontal ? dy : dx] },
  );
};

const nearestTenth: Maker = () => {
  const [dx, dy] = shuffle([randInt(1, 4), randInt(1, 5)]);
  const sq = dx * dx + dy * dy;
  const r = Math.sqrt(sq);
  if (Number.isInteger(r)) return distance(2);
  const x1 = randInt(-3, 3);
  const y1 = randInt(-3, 3);
  const ans = Math.round(r * 10) / 10;
  return typed(
    `What is the distance between (${fmt(x1)}, ${fmt(y1)}) and (${fmt(x1 + dx)}, ${fmt(y1 + dy)}), to the nearest tenth?`,
    ans,
    `Legs ${dx} and ${dy}: ${dx}² + ${dy}² = ${sq}. √${sq} ≈ ${fmt(ans)}.`,
    { keypad: "decimal" },
  );
};

export const SIMILAR_DISTANCE_8 = mathUnit({
  id: "ca-g8-similar-distance",
  title: "Similar Figures & Distance",
  emoji: "📏",
  blurb: "Dilations, similar shapes and distances on a grid",
  parentNote:
    "Recognizing similar figures as ones made by rotations, reflections, translations and dilations, using scale factors, and finding the distance between two points on a coordinate grid with the Pythagorean Theorem.",
  codes: "8.G.4; 8.G.8",
  text: "understanding similarity through sequences of transformations and dilations, and finding the distance between two points with the Pythagorean Theorem",
  makers: [isSimilar, scaleFromPoints, similarSide, angleKept, distance, legLengths, nearestTenth],
});

// ---------- Linear models of data (8.SP.3) ----------

const MODELS = [
  { x: "weeks", y: "plant height", yUnit: "cm", slope: [1.5, 2, 2.5, 3], start: [4, 6, 8, 10], per: "week" },
  { x: "hours studied", y: "test score", yUnit: "points", slope: [4, 5, 6], start: [55, 60, 65], per: "hour studied" },
  { x: "minutes", y: "water in a tank", yUnit: "liters", slope: [-2, -3, -4], start: [80, 90, 120], per: "minute" },
  { x: "days", y: "pages read", yUnit: "pages", slope: [12, 15, 20], start: [0, 10, 30], per: "day" },
  { x: "years", y: "tree height", yUnit: "feet", slope: [1.5, 2], start: [3, 5], per: "year" },
];

function model() {
  const m = pick(MODELS);
  const slope = pick(m.slope);
  const start = pick(m.start);
  const eqText = `y = ${fmt(slope)}x ${start === 0 ? "" : `+ ${start}`}`.trim();
  return { m, slope, start, eqText };
}

const slopeMeaning: Maker = () => {
  const { m, slope, start, eqText } = model();
  const dir = slope > 0 ? "goes up" : "goes down";
  return pickOne(
    `A line of best fit for ${m.y} (y, in ${m.yUnit}) against ${m.x} (x) is ${eqText}. What does ${fmt(slope)} mean?`,
    `The ${m.y} ${dir} by about ${fmt(Math.abs(slope))} ${m.yUnit} each ${m.per}`,
    [`The ${m.y} at the start is ${fmt(slope)} ${m.yUnit}`, `The ${m.y} ${dir} by about ${start} ${m.yUnit} each ${m.per}`, `There are ${fmt(Math.abs(slope))} ${m.x} in all`],
    "The slope is the change in y for each 1 more x.",
  );
};

const interceptMeaning: Maker = () => {
  const { m, slope, start, eqText } = model();
  if (start === 0) return slopeMeaning(2);
  return pickOne(
    `A line of best fit for ${m.y} (y, in ${m.yUnit}) against ${m.x} (x) is ${eqText}. What does ${start} mean?`,
    `The model's ${m.y} when x is 0 is about ${start} ${m.yUnit}`,
    [`The ${m.y} changes by ${start} ${m.yUnit} each ${m.per}`, `The ${m.y} after ${start} ${m.x}`, `The ${m.y} changes by ${fmt(slope)} in all`],
    "The y-intercept is the value of y when x = 0, the starting value.",
  );
};

const predict: Maker = (d) => {
  const { m, slope, start, eqText } = model();
  const x = randInt(2, 9);
  const y = slope * x + start;
  const prompt = `A line of best fit for ${m.y} (y, in ${m.yUnit}) against ${m.x} (x) is ${eqText}. What does the model predict when x = ${x}?`;
  const hint = `y = ${fmt(slope)} × ${x} + ${start} = ${fmt(y)}.`;
  if (d >= 2) return typed(prompt, y, hint, { keypad: Number.isInteger(y) ? "integer" : "decimal", suffix: m.yUnit });
  return num(prompt, y, hint, { step: Math.abs(slope), extra: [slope * x, y + start] });
};

const solveForX: Maker = () => {
  const { m, slope, start, eqText } = model();
  const x = randInt(2, 9);
  const y = slope * x + start;
  return num(
    `A line of best fit for ${m.y} (y, in ${m.yUnit}) against ${m.x} (x) is ${eqText}. When does the model predict ${m.y} of ${fmt(y)} ${m.yUnit}?`,
    x,
    `Solve ${fmt(y)} = ${fmt(slope)}x + ${start}: x = (${fmt(y)} − ${start}) ÷ ${fmt(slope)} = ${x}.`,
    { min: 0, label: (n) => `x = ${n}` },
  );
};

const sensible: Maker = () => {
  const { m, slope, eqText } = model();
  const far = 100;
  return pickOne(
    `A line of best fit for ${m.y} (y) against ${m.x} (x) is ${eqText}, from data with x between 0 and 10. Is the prediction for x = ${far} trustworthy?`,
    "Not very: it is far outside the data, and the pattern may not continue",
    ["Yes: a line of best fit works for any x", `Yes: the slope ${fmt(slope)} never changes in real life`],
    "A model is most trustworthy close to the data it was made from.",
  );
};

export const LINEAR_MODELS_8 = mathUnit({
  id: "ca-g8-linear-models",
  title: "Using a Line of Best Fit",
  emoji: "📉",
  blurb: "What the slope and intercept say",
  parentNote:
    "Using the equation of a line of best fit to make predictions and explaining what its slope and y-intercept mean, for example that y = 1.5x + 5 means a plant grows about 1.5 cm each week from a height of 5 cm.",
  codes: "8.SP.3",
  text: "using the equation of a linear model to solve problems and interpreting its slope and intercept",
  makers: [slopeMeaning, interceptMeaning, predict, solveForX, sensible],
});

export const MATH_8 = [SIMILAR_DISTANCE_8, LINEAR_MODELS_8];
