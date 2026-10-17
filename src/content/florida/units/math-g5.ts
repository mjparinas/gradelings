import { pick, randInt, shuffle } from "../../random";
import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { fmt, frac, mathUnit, num, pickOne, typed, eq, type Maker } from "./math-kit";

// Florida's own Grade 5 math units (`fl-` ids): multiplying and dividing decimals by one-tenth and one-hundredth
// (MA.5.NSO.2.4, 2.5), division as a fraction and remainders in context (MA.5.FR.1.1, MA.5.AR.1.1), true and false
// equations (MA.5.AR.2.3), solid figures (MA.5.GR.1.2), perimeter and area with fractional or decimal sides
// (MA.5.GR.2.1) and mean, median, mode and range (MA.5.DP.1.2).

const clean = (x: number) => String(Math.round(x * 1000) / 1000);

const byTenth: Maker = (d) => {
  const base = randInt(11, d === 1 ? 99 : 480) / 10;
  const small = randInt(0, 1) === 1;
  const times = randInt(0, 1) === 1;
  const factor = small ? 0.01 : 0.1;
  const ans = times ? base * factor : base / factor;
  const symbol = times ? "×" : "÷";
  const right = clean(ans);
  const wrong = [ans * 10, ans / 10, times ? base / factor : base * factor, ans + base].map(clean).filter((x) => x !== right);
  return pickOne(`${clean(base)} ${symbol} ${factor} = ?`, right, [...new Set(wrong)].slice(0, 3), times ? `Multiplying by ${factor} makes the number ${small ? "100" : "10"} times smaller: move the point ${small ? "two places" : "one place"} left.` : `Dividing by ${factor} makes the number ${small ? "100" : "10"} times larger: move the point ${small ? "two places" : "one place"} right.`, eq(`${clean(base)} ${symbol} ${factor}`));
};

const estimateDecimals: Maker = (d) => {
  const a = randInt(11, d === 1 ? 59 : 98) / 10;
  const b = randInt(11, d === 1 ? 59 : 98) / 10;
  const right = Math.round(a) * Math.round(b);
  return num(`Round each number to a whole number to estimate ${clean(a)} × ${clean(b)}.`, right, `${clean(a)} rounds to ${Math.round(a)} and ${clean(b)} rounds to ${Math.round(b)}. ${Math.round(a)} × ${Math.round(b)} = ${right}.`, { min: 1, extra: [Math.round(a) + Math.round(b)] });
};

const sizeOfProduct: Maker = () => {
  const x = pick([12, 35, 40, 6]);
  const bigger = randInt(0, 1) === 1;
  const f = bigger ? pick(["3/2", "5/4", "2.5"]) : pick(["1/2", "3/4", "0.5"]);
  return pickOne(`Without multiplying, will ${x} × ${f} be greater than or less than ${x}?`, bigger ? "greater than" : "less than", [bigger ? "less than" : "greater than", "equal to"], bigger ? "Multiplying by a number greater than 1 makes it bigger." : "Multiplying by a number less than 1 makes it smaller.");
};

const DECIMAL_SHIFTS = mathUnit({
  id: "fl-g5-decimal-shifts",
  title: "Times and Divided by 0.1",
  emoji: "🔟",
  blurb: "Move the decimal point",
  parentNote:
    "Practises Florida's B.E.S.T. benchmarks MA.5.NSO.2.4 and MA.5.NSO.2.5: multiplying and dividing decimals by one-tenth and one-hundredth, and using rounding to estimate decimal products. A calculator can check the pattern: ask what happens each time you multiply by 0.1.",
  codes: "MA.5.NSO.2.4; MA.5.NSO.2.5",
  text: "multiplying and dividing decimals by 0.1 and 0.01, and estimating decimal products",
  makers: [byTenth, estimateDecimals, sizeOfProduct, byTenth, byTenth],
});

const share: Maker = (d) => {
  const a = randInt(1, d === 1 ? 5 : 9);
  const b = randInt(a + 1, d === 1 ? 6 : 12);
  const right = frac(a, b);
  const items = pick(["pizzas", "granola bars", "liters of juice", "cakes"]);
  return pickOne(`${a} ${items} are shared equally by ${b} people. How much does each person get?`, right, [frac(b, a), `${a + b}`, `${a}/${b + 1}`].filter((x) => x !== right), `${a} ÷ ${b} = ${a}/${b}.`);
};

const divAsFrac: Maker = (d) => {
  const a = randInt(1, 9);
  const b = randInt(a + 1, d === 1 ? 8 : 12);
  return pickOne(`Which fraction equals ${a} ÷ ${b}?`, frac(a, b), [frac(b, a), frac(a, b + 1), frac(a + 1, b)].filter((x) => x !== frac(a, b)), "The number being divided is the numerator. The divisor is the denominator.");
};

const buses: Maker = (d) => {
  const per = pick([20, 24, 30, 36, 45]);
  const k = randInt(3, d === 1 ? 6 : 12);
  const total = per * k + randInt(1, per - 1);
  return num(`${total} students ride buses that hold ${per} each. How many buses are needed?`, k + 1, `${total} ÷ ${per} = ${k} with some left over, so one more bus is needed.`, { min: 1, extra: [k, k + 2] });
};

const leftover: Maker = (d) => {
  const per = pick([4, 6, 8, 12]);
  const k = randInt(3, d === 1 ? 7 : 14);
  const total = per * k + randInt(1, per - 1);
  return num(`${total} cupcakes go into boxes of ${per}. How many full boxes can be made?`, k, `${total} ÷ ${per} = ${k} with some left over. Only full boxes count.`, { min: 1, extra: [k + 1] });
};

const multiStep: Maker = (d) => {
  const a = randInt(12, d === 1 ? 40 : 90);
  const b = randInt(3, 9);
  const c = randInt(10, 50);
  const total = a * b + c;
  return typed(`A store sells ${b} boxes with ${a} pencils each and ${c} loose pencils. How many pencils in all?`, total, `${a} × ${b} = ${a * b}. Then ${a * b} + ${c} = ${total}.`);
};

const DIVISION_STORIES = mathUnit({
  id: "fl-g5-division-stories",
  title: "Division Stories",
  emoji: "🍕",
  blurb: "Fractions, leftovers and many steps",
  parentNote:
    "Practises Florida's B.E.S.T. benchmarks MA.5.FR.1.1 and MA.5.AR.1.1: writing the division of two whole numbers as a fraction, and solving multi-step problems where a remainder has to be interpreted (do you round up, drop it or share it?). Sharing food equally is a good way to practise.",
  codes: "MA.5.FR.1.1; MA.5.AR.1.1",
  text: "division as a fraction, and multi-step whole-number problems with remainders",
  makers: [share, divAsFrac, buses, leftover, multiStep, share, buses],
});

const trueFalse: Maker = (d) => {
  const a = randInt(2, d === 1 ? 9 : 15);
  const b = randInt(2, 9);
  const c = randInt(2, 9);
  const product = a * b;
  const x = randInt(1, product - 1);
  const truth = randInt(0, 1) === 1;
  const off = pick([1, 2, 10]);
  const extra = truth ? 0 : off;
  const kind = randInt(0, 2);
  const rhs = kind === 0 ? `${x} + ${product - x + extra}` : kind === 1 ? `${product + c + extra} − ${c}` : `${(product + extra) * c} ÷ ${c}`;
  const value = product + extra;
  return pickOne(`Is this equation true or false? ${a} × ${b} = ${rhs}`, truth ? "true" : "false", [truth ? "false" : "true"], `${a} × ${b} = ${product}. ${rhs} = ${value}. They are ${truth ? "equal" : "not equal"}.`);
};

const balance: Maker = (d) => {
  const a = randInt(10, d === 1 ? 40 : 90);
  const b = randInt(2, 9);
  const total = a + b;
  return pickOne(`Which number makes this true? ${a} + ${b} = □ − ${b}`, String(a + 2 * b), [String(total), String(a), String(a + b + 1)], `The left side is ${total}. □ − ${b} must also be ${total}, so □ is ${total} + ${b}.`);
};

const TRUE_FALSE = mathUnit({
  id: "fl-g5-true-or-false",
  title: "True or False Equations",
  emoji: "⚖️",
  blurb: "Is both sides equal?",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.5.AR.2.3: deciding whether an equation using any of the four operations is true or false and explaining why. An equals sign means both sides have the same value.",
  codes: "MA.5.AR.2.3",
  text: "determining and explaining whether an equation with any of the four operations is true or false",
  makers: [trueFalse, trueFalse, balance, trueFalse],
});

const SOLIDS: Q[] = [
  ["A cube is a type of…", "right prism", ["pyramid", "cone", "sphere"], "A cube has two matching square ends and square sides."],
  ["Which solid has two circular bases and a curved side?", "cylinder", ["cone", "sphere", "prism"], "Think of a soup can."],
  ["Which solid has one circular base and one point?", "cone", ["cylinder", "sphere", "pyramid"], "Think of an ice cream cone."],
  ["Which solid has no flat faces?", "sphere", ["cylinder", "cone", "cube"], "A sphere is round all over."],
  ["How many faces does a rectangular prism have?", "6", ["4", "5", "8"], "Top, bottom, front, back, left and right."],
  ["How many edges does a cube have?", "12", ["6", "8", "10"], "4 on top, 4 on the bottom and 4 on the sides."],
  ["How many vertices does a cube have?", "8", ["6", "10", "12"], "4 corners on top and 4 on the bottom."],
  ["How many faces does a triangular prism have?", "5", ["3", "4", "6"], "2 triangles and 3 rectangles."],
  ["A square pyramid has how many triangular faces?", "4", ["1", "2", "6"], "One triangle on each side of the square base."],
  ["How many vertices does a square pyramid have?", "5", ["4", "6", "8"], "4 at the base and 1 at the top."],
  ["Which solid has a polygon base and triangular faces that meet at a point?", "pyramid", ["prism", "cylinder", "cone"], "That describes a pyramid."],
  ["Which solid has two matching polygon bases joined by rectangles?", "prism", ["pyramid", "cone", "sphere"], "That describes a prism."],
  ["A triangular pyramid has how many faces in all?", "4", ["3", "5", "6"], "A triangle base and 3 triangle sides."],
  ["How many edges does a square pyramid have?", "8", ["4", "5", "12"], "4 around the base and 4 up to the point."],
  ["A can of soup is shaped like a…", "right circular cylinder", ["cone", "sphere", "pyramid"], "It has two circles and a curved side."],
  ["A basketball is shaped like a…", "sphere", ["cylinder", "cone", "cube"], "It is round in every direction."],
  ["A party hat is shaped like a…", "right circular cone", ["cylinder", "sphere", "prism"], "It has a circular base and a point."],
  ["A shoe box is shaped like a…", "rectangular prism", ["pyramid", "cone", "sphere"], "It has 6 rectangle faces."],
  ["A tent shaped like a triangular roof is best described as a…", "triangular prism", ["cone", "sphere", "cube"], "Its two ends are triangles."],
  ["The Egyptian pyramids are shaped like…", "square pyramids", ["cones", "cylinders", "spheres"], "They have a square base and 4 triangle faces."],
  ["Which has a curved surface?", "cylinder", ["cube", "square pyramid", "triangular prism"], "The side of a cylinder curves."],
  ["Which solid has more faces: a cube or a triangular prism?", "a cube", ["a triangular prism", "same", "a sphere"], "A cube has 6 faces. A triangular prism has 5.", true],
  ["How many vertices does a triangular prism have?", "6", ["3", "5", "8"], "3 on each triangle end.", true],
  ["How many edges does a triangular prism have?", "9", ["6", "8", "12"], "3 on each end and 3 along the sides.", true],
  ["A pentagonal pyramid has how many faces in all?", "6", ["5", "7", "10"], "A pentagon base and 5 triangles.", true],
  ["Which of these is NOT a prism?", "cone", ["cube", "triangular prism", "rectangular prism"], "A cone has a curved side and one base.", true],
  ["A cylinder and a cone both have…", "a circular base", ["a point", "square faces", "no flat faces"], "Each has at least one circle face.", true],
];

const SOLIDS_UNIT = bankUnit({
  id: "fl-g5-solid-figures",
  title: "Solid Figures",
  emoji: "📦",
  blurb: "Prisms, pyramids, cylinders and cones",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.5.GR.1.2: classifying right pyramids, right prisms, right circular cylinders, right circular cones and spheres by their faces, edges and vertices. Look for these solids in boxes, cans and toys around the house.",
  standards: ["MA.5.GR.1.2", "classifying solid figures by their defining attributes"],
  items: SOLIDS,
});

const mf = (n: number) => fmt(Math.round(n * 100) / 100);

const areaDecimal: Maker = (d) => {
  const l = randInt(11, d === 1 ? 49 : 98) / 10;
  const w = randInt(2, d === 1 ? 9 : 19) / 2;
  const ans = Math.round(l * w * 100) / 100;
  const wrong = [l + w, 2 * (l + w), ans + 1, ans * 10].map(mf);
  return pickOne(`A rectangle is ${mf(l)} m long and ${mf(w)} m wide. What is its area (in square metres)?`, mf(ans), [...new Set(wrong)].filter((x) => x !== mf(ans)).slice(0, 3), `Area = length × width = ${mf(l)} × ${mf(w)}.`);
};

const perimDecimal: Maker = (d) => {
  const l = randInt(11, d === 1 ? 49 : 98) / 10;
  const w = randInt(11, d === 1 ? 39 : 79) / 10;
  const ans = Math.round(2 * (l + w) * 100) / 100;
  const wrong = [l + w, l * w, ans + 1, ans - 1].map(mf);
  return pickOne(`A rectangle is ${mf(l)} ft long and ${mf(w)} ft wide. What is its perimeter?`, mf(ans), [...new Set(wrong)].filter((x) => x !== mf(ans)).slice(0, 3), `Perimeter = 2 × (length + width) = 2 × (${mf(l)} + ${mf(w)}).`);
};

const areaFraction: Maker = () => {
  const [a, b] = pick([[1, 2], [1, 3], [1, 4], [2, 3], [3, 4], [3, 5]]);
  const [c, e] = pick([[1, 2], [1, 3], [1, 4], [2, 5], [3, 4]]);
  const num_ = a * c;
  const den = b * e;
  return pickOne(`A rectangle is ${a}/${b} yd long and ${c}/${e} yd wide. What is its area (square yards)?`, frac(num_, den), [frac(a + c, b + e), frac(a * e + c * b, b * e), frac(b * e, a * c)].filter((x) => x !== frac(num_, den)), `Multiply the fractions: (${a} × ${c}) / (${b} × ${e}).`);
};

const RECT_MEASURES = mathUnit({
  id: "fl-g5-fraction-decimal-rectangles",
  title: "Rectangles with Decimal Sides",
  emoji: "📐",
  blurb: "Perimeter and area with parts of a unit",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.5.GR.2.1: finding the perimeter and area of a rectangle whose sides are fractions or decimals. Measure a table to the nearest half foot and work out its area.",
  codes: "MA.5.GR.2.1",
  text: "finding the perimeter and area of rectangles with fractional or decimal side lengths",
  makers: [areaDecimal, perimDecimal, areaFraction, areaDecimal, perimDecimal],
});

/** n whole numbers in [lo, hi + n) whose mean is a whole number. */
function dataSet(n: number, lo: number, hi: number): number[] {
  const xs = Array.from({ length: n - 1 }, () => randInt(lo, hi));
  let last = (n - (xs.reduce((a, b) => a + b, 0) % n)) % n;
  while (last < lo) last += n;
  return [...xs, last];
}

const mean: Maker = (d) => {
  const n = pick([4, 5]);
  const xs = dataSet(n, 2, d === 1 ? 12 : 20);
  const m = xs.reduce((a, b) => a + b, 0) / n;
  return num(`What is the mean of ${shuffle(xs).join(", ")}?`, m, `Add them: ${xs.reduce((a, b) => a + b, 0)}. Divide by ${n}: ${m}.`, { min: 1, extra: [Math.max(...xs), Math.min(...xs)] });
};

const median: Maker = (d) => {
  const xs = shuffle(Array.from({ length: pick([5, 7]) }, () => randInt(1, d === 1 ? 15 : 40)));
  const sorted = [...xs].sort((a, b) => a - b);
  const mid = sorted[(sorted.length - 1) / 2];
  return num(`What is the median of ${xs.join(", ")}?`, mid, `Put them in order: ${sorted.join(", ")}. The middle number is ${mid}.`, { min: 1, extra: [sorted[0], sorted[sorted.length - 1]] });
};

const mode: Maker = () => {
  const m = randInt(2, 15);
  const others = shuffle(Array.from({ length: 10 }, (_, i) => i + 1).filter((x) => x !== m)).slice(0, 4);
  const xs = shuffle([m, m, m, ...others]);
  return num(`What is the mode of ${xs.join(", ")}?`, m, `The mode is the number that appears most often.`, { min: 1, extra: others });
};

const range: Maker = (d) => {
  const xs = shuffle(Array.from({ length: 5 }, () => randInt(3, d === 1 ? 20 : 60)));
  const r = Math.max(...xs) - Math.min(...xs);
  return num(`What is the range of ${xs.join(", ")}?`, r, `Subtract the smallest from the biggest: ${Math.max(...xs)} − ${Math.min(...xs)}.`, { min: 0, extra: [Math.max(...xs)] });
};

const MEAN_MEDIAN = mathUnit({
  id: "fl-g5-mean-median",
  title: "Mean, Median, Mode & Range",
  emoji: "📊",
  blurb: "Describe a set of numbers",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.5.DP.1.2: finding the mean, mode, median and range of a set of whole numbers shown in a table or line plot. Try it with the scores from a family game.",
  codes: "MA.5.DP.1.2",
  text: "finding the mean, mode, median and range of numerical data",
  makers: [mean, median, mode, range, mean, median],
});

export const UNITS: Unit[] = [DECIMAL_SHIFTS, DIVISION_STORIES, TRUE_FALSE, SOLIDS_UNIT, RECT_MEASURES, MEAN_MEDIAN];
/** Put the own units before the planned ones. */
export const FIRST = false;
