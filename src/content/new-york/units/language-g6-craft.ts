import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// More of New York's own Grade 6 language units (`ny-` ids), added to ./language-g6. No shared unit New York can use
// practises 6R1 (citing evidence for inferences), 6R2 (theme or central idea and how it develops; summary), 6R3 (how
// plots unfold and characters change; how ideas are introduced and developed), 6W3 (narrative technique), 6W4 (a
// creative response) or 6W5 (evidence for analysis and reflection), so these banks do. Every passage is original.

const READ_CLOSELY: Q[] = [
  [
    "“Dev glanced at the clock for the fifth time, his pencil still hovering over a blank page.” What can you infer?",
    "Dev is stuck and worried about running out of time.",
    ["Dev has finished his work.", "Dev cannot tell time.", "Dev is asleep."],
    "Combine the clues: the clock and the blank page.",
  ],
  [
    "Which quotation best supports the inference that Mara misses her old home?",
    "“Mara kept her old house key on a string around her neck.”",
    ["“Mara walked to her new school.”", "“The new house had blue shutters.”", "“Mara liked math.”"],
    "Pick the detail that shows a feeling about the old home.",
  ],
  [
    "“The coach praised the team, but she didn't look at Lia once.” What does the text imply?",
    "Lia may feel left out or worried about the coach's opinion.",
    ["Lia is the coach.", "The team lost badly.", "Lia scored every goal."],
    "Implied meaning comes from what is not said directly.",
  ],
  [
    "What does it mean to cite textual evidence?",
    "to point to specific words or details from the text that support your idea",
    ["to give your opinion without reasons", "to retell the whole story", "to copy the title"],
    "Evidence comes from the text itself.",
  ],
  [
    "Which statement is explicitly stated, not inferred? Text: “The river rose three feet overnight.”",
    "The river rose three feet.",
    ["The town was scared.", "It rained all night.", "The bridge was closed."],
    "Explicit means the text says it directly.",
  ],
  [
    "A story begins with a selfish boy who won't share his telescope and ends with him hosting a stargazing night. Which theme develops?",
    "Sharing what you love can bring joy to you and others.",
    ["Telescopes are expensive.", "Stars are far away.", "Never trust neighbors."],
    "Trace how the character changes across the story.",
  ],
  [
    "Which detail from the middle of the story best develops the theme “kindness spreads”?",
    "After Sam helped the new student, she later helped someone else.",
    ["The school had a new roof.", "Sam's backpack was green.", "Lunch was at noon."],
    "Find the detail that shows the theme growing.",
  ],
  [
    "Which is the best objective summary of an article about a town that switched to solar power?",
    "The town installed solar panels, cut its energy costs and inspired nearby towns to follow.",
    ["I think solar power is the best idea ever.", "The town is very sunny and pretty.", "Solar panels are blue."],
    "An objective summary leaves out opinions.",
  ],
  [
    "How does a central idea usually develop in an informational article?",
    "Each section adds facts and examples that build the main point.",
    ["It appears only in the title.", "It changes to a new topic each paragraph.", "It is never explained."],
    "Supporting details develop the central idea.",
  ],
  [
    "In a story, Rae is too proud to ask for help. After failing alone, she asks a friend and succeeds. How does Rae change?",
    "She learns that asking for help is a strength.",
    ["She becomes more proud.", "She stops having friends.", "She does not change."],
    "Compare her at the start and the end.",
  ],
  [
    "What is the rising action in a story about a hiker lost in fog?",
    "the hiker's attempts to find the trail as the fog thickens",
    ["the hiker's safe return home", "the description of the hiker's car", "the title of the story"],
    "Rising action is the events that build toward the climax.",
  ],
  [
    "How does the climax affect the main character in most stories?",
    "It forces a decision or change at the turning point.",
    ["It introduces the setting.", "It lists the characters.", "It happens before the problem."],
    "The climax is the turning point.",
  ],
  [
    "An article introduces a scientist, then describes her experiment, then explains what changed because of it. How are the ideas developed?",
    "by following one person's work from start to result",
    ["by listing unrelated facts", "by comparing two cities", "by telling a fairy tale"],
    "Notice the order the ideas are introduced and linked.",
  ],
  [
    "An article introduces a problem (plastic waste), then a person who invented a solution. How are the two related?",
    "The person's invention responds to the problem.",
    ["They have nothing to do with each other.", "The person caused the problem.", "The problem is made up."],
    "Look at how the ideas connect.",
  ],
  [
    "Which question helps you find a theme?",
    "What lesson does the main character learn?",
    ["How many pages does the book have?", "What color is the cover?", "Who published the book?"],
    "Themes are lessons or messages.",
  ],
  [
    "“The old oak had shaded the schoolyard for a hundred years. When it fell, the students planted ten saplings.” What theme is suggested?",
    "Loss can lead to new beginnings.",
    ["Trees are dangerous.", "Schools should not have yards.", "Nothing ever changes."],
    "Think about what follows the loss.",
    true,
  ],
  [
    "Which sentence best explains how evidence supports an inference?",
    "Because Kim hides the broken vase, readers can infer she fears getting in trouble.",
    ["Kim has a vase.", "The vase is blue.", "I would not hide a vase."],
    "Connect the evidence to the inference with an explanation.",
    true,
  ],
  [
    "A character responds to every setback with a joke. In the end, she finally admits she is upset. What does this change show?",
    "She learns to face her feelings honestly.",
    ["She stops speaking.", "She becomes more of a joker.", "She leaves the story."],
    "Look at how her response at the end differs.",
    true,
  ],
  [
    "Which piece of evidence is strongest for the claim that the narrator is unreliable?",
    "He says he never lies, then is caught in three lies.",
    ["He has a brother.", "He lives on a farm.", "He likes to read."],
    "Strong evidence directly proves the claim.",
    true,
  ],
  [
    "How does an author introduce and develop an important idea in a biography?",
    "with events and quotations that show how the person's work grew over time",
    ["with only a list of dates", "with a made-up villain", "with no details at all"],
    "Look for anecdotes and examples that build the idea.",
    true,
  ],
  [
    "Which summary includes too much opinion?",
    "This silly story is about a boy who wastes his time on a pointless trip.",
    ["A boy travels to find his lost dog.", "A boy searches for his dog and finds it at the shelter.", "A boy and his dog are reunited after a long search."],
    "An objective summary avoids judging words.",
    true,
  ],
  [
    "In a story, each time Omar visits his grandmother, he learns another family recipe. By the end, he cooks for the whole family. How do the events build?",
    "Each visit adds a skill that leads to the final scene.",
    ["The events are in random order.", "Each visit repeats exactly.", "The ending has nothing to do with the visits."],
    "Notice how events build on each other.",
    true,
  ],
  [
    "Which detail most clearly develops the central idea “Wetlands protect towns from floods”?",
    "Wetlands soak up heavy rain like a sponge and release it slowly.",
    ["Herons nest in wetlands.", "Wetlands can smell muddy.", "Some wetlands have walking paths."],
    "Choose the detail that explains the central idea.",
    true,
  ],
  [
    "“Jaya kept her trophy in a drawer, not on the shelf.” What might readers infer?",
    "Jaya is modest or has mixed feelings about winning.",
    ["Jaya lost the trophy.", "Jaya has no drawers.", "Jaya wants everyone to see it."],
    "Think about why someone might hide a prize.",
    true,
  ],
];

const WRITING_CRAFT: Q[] = [
  [
    "Which opening best engages the reader and sets up a point of view?",
    "I never meant to start a food fight, but there I was, holding a dripping spoonful of pudding.",
    ["This is a story about a cafeteria.", "Cafeterias serve lunch.", "Once there was a food fight."],
    "A strong opening hooks the reader and introduces the narrator.",
  ],
  [
    "Which sentence uses dialogue to move the plot forward?",
    "“The bridge is out,” Lena said. “We'll have to cross the river another way.”",
    ["“Hello,” said Lena.", "“It's a nice day,” said Lena.", "“I like blue,” said Lena."],
    "Useful dialogue reveals a problem or decision.",
  ],
  [
    "Which technique slows the pace to build tension?",
    "describing each small sound and movement just before the big moment",
    ["skipping ahead to the next day", "listing what everyone ate", "repeating the title"],
    "Slowing down makes readers wait and wonder.",
  ],
  [
    "Which transition signals a shift in setting?",
    "Meanwhile, across town,",
    ["For example,", "In conclusion,", "However,"],
    "Some transitions move the reader to a new place.",
  ],
  [
    "Which detail uses precise, sensory language?",
    "The bakery smelled of warm cinnamon, and the floor was dusted with flour.",
    ["The bakery was nice.", "We went to a bakery.", "It was a good place."],
    "Use the five senses to bring a scene to life.",
  ],
  [
    "Which ending reflects on what the narrator learned?",
    "Looking back, I realized the race wasn't about winning; it was about not quitting.",
    ["Then I went home.", "The race was on Saturday.", "There were many runners."],
    "A reflective ending shows growth.",
  ],
  [
    "Which revision shows the character's feelings through action?",
    "Theo crumpled the letter and stared out the window for a long time.",
    ["Theo was very sad.", "Theo felt bad.", "Theo had a letter."],
    "Show, don't just tell.",
  ],
  [
    "Which choice best keeps events in a logical sequence?",
    "using transitions like “at first,” “soon,” and “by evening”",
    ["putting the ending first with no signal", "skipping all transitions", "listing events in random order"],
    "Clear transitions help readers follow time.",
  ],
  [
    "After reading a myth about why the seasons change, which is a creative response?",
    "writing your own myth that explains why it rains",
    ["copying the myth word for word", "listing the myth's page numbers", "drawing a random shape"],
    "A response can use the same genre in a new way.",
  ],
  [
    "Your class reads a poem about a grandfather's hands. Which response explores its theme?",
    "a short memoir about what you learned from an older relative",
    ["a list of hand tools", "a math problem", "a weather report"],
    "Connect the poem's theme to your own experience.",
  ],
  [
    "You turn a short story into a graphic novel page. What must you decide?",
    "which moments to show in panels and what words go in speech bubbles",
    ["the page numbers of the original", "the author's birthday", "the price of the story"],
    "Turning a text into art means choosing key moments.",
  ],
  [
    "A prompt asks, “How does the author show that Kira is brave?” Which response uses evidence well?",
    "Kira steps forward to speak when others stay silent, which shows her courage.",
    ["Kira is brave because I think so.", "I am brave too.", "Bravery is good."],
    "Support your analysis with a specific detail.",
  ],
  [
    "Which sentence best introduces a quotation in an analysis?",
    "When the narrator says “the house held its breath,” the author creates a tense, quiet mood.",
    ["Quote: “the house held its breath.”", "Here is a sentence from the story.", "The story has quotes."],
    "Frame the quote and explain its effect.",
  ],
  [
    "Which is the best evidence for a reflection on how a novel connects to your life?",
    "a specific scene that matches something you experienced, and an explanation of why",
    ["a list of the novel's chapter titles", "the color of the book cover", "the number of characters"],
    "Reflection links text evidence to your own experience.",
  ],
  [
    "Which evidence best supports research on why honeybee numbers are falling?",
    "A science article reports that pesticides and habitat loss harm bee colonies.",
    ["A cartoon shows a happy bee.", "My friend dislikes bees.", "Honey tastes sweet."],
    "Research evidence should come from reliable sources.",
  ],
  [
    "Which narrative technique lets readers know something a character does not?",
    "dramatic irony",
    ["a glossary", "an index", "a heading"],
    "When readers know more than characters, it's dramatic irony.",
    true,
  ],
  [
    "Which revision makes the dialogue more natural?",
    "“Are you coming?” Jo asked. “The bus leaves in five.”",
    ["“I am asking if you are coming to the bus, which leaves in five minutes,” said Jo.", "“Coming bus five,” said Jo.", "Jo said a sentence about the bus."],
    "Real people speak in short, natural bursts.",
    true,
  ],
  [
    "A writer wants readers to feel the character's panic. Which sentence works best?",
    "My heart pounded. Where was she? The crowd swallowed every face.",
    ["I was panicking a lot.", "The crowd was big.", "I looked for my sister in the crowd that was big."],
    "Short sentences and strong images build feeling.",
    true,
  ],
  [
    "You rewrite a fairy tale from the villain's point of view. What makes this a strong response?",
    "It keeps the main events but shows them in a new light.",
    ["It changes every name and nothing else.", "It copies the original exactly.", "It removes all the events."],
    "Retelling from a new angle shows understanding.",
    true,
  ],
  [
    "Which analysis uses evidence from two texts?",
    "Both the article and the poem describe the city as noisy, but only the poem finds beauty in the noise.",
    ["I like the article more than the poem.", "The poem has four stanzas.", "The article is long."],
    "Compare specific details from each text.",
    true,
  ],
  [
    "Which detail best adds to a story's setting at the start?",
    "Snow piled against the cabin door as the last light faded behind the pines.",
    ["It was a place.", "The story happened.", "There was weather."],
    "Setting details tell where and when, and set a mood.",
    true,
  ],
  [
    "Which is the strongest reason to include a quotation in a reflection?",
    "It shows exactly which words in the text affected your thinking.",
    ["It makes the reflection longer.", "It replaces your own ideas.", "It hides your opinion."],
    "Evidence makes your reflection specific.",
    true,
  ],
  [
    "A story's events are told out of order to keep a secret until the end. What technique is this?",
    "withholding information to build suspense",
    ["listing facts in a table", "writing a glossary", "using headings"],
    "Writers sometimes delay information on purpose.",
    true,
  ],
  [
    "Which conclusion best ties a narrative to its theme of courage?",
    "As the applause faded, Ana knew the shaking in her knees had been worth it.",
    ["The show ended at nine.", "Ana took the bus home.", "The auditorium was full."],
    "Connect the ending back to the theme.",
    true,
  ],
];

export const CRAFT_UNITS: Unit[] = [
  bankUnit({
    id: "ny-g6-read-closely",
    title: "Read Closely: Evidence, Theme and Change",
    emoji: "🔍",
    blurb: "Cite evidence, trace a theme, summarize and follow how characters and ideas develop.",
    parentNote:
      "Your child picks the evidence that supports an inference, tells explicit from implied meaning, traces how a theme or central idea develops, writes objective summaries and follows how plots unfold, characters change and ideas are introduced and connected.",
    standards: ["6R1; 6R2; 6R3", "citing evidence for inferences, how a theme or central idea develops, summarizing, and how plots and ideas unfold"],
    items: READ_CLOSELY,
  }),
  bankUnit({
    id: "ny-g6-writing-craft",
    title: "Stories, Responses and Evidence",
    emoji: "✏️",
    blurb: "Narrative technique, creative responses and using evidence to analyze and reflect.",
    parentNote:
      "Your child chooses narrative techniques (openings, dialogue, pacing, transitions, sensory details, reflective endings), creative responses to texts, and evidence that supports analysis, reflection and research.",
    standards: ["6W3; 6W4; 6W5", "narrative technique, creative responses to texts, and drawing evidence for analysis, reflection and research"],
    items: WRITING_CRAFT,
  }),
];
