import { pick, randInt, sample } from "../../random";
import type { Unit, Visual } from "../../types";
import { type Maker, eq, num, pickOne, sp, sup, typed } from "../../washington/units/math-kit";
import type { Q } from "../own";
import { bank, mathUnit } from "./math-kit";

// New York's own Grade 6 math units (`ny-` ids): dividing multi-digit numbers with the standard algorithm (NY-6.NS.2),
// area and volume models of perfect squares and cubes (NY-6.G.5), and describing a data distribution by its center,
// spread and shape, starting from statistical questions (NY-6.SP.1a, 6.SP.2, 6.SP.3).

// ---------- Long division (NY-6.NS.2) ----------

/** A dividend that divides evenly: divisor × quotient. */
function exact(level: number): [dividend: number, divisor: number, quotient: number] {
  const divisor = level === 1 ? randInt(3, 9) : randInt(12, level === 2 ? 35 : 75);
  const quotient = level === 1 ? randInt(102, 999) : randInt(level === 2 ? 21 : 105, level === 2 ? 299 : 899);
  return [divisor * quotient, divisor, quotient];
}

/** Divide with the standard algorithm. */
const divide: Maker = (d) => {
  const [n, by, q] = exact(d);
  const hint = `Divide from the left: how many ${by}s fit in the first digits? Multiply, subtract, bring down the next digit, and repeat. Check: ${q} × ${by} should be ${sp(n)}.`;
  if (d === 3) return typed("Divide.", q, hint, { visual: eq(`${sp(n)} ÷ ${by} = ?`) });
  return num("Divide.", q, hint, { min: 1, extra: [q + 10, q - 10, q * 10, Math.floor(q / 10)], label: sp, visual: eq(`${sp(n)} ÷ ${by} = ?`) });
};

const SHARE = [
  (n: number, by: number) => `A school orders ${sp(n)} pencils in boxes of ${by}. How many boxes?`,
  (n: number, by: number) => `${sp(n)} chairs are set out in ${by} equal rows. How many chairs are in each row?`,
  (n: number, by: number) => `A farm packs ${sp(n)} eggs into cartons of ${by}. How many cartons?`,
  (n: number, by: number) => `A ${sp(n)}-page book series is split into ${by} books with the same number of pages. How many pages in each?`,
];

/** A division word problem with no remainder. */
const divideStory: Maker = (d) => {
  const [n, by, q] = exact(d === 1 ? 2 : d);
  return num(pick(SHARE)(n, by), q, `Divide ${sp(n)} by ${by}.`, { min: 1, extra: [q + 1, q - 1, q + 10], label: sp });
};

/** What the remainder means in a story. */
const remainderStory: Maker = () => {
  const by = pick([12, 15, 24, 28, 32, 45, 48]);
  const q = randInt(15, 60);
  const r = randInt(1, by - 1);
  const n = by * q + r;
  if (pick([true, false])) {
    return num(`${sp(n)} students go on a trip. Each bus holds ${by} students. How many buses are needed?`, q + 1, `${sp(n)} ÷ ${by} = ${q} R ${r}. The ${r} students left over need one more bus.`, { min: 1, extra: [q, r, q + 2], label: sp });
  }
  return num(`${sp(n)} cards are packed in boxes of ${by}. How many boxes can be filled?`, q, `${sp(n)} ÷ ${by} = ${q} R ${r}. Only full boxes count, so drop the remainder.`, { min: 1, extra: [q + 1, r, q - 1], label: sp });
};

/** Find the mistake or the next step in long division. */
const nextStep: Maker = () => {
  const by = randInt(12, 48);
  const q = randInt(21, 99);
  const n = by * q;
  const first = Math.floor(n / 10 / by);
  const used = first * by;
  const rest = Math.floor(n / 10) - used;
  return pickOne(
    `To divide ${sp(n)} by ${by}, Mia finds ${by} goes into ${Math.floor(n / 10)} ${first} times. ${first} × ${by} = ${used}. What does she do next?`,
    `subtract to get ${rest}, then bring down the ${n % 10}`,
    [`add ${used} to ${Math.floor(n / 10)}`, `bring down the ${n % 10} without subtracting`, `write ${used} in the answer`],
    "Divide, multiply, subtract, bring down. Then divide again.",
  );
};

// ---------- Perfect squares and cubes (NY-6.G.5) ----------

/** How many unit squares or cubes build a square or cube. */
const buildModel: Maker = (d) => {
  if (pick([true, false])) {
    const s = randInt(2, d === 1 ? 9 : 15);
    return num(`A square is built from unit squares, ${s} on each side. How many unit squares does it use?`, s * s, `Rows times columns: ${s} × ${s} = ${s}${sup(2)}.`, { min: 1, extra: [4 * s, 2 * s, s * s + s], visual: s <= 12 ? { type: "array", rows: s, cols: s, emoji: "🟦" } : undefined });
  }
  const e = randInt(2, d === 1 ? 5 : 10);
  return num(`A cube is built from unit cubes, ${e} on each edge. How many unit cubes does it use?`, e ** 3, `${e} × ${e} unit cubes in each layer, and ${e} layers: ${e} × ${e} × ${e} = ${e}${sup(3)}.`, { min: 1, extra: [e * e, 6 * e * e, 3 * e, 12 * e] });
};

/** Find the side or edge from the area or volume. */
const sideFrom: Maker = (d) => {
  if (pick([true, false])) {
    const s = randInt(2, 15);
    const prompt = `A square made of ${s * s} unit squares has the same number on each side. How many on each side?`;
    if (d === 3) return typed(prompt, s, `Which number times itself is ${s * s}?`);
    return num(prompt, s, `Which number times itself is ${s * s}?`, { min: 1, extra: [s * s / 2, s * 2].filter(Number.isInteger) });
  }
  const e = randInt(2, 10);
  return num(`A cube made of ${e ** 3} unit cubes has the same number on each edge. How many on each edge?`, e, `Which number times itself times itself is ${e ** 3}?`, { min: 1, extra: [e * e, e + 2].filter((x) => x !== e) });
};

/** Which number is a perfect square, or a perfect cube. */
const whichPerfect: Maker = () => {
  if (pick([true, false])) {
    const s = randInt(3, 12);
    const others = sample([s * s + 1, s * s - 1, s * (s + 1), 2 * s * s, s * s + s - 1].filter((x) => !Number.isInteger(Math.sqrt(x))), 3);
    return pickOne("Which number of unit squares can make a square with no pieces left over?", sp(s * s), others.map(sp), "A perfect square is a number times itself: it fills a square grid.");
  }
  const e = randInt(2, 6);
  const others = sample([e ** 3 + 1, e * e * (e + 1), 3 * e * e, e ** 3 - e].filter((x) => !Number.isInteger(Math.round(Math.cbrt(x) * 1e6) / 1e6)), 3);
  return pickOne("Which number of unit cubes can make a cube with no pieces left over?", sp(e ** 3), others.map(sp), "A perfect cube is a number times itself times itself: it fills a cube.");
};

const POWERS: Q[] = [
  ["Why is 25 called a perfect square?", "25 unit squares make a 5 by 5 square", ["25 is an odd number", "25 ends in 5", "25 unit squares make a 25 by 1 line"], "A perfect square fills a square: n × n."],
  ["Why is 8 called a perfect cube?", "8 unit cubes make a 2 by 2 by 2 cube", ["8 is even", "8 unit cubes make a 2 by 4 rectangle", "8 = 4 + 4"], "A perfect cube fills a cube: n × n × n."],
  ["What does 6² mean in a model?", "a square with 6 unit squares on each side", ["6 squares in a row", "a cube with 6 on each edge", "2 squares with 6 units each"], "The exponent 2 means a square: 6 × 6."],
  ["What does 4³ mean in a model?", "a cube with 4 unit cubes on each edge", ["4 cubes in a row", "a square with 4 on each side", "3 cubes of 4"], "The exponent 3 means a cube: 4 × 4 × 4."],
  ["Why is the exponent 2 read as “squared”?", "s × s is the area of a square with side s", ["it means times 2", "a square has 2 sides", "it doubles the number"], "Area of a square = side × side = side²."],
  ["Why is the exponent 3 read as “cubed”?", "e × e × e is the volume of a cube with edge e", ["it means times 3", "a cube has 3 faces", "it triples the number"], "Volume of a cube = edge × edge × edge = edge³."],
  ["Is 12 a perfect square?", "No: no whole number times itself is 12", ["Yes: 3 × 4 = 12", "Yes: 6 × 2 = 12", "Yes: 12 is even"], "3 × 3 = 9 and 4 × 4 = 16, so 12 is between perfect squares."],
  ["A cube has edges of 3 units. Which is its volume?", "27 cubic units", ["9 cubic units", "18 cubic units", "54 cubic units"], "3 × 3 × 3 = 27.", true],
];

// ---------- Distributions: center, spread and shape (NY-6.SP.2, 6.SP.3) ----------

const CONTEXTS = [
  ["minutes", "Minutes spent reading"],
  ["points", "Points scored in a game"],
  ["hours", "Hours of sleep"],
  ["pets", "Pets per family"],
  ["miles", "Miles walked in a week"],
] as const;

/** A small data set with a whole-number median and mean, sorted. */
function dataSet(): number[] {
  for (;;) {
    const xs = Array.from({ length: pick([5, 7]) }, () => randInt(1, 15)).sort((a, b) => a - b);
    const sum = xs.reduce((a, b) => a + b, 0);
    if (sum % xs.length === 0 && new Set(xs).size >= 4) return xs;
  }
}

/** Compute the median, mean or range and say what kind of measure it is. */
const measure: Maker = (d) => {
  const xs = dataSet();
  const [unit, title] = pick(CONTEXTS);
  const visual: Visual = eq(`${title} (${unit}): ${xs.join(", ")}`);
  const median = xs[(xs.length - 1) / 2];
  const mean = xs.reduce((a, b) => a + b, 0) / xs.length;
  const range = xs[xs.length - 1] - xs[0];
  const kind = pick(d === 1 ? (["median", "range"] as const) : (["median", "mean", "range"] as const));
  if (kind === "median") return num("Find the median, a measure of center.", median, "Put the values in order and find the middle one.", { min: 0, extra: [mean, range, xs[0]], visual });
  if (kind === "mean") return num("Find the mean, a measure of center.", mean, `Add the values and divide by ${xs.length}.`, { min: 0, extra: [median, range, mean + 1], visual });
  return num("Find the range, a measure of variation.", range, "Subtract the least value from the greatest.", { min: 0, extra: [median, mean, xs[xs.length - 1]], visual });
};

/** Which number describes what. */
const whichKind: Maker = () => {
  const center = pick(["the mean", "the median"]);
  const spreadM = pick(["the range", "the interquartile range (IQR)", "the mean absolute deviation (MAD)"]);
  if (pick([true, false])) return pickOne("Which number tells a typical value of the data in one number?", center, [spreadM, "the number of values", "the greatest value"], "A measure of center summarizes all the values with one typical number.");
  return pickOne("Which number tells how spread out the data is in one number?", spreadM, [center, "the number of values", "the least value"], "A measure of variation tells how much the values vary.");
};

/** Two classes with the same center but a different spread, or the reverse. */
const compare: Maker = () => {
  const m = randInt(5, 12);
  const r1 = randInt(2, 4);
  const r2 = r1 + randInt(4, 8);
  if (pick([true, false])) {
    return pickOne(
      `Two classes both have a mean of ${m} books read. Class A has a range of ${r1}; Class B has a range of ${r2}. What does this tell you?`,
      "Both are typically the same, but Class B's values are more spread out",
      ["Class B read more books in all", "Class A's values are more spread out", "The classes read exactly the same numbers of books"],
      "Same center means the same typical value. A bigger range means more variation.",
    );
  }
  const m2 = m + randInt(3, 6);
  return pickOne(
    `Team A's median score is ${m}; Team B's is ${m2}. Both have a range of ${r1}. What does this tell you?`,
    "Team B typically scores higher, and both teams vary about the same",
    ["Team B's scores vary more", "Both teams typically score the same", "Team A typically scores higher"],
    "The median is a measure of center; the range is a measure of variation.",
  );
};

/** Which question is statistical: one that expects answers to vary (NY-6.SP.1a). */
const STAT_QUESTIONS: [statistical: string, not: string][] = [
  ["How many hours do students in our class sleep on school nights?", "How many hours did Leo sleep last night?"],
  ["How tall are the sixth graders at our school?", "How tall is the school's front door?"],
  ["How many books did each student in our grade read this summer?", "How many books are on the top shelf of the library?"],
  ["How long does it take students in our class to get to school?", "What time does school start?"],
  ["How many pets do families on our street have?", "How many legs does a dog have?"],
  ["What were the daily high temperatures in our town last month?", "What was the high temperature in our town yesterday?"],
  ["How many minutes do players on our team practice each week?", "How many players are on a soccer team on the field?"],
];

const statQuestion: Maker = () => {
  const i = randInt(0, STAT_QUESTIONS.length - 1);
  const [yes, no] = STAT_QUESTIONS[i];
  const others = sample(STAT_QUESTIONS.filter((_, j) => j !== i), 2).map(([, n]) => n);
  if (pick([true, false])) return pickOne("Which is a statistical question?", yes, [no, ...others], "A statistical question expects many different answers, so the data varies.");
  return pickOne(`Why is “${yes}” a statistical question?`, "the answers are expected to vary", ["it has one exact answer", "it asks about one person or thing", "it uses a number"], "A statistical question anticipates variability in the data and accounts for it.");
};

const SHAPE: Q[] = [
  ["What three things describe a distribution of data?", "its center, its spread and its overall shape", ["its first value, last value and title", "only its greatest value", "the number of questions asked"], "A distribution is described by where it is centered, how spread out it is, and its shape."],
  ["A dot plot has most dots between 3 and 6 and one dot at 15. How would you describe it?", "clustered from 3 to 6, with an outlier at 15", ["evenly spread from 3 to 15", "centered at 15", "no pattern at all"], "Look for clusters, gaps and values far from the rest."],
  ["A dot plot looks the same on both sides of its middle. What is its shape?", "symmetric", ["skewed", "has an outlier", "has a gap"], "Symmetric means the two halves mirror each other."],
  ["Why does a statistical question give data with variation?", "the answers are expected to differ", ["it has only one answer", "it asks about one person", "the data is always the same"], "“How tall are the students in our class?” has many different answers."],
  ["A data set has an outlier far above the rest. Which measure of center is less affected?", "the median", ["the mean", "the range", "the greatest value"], "The median is the middle value, so one extreme value moves it little.", true],
  ["Why can two data sets with the same mean look very different?", "their spread or shape can be different", ["the mean tells everything about data", "the mean is always the middle value", "they must have the same values"], "One number for center does not tell how the values vary.", true],
  ["Most dots are piled on the left of a dot plot, with a long tail to the right. What is its shape?", "skewed right, with a tail toward the greater values", ["symmetric", "skewed left, with a tail toward the lesser values", "flat"], "The tail points to the side the shape is skewed toward.", true],
  ["What does a range of 0 tell you about a data set?", "every value is the same", ["the mean is 0", "there is no data", "the median is 0"], "Range = greatest − least. It is 0 only when they are equal."],
];

export const UNITS: Unit[] = [
  mathUnit({
    id: "ny-g6-long-division",
    title: "Long Division",
    emoji: "➗",
    blurb: "Divide big numbers step by step",
    parentNote: "Dividing multi-digit numbers with the standard algorithm (divide, multiply, subtract, bring down), including two-digit divisors and word problems where the remainder matters.",
    codes: "NY-6.NS.2",
    text: "fluently dividing multi-digit numbers with the standard algorithm",
    makers: [divide, divide, divide, divideStory, remainderStory, nextStep],
  }),
  mathUnit({
    id: "ny-g6-squares-cubes",
    title: "Perfect Squares & Cubes",
    emoji: "🧊",
    blurb: "Build squares and cubes",
    parentNote: "Using unit squares and unit cubes to see why 36 is a perfect square (a 6 by 6 square) and 27 is a perfect cube (a 3 by 3 by 3 cube), and what the exponents 2 and 3 mean.",
    codes: "NY-6.G.5",
    text: "using area and volume models to explain perfect squares and perfect cubes",
    makers: [buildModel, buildModel, sideFrom, whichPerfect, bank(POWERS), bank(POWERS)],
  }),
  mathUnit({
    id: "ny-g6-data-distributions",
    title: "Center, Spread & Shape",
    emoji: "📈",
    blurb: "Describe a set of data",
    parentNote: "Telling statistical questions (answers that vary) from questions with one answer, and describing data by its center (mean, median), its spread (range, IQR) and its shape (clusters, outliers, symmetric or skewed), and knowing that each measure sums up the data in one number.",
    codes: "NY-6.SP.1a; NY-6.SP.2; NY-6.SP.3",
    text: "recognizing statistical questions, describing a data distribution by its center, spread and overall shape, and telling measures of center from measures of variation",
    makers: [measure, measure, whichKind, compare, statQuestion, bank(SHAPE), bank(SHAPE)],
  }),
];

