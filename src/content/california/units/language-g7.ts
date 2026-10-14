import type { Unit } from "../../types";
import { passage, readingUnit, type R } from "./language-kit";

// California's own Grade 7 English language arts units: analyzing stories with several pieces of evidence, comparing
// a text with its staged or filmed version and fiction with history (CA CCSS RL.7.1, RL.7.2, RL.7.7, RL.7.9), and
// analyzing information texts, their structure, word choice and media versions (RI.7.1 to RI.7.9, L.7.6). Every
// story and passage is original.

const LIGHTHOUSE = passage(
  "The Keeper's Daughter",
  "For three nights the storm had battered the coast, and for three nights Mara had climbed the lighthouse stairs while her father lay sick with fever.",
  "On the fourth night, the lamp's wick sputtered out. Mara's hands shook as she trimmed it, the wind howling through the cracked window. Below, a fishing boat's lantern bobbed closer to the rocks.",
  "The flame caught. A wide beam swept across the water, and the boat turned slowly toward the harbor. Mara sat down on the cold iron floor and, for the first time in days, let herself cry.",
);
const SCHOOL_BUS = passage(
  "The Last Seat",
  "Every morning, Dev saved the seat beside him for his best friend, Arlo. When Arlo moved away in October, Dev kept saving it out of habit.",
  "In November, a new student named Kiri stood frozen in the aisle, looking for somewhere to sit. Dev hesitated, then slid his backpack onto the floor. “It's open,” he said.",
);
const NOVEL_1906 = passage(
  "From a Novel Set in 1906",
  "Mei woke to the house rolling like a ship. Dishes leapt from the shelves. By morning, the whole street was smoke and shouting, and her family carried what they could toward the park.",
);
const HISTORY_1906 = passage(
  "From a History Text",
  "On April 18, 1906, a powerful earthquake struck San Francisco. Fires burned for several days and destroyed much of the city. Many residents camped in parks while the city was rebuilt.",
);

const STORY_ANALYSIS: R[] = [
  [LIGHTHOUSE, "Which TWO pieces of evidence together best show Mara's courage?", "She climbs the stairs night after night, and she relights the lamp while shaking.", ["Her father is sick, and the storm battered the coast.", "The boat turns, and she sits on the floor.", "The wind howls, and the window is cracked."], "Look for actions Mara takes despite fear."],
  [LIGHTHOUSE, "What can you infer from “let herself cry” at the end?", "She had been holding in her fear and exhaustion until the danger passed.", ["She was sad the boat left.", "She hurt her hand.", "She was angry at her father."], "Why did she wait until now?"],
  [LIGHTHOUSE, "What central theme develops over the story?", "Courage means acting even while afraid.", ["Lighthouses are old-fashioned.", "Storms always end quickly.", "Fishing is dangerous."], "Trace what Mara feels and does."],
  [LIGHTHOUSE, "How does the theme develop across the three paragraphs?", "Mara's duty grows heavier, peaks when the light fails, and resolves when she saves the boat.", ["It is stated in the first sentence and never mentioned again.", "It changes from courage to greed.", "It is only in the title."], "Look at each paragraph's role."],
  [LIGHTHOUSE, "Which is the best objective summary?", "While her father is sick, Mara keeps the lighthouse running through a storm and relights the lamp in time to guide a boat to safety.", ["Mara is the bravest girl ever.", "The storm was scary and I would have been terrified.", "A lighthouse has many stairs."], "Leave out opinions; keep the main events."],
  [SCHOOL_BUS, "Which detail best shows that Dev still misses Arlo?", "Dev kept saving it out of habit.", ["Arlo moved away in October.", "Kiri stood frozen in the aisle.", "“It's open,” he said."], "What does Dev keep doing after Arlo leaves?"],
  [SCHOOL_BUS, "What does moving the backpack symbolize?", "Dev making room for a new friendship", ["Dev cleaning the bus", "Dev getting off the bus", "Dev forgetting his homework"], "The backpack held the seat for Arlo."],
  [SCHOOL_BUS, "What theme does the story develop?", "Letting go of the past can open the door to new connections.", ["Buses are crowded.", "Best friends never move.", "Backpacks are heavy."], "Think about what Dev's choice means."],
  [SCHOOL_BUS, "Why does the author include “Dev hesitated”?", "to show his choice was not easy", ["to show he was late", "to describe the weather", "to show he disliked Kiri"], "A pause shows inner struggle."],
  [NOVEL_1906, "How does the novel's portrayal of 1906 differ from the history text?", "It shows the event through one girl's feelings and senses.", ["It gives the exact date and death toll.", "It says the earthquake never happened.", "It describes a different city's fire."], "Fiction focuses on a character's experience."],
  [HISTORY_1906, "Which fact from the history text does the novel also include?", "People camped in parks.", ["The date was April 18, 1906.", "Fires burned for several days.", "The city was rebuilt."], "Mei's family carried things toward the park."],
  [NOVEL_1906, "Why might an author of historical fiction change or add details?", "to tell a personal story while keeping the real events as a backdrop", ["to replace history books", "because the facts are unknown", "to make it a fantasy"], "Fiction can invent characters inside a real event."],
  [HISTORY_1906, "What does the history text provide that the novel does not?", "the date, place and scale of the disaster", ["Mei's feelings", "the sound of dishes falling", "a character's name"], "History gives facts; fiction gives experience."],
  [null, "In a film version of a story, the director uses dark music during a chase. What does this technique do that the text cannot do in the same way?", "creates suspense through sound", ["lists the characters", "adds chapter titles", "changes the plot"], "Each medium has its own tools."],
  [null, "In a stage version, an actor pauses before saying a line. What effect can this have?", "It builds tension or shows hesitation.", ["It makes the play shorter.", "It changes the words of the script.", "It replaces the setting."], "Timing is a tool of live performance."],
  [null, "In the novel, a character's thoughts are described in long paragraphs. How might a film show the same thing?", "through the actor's facial expressions or a voice-over", ["by printing the paragraphs on screen", "by leaving the character out", "by changing the ending"], "Film shows thoughts in other ways."],
  [null, "A film shows a story's setting with a wide shot of snowy mountains. What does the camera angle do?", "shows the size and isolation of the setting", ["tells the character's name", "lists the events in order", "explains the theme in words"], "Camera angles are a film technique."],
  [null, "An audiobook narrator reads a scary scene in a whisper. How does this compare to reading it silently?", "The narrator's voice adds mood that a silent reader must imagine.", ["It removes the mood.", "It changes the plot.", "There is no difference."], "Audio adds tone of voice."],
  [LIGHTHOUSE, "Which sentence best shows the turning point?", "The flame caught.", ["For three nights the storm had battered the coast.", "Mara's hands shook as she trimmed it.", "Below, a fishing boat's lantern bobbed closer."], "Find the moment things change."],
  [LIGHTHOUSE, "Which detail creates the most tension?", "a fishing boat's lantern bobbed closer to the rocks", ["she climbed the lighthouse stairs", "her father lay sick", "she sat down on the cold iron floor"], "What could go wrong?"],
  [SCHOOL_BUS, "How does the setting of time (October to November) support the plot?", "It shows time passing as Dev slowly adjusts.", ["It shows it is summer.", "It explains why the bus is late.", "It has no connection."], "How long did Dev keep saving the seat?"],
  [null, "Which is the strongest way to support an analysis of a character?", "citing several specific details from the text", ["stating your opinion strongly", "retelling the whole story", "describing the book cover"], "More text evidence makes analysis stronger."],
  [null, "A central idea is best described as…", "the main point the text develops over its course", ["the first sentence", "the longest paragraph", "the title"], "It develops throughout the text."],
  [NOVEL_1906, "Which phrase is figurative?", "the house rolling like a ship", ["Dishes leapt from the shelves.", "her family carried what they could", "toward the park"], "Look for a comparison."],
  [LIGHTHOUSE, "Why does the author repeat “for three nights”?", "to stress how long and tiring Mara's duty has been", ["to count the boats", "to fill space", "to show the date"], "Repetition adds emphasis.", true],
  [SCHOOL_BUS, "How would the story's meaning change if Dev ignored Kiri?", "The theme would become about holding on to the past instead of moving on.", ["It would not change.", "It would become a mystery.", "It would be about the bus driver."], "His choice shapes the theme.", true],
  [HISTORY_1906, "A reader wants to learn what the 1906 disaster felt like to a child. Which source helps more, and why?", "the novel, because it shows a character's experience, though it is fiction", ["the history text, because it has feelings", "neither, because both are fiction", "the history text, because it names Mei"], "Consider what each kind of text does well.", true],
  [null, "A director cuts a whole subplot from a novel when filming it. What should a viewer keep in mind?", "The film may change the story's focus or theme.", ["The film is exactly the same as the book.", "The novel was wrong.", "The subplot never existed."], "Adaptations make choices.", true],
];

const PLASTIC = passage(
  "Where Does a Plastic Bottle Go?",
  "Introduction: Americans use billions of plastic bottles every year. Where do they end up?",
  "Section 1, The Bin: Some bottles are recycled. Machines sort, wash and melt them into pellets that become carpet, clothing or new bottles.",
  "Section 2, The Landfill: Many more are buried in landfills, where they may take hundreds of years to break down.",
  "Section 3, The Ocean: Some bottles wash into rivers and oceans, where they break into tiny pieces that animals can swallow.",
  "Conclusion: Each choice, from refilling a bottle to recycling it, changes where the next one goes.",
);
const SCHOOL_START = passage(
  "Two Writers on School Start Times",
  "Writer A, a sleep scientist, emphasizes research: teens' body clocks shift later, and schools that started after 8:30 saw better attendance and grades.",
  "Writer B, a parent of three, emphasizes daily life: later starts would make it harder to drop children at school before work and would push sports practice into the evening.",
);
const TRANSCONTINENTAL = passage(
  "The Railroad Across the Continent",
  "In the 1860s, two companies raced to build a railroad across the country. One crew built east from Sacramento; the other built west from Nebraska.",
  "Thousands of Chinese immigrants did much of the hardest work in the Sierra Nevada, blasting tunnels through granite. They were paid less than other workers.",
  "When the tracks met in 1869, a trip across the country fell from months to about a week. The railroad changed trade, travel and settlement in the West.",
);
const PODCAST = passage(
  "Article and Podcast",
  "An article about a volunteer firefighter lists facts: she has served for 12 years and trained 40 new volunteers.",
  "A podcast about the same firefighter plays her voice, the sound of sirens and her laugh as she remembers her first call.",
);

const INFO_ANALYSIS: R[] = [
  [PLASTIC, "How is this text organized?", "an introduction, three sections each showing one place bottles end up, and a conclusion", ["as a story with characters", "in alphabetical order", "as a list of opinions"], "Look at the section labels."],
  [PLASTIC, "How does Section 2 contribute to the author's main idea?", "It shows the long-lasting problem when bottles are not recycled.", ["It explains how pellets are made.", "It describes ocean animals.", "It tells how to refill a bottle."], "What does the landfill section show?"],
  [PLASTIC, "Which two central ideas does the text develop?", "Bottles end up in very different places, and our choices affect where they go.", ["Plastic is cheap, and oceans are big.", "Carpet is soft, and bottles are clear.", "Landfills are smelly, and trucks are loud."], "Look at the introduction and conclusion."],
  [PLASTIC, "Which detail best supports the idea that bottles can harm wildlife?", "they break into tiny pieces that animals can swallow", ["Machines sort, wash and melt them", "they become carpet or clothing", "Americans use billions of plastic bottles"], "Find the detail about animals."],
  [PLASTIC, "Why does the author end with “Each choice… changes where the next one goes”?", "to connect the sections to the reader's own actions", ["to introduce a new topic", "to list more sources", "to describe a landfill"], "A conclusion often ties ideas to the reader."],
  [TRANSCONTINENTAL, "How did the work of Chinese immigrants affect the railroad's progress?", "Their dangerous tunnel-blasting made it possible to cross the Sierra Nevada.", ["They designed the train engines.", "They owned both companies.", "They slowed the work down."], "Read the second paragraph."],
  [TRANSCONTINENTAL, "Which detail shows the railroad's effect on travel?", "a trip across the country fell from months to about a week", ["two companies raced to build", "blasting tunnels through granite", "They were paid less than other workers."], "Look at the last paragraph."],
  [TRANSCONTINENTAL, "Which TWO details together best show that the workers were treated unfairly?", "They did much of the hardest work, and they were paid less.", ["The tracks met in 1869, and travel got faster.", "One crew built east, and one built west.", "Trade changed, and settlement grew."], "Look for hard work paired with low pay."],
  [TRANSCONTINENTAL, "How did events and ideas interact in this text?", "The race between companies drove fast building, which changed travel and settlement.", ["The railroad caused the companies to form.", "Travel changes caused the railroad to be built.", "There is no connection between events."], "Follow cause and effect through the text."],
  [TRANSCONTINENTAL, "What does “blasting” suggest about the work?", "It was explosive and dangerous.", ["It was quiet and easy.", "It was done with music.", "It was finished quickly."], "Blasting means using explosives."],
  [SCHOOL_START, "How do Writer A and Writer B shape their presentations differently?", "Writer A emphasizes research data; Writer B emphasizes family schedules.", ["Both use only statistics.", "Both tell personal stories.", "Writer B is a scientist."], "What kind of evidence does each writer use?"],
  [SCHOOL_START, "Which evidence does Writer A emphasize?", "better attendance and grades at later-starting schools", ["harder drop-offs before work", "sports practice moving later", "the needs of younger siblings"], "Writer A is a sleep scientist."],
  [SCHOOL_START, "Why might the two writers interpret the same issue differently?", "They have different experiences and goals.", ["One of them must be lying.", "They are writing about different schools.", "One does not know what school is."], "Consider each writer's background."],
  [PODCAST, "What does the podcast add that the article cannot?", "her voice and real sounds that make the story feel personal", ["the number of years she served", "how many volunteers she trained", "the article's headline"], "Audio delivers emotion through sound."],
  [PODCAST, "What does the article do better than the podcast?", "presents clear facts that are easy to find again", ["plays sirens", "shares her laugh", "adds background music"], "Text is good for facts you can reread."],
  [null, "In a science article, what is the technical meaning of “solution”?", "a mixture in which one substance dissolves in another", ["an answer to a riddle", "a plan to fix a problem", "a kind of rock"], "Context tells you it's a science term."],
  [null, "An article calls a park “neglected” rather than “quiet.” What does this word choice suggest?", "The park has been ignored and is in poor shape.", ["The park is peaceful.", "The park is new.", "The park is crowded."], "Neglected has a negative connotation."],
  [null, "A writer calls a new law “a lifeline for small farms.” What does the metaphor suggest?", "The law helps farms survive.", ["The law is about fishing.", "The law hurts farms.", "The law is very long."], "A lifeline saves someone in trouble."],
  [null, "Which word has the most positive connotation?", "determined", ["stubborn", "pigheaded", "obstinate"], "These words are close in meaning but differ in feeling."],
  [null, "In social studies, what does “ratify” mean?", "to formally approve an agreement", ["to cancel a law", "to write a speech", "to start a war"], "States ratified the Constitution."],
  [null, "Which phrase signals that a writer is about to give a counterpoint?", "On the other hand", ["For example", "In addition", "As a result"], "It introduces the other side."],
  [null, "Which transition shows a cause-and-effect relationship?", "consequently", ["meanwhile", "for instance", "similarly"], "Consequently means as a result."],
  [null, "A video version of a speech shows the speaker pausing and smiling. How does that affect the words?", "The delivery can make the words feel warmer or more convincing.", ["It changes what the speech says.", "It removes the main idea.", "It has no effect at all."], "How something is said shapes its impact."],
  [PLASTIC, "Which detail would best fit in Section 1?", "Some cities give refunds for returned bottles.", ["Bottles can last centuries underground.", "Sea turtles mistake plastic for food.", "Plastic was invented in the 1900s."], "Section 1 is about recycling.", true],
  [TRANSCONTINENTAL, "Which statement is best supported by the whole text?", "The railroad depended on immigrant labor and reshaped the West.", ["The railroad was built in one year.", "Only one company built the railroad.", "Travel times did not change."], "Use details from all three paragraphs.", true],
  [SCHOOL_START, "Which question would best help you evaluate both writers?", "What evidence does each writer leave out?", ["Which writer has the longer name?", "Which writer wrote first?", "Which writer lives closer?"], "Analyzing emphasis means noticing what is missing too.", true],
  [PODCAST, "Why would a reporter choose to include her laugh in the podcast?", "to show her personality and how she feels about her work", ["to fill time", "to hide facts", "to replace the article"], "Sound choices carry meaning.", true],
  [null, "Which word best describes a source that leaves out the other side on purpose?", "one-sided", ["balanced", "thorough", "objective"], "One-sided means showing only one view.", true],
];

export const STORY_ANALYSIS_7: Unit = readingUnit({
  id: "ca-g7-story-analysis",
  title: "Story Analysis",
  emoji: "🗝️",
  blurb: "Evidence, themes, film and history.",
  parentNote:
    "Your child supports an analysis of a story with several pieces of evidence, traces how a theme develops and summarizes objectively, compares a story with a staged, filmed or audio version, and compares historical fiction with a history text about the same time.",
  standards: [
    "RL.7.1; RL.7.2; RL.7.7; RL.7.9",
    "citing several pieces of evidence, theme and objective summary, comparing a text with its staged, filmed or audio version, and fiction compared with history",
  ],
  items: STORY_ANALYSIS,
});

export const INFO_ANALYSIS_7: Unit = readingUnit({
  id: "ca-g7-info-analysis",
  title: "Information Analysis",
  emoji: "🛤️",
  blurb: "Structure, word choice and two writers.",
  parentNote:
    "Your child supports analysis of information texts with several pieces of evidence, finds two central ideas, explains how people, events and ideas affect each other, interprets word choice, analyzes how sections build a text, compares an article with a podcast, and compares how two writers emphasize different evidence.",
  standards: [
    "RI.7.1; RI.7.2; RI.7.3; RI.7.4; RI.7.5; RI.7.7; RI.7.9; L.7.6",
    "evidence, central ideas, how people, events and ideas interact, word choice, text structure, comparing media versions, comparing two writers, and academic words",
  ],
  items: INFO_ANALYSIS,
});

export const LANGUAGE_7: Unit[] = [STORY_ANALYSIS_7, INFO_ANALYSIS_7];
