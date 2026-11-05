import { hashSeed, randInt, shuffle, withSeed } from "./random";
import type { AgeBand } from "./types";

// Brain breaks: short, light puzzles (riddles, odd one out, patterns, little logic) for a rest between
// lessons. They are not questions from a unit, so they never count toward practice, levels or reports.
// Region-free: nothing names a curriculum, place, money or holiday, so every child sees the same set.

export interface BreakPuzzle {
  id: string;
  prompt: string;
  /** Shown as a row of big pictures (for little kids) rather than words. */
  pictures: boolean;
  /** The pieces of a pattern, with "?" in the gap; empty for other puzzles. */
  sequence: string[];
  choices: string[];
  answer: number;
  /** Said after a second miss, along with the answer. */
  why: string;
}

/** [prompt, right answer, wrong answers, why]. */
type Raw = readonly [string, string, readonly string[], string];

const LITTLE: Raw[] = [
  ["Which one can fly?", "🐦", ["🐟", "🐢"], "Birds have wings."],
  ["Which one lives in water?", "🐟", ["🐶", "🐱"], "Fish swim all day."],
  ["Which one is not food?", "🚗", ["🍎", "🍌"], "We drive a car. We eat fruit."],
  ["Which one is cold?", "🧊", ["🔥", "☀️"], "Ice is very cold."],
  ["Which one goes on our feet?", "👟", ["🧢", "🧤"], "Shoes go on our feet."],
  ["Which one is the biggest?", "🐘", ["🐭", "🐱"], "An elephant is huge."],
  ["Which one is the smallest?", "🐜", ["🐘", "🐶"], "An ant is tiny."],
  ["Which one makes music?", "🥁", ["🧸", "⚽"], "We can bang a drum."],
  ["Which one grows on a tree?", "🍎", ["🥕", "🍄"], "Apples grow on trees."],
  ["Which one is round?", "⚽", ["🟦", "🔺"], "A ball is round."],
  ["Which one has wheels?", "🚲", ["🐟", "🏠"], "A bike rolls on wheels."],
  ["Which one do we write with?", "✏️", ["🍴", "🧦"], "A pencil makes marks."],
  ["Which one shines at night?", "🌙", ["☀️", "🌈"], "The moon is out at night."],
  ["Which one has three sides?", "🔺", ["⬛", "⚪"], "A triangle has 3 sides."],
  ["Which one gives us milk?", "🐄", ["🐔", "🐟"], "Cows give us milk."],
  ["Which one is hot?", "🔥", ["🧊", "❄️"], "Fire is hot."],
  ["Which one do we sleep in?", "🛏️", ["🪑", "🚿"], "A bed is for sleeping."],
  ["Which one has four legs?", "🐕", ["🐦", "🐍"], "Dogs walk on four legs."],
  ["Which one do we drink?", "🥛", ["🍞", "🧱"], "Milk is a drink."],
  ["Which one tells us the time?", "⏰", ["🪁", "🧩"], "A clock tells the time."],
];

const MIDDLE: Raw[] = [
  ["What has hands but cannot clap?", "a clock", ["a book", "a tree"], "A clock has hands that point at the time."],
  ["What gets wetter the more it dries?", "a towel", ["a sponge", "the rain"], "A towel soaks up water as it dries you."],
  ["What has keys but no locks?", "a piano", ["a door", "a map"], "A piano has keys you press to play."],
  ["What goes up but never comes down?", "your age", ["a ball", "a feather"], "You only get older."],
  ["What can you catch but not throw?", "a cold", ["a ball", "a frisbee"], "You catch a cold when you are sick."],
  ["What has a neck but no head?", "a bottle", ["a giraffe", "a spoon"], "A bottle has a neck at the top."],
  ["What has teeth but cannot bite?", "a comb", ["a dog", "a shark"], "A comb has teeth that go through hair."],
  ["I am tall when I am new and short when I am old. What am I?", "a candle", ["a tree", "a dog"], "A candle burns down."],
  ["What has one eye but cannot see?", "a needle", ["a cat", "a storm"], "A needle has a little hole called an eye."],
  ["What runs but never walks?", "a river", ["a cat", "a chair"], "Rivers run along."],
  ["Which does not belong: 2, 4, 6, 9?", "9", ["2", "4", "6"], "The others are even numbers."],
  ["Which does not belong: triangle, square, circle, cube?", "cube", ["triangle", "square", "circle"], "A cube is a solid. The others are flat."],
  ["Which word does not belong: red, blue, apple, green?", "apple", ["red", "blue", "green"], "Apple is a fruit. Red, blue and green are shades."],
  ["Which does not belong: Monday, Friday, July, Tuesday?", "July", ["Monday", "Friday", "Tuesday"], "July is a month. The others are days."],
  ["Which does not belong: cat, dog, rabbit, car?", "car", ["cat", "dog", "rabbit"], "The others are animals."],
  ["Which does not belong: 10, 20, 35, 40?", "35", ["10", "20", "40"], "The others are tens."],
  ["Sam is taller than Ana. Ana is taller than Lee. Who is the shortest?", "Lee", ["Sam", "Ana"], "Sam, then Ana, then Lee. Lee is last."],
  ["Today is Wednesday. What day is it in 2 days?", "Friday", ["Thursday", "Saturday"], "Thursday is 1 day away. Friday is 2."],
  ["Mia has 3 more stickers than Ben. Ben has 5. How many does Mia have?", "8", ["2", "7"], "5 and 3 more is 8."],
  ["I think of a number. Double it and I get 14. What is it?", "7", ["28", "12"], "7 and 7 make 14."],
  ["A farm has 4 cows. How many legs do the cows have in all?", "16", ["8", "12"], "4 cows with 4 legs each is 16."],
  ["Which shape has no corners?", "circle", ["square", "triangle"], "A circle is smooth all around."],
  ["How many days are in a week?", "7", ["5", "6"], "Count Monday to Sunday: 7."],
  ["What comes next: A, B, C, D, ?", "E", ["F", "G"], "The next letter in the alphabet is E."],
];

const BIG: Raw[] = [
  ["What can travel around the world while staying in a corner?", "a stamp", ["a map", "a ship"], "A stamp stays in the corner of the envelope."],
  ["What is full of holes but still holds water?", "a sponge", ["a net", "a bucket"], "A sponge is full of little holes."],
  ["What belongs to you but other people use it more than you?", "your name", ["your toy", "your bed"], "Other people say your name."],
  ["What can fill a room but takes up no space?", "light", ["a sofa", "a balloon"], "Light fills a room but has no size."],
  ["What has to be broken before you can use it?", "an egg", ["a spoon", "a glove"], "You crack an egg to cook it."],
  ["What has many pages but never speaks?", "a book", ["a tree", "a drum"], "A book has pages with words, and it is quiet."],
  ["Which does not belong: 2, 5, 9, 11?", "9", ["2", "5", "11"], "The others are prime numbers."],
  ["Which does not belong: 16, 25, 36, 40?", "40", ["16", "25", "36"], "The others are square numbers."],
  ["Which does not belong: triangle, pentagon, hexagon, circle?", "circle", ["triangle", "pentagon", "hexagon"], "The others are polygons with straight sides."],
  ["Which word does not belong: whisper, shout, murmur, mumble?", "shout", ["whisper", "murmur", "mumble"], "The others are quiet ways to speak."],
  ["Which does not belong: oxygen, helium, water, nitrogen?", "water", ["oxygen", "helium", "nitrogen"], "Water is a compound. The others are elements."],
  ["Which does not belong: gram, second, kilogram, milligram?", "second", ["gram", "kilogram", "milligram"], "A second measures time. The others measure mass."],
  ["Which does not belong: Mars, Venus, Moon, Jupiter?", "Moon", ["Mars", "Venus", "Jupiter"], "The Moon is not a planet."],
  ["All blips are blops. All blops are blaps. Is a blip a blap?", "Yes", ["No", "Can't tell"], "Blip leads to blop, and blop leads to blap."],
  ["Kai beat Zoe. Zoe beat Max. Who came last?", "Max", ["Kai", "Zoe"], "Kai beat Zoe and Zoe beat Max, so Max is last."],
  ["A clock shows 3:00. What is the angle between its hands?", "90°", ["60°", "180°"], "The hands make a square corner."],
  ["What is the next letter: A, C, E, G, ?", "I", ["H", "J"], "It skips a letter each time, so I comes next."],
  ["A snail climbs 3 m up a wall each day and slides back 2 m each night. How many days to reach the top of a 5 m wall?", "3", ["5", "4"], "On day 3 it climbs from 2 m to the top and does not slide back."],
  ["Two numbers add to 10 and multiply to 21. What are they?", "3 and 7", ["4 and 6", "2 and 8"], "3 + 7 = 10 and 3 × 7 = 21."],
  ["How many sides do 3 triangles have in all?", "9", ["6", "12"], "3 triangles with 3 sides each is 9."],
  ["What number is half of a quarter of 80?", "10", ["20", "40"], "A quarter of 80 is 20. Half of 20 is 10."],
  ["Which is heavier: a kilogram of feathers or a kilogram of stones?", "They weigh the same", ["Feathers", "Stones"], "A kilogram is a kilogram."],
  ["If today is Monday, what day was it 3 days ago?", "Friday", ["Thursday", "Saturday"], "Back from Monday: Sunday, Saturday, Friday."],
];

const BANK: Record<AgeBand, Raw[]> = { little: LITTLE, middle: MIDDLE, big: BIG };

const SHAPES = ["🍎", "🐟", "⭐", "🌙", "🐸", "🍓", "🚗", "🌼"];

function fromRaw(band: AgeBand, index: number, raw: Raw): BreakPuzzle {
  const [prompt, right, wrongs, why] = raw;
  const choices = shuffle([right, ...wrongs]);
  return { id: `${band}-${index}`, prompt, pictures: band === "little", sequence: [], choices, answer: choices.indexOf(right), why };
}

/** "What comes next?" with a repeating row of pictures. */
function pictureSequence(id: string, band: AgeBand): BreakPuzzle {
  const kinds = band === "little" ? 2 : band === "middle" ? 3 : 3;
  const pieces = shuffle(SHAPES).slice(0, kinds + 1);
  const unit = band === "little" ? [0, 1] : band === "middle" ? [0, 0, 1, 2] : [0, 1, 1, 2, 3];
  const repeats = band === "little" ? 3 : 2;
  const full: string[] = [];
  for (let r = 0; r < repeats + 2; r++) unit.forEach((u) => full.push(pieces[u]));
  // The gap can fall anywhere in a repeat, not always at its start.
  const gap = unit.length * repeats + randInt(0, unit.length - 1);
  const right = full[gap];
  const used = [...new Set(unit.map((u) => pieces[u]))];
  const wrongs = shuffle(used.filter((p) => p !== right)).slice(0, 2);
  while (wrongs.length < 2) wrongs.push(shuffle(SHAPES.filter((p) => p !== right && !wrongs.includes(p)))[0]);
  const choices = shuffle([right, ...wrongs]);
  return {
    id,
    prompt: "What comes next?",
    pictures: true,
    sequence: [...full.slice(0, gap), "?"],
    choices,
    answer: choices.indexOf(right),
    why: "The pictures repeat in the same order, so this one comes next.",
  };
}

/** "What number comes next?" for a counting or growing pattern. */
function numberSequence(id: string, band: AgeBand): BreakPuzzle {
  const hard = band === "big";
  const kind = randInt(0, hard ? 3 : 1);
  let terms: number[];
  let why: string;
  if (kind === 0) {
    const step = randInt(2, hard ? 9 : 5);
    const start = randInt(1, 12);
    terms = Array.from({ length: 6 }, (_, i) => start + step * i);
    why = `It goes up by ${step} each time.`;
  } else if (kind === 1) {
    const step = randInt(2, 6);
    const start = randInt(30, 50);
    terms = Array.from({ length: 6 }, (_, i) => start - step * i);
    why = `It goes down by ${step} each time.`;
  } else if (kind === 2) {
    const start = randInt(1, 4);
    terms = Array.from({ length: 6 }, (_, i) => start * 2 ** i);
    why = "Each number is double the one before.";
  } else {
    terms = Array.from({ length: 6 }, (_, i) => (i + 1) ** 2);
    why = "These are square numbers: 1 × 1, 2 × 2, 3 × 3 and so on.";
  }
  const right = terms[5];
  const near = [right + 1, right - 1, right + 2, right - 2, right + 10].filter((n) => n > 0 && n !== right);
  const wrongs = shuffle(near).slice(0, 2);
  const choices = shuffle([right, ...wrongs]).map(String);
  return { id, prompt: "What number comes next?", pictures: false, sequence: [...terms.slice(0, 5).map(String), "?"], choices, answer: choices.indexOf(String(right)), why };
}

/** "How many?" for the youngest: count a small group of pictures. */
function countPictures(id: string): BreakPuzzle {
  const n = randInt(2, 5);
  const piece = shuffle(SHAPES)[0];
  const choices = shuffle([n, n + 1, n - 1 > 0 ? n - 1 : n + 2]).map(String);
  return { id, prompt: "How many?", pictures: true, sequence: Array.from({ length: n }, () => piece), choices, answer: choices.indexOf(String(n)), why: `Count them one by one: ${n}.` };
}

export const BREAK_LENGTH = 5;

/**
 * A set of brain-break puzzles for an age band. The same seed always gives the same set (and the same
 * choice order), so a child's "play again" can change it and a test can pin it.
 */
export function breakSet(band: AgeBand, seed: string, count = BREAK_LENGTH): BreakPuzzle[] {
  return withSeed(hashSeed(`break:${band}:${seed}`), () => {
    const bank = BANK[band];
    const order = shuffle(bank.map((_, i) => i));
    const generated: BreakPuzzle[] = [pictureSequence("seq", band), band === "little" ? countPictures("count") : numberSequence("num", band)];
    const statics = order.slice(0, count - generated.length).map((i) => fromRaw(band, i, bank[i]));
    return shuffle([...generated, ...statics]).slice(0, count);
  });
}

/** Every hand-written puzzle, for tests. */
export function allBreakPuzzles(): { band: AgeBand; raw: Raw }[] {
  return (["little", "middle", "big"] as const).flatMap((band) => BANK[band].map((raw) => ({ band, raw })));
}
