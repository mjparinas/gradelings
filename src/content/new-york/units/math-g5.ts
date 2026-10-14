import { pick, randInt, sample } from "../../random";
import type { Unit, Visual } from "../../types";
import { type Maker, fracChoice, mixed, num } from "../../washington/units/math-kit";
import type { Q } from "../own";
import { bank, mathUnit } from "./math-kit";

// New York's own Grade 5 math unit (`ny-` ids): line plots of measurements in halves, quarters and eighths, and using
// fraction operations to answer questions about them (NY-5.MD.2).

const DATA = [
  { title: "Ribbon pieces", what: "ribbon pieces", unit: "inches", one: "inch", total: "length" },
  { title: "Water in beakers", what: "beakers", unit: "liters", one: "liter", total: "amount of water" },
  { title: "Rain each day", what: "days", unit: "inches", one: "inch", total: "rainfall" },
  { title: "Bags of trail mix", what: "bags", unit: "pounds", one: "pound", total: "weight" },
] as const;

/** A value in eighths, written in lowest terms ("1/2", "3/8", "1 1/4"). */
const show = (eighths: number): string => mixed(eighths, 8);

/** An amount with its unit: "1/2 inch", "1 inch", "1 1/4 inches". */
const amount = (d: (typeof DATA)[number], n: number, over: number): string => `${mixed(n, over)} ${n <= over ? d.one : d.unit}`;

interface Plot {
  d: (typeof DATA)[number];
  values: number[];
  counts: number[];
  visual: Visual;
}

/** A line plot: 4 or 5 values in eighths of a unit, each with 1 to 4 X marks. */
function makePlot(level: number): Plot {
  const d = pick(DATA);
  const steps = level === 1 ? [2, 4, 6, 8] : [1, 2, 3, 4, 5, 6, 7, 8, 10, 12];
  const values = sample(steps, level === 1 ? 4 : 5).sort((a, b) => a - b);
  const counts = values.map(() => randInt(1, 4));
  const visual: Visual = {
    type: "table",
    title: `${d.title} (${d.unit})`,
    headers: [`Measurement (${d.unit})`, "X marks"],
    rows: values.map((v, i) => [show(v), "X ".repeat(counts[i]).trim()]),
  };
  return { d, values, counts, visual };
}

/** How many were measured. */
const howMany: Maker = (level) => {
  const p = makePlot(level);
  const total = p.counts.reduce((a, b) => a + b, 0);
  return num(`Each X is one of the ${p.d.what}. How many ${p.d.what} are there?`, total, "Count every X mark.", { min: 1, extra: [p.values.length, total + 1], visual: p.visual });
};

/** The total for the X marks at one value: count × value. */
const totalAtValue: Maker = (level) => {
  const p = makePlot(level);
  const i = randInt(0, p.values.length - 1);
  const v = p.values[i];
  const n = p.counts[i];
  return fracChoice(
    `What is the total ${p.d.total} of the ${p.d.what} at ${amount(p.d, v, 8)}?`,
    [n * v, 8],
    [[v, 8], [n + v, 8], [n * v, 64], [n * v + 8, 8]],
    `There are ${n} X marks at ${show(v)}. Multiply: ${n} × ${show(v)}.`,
    (a, b) => amount(p.d, a, b),
    p.visual,
  );
};

/** The difference between the greatest and least measurement. */
const spread: Maker = (level) => {
  const p = makePlot(level);
  const hi = p.values[p.values.length - 1];
  const lo = p.values[0];
  return fracChoice(
    `What is the difference between the greatest and the least measurement?`,
    [hi - lo, 8],
    [[hi + lo, 8], [hi, 8], [hi - lo, 16], [p.values.length, 8]],
    `The greatest is ${show(hi)} and the least is ${show(lo)}. Subtract.`,
    (a, b) => amount(p.d, a, b),
    p.visual,
  );
};

/** The total of every measurement. */
const grandTotal: Maker = (level) => {
  const p = makePlot(level === 3 ? 2 : 1);
  const sum = p.values.reduce((s, v, i) => s + v * p.counts[i], 0);
  const plain = p.values.reduce((s, v) => s + v, 0);
  return fracChoice(
    `All the measurements are put together. What is the total ${p.d.total}?`,
    [sum, 8],
    [[plain, 8], [sum + 8, 8], [sum - 4, 8], [sum, 16]],
    "Multiply each value by its number of X marks, then add all the results.",
    (a, b) => amount(p.d, a, b),
    p.visual,
  );
};

/** How many measurements are more than a half. */
const moreThanHalf: Maker = (level) => {
  const p = makePlot(level);
  const n = p.values.reduce((s, v, i) => s + (v > 4 ? p.counts[i] : 0), 0);
  return num(`How many ${p.d.what} measured more than 1/2 ${p.d.one}?`, n, "1/2 is 4/8. Add the X marks for every value greater than 4/8.", { min: 0, extra: [p.values.filter((v) => v > 4).length, n + 1], visual: p.visual });
};

const IDEAS: Q[] = [
  ["On a line plot of lengths, what does each X stand for?", "one measurement", ["the longest length", "the total length", "one inch"], "A line plot puts one X above the value for each measurement."],
  ["A line plot is marked in eighths of an inch. Where does 3/4 go?", "at 6/8", ["at 3/8", "at 4/8", "at 7/8"], "3/4 = 6/8."],
  ["Which list of measurements fits a line plot marked in quarters?", "1/4, 1/2, 3/4, 1", ["1/3, 2/3, 1", "1/5, 2/5, 3/5", "1/6, 1/2, 5/6"], "Quarters are fourths: 1/4, 2/4 (1/2), 3/4 and 4/4 (1)."],
  ["Three X marks are at 1/2 inch. What length do they make together?", "1 1/2 inches", ["1/6 inch", "1/2 inch", "3 1/2 inches"], "3 × 1/2 = 3/2 = 1 1/2."],
  ["Four X marks are at 3/8 cup. What is the total?", "1 1/2 cups", ["12/32 cup", "3/32 cup", "7/8 cup"], "4 × 3/8 = 12/8 = 1 1/2."],
  ["What fraction is halfway between 1/4 and 1/2 on a line plot?", "3/8", ["1/3", "2/6", "3/4"], "1/4 = 2/8 and 1/2 = 4/8. Halfway is 3/8.", true],
];

export const UNITS: Unit[] = [
  mathUnit({
    id: "ny-g5-fraction-line-plots",
    title: "Line Plots with Fractions",
    emoji: "📊",
    blurb: "Halves, quarters and eighths",
    parentNote: "Reading line plots of measurements in halves, quarters and eighths, and using fraction addition, subtraction and multiplication to answer questions about the data.",
    codes: "NY-5.MD.2",
    text: "making and reading line plots of measurements in fractions of a unit and solving problems with the data",
    makers: [howMany, totalAtValue, totalAtValue, spread, grandTotal, moreThanHalf, bank(IDEAS)],
  }),
];

