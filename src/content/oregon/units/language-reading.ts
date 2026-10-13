import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Oregon reading units for standards that keep literature (RL) and informational text (RI) apart.
// Grade 1 prompts stay at most 80 characters with at most 4 choices.

const G1_STORY_OR_FACTS: Q[] = [
  ["A book about a pig who flies a plane. Is it a story or a fact book?", "a story", ["a fact book"], "Pigs can't really fly planes. It is made up."],
  ["A book that tells how real bees make honey. What kind of book is it?", "a fact book", ["a story"], "It tells true things about real bees."],
  ["Which book is most likely a story?", "The Bear Who Lost His Hat", ["All About Bears", "Bear Facts", "How Bears Sleep"], "A story has characters and things that happen to them."],
  ["Which book is most likely a fact book?", "All About Frogs", ["The Frog Prince", "Freddy Frog's Big Day", "The Frog Who Sang"], "Fact books often say “all about” or “facts.”"],
  ["Which one do you find in a story?", "characters", ["a glossary", "a fact box", "a chart"], "Stories have characters, a setting and events."],
  ["Which one do you find in a fact book?", "true facts", ["a talking cat", "a dragon", "a magic hat"], "Fact books teach about real things."],
  ["Why do people read fact books?", "to learn true things", ["to meet a dragon", "to hear a made-up tale", "to sing a song"], "Fact books give information."],
  ["A book has a photo of a real whale. What kind of book is it?", "a fact book", ["a story", "a song book"], "Photos of real things are often in fact books."],
  ["A rabbit puts on a coat and goes to a party. What is this?", "a story", ["a fact"], "Real rabbits don't wear coats or go to parties."],
  ["“Cats have whiskers.” Is this from a story or a fact book?", "a fact book", ["a story"], "It is true about all real cats."],
  ["“Once upon a time, a mouse found a key.” What kind of book is it?", "a story", ["a fact book"], "“Once upon a time” starts many stories."],
  ["Where does a story happen?", "in the setting", ["in the index", "in the glossary", "in the caption"], "The setting is where and when a story happens."],
  ["Which part helps you find facts fast?", "the table of contents", ["the main character", "the ending", "the problem"], "A table of contents lists the parts of a book."],
  ["A picture in a fact book shows the parts of a plant. What does it do?", "it helps you learn the parts", ["it tells a joke", "it is a story", "it hides the facts"], "Pictures in fact books teach too."],
  ["A fact book says frogs lay eggs. The picture shows eggs. What is true?", "the words and picture tell the same fact", ["the picture is wrong", "the words are made up", "frogs lay rocks"], "Words and pictures can give the same information."],
  ["The words say a bird is small. What can the picture add?", "what the bird looks like", ["what the bird said", "the end of the book", "a joke"], "A picture shows what something looks like."],
  ["Which tells you how a character feels?", "a picture of her smiling", ["the page number", "the book's price", "the index"], "Faces in pictures show feelings."],
  ["Which book would help you learn how to plant a seed?", "Growing Seeds", ["The Giant's Garden Party", "The Bean That Could Talk", "Mo the Magic Seed"], "Pick the fact book."],
  ["Most stories have a problem. Who has the problem?", "a character", ["the index", "the glossary", "the cover"], "Characters have problems to solve."],
  ["Which one is make-believe?", "a fish that can drive a bus", ["a fish that swims", "a fish with fins", "a fish that eats"], "Make-believe can't really happen."],
  ["Which one is a real fact?", "Snow is cold.", ["Snowmen can talk.", "Snow is hot.", "Snow tastes like cake."], "A fact is true in real life."],
  ["What do captions in a fact book do?", "tell about the pictures", ["tell the ending", "name the villain", "sing a song"], "A caption is the words by a picture."],
  ["A story and a fact book are both about owls. What is the same?", "they are both about owls", ["both are made up", "both are true", "both have no words"], "The topic can be the same."],
  ["Which words might start a fact book?", "Owls are birds that hunt at night.", ["Once there was an owl named Hoot.", "One day, Owl lost his hat.", "Owl said, “Let's play!”"], "Fact books start with true facts."],
  ["You want a bedtime tale about a brave cat. Which book do you pick?", "a story", ["a fact book", "a map"], "A tale is a story.", true],
  ["A book has bold words and a glossary. What kind of book is it?", "a fact book", ["a story", "a poem"], "Bold words and glossaries help you learn facts.", true],
  ["The picture shows rain. The words don't say it. What do you learn?", "it is raining", ["it is sunny", "it is night", "it is snowing"], "Pictures can tell more than the words.", true],
  ["Which question does a fact book answer?", "How do bees make honey?", ["What will Bunny do next?", "Will the king find his crown?", "Who is Pip's best friend?"], "Fact books answer questions about real things.", true],
];

const G4_ACCOUNTS: Q[] = [
  ["What is a firsthand account?", "a telling of an event by someone who was there", ["a story told by someone who read about it", "a made-up story", "a list of facts from many books"], "First hand: the writer saw it with their own eyes."],
  ["What is a secondhand account?", "a telling by someone who was not there", ["a diary written during the event", "a letter from a person who was there", "a photo taken at the event"], "Second hand: the writer learned about it from others."],
  ["Maya writes in her diary about the flood in her town that day. What is it?", "a firsthand account", ["a secondhand account", "a fairy tale", "a poem about the sea"], "Maya was there."],
  ["A textbook tells about a flood that happened 100 years ago. What is it?", "a secondhand account", ["a firsthand account", "a diary", "an interview"], "The textbook writers were not there."],
  ["Which words often show a firsthand account?", "I, we and my", ["they, them and their", "once upon a time", "the end"], "The writer tells what happened to them."],
  ["Which is most likely a firsthand account of a volcano erupting?", "a letter from a family who lived nearby", ["an encyclopedia entry written later", "a website summary", "a cartoon about volcanoes"], "Look for someone who was there."],
  ["What can a firsthand account show best?", "how it felt to be there", ["what many experts say", "facts from many sources", "what happened years later"], "Witnesses share their feelings and senses."],
  ["What can a secondhand account often give that a firsthand one can't?", "facts gathered from many sources", ["one person's feelings at the time", "what the writer saw", "the writer's diary"], "A later writer can put many sources together."],
  ["Jay interviews his grandmother about her first day of school. Her answers are…", "a firsthand account", ["a secondhand account", "a myth", "a summary"], "She was there."],
  ["Jay writes a report using his grandmother's answers. His report is…", "a secondhand account", ["a firsthand account", "a diary", "a poem"], "Jay was not at her first day of school."],
  ["Why might two accounts of the same event be different?", "each writer saw or learned different things", ["one must be a fairy tale", "events never really happen", "they were printed in different fonts"], "Point of view and information shape an account."],
  ["A reporter watched the race and wrote about it. What kind of account is it?", "a firsthand account", ["a secondhand account", "a legend", "a fable"], "The reporter was there."],
  ["A news story uses a police report to describe a fire. What kind of account is the story?", "a secondhand account", ["a firsthand account", "a diary", "a poem"], "The writer learned about it from another source."],
  ["Which is a firsthand account?", "an astronaut's journal from space", ["a book about astronauts by a teacher", "a poster about rockets", "a quiz about planets"], "The astronaut was there."],
  ["Which is a secondhand account?", "a biography of a scientist written after she died", ["the scientist's own notebook", "a letter the scientist wrote", "a video of the scientist talking"], "The biographer learned about her from sources."],
  ["An autobiography is written by…", "the person it is about", ["someone who never met the person", "a newspaper", "a computer"], "Auto means self."],
  ["A biography is written by…", "someone else about a person's life", ["the person it is about", "a group of animals", "nobody"], "Bio means life; the writer is someone else."],
  ["What is one weakness of a firsthand account?", "it shows only one person's view", ["it has no details", "the writer was not there", "it is always made up"], "One witness sees only part."],
  ["What is one weakness of a secondhand account?", "it may miss feelings and small details", ["it is always false", "it has no facts", "it uses I and me"], "The writer did not see it."],
  ["“I felt the ground shake, and my cup fell off the table.” What kind of account is this?", "a firsthand account", ["a secondhand account", "a table of contents", "a glossary"], "The writer tells what they felt."],
  ["“The earthquake shook homes across the region, according to reports.” What is this?", "a secondhand account", ["a firsthand account", "a diary entry", "an autobiography"], "“According to reports” shows the writer was not there."],
  ["Lena compares a diary and a textbook about the same storm. What should she look for?", "how the focus and information differ", ["which one has more pages", "which cover is brighter", "which one is newer to her"], "Compare what each one tells and why."],
  ["Which is the best source of how a sports fan felt at the game?", "the fan's own blog post written that night", ["an article written from the final score", "a sports almanac", "a schedule of games"], "Feelings come best from someone who was there."],
  ["Which is the best source for the facts and numbers of a whole season?", "a sports report that gathers many games", ["one fan's diary of one game", "a cheer the fans sang", "a ticket stub"], "A secondhand account can gather many facts."],
  ["A photo taken at an event is a…", "primary source", ["secondhand account", "summary", "legend"], "It was made at the time, by someone there."],
  ["A diary is a firsthand account because…", "the writer tells about their own life", ["it has a lock", "it is short", "it is about history"], "The writer was there.", true],
  ["Two accounts of a storm give different times it started. What is a good next step?", "check a third source", ["pick the one you like", "ignore both", "make up a time"], "More sources help you check facts.", true],
  ["Why might a firsthand account of a parade focus on one float?", "the writer stood near that float", ["only one float was in the parade", "the writer was not there", "secondhand accounts never mention floats"], "A witness sees what is near them.", true],
  ["A history book quotes a soldier's letter. The letter is a firsthand account. The book is…", "a secondhand account", ["a firsthand account", "a fairy tale", "a diary"], "The book's writer was not there, even if it quotes someone who was.", true],
];

export const STORY_OR_FACTS: Unit = bankUnit({
  id: "or-g1-story-or-facts",
  title: "Story or Facts?",
  emoji: "📚",
  blurb: "Tell storybooks from fact books, and learn from pictures and words.",
  parentNote: "Children practise telling books that tell stories from books that give information, and noticing what pictures add to the words.",
  standards: ["ELA.1.RL.5; ELA.1.RI.6", "telling stories from information books and what pictures and words each tell"],
  items: G1_STORY_OR_FACTS,
});

export const FIRSTHAND_SECONDHAND: Unit = bankUnit({
  id: "or-g4-firsthand-secondhand",
  title: "Firsthand or Secondhand?",
  emoji: "👀",
  blurb: "Compare accounts by people who were there with accounts written later.",
  parentNote: "Children practise telling firsthand accounts (diaries, letters, interviews) from secondhand ones (textbooks, reports, biographies) and what each kind shows best.",
  standards: ["ELA.4.RI.6", "comparing firsthand and secondhand accounts of the same event"],
  items: G4_ACCOUNTS,
});
