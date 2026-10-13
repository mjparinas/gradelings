import { chance, pick, randInt, sample, shuffle } from "../../random";
import type { Visual } from "../../types";
import { type Maker, eq, fmt, frac, fracChoice, fracKey, gcd, linear, mathUnit, mixed, num, par, pickOne, signed, someone, sup, typed } from "./math-kit";

// Washington's own math units for Grades 6 to 9 (Grade 9 is Algebra 1): fraction division, statistics, the four
// quadrants, unit rates, nets, signed numbers, proportional relationships, angles, sampling, scale drawings,
// exponents, systems, functions, slope, two-way tables, inequalities, exponential growth, factoring and formulas.

const nonZero = (lo: number, hi: number): number => {
  for (;;) {
    const n = randInt(lo, hi);
    if (n !== 0) return n;
  }
};

// ---------- Grade 6: dividing fractions ----------

const divFrac: Maker = (d) => {
  for (;;) {
    const b = randInt(2, d === 1 ? 6 : 10);
    const e = randInt(2, d === 1 ? 6 : 10);
    const a = randInt(1, b - 1);
    const c = randInt(1, e - 1);
    if (gcd(a, b) !== 1 || gcd(c, e) !== 1 || a * e === c * b) continue;
    const [n, den] = [a * e, b * c];
    const q = `What is ${a}/${b} ÷ ${c}/${e}?`;
    const hint = `Multiply by the reciprocal: ${a}/${b} × ${e}/${c}.`;
    if (d === 3) return typed(`${q} Type a fraction.`, fracKey(n, den), hint, { keypad: "fraction", accept: [`${n}/${den}`], visual: eq(`${a}/${b} ÷ (${c}/${e}) = ?`) });
    return fracChoice(q, [n, den], [[a * c, b * e], [b * c, a * e], [a * e + 1, b * c], [a + c, b + e]], hint, frac, eq(`${a}/${b} ÷ (${c}/${e}) = ?`));
  }
};

const servings: Maker = () => {
  const den = pick([2, 3, 4, 8]);
  const nu = den === 2 ? 1 : pick([1, den - 1].filter((x) => gcd(x, den) === 1));
  const k = randInt(2, 9);
  const total = (k * nu) / den;
  if (!Number.isInteger(total)) return servings(2);
  return num(`How many ${nu}/${den}-cup servings are in ${total} cups of trail mix?`, k, `${total} ÷ ${nu}/${den} = ${total} × ${den}/${nu}.`, { extra: [k + 1, total * nu, total + den], count: 5, min: 1 });
};

const reciprocalMatch: Maker = () => {
  const b = randInt(2, 9);
  const e = randInt(2, 9);
  const [a, c] = [randInt(1, b - 1), randInt(1, e - 1)];
  return pickOne(`Which multiplication has the same answer as ${a}/${b} ÷ ${c}/${e}?`, `${a}/${b} × ${e}/${c}`, [`${b}/${a} × ${c}/${e}`, `${a}/${b} × ${c}/${e}`, `${b}/${a} × ${e}/${c}`], "Dividing by a fraction is the same as multiplying by its reciprocal (flip the second fraction).");
};

const pathStory: Maker = () => {
  const len = pick([[3, 4], [2, 3], [5, 6], [7, 8], [1, 2]] as const);
  const piece = pick([[1, 8], [1, 12], [1, 6], [1, 4], [1, 3]] as const);
  const [n, den] = [len[0] * piece[1], len[1] * piece[0]];
  if (n % den !== 0 || n / den < 2) return pathStory(2);
  return num(`A trail is ${len[0]}/${len[1]} mile long. Signs are placed every ${piece[0]}/${piece[1]} mile. How many sections does that make?`, n / den, `${len[0]}/${len[1]} ÷ ${piece[0]}/${piece[1]} = ${len[0]}/${len[1]} × ${piece[1]}/${piece[0]}.`, { extra: [n / den + 1, n / den - 1, n / den * 2], count: 4, min: 1 });
};

// ---------- Grade 6: centre and spread ----------

function dataOf(n: number, lo: number, hi: number): number[] {
  return Array.from({ length: n }, () => randInt(lo, hi));
}
const sorted = (xs: number[]) => [...xs].sort((a, b) => a - b);
const median = (xs: number[]) => {
  const s = sorted(xs);
  const m = s.length >> 1;
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

const findMean: Maker = (d) => {
  for (;;) {
    const xs = dataOf(d === 1 ? 4 : 5, 2, d === 3 ? 40 : 20);
    const sum = xs.reduce((a, b) => a + b, 0);
    if (sum % xs.length) continue;
    const mean = sum / xs.length;
    const med = median(xs);
    return num(`What is the mean of ${xs.join(", ")}?`, mean, `Add them (${sum}) and divide by ${xs.length}.`, { extra: [med, mean + 1, Math.max(...xs) - Math.min(...xs)], count: 5, min: 0 });
  }
};

const findMedian: Maker = (d) => {
  const xs = dataOf(d === 1 ? 5 : pick([5, 6, 7]), 1, 30);
  const med = median(xs);
  return num(`What is the median of ${xs.join(", ")}?`, med, "Put the numbers in order. The median is the middle one (or the mean of the two middle ones).", { extra: [xs[xs.length >> 1], med + 1, med - 1, med + 0.5], count: 5, min: 0 });
};

const findRange: Maker = () => {
  const xs = dataOf(6, 3, 60);
  const r = Math.max(...xs) - Math.min(...xs);
  if (r === 0) return findRange(2);
  return num(`What is the range of ${xs.join(", ")}?`, r, "Range = greatest − least.", { extra: [Math.max(...xs), median(xs), r + 1], count: 5, min: 0 });
};

const findIqr: Maker = () => {
  // Eight values: Q1 is the median of the lower four, Q3 of the upper four.
  for (;;) {
    const xs = sorted(dataOf(8, 1, 40));
    const q1 = (xs[1] + xs[2]) / 2;
    const q3 = (xs[5] + xs[6]) / 2;
    if (!Number.isInteger(q1) || !Number.isInteger(q3) || q3 === q1) continue;
    return num(`What is the interquartile range (IQR) of ${shuffle(xs).join(", ")}?`, q3 - q1, `Order the data. Q1 = ${q1} (middle of the lower half), Q3 = ${q3} (middle of the upper half). IQR = Q3 − Q1.`, { extra: [xs[7] - xs[0], q3, q1], count: 5, min: 0 });
  }
};

const STAT_Q = [
  "How many hours do students in my class sleep on school nights?",
  "How long are the songs on my favourite playlist?",
  "How many books did each student in our grade read this month?",
  "How tall are the sunflowers in the school garden?",
  "How many minutes does it take students at my school to get to school?",
];
const NOT_STAT = ["How many hours did I sleep last night?", "How tall is the school flagpole?", "What time does school start?", "How many students are in Room 12?", "How many days are in a leap year?"];
const statQuestion: Maker = () => pickOne("Which is a statistical question?", pick(STAT_Q), sample(NOT_STAT, 3), "A statistical question expects answers that vary, so you collect data to answer it.");

const outlierEffect: Maker = () => {
  const base = sorted(dataOf(5, 10, 20));
  const big = randInt(70, 99);
  return pickOne(`The data ${[...base, big].join(", ")} has one very large value. Which measure describes the typical value best?`, "The median", ["The mean", "The range"], "One extreme value pulls the mean and range a long way, but the median barely moves.");
};

// ---------- Grade 6: four quadrants ----------

const QUAD = ["Quadrant I", "Quadrant II", "Quadrant III", "Quadrant IV"];
const quadrantOf = (x: number, y: number) => (x > 0 ? (y > 0 ? 0 : 3) : y > 0 ? 1 : 2);

const readSignedPoint: Maker = () => {
  const [x, y] = [nonZero(-6, 6), nonZero(-6, 6)];
  const [w1, w2, w3] = [`(${fmt(-x)}, ${fmt(y)})`, `(${fmt(y)}, ${fmt(x)})`, `(${fmt(x)}, ${fmt(-y)})`];
  return pickOne("What are the coordinates of point P?", `(${fmt(x)}, ${fmt(y)})`, [w1, w2, w3], "Read across to x first (left is negative), then up or down to y (down is negative).", { type: "grid", size: 6, min: -6, points: [{ x, y, label: "P" }] });
};

const whichQuadrant: Maker = () => {
  const [x, y] = [nonZero(-9, 9), nonZero(-9, 9)];
  const q = quadrantOf(x, y);
  return pickOne(`Which quadrant is the point (${fmt(x)}, ${fmt(y)}) in?`, QUAD[q], QUAD.filter((_, i) => i !== q), "I: (+, +). II: (−, +). III: (−, −). IV: (+, −).");
};

const reflectPoint: Maker = () => {
  const [x, y] = [nonZero(-8, 8), nonZero(-8, 8)];
  const axis = pick(["x", "y"]);
  const right = axis === "x" ? `(${fmt(x)}, ${fmt(-y)})` : `(${fmt(-x)}, ${fmt(y)})`;
  return pickOne(`The point (${fmt(x)}, ${fmt(y)}) is reflected across the ${axis}-axis. Where does it land?`, right, [axis === "x" ? `(${fmt(-x)}, ${fmt(y)})` : `(${fmt(x)}, ${fmt(-y)})`, `(${fmt(-x)}, ${fmt(-y)})`, `(${fmt(y)}, ${fmt(x)})`], axis === "x" ? "Across the x-axis, the y-coordinate changes sign." : "Across the y-axis, the x-coordinate changes sign.");
};

const signedDistance: Maker = (d) => {
  const y = nonZero(-8, 8);
  const x1 = randInt(-9, -1);
  const x2 = randInt(1, 9);
  const across = chance(0.5);
  const A = across ? `(${fmt(x1)}, ${fmt(y)})` : `(${fmt(y)}, ${fmt(x1)})`;
  const B = across ? `(${fmt(x2)}, ${fmt(y)})` : `(${fmt(y)}, ${fmt(x2)})`;
  const q = `How far apart are ${A} and ${B}?`;
  const hint = `The points are on opposite sides of an axis, so add the distances: ${Math.abs(x1)} + ${x2}.`;
  return d === 3 ? typed(q, x2 - x1, hint, { suffix: "units" }) : num(q, x2 - x1, hint, { extra: [x2 + x1, Math.abs(x2 + x1)], count: 4, min: 1 });
};

const rectangleSide: Maker = () => {
  const [x1, x2] = [randInt(-7, -1), randInt(1, 7)];
  const [y1, y2] = [randInt(-6, -1), randInt(1, 6)];
  const area = (x2 - x1) * (y2 - y1);
  return num(`A rectangle has corners (${x1}, ${y1}), (${x2}, ${y1}), (${x2}, ${y2}) and (${x1}, ${y2}). What is its area?`.replace(/-/g, "−"), area, `Width = ${x2} − (${x1}) = ${x2 - x1}. Height = ${y2} − (${y1}) = ${y2 - y1}.`.replace(/\(-/g, "(−"), { extra: [(x2 + x1) * (y2 + y1), 2 * (x2 - x1 + y2 - y1), area + x2 - x1], count: 5, min: 1, label: (n) => `${n} square units` });
};

// ---------- Grade 6: unit rates ----------

const unitPrice: Maker = () => {
  const n = randInt(2, 8);
  const each = randInt(2, 15) * 25;
  const total = n * each;
  return num(`${n} notebooks cost $${(total / 100).toFixed(2)}. What is the price of one notebook?`, each / 100, `Divide: $${(total / 100).toFixed(2)} ÷ ${n}.`, { step: 0.25, extra: [total / 100 - n, (each + 100) / 100], count: 5, min: 0.25, label: (x) => `$${x.toFixed(2)}` });
};

const speed: Maker = () => {
  const r = randInt(3, 12) * 5;
  const h = randInt(2, 6);
  const [what, unit] = pick([["A car drives", "miles"], ["A train travels", "miles"], ["A cyclist rides", "kilometres"]] as const);
  return num(`${what} ${r * h} ${unit} in ${h} hours at a steady speed. How many ${unit} per hour is that?`, r, `${r * h} ÷ ${h}.`, { step: 5, extra: [r * h - h, r + h], count: 5, min: 1 });
};

const betterBuy: Maker = () => {
  const p1 = randInt(2, 6) * 50;
  const n1 = randInt(2, 4);
  const n2 = n1 + randInt(1, 3);
  let p2 = p1 + randInt(-2, 2) * 25;
  if (p2 === p1 || p2 <= 0) p2 += 25;
  const u1 = (n1 * p1) / n1;
  const u2 = p2;
  const cheaper = u1 < u2 ? 1 : 2;
  const a = `${n1} for $${((n1 * p1) / 100).toFixed(2)}`;
  const b = `${n2} for $${((n2 * p2) / 100).toFixed(2)}`;
  return pickOne(`Which is the better buy for granola bars: ${a} or ${b}?`, cheaper === 1 ? a : b, [cheaper === 1 ? b : a], `Find the price of one bar each way: $${(u1 / 100).toFixed(2)} and $${(u2 / 100).toFixed(2)}.`);
};

const rateTable: Maker = () => {
  const r = randInt(2, 12);
  const xs = sample([1, 2, 3, 4, 5, 6, 8, 10], 3).sort((a, b) => a - b);
  const ask = xs[2] + randInt(1, 4);
  const [a, b] = pick([["Hours", "Dollars earned"], ["Minutes", "Pages read"], ["Gallons", "Miles"]] as const);
  return num("The table shows a constant rate. What number goes where the ? is?", ask * r, `Unit rate: ${xs[0] * r} ÷ ${xs[0]} = ${r} per 1. Then ${ask} × ${r}.`, {
    step: r,
    extra: [ask * r + 1, ask + r],
    count: 5,
    visual: { type: "table", headers: [a, b], rows: [...xs.map((x) => [x, x * r]), [ask, "?"]] },
  });
};

const ratioConvert: Maker = () => {
  const [q, ans, hint] = pick([
    (() => { const y = randInt(2, 9); return [`There are 3 feet in 1 yard. How many feet are in ${y} yards?`, y * 3, `Multiply ${y} × 3.`] as const; })(),
    (() => { const p = randInt(2, 9); return [`There are 16 ounces in 1 pound. How many ounces are in ${p} pounds?`, p * 16, `Multiply ${p} × 16.`] as const; })(),
    (() => { const g = randInt(2, 9); return [`There are 4 quarts in 1 gallon. How many gallons are ${g * 4} quarts?`, g, `Divide ${g * 4} ÷ 4.`] as const; })(),
    (() => { const f = randInt(2, 9); return [`There are 12 inches in 1 foot. How many feet are ${f * 12} inches?`, f, `Divide ${f * 12} ÷ 12.`] as const; })(),
  ]);
  return num(q, ans, hint, { extra: [ans * 2, ans + 3], count: 5, min: 1 });
};

// ---------- Grade 6: nets and surface area ----------

const prismSA: Maker = (d) => {
  const [l, w, h] = [randInt(2, 9), randInt(2, 7), randInt(2, 8)];
  const sa = 2 * (l * w + l * h + w * h);
  const q = `A box is ${l} cm by ${w} cm by ${h} cm. Use its net to find its surface area.`;
  const hint = `The net has 3 pairs of rectangles: 2 × (${l} × ${w}) + 2 × (${l} × ${h}) + 2 × (${w} × ${h}).`;
  return d === 3 ? typed(q, sa, hint, { suffix: "cm²" }) : num(q, sa, hint, { extra: [l * w * h, sa / 2, l * w + l * h + w * h + l * w], count: 5, label: (n) => `${n} cm²` });
};

const cubeSA: Maker = () => {
  const s = randInt(2, 10);
  return num(`A cube has edges ${s} in long. What is its surface area?`, 6 * s * s, `A cube's net is 6 squares, each ${s} × ${s} = ${s * s} in².`, { extra: [s * s * s, 4 * s * s, 6 * s], count: 5, label: (n) => `${n} in²` });
};

const pyramidSA: Maker = () => {
  const s = randInt(2, 8);
  const slant = randInt(3, 10);
  const sa = s * s + 4 * ((s * slant) / 2);
  return num(`A square pyramid has a base ${s} ft on each side. Each triangle face has a height of ${slant} ft. What is its surface area?`, sa, `Base: ${s} × ${s} = ${s * s}. Each triangle: ½ × ${s} × ${slant} = ${(s * slant) / 2}. Add the base and 4 triangles.`, { extra: [s * s + 4 * s * slant, 4 * ((s * slant) / 2), sa + s * s], count: 5, label: (n) => `${fmt(n)} ft²` });
};

const NETS = [
  ["a cube", "6 squares", ["4 squares", "5 squares and 1 triangle", "2 circles and 1 rectangle"]],
  ["a square pyramid", "1 square and 4 triangles", ["2 squares and 4 rectangles", "4 squares", "1 circle and 1 triangle"]],
  ["a triangular prism", "2 triangles and 3 rectangles", ["3 triangles and 2 rectangles", "4 triangles", "1 square and 4 triangles"]],
  ["a rectangular prism", "6 rectangles", ["4 rectangles and 2 triangles", "6 triangles", "5 rectangles"]],
  ["a triangular pyramid", "4 triangles", ["3 triangles and 1 square", "2 triangles and 3 rectangles", "6 triangles"]],
] as const;
const netFaces: Maker = () => {
  const [solid, right, wrong] = pick(NETS);
  return pickOne(`Which shapes make up a net of ${solid}?`, right, [...wrong], "Picture unfolding the solid. Count each face and its shape.");
};

// ---------- Grade 7: multiplying and dividing signed numbers ----------

const signedProduct: Maker = (d) => {
  const a = nonZero(-12, 12);
  const b = nonZero(-12, 12);
  if (a > 0 && b > 0) return signedProduct(d);
  const text = `${fmt(a)} × ${par(b)}`;
  return d === 1
    ? pickOne(`Is ${text} positive or negative?`, a * b > 0 ? "Positive" : "Negative", [a * b > 0 ? "Negative" : "Positive", "Zero"], "Same signs give a positive answer. Different signs give a negative answer.")
    : typed(`What is ${text}?`, a * b, "Multiply the sizes, then use the sign rule: same signs positive, different signs negative.", { keypad: "integer", visual: eq(`${text} = ?`) });
};

const signedQuotient: Maker = () => {
  const b = nonZero(-9, 9);
  const q = nonZero(-12, 12);
  const a = b * q;
  if (a > 0 && b > 0) return signedQuotient(2);
  const text = `${fmt(a)} ÷ ${par(b)}`;
  return typed(`What is ${text}?`, q, "Divide the sizes, then use the sign rule: same signs positive, different signs negative.", { keypad: "integer", visual: eq(`${text} = ?`) });
};

const threeSigns: Maker = () => {
  const xs = [nonZero(-6, 6), nonZero(-6, 6), nonZero(-6, 6)];
  const p = xs[0] * xs[1] * xs[2];
  return pickOne(`Without multiplying: is ${xs.map(par).join(" × ")} positive or negative?`, p > 0 ? "Positive" : "Negative", [p > 0 ? "Negative" : "Positive"], "Count the negative factors. An even number of them gives a positive product; an odd number gives a negative one.");
};

const tempDrop: Maker = () => {
  const drop = randInt(2, 6);
  const hrs = randInt(2, 8);
  return typed(`The temperature falls ${drop} degrees every hour for ${hrs} hours. What is the total change in temperature, in degrees? (Use a negative number for a fall.)`, -drop * hrs, `${hrs} × (−${drop}) = −${drop * hrs}.`, { keypad: "integer" });
};

const signedFraction: Maker = () => {
  const den = pick([2, 3, 4, 5]);
  const k = randInt(1, 6) * den;
  const neg = chance(0.5);
  const text = `${neg ? "−" : ""}1/${den} × ${par(neg ? k : -k)}`;
  return num(`What is ${text}?`, -k / den, `${k} ÷ ${den} = ${k / den}. One factor is negative, so the answer is negative.`, { extra: [k / den, -k * den], count: 4, min: -100, label: (n) => (n < 0 ? `-${Math.abs(n)}` : String(n)) });
};

const debtStory: Maker = () => {
  const people = pick([2, 3, 4, 5]);
  const total = people * randInt(2, 9);
  return typed(`A change of −$${total} is shared equally by ${people} friends. What is each friend's change, in dollars?`, -total / people, `−${total} ÷ ${people} = −${total / people}.`, { keypad: "integer" });
};

// ---------- Grade 7: proportional relationships ----------

const isProportional: Maker = () => {
  const k = randInt(2, 9);
  const prop = chance(0.5);
  const b = prop ? 0 : randInt(1, 6);
  const xs = sample([1, 2, 3, 4, 5, 6, 8, 10], 3).sort((a, c) => a - c);
  return pickOne("Does the table show a proportional relationship?", prop ? `Yes, y ÷ x is always ${k}` : "No, y ÷ x is not the same for every pair", [prop ? "No, y ÷ x is not the same for every pair" : `Yes, y ÷ x is always ${k}`], "Divide y by x for each row. In a proportional relationship the ratio is always the same.", {
    type: "table",
    headers: ["x", "y"],
    rows: xs.map((x) => [x, k * x + b]),
  });
};

const constantK: Maker = () => {
  const k = randInt(2, 15);
  const xs = sample([2, 3, 4, 5, 6, 8], 3).sort((a, b) => a - b);
  return num("What is the constant of proportionality (y ÷ x) in the table?", k, `${xs[0] * k} ÷ ${xs[0]} = ${k}.`, { extra: [xs[0] * k, k + xs[0]], count: 4, min: 1, visual: { type: "table", headers: ["x", "y"], rows: xs.map((x) => [x, k * x]) } });
};

const equationK: Maker = () => {
  const k = randInt(2, 12);
  const x = randInt(2, 9);
  return pickOne(`y is proportional to x, and y = ${k * x} when x = ${x}. Which equation fits?`, `y = ${k}x`, [`y = ${x}x`, `y = x + ${k * x - x}`, `y = ${k * x}x`], `k = y ÷ x = ${k * x} ÷ ${x} = ${k}.`);
};

const fractionRate: Maker = () => {
  const [a, b, c, e, ans, unit] = pick([
    [1, 2, 1, 4, "2", "miles per hour"],
    [3, 4, 1, 2, "1 1/2", "cups per batch"],
    [1, 3, 1, 6, "2", "laps per minute"],
    [2, 3, 1, 3, "2", "pages per minute"],
    [3, 4, 1, 4, "3", "miles per hour"],
    [1, 2, 3, 4, "2/3", "cups per batch"],
    [5, 8, 1, 4, "2 1/2", "miles per hour"],
  ] as const);
  const [x, y] = unit === "miles per hour" ? ["walks", `${a}/${b} mile in ${c}/${e} hour`] : unit === "cups per batch" ? ["uses", `${a}/${b} cup of flour for ${c}/${e} batch`] : unit === "laps per minute" ? ["swims", `${a}/${b} lap in ${c}/${e} minute`] : ["reads", `${a}/${b} page in ${c}/${e} minute`];
  const n = a * e;
  const den = b * c;
  return fracChoice(`${someone()} ${x} ${y}. What is the unit rate in ${unit}?`, [n, den], [[a * c, b * e], [den, n], [n + den, den]], `Divide: ${a}/${b} ÷ ${c}/${e} = ${ans}.`, (p, q) => `${mixed(p, q)} ${unit}`);
};

const unitRatePoint: Maker = () => {
  const r = randInt(2, 12);
  return pickOne(`The graph of a proportional relationship passes through (1, ${r}). What does ${r} tell you?`, "The unit rate: y for each 1 of x", ["Where the line starts on the y-axis", "The total of x and y", "How many points are on the graph"], "At x = 1, the y-value is the amount per one unit: the unit rate.");
};

// ---------- Grade 7: angle relationships ----------

const complement: Maker = (d) => {
  const a = randInt(10, 80);
  const kind = pick(["complementary", "supplementary"]);
  const total = kind === "complementary" ? 90 : 180;
  const x = kind === "complementary" ? a : randInt(20, 160);
  const q = `Two angles are ${kind}. One is ${x}°. What is the other?`;
  const hint = `${kind === "complementary" ? "Complementary angles add to 90°" : "Supplementary angles add to 180°"}. ${total} − ${x}.`;
  return d === 3 ? typed(q, total - x, hint, { suffix: "°" }) : num(q, total - x, hint, { extra: [(kind === "complementary" ? 180 : 90) - x, x], count: 4, min: 1, label: (n) => `${n}°` });
};

const vertical: Maker = () => {
  const a = randInt(25, 155);
  const ask = pick(["vertical", "adjacent"]);
  return num(`Two lines cross. One angle is ${a}°. What is the angle ${ask === "vertical" ? "vertically opposite to it" : "next to it on the same line"}?`, ask === "vertical" ? a : 180 - a, ask === "vertical" ? "Vertical angles are equal." : "Angles next to each other on a straight line add to 180°.", { extra: [ask === "vertical" ? 180 - a : a, 90 - a, 360 - a], count: 4, min: 1, label: (n) => `${n}°` });
};

const solveAngle: Maker = () => {
  const total = pick([90, 180]);
  const k = pick([2, 3, 4, 5]);
  const x = total / (k + 1);
  if (!Number.isInteger(x)) return solveAngle(2);
  return num(`Two angles are ${total === 90 ? "complementary" : "supplementary"}. One is x and the other is ${k}x. What is x?`, x, `x + ${k}x = ${k + 1}x = ${total}. Divide by ${k + 1}.`, { extra: [x * k, total / k, x + 10], count: 4, min: 1, label: (n) => `${fmt(n)}°` });
};

const threeOnLine: Maker = () => {
  const a = randInt(20, 70);
  const b = randInt(20, 70);
  return num(`Three angles sit side by side on a straight line. Two of them are ${a}° and ${b}°. What is the third?`, 180 - a - b, `They add to 180°: 180 − ${a} − ${b}.`, { extra: [360 - a - b, 90 - Math.min(a, b), a + b], count: 4, min: 1, label: (n) => `${n}°` });
};

// ---------- Grade 7: samples and populations ----------

const SAMPLE_SETS = [
  ["which lunch students at a school like best", "40 students picked at random from the whole school's list", ["the 40 students in the chess club", "the first 40 students in the lunch line for pizza", "the 40 students in one Grade 8 class"]],
  ["how many hours teens in a town spend online", "100 teens chosen at random from the town's high schools", ["100 teens at a video game store", "the 100 teens who answer an online poll", "100 members of the town's running club"]],
  ["the favourite sport of students at a school", "50 students chosen by a random draw of student numbers", ["50 students at a basketball game", "the 50 students on the soccer team", "50 friends of the survey writer"]],
  ["how voters in a city feel about a new park", "200 voters picked at random from the city's voter list", ["200 people at a park opening", "200 people who live next to the park", "the first 200 people who email the city"]],
] as const;
const representative: Maker = () => {
  const [topic, right, wrong] = pick(SAMPLE_SETS);
  return pickOne(`You want to know ${topic}. Which sample is most likely to represent the population?`, right, [...wrong], "A random sample from the whole population gives everyone the same chance to be picked.");
};

const estimatePop: Maker = (d) => {
  const n = pick([20, 25, 40, 50]);
  const yes = randInt(2, n - 2);
  const pop = n * randInt(5, 20);
  const est = (yes / n) * pop;
  const what = pick(["walk to school", "play an instrument", "have a library card", "ride the bus"]);
  const q = `In a random sample of ${n} students, ${yes} ${what}. About how many of the ${pop} students at the school ${what}?`;
  const hint = `${yes} out of ${n} is ${yes}/${n}. ${yes}/${n} × ${pop} = ${fmt(est)}.`;
  return d === 3 ? typed(q, Math.round(est), hint) : num(q, Math.round(est), hint, { extra: [yes * 10, pop - Math.round(est), Math.round(est) + n], count: 4, min: 0 });
};

const POP = [
  ["A school asks 60 of its 900 students about field trips.", "all 900 students", ["the 60 students asked", "the field trips", "the teachers"]],
  ["A park ranger tags 30 of the deer in a park to study them.", "all the deer in the park", ["the 30 tagged deer", "the park rangers", "the trees in the park"]],
  ["A factory tests 25 light bulbs from a batch of 5000.", "all 5000 light bulbs", ["the 25 bulbs tested", "the factory workers", "the boxes of bulbs"]],
] as const;
const whatPopulation: Maker = () => {
  const [story, right, wrong] = pick(POP);
  return pickOne(`${story} What is the population?`, right, [...wrong], "The population is the whole group you want to learn about. The sample is the part you actually check.");
};

const compareSamples: Maker = () => {
  const n1 = pick([20, 30]);
  const n2 = pick([200, 300]);
  return pickOne(`One random sample has ${n1} people and another has ${n2}. Which estimate of the population is likely to be closer?`, `The sample of ${n2}`, [`The sample of ${n1}`, "They will always be exactly the same"], "Bigger random samples usually vary less, so their estimates tend to be closer.");
};

// ---------- Grade 7: scale drawings ----------

const scaleLength: Maker = (d) => {
  const [unit, real, k] = pick([["cm", "m", randInt(2, 10)], ["in", "ft", randInt(2, 12)]] as const);
  const draw = randInt(2, 12);
  const q = `On a map, 1 ${unit} stands for ${k} ${real}. A path is ${draw} ${unit} long on the map. How long is it really?`;
  return d === 3 ? typed(q, draw * k, `${draw} × ${k}.`, { suffix: real }) : num(q, draw * k, `${draw} × ${k}.`, { extra: [draw + k, draw * k + k], count: 4, label: (n) => `${n} ${real}` });
};

const scaleBack: Maker = () => {
  const k = pick([2, 4, 5, 10]);
  const draw = randInt(2, 12);
  return num(`A scale drawing uses 1 in = ${k} ft. A wall is ${draw * k} ft long. How long is it on the drawing?`, draw, `${draw * k} ÷ ${k}.`, { extra: [draw * k * k, draw + 1], count: 4, min: 1, label: (n) => `${n} in` });
};

const scaleArea: Maker = () => {
  const k = pick([2, 3, 5, 10]);
  const [a, b] = [randInt(2, 6), randInt(2, 6)];
  const real = a * k * (b * k);
  return num(`A room is drawn as a ${a} in by ${b} in rectangle. The scale is 1 in = ${k} ft. What is the real area?`, real, `Real sides: ${a * k} ft and ${b * k} ft. Area = ${a * k} × ${b * k}.`, { extra: [a * b * k, a * b, real / k], count: 4, label: (n) => `${n} ft²` });
};

const newScale: Maker = () => {
  const k = pick([2, 4, 5]);
  const draw = randInt(2, 8) * 2;
  const k2 = k * 2;
  return num(`A drawing at 1 cm = ${k} m shows a fence ${draw} cm long. It is redrawn at 1 cm = ${k2} m. How long is the fence on the new drawing?`, draw / 2, `Real length = ${draw * k} m. New drawing: ${draw * k} ÷ ${k2}.`, { extra: [draw * 2, draw], count: 4, label: (n) => `${n} cm` });
};

// ---------- Grade 8: exponent rules ----------

const expProduct: Maker = () => {
  const b = randInt(2, 9);
  const m = randInt(2, 9);
  const n = randInt(2, 9);
  return pickOne(`Simplify ${b}${sup(m)} × ${b}${sup(n)}.`, `${b}${sup(m + n)}`, [`${b}${sup(m * n)}`, `${b * b}${sup(m + n)}`, `${b}${sup(Math.abs(m - n) || 1)}`], "When you multiply powers with the same base, add the exponents.");
};
const expQuotient: Maker = () => {
  const b = randInt(2, 9);
  const n = randInt(2, 6);
  const m = n + randInt(1, 6);
  return pickOne(`Simplify ${b}${sup(m)} ÷ ${b}${sup(n)}.`, `${b}${sup(m - n)}`, [`${b}${sup(m + n)}`, `1${sup(m - n)}`, `${b}${sup(Math.round(m / n) === m - n ? m * n : Math.round(m / n) || 1)}`], "When you divide powers with the same base, subtract the exponents.");
};
const expPower: Maker = () => {
  const b = randInt(2, 9);
  const m = randInt(2, 5);
  const n = randInt(2, 5);
  return pickOne(`Simplify (${b}${sup(m)})${sup(n)}.`, `${b}${sup(m * n)}`, [`${b}${sup(m + n)}`, `${b * n}${sup(m)}`, `${b}${sup(m * n + 1)}`], "A power of a power: multiply the exponents.");
};
const expNegative: Maker = (d) => {
  const b = pick([2, 3, 4, 5, 10]);
  const n = randInt(1, b === 2 ? 5 : b === 10 ? 3 : 3);
  const value = b ** n;
  if (d === 1) return pickOne(`What is ${b}${sup(0)}?`, "1", ["0", String(b), "Undefined"], "Any non-zero number to the power 0 is 1.");
  return pickOne(`What is ${b}${sup(-n)}?`, `1/${value}`, [`−${value}`, `${value}`, `−1/${value}`], `A negative exponent means one over: ${b}${sup(-n)} = 1/${b}${sup(n)} = 1/${value}.`);
};
const expEvaluate: Maker = () => {
  const b = pick([2, 3, 5]);
  const m = randInt(2, 6);
  const n = -randInt(1, m - 1);
  const value = b ** (m + n);
  return num(`What is the value of ${b}${sup(m)} × ${b}${sup(n)}?`, value, `Add the exponents: ${m} + (${n}) = ${m + n}. ${b}${sup(m + n)} = ${value}.`, { extra: [b ** m, b ** (m - n), value * b], count: 4, min: 1 });
};

// ---------- Grade 8: systems of equations ----------

function lineThrough(x: number, y: number, avoid?: number): [number, number] {
  for (;;) {
    const m = nonZero(-4, 4);
    if (m === avoid) continue;
    return [m, y - m * x];
  }
}
const pt = (x: number, y: number) => `(${fmt(x)}, ${fmt(y)})`;

const systemMeet: Maker = () => {
  const [x, y] = [randInt(-5, 5), randInt(-6, 6)];
  const [m1, b1] = lineThrough(x, y);
  const [m2, b2] = lineThrough(x, y, m1);
  return pickOne(`Where do the lines y = ${linear(m1, b1)} and y = ${linear(m2, b2)} meet?`, pt(x, y), [pt(y, x), pt(x, y + 1), pt(-x, y), pt(x + 1, m1 * (x + 1) + b1)], "Set the two expressions equal and solve for x. Then find y.");
};

const systemCheck: Maker = () => {
  const [x, y] = [randInt(-5, 5), randInt(-6, 6)];
  const [m1, b1] = lineThrough(x, y);
  const [m2, b2] = lineThrough(x, y, m1);
  const both = chance(0.5);
  const [px, py] = both ? [x, y] : [x + 1, m1 * (x + 1) + b1];
  return pickOne(`Is ${pt(px, py)} a solution of both y = ${linear(m1, b1)} and y = ${linear(m2, b2)}?`, both ? "Yes, it works in both" : "No, it only works in the first", [both ? "No, it only works in the first" : "Yes, it works in both", "No, it works in neither"], "Put the x and y values into each equation and check both.");
};

const howManySolutions: Maker = () => {
  const m = nonZero(-5, 5);
  const b = randInt(-6, 6);
  const kind = randInt(0, 2);
  let m2 = nonZero(-5, 5);
  while (m2 === m) m2 = nonZero(-5, 5);
  const second = kind === 0 ? linear(m, b + nonZero(-4, 4)) : kind === 1 ? linear(m2, b) : linear(m, b);
  const forms = ["No solution", "Exactly one solution", "Infinitely many solutions"];
  return pickOne(`How many solutions does this system have? y = ${linear(m, b)} and y = ${second}`, forms[kind], forms.filter((_, i) => i !== kind), "Same slope, different intercept: parallel, no solution. Different slopes: one solution. Same line: infinitely many.");
};

const sumDiff: Maker = () => {
  const a = randInt(6, 30);
  const b = randInt(1, a - 1);
  return pickOne(`Two numbers add to ${a + b}. Their difference is ${a - b}. What are the numbers?`, `${a} and ${b}`, [`${a + 1} and ${b - 1}`, `${a - 1} and ${b + 1}`, `${a + b} and ${a - b}`], "Add the two equations: 2 × the bigger number = sum + difference.");
};

const ticketSystem: Maker = () => {
  const [pa, pc] = [randInt(6, 12), randInt(2, 5)];
  const [a, c] = [randInt(2, 9), randInt(2, 9)];
  return num(`Adult tickets cost $${pa} and child tickets $${pc}. ${a + c} tickets cost $${a * pa + c * pc} in all. How many adult tickets were sold?`, a, `Let a + c = ${a + c} and ${pa}a + ${pc}c = ${a * pa + c * pc}. Substitute c = ${a + c} − a.`, { extra: [c, a + 1, a - 1], count: 4, min: 0 });
};

// ---------- Grade 8: functions ----------

const isFunctionTable: Maker = () => {
  const xs = sample([1, 2, 3, 4, 5, 6, 7], 4);
  const fn = chance(0.5);
  if (!fn) xs[3] = xs[1];
  const ys = xs.map(() => randInt(-5, 9));
  if (!fn && ys[3] === ys[1]) ys[3] = ys[1] + 2;
  return pickOne("Is this relation a function?", fn ? "Yes, each input has exactly one output" : "No, one input has two different outputs", [fn ? "No, one input has two different outputs" : "Yes, each input has exactly one output"], "A function gives each input (x) exactly one output (y). Look for a repeated x with different y-values.", { type: "table", headers: ["x", "y"], rows: xs.map((x, i) => [x, ys[i]]) });
};

const compareRates: Maker = () => {
  const m1 = randInt(2, 7);
  let m2 = randInt(2, 7);
  if (m2 === m1) m2 += 1;
  const b1 = randInt(0, 9);
  const b2 = randInt(0, 9);
  const xs = [0, 1, 2];
  return pickOne(`Function A is y = ${linear(m1, b1)}. Function B is shown in the table. Which has the greater rate of change?`, m2 > m1 ? "Function B" : "Function A", [m2 > m1 ? "Function A" : "Function B", "They are the same"], `A's rate is ${m1}. B's rate is how much y goes up each time x goes up 1.`, { type: "table", title: "Function B", headers: ["x", "y"], rows: xs.map((x) => [x, m2 * x + b2]) });
};

const LINEAR = ["y = 3x − 1", "y = −2x + 5", "y = x", "y = 0.5x + 4", "y = 7 − x"];
const NONLINEAR = ["y = x²", "y = 2ˣ", "y = 1/x", "y = x³ + 1", "y = x² − 3"];
const whichLinear: Maker = () => {
  const lin = chance(0.5);
  return lin
    ? pickOne("Which equation is a linear function?", pick(LINEAR), sample(NONLINEAR, 3), "A linear function has the form y = mx + b: x is not squared, cubed, an exponent or under a fraction bar.")
    : pickOne("Which equation is NOT a linear function?", pick(NONLINEAR), sample(LINEAR, 3), "A linear function has the form y = mx + b. Look for x squared, cubed, in an exponent or in the denominator.");
};

const STORIES = [
  ["The graph rises steadily, then stays flat, then falls back to zero.", "A bike ride away from home, a rest, then the ride back home", ["A plant that grows faster and faster", "A bath filling up and never draining", "A car that never stops moving"]],
  ["The graph starts high and drops quickly, then more and more slowly.", "A cup of hot cocoa cooling down on a table", ["A savings account that keeps growing", "Water filling a tank at a steady rate", "A runner speeding up"]],
  ["The graph is a straight line going up from the origin.", "Total cost of apples at a fixed price per pound", ["A ball thrown up and coming down", "A phone battery that is charging and then unplugged", "The height of a swing over time"]],
  ["The graph goes up, then comes back down, like a hill.", "The height of a ball thrown into the air", ["Money in a jar that only gets deposits", "The distance walked at a steady pace", "The temperature of an oven left on"]],
] as const;
const graphStory: Maker = () => {
  const [graph, right, wrong] = pick(STORIES);
  return pickOne(`${graph} Which situation fits best?`, right, [...wrong], "Read the graph left to right: going up means increasing, flat means not changing, going down means decreasing.");
};

const evalFunction: Maker = () => {
  const m = nonZero(-5, 5);
  const b = randInt(-9, 9);
  const x = randInt(-4, 6);
  return typed(`The rule is y = ${linear(m, b)}. What is the output when the input is ${fmt(x)}?`, m * x + b, `Replace x with ${fmt(x)}: ${fmt(m)} × ${par(x)} ${signed(b)}.`, { keypad: "integer" });
};

// ---------- Grade 8: cones, cylinders and spheres ----------

const cylinderV: Maker = () => {
  const r = randInt(1, 6);
  const h = randInt(2, 10);
  return pickOne(`A cylinder has radius ${r} cm and height ${h} cm. What is its volume, in terms of π?`, `${r * r * h}π cm³`, [`${2 * r * h}π cm³`, `${r * h}π cm³`, `${4 * r * r * h}π cm³`], `V = πr²h = π × ${r}² × ${h}.`);
};
const coneV: Maker = () => {
  const r = randInt(1, 6) * 1;
  const h = randInt(1, 4) * 3;
  return pickOne(`A cone has radius ${r} in and height ${h} in. What is its volume, in terms of π?`, `${(r * r * h) / 3}π in³`, [`${r * r * h}π in³`, `${(2 * r * h) / 3}π in³`, `${(r * r * h) / 3 + r * r}π in³`], `V = ⅓πr²h = ⅓ × π × ${r}² × ${h}.`);
};
const sphereV: Maker = () => {
  const r = pick([3, 6, 9]);
  const v = (4 * r ** 3) / 3;
  return pickOne(`A ball has radius ${r} cm. What is its volume, in terms of π?`, `${v}π cm³`, [`${4 * r * r}π cm³`, `${r ** 3}π cm³`, `${v * 2}π cm³`], `V = (4/3)πr³ = (4/3) × π × ${r ** 3}.`);
};
const coneFromCylinder: Maker = () => {
  const v = randInt(4, 40) * 3;
  return num(`A cone and a cylinder have the same base and height. The cylinder holds ${v} cm³. How much does the cone hold?`, v / 3, "A cone holds one third of the matching cylinder.", { extra: [v / 2, v * 3, v - 3], count: 4, label: (n) => `${fmt(n)} cm³` });
};
const cylinderDecimal: Maker = () => {
  const r = randInt(1, 5);
  const h = randInt(2, 10);
  const v = Math.round(3.14 * r * r * h * 100) / 100;
  return typed(`A can has radius ${r} cm and height ${h} cm. Using 3.14 for π, what is its volume in cm³?`, fmt(v), `V = 3.14 × ${r}² × ${h}.`, { keypad: "decimal", suffix: "cm³" });
};

// ---------- Grade 8: slope ----------

const slopeTwoPoints: Maker = (d) => {
  const [x1, y1] = [randInt(-5, 5), randInt(-6, 6)];
  const run = nonZero(1, 5);
  const m = nonZero(-4, 4);
  const [x2, y2] = [x1 + run, y1 + m * run];
  const q = `What is the slope of the line through ${pt(x1, y1)} and ${pt(x2, y2)}?`;
  const hint = `Slope = change in y ÷ change in x = (${fmt(y2)} − ${par(y1)}) ÷ (${fmt(x2)} − ${par(x1)}).`;
  return d === 3 ? typed(q, m, hint, { keypad: "integer" }) : num(q, m, hint, { extra: [-m, m * run, run], min: -20, count: 4, label: (n) => (n < 0 ? `-${Math.abs(n)}` : String(n)) });
};

const slopeTable: Maker = () => {
  const m = nonZero(-5, 6);
  const b = randInt(-5, 8);
  const xs = [0, 1, 2, 3];
  return pickOne("Which equation matches the table?", `y = ${linear(m, b)}`, [`y = ${linear(b || 1, m)}`, `y = ${linear(m, b + 1)}`, `y = ${linear(-m, b)}`], "The y-value at x = 0 is b. The change in y for each 1 in x is the slope m.", { type: "table", headers: ["x", "y"], rows: xs.map((x) => [x, m * x + b]) });
};

const unitRateSlope: Maker = () => {
  const r = randInt(5, 20);
  const h = randInt(2, 6);
  return num(`A graph of pay against hours worked is a straight line through (0, 0) and (${h}, ${r * h}). What is the slope, and what does it mean?`, r, `Slope = ${r * h} ÷ ${h} = ${r}: the pay for each hour.`, { extra: [r * h, h], count: 4, min: 1, label: (n) => `$${n} per hour` });
};

const interceptMeaning: Maker = () => {
  const fee = randInt(10, 40);
  const per = randInt(2, 9);
  return pickOne(`A gym charges y = ${per}x + ${fee} dollars for x visits. What does ${fee} mean?`, "A one-time fee you pay even with 0 visits", [`The cost of each visit`, `The number of visits`, `The total for ${fee} visits`], "The y-intercept (b) is the value when x = 0: the starting amount.");
};

// ---------- Grades 8 and 9: two-way tables ----------

function twoWay() {
  const [rowA, rowB, colA, colB, title] = pick([
    ["Plays sports", "No sports", "Has a pet", "No pet", "Sports and pets"],
    ["Grade 8", "Grade 9", "Walks to school", "Rides to school", "Getting to school"],
    ["Likes reading", "Doesn't like reading", "Has a library card", "No library card", "Reading survey"],
    ["Ate breakfast", "No breakfast", "Felt rested", "Felt tired", "Morning survey"],
  ] as const);
  const totalA = pick([20, 25, 40, 50]);
  const totalB = pick([20, 25, 40, 50]);
  const aa = randInt(2, totalA - 2);
  const ba = randInt(2, totalB - 2);
  const visual: Visual = {
    type: "table",
    title,
    headers: ["", colA, colB, "Total"],
    rows: [
      [rowA, aa, totalA - aa, totalA],
      [rowB, ba, totalB - ba, totalB],
      ["Total", aa + ba, totalA + totalB - aa - ba, totalA + totalB],
    ],
  };
  return { rowA, rowB, colA, colB, totalA, totalB, aa, ba, visual };
}

const twCell: Maker = () => {
  const t = twoWay();
  return num(`How many in the "${t.rowB}" row are in the "${t.colB}" column?`, t.totalB - t.ba, "Find the row, then move across to the column.", { extra: [t.ba, t.totalA - t.aa, t.totalB], count: 4, min: 0, visual: t.visual });
};

const twPercent: Maker = () => {
  const t = twoWay();
  const pct = Math.round((t.aa / t.totalA) * 1000) / 10;
  return num(`What percent of the "${t.rowA}" row are "${t.colA}"?`, pct, `${t.aa} out of ${t.totalA} = ${t.aa} ÷ ${t.totalA} × 100.`, { extra: [Math.round((t.aa / (t.aa + t.ba)) * 1000) / 10, Math.round((t.aa / (t.totalA + t.totalB)) * 1000) / 10, pct + 10], count: 4, min: 0, label: (n) => `${fmt(n)}%`, visual: t.visual });
};

const twAssociation: Maker = () => {
  for (;;) {
    const t = twoWay();
    const pa = t.aa / t.totalA;
    const pb = t.ba / t.totalB;
    if (Math.abs(pa - pb) < 0.05) continue;
    const strong = Math.abs(pa - pb) >= 0.3;
    if (!strong && Math.abs(pa - pb) > 0.15) continue;
    return pickOne(`Compare the percent of each row that is "${t.colA}". Is there evidence of an association?`, strong ? "Yes, the percents are very different" : "Not much, the percents are close", [strong ? "Not much, the percents are close" : "Yes, the percents are very different", "You can't tell from a two-way table"], `${t.rowA}: ${Math.round(pa * 100)}%. ${t.rowB}: ${Math.round(pb * 100)}%.`, t.visual);
  }
};

const twTotal: Maker = () => {
  const t = twoWay();
  return num(`How many in all are "${t.colA}"?`, t.aa + t.ba, "Add down the column.", { extra: [t.aa, t.totalA, t.aa + t.ba + 1], count: 4, min: 0, visual: { ...t.visual, rows: (t.visual as { rows: (string | number)[][] }).rows.map((r, i) => (i === 2 ? [r[0], "?", r[2], r[3]] : r)) } as Visual });
};

const CAUSE = [
  ["Towns with more ice cream sales also have more sunburns.", "Hot, sunny weather could cause both"],
  ["Students who own more books tend to have higher reading scores.", "Something else, like time spent reading at home, could explain both"],
  ["Cities with more firefighters have more fires.", "Bigger cities have both more firefighters and more fires"],
  ["People who carry umbrellas are more likely to have wet shoes.", "Rainy weather could cause both"],
] as const;
const causation: Maker = () => {
  const [fact, right] = pick(CAUSE);
  return pickOne(`${fact} What is the best conclusion?`, `They are linked, but this does not prove one causes the other. ${right}.`, ["One must cause the other", "The data must be wrong", "There is no link at all"], "Correlation shows two things change together. It does not prove that one causes the other.");
};

// ---------- Grade 9: functions ----------

const fOf: Maker = (d) => {
  const quad = d === 3 && chance(0.5);
  const a = nonZero(-5, 5);
  const b = randInt(-9, 9);
  const x = randInt(-4, 5);
  const rule = quad ? (b === 0 ? "x²" : `x² ${signed(b)}`) : linear(a, b);
  const val = quad ? x * x + b : a * x + b;
  return typed(`If f(x) = ${rule}, what is f(${fmt(x)})?`, val, `Replace every x with ${fmt(x)}.`, { keypad: "integer" });
};

const solveFOf: Maker = () => {
  const a = nonZero(-5, 5);
  const b = randInt(-9, 9);
  const x = randInt(-6, 8);
  return num(`f(x) = ${linear(a, b)}. For which x is f(x) = ${fmt(a * x + b)}?`, x, `Solve ${linear(a, b)} = ${fmt(a * x + b)}.`, { extra: [a * x + b, -x, x + 1], count: 4, min: -50, label: (n) => (n < 0 ? `-${Math.abs(n)}` : String(n)) });
};

const domainRange: Maker = () => {
  const xs = sample([-3, -1, 0, 1, 2, 4, 5, 7], 4).sort((a, b) => a - b);
  const ys = xs.map(() => randInt(-4, 9));
  const pairs = xs.map((x, i) => pt(x, ys[i])).join(", ");
  const set = (v: number[]) => `{${[...new Set(v)].sort((a, b) => a - b).map(fmt).join(", ")}}`;
  const askDomain = chance(0.5);
  return pickOne(`What is the ${askDomain ? "domain" : "range"} of {${pairs}}?`, askDomain ? set(xs) : set(ys), [askDomain ? set(ys) : set(xs), set([...xs, ...ys]), set((askDomain ? xs : ys).map((v) => v + 1))], "The domain is the set of inputs (x-values). The range is the set of outputs (y-values).");
};

const DOMAINS = [
  ["C(n) = 8n gives the cost of n movie tickets.", "Whole numbers 0, 1, 2, 3, ...", ["All real numbers", "Negative numbers only", "Numbers between 0 and 1"]],
  ["h(t) gives the height of a ball t seconds after it is thrown until it lands at t = 3.", "All numbers from 0 to 3", ["All real numbers", "Whole numbers only", "Numbers greater than 3"]],
  ["P(w) = 15w gives pay for w whole weeks worked in a 10-week summer job.", "Whole numbers from 0 to 10", ["All real numbers", "Any number from 0 to 150", "Negative whole numbers"]],
] as const;
const sensibleDomain: Maker = () => {
  const [story, right, wrong] = pick(DOMAINS);
  return pickOne(`${story} Which domain makes sense?`, right, [...wrong], "Think about which inputs are possible in the real situation.");
};

// ---------- Grade 9: inequalities ----------

const ineqText = (op: string, v: number) => `x ${op} ${fmt(v)}`;
const FLIP: Record<string, string> = { ">": "<", "<": ">", "≥": "≤", "≤": "≥" };

const solveIneq: Maker = (d) => {
  const op = pick([">", "<", "≥", "≤"]);
  const a = d === 1 ? randInt(2, 6) : nonZero(-6, 6);
  const x = randInt(-6, 9);
  const b = randInt(-10, 10);
  const c = a * x + b;
  const right = a > 0 ? ineqText(op, x) : ineqText(FLIP[op], x);
  const wrong = a > 0 ? ineqText(FLIP[op], x) : ineqText(op, x);
  return pickOne(`Solve ${linear(a, b)} ${op} ${fmt(c)}.`, right, [wrong, ineqText(op, -x === x ? x + 1 : -x), ineqText(op, x + 1)], a > 0 ? "Undo the steps as with an equation." : "Undo the steps as with an equation. Dividing by a negative number flips the inequality sign.");
};

const isSolutionIneq: Maker = () => {
  const a = randInt(2, 5);
  const b = randInt(-5, 5);
  const c = randInt(-4, 20);
  const x = randInt(-3, 8);
  const ok = a * x + b < c;
  return pickOne(`Is x = ${fmt(x)} a solution of ${linear(a, b)} < ${fmt(c)}?`, ok ? "Yes" : "No", [ok ? "No" : "Yes"], `Substitute: ${a} × ${par(x)} ${signed(b)} = ${fmt(a * x + b)}. Is that less than ${fmt(c)}?`);
};

const writeIneq: Maker = () => {
  const budget = randInt(3, 9) * 10;
  const price = randInt(4, 15);
  const fee = randInt(2, 9);
  return pickOne(`You have $${budget}. Shirts cost $${price} each and shipping is $${fee}. Which inequality shows how many shirts, s, you can buy?`, `${price}s + ${fee} ≤ ${budget}`, [`${price}s + ${fee} ≥ ${budget}`, `${price} + ${fee}s ≤ ${budget}`, `${price}s ≤ ${budget} + ${fee}`], "The total cost (price × shirts + shipping) must be at most your budget.");
};

const maxWhole: Maker = () => {
  const budget = randInt(4, 12) * 10;
  const price = randInt(3, 12);
  const fee = randInt(2, 9);
  const most = Math.floor((budget - fee) / price);
  return num(`Tickets cost $${price} each plus a $${fee} fee. You can spend at most $${budget}. What is the greatest number of tickets you can buy?`, most, `${price}t + ${fee} ≤ ${budget}, so t ≤ ${fmt((budget - fee) / price)}. Round down.`, { extra: [most + 1, Math.floor(budget / price) === most ? most + 2 : Math.floor(budget / price)], count: 4, min: 0 });
};

// ---------- Grade 9: systems ----------

const elimination: Maker = (d) => {
  for (;;) {
    const [x, y] = [randInt(-5, 8), randInt(-5, 8)];
    const [a1, b1, a2, b2] = d === 1 ? [1, 1, 1, -1] : [nonZero(-4, 4), nonZero(-4, 4), nonZero(-4, 4), nonZero(-4, 4)];
    if (a1 * b2 - a2 * b1 === 0) continue;
    const [c1, c2] = [a1 * x + b1 * y, a2 * x + b2 * y];
    const lhs = (a: number, b: number) => `${linear(a, 0)} ${b < 0 ? "−" : "+"} ${Math.abs(b) === 1 ? "" : Math.abs(b)}y`;
    const sys = `${lhs(a1, b1)} = ${fmt(c1)} and ${lhs(a2, b2)} = ${fmt(c2)}`;
    return d === 3
      ? typed(`Solve: ${sys}. What is x?`, x, "Multiply one or both equations so a variable cancels when you add or subtract them.", { keypad: "integer" })
      : pickOne(`Solve the system: ${sys}`, pt(x, y), [pt(y, x), pt(x, -y), pt(x + 1, y - 1)], "Add or subtract the equations to cancel one variable, then substitute back.");
  }
};

const mixtureStory: Maker = () => {
  const [pa, pb] = [randInt(3, 8), randInt(9, 15)];
  const [a, b] = [randInt(2, 12), randInt(2, 12)];
  return pickOne(
    `A snack bar sells juice for $${pa} and smoothies for $${pb}. It sold ${a + b} drinks for $${a * pa + b * pb}. Which system fits (j juices, s smoothies)?`,
    `j + s = ${a + b} and ${pa}j + ${pb}s = ${a * pa + b * pb}`,
    [`j + s = ${a * pa + b * pb} and ${pa}j + ${pb}s = ${a + b}`, `${pa}j + s = ${a + b} and j + ${pb}s = ${a * pa + b * pb}`, `j − s = ${a + b} and ${pa}j − ${pb}s = ${a * pa + b * pb}`],
    "One equation counts the drinks. The other adds up the money.",
  );
};

// ---------- Grade 9: linear or exponential ----------

const linOrExp: Maker = () => {
  const start = randInt(1, 6);
  const exp = chance(0.5);
  const k = exp ? pick([2, 3]) : randInt(2, 9);
  const ys = [0, 1, 2, 3].map((x) => (exp ? start * k ** x : start + k * x));
  return pickOne("Is the pattern in the table linear or exponential?", exp ? `Exponential: it is multiplied by ${k} each time` : `Linear: it goes up by ${k} each time`, [exp ? `Linear: it goes up by ${ys[1] - ys[0]} each time` : `Exponential: it is multiplied by ${k} each time`, "Neither: there is no pattern"], "Equal differences mean linear. Equal ratios (same multiplier) mean exponential.", { type: "table", headers: ["x", "y"], rows: ys.map((y, x) => [x, y]) });
};

const writeExp: Maker = () => {
  const a = pick([50, 100, 200, 300, 500]);
  const [b, words] = pick([[2, "doubles"], [3, "triples"], [0.5, "halves"]] as const);
  const unit = pick(["year", "hour", "week"]);
  return pickOne(`A population of ${a} ${words} every ${unit}. Which function gives the population after t ${unit}s?`, `P(t) = ${a}(${fmt(b)})ᵗ`, [`P(t) = ${a} + ${fmt(b)}t`, `P(t) = ${fmt(b)}(${a})ᵗ`, `P(t) = ${a}t${b === 0.5 ? "" : sup(b)}`], "Exponential: start value × (growth factor) to the power t.");
};

const evalExp: Maker = () => {
  const a = randInt(2, 6);
  const b = pick([2, 3]);
  const t = randInt(1, b === 2 ? 5 : 3);
  return num(`f(t) = ${a}(${b})ᵗ. What is f(${t})?`, a * b ** t, `${b}${sup(t)} = ${b ** t}. Then × ${a}.`, { extra: [a * b * t, (a * b) ** t, a + b ** t], count: 4, min: 1 });
};

const interpretRate: Maker = () => {
  const p = pick([2, 3, 4, 5, 6, 8, 10, 12, 15, 20]);
  const grow = chance(0.6);
  const factor = grow ? 1 + p / 100 : 1 - p / 100;
  const start = pick([500, 1000, 1200, 2000, 5000]);
  return pickOne(`In V(t) = ${start}(${fmt(factor)})ᵗ, what does ${fmt(factor)} tell you?`, `It ${grow ? "grows" : "shrinks"} by ${p}% each time period`, [`It ${grow ? "shrinks" : "grows"} by ${p}% each time period`, `It ${grow ? "grows" : "shrinks"} by ${fmt(factor)} each time period`, `It starts at ${fmt(factor)}`], `${fmt(factor)} = 1 ${grow ? "+" : "−"} ${fmt(p / 100)}, which is ${p}%.`);
};

const whichModel: Maker = () => {
  const [story, right] = pick([
    ["A phone plan costs $30 plus $5 for each extra gigabyte.", "Linear"],
    ["A savings account earns 3% interest each year, added to the balance.", "Exponential"],
    ["A candle gets 2 cm shorter every hour.", "Linear"],
    ["The number of bacteria doubles every 20 minutes.", "Exponential"],
    ["A car's value drops by 15% each year.", "Exponential"],
    ["A pool fills at 40 gallons per minute.", "Linear"],
  ] as const);
  return pickOne(`${story} Which model fits best?`, right, [right === "Linear" ? "Exponential" : "Linear"], "Adding the same amount each time is linear. Multiplying by the same factor (a percent change) is exponential.");
};

// ---------- Grade 9: factoring and quadratics ----------

const factorTri: Maker = () => {
  for (;;) {
    const [p, q] = [nonZero(-9, 9), nonZero(-9, 9)];
    if (p === q || p === -q) continue;
    const b = p + q;
    const c = p * q;
    const term = (n: number) => `(x ${signed(n)})`;
    const mid = b === 1 ? "+ x" : b === -1 ? "− x" : `${signed(b)}x`;
    const expr = `x² ${mid} ${signed(c)}`;
    return pickOne(`Factor ${expr}.`, `${term(p)}${term(q)}`, [`${term(-p)}${term(-q)}`, `${term(p)}${term(-q)}`, `${term(b)}${term(1)}`], `Find two numbers that multiply to ${fmt(c)} and add to ${fmt(b)}.`);
  }
};

const zeroProduct: Maker = () => {
  const [p, q] = [nonZero(-9, 9), nonZero(-9, 9)];
  if (p === q) return zeroProduct(2);
  const term = (n: number) => `(x ${signed(-n)})`;
  return pickOne(`Solve ${term(p)}${term(q)} = 0.`, `x = ${fmt(Math.min(p, q))} or x = ${fmt(Math.max(p, q))}`, [`x = ${fmt(-Math.max(p, q))} or x = ${fmt(-Math.min(p, q))}`, `x = ${fmt(p * q)}`, `x = ${fmt(p + q)}`], "A product is 0 only when one factor is 0. Set each bracket equal to 0.");
};

const squareRootSolve: Maker = () => {
  const r = randInt(2, 12);
  const k = pick([1, 1, 2, 3]);
  const lhs = k === 1 ? "x²" : `${k}x²`;
  return pickOne(`Solve ${lhs} = ${k * r * r}.`, `x = ${r} or x = −${r}`, [`x = ${r}`, `x = ${k * r * r / 2}`, `x = ${r * r} or x = −${r * r}`], `Divide by ${k}, then take the square root. Don't forget the negative root.`);
};

const diffSquares: Maker = () => {
  const r = randInt(2, 12);
  return pickOne(`Factor x² − ${r * r}.`, `(x − ${r})(x + ${r})`, [`(x − ${r})(x − ${r})`, `(x + ${r})(x + ${r})`, `(x − ${r * r})(x + 1)`], "x² − a² is a difference of squares: (x − a)(x + a).");
};

const commonFactor: Maker = () => {
  const g = randInt(2, 6);
  const [a, b] = [randInt(1, 5), nonZero(-7, 7)];
  return pickOne(`Factor ${linear(g * a, g * b)} completely.`, `${g}(${linear(a, b)})`, [`${g}(${linear(a * g, b)})`, `${g}x(${linear(a, b)})`, `${g * a}(x ${signed(b)})`], `Both terms share a factor of ${g}.`);
};

// ---------- Grade 9: rearranging formulas ----------

const FORMULAS = [
  ["d = rt", "t", "t = d/r", ["t = dr", "t = r/d", "t = d − r"]],
  ["A = lw", "w", "w = A/l", ["w = Al", "w = l/A", "w = A − l"]],
  ["P = 2l + 2w", "l", "l = (P − 2w)/2", ["l = P − 2w", "l = P/2 − 2w", "l = (P + 2w)/2"]],
  ["y = mx + b", "x", "x = (y − b)/m", ["x = y/m − b", "x = (y + b)/m", "x = m(y − b)"]],
  ["I = Prt", "r", "r = I/(Pt)", ["r = IPt", "r = Pt/I", "r = I − Pt"]],
  ["C = 2πr", "r", "r = C/(2π)", ["r = 2πC", "r = C − 2π", "r = 2π/C"]],
  ["A = ½bh", "h", "h = 2A/b", ["h = A/(2b)", "h = 2b/A", "h = A − ½b"]],
  ["V = lwh", "h", "h = V/(lw)", ["h = Vlw", "h = lw/V", "h = V − lw"]],
  ["F = 1.8C + 32", "C", "C = (F − 32)/1.8", ["C = F/1.8 − 32", "C = 1.8(F − 32)", "C = (F + 32)/1.8"]],
  ["2x + 3y = 12", "y", "y = (12 − 2x)/3", ["y = 12 − 2x/3", "y = (12 + 2x)/3", "y = 4 − 2x"]],
] as const;

const rearrange: Maker = () => {
  const [f, v, right, wrong] = pick(FORMULAS);
  return pickOne(`Solve ${f} for ${v}.`, right, [...wrong], `Undo what is being done to ${v}, one step at a time, doing the same to both sides.`);
};

const useFormula: Maker = () => {
  const kind = randInt(0, 2);
  if (kind === 0) {
    const r = randInt(3, 12) * 5;
    const t = randInt(2, 6);
    return num(`Use d = rt. A car travels ${r * t} miles at ${r} miles per hour. How many hours does it take?`, t, `t = d/r = ${r * t} ÷ ${r}.`, { extra: [r * t * r, t + 1, r - t], count: 4, min: 1, label: (n) => `${n} h` });
  }
  if (kind === 1) {
    const l = randInt(3, 15);
    const w = randInt(2, 12);
    return num(`Use P = 2l + 2w. A rectangle has perimeter ${2 * l + 2 * w} ft and width ${w} ft. What is its length?`, l, `l = (P − 2w)/2 = (${2 * l + 2 * w} − ${2 * w}) ÷ 2.`, { extra: [2 * l, 2 * l + 2 * w - w, l + w], count: 4, min: 1, label: (n) => `${n} ft` });
  }
  const b = randInt(2, 12);
  const h = randInt(2, 12);
  return num(`Use A = ½bh. A triangle has area ${(b * h) / 2} cm² and base ${b} cm. What is its height?`, h, `h = 2A/b = ${b * h} ÷ ${b}.`, { extra: [h / 2, b * h, h + 2], count: 4, min: 0.5, label: (n) => `${fmt(n)} cm` });
};

const checkStep: Maker = () => {
  const a = randInt(2, 9);
  const b = randInt(1, 15);
  const c = a * randInt(2, 9) + b;
  return pickOne(`To solve ${a}x + ${b} = ${c}, ${someone()} first subtracts ${b} from both sides. What equation comes next?`, `${a}x = ${c - b}`, [`${a}x = ${c + b}`, `x + ${b} = ${c / a === Math.round(c / a) ? c / a + 1 : c}`, `${a}x = ${c}`], "Whatever you do to one side, do to the other. Subtracting keeps the equation balanced.");
};

// ---------- Grade 9: sequences ----------

const nthTerm: Maker = (d) => {
  const a = randInt(-5, 12);
  const step = nonZero(-6, 8);
  const n = d === 1 ? randInt(5, 8) : randInt(10, 30);
  const terms = [0, 1, 2, 3].map((k) => a + step * k);
  const val = a + step * (n - 1);
  return typed(`What is term number ${n} of ${terms.map(fmt).join(", ")}, ...?`, val, `Term n = first term + (n − 1) × difference = ${fmt(a)} + ${n - 1} × ${par(step)}.`, { keypad: "integer" });
};

const ruleOf: Maker = () => {
  const step = randInt(2, 9);
  const b = randInt(-5, 6);
  const terms = [1, 2, 3, 4].map((n) => step * n + b);
  return pickOne(`Which rule gives the sequence ${terms.map(fmt).join(", ")}, ... (n = 1, 2, 3, ...)?`, `a(n) = ${linear(step, b, "n")}`, [`a(n) = ${linear(step, terms[0], "n")}`, `a(n) = ${linear(terms[0], step, "n")}`, `a(n) = ${linear(step + 1, b - 1, "n")}`], "The difference between terms is the number multiplied by n. Then check n = 1.");
};

const recursive: Maker = () => {
  const a1 = randInt(1, 5);
  const r = pick([2, 3]);
  const n = randInt(3, 5);
  const val = a1 * r ** (n - 1);
  return num(`a(1) = ${a1} and a(n) = ${r} × a(n − 1). What is a(${n})?`, val, `Multiply by ${r} each time: ${Array.from({ length: n }, (_, i) => a1 * r ** i).join(", ")}.`, { extra: [a1 * r * n, val * r, a1 + r * (n - 1)], count: 4, min: 1 });
};

const arithOrGeo: Maker = () => {
  const geo = chance(0.5);
  const a = randInt(1, 5);
  const k = randInt(2, 4);
  const terms = [0, 1, 2, 3].map((i) => (geo ? a * k ** i : a + k * i));
  return pickOne(`Is ${terms.join(", ")}, ... arithmetic or geometric?`, geo ? `Geometric: multiply by ${k}` : `Arithmetic: add ${k}`, [geo ? `Arithmetic: add ${terms[1] - terms[0]}` : `Geometric: multiply by ${k}`, "Neither"], "Arithmetic sequences add the same amount. Geometric sequences multiply by the same amount.");
};

// ---------- Units ----------

export const G6_UNITS = [
  mathUnit({
    id: "wa-g6-fraction-division",
    title: "Dividing Fractions",
    emoji: "➗",
    blurb: "How many fit?",
    parentNote: "Dividing a fraction by a fraction by multiplying by the reciprocal, and solving “how many servings” and “how many pieces” problems.",
    codes: "M.6.R.NS.1",
    text: "interpreting and computing quotients of fractions and solving word problems with fraction division",
    makers: [divFrac, servings, reciprocalMatch, pathStory],
  }),
  mathUnit({
    id: "wa-g6-statistics",
    title: "Centre & Spread",
    emoji: "📊",
    blurb: "Mean, median, range and IQR",
    parentNote: "Telling a statistical question from a regular question, and describing data with the mean, median, range and interquartile range.",
    codes: "M.6.DA.SP.1; M.6.DA.SP.3; M.6.DA.SP.5",
    text: "recognizing statistical questions and summarizing data with measures of centre and variability",
    makers: [findMean, findMedian, findRange, findIqr, statQuestion, outlierEffect],
  }),
  mathUnit({
    id: "wa-g6-coordinate-plane",
    title: "Four Quadrants",
    emoji: "➕",
    blurb: "Points with negative coordinates",
    parentNote: "Plotting and naming points in all four quadrants, reflecting points across an axis, and finding distances and areas on the coordinate plane.",
    codes: "M.6.SR.NS.8; M.6.SR.G.3; M.6.Q.NS.6",
    text: "graphing points in all four quadrants, reflecting across the axes, and finding distances between points with a shared coordinate",
    makers: [readSignedPoint, whichQuadrant, reflectPoint, signedDistance, rectangleSide],
  }),
  mathUnit({
    id: "wa-g6-unit-rates",
    title: "Unit Rates",
    emoji: "🏷️",
    blurb: "Price per item, miles per hour",
    parentNote: "Finding unit rates and unit prices, choosing the better buy, completing rate tables, and converting measurement units with ratios.",
    codes: "M.6.R.RP.2; M.6.R.RP.3",
    text: "finding unit rates, using rate tables, and converting measurement units with ratio reasoning",
    makers: [unitPrice, speed, betterBuy, rateTable, ratioConvert],
  }),
  mathUnit({
    id: "wa-g6-nets",
    title: "Nets & Surface Area",
    emoji: "🧊",
    blurb: "Unfold a box",
    parentNote: "Using nets made of rectangles and triangles to find the surface area of prisms and pyramids.",
    codes: "M.6.SR.G.4",
    text: "representing three-dimensional figures with nets of rectangles and triangles and using them to find surface area",
    makers: [prismSA, cubeSA, pyramidSA, netFaces],
  }),
];

export const G7_UNITS = [
  mathUnit({
    id: "wa-g7-signed-multiply",
    title: "Multiply & Divide Signed Numbers",
    emoji: "➖",
    blurb: "Sign rules",
    parentNote: "Multiplying and dividing positive and negative numbers (including fractions), using the sign rules, and real-world changes such as falling temperatures.",
    codes: "M.7.Q.NS.2",
    text: "multiplying and dividing rational numbers, including negative numbers, and solving real-world problems with them",
    makers: [signedProduct, signedQuotient, threeSigns, tempDrop, signedFraction, debtStory],
  }),
  mathUnit({
    id: "wa-g7-proportional",
    title: "Proportional Relationships",
    emoji: "📏",
    blurb: "y = kx",
    parentNote: "Deciding whether a table shows a proportional relationship, finding the constant of proportionality, writing y = kx, and unit rates with fractions.",
    codes: "M.7.R.RP.1; M.7.R.RP.2",
    text: "computing unit rates with fractions, recognizing proportional relationships, and finding the constant of proportionality",
    makers: [isProportional, constantK, equationK, fractionRate, unitRatePoint],
  }),
  mathUnit({
    id: "wa-g7-angles",
    title: "Angle Relationships",
    emoji: "📐",
    blurb: "Complementary, supplementary, vertical",
    parentNote: "Using complementary, supplementary, vertical and adjacent angles to find a missing angle, sometimes with a simple equation.",
    codes: "M.7.SR.G.5",
    text: "using supplementary, complementary, vertical and adjacent angles to write and solve equations for unknown angles",
    makers: [complement, vertical, solveAngle, threeOnLine],
  }),
  mathUnit({
    id: "wa-g7-sampling",
    title: "Samples & Populations",
    emoji: "🎯",
    blurb: "Random samples and estimates",
    parentNote: "Telling a sample from a population, choosing a fair random sample, and using sample results to estimate for a whole population.",
    codes: "M.7.DA.SP.1; M.7.DA.SP.2; M.7.DA.DS.2",
    text: "using random, representative samples to draw inferences about a population",
    makers: [representative, estimatePop, whatPopulation, compareSamples],
  }),
  mathUnit({
    id: "wa-g7-scale-drawings",
    title: "Scale Drawings",
    emoji: "🗺️",
    blurb: "Maps and floor plans",
    parentNote: "Finding real lengths and areas from a scale drawing or map, and redrawing at a different scale.",
    codes: "M.7.Q.G.1",
    text: "solving problems with scale drawings, including actual lengths and areas and reproducing a drawing at a different scale",
    makers: [scaleLength, scaleBack, scaleArea, newScale],
  }),
];

export const G8_UNITS = [
  mathUnit({
    id: "wa-g8-exponent-rules",
    title: "Exponent Rules",
    emoji: "⚡",
    blurb: "Add, subtract, multiply exponents",
    parentNote: "Properties of integer exponents: multiplying and dividing powers with the same base, a power of a power, zero exponents and negative exponents.",
    codes: "M.8.Q.EE.1",
    text: "applying the properties of integer exponents to write equivalent numerical expressions",
    makers: [expProduct, expQuotient, expPower, expNegative, expEvaluate],
  }),
  mathUnit({
    id: "wa-g8-systems",
    title: "Systems of Equations",
    emoji: "✖️",
    blurb: "Where two lines meet",
    parentNote: "Solving pairs of linear equations, checking a solution, telling when a system has no solution or infinitely many, and simple word problems.",
    codes: "M.8.R.EE.8",
    text: "solving pairs of simultaneous linear equations and recognizing systems with no solution or infinitely many",
    makers: [systemMeet, systemCheck, howManySolutions, sumDiff, ticketSystem],
  }),
  mathUnit({
    id: "wa-g8-functions",
    title: "Functions",
    emoji: "🔀",
    blurb: "One input, one output",
    parentNote: "Deciding whether a relation is a function, comparing two functions shown in different ways, spotting linear functions, and matching a graph to a story.",
    codes: "M.8.R.F.1; M.8.R.F.2; M.8.R.F.3; M.8.R.F.5",
    text: "understanding functions as rules with exactly one output for each input, comparing functions, recognizing linear functions, and describing graphs qualitatively",
    makers: [isFunctionTable, compareRates, whichLinear, graphStory, evalFunction],
  }),
  mathUnit({
    id: "wa-g8-round-volume",
    title: "Cones, Cylinders & Spheres",
    emoji: "🍦",
    blurb: "Volume of round solids",
    parentNote: "Using the volume formulas for cylinders, cones and spheres, in terms of π and with 3.14.",
    codes: "M.8.SR.G.9",
    text: "using the formulas for the volumes of cones, cylinders and spheres to solve problems",
    makers: [cylinderV, coneV, sphereV, coneFromCylinder, cylinderDecimal],
  }),
  mathUnit({
    id: "wa-g8-slope",
    title: "Slope & Rate of Change",
    emoji: "📈",
    blurb: "Rise over run",
    parentNote: "Finding slope from two points or a table, reading slope as a unit rate, writing y = mx + b, and saying what the intercept means.",
    codes: "M.8.R.EE.5; M.8.R.EE.6; M.8.R.F.4",
    text: "finding and interpreting slope and initial value, and relating slope to the unit rate",
    makers: [slopeTwoPoints, slopeTable, unitRateSlope, interceptMeaning],
  }),
  mathUnit({
    id: "wa-g8-two-way-tables",
    title: "Two-Way Tables",
    emoji: "🧮",
    blurb: "Data in rows and columns",
    parentNote: "Reading two-way tables of survey data, finding relative frequencies (percents) in a row, and deciding whether two things seem to be linked.",
    codes: "M.8.DA.SP.4",
    text: "reading two-way tables of categorical data and using relative frequencies to look for an association",
    makers: [twCell, twPercent, twAssociation, twTotal],
  }),
];

export const G9_UNITS = [
  mathUnit({
    id: "wa-g9-functions",
    title: "Function Notation",
    emoji: "🔣",
    blurb: "f(x), domain and range",
    parentNote: "Evaluating and solving with function notation, and naming the domain and range of a function, including a sensible domain in a real situation.",
    codes: "M.HS.DA.FIF.1; M.HS.DA.FIF.2; M.HS.R.FIF.5",
    text: "using function notation, evaluating functions, and relating the domain and range to the situation",
    makers: [fOf, solveFOf, domainRange, sensibleDomain],
  }),
  mathUnit({
    id: "wa-g9-inequalities",
    title: "Linear Inequalities",
    emoji: "⚖️",
    blurb: "Solve and write inequalities",
    parentNote: "Solving linear inequalities (flipping the sign when dividing by a negative), checking a solution, and writing inequalities from budgets and limits.",
    codes: "M.HS.R.AREI.3; M.HS.R.ACED.1",
    text: "solving linear inequalities in one variable and creating inequalities from situations",
    makers: [solveIneq, isSolutionIneq, writeIneq, maxWhole],
  }),
  mathUnit({
    id: "wa-g9-systems",
    title: "Solving Systems",
    emoji: "🔗",
    blurb: "Elimination and substitution",
    parentNote: "Solving systems of two linear equations by elimination and substitution, and writing a system from a word problem.",
    codes: "M.HS.R.AREI.5; M.HS.R.AREI.6; M.HS.Q.ACED.3",
    text: "solving systems of linear equations and representing constraints with a system of equations",
    makers: [elimination, mixtureStory, sumDiff, ticketSystem],
  }),
  mathUnit({
    id: "wa-g9-exponential",
    title: "Linear or Exponential?",
    emoji: "🚀",
    blurb: "Add each time or multiply each time",
    parentNote: "Telling linear growth (add the same amount) from exponential growth (multiply by the same factor), writing exponential functions, and reading growth and decay rates.",
    codes: "M.HS.R.FLE.1; M.HS.R.FLE.2; M.HS.R.FLE.5",
    text: "distinguishing linear and exponential models, constructing exponential functions, and interpreting their parameters",
    makers: [linOrExp, writeExp, evalExp, interpretRate, whichModel],
  }),
  mathUnit({
    id: "wa-g9-quadratics",
    title: "Factoring & Quadratics",
    emoji: "🧱",
    blurb: "Factor and solve x² equations",
    parentNote: "Factoring quadratic expressions (common factors, trinomials, difference of squares) and solving quadratic equations by factoring and square roots.",
    codes: "M.HS.R.AREI.4; M.HS.R.ASSE.3; M.HS.Q.ASSE.2",
    text: "factoring quadratic expressions and solving quadratic equations by factoring and taking square roots",
    makers: [factorTri, zeroProduct, squareRootSolve, diffSquares, commonFactor],
  }),
  mathUnit({
    id: "wa-g9-formulas",
    title: "Rearranging Formulas",
    emoji: "🔧",
    blurb: "Solve for any letter",
    parentNote: "Rearranging a formula to solve for one quantity (d = rt for t, P = 2l + 2w for l) and using it, plus justifying each step in solving an equation.",
    codes: "M.HS.Q.ACED.4; M.HS.R.AREI.1",
    text: "rearranging formulas to highlight a quantity of interest and explaining each step in solving an equation",
    makers: [rearrange, useFormula, checkStep],
  }),
  mathUnit({
    id: "wa-g9-two-way-tables",
    title: "Two-Way Tables & Causation",
    emoji: "🧮",
    blurb: "Relative frequency and correlation",
    parentNote: "Reading two-way frequency tables, finding conditional relative frequencies, spotting associations, and knowing that correlation does not prove causation.",
    codes: "M.HS.DA.SID.5; M.HS.DA.SID.9",
    text: "summarizing categorical data in two-way frequency tables and distinguishing correlation from causation",
    makers: [twCell, twPercent, twAssociation, causation],
  }),
  mathUnit({
    id: "wa-g9-sequences",
    title: "Sequences",
    emoji: "🔢",
    blurb: "Arithmetic and geometric",
    parentNote: "Arithmetic and geometric sequences as functions: finding any term, writing a rule, and using a recursive rule.",
    codes: "M.HS.Q.FIF.3; M.HS.Q.FBF.1",
    text: "recognizing sequences as functions and writing arithmetic and geometric sequences explicitly and recursively",
    makers: [nthTerm, ruleOf, recursive, arithOrGeo],
  }),
];

