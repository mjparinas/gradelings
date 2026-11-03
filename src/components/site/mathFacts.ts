import { factHint, factsIn, getFactSet, type Fact, type FactSet, type FactSetId } from "@/lib/facts";

// Public math facts pages (/math-facts/ and one page per set): the same six sets the app practises, with a chart,
// the strategies from the app's lesson and a few tap-to-answer facts. Nothing here is tied to a province or state,
// so the pages say nothing about a curriculum. Everything is worked out from `src/lib/facts.ts`.

export interface MathFactsPage {
  slug: string;
  set: FactSetId;
  /** The page's heading, also the link text on the hub. */
  title: string;
  /** What searchers call it. */
  search: string;
  /** Who it is for, in a few words: "Grades 1 and 2". */
  grades: string;
  intro: string;
  faqs: { q: string; a: string }[];
}

export const MATH_FACTS_PAGES: readonly MathFactsPage[] = [
  {
    slug: "adding-to-10",
    set: "add10",
    title: "Addition facts to 10",
    search: "addition facts to 10",
    grades: "Grades 1 and 2",
    intro: "The 45 facts from 1 + 1 to 9 + 1 are the first ones children learn to know by heart. Once they come quickly, bigger sums get much easier.",
    faqs: [
      { q: "When should a child know addition facts to 10?", a: "Most children learn them in Grade 1 and use them without counting by the middle of Grade 2. Knowing them quickly frees up attention for harder problems." },
      { q: "What if my child still counts on their fingers?", a: "That is a normal first step. Practise a few facts at a time and try the strategies on this page, like counting on from the bigger number, so counting slowly turns into remembering." },
    ],
  },
  {
    slug: "taking-away-to-10",
    set: "sub10",
    title: "Subtraction facts to 10",
    search: "subtraction facts to 10",
    grades: "Grades 1 and 2",
    intro: "Taking away to 10 is the other side of adding to 10. Children who see that 7 − 3 asks “what do I add to 3 to make 7?” learn both together.",
    faqs: [
      { q: "How are subtraction facts related to addition facts?", a: "Each subtraction fact undoes an addition fact. If a child knows 3 + 4 = 7, then 7 − 3 = 4 and 7 − 4 = 3 are the same three numbers in a different order." },
      { q: "Should my child count back?", a: "Counting back works for taking away 1, 2 or 3. For bigger numbers, thinking “what goes with 4 to make 9?” is quicker and makes fewer mistakes." },
    ],
  },
  {
    slug: "addition-facts",
    set: "add",
    title: "Addition facts to 20",
    search: "addition facts to 20",
    grades: "Grade 2 and up",
    intro: "The 100 facts from 1 + 1 to 10 + 10 cover every sum up to 20. Doubles, near doubles and making a ten take most of the work out of them.",
    faqs: [
      { q: "What is the fastest way to learn addition facts to 20?", a: "Learn the doubles first, then use them for near doubles (6 + 7 is 6 + 6 plus 1), then practise making a ten (9 + 5 is 10 + 4). A few facts a day beats a long session." },
      { q: "How many addition facts are there?", a: "There are 100 facts when both numbers run from 1 to 10. Because 3 + 8 and 8 + 3 have the same answer, a child really learns far fewer than 100 separate ideas." },
    ],
  },
  {
    slug: "subtraction-facts",
    set: "sub",
    title: "Subtraction facts to 20",
    search: "subtraction facts to 20",
    grades: "Grade 2 and up",
    intro: "Subtraction facts to 20 undo the addition facts. A child who knows 8 + 7 = 15 already has the key to 15 − 7 and 15 − 8.",
    faqs: [
      { q: "Why is subtraction harder than addition?", a: "The order matters (9 − 4 is not 4 − 9), and counting back is easy to slip on. Thinking of the missing addend (“4 and what make 9?”) avoids both problems." },
      { q: "How can I help at home?", a: "Say a fact family out loud, like 6, 8 and 14: 6 + 8, 8 + 6, 14 − 6, 14 − 8. Then ask for one of the four." },
    ],
  },
  {
    slug: "times-tables",
    set: "mul",
    title: "Times tables to 10 × 10",
    search: "times tables practice",
    grades: "Grade 3 and up",
    intro: "The 100 multiplication facts from 1 × 1 to 10 × 10 are the base for fractions, division and algebra. Patterns make them far less to memorize than they look.",
    faqs: [
      { q: "Which times tables are easiest to learn first?", a: "Start with 1, 2, 5 and 10, which follow clear patterns. Then add 4 (double twice), 9 (a ten take away one group) and finally 3, 6, 7 and 8, which have fewer shortcuts." },
      { q: "How many multiplication facts are there?", a: "There are 100 from 1 × 1 to 10 × 10. Since 3 × 7 and 7 × 3 are the same, about half of them are repeats once a child sees the pattern." },
      { q: "How long does it take to learn the times tables?", a: "A few minutes a day for a few weeks works better than one long session. Mixing facts a child is learning with ones they know keeps practice from feeling like a grind." },
    ],
  },
  {
    slug: "division-facts",
    set: "div",
    title: "Division facts to 10 × 10",
    search: "division facts practice",
    grades: "Grade 3 and up",
    intro: "Every division fact is a times table fact read backwards. A child who knows 6 × 7 = 42 can answer 42 ÷ 7 and 42 ÷ 6.",
    faqs: [
      { q: "How do times tables help with division?", a: "Dividing asks “what times this makes that?” So 56 ÷ 8 is the same question as 8 × ? = 56. Strong times tables make division facts quick." },
      { q: "What is a fact family?", a: "Three numbers that go together, like 6, 7 and 42. They give two multiplications (6 × 7, 7 × 6) and two divisions (42 ÷ 6, 42 ÷ 7)." },
    ],
  },
];

export const mathFactsPath = {
  hub: () => "/math-facts/",
  set: (p: Pick<MathFactsPage, "slug">) => `/math-facts/${p.slug}/`,
};

export function mathFactsBySlug(slug: string): MathFactsPage | undefined {
  return MATH_FACTS_PAGES.find((p) => p.slug === slug);
}

export function factSetOf(p: MathFactsPage): FactSet {
  const s = getFactSet(p.set);
  if (!s) throw new Error(`No fact set ${p.set}`);
  return s;
}

export interface FactQuiz {
  prompt: string;
  choices: { id: string; label: string }[];
  answer: string;
  hint: string;
}

/** Three sample facts spread across the set, each with four different choices near the answer, in a fixed order. */
export function factQuizzes(p: MathFactsPage): FactQuiz[] {
  const facts = factsIn(p.set);
  const picks: Fact[] = [0.2, 0.5, 0.85].map((at) => facts[Math.floor(facts.length * at)]);
  return picks.map((f, i) => {
    const near = [f.answer + 1, f.answer - 1, f.answer + 2, f.answer - 2, f.answer + 10, f.answer + 3].filter((n) => n >= 0 && n !== f.answer);
    const values = [f.answer, ...near.slice(0, 3)];
    // A fixed shuffle that puts the right answer in a different place for each question.
    const order = [i % 4, (i + 1) % 4, (i + 2) % 4, (i + 3) % 4];
    const choices = order.map((o) => ({ id: String(values[o]), label: String(values[o]) }));
    return { prompt: `${f.op === "add" ? `${f.a} + ${f.b}` : f.op === "sub" ? `${f.a} − ${f.b}` : f.op === "mul" ? `${f.a} × ${f.b}` : `${f.a} ÷ ${f.b}`} = ?`, choices, answer: String(f.answer), hint: factHint(f) };
  });
}

/** The chart for a set: rows and columns 1 to 10 with the answer where the fact exists, or a blank for a fact the set does not have. */
export function factChart(p: MathFactsPage): { sign: string; rows: (number | null)[][] } | null {
  const set = factSetOf(p);
  if (set.op !== "add" && set.op !== "mul") return null;
  const have = new Map(factsIn(p.set).map((f) => [`${f.a}:${f.b}`, f.answer]));
  const rows = Array.from({ length: 10 }, (_, r) => Array.from({ length: 10 }, (_, c) => have.get(`${r + 1}:${c + 1}`) ?? null));
  return { sign: set.op === "add" ? "+" : "×", rows };
}
