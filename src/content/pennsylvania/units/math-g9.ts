import { pick, randInt, shuffle } from "../../random";
import type { Unit } from "../../types";
import { frac, fracChoice, mathUnit, num, pickOne, type Maker } from "./math-kit";

// Pennsylvania's own Algebra I units (`pa-` ids): polynomial identities (CC.2.2.HS.D.5) and the rules of probability
// for random processes and compound events (CC.2.4.HS.B.4, B.6, B.7), which no unit from another framework practises.

// ---------- Polynomial identities ----------

/** "x² + 6x + 9" from the middle and last term. */
const trinomial = (b: number, c: number) => `x² ${b < 0 ? "−" : "+"} ${Math.abs(b)}x + ${c}`;
const sq = (a: number) => (a < 0 ? `(x − ${-a})²` : `(x + ${a})²`);

const expandSquare: Maker = (d) => {
  const a = randInt(2, d === 1 ? 5 : 9) * (d === 3 && randInt(0, 1) ? -1 : 1);
  const right = trinomial(2 * a, a * a);
  const wrong = [`x² ${a < 0 ? "−" : "+"} ${a * a}`, trinomial(a, a * a), trinomial(2 * a, 2 * Math.abs(a)), trinomial(-2 * a, a * a)];
  return pickOne(`Which is ${sq(a)} written out?`, right, wrong, "Use (x + a)² = x² + 2ax + a². The middle term is twice a times x.");
};

const expandDifference: Maker = (d) => {
  const a = randInt(2, d === 1 ? 6 : 12);
  return pickOne(
    `Multiply out (x + ${a})(x − ${a}).`,
    `x² − ${a * a}`,
    [`x² + ${a * a}`, `x² − ${2 * a}x`, `x² − ${a}`, `x² − ${2 * a}x − ${a * a}`],
    "Use (x + a)(x − a) = x² − a². The middle terms cancel.",
  );
};

const factorDifference: Maker = (d) => {
  const a = randInt(2, d === 1 ? 6 : 12);
  return pickOne(
    `Which is the factored form of x² − ${a * a}?`,
    `(x + ${a})(x − ${a})`,
    [`(x − ${a})²`, `(x + ${a})²`, `(x − ${a * a})(x + 1)`],
    "A difference of two squares factors as (x + a)(x − a).",
  );
};

const factorPerfectSquare: Maker = (d) => {
  const a = randInt(2, d === 1 ? 6 : 10);
  const minus = d > 1 && randInt(0, 1) === 1;
  const right = minus ? `(x − ${a})²` : `(x + ${a})²`;
  return pickOne(
    `Which is the factored form of ${trinomial(minus ? -2 * a : 2 * a, a * a)}?`,
    right,
    [minus ? `(x + ${a})²` : `(x − ${a})²`, `(x ${minus ? "−" : "+"} ${a * a})²`, `(x + ${a})(x − ${a})`],
    "Check: twice the number times x must give the middle term, and the number squared must give the last term.",
  );
};

const mentalDifference: Maker = (d) => {
  const base = pick(d === 1 ? [10, 20, 30] : [40, 50, 60, 70, 80]);
  const k = randInt(1, d === 1 ? 3 : 6);
  const prod = (base + k) * (base - k);
  return num(`Use (a + b)(a − b) = a² − b² to find ${base + k} × ${base - k} in your head.`, prod, `${base + k} × ${base - k} = ${base}² − ${k}² = ${base * base} − ${k * k}.`, {
    step: k,
    min: 1,
    extra: [base * base, base * base + k * k, base * base - k],
  });
};

const mentalSquare: Maker = (d) => {
  const base = pick(d === 1 ? [10, 20, 30] : [40, 50, 60, 70, 80]);
  const k = randInt(1, d === 1 ? 3 : 5);
  const n = base + k;
  return num(`Use (a + b)² = a² + 2ab + b² to find ${n}² in your head. Think of ${n} as ${base} + ${k}.`, n * n, `${base}² + 2 × ${base} × ${k} + ${k}² = ${base * base} + ${2 * base * k} + ${k * k}.`, {
    step: k * 2,
    min: 1,
    extra: [base * base + k * k, base * base + base * k + k * k],
  });
};

const POLY_IDENTITIES = mathUnit({
  id: "pa-g9-polynomial-identities",
  title: "Polynomial Identities",
  emoji: "🧩",
  blurb: "Special products and shortcuts",
  parentNote:
    "Practises PA Core CC.2.2.HS.D.5: using polynomial identities, such as (x + a)² = x² + 2ax + a² and (x + a)(x − a) = x² − a², to multiply, to factor and to do arithmetic in your head. Ask your child to find 49 × 51 without a calculator.",
  codes: "CC.2.2.HS.D.5",
  text: "using the identities for the square of a binomial and the difference of two squares to expand, factor and compute",
  makers: [expandSquare, expandDifference, factorDifference, factorPerfectSquare, mentalDifference, mentalSquare],
});

// ---------- Probability rules ----------


const independentBoth: Maker = (d) => {
  const faces = d === 1 ? 6 : pick([6, 8]);
  const target = randInt(1, faces);
  return fracChoice(
    `A fair coin is flipped and a fair ${faces}-sided die is rolled. What is the probability of heads and a ${target}?`,
    [1, 2 * faces],
    [[1, 2 + faces], [1, faces], [1, 2], [2, faces + 2]],
    "The flip and the roll do not affect each other. Multiply: 1/2 × 1/" + faces + ".",
  );
};

const eitherOr: Maker = (d) => {
  const n = d === 1 ? 6 : pick([8, 10, 12]);
  const a = randInt(1, 2);
  const b = randInt(1, 2);
  return fracChoice(
    `A fair ${n}-sided die is rolled. What is the probability of getting ${a === 1 ? "a 1" : "a 1 or a 2"} or ${b === 1 ? "a 3" : "a 3 or a 4"}?`,
    [a + b, n],
    [[a * b, n], [a + b, n * 2], [(a + b) * 2, n], [a + b + 1, n]],
    `These outcomes cannot happen together, so add their probabilities: ${a}/${n} + ${b}/${n}.`,
  );
};

const complement: Maker = (d) => {
  const den = pick(d === 1 ? [4, 5, 10] : [6, 8, 12, 20]);
  const k = randInt(1, den - 1);
  return fracChoice(
    `The probability that it rains tomorrow is ${frac(k, den)}. What is the probability that it does not rain?`,
    [den - k, den],
    [[k, den], [den - k, den + 1], [1, den], [den - k + 1, den]],
    `"Rain" and "no rain" together make 1. Compute 1 − ${frac(k, den)}.`,
  );
};

const conditionalTable: Maker = (d) => {
  const a = randInt(2, 6) * (d === 1 ? 2 : 3);
  const b = randInt(2, 6) * 2;
  const c = randInt(2, 6) * (d === 1 ? 2 : 3);
  const e = randInt(2, 6) * 2;
  const [topic, yes, no, phrase] = pick([
    ["sport", "Plays a sport", "No sport", "plays a sport"],
    ["pets", "Has a pet", "No pet", "has a pet"],
    ["how they get to school", "Walks", "Rides the bus", "walks to school"],
  ] as const);
  const right: [number, number] = [a, a + b];
  const wrong = ([[a, a + b + c + e], [a, a + c], [b, a + b], [a + c, a + b + c + e]] as [number, number][]).filter((w) => w[0] / w[1] !== a / (a + b));
  return fracChoice(
    `A survey sorted students by grade and by ${topic}. A student from Grade 9 is picked. What is the probability the student ${phrase}?`,
    right,
    wrong,
    "Only look at the Grade 9 row. Divide the Grade 9 students in that group by all the Grade 9 students.",
    frac,
    { type: "table", title: "Survey results", headers: ["Grade", yes, no], rows: [["Grade 9", a, b], ["Grade 10", c, e]] },
  );
};

const streak: Maker = (d) => {
  const n = randInt(3, d === 1 ? 4 : 6);
  return pickOne(
    `A fair coin landed on heads ${n} times in a row. What is the probability that the next flip is heads?`,
    "1/2",
    [`1/${2 ** (n + 1)}`, "0", `1/${n + 1}`],
    "Every flip is a new random event. Past flips do not change the next one.",
  );
};

const independence: Maker = () => {
  const a = pick([2, 3, 4, 5]);
  const b = pick([2, 3, 4, 5]);
  const independent = randInt(0, 1) === 1;
  const joint = independent ? frac(1, a * b) : frac(2, a * b);
  const yes = "Yes, P(A and B) = P(A) × P(B)";
  const no = "No, P(A and B) is not P(A) × P(B)";
  return pickOne(
    `P(A) = 1/${a}, P(B) = 1/${b} and P(A and B) = ${joint}. Are A and B independent?`,
    independent ? yes : no,
    [independent ? no : yes],
    `Events are independent when P(A and B) equals P(A) × P(B). Here 1/${a} × 1/${b} = ${frac(1, a * b)}.`,
  );
};

const simulate: Maker = () => {
  const target = pick([
    ["1/3", "a spinner with 3 equal sections, 1 marked", ["a coin flip", "a spinner with 4 equal sections, 1 marked", "a six-sided die with 1 face marked"]],
    ["1/4", "a spinner with 4 equal sections, 1 marked", ["a coin flip", "a spinner with 3 equal sections, 1 marked", "a six-sided die with 1 face marked"]],
    ["1/6", "a six-sided die with 1 face marked", ["a coin flip", "a spinner with 4 equal sections, 1 marked", "a spinner with 3 equal sections, 1 marked"]],
    ["1/2", "a coin flip", ["a six-sided die with 1 face marked", "a spinner with 4 equal sections, 1 marked", "a spinner with 3 equal sections, 1 marked"]],
  ] as const);
  return pickOne(
    `You want to simulate a random event whose probability is ${target[0]}. Which tool matches?`,
    target[1],
    shuffle([...target[2]]),
    "Choose the tool where the chance of the marked result is the same as the probability you want.",
  );
};

const PROBABILITY = mathUnit({
  id: "pa-g9-probability-rules",
  title: "Rules of Probability",
  emoji: "🎲",
  blurb: "Independent and compound events",
  parentNote:
    "Practises PA Core CC.2.4.HS.B.4, B.6 and B.7: random processes and simulations, independent events, conditional probability from a two-way table, and the addition, multiplication and complement rules. Play a game with dice or coins and ask your child to predict the chance of two things happening together.",
  codes: "CC.2.4.HS.B.4; CC.2.4.HS.B.6; CC.2.4.HS.B.7",
  text: "random processes, independence and conditional probability, and the rules for the probability of compound events",
  makers: [independentBoth, eitherOr, complement, conditionalTable, streak, independence, simulate],
});


export const UNITS: Unit[] = [POLY_IDENTITIES, PROBABILITY];
/** Put the own units before the planned ones. */
export const FIRST = false;
