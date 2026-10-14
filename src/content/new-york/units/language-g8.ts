import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// New York's own Grade 8 language units (`ny-` ids). No shared unit New York can use practises 8R3 (how dialogue and
// events propel action and reveal character; how ideas are introduced and developed), 8R9 (choosing criteria to judge
// texts and connecting them), 8W1 (arguments with reasons and evidence), 8W3 (narrative technique), 8W4 (a creative
// response that explains its changes) or 8W5 (evidence for analysis, reflection and research), so these banks do.
// Every passage is original.

const DIALOGUE_EVENTS_AND_CRITERIA: Q[] = [
  [
    "“I'm not going,” Raj said. “Not unless you tell me the truth.” What does this line do in the story?",
    "It raises the conflict and forces the other character to decide.",
    ["It describes the setting.", "It ends the story.", "It lists the characters."],
    "Dialogue can push characters toward a choice.",
  ],
  [
    "When Lena finds the torn map, she decides to search the cave alone. How does this event affect the plot?",
    "It moves the action forward and puts her in danger.",
    ["It stops all the action.", "It explains the title.", "It has no effect on the story."],
    "Key events propel the plot.",
  ],
  [
    "“Fine, take the trophy. I never needed it,” Mia said, her voice cracking. What does the line reveal?",
    "Mia cares more than she admits.",
    ["Mia has never seen a trophy.", "Mia is happy to lose.", "Mia is talking about the weather."],
    "Notice the difference between her words and her voice.",
  ],
  [
    "A character always answers questions with jokes. In the last chapter, he answers seriously. What does this reveal?",
    "He has changed and is ready to be honest.",
    ["He forgot how to joke.", "He is a different character.", "Nothing has changed."],
    "A change in how someone speaks can reveal growth.",
  ],
  [
    "Which line of dialogue best provokes a decision?",
    "“If you leave now, don't bother coming back.”",
    ["“Nice weather today.”", "“Did you eat breakfast?”", "“The bus is yellow.”"],
    "Look for a line that forces a choice.",
  ],
  [
    "An article introduces a problem, gives a scientist's discovery, then explains how cities used it. How are the ideas developed?",
    "Each idea leads to and builds on the next.",
    ["The ideas are unrelated.", "The ending comes first.", "The article repeats one fact."],
    "Notice how the author links ideas.",
  ],
  [
    "In a biography, an early failure is described before a later success. Why might the author include the failure?",
    "to show how the person learned and grew",
    ["to make the book shorter", "to confuse readers", "to change the topic"],
    "Events are chosen to develop an idea about the person.",
  ],
  [
    "A character overhears a secret in chapter 2. In chapter 8, she uses it to save her friend. How does the earlier event matter?",
    "It sets up a later turning point.",
    ["It is never mentioned again.", "It is a mistake by the author.", "It describes the weather."],
    "Earlier events can pay off later.",
  ],
  [
    "Which criterion best helps judge the quality of an argument essay?",
    "Is the evidence relevant, sufficient and clearly explained?",
    ["Is the essay printed on colored paper?", "Is the title very long?", "Does it use the most big words?"],
    "Criteria should fit the purpose of the text.",
  ],
  [
    "You are choosing criteria for judging a memoir. Which set fits best?",
    "honest voice, vivid details and meaningful reflection",
    ["number of charts, graphs and tables", "price, weight and cover color", "the author's height and age"],
    "Match criteria to what makes the genre strong.",
  ],
  [
    "Two short stories have the same plot. One has flat characters; the other has characters with clear motives. Which judgment is fair?",
    "The second is stronger because its characters are more developed.",
    ["Both are equally strong.", "The first is stronger because its characters are simpler.", "Stories cannot be compared."],
    "Developed characters are a mark of quality.",
  ],
  [
    "A novel about a family farm in the 1930s connects best to which modern issue?",
    "families today facing drought and rising costs",
    ["the rules of a video game", "the latest phone release", "how to bake bread"],
    "Look for shared ideas across eras.",
  ],
  [
    "A poem written by a refugee and a news article about refugees are read together. What does the poem add?",
    "a personal, emotional perspective",
    ["exact statistics", "a map of borders", "a list of laws"],
    "Different genres offer different perspectives.",
  ],
  [
    "Which question helps you make a connection across cultures?",
    "How might someone from another culture see this event differently?",
    ["What font is the text in?", "How many pages is it?", "What color is the cover?"],
    "Think about other cultural perspectives.",
  ],
  [
    "Which event is most likely the inciting incident?",
    "A mysterious letter arrives, inviting the twins to a house they've never heard of.",
    ["The twins eat breakfast.", "The twins describe their room.", "The twins brush their teeth."],
    "The inciting incident starts the main conflict.",
  ],
  [
    "“You always do this,” Ana snapped. Why might the author use the word “snapped” instead of “said”?",
    "to show Ana's anger and raise tension",
    ["to show Ana is sleepy", "to describe a camera", "to end the chapter"],
    "Dialogue tags reveal how lines are spoken.",
  ],
  [
    "In a play, a quiet servant finally speaks up to the king. What does this moment most likely reveal?",
    "The servant's courage and a shift in power",
    ["the servant's favorite food", "the time of day", "the king's age"],
    "A character's first bold words can reveal character and change the plot.",
    true,
  ],
  [
    "A mystery novel reveals a clue in an argument between two suspects. How does the dialogue function?",
    "It advances the plot and reveals the suspects' motives.",
    ["It only describes the room.", "It stops the plot.", "It has no purpose."],
    "Dialogue can do several jobs at once.",
    true,
  ],
  [
    "You develop your own criteria to judge a documentary. Which criterion is most important?",
    "Does it present accurate information from credible sources?",
    ["Does it have dramatic music?", "Is it longer than two hours?", "Are the narrators famous?"],
    "Accuracy matters most in nonfiction.",
    true,
  ],
  [
    "Two texts from different centuries both question whether progress is always good. What connection can you draw?",
    "The worry about change and progress lasts across eras.",
    ["People in the past never worried about change.", "The texts have the same author.", "Progress is not a topic in writing."],
    "Big ideas often reappear across time.",
    true,
  ],
  [
    "How does an author's choice to reveal a character's past slowly through conversations affect the reader?",
    "It builds curiosity and lets readers piece together who the character is.",
    ["It makes readers stop reading.", "It tells everything at once.", "It removes all suspense."],
    "Gradual reveals keep readers engaged.",
    true,
  ],
  [
    "A text explains how a small protest grew into a national movement. Which structure shows how ideas developed?",
    "a sequence of events showing cause and effect",
    ["a random list of dates", "a single quotation", "a glossary of terms"],
    "Trace how one event led to the next.",
    true,
  ],
  [
    "Which judgment uses a clear criterion?",
    "The essay is weak because it gives only one example to support its claim.",
    ["The essay is bad.", "I didn't like it.", "The essay is boring."],
    "Name the criterion and how the text meets it or not.",
    true,
  ],
  [
    "Which detail best shows how a decision changes a character's relationships?",
    "After Leo reports the cheating, his friends stop saving him a seat.",
    ["Leo is in eighth grade.", "Leo has a blue backpack.", "Leo lives near school."],
    "Look for consequences of a choice.",
    true,
  ],
];

const WRITING_CRAFT: Q[] = [
  [
    "Which claim is arguable and specific?",
    "Our school should replace one study hall with a coding class.",
    ["Computers exist.", "Some students have classes.", "School is a building."],
    "A strong claim is clear and could be debated.",
  ],
  [
    "Claim: “Students should have a later start time.” Which evidence is most relevant and credible?",
    "Sleep researchers report that teens' body clocks make early sleep difficult.",
    ["My friend is always tired.", "Mornings are dark in winter.", "Buses are yellow."],
    "Credible evidence comes from experts or data.",
  ],
  [
    "What is a counterclaim?",
    "an opposing argument the writer acknowledges and responds to",
    ["the writer's main claim repeated", "a joke at the end", "a list of sources"],
    "Strong arguments address the other side.",
  ],
  [
    "Which sentence best responds to a counterclaim?",
    "Although some worry about cost, the program would pay for itself through lower energy bills.",
    ["Some people disagree, and that's that.", "Others are wrong.", "I don't care what others think."],
    "Acknowledge the other side, then answer it with reasons.",
  ],
  [
    "Which transition best links a claim to a counterclaim?",
    "On the other hand,",
    ["First of all,", "For instance,", "In the beginning,"],
    "This phrase introduces another side.",
  ],
  [
    "Which conclusion best follows from an argument for more school recycling?",
    "With more bins and clear signs, our school can cut its waste in half and set an example for the district.",
    ["Recycling bins are blue.", "That's all I have to say.", "Thank you for reading."],
    "A conclusion restates the claim and its importance.",
  ],
  [
    "Which narrative opening establishes context and point of view?",
    "My grandmother's kitchen was the only place I spoke Tagalog, until the day she asked me to translate for her at the hospital.",
    ["This story is about a kitchen.", "Hospitals help people.", "Languages are spoken around the world."],
    "Introduce the narrator and the situation.",
  ],
  [
    "Which technique creates a smooth shift from one time frame to another?",
    "a transition like “Two years earlier,” followed by a change in tense",
    ["no signal at all", "a footnote", "a bibliography"],
    "Signal time shifts clearly.",
  ],
  [
    "Which detail is relevant to a story about the narrator's first day at a new school?",
    "The hallway smelled of fresh paint, and nobody looked up as I passed.",
    ["My cousin lives in another state.", "Penguins live in the south.", "Volcanoes erupt."],
    "Relevant details connect to the story's moment.",
  ],
  [
    "Which conclusion best reflects on the narrated events?",
    "I still don't know if I made the right choice, but I know I made it for the right reasons.",
    ["Then the day was over.", "The end.", "It happened on a Tuesday."],
    "Reflective conclusions show what the experience meant.",
  ],
  [
    "You rewrite a classic story set in the present day. What should you explain?",
    "which details you changed and why the story still works",
    ["nothing; changes don't need reasons", "only the book's price", "the original's page count"],
    "Explain divergences from the original.",
  ],
  [
    "After reading a novel with an open ending, which creative response stays true to the text?",
    "an epilogue that follows the characters' established traits and conflicts",
    ["an unrelated story about space pirates", "a list of the book's prices", "a copy of the last page"],
    "Stay faithful to the characters and themes.",
  ],
  [
    "Which analysis best uses textual evidence?",
    "The repeated image of the locked gate suggests the narrator feels trapped by her family's expectations.",
    ["The story is about a gate.", "I don't like gates.", "Gates are made of metal."],
    "Connect a specific detail to a deeper meaning.",
  ],
  [
    "Which piece of evidence best supports a research claim that city trees lower temperatures?",
    "A city study found streets with trees were up to 10 degrees cooler in summer.",
    ["Trees are tall.", "Birds nest in trees.", "Some people like oak trees."],
    "Choose evidence that directly proves the claim.",
  ],
  [
    "Which sentence correctly integrates a quotation?",
    "The narrator admits that she “never wanted to win, only to be noticed,” which reveals her loneliness.",
    ["“Never wanted to win.” Loneliness.", "Here's a quote: never wanted to win.", "She said something about winning."],
    "Blend the quote into your sentence and explain it.",
  ],
  [
    "Which is the best way to begin a reflection on a text?",
    "Name a specific moment in the text and explain how it changed your thinking.",
    ["List the book's chapters.", "Describe the cover.", "Summarize the whole plot without comment."],
    "Reflection connects the text to your own ideas.",
  ],
  [
    "Which revision makes an argument's reasoning more logical?",
    "Because the library is closed on weekends, students without internet at home lose study time.",
    ["The library is closed, so it's bad.", "Libraries are good.", "I like weekends."],
    "Logical reasoning connects cause and effect clearly.",
    true,
  ],
  [
    "Which narrative technique reveals a character's thoughts directly?",
    "interior monologue",
    ["a glossary", "an index", "a works cited list"],
    "Interior monologue shares thoughts as they happen.",
    true,
  ],
  [
    "An argument's evidence is one person's opinion. How could the writer strengthen it?",
    "Add data or expert sources that support the claim.",
    ["Repeat the opinion louder.", "Remove all evidence.", "Add an unrelated story."],
    "Sufficient evidence comes from more than one source.",
    true,
  ],
  [
    "You turn a novel's climax into a one-act play. Which choice would need explaining?",
    "cutting a subplot to keep the play focused",
    ["using the same character names", "keeping the same setting", "keeping the main conflict"],
    "Explain changes, not what stays the same.",
    true,
  ],
  [
    "Which sentence shows a writer avoiding a weak argument?",
    "While some say video games waste time, studies show certain games improve problem solving.",
    ["Everyone knows video games are bad.", "Video games are great because I said so.", "All gamers agree with me."],
    "Strong arguments use evidence, not bandwagon or opinion alone.",
    true,
  ],
  [
    "Which detail best uses pacing to build to a climax?",
    "The footsteps came closer. Closer. Then the handle turned.",
    ["It was dark, and then something happened later on.", "There were footsteps.", "Someone came in eventually."],
    "Short, repeated phrases build tension.",
    true,
  ],
  [
    "Which research note is most useful?",
    "an exact fact about bee colonies, with the source's title, author and date",
    ["“Bees are in trouble, I heard.”", "“Some website said something about bees.”", "“Bees! Wow.”"],
    "Useful notes record the fact and its source.",
    true,
  ],
  [
    "Which conclusion would best strengthen an argument for a school garden?",
    "A garden would teach science, provide fresh food and bring our community together, so it is worth the effort.",
    ["Gardens have dirt.", "I like flowers.", "The end."],
    "Restate the claim and its key reasons.",
    true,
  ],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "ny-g8-dialogue-and-criteria",
    title: "Dialogue, Events and Judging Texts",
    emoji: "🎭",
    blurb: "How dialogue and events drive a story, and choosing criteria to judge texts.",
    parentNote:
      "Your child analyzes how lines of dialogue and key events move the action, reveal character or force decisions, how ideas are introduced and developed in informational texts, and chooses fair criteria to judge texts and connect them across eras and cultures.",
    standards: ["8R3; 8R9", "how dialogue and events propel action and reveal character, how ideas develop, and judging and connecting texts with criteria"],
    items: DIALOGUE_EVENTS_AND_CRITERIA,
  }),
  bankUnit({
    id: "ny-g8-writing-craft",
    title: "Arguments, Stories and Evidence",
    emoji: "✏️",
    blurb: "Claims and counterclaims, narrative technique, creative responses and text evidence.",
    parentNote:
      "Your child chooses arguable claims, credible evidence, counterclaims and conclusions; narrative techniques such as time shifts, relevant details and reflective endings; creative responses that explain their changes from the original; and evidence for analysis and research.",
    standards: ["8W1; 8W3; 8W4; 8W5", "arguments with claims, counterclaims and evidence, narrative technique, creative responses and drawing evidence from texts"],
    items: WRITING_CRAFT,
  }),
];
