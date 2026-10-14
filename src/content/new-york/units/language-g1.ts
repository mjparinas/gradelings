import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// New York's own Grade 1 language units (`ny-` ids). No shared unit practises 1R4 (words for feelings and senses), 1R8
// (the information an author gives to support an idea), 1L6 (joining words such as "because"), 1L4 (multiple-meaning
// words, context and word endings), 1RF1 (the features of a sentence), 1W4 (responding to a text) or 1W6 and 1W7
// (asking questions and finding answers in sources), so these banks do. Prompts stay within 80 characters and four
// choices, and every sentence is original.

const FEELINGS_AND_REASONS: Q[] = [
  ["“Jada grinned and hugged her trophy.” Which word shows a feeling?", "grinned", ["trophy", "her", "and"], "Which word tells what her face did?"],
  ["“Omar's lip shook, and a tear rolled down.” How does Omar feel?", "sad", ["proud", "silly", "bored"], "Tears and a shaky lip show sadness."],
  ["“Eva gasped when the balloon popped.” How did Eva feel?", "surprised", ["sleepy", "bored", "calm"], "A gasp is a quick breath when something startles you."],
  ["“The bread smelled warm and yummy.” Which sense is used?", "smell", ["touch", "hearing", "sight"], "Look for the word “smelled.”"],
  ["“The leaves crunched under our boots.” Which sense is used?", "hearing", ["taste", "smell", "sight"], "Crunching is a sound."],
  ["“The lemon was so sour!” Which sense is used?", "taste", ["hearing", "sight", "touch"], "Sour is a taste."],
  ["“The rock felt cold and bumpy.” Which words tell about touch?", "cold and bumpy", ["the rock", "felt", "and"], "Find the words that tell how it felt."],
  ["Which word tells how something looks?", "sparkly", ["crunchy", "squeaky", "salty"], "Use your eyes for this word."],
  ["Which word tells how something sounds?", "buzzing", ["fluffy", "sweet", "striped"], "Bees make this sound."],
  ["“Max was nervous. His hands shook.” Which detail shows he was nervous?", "His hands shook.", ["Max was here.", "He had hands.", "It was a day."], "Find the detail that shows the feeling."],
  ["“Bats are helpful. They eat lots of bugs.” Why are bats helpful?", "They eat bugs.", ["They are black.", "They fly at night.", "They hang upside down."], "Find the sentence that tells why."],
  ["“Trees help us. They give shade on hot days.” Which detail supports the idea?", "They give shade.", ["Trees are tall.", "Trees are green.", "Trees have bark."], "Which detail shows how trees help?"],
  ["“Camels can go a long time without water.” What is a fact the author gives?", "Camels can go without water.", ["Camels are silly.", "Camels are the best.", "I want a camel."], "A fact is something true the author tells."],
  ["“Ducks stay dry. Their feathers have oil.” Why do ducks stay dry?", "Their feathers have oil.", ["They swim.", "They quack.", "They have feet."], "Look for the reason in the text."],
  ["Which word best joins the ideas? “I wore a coat ___ it was cold.”", "because", ["but", "or", "the"], "This word gives a reason."],
  ["Which word best joins the ideas? “I like peas ___ I like corn.”", "and", ["because", "or", "so"], "This word adds one more thing."],
  ["Which word best joins the ideas? “I was tired, ___ I kept going.”", "but", ["and", "so", "because"], "This word shows something different."],
  ["Which word best joins the ideas? “It rained, ___ we stayed in.”", "so", ["but", "or", "if"], "This word tells what happened next as a result."],
  ["Which word best joins the ideas? “Do you want milk ___ juice?”", "or", ["and", "because", "so"], "This word gives a choice."],
  ["“The kitten was frightened.” Which word means the same as frightened?", "scared", ["happy", "hungry", "sleepy"], "A frightened kitten might hide.", true],
  ["“Pia stomped off and slammed the door.” Which words show she is angry?", "stomped and slammed", ["Pia and door", "off and the", "the door"], "Look for the action words.", true],
  ["“Snakes smell with their tongues.” Which sense does the author tell about?", "smell", ["hearing", "sight", "taste"], "Read the word after “Snakes.”", true],
  ["“Bikes are good. They are quiet and make no smoke.” How many reasons?", "two", ["one", "three", "four"], "Quiet is one. No smoke is another.", true],
  ["Which sentence uses “because” the right way?", "We clapped because the show was fun.", ["We clapped because.", "Because we clapped.", "We because clapped."], "“Because” comes before the reason.", true],
  ["“The wind howled.” What does “howled” help you hear?", "a loud, long wind sound", ["a soft, quiet wind", "no sound at all", "a ringing bell"], "Howling is a long, loud sound.", true],
  ["“Owls have big eyes, so they see in the dark.” What helps owls see?", "big eyes", ["soft feathers", "sharp claws", "short legs"], "Find the detail before “so.”", true],
];

const WORD_CLUES: Q[] = [
  ["“I hit the ball with a bat.” What does “bat” mean here?", "a stick to hit with", ["an animal that flies", "a hat", "a big cat"], "Here you hit a ball with it."],
  ["“A bat flew out of the cave.” What does “bat” mean here?", "an animal that flies", ["a stick to hit with", "a ball", "a rock"], "This one flies out of a cave."],
  ["“I can fly a kite.” What does “fly” mean here?", "make it go up in the air", ["a small bug", "to swim", "to fall down"], "You do this with a kite."],
  ["“A fly buzzed by my ear.” What does “fly” mean here?", "a small bug", ["move in the air", "a kite", "a bird"], "This one buzzes."],
  ["“Please ring the bell.” What does “ring” mean here?", "make it sound", ["a circle on a finger", "a round shape", "to run"], "A bell makes a sound."],
  ["“She wore a gold ring.” What does “ring” mean here?", "jewelry for a finger", ["a sound", "a phone call", "a doorbell"], "You wear this one."],
  ["“The pup was so tiny it fit in my hand.” What does “tiny” mean?", "very small", ["very big", "very loud", "very fast"], "It fit in a hand."],
  ["What is the base word in “jumping”?", "jump", ["ping", "jum", "ing"], "Take off the ending -ing."],
  ["What is the base word in “looked”?", "look", ["ked", "loo", "ok"], "Take off the ending -ed."],
  ["“Walked” means the walking happened…", "before now", ["right now", "later", "never"], "The ending -ed often means it already happened."],
  ["Which word means two or more cups?", "cups", ["cup", "cupped", "cupping"], "Adding -s can mean more than one."],
  ["“The dog is wet and muddy.” What does “muddy” mean?", "covered in mud", ["very clean", "very hungry", "very old"], "Look inside the word: mud."],
  ["How does the first word of a sentence start?", "with a capital letter", ["with a period", "with a comma", "with a question mark"], "Sentences start with a capital letter."],
  ["What goes at the end of a telling sentence?", "a period", ["a capital letter", "a comma", "a space"], "Telling sentences end with a dot."],
  ["What goes at the end of an asking sentence?", "a question mark", ["a period", "a capital letter", "a dash"], "Questions end with ?"],
  ["Which is written like a sentence?", "My cat naps.", ["my cat naps", "My cat naps", "my cat naps."], "Look for a capital at the start and a mark at the end."],
  ["Which sentence is written the right way?", "We go to the park.", ["we go to the park.", "We go to the park", "we go to the park"], "Check the start and the end."],
  ["In “Sam has a red cap.” which word starts the sentence?", "Sam", ["red", "cap", "has"], "Find the first word with a capital."],
  ["“The sun will set soon.” What does “set” mean here?", "go down in the sky", ["a group of toys", "to put down", "a TV"], "The sun goes down at night.", true],
  ["“Please set the cups on the table.” What does “set” mean here?", "put down", ["go down in the sky", "a group", "to break"], "You put cups somewhere.", true],
  ["What does “unlock” mean?", "to open a lock", ["to lock again", "a big lock", "a lost key"], "Un- can mean the opposite.", true],
  ["What does “replay” mean?", "play again", ["not play", "play badly", "stop playing"], "Re- means again.", true],
  ["“The giant tree was taller than the house.” What does “giant” mean here?", "very big", ["very small", "very green", "very old"], "It was taller than a house.", true],
  ["Which word ends the same way as “jumped” and “played”?", "kicked", ["kicking", "kicks", "kick"], "Look for the ending -ed.", true],
  ["How many sentences are here? “I see a frog. It hops.”", "two", ["one", "three", "four"], "Count the periods.", true],
  ["“The ice was slick, so I slipped.” What does “slick” mean?", "smooth and slippery", ["hot", "bumpy", "sticky"], "It made someone slip.", true],
];

const RESPOND_AND_FIND_OUT: Q[] = [
  ["You read a poem about rain. What could you make?", "your own rain poem", ["a shopping list", "a lunch menu", "a math sheet"], "Respond with something about the poem."],
  ["A story has a brave little ant. How could you show your favorite part?", "draw it", ["skip it", "close the book", "tear the page"], "A drawing is a way to respond."],
  ["Which one is a response to a book?", "a picture of the main character", ["a book with no cover", "a box of crayons", "a closed door"], "A response shows what you think about the book."],
  ["After a story, you and a friend act it out. What are you doing?", "a play about the story", ["a fact list", "a map", "a song about math"], "Acting out a story is like a little play."],
  ["Which sentence tells how a story made you feel?", "The ending made me laugh.", ["The book has pages.", "It is on the shelf.", "The cover is blue."], "Share your own feeling."],
  ["You liked the author's book about bears. What could you do next?", "read another book by that author", ["never read again", "only read the title", "skip the pictures"], "Readers often look for more by an author they like."],
  ["Which is a question you could ask about frogs?", "What do frogs eat?", ["Frogs are green.", "I like frogs.", "A frog is here."], "A question asks something you want to find out."],
  ["Your class wants to know how seeds grow. What should you do first?", "ask a question", ["write the end", "draw a frame", "pack up"], "Research starts with a question."],
  ["Where could you find facts about the moon?", "a book about space", ["a story about a cow", "a joke book", "a lunch box"], "Pick a place with true facts."],
  ["Who could tell you about fire safety?", "a firefighter", ["a baby", "a goldfish", "a toy"], "Ask someone who knows about it."],
  ["You find out that bees make honey. How could you show it?", "draw a bee by a hive", ["draw a car", "draw a hat", "draw a fish"], "Show what you learned."],
  ["Which is the best way to remember a fact you heard?", "draw it or write a word about it", ["forget it", "hide it", "say nothing"], "Notes and pictures help you remember."],
  ["You want to know what pandas eat. Which is the best book?", "a book about pandas", ["a book about cars", "a book about rain", "a book about shoes"], "Pick the book about your topic."],
  ["Which question asks where?", "Where do bats sleep?", ["Who is that?", "When is lunch?", "Why is it red?"], "Where asks about a place."],
  ["Your class found out about worms. What can you do next?", "share what you learned", ["throw away the notes", "stop asking", "hide the book"], "Sharing is part of research."],
  ["You saw ants carry crumbs on a walk. How can that help you?", "it tells you something real about ants", ["it tells you about rain", "it is a story", "it is not useful"], "What you see yourself can be a fact."],
  ["A class makes a chart of pets they have. What does it help them answer?", "Which pet do most of us have?", ["What color is the sky?", "How tall is a tree?", "When is lunch?"], "The chart shows the pets.", true],
  ["You read two books about owls. Both say owls hunt at night. What can you say?", "Owls hunt at night.", ["Owls never sleep.", "Owls eat cake.", "Owls swim."], "Both books agree on this fact.", true],
  ["Which would you NOT use to learn true facts about sharks?", "a cartoon about a shark who sings", ["a book of shark facts", "a shark expert", "a science show"], "Which one is make-believe?", true],
  ["You want to make the story's ending happier. What are you doing?", "changing the ending in your own way", ["copying the book", "reading the title", "counting pages"], "You can respond by making up a new ending.", true],
  ["Which is a good question for a class project about weather?", "Why does it snow?", ["Do you like snow?", "Is snow the best?", "My hat is red."], "A good question can be answered with facts.", true],
  ["You turn a poem about the sea into a song. What is this?", "a response to the poem", ["a fact list", "a map", "a book cover"], "Turning a text into a song is a response.", true],
  ["Your group asks, “How do birds build nests?” Which helps you answer?", "a book about birds", ["a book about trains", "a toy box", "a puzzle"], "Pick a source about your question.", true],
  ["You read about a kind girl who shares. Which is a response from your own life?", "I shared my snack too.", ["The book is long.", "The girl has a hat.", "It has a cover."], "Connect the story to something you did.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "ny-g1-feelings-and-reasons",
    title: "Feelings, Senses and Reasons",
    emoji: "💭",
    blurb: "Feeling and sense words, supporting details, and joining words.",
    parentNote:
      "Your child finds words that show feelings and the five senses, picks the detail an author gives to support an idea, and chooses joining words such as and, but, so, or and because.",
    standards: ["1R4; 1R8; 1L6", "words for feelings and senses, the details that support an idea, and joining words such as because"],
    items: FEELINGS_AND_REASONS,
  }),
  bankUnit({
    id: "ny-g1-word-clues",
    title: "Word Clues",
    emoji: "🔍",
    blurb: "Words with two meanings, word endings and parts of a sentence.",
    parentNote:
      "Your child works out the meaning of words with more than one meaning from the sentence, finds the base word in words like jumping and looked, and notices what makes a sentence: a capital first word and an end mark.",
    standards: ["1L4; 1RF1", "multiple-meaning words, word endings and base words, and the parts of a sentence"],
    items: WORD_CLUES,
  }),
  bankUnit({
    id: "ny-g1-respond-and-find-out",
    title: "Respond and Find Out",
    emoji: "🔎",
    blurb: "Respond to books with art and poems, and ask questions to find facts.",
    parentNote:
      "Your child chooses ways to respond to a story or poem (a drawing, a play, a new ending), asks questions, picks a source to answer them and thinks of ways to remember and share what they learn.",
    standards: ["1W4; 1W6; 1W7", "responding to texts, asking questions and gathering information from sources"],
    items: RESPOND_AND_FIND_OUT,
  }),
];
