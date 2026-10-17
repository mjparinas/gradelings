import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Florida's own Kindergarten English language arts units (`fl-` ids). They practise B.E.S.T. benchmarks the shared
// units leave out: the roles of author and illustrator, predicting from titles and covers, rhyme in poems, and telling
// facts from opinions. Reading and listening only; drawing, dictating and writing benchmarks need free work.

const AUTHORS: Q[] = [
  ["Who writes the words in a book?", "the author", ["the illustrator", "the baker", "the bus driver"], "The author writes the story."],
  ["Who draws the pictures in a book?", "the illustrator", ["the author", "the doctor", "the farmer"], "The illustrator makes the pictures."],
  ["A person who writes a story is called an…", "author", ["illustrator", "audience", "animal"], "An author writes."],
  ["A person who draws pictures for a book is an…", "illustrator", ["author", "ant", "announcer"], "An illustrator draws."],
  ["Ana writes the words for a book. She is the…", "author", ["illustrator", "reader", "librarian"], "She writes the words."],
  ["Leo paints the pictures for a book. He is the…", "illustrator", ["author", "teacher", "customer"], "He makes the pictures."],
  ["Words by Sam. Pictures by Lee. Who is the illustrator?", "Lee", ["Sam", "Maya", "Max"], "The illustrator makes the pictures."],
  ["Words by Rosa. Pictures by Tim. Who is the author?", "Rosa", ["Tim", "Mia", "Joe"], "The author writes the words."],
  ["Dan wrote a story and Kim drew it. Who drew it?", "Kim", ["Dan", "Ben", "Zoe"], "Kim drew the pictures."],
  ["Which one is a job for an author?", "writing the story", ["drawing the pictures", "painting a wall", "baking bread"], "Authors write the words."],
  ["Which one is a job for an illustrator?", "drawing the pictures", ["writing the words", "driving a bus", "feeding a cat"], "Illustrators make the pictures."],
  ["An illustrator helps tell a story with…", "pictures", ["music", "recipes", "scissors"], "Look at the pictures in a book."],
  ["The words and the pictures in a book…", "work together", ["never match", "are in different books", "are the same thing"], "Both help tell the story."],
  ["Where do you find the title of a book?", "on the cover", ["in the last picture", "on the floor", "at the library door"], "Look at the front of the book."],
  ["The title of a book tells…", "the name of the book", ["who is reading it", "how many pages it has", "where it was bought"], "A title is a name."],
  ["The cover shows a puppy digging a hole. The book is about…", "a puppy", ["a rocket", "a snowman", "a whale"], "Use the cover picture to guess.", true],
  ["The cover shows a big red fire truck. The book might be about…", "firefighters", ["farm animals", "baking cookies", "a beach trip"], "Think about fire trucks.", true],
  ["The cover shows a bear in a snowy forest. The book might be about…", "winter", ["a hot desert", "the ocean floor", "a birthday cake"], "Snow means winter.", true],
  ["Poems often have words that…", "rhyme", ["are very long", "have no sounds", "are all numbers"], "Rhyming words sound alike at the end."],
  ["Which word rhymes with “star”?", "car", ["tree", "moon", "sun"], "star – car."],
  ["Which word rhymes with “bee”?", "tree", ["bus", "egg", "sun"], "bee – tree."],
  ["Finish the poem: “I see a cat / sitting on a…”", "mat", ["dog", "bus", "sun"], "cat – mat rhyme.", true],
  ["“Hop, hop, hop, / I can’t…” Which word rhymes with hop?", "stop", ["go", "run", "jump"], "hop – stop.", true],
  ["Which pair of words rhyme?", "moon, spoon", ["moon, sun", "spoon, fork", "bee, bug"], "Listen to the endings."],
  ["Which pair of words rhyme?", "sock, clock", ["sock, shoe", "clock, time", "hat, glove"], "Listen to the endings.", true],
  ["Which pair of words rhyme?", "bed, red", ["bed, pillow", "red, blue", "pig, hen"], "Listen to the endings.", true],
];

const FACTS: Q[] = [
  ["Which one is a fact?", "Dogs have four legs.", ["Dogs are the best pets.", "Dogs are the cutest.", "Everyone loves dogs."], "A fact can be proved."],
  ["Which one is an opinion?", "Pizza is the yummiest food.", ["Pizza is round.", "Pizza has cheese.", "Pizza is baked in an oven."], "An opinion is what someone thinks."],
  ["Which one is a fact?", "The sun is a star.", ["The sun is pretty.", "The sun is the nicest star.", "Sunny days are best."], "You can check a fact."],
  ["Which one is an opinion?", "Red is the prettiest color.", ["Red is a color.", "An apple can be red.", "Fire trucks are often red."], "Pretty is what someone thinks."],
  ["Which one is a fact?", "Fish live in water.", ["Fish are boring.", "Fish are the best pets.", "Fish are yucky."], "A fact is true for everyone."],
  ["Which one is an opinion?", "Winter is the most fun.", ["Winter is a season.", "Snow is cold.", "Winter comes after fall."], "Some people like summer more."],
  ["Which one is a fact?", "A cat has whiskers.", ["Cats are silly.", "Cats are better than dogs.", "Cats are lovely."], "You can see a cat’s whiskers."],
  ["Which one is an opinion?", "Math is the easiest.", ["Math has numbers.", "We do math at school.", "Two plus two is four."], "Easiest is what someone thinks."],
  ["“I think rain is gloomy.” Is that a fact or an opinion?", "an opinion", ["a fact", "a number", "a name"], "“I think” tells what someone feels."],
  ["“Rain is water that falls.” Is that a fact or an opinion?", "a fact", ["an opinion", "a feeling", "a rhyme"], "You can check it."],
  ["Which sentence tells how someone feels?", "Soup is yummy.", ["Soup is hot.", "Soup is in a bowl.", "Soup is made in a pot."], "Yummy is a feeling."],
  ["Which one is a fact?", "A week has seven days.", ["Mondays are the worst.", "Weekends are the best.", "Seven is the best number."], "You can count the days."],
  ["A book says, “Frogs hop. Frogs eat bugs. Frogs live near ponds.” The topic is…", "frogs", ["bugs", "ponds", "hopping"], "Most sentences are about frogs.", true],
  ["Details: wings, honey, hive. What is the topic?", "bees", ["flowers", "trees", "birds"], "These details go with bees.", true],
  ["A book is about the moon. Which detail fits?", "The moon goes around Earth.", ["Cats like fish.", "A bus has wheels.", "Ice cream is cold."], "Pick the detail about the moon.", true],
  ["A book is about dogs. Which is a detail about dogs?", "Dogs can bark.", ["Cars can honk.", "Rain is wet.", "Birds can fly."], "Look for the dog detail.", true],
  ["Which word describes the cloud? “The fluffy cloud floated by.”", "fluffy", ["floated", "by", "the"], "A describing word tells what something is like."],
  ["Which word describes the dog? “A tiny dog ran home.”", "tiny", ["ran", "home", "a"], "It tells about size."],
  ["Which word describes the soup? “The hot soup smelled good.”", "hot", ["smelled", "good", "the"], "It tells how the soup is."],
  ["Which word describes the ball? “She kicked the red ball.”", "red", ["kicked", "she", "the"], "It tells the color."],
  ["A book says, “Some people like cats best.” That is…", "an opinion", ["a fact about all people", "a number", "a rhyme"], "“Like best” is a feeling.", true],
  ["Mia says, “Cats have tails.” Sam says, “Cats are cute.” Who gave a fact?", "Mia", ["Sam", "both", "neither"], "A fact can be checked.", true],
  ["Which is an opinion about school?", "Recess is the best part.", ["School has a bell.", "We read at school.", "School has desks."], "Best is an opinion."],
  ["Which is a fact about a book?", "A book has pages.", ["Books are boring.", "Books are the best.", "Every book is funny."], "You can see the pages."],
  ["“Spiders have eight legs.” This is a…", "fact", ["opinion", "poem", "title"], "You can count the legs."],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "fl-k-authors-and-illustrators",
    title: "Authors & Illustrators",
    emoji: "📖",
    blurb: "Who writes, who draws, and what a cover tells.",
    parentNote:
      "Florida’s Kindergarten standards ask children to explain the roles of an author and an illustrator, to use titles and illustrations to predict what a text is about, and to notice rhyme in poems. These are tap-to-answer questions about books they hear and see.",
    standards: ["ELA.K.R.1.3; ELA.K.R.2.1; ELA.K.R.1.4", "the roles of author and illustrator, predicting from titles and covers, and rhyme in poems"],
    items: AUTHORS,
  }),
  bankUnit({
    id: "fl-k-facts-and-opinions",
    title: "Facts & Opinions",
    emoji: "🔎",
    blurb: "What can be checked, and what someone thinks.",
    parentNote:
      "Florida’s Kindergarten standards ask children to tell facts from opinions about a topic, name the topic and details of a text, and notice describing words. Children hear short sentences and choose the fact, the opinion, the topic or the describing word.",
    standards: ["ELA.K.R.2.4; ELA.K.R.2.2; ELA.K.R.3.1", "telling facts from opinions, naming a topic and its details, and noticing describing words"],
    items: FACTS,
  }),
];
/** Put the own units before the planned ones. */
export const FIRST = false;
