import type { Unit } from "../../types";
import { passage, pic, readingUnit, type R } from "./language-kit";

// California's own Grade 2 English language arts units: fables and two versions of a story (CA CCSS RL.2.2, RL.2.7,
// RL.2.9), multi-paragraph information texts (RI.2.2, RI.2.4, RI.2.8, RI.2.9), and capitals, commas, apostrophes and
// formal or informal English (L.2.2, L.2.3, L.2.6). Every story, fable and fact text is original.

const ANT_GRASSHOPPER = passage(
  "The Ant and the Cricket",
  "All summer, Ant carried seeds to her nest. Cricket sang and played in the sun.",
  "When winter came, Ant had plenty to eat. Cricket was cold and hungry.",
  "Ant shared a few seeds. “Next summer,” said Cricket, “I will work first and play later.”",
);
const CROW_PEBBLES = passage(
  "The Thirsty Crow",
  "Crow found a jar with a little water at the bottom. Her beak could not reach it.",
  "She dropped pebbles into the jar, one by one. The water rose higher and higher.",
  "At last, Crow took a long, cool drink.",
);
const LION_MOUSE = passage(
  "The Lion and the Mouse",
  "A tiny mouse woke a sleeping lion. “Please let me go,” said Mouse. “One day I may help you.” Lion laughed, but he let her go.",
  "Later, Lion was caught in a hunter's net. Mouse chewed the ropes until Lion was free.",
);
const BOASTING_HARE = passage(
  "Hare and Snail",
  "Hare bragged, “I am the fastest!” He raced Snail to the old oak tree.",
  "Hare was so sure he would win that he stopped to nap. Snail kept going, slow and steady.",
  "When Hare woke up, Snail was already at the tree.",
);
const VERSION_A = passage(
  "The Little Red Hen (version 1)",
  "Hen found some wheat. “Who will help me plant it?” she asked. Cat, Dog and Duck all said, “Not I!”",
  "Hen did all the work and baked bread. Then she ate it all herself.",
);
const VERSION_B = passage(
  "The Little Red Hen (version 2)",
  "Hen found some wheat. “Who will help me plant it?” she asked. Cat, Dog and Duck all said, “Not I!”",
  "Hen did all the work and baked bread. Her friends said sorry, so she shared it, and next time they all helped.",
);
const TWO_ENDINGS = passage(
  "Two Tellings",
  "In one telling, a girl named Lupe gets lost in the woods and a kind owl shows her the way home.",
  "In another telling, Lupe gets lost and follows the river home by herself.",
);

const FABLES_AND_VERSIONS: R[] = [
  [ANT_GRASSHOPPER, "What is the lesson of this fable?", "Work first, then play.", ["Always sing in the sun.", "Never share food.", "Winter is fun."], "Think about what Cricket learns at the end."],
  [ANT_GRASSHOPPER, "Why was Cricket cold and hungry in winter?", "He played all summer and did not save food.", ["Ant took his food.", "It was too sunny.", "He ate too much."], "What did Cricket do all summer?"],
  [ANT_GRASSHOPPER, "Which retells the fable in order?", "Ant works, Cricket plays, winter comes, Ant shares.", ["Ant shares, winter comes, Ant works.", "Winter comes, Cricket plays, Ant works.", "Cricket works, Ant plays, Ant shares."], "Start with summer and end with what Ant did."],
  [CROW_PEBBLES, "What is the lesson of this fable?", "Think hard to solve a problem.", ["Jars are heavy.", "Never drink water.", "Pebbles are pretty."], "How did Crow get her drink?"],
  [CROW_PEBBLES, "What was Crow's problem?", "Her beak could not reach the water.", ["She had no jar.", "She was too cold.", "She lost her pebbles."], "Look at the first paragraph."],
  [CROW_PEBBLES, "What did the pebbles do?", "made the water rise", ["broke the jar", "made the water go away", "fed Crow"], "Look at the second paragraph."],
  [LION_MOUSE, "What is the lesson of this fable?", "Even small friends can help.", ["Big animals are always right.", "Never sleep outside.", "Nets are strong."], "Who helped Lion?"],
  [LION_MOUSE, "Why did Lion laugh at Mouse?", "He did not think a tiny mouse could help him.", ["Mouse told a joke.", "He was ticklish.", "Mouse was singing."], "Mouse said she might help one day."],
  [BOASTING_HARE, "What is the lesson of this fable?", "Slow and steady can win.", ["Naps are always good.", "Snails can fly.", "Always brag."], "Who won, and how?"],
  [BOASTING_HARE, "How did Hare act at the start?", "He bragged.", ["He was shy.", "He was sad.", "He was lost."], "“I am the fastest!”"],
  [VERSION_A, "In version 1, who ate the bread?", "Hen ate it all.", ["Everyone shared it.", "Cat ate it all.", "No one ate it."], "Look at the end of version 1."],
  [VERSION_B, "In version 2, how does the story end?", "Hen shares, and next time they all help.", ["Hen eats it all.", "The bread burns.", "Hen moves away."], "Look at the end of version 2."],
  [VERSION_B, "How are versions 1 and 2 the same?", "Nobody helps Hen plant the wheat.", ["Hen shares the bread.", "Everyone helps.", "The bread burns."], "Both versions start the same way."],
  [VERSION_A, "How is version 1 different from version 2?", "Hen does not share in version 1.", ["Hen finds corn in version 1.", "Duck helps in version 1.", "There is no bread in version 1."], "Compare the endings."],
  [TWO_ENDINGS, "How are the two tellings different?", "Lupe gets home in different ways.", ["Lupe is never lost.", "Lupe stays in the woods.", "They are exactly the same."], "One has an owl. One has a river."],
  [TWO_ENDINGS, "How are the two tellings the same?", "Lupe gets lost and finds her way home.", ["An owl helps in both.", "Lupe follows a river in both.", "Lupe never gets home."], "Look for what happens in both."],
  [pic("🦊", "Fox smiles and hides a cookie behind his back."), "What does the picture show about Fox?", "He is being sneaky.", ["He is scared.", "He is sleeping.", "He is crying."], "Why would Fox hide the cookie?"],
  [pic("🌧️", "Dark clouds fill the sky over the picnic."), "What does the picture tell you will happen?", "It is going to rain.", ["It will be sunny.", "It will snow.", "The picnic is at night."], "Dark clouds bring rain."],
  [pic("🏰", "The story begins at a castle on a hill."), "Use the picture. What is the setting?", "a castle on a hill", ["a city bus", "a beach", "a classroom"], "The setting is where the story happens."],
  [pic("😄", "Ana at the end of the story"), "The words say Ana won the race. What does the picture add?", "Ana feels happy.", ["Ana lost.", "It is raining.", "Ana is asleep."], "Look at the face."],
  [pic("🐢", "Turtle stands in the middle of a busy road."), "What problem does the picture show?", "Turtle is in danger.", ["Turtle is hungry.", "Turtle is sleepy.", "Turtle is at home."], "A busy road is not safe for a turtle."],
  [pic("🎒", "Sam waves goodbye at the school door."), "When does this part of the story happen?", "at the start of the school day", ["at bedtime", "on a snowy night", "at a birthday party"], "Sam is just arriving at school."],
  [pic("📚", "A folktale is told in many places."), "Why might a story have two versions?", "People in different places tell it their own way.", ["It was printed twice.", "It has no ending.", "It is a fact book."], "Folktales are retold by many people."],
  [null, "What is a fable?", "a short story that teaches a lesson", ["a list of facts", "a poem about rain", "a letter"], "Fables often have animal characters and a lesson."],
  [LION_MOUSE, "How does Mouse show the lesson?", "She frees Lion from the net.", ["She wakes Lion up.", "She runs away.", "She laughs at Lion."], "What did Mouse do later?", true],
  [ANT_GRASSHOPPER, "How did Cricket change?", "He learned to work before playing.", ["He stopped singing forever.", "He became an ant.", "He did not change."], "Read what Cricket says at the end.", true],
  [TWO_ENDINGS, "Which telling shows Lupe solving the problem by herself?", "the one where she follows the river", ["the one with the owl", "both of them", "neither of them"], "Who helps Lupe in each one?", true],
  [BOASTING_HARE, "Why did Hare lose?", "He stopped to nap because he was too sure.", ["Snail was faster.", "The tree moved.", "He got lost."], "What did Hare do in the middle?", true],
];

const OCTOPUS = passage(
  "The Clever Octopus",
  "An octopus has eight arms. Each arm is covered with suckers that can grab and taste.",
  "An octopus can also hide. It changes color to match the rocks around it. This is called camouflage.",
);
const HONEYBEES = passage(
  "Busy Honeybees",
  "Honeybees live together in a hive. Thousands of bees can live in one hive.",
  "Each bee has a job. Some bees gather nectar from flowers. Some bees take care of the young.",
);
const RECYCLE = passage(
  "Why Recycle?",
  "We should recycle cans and paper. Recycling saves trees, because old paper can be made into new paper.",
  "Recycling also keeps trash out of parks and oceans, where it can hurt animals.",
);
const RECESS = passage(
  "Play Outside",
  "Kids should play outside every day. Running and climbing make muscles strong.",
  "Fresh air and sunshine can also help kids feel calm and ready to learn.",
);
const MOON_A = passage("Book A: The Moon", "The moon moves around Earth. It takes about a month to go all the way around.");
const MOON_B = passage("Book B: The Moon", "The moon has no air. Astronauts walked on the moon and left footprints in the dust.");
const BOOK_SNAKES_A = passage("Text A: Snakes", "Snakes have no legs. They move by pushing their bodies against the ground.");
const BOOK_SNAKES_B = passage("Text B: Snakes", "Snakes have no legs. They smell with their tongues.");

const FACT_READER: R[] = [
  [OCTOPUS, "What is the main topic of this text?", "the octopus", ["rocks", "fish", "the ocean floor"], "Each paragraph tells about the same animal."],
  [OCTOPUS, "What is the second paragraph mostly about?", "how an octopus hides", ["how many arms it has", "what it eats", "where it sleeps"], "Read the second paragraph again."],
  [OCTOPUS, "What does “camouflage” mean in this text?", "changing color to hide", ["having eight arms", "swimming fast", "tasting with suckers"], "The text tells you right before the word."],
  [HONEYBEES, "What is the main topic of this text?", "honeybees", ["flowers", "honey jars", "birds"], "What is every paragraph about?"],
  [HONEYBEES, "What is the second paragraph mostly about?", "the jobs bees do", ["how big a hive is", "how to make honey", "where flowers grow"], "Look at the first sentence of paragraph two."],
  [HONEYBEES, "What does “nectar” come from in this text?", "flowers", ["the hive", "rain", "trees' roots"], "The bees gather it from somewhere."],
  [RECYCLE, "What point does the author make?", "We should recycle.", ["Paper is white.", "Oceans are deep.", "Parks are big."], "Read the first sentence."],
  [RECYCLE, "Which reason does the author give?", "Recycling saves trees.", ["Cans are shiny.", "Paper is light.", "Trash is fun."], "Find a sentence that tells why."],
  [RECYCLE, "Which is another reason the author gives?", "It keeps trash out of parks and oceans.", ["It is easy to carry cans.", "Recycling bins are blue.", "Paper can fly."], "Look at the second paragraph."],
  [RECESS, "What point does the author make?", "Kids should play outside every day.", ["Muscles are big.", "Sunshine is yellow.", "School is long."], "The first sentence tells the point."],
  [RECESS, "Which reason supports the author's point?", "Running and climbing make muscles strong.", ["Kids like snacks.", "Some days are cold.", "Parks have benches."], "A reason tells why the point is true."],
  [MOON_A, "What is the most important point in Book A?", "The moon moves around Earth.", ["Astronauts left footprints.", "The moon has no air.", "The moon is made of cheese."], "Book A tells how the moon moves."],
  [MOON_B, "What is the most important point in Book B?", "The moon has no air, and people walked on it.", ["The moon moves around Earth.", "The moon takes a month to move.", "The moon is a star."], "Book B tells what it is like on the moon."],
  [MOON_B, "How are Book A and Book B the same?", "Both are about the moon.", ["Both talk about astronauts.", "Both say it takes a month.", "Both are stories."], "Look at both titles."],
  [BOOK_SNAKES_A, "What do both texts about snakes say?", "Snakes have no legs.", ["Snakes smell with their tongues.", "Snakes push against the ground.", "Snakes can fly."], "Text B starts the same way: “Snakes have no legs.”"],
  [BOOK_SNAKES_B, "What does Text B tell that Text A does not?", "Snakes smell with their tongues.", ["Snakes have no legs.", "Snakes push to move.", "Snakes are long."], "Find the new fact in Text B."],
  [passage("Sea Turtles", "A sea turtle lays her eggs on a beach. She digs a nest in the sand.", "When the babies hatch, they crawl to the ocean."), "What does “hatch” mean here?", "come out of their eggs", ["dig a hole", "go to sleep", "swim away"], "The babies come out of something."],
  [passage("Desert Plants", "A cactus can live in the dry desert. Its thick stem stores water.", "Sharp spines keep animals from eating it."), "What is the text mostly about?", "how a cactus lives in the desert", ["why deserts are hot", "how animals find food", "how to plant seeds"], "Both paragraphs tell about the cactus."],
  [passage("Desert Plants", "A cactus can live in the dry desert. Its thick stem stores water.", "Sharp spines keep animals from eating it."), "What does “stores” mean here?", "keeps for later", ["sells", "throws away", "paints"], "The stem holds water to use later."],
  [passage("Helmets", "Always wear a helmet when you ride a bike or scooter.", "A helmet protects your head if you fall. It is also the law in many places for kids."), "Which reason does the author give for wearing a helmet?", "It protects your head if you fall.", ["Helmets are colorful.", "Bikes are fast.", "Scooters are fun."], "Find the sentence that tells why."],
  [passage("Wolves", "Wolves live in groups called packs. A pack works together to hunt."), "What is a “pack” in this text?", "a group of wolves", ["a bag", "a kind of food", "a den"], "The sentence tells what a pack is."],
  [passage("Bats", "Bats sleep during the day. They hang upside down in caves.", "At night, bats fly out to eat insects."), "What is the second paragraph about?", "what bats do at night", ["where bats sleep", "how bats hang", "what caves look like"], "Read the second paragraph again."],
  [passage("Water Cycle", "The sun warms water in lakes. The water rises into the air.", "High in the sky, it cools and makes clouds. Then it falls as rain."), "What is the main topic?", "how water moves from lakes to clouds to rain", ["how fish swim", "why lakes are cold", "how to build a boat"], "Put the paragraphs together."],
  [passage("Beavers", "Beavers build dams with sticks and mud.", "The dam makes a pond where the beavers build their home."), "What does the dam make?", "a pond", ["a nest", "a road", "a cave"], "Read the second paragraph."],
  [RECESS, "Which sentence is NOT a reason for the author's point?", "Some days it is rainy.", ["Running makes muscles strong.", "Fresh air helps kids feel calm.", "Sunshine helps kids get ready to learn."], "A reason supports the point. Which one does not?", true],
  [OCTOPUS, "How does the author help you learn the word “camouflage”?", "The text explains it right before the word.", ["There is a glossary.", "It is in a question.", "It is never explained."], "Look at the sentence before “This is called camouflage.”", true],
  [MOON_A, "Which book would help you learn how long the moon takes to go around Earth?", "Book A", ["Book B", "neither book", "both books"], "Find the fact about “a month.”", true],
  [HONEYBEES, "Which detail tells about the first paragraph's topic?", "Thousands of bees can live in one hive.", ["Some bees gather nectar.", "Some bees care for the young.", "Each bee has a job."], "The first paragraph is about the hive.", true],
];

const CAPITALS_AND_COMMAS: R[] = [
  [null, "Which holiday is written correctly?", "Thanksgiving", ["thanksgiving", "ThanksGiving", "thanksGiving"], "Holidays start with a capital letter."],
  [null, "Which place name is written correctly?", "Pacific Ocean", ["pacific ocean", "Pacific ocean", "pacific Ocean"], "Each word in a place name gets a capital."],
  [null, "Which place name is written correctly?", "Rocky River Park", ["rocky river park", "Rocky river park", "rocky River Park"], "Names of places get capitals."],
  [null, "Which sentence is written correctly?", "We went to Lake Tahoe in July.", ["We went to lake tahoe in july.", "we went to Lake Tahoe in July.", "We went to Lake tahoe in July."], "Names of places and months start with capitals."],
  [null, "Which holiday is written correctly?", "New Year's Day", ["new year's day", "New year's day", "new Year's Day"], "Each main word in a holiday name gets a capital."],
  [null, "Which letter greeting is written correctly?", "Dear Grandpa,", ["Dear Grandpa", "dear Grandpa,", "Dear, Grandpa"], "A greeting ends with a comma."],
  [null, "Which letter closing is written correctly?", "Love,", ["Love", "love,", "Love."], "A closing starts with a capital and ends with a comma."],
  [null, "Which is the short way to write “do not”?", "don't", ["dont", "do'nt", "don,t"], "The apostrophe takes the place of the o."],
  [null, "Which is the short way to write “I am”?", "I'm", ["Im", "I'am", "im"], "The apostrophe takes the place of the a."],
  [null, "Which is the short way to write “we will”?", "we'll", ["well", "we'ill", "w'ell"], "The apostrophe takes the place of wi."],
  [null, "Which shows that the bike belongs to Lily?", "Lily's bike", ["Lilys bike", "Lilys' bike", "Lily bike's"], "Add an apostrophe and s to show who owns it."],
  [null, "Which shows the dog belongs to my brother?", "my brother's dog", ["my brothers dog", "my brother dog's", "my brothers' dog"], "Add 's to brother."],
  [null, "Which word is spelled correctly?", "boat", ["bote", "boet", "bowt"], "The long o sound is often spelled oa."],
  [null, "Which word is spelled correctly?", "rain", ["rane", "rayn", "ranne"], "The long a sound in the middle is often spelled ai."],
  [null, "Which word is spelled correctly?", "night", ["nite", "nigt", "niet"], "The long i sound can be spelled igh."],
  [null, "Which is better for a note to your best friend?", "Hey, want to play later?", ["Good afternoon. Would you care to play?", "To whom it may concern:", "Dear Sir or Madam,"], "Notes to friends can be informal."],
  [null, "Which is better for a thank-you letter to the principal?", "Thank you for visiting our class.", ["Thanks a ton, pal!", "Yo, that was cool!", "See ya!"], "Use formal English for a principal."],
  [null, "Which sentence sounds formal?", "May I please borrow a pencil?", ["Gimme a pencil.", "Pencil, now!", "Yo, pencil?"], "Formal English is polite and complete."],
  [null, "Which word describes how the turtle walked?", "slowly", ["turtle", "walked", "grass"], "A describing word can tell how."],
  [null, "Which word describes the dog? The fluffy dog ran.", "fluffy", ["dog", "ran", "the"], "A describing word tells what something is like."],
  [null, "Which word fits? The kitten purred ___ on my lap.", "softly", ["soft", "softer", "softest"], "Use the -ly word to tell how it purred."],
  [null, "Which describing word fits a cold day?", "chilly", ["boiling", "sweaty", "toasty"], "Which word means a bit cold?"],
  [null, "Kai is proud of his drawing. Which word describes how Kai feels?", "proud", ["drawing", "Kai", "his"], "The describing word tells a feeling."],
  [null, "Which product name is written correctly?", "Sunny Oats cereal", ["sunny oats cereal", "Sunny oats Cereal", "sunny Oats cereal"], "The name of a product gets capitals."],
  [null, "Which sentence is written correctly?", "On Saturday, we drove to Mount Shasta.", ["on Saturday, we drove to Mount Shasta.", "On saturday, we drove to mount shasta.", "On Saturday, we drove to mount Shasta."], "Days and place names start with capitals.", true],
  [null, "Which shows the short way to write “they are”?", "they're", ["their", "there", "theyre"], "The apostrophe takes the place of the a.", true],
  [null, "Which is the best way to tell your teacher you are done?", "I have finished my work.", ["Done!", "Yep, all done, dude.", "Finished it, yay."], "Use complete, formal sentences at school.", true],
  [null, "Which word is spelled correctly?", "badge", ["baj", "bage", "badj"], "After a short vowel, the j sound is often spelled dge.", true],
];

export const FABLES_2: Unit = readingUnit({
  id: "ca-g2-fables-and-versions",
  title: "Fables and Versions",
  emoji: "🦁",
  blurb: "Find the lesson and compare versions.",
  parentNote:
    "Your child retells short fables and finds their lesson, uses pictures and words to understand characters and settings, and compares two versions of the same story.",
  standards: [
    "RL.2.2; RL.2.7; RL.2.9",
    "retelling fables and folktales and finding their lesson, pictures and words, and comparing two versions of the same story",
  ],
  items: FABLES_AND_VERSIONS,
});

export const FACT_READER_2: Unit = readingUnit({
  id: "ca-g2-fact-reader",
  title: "Fact Reader",
  emoji: "🐙",
  blurb: "Main topics, new words and reasons.",
  parentNote:
    "Your child reads short information texts with more than one paragraph to find the main topic and what each paragraph is about, work out new words, find the reasons an author gives and compare two texts on the same topic.",
  standards: [
    "RI.2.2; RI.2.4; RI.2.8; RI.2.9",
    "main topics and paragraphs, word meanings, an author's reasons, and comparing the key points of two texts on one topic",
  ],
  items: FACT_READER,
});

export const CAPITALS_2: Unit = readingUnit({
  id: "ca-g2-capitals-and-commas",
  title: "Capitals and Commas",
  emoji: "✉️",
  blurb: "Capitals, apostrophes and letters.",
  parentNote:
    "Your child capitalizes holidays, product names and places, uses commas in letters and apostrophes in short forms and to show who owns something, spells common patterns, tells formal from informal English, and picks describing words.",
  standards: [
    "L.2.2; L.2.3; L.2.6",
    "capitals for holidays, products and places, commas in letters, apostrophes, spelling patterns, formal and informal English, and describing words",
  ],
  items: CAPITALS_AND_COMMAS,
});

export const LANGUAGE_2: Unit[] = [FABLES_2, FACT_READER_2, CAPITALS_2];
