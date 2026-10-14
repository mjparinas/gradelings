import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { COIN, choose, makerUnit, pick, sample, usd, type Maker } from "./math-kit";

// Texas Kindergarten math written for Texas: naming US coins (K.4) and personal financial literacy (K.9).

const ALL = [1, 5, 10, 25];
/** Coins from smallest to biggest in size: a dime is the smallest, a quarter the biggest. */
const BY_SIZE = [10, 1, 5, 25];
const opt = (c: number) => ({ label: COIN[c], coin: c });

const nameCoin: Maker = (d) => {
  const c = pick(d === 1 ? [1, 25] : ALL);
  return usd({
    ...choose("What is this coin called?", COIN[c], ALL.filter((x) => x !== c).map((x) => COIN[x]), `Look at its size and its color. This one is a ${COIN[c]}.`),
    visual: { type: "coins", coins: [c], currency: "USD" },
  });
};

const bySize: Maker = () => {
  const coins = sample(ALL, 3);
  const ranked = [...coins].sort((a, b) => BY_SIZE.indexOf(a) - BY_SIZE.indexOf(b));
  const biggest = pick([true, false]);
  const right = biggest ? ranked[2] : ranked[0];
  return usd(
    choose(
      `Which coin is the ${biggest ? "biggest" : "smallest"}?`,
      opt(right),
      coins.filter((c) => c !== right).map(opt),
      biggest ? "The quarter is the biggest coin. Then the nickel, the penny and the dime." : "The dime is the smallest coin, even smaller than the penny.",
    ),
  );
};

const FACES: { coin: number; who: string }[] = [
  { coin: 1, who: "Abraham Lincoln" },
  { coin: 5, who: "Thomas Jefferson" },
  { coin: 10, who: "Franklin Roosevelt" },
  { coin: 25, who: "George Washington" },
];

const whoIsOn: Maker = () => {
  const f = pick(FACES);
  return usd(choose(`Which coin has ${f.who} on it?`, opt(f.coin), ALL.filter((c) => c !== f.coin).slice(0, 3).map(opt), `${f.who} is on the ${COIN[f.coin]}.`));
};

const copper: Maker = () =>
  usd(choose("Which coin is brown, not silver?", opt(1), sample([5, 10, 25], 3).map(opt), "The penny is the brown coin. The nickel, dime and quarter are silver."));

const COIN_ITEMS: Q[] = [
  ["What do people use coins for?", "to pay for things", ["to plant seeds", "to tell time", "to draw pictures"], "Coins are money. We pay for things with money."],
  ["Which one is money?", "a quarter", ["a button", "a bottle cap", "a sticker"], "A quarter is a coin. Coins are money."],
  ["How many cents is a penny worth?", "1 cent", ["5 cents", "10 cents", "25 cents"], "A penny is worth 1 cent."],
  ["Which coin is silver and the smallest?", "dime", ["quarter", "nickel", "penny"], "The dime is small and silver."],
  ["Which coin is silver and the biggest?", "quarter", ["dime", "nickel", "penny"], "The quarter is the biggest coin."],
  ["A coin is brown. Which coin is it?", "penny", ["nickel", "dime", "quarter"], "Pennies are brown. The other coins are silver."],
  ["At a store, what do we give to get a snack?", "money", ["a hug", "a picture", "a song"], "We pay money at a store."],
  ["Which coin has smooth edges, a dime or a nickel?", "nickel", ["dime"], "A dime has bumpy edges. A nickel is smooth."],
  ["How many cents is a quarter worth?", "25 cents", ["1 cent", "5 cents", "10 cents"], "A quarter is worth 25 cents.", true],
  ["How many cents is a dime worth?", "10 cents", ["1 cent", "5 cents", "25 cents"], "A dime is worth 10 cents.", true],
  ["How many cents is a nickel worth?", "5 cents", ["1 cent", "10 cents", "25 cents"], "A nickel is worth 5 cents.", true],
];

export const coinsK: Unit = makerUnit({
  id: "tx-k-coins",
  title: "Coins",
  emoji: "🪙",
  blurb: "Name pennies, nickels, dimes and quarters",
  parentNote: "Your child names the four US coins (penny, nickel, dime and quarter) by how they look, and learns that coins are money we use to pay for things.",
  standards: ["K.4", "naming US coins, including pennies, nickels, dimes and quarters"],
  makers: [nameCoin, nameCoin, bySize, whoIsOn, copper],
  items: COIN_ITEMS,
  nItems: 3,
});

const MONEY_ITEMS: Q[] = [
  ["How do grown-ups get money to buy food?", "by working at a job", ["by sleeping", "by watching TV", "by playing tag"], "People earn money when they work."],
  ["Money you earn by working is called…", "income", ["a gift", "a toy", "a chore chart"], "Income is money people earn by working."],
  ["Grandma gives you a dollar for your birthday. Is it income or a gift?", "a gift", ["income"], "Money you did not work for is a gift."],
  ["Mia walks the neighbor's dog and gets paid. Is it income or a gift?", "income", ["a gift"], "Money you earn by doing work is income."],
  ["Leo gets money in a birthday card. Is it income or a gift?", "a gift", ["income"], "A birthday card with money is a gift."],
  ["Dad gets paid for fixing cars. Is that income or a gift?", "income", ["a gift"], "Pay for a job is income."],
  ["Which is a way to earn money?", "working at a store", ["eating lunch", "taking a nap", "reading a book for fun"], "You earn money by doing a job."],
  ["Which is a way to earn money?", "selling lemonade", ["riding a bike", "brushing your teeth", "drawing for fun"], "Selling something you made can earn money."],
  ["Which is a need?", "food", ["a toy robot", "candy", "a new game"], "A need is something we must have to live."],
  ["Which is a need?", "a coat in winter", ["a balloon", "stickers", "a toy car"], "We need clothes to stay warm."],
  ["Which is a need?", "water", ["soda", "a kite", "a doll"], "Water is something we must have."],
  ["Which is a need?", "a home", ["a trampoline", "a video game", "a puppet"], "We need a safe place to live."],
  ["Which is a want?", "a new toy", ["food", "water", "a home"], "A want is nice to have, but we can live without it."],
  ["Which is a want?", "ice cream", ["water", "a bed", "warm clothes"], "Ice cream is a treat. It is a want."],
  ["Which is a want?", "a bigger TV", ["food", "a doctor", "shoes"], "We can live without a bigger TV, so it is a want."],
  ["Is a toothbrush a need or a want?", "a need", ["a want"], "We need to keep our teeth clean and healthy."],
  ["Is a toy truck a need or a want?", "a want", ["a need"], "We can live without a toy truck, so it is a want."],
  ["What does a cook need to know?", "how to make food", ["how to fly a plane", "how to fix teeth", "how to drive a bus"], "A cook makes food, so a cook needs to know how to cook."],
  ["What does a bus driver need to know?", "how to drive safely", ["how to bake bread", "how to paint walls", "how to sew"], "A bus driver must drive safely."],
  ["What does a nurse need to know?", "how to help sick people", ["how to fix cars", "how to grow corn", "how to build roads"], "Nurses take care of sick people."],
  ["Which job needs someone who is good at counting money?", "a cashier", ["a dancer", "a painter", "a gardener"], "A cashier counts money at a store."],
  ["Which skill helps at almost every job?", "listening carefully", ["yelling", "being late", "giving up"], "Good workers listen and try their best."],
  ["What can income help a family buy?", "food and clothes", ["sunshine", "rain", "the moon"], "Families use income to pay for needs and wants."],
  ["What should a family buy first?", "needs", ["wants"], "Needs come first. Wants can wait.", true],
  ["Ana earns $5 raking leaves. Grandpa gives her $2. How much was income?", "$5", ["$2", "$7"], "She earned $5 by working. The $2 was a gift.", true],
  ["Why do people work at jobs?", "to earn income", ["to get gifts", "to stay home", "to stop learning"], "Working at a job earns income.", true],
  ["A farmer grows food to sell. What skill does a farmer need?", "taking care of plants", ["playing drums", "flying planes", "fixing teeth"], "Farmers grow plants, so they need to care for them.", true],
];

export const moneyK: Unit = bankUnit({
  id: "tx-k-earn-and-need",
  title: "Work, Wants & Needs",
  emoji: "🧺",
  blurb: "Earning money, gifts, wants and needs",
  parentNote: "Personal financial literacy: your child learns that people earn income by working, tells income from gifts, names skills that jobs need, and sorts wants from needs.",
  standards: ["K.9(A); K.9(B); K.9(C); K.9(D)", "ways to earn income, income and gifts, job skills, and wants and needs"],
  items: MONEY_ITEMS,
});

export const MATH_K: Unit[] = [coinsK, moneyK];
