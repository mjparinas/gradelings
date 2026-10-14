import type { Unit } from "../../types";
import { pic, readingUnit, story, type R } from "./language-kit";

// California's own Grade 1 English language arts units: stories (CA CCSS RL.1.2, RL.1.4, RL.1.6, RL.1.7, RL.1.9) and
// information texts (RI.1.3 to RI.1.9), with word-meaning clues (L.1.4). Prompts stay at most 80 characters with at
// most four choices. Every story and fact text is original.

const LOST_HAT = story(
  "Kai lost his hat at the park.",
  "He looked under the slide.",
  "His friend Rosa found it in the sandbox.",
  "Kai said, “Thank you, Rosa!”",
);
const SHARE = story(
  "Mia had three crayons.",
  "Leo had none.",
  "Mia gave Leo a blue one.",
  "They drew a picture together.",
);
const TRY_AGAIN = story(
  "Ben's block tower fell down.",
  "He built it again, slowly.",
  "This time it stood up tall!",
);
const RAIN = story(
  "Drip, drop! The rain tapped on the roof.",
  "The air smelled fresh and wet.",
  "Zoe pulled her soft, warm blanket close.",
);
const BAKERY = story(
  "The bakery smelled sweet.",
  "Warm bread crackled in the oven.",
  "Nia's tummy rumbled.",
);
const I_STORY = story("I ran to the gate.", "My puppy jumped on me.", "I laughed and hugged him.");
const TALK = story(
  "“Where is my ball?” asked Pig.",
  "“It is under the tree,” said Hen.",
  "“Thank you!” said Pig.",
);
const TWO_TRIPS = story(
  "Ana went to the zoo. She saw a lion.",
  "Raj went to the farm. He saw a cow.",
  "Both of them rode a bus home.",
);
const TWO_FRIENDS = story(
  "Frog liked to swim.",
  "Toad liked to dig.",
  "Both liked to eat bugs for lunch.",
);

const STORY_CLUES: R[] = [
  [LOST_HAT, "What did Kai lose?", "his hat", ["his ball", "his shoe"], "The first line tells what Kai lost."],
  [LOST_HAT, "Who found the hat?", "Rosa", ["Kai", "a dog"], "Look at the third line."],
  [LOST_HAT, "Which tells the story in order?", "lost hat, looked, Rosa found it", ["Rosa found it, lost hat, looked", "looked, Rosa found it, lost hat"], "What happened first, next and last?"],
  [SHARE, "What is the lesson of this story?", "Sharing is kind.", ["Crayons are blue.", "Never draw."], "Mia gave Leo a crayon. What does that teach?"],
  [TRY_AGAIN, "What is the lesson of this story?", "Keep trying.", ["Towers are bad.", "Never build."], "Ben did not give up."],
  [TRY_AGAIN, "What happened at the end?", "The tower stood up tall.", ["The tower fell down.", "Ben went home."], "Look at the last line."],
  [RAIN, "Which words tell what Zoe hears?", "drip, drop", ["fresh and wet", "soft, warm"], "Which words are sounds?"],
  [RAIN, "Which words tell how the blanket feels?", "soft, warm", ["drip, drop", "fresh and wet"], "Feel words tell about touch."],
  [RAIN, "How does Zoe most likely feel?", "cozy", ["angry", "scared"], "She is under a soft, warm blanket."],
  [BAKERY, "Which word tells about a smell?", "sweet", ["rumbled", "oven"], "What did the bakery smell like?"],
  [BAKERY, "Which word tells about a sound?", "crackled", ["sweet", "warm"], "Which word can you hear?"],
  [BAKERY, "Nia's tummy rumbled. How does she feel?", "hungry", ["sleepy", "sad"], "A rumbling tummy wants food."],
  [I_STORY, "Who is telling this story?", "a child in the story", ["the puppy", "someone not in it"], "The teller says “I” and “my.”"],
  [TALK, "Who says, “Where is my ball?”", "Pig", ["Hen", "the tree"], "Look for the words “asked Pig.”"],
  [TALK, "Who says, “It is under the tree”?", "Hen", ["Pig", "the ball"], "Look for the words “said Hen.”"],
  [pic("😢", "Ollie at the pond"), "The picture shows Ollie. How does Ollie feel?", "sad", ["happy", "silly"], "Look at the face in the picture."],
  [pic("🌙", "The story starts here."), "The picture shows the moon. When does the story happen?", "at night", ["at lunch", "in the morning"], "The moon is out at night."],
  [pic("🏖️", "Jay's big day"), "Use the picture. Where is Jay's big day?", "at the beach", ["at school", "in the snow"], "Look at the picture for the setting."],
  [pic("🎂", "A day for Mom"), "Use the picture. What is happening?", "a birthday", ["a snow day", "a bus ride"], "What does a cake with candles show?"],
  [TWO_TRIPS, "How are Ana's and Raj's trips different?", "They saw different animals.", ["They saw the same animal.", "They both saw a cow."], "Ana saw a lion. Raj saw a cow."],
  [TWO_TRIPS, "How are Ana's and Raj's trips the same?", "Both rode a bus home.", ["Both went to the zoo.", "Both saw a lion."], "Look at the last line."],
  [TWO_FRIENDS, "How are Frog and Toad different?", "One likes to swim, one likes to dig.", ["Both like to swim.", "Both like to dig."], "Frog swims. Toad digs."],
  [TWO_FRIENDS, "How are Frog and Toad the same?", "Both like to eat bugs.", ["Both like to swim.", "Both like to dig."], "Look at the last line."],
  [pic("🐻", "Bear's Big Nap"), "Which words tell about how someone feels?", "glad and scared", ["red and tall", "ten and two"], "Feeling words tell what is inside."],
  [I_STORY, "How does the teller feel at the end?", "happy", ["sad", "angry"], "The teller laughed.", true],
  [LOST_HAT, "Why did Kai say thank you?", "Rosa found his hat.", ["Rosa lost her hat.", "The slide was fun."], "What did Rosa do for Kai?", true],
  [TALK, "Who is talking at the end?", "Pig", ["Hen", "the tree"], "Look for who “said” the last words.", true],
  [SHARE, "How did Leo most likely feel?", "glad", ["mad", "bored"], "Mia shared with him.", true],
];

const SPIDERS = story(
  "Spiders have eight legs.",
  "Many spiders spin webs.",
  "The webs trap bugs to eat.",
);
const SEASONS = story(
  "In fall, leaves drop from trees.",
  "In winter, the branches are bare.",
  "In spring, new leaves grow.",
);
const BAT = story(
  "A bat is a mammal.",
  "A mammal has fur and feeds milk to its babies.",
);
const DRINK = story(
  "Drink water every day.",
  "Water helps your body stay cool.",
  "It also helps you think.",
);
const SLEEP = story("Sleep is important.", "It gives your body rest.", "It helps you grow.");
const TWO_BOOKS = story(
  "Book 1: Ducks have webbed feet. They swim in ponds.",
  "Book 2: Ducks have webbed feet. They eat plants and bugs.",
);
const PENGUINS = story(
  "Penguins are birds.",
  "They cannot fly.",
  "They use their wings to swim.",
);
const SEED_STEPS = story(
  "First, the seed gets water.",
  "Next, a root grows down.",
  "Then a stem grows up.",
);

const FACT_FINDERS: R[] = [
  [SPIDERS, "How many legs do spiders have?", "eight", ["six", "four"], "The first line tells."],
  [SPIDERS, "Why do spiders spin webs?", "to trap bugs to eat", ["to sleep in the rain", "to fly"], "The last line tells what webs do."],
  [SEASONS, "What happens to trees in fall?", "Leaves drop.", ["New leaves grow.", "They get taller."], "Look at the first line."],
  [SEASONS, "What comes after winter in this text?", "spring", ["fall", "summer"], "The lines go in order of seasons."],
  [SEED_STEPS, "What happens right after the seed gets water?", "A root grows down.", ["A stem grows up.", "A flower opens."], "Find the word “Next.”"],
  [BAT, "The text says a bat is a “mammal.” What is a mammal?", "an animal with fur that feeds milk to babies", ["a kind of bird", "a kind of bug"], "The second line tells what a mammal is."],
  [PENGUINS, "How do penguins use their wings?", "to swim", ["to fly", "to dig"], "Look at the last line."],
  [PENGUINS, "How are penguins different from most birds?", "They cannot fly.", ["They have wings.", "They are birds."], "Most birds can fly."],
  [DRINK, "What reason does the author give to drink water?", "It helps your body stay cool.", ["Water is blue.", "Cups are fun."], "Find a line that tells why."],
  [DRINK, "Which is another reason the author gives?", "It helps you think.", ["It is cold.", "It is in a bottle."], "Look at the last line."],
  [SLEEP, "Why does the author say sleep is important?", "It gives your body rest.", ["Beds are soft.", "Night is dark."], "The author gives reasons after the first line."],
  [TWO_BOOKS, "What do both books say about ducks?", "They have webbed feet.", ["They swim in ponds.", "They eat bugs."], "Find what both books tell."],
  [TWO_BOOKS, "What does only Book 2 tell?", "Ducks eat plants and bugs.", ["Ducks have webbed feet.", "Ducks swim in ponds."], "Look for a fact that is not in Book 1."],
  [pic("📑", "Contents: Bees 2, Ants 6, Frogs 9"), "On what page do frogs start?", "9", ["2", "6"], "Find Frogs in the contents list."],
  [pic("📑", "Contents: Rain 3, Snow 7, Wind 12"), "On what page does Snow start?", "7", ["3", "12"], "Find Snow in the contents list."],
  [null, "What does a heading tell you?", "what a part is about", ["who the author is", "how many pages"], "A heading is a title for one part."],
  [null, "Where do you look to find what a hard word means?", "the glossary", ["the cover", "the page number"], "A glossary is like a little dictionary."],
  [null, "On a tablet, you tap a little house icon. What does it do?", "goes to the home page", ["turns it off", "makes it louder"], "Icons are little pictures that do jobs."],
  [pic("🦒", "A giraffe's long neck helps it reach leaves."), "What does the picture and caption tell you?", "how a giraffe reaches food", ["how a giraffe swims", "how a giraffe sleeps"], "Read the words under the picture."],
  [pic("🐢", "A shell keeps a turtle safe."), "What does the shell do?", "keeps the turtle safe", ["helps it fly", "keeps it cold"], "Read the caption."],
  [null, "Jumped, jumps, jumping. What is the root word?", "jump", ["jumped", "ing"], "Take off the ending to find the root word."],
  [null, "Which word means it already happened?", "looked", ["look", "looking"], "-ed tells it is in the past."],
  [null, "I am ___ at the moon right now. Which word fits?", "looking", ["looked", "looks"], "Right now needs -ing."],
  [null, "Sam was tired, so he took a nap. What does tired mean?", "needing rest", ["very hungry", "very fast"], "Why would Sam take a nap?"],
  [null, "Rewrite means to write…", "again", ["never", "badly"], "re- means again.", true],
  [null, "The box was heavy, and Mia could not lift it. Heavy means…", "hard to lift", ["very soft", "very small"], "Mia could not lift it.", true],
  [SEED_STEPS, "Which is the last step in this text?", "A stem grows up.", ["The seed gets water.", "A root grows down."], "Find the word “Then.”", true],
  [BAT, "How are a bat and a dog the same?", "Both are mammals.", ["Both can fly.", "Both lay eggs."], "Dogs have fur and feed milk to babies too.", true],
];

export const STORY_CLUES_1: Unit = readingUnit({
  id: "ca-g1-story-clues",
  title: "Story Clues",
  emoji: "🧸",
  blurb: "Lessons, feeling words and who is talking.",
  parentNote:
    "Your child retells short stories and finds their lesson, spots words about feelings and the senses, works out who is telling or talking, uses pictures to understand characters and settings, and compares two characters' adventures.",
  standards: [
    "RL.1.1; RL.1.2; RL.1.4; RL.1.6; RL.1.7; RL.1.9",
    "story details, retelling and lessons, feeling and sense words, who is telling the story, pictures and comparing characters' adventures",
  ],
  items: STORY_CLUES,
});

export const FACT_FINDERS_1: Unit = readingUnit({
  id: "ca-g1-fact-finders",
  title: "Fact Finders",
  emoji: "🔍",
  blurb: "Facts, features and reasons in true texts.",
  parentNote:
    "Your child reads short true texts to connect facts, work out new words, use contents pages, headings, glossaries and captions, find the reasons an author gives, and compare two texts on the same topic.",
  standards: [
    "RI.1.3; RI.1.4; RI.1.5; RI.1.7; RI.1.8; RI.1.9; L.1.4; W.1.8",
    "connecting facts, word meanings, text features, pictures and captions, an author's reasons, comparing two texts, root words and endings, and answering questions from given sources",
  ],
  items: FACT_FINDERS,
});

export const LANGUAGE_1: Unit[] = [STORY_CLUES_1, FACT_FINDERS_1];
