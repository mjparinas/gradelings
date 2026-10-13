import { pick, randInt, shuffle } from "../../random";
import type { GenerateOptions, Question, Unit, Visual } from "../../types";
import { type D, type Maker, frac, fracChoice, fmt, linear, num, pickOne, signed, typed } from "../../washington/units/math-kit";
import { ore } from "../cite";

// Oregon's own Grade 9 math units (`or-` ids). Oregon's high school standards are course-free and give geometry a
// bigger share than an Algebra 1 course does, so these cover what no shared unit practises: right-triangle
// trigonometry (HS.GM.D.12) and coordinate geometry with slopes and distance (HS.GM.A.3, HS.GM.D.14).

interface Spec {
  id: string;
  title: string;
  emoji: string;
  blurb: string;
  parentNote: string;
  codes: string;
  text: string;
  makers: Maker[];
}

/** A unit whose 8-question set cycles through its makers in a shuffled order. */
function orMathUnit(spec: Spec): Unit {
  return {
    id: spec.id,
    title: spec.title,
    emoji: spec.emoji,
    blurb: spec.blurb,
    parentNote: spec.parentNote,
    standards: ore(spec.codes, spec.text),
    generate: (opts?: GenerateOptions): Question[] => {
      const d = opts?.difficulty ?? 2;
      const out: Question[] = [];
      let pool: Maker[] = [];
      while (out.length < 8) {
        if (!pool.length) pool = shuffle(spec.makers);
        out.push(pool.pop()!(d));
      }
      return out;
    },
  };
}

// ---------- Right-triangle trigonometry ----------

/** Pythagorean triples: [opposite, adjacent, hypotenuse] for angle A. */
const TRIPLES: [number, number, number][] = [
  [3, 4, 5],
  [4, 3, 5],
  [5, 12, 13],
  [12, 5, 13],
  [8, 15, 17],
  [15, 8, 17],
  [7, 24, 25],
  [20, 21, 29],
];

type Fn = "sin" | "cos" | "tan";
const FN_NAME: Record<Fn, string> = { sin: "Sine", cos: "Cosine", tan: "Tangent" };

const ratioOf: Maker = (d) => {
  const [a, b, c] = pick(d === 1 ? TRIPLES.slice(0, 4) : TRIPLES);
  const k = d === 1 ? 1 : randInt(1, 3);
  const fn = pick<Fn>(["sin", "cos", "tan"]);
  const right: [number, number] = fn === "sin" ? [a, c] : fn === "cos" ? [b, c] : [a, b];
  const prompt = `In a right triangle, the side opposite angle A is ${a * k}, the side next to angle A is ${b * k} and the hypotenuse is ${c * k}. What is ${fn} A?`;
  return fracChoice(prompt, right, [[a, c], [b, c], [a, b], [b, a], [c, a]], "SOH CAH TOA: sin = opposite ÷ hypotenuse, cos = adjacent ÷ hypotenuse, tan = opposite ÷ adjacent.");
};

const sohcahtoa: Maker = () => {
  const fn = pick<Fn>(["sin", "cos", "tan"]);
  const right = fn === "sin" ? "opposite ÷ hypotenuse" : fn === "cos" ? "adjacent ÷ hypotenuse" : "opposite ÷ adjacent";
  const all = ["opposite ÷ hypotenuse", "adjacent ÷ hypotenuse", "opposite ÷ adjacent", "adjacent ÷ opposite", "hypotenuse ÷ opposite"];
  return pickOne(
    `For an acute angle A in a right triangle, which ratio is ${fn} A?`,
    right,
    shuffle(all.filter((x) => x !== right)).slice(0, 3),
    "Remember SOH CAH TOA: Sine is Opposite over Hypotenuse, Cosine is Adjacent over Hypotenuse, Tangent is Opposite over Adjacent.",
  );
};

const whichRatio: Maker = () => {
  const cases: [string, string, Fn][] = [
    ["the hypotenuse", "the opposite side", "sin"],
    ["the opposite side", "the hypotenuse", "sin"],
    ["the hypotenuse", "the adjacent side", "cos"],
    ["the adjacent side", "the hypotenuse", "cos"],
    ["the adjacent side", "the opposite side", "tan"],
    ["the opposite side", "the adjacent side", "tan"],
  ];
  const [know, want, fn] = pick(cases);
  const others = (["sin", "cos", "tan"] as Fn[]).filter((f) => f !== fn).map((f) => FN_NAME[f]);
  return pickOne(
    `You know angle A and ${know} of a right triangle. You want ${want}. Which ratio links them?`,
    FN_NAME[fn],
    others,
    "Name the two sides you are using (opposite, adjacent or hypotenuse), then find the ratio that uses exactly those two.",
  );
};

const specialSide: Maker = (d) => {
  const len = randInt(2, d === 1 ? 12 : 30) * 2;
  const story = pick([0, 1, 2]);
  if (story === 0) {
    return num(
      `A ${len} m ladder leans on a wall and makes a 30° angle with the ground. How high up the wall does it reach? (sin 30° = 0.5)`,
      len / 2,
      "The height is opposite the 30° angle and the ladder is the hypotenuse, so height = ladder × sin 30°.",
      { step: 2, extra: [len, len * 2, len / 2 + 1], min: 1 },
    );
  }
  if (story === 1) {
    return num(
      `A kite string is ${len} m long and makes a 60° angle with the ground. How far along the ground is the kite from the person? (cos 60° = 0.5)`,
      len / 2,
      "The ground distance is next to the 60° angle and the string is the hypotenuse, so distance = string × cos 60°.",
      { step: 2, extra: [len, len * 2, len / 2 + 1], min: 1 },
    );
  }
  const run = len / 2;
  return num(
    `A ramp rises at a 45° angle and runs ${run} m along the ground. How high does it rise? (tan 45° = 1)`,
    run,
    "The rise is opposite the angle and the run is adjacent, so rise = run × tan 45°.",
    { step: 1, extra: [run * 2, run + 1, Math.round(run / 2)], min: 1 },
  );
};

const useRatio: Maker = (d) => {
  const kind = pick([0, 1, 2]);
  const m = randInt(1, d === 1 ? 6 : 12);
  let prompt: string;
  let answer: number;
  let hint: string;
  let extra: number[];
  if (kind === 0) {
    const h = 5 * m;
    answer = 3 * m;
    prompt = `In a right triangle, sin A = 0.6 and the hypotenuse is ${h} cm. How long is the side opposite angle A?`;
    hint = `sin A = opposite ÷ hypotenuse, so opposite = 0.6 × ${h}.`;
    extra = [4 * m, h, h + 3 * m];
  } else if (kind === 1) {
    const h = 5 * m;
    answer = 4 * m;
    prompt = `In a right triangle, cos A = 0.8 and the hypotenuse is ${h} cm. How long is the side next to angle A?`;
    hint = `cos A = adjacent ÷ hypotenuse, so adjacent = 0.8 × ${h}.`;
    extra = [3 * m, h, h + 4 * m];
  } else {
    const adj = 4 * m;
    answer = 3 * m;
    prompt = `In a right triangle, tan A = 0.75 and the side next to angle A is ${adj} cm. How long is the side opposite angle A?`;
    hint = `tan A = opposite ÷ adjacent, so opposite = 0.75 × ${adj}.`;
    extra = [5 * m, adj + 3, adj];
  }
  if (d === 3) return typed(`${prompt} Type the length.`, answer, hint, { suffix: "cm" });
  return num(prompt, answer, hint, { step: m, extra, min: 1 });
};

const complement: Maker = (d) => {
  if (d === 1 || pick([true, false])) {
    const x = randInt(12, 78);
    return num(
      `In a right triangle, one acute angle is ${x}°. What is the other acute angle?`,
      90 - x,
      "The angles of a triangle add to 180°, and the right angle uses 90°, so the two acute angles add to 90°.",
      { step: 5, extra: [180 - x, 180 - 90 - x + 10, x], label: (n) => `${fmt(n)}°`, min: 1 },
    );
  }
  const [a, b, c] = pick(TRIPLES);
  return fracChoice(
    `In right triangle ABC with the right angle at C, sin A = ${frac(a, c)}. What is cos B?`,
    [a, c],
    [[b, c], [a, b], [c, a], [b, a]],
    "The side opposite A is the side next to B, and both use the same hypotenuse. So cos B = sin A.",
  );
};

// ---------- Coordinate geometry ----------

const pt = (x: number, y: number): string => `(${fmt(x)}, ${fmt(y)})`;
const inGrid = (...ns: number[]): boolean => ns.every((n) => Math.abs(n) <= 10);
const gridOf = (pts: [number, number, string][]): Visual => ({ type: "grid", size: 10, min: -10, points: pts.map(([x, y, label]) => ({ x, y, label })) });

const distance: Maker = (d) => {
  for (;;) {
    const [p, q, r] = d === 3 ? pick<[number, number, number]>([[3, 4, 5], [6, 8, 10], [5, 12, 13], [8, 6, 10]]) : pick<[number, number, number]>([[3, 4, 5], [4, 3, 5], [6, 8, 10], [8, 6, 10]]);
    const dx = p * pick([1, -1]);
    const dy = q * pick([1, -1]);
    const x1 = randInt(-6, 6);
    const y1 = randInt(-6, 6);
    const [x2, y2] = [x1 + dx, y1 + dy];
    if (!inGrid(x2, y2)) continue;
    return num(
      `What is the distance between A${pt(x1, y1)} and B${pt(x2, y2)}?`,
      r,
      `Across: ${p}. Up or down: ${q}. Use the Pythagorean Theorem: √(${p}² + ${q}²).`,
      { extra: [p + q, Math.abs(p - q), r + 2], min: 1, visual: gridOf([[x1, y1, "A"], [x2, y2, "B"]]) },
    );
  }
};

const midpoint: Maker = () => {
  const x1 = randInt(-8, 8);
  const y1 = randInt(-8, 8);
  const x2 = x1 + 2 * randInt(-4, 4);
  const y2 = y1 + 2 * randInt(1, 4) * pick([1, -1]);
  if (!inGrid(x2, y2) || x1 === x2) return midpoint(2);
  const [mx, my] = [(x1 + x2) / 2, (y1 + y2) / 2];
  return pickOne(
    `What is the midpoint of the segment from ${pt(x1, y1)} to ${pt(x2, y2)}?`,
    pt(mx, my),
    [pt(my, mx), pt((x2 - x1) / 2, (y2 - y1) / 2), pt(x1 + x2, y1 + y2), pt(mx + 1, my)],
    "Average the x-coordinates, then average the y-coordinates.",
  );
};

const slopeOf: Maker = (d) => {
  for (;;) {
    const x1 = randInt(-6, 6);
    const y1 = randInt(-6, 6);
    const dx = randInt(1, d === 1 ? 4 : 6) * pick([1, -1]);
    const dy = randInt(1, 6) * pick([1, -1]);
    const [x2, y2] = [x1 + dx, y1 + dy];
    if (!inGrid(x2, y2) || Math.abs(dx) === Math.abs(dy)) continue;
    return fracChoice(
      `What is the slope of the segment from P${pt(x1, y1)} to Q${pt(x2, y2)}?`,
      [dy, dx],
      [[dx, dy], [-dy, dx], [dy + dx, dx], [-dx, dy]],
      "Slope = change in y ÷ change in x. Subtract in the same order for both.",
    );
  }
};

/** y = mx + b with m = n/d, written for a prompt. */
function lineText(n: number, dd: number, b: number): string {
  if (dd === 1) return `y = ${linear(n, b)}`;
  const coef = `${n < 0 ? "−" : ""}(${Math.abs(n)}/${dd})x`;
  return b === 0 ? `y = ${coef}` : `y = ${coef} ${signed(b)}`;
}

const parallelOrNot: Maker = () => {
  const n = randInt(1, 5) * pick([1, -1]);
  const dd = pick([1, 2, 3]);
  if (Math.abs(n) % dd === 0 && dd !== 1) return parallelOrNot(2);
  const b1 = randInt(-6, 6);
  let b2 = randInt(-6, 6);
  if (b2 === b1) b2 = b1 + 3;
  const kind = pick(["Parallel", "Perpendicular", "Neither"]);
  let line2: string;
  if (kind === "Parallel") line2 = lineText(n, dd, b2);
  else if (kind === "Perpendicular") line2 = lineText(-dd * Math.sign(n), Math.abs(n), b2);
  else line2 = lineText(dd * Math.sign(n) * (Math.abs(n) === dd ? 2 : 1), Math.abs(n), b2);
  return pickOne(
    `Are the lines ${lineText(n, dd, b1)} and ${line2} parallel, perpendicular or neither?`,
    kind,
    ["Parallel", "Perpendicular", "Neither"].filter((k) => k !== kind),
    "Parallel lines have equal slopes. Perpendicular lines have slopes that multiply to −1.",
  );
};

const perpSlope: Maker = () => {
  const n = randInt(1, 6) * pick([1, -1]);
  const dd = pick([1, 2, 3, 4, 5]);
  if (Math.abs(n) === dd) return perpSlope(2);
  return fracChoice(
    `A line has slope ${frac(n, dd)}. What is the slope of a line perpendicular to it?`,
    [-dd, n],
    [[n, dd], [-n, dd], [dd, n]],
    "Flip the fraction and change its sign. The two slopes should multiply to −1.",
  );
};

const rightAngle: Maker = (d: D) => {
  for (;;) {
    const bx = randInt(-4, 4);
    const by = randInt(-4, 4);
    const a = randInt(1, 4) * pick([1, -1]);
    const b = randInt(1, 4) * pick([1, -1]);
    const yes = pick([true, false]);
    const s = d === 1 ? 1 : pick([1, 2]);
    const cy = a * s;
    let cx = -b * s;
    if (!yes) {
      cx += pick([1, -1]);
      if (a * cx + b * cy === 0 || cx === 0) continue;
    }
    const A: [number, number] = [bx + a, by + b];
    const C: [number, number] = [bx + cx, by + cy];
    if (!inGrid(...A, ...C)) continue;
    return pickOne(
      `Triangle ABC has vertices A${pt(...A)}, B${pt(bx, by)} and C${pt(...C)}. Is the angle at B a right angle?`,
      yes ? "Yes" : "No",
      [yes ? "No" : "Yes"],
      "Find the slopes of BA and BC. The angle is a right angle only if the slopes multiply to −1.",
      gridOf([[A[0], A[1], "A"], [bx, by, "B"], [C[0], C[1], "C"]]),
    );
  }
};

export const G9_UNITS: Unit[] = [
  orMathUnit({
    id: "or-g9-trig",
    title: "Right-Triangle Trig",
    emoji: "📐",
    blurb: "Sine, cosine and tangent",
    parentNote:
      "The three trig ratios in a right triangle (SOH CAH TOA), choosing the right ratio for the sides you know, finding a missing side, and seeing why sin A = cos B for the two acute angles.",
    codes: "HS.GM.D.12; HS.GM.B.6",
    text: "using sine, cosine and tangent to find side lengths in right triangles, and the angle facts of right triangles",
    makers: [ratioOf, sohcahtoa, whichRatio, specialSide, useRatio, complement],
  }),
  orMathUnit({
    id: "or-g9-coordinate-geometry",
    title: "Coordinate Geometry",
    emoji: "🧭",
    blurb: "Distance, midpoint and slope",
    parentNote:
      "Finding the distance between two points with the Pythagorean Theorem, the midpoint of a segment, slopes of segments, telling parallel and perpendicular lines apart, and using slopes to check for a right angle.",
    codes: "HS.GM.D.14; HS.GM.A.3; HS.GM.D.13",
    text: "using the coordinate plane to find distances and midpoints, and using slopes to decide when lines are parallel or perpendicular",
    makers: [distance, midpoint, slopeOf, parallelOrNot, perpSlope, rightAngle],
  }),
];
