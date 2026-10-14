import type { Unit } from "../../types";
import { passage, readingUnit, type R } from "./language-kit";

// California's own Grade 8 English language arts units: comparing structures, film and stage versions and modern
// retellings of old stories (CA CCSS RL.8.5, RL.8.7, RL.8.9); connections, word meaning, point of view and
// conflicting sources in information texts (RI.8.3, RI.8.4, RI.8.6, RI.8.9); and verbals, voice and mood (L.8.1,
// L.8.3). Every story, poem and passage is original.

const LETTERS = passage(
  "Text A: Letters from Camp (told in letters)",
  "June 3 — Dear Mom, The cabin smells like pine and wet socks. I already miss home.",
  "June 17 — Dear Mom, I passed my swim test! Don't send the extra blanket. I'm too busy to be cold.",
);
const SAME_CAMP = passage(
  "Text B: Summer at Pine Lake (told in order by a narrator)",
  "Eli arrived at Pine Lake homesick and quiet. Over two weeks, he learned to swim the length of the dock and made friends in every cabin.",
);
const SONNET_FREE = passage(
  "Two Poems About Rain",
  "Poem 1 rhymes in a strict pattern, with fourteen lines of equal rhythm, like rain falling steadily on a roof.",
  "Poem 2 is free verse: some lines are one word long, others spill across the page, like a sudden storm.",
);
const RETELLING = passage(
  "Modern Story: The Kid Who Flew Too High",
  "Iker built a drone in his garage and promised his dad he would keep it low. But at the park, with everyone watching, he sent it higher and higher, until the wind snatched it and it crashed into the lake.",
);
const OLD_TALE = passage(
  "Old Tale: The Boy Who Cried Wolf",
  "A shepherd boy shouted “Wolf!” for fun, again and again, until the villagers stopped believing him. When a real wolf came, no one answered his call.",
);
const PHONE_STORY = passage(
  "Modern Story: Breaking News",
  "Tess posted fake alerts about snow days to prank her classmates. The week a real storm closed the school, nobody believed her post, and half the class showed up to a locked building.",
);
const SCREENPLAY = passage(
  "Novel and Film",
  "In the novel, Rosa's grandmother is stern and silent until the last chapter, when she finally tells her story.",
  "In the film, the director shows the grandmother's story in flashbacks from the very first scene.",
);

const LITERARY_CONNECTIONS: R[] = [
  [LETTERS, "How does the letter structure of Text A shape its meaning?", "It shows the writer's feelings changing in his own words over time.", ["It hides the writer's feelings.", "It gives an outside narrator's view.", "It lists facts about the camp."], "Each dated letter is a snapshot of feelings."],
  [SAME_CAMP, "How does Text B's structure differ from Text A's?", "A narrator summarizes the change in order, from the outside.", ["It is written as dated letters.", "It is a list of rules.", "It is a poem."], "Who is telling Text B?"],
  [LETTERS, "What effect does the gap between June 3 and June 17 create?", "It lets readers infer what happened in between from how the writer changed.", ["It confuses the reader about the year.", "It shows the letters were lost.", "It has no effect."], "Two weeks pass between letters."],
  [SAME_CAMP, "Which text gives a reader a more personal voice?", "Text A, because the camper writes for himself", ["Text B, because a narrator explains", "Neither text", "Both equally"], "First-person letters sound personal."],
  [SONNET_FREE, "How does Poem 1's strict structure connect to its subject?", "Its steady rhythm imitates steady rain.", ["It shows chaos.", "It has no connection.", "It imitates thunder."], "Read how Poem 1 is described."],
  [SONNET_FREE, "How does Poem 2's structure create a different style?", "Its uneven lines feel sudden and wild, like a storm.", ["It feels calm and even.", "It rhymes perfectly.", "It is a list of facts."], "Free verse has no fixed pattern."],
  [OLD_TALE, "Which modern story draws on the same pattern as “The Boy Who Cried Wolf”?", "Breaking News", ["The Kid Who Flew Too High", "Summer at Pine Lake", "Letters from Camp"], "Look for repeated false alarms."],
  [PHONE_STORY, "How does “Breaking News” make the old tale new?", "It replaces a shepherd and wolf with fake online alerts about snow days.", ["It keeps the wolf and the village.", "It changes the theme to bravery.", "It has no connection to the old tale."], "Compare the details."],
  [PHONE_STORY, "What theme do the old tale and the modern story share?", "People stop trusting someone who lies, even when they tell the truth.", ["Snow is dangerous.", "Wolves are clever.", "Pranks are always harmless."], "What happens when the real event comes?"],
  [RETELLING, "Which old story pattern does “The Kid Who Flew Too High” draw on?", "a character who ignores a warning and goes too high, then falls", ["a trickster who outsmarts a giant", "a poor girl who marries a prince", "a race between a fast and a slow animal"], "Think of myths about flying too close to danger."],
  [RETELLING, "Which detail echoes the ignored warning in old myths?", "he promised his dad he would keep it low", ["he built a drone in his garage", "everyone was watching", "the park had a lake"], "Who warned him, and what did he do?"],
  [RETELLING, "What character type from traditional stories does Iker fit?", "the overconfident youth", ["the wise elder", "the trickster", "the helpful animal"], "He thinks he can't fail."],
  [SCREENPLAY, "How does the film depart from the novel?", "It reveals the grandmother's story early through flashbacks instead of at the end.", ["It leaves out the grandmother.", "It changes the setting to space.", "It keeps the same order."], "Compare when her story is told."],
  [SCREENPLAY, "What is one effect of the director's choice?", "The mystery around the grandmother is lost, but viewers understand her sooner.", ["The film becomes a comedy.", "The grandmother becomes the villain.", "It has no effect on viewers."], "Showing her story early changes suspense."],
  [SCREENPLAY, "Which question best evaluates whether the film stays faithful to the novel?", "Does the film keep the novel's main events and themes?", ["Is the film longer than the book?", "Is the film in color?", "Did the actors win awards?"], "Faithful means true to the original."],
  [null, "In a stage production, the actor playing a villain speaks softly and kindly. What might this choice add?", "an unsettling contrast that makes the villain creepier", ["a happy ending", "a comic scene", "nothing at all"], "Actors' choices shape meaning."],
  [null, "A film of a novel adds a new character who isn't in the book. What should a critical viewer ask?", "Why did the director add this character, and does it change the story's meaning?", ["Is the character's name long?", "How much did the costume cost?", "Is the book out of print?"], "Evaluate the choice, not just notice it."],
  [null, "Why do modern authors often borrow patterns from myths and traditional tales?", "Old patterns carry themes readers recognize, which new details can refresh.", ["They cannot think of new ideas.", "It is required by law.", "To make books shorter."], "Shared patterns connect readers across time."],
  [null, "Which is a common character type in traditional stories?", "the trickster", ["the lab technician", "the tax accountant", "the traffic engineer"], "Tricksters appear in tales around the world."],
  [null, "A story told backward, starting with the ending, mainly creates…", "curiosity about how events led there", ["confusion that ruins the story", "a list of facts", "a rhyme scheme"], "Structure affects how readers experience a plot."],
  [LETTERS, "Which detail best shows the writer's change?", "“I'm too busy to be cold.”", ["“The cabin smells like pine.”", "“Dear Mom”", "“June 3”"], "Compare his mood in the two letters."],
  [OLD_TALE, "Why did no one answer the boy's real call?", "He had lied so often that they stopped believing him.", ["The villagers were asleep.", "The wolf was too quiet.", "He called too softly."], "Read the first sentence again."],
  [SONNET_FREE, "Two poems share a subject but differ in form. What does comparing them reveal?", "Form itself shapes the feeling of a poem.", ["Only rhyming poems are real poems.", "Rain is boring.", "Form does not matter."], "Same topic, different structures, different effects."],
  [null, "In a film, slow motion during a key moment usually…", "stretches the moment to show its importance", ["skips the moment", "makes it funny", "speeds up the plot"], "Directors use time to create emphasis."],
  [PHONE_STORY, "How is Tess's consequence different from the shepherd boy's?", "Her classmates are inconvenienced rather than in danger.", ["She loses her sheep.", "A wolf appears at school.", "Nothing happens to anyone."], "Compare what goes wrong in each.", true],
  [SAME_CAMP, "Which detail in Text B tells what Text A only lets readers infer?", "he learned to swim the length of the dock", ["Pine Lake", "two weeks", "every cabin"], "Text A says he passed his swim test.", true],
  [RETELLING, "How does the modern setting change the old warning story?", "Technology replaces wings, but the lesson about pride stays.", ["The story becomes about friendship.", "The warning is removed.", "The father is the one who flies."], "What changes and what stays the same?", true],
  [SCREENPLAY, "An actor plays the grandmother as warm instead of stern. How is the film now departing from the novel?", "It changes her personality, not just the order of events.", ["It keeps her exactly as the novel describes.", "It adds a new setting.", "It changes only the title."], "The novel describes her as stern and silent.", true],
];

const DEBATE = passage(
  "Should Cities Ban Cars Downtown?",
  "Car-free downtowns are cleaner and safer. After one city closed its central streets to cars, air pollution there dropped by a fifth, and fewer pedestrians were injured.",
  "Some business owners argue that customers who drive will stop coming. It is true that a few stores lost sales in the first months. However, foot traffic rose by the end of the first year, and most shops reported higher sales.",
);
const TEXT_A = passage(
  "Text A: The Millbrook Flood (a newspaper report from that week)",
  "When the old dam above Millbrook gave way, the water reached the town in about 10 minutes. The report praised the mayor for ordering everyone uphill.",
);
const TEXT_B = passage(
  "Text B: What Really Saved Millbrook (a study written years later)",
  "Using the dam's records, the study estimates the water took closer to 25 minutes to reach town. It argues that a mill worker's warning siren, not the mayor's order, gave people time to escape.",
);
const BEES_WASPS = passage(
  "Bees and Wasps",
  "Bees and wasps are both insects that can sting, but they differ in important ways. Bees are fuzzy and feed on nectar and pollen. Wasps are smooth and many hunt other insects.",
  "A honeybee usually dies after stinging, because its barbed stinger stays in the skin. A wasp can sting again and again.",
);
const BRAIN = passage(
  "Your Brain Is Like a Muscle",
  "Scientists often compare the brain to a muscle. Just as lifting weights builds strength, practicing a hard skill strengthens connections between brain cells.",
  "This idea suggests that ability is not fixed. With effort and good strategies, people can get better at almost anything.",
);
const WELL = passage(
  "The Opening Line",
  "The new library is a Pandora's box of possibilities: once you open its doors, you can't put the ideas back inside.",
);

const ARGUMENTS_AND_SOURCES: R[] = [
  [DEBATE, "What is the author's point of view?", "Cities should ban cars downtown.", ["Cars should be cheaper.", "Stores should close.", "Pollution is not a problem."], "Look at the first sentence."],
  [DEBATE, "How does the author acknowledge conflicting evidence?", "by admitting a few stores lost sales at first", ["by ignoring business owners", "by saying pollution rose", "by calling business owners foolish"], "Find where the author mentions the other side."],
  [DEBATE, "How does the author respond to the conflicting evidence?", "by showing that sales and foot traffic rose by the end of the year", ["by changing their opinion", "by agreeing cars should stay", "by insulting the opposing side"], "Read the sentence that begins “However.”"],
  [DEBATE, "Why does acknowledging the other side make the argument stronger?", "It shows the author considered objections and can answer them.", ["It makes the argument shorter.", "It proves the other side is right.", "It hides the evidence."], "Answering objections builds trust."],
  [TEXT_A, "On what fact do Text A and Text B disagree?", "how long the water took to reach the town", ["the name of the town", "that a dam gave way", "that people escaped uphill"], "Compare the times."],
  [TEXT_B, "Which text says the mill worker's siren saved the town?", "Text B", ["Text A", "both texts", "neither text"], "Text A praises the mayor instead."],
  [TEXT_B, "Why might Text B's time be more reliable?", "It is based on the dam's records and careful study.", ["Its number is smaller.", "It is shorter.", "It was written first."], "Consider how each source got its information."],
  [TEXT_A, "What should a careful reader do when two texts give different numbers?", "check the sources and methods behind each number", ["choose the larger number", "average them without checking", "ignore the topic"], "Disagreements call for investigation."],
  [BEES_WASPS, "How does the author show the distinction between bees and wasps?", "by comparing their bodies, food and stingers", ["by telling a story about a picnic", "by listing honey recipes", "by describing only bees"], "Look at each difference named."],
  [BEES_WASPS, "Which category do both bees and wasps belong to?", "insects that can sting", ["animals that make honey", "insects without wings", "animals that hunt mammals"], "Find what the first sentence says they share."],
  [BEES_WASPS, "Why can a honeybee usually sting only once?", "Its barbed stinger stays in the skin.", ["It runs out of venom.", "It is too fuzzy.", "It only eats nectar."], "Read the second paragraph."],
  [BRAIN, "What analogy does the author use?", "The brain is like a muscle that grows stronger with exercise.", ["The brain is like a computer that never changes.", "The brain is like a sponge that dries out.", "The brain is like a rock."], "Look at the first sentence."],
  [BRAIN, "How does the analogy support the author's idea?", "It helps readers see that practice can build ability, like exercise builds strength.", ["It proves the brain is a muscle.", "It shows weights are dangerous.", "It suggests ability never changes."], "Connect the comparison to the main idea."],
  [WELL, "The author calls the library “a Pandora's box of possibilities.” What does this allusion suggest?", "Once ideas are let out, they can't be contained.", ["The library is full of danger.", "The library is closing.", "The box is locked forever."], "In the Greek myth, what came out of the box couldn't be put back."],
  [WELL, "How does the allusion affect the tone of the sentence?", "It makes the library sound powerful and exciting.", ["It makes the library sound boring.", "It makes the library sound sad.", "It makes the tone confusing and angry."], "The author is praising the library."],
  [null, "An author describes a policy as “reckless.” What does this word choice show?", "The author strongly disapproves.", ["The author is neutral.", "The author approves.", "The author is unsure."], "Reckless has a strong negative connotation."],
  [null, "A science text uses the word “current” to describe moving water. What is its meaning?", "a flow of water in one direction", ["happening now", "electricity", "a type of fish"], "Context gives the technical meaning."],
  [null, "Which phrase signals that an author is about to address an opposing view?", "Critics may argue that…", ["For example…", "In conclusion…", "First of all…"], "It introduces the other side."],
  [null, "An editorial uses only statistics that support its view and leaves out others. What should a reader conclude?", "The editorial may be one-sided.", ["The editorial is complete.", "The statistics must be false.", "Editorials never use statistics."], "What is left out matters."],
  [null, "Two articles describe the same protest. One calls the crowd “a few hundred”; the other says “thousands.” What is the best next step?", "look for an official count or a third source", ["trust the larger number", "trust the smaller number", "decide the protest didn't happen"], "Check against other evidence."],
  [null, "An author writes, “While some studies found no effect, the largest and most recent study found a clear benefit.” What is the author doing?", "acknowledging conflicting evidence and responding to it", ["hiding evidence", "telling a story", "making a joke"], "The author names both kinds of studies."],
  [null, "Which is an analogy?", "Learning a language is like learning to ride a bike: wobbly at first, then natural.", ["Learning a language takes time.", "Many people speak two languages.", "Spanish is a language."], "An analogy explains by comparison."],
  [null, "An author says a decision was “the Achilles' heel” of a team's plan. What does this allusion mean?", "a single weak point that caused trouble", ["the strongest part", "a lucky break", "the final score"], "In the myth, Achilles had only one weak spot."],
  [DEBATE, "Which detail most directly supports the claim that car-free streets are safer?", "fewer pedestrians were injured", ["air pollution dropped by a fifth", "foot traffic rose", "most shops reported higher sales"], "Safety is about injuries."],
  [BEES_WASPS, "Which sentence makes a connection between body structure and behavior?", "A honeybee usually dies after stinging, because its barbed stinger stays in the skin.", ["Bees are fuzzy.", "Wasps are smooth.", "Both are insects."], "Look for a because-sentence.", true],
  [TEXT_B, "Do Text A and Text B disagree on fact or on interpretation?", "both: they give different times and credit different people", ["only on the town's name", "neither: they agree completely", "only on the dam's size"], "Look at numbers and at explanations.", true],
  [DEBATE, "Which sentence would further strengthen the author's response to business owners?", "A survey of downtown shops found 8 of 10 would keep the car ban.", ["Cars are noisy.", "Some people like driving.", "The city has many parks."], "Strong responses use relevant evidence.", true],
  [BRAIN, "What is a weakness of the brain-muscle analogy?", "The brain is not literally a muscle, so the comparison has limits.", ["It is too long.", "It uses numbers.", "It has no meaning at all."], "Analogies explain but don't prove.", true],
];

const VERBS_VOICE_MOOD: R[] = [
  [null, "Which word is a gerund? “Swimming is my favorite exercise.”", "Swimming", ["is", "favorite", "exercise"], "A gerund is a verb form ending in -ing used as a noun."],
  [null, "Which word is a participle? “The broken window let in the cold.”", "broken", ["window", "let", "cold"], "A participle is a verb form used as an adjective."],
  [null, "Which phrase is an infinitive? “She wants to learn guitar.”", "to learn", ["She wants", "guitar", "wants to"], "An infinitive is to + a verb."],
  [null, "What is the job of the gerund in “Reading calms me down”?", "It acts as the subject.", ["It acts as an adjective.", "It is the main verb.", "It is an adverb."], "Reading is what the sentence is about."],
  [null, "What is the job of “sleeping” in “The sleeping puppy snored”?", "It describes the puppy, like an adjective.", ["It is the subject.", "It is the main verb.", "It is a noun."], "Which puppy? The sleeping one."],
  [null, "Which sentence is in the active voice?", "The chef cooked a huge meal.", ["A huge meal was cooked by the chef.", "A huge meal was cooked.", "The meal was being cooked."], "In active voice, the subject does the action."],
  [null, "Which sentence is in the passive voice?", "The window was broken by the ball.", ["The ball broke the window.", "The ball is round.", "The window is clean."], "In passive voice, the subject receives the action."],
  [null, "Change to passive voice: “The committee chose the winner.”", "The winner was chosen by the committee.", ["The committee was chosen by the winner.", "The winner chose the committee.", "The committee is choosing."], "Make the receiver of the action the subject."],
  [null, "Why might a news report say “Mistakes were made” instead of naming who made them?", "The passive voice can hide or downplay who is responsible.", ["The passive voice is always clearer.", "It is shorter than any active sentence.", "It names the person more clearly."], "Who made the mistakes? The sentence doesn't say."],
  [null, "Why might a scientist write “The samples were heated to 100°C”?", "to focus on the process instead of the person doing it", ["to hide a mistake", "to sound informal", "to tell a story"], "Lab reports often use passive voice on purpose."],
  [null, "Which sentence is in the imperative mood?", "Close the door quietly.", ["The door is closed.", "Is the door closed?", "If the door were closed, we'd be warm."], "Imperatives give commands."],
  [null, "Which sentence is in the interrogative mood?", "Did you finish the project?", ["Finish the project.", "You finished the project.", "If you finished, we could go."], "Interrogative means asking a question."],
  [null, "Which sentence is in the subjunctive mood?", "If I were taller, I would play center.", ["I am tall.", "Be taller.", "Am I tall?"], "Subjunctive often expresses a wish or something not true."],
  [null, "Which sentence is in the conditional mood?", "If it rained, we would stay inside.", ["It rained yesterday.", "Stay inside.", "Is it raining?"], "Conditional sentences often use would."],
  [null, "Which sentence uses the subjunctive correctly?", "I wish I were on vacation.", ["I wish I was being on vacation.", "I wish I am on vacation.", "I wish I be on vacation."], "Use were for wishes, even with I."],
  [null, "Which sentence uses the subjunctive correctly?", "The coach insisted that he arrive early.", ["The coach insisted that he arrives early.", "The coach insisted that he arrived early.", "The coach insisted that he arriving early."], "After insist that, use the base verb: arrive."],
  [null, "Which sentence has an inappropriate shift in voice?", "Maya painted the fence, and then the gate was painted by her.", ["Maya painted the fence and the gate.", "The fence and gate were painted by Maya.", "Maya painted the fence, and then she painted the gate."], "Keep the same voice within a sentence."],
  [null, "Which sentence has an inappropriate shift in mood?", "Open your book, and you should read chapter 2.", ["Open your book and read chapter 2.", "You should open your book and read chapter 2.", "Please open your book and read chapter 2."], "Don't switch from a command to a statement."],
  [null, "Which sentence correctly fixes this shift? “If I was mayor, I will build more parks.”", "If I were mayor, I would build more parks.", ["If I was mayor, I would built more parks.", "If I am mayor, I would build more parks.", "If I were mayor, I will build more parks."], "Use were and would together."],
  [null, "Which mood do the steps of a recipe mostly use?", "imperative", ["interrogative", "subjunctive", "conditional"], "Recipes give commands: mix, stir, bake."],
  [null, "Which sentence best uses active voice for a strong, direct effect?", "Firefighters rescued three children from the flames.", ["Three children were rescued from the flames.", "The flames were where children were.", "A rescue was made."], "Active voice names who acted."],
  [null, "Which verbal phrase adds detail to this sentence? “___, the hikers reached the summit.”", "Exhausted but proud", ["Summit the hikers", "Reached was", "To summit"], "A participle phrase can describe the subject."],
  [null, "Which sentence uses an infinitive to show purpose?", "We left early to beat the traffic.", ["We left early.", "Leaving early is smart.", "The traffic was beaten."], "To + verb can tell why."],
  [null, "Which sentence is in the indicative mood?", "The museum opens at nine.", ["Open the museum.", "Does the museum open at nine?", "If the museum were open, we'd go."], "Indicative states facts or opinions."],
  [null, "In “The singing birds woke us,” what part of speech does the participle act as?", "adjective", ["noun", "verb", "adverb"], "Singing describes the birds.", true],
  [null, "Why might a writer choose the subjunctive in “If only we were braver”?", "to express a wish that is not true now", ["to give a command", "to ask a question", "to state a fact"], "The subjunctive expresses wishes and the unreal.", true],
  [null, "Which revision changes the passive “The award was won by our team” to active voice?", "Our team won the award.", ["The award was won.", "Winning the award was our team.", "The team was awarded by the win."], "Make the team the subject that acts.", true],
  [null, "Which sentence correctly uses a gerund phrase as the object?", "She enjoys painting landscapes.", ["She painting enjoys landscapes.", "Painting she enjoys landscapes.", "She enjoys to painting landscapes."], "Painting landscapes is what she enjoys.", true],
];

export const LITERARY_CONNECTIONS_8: Unit = readingUnit({
  id: "ca-g8-literary-connections",
  title: "Literary Connections",
  emoji: "🏛️",
  blurb: "Structures, adaptations and old patterns.",
  parentNote:
    "Your child compares how two texts' structures shape meaning, judges how a film or stage version follows or departs from the text, and finds how modern stories reuse themes, patterns and character types from myths and traditional tales.",
  standards: [
    "RL.8.5; RL.8.7; RL.8.9",
    "comparing text structures, film and stage versions of a text, and modern stories that draw on myths and traditional tales",
  ],
  items: LITERARY_CONNECTIONS,
});

export const ARGUMENTS_AND_SOURCES_8: Unit = readingUnit({
  id: "ca-g8-arguments-and-sources",
  title: "Arguments and Sources",
  emoji: "🧭",
  blurb: "Analogies, viewpoints and disagreements.",
  parentNote:
    "Your child analyzes how authors connect and distinguish ideas through comparisons, analogies and categories, interprets allusions and word choice, sees how an author responds to conflicting evidence, and decides where two texts disagree on facts or interpretation.",
  standards: [
    "RI.8.3; RI.8.4; RI.8.6; RI.8.9",
    "comparisons, analogies and categories, word meaning and allusions, an author's point of view and response to conflicting evidence, and texts that disagree",
  ],
  items: ARGUMENTS_AND_SOURCES,
});

export const VERBS_VOICE_MOOD_8: Unit = readingUnit({
  id: "ca-g8-verbs-voice-mood",
  title: "Verbals, Voice and Mood",
  emoji: "🎚️",
  blurb: "Gerunds, passive voice and the subjunctive.",
  parentNote:
    "Your child identifies gerunds, participles and infinitives, uses active and passive voice, recognizes the indicative, imperative, interrogative, conditional and subjunctive moods, fixes shifts in voice and mood, and chooses them for effect.",
  standards: [
    "L.8.1; L.8.3",
    "verbals, active and passive voice, verb moods and shifts, and choosing voice and mood for effect",
  ],
  items: VERBS_VOICE_MOOD,
});

export const LANGUAGE_8: Unit[] = [LITERARY_CONNECTIONS_8, ARGUMENTS_AND_SOURCES_8, VERBS_VOICE_MOOD_8];
