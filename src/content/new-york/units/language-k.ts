import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// New York's own Kindergarten language units (`ny-` ids). No shared unit practises KR4 (words for feelings and
// senses), KR8 (the detail that supports an idea), KW1 (an opinion with a reason), KL6 (using words met in books and
// talk, such as "because"), KR5 (stories and information books) or KW4 (responding to a text), so these banks do.
// Prompts stay within 80 characters and four choices, and every sentence is original.

const FEELINGS_AND_REASONS: Q[] = [
  ["“Mia smiled and jumped up and down.” How does Mia feel?", "happy", ["sad", "sleepy", "cross"], "Smiling and jumping show a good feeling."],
  ["“Leo cried when his ice cream fell.” How does Leo feel?", "sad", ["happy", "silly", "proud"], "Crying shows a sad feeling."],
  ["“Ben stomped his feet and yelled.” How does Ben feel?", "angry", ["calm", "happy", "sleepy"], "Stomping and yelling show a mad feeling."],
  ["“Zoe hid under the blanket from the thunder.” How does Zoe feel?", "scared", ["proud", "bored", "silly"], "We hide when something scares us."],
  ["“Ana yawned and rubbed her eyes.” How does Ana feel?", "tired", ["excited", "angry", "scared"], "Yawning shows you need sleep."],
  ["Which word tells how something sounds?", "loud", ["round", "red", "sweet"], "Use your ears."],
  ["Which word tells how something tastes?", "sweet", ["loud", "fuzzy", "shiny"], "Think about your tongue."],
  ["Which word tells how something feels when you touch it?", "fuzzy", ["loud", "sour", "bright"], "Think about your hands."],
  ["Which word tells how something looks?", "shiny", ["salty", "noisy", "smelly"], "Think about your eyes."],
  ["Which word tells how something smells?", "stinky", ["bumpy", "quiet", "blue"], "Think about your nose."],
  ["“The puppy is soft.” Which sense tells you that?", "touch", ["taste", "hearing", "smell"], "You feel soft things with your hands."],
  ["“The bell went ding, ding!” Which sense tells you that?", "hearing", ["touch", "taste", "sight"], "You hear a bell with your ears."],
  ["Which one gives a reason?", "I like cats because they purr.", ["I like cats.", "Cats.", "A cat is here."], "A reason often comes after “because.”"],
  ["Which one tells what you like?", "I like rainy days best.", ["It rained today.", "Rain is wet.", "The sky is gray."], "An opinion tells what you think or like."],
  ["Sam says, “Apples are the best snack.” Which is a good reason?", "They are crunchy and sweet.", ["Apples are red.", "I ate lunch.", "The bus is late."], "A reason tells why Sam likes them."],
  ["Which word helps you give a reason?", "because", ["and", "the", "on"], "“I smiled because I was happy.”"],
  ["Finish it: I like the park because…", "I can swing there.", ["It is Monday.", "My hat is blue.", "Dogs bark."], "Pick the reason that goes with the park."],
  ["“Frogs can jump far. They have strong back legs.” Why can frogs jump far?", "They have strong legs.", ["They are green.", "They like water.", "They are small."], "Find the sentence that tells why."],
  ["“Owls hunt at night. They see well in the dark.” Why can owls hunt at night?", "They see well in the dark.", ["They have feathers.", "They are birds.", "They sleep."], "Look for the detail that helps the idea."],
  ["“Snow is cold. Kim wore mittens.” Why did Kim wear mittens?", "The snow was cold.", ["Kim likes red.", "It was lunch time.", "Kim had a dog."], "What in the story tells why?"],
  ["Which word means very big?", "huge", ["tiny", "quick", "quiet"], "A whale is huge."],
  ["Which word means very small?", "tiny", ["huge", "loud", "tall"], "An ant is tiny."],
  ["A story says the bear was “grumpy.” What does grumpy mean?", "in a bad mood", ["very fast", "very hungry", "very tall"], "A grumpy bear is cross."],
  ["Which word tells how a cat moves on quiet feet?", "tiptoes", ["stomps", "crashes", "bangs"], "This is a soft, quiet way to walk.", true],
  ["“The soup was hot, so Ali blew on it.” Why did Ali blow on it?", "It was hot.", ["It was green.", "It was lunch.", "Ali was sad."], "Look at the words after “so.”", true],
  ["Which is the best reason to read a book about sharks?", "I want to learn how sharks eat.", ["Sharks.", "The book is on the shelf.", "It is a Tuesday."], "A good reason tells why you want to.", true],
  ["“Lin hugged her new kitten.” Which word tells how Lin feels?", "loving", ["angry", "bored", "scared"], "A hug shows a warm, caring feeling.", true],
  ["Which sentence tells two reasons?", "I like soccer. It is fun and I can run.", ["I like soccer.", "Soccer is a game.", "We play soccer."], "Count the reasons the speaker gives.", true],
];

const STORIES_AND_FACTS: Q[] = [
  ["A book has a talking pig who goes to the moon. What kind of book is it?", "a story", ["a fact book", "a map", "a list"], "Pigs can't really talk, so it is made up."],
  ["A book has real photos of frogs and tells what they eat. What kind is it?", "a fact book", ["a story", "a song", "a joke"], "Real photos and real facts make a fact book."],
  ["Which is most likely in a story book?", "a dragon that bakes", ["a real map", "a list of facts", "a chart"], "Stories can be make-believe."],
  ["Which is most likely in a fact book?", "real facts about bees", ["a talking spoon", "a magic hat", "a flying cow"], "Fact books tell what is true."],
  ["Which book could teach you how plants grow?", "a book about seeds", ["a book about a silly cat", "a nursery rhyme", "a joke book"], "Pick the book with true facts."],
  ["A book starts, “Once upon a time…” What kind is it?", "a story", ["a fact book", "a menu", "a sign"], "Many stories begin this way."],
  ["Which one is make-believe?", "a bus that can fly", ["a bus with wheels", "a bus with seats", "a yellow bus"], "Can that really happen?"],
  ["Which one is real?", "a dog that barks", ["a dog that sings songs", "a dog that drives", "a dog that reads"], "Real dogs really do this."],
  ["Who are the people and animals in a story called?", "characters", ["pages", "labels", "facts"], "The pig in a story is a character."],
  ["A fact book has words under its pictures. What do they do?", "tell about the picture", ["tell a joke", "make it longer", "show the end"], "They help you learn from the picture."],
  ["You finish a story about a brave mouse. What can you do to share it?", "draw your favorite part", ["throw the book", "hide the book", "tear a page"], "You can respond with a picture."],
  ["Which is a way to act out a story?", "pretend to be a character", ["sit very still", "close the book", "count the pages"], "Acting out means you play a part."],
  ["You liked a story about a snowman. What could you make?", "a snowman drawing", ["a shopping list", "a bus ticket", "a clock"], "Make something that goes with the story."],
  ["Which one is a poem?", "Cat in a hat, sat on a mat.", ["Cats have fur.", "Feed the cat.", "The cat is here."], "Poems often rhyme."],
  ["Which question fits a fact book about whales?", "How big are whales?", ["Is the whale a princess?", "Can a whale fly?", "Does a whale drive?"], "Fact books answer real questions."],
  ["A story is about a kind bear. What could you tell a friend?", "My favorite part was when the bear helped.", ["The cover is red.", "It has pages.", "It is on the shelf."], "Share what you liked in the story."],
  ["Which book tells about a real fire truck?", "a book with truck facts", ["a book with a talking truck", "a book with a truck that sings", "a book with a magic truck"], "Real books tell what trucks really do."],
  ["Which book is made up?", "a hen who flies to space", ["how hens lay eggs", "what hens eat", "where hens sleep"], "Can a hen really fly to space?"],
  ["You read about a lost kitten. How can you show how it felt?", "make a sad face like it", ["sing the ABCs", "count to ten", "clap fast"], "Show the feeling with your face or body."],
  ["Which is the best thing to draw after a book about the ocean?", "fish and waves", ["a snowy hill", "a toy car", "a big cake"], "Your picture should go with the book."],
  ["Which book could you use to learn about the moon?", "a fact book about space", ["a story about a cow that jumps", "a joke book", "a song book"], "Pick the book with true facts.", true],
  ["A book has a table that lists animal sizes. What kind is it?", "a fact book", ["a story", "a poem", "a play"], "Charts and lists give facts.", true],
  ["After a story, you make up a new ending. What are you doing?", "responding to the story", ["reading the cover", "counting words", "finding the title"], "You are making something new from the story.", true],
  ["One book has a talking fox. One shows a real fox. How are they different?", "One is made up and one is true.", ["They are the same.", "Both are made up.", "Both are poems."], "Think about which fox can really talk.", true],
  ["Which would be in a fact book about rain?", "Rain falls from clouds.", ["The rain sang a song.", "Rain wore a hat.", "The cloud cried for its mom."], "Pick the true sentence.", true],
  ["Your class reads a poem about bugs. What could you make?", "your own bug poem", ["a list of shoes", "a math sheet", "a lunch menu"], "Respond with something about the poem.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "ny-gk-feelings-and-reasons",
    title: "Feelings and Reasons",
    emoji: "💭",
    blurb: "Words for feelings and senses, and saying why.",
    parentNote:
      "Your child finds the words in a short text that show feelings and the five senses, picks the detail that explains what happened, and practices giving an opinion with a reason (“I like it because…”).",
    standards: ["KR4; KR8; KW1; KL6", "words for feelings and senses, the detail that tells why, and giving an opinion with a reason"],
    items: FEELINGS_AND_REASONS,
  }),
  bankUnit({
    id: "ny-gk-stories-and-facts",
    title: "Stories and Facts",
    emoji: "📖",
    blurb: "Make-believe stories, true fact books, and ways to respond.",
    parentNote:
      "Your child tells storybooks from information books, real from make-believe, and chooses ways to respond to a book, such as drawing a favorite part, acting it out or making a poem.",
    standards: ["KR5; KW4", "telling stories from information books, and responding to a text with a drawing, acting or a poem"],
    items: STORIES_AND_FACTS,
  }),
];
