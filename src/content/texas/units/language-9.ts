import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Texas Grade 9 (English I) language units: foreign words and phrases used in English, the examples E1.2(C) names and a
// few more, with denotation and connotation (E1.2(B)); and dramatic conventions (asides, soliloquies, dramatic irony and
// satire, E1.7(C)) with the rhetorical devices and fallacies E1.8(G) names (understatement, overstatement, straw man and
// red herring).

const PHRASES: Q[] = [
  ["What does “bona fide” mean?", "genuine; real", ["fake; copied", "quick; rushed", "secret; hidden"], "Latin for “in good faith.”"],
  ["What is a “caveat”?", "a warning or condition to keep in mind", ["a reward", "a type of food", "a final decision"], "Latin for “let them beware.”"],
  ["If you have “carte blanche,” you have…", "complete freedom to act as you wish", ["no choices at all", "a blank card to fill in for a test", "a small budget"], "French for “blank card.”"],
  ["A “tête-à-tête” is…", "a private conversation between two people", ["a large public speech", "a written contract", "a sports match"], "French for “head to head.”"],
  ["When would you say “bon appétit”?", "before someone starts eating", ["when saying goodbye", "after a mistake", "at the start of a test"], "French for “good appetite.”"],
  ["What is a “quid pro quo”?", "something given in exchange for something else", ["a gift with no strings", "an apology", "a legal punishment"], "Latin for “something for something.”"],
  ["What does “déjà vu” describe?", "the feeling you've already lived through a moment", ["fear of the future", "a sudden idea", "a polite greeting"], "French for “already seen.”"],
  ["What does “per se” mean?", "by itself; in itself", ["for sure", "per person", "on purpose"], "Latin for “by itself.”"],
  ["What does “ad hoc” mean?", "made for one particular purpose, often on the spot", ["planned years ahead", "against the law", "copied exactly"], "Latin for “for this.”"],
  ["What is a “faux pas”?", "an embarrassing social mistake", ["a dance step", "a clever plan", "a formal invitation"], "French for “false step.”"],
  ["What does “status quo” mean?", "the way things are now", ["a big change", "a high rank", "a legal trial"], "Latin for “the state in which.”"],
  ["What does “vice versa” mean?", "the other way around", ["in a bad way", "very quickly", "in secret"], "Latin for “the position turned.”"],
  ["What is a “cul-de-sac”?", "a dead-end street", ["a shopping bag", "a type of cheese", "a highway exit"], "French for “bottom of the bag.”"],
  ["What does “RSVP” ask you to do?", "reply to say whether you will come", ["bring a gift", "arrive early", "dress formally"], "French: répondez s'il vous plaît, please reply."],
  ["What does “alma mater” refer to?", "the school someone graduated from", ["a person's mother", "a hometown", "a first job"], "Latin for “nourishing mother.”"],
  ["What does “de facto” mean?", "existing in fact, even if not official", ["by law only", "in the future", "against the facts"], "Latin for “from the fact.”"],
  ["What does “carpe diem” urge you to do?", "make the most of today", ["save for tomorrow", "wait patiently", "forget the past"], "Latin for “seize the day.”"],
  ["A “rendezvous” is…", "a planned meeting at a set time and place", ["a long journey", "a sudden surprise", "a written report"], "French for “present yourselves.”"],
  ["What does “en route” mean?", "on the way", ["at home", "too late", "off the road"], "French for “on the road.”"],
  ["What is a “protégé”?", "a person guided and helped by a mentor", ["a bodyguard", "a rival", "a teacher"], "French for “protected.”"],
  ["What does the denotation of a word mean?", "its dictionary meaning", ["the feelings it suggests", "its origin language", "how it sounds"], "Denotation is the literal meaning."],
  ["What is a word's connotation?", "the feelings or ideas it suggests beyond its literal meaning", ["its spelling", "its dictionary meaning only", "its part of speech"], "Connotation carries emotion."],
  ["Which word has the most positive connotation?", "thrifty", ["stingy", "cheap", "miserly"], "All mean careful with money; which sounds admirable?"],
  ["Which word has the most negative connotation?", "stubborn", ["determined", "persistent", "steadfast"], "All mean not giving up; which sounds critical?"],
  ["“Home” and “house” share a denotation. How do they differ?", "“Home” suggests warmth and belonging.", ["“House” is a feeling.", "They have different dictionary meanings.", "“Home” is always bigger."], "Think about connotation."],
  ["Which word has a neutral connotation?", "slender", ["skinny", "scrawny", "bony"], "Which one doesn't judge?"],
  ["A writer calls a plan's critics “naysayers.” What does the connotation suggest?", "the critics are negative for no good reason", ["the critics are experts", "the critics are neutral", "the critics agree"], "Naysayer sounds dismissive.", true],
  ["“The committee reached a modus vivendi.” What did they reach?", "a practical arrangement that lets them get along", ["a final war", "a total defeat", "a new law"], "Latin for “way of living.”", true],
  ["What does “raison d'être” mean?", "the most important reason for existing", ["a reason to leave", "a kind of fruit", "a legal excuse"], "French for “reason for being.”", true],
  ["What does “sine qua non” mean?", "something absolutely essential", ["something optional", "a mistake", "a delay"], "Latin for “without which not.”", true],
];

const DRAMA: Q[] = [
  ["What is an aside in a play?", "a short remark to the audience that other characters don't hear", ["a long speech alone on stage", "a scene change", "a list of characters"], "The character turns aside to the audience."],
  ["What is a soliloquy?", "a speech a character gives alone, revealing inner thoughts", ["a conversation between two characters", "a stage direction", "a song by the chorus"], "Solo means alone."],
  ["What is dramatic irony?", "when the audience knows something a character does not", ["when a character tells a joke", "when the play is a comedy", "when two characters argue"], "The audience is ahead of the character."],
  ["What is satire?", "humor or exaggeration used to criticize foolishness or wrongdoing", ["a sad, serious ending", "a speech alone on stage", "a list of props"], "Satire mocks to make a point."],
  ["The audience knows the drink is poisoned, but the hero doesn't. This is…", "dramatic irony", ["a soliloquy", "satire", "an aside"], "Who knows what?"],
  ["A character alone on stage speaks her fears aloud. This is…", "a soliloquy", ["an aside", "dialogue", "satire"], "She is alone and thinking aloud."],
  ["Mid-scene, a character whispers to the audience, “He has no idea I took it.” This is…", "an aside", ["a soliloquy", "a monologue to another character", "a stage direction"], "Others on stage don't hear it."],
  ["A play exaggerates how silly a town council is to criticize real politics. This is…", "satire", ["dramatic irony", "an aside", "a soliloquy"], "It mocks to criticize."],
  ["Why do playwrights use soliloquies?", "to let the audience hear a character's private thoughts", ["to change the setting", "to introduce the cast", "to end every scene"], "Inner thoughts become public."],
  ["Why does dramatic irony build suspense?", "The audience waits to see when the character will learn the truth.", ["The audience is confused.", "The characters know more.", "Nothing is hidden."], "We know; they don't."],
  ["What is understatement?", "describing something as smaller or less serious than it is", ["exaggerating for effect", "repeating a point", "attacking a person"], "It plays things down."],
  ["After a hurricane flattens a town, a resident says, “We've had a bit of wind.” This is…", "understatement", ["overstatement", "a straw man", "a red herring"], "It makes something huge sound small."],
  ["What is overstatement?", "exaggerating something to make a point", ["describing something as smaller than it is", "changing the subject", "twisting an opponent's argument"], "Also called hyperbole."],
  ["“This is the worst day in the history of the universe!” This is…", "overstatement", ["understatement", "a red herring", "a straw man"], "It exaggerates."],
  ["What is a straw man fallacy?", "misrepresenting an opponent's argument so it is easier to attack", ["changing the subject to distract", "using statistics", "agreeing with an opponent"], "A straw man is easy to knock down."],
  ["What is a red herring?", "an unrelated point used to distract from the real issue", ["a fair rebuttal", "an exaggeration", "a twisted version of an argument"], "It throws listeners off the trail."],
  ["“My opponent wants longer recess, so she must think learning doesn't matter.” This is…", "a straw man", ["a red herring", "understatement", "dramatic irony"], "Her real argument was twisted."],
  ["Asked about the budget, a candidate says, “Let's talk about how much I love this town.” This is…", "a red herring", ["a straw man", "understatement", "a soliloquy"], "The answer changes the subject."],
  ["How can a reader answer a straw man?", "point out that the real argument was different", ["agree with the distortion", "change the subject", "exaggerate even more"], "Restate the original argument fairly."],
  ["Why might a writer use understatement on purpose?", "to create dry humor or to make readers feel how serious something is", ["to give exact data", "to cite a source", "to twist the other side"], "Saying less can say more."],
  ["Which sentence is a straw man?", "“People who want a bike lane want to ban all cars.”", ["“A bike lane would make cycling safer.”", "“Some drivers worry about traffic.”", "“The council will vote on bike lanes.”"], "Which misstates the other side?"],
  ["Which response is a red herring in a debate about school start times?", "“Students have too much homework anyway.”", ["“Studies show teens learn better with more sleep.”", "“Later starts could affect bus schedules.”", "“Some schools tried later starts.”"], "Which one changes the subject?"],
  ["In a satire, what is the writer's purpose?", "to criticize something through humor", ["to explain a science process", "to tell a true diary entry", "to give directions"], "Satire has a target."],
  ["Which device do asides and soliloquies share?", "Both reveal a character's thoughts to the audience.", ["Both are spoken to other characters.", "Both are stage directions.", "Both are logical fallacies."], "The audience learns what's inside."],
  ["A character insists he is the most honest man alive, while the audience saw him steal. This creates…", "dramatic irony", ["satire", "a red herring", "understatement"], "We know more than his words admit."],
  ["Which is understatement?", "Calling a broken leg “a little scrape.”", ["Calling a broken leg “the end of the world.”", "Calling a broken leg “a broken leg.”", "Calling a broken leg “painful.”"], "It makes something serious sound minor."],
  ["Why is a red herring a fallacy?", "It avoids the issue instead of answering it.", ["It uses too many facts.", "It exaggerates the issue.", "It agrees with the opponent."], "Distraction is not an answer.", true],
  ["Why does Shakespeare often use soliloquies at turning points?", "to show a character's inner conflict before a big decision", ["to list the cast", "to end the play", "to change the setting"], "Hearing the thinking makes the choice clear.", true],
  ["How do overstatement and a straw man differ?", "Overstatement exaggerates for effect; a straw man distorts an opponent's argument.", ["They are the same fallacy.", "Overstatement is always a lie.", "A straw man is a device for humor."], "One is a device, one a fallacy.", true],
  ["In a comedy, a servant gives the audience a sly wink and a one-line comment. What convention is this?", "an aside", ["a soliloquy", "a chorus", "an epilogue"], "Short and to the audience only.", true],
];

export const LANGUAGE_9: Unit[] = [
  bankUnit({
    id: "tx-g9-borrowed-phrases",
    title: "Borrowed Words & Connotation",
    emoji: "🌍",
    blurb: "Bona fide, caveat, carte blanche and more, plus denotation and connotation.",
    parentNote: "Your teen works out foreign words and phrases often used in English (bona fide, caveat, quid pro quo) and tells a word's dictionary meaning from its connotation.",
    standards: ["E1.2(C); E1.2(B)", "foreign words and phrases used in English, and denotation and connotation"],
    items: PHRASES,
  }),
  bankUnit({
    id: "tx-g9-drama-and-rhetoric",
    title: "Drama, Satire & Fallacies",
    emoji: "🎭",
    blurb: "Asides, soliloquies, dramatic irony and satire; understatement, straw men and red herrings.",
    parentNote: "Your teen identifies dramatic conventions (asides, soliloquies, dramatic irony, satire) and the purpose of understatement and overstatement, and spots straw man and red herring arguments.",
    standards: ["E1.7(C); E1.8(G)", "dramatic conventions, understatement and overstatement, and straw man and red herring fallacies"],
    items: DRAMA,
  }),
];
