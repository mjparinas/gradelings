import { pick, randInt, sample } from "@/content/random";
import type { GradeId } from "@/content/types";
import type { Country } from "./types";

// Timeline Snap: cards to put in order. Sequences (life cycles, the day, Canadian or US history,
// inventions) and number lines (whole numbers, fractions, decimals, integers) by grade.

export interface OrderItem {
  label: string;
  emoji?: string;
}

export interface OrderSet {
  title: string;
  speak: string;
  /** In the right order. */
  items: OrderItem[];
}

const G: Record<GradeId, number> = { k: 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9 };
const it = (label: string, emoji?: string): OrderItem => ({ label, emoji });

interface Sequence {
  title: string;
  speak: string;
  items: OrderItem[];
}

const ROUTINE: Sequence = {
  title: "Put the day in order",
  speak: "Put the day in order, from morning to night",
  items: [it("Wake up", "🌅"), it("Eat breakfast", "🥣"), it("Go to school", "🎒"), it("Eat dinner", "🍝"), it("Go to bed", "🛏️")],
};
const PLANT: Sequence = {
  title: "How does a plant grow?",
  speak: "Put the plant in order as it grows",
  items: [it("Seed", "🌰"), it("Sprout", "🌱"), it("Young plant", "🌿"), it("Flower", "🌻")],
};
const BUTTERFLY: Sequence = {
  title: "Butterfly life cycle",
  speak: "Put the butterfly's life cycle in order, starting with the egg",
  items: [it("Egg", "🥚"), it("Caterpillar", "🐛"), it("Chrysalis", "🫘"), it("Butterfly", "🦋")],
};
const CHICK: Sequence = {
  title: "From egg to hen",
  speak: "Put them in order, from egg to hen",
  items: [it("Egg", "🥚"), it("Hatching", "🐣"), it("Chick", "🐥"), it("Hen", "🐔")],
};
const SIZES: Sequence = {
  title: "Smallest to biggest",
  speak: "Put the animals in order from smallest to biggest",
  items: [it("Ant", "🐜"), it("Mouse", "🐭"), it("Cat", "🐱"), it("Horse", "🐴"), it("Elephant", "🐘")],
};
const SEASONS: Sequence = {
  title: "The seasons, starting with spring",
  speak: "Put the seasons in order, starting with spring",
  items: [it("Spring", "🌷"), it("Summer", "☀️"), it("Fall", "🍂"), it("Winter", "❄️")],
};
const FROG: Sequence = {
  title: "Frog life cycle",
  speak: "Put the frog's life cycle in order, starting with the eggs",
  items: [it("Eggs", "🫧"), it("Tadpole", "〰️"), it("Tadpole with legs", "🦵"), it("Froglet", "🐸"), it("Adult frog", "🐸")],
};
const DAYS: Sequence = {
  title: "Days of the week, starting with Monday",
  speak: "Put the days in order, starting with Monday",
  items: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((d) => it(d, "📅")),
};
const MONTHS: Sequence = {
  title: "Months, starting with January",
  speak: "Put the months in order, starting with January",
  items: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"].map((m) => it(m, "🗓️")),
};
const PLANETS: Sequence = {
  title: "Planets, closest to the Sun first",
  speak: "Put the planets in order, closest to the Sun first",
  items: [it("Mercury", "⚪"), it("Venus", "🟡"), it("Earth", "🌍"), it("Mars", "🔴"), it("Jupiter", "🟠"), it("Saturn", "🪐"), it("Uranus", "🔵"), it("Neptune", "🔵")],
};
const CANADA_GROWS: Sequence = {
  title: "Canada grows: earliest first",
  speak: "Put these in order, earliest first",
  items: [
    it("Confederation", "🍁"),
    it("Manitoba joins Canada", "🦬"),
    it("British Columbia joins Canada", "🌲"),
    it("Prince Edward Island joins Canada", "🏝️"),
    it("Alberta and Saskatchewan join Canada", "🌾"),
    it("Newfoundland and Labrador joins Canada", "⚓"),
    it("Nunavut is created", "🧊"),
  ],
};
const CANADA_HISTORY: Sequence = {
  title: "Canada's history: earliest first",
  speak: "Put these events in order, earliest first",
  items: [
    it("Most women can vote in federal elections", "🗳️"),
    it("Newfoundland and Labrador joins Canada", "⚓"),
    it("The maple leaf flag is raised", "🍁"),
    it("The Charter of Rights and Freedoms", "📜"),
    it("Nunavut is created", "🧊"),
  ],
};
const US_GROWS: Sequence = {
  title: "The United States grows: earliest first",
  speak: "Put these in order, earliest first",
  items: [
    it("The Declaration of Independence", "📜"),
    it("The Constitution is signed", "🖋️"),
    it("The Louisiana Purchase", "🗺️"),
    it("California becomes a state", "🌉"),
    it("Washington becomes a state", "🌲"),
    it("Alaska and Hawaii become states", "🏝️"),
  ],
};
const US_1900S: Sequence = {
  title: "US history: earliest first",
  speak: "Put these events in order, earliest first",
  items: [
    it("Women win the right to vote", "🗳️"),
    it("Brown v. Board of Education", "🏫"),
    it("Alaska and Hawaii become states", "🏝️"),
    it("The Civil Rights Act", "⚖️"),
    it("The Americans with Disabilities Act", "♿"),
  ],
};
const INVENTIONS: Sequence = {
  title: "Inventions: earliest first",
  speak: "Put these in order, earliest first",
  items: [it("Printing press", "📰"), it("Telephone", "☎️"), it("First airplane flight", "✈️"), it("First person on the Moon", "🌕"), it("World Wide Web", "🌐")],
};
const ANCIENT: Sequence = {
  title: "Ancient builders: earliest first",
  speak: "Put these in order, earliest first",
  items: [it("Pyramids of Giza", "🔺"), it("The Parthenon in Athens", "🏛️"), it("The Colosseum in Rome", "🏟️"), it("Machu Picchu", "⛰️")],
};
const ORGANIZATION: Sequence = {
  title: "Smallest to largest in a living thing",
  speak: "Put these in order from smallest to largest",
  items: [it("Cell", "🔬"), it("Tissue", "🧫"), it("Organ", "🫀"), it("Organ system", "🫁"), it("Organism", "🧍")],
};
const SPACE: Sequence = {
  title: "Smallest to largest in space",
  speak: "Put these in order from smallest to largest",
  items: [it("Moon", "🌙"), it("Mars", "🔴"), it("Earth", "🌍"), it("Neptune", "🔵"), it("Jupiter", "🟠"), it("Sun", "☀️")],
};

/** `count` items from a sequence, keeping their order. */
function from(seq: Sequence, count: number): OrderSet {
  const n = Math.min(count, seq.items.length);
  const picks = sample(
    seq.items.map((_, i) => i),
    n,
  ).sort((a, b) => a - b);
  return { title: seq.title, speak: seq.speak, items: picks.map((i) => seq.items[i]) };
}

/** Canadian spacing for big numbers (12 345), or US commas (12,345); none for four digits. */
export function spaced(n: number, country: Country = "CA"): string {
  const s = String(Math.abs(n));
  const body = s.length <= 4 ? s : s.replace(/\B(?=(\d{3})+(?!\d))/g, country === "US" ? "," : " ");
  return n < 0 ? `−${body}` : body;
}

function distinct(count: number, make: () => number): number[] {
  const seen = new Set<number>();
  for (let i = 0; i < 400 && seen.size < count; i++) seen.add(make());
  return [...seen];
}

function wholeNumbers(max: number, count: number, country: Country = "CA"): OrderSet {
  const values = distinct(count, () => randInt(0, max)).sort((a, b) => a - b);
  return { title: "Smallest number first", speak: "Put the numbers in order, smallest first", items: values.map((v) => it(spaced(v, country))) };
}

function integers(count: number): OrderSet {
  const values = distinct(count, () => randInt(-15, 15)).sort((a, b) => a - b);
  return { title: "Least to greatest", speak: "Put the integers in order from least to greatest", items: values.map((v) => it(spaced(v))) };
}

function decimals(count: number): OrderSet {
  const values = distinct(count, () => (pick([10, 100]) === 10 ? randInt(1, 9) / 10 : randInt(1, 99) / 100)).sort((a, b) => a - b);
  return { title: "Least to greatest", speak: "Put the decimals in order from least to greatest", items: values.map((v) => it(String(v))) };
}

const UNIT_FRACTIONS: [string, number][] = [
  ["1/10", 1 / 10],
  ["1/8", 1 / 8],
  ["1/6", 1 / 6],
  ["1/5", 1 / 5],
  ["1/4", 1 / 4],
  ["1/3", 1 / 3],
  ["1/2", 1 / 2],
];
const MIXED: [string, number][] = [
  ["1/5", 0.2],
  ["0.25", 0.25],
  ["30%", 0.3],
  ["2/5", 0.4],
  ["0.5", 0.5],
  ["60%", 0.6],
  ["3/4", 0.75],
  ["0.9", 0.9],
];
const POWERS: [string, number][] = [
  ["2³", 8],
  ["3²", 9],
  ["4²", 16],
  ["3³", 27],
  ["2⁵", 32],
  ["6²", 36],
  ["4³", 64],
  ["10²", 100],
];
const SCIENTIFIC: [string, number][] = [
  ["2 × 10²", 200],
  ["5 × 10²", 500],
  ["1.2 × 10³", 1200],
  ["8 × 10³", 8000],
  ["3 × 10⁴", 30000],
  ["6.5 × 10⁴", 65000],
  ["1 × 10⁵", 100000],
];

function valued(list: [string, number][], count: number, title: string, speak: string): OrderSet {
  const items = sample(list, count).sort((a, b) => a[1] - b[1]);
  return { title, speak, items: items.map(([label]) => it(label)) };
}

/** One set of cards for the grade. Little kids get 4 cards; everyone else 5 (when the set has them). */
export function orderSet(grade: GradeId, country: Country = "CA"): OrderSet {
  const g = G[grade];
  const n = g <= 1 ? 4 : 5;
  const us = country === "US";
  // A child on a US curriculum puts US history in order instead of Canada's.
  const grows = us ? US_GROWS : CANADA_GROWS;
  const modern = us ? US_1900S : CANADA_HISTORY;
  const options: (() => OrderSet)[] =
    g === 0
      ? [() => from(ROUTINE, n), () => from(PLANT, n), () => from(BUTTERFLY, n), () => from(SIZES, n), () => wholeNumbers(10, n)]
      : g === 1
        ? [() => from(ROUTINE, n), () => from(CHICK, n), () => from(SEASONS, n), () => from(SIZES, n), () => wholeNumbers(20, n)]
        : g === 2
          ? [() => from(FROG, n), () => from(DAYS, n), () => from(SEASONS, n), () => wholeNumbers(100, n)]
          : g === 3
            ? [() => from(MONTHS, n), () => from(FROG, n), () => from(DAYS, n), () => wholeNumbers(1000, n)]
            : g === 4
              ? [() => from(grows, n), () => from(PLANETS, n), () => wholeNumbers(99999, n, country), () => decimals(n)]
              : g === 5
                ? [() => from(grows, n), () => from(PLANETS, n), () => decimals(n), () => valued(UNIT_FRACTIONS, n, "Least to greatest", "Put the fractions in order from least to greatest")]
                : g === 6
                  ? [() => from(ANCIENT, n), () => from(INVENTIONS, n), () => from(SPACE, n), () => integers(n), () => valued(MIXED, n, "Least to greatest", "Put these in order from least to greatest")]
                  : g === 7
                    ? [() => from(modern, n), () => from(INVENTIONS, n), () => integers(n), () => valued(MIXED, n, "Least to greatest", "Put these in order from least to greatest")]
                    : g === 8
                      ? [() => from(ORGANIZATION, n), () => from(SPACE, n), () => from(modern, n), () => valued(POWERS, n, "Least to greatest", "Put the powers in order from least to greatest")]
                      : [() => from(ORGANIZATION, n), () => from(modern, n), () => valued(POWERS, n, "Least to greatest", "Put the powers in order from least to greatest"), () => valued(SCIENTIFIC, n, "Least to greatest", "Put the numbers in order from least to greatest")];
  return pick(options)();
}
