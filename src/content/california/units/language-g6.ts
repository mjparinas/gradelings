import type { Unit } from "../../types";
import { passage, readingUnit, type R } from "./language-kit";

// California's own Grade 6 English language arts units: citing evidence about stories, poems and scripts (CA CCSS
// RL.6.1, RL.6.2, RL.6.3, RL.6.5, RL.6.7, RL.6.9) and about information texts, with subject words and sentence style
// (RI.6.1, RI.6.2, RI.6.3, RI.6.4, RI.6.9, L.6.3, L.6.6). Every story, poem and passage is original.

const GARDEN = passage(
  "The Rooftop Garden",
  "When Mrs. Alvarez announced the rooftop garden project, Kofi groaned. He hated dirt, he hated bugs, and he especially hated getting up early on Saturdays.",
  "By the third week, though, he was the first one up the stairs. He had named every tomato plant, and he checked the soil with his finger like a farmer.",
  "In June, the class sold their vegetables at the school market. Kofi handed a bag of tomatoes to an elderly neighbor, who smiled and said they reminded her of her childhood farm. Kofi walked home feeling taller than the building.",
);
const RIVER_POEM = passage(
  "River Song",
  "I started as a trickle,\na whisper in the stone,\nI gathered every raindrop\nand never ran alone.",
  "Now I carve the canyon,\nnow I turn the mill,\nfor small things joined together\ncan move a mountain still.",
);
const PLAY_SCENE = passage(
  "Scene 3 (from a play)",
  "(The lights dim. JUNO stands alone at center stage, holding a cracked trophy.)",
  "JUNO: (quietly) Second place. After everything.",
  "(Her little brother ENZO runs in and hugs her.)",
  "ENZO: You're still first place to me!",
  "(JUNO laughs and sets the trophy down gently. Lights rise.)",
);
const CHAPTER = passage(
  "Chapter 1, Opening",
  "The letter arrived on the hottest day of August, sealed with green wax and addressed to someone who had not lived in our house for fifty years.",
);
const HIST_NOVEL = passage(
  "From a Historical Novel",
  "In 1849, Tomas left his village with only a shovel and a promise to send money home. The gold fields were crowded and cruel, but he kept going for his family.",
);
const FANTASY = passage(
  "From a Fantasy Story",
  "Ryn carried the last ember of the dragon-fire across the frozen kingdom. Her hands burned with cold, but she did not stop, because her village would freeze without it.",
);

const STORY_EVIDENCE: R[] = [
  [GARDEN, "Which detail best supports the idea that Kofi disliked the project at first?", "Kofi groaned.", ["He had named every tomato plant.", "He was the first one up the stairs.", "He handed a bag of tomatoes to a neighbor."], "Look at the first paragraph."],
  [GARDEN, "Which detail best shows that Kofi's attitude changed?", "By the third week, though, he was the first one up the stairs.", ["He hated getting up early on Saturdays.", "Mrs. Alvarez announced the project.", "Kofi groaned."], "Find the moment he acts differently."],
  [GARDEN, "What theme does the story develop?", "Trying something new can lead to unexpected pride and connection.", ["Gardening is always hard work.", "Teachers should not assign projects.", "Tomatoes grow best on rooftops."], "Think about how Kofi feels at the end and why."],
  [GARDEN, "What does “feeling taller than the building” suggest?", "Kofi felt very proud.", ["Kofi grew a lot that summer.", "The building was short.", "Kofi was standing on the roof."], "This is figurative, not literal."],
  [GARDEN, "Which is the best objective summary?", "Kofi dislikes a class garden project, grows to love it and feels proud when he shares the harvest with a neighbor.", ["Kofi is lazy and should have tried harder from the start.", "The rooftop garden was the best project ever.", "Mrs. Alvarez is a great teacher."], "An objective summary leaves out opinions."],
  [GARDEN, "How does the plot unfold?", "It moves through episodes: Kofi resists, then grows involved, then shares the harvest.", ["It starts at the end and moves backward.", "It is told as a list of facts.", "Nothing changes from start to end."], "Look at what happens in each paragraph."],
  [GARDEN, "How does the neighbor's comment contribute to the story?", "It shows Kofi that his work matters to others, completing his change.", ["It introduces a new problem.", "It shows the garden failed.", "It explains how to grow tomatoes."], "Why does Kofi feel taller after it?"],
  [RIVER_POEM, "How does the second stanza fit the structure of the poem?", "It shows what the small trickle grows into, leading to the theme.", ["It repeats the first stanza exactly.", "It introduces a new speaker.", "It describes a different river."], "Compare the river in stanza 1 and stanza 2."],
  [RIVER_POEM, "Which line best states the poem's theme?", "for small things joined together / can move a mountain still", ["I started as a trickle", "now I turn the mill", "a whisper in the stone"], "Look for the lesson in the last lines."],
  [RIVER_POEM, "Who is the speaker of the poem?", "the river", ["a mountain", "a farmer", "a raindrop"], "The speaker says “I started as a trickle.”"],
  [PLAY_SCENE, "How does Scene 3 contribute to the play?", "It shows Juno's disappointment turning to comfort, a turning point in her feelings.", ["It introduces the setting for the first time.", "It explains the rules of the contest.", "It shows Juno winning first place."], "How does Juno feel at the start and end of the scene?"],
  [PLAY_SCENE, "Why do the stage directions say the lights dim and then rise?", "to match Juno's mood going from low to hopeful", ["because the theater lost power", "to show it is night", "to end the play"], "Lighting can show feeling."],
  [PLAY_SCENE, "When you watch this scene performed instead of reading it, what can you experience that the script only describes?", "the actor's quiet voice and Enzo running in", ["the stage directions in parentheses", "the scene number", "the character names in capitals"], "A performance shows what a script only tells."],
  [PLAY_SCENE, "When you read the script, what do you get that a viewer might miss?", "the exact stage directions, such as (quietly)", ["the sound of Enzo's voice", "the color of the lights", "the size of the stage"], "Readers see the directions in the text."],
  [CHAPTER, "Why does the author open the chapter with this sentence?", "to create mystery that hooks the reader", ["to explain the ending", "to describe the weather report", "to list the characters"], "A letter for someone who left fifty years ago raises questions."],
  [CHAPTER, "Which detail creates the most mystery?", "addressed to someone who had not lived in our house for fifty years", ["the hottest day of August", "The letter arrived", "sealed with green wax"], "Which detail makes you wonder most?"],
  [HIST_NOVEL, "How are the historical novel and the fantasy story alike?", "Both show a character enduring hardship for their family or village.", ["Both have dragons.", "Both take place in 1849.", "Both are true stories."], "Compare what Tomas and Ryn do and why."],
  [FANTASY, "How does the fantasy story approach the theme differently from the historical novel?", "It uses magic and an imagined kingdom instead of a real time and place.", ["It is set during the Gold Rush.", "It has no main character.", "It has a different theme about money."], "Compare the settings."],
  [HIST_NOVEL, "Which detail makes the historical novel feel tied to real history?", "In 1849", ["a promise", "his village", "his family"], "Historical fiction uses a real time."],
  [null, "A story and a poem both explore loneliness. What would you compare?", "how each one shows loneliness through its form and details", ["which one is longer", "which has more rhymes", "which has a better cover"], "Compare approaches to the same theme."],
  [null, "Which is the best evidence to support a claim about a character?", "a direct quotation from the text", ["your guess about the author", "a friend's opinion", "the book's price"], "Evidence comes from the text itself."],
  [null, "When you infer, you…", "use text clues and what you know to figure out something not stated", ["copy the first sentence", "skip to the end", "guess without clues"], "Inferences are supported by evidence."],
  [null, "What is a resolution in a plot?", "how the conflict is settled at the end", ["the opening scene", "the first problem", "the setting"], "Resolve means settle."],
  [GARDEN, "How did Kofi respond to the challenge of the project over time?", "He went from complaining to caring for the plants like a farmer.", ["He quit the project.", "He kept complaining until the end.", "He traded jobs with a classmate."], "Trace his actions across the paragraphs."],
  [RIVER_POEM, "Which detail from stanza 1 sets up the theme in stanza 2?", "I gathered every raindrop / and never ran alone", ["now I carve the canyon", "now I turn the mill", "can move a mountain still"], "The river grows by joining with others.", true],
  [PLAY_SCENE, "What does setting down the trophy “gently” suggest about Juno?", "She accepts the result and feels comforted.", ["She is angry and wants to break it.", "She is about to leave forever.", "She is going to sleep."], "Think about how the scene ends.", true],
  [GARDEN, "Which sentence would NOT belong in an objective summary?", "Kofi was silly to complain at the start.", ["Kofi joined a rooftop garden project.", "The class sold vegetables in June.", "Kofi came to enjoy the work."], "Summaries leave out personal judgments.", true],
  [FANTASY, "Which quotation shows Ryn's determination?", "she did not stop", ["the frozen kingdom", "the last ember", "her hands burned with cold"], "Which words show she keeps going?", true],
];

const BIKE_MEMOIR = passage(
  "Text A: My First Ride (a memoir)",
  "My father ran beside me down the dusty street, one hand on the back of the seat. I felt the bike wobble and shouted for him not to let go.",
  "When I looked back, he was standing far behind me, waving. He had let go a whole block earlier.",
);
const BIKE_HISTORY = passage(
  "Text B: The Bicycle Boom",
  "In the 1890s, bicycles became wildly popular across the country. They gave people, especially women, a new freedom to travel on their own.",
  "Cities paved more roads, and bicycle clubs pushed for better streets, which later helped cars too.",
);
const SLEEP = passage(
  "Why Teens Need Sleep",
  "Teenagers need eight to ten hours of sleep a night, but many get far less. Sleep is when the brain sorts and stores what we learned during the day.",
  "One study found that students who slept more scored higher on memory tests. Another found that tired students were more likely to feel stressed.",
  "Small changes help: a regular bedtime, no screens for an hour before sleep and a cool, dark room.",
);
const CORAL = passage(
  "Coral Reefs",
  "A coral reef is often called the rainforest of the sea. Although reefs cover less than one percent of the ocean floor, they shelter about a quarter of all ocean species.",
  "Reefs are built by tiny animals called polyps. Warmer ocean water can cause bleaching, when corals lose the algae that feed them and turn white.",
);
const INVENTOR = passage(
  "The Engineer Who Kept Asking Why",
  "As a girl, Ada took apart clocks to see how they worked. Her teachers said she asked too many questions.",
  "Years later, those questions led her to design a water filter that cleaned river water for a whole town. When people asked her secret, she said, “I never stopped asking why.”",
);

const INFO_EVIDENCE: R[] = [
  [SLEEP, "What is the central idea of the passage?", "Teens need more sleep, and simple habits can help them get it.", ["Memory tests are hard.", "Screens are bad.", "Dark rooms are scary."], "Look at what all three paragraphs add up to."],
  [SLEEP, "Which evidence best supports the idea that sleep helps learning?", "Students who slept more scored higher on memory tests.", ["Teens need eight to ten hours.", "A cool, dark room helps.", "Many teens get far less sleep."], "Find a study about learning."],
  [SLEEP, "Which is the best objective summary?", "Teens need eight to ten hours of sleep, which helps memory and mood, and regular habits can help.", ["Teens are lazy about sleep.", "Everyone should sleep twelve hours.", "I think bedtime rules are unfair."], "Summaries keep the main ideas and leave out opinions."],
  [SLEEP, "How does the author develop the idea that sleep matters?", "with research findings followed by practical tips", ["with a story about a dragon", "with a list of sleep jokes", "with a poem"], "Look at what each paragraph adds."],
  [CORAL, "Why does the author call a coral reef “the rainforest of the sea”?", "Both hold a huge variety of living things.", ["Both are full of trees.", "Both are very rainy.", "Both are on land."], "This is a figurative comparison."],
  [CORAL, "What is the technical meaning of “bleaching” in this passage?", "corals losing their algae and turning white", ["using soap on coral", "the sun drying out sand", "fish changing color"], "The sentence explains it right after the word."],
  [CORAL, "Which quotation best supports the claim that reefs are important?", "they shelter about a quarter of all ocean species", ["Reefs are built by tiny animals called polyps.", "Warmer ocean water can cause bleaching.", "less than one percent of the ocean floor"], "Which fact shows how much life depends on reefs?"],
  [CORAL, "What does “shelter” mean in this passage?", "provide a home and protection for", ["hide from", "build walls around", "feed on"], "Reefs are home to many species."],
  [INVENTOR, "How does the author introduce Ada?", "with an anecdote about taking apart clocks as a girl", ["with a list of her awards", "with a quotation from a teacher", "with a map of her town"], "Look at the first paragraph."],
  [INVENTOR, "How does the anecdote about clocks help develop the main idea?", "It shows her curiosity began early and led to her invention.", ["It explains how clocks work.", "It shows she disliked school.", "It is not connected to the main idea."], "Connect the beginning to the end."],
  [INVENTOR, "Which quotation sums up the key idea about Ada?", "“I never stopped asking why.”", ["Her teachers said she asked too many questions.", "a water filter", "for a whole town"], "Look for her own words."],
  [BIKE_MEMOIR, "How is Text A's presentation different from Text B's?", "Text A tells one personal experience; Text B gives history about many people.", ["Text A uses statistics; Text B tells a story.", "Both are memoirs.", "Text B is told in first person."], "Who is telling each text, and what is its focus?"],
  [BIKE_HISTORY, "Which idea is found in Text B but not Text A?", "Bicycles gave women new freedom to travel.", ["A father taught his child to ride.", "The bike wobbled.", "The father let go."], "Look at Text B's first paragraph."],
  [BIKE_HISTORY, "How did bicycle clubs affect later travel?", "Their push for better roads later helped cars.", ["They banned cars.", "They built railroads.", "They made bikes cheaper."], "Read the last sentence of Text B."],
  [BIKE_MEMOIR, "What feeling does the memoir convey that the history text does not?", "the personal thrill of learning to ride", ["the number of bikes sold", "the date of the bicycle boom", "the rules of bicycle clubs"], "Memoirs share personal feelings."],
  [null, "In a science text, “hypothesis” means…", "a testable prediction", ["a final answer", "a list of materials", "a type of graph"], "Scientists test a hypothesis in an experiment."],
  [null, "In a history text, “primary source” means…", "a document or object made at the time being studied", ["the most important book", "a modern summary", "a textbook chapter"], "Primary sources come from the time itself."],
  [null, "In a math text, “ratio” means…", "a comparison of two quantities", ["a type of angle", "a large number", "a shape with six sides"], "3 to 2 is a ratio."],
  [null, "Which word is a general academic word you might see in any subject?", "analyze", ["photosynthesis", "isotope", "denominator"], "General academic words are used across subjects."],
  [null, "Which revision varies sentence patterns best? “I woke up. I ate. I left.”", "After a quick breakfast, I grabbed my bag and left.", ["I woke up. I ate. I left. I ran.", "I woke up I ate I left.", "Woke. Ate. Left."], "Combine and vary how sentences start."],
  [null, "A report is written in a serious tone. Which sentence keeps the tone consistent?", "The data show a clear increase in rainfall.", ["Whoa, it rained a ton, haha!", "Rain is so annoying, ugh.", "LOL more rain."], "Keep the same formal style throughout."],
  [null, "Why might a writer use a very short sentence after several long ones?", "to make an important point stand out", ["to fix a spelling mistake", "to add a footnote", "to make the paragraph longer"], "Contrast in length draws attention."],
  [null, "Which sentence begins with a phrase to add variety?", "Under the bridge, a heron waited for fish.", ["A heron waited under the bridge for fish.", "The heron waited.", "Heron waits."], "Starting with a phrase changes the pattern."],
  [SLEEP, "Which quotation explains why sleep helps the brain?", "Sleep is when the brain sorts and stores what we learned during the day.", ["Teenagers need eight to ten hours.", "a cool, dark room", "Small changes help"], "Look for a sentence that explains how sleep works."],
  [CORAL, "How does the second paragraph develop the topic?", "It explains how reefs are built and what threatens them.", ["It compares reefs to forests.", "It lists the names of fish.", "It tells a story about a diver."], "Look at the main points of paragraph 2.", true],
  [BIKE_HISTORY, "Combine the two texts. What does the memoir show about the freedom described in Text B?", "how it feels to ride off on your own for the first time", ["how many roads were paved", "how clubs were organized", "how cars were invented"], "Text A shows freedom from one person's view.", true],
  [INVENTOR, "What is the connotation of “asked too many questions” in the teachers' view?", "negative, as if it were a problem", ["positive, as if it were a gift", "neutral, just a fact", "funny, as a joke"], "How did the teachers see her questions?", true],
  [null, "In a technical text, “efficient” means…", "doing the job with little wasted energy or time", ["very expensive", "very large", "easy to break"], "An efficient machine wastes little.", true],
];

export const STORY_EVIDENCE_6: Unit = readingUnit({
  id: "ca-g6-story-evidence",
  title: "Story Evidence",
  emoji: "🔦",
  blurb: "Evidence, theme and structure.",
  parentNote:
    "Your child cites evidence about stories, poems and play scenes, finds themes and writes objective summaries, follows how a plot unfolds and a character changes, explains how one scene or stanza fits the whole, compares reading a script with watching it performed, and compares genres with a similar theme.",
  standards: [
    "RL.6.1; RL.6.2; RL.6.3; RL.6.5; RL.6.7; RL.6.9",
    "citing evidence, theme and objective summary, plot and character change, how a part fits the whole, reading versus watching, and comparing genres",
  ],
  items: STORY_EVIDENCE,
});

export const INFO_EVIDENCE_6: Unit = readingUnit({
  id: "ca-g6-info-evidence",
  title: "Information Evidence",
  emoji: "🧪",
  blurb: "Central ideas, word meanings and style.",
  parentNote:
    "Your child cites evidence from information texts, finds central ideas and summarizes objectively, sees how an author introduces and develops an idea with examples and anecdotes, works out figurative and technical meanings, compares a memoir with a history text, learns subject words and varies sentence style.",
  standards: [
    "RI.6.1; RI.6.2; RI.6.3; RI.6.4; RI.6.9; L.6.3; L.6.6",
    "citing evidence, central ideas and summaries, how ideas are developed, word meanings, comparing two authors' presentations, varying sentences and subject words",
  ],
  items: INFO_EVIDENCE,
});

export const LANGUAGE_6: Unit[] = [STORY_EVIDENCE_6, INFO_EVIDENCE_6];
