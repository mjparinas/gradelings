import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { COIN, COINS_OF, choose, makerUnit, money, moneyChoice, pick, randInt, sample, usd, type Maker } from "./math-kit";

// Texas Grade 1 math written for Texas: US coins and their values (1.4) and personal financial literacy (1.9).

const ALL = [1, 5, 10, 25];
const opt = (c: number) => ({ label: COIN[c], coin: c });

const coinValue: Maker = (d) => {
  const c = pick(d === 1 ? [1, 5, 10] : ALL);
  return moneyChoice("How much is this coin worth?", c, `This is a ${COIN[c]}. A penny is 1¢, a nickel 5¢, a dime 10¢ and a quarter 25¢.`, ALL, [c]);
};

const nameForValue: Maker = () => {
  const c = pick(ALL);
  return usd(choose(`Which coin is worth ${money(c)}?`, opt(c), ALL.filter((x) => x !== c).map(opt), "A penny is 1¢, a nickel 5¢, a dime 10¢ and a quarter 25¢."));
};

const worthMost: Maker = () => {
  const coins = sample(ALL, 3);
  const top = Math.max(...coins);
  return usd(choose("Which coin is worth the most?", opt(top), coins.filter((c) => c !== top).map(opt), "Size can fool you. A dime is small, but it is worth 10¢."));
};

/** A group of one kind of coin, counted by 1s, 5s or 10s. */
const countSame: Maker = (d) => {
  const c = pick([1, 5, 10]);
  const n = c === 1 ? randInt(3, 9) : randInt(2, d === 1 ? 5 : 9);
  const total = c * n;
  return moneyChoice(`How much money is this?`, total, `Count by ${c === 1 ? "1s" : `${c}s`}: ${Array.from({ length: n }, (_, i) => (i + 1) * c).join(", ")}.`, [total + c, total - c, n, total + 10], Array(n).fill(c));
};

/** Dimes, then nickels, then pennies: count on by 10s, then 5s, then 1s. */
const countMixed: Maker = (d) => {
  const dimes = randInt(1, d === 3 ? 5 : 3);
  const nickels = randInt(0, d === 1 ? 1 : 2);
  const pennies = randInt(1, d === 1 ? 3 : 4);
  const coins = [...Array(dimes).fill(10), ...Array(nickels).fill(5), ...Array(pennies).fill(1)];
  const total = dimes * 10 + nickels * 5 + pennies;
  return moneyChoice("How much money is this?", total, "Count the dimes by 10s, then the nickels by 5s, then the pennies by 1s.", [total + 1, total - 1, total + 5, total + 10, dimes + nickels + pennies], coins);
};

const howMany: Maker = () => {
  const [small, big, n] = pick([
    [1, 5, 5],
    [1, 10, 10],
    [5, 10, 2],
    [5, 25, 5],
    [1, 25, 25],
  ] as const);
  return usd(
    choose(
      `How many ${COINS_OF[small]} make one ${COIN[big]}?`,
      String(n),
      [...new Set([n + 1, n - 1, n * 2, big].filter((x) => x > 0 && x !== n))].slice(0, 3).map(String),
      `A ${COIN[big]} is ${big}¢. Count by ${small === 1 ? "1s" : "5s"} until you reach ${big}.`,
    ),
  );
};

const coinStory: Maker = () => {
  const who = pick(["Ava", "Omar", "Lily", "Mateo", "Zara", "Ben"]);
  const c = pick([5, 10]);
  const n = randInt(2, 6);
  const total = c * n;
  return moneyChoice(`${who} has ${n} ${COINS_OF[c]}. How much money is that?`, total, `Count by ${c}s ${n} times.`, [total + c, total - c, n, total + 1]);
};

export const coinsG1: Unit = makerUnit({
  id: "tx-g1-coins",
  title: "Coin Values",
  emoji: "🪙",
  blurb: "Coin values and counting coins",
  parentNote: "Your child names US coins by value, writes amounts with the cent sign (25¢), and counts groups of pennies, nickels and dimes by 1s, 5s and 10s.",
  standards: ["1.4(A); 1.4(B); 1.4(C)", "US coins and their values, the cent sign, and counting pennies, nickels and dimes by 1s, 5s and 10s"],
  makers: [coinValue, nameForValue, worthMost, countSame, countMixed, howMany, coinStory],
});

const MONEY_ITEMS: Q[] = [
  ["Money you get for doing a job is called…", "income", ["a gift", "a bill", "a coin jar"], "Income is money earned by working."],
  ["Sam gets paid for mowing a lawn. What is that money?", "income", ["a gift", "a loan"], "Money earned by working is income."],
  ["What can people use income for?", "to buy things they need and want", ["to make the sun shine", "to stop the rain", "to grow taller"], "Income pays for goods and services."],
  ["A haircut is something someone does for you. It is a…", "service", ["good"], "A service is work someone does for you."],
  ["A loaf of bread is something you can hold and buy. It is a…", "good", ["service"], "Goods are things you can touch and buy."],
  ["Which is a service?", "a doctor checking you", ["a pencil", "an apple", "a ball"], "A service is a job someone does for you."],
  ["Which is a good?", "a backpack", ["a car wash", "a haircut", "a music lesson"], "A good is a thing you can buy and hold."],
  ["Rosa has $5. She needs lunch and wants a toy. What should she buy first?", "lunch", ["the toy"], "Needs come before wants."],
  ["Which is a need?", "shoes that fit", ["a sticker book", "a toy boat", "a candy bar"], "We need shoes to keep our feet safe."],
  ["Which is a want?", "a toy drone", ["water", "food", "a warm coat"], "A want is nice to have but not needed."],
  ["You put your money in a piggy bank to use later. You are…", "saving", ["spending"], "Saving means keeping money for later."],
  ["You use your money to buy a snack. You are…", "spending", ["saving"], "Spending means using money to buy something."],
  ["Eli keeps $1 every week for a bike. Is he spending or saving?", "saving", ["spending"], "He keeps the money for later. That is saving."],
  ["Kim buys a book at the fair. Is she spending or saving?", "spending", ["saving"], "She used money to buy something. That is spending."],
  ["Why might you save money?", "to buy something bigger later", ["to lose it", "to throw it away", "to forget about it"], "Saving helps you buy bigger things later."],
  ["Where is a safe place to save money?", "a bank", ["under a rug", "in a sandbox", "in your shoe"], "A bank keeps money safe."],
  ["Giving money to help people in need is called…", "charitable giving", ["spending", "earning", "borrowing"], "Charitable giving means giving to help others."],
  ["Which is an example of charitable giving?", "giving to a food bank", ["buying a game", "saving for a bike", "getting paid"], "A food bank helps people who need food."],
  ["Noah gives $1 to help an animal shelter. What is he doing?", "giving to charity", ["earning income", "saving", "borrowing"], "Giving to help others is charitable giving."],
  ["Which helps other people?", "donating old clothes", ["hiding toys", "spending all your money", "taking a nap"], "Donating means giving to help others."],
  ["Your class collects cans for a food drive. This is…", "giving", ["spending", "earning"], "A food drive gives food to people who need it."],
  ["Who earns income?", "a worker who gets paid", ["a baby", "a pet dog", "a toy"], "People earn income by working."],
  ["Ty has 10¢. A pencil costs 10¢ and an eraser costs 10¢. How many can he buy?", "1", ["2", "3"], "He has only enough for one thing. He must choose.", true],
  ["You have $3. You save $1. How many dollars can you spend?", "$2", ["$1", "$3", "$4"], "3 − 1 = 2.", true],
  ["Jo saves 5¢ each day for 3 days. How much does she save?", "15¢", ["5¢", "10¢", "20¢"], "Count by 5s: 5, 10, 15.", true],
  ["Why do people sometimes choose between a want and a need?", "money is limited", ["money never runs out", "needs are free", "wants are free"], "We can't buy everything, so we choose.", true],
];

export const moneyG1: Unit = bankUnit({
  id: "tx-g1-spend-save-give",
  title: "Spend, Save & Give",
  emoji: "🐷",
  blurb: "Income, spending, saving and giving",
  parentNote: "Personal financial literacy: your child learns that income is money earned, that people use it for goods and services and choose between wants and needs, tells spending from saving, and thinks about giving to help others.",
  standards: ["1.9(A); 1.9(B); 1.9(C); 1.9(D)", "income, goods and services, wants and needs, spending and saving, and charitable giving"],
  items: MONEY_ITEMS,
});

export const MATH_G1: Unit[] = [coinsG1, moneyG1];
