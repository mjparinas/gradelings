import { chance, pick, randInt, sample, shuffle } from "../../random";
import type { ChoiceQuestion, CoinsQuestion, SortQuestion, Visual } from "../../types";
import { type D, type Maker, eq, mathUnit, num, pickOne, someone, typed } from "./math-kit";

// Washington's own math units for Kindergarten to Grade 2: counting to 100, data, clocks, US money, inches and
// feet, arrays and adding within 1000. Shared BC and adopted units cover the rest (../plan/math.ts).

// ---------- Data (Kindergarten to Grade 2) ----------

const TOPICS: { title: string; items: [string, string][] }[] = [
  { title: "Our favourite fruit", items: [["apple", "🍎"], ["banana", "🍌"], ["grapes", "🍇"], ["orange", "🍊"]] },
  { title: "Our pets", items: [["dog", "🐶"], ["cat", "🐱"], ["fish", "🐟"], ["bird", "🐦"]] },
  { title: "How we get to school", items: [["walk", "🚶"], ["bus", "🚌"], ["car", "🚗"], ["bike", "🚲"]] },
  { title: "Our favourite weather", items: [["sunny", "☀️"], ["rainy", "🌧️"], ["snowy", "❄️"], ["windy", "🌬️"]] },
  { title: "Our favourite snack", items: [["crackers", "🍘"], ["carrots", "🥕"], ["cheese", "🧀"], ["popcorn", "🍿"]] },
  { title: "Bugs we saw", items: [["ant", "🐜"], ["bee", "🐝"], ["ladybug", "🐞"], ["butterfly", "🦋"]] },
];

/** A data set with distinct counts, so "most" and "fewest" have one answer. */
function dataSet(cats: number, maxCount: number) {
  const topic = pick(TOPICS);
  const items = sample(topic.items, cats);
  const counts = sample(Array.from({ length: maxCount }, (_, i) => i + 1), cats);
  return { title: topic.title, rows: items.map(([label, emoji], i) => ({ label, emoji, count: counts[i] })) };
}

const GOOD_QUESTIONS = [
  "Which snack does our class like best?",
  "How many of us walk to school?",
  "Which pet do most of us have?",
  "How many of us have a sister?",
  "Which game do we like to play at recess?",
  "How many of us lost a tooth this year?",
  "Which fruit do most of us like?",
];
const BAD_QUESTIONS = [
  "How far away is the moon?",
  "What will the weather be next year?",
  "How many fish are in the ocean?",
  "What is the name of the tallest tree on Earth?",
  "How many stars are in the sky?",
];

function dataMakers(grade: "k" | "1" | "2"): Maker[] {
  const cats = grade === "k" ? 3 : grade === "1" ? 3 : 4;
  const maxCount = grade === "k" ? 6 : grade === "1" ? 9 : 18;
  const graph = (d: { title: string; rows: { label: string; emoji: string; count: number }[] }): Visual =>
    grade === "2" ? { type: "bars", title: d.title, bars: d.rows.map((r) => ({ label: r.label, value: r.count, emoji: r.emoji })) } : { type: "pictograph", title: d.title, rows: d.rows };
  const option = (r: { label: string; emoji: string }) => ({ label: r.label, emoji: r.emoji });
  const most: Maker = () => {
    const d = dataSet(cats, maxCount);
    const top = [...d.rows].sort((a, b) => b.count - a.count)[0];
    return pickOne("Which has the most?", option(top), d.rows.filter((r) => r !== top).map(option), "Find the longest row. It has the most.", graph(d));
  };
  const fewest: Maker = () => {
    const d = dataSet(cats, maxCount);
    const low = [...d.rows].sort((a, b) => a.count - b.count)[0];
    return pickOne("Which has the fewest?", option(low), d.rows.filter((r) => r !== low).map(option), "Find the shortest row. It has the fewest.", graph(d));
  };
  const howMany: Maker = () => {
    const d = dataSet(cats, maxCount);
    const r = pick(d.rows);
    return num(`How many chose ${r.label}?`, r.count, `Count the ${r.emoji} in the ${r.label} row.`, { min: 0, max: maxCount + 3, visual: graph(d) });
  };
  const howManyMore: Maker = () => {
    const d = dataSet(cats, maxCount);
    const [a, b] = [...sample(d.rows, 2)].sort((x, y) => y.count - x.count);
    return num(`How many more chose ${a.label} than ${b.label}?`, a.count - b.count, `${a.label}: ${a.count}. ${b.label}: ${b.count}. ${a.count} − ${b.count} = ${a.count - b.count}.`, { min: 0, visual: graph(d) });
  };
  const total: Maker = () => {
    const d = dataSet(cats, maxCount);
    const sum = d.rows.reduce((s, r) => s + r.count, 0);
    return num("How many answers are there in all?", sum, `Add every row: ${d.rows.map((r) => r.count).join(" + ")} = ${sum}.`, { min: 1, visual: graph(d) });
  };
  const bothTogether: Maker = () => {
    const d = dataSet(cats, maxCount);
    const [a, b] = sample(d.rows, 2);
    return num(`How many chose ${a.label} or ${b.label}?`, a.count + b.count, `Put the two rows together: ${a.count} + ${b.count} = ${a.count + b.count}.`, { min: 1, visual: graph(d) });
  };
  const sameOrNot: Maker = () => {
    const d = dataSet(cats, maxCount);
    const [a, b] = sample(d.rows, 2);
    const more = a.count > b.count ? a : b;
    return pickOne(`Which has more: ${a.label} or ${b.label}?`, option(more), [option(more === a ? b : a)], "Compare the two rows. The longer row has more.", graph(d));
  };
  const goodQuestion: Maker = () =>
    pickOne(
      "Which question can we answer by asking our class?",
      pick(GOOD_QUESTIONS),
      sample(BAD_QUESTIONS, grade === "k" ? 2 : 3),
      "We can ask our classmates about themselves: their pets, snacks or games.",
    );
  const sortIt: Maker = () => sortQuestion();
  const makers: Maker[] = [most, fewest, howMany, sameOrNot, goodQuestion, sortIt];
  if (grade !== "k") makers.push(howManyMore, total);
  if (grade === "2") makers.push(bothTogether);
  return makers;
}

const SORTS = [
  { prompt: "Sort them: fly or swim?", bins: [["fly", "Flies", "🪽"], ["swim", "Swims", "🌊"]], items: [["bee", "🐝", "fly"], ["butterfly", "🦋", "fly"], ["bird", "🐦", "fly"], ["bat", "🦇", "fly"], ["fish", "🐟", "swim"], ["octopus", "🐙", "swim"], ["dolphin", "🐬", "swim"], ["whale", "🐳", "swim"]] },
  { prompt: "Sort them: food or toy?", bins: [["food", "Food", "🍽️"], ["toy", "Toy", "🧸"]], items: [["apple", "🍎", "food"], ["banana", "🍌", "food"], ["carrot", "🥕", "food"], ["bread", "🍞", "food"], ["ball", "⚽", "toy"], ["teddy bear", "🧸", "toy"], ["kite", "🪁", "toy"], ["yo-yo", "🪀", "toy"]] },
  { prompt: "Sort them: hot or cold?", bins: [["hot", "Hot", "🔥"], ["cold", "Cold", "🧊"]], items: [["sun", "☀️", "hot"], ["campfire", "🔥", "hot"], ["hot soup", "🍲", "hot"], ["snowman", "⛄", "cold"], ["ice", "🧊", "cold"], ["snowflake", "❄️", "cold"], ["ice cream", "🍦", "cold"]] },
] as const;

function sortQuestion(): SortQuestion {
  const set = pick(SORTS);
  const picked = set.bins.flatMap(([bin]) => sample(set.items.filter((i) => i[2] === bin), randInt(2, 3)));
  return {
    kind: "sort",
    prompt: set.prompt,
    hint: "Look at each picture and ask which group it belongs in.",
    bins: set.bins.map(([id, label, emoji]) => ({ id, label, emoji })),
    items: shuffle(picked).map(([label, emoji, bin]) => ({ id: label, label, emoji, bin })),
  };
}

// ---------- Kindergarten: count to 100 ----------

const countByTens: Maker = (d) => {
  const top = d === 1 ? 5 : 9;
  const start = randInt(0, top - 3);
  const seq = [start, start + 1, start + 2].map((t) => t * 10).filter((n) => n > 0);
  const next = (start + 3) * 10;
  return num(`Count by tens: ${seq.join(", ")}, ? What comes next?`, next, "Each jump adds one more ten.", { extra: [next + 1, next - 1, next + 10, next - 5], max: 100 });
};

const countOn: Maker = (d) => {
  const n = d === 1 ? randInt(3, 18) : d === 2 ? randInt(10, 49) : randInt(30, 98);
  return num(`Start at ${n}. Count on. What number comes next?`, n + 1, `Say ${n}, then the next number.`, { extra: [n - 1, n + 2, n + 10], min: 0 });
};

const countRun: Maker = (d) => {
  // Crossing a ten is the hard part, so harder sets end the run on a ten.
  const tens = d === 1 ? randInt(1, 2) : d === 2 ? randInt(2, 5) : randInt(5, 9);
  const end = d === 1 ? tens * 10 + randInt(3, 8) : tens * 10;
  const run = [end - 3, end - 2, end - 1];
  return num(`${run.join(", ")}, ? What number comes next?`, end, `Count on from ${run[2]}.`, { extra: [end + 1, end - 1, end + 9, end - 10], min: 0 });
};

const before: Maker = (d) => {
  const n = d === 1 ? randInt(2, 20) : d === 2 ? randInt(10, 60) : randInt(2, 10) * 10;
  return num(`What number comes just before ${n}?`, n - 1, `Count back one from ${n}.`, { extra: [n + 1, n - 2, n - 10], min: 0 });
};

const teenFrames: Maker = () => {
  const extra = randInt(1, 9);
  return num(`10 and ${extra} more. What number is that?`, 10 + extra, `Ten and ${extra} ones make ${10 + extra}.`, {
    extra: [extra, 10 + extra + 1, 10 + extra - 1, 20 + extra],
    min: 1,
    visual: { type: "tenFrame", filled: 10, extra },
  });
};

const teenSplit: Maker = () => {
  const n = randInt(11, 19);
  return num(`${n} is 10 and how many more?`, n - 10, `${n} is one ten and some ones. Count the ones: ${n - 10}.`, { extra: [n, n - 9, 10], min: 0, max: 19 });
};

const tensBlocks: Maker = (d) => {
  const tens = d === 1 ? randInt(1, 5) : randInt(1, 9);
  return num("What number do the blocks show?", tens * 10, "Each long block is ten. Count by tens.", { extra: [tens, tens * 10 + 10, tens * 10 - 10, tens + 10], min: 1, max: 100, visual: { type: "blocks", tens, ones: 0 } });
};

// ---------- Grade 1: clocks ----------

const clockLabel = (h: number, m: number) => `${h}:${String(m).padStart(2, "0")}`;
const nextHour = (h: number, k = 1) => ((h - 1 + k + 120) % 12) + 1;

function clockChoices(h: number, m: number, step: number, count: number): ChoiceQuestion {
  const right = clockLabel(h, m);
  const wrong = new Set<string>();
  const options = shuffle([
    clockLabel(nextHour(h), m),
    clockLabel(nextHour(h, -1), m),
    clockLabel(h, (m + step) % 60),
    clockLabel(h, (m + 60 - step) % 60),
    clockLabel(m === 0 ? 12 : Math.max(1, Math.min(12, m / 5)), h * 5 === 60 ? 0 : h * 5),
  ]);
  for (const o of options) if (o !== right && wrong.size < count - 1) wrong.add(o);
  return pickOne("What time is it?", right, [...wrong], "The short hand shows the hour. The long hand shows the minutes.", { type: "clock", hour: h, minute: m });
}

const readHalfHour: Maker = (d) => clockChoices(randInt(1, 12), d === 1 ? 0 : pick([0, 30]), 30, 4);

const handsSay: Maker = () => {
  const h = randInt(1, 12);
  return pickOne(`The long hand points to 12. The short hand points to ${h}. What time is it?`, clockLabel(h, 0), [clockLabel(h, 30), clockLabel(12, h * 5 === 60 ? 0 : h * 5), clockLabel(nextHour(h), 0)], "When the long hand is on 12, it is o'clock.");
};

const halfPast: Maker = () => {
  const h = randInt(1, 12);
  return pickOne(`What time is half past ${h}?`, clockLabel(h, 30), [clockLabel(h, 0), clockLabel(nextHour(h), 30), clockLabel(nextHour(h), 0)], `Half past means 30 minutes after ${h} o'clock.`);
};

const shortHand: Maker = () => {
  const h = randInt(1, 12);
  const half = chance(0.5);
  const right = half ? `Between ${h} and ${nextHour(h)}` : `On the ${h}`;
  const wrong = half ? [`On the ${h}`, `Between ${nextHour(h, -1)} and ${h}`] : [`Between ${h} and ${nextHour(h)}`, `On the 12`];
  return pickOne(`It is ${clockLabel(h, half ? 30 : 0)}. Where is the short hand?`, right, wrong, half ? "At half past, the short hand is halfway to the next number." : "At o'clock, the short hand points right at the hour.");
};

const hourLater: Maker = (d) => {
  const h = randInt(1, 12);
  const m = d === 3 ? pick([0, 30]) : 0;
  return pickOne(`It is ${clockLabel(h, m)}. What time will it be in 1 hour?`, clockLabel(nextHour(h), m), [clockLabel(nextHour(h, -1), m), clockLabel(h, (m + 30) % 60), clockLabel(nextHour(h, 2), m)], "One hour later, the hour goes up by one.");
};

const digitalMatch: Maker = (d) => {
  const h = randInt(1, 12);
  const m = d === 1 ? 0 : pick([0, 30]);
  return pickOne("Which clock time matches?", clockLabel(h, m), [clockLabel(h, m === 0 ? 30 : 0), clockLabel(nextHour(h), m), clockLabel(nextHour(h, -1), m)].slice(0, 3), "Read the short hand for the hour first.", { type: "clock", hour: h, minute: m });
};

// ---------- Grade 1: tens jumps ----------

const tenMore: Maker = (d) => {
  const n = d === 1 ? randInt(1, 8) * 10 + randInt(0, 9) : randInt(11, 89);
  return num(`What is 10 more than ${n}?`, n + 10, "Add one ten. The ones digit stays the same.", { extra: [n + 1, n + 11, n - 10, n + 100], min: 0, max: 199 });
};
const tenLess: Maker = (d) => {
  const n = d === 1 ? randInt(2, 9) * 10 + randInt(0, 9) : randInt(11, 99);
  return num(`What is 10 less than ${n}?`, n - 10, "Take away one ten. The ones digit stays the same.", { extra: [n - 1, n - 11, n + 10, n - 9], min: 0 });
};
const tensMinusTens: Maker = (d) => {
  const a = randInt(3, 9);
  const b = randInt(1, a - 1);
  const ask = `${a * 10} − ${b * 10} = ?`;
  return d === 3
    ? typed(`What is ${a * 10} − ${b * 10}?`, (a - b) * 10, `${a} tens take away ${b} tens is ${a - b} tens.`, { visual: eq(ask) })
    : num(`What is ${a * 10} − ${b * 10}?`, (a - b) * 10, `${a} tens take away ${b} tens is ${a - b} tens.`, { step: 10, extra: [a - b], min: 0, visual: eq(ask) });
};
const addOnes: Maker = (d) => {
  const ones = d === 1 ? randInt(0, 5) : randInt(2, 9);
  const t = randInt(1, 8);
  const a = t * 10 + ones;
  const b = d === 1 ? randInt(1, 9 - ones) : randInt(10 - ones, 9);
  const ask = `${a} + ${b} = ?`;
  return d === 3
    ? typed(`What is ${a} + ${b}?`, a + b, `Add the ones first: ${ones} + ${b} = ${ones + b}.`, { visual: eq(ask) })
    : num(`What is ${a} + ${b}?`, a + b, `Add the ones first: ${ones} + ${b} = ${ones + b}.`, { extra: [a + b + 10, a + b - 10, a + b - 1], visual: eq(ask) });
};
const addTens: Maker = () => {
  const a = randInt(11, 59);
  const b = randInt(1, Math.floor((99 - a) / 10)) * 10;
  return num(`What is ${a} + ${b}?`, a + b, `Add the tens: ${Math.floor(a / 10) * 10} + ${b}. Keep the ${a % 10} ones.`, { extra: [a + b / 10, a + b + 1, a + b - 10], visual: eq(`${a} + ${b} = ?`) });
};

// ---------- Grade 2: US money ----------

const COIN_NAME: Record<number, string> = { 1: "penny", 5: "nickel", 10: "dime", 25: "quarter" };
const PLURAL: Record<number, string> = { 1: "pennies", 5: "nickels", 10: "dimes", 25: "quarters" };
const cents = (c: number) => (c < 100 ? `${c}¢` : `$${(c / 100).toFixed(2)}`);
const centsQ = (q: ChoiceQuestion): ChoiceQuestion => ({ ...q, currency: "USD" });

function someCoins(d: D): number[] {
  const kinds = d === 1 ? [10, 5, 1] : [25, 10, 5, 1];
  const out: number[] = [];
  let total = 0;
  const n = d === 1 ? randInt(2, 4) : randInt(3, 6);
  for (let i = 0; i < n; i++) {
    const fits = kinds.filter((k) => total + k <= 99);
    if (!fits.length) break;
    const c = pick(fits);
    out.push(c);
    total += c;
  }
  if (d === 3 && chance(0.5)) out.unshift(100);
  return out.sort((a, b) => b - a);
}

const countCoins: Maker = (d) => {
  const coins = someCoins(d);
  const total = coins.reduce((s, c) => s + c, 0);
  return centsQ(
    num("How much money is this?", total, `Start with the biggest one and count on: ${coins.map(cents).join(", ")}.`, {
      extra: [total + 5, total - 5, total + 10, total - 1, total + 1],
      min: 1,
      label: cents,
      visual: { type: "coins", coins, currency: "USD" },
    }),
  );
};

const makeAmount: Maker = (d) => {
  const target = d === 1 ? randInt(2, 9) * 5 + randInt(0, 1) * 2 : d === 2 ? randInt(11, 95) : randInt(105, 190);
  const q: CoinsQuestion = {
    kind: "coins",
    prompt: `Make ${cents(target)}.`,
    hint: "Use the biggest coin that fits, then add smaller coins. A quarter is 25¢, a dime 10¢, a nickel 5¢, a penny 1¢.",
    target,
    coins: d === 3 ? [1, 5, 10, 25, 100] : [1, 5, 10, 25],
    currency: "USD",
  };
  return q;
};

const coinValue: Maker = () => {
  const c = pick([1, 5, 10, 25]);
  return centsQ(num(`How much is one ${COIN_NAME[c]} worth?`, c, "A penny is 1¢, a nickel 5¢, a dime 10¢ and a quarter 25¢.", { extra: [1, 5, 10, 25, 50], label: cents, min: 1 }));
};

const worthMost: Maker = () => {
  const coins = sample([1, 5, 10, 25], 3);
  const top = Math.max(...coins);
  const opt = (c: number) => ({ label: COIN_NAME[c], coin: c });
  return centsQ(pickOne("Which coin is worth the most?", opt(top), coins.filter((c) => c !== top).map(opt), "Size can fool you: a dime is small but worth more than a nickel or a penny."));
};

const howManyMake: Maker = () => {
  const [small, big, label] = pick([
    [1, 10, "a dime"],
    [1, 5, "a nickel"],
    [5, 10, "a dime"],
    [5, 25, "a quarter"],
    [25, 100, "one dollar"],
    [10, 100, "one dollar"],
    [5, 100, "one dollar"],
    [1, 25, "a quarter"],
  ] as const);
  return centsQ(num(`How many ${PLURAL[small]} make ${label}?`, big / small, `${label === "one dollar" ? "One dollar is 100¢" : `${label} is ${big}¢`}. Count by ${small}s to ${big}.`, { min: 1, extra: [big / small + 5, big / small - 1, big / small + 1] }));
};

const coinStory: Maker = (d) => {
  const kinds = sample(d === 1 ? [10, 5, 1] : [25, 10, 5, 1], 2).sort((a, b) => b - a);
  const counts = kinds.map(() => randInt(1, d === 1 ? 4 : 3));
  const total = kinds.reduce((s, k, i) => s + k * counts[i], 0);
  const who = someone();
  const part = (k: number, n: number) => `${n} ${n === 1 ? COIN_NAME[k] : PLURAL[k]}`;
  return centsQ(num(`${who} has ${part(kinds[0], counts[0])} and ${part(kinds[1], counts[1])}. How much money is that?`, total, `${part(kinds[0], counts[0])} = ${kinds[0] * counts[0]}¢. ${part(kinds[1], counts[1])} = ${kinds[1] * counts[1]}¢. Add them.`, { extra: [total + 5, total - 5, total + 10, counts[0] + counts[1]], min: 1, label: cents }));
};

const ITEMS = ["pencil", "eraser", "sticker", "apple", "bookmark", "pencil topper", "toy car", "bouncy ball"];
const spendCents: Maker = (d) => {
  const have = d === 1 ? pick([20, 30, 40, 50]) : pick([50, 75, 80, 90, 99]);
  const price = d === 1 ? randInt(1, have / 5 - 1) * 5 : randInt(5, have - 5);
  const who = someone();
  const item = pick(ITEMS);
  return d === 3
    ? { ...typed(`${who} has ${have}¢ and buys a ${item} for ${price}¢. How many cents are left?`, have - price, `${have} − ${price} = ?`, { suffix: "¢" }), currency: "USD" }
    : centsQ(num(`${who} has ${have}¢ and buys a ${item} for ${price}¢. How much is left?`, have - price, `Take away: ${have} − ${price}.`, { extra: [have + price, have - price + 10, have - price - 10], min: 0, label: cents }));
};

const dollarStory: Maker = (d) => {
  const who = someone();
  if (chance(0.5)) {
    const bill = pick([5, 10, 20]);
    const cost = randInt(1, bill - 1);
    return num(`${who} pays for a $${cost} book with a $${bill} bill. How much change?`, bill - cost, `Count up from $${cost} to $${bill}, or take away: ${bill} − ${cost}.`, { min: 0, extra: [bill + cost, bill - cost + 1], label: (n) => `$${n}` });
  }
  const a = randInt(1, d === 1 ? 5 : 20);
  const b = randInt(1, d === 1 ? 5 : 20);
  return num(`${who} has $${a}. A friend gives ${who} $${b} more. How many dollars now?`, a + b, `Add the dollars: ${a} + ${b}.`, { min: 0, extra: [a + b + 10, Math.abs(a - b)], label: (n) => `$${n}` });
};

const quartersDollars: Maker = () => {
  const dollars = randInt(1, 3);
  const quarters = randInt(1, 3);
  const total = dollars * 100 + quarters * 25;
  return centsQ(
    num(`${dollars} dollar bill${dollars > 1 ? "s" : ""} and ${quarters} quarter${quarters > 1 ? "s" : ""}. How much money?`, total, `Count the dollars, then count on 25¢ for each quarter.`, {
      extra: [total + 25, total - 25, dollars * 100 + quarters * 10, total + 100],
      min: 1,
      label: cents,
      visual: { type: "coins", coins: [...Array(dollars).fill(100), ...Array(quarters).fill(25)], currency: "USD" },
    }),
  );
};

// ---------- Grade 2: five-minute clock ----------

const readFive: Maker = (d) => {
  const m = d === 1 ? pick([0, 15, 30, 45]) : randInt(0, 11) * 5;
  return clockChoices(randInt(1, 12), m, 5, d === 1 ? 4 : 5);
};

const longHandMinutes: Maker = () => {
  const n = randInt(1, 11);
  return num(`The long hand points to the ${n}. How many minutes after the hour is it?`, n * 5, "Count by 5s from the 12 to the long hand.", { step: 5, extra: [n, n * 10], min: 0, max: 60 });
};

const AM = ["eats breakfast", "wakes up", "walks to school", "starts the school day"];
const PM = ["eats dinner", "goes to bed", "plays outside after school", "reads a bedtime story"];
const amPm: Maker = () => {
  const am = chance(0.5);
  const act = pick(am ? AM : PM);
  const time = am ? clockLabel(randInt(6, 8), pick([0, 15, 30, 45])) : clockLabel(act === "plays outside after school" ? 4 : randInt(6, 8), pick([0, 15, 30, 45]));
  return pickOne(`${someone()} ${act} at ${time}. Is that a.m. or p.m.?`, am ? "a.m." : "p.m.", [am ? "p.m." : "a.m."], "a.m. is from midnight to noon (morning). p.m. is from noon to midnight (afternoon and evening).");
};

const quarterPast: Maker = () => {
  const h = randInt(1, 12);
  const [phrase, m] = pick([["quarter past", 15], ["half past", 30], ["quarter to", 45]] as const);
  const shownHour = phrase === "quarter to" ? nextHour(h) : h;
  return pickOne(`What time is ${phrase} ${shownHour}?`, clockLabel(h, m), [clockLabel(shownHour, (m + 30) % 60), clockLabel(nextHour(h), m), clockLabel(h, m === 15 ? 45 : 15)], "Quarter past is 15 minutes after. Half past is 30. Quarter to is 15 minutes before the hour.");
};

const minutesLater: Maker = (d) => {
  const h = randInt(1, 11);
  const m = randInt(0, 5) * 5;
  const add = d === 1 ? pick([5, 10]) : pick([10, 15, 20, 25]);
  const end = m + add;
  return pickOne(`It is ${clockLabel(h, m)}. What time is it ${add} minutes later?`, clockLabel(h, end), [clockLabel(h, end + 5), clockLabel(h, Math.max(0, m - add)), clockLabel(nextHour(h), m)], `Count on by 5s from :${String(m).padStart(2, "0")}.`);
};

// ---------- Grade 2: inches, feet and yards ----------

const INCH_THINGS = [["crayon", 4], ["pencil", 7], ["spoon", 6], ["paper clip", 1], ["book", 10], ["shoe", 9], ["glue stick", 3], ["marker", 5]] as const;
const measureInches: Maker = () => {
  const [thing, len] = pick(INCH_THINGS);
  const n = Math.max(1, len + randInt(-1, 1));
  return num(`The dots mark the ends of a ${thing} on an inch ruler. How long is it?`, n, "Start at 0 and count the inches to the other dot.", {
    extra: [n + 1, n - 1, n + 2],
    min: 1,
    label: (x) => `${x} in`,
    visual: { type: "numberLine", min: 0, max: 12, step: 1, marks: [0, n] },
  });
};

const ESTIMATES = [
  ["How long is a pencil?", "7 inches", ["7 feet", "7 yards"]],
  ["How tall is a door?", "7 feet", ["7 inches", "70 feet"]],
  ["How long is a crayon?", "4 inches", ["4 feet", "40 inches"]],
  ["How long is a school bus?", "40 feet", ["40 inches", "4 inches"]],
  ["How wide is your hand?", "3 inches", ["3 feet", "3 yards"]],
  ["How tall is a grown-up?", "6 feet", ["6 inches", "60 feet"]],
  ["How long is a football field?", "100 yards", ["100 inches", "10 inches"]],
  ["How long is a paper clip?", "1 inch", ["1 foot", "1 yard"]],
  ["How tall is a kitchen table?", "3 feet", ["3 inches", "30 feet"]],
  ["How long is a pencil?", "18 centimetres", ["18 metres", "1 centimetre"]],
  ["How tall is a classroom door?", "2 metres", ["2 centimetres", "20 metres"]],
  ["How long is a baseball bat?", "1 yard", ["1 inch", "10 yards"]],
] as const;
const estimateLength: Maker = () => {
  const [q, right, wrong] = pick(ESTIMATES);
  return pickOne(`About ${q[0].toLowerCase()}${q.slice(1)}`, right, [...wrong], "An inch is about the width of a quarter. A foot is a long ruler. A yard is about one big step.");
};

const UNIT_FACTS = [
  ["How many inches make 1 foot?", 12, [10, 3, 36]],
  ["How many feet make 1 yard?", 3, [12, 10, 36]],
  ["How many centimetres make 1 metre?", 100, [10, 12, 1000]],
] as const;
const unitFact: Maker = () => {
  const [q, right, wrong] = pick(UNIT_FACTS);
  return num(q, right, "A foot is 12 inches. A yard is 3 feet. A metre is 100 centimetres.", { extra: [...wrong] });
};

const whichUnit: Maker = () => {
  const [thing, right, wrong] = pick([
    ["the length of a bug", "inches", ["yards", "miles"]],
    ["the length of a playground", "yards", ["inches", "pounds"]],
    ["the height of a tree", "feet", ["inches", "cups"]],
    ["the length of an eraser", "inches", ["yards", "feet"]],
    ["the width of a classroom", "feet", ["inches", "ounces"]],
  ] as const);
  return pickOne(`Which unit is best for ${thing}?`, right, [...wrong], "Small things: inches. Bigger things: feet or yards.");
};

const howMuchLonger: Maker = (d) => {
  const [a, b] = pick([["ribbon", "string"], ["snake", "worm"], ["jump rope", "shoelace"], ["blue scarf", "red scarf"]] as const);
  const unit = pick(["inches", "feet", "centimetres"]);
  const x = d === 1 ? randInt(6, 20) : randInt(20, 95);
  const y = randInt(2, x - 2);
  const q = `A ${a} is ${x} ${unit} long. A ${b} is ${y} ${unit} long. How much longer is the ${a}?`;
  return d === 3
    ? typed(q, x - y, `Find the difference: ${x} − ${y}.`, { suffix: unit })
    : num(q, x - y, `Find the difference: ${x} − ${y}.`, { extra: [x + y, x - y + 10, x - y - 1], label: (n) => `${n} ${unit}` });
};

const jumpStory: Maker = (d) => {
  const who = someone();
  const a = randInt(15, 50);
  const more = randInt(d === 1 ? 2 : 11, d === 1 ? 9 : 40);
  return num(`${who} jumped ${a} inches. A friend jumped ${more} inches farther. How far did the friend jump?`, a + more, `${a} + ${more} = ?`, { extra: [a - more, a + more + 10, a + more - 10], min: 0, label: (n) => `${n} in` });
};

// ---------- Grade 2: arrays ----------

const ARRAY_EMOJI = ["🌟", "🍓", "🐞", "🌼", "🍪", "🔵"];
const arrayCount: Maker = (d) => {
  const rows = randInt(2, d === 1 ? 3 : 5);
  const cols = randInt(2, d === 1 ? 4 : 5);
  const e = pick(ARRAY_EMOJI);
  return num(`How many ${e} are in the array?`, rows * cols, `There are ${rows} rows of ${cols}. Add: ${Array(rows).fill(cols).join(" + ")}.`, {
    extra: [rows + cols, rows * cols + cols, rows * cols - rows],
    min: 1,
    count: 5,
    visual: { type: "array", rows, cols, emoji: e },
  });
};

const arrayAddition: Maker = () => {
  const rows = randInt(2, 5);
  let cols = randInt(2, 5);
  if (rows === cols) cols = cols === 5 ? 4 : cols + 1;
  const sum = (n: number, k: number) => Array(n).fill(k).join(" + ");
  return pickOne(
    `There are ${rows} rows with ${cols} in each row. Which addition finds the total?`,
    sum(rows, cols),
    [`${rows} + ${cols}`, sum(rows + 1, cols), sum(rows, cols + 1)],
    `Add one ${cols} for each of the ${rows} rows.`,
    { type: "array", rows, cols, emoji: pick(ARRAY_EMOJI) },
  );
};

const squaresInRectangle: Maker = (d) => {
  const rows = randInt(2, d === 1 ? 3 : 5);
  const cols = randInt(2, 5);
  return num(`A rectangle is cut into ${rows} rows and ${cols} columns of same-size squares. How many squares?`, rows * cols, `Add ${cols} for each row: ${Array(rows).fill(cols).join(" + ")}.`, { extra: [rows + cols, rows * cols + 1, 2 * (rows + cols)], min: 1 });
};

const chairsStory: Maker = () => {
  const [thing, place] = pick([["chairs", "rows"], ["eggs", "rows in a carton"], ["cookies", "rows on a tray"], ["plants", "rows in a garden"]] as const);
  const rows = randInt(2, 5);
  const each = randInt(2, 5);
  return num(`There are ${rows} ${place} with ${each} ${thing} in each. How many ${thing} in all?`, rows * each, `Add ${each} ${rows} times.`, { extra: [rows + each, rows * each + each], min: 1 });
};

// ---------- Grade 2: add and subtract within 1000 ----------

const plusTenHundred: Maker = (d) => {
  const n = randInt(100, 899);
  const [k, sign] = pick([[10, 1], [10, -1], [100, 1], [100, -1]] as const);
  const ans = n + sign * k;
  const word = sign > 0 ? "more" : "less";
  return num(`What is ${k} ${word} than ${n}?`, ans, `Only the ${k === 10 ? "tens" : "hundreds"} digit changes.`, { extra: [n + sign * (k === 10 ? 100 : 10), n + sign, ans + 1], min: 0, max: 1000, count: d === 1 ? 4 : 5 });
};

function threeDigit(d: D, op: "+" | "−"): [number, number] {
  for (;;) {
    const a = randInt(120, 880);
    const b = randInt(100, 999 - a);
    if (op === "+") {
      const carries = Number((a % 10) + (b % 10) > 9) + Number((Math.floor(a / 10) % 10) + (Math.floor(b / 10) % 10) > 9);
      if (d === 1 ? carries === 0 : d === 2 ? carries === 1 : carries === 2) if (a + b <= 1000) return [a, b];
    } else {
      const big = a + b;
      const borrows = Number(big % 10 < b % 10) + Number(Math.floor(big / 10) % 10 < Math.floor(b / 10) % 10);
      if (d === 1 ? borrows === 0 : d === 2 ? borrows === 1 : borrows >= 1) if (big <= 999) return [big, b];
    }
  }
}

const add1000: Maker = (d) => {
  const [a, b] = threeDigit(d, "+");
  const hint = `Add hundreds, then tens, then ones: ${Math.floor(a / 100) * 100} + ${Math.floor(b / 100) * 100}, ...`;
  return d === 3 ? typed(`What is ${a} + ${b}?`, a + b, hint, { visual: eq(`${a} + ${b} = ?`) }) : num(`What is ${a} + ${b}?`, a + b, hint, { extra: [a + b - 10, a + b + 10, a + b - 100, a + b + 100], count: 5, visual: eq(`${a} + ${b} = ?`) });
};

const sub1000: Maker = (d) => {
  const [a, b] = threeDigit(d, "−");
  const hint = "Take away the hundreds, then the tens, then the ones. Regroup a ten or a hundred when you need to.";
  return d === 3 ? typed(`What is ${a} − ${b}?`, a - b, hint, { visual: eq(`${a} − ${b} = ?`) }) : num(`What is ${a} − ${b}?`, a - b, hint, { extra: [a - b - 10, a - b + 10, a - b + 100], count: 5, visual: eq(`${a} − ${b} = ?`) });
};

const expanded: Maker = () => {
  const h = randInt(1, 9);
  const t = randInt(0, 9);
  const o = randInt(1, 9);
  const n = h * 100 + t * 10 + o;
  return num(`What is ${h * 100} + ${t * 10} + ${o}?`, n, `${h} hundreds, ${t} tens and ${o} ones.`, { extra: [h * 100 + o * 10 + t, h + t + o, n + 100], count: 4, visual: eq(`${h * 100} + ${t * 10} + ${o} = ?`) });
};

const missingHundreds: Maker = () => {
  const a = randInt(1, 6) * 100 + randInt(0, 9) * 10;
  const add = randInt(1, 3) * 100;
  return num(`${a} + ? = ${a + add}. What number is missing?`, add, "Look at which digit changed.", { step: 100, extra: [add / 10, add + 10], min: 10 });
};

// ---------- Units ----------

export const K_UNITS = [
  mathUnit({
    id: "wa-k-count-to-100",
    title: "Count to 100",
    emoji: "💯",
    blurb: "Count by ones and tens",
    parentNote: "Counting to 100 by ones and by tens, counting on from any number, and seeing 11 to 19 as ten and some more ones.",
    codes: "M.K.Q.CC.1; M.K.Q.CC.2; M.K.R.NBT.1",
    text: "counting to 100 by ones and tens, counting on from a given number, and teen numbers as ten ones and some more ones",
    makers: [countByTens, countOn, countRun, before, teenFrames, teenSplit, tensBlocks],
  }),
  mathUnit({
    id: "wa-k-sort-and-count",
    title: "Sort & Count",
    emoji: "🧺",
    blurb: "Sort, count and compare",
    parentNote: "Sorting things into groups, counting each group, saying which group has more, and choosing a question we can answer by asking the class.",
    codes: "M.K.DA.MD.3; M.K.DA.DS.1; M.K.DA.DS.3; M.K.DA.DS.4",
    text: "sorting objects into groups, counting and comparing the groups, and asking questions about the class",
    makers: dataMakers("k"),
  }),
];

export const G1_UNITS = [
  mathUnit({
    id: "wa-g1-clock",
    title: "Hour & Half Hour",
    emoji: "🕐",
    blurb: "Tell time on a clock",
    parentNote: "Telling time to the hour and half hour on clocks with hands and on digital clocks.",
    codes: "M.1.Q.MD.3",
    text: "telling and writing time to the hour and half hour on analog and digital clocks",
    makers: [readHalfHour, handsSay, halfPast, shortHand, hourLater, digitalMatch],
  }),
  mathUnit({
    id: "wa-g1-tens-jumps",
    title: "Jump by Tens",
    emoji: "🦘",
    blurb: "10 more, 10 less",
    parentNote: "Finding 10 more and 10 less than a number in their head, subtracting tens, and adding ones or tens to a two-digit number.",
    codes: "M.1.R.NBT.4; M.1.R.NBT.5; M.1.R.NBT.6",
    text: "finding 10 more and 10 less, subtracting multiples of 10, and adding within 100",
    makers: [tenMore, tenLess, tensMinusTens, addOnes, addTens],
  }),
  mathUnit({
    id: "wa-g1-data",
    title: "Picture Graphs",
    emoji: "📊",
    blurb: "Ask, count and compare",
    parentNote: "Reading picture graphs with three groups: how many in each, how many more, how many in all, and which question a class survey can answer.",
    codes: "M.1.DA.MD.4; M.1.DA.DS.1; M.1.DA.DS.2; M.1.DA.DS.3",
    text: "organizing and reading data with up to three categories, and choosing questions a class can answer with data",
    makers: dataMakers("1"),
  }),
];

export const G2_UNITS = [
  mathUnit({
    id: "wa-g2-money",
    title: "Dollars & Cents",
    emoji: "💵",
    blurb: "Count coins and bills",
    parentNote: "US money: pennies, nickels, dimes, quarters and dollar bills. Counting a handful of coins, making an amount, and word problems with the ¢ and $ signs.",
    codes: "M.2.Q.MD.8",
    text: "solving word problems with dollar bills, quarters, dimes, nickels and pennies, using the $ and ¢ symbols",
    makers: [countCoins, makeAmount, coinValue, worthMost, howManyMake, coinStory, spendCents, dollarStory, quartersDollars],
  }),
  mathUnit({
    id: "wa-g2-clock",
    title: "Five-Minute Clock",
    emoji: "⏰",
    blurb: "Time to 5 minutes, a.m. and p.m.",
    parentNote: "Reading clocks to the nearest five minutes, quarter past and quarter to, and knowing when a time is a.m. or p.m.",
    codes: "M.2.SR.MD.7",
    text: "telling and writing time to the nearest five minutes, using a.m. and p.m.",
    makers: [readFive, longHandMinutes, amPm, quarterPast, minutesLater],
  }),
  mathUnit({
    id: "wa-g2-inches-feet",
    title: "Inches, Feet & Yards",
    emoji: "📏",
    blurb: "Measure and estimate length",
    parentNote: "Measuring and estimating length in inches, feet and yards (and centimetres and metres), and finding how much longer one thing is than another.",
    codes: "M.2.Q.MD.1; M.2.Q.MD.3; M.2.Q.MD.4; M.2.Q.MD.5",
    text: "measuring and estimating lengths in inches, feet, centimetres and metres, and solving length word problems",
    makers: [measureInches, estimateLength, unitFact, whichUnit, howMuchLonger, jumpStory],
  }),
  mathUnit({
    id: "wa-g2-arrays",
    title: "Arrays",
    emoji: "🔲",
    blurb: "Rows and columns",
    parentNote: "Adding equal rows to find the total in an array (up to 5 by 5), and cutting a rectangle into rows and columns of squares. This gets ready for multiplication.",
    codes: "M.2.SR.OA.4; M.2.SR.G.2",
    text: "using addition to find the total in rectangular arrays, and partitioning a rectangle into rows and columns of squares",
    makers: [arrayCount, arrayAddition, squaresInRectangle, chairsStory],
  }),
  mathUnit({
    id: "wa-g2-add-1000",
    title: "Add & Subtract to 1000",
    emoji: "🧮",
    blurb: "Hundreds, tens and ones",
    parentNote: "Adding and subtracting three-digit numbers using place value, and adding or taking away 10 or 100 in their head.",
    codes: "M.2.Q.NBT.7; M.2.Q.NBT.8",
    text: "adding and subtracting within 1000 using place value, and mentally adding or subtracting 10 or 100",
    makers: [plusTenHundred, add1000, sub1000, expanded, missingHundreds],
  }),
  mathUnit({
    id: "wa-g2-data",
    title: "Bar Graphs",
    emoji: "📊",
    blurb: "Read and compare bar graphs",
    parentNote: "Reading bar graphs with four groups: how many more, how many fewer, how many in all, and which question a class survey can answer.",
    codes: "M.2.DA.MD.10; M.2.DA.DS.1; M.2.DA.DS.3; M.2.DA.DS.4",
    text: "reading picture and bar graphs with up to four categories, comparing groups, and asking questions that data can answer",
    makers: dataMakers("2"),
  }),
];
