import { pick, randInt } from "../../random";
import { num, pickOne, someone, type Maker } from "../../washington/units/math-kit";
import { mathUnit } from "./math";

// Grade 2: estimation (2.NBT.7.1), a California addition to the Common Core. The shared helpers are in ./math.ts.

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
