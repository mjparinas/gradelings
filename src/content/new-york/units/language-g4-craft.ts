import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// More of New York's own Grade 4 language units (`ny-` ids), added to ./language-g4. No shared unit practises 4R8 (how
// claims in a text are supported), 4R9 (genres and connections to other texts, cultures and eras), 4W1 (an argument
// with reasons and evidence), 4W4 (a creative response) or 4W5 (drawing evidence from texts), so these banks do. Every
// passage is original.

const ARGUMENT_AND_EVIDENCE: Q[] = [
  [
    "Which sentence is a claim a writer could argue for?",
    "Every school should start a recycling club.",
    ["Recycling bins are blue.", "Paper is made from trees.", "Our school has a gym."],
    "A claim is an idea some people could disagree with.",
  ],
  [
    "Claim: “Our library should stay open on Saturdays.” Which reason is strongest?",
    "Many families can only visit on weekends.",
    ["The library has a red door.", "Saturdays come after Fridays.", "Some books are funny."],
    "The strongest reason explains why the claim matters.",
  ],
  [
    "Which piece of evidence best supports “Students need more time outside”?",
    "A study found that kids pay better attention after outdoor play.",
    ["I like playing outside.", "The playground has swings.", "Outside is where the trees are."],
    "Evidence can be a fact or a finding, not just a feeling.",
  ],
  [
    "Which linking phrase best connects a reason to evidence?",
    "For example,",
    ["Once upon a time,", "The end.", "Goodbye,"],
    "Use a phrase that introduces an example.",
  ],
  [
    "Which is the best conclusion for an argument that the town needs a dog park?",
    "A dog park would keep dogs safe, help neighbors meet and make our town a happier place.",
    ["Dogs have four legs.", "My dog's name is Rex.", "There are many parks in the world."],
    "A conclusion sums up the claim and the reasons.",
  ],
  [
    "How should an argument be organized?",
    "claim, reasons with evidence, conclusion",
    ["conclusion, claim, nothing else", "only a list of facts", "a story with no claim"],
    "Start with the claim, support it, then wrap up.",
  ],
  [
    "An article says, “Bike helmets save lives. Studies show helmets lower the risk of serious head injury.” How is the claim supported?",
    "with evidence from studies",
    ["with a joke", "with a story about a dragon", "with no support"],
    "Look at what comes after the claim.",
  ],
  [
    "“Zoos help animals. Many zoos protect animals that are in danger and return some to the wild.” What is the claim?",
    "Zoos help animals.",
    ["Zoos return some animals to the wild.", "Many animals are in danger.", "Zoos have gift shops."],
    "The claim is the main point the author argues.",
  ],
  [
    "Which detail from a text would NOT support the claim “Breakfast helps students learn”?",
    "Some cereals come in colorful boxes.",
    ["Students who eat breakfast focus better.", "Food gives the brain energy.", "Hungry students get tired in class."],
    "Find the detail that is not about learning.",
  ],
  [
    "A question asks, “How does the character change?” What should your answer include?",
    "details from the story that show the change",
    ["only your favorite color", "the number of pages", "a new story"],
    "Use evidence from the text to support your answer.",
  ],
  [
    "Which sentence uses evidence from a text the right way?",
    "The author says that “owls can turn their heads very far,” which shows they can watch all around.",
    ["Owls are my favorite bird.", "I think owls are cool.", "Owls live somewhere."],
    "Quote or name a detail from the text, then explain it.",
  ],
  [
    "After reading a story about a boy who saves a stray cat, which is a creative response?",
    "a poem from the cat's point of view",
    ["a copy of the first page", "a list of page numbers", "the price of the book"],
    "A creative response makes something new from the text.",
  ],
  [
    "You turn a short story into a play for your class. What will you need to write?",
    "lines for each character and stage directions",
    ["a table of contents and an index", "a bibliography only", "a weather map"],
    "Plays use dialogue and directions.",
  ],
  [
    "Which artwork is the best response to a poem about a city at night?",
    "a painting of glowing windows and streetlights",
    ["a drawing of a sunny beach", "a chart of math facts", "a sketch of a soccer ball"],
    "The response should connect to the poem's images.",
  ],
  [
    "To write a response to the theme “friendship takes work,” what could you do?",
    "write a story where two friends solve a disagreement",
    ["list ten kinds of dogs", "copy the dictionary", "draw a map of the moon"],
    "Show the theme in a new way.",
  ],
  [
    "Which question could you answer by drawing evidence from an article about wolves?",
    "What do wolves eat in winter, according to the article?",
    ["What is your favorite animal?", "How many friends do you have?", "What will you eat for dinner?"],
    "Evidence questions point back to the text.",
  ],
  [
    "Claim: “Kids should help cook dinner.” Which counterargument might someone raise?",
    "Cooking can be dangerous for young children.",
    ["Cooking teaches measuring.", "Kids like to eat.", "Dinner is in the evening."],
    "A counterargument is a reason someone might disagree.",
    true,
  ],
  [
    "How can a writer answer a counterargument?",
    "Explain why the claim is still right, for example by adding safety rules.",
    ["Ignore it and write a poem.", "Change the topic.", "Agree and give up the claim."],
    "Respond to the other side with a reason.",
    true,
  ],
  [
    "“Our town should build a skate park. Last year, 200 kids signed a petition asking for one.” What kind of support is this?",
    "a fact that shows many people want it",
    ["an opinion with no support", "a made-up story", "a question"],
    "Numbers and facts are strong evidence.",
    true,
  ],
  [
    "An author claims, “Homework should be banned,” but gives no reasons. What is the problem?",
    "The claim is not supported.",
    ["The claim is too short.", "There are too many reasons.", "The author used a title."],
    "Claims need reasons and evidence.",
    true,
  ],
  [
    "Which sentence best explains how a quote supports a point?",
    "This quote shows the character is brave because she faces the storm alone.",
    ["This is a quote.", "I like quotes.", "Quotes have quotation marks."],
    "Explain what the evidence shows.",
    true,
  ],
  [
    "A story ends with a mystery unsolved. Which is a creative response that stays true to the characters?",
    "writing a new chapter where the same detective finds the next clue",
    ["writing about a different book", "listing the book's colors", "drawing a random shape"],
    "Build on the characters and events from the story.",
    true,
  ],
  [
    "Which is the most relevant evidence for a report on how bees help farms?",
    "Bees carry pollen that helps fruit and vegetable plants grow.",
    ["Some bees are yellow and black.", "Bees can sting.", "Honey is sticky."],
    "Relevant evidence connects directly to the topic.",
    true,
  ],
  [
    "“Recess should be longer because play helps kids learn.” Which word links the claim to the reason?",
    "because",
    ["should", "longer", "kids"],
    "Look for the word that introduces the reason.",
    true,
  ],
];

const GENRES_AND_CONNECTIONS: Q[] = [
  [
    "A story explains how the sun and moon came to be, with powerful sky beings. What genre is it?",
    "myth",
    ["biography", "news article", "how-to text"],
    "Myths often explain nature with gods or powerful beings.",
  ],
  [
    "A story about a real hero from long ago grows bigger and more amazing with each telling. What genre is it?",
    "legend",
    ["recipe", "science article", "dictionary entry"],
    "Legends are based on real people or events but stretched over time.",
  ],
  [
    "A made-up story takes place during a real event long ago, like a pioneer journey. What genre is it?",
    "historical fiction",
    ["science fiction", "fable", "autobiography"],
    "Historical fiction mixes made-up characters with a real time in the past.",
  ],
  [
    "A story is set on a spaceship in the year 3000. What genre is it?",
    "science fiction",
    ["historical fiction", "biography", "folktale"],
    "Science fiction imagines future science and technology.",
  ],
  [
    "A text gives a writer's opinion about a new library, with reasons. What genre is it?",
    "persuasive essay or opinion piece",
    ["fairy tale", "tall tale", "myth"],
    "Persuasive texts try to convince readers.",
  ],
  [
    "A story passed down by word of mouth for many years, often teaching a lesson, is a…",
    "folktale",
    ["textbook", "news report", "instruction manual"],
    "Folktales are told and retold by people over time.",
  ],
  [
    "Which feature tells you a text is a biography?",
    "It tells the true story of a real person's life.",
    ["It has talking animals.", "It starts with “Once upon a time.”", "It takes place in the future."],
    "Biographies are true life stories.",
  ],
  [
    "Two folktales from different countries both tell of a clever child who outsmarts a giant. What does this show?",
    "Stories from different cultures can share ideas.",
    ["One story copied the other.", "Giants are real.", "Only one country tells stories."],
    "Many cultures tell stories with similar patterns.",
  ],
  [
    "A story set 100 years ago shows children walking miles to school. What can it help you understand?",
    "how life was different in another era",
    ["how to build a car", "what will happen tomorrow", "how to bake bread"],
    "Texts can show life in other times.",
  ],
  [
    "You read a poem about a garden and a science article about plants. How are they connected?",
    "They share a topic but are different genres.",
    ["They are the same genre.", "They have the same author.", "They are both myths."],
    "A topic can appear in many kinds of texts.",
  ],
  [
    "A character moves to a new country and learns a new language. Which connection is text-to-world?",
    "Many families around the world move and learn new languages.",
    ["I moved to a new house once.", "Another book has a character named Ana.", "The book has a blue cover."],
    "Text-to-world links the text to the wider world.",
  ],
  [
    "A story shows how a family celebrates a holiday with special foods. What can readers learn?",
    "about a cultural perspective that may differ from their own",
    ["how to fix a bike", "the rules of soccer", "how volcanoes erupt"],
    "Texts can show how different cultures live and celebrate.",
  ],
  [
    "Which question helps you compare two versions of the same fairy tale?",
    "How are the characters and events alike and different?",
    ["Which book costs more?", "Which cover is shinier?", "Which book is heavier?"],
    "Compare the stories themselves.",
  ],
  [
    "A tall tale says a lumberjack dug a river with his shovel. What feature of the genre is this?",
    "huge exaggeration",
    ["true facts", "a glossary", "a table of contents"],
    "Tall tales stretch the truth for fun.",
  ],
  [
    "A text has an introduction, headings, photos and a glossary. What genre is it most likely?",
    "informational text",
    ["fairy tale", "poem", "play"],
    "These features help readers find facts.",
  ],
  [
    "A character's grandmother tells how she came to this country with one suitcase. A reader thinks of their own grandparent's story. What kind of connection is this?",
    "text-to-self",
    ["text-to-text", "text-to-world", "no connection"],
    "The reader linked the text to their own family.",
  ],
  [
    "Two stories show the theme “honesty matters.” One is a fable and one is realistic fiction. What do they share?",
    "the same theme",
    ["the same genre", "the same setting", "the same characters"],
    "A theme can appear in different genres.",
    true,
  ],
  [
    "A story written long ago uses words like “thee” and “thou.” What does this tell you?",
    "It was written in an earlier era.",
    ["It is science fiction.", "It is a news report.", "It is an instruction manual."],
    "Language changes over time.",
    true,
  ],
  [
    "A myth and a science article both explain thunder. How are they different?",
    "The myth uses a story; the article uses facts.",
    ["They are exactly the same.", "Both use made-up characters.", "Both are poems."],
    "Compare what each genre does.",
    true,
  ],
  [
    "Why might a story about the same event be told differently by people from two cultures?",
    "Each culture brings its own beliefs and experiences.",
    ["One of them must be lying.", "Stories never change.", "Only one culture tells stories."],
    "Perspective shapes how stories are told.",
    true,
  ],
  [
    "Which pair of texts would be best for comparing how life has changed?",
    "a diary from 1900 and a blog post from today",
    ["two recipes for the same cookie", "two maps of the same street", "two copies of the same book"],
    "Pick texts from different eras.",
    true,
  ],
  [
    "A trickster character appears in stories from many cultures, sometimes as a rabbit, a spider or a fox. What genre are these stories usually?",
    "folktales",
    ["biographies", "news articles", "how-to texts"],
    "Trickster tales are passed down over generations.",
    true,
  ],
  [
    "A reader says, “This story about a flood reminds me of a news report I saw.” Which connection is this?",
    "text-to-world",
    ["text-to-self", "text-to-text", "genre-to-genre"],
    "A news event is part of the wider world.",
    true,
  ],
  [
    "Which detail would tell you a story is realistic fiction and not fantasy?",
    "The events could really happen to real people.",
    ["The characters fly on dragons.", "Animals talk and wear clothes.", "Magic spells change the weather."],
    "Realistic fiction could happen in real life.",
    true,
  ],
];

export const CRAFT_UNITS: Unit[] = [
  bankUnit({
    id: "ny-g4-argument-and-evidence",
    title: "Arguments, Evidence and Responses",
    emoji: "⚖️",
    blurb: "Claims, reasons and evidence, using text evidence, and creative responses.",
    parentNote:
      "Your child picks strong claims, reasons and evidence, sees how authors support claims, answers questions with evidence from a text, and chooses creative responses such as a poem, play or artwork.",
    standards: ["4R8; 4W1; 4W4; 4W5", "how claims are supported, writing arguments with reasons and evidence, creative responses and drawing evidence from texts"],
    items: ARGUMENT_AND_EVIDENCE,
  }),
  bankUnit({
    id: "ny-g4-genres-and-connections",
    title: "Genres and Connections",
    emoji: "📚",
    blurb: "Myths, legends, historical fiction and more, and connections across cultures and eras.",
    parentNote:
      "Your child names genres (myth, legend, folktale, tall tale, historical and science fiction, biography, opinion piece) from their features and connects texts to other texts, cultural perspectives, eras and their own lives.",
    standards: ["4R9", "recognizing genres and connecting texts to other texts, ideas, cultures, eras and personal experiences"],
    items: GENRES_AND_CONNECTIONS,
  }),
];
