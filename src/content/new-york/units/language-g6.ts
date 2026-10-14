import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// New York's own Grade 6 language units (`ny-` ids). New York's 6R9 asks students to judge texts against criteria and
// connect them to other texts, cultural perspectives and eras, and 6R6 asks how an author's place or culture shapes their
// perspective; no shared unit practises these, so this bank does. Every example is original.

const COMPARE: Q[] = [
  [
    "You want to judge whether an informational article is good. Which is the most useful criterion?",
    "Are the facts accurate and supported by sources?",
    ["Is the font large?", "Is the article long?", "Does it have many pictures?"],
    "Criteria are standards for judging quality. For informational texts, accuracy matters most.",
  ],
  [
    "Which criterion best helps you judge a short story?",
    "Do the characters and events feel believable within the story?",
    ["Does it have an index?", "Is every sentence the same length?", "Does it list sources?"],
    "Good fiction makes readers believe in its characters and world.",
  ],
  [
    "Which criterion best helps you judge a persuasive essay?",
    "Are the claims backed by relevant evidence?",
    ["Does it rhyme?", "Does it have stage directions?", "Is it written in the past tense?"],
    "A persuasive essay is strong when reasons and evidence support its claims.",
  ],
  [
    "Two articles describe the same storm. One was written by a reporter who lived through it; one by a writer far away using reports. What is likely different?",
    "The first may include firsthand details and feelings the second lacks",
    ["They must have exactly the same details", "The second must be more emotional", "Neither can be trusted"],
    "Where an author is affects what they can see and feel.",
  ],
  [
    "A writer who grew up on a farm describes rain as \"a blessing.\" A writer from a flooded city calls it \"a threat.\" What explains the difference?",
    "Each author's place and experience shapes their perspective",
    ["One of them is lying", "Rain is always good", "They are describing different weather words"],
    "Perspective comes from an author's background, culture and location.",
  ],
  [
    "A poem and a news report are both about a city marathon. What is the best way to compare them?",
    "Look at how each genre presents the same event and what each emphasizes",
    ["Count the words in each", "Check which one has a longer title", "Decide which one has more commas"],
    "Comparing across genres means asking how each form shapes the message.",
  ],
  [
    "Two folktales from different cultures both feature a trickster who outsmarts stronger animals. What can you conclude?",
    "Different cultures can share similar story patterns and themes",
    ["One culture copied the other exactly", "Folktales are always the same", "Trickster stories are not real literature"],
    "Similar themes often appear in stories from many parts of the world.",
  ],
  [
    "A novel set in 1850 shows children working long hours in a mill. How does knowing the era help you?",
    "It explains why the characters' lives differ from life today",
    ["It tells you the book is boring", "It proves the story is true", "It means the book has no theme"],
    "The time period, or era, shapes how characters live and what they face.",
  ],
  [
    "A memoir by an immigrant describes her first winter in New York. What can readers learn?",
    "How a new place felt from her cultural perspective",
    ["Exact weather records for that year", "How to build a house", "The plot of a fairy tale"],
    "Memoirs show the world through the writer's own experience.",
  ],
  [
    "What does it mean to make a text-to-text connection?",
    "Linking ideas in one text to ideas in another text",
    ["Copying a text word for word", "Reading the same text twice", "Counting the pages in two books"],
    "Text-to-text connections find shared themes, topics or structures.",
  ],
  [
    "Two stories share the theme \"courage means facing your fears.\" One is about a soccer player; one is about a girl moving countries. What do they have in common?",
    "The same theme, shown through different characters and situations",
    ["The same setting", "The same characters", "The same author"],
    "A theme is a message that can appear in very different stories.",
  ],
  [
    "Which question best compares how two authors treat the same topic?",
    "What details does each author include or leave out?",
    ["Which book has the brighter cover?", "Which author has a longer name?", "Which book costs more?"],
    "Choices about details reveal an author's purpose and perspective.",
  ],
  [
    "A review says, \"This book is great because I liked it.\" What is wrong with this judgment?",
    "It gives no criteria or evidence from the text",
    ["It is too long", "It uses the word \"book\"", "It mentions the reader"],
    "A strong review explains why, using clear criteria and examples.",
    true,
  ],
  [
    "Which review sentence uses a clear criterion and evidence?",
    "The dialogue feels real: the siblings tease each other just like real brothers do.",
    ["I just think this book is awesome.", "Everyone should read it right now.", "It is the best book in the world."],
    "Look for a standard (realistic dialogue) and an example from the text.",
    true,
  ],
  [
    "A story about a family's harvest festival is told by a narrator from that culture. Why does this matter?",
    "The narrator can explain customs from the inside, with personal meaning",
    ["The story must be nonfiction", "The story cannot have a theme", "The narrator will use no details"],
    "An insider's perspective brings details and meaning an outsider might miss.",
    true,
  ],
  [
    "A travel article about a fishing village is written by a visitor who stayed one day. What should a careful reader notice?",
    "The writer's view is from outside and may miss local perspectives",
    ["Everything in it must be wrong", "It is a work of fiction", "It is written in verse"],
    "Ask who the author is and how well they know the place.",
    true,
  ],
  [
    "Why might the same historical event be described differently in two countries' textbooks?",
    "Each country's culture and history shape which details seem important",
    ["History has only one true version that everyone tells the same way", "Textbooks never include facts", "Events change every year"],
    "Perspective can change emphasis, even when facts are shared.",
    true,
  ],
  [
    "A myth and a science article both explain thunder. How do they differ?",
    "The myth explains through a story; the article explains with evidence",
    ["They are the same genre", "The article uses magic", "The myth lists sources"],
    "Genres explain the world in different ways for different purposes.",
  ],
  [
    "A reader says a poem is strong because its images help her picture the scene clearly. What criterion is she using?",
    "Vivid imagery",
    ["Number of pages", "The poet's age", "Use of headings"],
    "Imagery is language that helps readers see, hear or feel.",
  ],
  [
    "What is a cultural perspective?",
    "A way of seeing the world shaped by a group's beliefs, customs and history",
    ["A kind of punctuation", "A list of facts in a table", "The title of a book"],
    "Culture affects what people value and notice.",
  ],
  [
    "Which pair of texts would be most useful to compare different cultural perspectives on a new year celebration?",
    "Two personal essays by writers from different cultures",
    ["Two copies of the same essay", "A recipe and a math worksheet", "Two dictionary entries for \"year\""],
    "To compare perspectives, you need voices from different backgrounds.",
  ],
  [
    "When you compare a novel to the movie made from it, which question helps most?",
    "What did the movie change, add or leave out, and why?",
    ["Which one is longer?", "Which one costs more?", "Which one has a better poster?"],
    "Changes between versions reveal choices made for each format.",
  ],
  [
    "An author writes a story set in her own neighborhood. How might that help the story?",
    "She can include true-to-life details about the setting",
    ["It means the story has no conflict", "It makes the story a biography", "It removes the need for characters"],
    "Writers draw on places and cultures they know well.",
  ],
  [
    "After reading two texts on the same topic, which is the best final step?",
    "Explain how they are alike and different, with evidence from each",
    ["Choose the shorter one and forget the other", "Copy the first sentence of each", "Count the vowels"],
    "Comparisons need evidence from both texts.",
  ],
  [
    "Which statement is an evaluation of a text, not a summary?",
    "The author's use of flashbacks makes the mystery more suspenseful.",
    ["The story is about a girl who finds a key.", "The book has twelve chapters.", "The main character lives in a city."],
    "A summary tells what happens. An evaluation judges how well it is done.",
    true,
  ],
  [
    "Two articles about a new park disagree. One author lives next to it; the other runs a business that lost its parking. What should you consider?",
    "How each author's situation might shape their view",
    ["Only the longer article", "Which author has the nicer name", "Neither article, since they disagree"],
    "An author's position and interests can affect their perspective.",
    true,
  ],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "ny-g6-compare-texts",
    title: "Judge and Compare Texts",
    emoji: "⚖️",
    blurb: "Criteria for quality, and how culture, place and era shape a text.",
    parentNote:
      "Your child uses clear criteria to judge texts, tells a summary from an evaluation, and compares texts across genres, cultures and eras, including how an author's place or background shapes their perspective.",
    standards: ["6R9; 6R6", "judging texts with criteria and comparing them across genres, cultures, eras and perspectives"],
    items: COMPARE,
  }),
];
