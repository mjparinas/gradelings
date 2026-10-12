import { describe, expect, it } from "vitest";
import { withSeed } from "@/content/random";
import type { GradeId } from "@/content/types";
import { bubbleRound, catchRounds, memoryPairs, muncherRules, ninjaRound, shuffled, type MuncherRule } from "./content";

const GRADES: GradeId[] = ["k", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const band = (grade: GradeId) => (grade === "k" ? 0 : Number(grade));

const isPrime = (n: number) => n > 1 && Array.from({ length: Math.floor(Math.sqrt(n)) - 1 }, (_, i) => i + 2).every((d) => n % d !== 0);

/** Whether a cell really matches the rule its title states. Independent of the generator. */
function fits(title: string, text: string): boolean {
  const num = (re: RegExp) => Number(title.match(re)?.[1]);
  if (/^Munch the \d+s$/.test(title)) return Number(text) === num(/^Munch the (\d+)s$/);
  if (/^Munch numbers bigger than \d+$/.test(title)) return Number(text) > num(/(\d+)$/);
  if (/^Munch numbers smaller than \d+$/.test(title)) return Number(text) < num(/(\d+)$/);
  if (title === "Munch even numbers") return Number(text) % 2 === 0;
  if (title === "Munch odd numbers") return Number(text) % 2 === 1;
  if (/^Munch multiples of \d+$/.test(title)) return Number(text) % num(/(\d+)$/) === 0;
  if (/^Munch numbers between \d+ and \d+$/.test(title)) {
    const [, lo, hi] = title.match(/(\d+) and (\d+)/)!;
    const n = Number(text);
    return n > Number(lo) && n < Number(hi);
  }
  if (/^Munch sums that make \d+$/.test(title)) {
    const [a, b] = text.split("+").map(Number);
    return a + b === num(/(\d+)$/);
  }
  if (/^Munch products that make \d+$/.test(title)) {
    const [a, b] = text.split("×").map(Number);
    return a * b === num(/(\d+)$/);
  }
  if (title === "Munch prime numbers") return isPrime(Number(text));
  if (/^Munch factors of \d+$/.test(title)) return num(/(\d+)$/) % Number(text) === 0;
  if (title === "Munch numbers that round to 100") {
    const n = Number(text);
    return n >= 50 && n < 150 && Math.round(n / 100) * 100 === 100;
  }
  if (title === "Munch negative numbers") return Number(text) < 0;
  if (title === "Munch numbers greater than −5") return Number(text) > -5;
  if (title === "Munch square numbers") return Number.isInteger(Math.sqrt(Number(text)));
  if (title === "Munch cube numbers") return [1, 8, 27, 64, 125].includes(Number(text));
  if (title === "Munch powers of 2") return [1, 2, 4, 8, 16, 32, 64, 128, 256].includes(Number(text));
  if (title === "Munch percents greater than 50%") return /^\d+%$/.test(text) && Number(text.slice(0, -1)) > 50;
  if (title === "Munch fractions equal to ¾") {
    const [n, d] = text.split("/").map(Number);
    return d > 0 && n * 4 === d * 3;
  }
  if (title === "Munch decimals bigger than 0.5") return Number(text) > 0.5;
  if (title === "Munch fractions equal to ½") {
    const [n, d] = text.split("/").map(Number);
    return d > 0 && n * 2 === d;
  }
  throw new Error(`No checker for “${title}”`);
}

function checkCells(rule: MuncherRule) {
  const seen: Record<"good" | "bad", Set<string>> = { good: new Set(), bad: new Set() };
  for (const want of [true, false]) {
    for (let i = 0; i < 80; i++) {
      const cell = rule.cell(want);
      expect(cell.good, `${rule.title}: ${cell.text}`).toBe(want);
      expect(fits(rule.title, cell.text), `${rule.title}: ${cell.text}`).toBe(want);
      if (rule.title === "Munch decimals bigger than 0.5") {
        const n = Number(cell.text);
        expect(n).toBeGreaterThan(0);
        expect(n).toBeLessThan(1);
      }
      if (rule.title.startsWith("Munch products")) {
        const [a, b] = cell.text.split("×").map(Number);
        expect(Number.isInteger(a) && Number.isInteger(b), cell.text).toBe(true);
        expect(a).toBeGreaterThanOrEqual(1);
        expect(b).toBeGreaterThanOrEqual(1);
        expect(a).toBeLessThanOrEqual(12);
        expect(b).toBeLessThanOrEqual(12);
      }
      seen[want ? "good" : "bad"].add(cell.text);
      if (!want && (rule.title === "Munch even numbers" || rule.title === "Munch odd numbers")) {
        const n = Number(cell.text);
        expect(rule.why(cell.text)).toContain(`ends in ${Math.abs(n) % 10}`);
      }
    }
  }
  const between = rule.title.match(/^Munch numbers between (\d+) and (\d+)$/);
  if (between) {
    const lo = Number(between[1]);
    const hi = Number(between[2]);
    const wantSeen = (set: Set<string>, n: number) => set.has(String(n));
    for (let i = 0; i < 2000 && !(wantSeen(seen.bad, lo) && wantSeen(seen.bad, hi) && wantSeen(seen.good, lo + 1) && wantSeen(seen.good, hi - 1)); i++) {
      for (const want of [true, false]) {
        const cell = rule.cell(want);
        expect(fits(rule.title, cell.text), `${rule.title}: ${cell.text}`).toBe(want);
        seen[want ? "good" : "bad"].add(cell.text);
      }
    }
    expect(seen.bad.has(String(lo)), rule.title).toBe(true);
    expect(seen.bad.has(String(hi)), rule.title).toBe(true);
    expect(seen.good.has(String(lo + 1)), rule.title).toBe(true);
    expect(seen.good.has(String(hi - 1)), rule.title).toBe(true);
  }
  const shown = rule.cell(true);
  expect(rule.why(shown.text).length, rule.title).toBeGreaterThan(0);
  if (rule.title.startsWith("Munch sums")) {
    let cell = rule.cell(false);
    for (let i = 0; i < 30 && cell.text.endsWith("+0"); i++) cell = rule.cell(false);
    const [a, b] = cell.text.split("+").map(Number);
    expect(b, rule.title).not.toBe(0);
    expect(rule.why(cell.text)).toContain(`= ${a + b},`);
  }
  if (rule.title.startsWith("Munch products")) {
    const cell = rule.cell(false);
    const [a, b] = cell.text.split("×").map(Number);
    expect(rule.why(cell.text)).toContain(`= ${a * b},`);
  }
  if (rule.title === "Munch fractions equal to ½") {
    const denominator = Number(shown.text.split("/")[1]);
    expect(rule.why(shown.text)).toContain(`is ${denominator / 2}.`);
  }
  if (rule.title === "Munch numbers that round to 100") {
    expect(rule.why(shown.text)).toContain(`rounds to ${Math.round(Number(shown.text) / 100) * 100}`);
  }
}

describe("Number Munchers", () => {
  it("only marks a cell right when it really fits the rule", () => {
    for (const grade of GRADES) {
      const rules = withSeed(band(grade) + 11, () => muncherRules(grade));
      expect(rules.length).toBeGreaterThanOrEqual(3);
      for (const rule of rules) {
        checkCells(rule);
        // Read aloud at the start of each round, so it must say the rule in words the voice reads well.
        expect(rule.speak, rule.title).toMatch(/^Munch /);
        expect(rule.speak, rule.title).not.toMatch(/[½]|\d+s\b/);
      }
      const titles = rules.map((r) => r.title).join(" ");
      expect(titles.includes("negative")).toBe(band(grade) >= 7);
      expect(titles.includes("decimal")).toBe(band(grade) >= 6);
      expect(titles.includes("multiples of 8")).toBe(grade === "6");
      // Grades 6 to 9 get a bigger rule book than the younger grades.
      if (band(grade) >= 6) expect(rules.length, grade).toBeGreaterThanOrEqual(6);
      if (grade === "k") {
        for (const rule of rules) {
          const n = Number(rule.cell(true).text);
          expect(n).toBeGreaterThanOrEqual(0);
          expect(n).toBeLessThanOrEqual(10);
        }
      }
    }
  });

  it("builds a sum from parts no bigger than the total", () => {
    const targets = new Set<number>();
    for (let seed = 1; seed <= 24; seed++) {
      for (const rule of withSeed(seed, () => muncherRules("1"))) {
        const target = Number(rule.title.match(/make (\d+)$/)?.[1]);
        if (!target) continue;
        targets.add(target);
        for (let i = 0; i < 15; i++) {
          const [a, b] = rule.cell(true).text.split("+").map(Number);
          expect(a, rule.title).toBeGreaterThanOrEqual(0);
          expect(b, rule.title).toBeGreaterThanOrEqual(0);
          expect(a, rule.title).toBeLessThanOrEqual(target);
        }
      }
    }
    expect(targets.has(7) || targets.has(8)).toBe(true);
  });

  it("uses whole factors up to 12, including 12 on either side", () => {
    let left = false;
    let right = false;
    for (let seed = 1; seed <= 40 && !(left && right); seed++) {
      for (const rule of withSeed(seed, () => muncherRules("3"))) {
        if (!rule.title.startsWith("Munch products")) continue;
        const target = Number(rule.title.match(/(\d+)$/)?.[1]);
        for (let i = 0; i < 40; i++) {
          const [a, b] = rule.cell(true).text.split("×").map(Number);
          expect(a).toBeLessThanOrEqual(12);
          expect(b).toBeLessThanOrEqual(12);
          if (target === 12 && a === 12) left = true;
          if (b === 12) right = true;
        }
      }
    }
    expect(left).toBe(true);
    expect(right).toBe(true);
  });
});

describe("Word Ninja", () => {
  it("uses that grade's sight words, not the list from another grade", () => {
    const words = (grade: GradeId) => {
      const found = new Set<string>();
      for (let seed = 1; seed <= 600; seed++) found.add(withSeed(seed, () => ninjaRound(grade)).title);
      return found;
    };
    expect(words("k").has("yellow")).toBe(true);
    expect(words("1").has("please")).toBe(true);
    expect(words("1").has("after")).toBe(true);
    expect(words("2").has("because")).toBe(true);
    expect(words("3").has("about")).toBe(true);
    expect(words("k").has("because")).toBe(false);
  });

  it("never lists a word as both a target and a decoy, and the words fit the grade", () => {
    for (const grade of GRADES) {
      for (let seed = 1; seed <= 12; seed++) {
        const round = withSeed(seed + band(grade) * 20, () => ninjaRound(grade));
        const overlap = round.targets.filter((w) => round.decoys.includes(w));
        expect(overlap, `${grade} ${round.title}`).toEqual([]);
        expect(round.targets.length).toBeGreaterThan(0);
        expect(round.decoys.length).toBeGreaterThan(0);
        expect(round.speak.length).toBeGreaterThan(0);
        const g = band(grade);
        if (g <= 3) {
          expect(round.targets).toEqual([round.title]);
          expect(round.decoys).toHaveLength(10);
          expect(round.speak).toBe(`Slice the word ${round.title}`);
        } else if (g <= 5) {
          expect(round.title).toMatch(/^Slice the (nouns|verbs|adjectives)$/);
          if (round.title.endsWith("nouns")) expect(round.targets).toContain("dog");
          if (round.title.endsWith("verbs")) expect(round.targets).toContain("run");
          if (round.title.endsWith("adjectives")) expect(round.targets).toContain("happy");
          if (round.title.endsWith("nouns")) {
            expect(round.speak).toContain("naming words");
            expect(round.decoys).toContain("run");
          }
          if (round.title.endsWith("verbs")) {
            expect(round.speak).toContain("action words");
            expect(round.decoys).toContain("happy");
          }
          if (round.title.endsWith("adjectives")) {
            expect(round.speak).toContain("describing words");
            expect(round.decoys).toContain("dog");
          }
          expect(round.decoys.some((w) => round.targets.includes(w))).toBe(false);
        } else {
          expect(round.title).toMatch(/^Slice (words that mean “\w+”|words that mean the opposite of “\w+”|the (adverbs|pronouns|conjunctions|prepositions))$/);
          if (round.title.includes("big")) {
            expect(round.targets).toContain("huge");
            expect(round.decoys).toContain("tiny");
          }
          if (round.title === "Slice words that mean “happy”") expect(round.decoys).toContain("sad");
          if (round.title.includes("“fast”")) expect(round.decoys).toContain("slow");
          if (round.title.includes("smart")) expect(round.targets).toContain("clever");
          if (round.title.includes("opposite of “ancient”")) {
            expect(round.targets).toContain("modern");
            expect(round.decoys).toContain("old");
          }
          if (round.title === "Slice the adverbs") expect(round.targets).toContain("quickly");
          if (round.title === "Slice the prepositions") expect(round.decoys).not.toContain("but");
          // Parts of speech only from Grade 7.
          if (g === 6) expect(round.title).not.toMatch(/^Slice the /);
        }
      }
    }
  });

  it("gives Grades 6 to 9 more kinds of rounds than before", () => {
    const titles = (grade: GradeId) => new Set(Array.from({ length: 400 }, (_, seed) => withSeed(seed + 1, () => ninjaRound(grade)).title));
    expect(titles("6").size).toBeGreaterThanOrEqual(10);
    expect([...titles("8")]).toEqual(expect.arrayContaining(["Slice the adverbs", "Slice the pronouns", "Slice the conjunctions", "Slice the prepositions"]));
    expect([...titles("9")].some((t) => t.includes("opposite"))).toBe(true);
  });
});

describe("Critter Catch", () => {
  it("keeps the right critters in the right round for the grade", () => {
    const expectRound = (grade: GradeId, title: string, good: string, bad: string) => {
      const round = catchRounds(grade).find((r) => r.title === title);
      expect(round, title).toBeDefined();
      expect(round!.good.map((c) => c.label)).toContain(good);
      expect(round!.bad.map((c) => c.label)).toContain(bad);
      const labels = [...round!.good, ...round!.bad].map((c) => c.label);
      expect(new Set(labels).size).toBe(labels.length);
    };

    for (const grade of GRADES) {
      const titles = catchRounds(grade).map((r) => r.title);
      expect(titles[0]).toBe("Catch living things");
      expectRound(grade, "Catch living things", "dog", "rock");
      const g = band(grade);
      if (g <= 1) {
        expect(titles).toEqual(["Catch living things", "Catch things that give light", "Catch warm-weather things"]);
        expectRound(grade, "Catch things that give light", "sun", "moon");
        expectRound(grade, "Catch warm-weather things", "shorts", "mittens");
      } else if (g <= 3) {
        expect(titles).toEqual(["Catch living things", "Catch the solids", "Catch things a magnet pulls"]);
        expectRound(grade, "Catch the solids", "ice", "milk");
        expectRound(grade, "Catch things a magnet pulls", "paper clip", "wood");
      } else if (g <= 5) {
        expect(titles).toEqual(["Catch living things", "Catch the plant-eaters", "Catch renewable resources"]);
        expectRound(grade, "Catch the plant-eaters", "rabbit", "lion");
        expectRound(grade, "Catch renewable resources", "sunlight", "oil");
      } else if (g === 6) {
        expect(titles).toEqual(["Catch living things", "Catch the planets", "Catch the vertebrates"]);
        expectRound(grade, "Catch the planets", "Earth", "Sun");
        expectRound(grade, "Catch the vertebrates", "frog", "worm");
      } else if (g === 7) {
        expect(titles).toEqual(["Catch living things", "Catch chemical changes", "Catch the mixtures"]);
        expectRound(grade, "Catch chemical changes", "rusting nail", "melting ice");
        expectRound(grade, "Catch the mixtures", "salt water", "salt");
      } else if (g === 8) {
        expect(titles).toEqual(["Catch living things", "Catch parts only plant cells have", "Catch transparent materials"]);
        expectRound(grade, "Catch parts only plant cells have", "cell wall", "nucleus");
        expectRound(grade, "Catch transparent materials", "clear glass", "wood");
      } else {
        expect(titles).toEqual(["Catch living things", "Catch electrical conductors", "Catch the elements", "Catch the metals"]);
        expectRound(grade, "Catch electrical conductors", "steel bolt", "wood");
        expectRound(grade, "Catch the elements", "oxygen", "water");
        expectRound(grade, "Catch the metals", "copper", "sulfur");
      }
    }
  });
});

describe("Bubble Pop", () => {
  it("pops letters, rhymes or word skills that really belong, and never both lists", () => {
    const seen = new Set<string>();
    for (let seed = 1; seed <= 40; seed++) {
      for (const grade of ["3", "4", "5"] as GradeId[]) {
        const round = withSeed(seed, () => bubbleRound(grade));
        seen.add(round.title);
        const overlap = round.good.filter((w) => round.bad.includes(w));
        expect(overlap, round.title).toEqual([]);
        if (round.title.startsWith("Pop words with the prefix")) {
          expect(round.good).toContain("unhappy");
          expect(round.bad).toContain("under");
        }
        if (round.title === "Pop correctly spelled words") {
          expect(round.good).toContain("because");
          expect(round.bad).toContain("becuase");
        }
        if (round.title === "Pop words with 3 syllables") {
          expect(round.good).toContain("banana");
          expect(round.bad).toEqual(expect.arrayContaining(["apple", "watermelon"]));
        }
      }
    }
    expect([...seen].sort()).toEqual(["Pop correctly spelled words", "Pop words with 3 syllables", "Pop words with the prefix un-"]);

    // Grades 6 to 9 have their own, harder rounds.
    const older = new Set<string>();
    for (let seed = 1; seed <= 60; seed++) {
      for (const grade of ["6", "9"] as GradeId[]) {
        const round = withSeed(seed, () => bubbleRound(grade));
        older.add(round.title);
        expect(round.good.filter((w) => round.bad.includes(w)), round.title).toEqual([]);
        expect(round.good.length).toBeGreaterThanOrEqual(5);
        if (round.title === "Pop correctly spelled words") expect(round.good).toContain("necessary");
        if (round.title === "Pop words where -less means without") expect(round.bad).toContain("unless");
        if (round.title.startsWith("Pop words with the prefix pre-")) {
          for (const word of round.good) expect(word.startsWith("pre"), word).toBe(true);
        }
      }
    }
    expect(older.size).toBe(5);
    expect(older.has("Pop words with the prefix un-")).toBe(false);

    const heads = new Set<string>();
    for (let seed = 1; seed <= 80; seed++) {
      const letter = withSeed(seed, () => bubbleRound("k"));
      expect(letter.good).toHaveLength(2);
      expect(new Set(letter.good).size).toBe(2);
      expect(letter.good[0].toLowerCase()).toBe(letter.good[1].toLowerCase());
      expect(letter.bad.length).toBeGreaterThan(2);
      expect(letter.bad.some((ch) => ch !== ch.toLowerCase())).toBe(true);
      expect(letter.bad).not.toContain(letter.good[0]);
      expect(letter.bad).not.toContain(letter.good[1]);

      const rhyme = withSeed(seed, () => bubbleRound("2"));
      const head = rhyme.title.replace("Pop words that rhyme with ", "");
      heads.add(head);
      expect(rhyme.good.length).toBeGreaterThan(0);
      expect(rhyme.bad.length).toBeGreaterThan(0);
      const ending = [...head].reduce((suffix) => {
        const next = head.slice(head.length - suffix.length - 1);
        return rhyme.good.every((w) => w.endsWith(next)) ? next : suffix;
      }, "");
      expect(ending.length).toBeGreaterThanOrEqual(2);
      expect(rhyme.good).not.toContain(head);
      for (const word of rhyme.bad) expect(word.endsWith(ending), word).toBe(false);
    }
    expect([...heads].sort()).toEqual(["bell", "cake", "cat", "hop", "pig", "sun"]);
  });
});

describe("Memory Match", () => {
  const FACTS: Record<string, string> = {
    "3 + 4": "7",
    "5 × 2": "10",
    "7 × 8": "56",
    "9 × 9": "81",
    "½": "50%",
    "0.3": "30%",
    "British Columbia": "Victoria",
    Ontario: "Toronto",
    hot: "cold",
    Egypt: "pyramids",
    "🐄": "🥛",
    "√81": "9",
    "2³": "8",
    "H₂O": "water",
    "−2 × −5": "10",
    bio: "life",
    Premier: "leads a province's government",
  };

  it("pairs a prompt with its real match, and the set fits the grade", () => {
    for (const grade of GRADES) {
      expect(withSeed(1, () => memoryPairs(grade, 3))).toHaveLength(3);
      expect(withSeed(1, () => memoryPairs(grade, 20))).toHaveLength(8);
      let sawSum = false;
      let sawOpposite = false;
      for (let seed = 1; seed <= 16; seed++) {
        const pairs = withSeed(seed, () => memoryPairs(grade, 8));
        const left = pairs.map((p) => p.a);
        expect(new Set(left).size).toBe(left.length);
        for (const { a, b } of pairs) {
          expect(a).not.toBe(b);
          if (FACTS[a]) expect(b, a).toBe(FACTS[a]);
        }
        const sample = pairs.map((p) => p.a).join(" ");
        const g = band(grade);
        const equation = /\d/.test(sample);
        const province = sample.includes("British Columbia") || sample.includes("Ontario");
        const percent = sample.includes("%") || sample.includes("½");
        const story = sample.includes("Egypt") || sample.includes("Rome");
        if (g <= 1) expect(equation || province || percent).toBe(false);
        if (g >= 2 && g <= 3) expect(province || percent).toBe(false);
        if (g >= 4 && g <= 5) expect(equation || province).toBe(true);
        const older = /[√²³⁵₂₃₄]|−|bio|Prime Minister/.test(sample);
        if (g >= 6) expect(percent || story || older).toBe(true);
        if (g >= 2 && g <= 3) {
          if (equation) sawSum = true;
          if (pairs.some((pair) => pair.a === "hot")) sawOpposite = true;
        }
      }
      if (band(grade) >= 2 && band(grade) <= 3) {
        expect(sawSum, grade).toBe(true);
        expect(sawOpposite, grade).toBe(true);
      }
    }
  });
});

describe("Memory Match, Grades 6 to 9", () => {
  const value = (expr: string) => Function(`return (${expr.replaceAll("−", "-").replaceAll("×", "*").replaceAll("÷", "/").replace(/(-?\d+)\s*\*\s*(-?\d+)/g, "($1)*($2)")});`)() as number;

  it("has several sets in each grade, and the maths pairs are right", () => {
    for (const grade of ["6", "7", "8", "9"] as GradeId[]) {
      const sets = new Set<string>();
      for (let seed = 1; seed <= 60; seed++) {
        const pairs = withSeed(seed, () => memoryPairs(grade, 8));
        sets.add(pairs.map((p) => p.a).sort().join("|"));
        for (const { a, b } of pairs) {
          if (/^−?\d+ [+−×÷] −?\d+$/.test(a)) expect(value(a), a).toBe(Number(b.replace("−", "-")));
          const root = a.match(/^√(\d+)$/);
          if (root) expect(Math.sqrt(Number(root[1]))).toBe(Number(b));
          const power = a.match(/^(\d+)([²³⁵])$/);
          if (power) expect(Number(power[1]) ** { "²": 2, "³": 3, "⁵": 5 }[power[2] as "²"]).toBe(Number(b));
        }
      }
      expect(sets.size, grade).toBeGreaterThanOrEqual(4);
    }
  });
});

describe("shuffled", () => {
  it("keeps every item and drops none", () => {
    const items = ["a", "b", "c", "d", "e"];
    expect(withSeed(4, () => shuffled(items)).slice().sort()).toEqual([...items].sort());
    expect(items).toEqual(["a", "b", "c", "d", "e"]);
  });
});
