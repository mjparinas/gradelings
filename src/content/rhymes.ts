import { hashSeed, shuffle, withSeed } from "./random";

// Rhymes: short, original read-along rhymes for little and middle kids. Each is four couplets, and the
// words that end a couplet's two lines rhyme, so a rhyme gives "which word rhymes?" questions for free.
// Region-free (no curriculum, place, money or holiday), so one library serves every province and state.
// Nothing here is scored or saved: a rhyme is for fun and for hearing how words sound.

export interface Rhyme {
  id: string;
  title: string;
  emoji: string;
  lines: string[];
  /** The two rhyming end words of each couplet, in order. */
  pairs: [string, string][];
}

export const RHYMES: Rhyme[] = [
  {
    id: "sleepy-bear",
    title: "Sleepy Bear",
    emoji: "🐻",
    lines: [
      "The sleepy bear sat on a chair,",
      "He combed and combed his fuzzy hair.",
      "He yawned a yawn, then dropped his spoon,",
      "And hummed a song beneath the moon.",
      "The stars came out, a twinkly row,",
      "The night wind said, \"Go slow, go slow.\"",
      "He tucked in tight and closed his eyes,",
      "And dreamed of cakes and apple pies.",
    ],
    pairs: [["chair", "hair"], ["spoon", "moon"], ["row", "slow"], ["eyes", "pies"]],
  },
  {
    id: "rainy-day-boots",
    title: "Rainy Day Boots",
    emoji: "🌧️",
    lines: [
      "Splish, splash, down comes the rain,",
      "Tap, tap, tap on the window pane.",
      "Yellow boots upon my feet,",
      "Puddles splash and look so neat.",
      "Round and round the puddles go,",
      "Splashing high and splashing low.",
      "Then the sun peeks out, hooray!",
      "The clouds all tiptoe off to play.",
    ],
    pairs: [["rain", "pane"], ["feet", "neat"], ["go", "low"], ["hooray", "play"]],
  },
  {
    id: "counting-ducks",
    title: "Counting Ducks",
    emoji: "🦆",
    lines: [
      "One little duck went out to play,",
      "Two little ducks swam far away.",
      "Three little ducks went quack, quack, quack,",
      "Four little ducks came waddling back.",
      "Five little ducks all in a line,",
      "Said, \"Let's go splash, the day is fine!\"",
      "Six little ducks dove down so deep,",
      "Seven ducks dreamed and fell asleep.",
    ],
    pairs: [["play", "away"], ["quack", "back"], ["line", "fine"], ["deep", "asleep"]],
  },
  {
    id: "little-frog",
    title: "Little Frog",
    emoji: "🐸",
    lines: [
      "A little frog sat on a log,",
      "Beside a pond in the morning fog.",
      "He blinked his eyes and gave a hop,",
      "He leaped so high he could not stop.",
      "Splash! He landed in the pond,",
      "Of lily pads he was so fond.",
      "Ribbit, ribbit, hear him sing,",
      "Hello, hello to everything!",
    ],
    pairs: [["log", "fog"], ["hop", "stop"], ["pond", "fond"], ["sing", "everything"]],
  },
  {
    id: "baking-day",
    title: "Baking Day",
    emoji: "🍪",
    lines: [
      "Mix the flour, stir the batter,",
      "Pour it in, it's no small matter.",
      "Roll the dough out flat and wide,",
      "Cut the shapes and place inside.",
      "Wait for the timer's little ring,",
      "Cookies are a yummy thing!",
      "Share them out, one, two, three,",
      "One for you and one for me!",
    ],
    pairs: [["batter", "matter"], ["wide", "inside"], ["ring", "thing"], ["three", "me"]],
  },
  {
    id: "windy-kite",
    title: "Windy Kite",
    emoji: "🪁",
    lines: [
      "The wind blew in from far away,",
      "It lifted up my kite today.",
      "Up it flew, so red and tall,",
      "Above the fence, above the wall.",
      "It twirled and swirled, it dipped and spun,",
      "I laughed and ran. It's so much fun!",
      "Then home we went, my kite and me,",
      "And hung it on the apple tree.",
    ],
    pairs: [["away", "today"], ["tall", "wall"], ["spun", "fun"], ["me", "tree"]],
  },
  {
    id: "under-the-sea",
    title: "Under the Sea",
    emoji: "🐠",
    lines: [
      "A little fish swam to and fro,",
      "Where the ocean currents flow.",
      "A crab went sideways on the sand,",
      "Waving with his pinching hand.",
      "A whale sang low, a sleepy song,",
      "And all the sea hummed along.",
      "A starfish shone like a tiny star,",
      "And glowed from way down deep, so far.",
    ],
    pairs: [["fro", "flow"], ["sand", "hand"], ["song", "along"], ["star", "far"]],
  },
  {
    id: "morning-time",
    title: "Morning Time",
    emoji: "⏰",
    lines: [
      "Wake up, wake up, the sun is bright,",
      "I stretch my arms with all my might.",
      "I wash my face and brush my teeth,",
      "I find my shoes just underneath.",
      "I eat my toast and drink my milk,",
      "My shirt is soft as shiny silk.",
      "Out the door and down the street,",
      "Hello, hello to all I meet!",
    ],
    pairs: [["bright", "might"], ["teeth", "underneath"], ["milk", "silk"], ["street", "meet"]],
  },
  {
    id: "garden-helpers",
    title: "Garden Helpers",
    emoji: "🌱",
    lines: [
      "Dig a hole, not too deep,",
      "Plant a seed, then let it sleep.",
      "Sprinkle water, drop by drop,",
      "Soon a little leaf will pop.",
      "The sun shines down, the roots grow long,",
      "The little sprout is getting strong.",
      "Look, the flower opened wide,",
      "With petals folded side by side.",
    ],
    pairs: [["deep", "sleep"], ["drop", "pop"], ["long", "strong"], ["wide", "side"]],
  },
  {
    id: "up-in-the-sky",
    title: "Up in the Sky",
    emoji: "✈️",
    lines: [
      "A cloud floats by, so soft and white,",
      "A bird flies past, a pretty sight.",
      "The airplane hums, a silver streak,",
      "It zooms above the mountain peak.",
      "The moon comes up, a glowing ball,",
      "Oh, the sky has room for all.",
      "The stars go blink, the stars go beam,",
      "Goodnight, sky, and sweetest dream.",
    ],
    pairs: [["white", "sight"], ["streak", "peak"], ["ball", "all"], ["beam", "dream"]],
  },
  {
    id: "pet-parade",
    title: "Pet Parade",
    emoji: "🐶",
    lines: [
      "My dog can run, my dog can jump,",
      "He lands on the grass with a thump.",
      "My cat can purr, my cat can creep,",
      "She curls on my lap and falls asleep.",
      "My fish goes round in a bowl of glass,",
      "And watches all the people pass.",
      "My hamster spins his little wheel,",
      "He runs so fast, it's a big deal!",
    ],
    pairs: [["jump", "thump"], ["creep", "asleep"], ["glass", "pass"], ["wheel", "deal"]],
  },
  {
    id: "rainbow-song",
    title: "Rainbow Song",
    emoji: "🌈",
    lines: [
      "Red like a berry, ripe and sweet,",
      "Orange like a carrot, a crunchy treat.",
      "Yellow like the sun up high,",
      "Green like the grass beneath the sky.",
      "Blue like the lake that shines and gleams,",
      "Purple like the sweetest dreams.",
      "Now put them all together, see,",
      "A rainbow arching over me!",
    ],
    pairs: [["sweet", "treat"], ["high", "sky"], ["gleams", "dreams"], ["see", "me"]],
  },
];

export function findRhyme(id: string): Rhyme | undefined {
  return RHYMES.find((r) => r.id === id);
}

/** The last word of a line, without punctuation or quote marks. */
export function endWord(line: string): string {
  return (line.trim().split(/\s+/).pop() ?? "").replace(/[^A-Za-z']/g, "").toLowerCase();
}

export interface RhymeQuestion {
  prompt: string;
  choices: string[];
  answer: number;
  /** Said when the answer is shown. */
  why: string;
}

/** True when two words could plausibly rhyme (a quick spelling check, used to keep wrong choices clearly wrong). */
export function mightRhyme(a: string, b: string): boolean {
  if (a === b) return true;
  if (a.slice(-2) === b.slice(-2)) return true;
  // Words that end in the same vowel letter often rhyme (me, tree, see).
  return /[aeiouy]$/.test(a) && a.slice(-1) === b.slice(-1);
}

/**
 * "Which word rhymes with ...?" for one couplet of a rhyme, with two wrong choices that don't rhyme with
 * either word. The same seed always gives the same question and choice order.
 */
export function rhymeQuestion(rhyme: Rhyme, couplet: number, seed: string): RhymeQuestion {
  const [ask, right] = rhyme.pairs[couplet];
  return withSeed(hashSeed(`rhyme:${rhyme.id}:${couplet}:${seed}`), () => {
    const pool = RHYMES.flatMap((r) => r.pairs.flat()).filter((w) => !mightRhyme(w, ask) && !mightRhyme(w, right));
    const wrongs = shuffle([...new Set(pool)]).slice(0, 2);
    const choices = shuffle([right, ...wrongs]);
    return { prompt: `Which word rhymes with “${ask}”?`, choices, answer: choices.indexOf(right), why: `“${ask}” and “${right}” sound alike at the end.` };
  });
}

/** Two couplets of a rhyme to ask about, chosen by seed. */
export function rhymeQuiz(rhyme: Rhyme, seed: string): RhymeQuestion[] {
  const order = withSeed(hashSeed(`quiz:${rhyme.id}:${seed}`), () => shuffle(rhyme.pairs.map((_, i) => i)));
  return order.slice(0, 2).map((i) => rhymeQuestion(rhyme, i, seed));
}
