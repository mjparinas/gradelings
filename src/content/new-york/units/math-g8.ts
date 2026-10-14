import { pick, randInt } from "../../random";
import type { Unit } from "../../types";
import { type Maker, fmt, linear, num, pickOne, typed } from "../../washington/units/math-kit";
import type { Q } from "../own";
import { bank, mathUnit } from "./math-kit";

// New York's own Grade 8 math units (`ny-` ids): the distance between two points on a coordinate grid with the
// Pythagorean Theorem (NY-8.G.8), and using the equation of a linear model of two-variable data to predict and to
// explain what the slope and intercept mean (NY-8.SP.3).

// ---------- Distance between two points (NY-8.G.8) ----------

/** Right triangles with whole-number sides. */
const TRIPLES = [
  [3, 4, 5],
  [6, 8, 10],
  [5, 12, 13],
  [8, 6, 10],
  [4, 3, 5],
  [12, 5, 13],
] as const;

const pt = (x: number, y: number): string => `(${fmt(x)}, ${fmt(y)})`;

/** Two points a whole-number distance apart. */
function pair(level: number) {
  const [dx, dy, c] = pick(TRIPLES);
  const sx = level === 1 ? 1 : pick([1, -1]);
  const sy = level === 1 ? 1 : pick([1, -1]);
  const x1 = level === 1 ? randInt(0, 3) : randInt(-4, 3);
  const y1 = level === 1 ? randInt(0, 3) : randInt(-4, 3);
  return { a: [x1, y1] as const, b: [x1 + sx * dx, y1 + sy * dy] as const, dx, dy, c };
}

/** The distance between two points, on a grid when they fit. */
const distance: Maker = (d) => {
  const p = pair(d);
  const fits = [p.a, p.b].every(([x, y]) => Math.abs(x) <= 12 && Math.abs(y) <= 12) && p.dx <= 8 && p.dy <= 8;
  const visual = fits ? { type: "grid" as const, size: 12, min: d === 1 ? 0 : -12, points: [{ x: p.a[0], y: p.a[1], label: "A" }, { x: p.b[0], y: p.b[1], label: "B" }] } : undefined;
  const prompt = `What is the distance between A${pt(...p.a)} and B${pt(...p.b)}?`;
  const hint = `Make a right triangle: across ${p.dx}, up or down ${p.dy}. Then ${p.dx}² + ${p.dy}² = c².`;
  const opts = { min: 1, extra: [p.dx + p.dy, Math.max(p.dx, p.dy), p.c + 1], ...(visual && d === 1 ? { visual } : {}) };
  if (d === 3) return typed(prompt, p.c, hint);
  return num(prompt, p.c, hint, opts);
};

/** The legs of the right triangle between two points. */
const legs: Maker = (d) => {
  const p = pair(d);
  return pickOne(
    `To find the distance from ${pt(...p.a)} to ${pt(...p.b)}, what are the legs of the right triangle?`,
    `${p.dx} and ${p.dy}`,
    [`${Math.abs(p.a[0] + p.b[0])} and ${Math.abs(p.a[1] + p.b[1])}`, `${p.dx + 1} and ${p.dy + 1}`, `${p.c} and ${p.dx}`],
    "Subtract the x-coordinates for the horizontal leg and the y-coordinates for the vertical leg.",
  );
};

/** Distances that are not whole numbers: give the square root. */
const rootDistance: Maker = () => {
  let [dx, dy] = [randInt(1, 7), randInt(1, 7)];
  while (Number.isInteger(Math.sqrt(dx * dx + dy * dy))) [dx, dy] = [randInt(1, 7), randInt(1, 7)];
  const x = randInt(-3, 3);
  const y = randInt(-3, 3);
  const s = dx * dx + dy * dy;
  return pickOne(
    `What is the exact distance between ${pt(x, y)} and ${pt(x + dx, y + dy)}?`,
    `√${s}`,
    [`√${dx + dy}`, `${dx + dy}`, `√${Math.abs(dx * dx - dy * dy) || s + 2}`],
    `Legs ${dx} and ${dy}: ${dx}² + ${dy}² = ${s}, so the distance is √${s}.`,
  );
};

/** A map story with a whole-number distance. */
const mapStory: Maker = () => {
  const [dx, dy, c] = pick(TRIPLES);
  const k = pick([1, 2]);
  const x = randInt(0, 5);
  const y = randInt(0, 5);
  const [from, to] = pick([["the school", "the park"], ["a campsite", "a lake"], ["a library", "a museum"], ["the dock", "a lighthouse"]]);
  return num(
    `On a map grid where each unit is 1 mile, ${from} is at ${pt(x, y)} and ${to} is at ${pt(x + k * dx, y + k * dy)}. How far apart are they in a straight line, in miles?`,
    k * c,
    `The legs are ${k * dx} and ${k * dy} miles. Use a² + b² = c².`,
    { min: 1, extra: [k * (dx + dy), k * Math.max(dx, dy)] },
  );
};

const DISTANCE_IDEAS: Q[] = [
  ["Why can you use the Pythagorean Theorem to find the distance between two points?", "the horizontal and vertical gaps are the legs of a right triangle", ["the points are always 5 apart", "every triangle is a right triangle", "the distance is the sum of the coordinates"], "Go across, then up: that makes a right angle, and the distance is the hypotenuse."],
  ["Points (2, 1) and (2, 7) are on the same vertical line. How far apart are they?", "6", ["9", "3", "√40"], "Same x-coordinate: subtract the y-coordinates."],
  ["Which point is 5 units from the origin (0, 0)?", "(3, 4)", ["(2, 3)", "(1, 4)", "(5, 5)"], "3² + 4² = 25 = 5²."],
  ["Is the distance from (0, 0) to (4, 4) more or less than 8?", "less than 8", ["more than 8", "exactly 8"], "The straight path is shorter than going 4 across and 4 up.", true],
];

// ---------- Linear models of data (NY-8.SP.3) ----------

const MODELS = [
  { x: "hours of study", y: "test score", xu: "hours", yu: "points", m: [3, 8], b: [45, 65], per: "point", start: "score with no study" },
  { x: "temperature in °F", y: "drinks sold", xu: "degrees", yu: "drinks", m: [2, 6], b: [5, 30], per: "drink", start: "drinks sold at 0°F (outside the data, so not meaningful)" },
  { x: "age of a tree in years", y: "height in feet", xu: "years", yu: "feet", m: [1, 3], b: [2, 6], per: "foot", start: "height when planted" },
  { x: "weeks of training", y: "push-ups done", xu: "weeks", yu: "push-ups", m: [2, 5], b: [8, 20], per: "push-up", start: "push-ups before training" },
  { x: "days since planting", y: "plant height in cm", xu: "days", yu: "cm", m: [1, 2], b: [1, 4], per: "cm", start: "height on the day it was planted" },
] as const;

function model() {
  const c = pick(MODELS);
  return { c, m: randInt(c.m[0], c.m[1]), b: randInt(c.b[0], c.b[1]) };
}

/** Predict y from x with the model. */
const predict: Maker = (d) => {
  const { c, m, b } = model();
  const x = randInt(2, 12);
  const prompt = `A line of best fit for ${c.x} (x) and ${c.y} (y) is y = ${linear(m, b)}. What does it predict for x = ${x}?`;
  const hint = `Put ${x} in for x: ${m} × ${x} + ${b}.`;
  if (d === 3) return typed(prompt, m * x + b, hint);
  return num(prompt, m * x + b, hint, { min: 0, extra: [m * x, m + x + b, b * x + m] });
};

/** Work backward: which x gives this y? */
const solveFor: Maker = () => {
  const { c, m, b } = model();
  const x = randInt(2, 12);
  return num(`The model y = ${linear(m, b)} links ${c.x} (x) and ${c.y} (y). For what x does it predict y = ${m * x + b}?`, x, `Solve ${m}x + ${b} = ${m * x + b}: subtract ${b}, then divide by ${m}.`, { min: 0, extra: [(m * x + b) / m, x + 1, m * x].map((v) => Math.round(v)) });
};

/** What the slope means. */
const slopeMeaning: Maker = () => {
  const { c, m, b } = model();
  return pickOne(
    `The model y = ${linear(m, b)} links ${c.x} (x) and ${c.y} (y). What does the slope ${m} mean?`,
    `each extra one of the ${c.xu} goes with about ${m} more ${c.yu}`,
    [`the ${c.y} starts at ${m}`, `the ${c.y} is always ${m}`, `each extra ${m} ${c.xu} goes with 1 more ${c.per}`],
    "The slope is the change in y for each increase of 1 in x.",
  );
};

/** What the intercept means. */
const interceptMeaning: Maker = () => {
  const { c, m, b } = model();
  return pickOne(
    `The model y = ${linear(m, b)} links ${c.x} (x) and ${c.y} (y). What does the intercept ${b} mean?`,
    `the predicted ${c.start}`,
    [`the ${c.y} goes up by ${b} each time`, `the greatest ${c.y} in the data`, `the number of data points`],
    "The y-intercept is the predicted y when x = 0.",
  );
};

/** Find the slope of a model from two points on it. */
const slopeFromPoints: Maker = () => {
  const { c, m, b } = model();
  const x1 = randInt(1, 5);
  const x2 = x1 + randInt(2, 6);
  return num(
    `A line of best fit for ${c.x} and ${c.y} passes through (${x1}, ${m * x1 + b}) and (${x2}, ${m * x2 + b}). What is its slope?`,
    m,
    `Slope = change in y ÷ change in x = ${m * (x2 - x1)} ÷ ${x2 - x1}.`,
    { min: 0, extra: [m * (x2 - x1), x2 - x1, b] },
  );
};

const MODEL_IDEAS: Q[] = [
  ["A model for a car's value is y = −2000x + 24 000, where x is age in years. What does −2000 mean?", "the value drops about $2,000 each year", ["the car cost $2,000", "the value rises $2,000 each year", "the car is 2,000 years old"], "A negative slope means y goes down as x goes up."],
  ["Why should you be careful using a linear model far outside the data?", "the pattern may not continue there", ["the equation stops working at 10", "slopes change sign outside the data", "you cannot put big numbers in an equation"], "A model only describes the data it was made from."],
  ["A model of height (y, in inches) and age (x, in years) for children is y = 2.5x + 31. What does it predict at age 4?", "41 inches", ["33.5 inches", "37 inches", "10 inches"], "2.5 × 4 + 31 = 41."],
  ["Two models fit the same data: y = 3x + 10 and y = 5x + 2. Which predicts a faster increase?", "y = 5x + 2", ["y = 3x + 10", "they increase at the same rate"], "The bigger slope means y grows faster."],
];

export const UNITS: Unit[] = [
  mathUnit({
    id: "ny-g8-distance",
    title: "Distance on a Grid",
    emoji: "📍",
    blurb: "Pythagoras between two points",
    parentNote: "Finding the straight-line distance between two points on a coordinate grid by drawing a right triangle and using the Pythagorean Theorem, a² + b² = c².",
    codes: "NY-8.G.8",
    text: "applying the Pythagorean Theorem to find the distance between two points in a coordinate system",
    makers: [distance, distance, legs, rootDistance, mapStory, bank(DISTANCE_IDEAS)],
  }),
  mathUnit({
    id: "ny-g8-linear-models",
    title: "Lines of Best Fit",
    emoji: "📉",
    blurb: "Predict with a linear model",
    parentNote: "Using the equation of a line of best fit to make predictions from data, and explaining what the slope and the y-intercept mean in the situation.",
    codes: "NY-8.SP.3",
    text: "using the equation of a linear model of two-variable data to solve problems, and interpreting its slope and intercept",
    makers: [predict, predict, solveFor, slopeMeaning, interceptMeaning, slopeFromPoints, bank(MODEL_IDEAS)],
  }),
];
