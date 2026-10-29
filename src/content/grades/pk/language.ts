import { pick, sample, shuffle, textChoice } from "../../random";
import type { Choice, ChoiceQuestion, Course, GenerateOptions, Question, Visual } from "../../types";

// Pre-K early literacy: listening, sounds and letters for children who don't read yet. Every prompt is read aloud and
// every answer is a picture or one letter. Where hearing a choice would give the answer away (finding a letter by
// sight), the choice has `speak: ""` so read-aloud skips it.

type Level = NonNullable<GenerateOptions["difficulty"]>;
type Opt = Omit<Choice, "id">;
type Pic = [word: string, emoji: string];

const level = (opts?: GenerateOptions): Level => opts?.difficulty ?? 2;
const pic = ([word, emoji]: Pic): Opt => ({ label: word, emoji });
const quiet = (label: string): Opt => ({ label, speak: "" });

function ask(prompt: string, right: Opt, wrong: Opt[], hint: string, visual?: Visual, speak?: string): ChoiceQuestion {
  const q = textChoice(prompt, right, wrong, hint, visual);
  if (speak) q.speak = speak;
  return q;
}

// ---------- Letter Names ----------

// Z is left out: it is "zed" in Canada and "zee" in the US, and read-aloud says one name for everyone.
const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXY".split("");
/** Letters many children know first, from their own names and early books. */
const FIRST_LETTERS = "ABCDEMOPST".split("");

const LETTER_NAMES: Record<string, string> = {
  A: "ay", B: "bee", C: "see", D: "dee", E: "ee", F: "eff", G: "gee", H: "aitch", I: "eye", J: "jay", K: "kay", L: "el",
  M: "em", N: "en", O: "oh", P: "pee", Q: "cue", R: "ar", S: "ess", T: "tee", U: "you", V: "vee", W: "double you", X: "ex", Y: "why",
};

/** Big letters that look alike, for the stretch level. */
const LOOKALIKES: Record<string, string[]> = {
  B: ["D", "P", "R"],
  C: ["G", "O", "Q"],
  E: ["F", "B", "H"],
  F: ["E", "P", "T"],
  G: ["C", "O", "Q"],
  M: ["N", "W", "H"],
  N: ["M", "H", "W"],
  O: ["Q", "C", "G"],
  P: ["R", "B", "F"],
  R: ["P", "B", "K"],
  V: ["W", "Y", "U"],
  W: ["M", "V", "N"],
};

function wrongLetters(answer: string, difficulty: Level): string[] {
  const alike = LOOKALIKES[answer];
  if (difficulty === 3 && alike) return sample(alike, 2);
  return sample(
    LETTERS.filter((l) => l !== answer && !(alike ?? []).includes(l)),
    2,
  );
}

function findLetter(difficulty: Level): Question {
  const answer = pick(difficulty === 1 ? FIRST_LETTERS : difficulty === 3 ? Object.keys(LOOKALIKES) : LETTERS);
  return ask(
    `Find the letter ${answer}.`,
    quiet(answer),
    wrongLetters(answer, difficulty).map(quiet),
    `Look for the letter ${answer}. Trace its shape in the air with your finger!`,
    undefined,
    `Find the letter ${LETTER_NAMES[answer]}.`,
  );
}

function sameLetter(difficulty: Level): Question {
  const answer = pick(difficulty === 3 ? Object.keys(LOOKALIKES) : LETTERS);
  return ask(
    "Find the same letter.",
    quiet(answer),
    wrongLetters(answer, difficulty).map(quiet),
    "Look at the big letter. Which one has the very same shape?",
    { type: "letter", text: answer },
  );
}

function letterNames(opts?: GenerateOptions): Question[] {
  const d = level(opts);
  return shuffle([...Array.from({ length: 5 }, () => findLetter(d)), ...Array.from({ length: 3 }, () => sameLetter(d))]);
}

// ---------- First Sounds ----------

/** Words by their first sound (not letter: "cat" and "kite" start the same). Each set is one sound. */
const SOUND_SETS: Pic[][] = [
  [["ball", "⚽"], ["bear", "🐻"], ["banana", "🍌"], ["bus", "🚌"], ["bed", "🛏️"], ["boat", "⛵"]],
  [["moon", "🌙"], ["mouse", "🐭"], ["milk", "🥛"], ["monkey", "🐒"], ["mitten", "🧤"]],
  [["sun", "☀️"], ["sock", "🧦"], ["snake", "🐍"], ["seal", "🦭"], ["sandwich", "🥪"]],
  [["dog", "🐶"], ["duck", "🦆"], ["door", "🚪"], ["drum", "🥁"], ["dinosaur", "🦕"]],
  [["fish", "🐟"], ["fox", "🦊"], ["fire", "🔥"], ["frog", "🐸"], ["feather", "🪶"]],
  [["pig", "🐷"], ["pizza", "🍕"], ["pear", "🍐"], ["penguin", "🐧"], ["pencil", "✏️"]],
  [["cat", "🐱"], ["kite", "🪁"], ["cake", "🎂"], ["car", "🚗"], ["key", "🔑"]],
  [["hat", "🎩"], ["horse", "🐴"], ["house", "🏠"], ["heart", "❤️"], ["hand", "✋"]],
  [["leaf", "🍃"], ["lion", "🦁"], ["lemon", "🍋"], ["lamp", "💡"], ["ladybug", "🐞"]],
  [["rabbit", "🐰"], ["rain", "🌧️"], ["rocket", "🚀"], ["ring", "💍"], ["robot", "🤖"]],
  [["tiger", "🐯"], ["train", "🚂"], ["turtle", "🐢"], ["tree", "🌳"], ["tomato", "🍅"]],
  [["nose", "👃"], ["nest", "🪺"], ["nut", "🥜"], ["net", "🥅"]],
  [["goat", "🐐"], ["gift", "🎁"], ["guitar", "🎸"], ["grapes", "🍇"]],
  [["watch", "⌚"], ["whale", "🐋"], ["worm", "🪱"], ["wave", "🌊"]],
];

function startsLike(difficulty: Level): Question {
  const [setA, ...others] = shuffle(SOUND_SETS);
  const [target, right] = sample(setA, 2);
  const wrong = others.slice(0, 2).map((set) => pick(set));
  const hint = `Say them slowly: “${target[0]}”, “${right[0]}”. They start with the same sound!`;
  if (difficulty === 1) {
    return ask(`Which starts like “${target[0]}”?`, pic(right), [pic(wrong[0])], hint, { type: "emoji", emoji: target[1], caption: target[0] });
  }
  return ask(`Which starts like “${target[0]}”?`, pic(right), wrong.map(pic), hint, { type: "emoji", emoji: target[1], caption: target[0] });
}

function sameStart(): Question {
  const [setA, setB] = sample(SOUND_SETS, 2);
  const same = pick([true, false]);
  const [a, b] = same ? sample(setA, 2) : [pick(setA), pick(setB)];
  return ask(
    `Do “${a[0]}” and “${b[0]}” start the same?`,
    same ? { label: "yes", emoji: "👍" } : { label: "no", emoji: "👎" },
    [same ? { label: "no", emoji: "👎" } : { label: "yes", emoji: "👍" }],
    `Say the first sound of each word: “${a[0]}”, “${b[0]}”.`,
    { type: "emojiRow", items: [a[1], b[1]] },
  );
}

function firstSounds(opts?: GenerateOptions): Question[] {
  const d = level(opts);
  return shuffle([...Array.from({ length: 6 }, () => startsLike(d)), sameStart(), sameStart()]);
}

// ---------- Rhyme Time ----------

/** Rhyming families; every word in a set rhymes with the others. */
const RHYMES: Pic[][] = [
  [["cat", "🐱"], ["hat", "🎩"], ["bat", "🦇"]],
  [["dog", "🐶"], ["frog", "🐸"], ["log", "🪵"]],
  [["bee", "🐝"], ["tree", "🌳"], ["key", "🔑"]],
  [["cake", "🎂"], ["snake", "🐍"], ["lake", "🏞️"]],
  [["star", "⭐"], ["car", "🚗"], ["jar", "🫙"]],
  [["moon", "🌙"], ["spoon", "🥄"], ["balloon", "🎈"]],
  [["bear", "🐻"], ["chair", "🪑"], ["pear", "🍐"]],
  [["fox", "🦊"], ["box", "📦"], ["socks", "🧦"]],
  [["boat", "⛵"], ["goat", "🐐"], ["coat", "🧥"]],
  [["mouse", "🐭"], ["house", "🏠"]],
  [["bug", "🐛"], ["mug", "☕"], ["hug", "🤗"]],
  [["bed", "🛏️"], ["bread", "🍞"], ["red", "🔴"]],
  [["sun", "☀️"], ["run", "🏃"]],
  [["king", "🤴"], ["ring", "💍"], ["sing", "🎤"]],
  [["fish", "🐟"], ["dish", "🍽️"]],
  [["clock", "🕒"], ["lock", "🔒"], ["rock", "🪨"]],
  [["whale", "🐋"], ["snail", "🐌"], ["pail", "🪣"]],
];

function whichRhymes(difficulty: Level): Question {
  const [family, ...others] = shuffle(RHYMES);
  const [target, right] = sample(family, 2);
  const used = new Set([target[0], right[0]]);
  const wrong = others
    .map((f) => pick(f))
    .filter((p) => !used.has(p[0]) && p[1] !== target[1] && p[1] !== right[1])
    .slice(0, difficulty === 1 ? 1 : 2);
  return ask(
    `Which rhymes with “${target[0]}”?`,
    pic(right),
    wrong.map(pic),
    `Rhyming words sound the same at the end: “${target[0]}”, “${right[0]}”.`,
    { type: "emoji", emoji: target[1], caption: target[0] },
  );
}

function doTheyRhyme(): Question {
  const [family, other] = sample(RHYMES, 2);
  const rhyme = pick([true, false]);
  const [a, b] = rhyme ? sample(family, 2) : [pick(family), pick(other)];
  return ask(
    `Do “${a[0]}” and “${b[0]}” rhyme?`,
    rhyme ? { label: "yes", emoji: "👍" } : { label: "no", emoji: "👎" },
    [rhyme ? { label: "no", emoji: "👎" } : { label: "yes", emoji: "👍" }],
    "Say both words. Do they sound the same at the end?",
    { type: "emojiRow", items: [a[1], b[1]] },
  );
}

function rhymeTime(opts?: GenerateOptions): Question[] {
  const d = level(opts);
  return shuffle([...Array.from({ length: d === 1 ? 5 : 6 }, () => whichRhymes(d)), ...Array.from({ length: d === 1 ? 3 : 2 }, doTheyRhyme)]);
}

// ---------- Clap the Parts ----------

/** Words with their parts for clapping. */
const CLAP_WORDS: [parts: string, emoji: string][] = [
  ["cat", "🐱"], ["dog", "🐶"], ["sun", "☀️"], ["fish", "🐟"], ["ball", "⚽"], ["tree", "🌳"], ["bee", "🐝"], ["frog", "🐸"], ["boat", "⛵"], ["star", "⭐"],
  ["ap-ple", "🍎"], ["mon-key", "🐒"], ["pen-cil", "✏️"], ["ti-ger", "🐯"], ["ro-bot", "🤖"], ["tur-tle", "🐢"], ["pen-guin", "🐧"], ["rab-bit", "🐰"], ["pea-nut", "🥜"], ["cup-cake", "🧁"],
  ["ba-na-na", "🍌"], ["el-e-phant", "🐘"], ["but-ter-fly", "🦋"], ["di-no-saur", "🦕"], ["kan-ga-roo", "🦘"], ["oc-to-pus", "🐙"], ["to-ma-to", "🍅"], ["bi-cy-cle", "🚲"],
];

const CLAPS = CLAP_WORDS.map(([parts, emoji]) => ({ word: parts.replace(/-/g, ""), parts: parts.split("-"), emoji }));
type Clap = (typeof CLAPS)[number];

const claps = (n: number) => `${n} clap${n === 1 ? "" : "s"}`;
const clapHint = (c: Clap) => `Clap as you say it: ${c.parts.join(" · ")}. That's ${claps(c.parts.length)}!`;

function howManyClaps(c: Clap): Question {
  return {
    kind: "choice",
    prompt: `Clap “${c.word}”. How many claps?`,
    speak: `Say ${c.word} and clap. How many claps?`,
    hint: clapHint(c),
    visual: { type: "emoji", emoji: c.emoji, caption: c.word },
    answer: String(c.parts.length),
    choices: [1, 2, 3].map((n) => ({ id: String(n), label: String(n) })),
  };
}

function whichHasClaps(n: number): Question {
  const right = pick(CLAPS.filter((c) => c.parts.length === n));
  const wrong = [1, 2, 3].filter((k) => k !== n).map((k) => pick(CLAPS.filter((c) => c.parts.length === k)));
  return ask(
    `Which word has ${claps(n)}?`,
    { label: right.word, emoji: right.emoji },
    wrong.map((w) => ({ label: w.word, emoji: w.emoji })),
    `Clap each word. ${right.word[0].toUpperCase()}${right.word.slice(1)} has ${claps(n)}: ${right.parts.join(" · ")}.`,
  );
}

function clapTheParts(opts?: GenerateOptions): Question[] {
  const d = level(opts);
  const counts = d === 1 ? [1, 1, 1, 2, 2, 2] : d === 2 ? [1, 1, 2, 2, 3, 3] : [1, 2, 2, 3, 3, 3];
  const words = counts.map((n) => pick(CLAPS.filter((c) => c.parts.length === n)));
  return shuffle([...words.map(howManyClaps), whichHasClaps(pick([1, 2, 3])), whichHasClaps(d === 1 ? pick([1, 3]) : pick([2, 3]))]);
}

// ---------- Listen to a Story ----------

/** A two-sentence story and a question about it. Kept under 80 characters so it is all read aloud. */
interface Listen {
  story: string;
  right: Pic;
  wrong: Pic[];
  hint: string;
  /** Stretch: the answer is in the second sentence, or asks why or what next. */
  stretch?: boolean;
}

const LISTEN: Listen[] = [
  { story: "Mia flew her kite at the park. What did Mia fly?", right: ["kite", "🪁"], wrong: [["boat", "⛵"], ["ball", "⚽"]], hint: "Listen again: Mia flew her kite." },
  { story: "Sam fed his fish in the morning. What did Sam feed?", right: ["fish", "🐟"], wrong: [["dog", "🐶"], ["bird", "🐦"]], hint: "Listen again: Sam fed his fish." },
  { story: "Lena wore her red boots in the rain. What did Lena wear?", right: ["boots", "🥾"], wrong: [["hat", "🎩"], ["mittens", "🧤"]], hint: "Listen again: she wore red boots." },
  { story: "Ravi ate a banana for snack. What did Ravi eat?", right: ["banana", "🍌"], wrong: [["apple", "🍎"], ["cookie", "🍪"]], hint: "Listen again: Ravi ate a banana." },
  { story: "A frog hopped onto a log. Who hopped?", right: ["frog", "🐸"], wrong: [["rabbit", "🐰"], ["duck", "🦆"]], hint: "Listen again: a frog hopped." },
  { story: "Zoe read a book with her grandpa. What did they read?", right: ["book", "📕"], wrong: [["map", "🗺️"], ["letter", "✉️"]], hint: "Listen again: they read a book." },
  { story: "The cat slept in a box all day. Where did the cat sleep?", right: ["box", "📦"], wrong: [["tree", "🌳"], ["car", "🚗"]], hint: "Listen again: the cat slept in a box." },
  { story: "Noah rode his bike to the park. What did Noah ride?", right: ["bike", "🚲"], wrong: [["bus", "🚌"], ["horse", "🐴"]], hint: "Listen again: Noah rode his bike." },
  { story: "Ana built a tall tower of blocks. What did Ana build with?", right: ["blocks", "🧱"], wrong: [["sand", "🏖️"], ["snow", "⛄"]], hint: "Listen again: a tower of blocks." },
  { story: "A bird sang in the tree. Where was the bird?", right: ["tree", "🌳"], wrong: [["pond", "🌊"], ["house", "🏠"]], hint: "Listen again: the bird sang in the tree." },
  { story: "Kenji planted a seed. He gave it water. What did he plant?", right: ["seed", "🌱"], wrong: [["rock", "🪨"], ["shoe", "👟"]], hint: "Listen again: Kenji planted a seed." },
  { story: "Priya baked a cake for her mom. What did Priya bake?", right: ["cake", "🎂"], wrong: [["bread", "🍞"], ["pizza", "🍕"]], hint: "Listen again: Priya baked a cake." },
  { story: "The dog dug a hole. He hid his bone. What did the dog hide?", right: ["bone", "🦴"], wrong: [["ball", "⚽"], ["sock", "🧦"]], hint: "Listen again: he hid his bone.", stretch: true },
  { story: "Leo put on his coat. It was cold. Why did Leo wear a coat?", right: ["it was cold", "🥶"], wrong: [["it was hot", "🥵"], ["it was night", "🌙"]], hint: "Listen again: it was cold outside.", stretch: true },
  { story: "Jay spilled his milk. He got a cloth. What will Jay do next?", right: ["wipe it up", "🧽"], wrong: [["go to sleep", "😴"], ["paint", "🎨"]], hint: "Milk is spilled. A cloth helps clean it up.", stretch: true },
  { story: "It started to rain. Amir opened his… what?", right: ["umbrella", "☂️"], wrong: [["lunchbox", "🍱"], ["book", "📕"]], hint: "What keeps you dry in the rain?", stretch: true },
  { story: "The baby was tired. She yawned. What will she do next?", right: ["sleep", "😴"], wrong: [["run", "🏃"], ["swim", "🏊"]], hint: "When you are tired and yawn, it is time to rest.", stretch: true },
  { story: "Maya went to the beach. She made a castle. What was it made of?", right: ["sand", "🏖️"], wrong: [["snow", "⛄"], ["wood", "🪵"]], hint: "At the beach, castles are made of sand.", stretch: true },
  { story: "The duck swam in the pond. Then it flew away. What did it do first?", right: ["swam", "🏊"], wrong: [["flew", "🕊️"], ["slept", "😴"]], hint: "Listen again: first it swam, then it flew.", stretch: true },
  { story: "Kai found a shell at the beach. What did Kai find?", right: ["shell", "🐚"], wrong: [["leaf", "🍃"], ["key", "🔑"]], hint: "Listen again: Kai found a shell." },
  { story: "Grandma knit a warm scarf for Ben. What did Grandma make?", right: ["scarf", "🧣"], wrong: [["hat", "🎩"], ["sock", "🧦"]], hint: "Listen again: she knit a scarf." },
  { story: "A little mouse ate some cheese. What did the mouse eat?", right: ["cheese", "🧀"], wrong: [["carrot", "🥕"], ["bread", "🍞"]], hint: "Listen again: the mouse ate cheese." },
  { story: "Lily painted a big yellow sun. What did Lily paint?", right: ["sun", "☀️"], wrong: [["moon", "🌙"], ["tree", "🌳"]], hint: "Listen again: Lily painted a sun." },
  { story: "Omar and his dad went fishing in a boat. Where were they?", right: ["boat", "🚤"], wrong: [["bus", "🚌"], ["train", "🚂"]], hint: "Listen again: they were in a boat." },
  { story: "The bee flew to a flower. What did the bee visit?", right: ["flower", "🌼"], wrong: [["tree", "🌳"], ["rock", "🪨"]], hint: "Listen again: the bee flew to a flower." },
  { story: "Nina wore her new shoes to school. What was new?", right: ["shoes", "👟"], wrong: [["hat", "🧢"], ["coat", "🧥"]], hint: "Listen again: her shoes were new." },
  { story: "A turtle walked very slowly to the pond. Who walked slowly?", right: ["turtle", "🐢"], wrong: [["rabbit", "🐰"], ["horse", "🐴"]], hint: "Listen again: a turtle walked slowly." },
  { story: "Ella's balloon floated up. Then it popped! What happened last?", right: ["it popped", "💥"], wrong: [["it grew", "🎈"], ["it sang", "🎵"]], hint: "Listen again: first it floated, then it popped.", stretch: true },
  { story: "Tom's plant got no water. It drooped. Why did it droop?", right: ["no water", "🥀"], wrong: [["too much fun", "🎉"], ["a song", "🎵"]], hint: "Plants need water. Without it, they droop.", stretch: true },
  { story: "Sam's ice cream melted in the sun. Why did it melt?", right: ["the sun was hot", "☀️"], wrong: [["it was dark", "🌙"], ["it was windy", "🌬️"]], hint: "The sun is hot. Heat melts ice cream.", stretch: true },
];

function listenToAStory(opts?: GenerateOptions): Question[] {
  const d = level(opts);
  const easy = LISTEN.filter((l) => !l.stretch);
  const hard = LISTEN.filter((l) => l.stretch);
  const items = d === 1 ? sample(easy, 8) : d === 2 ? [...sample(easy, 6), ...sample(hard, 2)] : [...sample(easy, 3), ...sample(hard, 5)];
  return shuffle(items).map((l) => ask(l.story, pic(l.right), l.wrong.map(pic), l.hint));
}

// ---------- Word Meanings ----------

const OPPOSITES: [a: Pic, b: Pic][] = [
  [["hot", "🔥"], ["cold", "❄️"]],
  [["day", "☀️"], ["night", "🌙"]],
  [["happy", "😀"], ["sad", "😢"]],
  [["up", "⬆️"], ["down", "⬇️"]],
  [["big", "🐘"], ["small", "🐭"]],
  [["fast", "🐆"], ["slow", "🐢"]],
  [["wet", "💧"], ["dry", "🌵"]],
  [["awake", "👀"], ["asleep", "😴"]],
  [["loud", "📢"], ["quiet", "🤫"]],
  [["open", "📖"], ["closed", "📕"]],
];

function opposite(): Question {
  const [pair, ...others] = shuffle(OPPOSITES);
  const [a, b] = shuffle(pair);
  const wrong = pick(others.flat().filter((p) => p[0] !== a[0] && p[0] !== b[0]));
  return ask(`What is the opposite of “${a[0]}”?`, pic(b), [pic(wrong)], `Opposites are as different as can be. The opposite of ${a[0]} is ${b[0]}.`, { type: "emoji", emoji: a[1], caption: a[0] });
}

/** Word groups: one picture fits the question and the others don't. */
const GROUPS: { ask: string; fits: Pic[]; hint: string }[] = [
  { ask: "Which one can you eat?", fits: [["bread", "🍞"], ["cheese", "🧀"], ["pizza", "🍕"], ["sandwich", "🥪"]], hint: "Food is something you can eat." },
  { ask: "Which one is an animal?", fits: [["fox", "🦊"], ["owl", "🦉"], ["whale", "🐋"], ["bee", "🐝"]], hint: "Animals are alive. They move, eat and grow." },
  { ask: "Which one do you wear?", fits: [["shirt", "👕"], ["hat", "🧢"], ["shoe", "👟"], ["scarf", "🧣"]], hint: "Clothes are things you wear." },
  { ask: "Which one can you ride in?", fits: [["car", "🚗"], ["bus", "🚌"], ["boat", "⛵"], ["train", "🚂"]], hint: "Cars, buses and boats carry people." },
  { ask: "Which one do you play with?", fits: [["ball", "⚽"], ["teddy bear", "🧸"], ["blocks", "🧱"], ["kite", "🪁"]], hint: "Toys are for playing." },
  { ask: "Which one grows in a garden?", fits: [["tulip", "🌷"], ["rose", "🌹"], ["sunflower", "🌻"]], hint: "Plants grow in a garden." },
];

function inTheGroup(difficulty: Level): Question {
  const [group, ...others] = shuffle(GROUPS);
  const right = pick(group.fits);
  const wrong = others.slice(0, difficulty === 1 ? 1 : 2).map((g) => pick(g.fits));
  return ask(group.ask, pic(right), wrong.map(pic), group.hint);
}

/** What we use things for. */
const USES: { ask: string; right: Pic; wrong: Pic[] }[] = [
  { ask: "What do you use to brush your teeth?", right: ["toothbrush", "🪥"], wrong: [["fork", "🍴"], ["hammer", "🔨"], ["pencil", "✏️"]] },
  { ask: "What do you use to eat soup?", right: ["spoon", "🥄"], wrong: [["brush", "🖌️"], ["key", "🔑"], ["sock", "🧦"]] },
  { ask: "What do you use to cut paper?", right: ["scissors", "✂️"], wrong: [["spoon", "🥄"], ["sock", "🧦"], ["ball", "⚽"]] },
  { ask: "What do you use to open a door?", right: ["key", "🔑"], wrong: [["apple", "🍎"], ["pencil", "✏️"], ["hat", "🧢"]] },
  { ask: "What do you use to draw a picture?", right: ["crayon", "🖍️"], wrong: [["spoon", "🥄"], ["shoe", "👟"], ["bowl", "🥣"]] },
  { ask: "What do you use to stay dry in the rain?", right: ["umbrella", "☂️"], wrong: [["fork", "🍴"], ["sunglasses", "🕶️"], ["kite", "🪁"]] },
  { ask: "What do you sleep in?", right: ["bed", "🛏️"], wrong: [["bathtub", "🛁"], ["car", "🚗"], ["chair", "🪑"]] },
  { ask: "What do you use to wash your hands?", right: ["soap", "🧼"], wrong: [["sand", "🏖️"], ["glue", "🧴"], ["paint", "🎨"]] },
];

function whatForUse(difficulty: Level): Question {
  const u = pick(USES);
  return ask(u.ask, pic(u.right), sample(u.wrong, difficulty === 1 ? 1 : 2).map(pic), `Think about what you do with each one.`);
}

function wordMeanings(opts?: GenerateOptions): Question[] {
  const d = level(opts);
  return shuffle([opposite(), opposite(), opposite(), inTheGroup(d), inTheGroup(d), inTheGroup(d), whatForUse(d), whatForUse(d)]);
}

export const course: Course = {
  grade: "pk",
  subject: "language",
  bigIdeas: {
    "ca-bc": [
      "Children use multiple modes of expressive languages to communicate ideas, participate in relationships, and make meaning in their homes and communities.",
      "Children play with sounds and words, and notice letters and symbols in the world around them.",
      "Stories, songs and conversations with family and community build language and a love of books.",
    ],
  },
  units: [
    {
      id: "letter-names",
      title: "Letter Names",
      emoji: "🔤",
      blurb: "Find the letters",
      standards: { "ca-bc": "Communication and literacies: Vocabulary, symbols, and written language · knowing the names of capital letters" },
      parentNote: "Finding capital letters by name and matching a letter to the same letter. Letters many children know first (often from their own name) come first; look-alike letters such as E and F come at the stretch level.",
      generate: letterNames,
    },
    {
      id: "first-sounds",
      title: "First Sounds",
      emoji: "👂",
      blurb: "Which words start the same?",
      standards: { "ca-bc": "Communication and literacies: Sound and word play · hearing the first sound in a word" },
      parentNote: "Listening for the first sound in a word and finding pictures that start with the same sound, such as moon and mouse. This is listening only: no letters needed yet.",
      generate: firstSounds,
    },
    {
      id: "rhyme-time",
      title: "Rhyme Time",
      emoji: "🎵",
      blurb: "Words that sound alike",
      standards: { "ca-bc": "Communication and literacies: Sound and word play · hearing words that rhyme" },
      parentNote: "Hearing rhyming words (cat and hat, bee and tree) and telling whether two words rhyme.",
      generate: rhymeTime,
    },
    {
      id: "clap-the-parts",
      title: "Clap the Parts",
      emoji: "👏",
      blurb: "Clap each part of a word",
      standards: { "ca-bc": "Communication and literacies: Sound and word play · clapping the parts of spoken words" },
      parentNote: "Clapping the parts (syllables) of spoken words, from one clap (cat) to three (banana). Clapping along at home helps a lot.",
      generate: clapTheParts,
    },
    {
      id: "listen-to-a-story",
      title: "Listen to a Story",
      emoji: "📖",
      blurb: "Listen, then answer",
      standards: { "ca-bc": "Communication and literacies: Language and communication · listening to a short story and answering questions about it" },
      parentNote: "Listening to a very short story read aloud and answering who, what and where. The stretch level asks why something happened and what comes next.",
      generate: listenToAStory,
    },
    {
      id: "word-meanings",
      title: "Word Meanings",
      emoji: "💬",
      blurb: "Opposites and word groups",
      standards: { "ca-bc": "Communication and literacies: Language and communication · growing vocabulary through opposites, word groups and everyday objects" },
      parentNote: "Growing vocabulary: opposites (hot and cold), word groups (things to eat, things to wear) and what everyday objects are for.",
      generate: wordMeanings,
    },
  ],
};
