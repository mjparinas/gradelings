import type { Unit } from "../../types";
import { passage, readingUnit, type R } from "./language-kit";

// California's own Grade 4 English language arts units: poems, plays and prose and how a staged or read-aloud version
// follows the text (CA CCSS RL.4.5, RL.4.7); comparing tales and information texts and an author's reasons (RL.4.9,
// RI.4.8, RI.4.9); and precise words, punctuation for effect and formal English (L.4.3, L.4.6). Every poem, script and
// passage is original.

const POEM = passage(
  "Night Garden",
  "The moon pours silver on the lane,\nThe crickets hum their song again,\nThe roses close their sleepy eyes,\nAnd stars come out to light the skies.",
);
const POEM_2 = passage(
  "Morning Bus",
  "Brakes squeal,\nDoors fold,\nWe climb aboard\nOut of the cold.",
  "Windows fog,\nWipers sway,\nThe bus hums on\nAnd starts our day.",
);
const SCRIPT = passage(
  "The Lost Ticket (a play)",
  "SETTING: A busy train station. A clock on the wall reads 9:55.",
  "MAYA: (searching her pockets) My ticket! It was right here!",
  "CONDUCTOR: (kindly) The train leaves at ten o'clock, miss.",
  "MAYA: (pulling a ticket from her shoe, laughing) Found it! I hid it so I wouldn't lose it!",
);
const PROSE = passage(
  "The Lost Ticket (a story)",
  "The train station was crowded and loud. Maya dug through her pockets, her heart pounding. Her ticket was gone!",
  "“The train leaves at ten,” the conductor said kindly. Then Maya remembered. She pulled off her shoe, and there was the ticket. She laughed with relief.",
);

const POEMS_PLAYS_PROSE: R[] = [
  [POEM, "What is this text?", "a poem", ["a play", "a news article", "a recipe"], "It has lines with rhythm and rhyme."],
  [POEM, "Which pair of words rhymes in the poem?", "lane and again", ["moon and song", "roses and stars", "silver and skies"], "Listen to the ends of the first two lines."],
  [POEM, "How many lines does this stanza have?", "4", ["2", "3", "6"], "Count each line of the poem."],
  [POEM_2, "How is “Morning Bus” organized?", "two stanzas of four short lines", ["one long paragraph", "a list of characters", "scenes with stage directions"], "Look at the groups of lines."],
  [POEM_2, "What gives this poem its quick beat?", "short lines of two or three words", ["long paragraphs", "a cast list", "a glossary"], "Read the lines aloud. Notice how short they are."],
  [null, "What is a group of lines in a poem called?", "a stanza", ["a scene", "a chapter", "a caption"], "Stanzas are like paragraphs for poems."],
  [null, "What is the pattern of beats in a line of poetry called?", "meter", ["dialogue", "setting", "caption"], "Meter is the rhythm you can tap."],
  [SCRIPT, "What kind of text is this?", "a play (drama)", ["a poem", "a fact book", "a letter"], "It has a setting line, character names and stage directions."],
  [SCRIPT, "What are the words in parentheses called?", "stage directions", ["dialogue", "stanzas", "captions"], "They tell actors how to move or speak."],
  [SCRIPT, "Which line is dialogue?", "My ticket! It was right here!", ["(searching her pockets)", "SETTING: A busy train station.", "(kindly)"], "Dialogue is what a character says."],
  [SCRIPT, "Where does the play tell the setting?", "in the SETTING line at the top", ["in the last line", "in the title only", "it never tells"], "Plays often describe the setting first."],
  [PROSE, "How is the story version different from the play?", "It is written in paragraphs with a narrator.", ["It has stage directions.", "It lists the characters' names before each line.", "It rhymes."], "Prose uses sentences and paragraphs."],
  [PROSE, "In the story, how do we learn Maya is worried?", "The narrator says her heart was pounding.", ["A stage direction says (worried).", "The conductor sings.", "A picture shows it."], "Prose tells feelings through the narrator."],
  [SCRIPT, "An actor plays Maya. How should she say her last line?", "laughing, with relief", ["angrily, shouting", "sadly, crying", "slowly, sleepily"], "Read the stage direction before the line."],
  [SCRIPT, "In a stage show of this play, what should the audience see on the wall?", "a clock that reads 9:55", ["a map of the ocean", "a calendar", "a mirror"], "Look at the SETTING line."],
  [SCRIPT, "An actor reads the conductor's line in a gruff, angry voice. What does this change from the script?", "The script says he speaks kindly.", ["The script says he shouts.", "The script has no conductor.", "Nothing changes."], "Check the stage direction for the conductor."],
  [PROSE, "A movie of this story shows Maya calmly reading a book at the station. Which part of the text does it NOT match?", "Maya dug through her pockets, her heart pounding.", ["The station was crowded.", "The conductor spoke kindly.", "Maya laughed at the end."], "How does the text say Maya feels?"],
  [POEM, "A reader reads the poem aloud very loudly and quickly. Which part of the text does that not fit?", "the quiet, sleepy night it describes", ["the train station", "the crowded bus", "the angry storm"], "The poem is about a calm night garden."],
  [POEM_2, "Which sounds would best go with a read-aloud of “Morning Bus”?", "squealing brakes and a humming engine", ["ocean waves", "birds in a forest", "a crackling campfire"], "Use the words of the poem."],
  [null, "Which feature is found in plays but NOT in most stories?", "a cast of characters and stage directions", ["characters", "a setting", "a problem"], "Stories have characters too, but not stage directions."],
  [null, "Which feature is found in poems but not usually in prose?", "line breaks and stanzas", ["sentences", "words", "a title"], "Poems are written in lines."],
  [null, "In a play, the conversation between characters is called…", "dialogue", ["narration", "a stanza", "an index"], "Dia- means between; the characters talk to each other."],
  [null, "Prose is writing that…", "uses ordinary sentences and paragraphs", ["always rhymes", "is only spoken", "has stage directions"], "Stories and articles are prose."],
  [SCRIPT, "Why does Maya laugh at the end?", "She hid the ticket in her shoe and forgot.", ["The conductor told a joke.", "The train left without her.", "She found money."], "Read her last line and its stage direction."],
  [POEM, "Which line shows the roses acting like people?", "The roses close their sleepy eyes", ["The moon pours silver on the lane", "The crickets hum their song again", "And stars come out to light the skies"], "Roses don't really have eyes.", true],
  [PROSE, "What does the story version tell that the play shows only with a stage direction?", "Maya laughed with relief.", ["The train leaves at ten.", "The station is crowded.", "Maya has a ticket."], "In the play this is written in parentheses.", true],
  [SCRIPT, "Why does a play need stage directions?", "to show actors how to move and speak", ["to make it rhyme", "to list the page numbers", "to give the meaning of words"], "Actors use them to perform.", true],
  [POEM_2, "What is the rhyme pattern in each stanza of “Morning Bus”?", "lines 2 and 4 rhyme", ["every line rhymes", "no lines rhyme", "lines 1 and 2 rhyme"], "fold/cold; sway/day.", true],
];

const TALE_A = passage(
  "Tale A: The Clever Rabbit",
  "A hungry fox caught Rabbit by a river. “Wait!” said Rabbit. “There is a giant cheese in the water.” It was only the moon's reflection.",
  "Fox jumped in to grab it, and Rabbit hopped away to safety.",
);
const TALE_B = passage(
  "Tale B: The Tortoise and the Eagle",
  "Eagle wanted to eat Tortoise, but his shell was too hard. “Drop me from the sky,” said Tortoise, “and my shell will crack.”",
  "Eagle flew up high, but Tortoise pulled in his head and landed safely in a soft pond.",
);
const TALE_C = passage(
  "Tale C: Three Wishes",
  "A poor farmer was given three wishes. He wished for a feast, then wished his greedy neighbor's nose turned into a sausage.",
  "With his last wish, he had to wish the nose back to normal, and only the feast was left.",
);
const TALE_D = passage(
  "Tale D: The Golden Fish",
  "A fisher caught a magic fish that granted wishes. Her husband kept wishing for more: a bigger house, then a palace.",
  "When he wished to rule the sea, the fish took everything back.",
);
const BIKE_LANES = passage(
  "Our Town Needs Bike Lanes",
  "Our town should add bike lanes on Main Street. First, bike lanes make riding safer. In one nearby city, crashes dropped by a third after lanes were added.",
  "Second, more people would ride instead of drive, which means cleaner air. A survey at our school found that 60 of 100 families would bike more with safe lanes.",
);
const ART_CLASS = passage(
  "Keep Art Class",
  "Every school should keep art class. Art helps students think creatively and solve problems in new ways.",
  "Art also helps students relax. Many students say drawing calms them before a test.",
);
const HUMMINGBIRD_A = passage(
  "Text A: Hummingbirds",
  "Hummingbirds are the smallest birds. Their wings beat up to 80 times a second, which makes the humming sound.",
);
const HUMMINGBIRD_B = passage(
  "Text B: Hummingbird Food",
  "Hummingbirds drink nectar from flowers with long tongues. They must eat often because flying burns so much energy.",
);

const COMPARE_TEXTS: R[] = [
  [TALE_A, "How does Rabbit escape?", "She tricks Fox into chasing the moon's reflection.", ["She runs faster than Fox.", "She fights Fox.", "Another animal saves her."], "Read what Rabbit tells Fox."],
  [TALE_B, "How does Tortoise escape?", "He tricks Eagle into dropping him in a pond.", ["He hides in a cave.", "He bites Eagle.", "He flies away."], "Read what Tortoise tells Eagle."],
  [TALE_B, "Tales A and B come from different places. What theme do they share?", "A small, clever animal can outsmart a bigger one.", ["Big animals always win.", "Never go near water.", "Eagles are kind."], "Compare how Rabbit and Tortoise get away."],
  [TALE_A, "What pattern of events do Tales A and B share?", "A hunter catches a small animal, which tricks it and escapes.", ["Two friends go on a trip.", "A king loses his crown.", "A family moves to a new home."], "Look at what happens in both tales."],
  [TALE_C, "What happens to the farmer's wishes?", "He wastes them and ends up with only a feast.", ["He becomes a king.", "He saves them all.", "He gives them away."], "Read the end of Tale C."],
  [TALE_D, "What theme do Tales C and D share?", "Wanting too much can leave you with little.", ["Fishing is easy.", "Neighbors are always kind.", "Sausages are tasty."], "Think about what happens to each person who wishes."],
  [TALE_D, "How is Tale D different from Tale C?", "In Tale D, the wishes are taken back because of greed.", ["Tale D has no wishes.", "In Tale D, nobody wishes for anything.", "In Tale D, the farmer gets everything."], "Who decides how the wishes end in each tale?"],
  [TALE_C, "Tales of three wishes appear in many cultures. Why might stories from different places share a theme?", "People everywhere learn similar lessons about life.", ["All stories are copied from one book.", "They were written last year.", "Only one country tells stories."], "Themes like greed and kindness matter to people everywhere."],
  [BIKE_LANES, "What point is the author making?", "Our town should add bike lanes on Main Street.", ["Cars are faster than bikes.", "Surveys are fun.", "Air is invisible."], "Read the first sentence."],
  [BIKE_LANES, "Which evidence supports the reason that bike lanes make riding safer?", "Crashes dropped by a third in a nearby city.", ["60 of 100 families would bike more.", "Main Street is long.", "Bikes have two wheels."], "Match the evidence to the safety reason."],
  [BIKE_LANES, "Which evidence supports the reason about cleaner air?", "A school survey found many families would bike instead of drive.", ["Crashes dropped by a third.", "Lanes are painted white.", "Main Street has stores."], "Fewer cars means cleaner air."],
  [BIKE_LANES, "How many reasons does the author give?", "2", ["1", "3", "4"], "Look for “First” and “Second.”"],
  [ART_CLASS, "Which reason does the author give for keeping art class?", "Art helps students think creatively.", ["Art supplies are colorful.", "Art class is on Fridays.", "Tests are hard."], "Find a sentence that tells why."],
  [ART_CLASS, "Which evidence supports the reason that art helps students relax?", "Many students say drawing calms them before a test.", ["Art helps solve problems.", "Every school has a gym.", "Paint can be messy."], "Find the evidence after “Art also helps students relax.”"],
  [ART_CLASS, "Which piece of evidence would make this argument stronger?", "a study showing art students feel less stress", ["a list of crayon colors", "the name of the art teacher", "a picture of a paintbrush"], "Strong evidence is facts or data that support the reason."],
  [HUMMINGBIRD_A, "What can you learn only from Text A?", "Their fast wings make the humming sound.", ["They drink nectar.", "They must eat often.", "They have long tongues."], "Look for the fact that is only in Text A."],
  [HUMMINGBIRD_B, "What can you learn only from Text B?", "They drink nectar with long tongues.", ["They are the smallest birds.", "Their wings beat up to 80 times a second.", "Their wings hum."], "Look for the fact that is only in Text B."],
  [HUMMINGBIRD_B, "Put the two texts together. Why must hummingbirds eat so often?", "Their very fast wings burn lots of energy.", ["They are too big.", "Flowers are far away.", "They sleep all day."], "Text A tells about the wings; Text B tells about energy."],
  [HUMMINGBIRD_A, "Which title fits a report that uses both texts?", "How Hummingbirds Fly and Eat", ["The Biggest Birds", "How to Plant Flowers", "Why Birds Sing at Night"], "The report should cover both texts' topics."],
  [null, "You read two articles about the same storm. One says 3 inches of rain fell; the other says 5. What should you do?", "check another reliable source", ["pick the bigger number", "ignore both", "make up a number"], "When texts disagree, check more sources."],
  [null, "An author writes, “Dogs are the best pets because they are loyal.” What is “because they are loyal”?", "a reason", ["a title", "a question", "a caption"], "A reason tells why."],
  [null, "Which is evidence, not just an opinion?", "A survey found 8 of 10 students liked the new menu.", ["The new menu is awesome.", "Everyone should love the menu.", "The menu is the best ever."], "Evidence can be counted or checked."],
  [TALE_A, "What is Rabbit like?", "quick-thinking", ["lazy", "greedy", "unkind"], "How did Rabbit get out of trouble?"],
  [TALE_D, "Why did the fish take everything back?", "The husband kept wishing for more and more.", ["The fisher let the fish go.", "The palace was too small.", "The sea was stormy."], "Read the last sentence."],
  [TALE_B, "Both tales end the same way. How?", "The small animal gets away safely.", ["The hunter wins.", "Both animals become friends.", "Everyone goes to sleep."], "Look at the last sentence of each tale.", true],
  [BIKE_LANES, "Which sentence would NOT support the author's point?", "Bike lanes make streets look red.", ["Bike lanes lower crashes.", "Bike lanes help people ride instead of drive.", "Safer roads help families."], "Does it give a reason to add bike lanes?", true],
  [TALE_C, "How do Tales C and D end alike?", "The wisher ends up with less than he hoped.", ["The wisher becomes rich.", "The fish and the farmer meet.", "Everyone gets a palace."], "Compare the endings.", true],
  [HUMMINGBIRD_B, "Which fact from Text A helps explain Text B?", "Their wings beat up to 80 times a second.", ["They drink nectar.", "They have long tongues.", "They visit flowers."], "Text B says flying burns energy. Which fact shows why?", true],
];

const PRECISE_WORDS: R[] = [
  [null, "Which word best shows that Leo spoke in a small, nervous way?", "stammered", ["said", "talked", "spoke"], "Stammered shows he had trouble getting the words out."],
  [null, "Which word best shows that the toddler complained in an unhappy voice?", "whined", ["said", "asked", "told"], "Whined shows an unhappy, complaining voice."],
  [null, "Which word best shows that the teacher asked many questions?", "quizzed", ["said", "went", "looked"], "Quizzed means asked questions to check."],
  [null, "Which word is more precise? The dog ___ across the yard.", "dashed", ["went", "moved", "got"], "Pick a verb that shows exactly how it moved."],
  [null, "Which word best describes a very happy feeling?", "overjoyed", ["okay", "fine", "nice"], "Pick the word with the strongest happy meaning."],
  [null, "Which word is the most precise way to say “very tired”?", "exhausted", ["sleepy", "good", "bad"], "Exhausted means extremely tired."],
  [null, "Which word is more precise? The soup was ___.", "scalding", ["nice", "okay", "good"], "Scalding means hot enough to burn."],
  [null, "Which sentence uses an exclamation mark for effect?", "Watch out for that wave!", ["Watch out for that wave.", "Watch out for that wave?", "watch out for that wave"], "An exclamation mark shows strong feeling."],
  [null, "Which punctuation makes this sound like a surprise? “We won ___”", "!", [".", ",", ";"], "Surprise and excitement use an exclamation mark."],
  [null, "Why might a writer use a question in the first sentence of a report?", "to make readers curious", ["to end the report", "to list the sources", "to show who wrote it"], "A question can hook the reader."],
  [null, "Which sentence uses formal English for a class report?", "Bald eagles build very large nests.", ["Bald eagles build, like, huge nests.", "Those eagles are so cool, you guys.", "OMG eagle nests are big."], "Reports use formal, clear English."],
  [null, "Which is best for a quick note to a friend?", "Want to shoot hoops after school?", ["I am writing to request your presence at recess.", "To whom it may concern:", "Dear Sir or Madam,"], "Friendly notes can be informal."],
  [null, "When should you use formal English?", "giving a presentation to the class", ["texting a friend", "joking at lunch", "chatting at recess"], "Formal English fits school and official situations."],
  [null, "Which word is a science word for how a plant makes food from sunlight?", "photosynthesis", ["evaporation", "migration", "erosion"], "Photo means light; synthesis means putting together."],
  [null, "Which science word means water turning into a gas?", "evaporation", ["condensation", "erosion", "migration"], "Evaporate means turn into vapor."],
  [null, "Which word means the slow wearing away of rock by wind or water?", "erosion", ["evaporation", "migration", "pollination"], "Erosion carves canyons over a long time."],
  [null, "Which social studies word means people moving from one country to live in another?", "immigration", ["erosion", "evaporation", "pollination"], "Immigrants move to a new country."],
  [null, "Which math word means the answer to a multiplication problem?", "product", ["sum", "difference", "quotient"], "Multiply to get a product."],
  [null, "The dog ___ the bone. Which verb shows the dog was very hungry?", "gobbled", ["ate", "had", "got"], "Gobbled means ate quickly and greedily."],
  [null, "Which word best shows the wind was gentle?", "breeze", ["gale", "storm", "hurricane"], "A breeze is a light wind."],
  [null, "Which word best shows Ana was a little bit scared?", "uneasy", ["terrified", "calm", "furious"], "Uneasy means slightly worried."],
  [null, "Which revision is more precise? “The thing in the sky was big.”", "The full moon looked enormous.", ["The thing was big.", "It was really big.", "Something in the sky was big."], "Name the thing and use an exact describing word."],
  [null, "Which word best replaces “said” to show Kai was angry?", "snapped", ["whispered", "giggled", "murmured"], "Snapped means said sharply and angrily."],
  [null, "Which word best replaces “walked” to show Grandpa was tired?", "trudged", ["skipped", "raced", "pranced"], "Trudged means walked slowly and heavily."],
  [null, "Which sentence uses a dash for effect?", "I opened the box and found — nothing!", ["I opened the box and found nothing.", "I opened the box, and found nothing", "I opened the box and found nothing?"], "A dash can make a dramatic pause.", true],
  [null, "Why might an author write “Crash!” on its own line?", "to make a sudden sound stand out", ["to show a list", "to end a letter", "to ask a question"], "Short lines and exclamation marks add drama.", true],
  [null, "Which word is more precise? The scientist ___ the bug under the microscope.", "examined", ["saw", "had", "got"], "Examined means looked at carefully.", true],
  [null, "Which word best shows Zoe was very surprised?", "astonished", ["interested", "aware", "bored"], "Astonished means greatly surprised.", true],
];

export const POEMS_PLAYS_4: Unit = readingUnit({
  id: "ca-g4-poems-plays-prose",
  title: "Poems, Plays and Prose",
  emoji: "🎭",
  blurb: "Stanzas, stage directions and versions.",
  parentNote:
    "Your child tells poems, plays and stories apart by their parts (verse, rhythm, meter, stanzas, dialogue, stage directions) and checks where a staged, filmed or read-aloud version follows the words of the text.",
  standards: [
    "RL.4.5; RL.4.7",
    "the parts of poems, plays and prose, and how a staged, filmed or read-aloud version matches the text",
  ],
  items: POEMS_PLAYS_PROSE,
});

export const COMPARE_TEXTS_4: Unit = readingUnit({
  id: "ca-g4-compare-texts",
  title: "Compare the Texts",
  emoji: "⚖️",
  blurb: "Shared themes, reasons and evidence.",
  parentNote:
    "Your child compares tales from different places that share a theme or pattern, finds the reasons and evidence an author uses to support a point, and puts facts from two texts together.",
  standards: [
    "RL.4.9; RI.4.8; RI.4.9",
    "comparing themes and patterns in tales from different cultures, an author's reasons and evidence, and combining two texts on one topic",
  ],
  items: COMPARE_TEXTS,
});

export const PRECISE_WORDS_4: Unit = readingUnit({
  id: "ca-g4-precise-words",
  title: "Precise Words",
  emoji: "🎯",
  blurb: "Exact words, effects and formal English.",
  parentNote:
    "Your child picks precise words for actions and feelings (stammered, trudged, overjoyed), uses punctuation for effect, chooses formal or informal English for the situation and learns subject words from science, math and social studies.",
  standards: [
    "L.4.3; L.4.6",
    "precise words, punctuation for effect, formal and informal English, and subject words",
  ],
  items: PRECISE_WORDS,
});

export const LANGUAGE_4: Unit[] = [POEMS_PLAYS_4, COMPARE_TEXTS_4, PRECISE_WORDS_4];
