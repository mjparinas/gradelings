import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Texas Grade 3 language unit: the genres the Grade 3 ELAR TEKS name (folktales, fables, legends and myths, 3.9(A);
// poems with rhyme schemes, sound devices and stanzas, 3.9(B); plays, 3.9(C)) and hyperbole (3.10(G)).

const TALES: Q[] = [
  ["Which kind of story uses animal characters to teach a lesson?", "a fable", ["a legend", "a biography", "a news report"], "Think of the tortoise and the hare."],
  ["Which kind of story explains something in nature, often with gods or heroes?", "a myth", ["a fable", "a biography", "a recipe"], "Ancient peoples told these to explain the world."],
  ["A story about a hero from long ago, with some events exaggerated, is a…", "legend", ["fable", "poem", "report"], "It may be based on a real person."],
  ["A folktale is a story that…", "was passed down by people telling it aloud", ["was written last week by a scientist", "gives facts about animals", "lists steps to cook"], "Folk means people."],
  ["“The Tortoise and the Hare” ends with a lesson. What kind of story is it?", "a fable", ["a myth", "a legend", "a biography"], "Animal characters plus a lesson."],
  ["Why did the ancient Greeks tell the myth of Persephone?", "to explain the seasons", ["to teach adding", "to sell food", "to describe a city"], "She spends part of the year away, and winter comes."],
  ["A group of lines in a poem is called a…", "stanza", ["paragraph", "chapter", "caption"], "Poems are built from lines and stanzas."],
  ["In the rhyme scheme AABB, which lines rhyme?", "lines 1 and 2, then lines 3 and 4", ["lines 1 and 3, then lines 2 and 4", "no lines", "only lines 1 and 4"], "Lines with the same letter rhyme."],
  ["In the rhyme scheme ABAB, which lines rhyme?", "lines 1 and 3, then lines 2 and 4", ["lines 1 and 2, then lines 3 and 4", "no lines", "only lines 2 and 3"], "Lines with the same letter rhyme."],
  ["“Buzz,” “crash” and “pop” are examples of…", "onomatopoeia", ["hyperbole", "a rhyme scheme", "a stanza"], "These words sound like what they name."],
  ["“Silly snakes slide south” uses which sound device?", "alliteration", ["rhyme", "onomatopoeia", "a stanza"], "Listen to the first sounds."],
  ["“I'm so hungry I could eat a horse.” This is…", "hyperbole", ["a fact", "onomatopoeia", "a stanza"], "It is a huge exaggeration."],
  ["Why do writers use hyperbole?", "to exaggerate for effect or humor", ["to give exact facts", "to list steps", "to name a source"], "Nobody could really eat a horse."],
  ["Which sentence is hyperbole?", "My backpack weighs a ton.", ["My backpack is blue.", "My backpack has two pockets.", "I carry my backpack to school."], "Which one is a wild exaggeration?"],
  ["Which sentence is hyperbole?", "I've told you a million times!", ["I told you twice.", "I will tell you later.", "Did I tell you?"], "Which one could not really be true?"],
  ["Which is a simile?", "as quiet as a mouse", ["a quiet mouse", "the mouse ran", "mice are small"], "A simile compares using like or as."],
  ["In many folktales, the trickster character is…", "clever and sneaky", ["the author", "always a king", "a real person from history"], "Tricksters fool other characters."],
  ["Many fairy tales begin with…", "“Once upon a time”", ["“In conclusion”", "“Step one”", "“Dear Sir”"], "It sets up a make-believe long ago."],
  ["Which word finishes the rhyme? “The cat sat on the ___.”", "mat", ["rug", "bed", "chair"], "It should rhyme with cat and sat."],
  ["What makes a poem look different from a story?", "it is written in lines and stanzas", ["it has no words", "it always tells facts", "it has chapters"], "Look at how a poem sits on the page."],
  ["A myth is most likely to include…", "gods with special powers", ["a recipe", "a bus schedule", "a times table"], "Myths are old stories about gods and heroes."],
  ["Which is most likely the moral of a fable?", "Slow and steady wins the race.", ["The fox lived in a den.", "It rained on Tuesday.", "The end."], "A moral is a lesson."],
  ["Which character would most likely be in a legend?", "a brave hero who did great deeds", ["a calculator", "a weather map", "a shopping list"], "Legends are about heroes."],
  ["“The bacon sizzled in the pan.” Which word is onomatopoeia?", "sizzled", ["bacon", "pan", "the"], "Which word sounds like the noise?"],
  ["Which sentence is a hyperbole about being tired?", "I could sleep for a hundred years.", ["I am a bit tired.", "I went to bed at eight.", "I yawned once."], "Which one stretches the truth?"],
  ["How were folktales first shared?", "by telling them out loud", ["on websites", "in newspapers", "in science books"], "Long ago, many people shared stories by speaking."],
  ["A tale explains “why the bear has a short tail.” What kind of tale is it most likely?", "a folktale about how something began", ["a news report", "a science article", "a biography"], "It explains how something came to be.", true],
  ["In which kind of text do you find acts and scenes?", "a play", ["a poem", "a fable", "a legend"], "It is written to be acted out.", true],
  ["Lines 1 and 2 end in “day” and “play”; lines 3 and 4 in “night” and “light.” What is the rhyme scheme?", "AABB", ["ABAB", "ABCD", "ABBA"], "Pairs that sit together rhyme.", true],
  ["In a play, the words a character says are called…", "dialogue", ["a stanza", "a moral", "a caption"], "Characters talk to each other.", true],
];

export const LANGUAGE_3: Unit[] = [
  bankUnit({
    id: "tx-g3-tales-and-poems",
    title: "Tales, Poems & Hyperbole",
    emoji: "🐉",
    blurb: "Fables, folktales, legends, myths, rhyme schemes and hyperbole.",
    parentNote: "Your child tells fables, folktales, legends and myths apart, reads rhyme schemes and stanzas, and spots sound devices and hyperbole.",
    standards: ["3.9(A); 3.9(B); 3.9(C); 3.10(G)", "folktales, fables, legends, myths, poems, plays and hyperbole"],
    items: TALES,
  }),
];
