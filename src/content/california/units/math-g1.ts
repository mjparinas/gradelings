import { pick, randInt, shuffle } from "../../random";
import type { Visual } from "../../types";
import { num, pickOne, someone, typed, type Maker } from "../../washington/units/math-kit";
import { mathUnit } from "./math";

// Grade 1: word problems that add three whole numbers with a sum up to 20 (1.OA.2), with the unknown number in a
// three-number equation (1.OA.8). The shared helpers are in ./math.ts.

const THINGS = [
  { what: "shells", emoji: "🐚", verb: "found" },
  { what: "apples", emoji: "🍎", verb: "picked" },
  { what: "stickers", emoji: "⭐", verb: "got" },
  { what: "blocks", emoji: "🧱", verb: "stacked" },
  { what: "leaves", emoji: "🍂", verb: "found" },
  { what: "beads", emoji: "📿", verb: "used" },
  { what: "carrots", emoji: "🥕", verb: "picked" },
];
const DAYS = ["Monday", "Tuesday", "Wednesday"];

/** Three addends with a sum from 6 to 20 (smaller at difficulty 1). */
function three(d: number): [number, number, number] {
  const max = d === 1 ? 5 : 8;
  for (;;) {
    const t: [number, number, number] = [randInt(1, max), randInt(1, max), randInt(1, max)];
    const sum = t[0] + t[1] + t[2];
    if (sum >= 6 && sum <= (d === 1 ? 12 : 20)) return t;
  }
}

const story = (lines: string[]): Visual => ({ type: "story", lines });

const inAll: Maker = (d) => {
  const t = pick(THINGS);
  const name = someone();
  const [a, b, c] = three(d);
  const lines = DAYS.map((day, i) => `On ${day}, ${name} ${t.verb} ${[a, b, c][i]} ${t.what}.`);
  const prompt = `How many ${t.what} in all?`;
  const hint = `Add all three: ${a} + ${b} + ${c} = ${a + b + c}.`;
  if (d === 3) return typed(prompt, a + b + c, hint, { visual: story(lines) });
  return num(prompt, a + b + c, hint, { min: 1, max: 20, extra: [a + b, b + c], visual: story(lines) });
};

const COLORS = ["red", "blue", "green", "yellow"];

const colorsInAll: Maker = (d) => {
  const t = pick(THINGS.filter((x) => ["stickers", "blocks", "beads"].includes(x.what)));
  const [a, b, c] = three(d);
  const cols = shuffle(COLORS).slice(0, 3);
  const name = someone();
  return num(
    `How many ${t.what} does ${name} have?`,
    a + b + c,
    `Look for two numbers that are easy to add first. ${a} + ${b} + ${c} = ${a + b + c}.`,
    { min: 1, max: 20, extra: [a + b, a + c], visual: story([`${name} has ${a} ${cols[0]}, ${b} ${cols[1]} and ${c} ${cols[2]} ${t.what}.`]) },
  );
};

const matchSentence: Maker = (d) => {
  const t = pick(THINGS);
  const name = someone();
  const [a, b, c] = three(d);
  const lines = [`${name} ${t.verb} ${a} ${t.what}.`, `Then ${b} more.`, `Then ${c} more.`];
  return pickOne(
    "Which number sentence tells the story?",
    `${a} + ${b} + ${c} = ?`,
    [`${a} + ${b} = ?`, `${a} + ${b} − ${c} = ?`, `${a} − ${b} + ${c} = ?`].filter((w) => !w.includes("−") || a >= b),
    "Each part of the story adds more, so add all three numbers.",
    story(lines),
  );
};

const makeTenFirst: Maker = () => {
  const a = randInt(1, 9);
  const b = 10 - a;
  const c = pick([1, 2, 3, 4, 5, 6, 7, 8, 9].filter((n) => n !== a && n !== b));
  const order = shuffle([a, b, c]);
  const pairs = [
    [order[0], order[1]],
    [order[1], order[2]],
    [order[0], order[2]],
  ];
  const right = `${a} + ${b}`;
  const wrong = pairs.map(([x, y]) => `${x} + ${y}`).filter((p) => x10(p) !== 10);
  return pickOne(
    `Add ${order.join(" + ")}. Which two make 10 to add first?`,
    right,
    wrong.length ? wrong : [`${a} + ${c}`],
    `${a} + ${b} = 10. Then 10 + ${c} = ${10 + c}.`,
  );
};
const x10 = (p: string) => p.split(" + ").reduce((s, n) => s + Number(n), 0);

const missingThird: Maker = (d) => {
  const [a, b, c] = three(d);
  const total = a + b + c;
  const prompt = `${a} + ${b} + ☐ = ${total}. What number goes in the box?`;
  const hint = `${a} + ${b} = ${a + b}. Count up from ${a + b} to ${total}.`;
  if (d === 3) return typed(prompt, c, hint);
  return num(prompt, c, hint, { min: 0, max: 20 });
};

const howManyMore: Maker = (d) => {
  const t = pick(THINGS);
  const name = someone();
  const [a, b, c] = three(d);
  const total = a + b + c;
  return num(
    `${name} needs ${total} ${t.what}. How many more?`,
    c,
    `${a} + ${b} = ${a + b}. ${a + b} + ${c} = ${total}.`,
    { min: 0, max: 20, visual: story([`${name} has ${a} ${t.what} in one bag and ${b} in another.`]) },
  );
};

export const THREE_ADDENDS_1 = mathUnit({
  id: "ca-g1-three-addends",
  title: "Add Three Numbers",
  emoji: "🧺",
  blurb: "Stories with three numbers to add",
  parentNote:
    "Solving word problems that add three numbers with a total up to 20, looking for two numbers that make 10 first, and finding a missing number in a three-number equation.",
  codes: "1.OA.2; 1.OA.8",
  text: "solving word problems that add three whole numbers with a sum up to 20, and finding the unknown number in an equation",
  makers: [inAll, colorsInAll, matchSentence, makeTenFirst, missingThird, howManyMore],
});

export const MATH_1 = [THREE_ADDENDS_1];
