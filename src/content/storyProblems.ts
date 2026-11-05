import type { AgeBand } from "./types";
import { hashSeed, pick, randInt, shuffle, withSeed } from "./random";

// Story problems: short word problems with a number answer, a fresh set every time. They are made from
// templates, so there are endless variations, and each template leads with a common slip (adding when
// you should subtract, finding the perimeter instead of the area) as a wrong choice. Region-free: no
// money, place, holiday, curriculum or measurement units (counts only), so one set serves every province
// and state. Nothing here is scored or saved: story problems are for thinking, not practice.

export const PROBLEM_COUNT = 5;

export interface StoryProblem {
  id: string;
  prompt: string;
  /** For the youngest: the groups drawn as pictures. */
  scene?: string;
  choices: number[];
  answer: number;
  /** The answer in steps, shown after a second miss and as praise. */
  why: string;
}

interface Made {
  prompt: string;
  scene?: string;
  answer: number;
  /** Likely slips, tried first as wrong choices. */
  slips: number[];
  why: string;
}

interface Template {
  id: string;
  make: () => Made;
}

const NAMES = ["Ana", "Ben", "Chen", "Dara", "Eli", "Farah", "Gus", "Hana", "Ivan", "Jo", "Kofi", "Lena", "Mina", "Noor", "Omar", "Pia", "Raj", "Sana", "Tess", "Yuki"];
/** Things to count: plural noun and a picture. */
const THINGS: [string, string][] = [
  ["apples", "🍎"],
  ["stars", "⭐"],
  ["balloons", "🎈"],
  ["shells", "🐚"],
  ["flowers", "🌸"],
  ["books", "📘"],
  ["marbles", "🔵"],
  ["cookies", "🍪"],
];
const BIG_THINGS = ["stickers", "cards", "pencils", "marbles", "shells", "books", "beads", "stamps"];

function twoNames(): [string, string] {
  const [a, b] = shuffle(NAMES);
  return [a, b];
}

// ——— Pre-K to Grade 1: numbers to 10, with pictures ———
const LITTLE: Template[] = [
  {
    id: "join",
    make: () => {
      const [n, m] = twoNames();
      const [thing, icon] = pick(THINGS);
      const a = randInt(1, 6);
      const b = randInt(1, 10 - a);
      return {
        prompt: `${n} has ${a} ${thing}. ${m} gives ${n} ${b} more. How many ${thing} does ${n} have now?`,
        scene: `${icon.repeat(a)}  ${icon.repeat(b)}`,
        answer: a + b,
        slips: [Math.abs(a - b), a],
        why: `${a} and ${b} more make ${a + b}.`,
      };
    },
  },
  {
    id: "take-away",
    make: () => {
      const [n] = twoNames();
      const [thing, icon] = pick(THINGS);
      const a = randInt(3, 10);
      const b = randInt(1, a - 1);
      return {
        prompt: `${n} has ${a} ${thing}. ${n} gives away ${b}. How many ${thing} are left?`,
        scene: icon.repeat(a),
        answer: a - b,
        slips: [a + b, b],
        why: `${a} take away ${b} leaves ${a - b}.`,
      };
    },
  },
  {
    id: "in-all",
    make: () => {
      const [thing, icon] = pick(THINGS);
      const a = randInt(1, 6);
      const b = randInt(1, 10 - a);
      return {
        prompt: `There are ${a} ${thing} in one basket and ${b} ${thing} in another. How many ${thing} in all?`,
        scene: `${icon.repeat(a)}  ${icon.repeat(b)}`,
        answer: a + b,
        slips: [Math.abs(a - b), a],
        why: `${a} and ${b} together make ${a + b}.`,
      };
    },
  },
  {
    id: "how-many-more",
    make: () => {
      const [n, m] = twoNames();
      const [thing, icon] = pick(THINGS);
      const a = randInt(4, 10);
      const b = randInt(1, a - 1);
      return {
        prompt: `${n} has ${a} ${thing}. ${m} has ${b}. How many more does ${n} have?`,
        scene: `${icon.repeat(a)}  ${icon.repeat(b)}`,
        answer: a - b,
        slips: [a + b, b],
        why: `${a} − ${b} = ${a - b}.`,
      };
    },
  },
  {
    id: "need-more",
    make: () => {
      const [n] = twoNames();
      const [thing, icon] = pick(THINGS);
      const total = randInt(5, 10);
      const a = randInt(1, total - 1);
      return {
        prompt: `${n} wants ${total} ${thing}. ${n} has ${a}. How many more does ${n} need?`,
        scene: icon.repeat(a),
        answer: total - a,
        slips: [total + a, a],
        why: `${total} − ${a} = ${total - a}.`,
      };
    },
  },
];

// ——— Grades 2 to 4 ———
const MIDDLE: Template[] = [
  {
    id: "add",
    make: () => {
      const [n] = twoNames();
      const a = randInt(20, 89);
      const b = randInt(11, 99 - a);
      return {
        prompt: `${n} read ${a} pages on Monday and ${b} pages on Tuesday. How many pages in all?`,
        answer: a + b,
        slips: [a - b, a + b + 10, a + b - 10],
        why: `${a} + ${b} = ${a + b}.`,
      };
    },
  },
  {
    id: "subtract",
    make: () => {
      const [n] = twoNames();
      const thing = pick(BIG_THINGS);
      const a = randInt(40, 99);
      const b = randInt(11, a - 10);
      return {
        prompt: `${n} had ${a} ${thing} and gave ${b} away. How many ${thing} are left?`,
        answer: a - b,
        slips: [a + b, a - b + 10, a - b - 10],
        why: `${a} − ${b} = ${a - b}.`,
      };
    },
  },
  {
    id: "equal-groups",
    make: () => {
      const thing = pick(BIG_THINGS);
      const n = randInt(3, 9);
      const m = randInt(3, 9);
      return {
        prompt: `There are ${n} bags with ${m} ${thing} in each bag. How many ${thing} in all?`,
        answer: n * m,
        slips: [n + m, n * m + m, n * m - n],
        why: `${n} groups of ${m} is ${n} × ${m} = ${n * m}.`,
      };
    },
  },
  {
    id: "share",
    make: () => {
      const thing = pick(BIG_THINGS);
      const n = randInt(3, 8);
      const m = randInt(3, 9);
      return {
        prompt: `${n * m} ${thing} are shared equally by ${n} friends. How many does each friend get?`,
        answer: m,
        slips: [n * m - n, n + m, n * m + n],
        why: `${n * m} ÷ ${n} = ${m}.`,
      };
    },
  },
  {
    id: "two-step",
    make: () => {
      const [n] = twoNames();
      const thing = pick(BIG_THINGS);
      const a = randInt(20, 50);
      const b = randInt(10, 30);
      const c = randInt(5, a + b - 10);
      return {
        prompt: `${n} has ${a} ${thing}, gets ${b} more, then gives away ${c}. How many ${thing} does ${n} have now?`,
        answer: a + b - c,
        slips: [a + b + c, a + b, a - b - c < 0 ? a + c : a - b - c],
        why: `${a} + ${b} = ${a + b}, then ${a + b} − ${c} = ${a + b - c}.`,
      };
    },
  },
  {
    id: "how-many-more",
    make: () => {
      const [n, m] = twoNames();
      const a = randInt(45, 99);
      const b = randInt(12, a - 10);
      return {
        prompt: `${n} scored ${a} points and ${m} scored ${b}. How many more points did ${n} score?`,
        answer: a - b,
        slips: [a + b, a - b + 10, a - b - 10],
        why: `${a} − ${b} = ${a - b}.`,
      };
    },
  },
];

// ——— Grades 5 to 9 ———
const BIG: Template[] = [
  {
    id: "multiply-add",
    make: () => {
      const [n] = twoNames();
      const thing = pick(BIG_THINGS);
      const m = randInt(6, 12);
      const k = randInt(4, 9);
      const c = randInt(3, m - 1);
      return {
        prompt: `A box holds ${m} ${thing}. ${n} fills ${k} boxes and has ${c} extra ${thing}. How many ${thing} does ${n} have?`,
        answer: m * k + c,
        slips: [m * (k + c), m + k + c, m * k],
        why: `${k} × ${m} = ${m * k}, then ${m * k} + ${c} = ${m * k + c}.`,
      };
    },
  },
  {
    id: "fraction-of",
    make: () => {
      const [n] = twoNames();
      const thing = pick(BIG_THINGS);
      const den = pick([2, 3, 4, 5, 6]);
      const total = den * randInt(4, 12);
      const part = total / den;
      return {
        prompt: `${n} has ${total} ${thing}. ${{ 2: "Half", 3: "A third", 4: "A quarter", 5: "A fifth", 6: "A sixth" }[den]} of them are red. How many are red?`,
        answer: part,
        slips: [total - part, den, total * den],
        why: `1/${den} of ${total} is ${total} ÷ ${den} = ${part}.`,
      };
    },
  },
  {
    id: "percent-of",
    make: () => {
      const p = pick([10, 25, 50]);
      const total = pick([40, 60, 80, 100, 120, 160, 200]);
      const part = (total * p) / 100;
      return {
        prompt: `In a class of ${total} students, ${p}% walk to school. How many students walk?`,
        answer: part,
        slips: [total - part, p, part * 2],
        why: `${p}% of ${total} is ${total} × ${p} ÷ 100 = ${part}.`,
      };
    },
  },
  {
    id: "unit-rate",
    make: () => {
      const rate = randInt(4, 12);
      const mins = randInt(3, 6);
      const more = mins + randInt(2, 6);
      return {
        prompt: `A printer prints ${rate * mins} pages in ${mins} minutes at a steady rate. How many pages does it print in ${more} minutes?`,
        answer: rate * more,
        slips: [rate * mins + more, rate * mins * more, rate * (more - mins)],
        why: `${rate * mins} ÷ ${mins} = ${rate} pages each minute, and ${rate} × ${more} = ${rate * more}.`,
      };
    },
  },
  {
    id: "mean",
    make: () => {
      const [n] = twoNames();
      const mean = randInt(12, 40);
      const d1 = randInt(1, 6);
      const d2 = randInt(1, 6);
      const a = mean + d1;
      const b = mean + d2;
      const c = mean - d1 - d2;
      return {
        prompt: `${n} scored ${a}, ${b} and ${c} points in three games. What was the mean score?`,
        answer: mean,
        slips: [a + b + c, b, Math.max(a, b, c)],
        why: `${a} + ${b} + ${c} = ${a + b + c}, and ${a + b + c} ÷ 3 = ${mean}.`,
      };
    },
  },
  {
    id: "pages-left",
    make: () => {
      const [n] = twoNames();
      const perDay = randInt(8, 25);
      const days = randInt(3, 7);
      const total = perDay * days + randInt(10, 60);
      return {
        prompt: `A book has ${total} pages. ${n} reads ${perDay} pages a day for ${days} days. How many pages are left?`,
        answer: total - perDay * days,
        slips: [perDay * days, total - perDay, total - days],
        why: `${perDay} × ${days} = ${perDay * days} pages read, and ${total} − ${perDay * days} = ${total - perDay * days}.`,
      };
    },
  },
  {
    id: "area-squares",
    make: () => {
      const l = randInt(5, 12);
      const w = randInt(3, l - 1);
      return {
        prompt: `A rectangle is ${l} squares long and ${w} squares wide. How many squares cover it?`,
        answer: l * w,
        slips: [2 * (l + w), l + w, l * w + l],
        why: `${l} × ${w} = ${l * w} squares.`,
      };
    },
  },
];

const TEMPLATES: Record<AgeBand, Template[]> = { little: LITTLE, middle: MIDDLE, big: BIG };

export function storyTemplateIds(band: AgeBand): string[] {
  return TEMPLATES[band].map((t) => t.id);
}

/** One problem from a template, with three number choices; the same for a seed. */
export function storyProblem(band: AgeBand, templateId: string, seed: string): StoryProblem {
  const template = TEMPLATES[band].find((t) => t.id === templateId)!;
  return withSeed(hashSeed(`story:${band}:${templateId}:${seed}`), () => {
    const made = template.make();
    const wrong: number[] = [];
    for (const s of shuffle(made.slips)) {
      if (s >= 0 && s !== made.answer && !wrong.includes(s)) wrong.push(s);
      if (wrong.length === 2) break;
    }
    for (let off = 1; wrong.length < 2; off++) {
      for (const n of [made.answer + off, made.answer - off]) {
        if (wrong.length < 2 && n >= 0 && n !== made.answer && !wrong.includes(n)) wrong.push(n);
      }
    }
    const choices = shuffle([made.answer, ...wrong]);
    return { id: `${band}:${templateId}`, prompt: made.prompt, scene: made.scene, choices, answer: choices.indexOf(made.answer), why: made.why };
  });
}

/** A set of problems with a different template for each, chosen by seed. */
export function storySet(band: AgeBand, seed: string, count = PROBLEM_COUNT): StoryProblem[] {
  const ids = withSeed(hashSeed(`storyset:${band}:${seed}`), () => shuffle(storyTemplateIds(band)));
  return ids.slice(0, count).map((id) => storyProblem(band, id, seed));
}
