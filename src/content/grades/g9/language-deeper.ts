import { q, qe, type Item, type Level } from "../kit";

// More Grade 9 English language arts practice, appended to the banks in language.ts.

const DEVICE = "Which literary device does this excerpt use?";
const dev = (level: Level, text: string, right: string, wrong: string[], hint: string): Item => qe(level, text, DEVICE, right, wrong, hint);

export const ELEMENTS_DEEP: Item[] = [
  dev(1, "The moon winked at us from behind a cloud.", "Personification", ["Simile", "Irony", "Hyperbole"], "The moon can't wink. Human actions are given to a non-human thing."),
  dev(1, "Her voice was honey, slow and sweet.", "Metaphor", ["Simile", "Onomatopoeia", "Allusion"], "Her voice IS honey, with no “like” or “as.”"),
  dev(1, "The bees buzzed and the screen door slammed.", "Onomatopoeia", ["Metaphor", "Irony", "Foil"], "“Buzzed” and “slammed” imitate sounds."),
  dev(2, "When Jin finally opened the dusty trunk, he remembered the winter his grandfather taught him to whittle.", "Flashback", ["Foreshadowing", "Motif", "Irony"], "The story jumps back to an earlier time. That is a flashback."),
  dev(2, "The lighthouse appears at the start of every chapter, casting the same slow beam across the water.", "Motif", ["Foil", "Hyperbole", "Allusion"], "A repeated image that supports the theme is a motif."),
  dev(2, "After the argument, he slammed the door so hard the whole country must have heard it.", "Hyperbole", ["Simile", "Irony", "Symbolism"], "The whole country could not have heard it. The exaggeration stresses how hard he slammed it."),
  dev(2, "She was a Goliath on the basketball court, towering over everyone.", "Allusion", ["Simile", "Onomatopoeia", "Foil"], "A reference to a well-known figure, here the giant Goliath, is an allusion."),
  dev(3, "The miser feared only one thing, losing his money, and he lost it by hiding it so well that he could never find it again.", "Situational irony", ["Verbal irony", "Dramatic irony", "Foil"], "The result is the opposite of what the miser wanted."),
  dev(3, "The white flag fluttered over the ruined fort, and the soldiers lowered their weapons.", "Symbolism", ["Motif", "Allusion", "Hyperbole"], "The white flag stands for a bigger idea: surrender."),
  dev(3, "The reader has just seen the sailor steal the captain's map, yet the captain warmly thanks the sailor for his loyalty.", "Dramatic irony", ["Verbal irony", "Foil", "Allusion"], "The reader knows something the captain does not. That gap is dramatic irony."),
  dev(3, "“Oh, I just love waiting in line for two hours,” Priya said with a grin.", "Verbal irony", ["Situational irony", "Hyperbole", "Personification"], "Priya says the opposite of what she means. That is verbal irony."),
  dev(3, "Rain fell like drummers practising on the tin roof.", "Simile", ["Metaphor", "Personification", "Allusion"], "“Like drummers” makes an explicit comparison with “like.”"),
];

export const TONE_DEEP: Item[] = [
  qe(1, "The kitten chased its own tail in circles until it flopped over, dizzy and delighted.", "What is the tone?", "playful and affectionate", ["grim and serious", "bitter", "fearful"], "The writer describes the kitten in a light, fond way."),
  qe(1, "The old house sat silent at the end of the lane, its windows dark and its gate hanging by one rusty hinge.", "What is the mood?", "gloomy and abandoned", ["cheerful and busy", "exciting and fast", "warm and welcoming"], "Silence, darkness and a broken gate create a lonely, gloomy feeling."),
  qe(2, "The author writes that “the policy has failed, and every month of delay costs families dearly.”", "What is the tone?", "urgent and critical", ["humorous", "uncertain", "detached and neutral"], "Words like “failed” and “costs families dearly” show strong concern."),
  qe(2, "“Fine,” Dev said, not looking up. “Do whatever you want. It's not like I care.”", "What does his tone suggest?", "He is hurt but pretending not to care.", ["He is truly indifferent.", "He is delighted.", "He is confused."], "Not looking up and the sharp words suggest hidden hurt."),
  qe(3, "The field was golden and still. Somewhere a screen door creaked, and for a moment she was seven again, barefoot, with nowhere to be.", "What best describes the mood?", "nostalgic and peaceful", ["tense and fearful", "angry and bitter", "chaotic and loud"], "Remembering childhood in a calm setting creates a gentle, nostalgic mood."),
  qe(3, "The memo reminds staff, in the mildest terms, that the deadline “may perhaps be worth keeping in mind.”", "What is the tone of this sentence?", "mildly polite and indirect", ["harsh and threatening", "excited and urgent", "angry and loud"], "Hedging words like “may perhaps” soften the message."),
];

export const GRAMMAR_DEEP: Item[] = [
  q(1, "Which sentence uses a comma after an introductory phrase correctly?", "After the assembly, we went to lunch.", ["After, the assembly we went to lunch.", "After the assembly we, went to lunch.", "After the assembly we went, to lunch."], "Put a comma after an introductory phrase."),
  q(1, "Choose the correct word: “__ the one who called?”", "Who's", ["Whose", "Whos", "Who is's"], "“Who's” means “who is.” “Whose” shows ownership."),
  q(1, "Which sentence uses an apostrophe correctly?", "Everyone's coat is on the hook.", ["Everyones coat is on the hook.", "Everyone's coat's is on the hook.", "Everyones' coat is on the hook."], "Add an apostrophe and s to show that something belongs to “everyone.”"),
  q(1, "Choose the correct verb: “Neither the teacher nor the students __ ready yesterday.”", "were", ["was", "is", "be"], "With “neither… nor,” the verb agrees with the closer subject: students (plural)."),
  q(2, "Which sentence uses “fewer” correctly?", "There were fewer cars on the road today.", ["There were less cars on the road today.", "There was fewer traffic today.", "There were lesser cars on the road today."], "Use “fewer” for things you can count, like cars."),
  q(2, "Which sentence has a dangling modifier?", "Having finished the test, the bell rang.", ["Having finished the test, I heard the bell ring.", "After I finished the test, the bell rang.", "The bell rang after I finished the test."], "The bell didn't finish the test. The opening phrase has no matching subject."),
  q(2, "Which sentence uses “whom” correctly?", "She is the player whom the coach praised.", ["She is the player whom scored twice.", "Whom is the player in the red jersey?", "She is the player whom praised the coach."], "Use “whom” for the object of a verb or preposition: the coach praised her."),
  q(2, "Which sentence sets off an appositive correctly?", "Our neighbour, a retired pilot, grows tomatoes.", ["Our neighbour a retired pilot, grows tomatoes.", "Our neighbour, a retired pilot grows tomatoes.", "Our, neighbour a retired pilot, grows tomatoes."], "Commas surround an appositive, a phrase that renames a noun."),
  q(2, "Which sentence is in the future perfect tense?", "By June, we will have finished the project.", ["By June, we finished the project.", "By June, we will finish the project.", "By June, we have finished the project."], "Future perfect uses “will have” plus the past participle."),
  q(3, "Which sentence is a comma splice?", "The test was hard, I passed.", ["The test was hard, but I passed.", "The test was hard; I passed.", "The test was hard. I passed."], "A comma alone can't join two complete sentences."),
  q(3, "Which sentence uses a hyphen correctly?", "She gave a thought-provoking speech.", ["She gave a thought provoking-speech.", "She gave a thought-provoking-speech.", "She gave a thoughtprovoking speech."], "Join the two words that work together as one describing word before a noun."),
];

export const STYLE_DEEP: Item[] = [
  q(1, "Which word has the most positive connotation?", "curious", ["nosy", "snoopy", "meddling"], "All describe someone who asks questions, but “curious” sounds positive."),
  q(1, "Which sentence is more concise?", "The meeting starts at noon.", ["The meeting is going to be starting at the hour of noon.", "At the time of twelve noon the meeting will start to begin.", "The meeting, which is happening, starts at noon time."], "Concise writing says the same thing in fewer words."),
  q(1, "What is a thesis statement?", "The main argument of an essay", ["The title of an essay", "A list of sources", "The last sentence of every paragraph"], "A thesis states the central claim the essay will support."),
  q(2, "Which sentence uses a formal register?", "Please accept our sincere apologies for the delay.", ["Sorry 'bout the wait!", "My bad, the thing got stuck.", "Whoops, we're late!"], "Formal writing uses complete, polite wording and no slang."),
  q(2, "What is the effect of a very short sentence after several long ones?", "It creates emphasis.", ["It makes the writing unclear.", "It makes the tone informal.", "It hides the main idea."], "A short sentence after long ones stands out and draws attention."),
  q(2, "Which is a rhetorical question?", "Who wouldn't want cleaner parks?", ["What time does the park open?", "Where is the nearest park?", "How many parks are in the city?"], "A rhetorical question is asked for effect, not to get an answer."),
  q(2, "Which word is the most formal?", "purchase", ["buy", "grab", "snag"], "“Purchase” is the most formal way to say buy."),
  q(2, "Why do writers often use the active voice in persuasive writing?", "It sounds direct and confident.", ["It makes sentences longer.", "It hides who did the action.", "It is required in every sentence."], "Active voice names the doer and sounds strong."),
  q(3, "“The room was silent as a tomb.” What does “tomb” add beyond the meaning “quiet”?", "A connotation of death and heaviness", ["A suggestion of cheerfulness", "A technical meaning", "Nothing at all"], "A tomb brings the idea of death, which makes the silence feel heavy."),
  q(3, "A writer ends each paragraph with a question to the reader. What is the main effect?", "It invites the reader to think and keeps them engaged.", ["It proves the claim with statistics.", "It makes the tone more formal.", "It shortens the essay."], "Questions pull the reader into thinking along with the writer."),
  q(3, "Which revision removes wordiness best? “Due to the fact that it was raining, we made the decision to stay home.”", "Because it was raining, we stayed home.", ["Due to rain, a decision was made by us to stay home.", "Because of the fact of raining, we stayed home.", "We stayed home due to the fact that it was raining."], "Replace long phrases with short, direct ones."),
  q(3, "Which word choice creates the most intense tone?", "furious", ["annoyed", "bothered", "irritated"], "All describe anger, but “furious” is the strongest."),
];
