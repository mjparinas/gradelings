import type { Unit } from "../../types";
import { pic, readingUnit, row, story, type R } from "./language-kit";

// California's own Kindergarten English language arts units: questions about short stories and fact texts that are
// read aloud (CA CCSS RL.K and RI.K), and first word and sentence conventions (L.K.1, L.K.2, L.K.6). Prompts stay at
// most 80 characters with three choices. Every story and fact text is original.

const KITE = story("Sam has a red kite.", "The wind takes it up high.", "Sam runs and laughs.");
const DUCK = story("A little duck is lost.", "She quacks and quacks.", "Her mom swims to her.");
const SEED = story("Lena plants a seed.", "She gives it water.", "Up comes a tiny sprout!");
const GRUMPY = story("The cat is grumpy today.", "It will not play.", "It just wants a nap.");
const BIG_DOG = story("Jay's dog is enormous.", "He is even bigger than Jay!");
const SNOW_DAY = story("Ana puts on her boots.", "She makes a snowman.", "Then she drinks warm cocoa.");
const RACE = story("Rabbit ran very fast.", "Turtle went slow and steady.", "They both got to the pond.");
const BEACH = story("Mia went to the beach.", "Ben went to the snowy hill.", "Both had a fun day.");
const HOUSES = story("Pig made a house of straw.", "Goat made a house of sticks.", "The wind blew both away!");

const STORY_QUESTIONS: R[] = [
  [KITE, "What color is Sam's kite?", "red", ["blue", "green"], "Look at the first line. It tells the color."],
  [KITE, "What takes the kite up high?", "the wind", ["a bird", "a tree"], "Listen again: the wind takes it up."],
  [KITE, "How does Sam feel?", "happy", ["sad", "sleepy"], "Sam laughs. We laugh when we feel happy."],
  [DUCK, "Who is lost?", "a little duck", ["a big frog", "a fish"], "The first line tells who is lost."],
  [DUCK, "Who swims to the little duck?", "her mom", ["a frog", "a boat"], "Look at the last line."],
  [DUCK, "What does the duck do when she is lost?", "She quacks.", ["She sleeps.", "She flies away."], "She quacks and quacks!"],
  [SEED, "What does Lena give the seed?", "water", ["a hat", "a toy"], "Lena helps the seed grow with a drink."],
  [SEED, "A “sprout” comes up. What is a sprout?", "a tiny new plant", ["a little bug", "a rain cloud"], "It comes up from the seed Lena planted."],
  [GRUMPY, "The cat is “grumpy.” What does grumpy mean?", "in a bad mood", ["very fast", "very wet"], "The cat will not play. It just wants a nap."],
  [BIG_DOG, "The dog is “enormous.” What does enormous mean?", "very big", ["very small", "very fast"], "He is even bigger than Jay!"],
  [SNOW_DAY, "What does Ana make?", "a snowman", ["a sandcastle", "a cake"], "Listen to the middle line."],
  [SNOW_DAY, "What does Ana do last?", "drinks warm cocoa", ["puts on boots", "makes a snowman"], "Look at the last line: “Then…”"],
  [story("Roses are red,", "the sky is blue.", "I like to read", "a book with you!"), "What kind of text is this?", "a poem", ["a fact book", "a list"], "It has short lines, and some words rhyme."],
  [story("Once upon a time,", "a bear lost his hat.", "He looked all over the woods."), "What kind of text is this?", "a storybook", ["a poem", "a fact book"], "“Once upon a time” starts many stories."],
  [pic("🐉"), "A dragon who bakes cakes. What kind of story is it?", "make-believe", ["true", "a recipe"], "Dragons are not real, so it is make-believe."],
  [pic("🚌"), "A girl rides the bus to school. What kind of story is it?", "could really happen", ["make-believe", "a poem"], "Kids really do ride buses to school."],
  [pic("✍️"), "Who writes the words in a book?", "the author", ["the illustrator", "the reader"], "The author is the writer."],
  [pic("🎨"), "Who draws the pictures in a book?", "the illustrator", ["the author", "the reader"], "Illustrations are pictures, so the illustrator draws them."],
  [pic("📕", "by Ana Ruiz"), "The cover says “by Ana Ruiz.” Who is Ana Ruiz?", "the author", ["the main character", "the reader"], "The name after “by” is the writer."],
  [pic("📗", "pictures by Leo Chen"), "What did Leo Chen do?", "drew the pictures", ["wrote the words", "read the book"], "The cover says “pictures by.”"],
  [RACE, "How are Rabbit and Turtle different?", "One is fast, one is slow.", ["Both are fast.", "Both are slow."], "Rabbit ran fast. Turtle went slow."],
  [RACE, "How are Rabbit and Turtle the same?", "Both got to the pond.", ["Both ran fast.", "Both got lost."], "Look at the last line: “They both…”"],
  [BEACH, "How are Mia's and Ben's days different?", "They went to different places.", ["They went to the same place.", "They both stayed home."], "Mia went to the beach. Ben went to a snowy hill."],
  [BEACH, "How are Mia's and Ben's days the same?", "Both had fun.", ["Both went to the beach.", "Both were sad."], "The last line tells how both days went."],
  [HOUSES, "What happened to both houses?", "The wind blew them away.", ["They grew bigger.", "They turned blue."], "Look at the last line.", true],
  [HOUSES, "How are the two houses different?", "One is straw, one is sticks.", ["Both are straw.", "Both are bricks."], "Pig used straw. Goat used sticks.", true],
  [GRUMPY, "Why does the cat not play?", "It wants a nap.", ["It is hungry.", "It is lost."], "The last line tells why.", true],
  [pic("📖"), "How does an illustrator help tell a story?", "by drawing the pictures", ["by writing the words", "by reading it aloud"], "Pictures help show what happens.", true],
];

const BEES = story("Bees live in a hive.", "Bees make honey.", "Bees help flowers grow.");
const FROGS = story("Frogs start as eggs.", "The eggs hatch into tadpoles.", "Tadpoles grow into frogs.");
const SNOW = story("Snow is cold.", "Snow is made of tiny bits of ice.", "Snow melts in the sun.");
const OWLS = story("Owls hunt at night.", "They are nocturnal.", "That means they are awake at night.");
const HELMET = story("Wear a helmet when you ride a bike.", "A helmet keeps your head safe.");
const FRUIT = story("Eat fruit every day.", "Fruit is good for your body.", "It helps you grow strong.");
const HANDS = story("Wash your hands before you eat.", "Soap gets the germs off.");
const RAIN = story("It rained all night.", "In the morning, there were puddles.");
const DOG_BOOKS = story("Book 1: Dogs can run fast.", "Book 2: Dogs can run fast and swim.");
const CAT_BOOKS = story("Book 1: Cats like to nap.", "Book 2: Cats like to nap in the sun.");
const WHALE = story("Whales live in the sea.", "Whales are very big.", "Whales breathe air.");

const FACT_QUESTIONS: R[] = [
  [BEES, "Where do bees live?", "in a hive", ["in the sea", "in a cave"], "The first line tells where."],
  [BEES, "What do bees make?", "honey", ["milk", "bread"], "Look at the middle line."],
  [BEES, "What is this text mostly about?", "bees", ["cats", "rain"], "Every line tells about the same animal."],
  [FROGS, "What do frogs start as?", "eggs", ["fish", "birds"], "The first line tells how frogs start."],
  [FROGS, "What comes after the eggs?", "tadpoles", ["frogs", "seeds"], "The eggs hatch into…"],
  [FROGS, "What is this text mostly about?", "how frogs grow", ["how bees fly", "how to swim"], "It tells how a frog changes."],
  [SNOW, "What happens to snow in the sun?", "It melts.", ["It grows.", "It sings."], "Look at the last line."],
  [SNOW, "What is snow made of?", "tiny bits of ice", ["sand", "sugar"], "The middle line tells."],
  [OWLS, "The text says owls are “nocturnal.” What does it mean?", "awake at night", ["very loud", "very small"], "The last line tells what it means."],
  [OWLS, "When do owls hunt?", "at night", ["at lunch", "in the morning"], "The first line tells when."],
  [HELMET, "Why does the author say to wear a helmet?", "It keeps your head safe.", ["It is red.", "It is fun to hold."], "The author gives a reason in the second line."],
  [FRUIT, "What reason does the author give to eat fruit?", "It helps you grow strong.", ["It is round.", "It is in a bag."], "Find the line that tells why."],
  [HANDS, "Why should you wash your hands?", "Soap gets the germs off.", ["Hands like water.", "It is bedtime."], "The second line tells why."],
  [RAIN, "Why were there puddles?", "It rained all night.", ["It was sunny.", "A dog was thirsty."], "What happened first made the puddles."],
  [DOG_BOOKS, "What topic are both books about?", "dogs", ["cats", "fish"], "Both books tell about the same animal."],
  [DOG_BOOKS, "What does Book 2 tell that Book 1 does not?", "Dogs can swim.", ["Dogs can run.", "Dogs can fly."], "Both books say dogs run. Only one says more."],
  [CAT_BOOKS, "How are the two books the same?", "Both say cats nap.", ["Both are about dogs.", "Both say cats swim."], "Find what both books tell."],
  [CAT_BOOKS, "Which book tells where cats nap?", "Book 2", ["Book 1", "neither book"], "One book says “in the sun.”"],
  [pic("✍️"), "In a fact book, what does the author do?", "writes the facts", ["draws the pictures", "sells the book"], "The author writes the words."],
  [pic("🖍️"), "In a fact book, what does the illustrator do?", "draws the pictures", ["writes the facts", "reads it to you"], "Illustrations are the pictures."],
  [WHALE, "Where do whales live?", "in the sea", ["in trees", "in the desert"], "The first line tells where."],
  [WHALE, "What do whales breathe?", "air", ["sand", "juice"], "Look at the last line."],
  [WHALE, "What is this text mostly about?", "whales", ["boats", "fish food"], "Each line tells about the same animal."],
  [pic("🐻"), "A book tells true facts about bears. Who wrote the facts?", "the author", ["the bear", "the illustrator"], "The author writes the words in a book."],
  [FROGS, "What do tadpoles grow into?", "frogs", ["eggs", "ducks"], "Look at the last line.", true],
  [OWLS, "How does the text help you know what “nocturnal” means?", "It tells what it means.", ["It has a picture of the sun.", "It does not say."], "“That means…” tells you the meaning.", true],
  [HELMET, "Which line gives the reason?", "A helmet keeps your head safe.", ["Wear a helmet.", "Ride a bike."], "A reason tells why.", true],
  [RAIN, "What happened first?", "It rained.", ["There were puddles.", "The sun came out."], "Rain came in the night, before the morning.", true],
];

const SENTENCE_STARTERS: R[] = [
  [null, "Which word names a thing?", "ball", ["run", "jump"], "A naming word tells a person, place or thing."],
  [null, "Which word names an animal?", "cow", ["eat", "sing"], "Which one can you see and touch?"],
  [null, "Which word is an action word?", "hop", ["cup", "bed"], "An action word is something you can do."],
  [null, "Which word is an action word?", "swim", ["hat", "sun"], "Can you do it? Then it is an action."],
  [row("🐶", "🐶"), "One dog, two ___.", "dogs", ["dog", "doges"], "Add s to show more than one dog."],
  [row("📦", "📦"), "One box, two ___.", "boxes", ["boxs", "box"], "Words that end in x add es: boxes."],
  [row("🚌", "🚌"), "One bus, two ___.", "buses", ["buss", "bus"], "Words that end in s add es: buses."],
  [row("⭐", "⭐"), "One star, two ___.", "stars", ["star", "stares"], "Add s to show more than one."],
  [null, "Which word asks about a place?", "where", ["who", "when"], "Where is it? asks about a place."],
  [null, "Which word asks about a person?", "who", ["where", "what"], "Who is it? asks about a person."],
  [null, "Which word asks about a time?", "when", ["who", "where"], "When is lunch? asks about a time."],
  [null, "Which word tells where? The bird is on the roof.", "on", ["bird", "roof"], "Where is the bird? On the roof."],
  [null, "Which word tells where? The ball is under the bed.", "under", ["ball", "bed"], "Where is the ball? Under the bed."],
  [pic("🐱", "The cat is ___ the box."), "The cat is inside. Which word fits?", "in", ["on", "off"], "Inside means in."],
  [null, "Which sentence starts the right way?", "We can run.", ["we can run.", "wE can run."], "The first word starts with a capital letter."],
  [null, "Which sentence is written the right way?", "I like cake.", ["i like cake.", "I like cake"], "Use a capital I, and end with a period."],
  [null, "Which word should always be a capital?", "I", ["am", "the"], "The word I is always a capital letter."],
  [null, "Which mark ends a telling sentence?", ".", ["?", ","], "A telling sentence ends with a period."],
  [null, "Which mark ends an asking sentence?", "?", [".", ","], "An asking sentence ends with a question mark."],
  [pic("🚌", "bu_"), "What letter makes the last sound in bus?", "s", ["m", "t"], "Say it slowly: b-u-sss."],
  [pic("🐝", "_ee"), "What letter makes the first sound in bee?", "b", ["d", "p"], "Say it slowly: b-ee."],
  [null, "Which word fits? I ___ my teeth.", "brush", ["sleep", "hop"], "What do you do to your teeth?"],
  [null, "Which word fits? We ___ a book.", "read", ["eat", "ride"], "What do we do with a book?"],
  [null, "Which one is a whole sentence?", "The dog runs.", ["The dog.", "Runs fast."], "A sentence tells who and what they do."],
  [null, "Which sentence tells more?", "The big dog runs fast.", ["The dog runs.", "A dog."], "Describing words add more to a sentence.", true],
  [row("🦊", "🦊"), "One fox, two ___.", "foxes", ["foxs", "fox"], "Words that end in x add es.", true],
  [null, "Which sentence is right?", "Sam and I play.", ["Sam and i play.", "sam and I play."], "Names and the word I start with capitals.", true],
  [null, "Which one asks a question?", "Why is it wet?", ["It is wet.", "It is so wet!"], "An asking sentence often starts with a question word.", true],
];

export const STORY_QUESTIONS_K: Unit = readingUnit({
  id: "ca-gk-story-questions",
  title: "Story Questions",
  emoji: "📖",
  blurb: "Ask and answer questions about stories.",
  parentNote:
    "Your child listens to short stories and poems, answers questions about the details, works out new words, tells a storybook from a poem, names the author and illustrator, and compares characters.",
  standards: [
    "RL.K.1; RL.K.4; RL.K.5; RL.K.6; RL.K.9; SL.K.2",
    "answering questions about details and new words in stories read aloud, kinds of texts, authors and illustrators, and comparing characters",
  ],
  items: STORY_QUESTIONS,
});

export const FACT_QUESTIONS_K: Unit = readingUnit({
  id: "ca-gk-fact-questions",
  title: "Fact Finders",
  emoji: "🔎",
  blurb: "Find facts in true texts.",
  parentNote:
    "Your child listens to short true texts and answers questions about the key details, the main topic, new words, the reasons an author gives and how two texts on the same topic are alike and different.",
  standards: [
    "RI.K.1; RI.K.2; RI.K.3; RI.K.4; RI.K.6; RI.K.8; RI.K.9",
    "key details, main topics, connections, new words, authors and illustrators, reasons and comparing two texts on the same topic",
  ],
  items: FACT_QUESTIONS,
});

export const SENTENCE_STARTERS_K: Unit = readingUnit({
  id: "ca-gk-sentence-starters",
  title: "Sentence Starters",
  emoji: "✏️",
  blurb: "Words, capitals and end marks.",
  parentNote:
    "Your child sorts naming and action words, makes words mean more than one, uses question words and position words, and starts and ends sentences the right way.",
  standards: [
    "L.K.1; L.K.2; L.K.6",
    "naming and action words, plurals, question words and position words, capitals and end marks, and using new words",
  ],
  items: SENTENCE_STARTERS,
});

export const LANGUAGE_K: Unit[] = [STORY_QUESTIONS_K, FACT_QUESTIONS_K, SENTENCE_STARTERS_K];
