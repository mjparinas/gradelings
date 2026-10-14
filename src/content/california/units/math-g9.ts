import { pick, randInt, shuffle } from "../../random";
import { eq, fmt, num, pickOne, someone, typed, type Maker } from "../../washington/units/math-kit";
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

// ---------- Rational exponents and radicals (N-RN.1, N-RN.2) ----------

const ROOTS: { base: number; num: number; den: number; value: number }[] = [
  { base: 8, num: 1, den: 3, value: 2 },
  { base: 27, num: 1, den: 3, value: 3 },
  { base: 64, num: 1, den: 3, value: 4 },
  { base: 16, num: 1, den: 2, value: 4 },
  { base: 49, num: 1, den: 2, value: 7 },
  { base: 16, num: 3, den: 4, value: 8 },
  { base: 32, num: 2, den: 5, value: 4 },
  { base: 9, num: 3, den: 2, value: 27 },
  { base: 4, num: 5, den: 2, value: 32 },
  { base: 8, num: 2, den: 3, value: 4 },
  { base: 81, num: 3, den: 4, value: 27 },
  { base: 25, num: 3, den: 2, value: 125 },
];
const power = (b: number | string, n: number, d: number) => `${b}^(${n}/${d})`;

const rnEvaluate: Maker = (d) => {
  const r = pick(d === 1 ? ROOTS.filter((x) => x.num === 1) : ROOTS);
  const prompt = `What is ${power(r.base, r.num, r.den)}?`;
  const root = Math.round(Math.pow(r.base, 1 / r.den));
  const hint = `The denominator ${r.den} means a root: the ${r.den === 2 ? "square" : r.den === 3 ? "cube" : `${r.den}th`} root of ${r.base} is ${root}. Then raise it to the power ${r.num}: ${root}^${r.num} = ${r.value}.`;
  if (d === 3) return typed(prompt, r.value, hint);
  return num(prompt, r.value, hint, { min: 1, extra: [Math.round((r.base * r.num) / r.den), r.base / r.den, root].filter((x) => Number.isInteger(x)) });
};

const RADICAL_FORMS: { exp: string; right: string; wrong: string[] }[] = [
  { exp: "x^(1/2)", right: "√x", wrong: ["x/2", "x²", "∛x"] },
  { exp: "x^(1/3)", right: "∛x", wrong: ["x/3", "√x", "x³"] },
  { exp: "x^(2/3)", right: "∛(x²)", wrong: ["√(x³)", "2x/3", "x²/3"] },
  { exp: "x^(3/2)", right: "√(x³)", wrong: ["∛(x²)", "3x/2", "x³/2"] },
  { exp: "5^(1/2)", right: "√5", wrong: ["5/2", "2.5", "∛5"] },
  { exp: "7^(1/3)", right: "∛7", wrong: ["7/3", "√7", "7³"] },
];

const rnRadicalForm: Maker = () => {
  const f = pick(RADICAL_FORMS);
  return pickOne(`Which is the same as ${f.exp}?`, f.right, f.wrong, "x^(m/n) is the nth root of x to the mth power. A denominator of 2 is a square root, 3 a cube root.");
};

const rnWhy: Maker = () => {
  const b = pick([2, 3, 5, 6, 7, 10]);
  const n = pick([2, 3]);
  const rootName = n === 2 ? "square root" : "cube root";
  return pickOne(
    `Using the power rule, (${power(b, 1, n)})^${n} = ${b}^((1/${n}) × ${n}) = ${b}^1 = ${b}. So what must ${power(b, 1, n)} be?`,
    `The ${rootName} of ${b}`,
    [`${b} ÷ ${n}`, `${b} × ${n}`, `${b} to the power ${n}`],
    `A number that gives ${b} when raised to the power ${n} is the ${rootName} of ${b}. That is why exponent 1/${n} means the ${rootName}.`,
  );
};

const SIMPLIFY: [number, number, number][] = [
  [50, 5, 2],
  [12, 2, 3],
  [72, 6, 2],
  [48, 4, 3],
  [45, 3, 5],
  [18, 3, 2],
  [75, 5, 3],
  [98, 7, 2],
  [20, 2, 5],
  [27, 3, 3],
  [32, 4, 2],
  [63, 3, 7],
];

const rnSimplify: Maker = () => {
  const [n, out, inn] = pick(SIMPLIFY);
  return pickOne(
    `Simplify √${n}.`,
    `${out}√${inn}`,
    [`${inn}√${out}`, `${out * out}√${inn}`, `${out}√${inn * out}`, `${n / 2}`].filter((w) => w !== `${out}√${inn}`),
    `Find a perfect square factor: ${n} = ${out * out} × ${inn}. √${out * out} = ${out}, so √${n} = ${out}√${inn}.`,
  );
};

const rnProduct: Maker = (d) => {
  const [a, k] = pick([
    [2, 2],
    [3, 2],
    [5, 2],
    [2, 3],
    [3, 3],
    [2, 5],
    [6, 2],
  ]);
  const b = a * k * k;
  const prompt = `What is √${a} × √${b}?`;
  const hint = `√${a} × √${b} = √(${a} × ${b}) = √${a * b} = ${a * k}.`;
  if (d === 3) return typed(prompt, a * k, hint);
  return num(prompt, a * k, hint, { min: 1, extra: [a * b, a + b, k] });
};

const EXP_RULES: { q: string; right: string; wrong: string[] }[] = [
  { q: "x^(1/2) · x^(1/2)", right: "x", wrong: ["x^(1/4)", "2x", "x²"] },
  { q: "(x^(1/3))^6", right: "x²", wrong: ["x^(1/18)", "x^(19/3)", "x⁶"] },
  { q: "x^(2/3) · x^(1/3)", right: "x", wrong: ["x^(2/9)", "x³", "x^(1/3)"] },
  { q: "(x⁴)^(1/2)", right: "x²", wrong: ["x^(9/2)", "x⁸", "x^(1/8)"] },
  { q: "x^(3/4) ÷ x^(1/4)", right: "x^(1/2)", wrong: ["x³", "x^(3/16)", "x"] },
];

const rnRules: Maker = () => {
  const r = pick(EXP_RULES);
  return pickOne(`Simplify ${r.q}.`, r.right, r.wrong, "The exponent rules work for fractions too: add exponents when multiplying, multiply them for a power of a power.");
};

export const RADICALS_9 = mathUnit({
  id: "ca-g9-radicals",
  title: "Roots & Rational Exponents",
  emoji: "🔢",
  blurb: "8^(1/3) is the cube root of 8",
  parentNote:
    "Understanding why an exponent like 1/3 means a cube root, evaluating powers such as 16^(3/4), and rewriting and simplifying radicals, for example √50 = 5√2.",
  codes: "N-RN.1; N-RN.2",
  text: "explaining rational exponents by extending the properties of exponents, and rewriting expressions with radicals and rational exponents",
  makers: [rnEvaluate, rnRadicalForm, rnWhy, rnSimplify, rnProduct, rnRules],
});

// ---------- Units, quantities and accuracy (N-Q.1, N-Q.2, N-Q.3) ----------

const CONVERSIONS: { prompt: string; answer: number; hint: string }[] = [
  { prompt: "How many minutes are in 2.5 hours?", answer: 150, hint: "2.5 hours × 60 minutes per hour = 150 minutes." },
  { prompt: "A snail moves 3 feet per minute. How many inches per minute is that?", answer: 36, hint: "3 feet × 12 inches per foot = 36 inches." },
  { prompt: "A car travels 60 miles per hour. How many miles per minute is that?", answer: 1, hint: "60 miles ÷ 60 minutes = 1 mile per minute." },
  { prompt: "A faucet drips 2 cups per hour. How many cups in a day?", answer: 48, hint: "2 cups per hour × 24 hours = 48 cups." },
  { prompt: "A runner goes 400 meters in 80 seconds. What is the speed in meters per second?", answer: 5, hint: "400 meters ÷ 80 seconds = 5 meters per second." },
  { prompt: "A printer prints 30 pages per minute. How many pages in 1 hour?", answer: 1800, hint: "30 pages per minute × 60 minutes = 1800 pages." },
  { prompt: "A tank fills at 4 gallons per minute. How many minutes to fill 120 gallons?", answer: 30, hint: "120 gallons ÷ 4 gallons per minute = 30 minutes." },
  { prompt: "A board is 3 yards long. How many feet is that?", answer: 9, hint: "3 yards × 3 feet per yard = 9 feet." },
  { prompt: "Fabric costs $6 per yard. What do 15 feet cost, in dollars?", answer: 30, hint: "15 feet = 5 yards. 5 yards × $6 per yard = $30." },
];

const nqConvert: Maker = (d) => {
  const c = pick(CONVERSIONS);
  if (d === 3) return typed(c.prompt, c.answer, c.hint);
  return num(c.prompt, c.answer, c.hint, { min: 1, step: c.answer >= 100 ? 10 : 1, extra: [c.answer * 2, Math.round(c.answer / 2)] });
};

const UNITS_OF: { prompt: string; right: string; wrong: string[] }[] = [
  { prompt: "Speed is distance ÷ time. Distance is in miles and time in hours. What unit is the speed?", right: "miles per hour", wrong: ["hours per mile", "miles", "square miles"] },
  { prompt: "Area is length × width. Both are in meters. What unit is the area?", right: "square meters", wrong: ["meters", "cubic meters", "meters per second"] },
  { prompt: "Density is mass ÷ volume. Mass is in grams and volume in cubic centimeters. What unit is the density?", right: "grams per cubic centimeter", wrong: ["cubic centimeters per gram", "grams", "grams × cubic centimeters"] },
  { prompt: "A phone plan costs dollars per month. You multiply by a number of months. What unit is the answer?", right: "dollars", wrong: ["months", "dollars per month", "dollars × months"] },
  { prompt: "Volume is length × width × height, each in feet. What unit is the volume?", right: "cubic feet", wrong: ["square feet", "feet", "feet per second"] },
  { prompt: "Fuel use is miles ÷ gallons. What unit is it?", right: "miles per gallon", wrong: ["gallons per mile", "miles", "gallons"] },
];

const nqUnitOf: Maker = () => {
  const u = pick(UNITS_OF);
  return pickOne(u.prompt, u.right, u.wrong, "Treat the units like numbers: divide units to get 'per', multiply lengths to get square or cubic units.");
};

const QUANTITIES: { prompt: string; right: string; wrong: string[] }[] = [
  { prompt: "A town wants to describe how crowded its parks are. Which quantity fits best?", right: "people per acre of park", wrong: ["number of parks", "acres of park", "number of trees"] },
  { prompt: "You want to compare how fuel-efficient two cars are. Which quantity fits best?", right: "miles driven per gallon of gas", wrong: ["number of gallons the tank holds", "top speed", "color of the car"] },
  { prompt: "A coach wants to compare how fast two runners are on different-length runs. Which quantity fits best?", right: "meters per second", wrong: ["total meters run", "total seconds run", "number of runs"] },
  { prompt: "A store wants to know which box of cereal is the better deal. Which quantity fits best?", right: "price per ounce", wrong: ["price of the box", "ounces in the box", "height of the box"] },
  { prompt: "A school wants to model how quickly its water tank empties. Which quantity fits best?", right: "gallons used per day", wrong: ["gallons the tank holds", "number of faucets", "days in the year"] },
];

const nqDefine: Maker = () => {
  const q = pick(QUANTITIES);
  return pickOne(q.prompt, q.right, q.wrong, "To compare fairly, use a rate: how much of one quantity for each unit of another.");
};

const ACCURACY: { prompt: string; right: string; wrong: string[]; hint: string }[] = [
  {
    prompt: "A bathroom scale shows weight to the nearest pound. Three bags weigh 20 pounds in all. How should you report the mean weight of a bag?",
    right: "About 7 pounds",
    wrong: ["6.6666667 pounds", "6.67 pounds exactly", "0 pounds"],
    hint: "Your answer can't be more precise than your measurements. The scale reads whole pounds.",
  },
  {
    prompt: "A room measures 4.2 m by 3.1 m, each to the nearest tenth of a meter. A calculator gives 13.02 m². What is a sensible way to report the area?",
    right: "About 13 m²",
    wrong: ["Exactly 13.02 m²", "130.2 m²", "About 7 m²"],
    hint: "Measurements to the nearest tenth don't support hundredths in the answer. Also check the units: area is m².",
  },
  {
    prompt: "A ruler is marked to the nearest 1/8 inch. Which measurement could you honestly report with it?",
    right: "5 3/8 inches",
    wrong: ["5.371 inches", "5.3714 inches", "5 13/100 inches"],
    hint: "You can only read the marks the ruler has: eighths of an inch.",
  },
  {
    prompt: "A stopwatch shows tenths of a second. A runner's time for 100 m is 15.3 s. Which speed is reported with sensible accuracy?",
    right: "About 6.5 meters per second",
    wrong: ["6.535947712 meters per second", "7 meters per hour", "About 65 meters per second"],
    hint: "100 ÷ 15.3 ≈ 6.54. The time was measured to tenths, so a couple of digits is enough.",
  },
  {
    prompt: "You are buying carpet for a room. Which level of accuracy is most useful for the room's length?",
    right: "To the nearest inch",
    wrong: ["To the nearest mile", "To the nearest millionth of an inch", "To the nearest yard"],
    hint: "Choose an accuracy that suits the job: carpet is cut to about the nearest inch.",
  },
];

const nqAccuracy: Maker = () => {
  const a = pick(ACCURACY);
  return pickOne(a.prompt, a.right, a.wrong, a.hint);
};

export const QUANTITIES_9 = mathUnit({
  id: "ca-g9-quantities",
  title: "Units & Accuracy",
  emoji: "📐",
  blurb: "Keep track of units and sensible digits",
  parentNote:
    "Using units to guide multi-step problems and conversions, choosing a useful quantity such as a rate to model a situation, and reporting answers with an accuracy that fits the measurements.",
  codes: "N-Q.1; N-Q.2; N-Q.3",
  text: "using and converting units to solve problems, defining quantities for modeling, and choosing a sensible level of accuracy",
  makers: [nqConvert, nqUnitOf, nqDefine, nqAccuracy],
});

// ---------- Graphs and equations in context (F-IF.4, F-IF.9, A-CED.2) ----------

const ballTable = (k: number) => {
  const ts = Array.from({ length: 2 * k + 1 }, (_, i) => i);
  return { ts, hs: ts.map((t) => -5 * t * t + 10 * k * t) };
};

const ifFeature: Maker = () => {
  const k = pick([2, 3]);
  const { ts, hs } = ballTable(k);
  const visual = { type: "table" as const, title: "Height of a ball h(t), in meters, t seconds after it is thrown", headers: ["t (s)", "h (m)"], rows: ts.map((t, i) => [t, hs[i]]) };
  const which = pick(["max", "land", "rise"] as const);
  if (which === "max")
    return num("What is the ball's maximum height, in meters?", 5 * k * k, `The largest value in the table is at t = ${k}: ${5 * k * k} m.`, { step: 5, min: 0, visual });
  if (which === "land")
    return num("After how many seconds does the ball land (height 0 again)?", 2 * k, `h = 0 at t = 0 and again at t = ${2 * k}.`, { min: 1, max: 12, extra: [k], visual });
  return pickOne(
    "Over which interval is the height increasing?",
    `From t = 0 to t = ${k}`,
    [`From t = ${k} to t = ${2 * k}`, `From t = 0 to t = ${2 * k}`, "It never increases"],
    `The height goes up until the top, at t = ${k}, then comes down.`,
    visual,
  );
};

const ifIntercept: Maker = () => {
  const start = pick([60, 80, 100, 120]);
  const rate = pick([4, 5, 10, 20].filter((r) => start % r === 0));
  const zero = start / rate;
  return pickOne(
    `A gift card balance is B(w) = ${start} − ${rate}w dollars after w weeks. The graph crosses the w-axis at w = ${zero}. What does that mean?`,
    `After ${zero} weeks, the card has $0 left`,
    [`The card started with $${zero}`, `${zero} dollars are spent each week`, `The balance is $${start} after ${zero} weeks`],
    `On the w-axis, B = 0. ${start} − ${rate} × ${zero} = 0.`,
  );
};

const ifCompare: Maker = () => {
  const [m1, m2] = shuffle([2, 3, 4, 5, 6]).slice(0, 2);
  const [b1, b2] = shuffle([1, 2, 3, 5, 7, 8]).slice(0, 2);
  const askSlope = pick([true, false]);
  const visual = { type: "table" as const, title: "Function B", headers: ["x", "y"], rows: [0, 1, 2, 3].map((x) => [x, m2 * x + b2]) };
  const aWins = askSlope ? m1 > m2 : b1 > b2;
  return pickOne(
    `Function A is y = ${m1}x + ${b1}. Function B is shown in the table. Which has the greater ${askSlope ? "rate of change" : "y-intercept"}?`,
    aWins ? "Function A" : "Function B",
    [aWins ? "Function B" : "Function A", "They are the same"],
    askSlope ? `A's rate is ${m1}. In B's table, y goes up by ${m2} each time x goes up by 1.` : `A's y-intercept is ${b1}. In B's table, y = ${b2} when x = 0.`,
    visual,
  );
};

const CREATE: { s: string; right: string; wrong: string[] }[] = [
  { s: "A gym charges $25 to join plus $10 for each class. Which equation gives the total cost C for n classes?", right: "C = 10n + 25", wrong: ["C = 25n + 10", "C = 35n", "C = 10 + 25 + n"] },
  { s: "Adult tickets cost $8 and child tickets $5. A group spends $100 on x adult tickets and y child tickets. Which equation fits?", right: "8x + 5y = 100", wrong: ["5x + 8y = 100", "13(x + y) = 100", "8x = 5y + 100"] },
  { s: "A rectangle has length l and width w, and its perimeter is 40 cm. Which equation fits?", right: "2l + 2w = 40", wrong: ["lw = 40", "l + w = 40", "2lw = 40"] },
  { s: "A candle is 30 cm tall and burns 2 cm each hour. Which equation gives its height h after t hours?", right: "h = 30 − 2t", wrong: ["h = 2t − 30", "h = 30t − 2", "h = 28t"] },
  { s: "A plumber charges $60 for a visit plus $45 an hour. Which equation gives the cost C for h hours?", right: "C = 45h + 60", wrong: ["C = 60h + 45", "C = 105h", "C = 45 + 60 + h"] },
];

const cedCreate: Maker = () => {
  const c = pick(CREATE);
  return pickOne(c.s, c.right, c.wrong, "Find the starting amount (it is added once) and the rate (it is multiplied by the variable).");
};

const cedAxes: Maker = () => {
  const name = someone();
  return pickOne(
    `${name} graphs C = 10n + 25, the cost C in dollars of n classes. Which axis labels make sense?`,
    "Horizontal: number of classes, n. Vertical: total cost in dollars, C",
    ["Horizontal: total cost in dollars, C. Vertical: number of classes, n, with C on both", "Horizontal: dollars per class. Vertical: number of gyms", "No labels are needed"],
    "Put the input (n) on the horizontal axis and the output (C) on the vertical axis, with units.",
  );
};

export const GRAPHS_CONTEXT_9 = mathUnit({
  id: "ca-g9-graphs-in-context",
  title: "Graphs Tell Stories",
  emoji: "🗺️",
  blurb: "Read, compare and write functions in context",
  parentNote:
    "Reading key features of a function from a table or graph in context (maximum, intercepts, where it rises), comparing two functions shown in different ways, and writing two-variable equations for real situations.",
  codes: "F-IF.4; F-IF.9; A-CED.2",
  text: "interpreting key features of functions in context, comparing functions represented in different ways, and creating equations in two variables",
  makers: [ifFeature, ifIntercept, ifCompare, cedCreate, cedAxes],
});

// ---------- Quadratic models (F-IF.8, F-LE.6, A-REI.7) ----------

const sgn = (n: number) => (n < 0 ? `+ ${-n}` : `− ${n}`);

const qVertex: Maker = () => {
  const h = pick([-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]);
  const k = randInt(-6, 6);
  const right = `(${fmt(h)}, ${fmt(k)})`;
  const xPart = h === 0 ? "x²" : `(x ${sgn(h)})²`;
  const kPart = k === 0 ? "" : k > 0 ? ` + ${k}` : ` − ${-k}`;
  return pickOne(
    `The graph of y = ${xPart}${kPart} is a parabola opening up. What is its lowest point (vertex)?`,
    right,
    [`(${fmt(-h)}, ${fmt(k)})`, `(${fmt(h)}, ${fmt(-k)})`, `(${fmt(k)}, ${fmt(h)})`].filter((w) => w !== right),
    "In vertex form y = (x − h)² + k the vertex is (h, k). Watch the sign inside the brackets.",
  );
};

const qZeros: Maker = () => {
  const [a, b] = shuffle([-6, -5, -4, -3, -2, -1, 1, 2, 3, 4, 5, 6]).slice(0, 2);
  const f = (r: number) => (r < 0 ? `(x + ${-r})` : `(x − ${r})`);
  return pickOne(
    `Where does y = ${f(a)}${f(b)} cross the x-axis?`,
    `x = ${fmt(Math.min(a, b))} and x = ${fmt(Math.max(a, b))}`,
    [`x = ${fmt(Math.min(-a, -b))} and x = ${fmt(Math.max(-a, -b))}`, `x = ${fmt(a * b)}`, `x = ${fmt(a + b)}`],
    `y = 0 when a factor is 0: ${f(a)} = 0 gives x = ${a}, ${f(b)} = 0 gives x = ${b}.`,
  );
};

const qWhichForm: Maker = () => {
  const ask = pick(["zeros", "vertex", "intercept"] as const);
  const right = ask === "zeros" ? "Factored form, y = (x − 2)(x − 6)" : ask === "vertex" ? "Vertex form, y = (x − 4)² − 4" : "Standard form, y = x² − 8x + 12";
  const all = ["Factored form, y = (x − 2)(x − 6)", "Vertex form, y = (x − 4)² − 4", "Standard form, y = x² − 8x + 12"];
  return pickOne(
    `All three forms describe the same parabola. Which shows ${ask === "zeros" ? "its x-intercepts" : ask === "vertex" ? "its minimum point" : "its y-intercept"} straight away?`,
    right,
    all.filter((x) => x !== right),
    "Factored form shows the zeros, vertex form shows the turning point, and standard form shows the y-intercept as the constant term.",
  );
};

const qProjectile: Maker = (d) => {
  const k = pick([2, 3, 4, 5]);
  const v = 16 * k;
  const ask = pick(["land", "max", "at1"] as const);
  const intro = `A ball is kicked straight up from the ground at ${v} feet per second. Its height is h = −16t² + ${v}t feet after t seconds.`;
  if (ask === "land") {
    const hint = `h = 0 when −16t(t − ${k}) = 0, so t = 0 or t = ${k}.`;
    if (d === 3) return typed(`${intro} After how many seconds does it land?`, k, hint, { suffix: "s" });
    return num(`${intro} After how many seconds does it land?`, k, hint, { min: 1, max: 10, extra: [k / 2, 2 * k].filter(Number.isInteger) });
  }
  if (ask === "max") {
    const top = 4 * k * k;
    return num(`${intro} What is its greatest height, in feet?`, top, `The top is halfway to landing, at t = ${fmt(k / 2)}: −16(${fmt(k / 2)})² + ${v}(${fmt(k / 2)}) = ${top}.`, {
      step: 16,
      min: 1,
      extra: [v, top * 2],
    });
  }
  const h1 = -16 + v;
  return num(`${intro} How high is it after 1 second?`, h1, `−16(1)² + ${v}(1) = ${h1} feet.`, { step: 16, min: 0, extra: [v, v + 16] });
};

const qSystem: Maker = () => {
  const [r1, r2] = shuffle([-3, -2, -1, 0, 1, 2, 3]).slice(0, 2).sort((a, b) => a - b);
  const m = r1 + r2;
  const c = -r1 * r2;
  const line = `y = ${m === 0 ? "" : m === 1 ? "x" : m === -1 ? "−x" : `${fmt(m)}x`}${c === 0 ? (m === 0 ? "0" : "") : m === 0 ? fmt(c) : c > 0 ? ` + ${c}` : ` − ${-c}`}`;
  const pt = (x: number) => `(${fmt(x)}, ${x * x})`;
  return pickOne(
    `Where do y = x² and ${line} meet?`,
    `${pt(r1)} and ${pt(r2)}`,
    [...(r1 === -r2 ? [] : [`${pt(-r2)} and ${pt(-r1)}`]), `(${fmt(r1 + r2)}, ${fmt(r1 * r2)}) only`, "They never meet"],
    `Set x² equal to ${line.slice(4)} and solve the quadratic: x = ${fmt(r1)} or x = ${fmt(r2)}. Then find y = x² for each.`,
  );
};

const qHowManyMeet: Maker = () =>
  pickOne(
    "A line and a parabola are graphed on the same axes. How many points can they share?",
    "0, 1 or 2",
    ["Always exactly 2", "Any number, even 5", "Always exactly 1"],
    "Solving the system gives a quadratic equation, which has 0, 1 or 2 real solutions.",
  );

export const QUADRATIC_MODELS_9 = mathUnit({
  id: "ca-g9-quadratic-models",
  title: "Parabolas at Work",
  emoji: "⚽",
  blurb: "Forms of quadratics, kicks and crossings",
  parentNote:
    "Using factored and vertex forms of a quadratic to find zeros and turning points, modeling a kicked ball's height with a quadratic, and solving a system of a line and a parabola.",
  codes: "F-IF.8; F-LE.6; A-REI.7",
  text: "writing quadratic functions in equivalent forms to reveal their properties, applying quadratics to the motion of objects, and solving a system of a linear and a quadratic equation",
  makers: [qVertex, qZeros, qWhichForm, qProjectile, qSystem, qHowManyMeet],
});

// ---------- Inverse functions and outgrowing (F-BF.4, F-LE.3) ----------

const invLinear: Maker = () => {
  const a = randInt(2, 6);
  const b = randInt(1, 9);
  return pickOne(
    `What is the inverse of f(x) = ${a}x + ${b}?`,
    `f⁻¹(x) = (x − ${b}) ÷ ${a}`,
    [`f⁻¹(x) = (x + ${b}) ÷ ${a}`, `f⁻¹(x) = ${a}x − ${b}`, `f⁻¹(x) = x ÷ ${a} − ${b}`],
    `Swap x and y and solve: x = ${a}y + ${b}, so y = (x − ${b}) ÷ ${a}. The inverse undoes "times ${a}, plus ${b}" in reverse order.`,
  );
};

const invValue: Maker = (d) => {
  const a = randInt(2, 7);
  const b = pick([-9, -7, -5, -3, -2, -1, 1, 2, 3, 4, 6, 8]);
  const x = randInt(1, 9);
  const y = a * x + b;
  const prompt = `f(x) = ${a}x ${b < 0 ? `− ${-b}` : `+ ${b}`}. What is f⁻¹(${fmt(y)})?`;
  const hint = `f⁻¹(${y}) is the input that gives ${y}: ${a}x ${b < 0 ? `− ${-b}` : `+ ${b}`} = ${y}, so x = ${x}.`;
  if (d === 3) return typed(prompt, x, hint, { keypad: "integer" });
  return num(prompt, x, hint, { extra: [a * y + b, y] });
};

const invTable: Maker = () => {
  const pts = shuffle([1, 2, 3, 4, 5, 6]).slice(0, 3).map((x) => [x, x * 3 - 1]);
  const [x, y] = pick(pts);
  return num(
    `A function has the points ${pts.map(([p, q]) => `(${p}, ${q})`).join(", ")}. Its inverse has the point (${y}, ?). What is the missing number?`,
    x,
    "An inverse swaps each input and output: (a, b) becomes (b, a).",
    { min: 0, extra: [y * 3 - 1] },
  );
};

const invUndo: Maker = () => {
  const k = randInt(2, 9);
  const c = randInt(1, 9);
  return pickOne(
    `Which function undoes g(x) = x ÷ ${k} − ${c}?`,
    `h(x) = ${k}(x + ${c})`,
    [`h(x) = ${k}x + ${c}`, `h(x) = (x + ${c}) ÷ ${k}`, `h(x) = ${k}(x − ${c})`],
    `g divides by ${k}, then subtracts ${c}. To undo, add ${c}, then multiply by ${k}.`,
  );
};

const leFirstPass: Maker = () => {
  const m = pick([10, 15, 20, 25]);
  const b = pick([0, 5, 10]);
  let x = 1;
  while (2 ** x <= m * x + b) x++;
  return num(
    `f(x) = 2^x and g(x) = ${m}x${b ? ` + ${b}` : ""}. For whole numbers x ≥ 1, what is the first x where f(x) is greater than g(x)?`,
    x,
    `Make a table: at x = ${x - 1}, 2^${x - 1} = ${2 ** (x - 1)} and g = ${m * (x - 1) + b}; at x = ${x}, 2^${x} = ${2 ** x} and g = ${m * x + b}.`,
    { min: 1, max: 15 },
  );
};

const leEventually: Maker = () => {
  const pairs = [
    { a: "f(x) = 1000x + 5000", b: "g(x) = 1.05^x", win: "g(x) = 1.05^x" },
    { a: "f(x) = x²", b: "g(x) = 2^x", win: "g(x) = 2^x" },
    { a: "f(x) = 500x", b: "g(x) = 3^x", win: "g(x) = 3^x" },
    { a: "f(x) = 50x²", b: "g(x) = 1.1^x", win: "g(x) = 1.1^x" },
  ];
  const p = pick(pairs);
  return pickOne(
    `For very large x, which is greater: ${p.a} or ${p.b}?`,
    p.win,
    [p.a, "They stay equal forever"],
    "An exponential function with a base greater than 1 eventually grows past any linear or quadratic function, even if it starts smaller.",
  );
};

const leTable: Maker = () => {
  const start = pick([100, 200, 500]);
  const add = pick([50, 100]);
  const x = pick([6, 8, 10]);
  const lin = start + add * x;
  const exp = 2 ** x;
  return pickOne(
    `Plan A starts at ${start} and adds ${add} each year. Plan B starts at 1 and doubles each year. After ${x} years, which is bigger?`,
    lin > exp ? `Plan A: ${lin} vs ${exp}` : `Plan B: ${exp} vs ${lin}`,
    [lin > exp ? `Plan B: ${exp} vs ${lin}` : `Plan A: ${lin} vs ${exp}`, "They are equal"],
    `A: ${start} + ${add} × ${x} = ${lin}. B: 2^${x} = ${exp}. Doubling starts slow but eventually wins.`,
  );
};

export const INVERSE_GROWTH_9 = mathUnit({
  id: "ca-g9-inverse-growth",
  title: "Inverses & Growth Races",
  emoji: "🏁",
  blurb: "Undo a function; watch exponentials win",
  parentNote:
    "Finding the inverse of a linear function by solving f(x) = c and swapping inputs and outputs, and seeing from tables that an exponential function eventually grows past linear and quadratic ones.",
  codes: "F-BF.4; F-LE.3",
  text: "finding inverse functions, and observing that exponential growth eventually exceeds linear and quadratic growth",
  makers: [invLinear, invValue, invTable, invUndo, leFirstPass, leEventually, leTable],
});

// ---------- The correlation coefficient (S-ID.8) ----------

const R_WORDS = (r: number) => {
  const a = Math.abs(r);
  const strength = a >= 0.8 ? "strong" : a >= 0.5 ? "moderate" : a >= 0.2 ? "weak" : "almost no";
  return strength === "almost no" ? "Almost no linear relationship" : `A ${strength} ${r > 0 ? "positive" : "negative"} linear relationship`;
};

const rDescribe: Maker = () => {
  const r = pick([-0.95, -0.88, -0.75, -0.6, -0.45, -0.3, -0.1, 0.05, 0.25, 0.4, 0.55, 0.65, 0.82, 0.9, 0.97]);
  const right = R_WORDS(r);
  const all = ["A strong positive linear relationship", "A strong negative linear relationship", "A weak positive linear relationship", "A weak negative linear relationship", "A moderate positive linear relationship", "A moderate negative linear relationship", "Almost no linear relationship"];
  return pickOne(
    `A line is fit to some data and a calculator gives the correlation coefficient r = ${fmt(r)}. What does it show?`,
    right,
    shuffle(all.filter((x) => x !== right)).slice(0, 3),
    "The sign of r gives the direction. The closer r is to 1 or −1, the stronger the linear relationship; near 0 means little linear relationship.",
  );
};

const rStrongest: Maker = () => {
  const rs = shuffle([-0.92, 0.45, 0.7, -0.3, 0.1, -0.65]).slice(0, 4);
  const best = rs.reduce((a, b) => (Math.abs(b) > Math.abs(a) ? b : a));
  return pickOne(
    "Which correlation coefficient shows the strongest linear relationship?",
    `r = ${fmt(best)}`,
    rs.filter((x) => x !== best).map((x) => `r = ${fmt(x)}`),
    "Strength depends on how close r is to 1 or −1, not on the sign.",
  );
};

const rMatch: Maker = () => {
  const items = [
    { s: "The points rise from left to right and lie very close to a line.", r: "0.95" },
    { s: "The points fall from left to right and lie very close to a line.", r: "−0.95" },
    { s: "The points look like a shapeless cloud.", r: "0.02" },
    { s: "The points rise slightly from left to right but are widely scattered.", r: "0.3" },
  ];
  const it = pick(items);
  return pickOne(
    `${it.s} Which r is most likely?`,
    `r = ${it.r}`,
    items.filter((x) => x !== it).map((x) => `r = ${x.r}`),
    "Rising points give positive r, falling points give negative r, and the tighter the points hug a line, the closer r is to ±1.",
  );
};

const rImpossible: Maker = () => {
  const bad = pick([1.4, -1.2, 2.5, 1.05]);
  return pickOne(
    "Which of these can NOT be a correlation coefficient?",
    `r = ${fmt(bad)}`,
    shuffle(["r = 0", "r = −0.8", "r = 1", "r = 0.33"]).slice(0, 3),
    "A correlation coefficient is always between −1 and 1.",
  );
};

const rCause: Maker = () => {
  const pair = pick([
    ["ice cream sales", "swimming pool visits"],
    ["shoe size", "reading score for children of all ages"],
    ["number of firefighters at a fire", "damage done by the fire"],
    ["hours of daylight", "electricity used for air conditioning"],
    ["sunscreen sold", "beach visits"],
  ]);
  return pickOne(
    `For one city, ${pair[0]} and ${pair[1]} have r = 0.9. What can you conclude?`,
    "They are strongly linked, but that alone doesn't show one causes the other",
    ["One of them must cause the other", "There is no relationship", "The data must be wrong"],
    "A strong correlation can come from a third factor (like hot weather or age). Correlation is not causation.",
  );
};

export const CORRELATION_9 = mathUnit({
  id: "ca-g9-correlation",
  title: "Correlation Coefficient",
  emoji: "🔗",
  blurb: "What r tells you about a line fit",
  parentNote:
    "Interpreting the correlation coefficient r that a calculator gives for a linear fit: its sign, how strong the relationship is, the range from −1 to 1, and why correlation alone doesn't show cause.",
  codes: "S-ID.8",
  text: "interpreting the correlation coefficient of a linear fit computed with technology",
  makers: [rDescribe, rStrongest, rMatch, rImpossible, rCause],
});

export const MATH_9 = [ABSOLUTE_VALUE_9, RADICALS_9, QUANTITIES_9, GRAPHS_CONTEXT_9, QUADRATIC_MODELS_9, INVERSE_GROWTH_9, CORRELATION_9];
