import type { Unit } from "../../types";
import { passage, readingUnit, type R } from "./language-kit";

// California's own Grade 9 English language arts units (the 9–10 band): cultural points of view, a scene in two
// artistic forms and how authors transform source material (CA CCSS RL.9-10.3, RL.9-10.6, RL.9-10.7, RL.9-10.9), and
// evaluating arguments, how ideas unfold and the themes of founding US documents (RI.9-10.3, RI.9-10.8, RI.9-10.9,
// L.9-10.6). Stories and passages are original; the founding documents are quoted only in short public-domain lines.

const MARKET = passage(
  "From a Novel Set in Lagos",
  "Every Saturday, Funmi helped her aunt sell fabric at the market, calling out prices in Yoruba and English and bargaining with customers who had known her since she was small.",
  "When a scholarship letter came from a school abroad, Funmi read it twice, then folded it into her pocket. She looked at the bright bolts of cloth, the neighbors' stalls, her aunt's tired hands, and did not know how to tell her.",
);
const FISHING = passage(
  "From a Story Set in a Portuguese Fishing Village",
  "My grandfather says the sea keeps its own calendar. We do not ask the date; we ask the tide.",
  "When the factory boats came, the young men left for the city one by one. My grandfather still mends his nets each morning, though fewer boats go out to use them.",
);
const EXAM = passage(
  "From a Story Set in Seoul",
  "On the morning of the national exam, the whole city seemed to hold its breath. Planes were rerouted during the listening section, and younger students lined the school gates, cheering for the test-takers.",
  "Ji-ho bowed to his mother at the gate. He felt the weight of every early morning she had spent packing his lunches.",
);
const PAINTING_POEM = passage(
  "A Scene in Two Forms",
  "A poem describes a farmworker at dawn: “Her hands are older than the morning, / and the rows go on forever.”",
  "A painting of the same scene shows one small figure bent over endless green rows under a huge pink sky.",
);
const SOURCE_MYTH = passage(
  "Source and Retelling",
  "In an ancient myth, a young man falls in love with his own reflection and wastes away beside a pool.",
  "In a modern novel, a teenager becomes so focused on her online image that she stops noticing the friends trying to reach her.",
);
const FAIRY_SOURCE = passage(
  "A Fairy Tale Transformed",
  "In the traditional tale, a girl is rescued from a tower by a prince.",
  "In a new retelling, the girl studies the tower's stones for years, builds a ladder from her own braids and climbs down to rescue herself.",
);

const WORLD_LITERATURE: R[] = [
  [MARKET, "What cultural experience does the passage reflect?", "a close community where family work and neighbors shape daily life", ["a lonely life with no family", "a life in outer space", "a busy office job"], "Notice the market, the aunt and the neighbors."],
  [MARKET, "What does speaking both Yoruba and English at the market suggest about Funmi's world?", "She moves easily between languages in daily life.", ["She is a tourist.", "She does not understand the customers.", "She has just learned English."], "Bilingual life is part of her setting."],
  [MARKET, "What conflict does Funmi face?", "between an opportunity abroad and loyalty to her family and community", ["between two customers", "between selling fabric and buying food", "between two schools in her city"], "Why can't she tell her aunt?"],
  [MARKET, "Which detail best shows Funmi's mixed feelings?", "She looked at … her aunt's tired hands, and did not know how to tell her.", ["Every Saturday, Funmi helped her aunt sell fabric.", "a scholarship letter came", "calling out prices"], "Look for what she notices and can't say."],
  [FISHING, "What point of view does the narrator share about change in the village?", "a sense of loss as young people leave and the old ways fade", ["excitement about the factory boats", "anger at the sea", "boredom with fishing"], "Read about the grandfather and the nets."],
  [FISHING, "What does “the sea keeps its own calendar” suggest about the village?", "Life follows the rhythms of nature, not clock time.", ["The village has no calendars.", "The sea is dangerous.", "The grandfather forgets dates."], "They ask the tide, not the date."],
  [FISHING, "Why does the author end with the grandfather mending nets though fewer boats go out?", "to show his faithfulness to a way of life that is disappearing", ["to show he is a bad fisherman", "to explain how nets are made", "to introduce a new character"], "What does the image say about him?"],
  [EXAM, "What does the passage reveal about how this community views the national exam?", "It is treated as a major event the whole city supports.", ["Nobody cares about the exam.", "The exam is a sports match.", "Only Ji-ho takes the exam."], "Look at the planes and the cheering students."],
  [EXAM, "What does Ji-ho's bow to his mother show?", "respect and gratitude for her sacrifice", ["that he is leaving forever", "that he is angry", "that he forgot his lunch"], "Read the last sentence."],
  [EXAM, "Why might reading literature from other countries matter?", "It shows experiences and values readers might not otherwise see.", ["It replaces history books.", "All countries are the same.", "It is only for travel planning."], "Literature lets readers see through others' eyes."],
  [PAINTING_POEM, "What do the poem and painting both emphasize?", "how long and hard the farmworker's labor is", ["a busy city street", "a celebration", "the farmworker's home"], "Look at “rows go on forever” and “endless green rows.”"],
  [PAINTING_POEM, "What can the painting show that the poem only tells?", "the tiny size of the figure against a huge sky", ["what the worker is thinking", "the worker's age in words", "the sound of the morning"], "Painters use size and color."],
  [PAINTING_POEM, "What can the poem do that the painting cannot?", "use a metaphor like “hands are older than the morning”", ["show the color of the sky", "show the size of the field", "show the figure's posture"], "Poets use figurative language."],
  [PAINTING_POEM, "Which detail is emphasized in the painting but absent from the poem?", "the huge pink sky", ["the worker's hands", "the rows", "the dawn"], "Compare details in each form."],
  [SOURCE_MYTH, "How does the modern novel transform the ancient myth?", "It turns a reflection in a pool into an online image.", ["It keeps the pool and the young man.", "It changes the theme to courage.", "It has no link to the myth."], "Compare the details of each."],
  [SOURCE_MYTH, "Which theme carries over from the myth to the novel?", "Too much focus on one's own image can destroy connection.", ["Pools are dangerous.", "Technology is always good.", "Friends are not important."], "What happens to each main character?"],
  [FAIRY_SOURCE, "How does the retelling change the traditional tale?", "The girl rescues herself instead of waiting for a prince.", ["The prince is the main character.", "The tower disappears.", "Nothing changes."], "Who does the rescuing in each?"],
  [FAIRY_SOURCE, "What is the effect of this transformation?", "It shifts the theme toward patience, skill and independence.", ["It makes the story shorter.", "It removes all conflict.", "It turns the story into a comedy."], "A new rescuer changes the meaning."],
  [null, "Why might an author retell an old story instead of inventing a new one?", "to use a familiar pattern to explore a new idea or challenge an old one", ["because old stories are easier to sell", "because new stories are not allowed", "to copy it exactly"], "Retellings talk back to their sources."],
  [null, "A playwright bases a comedy on an ancient tragedy. What is the most important thing to analyze?", "how the playwright changes the source's tone and message", ["the length of each play", "how old the tragedy is", "the cost of tickets"], "Transformations reveal choices."],
  [MARKET, "How does Funmi develop over the passage?", "She goes from comfortable in her routine to torn by a big choice.", ["She becomes a fabric seller.", "She leaves for school in the first sentence.", "She does not change."], "Compare the first and second paragraphs."],
  [EXAM, "How does the setting advance the story's theme?", "The city's shared tension shows how much the exam means to families.", ["It shows the city is always quiet.", "It explains how planes fly.", "It has nothing to do with the theme."], "Setting can carry meaning."],
  [FISHING, "How do the grandfather and the young men interact with change differently?", "The young men leave for new work; the grandfather keeps the old work going.", ["Both leave for the city.", "Both work on factory boats.", "Neither notices any change."], "Compare their choices."],
  [null, "In a translated novel, a footnote explains a word that has no English match. What does this show?", "Some cultural ideas are tied to a particular language.", ["The translator made a mistake.", "The word is unimportant.", "The book is a dictionary."], "Translation can't always carry every meaning."],
  [SOURCE_MYTH, "Which detail in the novel matches the myth's ending?", "she stops noticing the friends trying to reach her", ["she becomes a teenager", "she uses a phone", "she has friends"], "The young man wastes away alone.", true],
  [PAINTING_POEM, "Which is the best statement of what both works suggest?", "The farmworker's labor is vast and often unseen.", ["Farming is easy.", "Mornings are short.", "Painting is better than poetry."], "Combine the poem's and painting's emphasis.", true],
  [MARKET, "Which word best describes the tone of the second paragraph?", "conflicted", ["joyful", "furious", "careless"], "She is pulled in two directions.", true],
  [FAIRY_SOURCE, "What does the new detail of “studies the tower's stones for years” add?", "It shows patience and planning as the source of her freedom.", ["It shows she is bored.", "It explains the prince's plan.", "It makes the tower taller."], "How does she escape?", true],
];

const EVIDENCE_ARG = passage(
  "Should Every Student Learn to Code?",
  "Coding should be required for every high school student. Jobs in computing are growing faster than almost any other field, according to federal labor data.",
  "Learning to code also builds problem-solving skills that help in every subject. My cousin learned to code, and now she is great at math, so coding clearly makes everyone better at math.",
  "Finally, if we don't require coding, our students will be left behind and our whole economy will collapse.",
);
const VOTING = passage(
  "The Long Road to the Vote",
  "When the Constitution was ratified, most states allowed only white men who owned property to vote.",
  "Over time, property rules were dropped. The Fifteenth Amendment (1870) said the right to vote could not be denied because of race, though many states used unfair tests and taxes to block Black voters.",
  "The Nineteenth Amendment (1920) extended the vote to women, and the Voting Rights Act of 1965 outlawed many of the unfair practices. In 1971, the voting age was lowered to 18.",
);

const RHETORIC_AND_SOURCES: R[] = [
  [EVIDENCE_ARG, "What is the author's central claim?", "Coding should be required for every high school student.", ["Math is hard.", "The economy is strong.", "Cousins are helpful."], "Look at the first sentence."],
  [EVIDENCE_ARG, "Which evidence is most relevant and credible?", "federal labor data showing computing jobs are growing fast", ["the author's cousin's math grades", "a prediction that the economy will collapse", "the author's opinion"], "Credible evidence comes from reliable sources."],
  [EVIDENCE_ARG, "What is the flaw in “My cousin learned to code… so coding clearly makes everyone better at math”?", "It is a hasty generalization from one example.", ["It uses too much data.", "It quotes an expert.", "It is a valid conclusion."], "One person can't prove something about everyone."],
  [EVIDENCE_ARG, "Which fallacy appears in the last paragraph?", "slippery slope", ["appeal to authority", "bandwagon", "red herring"], "Not requiring coding leads to economic collapse?"],
  [EVIDENCE_ARG, "Is the evidence sufficient to support the claim?", "No, only one reason has solid evidence.", ["Yes, every reason has strong data.", "Yes, because it uses a personal story.", "No, because it has no claim at all."], "Check each reason's support."],
  [EVIDENCE_ARG, "Which addition would most strengthen the second paragraph?", "a study showing students who code improve in problem solving", ["another story about a relative", "a joke about computers", "a list of programming languages"], "Replace anecdote with research."],
  [VOTING, "How does the author organize the series of events?", "in chronological order, showing voting rights expanding over time", ["from most to least important", "as a list of opinions", "as a comparison of two countries"], "Follow the dates."],
  [VOTING, "How does the Voting Rights Act connect to the Fifteenth Amendment?", "It outlawed practices states used to get around the amendment.", ["It repealed the amendment.", "It gave women the vote.", "It lowered the voting age."], "Read about unfair tests and taxes."],
  [VOTING, "Which detail shows that a law on paper was not always followed in practice?", "many states used unfair tests and taxes to block Black voters", ["property rules were dropped", "the voting age was lowered to 18", "the Constitution was ratified"], "Look for what happened despite the amendment."],
  [VOTING, "What central idea does the series of events develop?", "Voting rights in the US expanded step by step, often against resistance.", ["Voting rules never changed.", "Only women gained the vote.", "The Constitution gave everyone the vote in 1788."], "Look at the whole sequence."],
  [null, "The Declaration of Independence (1776) says “all men are created equal.” Which later document most directly carries this idea forward for formerly enslaved people?", "the Fourteenth Amendment's guarantee of equal protection of the laws", ["the Articles of Confederation", "a tax law", "a state road map"], "Think about which amendment promises equal protection."],
  [null, "In the Gettysburg Address (1863), Lincoln calls for “a new birth of freedom.” Which theme links it to the Declaration of Independence?", "equality and liberty as the nation's founding ideals", ["the rules for elections", "the size of the army", "trade with Europe"], "Lincoln looked back to the founding ideas."],
  [null, "The Preamble to the Constitution begins “We the People.” What concept does this phrase express?", "that government's power comes from the people", ["that the king rules", "that only states matter", "that courts make all laws"], "This is the idea of popular sovereignty."],
  [null, "Dr. Martin Luther King Jr.'s “Letter from Birmingham Jail” (1963) argues that people have a duty to resist unjust laws. Which earlier founding idea does it draw on?", "the Declaration's claim that people have unalienable rights", ["the Constitution's rules for the census", "the length of a senator's term", "the location of the capital"], "King appealed to the nation's founding ideals."],
  [null, "Why are documents like the Declaration and the Gettysburg Address called seminal?", "They shaped later ideas and arguments about American government.", ["They were the first books printed.", "They are very long.", "They were written by poets."], "Seminal means highly influential."],
  [null, "Which of these is a false statement an evaluator should catch?", "“The Constitution was signed in 1900.”", ["“The Constitution was signed in 1787.”", "“The Bill of Rights has ten amendments.”", "“The Declaration was adopted in 1776.”"], "Check facts against reliable sources."],
  [null, "An argument says, “A famous actor uses this app, so it must be the best study tool.” What is the flaw?", "an appeal to an irrelevant authority", ["a strong statistic", "valid scientific evidence", "a clear definition"], "Is an actor an expert on study tools?"],
  [null, "Which reasoning is valid?", "All mammals breathe air; whales are mammals; so whales breathe air.", ["Some birds can't fly; penguins are birds; so all birds can't fly.", "It rained after I washed my car, so washing it causes rain.", "Everyone likes summer, so summer is best."], "Valid reasoning follows logically from true premises."],
  [null, "An editorial claims a policy “failed” but gives no numbers. What is missing?", "sufficient evidence", ["a title", "a claim", "a byline"], "Claims need enough support."],
  [null, "In biology, “homeostasis” means…", "the body keeping its internal conditions stable", ["the study of homes", "cell division", "a type of tissue"], "Homeo means same; stasis means standing still."],
  [null, "In civics, “due process” means…", "fair legal procedures the government must follow", ["a quick trial", "a tax", "the right to vote"], "The Fifth and Fourteenth Amendments protect it."],
  [null, "In literature, “juxtaposition” means…", "placing two contrasting things side by side", ["repeating a sound", "a long speech", "a story's ending"], "Contrast makes both stand out."],
  [null, "In economics, “scarcity” means…", "limited resources compared to wants", ["too much money", "a type of tax", "free trade"], "Scarcity forces choices."],
  [VOTING, "Which word in paragraph 3 signals that the right to vote grew?", "extended", ["outlawed", "lowered", "ratified"], "Extend means make longer or reach farther."],
  [EVIDENCE_ARG, "Why might a reader distrust the whole argument after the last paragraph?", "An exaggerated prediction weakens the author's credibility.", ["The paragraph uses data.", "It agrees with experts.", "It is too short to matter."], "Extreme claims can hurt an argument.", true],
  [VOTING, "Which statement best explains the relationship between the amendments and the Voting Rights Act?", "Rights guaranteed in amendments sometimes needed later laws to be enforced.", ["Each new law cancelled the one before.", "The amendments were never needed.", "The Voting Rights Act came before the Constitution."], "Connect paragraph 2 to paragraph 3.", true],
  [null, "Which pair of documents share the theme that government must protect individual rights?", "the Bill of Rights and the Declaration of Independence", ["a bus schedule and a menu", "a weather report and a recipe", "a map and a calendar"], "Both name rights government must respect.", true],
  [null, "A writer argues that because a law is old, it must be wise. What is the fallacy?", "appeal to tradition", ["valid deduction", "strong statistics", "expert testimony"], "Age alone doesn't make something right.", true],
];

export const WORLD_LITERATURE_9: Unit = readingUnit({
  id: "ca-g9-world-literature",
  title: "World Literature and Retellings",
  emoji: "🌍",
  blurb: "Cultural views, two art forms and retellings.",
  parentNote:
    "Your student analyzes the cultural experience and point of view in stories set outside the United States, follows how complex characters develop, compares a scene shown in a poem and a painting, and analyzes how authors transform myths and fairy tales.",
  standards: [
    "RL.9-10.3; RL.9-10.6; RL.9-10.7; RL.9-10.9",
    "complex characters, cultural experience and point of view in world literature, a scene in two artistic forms, and how authors transform source material",
  ],
  items: WORLD_LITERATURE,
});

export const RHETORIC_AND_SOURCES_9: Unit = readingUnit({
  id: "ca-g9-rhetoric-and-sources",
  title: "Arguments and Founding Documents",
  emoji: "📜",
  blurb: "Evaluate claims and trace big ideas.",
  parentNote:
    "Your student evaluates an argument's claims, reasoning and evidence and spots fallacies and false statements, analyzes how a series of events unfolds, traces themes across founding US documents such as the Declaration of Independence and the Gettysburg Address, and builds academic and subject vocabulary.",
  standards: [
    "RI.9-10.3; RI.9-10.8; RI.9-10.9; L.9-10.6",
    "how a series of events or ideas unfolds, evaluating arguments, reasoning and evidence, themes of founding US documents, and academic and subject words",
  ],
  items: RHETORIC_AND_SOURCES,
});

export const LANGUAGE_9: Unit[] = [WORLD_LITERATURE_9, RHETORIC_AND_SOURCES_9];
