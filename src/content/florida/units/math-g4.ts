import { pick, randInt, shuffle } from "../../random";
import type { Unit } from "../../types";
import { frac, mathUnit, mixed, num, pickOne, someone, sp, typed, eq, type Maker } from "./math-kit";

// Florida's own Grade 4 math units (`fl-` ids): reading and writing numbers to 1,000,000, tenths and hundredths more
// or less, and estimating (MA.4.NSO.1.2, 2.5, 2.6); fractions in stories, tenths plus hundredths, and a fraction times
// a whole number (MA.4.FR.2.3, 2.4, MA.4.AR.1.2, 1.3); and money, distance and time problems (MA.4.M.2.1, 2.2).

const ONES = ["", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine"];
const TEENS = ["ten", "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen"];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

function below1000(n: number): string {
  const h = Math.floor(n / 100);
  const r = n % 100;
  const parts: string[] = [];
  if (h) parts.push(`${ONES[h]} hundred`);
  if (r >= 20) parts.push(TENS[Math.floor(r / 10)] + (r % 10 ? `-${ONES[r % 10]}` : ""));
  else if (r >= 10) parts.push(TEENS[r - 10]);
  else if (r) parts.push(ONES[r]);
  return parts.join(" ");
}

/** A number from 1,000 to 999,999 in words. */
function words(n: number): string {
  const t = Math.floor(n / 1000);
  const r = n % 1000;
  return [`${below1000(t)} thousand`, r ? below1000(r) : ""].filter(Boolean).join(" ");
}

/** A six-digit number with no zero digits in the tens, ones and hundreds, so wrong answers stay clear. */
const bigNumber = (min: number, max: number) => {
  for (;;) {
    const n = randInt(min, max);
    if (n % 1000 !== 0 && n % 10 !== 0) return n;
  }
};

const expandedOf = (n: number) =>
  String(n)
    .split("")
    .map((digit, i, all) => [Number(digit) * 10 ** (all.length - 1 - i)] as const)
    .filter(([v]) => v > 0)
    .map(([v]) => sp(v))
    .join(" + ");

const toWords: Maker = (d) => {
  const n = bigNumber(d === 1 ? 1100 : 10000, d === 1 ? 9999 : 999999);
  const wrong = [n + 1000, n - 1000, n + 100, n - 10].filter((x) => x > 999 && x < 1000000 && x !== n);
  return pickOne(`Which number is ${words(n)}?`, sp(n), shuffle(wrong).slice(0, 3).map(sp), "Read the thousands part first, then the rest.");
};

const toStandard: Maker = (d) => {
  const n = bigNumber(d === 1 ? 1100 : 10000, d === 1 ? 9999 : 999999);
  const wrong = [n + 1000, n - 1000, n + 10, n - 100].filter((x) => x > 999 && x < 1000000 && x !== n);
  return pickOne(`Which is the word form of ${sp(n)}?`, words(n), shuffle(wrong).slice(0, 3).map(words), "Say the thousands, then the hundreds, tens and ones.");
};

const expanded: Maker = (d) => {
  const n = bigNumber(d === 1 ? 1100 : 10000, d === 1 ? 9999 : 999999);
  const wrong = [n + 10, n - 100, n + 1000, n + 1].filter((x) => x > 999 && x < 1000000 && x !== n);
  return pickOne(`Which number is ${expandedOf(n)}?`, sp(n), shuffle(wrong).slice(0, 3).map(sp), "Add the parts to build the number.");
};

const tenthMore: Maker = (d) => {
  const hundredth = d !== 1 && randInt(0, 1) === 1;
  const step = hundredth ? 0.01 : 0.1;
  const places = hundredth ? 2 : 1;
  const start = hundredth ? randInt(110, 9890) / 100 : randInt(11, 989) / 10;
  const more = randInt(0, 1) === 1;
  const sign = more ? 1 : -1;
  const at = (x: number) => (Math.round(x * 100) / 100).toFixed(places);
  const right = at(start + sign * step);
  const wrong = [start - sign * step, start + sign * step * 10, start + sign * step * 2].map(at).filter((x) => x !== right);
  return pickOne(`What is ${hundredth ? "one-hundredth" : "one-tenth"} ${more ? "more" : "less"} than ${at(start)}?`, right, wrong, `${more ? "Add" : "Subtract"} ${step} ${more ? "to" : "from"} ${at(start)}.`);
};

const estimateProduct: Maker = (d) => {
  const a = randInt(12, d === 1 ? 49 : 98);
  const b = randInt(12, d === 1 ? 49 : 98);
  const r = (x: number) => Math.round(x / 10) * 10;
  const est = r(a) * r(b);
  return num(`Round each number to the nearest ten to estimate ${a} × ${b}.`, est, `${a} is about ${r(a)} and ${b} is about ${r(b)}. ${r(a)} × ${r(b)} = ${est}.`, { step: 100, min: 100, label: sp, extra: [r(a) + r(b)] });
};

const estimateQuotient: Maker = (d) => {
  const q = randInt(4, 9);
  const k = randInt(3, d === 1 ? 6 : 9);
  const total = q * k * 100 + randInt(11, 49);
  return num(`About how much is ${sp(total)} ÷ ${k}? Round ${sp(total)} to the nearest hundred first.`, q * 100, `${sp(total)} is about ${sp(q * k * 100)}. ${sp(q * k * 100)} ÷ ${k} = ${q * 100}.`, { step: 100, min: 100, label: sp });
};

const BIG_NUMBERS = mathUnit({
  id: "fl-g4-big-numbers",
  title: "Big Numbers & Estimates",
  emoji: "🔟",
  blurb: "Read, write and estimate",
  parentNote:
    "Practises Florida's B.E.S.T. benchmarks MA.4.NSO.1.2, MA.4.NSO.2.5 and MA.4.NSO.2.6: reading and writing whole numbers to 1,000,000 in standard, word and expanded form, finding one-tenth or one-hundredth more or less than a decimal, and estimating products and quotients by rounding. Read big numbers on signs and in the news together.",
  codes: "MA.4.NSO.1.2; MA.4.NSO.2.5; MA.4.NSO.2.6",
  text: "reading and writing whole numbers to 1,000,000, tenths and hundredths more or less, and estimating with rounding",
  makers: [toWords, toStandard, expanded, tenthMore, estimateProduct, estimateQuotient, tenthMore],
});

const likeStory: Maker = () => {
  const den = pick([3, 4, 5, 6, 8, 10]);
  const a = randInt(den + 1, den * 2 - 1);
  const b = randInt(1, den - 1);
  const who = someone();
  const add = randInt(0, 1) === 1;
  const total = add ? a + b : a - b;
  const unit = pick(["pounds of apples", "cups of flour", "yards of ribbon", "gallons of water"]);
  const text = add
    ? `${who} used ${mixed(a, den)} ${unit} on Monday and ${frac(b, den)} more on Tuesday. How much in all?`
    : `${who} had ${mixed(a, den)} ${unit} and used ${frac(b, den)}. How much is left?`;
  const wrong = [add ? a - b : a + b, add ? a + b + den : a - b + den, a + b + 1, a - b + 1].filter((x) => x > 0 && x !== total).map((x) => mixed(x, den));
  return pickOne(text, mixed(total, den), [...new Set(wrong)].filter((x) => x !== mixed(total, den)).slice(0, 3), `Add or subtract the numerators and keep the denominator ${den}. ${a} ${add ? "+" : "−"} ${b} = ${total}, so ${mixed(total, den)}.`);
};

const tenthsPlusHundredths: Maker = () => {
  const t = randInt(1, 8);
  const h = randInt(1, 9);
  const total = t * 10 + h;
  return pickOne(`What is ${t}/10 + ${h}/100?`, `${total}/100`, [`${t + h}/110`, `${t + h}/100`, `${total}/10`], `Rewrite ${t}/10 as ${t * 10}/100. Then ${t * 10}/100 + ${h}/100 = ${total}/100.`, eq(`${t}/10 + ${h}/100`));
};

const timesWhole: Maker = (d) => {
  const den = pick([2, 3, 4, 5, 6, 8, 10]);
  const num_ = randInt(1, den - 1);
  const w = randInt(2, d === 1 ? 5 : 9);
  const right = mixed(num_ * w, den);
  const form = randInt(0, 1);
  const prompt = form ? `${w} × ${num_}/${den} = ?` : `${num_}/${den} × ${w} = ?`;
  const wrong = [mixed(num_ + w, den), mixed(num_ * w, den * w), mixed(w, den), `${num_ * w}`].filter((x) => x !== right);
  return pickOne(prompt, right, [...new Set(wrong)].slice(0, 3), `Multiply the numerator by ${w}: ${num_} × ${w} = ${num_ * w}. Keep the denominator ${den}.`);
};

const timesStory: Maker = (d) => {
  const den = pick([2, 3, 4, 5, 8]);
  const n = randInt(1, den - 1);
  const w = randInt(2, d === 1 ? 5 : 8);
  const who = someone();
  const right = mixed(n * w, den);
  const wrong = [mixed(n + w, den), mixed(n * w, den * 2), mixed(w, den)].filter((x) => x !== right);
  return pickOne(`${who} runs ${n}/${den} mile each day for ${w} days. How many miles in all?`, right, wrong, `${w} days × ${n}/${den} mile = ${n * w}/${den} mile.`);
};

const FRACTION_STORIES = mathUnit({
  id: "fl-g4-fraction-stories",
  title: "Fractions in Stories",
  emoji: "🍎",
  blurb: "Add, subtract and multiply fractions",
  parentNote:
    "Practises Florida's B.E.S.T. benchmarks MA.4.AR.1.2, MA.4.AR.1.3, MA.4.FR.2.3 and MA.4.FR.2.4: adding and subtracting fractions with the same denominator in word problems, adding tenths to hundredths, and multiplying a fraction by a whole number. Doubling or tripling a recipe is a natural way to practise.",
  codes: "MA.4.AR.1.2; MA.4.AR.1.3; MA.4.FR.2.3; MA.4.FR.2.4",
  text: "fraction word problems, tenths plus hundredths, and a fraction times a whole number",
  makers: [likeStory, tenthsPlusHundredths, timesWhole, timesStory, likeStory, timesWhole],
});

const money = (n: number) => `$${n.toFixed(2)}`;

const addMoney: Maker = (d) => {
  const a = randInt(150, d === 1 ? 600 : 1800) / 100;
  const b = randInt(120, d === 1 ? 500 : 1500) / 100;
  const total = Math.round((a + b) * 100) / 100;
  const prompt = `${someone()} buys a book for ${money(a)} and a pen for ${money(b)}. What is the total?`;
  const wrong = [total + 0.1, total - 0.1, Math.round((a + b + 1) * 100) / 100].map((x) => Math.round(x * 100) / 100);
  return pickOne(prompt, money(total), wrong.map(money), `Line up the decimal points and add: ${money(a)} + ${money(b)}.`);
};

const change: Maker = (d) => {
  const price = randInt(215, d === 1 ? 790 : 1890) / 100;
  const paid = Math.ceil(price / 5) * 5 + (randInt(0, 1) ? 5 : 0);
  const right = Math.round((paid - price) * 100) / 100;
  const prompt = `A snack costs ${money(price)}. ${someone()} pays with $${paid}. How much change?`;
  const wrong = [right + 1, right - 0.1, Math.round((paid + price) * 100) / 100].map((x) => Math.round(x * 100) / 100).filter((x) => x > 0 && x !== right);
  return pickOne(prompt, money(right), wrong.map(money), `Subtract: $${paid}.00 − ${money(price)}.`);
};

const time12 = (mins: number) => {
  const m = ((mins % 1440) + 1440) % 1440;
  const h24 = Math.floor(m / 60);
  const h = h24 % 12 === 0 ? 12 : h24 % 12;
  return `${h}:${String(m % 60).padStart(2, "0")} ${h24 < 12 ? "a.m." : "p.m."}`;
};

const endTime: Maker = (d) => {
  const start = randInt(84, 168) * 5;
  const h = randInt(1, d === 1 ? 2 : 3);
  const m = pick([10, 15, 20, 30, 40, 45]);
  const right = time12(start + h * 60 + m);
  const wrong = [start + h * 60 + m + 10, start + h * 60 - m, start + (h + 1) * 60 + m, start + h * 60 + m - 10].map(time12).filter((x) => x !== right);
  return pickOne(`A hike starts at ${time12(start)} and lasts ${h} h ${m} min. When does it end?`, right, [...new Set(wrong)].slice(0, 3), `Add ${h} hour${h > 1 ? "s" : ""} and ${m} minutes to ${time12(start)}.`);
};

const distance: Maker = (d) => {
  const a = randInt(12, d === 1 ? 40 : 120);
  const b = randInt(12, d === 1 ? 40 : 120);
  const c = randInt(5, Math.min(a + b - 1, 60));
  const prompt = `A bus drives ${a} miles, then ${b} miles. Then it drives ${c} miles back. How far from the start?`;
  return num(prompt, a + b - c, `${a} + ${b} = ${a + b}. Then ${a + b} − ${c} = ${a + b - c}.`, { min: 1, step: 5, extra: [a + b + c, a + b] });
};

const intervalTrip: Maker = (d) => {
  const speed = pick([10, 20, 30, 40, 50]);
  const hours = randInt(2, d === 1 ? 3 : 5);
  const extra = randInt(5, 30);
  return typed(`A car goes ${speed} miles each hour for ${hours} hours, then ${extra} more miles. How many miles in all?`, speed * hours + extra, `${speed} × ${hours} = ${speed * hours}. Add ${extra}.`);
};

const MONEY_TIME = mathUnit({
  id: "fl-g4-money-distance-time",
  title: "Money, Distance & Time",
  emoji: "⏰",
  blurb: "Solve real-world problems",
  parentNote:
    "Practises Florida's B.E.S.T. benchmarks MA.4.M.2.1 and MA.4.M.2.2: two-step problems about distances and time intervals, and adding and subtracting money with decimal notation. Ask your child to work out the total and change at the store.",
  codes: "MA.4.M.2.1; MA.4.M.2.2",
  text: "two-step distance and time problems, and adding and subtracting money with decimals",
  makers: [addMoney, change, endTime, distance, intervalTrip, addMoney, change],
});

export const UNITS: Unit[] = [BIG_NUMBERS, FRACTION_STORIES, MONEY_TIME];
/** Put the own units before the planned ones. */
export const FIRST = false;
