import { pick, randInt, sample } from "../../random";
import type { Unit } from "../../types";
import { type Maker, num, pickOne, someone } from "../../washington/units/math-kit";
import { COIN, COIN_LOOK, cents, mathUnit, usd } from "./math-kit";

// New York's own Kindergarten math unit: exploring coins (NY-K.MD.4). Children meet the penny, nickel, dime and quarter,
// and begin to tell pennies and dimes apart. Counting pennies also practises adding and taking away within 10
// (NY-K.OA.1 names pennies as one way to show addition).

const ALL = [1, 5, 10, 25];

/** What is this coin called? The hard level uses coins that look alike. */
const nameCoin: Maker = (d) => {
  const c = d === 1 ? pick([1, 10]) : pick(ALL);
  const others = d === 3 && c !== 1 ? ALL.filter((x) => x !== c && x !== 1) : sample(ALL.filter((x) => x !== c), 2);
  return usd(pickOne("What is this coin called?", COIN[c], others.map((o) => COIN[o]), COIN_LOOK[c], { type: "coins", coins: [c], currency: "USD" }));
};

/** Pennies or dimes: which coin is worth 1¢, which is worth 10¢. */
const pennyOrDime: Maker = (d) => {
  const c = pick([1, 10]);
  const others = d === 1 ? [c === 1 ? 10 : 1] : sample(ALL.filter((x) => x !== c), 2);
  const opt = (x: number) => ({ label: COIN[x], coin: x });
  return usd(pickOne(`Which coin is worth ${cents(c)}?`, opt(c), others.map(opt), c === 1 ? "A penny is worth 1 cent." : "A dime is worth 10 cents, even though it is small."));
};

/** Size and look: the smallest coin, the biggest coin, the coin that is not silver. */
const lookOfCoins: Maker = () => {
  const kind = pick(["smallest", "biggest", "not silver"] as const);
  const opt = (x: number) => ({ label: COIN[x], coin: x });
  if (kind === "smallest") return usd(pickOne("Which coin is the smallest?", opt(10), sample([1, 5, 25], 2).map(opt), "The dime is the smallest coin."));
  if (kind === "biggest") return usd(pickOne("Which coin is the biggest?", opt(25), sample([1, 5, 10], 2).map(opt), "The quarter is the biggest of these coins."));
  return usd(pickOne("Which coin is not silver?", opt(1), sample([5, 10, 25], 2).map(opt), "The penny is a brown, copper coin. The others are silver."));
};

/** Count a row of pennies. */
const countPennies: Maker = (d) => {
  const n = d === 1 ? randInt(2, 5) : randInt(4, 10);
  return usd(num("Count the pennies. How many cents?", n, "Each penny is 1 cent. Touch each penny as you count.", { min: 1, label: cents, visual: { type: "coins", coins: Array(n).fill(1), currency: "USD" } }));
};

/** Adding or taking away pennies within 10. */
const pennyStory: Maker = (d) => {
  const who = someone();
  if (d > 1 && pick([true, false])) {
    const have = randInt(4, 10);
    const spend = randInt(1, have - 1);
    return usd(num(`${who} has ${have} pennies and gives away ${spend}. How many are left?`, have - spend, `Start with ${have}. Count back ${spend}.`, { min: 0, max: 10, extra: [have + spend, have] }));
  }
  const a = randInt(1, d === 1 ? 4 : 6);
  const b = randInt(1, (d === 1 ? 5 : 10) - a);
  return usd(num(`${who} has ${a} pennies and finds ${b} more. How many now?`, a + b, `Start with ${a}. Count on ${b} more.`, { min: 1, max: 10, extra: [Math.abs(a - b)] }));
};

/** Pennies and a dime: 10 pennies are worth the same as one dime. */
const pennyDime: Maker = (d) => {
  if (d === 1) return usd(num("How many pennies make one dime?", 10, "A dime is worth 10 cents. A penny is 1 cent. So 10 pennies make a dime.", { extra: [1, 5, 2] }));
  const n = pick([2, 3, 4, 5, 6, 7, 8, 9, 10]);
  const hint = "A dime is worth 10 cents. Each penny is 1 cent, so count the pennies and compare with 10.";
  if (n === 10) return usd(pickOne("Which is worth more: 1 dime or 10 pennies?", "they are the same", ["1 dime", "10 pennies"], hint));
  return usd(pickOne(`Which is worth more: 1 dime or ${n} pennies?`, "1 dime", [`${n} pennies`, "they are the same"], hint));
};

export const UNITS: Unit[] = [
  mathUnit({
    id: "ny-k-coins",
    title: "Pennies & Dimes",
    emoji: "🪙",
    blurb: "Meet the coins",
    parentNote: "Meeting US coins: the penny, nickel, dime and quarter, with a focus on telling pennies from dimes, and counting pennies to add and take away within 10. Values come next year.",
    codes: "NY-K.MD.4; NY-K.OA.1",
    text: "exploring coins and beginning to tell pennies and dimes apart, and showing adding and taking away with pennies",
    makers: [nameCoin, pennyOrDime, lookOfCoins, countPennies, pennyStory, pennyDime],
  }),
];
