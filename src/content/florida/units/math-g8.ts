import { pick, randInt, shuffle } from "../../random";
import type { Unit } from "../../types";
import { fmt, linear, mathUnit, num, pickOne, typed, type Maker } from "./math-kit";

// Florida's own Grade 8 math units (`fl-` ids): multiplying and factoring linear expressions (MA.8.AR.1.2, 1.3),
// two-step inequalities (MA.8.AR.2.2), the angles of polygons (MA.8.GR.1.6), the scale factor of a dilation
// (MA.8.GR.2.2) and the sample space of a repeated experiment (MA.8.DP.2.1).

const sgn = (n: number) => (n < 0 ? `− ${-n}` : `+ ${n}`);

/** (px + a)(qx + b) written out as x² terms. */
function expand(p: number, a: number, q: number, b: number) {
  return { x2: p * q, x: p * b + q * a, c: a * b };
}

const trinomial = (t: { x2: number; x: number; c: number }) => {
  const x2 = t.x2 === 1 ? "x²" : `${t.x2}x²`;
  const mid = t.x === 0 ? "" : ` ${sgn(t.x).replace(/(\d+)/, (m) => (m === "1" ? "x" : `${m}x`))}`;
  const last = t.c === 0 ? "" : ` ${sgn(t.c)}`;
  return `${x2}${mid}${last}`;
};

const multiply: Maker = (d) => {
  const p = d === 1 ? 1 : randInt(1, 3);
  const q = d === 1 ? 1 : randInt(1, 3);
  const a = randInt(-6, 6) || 2;
  const b = randInt(-6, 6) || 3;
  const right = expand(p, a, q, b);
  const wrongs = [
    { x2: right.x2, x: p * a + q * b, c: right.c },
    { x2: right.x2, x: right.x, c: a + b },
    { x2: right.x2, x: right.x + 2, c: right.c },
    { x2: right.x2, x: -right.x, c: right.c },
  ];
  const label = (t: { x2: number; x: number; c: number }) => trinomial(t);
  const R = label(right);
  const bracket = (c: number, k: number) => `(${c === 1 ? "" : c}x ${sgn(k)})`;
  return pickOne(`Multiply: ${bracket(p, a)}${bracket(q, b)}`, R, wrongs.map(label).filter((x) => x !== R), "Multiply each term of the first bracket by each term of the second, then combine like terms.");
};

const factorOut: Maker = () => {
  const g = pick([2, 3, 4, 5, 6]);
  const a = randInt(1, 6);
  const b = randInt(-8, 8) || 3;
  const expr = linear(g * a, g * b);
  const right = `${g}(${linear(a, b)})`;
  const wrong = [`${g}(${linear(a, g * b)})`, `${a}(${linear(g, b)})`, `${g}(${linear(g * a, b)})`].filter((x) => x !== right);
  return pickOne(`Rewrite ${expr} as a common factor times a sum.`, right, wrong, `${g} divides both ${g * a} and ${Math.abs(g * b)}.`);
};

const MULTIPLY = mathUnit({
  id: "fl-g8-multiply-expressions",
  title: "Multiply & Factor Expressions",
  emoji: "✳️",
  blurb: "Brackets and common factors",
  parentNote:
    "Practises Florida's B.E.S.T. benchmarks MA.8.AR.1.2 and MA.8.AR.1.3: multiplying two linear expressions such as (x + 3)(x + 5), and rewriting a sum of two algebraic expressions with a common factor as that factor times a sum. These are the first steps toward factoring in Algebra 1.",
  codes: "MA.8.AR.1.2; MA.8.AR.1.3",
  text: "multiplying two linear expressions, and pulling out a common factor",
  makers: [multiply, factorOut, multiply, factorOut, multiply],
});

const flip = (s: string) => ({ ">": "<", "<": ">", "≥": "≤", "≤": "≥" })[s]!;

const twoStep: Maker = (d) => {
  const a = randInt(2, 7);
  const b = randInt(1, 12);
  const x = randInt(-6, 9);
  const sym = pick([">", "<", "≥", "≤"]);
  const negative = d === 3 && randInt(0, 1) === 1;
  const A = negative ? -a : a;
  const rhs = A * x + b;
  const bsign = sgn(b);
  const right = `x ${negative ? flip(sym) : sym} ${x}`;
  const wrong = [`x ${negative ? sym : flip(sym)} ${x}`, `x ${sym} ${x + b}`, `x ${sym} ${rhs - b}`, `x ${negative ? flip(sym) : sym} ${-x}`].filter((w) => w !== right);
  return pickOne(`Solve: ${A < 0 ? "−" : ""}${Math.abs(A)}x ${bsign} ${sym} ${rhs}`, right, [...new Set(wrong)], negative ? `Subtract ${b}, then divide by ${A}. Dividing by a negative flips the sign.` : `Subtract ${b} from both sides, then divide by ${A}.`);
};

const graphDirection: Maker = () => {
  const n = randInt(-5, 8);
  const sym = pick([">", "<", "≥", "≤"]);
  const open = sym === ">" || sym === "<";
  const dir = sym === ">" || sym === "≥" ? "right" : "left";
  const circle = open ? "an open circle" : "a closed circle";
  return pickOne(`To graph x ${sym} ${n} on a number line, you draw ${circle} at ${n} and an arrow to the…`, dir, [dir === "right" ? "left" : "right", "both sides"], `${sym === ">" || sym === "≥" ? "Greater" : "Less"} values are on the ${dir}.`);
};

const TWO_STEP = mathUnit({
  id: "fl-g8-two-step-inequalities",
  title: "Two-Step Inequalities",
  emoji: "🔀",
  blurb: "Solve and graph inequalities",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.8.AR.2.2: solving two-step linear inequalities in one variable and representing the solutions algebraically and on a number line. Dividing by a negative number reverses the inequality sign.",
  codes: "MA.8.AR.2.2",
  text: "solving two-step linear inequalities and representing the solutions",
  makers: [twoStep, twoStep, graphDirection, twoStep],
});

const sidesOf: Record<number, string> = { 3: "triangle", 4: "quadrilateral", 5: "pentagon", 6: "hexagon", 7: "heptagon", 8: "octagon", 9: "nonagon", 10: "decagon", 12: "dodecagon" };

const angleSum: Maker = (d) => {
  const n = pick(d === 1 ? [4, 5, 6] : [5, 6, 7, 8, 9, 10, 12]);
  return num(`What is the sum of the interior angles of a ${sidesOf[n]}?`, (n - 2) * 180, `Split it into ${n - 2} triangles from one corner: ${n - 2} × 180°.`, { step: 180, min: 180, extra: [n * 180] });
};

const eachAngle: Maker = () => {
  const n = pick([5, 6, 8, 9, 10, 12]);
  return num(`What is the measure of each interior angle of a regular ${sidesOf[n]}?`, ((n - 2) * 180) / n, `Sum = ${(n - 2) * 180}°. Divide by ${n} equal angles.`, { step: 6, min: 60, max: 179, extra: [(n * 180) / (n + 2)] });
};

const trianglesIn: Maker = () => {
  const n = pick([4, 5, 6, 7, 8, 9]);
  return num(`How many triangles can you make from one corner of a ${sidesOf[n]}?`, n - 2, `A polygon with ${n} sides splits into n − 2 triangles.`, { min: 1, max: 12 });
};

const findSides: Maker = () => {
  const n = pick([5, 6, 8, 9, 10, 12]);
  const total = (n - 2) * 180;
  return num(`The interior angles of a polygon add up to ${total}°. How many sides does it have?`, n, `${total} ÷ 180 = ${n - 2} triangles, so ${n - 2} + 2 = ${n} sides.`, { min: 3, max: 14 });
};

const missingAngle: Maker = () => {
  const n = pick([4, 5]);
  const known = n === 4 ? [randInt(70, 110), randInt(70, 110), randInt(60, 120)] : [randInt(90, 120), randInt(90, 120), randInt(90, 120), randInt(90, 120)];
  const total = (n - 2) * 180;
  const missing = total - known.reduce((a, b) => a + b, 0);
  return typed(`A ${sidesOf[n]} has angles of ${known.join("°, ")}° and one more angle. What is the missing angle?`, missing, `The angles add to ${total}°. Subtract the known angles.`, { suffix: "°" });
};

const POLYGON_ANGLES = mathUnit({
  id: "fl-g8-polygon-angles",
  title: "Angles in Polygons",
  emoji: "🔷",
  blurb: "Find the sum of interior angles",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.8.GR.1.6: developing and using the formula (n − 2) × 180° for the sum of the interior angles of a polygon by splitting it into triangles. Draw lines from one corner of a hexagon and count the triangles.",
  codes: "MA.8.GR.1.6",
  text: "the sum of the interior angles of a polygon, found by splitting it into triangles",
  makers: [angleSum, eachAngle, trianglesIn, findSides, missingAngle, angleSum],
});

const scaleFactor: Maker = () => {
  const k = pick([2, 3, 4, 5, 0.5, 1.5, 2.5]);
  const a = pick([2, 4, 6, 8, 10, 12]);
  const image = a * k;
  return pickOne(`A side of length ${fmt(a)} becomes ${fmt(image)} after a dilation. What is the scale factor?`, fmt(k), [fmt(k + 1), fmt(image - a), fmt(a / k)].filter((x) => x !== fmt(k)), "Scale factor = image length ÷ original length.");
};

const kind: Maker = () => {
  const k = pick([0.25, 0.5, 0.75, 2, 3, 4, 1.5]);
  const enlarge = k > 1;
  return pickOne(`A dilation has scale factor ${fmt(k)}. Is the image larger or smaller than the original?`, enlarge ? "larger" : "smaller", [enlarge ? "smaller" : "larger", "the same size"], "A scale factor over 1 enlarges. A scale factor between 0 and 1 shrinks.");
};

const coordinates: Maker = (d) => {
  const k = pick(d === 1 ? [2, 3] : [2, 3, 4, 5]);
  const x = randInt(1, 6);
  const y = randInt(1, 6);
  return pickOne(`A point at (${x}, ${y}) is dilated about the origin by a scale factor of ${k}. Where is the image?`, `(${x * k}, ${y * k})`, [`(${x + k}, ${y + k})`, `(${x * k}, ${y})`, `(${x}, ${y * k})`], `Multiply both coordinates by ${k}.`);
};

const sizeShape: Maker = () => {
  const k = pick([2, 3, 4]);
  const a = randInt(2, 9);
  const b = randInt(2, 9);
  return num(`A rectangle is ${a} by ${b}. It is dilated by a scale factor of ${k}. What is the new length of the ${a} side?`, a * k, `${a} × ${k} = ${a * k}.`, { min: 1, step: k });
};

const factorFromFigures: Maker = () => {
  const a = pick([3, 4, 5, 6]);
  const k = pick([2, 3]);
  return pickOne(`Triangle ABC has a side of ${a}. Its image has a side of ${a * k}. Which scale factor was used?`, String(k), [String(k + 1), String(a), String(a * k - a)], "Divide the image length by the original length.");
};

const DILATIONS = mathUnit({
  id: "fl-g8-dilations",
  title: "Dilations & Scale Factor",
  emoji: "🔍",
  blurb: "Enlarge and shrink figures",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.8.GR.2.2: identifying the scale factor of a dilation given a figure and its image. A scale factor greater than 1 enlarges a figure; a scale factor between 0 and 1 shrinks it. Look at a photo and its enlargement to find the factor.",
  codes: "MA.8.GR.2.2",
  text: "identifying the scale factor of a dilation from a figure and its image",
  makers: [scaleFactor, kind, coordinates, sizeShape, factorFromFigures, scaleFactor],
});

const tossCount: Maker = (d) => {
  const n = randInt(2, d === 1 ? 3 : 5);
  return num(`How many outcomes are in the sample space for flipping a coin ${n} times?`, 2 ** n, `Each flip doubles the outcomes: 2 × 2 × … = ${2 ** n}.`, { min: 2, extra: [2 * n], step: 2 });
};

const diceCount: Maker = () => {
  const n = randInt(2, 3);
  return num(`How many outcomes are in the sample space for rolling a number cube ${n} times?`, 6 ** n, `6 × 6${n === 3 ? " × 6" : ""} = ${6 ** n}.`, { min: 6, extra: [6 * n], step: 6 });
};

const listTwoFlips: Maker = () => {
  return pickOne("Which list shows the whole sample space for flipping a coin twice?", "HH, HT, TH, TT", ["HH, HT, TT", "HH, TT", "H, T"], "List every order: heads then tails (HT) is different from tails then heads (TH).");
};

const countPattern: Maker = () => {
  const flips = pick([2, 3]);
  const heads = flips === 2 ? 1 : pick([1, 2]);
  const ways = flips === 2 ? 2 : 3;
  return num(`In how many outcomes of flipping a coin ${flips} times do you get exactly ${heads} head${heads > 1 ? "s" : ""}?`, ways, flips === 2 ? "HT and TH." : heads === 1 ? "HTT, THT, TTH." : "HHT, HTH, THH.", { min: 1, max: 8 });
};

const spinnerTwice: Maker = () => {
  const parts = pick([3, 4, 5]);
  return num(`A spinner has ${parts} equal parts. How many outcomes are in the sample space for 2 spins?`, parts * parts, `${parts} × ${parts} = ${parts * parts}.`, { min: 2 });
};

const coinAndSpinner: Maker = () => {
  const parts = randInt(3, 8);
  const flips = randInt(1, 3);
  return num(`A spinner has ${parts} equal parts. You spin it once and flip a coin ${flips === 1 ? "once" : `${flips} times`}. How many outcomes are in the sample space?`, parts * 2 ** flips, `${parts} × ${2 ** flips} = ${parts * 2 ** flips}.`, { min: 2, step: parts });
};

const withReplacement: Maker = () => {
  const items = randInt(3, 9);
  const draws = randInt(2, 3);
  return num(`A bag has ${items} different marbles. You draw one, put it back and draw again${draws === 3 ? ", then once more" : ""}. How many outcomes are in the sample space?`, items ** draws, `${Array(draws).fill(items).join(" × ")} = ${items ** draws}.`, { min: 2, step: items });
};

const notAnOutcome: Maker = () => {
  const n = randInt(2, 3);
  const real = n === 2 ? ["HH", "HT", "TH", "TT"] : ["HHH", "HHT", "HTH", "THH", "HTT", "THT", "TTH", "TTT"];
  const fake = n === 2 ? ["HHH", "HX", "T"] : ["HH", "HHHH", "THX"];
  return pickOne(`Which is NOT an outcome of flipping a coin ${n} times?`, pick(fake), shuffle(real).slice(0, 3), `Each outcome has exactly ${n} letters, H or T.`);
};

const REPEATED = mathUnit({
  id: "fl-g8-repeated-experiments",
  title: "Repeated Experiments",
  emoji: "🪙",
  blurb: "List every outcome of two or three tries",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.8.DP.2.1: finding the sample space for a repeated experiment, such as flipping a coin three times or spinning a spinner twice. Multiply the number of outcomes of each try to count them all.",
  codes: "MA.8.DP.2.1",
  text: "determining the sample space of a repeated experiment",
  makers: [tossCount, diceCount, listTwoFlips, countPattern, spinnerTwice, coinAndSpinner, withReplacement, notAnOutcome],
});

export const UNITS: Unit[] = [MULTIPLY, TWO_STEP, POLYGON_ANGLES, DILATIONS, REPEATED];
/** Put the own units before the planned ones. */
export const FIRST = false;
