import { pick, randInt, shuffle } from "../../random";
import { eq, fmt, num, pickOne, type Maker } from "../../washington/units/math-kit";
import { mathUnit } from "./math";

// Grade 9: absolute value equations and inequalities (A-REI.3.1, A-CED.1), a California addition to the Common Core.
// The shared helpers are in ./math.ts.

const abs = (inside: string) => `|${inside}|`;
const minusA = (a: number) =>
  a === 0 ? "x" : a < 0 ? `x + ${-a}` : `x − ${a}`;

const evaluate: Maker = () => {
  const a = randInt(-12, 12);
  const b = randInt(-12, 12);
  const v = Math.abs(a - b);
  return num(
    `What is ${abs(`${fmt(a)} − ${b < 0 ? `(${fmt(b)})` : b}`)}?`,
    v,
    `${fmt(a)} − ${b < 0 ? `(${fmt(b)})` : b} = ${fmt(a - b)}, and its distance from 0 is ${v}.`,
    { min: 0 },
  );
};

const solveEquation: Maker = (d) => {
  const a = d === 1 ? 0 : randInt(-9, 9) || 4;
  const b = randInt(2, 12);
  const lhs = abs(minusA(a));
  const right = `x = ${fmt(a - b)} or x = ${fmt(a + b)}`;
  const wrong = [
    `x = ${fmt(a + b)} only`,
    `x = ${fmt(a - b)} only`,
    "No solution",
  ];
  if (a !== 0) wrong.push(`x = ${fmt(b - a)} or x = ${fmt(-a - b)}`);
  return pickOne(
    `Solve ${lhs} = ${b}.`,
    right,
    shuffle(wrong).slice(0, 3),
    `The expression inside is ${b} or −${b}: ${minusA(a)} = ${b} or ${minusA(a)} = −${b}.`,
    eq(`${lhs} = ${b}`),
  );
};

const solveScaled: Maker = () => {
  const k = pick([2, 3, 4]);
  const c = randInt(1, 6);
  const b = k * randInt(1, 5);
  // |kx − c·k| = b, so x = c ± b/k.
  const lhs = abs(`${k}x − ${k * c}`);
  const right = `x = ${fmt(c - b / k)} or x = ${fmt(c + b / k)}`;
  const wrong = [
    `x = ${fmt(c + b)} or x = ${fmt(c - b)}`,
    `x = ${fmt(c + b / k)} only`,
    "No solution",
  ].filter((w) => w !== right);
  return pickOne(
    `Solve ${lhs} = ${b}.`,
    right,
    wrong,
    `${k}x − ${k * c} = ${b} or ${k}x − ${k * c} = −${b}. Then divide by ${k}.`,
    eq(`${lhs} = ${b}`),
  );
};

const howMany: Maker = () => {
  const a = randInt(1, 9);
  const c = pick([-randInt(1, 9), 0, randInt(1, 9)]);
  const right =
    c < 0 ? "No solution" : c === 0 ? "One solution" : "Two solutions";
  return pickOne(
    `How many solutions does ${abs(`x + ${a}`)} = ${fmt(c)} have?`,
    right,
    ["No solution", "One solution", "Two solutions", "Infinitely many"].filter(
      (w) => w !== right,
    ),
    c < 0
      ? "An absolute value is never negative."
      : c === 0
        ? `Only x + ${a} = 0 works.`
        : `x + ${a} = ${c} or x + ${a} = −${c}.`,
  );
};

const solveLess: Maker = (d) => {
  const a = randInt(-6, 9);
  const b = randInt(2, 9);
  const strict = d < 3 || randInt(0, 1) === 0;
  const [lt, gt] = strict ? ["<", ">"] : ["≤", "≥"];
  const lhs = abs(minusA(a));
  if (randInt(0, 1) === 0) {
    const right = `${fmt(a - b)} ${lt} x ${lt} ${fmt(a + b)}`;
    return pickOne(
      `Solve ${lhs} ${lt} ${b}.`,
      right,
      [
        `x ${lt} ${fmt(a - b)} or x ${gt} ${fmt(a + b)}`,
        `x ${lt} ${fmt(a + b)}`,
        `${fmt(-b)} ${lt} x ${lt} ${fmt(b)}`,
      ].filter((w) => w !== right),
      `Distance from ${fmt(a)} is less than ${b}: x is between ${fmt(a - b)} and ${fmt(a + b)}.`,
    );
  }
  const right = `x ${lt} ${fmt(a - b)} or x ${gt} ${fmt(a + b)}`;
  return pickOne(
    `Solve ${lhs} ${gt} ${b}.`,
    right,
    [
      `${fmt(a - b)} ${lt} x ${lt} ${fmt(a + b)}`,
      `x ${gt} ${fmt(a + b)}`,
      `x ${lt} ${fmt(-b)} or x ${gt} ${fmt(b)}`,
    ].filter((w) => w !== right),
    `Distance from ${fmt(a)} is more than ${b}: x is below ${fmt(a - b)} or above ${fmt(a + b)}.`,
  );
};

const TOLERANCES: [string, string, string, number, number][] = [
  [
    "A machine fills bags of rice. Each bag should weigh {t} grams, and it may be off by at most {e} grams.",
    "w",
    "weights",
    500,
    8,
  ],
  [
    "A bolt should be {t} millimeters long, with a tolerance of {e} millimeters.",
    "L",
    "lengths",
    40,
    2,
  ],
  [
    "A pool should be kept at {t}°F, give or take {e} degrees.",
    "T",
    "temperatures",
    80,
    3,
  ],
  [
    "A juice bottle should hold {t} milliliters, plus or minus {e} milliliters.",
    "v",
    "volumes",
    350,
    5,
  ],
];

const modelTolerance: Maker = () => {
  const [story, v, what, t, e] = pick(TOLERANCES);
  const right = `|${v} − ${t}| ≤ ${e}`;
  return pickOne(
    `${story.replace("{t}", String(t)).replace("{e}", String(e))} Which inequality shows the allowed ${what} ${v}?`,
    right,
    [`|${v} − ${e}| ≤ ${t}`, `|${v} − ${t}| ≥ ${e}`, `|${v} + ${t}| ≤ ${e}`],
    `The distance between ${v} and ${t} is at most ${e}.`,
  );
};

export const ABSOLUTE_VALUE_9 = mathUnit({
  id: "ca-g9-absolute-value",
  title: "Absolute Value Equations",
  emoji: "📏",
  blurb: "Distance from a number, both ways",
  parentNote:
    "Solving one-variable equations and inequalities with absolute value, reading |x − a| as the distance from a, and writing absolute-value inequalities for real tolerances. Absolute value equations are a California addition to Algebra I.",
  codes: "A-REI.3.1; A-CED.1",
  text: "solving and creating one-variable equations and inequalities involving absolute value",
  makers: [
    evaluate,
    solveEquation,
    solveScaled,
    howMany,
    solveLess,
    modelTolerance,
  ],
});
