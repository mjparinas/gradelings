import { pick, randInt, shuffle } from "../../random";
import type { GenerateOptions, GradeId, Question, Unit } from "../../types";
import {
  eq,
  fmt,
  num,
  pickOne,
  someone,
  typed,
  type Maker,
} from "../../washington/units/math-kit";
import { cal } from "../cite";

// California-only math units, for the California additions to the Common Core that no other framework's unit
// practises: estimation in Grade 2 (2.NBT.7.1), prime factorization in Grade 5 (5.OA.2.1) and absolute-value equations
// and inequalities in Algebra I (A-REI.3.1, with A-CED.1). Every other California math unit is shared or adopted
// (../plan/math.ts). Each set of 8 questions cycles through the unit's question makers in a shuffled order.

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

function mathUnit(spec: Spec): Unit {
  return {
    id: spec.id,
    title: spec.title,
    emoji: spec.emoji,
    blurb: spec.blurb,
    parentNote: spec.parentNote,
    standards: cal(spec.codes, spec.text),
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

// ---------------------------------------------------------------------------------------------------------------
// Grade 2: estimation (2.NBT.7.1)

const round10 = (n: number) => Math.round(n / 10) * 10;
const round100 = (n: number) => Math.round(n / 100) * 100;

/** A two- or three-digit number that does not end in 5 (or 50), so rounding has one clear answer. */
function clean(min: number, max: number, unit: 10 | 100): number {
  for (;;) {
    const n = randInt(min, max);
    if (unit === 10 && n % 10 !== 5 && n % 10 !== 0) return n;
    if (unit === 100 && n % 100 !== 50 && n % 100 > 4 && n % 100 < 96) return n;
  }
}

const estimateSum: Maker = (d) => {
  if (d === 1) {
    const [a, b] = [clean(11, 49, 10), clean(11, 49, 10)];
    const est = round10(a) + round10(b);
    return num(
      `Round each number to the nearest ten. About how much is ${a} + ${b}?`,
      est,
      `${a} is about ${round10(a)} and ${b} is about ${round10(b)}. ${round10(a)} + ${round10(b)} = ${est}.`,
      { step: 10, min: 10 },
    );
  }
  const [a, b] = [clean(110, 480, 100), clean(110, 480, 100)];
  const est = round100(a) + round100(b);
  return num(
    `Round each number to the nearest hundred. About how much is ${a} + ${b}?`,
    est,
    `${a} is about ${round100(a)} and ${b} is about ${round100(b)}. ${round100(a)} + ${round100(b)} = ${est}.`,
    { step: 100, min: 100 },
  );
};

const estimateDifference: Maker = (d) => {
  if (d === 1) {
    const a = clean(51, 98, 10);
    const b = clean(11, a - 20, 10);
    const est = round10(a) - round10(b);
    return num(
      `Round each number to the nearest ten. About how much is ${a} − ${b}?`,
      est,
      `${a} is about ${round10(a)} and ${b} is about ${round10(b)}. ${round10(a)} − ${round10(b)} = ${est}.`,
      { step: 10, min: 10 },
    );
  }
  const a = clean(520, 980, 100);
  const b = clean(110, a - 220, 100);
  const est = round100(a) - round100(b);
  return num(
    `Round each number to the nearest hundred. About how much is ${a} − ${b}?`,
    est,
    `${a} is about ${round100(a)} and ${b} is about ${round100(b)}. ${round100(a)} − ${round100(b)} = ${est}.`,
    { step: 100, min: 100 },
  );
};

const reasonable: Maker = (d) => {
  const big = d > 1;
  const a = big ? clean(110, 480, 100) : clean(11, 49, 10);
  const b = big ? clean(110, 480, 100) : clean(11, 49, 10);
  const sum = a + b;
  const est = big ? round100(a) + round100(b) : round10(a) + round10(b);
  const off = big ? 400 : 40;
  const wrong = [sum + off, sum + 2 * off, Math.max(1, sum - off)].filter(
    (w) => Math.abs(w - est) >= off / 2 && w !== sum,
  );
  return pickOne(
    `${someone()} adds ${a} + ${b}. Which answer is reasonable?`,
    String(sum),
    wrong.map(String),
    `Estimate first: about ${est}. The reasonable answer is close to ${est}.`,
  );
};

const STORIES: [string, string, string][] = [
  [
    "A school has {a} first graders and {b} second graders.",
    "children",
    "in all",
  ],
  [
    "A farm stand sells {a} apples in the morning and {b} apples in the afternoon.",
    "apples",
    "in all",
  ],
  ["A library has {a} picture books and {b} chapter books.", "books", "in all"],
  ["A bakery makes {a} muffins and {b} bagels.", "baked treats", "in all"],
];

const estimateStory: Maker = (d) => {
  const [story, what] = pick(STORIES);
  const big = d === 3;
  const a = big ? clean(110, 480, 100) : clean(11, 49, 10);
  const b = big ? clean(110, 480, 100) : clean(11, 49, 10);
  const [ra, rb] = big ? [round100(a), round100(b)] : [round10(a), round10(b)];
  const est = ra + rb;
  return num(
    `${story.replace("{a}", String(a)).replace("{b}", String(b))} About how many ${what} is that? Round to the nearest ${big ? "hundred" : "ten"}.`,
    est,
    `${a} is about ${ra}. ${b} is about ${rb}. ${ra} + ${rb} = ${est}.`,
    { step: big ? 100 : 10, min: 10 },
  );
};

const nearestTen: Maker = (d) => {
  if (d === 3) {
    const n = clean(110, 980, 100);
    return num(
      `What is ${n} rounded to the nearest hundred?`,
      round100(n),
      `Look at the tens digit. ${n} is closer to ${round100(n)}.`,
      { step: 100, min: 100 },
    );
  }
  const n = clean(11, 98, 10);
  return num(
    `What is ${n} rounded to the nearest ten?`,
    round10(n),
    `Look at the ones digit. ${n} is closer to ${round10(n)}.`,
    { step: 10, min: 10 },
  );
};

export const ESTIMATE_2 = mathUnit({
  id: "ca-g2-estimate",
  title: "About How Many?",
  emoji: "🎯",
  blurb: "Round, estimate and check",
  parentNote:
    "Rounding to the nearest ten or hundred to estimate sums and differences, and using an estimate to check whether an answer makes sense. Estimation is a California addition to the 2nd grade standards.",
  codes: "2.NBT.7.1",
  text: "using estimation strategies to make reasonable estimates in problem solving",
  makers: [
    estimateSum,
    estimateDifference,
    reasonable,
    estimateStory,
    nearestTen,
  ],
});

// ---------------------------------------------------------------------------------------------------------------
// Grade 5: prime factorization (5.OA.2.1)

const PRIMES = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];
const isPrime = (n: number) => PRIMES.includes(n);
function primeFactors(n: number): number[] {
  const out: number[] = [];
  let m = n;
  for (const p of PRIMES)
    while (m % p === 0) {
      out.push(p);
      m /= p;
    }
  return out;
}
const times = (fs: number[]) => [...fs].sort((a, b) => a - b).join(" × ");
/** Composite numbers from 4 to 50 with at least `min` prime factors (counting repeats). */
const composites = (min: number) =>
  Array.from({ length: 47 }, (_, i) => i + 4).filter(
    (n) => !isPrime(n) && primeFactors(n).length >= min,
  );

const writeAsPrimes: Maker = (d) => {
  const n = pick(composites(d === 1 ? 2 : 3));
  const fs = primeFactors(n);
  const right = times(fs);
  const wrong = new Set<string>();
  // A factor pair that is not all prime.
  for (let a = 2; a * a <= n; a++)
    if (n % a === 0 && !(isPrime(a) && isPrime(n / a)))
      wrong.add(`${a} × ${n / a}`);
  // One prime factor swapped for the next prime (a different product).
  const swapped = [...fs];
  swapped[swapped.length - 1] =
    PRIMES[PRIMES.indexOf(swapped[swapped.length - 1]) + 1];
  wrong.add(times(swapped));
  // One prime factor too many, or 1 used as a factor.
  wrong.add(times([...fs, 2]));
  wrong.add(`1 × ${n}`);
  wrong.delete(right);
  return pickOne(
    `Write ${n} as a product of prime factors.`,
    right,
    shuffle([...wrong]).slice(0, 3),
    `Keep splitting until every factor is prime. ${n} = ${right}.`,
  );
};

const productOf: Maker = (d) => {
  const n = pick(composites(d === 3 ? 3 : 2));
  const fs = primeFactors(n);
  return num(
    `Which number has the prime factorization ${times(fs)}?`,
    n,
    `Multiply: ${times(fs)} = ${n}.`,
    { step: fs[0], min: 4 },
  );
};

const whichPrime: Maker = () => {
  const p = pick(PRIMES.filter((x) => x > 2 && x < 50));
  const others = shuffle(
    composites(2).filter((c) => Math.abs(c - p) < 15),
  ).slice(0, 3);
  return pickOne(
    "Which number is prime?",
    String(p),
    others.map(String),
    `A prime number has exactly two factors: 1 and itself. ${p} = 1 × ${p} only.`,
  );
};

const missingFactor: Maker = (d) => {
  const n = pick(composites(3));
  const fs = primeFactors(n);
  const i = randInt(0, fs.length - 1);
  const shown = fs.map((f, j) => (j === i ? "?" : String(f))).join(" × ");
  const hint = `Divide ${n} by the other factors: ${n} ÷ ${fs.filter((_, j) => j !== i).join(" ÷ ")} = ${fs[i]}.`;
  if (d === 3)
    return typed(
      `${n} = ${shown}. What prime number is missing?`,
      fs[i],
      hint,
      { visual: eq(`${n} = ${shown}`) },
    );
  return num(`${n} = ${shown}. What prime number is missing?`, fs[i], hint, {
    min: 2,
    extra: [fs[i] + 1, fs[i] * 2, fs[i] + 2].filter((x) => x !== fs[i]),
  });
};

const countFactors: Maker = () => {
  const n = pick(composites(2));
  const fs = primeFactors(n);
  return num(
    `How many prime factors does ${n} have, counting repeats?`,
    fs.length,
    `${n} = ${times(fs)}. That is ${fs.length} prime factors.`,
    { min: 1 },
  );
};

const factorTree: Maker = () => {
  const n = pick(composites(3));
  const fs = primeFactors(n);
  const first = fs[0];
  const rest = n / first;
  const restFs = primeFactors(rest);
  const right = times(restFs);
  const wrong = [
    `1 × ${rest}`,
    `${first} × ${rest}`,
    times([...restFs, first]),
  ].filter((w) => w !== right);
  return pickOne(
    `In a factor tree, ${n} splits into ${first} × ${rest}. What prime factors does ${rest} split into?`,
    right,
    wrong,
    `${rest} = ${right}, and every factor is prime.`,
  );
};

export const PRIME_FACTORS_5 = mathUnit({
  id: "ca-g5-prime-factors",
  title: "Prime Factor Trees",
  emoji: "🌲",
  blurb: "Break numbers into primes",
  parentNote:
    "Writing whole numbers from 2 to 50 as products of prime factors, for example 24 = 2 × 2 × 2 × 3, using factor trees. Prime factorization is a California addition to the 5th grade standards.",
  codes: "5.OA.2.1",
  text: "expressing a whole number from 2 to 50 as a product of its prime factors",
  makers: [
    writeAsPrimes,
    productOf,
    whichPrime,
    missingFactor,
    countFactors,
    factorTree,
  ],
});

// ---------------------------------------------------------------------------------------------------------------
// Grade 9: absolute value equations and inequalities (A-REI.3.1, A-CED.1)

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

export const OWN_MATH: Partial<Record<GradeId, Unit[]>> = {
  "2": [ESTIMATE_2],
  "5": [PRIME_FACTORS_5],
  "9": [ABSOLUTE_VALUE_9],
};
