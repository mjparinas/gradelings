import { pick, randInt, sample, shuffle } from "../../random";
import type { Unit } from "../../types";
import { type Maker, eq, num, pickOne, someone, typed } from "../../washington/units/math-kit";
import { COIN, COINS, COIN_LOOK, cents, mathUnit, usd } from "./math-kit";

// New York's own Grade 1 math units: adding three numbers in word problems (NY-1.OA.2), and coins (NY-1.MD.3b, 3c). Children name the penny, nickel, dime and quarter, know what
// each is worth and write it with the ¢ sign, and count a mix of dimes and pennies up to 100¢.

const ALL = [1, 5, 10, 25];

/** What is this coin called? */
const nameCoin: Maker = (d) => {
  const c = pick(ALL);
  const others = d === 3 ? ALL.filter((x) => x !== c) : sample(ALL.filter((x) => x !== c), 2);
  return usd(pickOne("What is this coin called?", COIN[c], others.map((o) => COIN[o]), COIN_LOOK[c], { type: "coins", coins: [c], currency: "USD" }));
};

/** What one coin is worth. */
const coinValue: Maker = () => {
  const c = pick(ALL);
  return usd(num(`How much is one ${COIN[c]} worth?`, c, "A penny is 1¢, a nickel 5¢, a dime 10¢ and a quarter 25¢.", { extra: ALL, label: cents, min: 1 }));
};

/** Which coin is worth the most (or the least)? Size can fool you. */
const worthMost: Maker = (d) => {
  const coins = d === 1 ? sample([1, 10, 25], 2) : sample(ALL, 3);
  const most = pick([true, false]);
  const right = most ? Math.max(...coins) : Math.min(...coins);
  const opt = (c: number) => ({ label: COIN[c], coin: c });
  return usd(pickOne(`Which coin is worth the ${most ? "most" : "least"}?`, opt(right), coins.filter((c) => c !== right).map(opt), "Size can fool you: a dime is small, but it is worth more than a nickel or a penny."));
};

/** Count a mix of dimes and pennies, shown as coins. */
const countMix: Maker = (d) => {
  const dimes = d === 1 ? randInt(1, 3) : randInt(2, d === 2 ? 6 : 8);
  const pennies = randInt(1, d === 1 ? 4 : 9);
  const total = dimes * 10 + pennies;
  const coins = [...Array(dimes).fill(10), ...Array(pennies).fill(1)];
  return usd(
    num("How much money is this?", total, `Count the dimes by tens: ${Array.from({ length: dimes }, (_, i) => (i + 1) * 10).join(", ")}. Then count on 1 for each penny.`, {
      extra: [dimes + pennies, pennies * 10 + dimes, total + 10, total - 10],
      min: 1,
      max: 100,
      label: cents,
      visual: { type: "coins", coins, currency: "USD" },
    }),
  );
};

/** Count dimes by tens. */
const countDimes: Maker = (d) => {
  const n = d === 1 ? randInt(2, 5) : randInt(4, 10);
  return usd(num("Count by tens. How many cents?", n * 10, "Each dime is 10¢. Count 10, 20, 30… for the dimes.", { step: 10, min: 10, max: 100, extra: [n, n + 10], label: cents, visual: { type: "coins", coins: Array(n).fill(10), currency: "USD" } }));
};

/** A story with dimes and pennies; typed on the hard level. */
const coinStory: Maker = (d) => {
  const who = someone();
  const dimes = randInt(1, d === 1 ? 3 : 7);
  const pennies = randInt(1, 9);
  const total = dimes * 10 + pennies;
  const part = (n: number, c: number) => `${n} ${n === 1 ? COIN[c] : COINS[c]}`;
  const prompt = `${who} has ${part(dimes, 10)} and ${part(pennies, 1)}. How many cents?`;
  const hint = `${part(dimes, 10)} make ${dimes * 10}¢. Add ${pennies}¢ for the pennies.`;
  if (d === 3) return { ...typed(prompt, total, hint, { suffix: "¢" }), currency: "USD" };
  return usd(num(prompt, total, hint, { extra: [dimes + pennies, pennies * 10 + dimes, total + 10], min: 1, max: 100, label: cents }));
};

/** How many smaller coins make a bigger one. */
const howManyMake: Maker = (d) => {
  const [small, big] = pick(d === 1 ? ([[1, 10], [1, 5]] as const) : ([[1, 10], [1, 5], [5, 10], [10, 100], [5, 25]] as const));
  const label = big === 100 ? "one dollar" : `a ${COIN[big]}`;
  return usd(num(`How many ${COINS[small]} make ${label}?`, big / small, `${label === "one dollar" ? "One dollar is 100¢" : `A ${COIN[big]} is ${big}¢`}. Count by ${small === 1 ? "ones" : small === 5 ? "fives" : "tens"} to ${big}.`, { min: 1, extra: [big / small + 5, big / small - 1, big / small + 1] }));
};

/** Writing cents with the ¢ sign. */
const centSign: Maker = (d) => {
  const n = d === 1 ? randInt(2, 9) : randInt(11, 99);
  const words = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
  const say = n < 10 ? words[n] : String(n);
  const swap = n >= 10 && n % 10 !== Math.floor(n / 10) && n % 10 !== 0 ? `${n % 10}${Math.floor(n / 10)}¢` : `${n + 10}¢`;
  return pickOne(`Which shows ${say} cents?`, `${n}¢`, [`$${n}`, n < 10 ? `${n}0¢` : swap], "Write the number of cents, then the cent sign ¢.");
};

// ---------- Adding three numbers (NY-1.OA.2) ----------

/** Three numbers from 1 to 9 with a sum of at most `max`. */
function three(max: number): [number, number, number] {
  const a = randInt(1, Math.min(9, max - 2));
  const b = randInt(1, Math.min(9, max - a - 1));
  const c = randInt(1, Math.min(9, max - a - b));
  return [a, b, c];
}

const STORIES: ((who: string, a: number, b: number, c: number) => string)[] = [
  (who, a, b, c) => `${who} picks ${a} apples, then ${b}, then ${c} more. How many apples?`,
  (who, a, b, c) => `${who} has ${a} red, ${b} blue and ${c} green beads. How many beads?`,
  (_, a, b, c) => `${a} birds sit on a fence. ${b} come, then ${c} more. How many birds?`,
  (who, a, b, c) => `${who} reads ${a} pages, then ${b}, then ${c}. How many pages?`,
  (_, a, b, c) => `A box has ${a} big, ${b} small and ${c} tiny shells. How many shells?`,
  (who, a, b, c) => `${who} gets ${a} stickers, then ${b}, then ${c}. How many stickers?`,
  (_, a, b, c) => `There are ${a} cats, ${b} dogs and ${c} fish in a pet shop. How many pets?`,
];

/** A word problem with three numbers; typed on the hard level. */
const threeStory: Maker = (d) => {
  const [a, b, c] = three(d === 1 ? 12 : 20);
  const prompt = pick(STORIES)(someone(), a, b, c);
  const hint = `Add two numbers first: ${a} + ${b} = ${a + b}. Then add ${c} more.`;
  if (d === 3) return typed(prompt, a + b + c, hint);
  return num(prompt, a + b + c, hint, { min: 1, max: 20, extra: [a + b, b + c, a + b + c + 1] });
};

/** Add three numbers, shown as a number sentence. */
const threeEquation: Maker = (d) => {
  const [a, b, c] = three(d === 1 ? 12 : 20);
  return num("Add all three numbers.", a + b + c, `Add two first: ${a} + ${b} = ${a + b}. Then add ${c}.`, { min: 1, max: 20, extra: [a + b, a + c], visual: eq(`${a} + ${b} + ${c} = ?`) });
};

/** Find the two numbers that make 10 first. */
const makeTenFirst: Maker = () => {
  const a = randInt(1, 9);
  const b = 10 - a;
  let c = randInt(1, 9);
  while (c === b || c === a || a + c === 10 || b + c === 10) c = randInt(1, 9);
  const [x, y, z] = shuffle([a, b, c]);
  const pair = (p: number, q: number) => `${p} + ${q}`;
  const right = [x, y, z].filter((n) => n === a || n === b);
  const others = [pair(x, y), pair(x, z), pair(y, z)].filter((t) => t !== pair(right[0], right[1]));
  return pickOne(`${x} + ${y} + ${z}. Which two make 10?`, pair(right[0], right[1]), others, "Look for two numbers that make 10, like 6 and 4. Add them first.");
};

/** Which number is missing from a story with three parts. */
const missingPart: Maker = () => {
  const [a, b, c] = three(18);
  const who = someone();
  return num(`${who} has ${a + b + c} toys: ${a} cars, ${b} balls and some blocks. How many blocks?`, c, `${a} + ${b} = ${a + b}. Count on from ${a + b} to ${a + b + c}.`, { min: 0, max: 20, extra: [a + b, a + b + c] });
};

export const UNITS: Unit[] = [
  mathUnit({
    id: "ny-g1-add-three",
    title: "Add Three Numbers",
    emoji: "➕",
    blurb: "Three numbers, one total",
    parentNote: "Word problems that add three numbers with a total up to 20. Children add two numbers first, often two that make 10, then add the third.",
    codes: "NY-1.OA.2",
    text: "solving word problems that add three whole numbers with a sum up to 20",
    makers: [threeStory, threeStory, threeEquation, makeTenFirst, missingPart],
  }),
  mathUnit({
    id: "ny-g1-coins",
    title: "Coins & Cents",
    emoji: "🪙",
    blurb: "Name coins and count cents",
    parentNote: "US coins: naming the penny, nickel, dime and quarter, knowing what each is worth, writing cents with the ¢ sign, and counting a mix of dimes and pennies up to 100¢.",
    codes: "NY-1.MD.3b; NY-1.MD.3c",
    text: "naming coins and their values, using the ¢ sign, and counting a mix of dimes and pennies up to 100 cents",
    makers: [nameCoin, coinValue, worthMost, countMix, countDimes, coinStory, howManyMake, centSign],
  }),
];
