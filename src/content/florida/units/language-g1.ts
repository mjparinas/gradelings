import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Florida's own Grade 1 English language arts units (`fl-` ids): stanzas and line breaks in poems, descriptive words
// and phrases, an author's opinion, what pictures and words each tell, and comparing two texts on one topic. All of it
// is reading and listening; Grade 1 writing and speaking benchmarks need free work.

const POEMS: Q[] = [
  ["A group of lines in a poem is called a…", "stanza", ["chapter", "title", "caption"], "A poem is made of stanzas."],
  ["A line break in a poem is where…", "one line ends and the next begins", ["the poem ends", "the title goes", "a picture goes"], "Each line starts on a new row."],
  ["The blank space between two stanzas shows…", "a new group of lines", ["a mistake", "the title", "the author’s name"], "Stanzas are set apart."],
  ["Rain falls / on the town. / Puddles shine. How many lines?", "3", ["2", "4", "5"], "Count each row.", true],
  ["Cat naps. / Dog plays. // Birds sing. / Fish swim. How many stanzas?", "2", ["1", "3", "4"], "The blank row splits the stanzas.", true],
  ["Cat naps. / Dog plays. // Birds sing. / Fish swim. Lines in the first stanza?", "2", ["1", "3", "4"], "Count up to the blank row.", true],
  ["Frog on a log. / He met a dog. Which words rhyme?", "log, dog", ["frog, met", "a, he", "on, met"], "Listen to the ends of the lines."],
  ["Sun so bright, / shines all day, / a happy light. Which words rhyme?", "bright, light", ["sun, day", "all, shines", "so, happy"], "Match the line endings."],
  ["Where does a poem’s line break fall? “I like to run / and jump in the sun.”", "after “run”", ["after “I”", "after “jump”", "after “in”"], "The first line ends at “run.”"],
  ["Poems often use…", "short lines", ["only numbers", "no words", "one long row"], "Lines are short and often rhyme."],
  ["Which of these is the title of a poem?", "the name at the top", ["the last line", "a line in the middle", "the page number"], "A title comes first."],
  ["Wind, wind, / blow my kite. / How many words are in the first line?", "2", ["1", "3", "4"], "Count: wind, wind."],
  ["“The soft, warm blanket.” Which word tells how it feels?", "soft", ["blanket", "the", "tells"], "Soft is how it feels."],
  ["“A bright yellow star.” Which word tells the color?", "yellow", ["star", "a", "bright"], "Yellow is a color."],
  ["“The loud drum went boom.” Which word tells how the drum sounds?", "loud", ["drum", "went", "the"], "Loud tells the sound."],
  ["“A sweet, juicy peach.” Which word tells how it tastes?", "sweet", ["peach", "a", "juicy"], "Sweet is a taste."],
  ["Which phrase tells more about a dog?", "a fluffy white dog", ["a dog", "the dog", "that dog"], "Fluffy and white describe the dog."],
  ["Which phrase paints the best picture?", "a tiny green frog", ["a frog", "the frog", "one frog"], "It tells size and color."],
  ["“The cold, wet snow fell.” Which words describe the snow?", "cold, wet", ["fell, the", "snow, fell", "the, cold"], "They tell what snow is like."],
  ["Which describing word fits? “The ___ lemon made me squint.”", "sour", ["round", "tall", "quiet"], "Think of how a lemon tastes.", true],
  ["Which describing word fits? “A ___ rabbit hopped away.”", "fast", ["salty", "loud", "square"], "Which word tells about a rabbit?", true],
  ["Which words tell how the bear looked? “A big brown bear sat down.”", "big, brown", ["sat, down", "a, bear", "bear, sat"], "They describe the bear."],
  ["“A tall tree swayed.” Which word tells how tall the tree is?", "tall", ["swayed", "tree", "a"], "Tall tells the size."],
  ["Which describes a fire truck?", "loud and red", ["quiet and green", "small and soft", "cold and sweet"], "Think of a fire truck.", true],
  ["Which phrase tells how the pillow feels?", "soft and fluffy", ["loud and fast", "red and round", "small and far"], "Feel is touch.", true],
  ["“The shiny coin.” What does “shiny” tell?", "how the coin looks", ["how it sounds", "how it tastes", "how it smells"], "Shiny is how it looks."],
];

const OPINIONS: Q[] = [
  ["The author says, “Cats make the best pets.” That is the author’s…", "opinion", ["address", "title", "picture"], "Best tells what the author thinks."],
  ["Which word can show an opinion?", "best", ["two", "blue", "Monday"], "Best tells what someone thinks."],
  ["Which word can show an opinion?", "wonderful", ["triangle", "seven", "dog"], "It says what someone feels."],
  ["The author wrote, “Summer is the most fun season.” What does the author think?", "summer is fun", ["summer is cold", "summer is short", "summer is a word"], "Read what the author says."],
  ["The author wrote, “I love frogs.” The author’s opinion is…", "frogs are great", ["frogs are green", "frogs are small", "frogs hop"], "Love shows how the author feels."],
  ["The author wrote, “Reading is boring.” What does the author think?", "reading is not fun", ["reading is fun", "reading is loud", "reading is round"], "Boring is the author’s opinion."],
  ["Which sentence shows the author’s opinion?", "Apples are the tastiest fruit.", ["Apples grow on trees.", "Apples can be red.", "An apple has seeds."], "Tastiest is an opinion."],
  ["Which sentence tells only a fact?", "Apples grow on trees.", ["Apples are the tastiest.", "Apples are yummy.", "Everyone likes apples."], "A fact can be checked."],
  ["A chart shows 3 apples and 5 pears. The words say, “There are more pears.” They…", "match", ["do not match", "are a poem", "are a title"], "Count the pictures."],
  ["A picture shows a dog running. The words say, “The dog naps.” They…", "do not match", ["match", "rhyme", "are a title"], "The picture and words tell different things."],
  ["Words say, “Two ducks swim.” The picture shows…", "two ducks in water", ["a cat on a bed", "three bees", "a red car"], "The picture should match the words."],
  ["What can a picture show that words may not?", "what something looks like", ["what it is called", "who wrote it", "its page number"], "Pictures show how things look."],
  ["What can words tell that a picture may not?", "what a character says", ["the color of the sky", "the size of a tree", "a smiling face"], "Words can tell what people say.", true],
  ["A map shows a lake by a farm. The words say, “The farm is by the lake.” They…", "match", ["do not match", "are an opinion", "rhyme"], "Look at the map and the words."],
  ["Book A: “Bees make honey.” Book B: “Honey comes from bees.” Both books tell how…", "bees make honey", ["bees sleep", "bears swim", "flowers grow"], "Both books are about the same thing."],
  ["Two books are about frogs. Both say frogs hop. What is the same?", "both tell that frogs hop", ["both are about cars", "both have no words", "both are poems"], "Look for the same fact.", true],
  ["Two moon books: one has photos, one has drawings. What is different?", "the pictures", ["the moon", "the topic", "the facts"], "Photos and drawings are different.", true],
  ["Book A says, “Cats sleep a lot.” Book B says, “Dogs run fast.” Same topic?", "no", ["yes, both are about cats", "yes, both are about dogs", "yes, both are about fish"], "One is about cats and one is about dogs.", true],
  ["Two books tell about rain. Which is the same in both?", "the topic is rain", ["the pictures", "the title", "the author"], "The topic is rain in both."],
  ["Which tells how two books on the same topic are alike?", "they tell about the same thing", ["they have the same cover", "they have the same title", "they have the same author"], "Alike means the same."],
  ["Which text feature helps you find a word’s meaning?", "a glossary", ["a cover", "a title page", "an author’s name"], "A glossary lists word meanings."],
  ["A caption is…", "words under a picture", ["a kind of poem", "the last page", "a page number"], "It tells about the picture."],
  ["A heading tells…", "what a part of the text is about", ["who read it", "when it was printed", "what the cover looks like"], "It names the part."],
  ["The author says, “Dogs are better than cats.” This is…", "an opinion", ["a fact", "a title", "a poem"], "Better tells what someone thinks.", true],
  ["Which clue words show an opinion?", "I think, I like, best", ["on, in, at", "one, two, three", "Monday, Tuesday"], "These words tell what someone feels.", true],
  ["The author wants you to try fruit. Which sentence says so?", "Fruit is the best snack, so try some!", ["Fruit grows on trees.", "Some fruit is round.", "Fruit has seeds."], "The author shares an opinion.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "fl-g1-poems-and-describing",
    title: "Poems & Describing Words",
    emoji: "🎶",
    blurb: "Lines, stanzas, rhymes and words that paint a picture.",
    parentNote:
      "Florida’s Grade 1 standards ask children to identify stanzas and line breaks in poems and to explain descriptive words and phrases in a text. Children count lines and stanzas, find rhymes and choose the words that tell how something looks, sounds, feels or tastes.",
    standards: ["ELA.1.R.1.4; ELA.1.R.3.1", "stanzas and line breaks in poems, and descriptive words and phrases"],
    items: POEMS,
  }),
  bankUnit({
    id: "fl-g1-opinions-and-comparing",
    title: "Opinions, Pictures & Two Books",
    emoji: "🧐",
    blurb: "What the author thinks, what pictures add, and how two books compare.",
    parentNote:
      "Florida’s Grade 1 standards ask children to identify an author’s opinion about a topic, to explain how visuals and words each give information, and to compare two texts on the same topic. Children read or hear short passages and choose what is the same, what is different and what the author thinks.",
    standards: ["ELA.1.R.2.4; ELA.1.R.2.3; ELA.1.R.3.3", "an author’s opinion, how pictures and words differ, and comparing two texts on one topic"],
    items: OPINIONS,
  }),
];
/** Put the own units before the planned ones. */
export const FIRST = false;
