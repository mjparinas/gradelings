import { pick, randInt, shuffle } from "../../random";
import type { Unit } from "../../types";
import { fmt, mathUnit, num, pickOne, sup, typed, eq, type Maker } from "./math-kit";

// Florida's own Grade 7 math units (`fl-` ids): the laws of exponents (MA.7.NSO.1.1), multi-step order of operations
// with rational numbers (MA.7.NSO.2.1), one-step inequalities (MA.7.AR.2.1), converting units across measurement
// systems (MA.7.AR.3.3) and the sample space of a simple experiment (MA.7.DP.2.1).

const power = (base: number, e: number) => `${base < 0 ? `(${fmt(base)})` : base}${sup(e)}`;

const productRule: Maker = (d) => {
  const base = pick([2, 3, 5, 10, -2, -3]);
  const m = randInt(2, d === 1 ? 5 : 8);
  const n = randInt(2, d === 1 ? 5 : 8);
  return num(`${power(base, m)} × ${power(base, n)} = ${fmt(base)}^?`, m + n, `Same base: add the exponents. ${m} + ${n} = ${m + n}.`, { min: 1, extra: [m * n], visual: eq(`${power(base, m)} × ${power(base, n)}`) });
};

const quotientRule: Maker = (d) => {
  const base = pick([2, 3, 5, 10, 4]);
  const n = randInt(2, d === 1 ? 5 : 6);
  const m = n + randInt(1, d === 1 ? 4 : 7);
  return num(`${power(base, m)} ÷ ${power(base, n)} = ${base}^?`, m - n, `Same base: subtract the exponents. ${m} − ${n} = ${m - n}.`, { min: 0, extra: [m + n, m / n === Math.round(m / n) ? m / n : m + 1], visual: eq(`${power(base, m)} ÷ ${power(base, n)}`) });
};

const powerOfPower: Maker = (d) => {
  const base = pick([2, 3, 5, 7]);
  const m = randInt(2, 5);
  const n = randInt(2, d === 1 ? 3 : 5);
  return num(`(${power(base, m)})${sup(n)} = ${base}^?`, m * n, `Power of a power: multiply the exponents. ${m} × ${n} = ${m * n}.`, { min: 1, extra: [m + n], visual: eq(`(${power(base, m)})${sup(n)}`) });
};

const zeroPower: Maker = () => {
  const base = pick([3, 5, 7, 10, 12, -4]);
  return num(`${power(base, 0)} = ?`, 1, "Any number except 0 raised to the power 0 equals 1.", { min: 0, max: 12, extra: [0, base, 10] });
};

const evaluatePower: Maker = (d) => {
  const base = pick(d === 1 ? [2, 3, 10] : [2, 3, 4, 5, -2, -3]);
  const e = randInt(2, d === 1 ? 3 : 4);
  const v = base ** e;
  return num(`Evaluate ${power(base, e)}.`, v, `Multiply ${fmt(base)} by itself ${e} times.`, { min: -300, extra: [base * e, -v], step: Math.abs(base) });
};

const EXPONENT_LAWS = mathUnit({
  id: "fl-g7-exponent-laws",
  title: "Laws of Exponents",
  emoji: "⚡",
  blurb: "Multiply, divide and raise powers",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.7.NSO.1.1: knowing and using the laws of exponents (product, quotient, power of a power and the zero exponent) with whole-number exponents and rational bases. When multiplying powers with the same base, the exponents add.",
  codes: "MA.7.NSO.1.1",
  text: "applying the laws of exponents to evaluate and rewrite numerical expressions",
  makers: [productRule, quotientRule, powerOfPower, zeroPower, evaluatePower, productRule],
});

const order1: Maker = () => {
  const a = randInt(2, 9);
  const b = randInt(2, 6);
  const c = randInt(2, 5);
  const v = a + b * c ** 2;
  return typed(`${a} + ${b} × ${c}² = ?`, v, `Exponent first: ${c}² = ${c * c}. Then multiply: ${b} × ${c * c} = ${b * c * c}. Then add ${a}.`, { keypad: "integer" });
};

const order2: Maker = () => {
  const a = randInt(3, 12);
  const b = randInt(2, 8);
  const c = randInt(2, 4);
  const v = (a - b) * c ** 2;
  return typed(`(${a} − ${b}) × ${c}² = ?`, v, `Brackets first: ${a} − ${b} = ${a - b}. Then ${c}² = ${c * c}. Then multiply.`, { keypad: "integer" });
};

const order3: Maker = () => {
  const a = randInt(2, 9);
  const b = randInt(2, 9);
  const c = randInt(2, 6);
  const v = a + Math.abs(-b) * c;
  return typed(`${a} + |−${b}| × ${c} = ?`, v, `Absolute value first: |−${b}| = ${b}. Then multiply by ${c}: ${b * c}. Then add ${a}.`, { keypad: "integer" });
};

const order4: Maker = () => {
  const a = randInt(2, 8);
  const b = randInt(2, 8);
  const c = randInt(1, 9);
  const v = -a * b + c;
  return typed(`−${a} × ${b} + ${c} = ?`, v, `Multiply first: −${a} × ${b} = −${a * b}. Then add ${c}.`, { keypad: "integer" });
};

const order5: Maker = () => {
  const q = randInt(2, 6);
  const a = randInt(2, 9);
  const b = a * q;
  const c = randInt(1, 9);
  const v = b / a - c ** 2;
  return typed(`${b} ÷ ${a} − ${c}² = ?`, v, `Divide first: ${b} ÷ ${a} = ${q}. Then ${c}² = ${c * c}. Subtract: ${q} − ${c * c}.`, { keypad: "integer" });
};

const which: Maker = () => {
  const a = randInt(2, 6);
  const b = randInt(2, 6);
  const c = randInt(2, 4);
  return pickOne(`In ${a} + ${b} × ${c}², what do you do first?`, `${c}²`, [`${a} + ${b}`, `${b} × ${c}`, "add"], "Exponents come before multiplying and adding.");
};

const ORDER = mathUnit({
  id: "fl-g7-order-of-operations",
  title: "Order of Operations",
  emoji: "🧮",
  blurb: "Brackets, powers and absolute value",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.7.NSO.2.1: solving multi-step expressions with grouping symbols, whole-number exponents, absolute value and rational numbers, working in the right order: grouping symbols and absolute value, exponents, multiplication and division, then addition and subtraction.",
  codes: "MA.7.NSO.2.1",
  text: "multi-step order of operations with grouping symbols, exponents and absolute value",
  makers: [order1, order2, order3, order4, order5, which],
});

const solveOneStep: Maker = () => {
  const kind = randInt(0, 3);
  const k = randInt(2, 9);
  const t = randInt(4, 40);
  const sym = pick([">", "<", "≥", "≤"]);
  const flip = (s: string) => ({ ">": "<", "<": ">", "≥": "≤", "≤": "≥" })[s]!;
  if (kind === 0) return pickOne(`Solve: x + ${k} ${sym} ${t + k}`, `x ${sym} ${t}`, [`x ${flip(sym)} ${t}`, `x ${sym} ${t + 2 * k}`, `x ${sym} ${t + k}`].filter((x) => x !== `x ${sym} ${t}`), `Subtract ${k} from both sides.`);
  if (kind === 1) return pickOne(`Solve: x − ${k} ${sym} ${t}`, `x ${sym} ${t + k}`, [`x ${flip(sym)} ${t + k}`, `x ${sym} ${t - k}`, `x ${sym} ${t}`], `Add ${k} to both sides.`);
  if (kind === 2) return pickOne(`Solve: ${k}x ${sym} ${k * t}`, `x ${sym} ${t}`, [`x ${flip(sym)} ${t}`, `x ${sym} ${k * t * k}`, `x ${sym} ${k * t - k}`], `Divide both sides by ${k}. The sign stays the same.`);
  return pickOne(`Solve: −${k}x ${sym} ${-k * t}`, `x ${flip(sym)} ${t}`, [`x ${sym} ${t}`, `x ${sym} ${-t}`, `x ${flip(sym)} ${-t}`], `Divide both sides by −${k} and flip the inequality sign.`);
};

const testValue: Maker = () => {
  const t = randInt(5, 30);
  const k = randInt(2, 6);
  const right = t + randInt(1, 5);
  const wrong = [t - 1, t, t - randInt(2, 4)].map(String);
  return pickOne(`Which value of x makes x + ${k} > ${t + k} true?`, String(right), wrong, `x has to be bigger than ${t}.`);
};

const boundary: Maker = () => {
  const t = randInt(4, 30);
  return pickOne(`Is x = ${t} a solution of x ≥ ${t}?`, "yes", ["no"], "≥ includes the number itself.");
};

const strict: Maker = () => {
  const t = randInt(4, 30);
  return pickOne(`Is x = ${t} a solution of x > ${t}?`, "no", ["yes"], "> does not include the number itself.");
};

const INEQUALITIES = mathUnit({
  id: "fl-g7-one-step-inequalities",
  title: "One-Step Inequalities",
  emoji: "↔️",
  blurb: "Solve and test inequalities",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.7.AR.2.1: writing and solving one-step inequalities in one variable and representing the solutions. Remember that multiplying or dividing both sides by a negative number reverses the inequality sign.",
  codes: "MA.7.AR.2.1",
  text: "writing and solving one-step inequalities in one variable",
  makers: [solveOneStep, testValue, boundary, strict, solveOneStep, solveOneStep],
});

const mileToKm: Maker = (d) => {
  const mi = 5 * randInt(1, d === 1 ? 6 : 20);
  return num(`1 mile is about 1.6 kilometers. About how many kilometers is ${mi} miles?`, mi * 1.6, `${mi} × 1.6 = ${mi * 1.6}.`, { min: 1, step: 2, label: fmt, extra: [mi / 1.6] });
};

const kmToMile: Maker = (d) => {
  const mi = 5 * randInt(1, d === 1 ? 6 : 20);
  const km = mi * 1.6;
  return num(`A trail is ${km} kilometers long. 1 mile is about 1.6 kilometers. About how many miles is it?`, mi, `${km} ÷ 1.6 = ${mi}.`, { min: 1, step: 5, extra: [km] });
};

const inchToCm: Maker = (d) => {
  const inch = 10 * randInt(1, d === 1 ? 4 : 10);
  return num(`1 inch is about 2.5 centimeters. About how many centimeters is ${inch} inches?`, inch * 2.5, `${inch} × 2.5 = ${inch * 2.5}.`, { min: 1, step: 5, label: fmt, extra: [inch / 2.5] });
};

const kgToLb: Maker = (d) => {
  const kg = 5 * randInt(1, d === 1 ? 6 : 16);
  return num(`1 kilogram is about 2.2 pounds. About how many pounds is ${kg} kilograms?`, kg * 2.2, `${kg} × 2.2 = ${kg * 2.2}.`, { min: 1, step: 2, label: fmt, extra: [kg / 2.2] });
};

const gallonToL: Maker = (d) => {
  const gal = randInt(2, d === 1 ? 8 : 20) * 5;
  return num(`1 gallon is about 3.8 liters. About how many liters is ${gal} gallons?`, gal * 3.8, `${gal} × 3.8 = ${gal * 3.8}.`, { min: 1, step: 5, label: fmt, extra: [gal / 3.8] });
};

const pickUnit: Maker = () => {
  const items: [string, string, string[]][] = [
    ["Which is longer: 1 kilometer or 1 mile?", "1 mile", ["1 kilometer", "they are equal"]],
    ["Which is heavier: 1 kilogram or 1 pound?", "1 kilogram", ["1 pound", "they are equal"]],
    ["Which holds more: 1 liter or 1 gallon?", "1 gallon", ["1 liter", "they are equal"]],
    ["Which is longer: 1 inch or 1 centimeter?", "1 inch", ["1 centimeter", "they are equal"]],
  ];
  const [prompt, right, wrong] = pick(items);
  return pickOne(prompt, right, wrong, "Compare the sizes: 1 mile ≈ 1.6 km, 1 kg ≈ 2.2 lb, 1 gal ≈ 3.8 L, 1 in ≈ 2.5 cm.");
};

const CONVERT = mathUnit({
  id: "fl-g7-convert-systems",
  title: "Metric and Customary Conversions",
  emoji: "🔄",
  blurb: "Convert between measurement systems",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.7.AR.3.3: converting measurements between the metric and customary systems with conversion rates, for example miles to kilometers and pounds to kilograms. Check a car's speed in miles per hour against a kilometers-per-hour reading.",
  codes: "MA.7.AR.3.3",
  text: "converting units across measurement systems with conversion rates",
  makers: [mileToKm, kmToMile, inchToCm, kgToLb, gallonToL, pickUnit],
});

const SPINNERS: { name: string; outcomes: string[] }[] = [
  { name: "a coin", outcomes: ["heads", "tails"] },
  { name: "a number cube", outcomes: ["1", "2", "3", "4", "5", "6"] },
  { name: "a spinner with red, blue and green", outcomes: ["red", "blue", "green"] },
  { name: "a spinner with 4 equal parts", outcomes: ["A", "B", "C", "D"] },
];

const countOutcomes: Maker = () => {
  const [a, b] = shuffle(SPINNERS).slice(0, 2);
  const total = a.outcomes.length * b.outcomes.length;
  return num(`How many outcomes are in the sample space for using ${a.name} and ${b.name} once each?`, total, `Multiply: ${a.outcomes.length} × ${b.outcomes.length} = ${total}.`, { min: 2, extra: [a.outcomes.length + b.outcomes.length] });
};

const oneItem: Maker = () => {
  const s = pick(SPINNERS);
  return num(`How many outcomes are in the sample space when you use ${s.name} once?`, s.outcomes.length, `List every outcome: ${s.outcomes.join(", ")}.`, { min: 2, max: 8 });
};

const notIn: Maker = () => {
  const s = pick(SPINNERS.slice(0, 3));
  const odd = s.outcomes === SPINNERS[0].outcomes ? "edge" : s.outcomes === SPINNERS[1].outcomes ? "7" : "yellow";
  return pickOne(`Which is NOT an outcome in the sample space for ${s.name}?`, odd, shuffle(s.outcomes).slice(0, 3), "Only the listed outcomes can happen.");
};

const listPair: Maker = () => {
  const coin = ["heads", "tails"];
  const o = pick(coin);
  const n = randInt(1, 6);
  return pickOne(`You flip a coin and roll a number cube. Which pair is in the sample space?`, `${o}, ${n}`, [`${o}, ${n + 6}`, `${n}, ${n}`, "heads, tails"], "A coin result is paired with a number from 1 to 6.");
};

const SAMPLE_SPACE = mathUnit({
  id: "fl-g7-sample-space",
  title: "Sample Space",
  emoji: "🎲",
  blurb: "List every possible outcome",
  parentNote:
    "Practises Florida's B.E.S.T. benchmark MA.7.DP.2.1: determining the sample space, the list of all possible outcomes, for a simple experiment such as a coin flip, a spinner or rolling a number cube. Try listing every outcome of flipping two coins.",
  codes: "MA.7.DP.2.1",
  text: "determining the sample space for a simple experiment",
  makers: [countOutcomes, oneItem, notIn, listPair, countOutcomes],
});

export const UNITS: Unit[] = [EXPONENT_LAWS, ORDER, INEQUALITIES, CONVERT, SAMPLE_SPACE];
/** Put the own units before the planned ones. */
export const FIRST = false;
