import { chance, pick, sample, shuffle, textChoice } from "../../random";
import type { Question, Course, GenerateOptions } from "../../types";
import { fromBank, type BankItem } from "../../bank";

// ---------- Rhyme Time ----------

const RHYMES: { word: string; emoji: string; rhymes: { word: string; emoji: string }[] }[] = [
  { word: "cat", emoji: "🐱", rhymes: [{ word: "hat", emoji: "🎩" }, { word: "bat", emoji: "🦇" }] },
  { word: "dog", emoji: "🐶", rhymes: [{ word: "frog", emoji: "🐸" }, { word: "log", emoji: "🪵" }] },
  { word: "bee", emoji: "🐝", rhymes: [{ word: "tree", emoji: "🌳" }, { word: "key", emoji: "🔑" }] },
  { word: "star", emoji: "⭐", rhymes: [{ word: "car", emoji: "🚗" }, { word: "jar", emoji: "🫙" }] },
  { word: "cake", emoji: "🎂", rhymes: [{ word: "snake", emoji: "🐍" }, { word: "lake", emoji: "🏞️" }] },
  { word: "moon", emoji: "🌙", rhymes: [{ word: "spoon", emoji: "🥄" }, { word: "balloon", emoji: "🎈" }] },
  { word: "fox", emoji: "🦊", rhymes: [{ word: "box", emoji: "📦" }, { word: "ox", emoji: "🐂" }] },
  { word: "goat", emoji: "🐐", rhymes: [{ word: "boat", emoji: "⛵" }, { word: "coat", emoji: "🧥" }] },
  { word: "mouse", emoji: "🐭", rhymes: [{ word: "house", emoji: "🏠" }] },
  { word: "bear", emoji: "🐻", rhymes: [{ word: "chair", emoji: "🪑" }, { word: "pear", emoji: "🍐" }] },
  { word: "fish", emoji: "🐟", rhymes: [{ word: "dish", emoji: "🍽️" }] },
  { word: "clock", emoji: "🕐", rhymes: [{ word: "sock", emoji: "🧦" }, { word: "rock", emoji: "🪨" }] },
  { word: "bed", emoji: "🛏️", rhymes: [{ word: "sled", emoji: "🛷" }, { word: "bread", emoji: "🍞" }] },
  { word: "hen", emoji: "🐔", rhymes: [{ word: "pen", emoji: "🖊️" }, { word: "ten", emoji: "🔟" }] },
  { word: "king", emoji: "🤴", rhymes: [{ word: "ring", emoji: "💍" }] },
  { word: "bug", emoji: "🐛", rhymes: [{ word: "mug", emoji: "☕" }] },
  { word: "tie", emoji: "👔", rhymes: [{ word: "pie", emoji: "🥧" }, { word: "fly", emoji: "🪰" }] },
  { word: "light", emoji: "💡", rhymes: [{ word: "kite", emoji: "🪁" }, { word: "night", emoji: "🌃" }] },
  { word: "train", emoji: "🚆", rhymes: [{ word: "rain", emoji: "🌧️" }, { word: "chain", emoji: "⛓️" }] },
  { word: "bone", emoji: "🦴", rhymes: [{ word: "phone", emoji: "📱" }] },
  { word: "duck", emoji: "🦆", rhymes: [{ word: "truck", emoji: "🚚" }] },
  { word: "nose", emoji: "👃", rhymes: [{ word: "rose", emoji: "🌹" }] },
  { word: "van", emoji: "🚐", rhymes: [{ word: "pan", emoji: "🍳" }] },
];

const FAMILIES: Record<string, string[]> = {
  at: ["cat", "hat", "mat", "sat", "bat"],
  ig: ["pig", "dig", "big", "wig"],
  op: ["hop", "top", "mop", "pop"],
  un: ["sun", "run", "fun", "bun"],
  ake: ["cake", "make", "lake", "bake"],
  ell: ["bell", "shell", "tell", "well"],
  ug: ["bug", "rug", "hug", "mug"],
  in: ["pin", "fin", "win", "tin"],
  ot: ["pot", "dot", "cot", "hot"],
  ap: ["cap", "map", "tap", "nap"],
};

function rhymes(): Question[] {
  const groups = sample(RHYMES, 5);
  const rhymeQs: Question[] = groups.map((g) => {
    const right = pick(g.rhymes);
    const others = sample(
      RHYMES.filter((o) => o !== g).flatMap((o) => [{ word: o.word, emoji: o.emoji }, ...o.rhymes]),
      2,
    );
    return textChoice(
      `Which word rhymes with “${g.word}”?`,
      { label: right.word, emoji: right.emoji },
      others.map((o) => ({ label: o.word, emoji: o.emoji })),
      `Rhyming words end with the same sound. Say them out loud: ${g.word}… ${right.word}!`,
      { type: "emoji", emoji: g.emoji, caption: g.word },
    );
  });

  const familyQs: Question[] = sample(Object.keys(FAMILIES), 3).map((fam) => {
    const otherWords = Object.entries(FAMILIES)
      .filter(([f]) => f !== fam)
      .flatMap(([, words]) => words);
    return textChoice(
      `Which word is in the “-${fam}” family?`,
      pick(FAMILIES[fam]),
      sample(otherWords, 2),
      `Words in the -${fam} family all end with “${fam}”, like ${FAMILIES[fam].slice(0, 2).join(" and ")}.`,
      { type: "equation", text: `-${fam}` },
    );
  });

  return shuffle([...rhymeQs, ...familyQs]);
}

// ---------- Sound Detectives ----------

const DIGRAPHS: Record<string, { word: string; emoji: string }[]> = {
  sh: [
    { word: "ship", emoji: "🚢" },
    { word: "shell", emoji: "🐚" },
    { word: "sheep", emoji: "🐑" },
    { word: "shoe", emoji: "👟" },
    { word: "shark", emoji: "🦈" },
    { word: "shirt", emoji: "👕" },
    { word: "shadow", emoji: "👤" },
  ],
  ch: [
    { word: "chair", emoji: "🪑" },
    { word: "cheese", emoji: "🧀" },
    { word: "chick", emoji: "🐤" },
    { word: "cherries", emoji: "🍒" },
    { word: "chocolate", emoji: "🍫" },
    { word: "chopsticks", emoji: "🥢" },
  ],
  th: [
    { word: "thumb", emoji: "👍" },
    { word: "three", emoji: "3️⃣" },
    { word: "thread", emoji: "🧵" },
    { word: "thunder", emoji: "⛈️" },
    { word: "thermometer", emoji: "🌡️" },
  ],
  wh: [
    { word: "whale", emoji: "🐳" },
    { word: "wheat", emoji: "🌾" },
    { word: "white", emoji: "🤍" },
    { word: "whisper", emoji: "🤫" },
  ],
};

const VOWEL_TEAMS: Record<string, { word: string; emoji: string }[]> = {
  ee: [
    { word: "tree", emoji: "🌳" },
    { word: "bee", emoji: "🐝" },
    { word: "feet", emoji: "🦶" },
    { word: "sheep", emoji: "🐑" },
    { word: "seed", emoji: "🌱" },
    { word: "queen", emoji: "👑" },
    { word: "teeth", emoji: "🦷" },
  ],
  ai: [
    { word: "rain", emoji: "🌧️" },
    { word: "snail", emoji: "🐌" },
    { word: "train", emoji: "🚆" },
    { word: "mail", emoji: "📬" },
    { word: "paint", emoji: "🎨" },
    { word: "tail", emoji: "🐕" },
    { word: "chain", emoji: "⛓️" },
  ],
  oa: [
    { word: "boat", emoji: "⛵" },
    { word: "goat", emoji: "🐐" },
    { word: "soap", emoji: "🧼" },
    { word: "road", emoji: "🛣️" },
    { word: "coat", emoji: "🧥" },
    { word: "toast", emoji: "🍞" },
    { word: "toad", emoji: "🐸" },
  ],
};

const SYLLABLES: { word: string; emoji: string; count: number }[] = [
  { word: "dog", emoji: "🐶", count: 1 },
  { word: "sun", emoji: "☀️", count: 1 },
  { word: "apple", emoji: "🍎", count: 2 },
  { word: "pencil", emoji: "✏️", count: 2 },
  { word: "rainbow", emoji: "🌈", count: 2 },
  { word: "banana", emoji: "🍌", count: 3 },
  { word: "butterfly", emoji: "🦋", count: 3 },
  { word: "elephant", emoji: "🐘", count: 3 },
  { word: "dinosaur", emoji: "🦕", count: 3 },
  { word: "watermelon", emoji: "🍉", count: 4 },
  { word: "caterpillar", emoji: "🐛", count: 4 },
  { word: "frog", emoji: "🐸", count: 1 },
  { word: "tree", emoji: "🌳", count: 1 },
  { word: "rabbit", emoji: "🐰", count: 2 },
  { word: "turtle", emoji: "🐢", count: 2 },
  { word: "monkey", emoji: "🐒", count: 2 },
  { word: "kangaroo", emoji: "🦘", count: 3 },
  { word: "octopus", emoji: "🐙", count: 3 },
  { word: "tomato", emoji: "🍅", count: 3 },
  { word: "helicopter", emoji: "🚁", count: 4 },
  { word: "alligator", emoji: "🐊", count: 4 },
];

function blankOut(word: string, part: string): string {
  const i = word.indexOf(part);
  return word.slice(0, i) + "_".repeat(part.length) + word.slice(i + part.length);
}

function sounds(): Question[] {
  const starts: Question[] = sample(Object.keys(DIGRAPHS), 3).map((dg) => {
    const right = pick(DIGRAPHS[dg]);
    const wrong = sample(
      Object.entries(DIGRAPHS)
        .filter(([d]) => d !== dg)
        .flatMap(([, ws]) => ws),
      2,
    );
    return textChoice(
      `Which word starts with the “${dg}” sound?`,
      { label: right.word, emoji: right.emoji },
      wrong.map((w) => ({ label: w.word, emoji: w.emoji })),
      `Say each word slowly. “${right.word}” starts with ${dg}.`,
    );
  });

  const teams: Question[] = sample(Object.keys(VOWEL_TEAMS), 3).map((team) => {
    const w = pick(VOWEL_TEAMS[team]);
    return textChoice(
      "Which letters are missing?",
      team,
      Object.keys(VOWEL_TEAMS).filter((t) => t !== team),
      `Say “${w.word}” slowly. The middle sound is spelled ${team}.`,
      { type: "emoji", emoji: w.emoji, caption: blankOut(w.word, team) },
    );
  });

  const claps: Question[] = sample(SYLLABLES, 2).map((s) =>
    textChoice(
      `Clap the word “${s.word}”. How many claps (syllables)?`,
      String(s.count),
      [1, 2, 3, 4].filter((n) => n !== s.count).slice(0, 2).map(String),
      `Clap as you say it: ${s.word}. Each clap is one syllable. That's ${s.count}.`,
      { type: "emoji", emoji: s.emoji, caption: s.word },
    ),
  );

  return shuffle([...starts, ...teams, ...claps]);
}

// ---------- Super Sentences ----------

const GOOD_SENTENCES = [
  "My cat likes to nap.",
  "We went to the park.",
  "The sun is hot today.",
  "I have a red kite.",
  "Can you see the moon?",
  "Look at that big whale!",
  "Ollie can swim fast.",
  "Do you like apples?",
  "Zoe feeds the ducks.",
  "What is your name?",
  "The baby is sleeping.",
  "I love my new boots!",
  "We can build a fort.",
  "Is it time for lunch?",
  "The frog hopped on a log.",
  "Kenji has a blue bike.",
  "Where did the ball go?",
  "We made a big snowman!",
  "The bird sang a song.",
  "Ravi reads every night.",
  "May I have some water?",
  "Our class planted beans.",
  "That was so much fun!",
  "Ana drew a purple cat.",
  "The bus stops at the corner.",
  "How tall is that tree?",
];

const END_MARKS: { text: string; mark: "." | "?" | "!" }[] = [
  { text: "Where is my hat", mark: "?" },
  { text: "Do you like pizza", mark: "?" },
  { text: "What time is it", mark: "?" },
  { text: "Can we play outside", mark: "?" },
  { text: "Watch out", mark: "!" },
  { text: "Hooray, it is snowing", mark: "!" },
  { text: "Ouch, that hurts", mark: "!" },
  { text: "I like apples", mark: "." },
  { text: "The bus is yellow", mark: "." },
  { text: "My dog is brown", mark: "." },
  { text: "We read a book at school", mark: "." },
  { text: "Who is at the door", mark: "?" },
  { text: "How old are you", mark: "?" },
  { text: "Are we there yet", mark: "?" },
  { text: "Wow, that rocket is fast", mark: "!" },
  { text: "Stop, the light is red", mark: "!" },
  { text: "Yay, we won the game", mark: "!" },
  { text: "Jay has two cats", mark: "." },
  { text: "The moon is bright tonight", mark: "." },
  { text: "Lena likes to paint", mark: "." },
  { text: "Where are my mittens", mark: "?" },
  { text: "Can I help you", mark: "?" },
  { text: "Why is the sky blue", mark: "?" },
  { text: "When does the movie start", mark: "?" },
  { text: "Hurry, the bus is leaving", mark: "!" },
  { text: "Wow, look at that rainbow", mark: "!" },
  { text: "Help, my kite is stuck", mark: "!" },
  { text: "Hooray, we found the puppy", mark: "!" },
  { text: "The cat sleeps on the mat", mark: "." },
  { text: "We eat lunch at noon", mark: "." },
  { text: "Priya has a red scarf", mark: "." },
  { text: "Leaves fall in autumn", mark: "." },
];

const NAMES = [
  "maya", "kelowna", "monday", "canada", "ollie", "vancouver", "sam", "friday", "amir", "toronto",
  "kenji", "tuesday", "july", "priya", "saturday", "lena", "october", "ravi", "january", "zoe",
];
const PLAIN_WORDS = ["park", "dog", "apple", "school", "happy", "river", "chair", "jump", "table", "garden", "bread", "funny"];

function sentences(): Question[] {
  const correct: Question[] = sample(GOOD_SENTENCES, 3).map((s) =>
    textChoice(
      "Which sentence is written the right way?",
      s,
      [s[0].toLowerCase() + s.slice(1), s.slice(0, -1)],
      "A sentence starts with a capital letter and ends with a . or ? or !",
    ),
  );

  const marks: Question[] = [
    pick(END_MARKS.filter((e) => e.mark === "?")),
    pick(END_MARKS.filter((e) => e.mark === "!")),
    pick(END_MARKS.filter((e) => e.mark === ".")),
  ].map((e) => ({
    kind: "choice",
    prompt: "Which mark goes at the end?",
    hint: {
      "?": "Is it asking something? Use a question mark ?",
      "!": "Does it show a big feeling? Use an exclamation mark !",
      ".": "Is it just telling something? Use a period .",
    }[e.mark],
    visual: { type: "equation", text: `${e.text} ☐` },
    answer: e.mark,
    choices: [
      { id: ".", label: "." },
      { id: "?", label: "?" },
      { id: "!", label: "!" },
    ],
  }));

  const caps: Question[] = sample(NAMES, 2).map((name) =>
    textChoice(
      "Which word should always start with a capital letter?",
      name,
      sample(PLAIN_WORDS, 2),
      `Names of people, places and days start with a capital letter. ${name[0].toUpperCase() + name.slice(1)}!`,
    ),
  );

  return shuffle([...correct, ...marks, ...caps]);
}

// ---------- Story Builders ----------

interface Story {
  lines: string[];
  character: { label: string; emoji: string };
  notCharacters: { label: string; emoji: string }[];
  setting: { label: string; emoji: string };
  notSettings: { label: string; emoji: string }[];
  think: { prompt: string; right: { label: string; emoji: string }; wrong: { label: string; emoji: string }[]; hint: string };
  events: string[];
}

const STORIES: Story[] = [
  {
    lines: [
      "Ollie the otter lost a shiny shell at the beach.",
      "Ollie looked under every rock.",
      "A little crab found the shell and gave it back.",
      "Ollie said thank you and shared a snack with the crab.",
    ],
    character: { label: "Ollie the otter", emoji: "🦦" },
    notCharacters: [
      { label: "a whale", emoji: "🐳" },
      { label: "a bear", emoji: "🐻" },
    ],
    setting: { label: "at the beach", emoji: "🏖️" },
    notSettings: [
      { label: "at school", emoji: "🏫" },
      { label: "in space", emoji: "🚀" },
    ],
    think: {
      prompt: "How did Ollie feel when the crab gave the shell back?",
      right: { label: "happy and thankful", emoji: "😊" },
      wrong: [
        { label: "angry", emoji: "😠" },
        { label: "sleepy", emoji: "😴" },
      ],
      hint: "Ollie said thank you and shared a snack. That's what we do when we feel thankful!",
    },
    events: ["Ollie lost a shell.", "Ollie looked under rocks.", "A crab found the shell.", "Ollie shared a snack."],
  },
  {
    lines: [
      "Maya planted a seed in a pot in her garden.",
      "She watered it every day.",
      "Soon a tiny green sprout poked up.",
      "In the summer, a big yellow sunflower bloomed.",
    ],
    character: { label: "Maya", emoji: "👧" },
    notCharacters: [
      { label: "a farmer", emoji: "🧑‍🌾" },
      { label: "a bee", emoji: "🐝" },
    ],
    setting: { label: "in a garden", emoji: "🪴" },
    notSettings: [
      { label: "on a boat", emoji: "⛵" },
      { label: "at the zoo", emoji: "🦁" },
    ],
    think: {
      prompt: "Why did the sunflower grow?",
      right: { label: "Maya watered it every day", emoji: "💧" },
      wrong: [
        { label: "Maya forgot about it", emoji: "🤷" },
        { label: "It was magic", emoji: "✨" },
      ],
      hint: "Look at the second sentence. What did Maya do every day?",
    },
    events: ["Maya planted a seed.", "She watered it.", "A sprout came up.", "A sunflower bloomed."],
  },
  {
    lines: [
      "It was a snowy day in the mountains.",
      "Jay put on a warm coat and boots.",
      "Jay built a snowman with a carrot nose.",
      "Then Jay drank hot cocoa by the fire.",
    ],
    character: { label: "Jay", emoji: "🧒" },
    notCharacters: [
      { label: "a snowplow driver", emoji: "🚜" },
      { label: "a penguin", emoji: "🐧" },
    ],
    setting: { label: "in the snowy mountains", emoji: "🏔️" },
    notSettings: [
      { label: "at a sunny beach", emoji: "🏖️" },
      { label: "in a desert", emoji: "🏜️" },
    ],
    think: {
      prompt: "Why did Jay put on a warm coat?",
      right: { label: "Because it was cold and snowy", emoji: "❄️" },
      wrong: [
        { label: "Because it was hot", emoji: "🔥" },
        { label: "Because it was bedtime", emoji: "🛏️" },
      ],
      hint: "The story starts on a snowy day. Snow is cold!",
    },
    events: ["It was a snowy day.", "Jay put on a coat.", "Jay built a snowman.", "Jay drank hot cocoa."],
  },
  {
    lines: [
      "Sam's class went to the aquarium.",
      "They watched the jellyfish glow.",
      "A sea lion splashed everyone!",
      "On the bus home, Sam drew a picture of the sea lion.",
    ],
    character: { label: "Sam", emoji: "🧑" },
    notCharacters: [
      { label: "a pilot", emoji: "🧑‍✈️" },
      { label: "a dragon", emoji: "🐉" },
    ],
    setting: { label: "at the aquarium", emoji: "🐠" },
    notSettings: [
      { label: "at a farm", emoji: "🐄" },
      { label: "at the library", emoji: "📚" },
    ],
    think: {
      prompt: "What do you think was Sam's favourite part?",
      right: { label: "The sea lion", emoji: "🦭" },
      wrong: [
        { label: "The bus seats", emoji: "🚌" },
        { label: "Doing homework", emoji: "📝" },
      ],
      hint: "Sam drew a picture of something on the way home. People often draw what they liked best!",
    },
    events: ["The class went to the aquarium.", "They saw jellyfish.", "A sea lion splashed them.", "Sam drew a picture."],
  },
  {
    lines: [
      "Priya and her dad went to the library on Saturday.",
      "Priya picked a book about frogs.",
      "She read it quietly in a cosy corner.",
      "Then she borrowed the book to take home.",
    ],
    character: { label: "Priya", emoji: "👧" },
    notCharacters: [
      { label: "a librarian", emoji: "🧑‍🏫" },
      { label: "a frog", emoji: "🐸" },
    ],
    setting: { label: "at the library", emoji: "📚" },
    notSettings: [
      { label: "at the park", emoji: "🌳" },
      { label: "on a farm", emoji: "🐄" },
    ],
    think: {
      prompt: "Why did Priya read quietly?",
      right: { label: "Because she was in a library", emoji: "🤫" },
      wrong: [
        { label: "Because she was angry", emoji: "😠" },
        { label: "Because the book was heavy", emoji: "📕" },
      ],
      hint: "Libraries are calm places where people read. We use quiet voices there.",
    },
    events: ["Priya went to the library.", "Priya picked a book.", "She read in a cosy corner.", "She borrowed the book."],
  },
  {
    lines: [
      "Leo's puppy Biscuit dug a hole in the yard.",
      "Leo found Biscuit covered in mud.",
      "Leo gave Biscuit a bath with soap and warm water.",
      "Soon Biscuit was clean and fluffy.",
    ],
    character: { label: "Leo", emoji: "🧒" },
    notCharacters: [
      { label: "a gardener", emoji: "🧑‍🌾" },
      { label: "a cat", emoji: "🐈" },
    ],
    setting: { label: "at Leo's home", emoji: "🏡" },
    notSettings: [
      { label: "on the moon", emoji: "🌙" },
      { label: "in a store", emoji: "🛒" },
    ],
    think: {
      prompt: "Why did Leo give Biscuit a bath?",
      right: { label: "Biscuit was covered in mud", emoji: "🐕" },
      wrong: [
        { label: "Biscuit wanted to swim", emoji: "🏊" },
        { label: "It was Biscuit's birthday", emoji: "🎂" },
      ],
      hint: "Look at the second sentence. What did Leo find?",
    },
    events: ["Biscuit dug a hole.", "Leo found Biscuit muddy.", "Leo gave Biscuit a bath.", "Biscuit was clean and fluffy."],
  },
  {
    lines: [
      "Amir and his sister made a lemonade stand.",
      "They squeezed lemons and added sugar and water.",
      "Neighbours stopped by to buy a cup.",
      "At the end, they counted their coins.",
    ],
    character: { label: "Amir", emoji: "🧒" },
    notCharacters: [
      { label: "a baker", emoji: "🧑‍🍳" },
      { label: "a lemon tree", emoji: "🍋" },
    ],
    setting: { label: "outside near their home", emoji: "🏘️" },
    notSettings: [
      { label: "under the sea", emoji: "🌊" },
      { label: "inside a castle", emoji: "🏰" },
    ],
    think: {
      prompt: "What did Amir and his sister do first?",
      right: { label: "They made lemonade", emoji: "🍋" },
      wrong: [
        { label: "They counted coins", emoji: "🪙" },
        { label: "They sold the cups", emoji: "🥤" },
      ],
      hint: "The story tells what happened in order. Find the first thing they did.",
    },
    events: ["They set up a stand.", "They made lemonade.", "Neighbours bought cups.", "They counted coins."],
  },
  {
    lines: [
      "Lena had a loose tooth.",
      "She wiggled it with her tongue all day.",
      "At dinner, the tooth came out in her apple!",
      "Lena put it under her pillow and smiled.",
    ],
    character: { label: "Lena", emoji: "👧" },
    notCharacters: [
      { label: "a dentist", emoji: "🦷" },
      { label: "a monkey", emoji: "🐒" },
    ],
    setting: { label: "at home", emoji: "🏡" },
    notSettings: [
      { label: "at a pool", emoji: "🏊" },
      { label: "in a forest", emoji: "🌲" },
    ],
    think: {
      prompt: "How did Lena feel at the end?",
      right: { label: "happy", emoji: "😊" },
      wrong: [
        { label: "scared", emoji: "😨" },
        { label: "bored", emoji: "😑" },
      ],
      hint: "The last sentence says Lena smiled.",
    },
    events: ["Lena had a loose tooth.", "She wiggled it.", "The tooth came out in an apple.", "She put it under her pillow."],
  },
  {
    lines: [
      "A little rabbit named Pip lived in a burrow.",
      "One night, Pip heard a loud noise outside.",
      "Pip peeked out and saw it was only the wind.",
      "Pip hopped back in and fell asleep.",
    ],
    character: { label: "Pip the rabbit", emoji: "🐇" },
    notCharacters: [
      { label: "the wind", emoji: "💨" },
      { label: "an owl", emoji: "🦉" },
    ],
    setting: { label: "in a burrow at night", emoji: "🌙" },
    notSettings: [
      { label: "at a busy mall", emoji: "🏬" },
      { label: "on a beach at noon", emoji: "🏖️" },
    ],
    think: {
      prompt: "What was the noise?",
      right: { label: "The wind", emoji: "💨" },
      wrong: [
        { label: "A monster", emoji: "👹" },
        { label: "A truck", emoji: "🚚" },
      ],
      hint: "Pip peeked out and saw what it was.",
    },
    events: ["Pip lived in a burrow.", "Pip heard a noise.", "Pip saw it was the wind.", "Pip fell asleep."],
  },
  {
    lines: [
      "Kenji's class had a pet fish named Bubbles.",
      "Every morning, Kenji sprinkled in some fish food.",
      "One day, Bubbles swam up to the top to say hello.",
      "Kenji felt proud to be a good helper.",
    ],
    character: { label: "Kenji", emoji: "🧒" },
    notCharacters: [
      { label: "a mermaid", emoji: "🧜" },
      { label: "a whale", emoji: "🐳" },
    ],
    setting: { label: "in a classroom", emoji: "🏫" },
    notSettings: [
      { label: "at a supermarket", emoji: "🛒" },
      { label: "on a mountain", emoji: "🏔️" },
    ],
    think: {
      prompt: "Why did Kenji feel proud?",
      right: { label: "He took good care of the fish", emoji: "🐠" },
      wrong: [
        { label: "He won a race", emoji: "🏁" },
        { label: "He ate the fish food", emoji: "🍽️" },
      ],
      hint: "Kenji fed Bubbles every morning. That is being a good helper.",
    },
    events: ["The class had a fish.", "Kenji fed the fish every morning.", "Bubbles swam up to say hello.", "Kenji felt proud."],
  },
  {
    lines: [
      "Noah and Zoe built a fort out of blankets.",
      "They put pillows inside to make it soft.",
      "Then it started to rain outside.",
      "The two friends read stories in their cosy fort.",
    ],
    character: { label: "Noah and Zoe", emoji: "🧒" },
    notCharacters: [
      { label: "a builder", emoji: "👷" },
      { label: "a raindrop", emoji: "💧" },
    ],
    setting: { label: "inside a blanket fort", emoji: "🏕️" },
    notSettings: [
      { label: "in a swimming pool", emoji: "🏊" },
      { label: "at a bus stop", emoji: "🚏" },
    ],
    think: {
      prompt: "Why did Noah and Zoe stay inside?",
      right: { label: "It was raining", emoji: "🌧️" },
      wrong: [
        { label: "It was sunny", emoji: "☀️" },
        { label: "They had no friends", emoji: "😢" },
      ],
      hint: "Read the third sentence to find what started outside.",
    },
    events: ["They built a fort.", "They added pillows.", "It started to rain.", "They read stories."],
  },
  {
    lines: [
      "Ana's grandmother taught her how to bake bread.",
      "They mixed flour, water and yeast.",
      "The dough rose in a warm bowl.",
      "Ana's whole family ate fresh bread for dinner.",
    ],
    character: { label: "Ana", emoji: "👧" },
    notCharacters: [
      { label: "a farmer", emoji: "🧑‍🌾" },
      { label: "a toaster", emoji: "🍞" },
    ],
    setting: { label: "in a kitchen", emoji: "🍳" },
    notSettings: [
      { label: "at a playground", emoji: "🛝" },
      { label: "on a boat", emoji: "⛵" },
    ],
    think: {
      prompt: "Who showed Ana how to bake?",
      right: { label: "Her grandmother", emoji: "👵" },
      wrong: [
        { label: "Her teacher", emoji: "🧑‍🏫" },
        { label: "A neighbour", emoji: "🧑" },
      ],
      hint: "The first sentence tells you who taught Ana.",
    },
    events: ["Ana learned to bake.", "They mixed the dough.", "The dough rose.", "The family ate the bread."],
  },
  {
    lines: [
      "Maya's team was playing soccer in the park.",
      "Maya kicked the ball, but it rolled into a puddle.",
      "Her teammate Ravi helped her dry the ball.",
      "They both laughed and kept on playing.",
    ],
    character: { label: "Maya", emoji: "👧" },
    notCharacters: [
      { label: "a referee", emoji: "🧑‍⚖️" },
      { label: "a goalpost", emoji: "🥅" },
    ],
    setting: { label: "at the park", emoji: "🌳" },
    notSettings: [
      { label: "at a restaurant", emoji: "🍽️" },
      { label: "in a museum", emoji: "🏛️" },
    ],
    think: {
      prompt: "How did Ravi show he was a good teammate?",
      right: { label: "He helped Maya dry the ball", emoji: "🤝" },
      wrong: [
        { label: "He took the ball home", emoji: "🏠" },
        { label: "He laughed at Maya in a mean way", emoji: "😝" },
      ],
      hint: "Look for what Ravi did to help.",
    },
    events: ["Maya's team played soccer.", "The ball rolled into a puddle.", "Ravi helped dry the ball.", "They kept playing."],
  },
  {
    lines: [
      "Sam found a feather on the trail.",
      "It was blue with a black stripe.",
      "Sam showed it to a park ranger.",
      "The ranger said it came from a Steller's jay.",
    ],
    character: { label: "Sam", emoji: "🧑" },
    notCharacters: [
      { label: "a jay", emoji: "🐦" },
      { label: "a tree", emoji: "🌲" },
    ],
    setting: { label: "on a trail", emoji: "🥾" },
    notSettings: [
      { label: "in a theatre", emoji: "🎭" },
      { label: "at a bakery", emoji: "🥐" },
    ],
    think: {
      prompt: "What did the ranger help Sam learn?",
      right: { label: "Which bird the feather came from", emoji: "🐦" },
      wrong: [
        { label: "How to bake a cake", emoji: "🎂" },
        { label: "How to count to ten", emoji: "🔢" },
      ],
      hint: "The last sentence tells what the ranger said.",
    },
    events: ["Sam found a feather.", "It was blue.", "Sam showed a ranger.", "The ranger named the bird."],
  },
  {
    lines: [
      "Jay was nervous about the school play.",
      "Jay practised the lines in front of the mirror.",
      "On the big night, Jay said every line clearly.",
      "Everyone clapped, and Jay took a big bow.",
    ],
    character: { label: "Jay", emoji: "🧒" },
    notCharacters: [
      { label: "the audience", emoji: "👏" },
      { label: "a mirror", emoji: "🪞" },
    ],
    setting: { label: "at school", emoji: "🏫" },
    notSettings: [
      { label: "at the beach", emoji: "🏖️" },
      { label: "at the zoo", emoji: "🦁" },
    ],
    think: {
      prompt: "What helped Jay do well in the play?",
      right: { label: "Practising the lines", emoji: "🪞" },
      wrong: [
        { label: "Skipping the practice", emoji: "🙅" },
        { label: "Staying home", emoji: "🏠" },
      ],
      hint: "Practice helps us get better. What did Jay do in front of the mirror?",
    },
    events: ["Jay felt nervous.", "Jay practised the lines.", "Jay said every line.", "Everyone clapped."],
  },
  {
    lines: [
      "A bear cub named Juniper woke up from a long winter sleep.",
      "Juniper was very hungry.",
      "Juniper found berries and fish near the river.",
      "Soon the little cub felt strong again.",
    ],
    character: { label: "Juniper the bear cub", emoji: "🐻" },
    notCharacters: [
      { label: "a fish", emoji: "🐟" },
      { label: "a hunter", emoji: "🧑" },
    ],
    setting: { label: "near a river in the forest", emoji: "🌲" },
    notSettings: [
      { label: "in a big city", emoji: "🏙️" },
      { label: "at an airport", emoji: "✈️" },
    ],
    think: {
      prompt: "Why did Juniper look for food?",
      right: { label: "Juniper was hungry", emoji: "🍓" },
      wrong: [
        { label: "Juniper was playing a game", emoji: "🎮" },
        { label: "Juniper wanted to go to school", emoji: "🏫" },
      ],
      hint: "The second sentence says how Juniper felt.",
    },
    events: ["Juniper woke up.", "Juniper felt hungry.", "Juniper found berries and fish.", "Juniper felt strong."],
  },
];

function storyQuestions(story: Story): Question[] {
  const visual = { type: "story" as const, lines: story.lines };
  return [
    textChoice(
      "Who is the main character in this story?",
      story.character,
      story.notCharacters,
      "The main character is who the story is mostly about.",
      visual,
    ),
    textChoice(
      "Where does this story happen? (the setting)",
      story.setting,
      story.notSettings,
      "The setting is where a story happens. Look for clues in the first sentence.",
      visual,
    ),
    textChoice(story.think.prompt, story.think.right, story.think.wrong, story.think.hint, visual),
    {
      kind: "order",
      prompt: "Tap what happened, from the beginning to the end.",
      hint: "Read the story again from the top. What happened first?",
      visual,
      items: story.events.map((e, i) => ({ id: `e${i}`, label: e })),
    },
  ];
}

function story(): Question[] {
  return sample(STORIES, 2).flatMap(storyQuestions);
}

// ---------- Word Power ----------

const COMPOUNDS = [
  { a: "rain", b: "bow", word: "rainbow", emoji: "🌈" },
  { a: "star", b: "fish", word: "starfish", emoji: "⭐" },
  { a: "cup", b: "cake", word: "cupcake", emoji: "🧁" },
  { a: "snow", b: "man", word: "snowman", emoji: "⛄" },
  { a: "butter", b: "fly", word: "butterfly", emoji: "🦋" },
  { a: "pop", b: "corn", word: "popcorn", emoji: "🍿" },
  { a: "sun", b: "flower", word: "sunflower", emoji: "🌻" },
  { a: "foot", b: "ball", word: "football", emoji: "🏈" },
  { a: "rain", b: "coat", word: "raincoat", emoji: "🧥" },
  { a: "tooth", b: "brush", word: "toothbrush", emoji: "🪥" },
  { a: "lady", b: "bug", word: "ladybug", emoji: "🐞" },
  { a: "pan", b: "cake", word: "pancake", emoji: "🥞" },
  { a: "air", b: "plane", word: "airplane", emoji: "✈️" },
  { a: "snow", b: "flake", word: "snowflake", emoji: "❄️" },
  { a: "basket", b: "ball", word: "basketball", emoji: "🏀" },
  { a: "water", b: "melon", word: "watermelon", emoji: "🍉" },
  { a: "back", b: "pack", word: "backpack", emoji: "🎒" },
  { a: "sail", b: "boat", word: "sailboat", emoji: "⛵" },
  { a: "blue", b: "berry", word: "blueberry", emoji: "🫐" },
  { a: "foot", b: "print", word: "footprint", emoji: "👣" },
];

const OPPOSITES: [string, string][] = [
  ["hot", "cold"],
  ["big", "small"],
  ["up", "down"],
  ["happy", "sad"],
  ["fast", "slow"],
  ["day", "night"],
  ["open", "closed"],
  ["full", "empty"],
  ["wet", "dry"],
  ["loud", "quiet"],
  ["early", "late"],
  ["push", "pull"],
  ["first", "last"],
  ["clean", "dirty"],
  ["thick", "thin"],
  ["win", "lose"],
];

const PLURALS = [
  { one: "cat", many: "cats", wrong: "cates", emoji: "🐱" },
  { one: "dog", many: "dogs", wrong: "doges", emoji: "🐶" },
  { one: "box", many: "boxes", wrong: "boxs", emoji: "📦" },
  { one: "fox", many: "foxes", wrong: "foxs", emoji: "🦊" },
  { one: "bus", many: "buses", wrong: "buss", emoji: "🚌" },
  { one: "dish", many: "dishes", wrong: "dishs", emoji: "🍽️" },
  { one: "frog", many: "frogs", wrong: "froges", emoji: "🐸" },
  { one: "duck", many: "ducks", wrong: "duckes", emoji: "🦆" },
  { one: "pig", many: "pigs", wrong: "piges", emoji: "🐷" },
  { one: "sock", many: "socks", wrong: "sockes", emoji: "🧦" },
  { one: "glass", many: "glasses", wrong: "glasss", emoji: "🥛" },
  { one: "peach", many: "peaches", wrong: "peachs", emoji: "🍑" },
  { one: "watch", many: "watches", wrong: "watchs", emoji: "⌚" },
  { one: "dress", many: "dresses", wrong: "dresss", emoji: "👗" },
];

function words(): Question[] {
  const compounds: Question[] = sample(COMPOUNDS, 3).map((c) =>
    textChoice(
      "Put the two words together. What new word do you make?",
      { label: c.word, emoji: c.emoji },
      sample(COMPOUNDS.filter((o) => o !== c), 2).map((o) => ({ label: o.word, emoji: o.emoji })),
      `A compound word is two words stuck together: ${c.a} + ${c.b} = ${c.word}.`,
      { type: "equation", text: `${c.a} + ${c.b}` },
    ),
  );

  const opposites: Question[] = sample(OPPOSITES, 3).map(([word, opp]) => {
    const [ask, answer] = chance(0.5) ? [word, opp] : [opp, word];
    return textChoice(
      `What is the opposite of “${ask}”?`,
      answer,
      sample(
        OPPOSITES.filter(([w]) => w !== word).flat(),
        2,
      ),
      `Opposites mean very different things, like ${ask} and ${answer}.`,
    );
  });

  const plurals: Question[] = sample(PLURALS, 2).map((p) =>
    textChoice(
      `One ${p.one}, two…`,
      p.many,
      [p.wrong, p.one],
      p.many.endsWith("es")
        ? `Words ending in s, x, sh or ch add -es: ${p.many}.`
        : `Most words just add -s: ${p.many}.`,
      { type: "emoji", emoji: `${p.emoji} ${p.emoji}` },
    ),
  );

  return shuffle([...compounds, ...opposites, ...plurals]);
}

// ---------- Book Explorers ----------

// Bank items marked `hard` are stretch questions: difficulty 1 uses only the easier
// items, 2 mixes in a few, 3 is mostly stretch.
type LevelItem = BankItem & { hard?: true };

function levelled(bank: LevelItem[], count: number, difficulty: 1 | 2 | 3): Question[] {
  const easy = bank.filter((b) => !b.hard);
  const hard = bank.filter((b) => b.hard);
  const want = difficulty === 1 ? 0 : difficulty === 2 ? Math.ceil(count / 3) : Math.ceil((count * 2) / 3);
  const nHard = Math.min(want, hard.length);
  return shuffle([...fromBank(easy, count - nHard), ...fromBank(hard, nHard)]);
}

const BOOK_BANK: LevelItem[] = [
  {
    prompt: "Who writes the words in a book?",
    right: { label: "the author", emoji: "✍️" },
    wrong: [
      { label: "the illustrator", emoji: "🎨" },
      { label: "the reader", emoji: "📖" },
    ],
    hint: "The author is the person who writes the words.",
  },
  {
    prompt: "Who draws the pictures in a book?",
    right: { label: "the illustrator", emoji: "🎨" },
    wrong: [
      { label: "the author", emoji: "✍️" },
      { label: "the librarian", emoji: "📚" },
    ],
    hint: "An illustrator makes the pictures, or illustrations.",
  },
  {
    prompt: "The name of a book is called its…",
    right: "title",
    wrong: ["page", "chapter"],
    hint: "The title is the name of the book. You find it on the cover.",
    emoji: "📕",
  },
  {
    prompt: "Where do you usually find the title and the author's name?",
    right: { label: "on the front cover", emoji: "📘" },
    wrong: [
      { label: "on the last page only", emoji: "📄" },
      { label: "inside a picture of a tree", emoji: "🌳" },
    ],
    hint: "Look at the front cover first. It shows the title and who wrote the book.",
  },
  {
    prompt: "A long book can be split into parts. Each part is called a…",
    right: "chapter",
    wrong: ["caption", "label"],
    hint: "Chapter books are split into chapters, and each one has its own number or title.",
    emoji: "📚",
  },
  {
    prompt: "Which part of a book lists the chapters and their page numbers?",
    right: "the table of contents",
    wrong: ["the front cover", "a caption"],
    hint: "The table of contents is near the front. It helps you find each chapter.",
    emoji: "📑",
  },
  {
    prompt: "The words under a photo that tell about it are called a…",
    right: "caption",
    wrong: ["title", "chapter"],
    hint: "A caption is a short sentence that explains a picture or photo.",
    emoji: "🖼️",
  },
  {
    prompt: "A drawing with labels that shows the parts of something is a…",
    right: "diagram",
    wrong: ["story", "poem"],
    hint: "A diagram uses a picture and labels, like one that shows the parts of a plant.",
    emoji: "🌱",
  },
  {
    prompt: "In a diagram of a bird, the words “beak” and “wing” are…",
    right: "labels",
    wrong: ["chapters", "titles"],
    hint: "Labels name the parts of a picture. A line often points to each part.",
    emoji: "🐦",
  },
  {
    prompt: "A big word at the top of a section that tells what it is about is a…",
    right: "heading",
    wrong: ["caption", "page number"],
    hint: "Headings are like little titles. They tell you what each part is about.",
    emoji: "🔠",
  },
  {
    prompt: "Why do some books print a word in bold, dark letters?",
    right: "to show it is an important word",
    wrong: ["because the printer made a mistake", "to show the word is not needed"],
    hint: "Bold words stand out. They are often important words you should notice.",
  },
  {
    prompt: "You see a page number at the bottom of a page. What does it help you do?",
    right: "find your place in the book",
    wrong: ["know who drew the pictures", "know how the story ends"],
    hint: "Page numbers help you find a page and keep your place.",
    emoji: "📄",
  },
  {
    prompt: "Pictures in a book can help you…",
    right: { label: "understand and guess what is happening", emoji: "🔍" },
    wrong: [
      { label: "skip all the words", emoji: "⏩" },
      { label: "find the author's phone number", emoji: "📞" },
    ],
    hint: "Looking at pictures is a good reading strategy. They give clues about the words.",
  },
  {
    prompt: "A book with true facts about real animals is…",
    right: "non-fiction",
    wrong: ["a fairy tale", "a made-up story"],
    hint: "Non-fiction books tell true facts about real things.",
    emoji: "🐻",
  },
  {
    prompt: "A story about a dragon who bakes cakes is…",
    right: "fiction",
    wrong: ["non-fiction", "a recipe"],
    hint: "Fiction is made up by the author. Dragons who bake are pretend!",
    emoji: "🐉",
  },
  {
    prompt: "Which text tells you how to make something, step by step?",
    right: { label: "a recipe", emoji: "🧁" },
    wrong: [
      { label: "a birthday card", emoji: "💌" },
      { label: "a poem", emoji: "🎵" },
    ],
    hint: "A recipe lists what you need and the steps to follow.",
  },
  {
    prompt: "Which text helps you find your way to a place?",
    right: { label: "a map", emoji: "🗺️" },
    wrong: [
      { label: "a joke book", emoji: "😂" },
      { label: "a shopping list", emoji: "📝" },
    ],
    hint: "A map shows where places are and how to get there.",
  },
  {
    prompt: "Which text helps you remember what to buy at the store?",
    right: { label: "a list", emoji: "📝" },
    wrong: [
      { label: "a fairy tale", emoji: "🧚" },
      { label: "a map of the ocean", emoji: "🌊" },
    ],
    hint: "A list is a quick way to write down things to remember.",
  },
  {
    prompt: "Which text would you send to tell your grandma about your week?",
    right: { label: "a letter", emoji: "✉️" },
    wrong: [
      { label: "a recipe", emoji: "🍲" },
      { label: "a table of contents", emoji: "📑" },
    ],
    hint: "A letter is written to a person. It starts with “Dear”.",
  },
  {
    prompt: "A letter often starts with which word?",
    right: "Dear",
    wrong: ["Chapter", "Ingredients"],
    hint: "Letters start with a greeting, like “Dear Grandma,”.",
    emoji: "✉️",
  },
  {
    prompt: "Why do people read a recipe?",
    right: "to learn how to cook something",
    wrong: ["to hear a bedtime story", "to find a street"],
    hint: "Different texts have different jobs. A recipe teaches you how to cook.",
    emoji: "🍳",
  },
  {
    prompt: "Why do people read a funny story?",
    right: "to enjoy it and laugh",
    wrong: ["to find a street", "to learn the steps to bake bread"],
    hint: "Some texts are for fun. Stories can make us laugh and wonder.",
    emoji: "😂",
  },
  {
    prompt: "A poster for a school fun fair is mostly meant to…",
    right: "tell people about the event",
    wrong: ["teach them how to bake bread", "tell a long fairy tale"],
    hint: "Posters share information quickly with big words and pictures.",
    emoji: "🎪",
  },
  {
    prompt: "What does an illustration mean?",
    right: "a picture in a book",
    wrong: ["the last word in a book", "the name of the author"],
    hint: "Illustrations are pictures that go with the words.",
    emoji: "🖍️",
  },
  {
    prompt: "In a list of steps, why are there numbers 1, 2, 3?",
    right: "to show the order of the steps",
    wrong: ["to count the pictures", "to show the page is old"],
    hint: "Numbered steps tell you what to do first, next and last.",
    emoji: "🔢",
    hard: true,
  },
  {
    prompt: "You want to find facts about owls on a website. Where do you type “owls”?",
    right: { label: "in the search box", emoji: "🔍" },
    wrong: [
      { label: "in the page number", emoji: "📄" },
      { label: "on the front cover", emoji: "📘" },
    ],
    hint: "A search box on a website helps you find what you are looking for.",
    hard: true,
  },
  {
    prompt: "A book about frogs has the heading “What Frogs Eat”. What will that part tell?",
    right: "what frogs eat",
    wrong: ["where the author lives", "how to build a boat"],
    hint: "A heading tells you what the next part is about.",
    emoji: "🐸",
    hard: true,
  },
  {
    prompt: "A photo shows a tall tree. The caption says “A cedar can grow very tall.” What does the caption do?",
    right: "it tells about the photo",
    wrong: ["it tells the end of a story", "it lists the chapters"],
    hint: "Captions explain what you see in a picture.",
    emoji: "🌲",
    hard: true,
  },
  {
    prompt: "You want the chapter about whales. What is the fastest way to find it?",
    right: "look in the table of contents",
    wrong: ["read every page from the start", "look at the back cover only"],
    hint: "The table of contents tells you which page each chapter starts on.",
    emoji: "🐳",
    hard: true,
  },
  {
    prompt: "Which one is a non-fiction book?",
    right: { label: "All About Bees", emoji: "🐝" },
    wrong: [
      { label: "The Bee Who Flew to the Moon", emoji: "🌙" },
      { label: "Princess Bee and the Magic Hive", emoji: "👑" },
    ],
    hint: "Non-fiction books give true facts. Bees can't fly to the moon!",
    hard: true,
  },
  {
    prompt: "Which title sounds like a made-up story (fiction)?",
    right: { label: "The Talking Teapot", emoji: "🫖" },
    wrong: [
      { label: "How Rain Forms", emoji: "🌧️" },
      { label: "Facts About Deer", emoji: "🦌" },
    ],
    hint: "Teapots can't really talk, so the author made it up.",
    hard: true,
  },
  {
    prompt: "Some words in a story are in quotation marks “like this”. They show…",
    right: "what a character says",
    wrong: ["the title of the book", "a page number"],
    hint: "Quotation marks show the words someone says out loud. That's dialogue.",
    emoji: "💬",
    hard: true,
  },
  {
    prompt: "Where in a story do you meet the characters and the setting?",
    right: "the beginning",
    wrong: ["the very last word", "the back cover"],
    hint: "Stories have a beginning, a middle and an end. The beginning introduces who and where.",
    emoji: "📖",
    hard: true,
  },
  {
    prompt: "In which part of a story is the problem usually solved?",
    right: "the end",
    wrong: ["the title", "the table of contents"],
    hint: "A story's problem gets solved near the end.",
    emoji: "🏁",
    hard: true,
  },
  {
    prompt: "A list says: milk, eggs, bread. Why is it written this way?",
    right: "it is quick to read and remember",
    wrong: ["it tells a long story", "it explains how to bake bread"],
    hint: "Lists are short on purpose. Each line is one thing.",
    emoji: "📝",
    hard: true,
  },
  {
    prompt: "A recipe has a part called “What you need”. What will it list?",
    right: "the things to cook with",
    wrong: ["the characters", "the chapters"],
    hint: "Recipes list what you need first, then the steps.",
    emoji: "🥣",
    hard: true,
  },
  {
    prompt: "Before reading, you look at the cover and pictures to guess what will happen. That is…",
    right: "making a prediction",
    wrong: ["writing a list", "skipping the book"],
    hint: "Good readers make predictions, then read to check them.",
    emoji: "🔮",
    hard: true,
  },
  {
    prompt: "A word doesn't make sense when you read it. What can you do?",
    right: "reread the sentence and check",
    wrong: ["close the book forever", "skip every word after it"],
    hint: "Ask: Does it look right? Sound right? Make sense? Then try again.",
    emoji: "🔁",
    hard: true,
  },
];

function bookExplorers({ difficulty = 2 }: GenerateOptions = {}): Question[] {
  return levelled(BOOK_BANK, 8, difficulty);
}

// ---------- Joining Sentences ----------

/** Two short sentences joined with a comma and a joining word. */
const JOINS: { first: string; second: string; join: "and" | "but" | "so" | "or"; wrong: string[] }[] = [
  { first: "I was hungry", second: "I ate an apple", join: "so", wrong: ["but", "or"] },
  { first: "It was raining", second: "we played inside", join: "so", wrong: ["but", "or"] },
  { first: "The dog was muddy", second: "we gave it a bath", join: "so", wrong: ["but", "or"] },
  { first: "Maya was tired", second: "she went to bed early", join: "so", wrong: ["but", "or"] },
  { first: "The room was dark", second: "Leo turned on the light", join: "so", wrong: ["but", "or"] },
  { first: "It was cold outside", second: "Ravi put on his mittens", join: "so", wrong: ["but", "or"] },
  { first: "The plant was dry", second: "Ana watered it", join: "so", wrong: ["but", "or"] },
  { first: "Sam was thirsty", second: "he drank some water", join: "so", wrong: ["but", "or"] },
  { first: "I wanted to swim", second: "the pool was closed", join: "but", wrong: ["so", "or"] },
  { first: "Zoe looked for her hat", second: "she could not find it", join: "but", wrong: ["so", "or"] },
  { first: "The hill was steep", second: "Kenji rode his bike to the top", join: "but", wrong: ["so", "or"] },
  { first: "The soup smelled good", second: "it was too hot to eat", join: "but", wrong: ["so", "or"] },
  { first: "We planted seeds", second: "nothing grew yet", join: "but", wrong: ["so", "or"] },
  { first: "Priya likes cats", second: "she is allergic to them", join: "but", wrong: ["so", "or"] },
  { first: "The water was cold", second: "we jumped in anyway", join: "but", wrong: ["so", "or"] },
  { first: "Noah has a dog", second: "Lena has a cat", join: "and", wrong: ["or", "because"] },
  { first: "We sang a song", second: "then we danced", join: "and", wrong: ["or", "because"] },
  { first: "Amir drew a boat", second: "Zoe drew a whale", join: "and", wrong: ["or", "because"] },
  { first: "The sun came out", second: "the birds began to sing", join: "and", wrong: ["or", "because"] },
  { first: "I fed the fish", second: "my sister fed the cat", join: "and", wrong: ["or", "because"] },
  { first: "Maya read a book", second: "Jay built a fort", join: "and", wrong: ["or", "because"] },
  { first: "Do you want milk", second: "do you want juice", join: "or", wrong: ["so", "because"] },
  { first: "We can walk to the park", second: "we can ride our bikes", join: "or", wrong: ["so", "because"] },
  { first: "Should we paint", second: "should we play with clay", join: "or", wrong: ["so", "because"] },
  { first: "You can have a pear", second: "you can have a plum", join: "or", wrong: ["so", "because"] },
  { first: "Is the cat inside", second: "is it in the yard", join: "or", wrong: ["so", "because"] },
];

const JOIN_HINTS: Record<string, string> = {
  so: "Use so when the second part happens because of the first part.",
  but: "Use but when the second part is a surprise or a change.",
  and: "Use and to add one more idea that goes with the first.",
  or: "Use or when there is a choice.",
};

const COMPOUND_BANK: LevelItem[] = [
  {
    prompt: "Which one is a compound sentence (two ideas joined together)?",
    right: "The sun came out, and we went to the park.",
    wrong: ["We went to the park.", "The sunny park."],
    hint: "A compound sentence joins two complete ideas with a word like and, but or so.",
  },
  {
    prompt: "Which one is a compound sentence?",
    right: "Jay likes soccer, but Ana likes hockey.",
    wrong: ["Jay likes soccer.", "Soccer and hockey."],
    hint: "Look for two ideas, each with its own who and what happened, joined by a word.",
  },
  {
    prompt: "Which one is a compound sentence?",
    right: "The bell rang, so we lined up.",
    wrong: ["The bell rang.", "The loud bell."],
    hint: "Two complete ideas joined by so make a compound sentence.",
  },
  {
    prompt: "Which one is a compound sentence?",
    right: "We can draw, or we can read.",
    wrong: ["We can draw.", "Drawing or reading."],
    hint: "A compound sentence has two parts that could each be a sentence on its own.",
  },
  {
    prompt: "Which word is the joining word? “I ran fast, but I lost the race.”",
    right: "but",
    wrong: ["ran", "race"],
    hint: "Joining words like and, but, or and so connect two ideas.",
    hard: true,
  },
  {
    prompt: "Which word is the joining word? “It was late, so we went home.”",
    right: "so",
    wrong: ["late", "home"],
    hint: "Find the small word that links the two ideas.",
    hard: true,
  },
  {
    prompt: "What goes before the joining word in a compound sentence?",
    right: "a comma ,",
    wrong: ["a question mark ?", "nothing ever"],
    hint: "Put a comma before and, but, or and so when they join two sentences.",
    hard: true,
  },
  {
    prompt: "Join the sentences: “The cat is black.” “The dog is white.” Which is right?",
    right: "The cat is black, and the dog is white.",
    wrong: ["The cat is black and. The dog is white", "the cat is black, and the dog is white"],
    hint: "Use one capital at the start, a comma before and, and one period at the end.",
    hard: true,
  },
];

function joinQuestion(j: (typeof JOINS)[number]): Question {
  return textChoice(
    "Which word best joins the two ideas?",
    j.join,
    j.wrong,
    JOIN_HINTS[j.join],
    { type: "equation", text: `${j.first}, ☐ ${j.second}${j.join === "or" ? "?" : "."}` },
  );
}

function joiningSentences({ difficulty = 2 }: GenerateOptions = {}): Question[] {
  const bankCount = difficulty === 1 ? 2 : 3;
  return shuffle([...sample(JOINS, 8 - bankCount).map(joinQuestion), ...levelled(COMPOUND_BANK, bankCount, difficulty)]);
}

export const course: Course = {
  grade: "2",
  subject: "language",
  bigIdeas: {
    "ca-bc": [
    "Language and story can be a source of creativity and joy.",
    "Stories and other texts help us learn about ourselves and our families.",
    "Stories and other texts can be shared through pictures and words.",
    "Everyone has a unique story to share.",
    "Through listening and speaking, we connect with others and share our world.",
    "Playing with language helps us discover how language works.",
    "Curiosity and wonder lead us to new discoveries about ourselves and the world around us.",
    ],
  },
  units: [
    {
      id: "rhyme-time",
      title: "Rhyme Time",
      emoji: "🎵",
      blurb: "Words that sound alike",
      standards: { "ca-bc": "Language features: word patterns and word families; phonological awareness" },
      parentNote: "Hearing rhymes and spotting word families (-at, -ig, -op). Both help with reading and spelling new words.",
      generate: rhymes,
    },
    {
      id: "sound-detectives",
      title: "Sound Detectives",
      emoji: "🔍",
      blurb: "sh, ch, ee, ai and more",
      standards: { "ca-bc": "Phoneme manipulation and sound-symbol correspondence; reading strategies" },
      parentNote: "Letter teams that make one sound (sh, ch, th, wh, ee, ai, oa) and clapping syllables.",
      generate: sounds,
    },
    {
      id: "super-sentences",
      title: "Super Sentences",
      emoji: "✏️",
      blurb: "Capitals and end marks",
      standards: { "ca-bc": "Language features, structures and conventions: capital letters and end punctuation" },
      parentNote: "Starting sentences and names with capitals, and choosing a period, question mark or exclamation mark.",
      generate: sentences,
    },
    {
      id: "story-builders",
      title: "Story Builders",
      emoji: "📖",
      blurb: "Characters, settings and order",
      standards: { "ca-bc": "Story/text: elements of story (character, setting, sequence); comprehension strategies" },
      parentNote: "Reading short stories, then naming the character and setting, explaining why things happened, and retelling events in order.",
      generate: story,
    },
    {
      id: "word-power",
      title: "Word Power",
      emoji: "💪",
      blurb: "Compound words and opposites",
      standards: { "ca-bc": "Language features: word patterns, vocabulary and plurals" },
      parentNote: "Building compound words, finding opposites and spelling plurals (-s and -es).",
      generate: words,
    },
    {
      id: "book-explorers",
      title: "Book Explorers",
      emoji: "📚",
      blurb: "Titles, captions and kinds of texts",
      standards: { "ca-bc": "Story/text: text features and vocabulary associated with texts; how different text structures reflect different purposes" },
      parentNote:
        "Book words (author, illustrator, title, chapter, table of contents, caption, heading, diagram), fiction and non-fiction, and what letters, recipes, maps and lists are for.",
      generate: bookExplorers,
    },
    {
      id: "joining-sentences",
      title: "Joining Sentences",
      emoji: "🔗",
      blurb: "Join ideas with and, but, so, or",
      standards: { "ca-bc": "Language features, structures and conventions: sentence structure (compound sentences)" },
      parentNote: "Joining two short sentences into one compound sentence with and, but, so or or, and putting a comma before the joining word.",
      generate: joiningSentences,
    },
  ],
};
