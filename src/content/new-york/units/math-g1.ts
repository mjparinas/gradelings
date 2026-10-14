import { pick, randInt, sample } from "../../random";
import type { Unit } from "../../types";
import { type Maker, num, pickOne, someone, typed } from "../../washington/units/math-kit";
import { COIN, COINS, COIN_LOOK, cents, mathUnit, usd } from "./math-kit";

// New York's own Grade 1 math unit: coins (NY-1.MD.3b, 3c). Children name the penny, nickel, dime and quarter, know what
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

export const UNITS: Unit[] = [
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
