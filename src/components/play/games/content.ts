import { pick, randInt, sample, shuffle } from "@/content/random";
import type { GradeId } from "@/content/types";
import type { Country } from "./types";

// Learning content for the arcade, adapted to each grade.

const G: Record<GradeId, number> = { k: 0, "1": 1, "2": 2, "3": 3, "4": 4, "5": 5, "6": 6, "7": 7, "8": 8, "9": 9 };

// ---------- Number Munchers ----------

export interface MuncherRule {
  title: string;
  /** The rule as read aloud at the start of each round. */
  speak: string;
  /** Makes one cell: its text, and whether it fits the rule. */
  cell: (good: boolean) => { text: string; good: boolean };
  why: (text: string) => string;
}

const isPrime = (n: number) => n > 1 && Array.from({ length: Math.floor(Math.sqrt(n)) - 1 }, (_, i) => i + 2).every((d) => n % d !== 0);

function numberRule(title: string, range: [number, number], test: (n: number) => boolean, why: (n: number) => string, speak = title): MuncherRule {
  return {
    title,
    speak,
    cell: (good) => {
      for (let i = 0; i < 200; i++) {
        const n = randInt(range[0], range[1]);
        if (test(n) === good) return { text: String(n), good };
      }
      return { text: String(range[0]), good: test(range[0]) };
    },
    why: (t) => why(Number(t)),
  };
}

function sumRule(target: number, maxPart: number): MuncherRule {
  return {
    title: `Munch sums that make ${target}`,
    speak: `Munch the sums that make ${target}`,
    cell: (good) => {
      const a = randInt(0, Math.min(target, maxPart));
      const b = good ? target - a : randInt(0, maxPart);
      if (!good && a + b === target) return { text: `${a}+${b + 1}`, good: false };
      return { text: `${a}+${b}`, good: a + b === target };
    },
    why: (t) => {
      const [a, b] = t.split("+").map(Number);
      return `${t} = ${a + b}, not ${target}.`;
    },
  };
}

function productRule(target: number): MuncherRule {
  const pairs: [number, number][] = [];
  for (let a = 1; a <= target; a++) if (target % a === 0 && target / a <= 12 && a <= 12) pairs.push([a, target / a]);
  return {
    title: `Munch products that make ${target}`,
    speak: `Munch the products that make ${target}`,
    cell: (good) => {
      if (good) {
        const [a, b] = pick(pairs);
        return { text: `${a}×${b}`, good: true };
      }
      for (;;) {
        const a = randInt(2, 9);
        const b = randInt(2, 9);
        if (a * b !== target) return { text: `${a}×${b}`, good: false };
      }
    },
    why: (t) => {
      const [a, b] = t.split("×").map(Number);
      return `${t} = ${a * b}, not ${target}.`;
    },
  };
}

const isSquare = (n: number) => n >= 0 && Number.isInteger(Math.sqrt(n));
const isCube = (n: number) => n >= 0 && Math.round(Math.cbrt(n)) ** 3 === n;
const isPowerOfTwo = (n: number) => n >= 1 && Number.isInteger(n) && (n & (n - 1)) === 0;

function fractionThreeQuartersRule(): MuncherRule {
  return {
    title: "Munch fractions equal to ¾",
    speak: "Munch the fractions equal to three quarters",
    cell: (good) => {
      const d = pick([4, 8, 12, 16, 20, 24, 28, 32, 40]);
      if (good) return { text: `${(d / 4) * 3}/${d}`, good: true };
      let n = randInt(1, d - 1);
      if (n * 4 === d * 3) n += 1;
      return { text: `${n}/${d}`, good: false };
    },
    why: (t) => `${t} isn't ¾: three quarters of ${t.split("/")[1]} is ${(Number(t.split("/")[1]) / 4) * 3}.`,
  };
}

function percentRule(): MuncherRule {
  return {
    title: "Munch percents greater than 50%",
    speak: "Munch the percents greater than fifty percent",
    cell: (good) => ({ text: `${good ? randInt(51, 99) : randInt(1, 50)}%`, good }),
    why: (t) => `${t} is not more than half.`,
  };
}

function fractionHalfRule(): MuncherRule {
  return {
    title: "Munch fractions equal to ½",
    speak: "Munch the fractions equal to one half",
    cell: (good) => {
      const d = pick([2, 4, 6, 8, 10, 12, 14, 16, 20]);
      if (good) return { text: `${d / 2}/${d}`, good: true };
      let n = randInt(1, d - 1);
      if (n * 2 === d) n += 1;
      return { text: `${n}/${d}`, good: false };
    },
    why: (t) => `${t} isn't half: half of ${t.split("/")[1]} is ${Number(t.split("/")[1]) / 2}.`,
  };
}

export function muncherRules(grade: GradeId): MuncherRule[] {
  const g = G[grade];
  if (g === 0) {
    const n = randInt(1, 9);
    return [
      numberRule(`Munch the ${n}s`, [0, 10], (x) => x === n, (x) => `That's ${x}. Look for ${n}!`, `Munch the number ${n}`),
      numberRule("Munch numbers bigger than 5", [0, 10], (x) => x > 5, (x) => `${x} is not bigger than 5.`),
      numberRule("Munch numbers smaller than 4", [0, 10], (x) => x < 4, (x) => `${x} is not smaller than 4.`),
    ];
  }
  if (g === 1) return [sumRule(10, 10), numberRule("Munch numbers bigger than 12", [5, 20], (x) => x > 12, (x) => `${x} is not bigger than 12.`), sumRule(pick([7, 8, 9]), 9)];
  if (g === 2)
    return [
      numberRule("Munch even numbers", [1, 50], (x) => x % 2 === 0, (x) => `${x} is odd: it ends in ${x % 10}.`),
      numberRule("Munch odd numbers", [1, 50], (x) => x % 2 === 1, (x) => `${x} is even: it ends in ${x % 10}.`),
      sumRule(pick([12, 15, 20]), 15),
      numberRule("Munch numbers between 40 and 60", [20, 80], (x) => x > 40 && x < 60, (x) => `${x} is not between 40 and 60.`),
    ];
  if (g === 3)
    return [
      numberRule("Munch multiples of 5", [1, 60], (x) => x % 5 === 0, (x) => `${x} doesn't end in 0 or 5.`),
      numberRule("Munch multiples of 2", [1, 40], (x) => x % 2 === 0, (x) => `${x} is odd.`),
      productRule(pick([12, 18, 24])),
      numberRule("Munch numbers that round to 100", [40, 160], (x) => Math.round(x / 100) * 100 === 100 && x >= 50 && x < 150, (x) => `${x} rounds to ${Math.round(x / 100) * 100}.`),
    ];
  if (g === 4)
    return [
      numberRule("Munch multiples of 3", [1, 60], (x) => x % 3 === 0, (x) => `${x} ÷ 3 has a remainder.`),
      numberRule("Munch multiples of 4", [1, 60], (x) => x % 4 === 0, (x) => `${x} ÷ 4 has a remainder.`),
      numberRule("Munch factors of 24", [1, 30], (x) => 24 % x === 0, (x) => `24 ÷ ${x} doesn't divide evenly.`),
      productRule(pick([24, 36, 48])),
    ];
  if (g === 5)
    return [
      numberRule("Munch prime numbers", [2, 50], isPrime, (x) => `${x} can be divided by more than 1 and itself.`),
      numberRule("Munch multiples of 7", [1, 80], (x) => x % 7 === 0, (x) => `${x} ÷ 7 has a remainder.`),
      numberRule("Munch factors of 36", [1, 40], (x) => 36 % x === 0, (x) => `36 ÷ ${x} doesn't divide evenly.`),
      fractionHalfRule(),
    ];
  // Grades 6 to 9: a bigger rule book for each grade, so older kids see more variety.
  const decimals: MuncherRule = {
    title: "Munch decimals bigger than 0.5",
    speak: "Munch the decimals bigger than zero point five",
    cell: (good: boolean) => {
      const v = good ? randInt(51, 99) / 100 : randInt(1, 50) / 100;
      return { text: String(v), good };
    },
    why: (t: string) => `${t} is not bigger than 0.5.`,
  };
  const primes = numberRule("Munch prime numbers", [2, 100], isPrime, (x) => `${x} has other factors.`);
  const negatives = numberRule("Munch negative numbers", [-20, 20], (x) => x < 0, (x) => `${x} is not below zero.`);
  const squares = numberRule("Munch square numbers", [1, 150], isSquare, (x) => `${x} isn't a whole number times itself.`);
  if (g === 6)
    return [
      primes,
      fractionHalfRule(),
      numberRule("Munch multiples of 8", [1, 100], (x) => x % 8 === 0, (x) => `${x} ÷ 8 has a remainder.`),
      decimals,
      squares,
      numberRule("Munch factors of 48", [1, 50], (x) => 48 % x === 0, (x) => `48 ÷ ${x} doesn't divide evenly.`),
    ];
  if (g === 7)
    return [
      primes,
      fractionHalfRule(),
      negatives,
      decimals,
      numberRule("Munch numbers greater than −5", [-20, 20], (x) => x > -5, (x) => `${x} is not greater than −5.`, "Munch numbers greater than negative five"),
      fractionThreeQuartersRule(),
      numberRule("Munch multiples of 12", [1, 150], (x) => x % 12 === 0, (x) => `${x} ÷ 12 has a remainder.`),
    ];
  if (g === 8)
    return [
      negatives,
      decimals,
      squares,
      numberRule("Munch cube numbers", [1, 130], isCube, (x) => `${x} isn't a whole number times itself three times.`),
      fractionThreeQuartersRule(),
      percentRule(),
    ];
  return [
    primes,
    negatives,
    decimals,
    squares,
    numberRule("Munch powers of 2", [1, 300], isPowerOfTwo, (x) => `${x} isn't 2 multiplied by itself.`),
    numberRule("Munch cube numbers", [1, 130], isCube, (x) => `${x} isn't a whole number times itself three times.`),
    percentRule(),
  ];
}

// ---------- Word Ninja ----------

const DOLCH: Record<string, string[]> = {
  prePrimer: ["a", "and", "big", "blue", "can", "come", "down", "find", "for", "funny", "go", "help", "here", "I", "in", "is", "it", "jump", "little", "look", "make", "me", "my", "not", "one", "play", "red", "run", "said", "see", "the", "three", "to", "two", "up", "we", "where", "yellow", "you"],
  primer: ["all", "am", "are", "at", "ate", "be", "black", "brown", "but", "came", "did", "do", "eat", "four", "get", "good", "have", "he", "into", "like", "must", "new", "no", "now", "on", "our", "out", "please", "pretty", "ran", "ride", "saw", "say", "she", "so", "soon", "that", "there", "they", "this", "too", "under", "want", "was", "well", "went", "what", "white", "who", "will", "with", "yes"],
  first: ["after", "again", "an", "any", "as", "ask", "by", "could", "every", "fly", "from", "give", "going", "had", "has", "her", "him", "his", "how", "just", "know", "let", "live", "may", "of", "old", "once", "open", "over", "put", "round", "some", "stop", "take", "thank", "them", "then", "think", "walk", "were", "when"],
  second: ["always", "around", "because", "been", "before", "best", "both", "buy", "call", "cold", "does", "don't", "fast", "first", "five", "found", "gave", "goes", "green", "its", "made", "many", "off", "or", "pull", "read", "right", "sing", "sit", "sleep", "tell", "their", "these", "those", "upon", "us", "use", "very", "wash", "which", "why", "wish", "work", "would", "write", "your"],
  third: ["about", "better", "bring", "carry", "clean", "cut", "done", "draw", "drink", "eight", "fall", "far", "full", "got", "grow", "hold", "hot", "hurt", "if", "keep", "kind", "laugh", "light", "long", "much", "myself", "never", "only", "own", "pick", "seven", "shall", "show", "six", "small", "start", "ten", "today", "together", "try", "warm"],
};

export interface NinjaRound {
  /** Shown at the top. */
  title: string;
  /** What read-aloud says. */
  speak: string;
  targets: string[];
  decoys: string[];
}

const PARTS = {
  nouns: ["dog", "river", "teacher", "pencil", "city", "apple", "mountain", "friend", "garden", "planet", "window", "cloud"],
  verbs: ["run", "jump", "write", "climb", "laugh", "swim", "build", "sing", "carry", "explore", "whisper", "paint"],
  adjectives: ["happy", "tall", "bright", "noisy", "gentle", "tiny", "brave", "shiny", "cold", "enormous", "quiet", "fuzzy"],
};

const SYNONYMS: { word: string; same: string[]; other: string[] }[] = [
  { word: "big", same: ["huge", "large", "enormous", "giant", "massive"], other: ["tiny", "small", "little", "narrow", "brief"] },
  { word: "happy", same: ["glad", "cheerful", "joyful", "delighted", "content"], other: ["sad", "gloomy", "angry", "upset", "bored"] },
  { word: "fast", same: ["quick", "rapid", "speedy", "swift", "hasty"], other: ["slow", "sluggish", "calm", "lazy", "still"] },
  { word: "smart", same: ["clever", "bright", "wise", "brilliant", "sharp"], other: ["silly", "foolish", "clumsy", "confused", "dull"] },
  { word: "brave", same: ["bold", "daring", "fearless", "heroic", "courageous"], other: ["timid", "fearful", "nervous", "shy", "cowardly"] },
  { word: "angry", same: ["furious", "cross", "irate", "annoyed", "livid"], other: ["calm", "pleased", "relaxed", "cheerful", "peaceful"] },
  { word: "tired", same: ["sleepy", "weary", "exhausted", "drowsy", "worn out"], other: ["lively", "alert", "energetic", "awake", "rested"] },
  { word: "difficult", same: ["hard", "tough", "tricky", "challenging", "demanding"], other: ["easy", "simple", "effortless", "basic", "plain"] },
];

/** Opposites: the targets mean the opposite of the word. */
const ANTONYMS: { word: string; opposite: string[]; same: string[] }[] = [
  { word: "ancient", opposite: ["modern", "new", "recent", "current", "fresh"], same: ["old", "antique", "aged", "historic", "olden"] },
  { word: "generous", opposite: ["selfish", "stingy", "greedy", "mean", "miserly"], same: ["giving", "kind", "charitable", "unselfish", "big-hearted"] },
  { word: "victory", opposite: ["defeat", "loss", "failure", "setback", "downfall"], same: ["win", "triumph", "success", "conquest", "achievement"] },
  { word: "expand", opposite: ["shrink", "contract", "reduce", "narrow", "decrease"], same: ["grow", "widen", "enlarge", "swell", "increase"] },
];

/** Parts of speech for older readers. Every word here has only that one usual job. */
const OLDER_PARTS: { kind: string; speak: string; targets: string[] }[] = [
  { kind: "adverbs", speak: "Slice the adverbs, the words that tell how", targets: ["quickly", "slowly", "carefully", "quietly", "loudly", "gently", "happily", "suddenly", "eagerly", "bravely"] },
  { kind: "pronouns", speak: "Slice the pronouns, the words that stand in for nouns", targets: ["he", "she", "they", "we", "them", "us", "him", "myself", "everyone", "yourself"] },
  { kind: "conjunctions", speak: "Slice the conjunctions, the joining words", targets: ["and", "or", "nor", "because", "although", "unless", "whereas"] },
  { kind: "prepositions", speak: "Slice the prepositions, the words that show position", targets: ["under", "between", "beside", "through", "among", "beneath", "across", "toward", "into", "upon"] },
];
const OLDER_DECOYS = ["pencil", "mountain", "teacher", "garden", "enormous", "shiny", "gentle", "explore", "build", "planet", "noisy", "climb"];

export function ninjaRound(grade: GradeId): NinjaRound {
  const g = G[grade];
  if (g <= 3) {
    const list = g === 0 ? DOLCH.prePrimer : g === 1 ? [...DOLCH.primer, ...DOLCH.first] : g === 2 ? DOLCH.second : DOLCH.third;
    const target = pick(list);
    const decoys = sample(list.filter((w) => w !== target), 10);
    return { title: target, speak: `Slice the word ${target}`, targets: [target], decoys };
  }
  if (g <= 5) {
    const kind = pick(["nouns", "verbs", "adjectives"] as const);
    const others = Object.entries(PARTS).filter(([k]) => k !== kind).flatMap(([, v]) => v);
    const label = kind === "adjectives" ? "describing words (adjectives)" : kind === "verbs" ? "action words (verbs)" : "naming words (nouns)";
    return { title: `Slice the ${kind}`, speak: `Slice the ${label}`, targets: PARTS[kind], decoys: others };
  }
  // Grades 6 to 9: same-meaning words, opposites, and (from Grade 7) the finer parts of speech.
  const kinds = g >= 7 ? ["synonym", "antonym", "part"] : ["synonym", "antonym"];
  const kind = pick(kinds);
  if (kind === "antonym") {
    const a = pick(ANTONYMS);
    return { title: `Slice words that mean the opposite of “${a.word}”`, speak: `Slice words that mean the opposite of ${a.word}`, targets: a.opposite, decoys: a.same };
  }
  if (kind === "part") {
    const p = pick(OLDER_PARTS);
    const otherParts = OLDER_PARTS.filter((o) => o !== p).flatMap((o) => o.targets);
    return { title: `Slice the ${p.kind}`, speak: p.speak, targets: p.targets, decoys: [...sample(otherParts, 6), ...sample(OLDER_DECOYS, 6)] };
  }
  const s = pick(SYNONYMS);
  return { title: `Slice words that mean “${s.word}”`, speak: `Slice words that mean ${s.word}`, targets: s.same, decoys: s.other };
}

// ---------- Critter Catch (science) ----------

export interface CatchRound {
  title: string;
  speak: string;
  good: { emoji: string; label: string }[];
  bad: { emoji: string; label: string }[];
}

const e = (emoji: string, label: string) => ({ emoji, label });

export function catchRounds(grade: GradeId): CatchRound[] {
  const g = G[grade];
  const living = [e("🐶", "dog"), e("🌳", "tree"), e("🐟", "fish"), e("🌻", "flower"), e("🐦", "bird"), e("🐛", "caterpillar"), e("🍄", "mushroom")];
  const nonliving = [e("🪨", "rock"), e("🚗", "car"), e("⚽", "ball"), e("🥄", "spoon"), e("☁️", "cloud"), e("🧸", "teddy"), e("✏️", "pencil")];
  const rounds: CatchRound[] = [{ title: "Catch living things", speak: "Catch the living things", good: living, bad: nonliving }];
  if (g <= 1) {
    rounds.push({
      title: "Catch things that give light",
      speak: "Catch the things that give off light",
      good: [e("☀️", "sun"), e("💡", "light bulb"), e("🔦", "flashlight"), e("🕯️", "candle"), e("🔥", "fire"), e("⭐", "star")],
      bad: [e("🌙", "moon"), e("🪞", "mirror"), e("🍎", "apple"), e("📕", "book"), e("👟", "shoe"), e("🧦", "sock")],
    });
    rounds.push({
      title: "Catch warm-weather things",
      speak: "Catch things for warm weather",
      good: [e("🩳", "shorts"), e("🕶️", "sunglasses"), e("🍦", "ice cream"), e("🏖️", "beach"), e("👒", "sun hat")],
      bad: [e("🧤", "mittens"), e("🧣", "scarf"), e("⛄", "snowman"), e("🧥", "coat"), e("🛷", "sled")],
    });
    return rounds;
  }
  if (g <= 3) {
    rounds.push({
      title: "Catch the solids",
      speak: "Catch the solids",
      good: [e("🧊", "ice"), e("🪨", "rock"), e("🍎", "apple"), e("🧱", "brick"), e("🔑", "key"), e("📕", "book")],
      bad: [e("🥛", "milk"), e("💧", "water"), e("🧃", "juice"), e("♨️", "steam"), e("🍯", "honey"), e("🌬️", "air")],
    });
    rounds.push({
      title: "Catch things a magnet pulls",
      speak: "Catch things a magnet will pull",
      good: [e("📎", "paper clip"), e("🔩", "bolt"), e("🔑", "steel key"), e("🧷", "safety pin"), e("🪛", "screwdriver")],
      bad: [e("🪵", "wood"), e("📄", "paper"), e("🧸", "teddy"), e("🍎", "apple"), e("🥤", "cup")],
    });
    return rounds;
  }
  if (g <= 5) {
    rounds.push({
      title: "Catch the plant-eaters",
      speak: "Catch the herbivores, the plant eaters",
      good: [e("🐰", "rabbit"), e("🦌", "deer"), e("🐄", "cow"), e("🐘", "elephant"), e("🦒", "giraffe"), e("🐿️", "squirrel")],
      bad: [e("🦁", "lion"), e("🦈", "shark"), e("🐺", "wolf"), e("🦅", "eagle"), e("🐍", "snake"), e("🐊", "crocodile")],
    });
    rounds.push({
      title: "Catch renewable resources",
      speak: "Catch the renewable resources",
      good: [e("☀️", "sunlight"), e("🌬️", "wind"), e("💧", "water"), e("🌲", "trees"), e("🌾", "crops")],
      bad: [e("🛢️", "oil"), e("⛽", "gasoline"), e("💎", "diamonds"), e("🪨", "coal"), e("🥇", "gold")],
    });
    return rounds;
  }
  const planets: CatchRound = {
    title: "Catch the planets",
    speak: "Catch the planets",
    good: [e("🪐", "Saturn"), e("🌍", "Earth"), e("🔴", "Mars"), e("🔵", "Neptune"), e("🟠", "Jupiter"), e("⚪", "Mercury")],
    bad: [e("☀️", "Sun"), e("🌙", "Moon"), e("☄️", "comet"), e("⭐", "star"), e("🛰️", "satellite"), e("🚀", "rocket")],
  };
  const conductors: CatchRound = {
    title: "Catch electrical conductors",
    speak: "Catch the things that conduct electricity",
    good: [e("🔩", "steel bolt"), e("🪙", "coin"), e("🥄", "metal spoon"), e("📎", "paper clip"), e("🔑", "key")],
    bad: [e("🪵", "wood"), e("🧱", "brick"), e("🎈", "rubber"), e("🧶", "wool"), e("🥤", "plastic cup")],
  };
  if (g === 6) {
    rounds.push(planets, {
      title: "Catch the vertebrates",
      speak: "Catch the vertebrates, the animals with a backbone",
      good: [e("🐟", "fish"), e("🐸", "frog"), e("🐍", "snake"), e("🐦", "bird"), e("🐶", "dog"), e("🐢", "turtle")],
      bad: [e("🪱", "worm"), e("🐌", "snail"), e("🕷️", "spider"), e("🐙", "octopus"), e("🦀", "crab"), e("🐝", "bee")],
    });
    return rounds;
  }
  if (g === 7) {
    rounds.push(
      {
        title: "Catch chemical changes",
        speak: "Catch the chemical changes, where a new substance forms",
        good: [e("🔥", "burning wood"), e("🔩", "rusting nail"), e("🎂", "baking a cake"), e("🍂", "rotting leaves"), e("🎆", "fireworks"), e("🍳", "frying an egg")],
        bad: [e("🧊", "melting ice"), e("✂️", "cutting paper"), e("♨️", "boiling water"), e("🍬", "dissolving sugar"), e("🥫", "crushing a can"), e("🪵", "sawing wood")],
      },
      {
        title: "Catch the mixtures",
        speak: "Catch the mixtures",
        good: [e("🥗", "salad"), e("🥜", "trail mix"), e("🌊", "salt water"), e("🌬️", "air"), e("🥣", "cereal and milk"), e("🏖️", "sand and pebbles")],
        bad: [e("💧", "pure water"), e("🥇", "gold"), e("🧂", "salt"), e("🍬", "sugar"), e("🫧", "oxygen"), e("💎", "diamond")],
      },
    );
    return rounds;
  }
  if (g === 8) {
    rounds.push(
      {
        title: "Catch parts only plant cells have",
        speak: "Catch the parts that only plant cells have",
        good: [e("🧱", "cell wall"), e("🟢", "chloroplast"), e("💧", "large central vacuole")],
        bad: [e("🔵", "nucleus"), e("🫧", "cell membrane"), e("⚡", "mitochondria"), e("🫗", "cytoplasm")],
      },
      {
        title: "Catch transparent materials",
        speak: "Catch the transparent materials that light passes straight through",
        good: [e("🪟", "clear glass"), e("💧", "clear water"), e("🌬️", "air"), e("🥤", "clear plastic")],
        bad: [e("🪵", "wood"), e("🧱", "brick"), e("🔩", "steel"), e("📕", "book"), e("🪨", "rock")],
      },
    );
    return rounds;
  }
  rounds.push(
    conductors,
    {
      title: "Catch the elements",
      speak: "Catch the elements",
      good: [e("🫧", "oxygen"), e("🔩", "iron"), e("🥇", "gold"), e("✏️", "carbon"), e("🎈", "helium"), e("🟤", "copper")],
      bad: [e("💧", "water"), e("🧂", "table salt"), e("🍬", "sugar"), e("💨", "carbon dioxide"), e("🟫", "rust"), e("🧁", "baking soda")],
    },
    {
      title: "Catch the metals",
      speak: "Catch the metals",
      good: [e("🟤", "copper"), e("🔩", "iron"), e("🥫", "aluminum"), e("🥇", "gold"), e("🥈", "silver"), e("🪙", "nickel")],
      bad: [e("🫧", "oxygen"), e("✏️", "carbon"), e("🟡", "sulfur"), e("🌬️", "nitrogen"), e("🎈", "helium"), e("🧪", "chlorine")],
    },
  );
  return rounds;
}

// ---------- Bubble Pop (phonics and words) ----------

export interface BubbleRound {
  title: string;
  speak: string;
  good: string[];
  bad: string[];
}

const SOUND_SAY: Record<string, string> = { b: "buh", d: "duh", f: "fff", g: "guh", h: "huh", l: "lll", m: "mmm", p: "puh", r: "rrr", s: "sss", t: "tuh", v: "vvv", w: "wuh" };

export function bubbleRound(grade: GradeId): BubbleRound {
  const g = G[grade];
  if (g === 0) {
    const letters = Object.keys(SOUND_SAY);
    const t = pick(letters);
    return { title: `Pop the letter for /${SOUND_SAY[t]}/`, speak: `Pop the letter that makes the sound ${SOUND_SAY[t]}`, good: [t, t.toUpperCase()], bad: letters.filter((l) => l !== t).flatMap((l) => [l, l.toUpperCase()]) };
  }
  if (g <= 2) {
    const fams: Record<string, string[]> = {
      at: ["cat", "hat", "bat", "mat", "sat", "rat"],
      ig: ["pig", "dig", "big", "wig", "fig"],
      op: ["hop", "top", "mop", "pop", "stop"],
      un: ["sun", "run", "fun", "bun"],
      ake: ["cake", "lake", "make", "bake", "rake"],
      ell: ["bell", "shell", "well", "tell", "smell"],
    };
    const fam = pick(Object.keys(fams));
    const head = fams[fam][0];
    return { title: `Pop words that rhyme with ${head}`, speak: `Pop words that rhyme with ${head}`, good: fams[fam].slice(1), bad: Object.entries(fams).filter(([f]) => f !== fam).flatMap(([, w]) => w) };
  }
  if (g >= 6) {
    const older: BubbleRound[] = [
      { title: "Pop correctly spelled words", speak: "Pop the words that are spelled correctly", good: ["necessary", "separate", "rhythm", "definitely", "embarrass", "occurrence"], bad: ["nessesary", "seperate", "rythm", "definately", "embarass", "occurence"] },
      { title: "Pop words with 4 syllables", speak: "Pop words with four syllables", good: ["watermelon", "caterpillar", "television", "macaroni", "alligator", "kindergarten"], bad: ["elephant", "dinosaur", "computer", "pencil", "umbrella", "hamburger"] },
      { title: "Pop words with a silent letter", speak: "Pop the words that have a silent letter", good: ["knife", "lamb", "write", "gnome", "island", "castle"], bad: ["plant", "desk", "river", "tiger", "garden", "pencil"] },
      { title: "Pop words where -less means without", speak: "Pop the words where the suffix less means without", good: ["careless", "fearless", "endless", "hopeless", "harmless", "homeless"], bad: ["bless", "unless", "useful", "careful", "lesson", "lessen"] },
      { title: "Pop words with the prefix pre- (before)", speak: "Pop the words where the prefix pre means before", good: ["preview", "prepay", "preheat", "prehistoric", "preschool", "pretest"], bad: ["press", "pretty", "precious", "review", "reheat", "pretzel"] },
    ];
    return pick(older);
  }
  const sets: BubbleRound[] = [
    { title: "Pop words with the prefix un-", speak: "Pop words that start with the prefix un", good: ["undo", "unhappy", "unlock", "unfair", "unkind", "unpack"], bad: ["under", "uncle", "until", "redo", "preheat", "mislead"] },
    { title: "Pop correctly spelled words", speak: "Pop the words that are spelled correctly", good: ["because", "friend", "people", "beautiful", "different", "believe"], bad: ["becuase", "freind", "peeple", "beutiful", "diffrent", "beleive"] },
    { title: "Pop words with 3 syllables", speak: "Pop words with three syllables", good: ["banana", "dinosaur", "elephant", "computer", "volcano", "kangaroo"], bad: ["apple", "pencil", "rainbow", "rocket", "watermelon", "caterpillar"] },
  ];
  return pick(sets);
}

// ---------- Memory Match ----------

export interface Pair {
  a: string;
  b: string;
}

/** Grades 4 and 5 match places to capitals: provinces in Canada, states in the US. */
const PROVINCE_CAPITALS: Pair[] = [
  { a: "British Columbia", b: "Victoria" },
  { a: "Alberta", b: "Edmonton" },
  { a: "Saskatchewan", b: "Regina" },
  { a: "Manitoba", b: "Winnipeg" },
  { a: "Ontario", b: "Toronto" },
  { a: "Quebec", b: "Quebec City" },
  { a: "Nova Scotia", b: "Halifax" },
  { a: "Nunavut", b: "Iqaluit" },
];
const STATE_CAPITALS: Pair[] = [
  { a: "Washington", b: "Olympia" },
  { a: "Oregon", b: "Salem" },
  { a: "California", b: "Sacramento" },
  { a: "Idaho", b: "Boise" },
  { a: "Texas", b: "Austin" },
  { a: "New York", b: "Albany" },
  { a: "Florida", b: "Tallahassee" },
  { a: "Alaska", b: "Juneau" },
];

export function memoryPairs(grade: GradeId, count: number, country: Country = "CA"): Pair[] {
  const g = G[grade];
  const sets: Pair[][] =
    g <= 1
      ? [
          [
            { a: "🐄", b: "🥛" },
            { a: "🐝", b: "🍯" },
            { a: "🐔", b: "🥚" },
            { a: "🐑", b: "🧶" },
            { a: "🧑‍🚒", b: "🚒" },
            { a: "🧑‍⚕️", b: "🩺" },
            { a: "🧑‍🍳", b: "🍳" },
            { a: "🧑‍🌾", b: "🚜" },
          ],
        ]
      : g <= 3
        ? [
            [
              { a: "3 + 4", b: "7" },
              { a: "5 × 2", b: "10" },
              { a: "12 − 4", b: "8" },
              { a: "6 + 6", b: "12" },
              { a: "9 − 3", b: "6" },
              { a: "2 × 2", b: "4" },
              { a: "15 − 6", b: "9" },
              { a: "4 + 7", b: "11" },
            ],
            [
              { a: "hot", b: "cold" },
              { a: "up", b: "down" },
              { a: "big", b: "small" },
              { a: "day", b: "night" },
              { a: "fast", b: "slow" },
              { a: "open", b: "closed" },
              { a: "happy", b: "sad" },
              { a: "full", b: "empty" },
            ],
          ]
        : g <= 5
          ? [
              country === "US" ? STATE_CAPITALS : PROVINCE_CAPITALS,
              [
                { a: "7 × 8", b: "56" },
                { a: "6 × 9", b: "54" },
                { a: "8 × 8", b: "64" },
                { a: "7 × 7", b: "49" },
                { a: "9 × 4", b: "36" },
                { a: "6 × 7", b: "42" },
                { a: "8 × 3", b: "24" },
                { a: "9 × 9", b: "81" },
              ],
            ]
          : olderMemorySets(g, country === "US" ? US_GOVERNMENT : GOVERNMENT);
  return sample(pick(sets), count);
}

const PERCENTS: Pair[] = [
  { a: "½", b: "50%" },
  { a: "¼", b: "25%" },
  { a: "¾", b: "75%" },
  { a: "⅕", b: "20%" },
  { a: "1/10", b: "10%" },
  { a: "0.3", b: "30%" },
  { a: "2/5", b: "40%" },
  { a: "0.9", b: "90%" },
];
const CIVILIZATIONS: Pair[] = [
  { a: "Egypt", b: "pyramids" },
  { a: "Rome", b: "aqueducts" },
  { a: "China", b: "paper" },
  { a: "Mesopotamia", b: "cuneiform" },
  { a: "Greece", b: "Olympics" },
  { a: "Maya", b: "calendar" },
  { a: "Indus Valley", b: "planned cities" },
  { a: "Phoenicia", b: "alphabet" },
];
const ROOTS: Pair[] = [
  { a: "bio", b: "life" },
  { a: "geo", b: "earth" },
  { a: "tele", b: "far" },
  { a: "micro", b: "small" },
  { a: "hydro", b: "water" },
  { a: "photo", b: "light" },
  { a: "chrono", b: "time" },
  { a: "auto", b: "self" },
];
const GOVERNMENT: Pair[] = [
  { a: "Prime Minister", b: "leads Canada's government" },
  { a: "Premier", b: "leads a province's government" },
  { a: "Mayor", b: "leads a city or town council" },
  { a: "House of Commons", b: "elected Members of Parliament" },
  { a: "Senate", b: "appointed senators" },
  { a: "Governor General", b: "represents the King" },
  { a: "Supreme Court", b: "Canada's highest court" },
  { a: "Charter", b: "rights and freedoms" },
];
const US_GOVERNMENT: Pair[] = [
  { a: "President", b: "leads the executive branch" },
  { a: "Governor", b: "leads a state's government" },
  { a: "Mayor", b: "leads a city or town council" },
  { a: "Congress", b: "makes federal laws" },
  { a: "Senate", b: "two senators per state" },
  { a: "House of Representatives", b: "seats by population" },
  { a: "Supreme Court", b: "the nation's highest court" },
  { a: "Bill of Rights", b: "the first ten amendments" },
];
const INTEGERS: Pair[] = [
  { a: "−3 + 5", b: "2" },
  { a: "−4 × 3", b: "−12" },
  { a: "6 − 9", b: "−3" },
  { a: "−8 ÷ 2", b: "−4" },
  { a: "−2 × −5", b: "10" },
  { a: "−7 + −3", b: "−10" },
  { a: "0 − 6", b: "−6" },
  { a: "−9 + 9", b: "0" },
];
const FORMULAS: Pair[] = [
  { a: "H₂O", b: "water" },
  { a: "CO₂", b: "carbon dioxide" },
  { a: "NaCl", b: "table salt" },
  { a: "O₂", b: "oxygen gas" },
  { a: "CH₄", b: "methane" },
  { a: "NH₃", b: "ammonia" },
  { a: "H₂", b: "hydrogen gas" },
  { a: "N₂", b: "nitrogen gas" },
];
const EXPONENTS: Pair[] = [
  { a: "2³", b: "8" },
  { a: "3²", b: "9" },
  { a: "10³", b: "1000" },
  { a: "5²", b: "25" },
  { a: "4³", b: "64" },
  { a: "2⁵", b: "32" },
  { a: "7²", b: "49" },
  { a: "10²", b: "100" },
];
const ROOTS_SQUARE: Pair[] = [
  { a: "√81", b: "9" },
  { a: "√144", b: "12" },
  { a: "√16", b: "4" },
  { a: "√49", b: "7" },
  { a: "√100", b: "10" },
  { a: "√1", b: "1" },
  { a: "√36", b: "6" },
  { a: "√121", b: "11" },
];

/** Grades 6 to 9: a few sets per grade, so older kids get variety. */
function olderMemorySets(g: number, government: Pair[]): Pair[][] {
  if (g === 6) return [PERCENTS, CIVILIZATIONS, ROOTS, government];
  if (g === 7) return [PERCENTS, ROOTS, INTEGERS, FORMULAS];
  if (g === 8) return [EXPONENTS, ROOTS_SQUARE, FORMULAS, INTEGERS];
  return [EXPONENTS, ROOTS_SQUARE, FORMULAS, government];
}

export function shuffled<T>(items: T[]): T[] {
  return shuffle(items);
}
