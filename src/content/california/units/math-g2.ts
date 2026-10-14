import { pick, randInt, shuffle } from "../../random";
import { eq, num, pickOne, someone, typed, type Maker } from "../../washington/units/math-kit";
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

// ---------- Adding up to four two-digit numbers (2.NBT.6), and why the strategies work (2.NBT.9) ----------

/** `count` two-digit numbers with a total under 200 (under 100 at difficulty 1). */
function twoDigits(count: number, d: number): number[] {
  for (;;) {
    const ns = Array.from({ length: count }, () => randInt(11, d === 1 ? 35 : 49));
    const sum = ns.reduce((a, b) => a + b, 0);
    if (sum < (d === 1 ? 100 : 200)) return ns;
  }
}
const total = (ns: number[]) => ns.reduce((a, b) => a + b, 0);

const addMany: Maker = (d) => {
  const ns = twoDigits(d === 1 ? 3 : 4, d);
  const sum = total(ns);
  const tens = total(ns.map((n) => n - (n % 10)));
  const hint = `Add the tens: ${tens}. Add the ones: ${sum - tens}. Then ${tens} + ${sum - tens} = ${sum}.`;
  const visual = eq(`${ns.join(" + ")} = ?`);
  if (d === 3) return typed("Add the numbers.", sum, hint, { visual });
  return num("Add the numbers.", sum, hint, { step: 10, extra: [sum + 1, sum - 1, tens], visual });
};

const STACKS = [
  { what: "books", who: "Four classes read", end: "books" },
  { what: "cans", who: "Four teams collected", end: "cans" },
  { what: "laps", who: "Four friends ran", end: "laps in a month" },
  { what: "beans", who: "Four jars hold", end: "beans" },
];

const addStory: Maker = (d) => {
  const s = pick(STACKS);
  const ns = twoDigits(d === 1 ? 3 : 4, d);
  const who = d === 1 ? s.who.replace("Four", "Three") : s.who;
  const list = `${ns.slice(0, -1).join(", ")} and ${ns[ns.length - 1]}`;
  const sum = total(ns);
  return num(`${who} ${list} ${s.end}. How many ${s.what} in all?`, sum, `Add the tens, then the ones, then put them together: ${sum}.`, {
    step: 10,
    extra: [sum + 1, sum - 1],
  });
};

const tensPart: Maker = (d) => {
  const ns = twoDigits(d === 1 ? 3 : 4, d);
  const tens = total(ns.map((n) => n - (n % 10)));
  return num(`To add ${ns.join(" + ")}, first add the tens. What do the tens make?`, tens, `The tens are ${ns.map((n) => n - (n % 10)).join(" + ")} = ${tens}.`, {
    step: 10,
    min: 10,
  });
};

const nextStep: Maker = () => {
  const a = randInt(21, 69);
  const b = randInt(12, 29);
  const [at, ao, bt, bo] = [a - (a % 10), a % 10, b - (b % 10), b % 10];
  const name = someone();
  return pickOne(
    `${name} adds ${a} + ${b}. ${name} finds ${at} + ${bt} = ${at + bt} and ${ao} + ${bo} = ${ao + bo}. What comes next?`,
    `${at + bt} + ${ao + bo} = ${a + b}`,
    [`${at + bt} − ${ao + bo} = ${at + bt - ao - bo}`, `${at + bt} + ${ao + bo + 10} = ${a + b + 10}`, `${ao + bo} + ${bt} = ${ao + bo + bt}`],
    "Put the tens part and the ones part back together.",
  );
};

const WHY: { prompt: string; right: string; wrong: string[]; hint: string }[] = [
  {
    prompt: "Why can you add the tens and the ones separately, then put them together?",
    right: "Each number is just its tens plus its ones, so nothing is lost",
    wrong: ["Ones don't really count when you add", "It always makes the answer bigger"],
    hint: "47 is 40 + 7. Adding all the tens and all the ones adds every part.",
  },
  {
    prompt: "Why does 12 ones become 1 ten and 2 ones?",
    right: "10 ones make 1 ten",
    wrong: ["12 is too big to write", "Ones can never be more than 5"],
    hint: "Trade 10 ones for 1 ten. 2 ones are left.",
  },
  {
    prompt: "Why is 27 + 35 + 13 the same as 27 + 13 + 35?",
    right: "You can add numbers in any order and get the same total",
    wrong: ["Only the first number matters", "Moving numbers always changes the total"],
    hint: "Changing the order of numbers you add does not change the total.",
  },
  {
    prompt: "To find 62 − 28, Ana thinks 28 + ? = 62. Why does that work?",
    right: "Subtracting is finding the part you add to get the total",
    wrong: ["Adding and subtracting are not connected", "The answer is always 62"],
    hint: "62 − 28 asks what goes with 28 to make 62.",
  },
  {
    prompt: "Leo turns 48 + 25 into 50 + 23. Why is the total the same?",
    right: "He moved 2 from 25 to 48",
    wrong: ["He added 2 more to the total", "He took away 2 from the total"],
    hint: "48 + 2 = 50 and 25 − 2 = 23. The 2 just moved, so the total stays 73.",
  },
  {
    prompt: "Why does 53 − 19 give the same answer as 54 − 20?",
    right: "Both numbers went up by 1, so the difference stays the same",
    wrong: ["Subtracting 20 is always easier", "54 and 53 are the same number"],
    hint: "Adding 1 to both numbers keeps the gap between them the same.",
  },
];

const whyItWorks: Maker = () => {
  const w = pick(WHY);
  return pickOne(w.prompt, w.right, shuffle(w.wrong), w.hint);
};

const easyPair: Maker = () => {
  for (;;) {
    const q = tryEasyPair();
    if (q) return q;
  }
};

function tryEasyPair() {
  const a = randInt(1, 9) * 10 + randInt(1, 9);
  const b = (10 - (a % 10)) + randInt(1, 4) * 10;
  const c = randInt(11, 39);
  const d = randInt(11, 29);
  const ns = shuffle([a, b, c, d]);
  const right = `${a} + ${b}`;
  const wrong = [`${c} + ${d}`, `${a} + ${c}`, `${b} + ${d}`].filter((p) => total(p.split(" + ").map(Number)) % 10 !== 0);
  if (!wrong.length || new Set([a, b, c, d]).size < 4) return undefined;
  return pickOne(
    `Add ${ns.join(" + ")}. Which two make a number ending in 0, so they are easy to add first?`,
    right,
    wrong,
    `${a} + ${b} = ${a + b}, a number with no extra ones.`,
  );
}

export const ADD_FOUR_2 = mathUnit({
  id: "ca-g2-add-four",
  title: "Add Up to Four Numbers",
  emoji: "➕",
  blurb: "Add tens, add ones, put them together",
  parentNote:
    "Adding three or four two-digit numbers by adding the tens, then the ones, and explaining why strategies like this work, using place value and the fact that order doesn't change a sum.",
  codes: "2.NBT.6; 2.NBT.9",
  text: "adding up to four two-digit numbers using place value, and explaining why addition and subtraction strategies work",
  makers: [addMany, addStory, tensPart, nextStep, whyItWorks, easyPair],
});

// ---------- Two units, number lines and line plots (2.MD.2, 2.MD.6, 2.MD.9) ----------

const PAIRS: { big: string; small: string; per: number }[] = [
  { big: "feet", small: "inches", per: 12 },
  { big: "yards", small: "feet", per: 3 },
  { big: "meters", small: "centimeters", per: 100 },
];
const OBJECTS = ["rug", "table", "garden", "rope", "hallway", "fence"];

const twoUnits: Maker = (d) => {
  const p = pick(d === 1 ? PAIRS.slice(0, 2) : PAIRS);
  const n = randInt(2, p.per === 100 ? 4 : 6);
  const thing = pick(OBJECTS);
  return pickOne(
    `A ${thing} measures ${n} ${p.big}. Measured in ${p.small}, will the number be bigger or smaller than ${n}?`,
    "Bigger, because each unit is shorter",
    ["Smaller, because each unit is shorter", `The same, ${n}`],
    `${p.small[0].toUpperCase() + p.small.slice(1)} are shorter than ${p.big}, so it takes more of them to cover the same length.`,
  );
};

const whichMore: Maker = () => {
  const p = pick(PAIRS);
  const n = randInt(2, 5);
  const thing = pick(OBJECTS);
  const name = someone();
  return pickOne(
    `${name} measures a ${thing} twice: ${n} ${p.big} and ${n * p.per} ${p.small}. Which unit is longer?`,
    `1 ${p.big.replace(/s$/, "").replace("feet", "foot")}`,
    [`1 ${p.small.replace(/s$/, "").replace("feet", "foot").replace("inche", "inch")}`, "They are the same length"],
    "Fewer units means each unit is longer.",
  );
};

const SPANS = [
  { a: "paper clips", b: "pencils", per: 4 },
  { a: "cubes", b: "ten-cube rods", per: 10 },
  { a: "inches", b: "feet", per: 12 },
];

const cap = (w: string) => w[0].toUpperCase() + w.slice(1);

const fewerUnits: Maker = () => {
  const s = pick(SPANS);
  const name = someone();
  const big = randInt(2, s.per === 4 ? 6 : 4);
  const small = big * s.per;
  return pickOne(
    `${name} measures a desk. It is ${small} ${s.a} long and ${big} ${s.b} long. Why are the numbers different?`,
    `${cap(s.b)} are longer, so fewer fit`,
    [`The desk changed size`, `${cap(s.a)} are longer, so fewer fit`, `${name} made a mistake`],
    "The longer the unit, the fewer of them fit along the same length.",
  );
};

const lineJumps: Maker = (d) => {
  const a = randInt(d === 1 ? 10 : 20, d === 1 ? 40 : 50);
  const b = randInt(5, d === 1 ? 30 : 45);
  const sub = d === 3 && Math.min(a, b) > 4 && a > b;
  const end = sub ? a - b : a + b;
  const max = 100;
  return num(
    sub ? `Start at ${a} on the number line and jump back ${b}. Where do you land?` : `Start at 0. Jump ${a}, then jump ${b} more. Where do you land?`,
    end,
    sub ? `${a} − ${b} = ${end}.` : `${a} + ${b} = ${end}.`,
    {
      step: 5,
      extra: [end + 10, end - 10],
      visual: { type: "numberLine", min: 0, max, step: 5, labelEvery: 10, jumps: sub ? [{ from: a, to: end }] : [{ from: 0, to: a }, { from: a, to: end }] },
    },
  );
};

const lineBlank: Maker = (d) => {
  const step = d === 1 ? 1 : pick([2, 5]);
  const span = step * 20;
  const min = d === 1 ? randInt(0, 3) * 10 : pick([0, 20, 40]);
  const at = min + step * randInt(1, 19);
  return num(`What number goes where the ? is?`, at, `The marks go up by ${step}. Count on from the closest labeled number.`, {
    step,
    visual: { type: "numberLine", min, max: min + span, step, labelEvery: step === 1 ? 5 : 10, blankAt: at },
  });
};

const PLOT_THINGS = [
  { what: "pencils", unit: "inches" },
  { what: "shoes", unit: "inches" },
  { what: "leaves", unit: "centimeters" },
  { what: "worms", unit: "centimeters" },
];

function measurements(d: number): { lengths: number[]; thing: (typeof PLOT_THINGS)[number] } {
  const thing = pick(PLOT_THINGS);
  const low = randInt(3, 8);
  const n = d === 1 ? 6 : 8;
  return { thing, lengths: Array.from({ length: n }, () => low + randInt(0, 3)).sort((a, b) => a - b) };
}

const plotCount: Maker = (d) => {
  const { lengths, thing } = measurements(d);
  const v = pick(lengths);
  const count = lengths.filter((x) => x === v).length;
  return num(
    `The class measured some ${thing.what} in ${thing.unit}: ${shuffle(lengths).join(", ")}. On a line plot, how many X's go above ${v}?`,
    count,
    `Make one X for each ${thing.what.replace(/s$/, "")} that is ${v} ${thing.unit} long. Count them: ${count}.`,
    { min: 1, max: 8 },
  );
};

const plotMost: Maker = (d) => {
  for (;;) {
    const { lengths, thing } = measurements(d);
    const counts = new Map<number, number>();
    for (const x of lengths) counts.set(x, (counts.get(x) ?? 0) + 1);
    const sorted = [...counts.entries()].sort((a, b) => b[1] - a[1]);
    if (sorted.length < 2 || sorted[0][1] === sorted[1][1]) continue;
    const top = sorted[0][0];
    return pickOne(
      `The class measured some ${thing.what} in ${thing.unit}: ${shuffle(lengths).join(", ")}. On a line plot, which length has the tallest stack of X's?`,
      `${top} ${thing.unit}`,
      sorted.slice(1).map(([len]) => `${len} ${thing.unit}`),
      "The length that shows up most often gets the most X's.",
    );
  }
};

const plotRead: Maker = (d) => {
  const { lengths, thing } = measurements(d);
  const lo = lengths[0];
  const hi = lengths[lengths.length - 1];
  if (hi === lo) return plotCount(d);
  return num(
    `The line plot shows the lengths of some ${thing.what}. How much longer is the longest than the shortest?`,
    hi - lo,
    `Longest ${hi}, shortest ${lo}. ${hi} − ${lo} = ${hi - lo} ${thing.unit}.`,
    {
      min: 0,
      visual: {
        type: "table",
        title: `${thing.what[0].toUpperCase() + thing.what.slice(1)} (${thing.unit})`,
        headers: ["Length", "X's"],
        rows: [...new Set(lengths)].map((len) => [len, "✕".repeat(lengths.filter((x) => x === len).length)]),
      },
    },
  );
};

export const LENGTHS_2 = mathUnit({
  id: "ca-g2-length-lines",
  title: "Lengths on Lines",
  emoji: "📏",
  blurb: "Two units, number lines and line plots",
  parentNote:
    "Seeing why the same length gives a bigger number in a smaller unit, adding and subtracting as jumps on a number line, and showing measurements on a line plot with whole-number lengths.",
  codes: "2.MD.2; 2.MD.6; 2.MD.9",
  text: "measuring a length in two units, showing numbers, sums and differences on a number line, and making line plots of measurements",
  makers: [twoUnits, whichMore, fewerUnits, lineJumps, lineBlank, plotCount, plotMost, plotRead],
});

export const MATH_2 = [ESTIMATE_2, ADD_FOUR_2, LENGTHS_2];
