import { pick, randInt, shuffle } from "../../random";
import type { Visual } from "../../types";
import { eq, num, pickOne, someone, sp, typed, type Maker } from "../../washington/units/math-kit";
import { mathUnit } from "./math";

// Grade 6: dividing multi-digit numbers with the standard algorithm (6.NS.2), equivalent expressions and writing
// expressions with variables (6.EE.3, 6.EE.4, 6.EE.6), and the shape, center and spread of a distribution (6.SP.2).
// The shared helpers are in ./math.ts.

// ---------- Long division (6.NS.2) ----------

/** A divisor from 12 to 48 and a quotient with 2 or 3 digits (3 at difficulty 3). */
function division(d: number) {
  const divisor = randInt(12, 48);
  const quotient = d === 3 ? randInt(101, 899) : randInt(d === 1 ? 21 : 41, d === 1 ? 99 : 299);
  return { divisor, quotient, dividend: divisor * quotient };
}

const divideExact: Maker = (d) => {
  const { divisor, quotient, dividend } = division(d);
  const visual = eq(`${dividend} ÷ ${divisor} = ?`);
  const hint = `Divide step by step: how many ${divisor}s fit in the first digits, multiply, subtract, bring down the next digit. Check: ${quotient} × ${divisor} = ${sp(dividend)}.`;
  if (d >= 2) return typed(`What is ${sp(dividend)} ÷ ${divisor}?`, quotient, hint, { visual });
  return num(`What is ${sp(dividend)} ÷ ${divisor}?`, quotient, hint, { step: 10, extra: [quotient + 1, quotient - 1], visual });
};

const remainder: Maker = (d) => {
  const { divisor, quotient } = division(d);
  const r = randInt(1, divisor - 1);
  const dividend = divisor * quotient + r;
  return num(
    `What is the remainder when ${sp(dividend)} is divided by ${divisor}?`,
    r,
    `${quotient} × ${divisor} = ${sp(divisor * quotient)}. ${sp(dividend)} − ${sp(divisor * quotient)} = ${r}.`,
    { min: 0, max: divisor - 1, extra: [r + 1, r - 1, divisor - r] },
  );
};

const firstStep: Maker = () => {
  const divisor = randInt(13, 39);
  const first = randInt(2, 8);
  const lead = divisor * first + randInt(0, divisor - 1);
  if (lead > 99 || lead < 10) return divideExact(2);
  const dividend = lead * 100 + randInt(10, 99);
  return num(
    `To divide ${sp(dividend)} by ${divisor}, you start with ${lead} ÷ ${divisor}. How many times does ${divisor} go into ${lead}?`,
    first,
    `${first} × ${divisor} = ${first * divisor}, and ${first + 1} × ${divisor} = ${(first + 1) * divisor} is too big.`,
    { min: 1, max: 9 },
  );
};

const checkIt: Maker = () => {
  const { divisor, quotient, dividend } = division(2);
  return pickOne(
    `${someone()} found ${sp(dividend)} ÷ ${divisor} = ${quotient}. Which calculation checks the answer?`,
    `${quotient} × ${divisor}`,
    [`${quotient} + ${divisor}`, `${dividend} × ${divisor}`, `${quotient} ÷ ${divisor}`],
    "Division undoes multiplication: quotient × divisor should give the dividend.",
  );
};

const DIV_STORIES = [
  { s: "A theater has {n} seats in rows of {k}. How many rows are there?", unit: "rows" },
  { s: "A farm packs {n} eggs into cartons of {k}. How many cartons does it fill?", unit: "cartons" },
  { s: "A library shares {n} books equally among {k} classrooms. How many books does each classroom get?", unit: "books" },
  { s: "A bakery bakes {n} rolls and puts {k} in each tray. How many trays does it fill?", unit: "trays" },
];

const divideStory: Maker = (d) => {
  const { divisor, quotient, dividend } = division(d);
  const t = pick(DIV_STORIES);
  const prompt = t.s.replace("{n}", sp(dividend)).replace("{k}", String(divisor));
  const hint = `${sp(dividend)} ÷ ${divisor} = ${quotient} ${t.unit}.`;
  if (d === 3) return typed(prompt, quotient, hint);
  return num(prompt, quotient, hint, { step: 10, extra: [quotient + 1, quotient - 1] });
};

const digitsInQuotient: Maker = () => {
  const { divisor, quotient, dividend } = division(pick([1, 3]));
  const digits = String(quotient).length;
  return num(
    `How many digits will the quotient of ${sp(dividend)} ÷ ${divisor} have?`,
    digits,
    `Estimate: ${divisor} × 10 = ${divisor * 10} and ${divisor} × 100 = ${sp(divisor * 100)}. ${sp(dividend)} is ${dividend >= divisor * 100 ? "more" : "less"} than ${sp(divisor * 100)}.`,
    { min: 1, max: 5 },
  );
};

export const LONG_DIVISION_6 = mathUnit({
  id: "ca-g6-long-division",
  title: "Long Division",
  emoji: "➗",
  blurb: "Divide big numbers step by step",
  parentNote:
    "Dividing four- and five-digit numbers by two-digit numbers with the standard long-division method, finding remainders, checking with multiplication, and solving sharing and grouping problems.",
  codes: "6.NS.2",
  text: "fluently dividing multi-digit numbers using the standard algorithm",
  makers: [divideExact, remainder, firstStep, checkIt, divideStory, digitsInQuotient],
});

// ---------- Equivalent expressions (6.EE.3, 6.EE.4, 6.EE.6) ----------

const VARS = ["x", "y", "n", "a"];

const distribute: Maker = () => {
  const v = pick(VARS);
  const k = randInt(2, 9);
  const b = randInt(1, 9);
  const varFirst = pick([true, false]);
  const inside = varFirst ? `${v} + ${b}` : `${b} + ${v}`;
  const right = varFirst ? `${k}${v} + ${k * b}` : `${k * b} + ${k}${v}`;
  return pickOne(
    `Use the distributive property. Which expression is equivalent to ${k}(${inside})?`,
    right,
    varFirst ? [`${k}${v} + ${b}`, `${v} + ${k * b}`, `${k + b}${v}`] : [`${k * b} + ${v}`, `${b} + ${k}${v}`, `${k * b}${v}`],
    `Multiply each term inside by ${k}: ${k} × ${varFirst ? v : b} and ${k} × ${varFirst ? b : v}.`,
    eq(`${k}(${inside})`),
  );
};

const factorOut: Maker = (d) => {
  const g = randInt(2, 9);
  const [p, q] = shuffle([2, 3, 5, 7]).slice(0, 2);
  const v = pick(["x", "y"]);
  const expr = `${g * p}${v} + ${g * q}`;
  const prompt = `${expr} = ☐(${p}${v} + ${q}). What number goes in the box?`;
  const hint = `${g} × ${p}${v} = ${g * p}${v} and ${g} × ${q} = ${g * q}. The common factor is ${g}.`;
  if (d === 3) return typed(prompt, g, hint, { visual: eq(`${expr} = ☐(${p}${v} + ${q})`) });
  return num(prompt, g, hint, { min: 1, max: 20, extra: [g * p, g * q], visual: eq(`${expr} = ☐(${p}${v} + ${q})`) });
};

const likeTerms: Maker = () => {
  const v = pick(VARS);
  const [a, b, c] = [randInt(2, 9), randInt(2, 9), randInt(1, 9)];
  return pickOne(
    "Which expression is equivalent?",
    `${a + b}${v} + ${c}`,
    [`${a + b + c}${v}`, `${a * b}${v} + ${c}`, `${a + b}${v} + ${c}${v}`],
    `Combine the ${v} terms: ${a}${v} + ${b}${v} = ${a + b}${v}. The ${c} has no ${v}, so it stays.`,
    eq(`${a}${v} + ${c} + ${b}${v}`),
  );
};

const sameValue: Maker = () => {
  const k = randInt(2, 6);
  const b = randInt(1, 6);
  const v = pick(VARS);
  const pairs = shuffle([
    { left: `${k}(${v} + ${b})`, right: `${k}${v} + ${b}`, same: false },
    { left: `${k}(${v} + ${b})`, right: `${k}${v} + ${k * b}`, same: true },
    { left: `${v} + ${v} + ${v}`, right: `3${v}`, same: true },
    { left: `${v} + ${v} + ${v}`, right: `${v}³`, same: false },
    { left: `${k}${v} + ${b}`, right: `${k + b}${v}`, same: false },
  ]);
  const p = pairs[0];
  return pickOne(
    `Are ${p.left} and ${p.right} equivalent?`,
    p.same ? "Yes, they are equal for every value of " + v : "No, they give different values for some " + v,
    [p.same ? "No, they give different values for some " + v : "Yes, they are equal for every value of " + v],
    `Try a value, like ${v} = 2: ${p.left} and ${p.right}. Equivalent expressions match for every value.`,
  );
};

const testValue: Maker = () => {
  const k = randInt(2, 6);
  const b = randInt(1, 6);
  const x = randInt(2, 5);
  return num(
    `${someone()} checks whether ${k}(x + ${b}) and ${k}x + ${b} are equivalent by putting in x = ${x}. What is ${k}(x + ${b}) when x = ${x}?`,
    k * (x + b),
    `${k}(${x} + ${b}) = ${k} × ${x + b} = ${k * (x + b)}. (${k}x + ${b} gives ${k * x + b}, so they are not equivalent.)`,
    { min: 1, extra: [k * x + b] },
  );
};

const WRITE: { s: (v: string, k: number) => string; right: (v: string, k: number) => string; wrong: (v: string, k: number) => string[] }[] = [
  { s: (v, k) => `A box holds ${v} crayons. How many crayons are in ${k} boxes?`, right: (v, k) => `${k}${v}`, wrong: (v, k) => [`${v} + ${k}`, `${v} ÷ ${k}`, `${k} − ${v}`] },
  { s: (v, k) => `You have ${v} dollars and earn ${k} more. How many dollars now?`, right: (v, k) => `${v} + ${k}`, wrong: (v, k) => [`${k}${v}`, `${v} − ${k}`, `${k} − ${v}`] },
  { s: (v, k) => `${k} friends share ${v} grapes equally. How many grapes does each get?`, right: (v, k) => `${v} ÷ ${k}`, wrong: (v, k) => [`${k} ÷ ${v}`, `${k}${v}`, `${v} − ${k}`] },
  { s: (v, k) => `A rope is ${v} feet long. ${k} feet are cut off. How long is it now?`, right: (v, k) => `${v} − ${k}`, wrong: (v, k) => [`${k} − ${v}`, `${v} + ${k}`, `${k}${v}`] },
  { s: (v, k) => `Tickets cost ${k} dollars each, plus a 2-dollar fee for the order. What do ${v} tickets cost?`, right: (v, k) => `${k}${v} + 2`, wrong: (v, k) => [`${k}(${v} + 2)`, `${v} + ${k} + 2`, `2${v} + ${k}`] },
];

const writeExpression: Maker = () => {
  const w = pick(WRITE);
  const v = pick(["x", "n", "t"]);
  const k = randInt(3, 9);
  return pickOne(w.s(v, k), w.right(v, k), w.wrong(v, k), `The letter ${v} stands for the number you don't know. Write the operation the story describes.`);
};

const variableMeaning: Maker = () => {
  const k = randInt(3, 9);
  return pickOne(
    `The perimeter of a square is 4s. What does s stand for?`,
    "The length of one side, which can be any number",
    ["Always the number 4", "The area of the square", `Always the number ${k}`],
    "A variable stands for a number that can change. Here s is the side length.",
  );
};

export const EXPRESSIONS_6 = mathUnit({
  id: "ca-g6-expressions",
  title: "Equivalent Expressions",
  emoji: "🟰",
  blurb: "Rewrite expressions that mean the same",
  parentNote:
    "Writing expressions with a letter for an unknown number, using the distributive property and combining like terms to make equivalent expressions, and checking whether two expressions are equivalent by trying values.",
  codes: "6.EE.3; 6.EE.4; 6.EE.6",
  text: "applying the properties of operations to generate equivalent expressions, identifying equivalent expressions, and writing expressions with variables for problems",
  makers: [distribute, factorOut, likeTerms, sameValue, testValue, writeExpression, variableMeaning],
});

// ---------- Shape, center and spread (6.SP.2) ----------

const DOT_TOPICS = [
  { title: "Hours of sleep last night", start: 6 },
  { title: "Books read this month", start: 0 },
  { title: "Goals scored in a game", start: 0 },
  { title: "Pets in each home", start: 0 },
  { title: "Minutes to walk to school", start: 5 },
];

type Shape = "symmetric" | "right" | "left";
const SHAPES: Record<Shape, number[][]> = {
  symmetric: [
    [1, 2, 4, 2, 1],
    [1, 3, 5, 3, 1],
    [2, 3, 4, 3, 2],
  ],
  right: [
    [5, 4, 2, 1, 1],
    [4, 6, 3, 1, 1],
    [6, 3, 2, 1, 1],
  ],
  left: [
    [1, 1, 2, 4, 5],
    [1, 1, 3, 6, 4],
    [1, 1, 2, 3, 6],
  ],
};
const SHAPE_WORDS: Record<Shape, string> = {
  symmetric: "Roughly symmetric, with the peak in the middle",
  right: "Most values are low, with a tail stretching to the right",
  left: "Most values are high, with a tail stretching to the left",
};

function dotPlot(counts: number[]) {
  const t = pick(DOT_TOPICS);
  const values = counts.map((_, i) => t.start + i);
  const visual: Visual = { type: "table", title: `Dot plot: ${t.title}`, headers: ["Value", "Dots"], rows: values.map((v, i) => [v, "●".repeat(counts[i]) || "—"]) };
  return { t, values, visual };
}

const shapeOf: Maker = () => {
  const s = pick(["symmetric", "right", "left"] as Shape[]);
  const counts = pick(SHAPES[s]);
  const { visual } = dotPlot(counts);
  return pickOne(
    "Which describes the shape of this distribution?",
    SHAPE_WORDS[s],
    (Object.keys(SHAPE_WORDS) as Shape[]).filter((x) => x !== s).map((x) => SHAPE_WORDS[x]),
    "Look for where the dots pile up (the peak) and which way the thin tail stretches.",
    visual,
  );
};

const peakOf: Maker = () => {
  const counts = pick([...SHAPES.symmetric, ...SHAPES.right, ...SHAPES.left]);
  const { values, visual } = dotPlot(counts);
  const top = counts.indexOf(Math.max(...counts));
  return num("Where is the peak of this distribution?", values[top], "The peak is the value with the tallest stack of dots.", {
    min: values[0],
    max: values[values.length - 1],
    visual,
  });
};

const gapAt: Maker = () => {
  const counts = shuffle([1, 2, 3, 4]).slice(0, 3);
  const at = randInt(1, 3);
  const full = [...counts.slice(0, at), 0, ...counts.slice(at), 1];
  const { values, visual } = dotPlot(full);
  return num("At which value is there a gap with no data?", values[at], "A gap is a value inside the data with no dots.", {
    min: values[0],
    max: values[values.length - 1],
    visual,
  });
};

const rangeOf: Maker = () => {
  const counts = pick([...SHAPES.symmetric, ...SHAPES.right]);
  const { values, visual } = dotPlot(counts);
  return num(
    "What is the range of the data, a simple measure of its spread?",
    values[values.length - 1] - values[0],
    "Range = greatest value − least value.",
    { min: 0, visual },
  );
};

const medianOf: Maker = () => {
  const counts = pick([...SHAPES.symmetric, ...SHAPES.right, ...SHAPES.left].filter((c) => c.reduce((a, b) => a + b, 0) % 2 === 1));
  const { values, visual } = dotPlot(counts);
  const all = values.flatMap((v, i) => Array.from({ length: counts[i] }, () => v));
  const med = all[(all.length - 1) / 2];
  return num(
    `There are ${all.length} data values. What is the median, a measure of the center?`,
    med,
    `List the values in order. The middle one (number ${(all.length + 1) / 2}) is ${med}.`,
    { min: values[0], max: values[values.length - 1], visual },
  );
};

const moreSpread: Maker = () => {
  const a = randInt(2, 8);
  const tight = [a, a + 1, a + 1, a + 2, a + 2];
  const wide = [a - 2 + randInt(0, 1), a, a + 2, a + 4, a + 7].map((x) => Math.max(0, x));
  const swap = pick([true, false]);
  const [setA, setB] = swap ? [wide, tight] : [tight, wide];
  return pickOne(
    `Set A: ${setA.join(", ")}. Set B: ${setB.join(", ")}. Which set is more spread out?`,
    swap ? "Set A" : "Set B",
    [swap ? "Set B" : "Set A", "They have the same spread"],
    "Compare the ranges: the set whose values are farther apart has more spread.",
  );
};

const describeWith: Maker = () =>
  pickOne(
    "A set of data collected to answer a statistical question has a distribution. What three things describe it?",
    "Its center, its spread and its overall shape",
    ["Its biggest value only", "How many people collected it", "The color of the graph"],
    "Describe a distribution by where it centers, how spread out it is and its shape.",
  );

export const DATA_SHAPE_6 = mathUnit({
  id: "ca-g6-data-shape",
  title: "Shape of the Data",
  emoji: "📈",
  blurb: "Peaks, tails, gaps and spread",
  parentNote:
    "Describing a set of data by its center (median), its spread (range) and its overall shape on a dot plot: symmetric or with a tail to one side, peaks and gaps.",
  codes: "6.SP.2",
  text: "describing the distribution of a data set by its center, spread and overall shape",
  makers: [shapeOf, peakOf, gapAt, rangeOf, medianOf, moreSpread, describeWith],
});

export const MATH_6 = [LONG_DIVISION_6, EXPRESSIONS_6, DATA_SHAPE_6];
