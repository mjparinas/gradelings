import { chance, pick, randInt, sample, shuffle } from "../../random";
import type { Visual } from "../../types";
import { type D, type Maker, eq, frac, fracChoice, fracKey, gcd, mathUnit, mixed, num, pickOne, someone, sp, typed } from "./math-kit";

// Washington's own math units for Grades 3 to 5: multiplying by tens, two-step problems, inch rulers and line plots,
// customary units and conversions, times-as-many, expressions, the coordinate grid, fraction operations and volume.

// ---------- Grade 3: multiply by multiples of 10 ----------

const timesTens: Maker = (d) => {
  const a = randInt(2, 9);
  const b = randInt(1, 9);
  const ask = `${a} × ${b * 10} = ?`;
  const hint = `${a} × ${b} = ${a * b}, so ${a} × ${b} tens = ${a * b} tens = ${a * b * 10}.`;
  return d === 3 ? typed(`What is ${a} × ${b * 10}?`, a * b * 10, hint, { visual: eq(ask) }) : num(`What is ${a} × ${b * 10}?`, a * b * 10, hint, { step: 10, extra: [a * b, a * b * 100, a + b * 10], visual: eq(ask) });
};

const factToTens: Maker = () => {
  const a = randInt(2, 9);
  const b = randInt(2, 9);
  return num(`${a} × ${b} = ${a * b}. So what is ${a} × ${b * 10}?`, a * b * 10, `${b * 10} is ${b} tens. ${a} × ${b} tens = ${a * b} tens.`, { step: 10, extra: [a * b, a * b * 100, a * b + 10], count: 5 });
};

const tensStory: Maker = () => {
  const a = randInt(2, 9);
  const b = randInt(2, 9) * 10;
  const [box, thing] = pick([["boxes", "crayons"], ["packs", "stickers"], ["bags", "marbles"], ["shelves", "books"], ["trays", "beads"]] as const);
  return num(`There are ${a} ${box} with ${b} ${thing} in each. How many ${thing} are there?`, a * b, `Multiply ${a} × ${b}. Think ${a} × ${b / 10} tens.`, { step: 10, extra: [a + b, a * b * 10, (a * b) / 10], count: 5 });
};

const missingTens: Maker = () => {
  const a = randInt(2, 9);
  const b = randInt(2, 9);
  return num(`${a} × ? = ${a * b * 10}. What number is missing?`, b * 10, `Think: ${a} times how many tens makes ${a * b} tens?`, { step: 10, extra: [b, b * 100], count: 5, min: 10 });
};

// ---------- Grade 3: two-step word problems ----------

function twoStepStory(d: D): { q: string; ans: number; hint: string } {
  const who = someone();
  const kind = randInt(0, 3);
  if (kind === 0) {
    const packs = randInt(2, d === 1 ? 5 : 9);
    const each = randInt(3, d === 1 ? 6 : 9);
    const gave = randInt(1, packs * each - 1);
    return { q: `${who} buys ${packs} packs of ${each} stickers and gives away ${gave}. How many stickers are left?`, ans: packs * each - gave, hint: `First ${packs} × ${each} = ${packs * each}. Then ${packs * each} − ${gave}.` };
  }
  if (kind === 1) {
    const friends = randInt(2, d === 1 ? 4 : 6);
    const each = randInt(2, d === 1 ? 5 : 9);
    const total = friends * each;
    const had = randInt(1, total - 1);
    return { q: `${who} has ${had} cards and gets ${total - had} more. ${who} shares all the cards equally among ${friends} friends. How many cards does each friend get?`, ans: each, hint: `First ${had} + ${total - had} = ${total}. Then ${total} ÷ ${friends}.` };
  }
  if (kind === 2) {
    const price = randInt(2, 9);
    const n = randInt(2, d === 1 ? 5 : 9);
    const paid = Math.ceil((price * n + 1) / 10) * 10 + (d === 3 ? 10 : 0);
    return { q: `${who} buys ${n} books that cost $${price} each and pays with $${paid}. How many dollars of change?`, ans: paid - price * n, hint: `The books cost ${n} × ${price} = $${price * n}. Then ${paid} − ${price * n}.` };
  }
  const rows = randInt(2, 6);
  const per = randInt(3, 9);
  const extra = randInt(2, 12);
  return { q: `A garden has ${rows} rows of ${per} plants. ${extra} more plants are added. How many plants now?`, ans: rows * per + extra, hint: `First ${rows} × ${per} = ${rows * per}. Then add ${extra}.` };
}

const twoStep: Maker = (d) => {
  let s = twoStepStory(d);
  while (s.ans <= 0) s = twoStepStory(d);
  return d === 3 ? typed(s.q, s.ans, s.hint) : num(s.q, s.ans, s.hint, { extra: [s.ans + 10, s.ans - 10, s.ans + 1, s.ans - 1], count: 5, min: 0 });
};

const bagsStory: Maker = (d) => {
  const each = randInt(3, 8);
  const bags = randInt(2, d === 1 ? 5 : 9);
  const total = each * bags;
  const morning = randInt(1, total - 1);
  const who = someone();
  return num(`${who} picks ${morning} apples in the morning and ${total - morning} in the afternoon. ${who} puts them in bags of ${each}. How many bags are filled?`, bags, `Add first: ${morning} + ${total - morning} = ${total}. Then ${total} ÷ ${each}.`, { extra: [bags + 1, bags - 1, total], count: 5, min: 1 });
};

const whichEquation: Maker = () => {
  const bags = randInt(3, 6);
  const each = randInt(4, 9);
  const ate = randInt(2, 5);
  const who = someone();
  return pickOne(
    `${who} has ${bags} bags with ${each} grapes in each and eats ${ate}. Which equation finds the grapes left, g?`,
    `${bags} × ${each} − ${ate} = g`,
    [`${bags} + ${each} − ${ate} = g`, `${bags} × ${each} + ${ate} = g`, `${bags} × (${each} + ${ate}) = g`],
    "First find all the grapes (equal groups). Then take away the ones eaten.",
  );
};

const reasonable: Maker = () => {
  const a = randInt(2, 8) * 100 + randInt(10, 90);
  const b = randInt(1, 7) * 100 + randInt(10, 90);
  const real = a + b;
  const shown = pick([real, real + 200, real - 100, real + 300]);
  const ok = shown === real;
  return pickOne(`${someone()} adds ${a} + ${b} and gets ${shown}. Round to the nearest hundred to check. Is that answer reasonable?`, ok ? "Yes, it is close to the estimate" : "No, it is far from the estimate", [ok ? "No, it is far from the estimate" : "Yes, it is close to the estimate"], `Round: about ${Math.round(a / 100) * 100} + ${Math.round(b / 100) * 100} = ${Math.round(a / 100) * 100 + Math.round(b / 100) * 100}.`);
};

// ---------- Grade 3: halves and fourths of an inch ----------

const inchLabel = (q: number) => `${mixed(q, 4)} in`;

const measureQuarter: Maker = (d) => {
  const quarters = d === 1 ? randInt(1, 4) * 4 + 2 * randInt(0, 1) : d === 2 ? randInt(2, 10) * 2 : randInt(3, 19);
  const thing = pick(["crayon", "eraser", "leaf", "key", "bean pod", "feather"]);
  return num(`The dots mark the ends of a ${thing} on an inch ruler. How long is it?`, quarters, "Each inch is cut into 4 quarter inches. Count whole inches, then the parts.", {
    step: d === 1 ? 2 : 1,
    extra: [quarters + 4, quarters - 4],
    min: 1,
    label: inchLabel,
    visual: { type: "numberLine", min: 0, max: 5, step: 0.25, labelEvery: 1, marks: [0, quarters / 4] },
  });
};

const compareInches: Maker = () => {
  const [a, b] = sample([2, 3, 5, 6, 7, 9, 10, 11, 13], 2);
  const big = Math.max(a, b);
  return pickOne(`Which is longer: ${inchLabel(a)} or ${inchLabel(b)}?`, inchLabel(big), [inchLabel(big === a ? b : a)], "Compare the whole inches first, then the parts. 1/2 is the same as 2/4.");
};

function lengthsTable(): { lengths: number[]; counts: number[]; visual: Visual } {
  const start = randInt(4, 10);
  const lengths = [0, 1, 2, 3].map((k) => start + 2 * k); // halves of an inch, in quarters
  const counts = shuffle([1, 2, 3, 4, 5, 6]).slice(0, 4);
  return { lengths, counts, visual: { type: "table", title: "Pencil lengths", headers: ["Length", "Pencils"], rows: lengths.map((l, i) => [inchLabel(l), counts[i]]) } };
}

const plotHowMany: Maker = () => {
  const t = lengthsTable();
  const i = randInt(0, 3);
  return num(`How many pencils are ${inchLabel(t.lengths[i])} long?`, t.counts[i], "Find that length in the table and read across.", { min: 0, extra: [t.counts[(i + 1) % 4]], visual: t.visual });
};

const plotTotal: Maker = () => {
  const t = lengthsTable();
  const sum = t.counts.reduce((a, b) => a + b, 0);
  return num("How many pencils were measured in all?", sum, `Add the counts: ${t.counts.join(" + ")}.`, { min: 1, visual: t.visual });
};

const plotMost: Maker = () => {
  const t = lengthsTable();
  const i = t.counts.indexOf(Math.max(...t.counts));
  return pickOne("Which length is the most common?", inchLabel(t.lengths[i]), t.lengths.filter((_, j) => j !== i).map(inchLabel), "Look for the biggest count.", t.visual);
};

const plotLonger: Maker = () => {
  const t = lengthsTable();
  const cut = randInt(1, 2);
  const n = t.counts.slice(cut + 1).reduce((a, b) => a + b, 0);
  return num(`How many pencils are longer than ${inchLabel(t.lengths[cut])}?`, n, "Add the counts for the longer lengths only.", { min: 0, visual: t.visual });
};

// ---------- Grade 3: scaled graphs ----------

const SURVEYS = [
  ["Favourite season", [["spring", "🌷"], ["summer", "☀️"], ["fall", "🍂"], ["winter", "⛄"]]],
  ["Books read this month", [["Room 1", "📕"], ["Room 2", "📗"], ["Room 3", "📘"], ["Room 4", "📙"]]],
  ["Favourite sport", [["soccer", "⚽"], ["basketball", "🏀"], ["baseball", "⚾"], ["swimming", "🏊"]]],
  ["Animals seen on a hike", [["birds", "🐦"], ["squirrels", "🐿️"], ["deer", "🦌"], ["frogs", "🐸"]]],
] as const;

function scaledGraph(d: D) {
  const [title, items] = pick(SURVEYS);
  const each = d === 1 ? 2 : pick([2, 5, 10]);
  const pics = sample([1, 2, 3, 4, 5, 6, 7, 8], 4);
  const rows = items.map(([label, emoji], i) => ({ label, emoji, count: pics[i] }));
  const bars = chance(0.5);
  const visual: Visual = bars
    ? { type: "bars", title, bars: rows.map((r) => ({ label: r.label, value: r.count * each, emoji: r.emoji })) }
    : { type: "pictograph", title, rows, each };
  return { rows, each, visual, title };
}

const scaledRead: Maker = (d) => {
  const g = scaledGraph(d);
  const r = pick(g.rows);
  return num(`How many for ${r.label}?`, r.count * g.each, `Each picture or step stands for ${g.each}. ${r.count} × ${g.each}.`, { step: g.each, extra: [r.count], count: 5, min: 1, visual: g.visual });
};
const scaledMore: Maker = (d) => {
  const g = scaledGraph(d);
  const [a, b] = sample(g.rows, 2).sort((x, y) => y.count - x.count);
  const diff = (a.count - b.count) * g.each;
  return num(`How many more for ${a.label} than for ${b.label}?`, diff, `${a.label}: ${a.count * g.each}. ${b.label}: ${b.count * g.each}. Subtract.`, { step: g.each, extra: [a.count - b.count], count: 5, min: 1, visual: g.visual });
};
const scaledTotal: Maker = (d) => {
  const g = scaledGraph(d);
  const sum = g.rows.reduce((s, r) => s + r.count * g.each, 0);
  return num("How many in all?", sum, `Find each amount (pictures × ${g.each}), then add.`, { step: g.each, extra: [g.rows.reduce((s, r) => s + r.count, 0)], count: 5, min: 1, visual: g.visual });
};
const pictureKey: Maker = () => {
  const each = pick([2, 5, 10]);
  const total = each * randInt(2, 9);
  return num(`On a picture graph, each picture stands for ${each}. How many pictures show ${total}?`, total / each, `${total} ÷ ${each}.`, { extra: [total, each], count: 4, min: 1 });
};
const goodSurvey: Maker = () =>
  pickOne(
    "Which question could you answer with a class survey and a bar graph?",
    pick(["Which pet is most popular in our class?", "How do students in our class get to school?", "Which fruit do most of us like best?", "What is our class's favourite sport?"]),
    sample(["What is 6 × 7?", "How far is it to the moon?", "What is my best friend's name?", "What time does the sun set today?"], 3),
    "A survey question has answers that differ from person to person, so you can count and compare them.",
  );

// ---------- Grade 4: customary and metric units ----------

const FACTS = [
  { big: "foot", bigs: "feet", small: "inches", k: 12 },
  { big: "yard", bigs: "yards", small: "feet", k: 3 },
  { big: "yard", bigs: "yards", small: "inches", k: 36 },
  { big: "pound", bigs: "pounds", small: "ounces", k: 16 },
  { big: "gallon", bigs: "gallons", small: "quarts", k: 4 },
  { big: "quart", bigs: "quarts", small: "pints", k: 2 },
  { big: "pint", bigs: "pints", small: "cups", k: 2 },
  { big: "hour", bigs: "hours", small: "minutes", k: 60 },
  { big: "minute", bigs: "minutes", small: "seconds", k: 60 },
  { big: "metre", bigs: "metres", small: "centimetres", k: 100 },
  { big: "kilometre", bigs: "kilometres", small: "metres", k: 1000 },
  { big: "kilogram", bigs: "kilograms", small: "grams", k: 1000 },
  { big: "litre", bigs: "litres", small: "millilitres", k: 1000 },
] as const;

const convertUp: Maker = (d) => {
  const f = pick(d === 1 ? FACTS.slice(0, 8) : FACTS);
  const n = randInt(2, d === 3 ? 12 : 9);
  const q = `How many ${f.small} are in ${n} ${f.bigs}?`;
  const hint = `1 ${f.big} = ${f.k} ${f.small}. Multiply: ${n} × ${f.k}.`;
  return d === 3 ? typed(q, n * f.k, hint, { suffix: f.small }) : num(q, n * f.k, hint, { step: f.k, extra: [n + f.k, n * f.k * 10], count: 5, min: 1, label: sp });
};

const unitTable: Maker = () => {
  const f = pick(FACTS.slice(0, 9));
  const start = randInt(1, 4);
  const rows = [start, start + 1, start + 2];
  const ask = start + 3;
  return num("What number goes where the ? is?", ask * f.k, `Each ${f.big} adds ${f.k} ${f.small}.`, {
    step: f.k,
    extra: [ask * f.k + 1, ask + f.k],
    min: 1,
    count: 5,
    visual: { type: "table", title: `${f.bigs[0].toUpperCase()}${f.bigs.slice(1)} and ${f.small}`, headers: [f.bigs, f.small], rows: [...rows.map((r) => [r, r * f.k]), [ask, "?"]] },
  });
};

const heavier: Maker = () => {
  const f = pick([FACTS[0], FACTS[3], FACTS[4], FACTS[7]]);
  const n = randInt(2, 5);
  const small = n * f.k + pick([-1, 1]) * randInt(1, Math.max(1, Math.floor(f.k / 2)));
  const bigger = n * f.k > small ? `${n} ${f.bigs}` : `${small} ${f.small}`;
  const smaller = bigger === `${n} ${f.bigs}` ? `${small} ${f.small}` : `${n} ${f.bigs}`;
  return pickOne(`Which is more: ${n} ${f.bigs} or ${small} ${f.small}?`, bigger, [smaller], `Change ${n} ${f.bigs} into ${f.small}: ${n} × ${f.k} = ${n * f.k}.`);
};

const mixedUnits: Maker = () => {
  const f = pick([FACTS[0], FACTS[3], FACTS[7], FACTS[1]]);
  const a = randInt(2, 6);
  const b = randInt(1, f.k - 1);
  return num(`How many ${f.small} is ${a} ${f.bigs} ${b} ${f.small}?`, a * f.k + b, `${a} × ${f.k} = ${a * f.k}. Then add ${b}.`, { extra: [a * f.k, a + b, (a + 1) * f.k + b, a * 10 + b], count: 5, label: sp });
};

const relativeSize: Maker = () => {
  const [q, right, wrong] = pick([
    ["Which is the longest?", "1 yard", ["1 foot", "1 inch"]],
    ["Which is the heaviest?", "1 pound", ["1 ounce", "1 gram"]],
    ["Which holds the most?", "1 gallon", ["1 quart", "1 cup"]],
    ["Which is the longest?", "1 kilometre", ["1 metre", "1 centimetre"]],
    ["Which is the heaviest?", "1 kilogram", ["1 gram", "1 ounce"]],
    ["Which holds the most?", "1 litre", ["1 millilitre", "1 cup"]],
    ["Which is the shortest time?", "1 second", ["1 minute", "1 hour"]],
  ] as const);
  return pickOne(q, right, [...wrong], "Think about how many of the smaller unit fit into the bigger one.");
};

const juiceStory: Maker = () => {
  const gal = randInt(2, 6);
  const used = randInt(1, gal * 4 - 1);
  return num(`A cooler holds ${gal} gallons of lemonade. ${used} quarts are poured out. How many quarts are left?`, gal * 4 - used, `${gal} gallons = ${gal * 4} quarts. Then ${gal * 4} − ${used}.`, { extra: [gal - used, gal * 4 + used], count: 5, min: 0 });
};

// ---------- Grade 4: line plots and data ----------

function eighthsData(): { values: number[]; counts: number[]; visual: Visual } {
  const denom = pick([4, 8]);
  const start = randInt(1, denom - 3);
  const values = [start, start + 1, start + 2];
  const counts = sample([1, 2, 3, 4, 5, 6], 3);
  const unit = pick(["Snail trail", "Ribbon", "Plant growth"]);
  return {
    values: values.map((v) => v / denom),
    counts,
    visual: { type: "table", title: `${unit} (inches)`, headers: ["Length (in)", "How many"], rows: values.map((v, i) => [frac(v, denom), counts[i]]) },
  };
}
const asFrac = (v: number) => {
  for (const d of [1, 2, 4, 8]) if (Number.isInteger(v * d)) return frac(v * d, d);
  return String(v);
};

const lpDifference: Maker = () => {
  const t = eighthsData();
  const diff = t.values[2] - t.values[0];
  return pickOne("What is the difference between the longest and the shortest length?", `${asFrac(diff)} in`, [`${asFrac(diff + 1 / 8)} in`, `${asFrac(t.values[2] + t.values[0])} in`, `${asFrac(diff / 2)} in`], `Subtract: ${asFrac(t.values[2])} − ${asFrac(t.values[0])}.`, t.visual);
};
const lpTotal: Maker = () => {
  const t = eighthsData();
  const sum = t.counts.reduce((a, b) => a + b, 0);
  return num("How many were measured in all?", sum, `Add the counts: ${t.counts.join(" + ")}.`, { min: 1, visual: t.visual });
};
const lpLongest: Maker = () => {
  const t = eighthsData();
  return num(`How many are ${asFrac(t.values[2])} inch long?`, t.counts[2], "Find the row for that length.", { min: 0, visual: t.visual });
};
const lpCombined: Maker = () => {
  const t = eighthsData();
  const i = randInt(0, 2);
  const n = t.counts[i];
  const v = t.values[i];
  const totalLen = v * n;
  return pickOne(`All the pieces that are ${asFrac(v)} inch long are laid end to end. How long is that?`, `${asFrac(totalLen)} in`, [`${asFrac(v + n)} in`, `${asFrac(totalLen + v)} in`, `${asFrac(totalLen - v)} in`], `${n} pieces × ${asFrac(v)} inch = ${asFrac(totalLen)} inch.`, t.visual);
};

const GROUPS = ["Room 4", "Room 7"];
const compareGroups: Maker = () => {
  const cats = sample(["soccer", "tag", "jump rope", "basketball", "four square"], 3);
  const a = cats.map(() => randInt(2, 12));
  const b = cats.map(() => randInt(2, 12));
  const i = randInt(0, 2);
  const [x, y] = a[i] >= b[i] ? [0, 1] : [1, 0];
  const big = [a, b][x][i];
  const small = [a, b][y][i];
  return num(`How many more students in ${GROUPS[x]} than in ${GROUPS[y]} chose ${cats[i]}?`, big - small, `${GROUPS[x]}: ${big}. ${GROUPS[y]}: ${small}. Subtract.`, {
    min: 0,
    extra: [big + small],
    visual: { type: "table", title: "Favourite recess game", headers: ["Game", GROUPS[0], GROUPS[1]], rows: cats.map((c, j) => [c, a[j], b[j]]) },
  });
};

const STAT_GOOD = [
  "How many minutes do students in our class read each night?",
  "What are the heights of the bean plants in our garden?",
  "How many letters are in our first names?",
  "How long does it take each of us to run a lap?",
  "How many pets do the families in our class have?",
];
const STAT_BAD = ["What is my teacher's name?", "How tall am I?", "What day is it today?", "How many legs does a spider have?", "What is 8 × 7?"];
const goodDataQuestion: Maker = () => pickOne("Which question needs data with many different answers?", pick(STAT_GOOD), sample(STAT_BAD, 3), "A data question has answers that vary, so you collect many of them.");

// ---------- Grade 4: times as many ----------

const timesAsMany: Maker = (d) => {
  const who = someone();
  const base = randInt(2, d === 1 ? 6 : 12);
  const k = randInt(2, d === 1 ? 5 : 9);
  const thing = pick(["stickers", "marbles", "shells", "stamps", "cards"]);
  return num(`${who} has ${base} ${thing}. A friend has ${k} times as many. How many ${thing} does the friend have?`, base * k, `${k} times as many means ${k} × ${base}.`, { extra: [base + k, base * k + base, base * (k + 1)], count: 5, min: 1 });
};

const timesAsLong: Maker = () => {
  const small = randInt(2, 12);
  const k = randInt(2, 9);
  const big = small * k;
  const [q, unit] = pick([
    [`The red ribbon is ${big} inches long. It is ${k} times as long as the blue ribbon. How long is the blue ribbon?`, "inches"],
    [`A tree is ${big} feet tall. It is ${k} times as tall as a bush. How tall is the bush?`, "feet"],
    [`A dog weighs ${big} pounds. It is ${k} times as heavy as a puppy. How much does the puppy weigh?`, "pounds"],
  ] as const);
  return num(q, small, `Divide: ${big} ÷ ${k}.`, { extra: [big - k, big * k, small + k], count: 5, min: 1, label: (n) => `${n} ${unit}` });
};

const readComparison: Maker = () => {
  const a = randInt(3, 9);
  const b = randInt(3, 9);
  const p = a * b;
  return pickOne(`Which sentence matches ${p} = ${a} × ${b}?`, `${p} is ${a} times as many as ${b}`, [`${p} is ${a} more than ${b}`, `${b} is ${a} times as many as ${p}`, `${a} is ${b} times as many as ${p}`], `${a} × ${b} means ${a} groups the size of ${b}, so ${p} is ${a} times as many as ${b}.`);
};

const moreVsTimes: Maker = () => {
  const base = randInt(2, 9);
  const k = randInt(2, 6);
  const times = chance(0.5);
  return num(`Leo has ${base} apples. Mia has ${k} ${times ? "times as many as" : "more than"} Leo. How many apples does Mia have?`, times ? base * k : base + k, times ? `${k} times as many: ${k} × ${base}.` : `${k} more than: ${base} + ${k}.`, { extra: [times ? base + k : base * k, base * k + 1], count: 4, min: 1 });
};

// ---------- Grade 5: converting units ----------

const convertDown: Maker = (d) => {
  const f = pick(FACTS);
  const n = randInt(2, 9);
  const q = `${sp(n * f.k)} ${f.small} is how many ${f.bigs}?`;
  const hint = `${f.k} ${f.small} make 1 ${f.big}. Divide: ${sp(n * f.k)} ÷ ${f.k}.`;
  return d === 3 ? typed(q, n, hint, { suffix: f.bigs }) : num(q, n, hint, { extra: [n * 10, n * f.k * f.k], min: 1, count: 5, label: sp });
};

const convertDecimal: Maker = () => {
  const [big, small, k] = pick([
    ["metres", "centimetres", 100],
    ["kilograms", "grams", 1000],
    ["litres", "millilitres", 1000],
    ["kilometres", "metres", 1000],
  ] as const);
  const n = randInt(11, 49) / 10;
  const toSmall = chance(0.5);
  return toSmall
    ? typed(`How many ${small} are in ${n} ${big}?`, Math.round(n * k), `1 ${big.slice(0, -1)} = ${k} ${small}. ${n} × ${k}.`, { suffix: small })
    : typed(`${Math.round(n * k)} ${small} is how many ${big}?`, String(n), `Divide by ${k}: move the decimal point.`, { keypad: "decimal", suffix: big });
};

const convertStory: Maker = () => {
  const kind = randInt(0, 3);
  if (kind === 0) {
    const yd = randInt(2, 6);
    return num(`A rope is ${yd} yards long. It is cut into pieces 1 foot long. How many pieces?`, yd * 3, `1 yard = 3 feet, so ${yd} yards = ${yd} × 3 feet.`, { extra: [yd * 12, yd * 36, yd], count: 5 });
  }
  if (kind === 1) {
    const lb = randInt(2, 5);
    const used = randInt(3, 15);
    return num(`A bag holds ${lb} pounds of flour. A baker uses ${used} ounces. How many ounces are left?`, lb * 16 - used, `${lb} pounds = ${lb * 16} ounces. Then subtract ${used}.`, { extra: [lb * 10 - used, lb * 16 + used], count: 5 });
  }
  if (kind === 2) {
    const qt = randInt(2, 6);
    return num(`A punch bowl holds ${qt} quarts. How many 1-cup servings is that?`, qt * 4, `1 quart = 2 pints = 4 cups. ${qt} × 4.`, { extra: [qt * 2, qt * 8, qt * 16], count: 5 });
  }
  const m = randInt(2, 5);
  const piece = pick([20, 25, 50]);
  return num(`A ribbon is ${m} metres long. How many ${piece} cm pieces can be cut from it?`, (m * 100) / piece, `${m} m = ${m * 100} cm. Then ${m * 100} ÷ ${piece}.`, { extra: [m * piece, (m * 1000) / piece], count: 5 });
};

// ---------- Grade 5: expressions ----------

const evalParens: Maker = (d) => {
  const a = randInt(2, 9);
  const b = randInt(2, 9);
  const c = randInt(2, 6);
  const [text, value, wrong] = pick([
    [`(${a} + ${b}) × ${c}`, (a + b) * c, a + b * c],
    [`${c} × (${a} + ${b})`, c * (a + b), c * a + b],
    [`(${a + b + c} − ${b}) × ${c}`, (a + c) * c, a + b + c - b * c],
    [`${a * c} ÷ ${c} + ${b}`, a + b, a + b + c],
  ] as const);
  return d === 3 ? typed(`What is ${text}?`, value, "Work inside the parentheses first. Then multiply or divide, then add or subtract.", { visual: eq(`${text} = ?`) }) : num(`What is ${text}?`, value, "Work inside the parentheses first.", { extra: [wrong, value + c], count: 5, min: 0, visual: eq(`${text} = ?`) });
};

const evalBrackets: Maker = () => {
  const a = randInt(2, 5);
  const b = randInt(2, 6);
  const c = randInt(2, 4);
  const e = randInt(1, 9);
  const value = a * (b + c * e);
  return num(`What is ${a} × [${b} + (${c} × ${e})]?`, value, `Inside out: ${c} × ${e} = ${c * e}. Then ${b} + ${c * e} = ${b + c * e}. Then ${a} × ${b + c * e}.`, { extra: [(a * b + c) * e, a * b + c * e, value + a], count: 5 });
};

const writeExpression: Maker = () => {
  const a = randInt(2, 9);
  const b = randInt(2, 9);
  const k = randInt(2, 5);
  const [words, right, wrong] = pick([
    [`add ${a} and ${b}, then multiply by ${k}`, `${k} × (${a} + ${b})`, [`${k} × ${a} + ${b}`, `${a} + ${b} × ${k}`, `(${k} + ${a}) × ${b}`]],
    [`multiply ${a} by ${k}, then add ${b}`, `${a} × ${k} + ${b}`, [`${a} × (${k} + ${b})`, `${a} + ${k} × ${b}`, `(${a} + ${b}) × ${k}`]],
    [`subtract ${b} from ${a + b + 5}, then divide by ${k}`, `(${a + b + 5} − ${b}) ÷ ${k}`, [`${a + b + 5} − ${b} ÷ ${k}`, `${b} − ${a + b + 5} ÷ ${k}`, `(${b} − ${a + b + 5}) ÷ ${k}`]],
  ] as const);
  return pickOne(`Which expression means “${words}”?`, right, [...wrong], "Parentheses show what to do first.");
};

const timesAsLarge: Maker = () => {
  const k = randInt(2, 9);
  const a = randInt(1000, 9999);
  const b = randInt(100, 999);
  return num(`Without calculating: ${k} × (${a} + ${b}) is how many times as large as ${a} + ${b}?`, k, `${k} × (anything) is ${k} times that amount.`, { extra: [k + 1, a, b].filter((n) => n < 10000), count: 4, min: 1 });
};

const placeParens: Maker = () => {
  const a = randInt(2, 6);
  const b = randInt(2, 6);
  const c = randInt(2, 6);
  const target = (a + b) * c;
  if (target === a + b * c) return placeParens(3);
  return pickOne(`Where do the parentheses go to make ${a} + ${b} × ${c} = ${target}?`, `(${a} + ${b}) × ${c}`, [`${a} + (${b} × ${c})`, `${a} + ${b} × ${c} (no parentheses)`], `Try each one. (${a} + ${b}) × ${c} = ${a + b} × ${c} = ${target}.`);
};

// ---------- Grade 5: the coordinate grid ----------

function point(max = 9): [number, number] {
  for (;;) {
    const x = randInt(1, max);
    const y = randInt(1, max);
    if (x !== y) return [x, y];
  }
}

const readPoint: Maker = () => {
  const [x, y] = point();
  return pickOne("What are the coordinates of point A?", `(${x}, ${y})`, [`(${y}, ${x})`, `(${x}, ${y + 1})`, `(${x - 1}, ${y})`], "Go across first (x), then up (y).", { type: "grid", size: 10, points: [{ x, y, label: "A" }] });
};

const moveFromOrigin: Maker = () => {
  const [x, y] = point();
  return pickOne(`Start at (0, 0). Go ${x} units right and ${y} units up. Where are you?`, `(${x}, ${y})`, [`(${y}, ${x})`, `(${x + y}, 0)`, `(${x}, ${x})`], "The first number is how far right. The second is how far up.");
};

const onAxis: Maker = () => {
  const n = randInt(1, 9);
  const xAxis = chance(0.5);
  const [x, y] = point();
  return pickOne(`Which point is on the ${xAxis ? "x" : "y"}-axis?`, xAxis ? `(${n}, 0)` : `(0, ${n})`, [xAxis ? `(0, ${n})` : `(${n}, 0)`, `(${x}, ${y})`, `(${n}, ${n})`], xAxis ? "Points on the x-axis have a y-coordinate of 0." : "Points on the y-axis have an x-coordinate of 0.");
};

const distanceSameLine: Maker = () => {
  const x = randInt(1, 9);
  const [y1, y2] = sample([1, 2, 3, 4, 5, 6, 7, 8, 9], 2).sort((a, b) => a - b);
  const across = chance(0.5);
  const [A, B] = across ? [`(${y1}, ${x})`, `(${y2}, ${x})`] : [`(${x}, ${y1})`, `(${x}, ${y2})`];
  return num(`Point A is at ${A} and point B is at ${B}. How many units apart are they?`, y2 - y1, "The points line up, so subtract the numbers that change.", { extra: [y1 + y2, x], min: 1, count: 4 });
};

const graphStory: Maker = () => {
  const rate = randInt(2, 6);
  const hours = randInt(2, 5);
  return pickOne(`A plant grows ${rate} cm each week. On a graph, x is weeks and y is height. Which point shows week ${hours}?`, `(${hours}, ${hours * rate})`, [`(${hours * rate}, ${hours})`, `(${hours}, ${hours + rate})`, `(${rate}, ${hours})`], `After ${hours} weeks the plant is ${hours} × ${rate} = ${hours * rate} cm. x first, then y.`);
};

// ---------- Grade 5: multiplying and dividing fractions ----------

const fracOfWhole: Maker = (d) => {
  const den = pick([2, 3, 4, 5, 6, 8]);
  const nu = randInt(1, den - 1);
  const whole = den * randInt(1, d === 1 ? 3 : 6);
  const ans = (nu * whole) / den;
  return num(`What is ${nu}/${den} × ${whole}?`, ans, `${whole} ÷ ${den} = ${whole / den}. Then × ${nu}.`, { extra: [nu * whole, whole / den, ans + nu], count: 5, min: 0, visual: eq(`${nu}/${den} × ${whole} = ?`) });
};

const fracTimesFrac: Maker = () => {
  const [a, b] = [randInt(1, 4), randInt(2, 6)];
  const [c, e] = [randInt(1, 4), randInt(2, 6)];
  const na = Math.min(a, b - 1);
  const nc = Math.min(c, e - 1);
  return fracChoice(`What is ${na}/${b} × ${nc}/${e}?`, [na * nc, b * e], [[na + nc, b + e], [na * e, b * nc], [na * nc, b + e], [na + nc, b * e]], "Multiply the tops. Multiply the bottoms. Simplify if you can.", frac, eq(`${na}/${b} × ${nc}/${e} = ?`));
};

const unitDivWhole: Maker = () => {
  const den = randInt(2, 6);
  const k = randInt(2, 5);
  return fracChoice(`What is 1/${den} ÷ ${k}?`, [1, den * k], [[k, den], [1, den + k], [den, k]], `Split 1/${den} into ${k} equal parts. Each part is 1/${den * k}.`, frac, eq(`1/${den} ÷ ${k} = ?`));
};

const wholeDivUnit: Maker = () => {
  const den = randInt(2, 8);
  const k = randInt(2, 6);
  return num(`What is ${k} ÷ 1/${den}?`, k * den, `How many 1/${den}s are in ${k}? There are ${den} in each whole, so ${k} × ${den}.`, { extra: [k + den, den, k], count: 4, min: 1 });
};

const shareAsDivision: Maker = () => {
  const people = randInt(3, 8);
  const things = randInt(1, people - 1) + (chance(0.3) ? people : 0);
  const what = pick(["pizzas", "sandwiches", "pies", "loaves of bread"]);
  const show = (n: number, d: number) => `${mixed(n, d)} each`;
  return fracChoice(`${things} ${what} are shared equally by ${people} friends. How much does each friend get?`, [things, people], [[people, things], [1, people], [things, people + things]], `Sharing is dividing: ${things} ÷ ${people} = ${things}/${people}.`, show);
};

const scaling: Maker = () => {
  const n = randInt(12, 60);
  const [f, less] = pick([["3/4", true], ["5/4", false], ["1/2", true], ["3/2", false], ["7/8", true], ["9/8", false]] as const);
  return pickOne(`Without multiplying: is ${f} × ${n} more or less than ${n}?`, less ? `Less than ${n}` : `More than ${n}`, [less ? `More than ${n}` : `Less than ${n}`, `Equal to ${n}`], "Multiplying by a fraction less than 1 makes a number smaller. More than 1 makes it bigger.");
};

const recipeStory: Maker = () => {
  const den = pick([2, 3, 4]);
  const nu = randInt(1, den - 1);
  const batches = randInt(2, 6);
  return fracChoice(`A recipe uses ${nu}/${den} cup of oats. How many cups for ${batches} batches?`, [nu * batches, den], [[nu + batches, den], [nu, den * batches], [nu * batches, den * batches]], `${batches} × ${nu}/${den} = ${nu * batches}/${den}.`, (a, b) => `${mixed(a, b)} cups`.replace(/^1 cups$/, "1 cup"));
};

// ---------- Grade 5: adding fractions with unlike denominators ----------

const DENS = [2, 3, 4, 5, 6, 8, 10, 12];
function unlikePair(d: D): [number, number, number, number] {
  for (;;) {
    const [b, e] = sample(d === 1 ? [2, 3, 4, 6, 8] : DENS, 2);
    const a = randInt(1, b - 1);
    const c = randInt(1, e - 1);
    if (gcd(a, b) !== 1 || gcd(c, e) !== 1) continue;
    if (d === 1 && a * e + c * b > b * e) continue;
    return [a, b, c, e];
  }
}

const addUnlike: Maker = (d) => {
  const [a, b, c, e] = unlikePair(d);
  const [n, den] = [a * e + c * b, b * e];
  const prompt = `What is ${a}/${b} + ${c}/${e}?`;
  const hint = `Use a common denominator: ${a}/${b} = ${a * e}/${b * e} and ${c}/${e} = ${c * b}/${b * e}.`;
  if (d === 3) return typed(`${prompt} Type a fraction.`, fracKey(n, den), hint, { keypad: "fraction", accept: [`${n}/${den}`], visual: eq(`${a}/${b} + ${c}/${e} = ?`) });
  return fracChoice(prompt, [n, den], [[a + c, b + e], [a + c, b * e], [n + 1, den], [a * c, b * e]], hint, frac, eq(`${a}/${b} + ${c}/${e} = ?`));
};

const subUnlike: Maker = (d) => {
  let [a, b, c, e] = unlikePair(d);
  if (a / b < c / e) [a, b, c, e] = [c, e, a, b];
  const [n, den] = [a * e - c * b, b * e];
  if (n === 0) return addUnlike(d);
  return fracChoice(`What is ${a}/${b} − ${c}/${e}?`, [n, den], [[Math.abs(a - c), Math.abs(b - e) || 1], [Math.abs(a - c), b * e], [n + 1, den], [a * e + c * b, den]], `Use a common denominator: ${a * e}/${b * e} − ${c * b}/${b * e}.`, frac, eq(`${a}/${b} − ${c}/${e} = ?`));
};

const mixedAdd: Maker = () => {
  const w1 = randInt(1, 4);
  const w2 = randInt(1, 4);
  const [a, b, c, e] = unlikePair(2);
  const den = b * e;
  const n = (w1 * b + a) * e + (w2 * e + c) * b;
  return fracChoice(`What is ${w1} ${a}/${b} + ${w2} ${c}/${e}?`, [n, den], [[n + den, den], [n - den, den], [(w1 + w2) * (b + e) + a + c, b + e]], "Add the whole numbers, then add the fractions with a common denominator.", mixed);
};

const runStory: Maker = () => {
  const [a, b, c, e] = unlikePair(1);
  const who = someone();
  const [n, den] = [a * e + c * b, b * e];
  return fracChoice(`${who} walks ${a}/${b} mile to the park and then ${c}/${e} mile to the library. How far is that in all?`, [n, den], [[a + c, b + e], [n, den * 2], [n + 1, den]], `Add ${a}/${b} + ${c}/${e} using a common denominator.`, (x, y) => `${frac(x, y)} mile`);
};

const benchmark: Maker = () => {
  const [a, b, c, e] = unlikePair(2);
  const sum = a / b + c / e;
  if (Math.abs(sum - 1) < 1e-9) return benchmark(2);
  return pickOne(`Is ${a}/${b} + ${c}/${e} more or less than 1?`, sum > 1 ? "More than 1" : "Less than 1", [sum > 1 ? "Less than 1" : "More than 1", "Exactly 1"], "Compare each fraction with 1/2 to estimate.");
};

// ---------- Grade 5: volume ----------

const UNITS3 = ["cubic inches", "cubic feet", "cubic centimetres"] as const;
const boxVolume: Maker = (d) => {
  const [l, w, h] = [randInt(2, d === 1 ? 5 : 10), randInt(2, d === 1 ? 4 : 8), randInt(2, d === 1 ? 4 : 9)];
  const u = pick(UNITS3);
  const short = u.split(" ")[1].replace("inches", "in").replace("feet", "ft").replace("centimetres", "cm");
  const q = `A box is ${l} ${short} long, ${w} ${short} wide and ${h} ${short} high. What is its volume?`;
  const hint = `Volume = length × width × height = ${l} × ${w} × ${h}.`;
  return d === 3 ? typed(q, l * w * h, hint, { suffix: u }) : num(q, l * w * h, hint, { extra: [l + w + h, l * w, 2 * (l * w + l * h + w * h)], count: 5, label: (n) => `${n} ${u}` });
};

const layers: Maker = () => {
  const per = randInt(4, 20);
  const n = randInt(2, 8);
  return num(`Each layer of a box holds ${per} unit cubes. There are ${n} layers. How many cubes fill the box?`, per * n, `${n} layers × ${per} cubes.`, { extra: [per + n, per * (n + 1)], count: 5 });
};

const missingSide: Maker = () => {
  const [l, w, h] = [randInt(2, 9), randInt(2, 6), randInt(2, 8)];
  return num(`A box has a volume of ${l * w * h} cubic feet. It is ${l} ft long and ${w} ft wide. How high is it?`, h, `Base area = ${l} × ${w} = ${l * w}. Then ${l * w * h} ÷ ${l * w}.`, { extra: [l * w * h - l - w, h * 2, l * w], count: 5, min: 1, label: (n) => `${n} ft` });
};

const twoBoxes: Maker = () => {
  const a = [randInt(2, 6), randInt(2, 5), randInt(2, 4)];
  const b = [randInt(2, 6), randInt(2, 5), randInt(2, 4)];
  const va = a[0] * a[1] * a[2];
  const vb = b[0] * b[1] * b[2];
  return num(`A shape is made of two boxes: ${a.join(" × ")} and ${b.join(" × ")} (in cm). What is its total volume?`, va + vb, `Find each volume: ${va} and ${vb}. Then add.`, { extra: [va * vb, va + vb + 10, Math.abs(va - vb)], count: 5, label: (n) => `${n} cm³` });
};

const volumeUnit: Maker = () =>
  pickOne(
    pick(["Which unit measures the volume of a box?", "Which unit tells how much space is inside a fish tank?", "Which unit measures volume?"]),
    pick(["cubic inches", "cubic feet", "cubic centimetres"]),
    shuffle(["square inches", "inches", "square feet", "pounds"]).slice(0, 3),
    "Volume counts cubes, so its units are cubic.",
  );

const cubeCount: Maker = () => {
  const [l, w, h] = [randInt(2, 4), randInt(2, 4), randInt(2, 3)];
  return num(`A box is ${l} cubes long, ${w} cubes wide and ${h} cubes high. How many unit cubes fill it?`, l * w * h, `One layer has ${l} × ${w} = ${l * w} cubes. There are ${h} layers.`, { extra: [l + w + h, l * w, l * w * h + l * w], count: 4 });
};

// ---------- Units ----------

export const G3_UNITS = [
  mathUnit({
    id: "wa-g3-times-tens",
    title: "Times Tens",
    emoji: "🔟",
    blurb: "Multiply by 10, 20, 30 ...",
    parentNote: "Multiplying a one-digit number by a multiple of ten (like 6 × 40) using a basic fact and place value.",
    codes: "M.3.Q.NBT.3",
    text: "multiplying one-digit whole numbers by multiples of 10 from 10 to 90",
    makers: [timesTens, factToTens, tensStory, missingTens],
  }),
  mathUnit({
    id: "wa-g3-two-step",
    title: "Two-Step Stories",
    emoji: "🪜",
    blurb: "Solve problems in two steps",
    parentNote: "Word problems that take two steps with any of the four operations, choosing an equation with a letter for the unknown, and checking an answer by estimating.",
    codes: "M.3.Q.OA.8",
    text: "solving two-step word problems with the four operations, writing an equation with a letter for the unknown, and checking answers with estimation",
    makers: [twoStep, bagsStory, whichEquation, reasonable],
  }),
  mathUnit({
    id: "wa-g3-inch-ruler",
    title: "Halves & Fourths of an Inch",
    emoji: "📐",
    blurb: "Measure to 1/4 inch",
    parentNote: "Measuring lengths to the nearest half and quarter inch, then reading the measurements from a table like a line plot.",
    codes: "M.3.DA.MD.4",
    text: "measuring lengths to the nearest half and fourth of an inch and showing the data in a line plot",
    makers: [measureQuarter, compareInches, plotHowMany, plotTotal, plotMost, plotLonger],
  }),
];

G3_UNITS.push(
  mathUnit({
    id: "wa-g3-scaled-graphs",
    title: "Scaled Graphs",
    emoji: "📊",
    blurb: "Each picture stands for more than 1",
    parentNote: "Reading picture graphs and bar graphs where each picture or step stands for 2, 5 or 10, answering how many more and how many in all, and choosing questions a survey can answer.",
    codes: "M.3.DA.MD.3; M.3.DA.DS.1; M.3.DA.DS.4",
    text: "reading scaled picture graphs and bar graphs, solving how-many-more and how-many-less problems, and asking questions that data can answer",
    makers: [scaledRead, scaledMore, scaledTotal, pictureKey, goodSurvey],
  }),
);

export const G4_UNITS = [
  mathUnit({
    id: "wa-g4-customary",
    title: "Feet, Pounds & Gallons",
    emoji: "⚖️",
    blurb: "Convert units of measure",
    parentNote: "Knowing how US customary units compare (12 inches in a foot, 16 ounces in a pound, 4 quarts in a gallon) as well as metric and time units, and converting a larger unit to a smaller one.",
    codes: "M.4.SR.MD.1; M.4.R.MD.2",
    text: "knowing the relative sizes of customary, metric and time units, converting larger units to smaller ones, and solving measurement word problems",
    makers: [convertUp, unitTable, heavier, mixedUnits, relativeSize, juiceStory],
  }),
  mathUnit({
    id: "wa-g4-line-plots",
    title: "Line Plots & Data",
    emoji: "📈",
    blurb: "Read data in fractions",
    parentNote: "Reading tables of measurements in halves, fourths and eighths of an inch, finding differences, comparing two classes, and choosing questions that need data.",
    codes: "M.4.DA.MD.4; M.4.DA.DS.1; M.4.DA.DS.3; M.4.DA.DS.4",
    text: "reading line plots and tables of measurements in fractions of a unit, comparing groups, and asking questions that need data",
    makers: [lpDifference, lpTotal, lpLongest, lpCombined, compareGroups, goodDataQuestion],
  }),
  mathUnit({
    id: "wa-g4-times-as-many",
    title: "Times as Many",
    emoji: "✖️",
    blurb: "Compare by multiplying",
    parentNote: "Multiplicative comparison: reading 35 = 5 × 7 as “35 is 5 times as many as 7”, and solving “times as many” problems, which are different from “more than” problems.",
    codes: "M.4.R.OA.1; M.4.Q.OA.2",
    text: "interpreting multiplication as a comparison and solving times-as-many word problems",
    makers: [timesAsMany, timesAsLong, readComparison, moreVsTimes],
  }),
];

export const G5_UNITS = [
  mathUnit({
    id: "wa-g5-conversions",
    title: "Converting Units",
    emoji: "🔁",
    blurb: "Inches to feet, grams to kilograms",
    parentNote: "Converting between units in the US customary and metric systems (both ways, including decimals) and using conversions in multi-step problems.",
    codes: "M.5.SR.MD.1",
    text: "converting among different-sized units within one measurement system and using conversions in multi-step problems",
    makers: [convertDown, convertDecimal, convertStory, convertUp, mixedUnits],
  }),
  mathUnit({
    id: "wa-g5-expressions",
    title: "Parentheses & Expressions",
    emoji: "🧩",
    blurb: "Brackets first!",
    parentNote: "Evaluating expressions with parentheses and brackets, writing an expression from words, and reading an expression without calculating it.",
    codes: "M.5.R.OA.1; M.5.R.OA.2",
    text: "evaluating numerical expressions with parentheses, brackets or braces, and writing and interpreting simple expressions",
    makers: [evalParens, evalBrackets, writeExpression, timesAsLarge, placeParens],
  }),
  mathUnit({
    id: "wa-g5-coordinates",
    title: "Coordinate Grid",
    emoji: "🗺️",
    blurb: "Plot points (x, y)",
    parentNote: "Naming and plotting points in the first quadrant of the coordinate grid, and reading what a point means in a real situation.",
    codes: "M.5.SR.G.1; M.5.SR.G.2",
    text: "using a coordinate grid to name and graph points in the first quadrant, and interpreting points in context",
    makers: [readPoint, moveFromOrigin, onAxis, distanceSameLine, graphStory],
  }),
  mathUnit({
    id: "wa-g5-fraction-multiply",
    title: "Multiply & Divide Fractions",
    emoji: "🍰",
    blurb: "Fractions times and shared",
    parentNote: "Multiplying a fraction by a whole number or a fraction, dividing a unit fraction by a whole number (and the other way round), and seeing a fraction as sharing.",
    codes: "M.5.Q.NF.3; M.5.Q.NF.4; M.5.Q.NF.5; M.5.Q.NF.7",
    text: "interpreting a fraction as division, multiplying fractions, seeing multiplication as scaling, and dividing unit fractions and whole numbers",
    makers: [fracOfWhole, fracTimesFrac, unitDivWhole, wholeDivUnit, shareAsDivision, scaling, recipeStory],
  }),
  mathUnit({
    id: "wa-g5-add-unlike",
    title: "Unlike Denominators",
    emoji: "➕",
    blurb: "Add fractions with different bottoms",
    parentNote: "Adding and subtracting fractions and mixed numbers with different denominators by finding a common denominator, and checking with benchmark fractions.",
    codes: "M.5.Q.NF.1; M.5.Q.NF.2",
    text: "adding and subtracting fractions and mixed numbers with unlike denominators, including in word problems",
    makers: [addUnlike, subUnlike, mixedAdd, runStory, benchmark],
  }),
  mathUnit({
    id: "wa-g5-volume",
    title: "Volume of Boxes",
    emoji: "📦",
    blurb: "Cubes, layers and l × w × h",
    parentNote: "Finding volume by counting unit cubes and layers, using V = l × w × h, finding a missing side, and adding the volumes of two boxes.",
    codes: "M.5.SR.MD.3; M.5.SR.MD.4; M.5.SR.MD.5",
    text: "understanding volume, measuring it with unit cubes, and using V = l × w × h, including for figures made of two boxes",
    makers: [boxVolume, layers, missingSide, twoBoxes, volumeUnit, cubeCount],
  }),
];

