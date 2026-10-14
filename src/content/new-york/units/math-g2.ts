import { pick, randInt, sample } from "../../random";
import type { Unit, Visual } from "../../types";
import { type Maker, eq, names, num, pickOne, typed } from "../../washington/units/math-kit";
import type { Q } from "../own";
import { bank, mathUnit } from "./math-kit";

// New York's own Grade 2 math units (`ny-` ids): adding up to four two-digit numbers and explaining why addition and
// subtraction strategies work (NY-2.NBT.6, 2.NBT.9), and lengths: measuring with two units, number lines and line plots
// (NY-2.MD.2, 2.MD.6, 2.MD.9).

// ---------- Adding up to four two-digit numbers (NY-2.NBT.6, 2.NBT.9) ----------

const twoDigit = (n: number, hi: number): number[] => Array.from({ length: n }, () => randInt(10, hi));

/** Add three or four two-digit numbers. */
const addMany: Maker = (d) => {
  const ns = twoDigit(d === 1 ? 3 : 4, d === 3 ? 60 : 40);
  const sum = ns.reduce((a, b) => a + b, 0);
  const hint = `Add the tens: ${ns.map((n) => Math.floor(n / 10) * 10).join(" + ")}. Then add the ones: ${ns.map((n) => n % 10).join(" + ")}. Put them together.`;
  if (d === 3) return typed("Add the numbers.", sum, hint, { visual: eq(`${ns.join(" + ")} = ?`) });
  return num("Add the numbers.", sum, hint, { min: 0, extra: [sum + 10, sum - 10, sum + 1], visual: eq(`${ns.join(" + ")} = ?`) });
};

const COLLECT = ["cans", "books", "bottle caps", "leaves", "shells"] as const;

/** A story that adds four two-digit numbers. */
const addStory: Maker = (d) => {
  const ns = twoDigit(4, d === 1 ? 25 : 45);
  const sum = ns.reduce((a, b) => a + b, 0);
  const thing = pick(COLLECT);
  return num(
    `A class collects ${thing} for four days: ${ns.join(", ")}. How many ${thing} in all?`,
    sum,
    "Add the tens first, then the ones. Look for ones that make 10.",
    { min: 0, extra: [sum + 10, sum - 10, ns[0] + ns[1] + ns[2]] },
  );
};

/** Why adding two numbers whose ones make 10 first helps. */
const friendlyPair: Maker = () => {
  const ones = randInt(1, 9);
  const a = randInt(1, 6) * 10 + ones;
  const b = randInt(1, 3) * 10 + (10 - ones);
  let c = randInt(11, 39);
  while ((c % 10) + ones === 10) c = randInt(11, 39);
  return pickOne(
    `Ana adds ${a} + ${c} + ${b} by doing ${a} + ${b} first. Why does that help?`,
    `${a} + ${b} = ${a + b}, a number of tens that is easy to add to`,
    [`${b} is the smallest number, so it goes first`, "You must always add the last number first", "The order changes the total, so this order is the right one"],
    "You can add numbers in any order. Ones that make 10 give a friendly number of tens.",
  );
};

const tens = (n: number): string => `${n} ${n === 1 ? "ten" : "tens"}`;
const ones = (n: number): string => `${n} ${n === 1 ? "one" : "ones"}`;

/** Why adding tens works: tens are added to tens and ones stay as they are. */
const whyTens: Maker = () => {
  const t1 = randInt(1, 6);
  const o = randInt(1, 9);
  const t2 = randInt(1, 9 - t1);
  const a = t1 * 10 + o;
  return pickOne(
    `Why is ${a} + ${t2 * 10} = ${a + t2 * 10}?`,
    `${tens(t1)} and ${tens(t2)} make ${tens(t1 + t2)}, and the ${ones(o)} ${o === 1 ? "stays" : "stay"} the same`,
    [`${ones(o)} and ${ones(t2)} make ${ones(o + t2)}`, `${tens(t1)} and ${ones(t2)} make ${tens(t1 + t2)}`, `you add ${t2} to the ones digit`],
    `${t2 * 10} is ${tens(t2)}. Add tens to tens.`,
  );
};

/** Which work shows adding tens, then ones. */
const splitWork: Maker = () => {
  const a = randInt(1, 4) * 10 + randInt(1, 9);
  const b = randInt(1, 4) * 10 + randInt(1, 9);
  const [ta, oa, tb, ob] = [a - (a % 10), a % 10, b - (b % 10), b % 10];
  const right = `${ta} + ${tb} = ${ta + tb}, ${oa} + ${ob} = ${oa + ob}, ${ta + tb} + ${oa + ob} = ${a + b}`;
  const wrong = [
    `${ta / 10} + ${tb / 10} = ${(ta + tb) / 10}, ${oa} + ${ob} = ${oa + ob}, ${(ta + tb) / 10} + ${oa + ob} = ${(ta + tb) / 10 + oa + ob}`,
    `${ta} + ${tb} = ${ta + tb}, ${oa} + ${ob} = ${oa + ob}, ${ta + tb} + ${oa + ob} = ${a + b + 10}`,
    `${a} + ${tb} = ${a + tb}, ${a + tb} + ${ob} = ${a + tb + ob + 10}`,
  ];
  return pickOne(`Kai adds ${a} + ${b} by adding tens, then ones. Which shows his work?`, right, wrong, "Tens go with tens: the 2 in 27 means 20. Ones go with ones. Then add the two parts.");
};

/** Subtracting a friendly number, then fixing it. */
const compensate: Maker = () => {
  const b = pick([19, 29, 39, 18, 28]);
  const a = randInt(b + 12, 95);
  const round = b + (10 - (b % 10));
  const extra = round - b;
  return pickOne(
    `To find ${a} − ${b}, Ana does ${a} − ${round} = ${a - round}. What should she do next?`,
    `Add ${extra}, because she took away ${extra} too many: ${a - b}`,
    [`Take away ${extra} more: ${a - round - extra}`, `Nothing: ${a - round} is the answer`, `Add ${round}: ${a}`],
    `${round} is ${extra} more than ${b}. Taking away ${round} took away ${extra} too many, so give ${extra} back.`,
  );
};

const WHY: Q[] = [
  ["Why can you add 15 + 28 + 5 as 15 + 5 + 28?", "You can add numbers in any order and get the same total", ["The biggest number must go last", "Adding is the same as subtracting", "15 and 5 are both odd"], "Changing the order of numbers you add does not change the total."],
  ["When you add 36 + 47, why do you make a new ten?", "6 ones and 7 ones make 13 ones, which is 1 ten and 3 ones", ["3 tens and 4 tens make 7 tens", "36 is close to 40", "You always add 10 when adding"], "Ten ones make one ten. 13 ones is 1 ten and 3 ones."],
  ["To subtract 63 − 28, Leo breaks a ten. Why?", "3 ones is not enough to take away 8 ones", ["6 tens is too many tens", "You always break a ten", "28 is bigger than 63"], "Break 1 ten into 10 ones: 63 is 5 tens and 13 ones."],
  ["Why does 40 + 30 + 20 + 10 = 100?", "4 + 3 + 2 + 1 tens is 10 tens, and 10 tens is 100", ["40 + 30 is 100", "Each number has a zero", "There are four numbers"], "Add the tens: 4 + 3 + 2 + 1 = 10 tens."],
  ["Why can you check 52 − 17 = 35 by adding?", "35 + 17 should give back 52", ["52 + 17 should give 35", "35 − 17 should give 52", "You cannot check subtraction"], "Adding the part you took away should give back the whole."],
  ["Mia adds 24 + 26 + 24 + 26. What is a quick way?", "24 + 26 = 50, and two 50s make 100", ["Add the ones only: 4 + 6 + 4 + 6", "Add 24 four times", "Take away 26 from 24"], "Find pairs that make a friendly number.", true],
];

// ---------- Lengths: two units, number lines and line plots (NY-2.MD.2, 2.MD.6, 2.MD.9) ----------

/** A smaller unit and a bigger unit, with how many small ones fit in one big one. */
const UNIT_PAIRS = [
  { small: "inches", big: "feet", one: "foot", per: 12 },
  { small: "centimeters", big: "meters", one: "meter", per: 100 },
  { small: "feet", big: "yards", one: "yard", per: 3 },
  { small: "inches", big: "yards", one: "yard", per: 36 },
] as const;

const THINGS = ["rug", "table", "hallway", "rope", "garden", "board"] as const;

/** Measuring with a smaller unit takes more units. */
const twoUnits: Maker = (d) => {
  const p = pick(UNIT_PAIRS);
  const thing = pick(THINGS);
  if (d > 1 && pick([true, false])) {
    const n = p.per === 100 ? randInt(1, 3) : randInt(2, 4);
    const [x, a] = sample(names, 2);
    return pickOne(
      `${x} measures a ${thing}: ${n} ${p.big}. ${a} measures it: ${n * p.per} ${p.small}. Who is right?`,
      `Both: ${p.small} are shorter, so it takes more of them`,
      [`Only ${x}: the smaller number is right`, `Only ${a}: the bigger number is right`, "Neither: the numbers should match"],
      `1 ${p.one} is ${p.per} ${p.small}. The same length can be ${n} ${p.big} or ${n * p.per} ${p.small}.`,
    );
  }
  const first = pick(["big", "small"] as const);
  const n = first === "big" ? randInt(2, 9) : p.per * randInt(2, p.per === 100 ? 3 : 4);
  const [from, to] = first === "big" ? [p.big, p.small] : [p.small, p.big];
  const bigger = first === "big";
  return pickOne(
    `A ${thing} is ${n} ${from} long. Measured in ${to}, the number will be…`,
    bigger ? `bigger, because ${p.small} are shorter units` : `smaller, because ${p.big} are longer units`,
    [bigger ? `smaller, because ${p.small} are shorter units` : `bigger, because ${p.big} are longer units`, "the same, because the length does not change"],
    "The shorter the unit, the more of them it takes to cover the same length.",
  );
};

/** A sum or difference shown as jumps on a number line from 0. */
const numberLine: Maker = (d) => {
  const step = d === 1 ? 1 : 5;
  const max = d === 1 ? 20 : 100;
  const a = randInt(2, max / step - 4) * step;
  const b = randInt(1, Math.min(max - a, d === 1 ? 9 : 40) / step) * step;
  if (d === 1 || pick([true, false])) {
    const visual: Visual = { type: "numberLine", min: 0, max, step, labelEvery: d === 1 ? 5 : 10, jumps: [{ from: 0, to: a }, { from: a, to: a + b }] };
    return num("The jumps start at 0. What sum do they show?", a + b, `The first jump is ${a} long. The next jump is ${b} more.`, { min: 0, max, step, extra: [a, b], visual });
  }
  const top = a + b;
  const visual: Visual = { type: "numberLine", min: 0, max, step, labelEvery: 10, jumps: [{ from: 0, to: top }, { from: top, to: a }] };
  return pickOne(
    "Which number sentence do the jumps show?",
    `${top} − ${b} = ${a}`,
    [`${top} + ${b} = ${top + b}`, `${a} + ${top} = ${a + top}`, `${top} + ${a} = ${top + a}`],
    `The first jump goes from 0 to ${top}. The second jump goes back ${b}.`,
    visual,
  );
};

const OBJECTS = [
  { title: "Pencil lengths", what: "pencils", unit: "inches", lo: 3, hi: 8 },
  { title: "Leaf lengths", what: "leaves", unit: "centimeters", lo: 4, hi: 10 },
  { title: "Crayon lengths", what: "crayons", unit: "centimeters", lo: 6, hi: 11 },
  { title: "One desk, measured 10 times", what: "measurements", unit: "inches", lo: 22, hi: 26 },
] as const;

/** A line plot of lengths, shown as a table of X marks. */
const linePlot: Maker = (d) => {
  const o = pick(OBJECTS);
  const start = randInt(o.lo, o.hi - 4);
  const lengths = [start, start + 1, start + 2, start + 3, start + 4];
  let counts = lengths.map(() => randInt(0, 5));
  while (counts.filter((c) => c > 0).length < 3 || new Set(counts).size < 4 || counts[0] === 0 || counts[4] === 0 || counts.filter((c) => c === Math.max(...counts)).length > 1) counts = lengths.map(() => randInt(0, 5));
  const visual: Visual = { type: "table", title: `${o.title} (${o.unit})`, headers: [`Length (${o.unit})`, "X marks"], rows: lengths.map((l, i) => [l, "X ".repeat(counts[i]).trim() || "—"]) };
  const total = counts.reduce((a, b) => a + b, 0);
  const most = Math.max(...counts);
  const kind = pick(d === 1 ? (["total", "most"] as const) : (["total", "most", "longer", "spread"] as const));
  if (kind === "total") return num(`Each X is one of the ${o.what}. How many ${o.what} were measured?`, total, "Count every X in the line plot.", { min: 1, extra: [lengths.length, most], visual });
  if (kind === "most") {
    const at = lengths[counts.indexOf(most)];
    return pickOne(`Which length was measured most often?`, `${at} ${o.unit}`, lengths.filter((l) => l !== at).slice(0, 3).map((l) => `${l} ${o.unit}`), "Find the length with the most X marks.", visual);
  }
  if (kind === "longer") {
    const cut = lengths[2];
    const n = counts[3] + counts[4];
    return num(`How many ${o.what} are longer than ${cut} ${o.unit}?`, n, `Add the X marks for the lengths after ${cut}.`, { min: 0, extra: [n + counts[2], counts[4]], visual });
  }
  return num(`How much longer is the longest measurement than the shortest?`, 4, `The longest is ${lengths[4]} ${o.unit} and the shortest is ${lengths[0]} ${o.unit}. Subtract.`, { min: 0, extra: [lengths[4], total], visual });
};

const LENGTH_WHY: Q[] = [
  ["Why do you get a bigger number measuring in inches than in feet?", "An inch is shorter, so it takes more of them", ["An inch is longer than a foot", "Inches are only for small things", "The object gets longer"], "Shorter units fit more times along the same length."],
  ["A path is 5 paper clips or 2 pencils long. Which unit is longer?", "the pencil", ["the paper clip", "they are the same"], "Fewer of the longer unit cover the same length."],
  ["A rope is 3 yards long. In feet, will the number be bigger or smaller than 3?", "bigger", ["smaller", "the same"], "A foot is shorter than a yard, so you need more feet."],
  ["To make a line plot of lengths, what goes on the number line?", "the lengths, in equal steps", ["the names of the objects", "only the longest length", "the colors of the objects"], "A line plot shows each length on a number line and an X for each measurement."],
  ["On a number line, how long is the jump from 0 to 35?", "35 units", ["30 units", "36 units", "0 units"], "A number on the number line is its distance from 0."],
  ["On a number line, a jump goes from 40 back to 25. What does it show?", "40 − 15 = 25", ["40 + 15 = 55", "25 − 15 = 10", "40 − 25 = 25"], "A jump to the left takes away. From 40 back to 25 is 15."],
];

export const UNITS: Unit[] = [
  mathUnit({
    id: "ny-g2-add-four",
    title: "Add Up to Four Numbers",
    emoji: "🧮",
    blurb: "Tens with tens, ones with ones",
    parentNote: "Adding three or four two-digit numbers by adding tens and ones and looking for numbers that make a ten, and explaining in words why these strategies work.",
    codes: "NY-2.NBT.6; NY-2.NBT.9",
    text: "adding up to four two-digit numbers using place value, and explaining why addition and subtraction strategies work",
    makers: [addMany, addMany, addStory, friendlyPair, whyTens, splitWork, compensate, bank(WHY)],
  }),
  mathUnit({
    id: "ny-g2-lengths",
    title: "Lengths & Line Plots",
    emoji: "📏",
    blurb: "Units, number lines and line plots",
    parentNote: "Measuring the same thing with two units and seeing that a smaller unit takes more of them, showing sums and differences as jumps on a number line, and reading line plots of measured lengths.",
    codes: "NY-2.MD.2; NY-2.MD.6; NY-2.MD.9",
    text: "measuring with two different units, showing sums and differences on a number line, and showing measurements in a line plot",
    makers: [twoUnits, twoUnits, numberLine, numberLine, linePlot, linePlot, bank(LENGTH_WHY)],
  }),
];

