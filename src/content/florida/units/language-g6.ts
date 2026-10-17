import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Florida's own Grade 6 English language arts units (`fl-` ids): rhetorical appeals and types of reasoning, poetic
// forms and shifts in narrator, and accounts of one topic from different authors and times. The passages are original.
// Reading only.

const APPEALS: Q[] = [
  ["A rhetorical appeal is…", "a way a writer persuades an audience", ["a kind of rhyme", "a part of a book", "a page number"], "Writers appeal to trust, feelings or logic."],
  ["Ethos is an appeal to…", "the speaker’s credibility", ["emotions", "logic", "rhyme"], "Ethos means character or trust."],
  ["Pathos is an appeal to…", "emotions", ["credibility", "logic", "rhythm"], "Pathos means feeling."],
  ["Logos is an appeal to…", "logic and reason", ["emotions", "credibility", "rhythm"], "Logos means logic."],
  ["“As a doctor with 20 years of experience, I recommend more sleep.” This appeals to…", "ethos", ["pathos", "logos", "none"], "The speaker uses their expertise."],
  ["“Imagine a lonely puppy waiting in a cold shelter. Please adopt.” This appeals to…", "pathos", ["ethos", "logos", "none"], "It stirs feelings.", true],
  ["“Studies show 9 of 10 students who sleep 8 hours earn better grades.” This appeals to…", "logos", ["ethos", "pathos", "none"], "It uses data."],
  ["Which sentence is the best example of pathos?", "Think of the children who go to bed hungry tonight.", ["The average meal costs three dollars.", "I have studied nutrition for years.", "Meals are served at noon."], "Pathos stirs feelings."],
  ["Which sentence is the best example of ethos?", "As a lifelong teacher, I know what helps students succeed.", ["Think of the sad faces.", "Two out of three students agree.", "The bell rings at nine."], "The speaker shows expertise."],
  ["Which sentence is the best example of logos?", "Schools with gardens saw science scores rise by 12 percent.", ["I am a trusted gardener.", "Gardens make everyone happy.", "Imagine a beautiful garden."], "It uses numbers and reasoning."],
  ["Which type of appeal uses statistics?", "logos", ["pathos", "ethos", "none"], "Facts and data appeal to logic."],
  ["Which type of appeal uses a personal story to make you care?", "pathos", ["logos", "ethos", "none"], "Stories stir feelings."],
  ["A famous athlete in an ad for sneakers is using…", "ethos", ["logos", "pathos", "rhyme"], "Fame builds trust."],
  ["A charity ad shows a sad animal with big eyes. This mostly uses…", "pathos", ["logos", "ethos", "rhyme"], "It aims at feelings."],
  ["Reasoning that moves from a cause to its effect is called…", "cause-and-effect reasoning", ["reasoning by analogy", "reasoning by authority", "reasoning by rhyme"], "If this, then that."],
  ["“Cities with more trees are cooler, so planting trees will cool our town.” This uses…", "cause-and-effect reasoning", ["analogy", "authority", "emotion"], "Trees cause cooler temperatures."],
  ["“A school is like a team: everyone must work together.” This uses…", "analogy", ["cause and effect", "statistics", "authority"], "It compares two things.", true],
  ["“Experts at the health department say washing hands stops germs.” This uses reasoning by…", "authority", ["analogy", "cause and effect", "emotion"], "It relies on experts.", true],
  ["An argument that uses a story about one person to prove a claim for everyone is reasoning by…", "example", ["analogy", "authority", "statistics"], "One example may not prove a general claim.", true],
  ["Which is a weakness in an argument?", "a claim with no evidence", ["a clear claim", "relevant evidence", "a strong example"], "Evidence is needed."],
  ["A writer says, “Everyone knows this is true.” This is…", "an unsupported claim", ["strong evidence", "a statistic", "an expert source"], "No facts are given."],
  ["Which appeal would be strongest in a speech asking people to give blood after a disaster?", "pathos with logos", ["rhyme only", "no appeals", "alliteration only"], "Feelings and facts together.", true],
  ["To judge an appeal to ethos, ask…", "Is this person a trustworthy expert on the topic?", ["Is the text long?", "Does it rhyme?", "Is it on paper?"], "Check credibility."],
  ["To judge an appeal to logos, ask…", "Is the evidence accurate and does it support the claim?", ["Is it sad?", "Is it famous?", "Does it rhyme?"], "Check facts and logic."],
  ["An ad shows a smiling family and says “Happy families choose Bright Bites.” This is mostly…", "pathos", ["logos", "ethos", "a fact"], "It links feelings to the product.", true],
];

const FORMS: Q[] = [
  ["A narrative poem…", "tells a story", ["is only a list", "has no lines", "gives directions"], "Narrative means story."],
  ["A sonnet has how many lines?", "14", ["10", "8", "20"], "A sonnet has 14."],
  ["A ballad is…", "a poem that tells a story, often meant to be sung", ["a poem with three lines", "a list of facts", "a funny five-line poem"], "Ballads often have a simple beat."],
  ["An ode is a poem that…", "praises or honors something", ["tells jokes", "lists facts", "gives directions"], "It celebrates."],
  ["An elegy is a poem that…", "mourns or remembers someone or something lost", ["makes jokes", "gives directions", "describes a game"], "It is serious and sad."],
  ["A haiku has…", "three short lines", ["fourteen lines", "five funny lines", "no lines"], "Think of a tiny poem."],
  ["Free verse is…", "a poem without a set rhyme or rhythm pattern", ["a poem that must rhyme", "a poem of exactly 14 lines", "a song"], "The poet chooses the shape."],
  ["A limerick is…", "a short, funny poem of five lines", ["a sad poem", "a poem of 14 lines", "a list"], "It has a bouncy rhythm."],
  ["Which form of poem would best honor a hero?", "an ode", ["a limerick", "a list", "a recipe"], "An ode praises."],
  ["Which form best remembers a lost friend?", "an elegy", ["a limerick", "a haiku about snacks", "an ad"], "An elegy mourns.", true],
  ["Which form tells a long story in verse?", "a ballad", ["a haiku", "a couplet", "a title"], "A ballad is a story poem."],
  ["The form of a poem can…", "shape its meaning and feeling", ["hide its meaning", "stop the rhyme", "replace the title"], "Form and meaning go together."],
  ["Short, even lines can make a poem feel…", "steady and calm", ["wild", "angry", "confusing"], "Even lines feel orderly.", true],
  ["Lines that break suddenly can make a poem feel…", "urgent or surprising", ["slow", "boring", "formal"], "Breaks create tension.", true],
  ["A poem’s style is shaped by…", "word choice, sound and structure", ["page number", "cover color", "author’s age"], "Style is how it is written."],
  ["“I walked along the shore alone / the waves sang in my ear.” The poem’s speaker is…", "the person telling the poem", ["the author’s teacher", "the waves", "the shore"], "The speaker says “I.”"],
  ["A narrator tells a story using “I.” This is…", "first person", ["second person", "third person", "no person"], "I means first person."],
  ["A story is told by Mia in chapter 1 and by her brother in chapter 2. The story has…", "multiple narrators", ["no narrator", "one narrator", "an author narrator"], "Different people tell the story."],
  ["Why would an author switch narrators?", "to show events from different points of view", ["to make the book shorter", "to end the story", "to remove a character"], "Each narrator sees things differently."],
  ["A shift in point of view happens when…", "the story changes who is telling it or whose thoughts we hear", ["the setting changes", "the author changes", "a rhyme appears"], "Watch who is telling."],
  ["Chapter 1 (Ana): “I was scared of the dark basement.” Chapter 2 (Leo): “I didn’t know Ana was scared.” How do the narrators differ?", "they know different things", ["they are the same person", "they are in different books", "they are poets"], "Each tells their own view.", true],
  ["A second narrator’s account can change how you see…", "the first narrator’s choices", ["the cover", "the page count", "the title font"], "A new view adds understanding.", true],
  ["Which word shows a narrator is telling a story as a character?", "my", ["their", "its", "those"], "My is first person."],
  ["Which words show third-person narration?", "she, he, they", ["I, me, my", "we, us, our", "you, your"], "The narrator is outside the story."],
  ["A poem in three stanzas where each stanza is spoken by a different person has…", "multiple speakers", ["no speaker", "one speaker", "no stanza"], "Each stanza has a new voice.", true],
];

const TIMES: Q[] = [
  ["Two accounts of the same event can differ because…", "authors have different purposes and perspectives", ["one is a poem", "the event changed", "both are wrong"], "People write for different reasons."],
  ["An author’s purpose in a news report is usually to…", "inform", ["persuade only", "entertain only", "sell something"], "News gives facts."],
  ["An author’s purpose in an editorial is usually to…", "persuade", ["inform only", "entertain only", "list ingredients"], "Editorials argue."],
  ["Account A: “The storm tore roofs from homes.” Account B: “Volunteers rushed to help the families.” Both accounts are about…", "the same storm", ["different storms", "a poem", "a recipe"], "Same event, different focus."],
  ["Account A focuses on damage. Account B focuses on rescue. They differ in…", "what they emphasize", ["the event", "the year", "the weather"], "Each stresses a different part."],
  ["Which question helps compare two accounts?", "What does each author want readers to know or feel?", ["Which is on thicker paper?", "Which has a larger font?", "Which has more pages?"], "Think about purpose."],
  ["A report from 1900 and one from today describe the same city. What might differ?", "word choice and what the authors thought was important", ["the city", "the grammar rules", "the date of the event"], "Time shapes perspective.", true],
  ["Authors from different time periods may use…", "different words and beliefs", ["the same beliefs", "the same sources", "the same cover"], "Language and views change."],
  ["An older text uses the word “carriage” where a modern text says “car.” This shows…", "language changes over time", ["a spelling error", "a different topic", "a poem"], "Words change as time passes."],
  ["How can a reader tell an author’s purpose?", "look at word choice, structure and what the text asks readers to do", ["count the pages", "look at the cover", "check the author’s age"], "Clues are in the text."],
  ["A text uses words like “shocking” and “disgraceful.” The author’s perspective is…", "strongly critical", ["neutral", "excited", "confused"], "The words show disapproval.", true],
  ["A text uses words like “calm,” “steady” and “fair.” The author’s tone is…", "balanced", ["angry", "mocking", "frightened"], "Calm words show a balanced tone.", true],
  ["Two articles about a new law: one calls it “protection,” one calls it “control.” What does this show?", "different perspectives", ["the same view", "a poem", "a mistake"], "Word choice shows viewpoint.", true],
  ["A reader should compare accounts to…", "decide which details are reliable and why", ["decide which is longer", "find the title", "copy the first one"], "Compare evidence."],
  ["Two authors write about the same topic centuries apart. Which could be the same in both?", "the topic or theme", ["the vocabulary", "the spelling", "the format"], "Topics can last.", true],
  ["A diary from the 1800s and a modern article both describe farm life. Which is likely a primary source?", "the diary", ["the article", "both", "neither"], "The diary writer lived it."],
  ["An author from long ago writes about freedom as a right. A modern author writes about it too. They both address…", "the same theme", ["different themes", "no theme", "a recipe"], "Theme can span time.", true],
  ["Why might a modern author explain old words?", "readers may not know them", ["the author is unsure", "to fill space", "to make rhymes"], "Language changes."],
  ["Which would be most useful to compare how two eras viewed the same event?", "a speech from each era", ["two covers", "two page counts", "two fonts"], "Compare how each describes it.", true],
  ["Which is a sign that an account is trying to persuade?", "it uses strong opinion words and asks for action", ["it lists dates only", "it has a table", "it has headings"], "Persuasion uses appeals.", true],
  ["The central idea of an account is…", "its most important point, supported by details", ["its first sentence", "its last sentence", "its title"], "Details support the central idea."],
  ["Account A is written by someone who lived through the event. Account B is written 50 years later by a historian. How do they differ?", "A is firsthand, B draws on many sources", ["A is secondary", "B is firsthand", "they are the same"], "Compare their sources.", true],
  ["Two authors both write about a space launch. One includes quotes from crew members. That author is probably adding…", "firsthand details", ["rhymes", "jokes", "a title"], "Quotes from people who were there are firsthand."],
  ["When two accounts disagree, a careful reader should…", "check for more evidence", ["decide quickly", "ignore both", "pick the older one"], "Use more sources."],
  ["Which of these is the strongest reason to trust a source?", "it cites evidence and experts", ["it is popular", "it is long", "it is colorful"], "Reliable sources show their evidence.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "fl-g6-appeals-and-reasoning",
    title: "Appeals & Reasoning",
    emoji: "🎤",
    blurb: "Ethos, pathos, logos and the kinds of reasoning arguments use.",
    parentNote:
      "Florida’s Grade 6 standards ask students to identify rhetorical appeals in a text and to track the development of an argument, identifying the types of reasoning used. Students name ethos, pathos or logos in short passages and tell whether an argument reasons from cause and effect, an analogy, an authority or an example.",
    standards: ["ELA.6.R.3.4; ELA.6.R.2.4", "rhetorical appeals, and the types of reasoning in an argument"],
    items: APPEALS,
  }),
  bankUnit({
    id: "fl-g6-poetic-forms-and-narrators",
    title: "Poem Forms & Narrators",
    emoji: "🎻",
    blurb: "Sonnets, ballads, odes and who is telling the story.",
    parentNote:
      "Florida’s Grade 6 standards ask students to describe the impact of various poetic forms on meaning and style and to explain the influence of multiple narrators and shifts in point of view. Students name a poem’s form, tell how its shape affects feeling and notice whose view a narrator gives.",
    standards: ["ELA.6.R.1.4; ELA.6.R.1.3", "poetic forms and their impact, and multiple narrators and shifts in point of view"],
    items: FORMS,
  }),
  bankUnit({
    id: "fl-g6-accounts-across-time",
    title: "Accounts Across Time",
    emoji: "🕰️",
    blurb: "How authors in different times and with different purposes treat one topic.",
    parentNote:
      "Florida’s Grade 6 standards ask students to analyze authors’ purposes in multiple accounts of the same event and to compare how authors from different time periods address the same or related topics. Students compare what two accounts stress and what a writer’s word choice shows.",
    standards: ["ELA.6.R.2.3; ELA.6.R.3.3", "authors’ purposes in multiple accounts, and authors from different time periods on one topic"],
    items: TIMES,
  }),
];
/** Put the own units before the planned ones. */
export const FIRST = false;
