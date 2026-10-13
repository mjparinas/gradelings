import { pick, randInt, shuffle } from "../../random";
import { eq, num, pickOne, typed, type Maker } from "../../washington/units/math-kit";
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
