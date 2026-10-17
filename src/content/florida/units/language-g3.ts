import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Florida's own Grade 3 English language arts units (`fl-` ids): free verse, rhymed verse, haiku and limericks, and
// an author's claim, the evidence for it and the purpose behind it. The poems are original. Reading only.

const HAIKU = "Soft rain on the roof / Puddles gather by the door / Frogs begin to sing";
const LIMERICK =
  "There once was a cat named Lou, / who wore a big hat made of glue. / He sat in the sun / and said, “This is fun!” / Then he stuck to his chair. Boo hoo!";
const FREE = "The morning is quiet / Light spills across the floor / I hear the kettle hum";
const RHYMED = "The moon is bright, / the stars shine too, / they sparkle light / on me and you.";

const POEMS: Q[] = [
  [`What kind of poem is this? ${HAIKU}`, "haiku", ["limerick", "free verse", "rhymed verse"], "A haiku has three short lines.", true],
  [`What kind of poem is this? ${LIMERICK}`, "limerick", ["haiku", "free verse", "a play"], "A limerick is a funny poem with five lines.", true],
  [`What kind of poem is this? ${FREE}`, "free verse", ["haiku", "limerick", "rhymed verse"], "It has no regular rhyme or pattern.", true],
  [`What kind of poem is this? ${RHYMED}`, "rhymed verse", ["haiku", "limerick", "free verse"], "Its line endings rhyme.", true],
  ["A haiku has how many lines?", "3", ["2", "4", "5"], "Haiku are short."],
  ["A limerick has how many lines?", "5", ["3", "4", "6"], "A limerick has five lines."],
  ["A haiku often has syllables in a pattern of…", "5, 7, 5", ["3, 5, 3", "8, 8, 8", "2, 4, 6"], "Five, seven, five."],
  ["A limerick is usually…", "funny", ["sad", "a list of facts", "a set of directions"], "It is meant to make you smile."],
  ["Free verse is a poem that…", "does not need rhyme or a set pattern", ["must rhyme every line", "has exactly three lines", "has to be funny"], "The poet chooses the form."],
  ["Rhymed verse is a poem with…", "words that rhyme at the ends of lines", ["no line breaks", "only one line", "numbers instead of words"], "Look at how lines end."],
  ["Which poem has a 5-7-5 pattern?", "haiku", ["limerick", "free verse", "rhymed verse"], "Count syllables."],
  ["How many syllables are in “puddles”?", "2", ["1", "3", "4"], "pud-dles."],
  ["How many syllables are in “butterfly”?", "3", ["2", "4", "5"], "but-ter-fly."],
  ["How many syllables are in “rain”?", "1", ["2", "3", "4"], "One beat."],
  ["Which line has five syllables?", "Soft rain on the roof", ["Puddles gather by the door", "Frogs begin to sing today", "The morning is quiet and warm"], "Count the beats of each line."],
  ["Which line could be the last line of a haiku about snow?", "White quiet fields sleep", ["Snow is white and cold and soft and falls", "Winter has many long and snowy days", "I like snow a lot and play"], "The line should be short, about five syllables.", true],
  ["Which poem is most likely a limerick?", "There once was a goat named Jake, / who ate a whole chocolate cake. / ...", ["Leaves fall / one / by one", "I walk to the bus / and watch the sky", "The sea is wide and blue and deep"], "Limericks begin “There once was…” and rhyme.", true],
  ["Which poem is free verse?", "I walk past the old brick wall / and the sun is warm on my neck", ["Roses are red / violets are blue", "There once was a bug named Lou", "Twinkle, twinkle, little star"], "It does not rhyme or follow a pattern.", true],
  ["Which two lines come from rhymed verse?", "The sky is gray, / we stay and play.", ["The sky is gray, / and I walk home.", "The sky / is gray.", "Gray sky. Gray sea."], "Look for matching end sounds.", true],
  ["In a limerick, which lines usually rhyme with the first line?", "the second and fifth", ["the third and fourth", "none of them", "only the last"], "The pattern is AABBA."],
  ["Limerick lines 3 and 4 are usually…", "short and rhyme with each other", ["very long", "left out", "numbers"], "They are a small pair."],
  ["A stanza is…", "a group of lines in a poem", ["a book title", "a kind of rhyme", "a person who writes"], "Poems are built from stanzas."],
  ["A poet is…", "a person who writes poems", ["a person who reads maps", "a type of poem", "a book cover"], "A poet writes poems."],
  ["Which would be a good topic for a haiku?", "a raindrop on a leaf", ["the entire history of the world", "a thousand-page story", "rules for a board game"], "Haiku are small and quiet pictures."],
  ["Which of these could be the title of a limerick?", "The Cat Who Ate a Hat", ["Directions to the Lake", "Rules of the Library", "A Table of Contents"], "Limericks are silly."],
];

const CLAIMS: Q[] = [
  ["An author’s claim is…", "what the author wants you to believe", ["the book’s cover", "a kind of poem", "a page number"], "A claim is a main point."],
  ["Evidence is…", "facts or details that support a claim", ["the author’s name", "a funny story", "the title"], "It backs up the claim."],
  ["The author says, “Kids should read every day.” That is the…", "claim", ["evidence", "title", "caption"], "It says what the author believes."],
  ["Read: “Libraries help everyone. They lend books for free and offer quiet places to study.” What is the claim?", "Libraries help everyone.", ["They lend books for free.", "They offer quiet places.", "Books are heavy."], "The claim comes first."],
  ["Read: “Libraries help everyone. They lend books for free and offer quiet places to study.” What is evidence?", "They lend books for free.", ["Libraries help everyone.", "I love libraries.", "Libraries are great."], "Evidence is a fact that supports."],
  ["Claim: Exercise is good for you. Which is evidence?", "It makes your heart stronger.", ["It is the best.", "Everyone likes it.", "I run on Saturdays."], "Pick a fact.", true],
  ["Claim: Dogs make good pets. Which is evidence?", "Dogs can learn tricks and keep you company.", ["Dogs are the cutest.", "Cats are not good pets.", "My dog is brown."], "Pick the fact that supports the claim.", true],
  ["Claim: We should save water. Which is evidence?", "Only a small part of Earth’s water is fresh and ready to drink.", ["Water is blue.", "I like to swim.", "Showers are fun."], "Look for a fact that supports saving.", true],
  ["Claim: Bike helmets keep riders safe. Which is evidence?", "Helmets cushion the head in a fall.", ["Helmets come in many colors.", "Bikes have two wheels.", "I ride to the park."], "It should explain why.", true],
  ["Which sentence is a claim?", "Recess helps students learn better.", ["Recess is twenty minutes.", "Recess is outside.", "Recess has a bell."], "A claim says what someone believes."],
  ["Which sentence is evidence for “Sleep is important”?", "Sleep gives your brain time to rest and grow.", ["Beds are soft.", "Pillows are round.", "I stay up late on Friday."], "It explains why sleep matters."],
  ["An author gives three facts to support an idea. The facts are…", "evidence", ["the title", "the claim", "a poem"], "Facts that support are evidence."],
  ["Which word often introduces a reason?", "because", ["but", "or", "when"], "Because tells why."],
  ["An author writes, “We should plant trees because they clean the air.” The reason is…", "they clean the air", ["we should plant", "trees are tall", "air is invisible"], "The reason follows “because.”"],
  ["A text about a park says, “Come see our new playground!” The author’s purpose is to…", "persuade you to visit", ["teach about plants", "tell a long story", "give a recipe"], "It asks you to do something."],
  ["A text about how volcanoes form is mostly meant to…", "inform", ["persuade", "entertain only", "sell"], "It teaches facts."],
  ["An author’s purpose is…", "the reason the author wrote", ["the first page", "a character’s name", "a rhyme"], "Why did they write it?"],
  ["Which purpose fits a book of jokes?", "to entertain", ["to give directions", "to teach about science", "to give a vote"], "Jokes are for fun."],
  ["Which purpose fits an article on the parts of a plant?", "to inform", ["to entertain with jokes", "to ask for money", "to rhyme"], "It gives facts.", true],
  ["Which purpose fits a poster that says “Vote for a longer recess!”?", "to persuade", ["to inform", "to rhyme", "to list ingredients"], "It asks for action.", true],
  ["Two authors write about bees. One tells how they make honey. The other tells how they build hives. How do they differ?", "they share different facts", ["they write about cats", "they have the same facts", "they use rhymes"], "Compare what each author tells.", true],
  ["Two authors write about the moon. Both say it orbits Earth. What is the same?", "a fact about the moon", ["the title", "the pictures", "the author"], "Look for what they both say.", true],
  ["Author A uses photos. Author B uses drawings. Both explain how rain forms. How are they alike?", "both explain how rain forms", ["both use photos", "both use drawings", "both are poems"], "Think about the topic.", true],
  ["When two authors write about the same topic, you can compare their…", "facts and how they explain them", ["covers only", "page counts only", "paper"], "Compare what they say."],
  ["“Some people think cats are the best pets.” This sentence shows…", "an opinion", ["a fact", "a title", "evidence"], "“Some people think” is a clue."],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "fl-g3-kinds-of-poems",
    title: "Kinds of Poems",
    emoji: "🌸",
    blurb: "Haiku, limericks, free verse and rhymed verse.",
    parentNote:
      "Florida’s Grade 3 standards ask children to identify types of poems: free verse, rhymed verse, haiku and limerick. Children read short original poems, count syllables and lines, and name the kind of poem from how it is built.",
    standards: ["ELA.3.R.1.4", "types of poems: free verse, rhymed verse, haiku and limerick"],
    items: POEMS,
  }),
  bankUnit({
    id: "fl-g3-claims-evidence-purpose",
    title: "Claims, Evidence & Purpose",
    emoji: "🧩",
    blurb: "What the author believes, how they back it up and why they wrote.",
    parentNote:
      "Florida’s Grade 3 standards ask children to identify an author’s claim and explain how the author uses evidence to support it, to explain the development of an author’s purpose, and to compare how two authors present information on one topic. Children pick the claim, the evidence and the purpose in short passages.",
    standards: ["ELA.3.R.2.4; ELA.3.R.2.3; ELA.3.R.3.3", "an author’s claim and evidence, an author’s purpose, and comparing two authors on one topic"],
    items: CLAIMS,
  }),
];
/** Put the own units before the planned ones. */
export const FIRST = false;
