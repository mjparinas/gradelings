import { q, qe, type Item, type Level } from "../kit";

// More Grade 8 English language arts practice, appended to the banks in language.ts.

const DEVICE = "Which literary device does this excerpt use?";
const dev = (level: Level, text: string, right: string, wrong: string[], hint: string): Item => qe(level, text, DEVICE, right, wrong, hint);

export const DEVICES_DEEP: Item[] = [
  dev(1, "The ancient clock ticked and tocked in the hallway.", "Onomatopoeia", ["Simile", "Irony", "Symbolism"], "“Ticked” and “tocked” imitate the clock's sounds."),
  dev(1, "She stayed as quiet as a mouse during the test.", "Simile", ["Metaphor", "Hyperbole", "Irony"], "“As quiet as” uses “as” to compare, so it is a simile."),
  dev(1, "The old car coughed and refused to start.", "Personification", ["Simile", "Alliteration", "Hyperbole"], "Cars can't cough or refuse. Giving human actions to a thing is personification."),
  dev(2, "Brave Ben bounced the big ball back.", "Alliteration", ["Onomatopoeia", "Irony", "Flashback"], "Many words begin with the same “b” sound."),
  dev(2, "The firefighter, who was afraid of heights, was hired to rescue cats from trees.", "Irony", ["Simile", "Hyperbole", "Onomatopoeia"], "A firefighter afraid of heights is the opposite of what we would expect."),
  dev(2, "The empty swing creaked in the wind, and the old house seemed to hold its breath.", "Personification", ["Simile", "Hyperbole", "Flashback"], "A house can't hold its breath. That is a human action given to a thing."),
  dev(2, "The raven that appeared at every sad moment seemed to stand for loss.", "Symbolism", ["Alliteration", "Hyperbole", "Simile"], "The raven represents a bigger idea, loss, so it is a symbol."),
  dev(3, "The hallway was a river of students flowing toward the gym.", "Metaphor", ["Simile", "Personification", "Irony"], "It says the hallway WAS a river, with no “like” or “as.”"),
  dev(3, "The room fell silent, as still as a held breath.", "Simile", ["Metaphor", "Hyperbole", "Foreshadowing"], "“As still as” compares two things using “as.”"),
  dev(3, "There were a billion people in line for the new game.", "Hyperbole", ["Simile", "Irony", "Symbolism"], "There weren't really a billion people. The extreme exaggeration is hyperbole."),
  dev(3, "Mara checked the lock three times before leaving. That night, the porch light began to flicker.", "Foreshadowing", ["Flashback", "Irony", "Metaphor"], "Details that hint at trouble to come are foreshadowing."),
];

export const GRAMMAR_DEEP: Item[] = [
  q(1, "Which sentence uses commas correctly in a list?", "We packed tents, stoves and sleeping bags.", ["We packed, tents stoves and sleeping bags.", "We packed tents stoves, and sleeping, bags.", "We, packed tents, stoves and sleeping bags."], "Separate the items in a list with commas."),
  q(1, "Choose the correct word: “The students finished __ projects.”", "their", ["there", "they're", "thier"], "“Their” shows that the projects belong to the students."),
  q(1, "Which sentence begins and ends correctly?", "Did you see the eclipse last night?", ["did you see the eclipse last night?", "Did you see the eclipse last night.", "did you see the eclipse last night."], "A sentence starts with a capital letter, and a direct question ends with a question mark."),
  q(1, "Choose the correct verb: “The team __ practising today.”", "is", ["are", "were", "be"], "“Team” is one group, so it takes “is.”"),
  q(1, "Choose the correct word: “Please put the book over __.”", "there", ["their", "they're", "thair"], "“There” points to a place."),
  q(2, "Which sentence uses “than” correctly?", "Mei is taller than her brother.", ["Mei is taller then her brother.", "Mei is more tall then her brother.", "Mei is taller, than, her brother."], "“Than” compares two things. “Then” tells when."),
  q(2, "Which sentence is in the present perfect tense?", "They have visited the museum twice.", ["They visited the museum twice.", "They will visit the museum twice.", "They had visited the museum twice."], "Present perfect uses “have” or “has” plus the past participle."),
  q(2, "Which sentence contains a prepositional phrase?", "The cat slept on the warm blanket.", ["The cat slept soundly.", "Cats sleep a lot.", "The cat is tired."], "“On the warm blanket” starts with a preposition and ends with a noun."),
  q(2, "Which sentence puts a title in quotation marks correctly?", "We read “The Road Not Taken” in class.", ["We read The Road Not Taken” in class.", "We “read” The Road Not Taken in class.", "We read “The Road” Not Taken in class."], "Put the titles of short works, such as poems, inside quotation marks."),
  q(2, "Which sentence uses a comma correctly in a compound sentence?", "I wanted to swim, but the pool was closed.", ["I wanted to swim but, the pool was closed.", "I wanted to swim but the pool, was closed.", "I wanted, to swim but the pool was closed."], "Put the comma before the conjunction that joins two complete sentences."),
  q(2, "Which sentence uses a colon correctly before a list?", "You will need three things: a pencil, paper and an eraser.", ["You will need: three things a pencil, paper and an eraser.", "You will need three: things a pencil, paper and an eraser.", "You will: need three things, a pencil paper and an eraser."], "Use a colon after a complete sentence to introduce a list."),
  q(3, "Which sentence is a complex sentence?", "Although it was late, we kept working.", ["We kept working, and it was late.", "We kept working.", "It was late; we kept working."], "A complex sentence has one independent clause and one dependent clause. “Although it was late” cannot stand alone."),
  q(3, "Which sentence uses the subjunctive mood correctly?", "If I were you, I would apologize.", ["If I was you, I would apologize.", "If I am you, I would apologize.", "If I be you, I would apologize."], "Use “were” for wishes and things that are not true."),
  q(3, "Which sentence has correct pronoun agreement?", "Each student brought his or her own lunch.", ["Each student brought our own lunch.", "Each of the student brought his or her own lunch.", "Each students brought his or her own lunch."], "The pronoun and the noun it refers to must match in number and person."),
  q(3, "Which sentence uses dashes correctly?", "The result—a perfect score—surprised everyone.", ["The result—a perfect score, surprised everyone.", "The—result a perfect score—surprised everyone.", "The result a perfect—score surprised everyone."], "A pair of dashes sets off extra information, like parentheses but stronger."),
  q(3, "Which sentence is free of a comma splice?", "The sun set; the temperature dropped.", ["The sun set, the temperature dropped.", "The sun set, then, the temperature dropped.", "The sun set the temperature, dropped."], "A comma alone can't join two complete sentences. Use a semicolon, a period or a conjunction."),
];

export const WORDS_DEEP: Item[] = [
  q(1, "The prefix “pre-” in “preview” means…", "before", ["after", "not", "between"], "Pre- means before: to view before."),
  q(1, "The suffix “-er” in “teacher” shows…", "a person who does something", ["without", "full of", "again"], "-er can mean one who does: one who teaches."),
  q(1, "What does “antonym” mean?", "A word with the opposite meaning", ["A word with a similar meaning", "A word that sounds the same", "A word that rhymes"], "Ant- means against. Antonyms are opposites."),
  q(1, "The prefix “mis-” in “misread” means…", "wrongly", ["again", "before", "under"], "Mis- means wrongly: to read wrongly."),
  q(2, "The Greek root “tele” means “far.” What does a “telescope” help you do?", "see things far away", ["hear music", "measure time", "write quickly"], "Tele (far) + scope (look) = look at faraway things."),
  q(2, "The Latin root “dict” means “say.” What does “dictate” most likely mean?", "to say aloud for someone to write down", ["to read silently", "to draw a picture", "to count"], "Dict means say, so to dictate is to speak words aloud."),
  q(2, "The root “therm” means “heat.” What is a “thermometer”?", "a tool that measures temperature", ["a tool that measures distance", "a tool that measures weight", "a tool that measures sound"], "Therm (heat) + meter (measure)."),
  q(2, "Which word has the most negative connotation?", "stubborn", ["determined", "persistent", "firm"], "All four describe someone who won't give up, but “stubborn” feels negative."),
  q(2, "Which word has a more positive connotation than “cheap”?", "affordable", ["stingy", "flimsy", "worthless"], "Both describe a low price, but “affordable” feels positive."),
  q(2, "Which pair are synonyms?", "brave / courageous", ["hot / cold", "early / late", "simple / complex"], "Synonyms mean nearly the same thing."),
  q(3, "Read: “The lecture was so tedious that half the audience began to doze.” What does “tedious” most likely mean?", "long and boring", ["exciting", "short", "loud"], "The clue is that people began to doze."),
  q(3, "Read: “Maya's candid answer surprised us; she told us exactly what she thought.” What does “candid” mean?", "honest and direct", ["secret", "rude", "uncertain"], "The clue is that she told us exactly what she thought."),
  q(3, "The root “chron” means “time.” Which word means “arranged in the order events happened”?", "chronological", ["geological", "biographical", "alphabetical"], "Chron (time) + logical: in time order."),
  q(3, "“It's raining cats and dogs.” This idiom means…", "it is raining very hard", ["animals are falling from the sky", "it is raining lightly", "it will rain tomorrow"], "An idiom's meaning differs from its literal words."),
];
