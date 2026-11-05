import { passage, type R } from "./language-kit";

// More Grades 7 to 9 reading and language questions for California's shared English language arts units. Every
// passage is original. Spelling is US English.

const BRIDGE_STORY = passage(
  "The Last Bus",
  "Dani watched the clock above the station door. The last bus left in four minutes, and her little brother's ticket was still in the coat she had left at school.",
  "She ran back through the empty halls, her sneakers squeaking, and found the coat on its hook. When she returned, the bus was pulling away. The driver spotted her, braked, and opened the door with a tired smile.",
);
const GARDEN_STORY = passage(
  "Mr. Okafor's Tomatoes",
  "Every spring, Mr. Okafor planted tomatoes along the fence and handed the first ripe one to whoever walked by. Some neighbors laughed that he gave away his best fruit.",
  "Years later, when his knees stopped working, the neighbors showed up with shovels, seeds and a sign that read, “Okafor's Garden, Open to All.”",
);
const FILM_SCENE = passage(
  "Short Story and Film",
  "In the story, Priya reads the acceptance letter alone in her room and says nothing to anyone for three days.",
  "In the film, Priya screams with joy and runs through the house with the letter held high.",
);
const HISTORY_FICTION = passage(
  "Two Accounts of the Same Winter",
  "Fiction: Little Tom shivered as the wagon rolled on, certain that every creak of the wheels meant the end of the journey.",
  "History text: The wagon trains of the 1840s often crossed mountain passes late in autumn, and many travelers ran short of food before the first snow.",
);
const BEES = passage(
  "Why Bees Matter",
  "Bees carry pollen from flower to flower, which helps many crops produce fruit and seeds. In some regions, bee numbers have fallen sharply over the past twenty years.",
  "Scientists point to several causes, including loss of wild flowers, certain pesticides and disease. Farmers and beekeepers are testing ways to give bees safer places to feed.",
);
const SOCIAL_MEDIA = passage(
  "Two Writers on Phones in Class",
  "Writer 1: Phones in class distract students and lower test scores, so schools should ban them during lessons.",
  "Writer 2: Phones can be useful learning tools for research and translation, so teachers should decide when students may use them.",
);
const LIBRARY_ARTICLE = passage(
  "The Library Gets a Makeover",
  "The city library will close for three months to add a quiet study floor, a recording studio and faster internet. The changes will cost twelve million dollars.",
  "Supporters say the library has become a place for jobs help and homework. Critics say the money could repair roads instead.",
);
const SPEECH = passage(
  "From a Student Council Speech",
  "My friends, we have a choice. We can keep walking past the broken fountain in our courtyard, or we can fix it. Imagine a school where the first thing you hear in the morning is running water and laughter.",
);
const LAGOS_POEM = passage(
  "Poem: Night Market",
  "Lanterns bloom like orange flowers over the crowded lane,",
  "and the song of sellers rises, rolling in on the evening rain.",
);
const FABLE_RETOLD = passage(
  "A Modern Fable: The Tortoise and the App",
  "Hana rushed through her homework on a phone app, tapping answers as fast as she could. Her friend Leo worked slowly, checking each step. When the test came, Hana missed half the questions, and Leo missed none.",
);
const FOUNDING_LINE = passage(
  "Two Lines About Government",
  "Line A: “We hold these truths to be self-evident, that all men are created equal.”",
  "Line B: “The right of citizens to vote shall not be denied on account of race, color, or previous condition of servitude.”",
);
const ESSAY_CLAIM = passage(
  "An Opinion Essay on School Lunch",
  "The school lunch period should be extended by fifteen minutes. A recent survey found that most students finish eating in under ten minutes because of long lines. Also, everyone knows that longer lunches make students happier.",
);

export const STORY_ANALYSIS_7_MORE: R[] = [
  [BRIDGE_STORY, "Which detail best shows that Dani feels pressure?", "She watches the clock and runs through the halls.", ["She goes to school.", "She wears sneakers.", "She sees a driver."], "Look for signs of hurry."],
  [BRIDGE_STORY, "What does the driver's tired smile suggest?", "He is kind even though he is worn out.", ["He is angry at Dani.", "He did not see her.", "He wants to leave early."], "He braked and opened the door."],
  [BRIDGE_STORY, "Which theme does the story best support?", "Small acts of kindness can matter a lot.", ["Buses are always late.", "Brothers are a burden.", "Coats should stay at school."], "Think about what the driver chose to do."],
  [BRIDGE_STORY, "Which is the best objective summary?", "Dani goes back for a forgotten ticket and the driver waits so she can catch the bus.", ["Dani is lazy and loses her brother's coat.", "A bus driver gets angry at a girl.", "A school is empty at night."], "A summary leaves out opinions."],
  [GARDEN_STORY, "Why do the neighbors bring shovels and seeds years later?", "They want to repay Mr. Okafor's generosity.", ["They want to buy his house.", "They think he is lazy.", "They dislike tomatoes."], "Look at the sign they make."],
  [GARDEN_STORY, "How does the neighbors' attitude change?", "From teasing him to helping him", ["From helping to ignoring", "From shy to angry", "It does not change"], "Compare the first and last paragraphs."],
  [GARDEN_STORY, "Which line best supports the theme that generosity builds community?", "“Okafor's Garden, Open to All.”", ["Every spring, Mr. Okafor planted tomatoes.", "Some neighbors laughed.", "His knees stopped working."], "The theme shows in the ending."],
  [FILM_SCENE, "How does the film's version differ from the story's?", "The film shows open joy, while the story shows quiet reaction.", ["The film leaves out the letter.", "The film is about a different person.", "Both show Priya screaming."], "Compare Priya's reactions."],
  [FILM_SCENE, "What does the story's three days of silence suggest about Priya?", "She may need time to process her feelings.", ["She is bored.", "She lost the letter.", "She dislikes her family."], "Silence can carry meaning."],
  [HISTORY_FICTION, "What does the history text add that the fiction does not?", "factual background about when and why travelers faced danger", ["a character's feelings", "a made-up conversation", "a description of a wagon's creak"], "Compare facts with imagined details."],
  [HISTORY_FICTION, "Which detail in the fiction matches a fact in the history text?", "a late-season mountain journey", ["a boy's name", "a creaking wheel", "a certainty about the end"], "Both describe a hard late-season trip."],
  [null, "A character who changes from selfish to generous across a story is best described as…", "dynamic", ["flat", "static", "minor"], "Dynamic characters change."],
  [null, "Which is a theme rather than a topic?", "Honesty can be hard but worth it.", ["Honesty", "A school play", "A girl and her dog"], "A theme is a message, stated as a sentence."],
  [null, "To support a claim about a character's courage, a strong writer uses…", "several pieces of evidence from the text", ["one guess", "their own opinion only", "a different story"], "Strong analysis cites the text more than once.", true],
];

export const INFO_ANALYSIS_7_MORE: R[] = [
  [BEES, "What is the central idea of the first paragraph?", "Bees help crops grow, but their numbers are falling.", ["Farmers dislike bees.", "Bees live in flowers.", "Pollen is dangerous."], "Combine both sentences."],
  [BEES, "What is one cause of falling bee numbers named in the passage?", "loss of wild flowers", ["too much rain", "new roads", "bigger crops"], "See the second paragraph."],
  [BEES, "How does the second paragraph relate to the first?", "It explains possible reasons for the problem the first describes.", ["It changes the topic.", "It disagrees with the first.", "It tells a story."], "First problem, then causes."],
  [BEES, "What does “pollen” most likely mean in the passage?", "a powder flowers use to make seeds", ["a kind of nectar", "a farm tool", "a type of bee"], "Context: bees carry it from flower to flower."],
  [LIBRARY_ARTICLE, "Which sentence states a fact?", "The changes will cost twelve million dollars.", ["Supporters are correct.", "The library is wasting money.", "Roads matter more."], "Facts can be checked."],
  [LIBRARY_ARTICLE, "How does the writer show both sides of the debate?", "by giving views of supporters and critics", ["by agreeing with critics", "by hiding the cost", "by listing library hours"], "See the second paragraph."],
  [LIBRARY_ARTICLE, "What does “critics” mean here?", "people who disagree with a plan", ["people who build libraries", "visitors", "librarians"], "They suggest repairing roads instead."],
  [SOCIAL_MEDIA, "On what do the two writers disagree?", "who should decide how phones are used in class", ["whether schools have teachers", "what time school starts", "how tests are graded"], "Compare the two proposals."],
  [SOCIAL_MEDIA, "What evidence would best help evaluate Writer 1's claim?", "test scores in classes with and without phones", ["the price of phones", "a list of phone brands", "students' favorite colors"], "Match evidence to the claim."],
  [SOCIAL_MEDIA, "Which word best describes how the writers emphasize different facts?", "selective", ["identical", "random", "silent"], "Each chooses facts that help their side."],
  [null, "A word with the root “bene-” (good) is most likely to mean…", "helpful", ["harmful", "empty", "ancient"], "Think of “benefit.”"],
  [null, "Which transition shows a contrast?", "however", ["therefore", "in addition", "for example"], "It signals a different idea."],
  [null, "An article's headline is “Heroes of the Harbor.” What does “heroes” suggest about its tone?", "admiring", ["bored", "angry", "neutral"], "Word choice shapes tone."],
  [null, "Which feature of a text helps you find a topic quickly?", "a subheading", ["a period", "a page number only", "a long sentence"], "Subheadings label sections.", true],
];

export const LITERARY_CONNECTIONS_8_MORE: R[] = [
  [FABLE_RETOLD, "Which traditional fable does this modern story draw on?", "The Tortoise and the Hare", ["The Boy Who Cried Wolf", "Cinderella", "The Three Little Pigs"], "Slow and careful beats fast and careless."],
  [FABLE_RETOLD, "Which detail replaces the hare's speed in the modern story?", "Hana tapping answers quickly on an app", ["Leo's friendship", "the test", "the homework itself"], "Who rushes?"],
  [FABLE_RETOLD, "What theme do the old and new stories share?", "Steady care can beat carelessness.", ["Speed is always best.", "Apps are harmful.", "Friends should compete."], "Compare outcomes."],
  [FILM_SCENE, "How does a filmmaker's choice change a story's meaning?", "Showing Priya's joy openly makes her feel immediate and public.", ["Nothing changes.", "It deletes the plot.", "It removes the setting."], "Film shows what a story leaves quiet."],
  [LAGOS_POEM, "What figure of speech is “lanterns bloom like orange flowers”?", "simile", ["metaphor only", "alliteration", "idiom"], "It uses “like.”"],
  [LAGOS_POEM, "What mood does the poem create?", "warm and lively", ["frightening", "empty", "sad"], "Lanterns, songs and a crowded lane."],
  [LAGOS_POEM, "How does the rhyme in the two lines affect the poem?", "It gives it a flowing, musical sound.", ["It makes it a list.", "It makes it a news story.", "It hides the setting."], "Notice “lane” and “rain.”"],
  [null, "A film adds a long chase scene that is not in the book. A critical viewer should ask…", "What does the chase add to the story's meaning?", ["How long is the chase?", "Who built the cars?", "Is the book shorter?"], "Evaluate the choice."],
  [null, "Which is a common theme from myths?", "Pride can lead to a fall.", ["Money grows on trees.", "Weather never changes.", "Rules are for adults."], "Many myths warn about pride."],
  [null, "A narrator who knows every character's thoughts has an…", "omniscient point of view", ["first-person point of view", "objective point of view", "second-person point of view"], "Omniscient means all-knowing.", true],
  [null, "Why might an author retell a myth in a modern setting?", "to show that its lesson still fits today", ["because myths are boring", "to avoid using a theme", "to make the story shorter"], "Old patterns still connect readers.", true],
];

export const ARGUMENTS_AND_SOURCES_8_MORE: R[] = [
  [ESSAY_CLAIM, "What is the author's claim?", "Lunch should be fifteen minutes longer.", ["Lunch should be cancelled.", "Students dislike food.", "Surveys are unreliable."], "Look at the first sentence."],
  [ESSAY_CLAIM, "Which sentence gives evidence?", "A recent survey found that most students finish eating in under ten minutes because of long lines.", ["The school lunch period should be extended.", "Everyone knows that longer lunches make students happier.", "Lunch is at noon."], "Evidence is checkable."],
  [ESSAY_CLAIM, "Which sentence is weakest as evidence?", "“Everyone knows that longer lunches make students happier.”", ["The survey sentence", "The first sentence", "None of them"], "It states a claim with no support."],
  [SPEECH, "What rhetorical device is “Imagine a school where the first thing you hear is running water and laughter”?", "an appeal to the audience's emotions through imagery", ["a statistic", "an expert quote", "a definition"], "It paints a picture."],
  [SPEECH, "Why does the speaker begin with “My friends”?", "to build a connection with the audience", ["to end the speech", "to name a source", "to cite a fact"], "It makes listeners feel included."],
  [null, "An allusion is…", "a short reference to a well-known person, story or event", ["a long speech", "a type of rhyme", "a made-up word"], "“He met his Waterloo” is one."],
  [null, "Which analogy fits “A library is to books as a garage is to…”?", "cars", ["roads", "paint", "keys"], "A garage holds cars."],
  [null, "Two articles about a new stadium give different costs. What should a careful reader do?", "check the original sources for each number", ["trust the longer article", "average the numbers", "ignore both"], "Compare sources, not length."],
  [null, "A writer says “Everyone loves this plan.” What is the problem?", "It is a sweeping claim with no evidence.", ["It uses a statistic.", "It cites an expert.", "It is too short."], "“Everyone” is hard to prove."],
  [null, "Which source is most likely to be reliable for a report on volcanoes?", "a geology agency's website", ["an anonymous comment", "an advertisement", "a rumor"], "Look for expertise.", true],
  [null, "What is a counterclaim?", "an opposing view an author addresses", ["a type of evidence", "a conclusion", "an introduction"], "A strong argument answers it.", true],
];

export const VERBS_VOICE_MOOD_8_MORE: R[] = [
  [null, "Which sentence is in the passive voice?", "The window was broken by the storm.", ["The storm broke the window.", "The storm is strong.", "Storms break windows."], "The subject receives the action."],
  [null, "Change to active voice: “The cake was baked by Sam.”", "Sam baked the cake.", ["The cake bakes Sam.", "Baking was done by Sam.", "Sam was baking the cake."], "Put the doer first."],
  [null, "Which sentence uses the subjunctive mood?", "If I were taller, I could reach the shelf.", ["If I was taller, I reached the shelf.", "I am tall.", "I reach the shelf."], "It states something contrary to fact."],
  [null, "Which word is a gerund? “Running every morning keeps her healthy.”", "Running", ["every", "keeps", "healthy"], "It acts as a noun."],
  [null, "Which phrase contains an infinitive? “He hopes to win the prize.”", "to win", ["hopes to", "the prize", "He hopes"], "to + verb."],
  [null, "Which is a participle used as an adjective? “The excited crowd cheered.”", "excited", ["crowd", "cheered", "The"], "It describes the crowd."],
  [null, "Which mood is “Close the door, please”?", "imperative", ["indicative", "interrogative", "subjunctive"], "It gives a command or request."],
  [null, "Which sentence shows an unnecessary shift in voice?", "Maria painted the fence, and the gate was painted by Leo.", ["Maria painted the fence, and Leo painted the gate.", "The fence was painted, and the gate was painted too.", "Maria painted the fence."], "One verb is active, the other passive."],
  [null, "Which sentence is in the conditional mood?", "If it rains, we would stay home.", ["Stay home.", "We stay home.", "Do we stay home?"], "It states what would happen under a condition."],
  [null, "When is the passive voice a good choice?", "when the doer is unknown or unimportant", ["when you want to sound bossy", "when you want to avoid verbs", "never"], "“The window was broken” works when we don't know who.", true],
];

export const WORLD_LITERATURE_9_MORE: R[] = [
  [LAGOS_POEM, "How does the setting shape the poem's mood?", "A crowded evening market makes it lively and warm.", ["A silent desert makes it lonely.", "A battlefield makes it tense.", "A quiet library makes it still."], "Lanterns, songs and a crowded lane."],
  [FABLE_RETOLD, "How does the modern setting change a traditional fable?", "It updates the details while keeping the lesson.", ["It removes the lesson.", "It makes the story longer.", "It adds a villain."], "Compare to the old tale."],
  [FILM_SCENE, "How does the choice of form (story or film) alter the character's portrayal?", "The film shows emotion openly; the story relies on silence and inference.", ["Both are identical.", "The film leaves out Priya.", "The story shows more action."], "Different media convey meaning differently."],
  [BRIDGE_STORY, "What does the countdown of minutes in the opening create?", "Limited time creates urgency.", ["The bus is slow.", "There is no tension.", "Time is unlimited."], "Count the minutes."],
  [GARDEN_STORY, "Which cultural value does the neighbors' ending most reflect?", "mutual support in a community", ["competition", "secrecy", "isolation"], "They return the kindness."],
  [null, "A complex character is one who…", "has several traits and sometimes conflicting motives", ["has one trait only", "never changes", "appears once"], "Real people are mixed."],
  [null, "An author's cultural point of view affects a story by shaping…", "what the characters value and how they see events", ["the number of pages", "the type of paper", "the font"], "Perspective comes from experience."],
  [null, "Which is an allegory?", "a story in which characters stand for ideas, such as Greed and Hope", ["a list of facts", "a train timetable", "a weather report"], "Allegories have a deeper meaning."],
  [null, "Why might a poet compare a painting and a poem on the same subject?", "to see how each form shows the scene in its own way", ["to prove one is wrong", "to avoid describing it", "to shorten the work"], "Different art forms, different tools."],
  [null, "In a retelling of a myth, the author changes the ending. What should a reader ask?", "What does the new ending say about the story's theme?", ["How many words changed?", "Who printed the book?", "Is the title short?"], "Transformations carry meaning.", true],
];

export const RHETORIC_AND_SOURCES_9_MORE: R[] = [
  [ESSAY_CLAIM, "Which fallacy appears in “everyone knows longer lunches make students happier”?", "bandwagon (appeal to popularity)", ["circular reasoning", "slippery slope", "false cause"], "It relies on what “everyone” supposedly thinks."],
  [FOUNDING_LINE, "Which idea do both lines share?", "equal rights for citizens", ["trade rules", "taxes", "military service"], "Both name rights."],
  [FOUNDING_LINE, "Which line reflects a later change to expand rights?", "Line B", ["Line A", "Both are the same age", "Neither"], "Line B names the right to vote, added by an amendment."],
  [SPEECH, "Which appeal does the speech mainly use?", "pathos, an appeal to emotion", ["logos", "ethos only", "no appeal"], "Imagery and feeling."],
  [SPEECH, "How could the speaker add logos to the argument?", "by giving the repair cost and how many students use the courtyard", ["by telling a joke", "by repeating the words", "by raising their voice"], "Logos uses facts and reasoning."],
  [LIBRARY_ARTICLE, "Which claim in the article would be strongest if supported with data?", "The library has become a place for jobs help and homework.", ["The library will close.", "The library has a studio.", "The changes will take three months."], "Add numbers on visits or programs."],
  [null, "What is a straw man fallacy?", "misrepresenting an opponent's view to attack it easily", ["a careful summary", "an expert quote", "a fair comparison"], "It attacks a weaker version."],
  [null, "Which is an example of circular reasoning?", "“This rule is fair because it is fair.”", ["“This rule applies to everyone, as shown by a study.”", "“The rule was voted on.”", "“The rule is written down.”"], "The reason repeats the claim."],
  [null, "What does “rebuttal” mean?", "an argument that answers an opposing point", ["a first claim", "a list of sources", "a summary"], "A rebuttal pushes back."],
  [null, "A source that gives data but is paid for by a company selling the product should be…", "checked for bias", ["trusted without question", "ignored completely", "copied"], "Ask who benefits.", true],
  [null, "What does “ethos” refer to?", "the credibility of the speaker", ["the logic of the facts", "the emotion of the audience", "the length of the speech"], "Trust in the speaker.", true],
];
