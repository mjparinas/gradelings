import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { CRAFT_UNITS } from "./language-g3-craft";

// New York's own Grade 3 language units (`ny-` ids). New York's 3R9 asks children to recognize genres and connect texts
// to other texts, ideas and cultures; no shared unit practises it, so this bank does. Every passage is original.

const GENRES: Q[] = [
  [
    "A story where animals talk and it ends with a lesson, like \"Slow and steady wins the race.\" What genre is it?",
    "Fable",
    ["Biography", "News article", "Recipe"],
    "Fables are short stories, often with animal characters, that teach a lesson.",
  ],
  [
    "A book tells the true story of a scientist's life, from childhood to old age. What genre is it?",
    "Biography",
    ["Fairy tale", "Poem", "Tall tale"],
    "A biography is a true story of a real person's life, written by someone else.",
  ],
  [
    "A writer tells the true story of her own first year at a new school, using \"I\" and \"me.\" What genre is it?",
    "Autobiography or memoir",
    ["Fable", "Science fiction", "Fairy tale"],
    "When people write about their own lives, it is an autobiography or memoir.",
  ],
  [
    "A story has a princess, a magic spell, and starts with \"Once upon a time.\" What genre is it?",
    "Fairy tale",
    ["Biography", "How-to text", "News article"],
    "Fairy tales often have magic, royalty and the words \"Once upon a time.\"",
  ],
  [
    "A text gives facts about how bees make honey, with headings and a diagram. What genre is it?",
    "Informational text",
    ["Fairy tale", "Fable", "Poem"],
    "Informational texts teach true facts and often use headings and diagrams.",
  ],
  [
    "A farmer is so strong he lifts a barn with one hand and digs a lake with a spoon. What genre is it?",
    "Tall tale",
    ["Biography", "Informational text", "Recipe"],
    "Tall tales stretch the truth with huge, funny exaggerations.",
  ],
  [
    "Lines are grouped into stanzas, and the words have rhythm and rhyme. What genre is it?",
    "Poetry",
    ["News article", "Biography", "Dictionary entry"],
    "Poems are written in lines and stanzas, often with rhythm and rhyme.",
  ],
  [
    "A text has a cast list, lines for each character to say, and stage directions. What genre is it?",
    "Drama (a play)",
    ["Biography", "Informational text", "Fable"],
    "Plays are written to be acted out, with dialogue and stage directions.",
  ],
  [
    "A story takes place on a space station in the future, with robots and new inventions. What genre is it?",
    "Science fiction",
    ["Biography", "Fable", "How-to text"],
    "Science fiction imagines how science and inventions might change the future.",
  ],
  [
    "A detective follows clues to find out who took the missing class hamster. What genre is it?",
    "Mystery",
    ["Biography", "Poetry", "Informational text"],
    "In a mystery, characters follow clues to solve a puzzle or a crime.",
  ],
  [
    "A text lists materials and numbered steps for building a bird feeder. What genre is it?",
    "Procedural (how-to) text",
    ["Fairy tale", "Mystery", "Tall tale"],
    "How-to texts give materials and steps in order.",
  ],
  [
    "A made-up story about a family moving to a new town, with events that could really happen. What genre is it?",
    "Realistic fiction",
    ["Fairy tale", "Biography", "Science fiction"],
    "Realistic fiction is made up, but it could happen in real life.",
  ],
  [
    "Which genre is most likely to start with \"Once upon a time\"?",
    "Fairy tale",
    ["News article", "Biography", "How-to text"],
    "Think of stories with castles, magic and talking mirrors.",
  ],
  [
    "Which genre is a TRUE story about a real person?",
    "Biography",
    ["Fable", "Tall tale", "Fairy tale"],
    "Fables, tall tales and fairy tales are made up.",
  ],
  [
    "Which feature would you most expect in an informational text?",
    "Headings and a glossary",
    ["A magic spell", "A talking animal", "A moral at the end"],
    "Informational texts use features that help you find facts.",
  ],
  [
    "Which feature would you most expect in a fable?",
    "A lesson, or moral, at the end",
    ["An index", "A table of contents", "A cast list"],
    "Fables teach a lesson about how to act.",
  ],
  [
    "Two stories from different countries both tell of a clever small animal tricking a big one. What is the connection?",
    "They share a similar plot and lesson",
    ["They have the same author", "They are both biographies", "They are both how-to texts"],
    "Stories from many cultures can share plots, characters and lessons.",
    true,
  ],
  [
    "You read a poem about rain and an article about the water cycle. How are they connected?",
    "They share a topic but are different genres",
    ["They are the same genre", "They have the same author", "They are both fables"],
    "A topic is what a text is about. A genre is what kind of text it is.",
    true,
  ],
  [
    "A character in a story moves to a new school and feels nervous. Maya says, \"That happened to me too!\" What is Maya doing?",
    "Connecting the text to her own life",
    ["Summarizing the plot", "Naming the genre", "Finding a text feature"],
    "A text-to-self connection links a story to something in your own life.",
    true,
  ],
  [
    "Leo says, \"This story reminds me of another book where friends solve a problem together.\" What kind of connection is that?",
    "Text to text",
    ["Text to self", "Text to world", "No connection"],
    "Linking one book to another book is a text-to-text connection.",
    true,
  ],
  [
    "A story is about saving water during a dry summer. Ana thinks of the news about droughts. What kind of connection is that?",
    "Text to world",
    ["Text to self", "Text to text", "No connection"],
    "Linking a text to events in the world is a text-to-world connection.",
    true,
  ],
  [
    "Many cultures have folktales that explain how something in nature came to be. What do we call these stories?",
    "Pourquoi (\"why\") tales",
    ["Biographies", "Recipes", "News reports"],
    "\"Pourquoi\" is French for \"why.\" These tales explain why things are the way they are.",
    true,
  ],
  [
    "A story explains why the moon changes shape, using characters and magic, not science. What genre is it most likely?",
    "Folktale or myth",
    ["Informational text", "Biography", "How-to text"],
    "Folktales and myths often explain nature with a made-up story.",
    true,
  ],
  [
    "Which question helps you compare two versions of the same fairy tale from different cultures?",
    "How are the characters and settings alike and different?",
    ["How many pages does each book have?", "What color is each cover?", "Which book is heavier?"],
    "Compare what happens in each story, not how the books look.",
    true,
  ],
  [
    "What makes a text a piece of fiction?",
    "It is made up by the author",
    ["It only gives true facts", "It must have a glossary", "It is always about animals"],
    "Fiction comes from the author's imagination.",
  ],
  [
    "What makes a text nonfiction?",
    "It gives true information about real things",
    ["It always has talking animals", "It starts with \"Once upon a time\"", "It is always a poem"],
    "Nonfiction is about real people, places, events and facts.",
  ],
  [
    "A text gives the date, the place and the facts of a town event that happened yesterday. What genre is it?",
    "News article",
    ["Fable", "Fairy tale", "Tall tale"],
    "News articles report on real, recent events.",
  ],
  [
    "A story includes a hero who goes on a long journey and faces many challenges. Which text is it most like?",
    "An adventure story",
    ["A recipe", "A dictionary", "A science diagram"],
    "Adventure stories follow characters on exciting journeys.",
    true,
  ],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "ny-g3-genres",
    title: "Kinds of Texts",
    emoji: "📚",
    blurb: "Fables, biographies, poems, plays and more, and how texts connect.",
    parentNote:
      "Your child names a text's genre from its features (fable, biography, tall tale, play, informational text) and makes text-to-self, text-to-text and text-to-world connections, including tales from different cultures.",
    standards: ["3R9; 3R5", "recognizing genres and connecting texts to other texts, cultures and their own lives"],
    items: GENRES,
  }),
  ...CRAFT_UNITS,
];
