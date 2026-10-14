import { pick, randInt, shuffle } from "../../random";
import { eq, fracChoice, mixed, num, pickOne, someone, typed, type Maker } from "../../washington/units/math-kit";
import type { Visual } from "../../types";
import { mathUnit } from "./math";

// Grade 5: prime factorization (5.OA.2.1), a California addition to the Common Core. The shared helpers are in ./math.ts.

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

// ---------- Line plots with fractions of a unit (5.MD.2) ----------

const PLOTS = [
  { what: "beakers", of: "water", unit: "liter" },
  { what: "bean sprouts", of: "growth", unit: "inch" },
  { what: "bags", of: "trail mix", unit: "pound" },
  { what: "ribbons", of: "ribbon", unit: "yard" },
];

/** A line plot in eighths: values (numerators over 8) from a few marks, at least two of each mark used. */
function plotData(d: number) {
  const p = pick(PLOTS);
  const marks = d === 1 ? [2, 4, 6] : d === 2 ? [1, 2, 4, 6] : [1, 2, 3, 4, 5, 6];
  const used = shuffle(marks).slice(0, d === 1 ? 3 : 4).sort((a, b) => a - b);
  const counts = used.map(() => randInt(1, 4));
  const values = used.flatMap((m, i) => Array.from({ length: counts[i] }, () => m));
  return { p, used, counts, values };
}

const eighth = (n: number) => mixed(n, 8);

function plotVisual(p: (typeof PLOTS)[number], used: number[], counts: number[]): Visual {
  return {
    type: "table",
    title: `${p.of[0].toUpperCase() + p.of.slice(1)} in each of the ${p.what} (${p.unit})`,
    headers: [`Amount (${p.unit})`, "X's"],
    rows: used.map((m, i) => [eighth(m), "✕".repeat(counts[i])]),
  };
}

const plotHowMany: Maker = (d) => {
  const { p, used, counts } = plotData(d);
  const i = randInt(0, used.length - 1);
  return num(`The line plot shows the ${p.of} in some ${p.what}. How many ${p.what} have ${eighth(used[i])} ${p.unit}?`, counts[i], "Count the X's above that mark.", {
    min: 1,
    max: 8,
    visual: plotVisual(p, used, counts),
  });
};

const plotMarkTotal: Maker = (d) => {
  const { p, used, counts } = plotData(d);
  const i = counts.findIndex((c) => c > 1) >= 0 ? counts.findIndex((c) => c > 1) : 0;
  const n = counts[i] * used[i];
  return fracChoice(
    `All the ${p.what} with ${eighth(used[i])} ${p.unit} are put together. How much ${p.of} is that?`,
    [n, 8],
    [
      [used[i], 8],
      [n + used[i], 8],
      [counts[i] + used[i], 8],
      [n, 16],
    ],
    `${counts[i]} × ${eighth(used[i])} = ${eighth(n)} ${p.unit}.`,
    mixed,
    plotVisual(p, used, counts),
  );
};

const plotTotal: Maker = (d) => {
  const { p, used, counts, values } = plotData(d);
  const sum = values.reduce((a, b) => a + b, 0);
  return fracChoice(
    `What is the total ${p.of} in all the ${p.what}?`,
    [sum, 8],
    [
      [sum + 2, 8],
      [sum - 2, 8],
      [used.reduce((a, b) => a + b, 0), 8],
      [sum, 4],
    ],
    `Add each mark times its number of X's: ${used.map((m, i) => `${counts[i]} × ${eighth(m)}`).join(" + ")} = ${eighth(sum)}.`,
    mixed,
    plotVisual(p, used, counts),
  );
};

const plotShare: Maker = (d) => {
  for (;;) {
    const { p, used, counts, values } = plotData(d);
    const sum = values.reduce((a, b) => a + b, 0);
    const n = values.length;
    if (n < 2) continue;
    return fracChoice(
      `If the ${p.of} in all the ${p.what} were shared out equally, how much would each of the ${n} ${p.what} have?`,
      [sum, 8 * n],
      [
        [sum, 8],
        [sum, 8 * (n + 1)],
        [sum + n, 8 * n],
        [n, sum],
      ],
      `The total is ${eighth(sum)} ${p.unit}. Share it among ${n}: ${eighth(sum)} ÷ ${n} = ${mixed(sum, 8 * n)}.`,
      mixed,
      plotVisual(p, used, counts),
    );
  }
};

const plotRange: Maker = (d) => {
  const { p, used, counts } = plotData(d);
  const diff = used[used.length - 1] - used[0];
  return fracChoice(
    `How much more ${p.of} is in the fullest of the ${p.what} than in the least full?`,
    [diff, 8],
    [
      [used[used.length - 1], 8],
      [diff + 1, 8],
      [used[used.length - 1] + used[0], 8],
      [diff, 16],
    ],
    `Greatest ${eighth(used[used.length - 1])}, least ${eighth(used[0])}. The difference is ${eighth(diff)} ${p.unit}.`,
    mixed,
    plotVisual(p, used, counts),
  );
};

const plotMake: Maker = () => {
  const p = pick(PLOTS);
  const vals = shuffle([1, 2, 2, 4, 4, 4, 6, 3].slice(0, randInt(6, 8)));
  const target = pick([...new Set(vals)]);
  const count = vals.filter((v) => v === target).length;
  return num(
    `${someone()} measured the ${p.of} in some ${p.what}: ${vals.map(eighth).join(", ")} ${p.unit}. To make a line plot, how many X's go above ${eighth(target)}?`,
    count,
    `Count every measurement equal to ${eighth(target)}. Remember ${eighth(2)} = 2/8 and ${eighth(4)} = 4/8.`,
    { min: 1, max: 8 },
  );
};

export const LINE_PLOTS_5 = mathUnit({
  id: "ca-g5-line-plots",
  title: "Fraction Line Plots",
  emoji: "📊",
  blurb: "Plot fractions and share them out",
  parentNote:
    "Making and reading line plots of measurements in halves, fourths and eighths, then adding, comparing and sharing the amounts equally, for example how much water each beaker would hold if the total were shared out.",
  codes: "5.MD.2",
  text: "making line plots of measurements in fractions of a unit and solving problems with the data",
  makers: [plotHowMany, plotMarkTotal, plotTotal, plotShare, plotRange, plotMake],
});

export const MATH_5 = [PRIME_FACTORS_5, LINE_PLOTS_5];
