import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Pennsylvania's extra Grade 2 English language arts units (`pa-` ids): words learned from talk and books, the thinking
// behind informative, opinion and story writing (tapped, not written), and answering questions about key details and
// connections. The passages are original. Reading only.

const WORDS: Q[] = [
  ["Which word means the same as “enormous”?", "huge", ["tiny", "quiet", "brave"], "Enormous and huge both mean very big."],
  ["Which word means the same as “begin”?", "start", ["finish", "wait", "hide"], "Begin and start mean the same."],
  ["Which word is the opposite of “ancient”?", "modern", ["old", "tall", "broken"], "Ancient is very old. Modern is new."],
  ["Which word is the opposite of “scatter”?", "gather", ["spread", "toss", "drop"], "Scatter and gather are opposites."],
  ["Which word means “to look at something carefully”?", "examine", ["ignore", "throw", "borrow"], "Examine means to look closely."],
  ["“The trail was steep.” Steep means…", "going sharply up", ["very flat", "full of water", "very short"], "A steep hill is hard to climb."],
  ["“The scientist will observe the ants.” Observe means…", "watch closely", ["feed", "scare", "count loudly"], "To observe is to watch carefully."],
  ["“A habitat is where an animal lives.” A pond is a habitat for…", "frogs", ["camels", "penguins", "polar bears"], "Frogs live in and near ponds."],
  ["“I was hungry, so I made a snack.” Which word shows a result?", "so", ["hungry", "made", "snack"], "So shows what happened because of it."],
  ["“We went inside because it was raining.” Because shows…", "a reason", ["a color", "a place", "a number"], "Because tells why."],
  ["“I like soup, but I do not like salad.” But shows…", "a difference", ["a reason", "an order", "a place"], "But connects different ideas."],
  ["“Wash your hands before lunch.” Before tells…", "when", ["where", "who", "how many"], "Before tells the time or order."],
  ["“The puppy is under the porch.” Under tells…", "where", ["when", "how many", "why"], "Under tells the place."],
  ["“Please turn on the light.” “The light box is very light.” Light means…", "two different things", ["the same thing", "a color", "a sound"], "One light is bright; one is not heavy."],
  ["“The bank of the river was muddy.” Bank means…", "the land beside water", ["a place for money", "a kind of fish", "a boat"], "Look at the word river."],
  ["“Dad went to the bank to get money.” Bank means…", "a place for money", ["the side of a river", "a kind of bird", "a hill"], "Money gives a clue."],
  ["Which word means “a person who writes books”?", "author", ["artist", "singer", "builder"], "An author writes."],
  ["Which word fits? “The ___ is a part of a plant that holds it in the ground.”", "root", ["flower", "cloud", "rock"], "Roots hold plants."],
  ["The word “unhappy” means…", "not happy", ["very happy", "happy again", "happy before"], "Un- means not."],
  ["The word “rewrite” means…", "write again", ["write less", "write first", "not write"], "Re- means again."],
  ["“The cheetah is swift.” Which word means the same as swift?", "fast", ["slow", "sleepy", "spotted"], "Swift means fast.", true],
  ["“The kitten was curious.” Curious means…", "wanting to learn more", ["very sleepy", "afraid", "angry"], "A curious kitten sniffs around.", true],
  ["A glossary at the back says: “fossil: the print of a very old plant or animal.” A fossil is…", "a print of something very old", ["a new plant", "a kind of tool", "a toy"], "Use the definition.", true],
  ["“The storm was fierce.” Which word is closest in meaning to fierce?", "powerful", ["gentle", "small", "quiet"], "A fierce storm is strong.", true],
  ["Which pair are synonyms?", "glad and happy", ["hot and cold", "up and down", "big and small"], "Synonyms mean the same.", true],
  ["Which pair are antonyms?", "wet and dry", ["glad and happy", "quick and fast", "sad and unhappy"], "Antonyms are opposites.", true],
];

const WRITING: Q[] = [
  ["Which sentence introduces a report about turtles?", "Turtles are reptiles that carry their homes on their backs.", ["I went to the store.", "Rain fell on Monday.", "Cars have four wheels."], "An introduction names the topic."],
  ["Topic: butterflies. Which fact fits?", "A butterfly starts as a caterpillar.", ["A boat floats on water.", "Pizza has cheese.", "Snow falls in winter."], "Pick a fact about butterflies."],
  ["Which definition would help in a report on “habitat”?", "A habitat is the place where a living thing makes its home.", ["A habitat is a kind of hat.", "A habitat is a fast car.", "A habitat is a sound."], "A definition tells what a word means."],
  ["A report tells about owls. Which sentence does NOT belong?", "Pizza is my favorite food.", ["Owls hunt at night.", "Owls have large eyes.", "Owls can turn their heads."], "That sentence is off topic."],
  ["Which group of facts belongs together in one part of a report on owls?", "what owls eat", ["what owls eat and how trains run", "my birthday and owls", "where pizza is made"], "Group related facts."],
  ["Which sentence could end a report about owls?", "Owls are amazing night hunters.", ["Owls have feathers.", "Owls eat mice.", "Owls live in trees."], "A concluding sentence sums up."],
  ["Which sentence states an opinion about the library?", "The library is the best place in town.", ["The library has books.", "The library opens at nine.", "The library is on Pine Street."], "An opinion tells what someone thinks."],
  ["I think our class should have a pet. Which reason fits?", "A pet can teach us how to care for animals.", ["Pets have fur.", "I have a coat.", "It is time for lunch."], "A reason supports the opinion."],
  ["Which reason has a detail that supports the opinion “Recess is important”?", "We get to move and breathe fresh air.", ["We have a bell.", "Recess is on a schedule.", "The grass is green."], "A good reason has a detail."],
  ["Which sentence is a good ending for an opinion piece about bikes?", "That is why bikes are great for getting around.", ["Bikes have two wheels.", "I have a red bike.", "Bikes are in the garage."], "End by restating the opinion."],
  ["Which opinion word shows what the writer thinks?", "best", ["round", "Tuesday", "seven"], "Best is a feeling about something."],
  ["Which sentence introduces a story’s characters?", "Mia and her brother Leo packed a lunch for the park.", ["The park has swings.", "A lunch is food.", "It rained."], "Tell who the story is about."],
  ["Which sentence starts a story by setting the scene?", "One snowy morning, Jo woke up early.", ["Snow is cold.", "Jo is a name.", "Mornings are early."], "Set up who and when."],
  ["Which sentence tells a character’s feelings?", "Ava’s heart jumped with joy.", ["Ava is a girl.", "Joy is a word.", "The bus came."], "Feelings show how someone feels."],
  ["Which sentence tells what a character thinks?", "“I can do it,” Leo thought.", ["Leo has shoes.", "It was a hill.", "The sun was out."], "A thought shows what someone thinks."],
  ["Which words signal the order of events?", "first, next, then, finally", ["red, blue, green", "big, small, tiny", "dog, cat, hen"], "They tell the order."],
  ["Which is in the best order? ", "We packed the bags. Then we got in the car. Finally, we drove away.", ["We drove away. We packed the bags. Then we got in the car.", "Finally, we packed the bags. We drove away. Then we got in the car.", "Then we drove away. Finally, we got in the car. We packed the bags."], "Think about what comes first."],
  ["Which sentence gives a sense of an ending?", "At last, we were home and warm.", ["First, we left.", "Then it rained.", "Next, we ran."], "At last wraps up."],
  ["Which word is a stronger choice than “nice”?", "friendly", ["thing", "very", "stuff"], "Choose a word that is more exact.", true],
  ["Which sentence uses words that appeal to the audience?", "The warm, gooey cookies smelled delicious.", ["The cookies were there.", "I saw cookies.", "Cookies are food."], "Use words that help the reader imagine.", true],
  ["Which sentence has the topic AND a fact?", "Giraffes have very long necks.", ["Giraffes.", "A long neck.", "Many animals."], "A fact is a whole idea.", true],
  ["What would help a reader understand a report on volcanoes?", "a definition of the word lava", ["a list of favorite colors", "a joke about cats", "a song about school"], "Define hard words.", true],
  ["Which opinion has a reason?", "I like gardens because flowers make me smile.", ["I like gardens.", "Gardens are green.", "I have a garden."], "Look for because.", true],
  ["Which sentence moves the story to the next event?", "Later that day, the clouds rolled in.", ["Clouds are gray.", "Days are long.", "It is a story."], "Time words move a story along.", true],
  ["Which sentence correctly uses an apostrophe?", "Mia’s dog is brown.", ["Mias’ dog is brown.", "Mia’s’ dog is brown.", "Mias dog’s is brown."], "Mia’s shows the dog belongs to Mia.", true],
];

const PROVE: Q[] = [
  ["Tara planted beans in a pot. She watered them every day. What did Tara plant?", "beans", ["corn", "peas", "carrots"], "The text says beans."],
  ["Who found the lost mitten? “Dan looked under the bed and found the mitten.”", "Dan", ["the dog", "Dan’s mom", "the bed"], "Dan found it."],
  ["When did the class go to the zoo? “On Friday morning, the class went to the zoo.”", "Friday morning", ["Monday evening", "Saturday night", "Sunday morning"], "The text tells when."],
  ["Why did Nia put on her raincoat? “Nia saw dark clouds, so she put on her raincoat.”", "dark clouds were in the sky", ["it was hot", "she was cold", "she was going to bed"], "So tells the reason."],
  ["How does a caterpillar become a butterfly? “It makes a chrysalis. Inside, it changes.”", "it changes inside a chrysalis", ["it flies away", "it eats a leaf", "it digs a hole"], "Use the steps."],
  ["First the seed sprouts. Next, leaves grow. Last, a flower opens. What happens after leaves grow?", "a flower opens", ["the seed sprouts", "the leaves fall", "the plant sleeps"], "Follow the order."],
  ["To make a sandwich: get bread, add cheese, put on the top slice. What do you do after adding cheese?", "put on the top slice", ["get bread", "add jam", "eat it"], "Follow the steps."],
  ["The wind blew hard, and the kite flew high. Why did the kite fly high?", "the wind blew hard", ["it was a tall tree", "someone sang", "it rained"], "Wind lifts kites."],
  ["How did Sam respond when he lost the race? “Sam shook hands and said, ‘Good game.’”", "he was kind", ["he was angry", "he ran away", "he cried"], "His actions show kindness."],
  ["What challenge did Mia face? “Mia’s kite got stuck in a tree, so she asked her dad for help.”", "her kite was stuck", ["she lost a shoe", "it was cold", "she was lost"], "The challenge is the problem."],
  ["How did Mia solve the problem?", "she asked her dad for help", ["she gave up", "she bought a new kite", "she ran home"], "Look at what she did."],
  ["A story begins with a boy lost in a store and ends with him finding his mom. The ending tells…", "how the problem was solved", ["a new problem starts", "what the title is", "where the store is"], "Endings wrap up the story."],
  ["Which two books are on the same topic? Book A: Dogs and Their Jobs. Book B: Cats at Night. Book C: Working Dogs.", "Book A and Book C", ["Book A and Book B", "Book B and Book C", "all three"], "Both A and C are about dogs."],
  ["Both articles are about bees. One says bees make honey. The other says bees help flowers grow. How are they different?", "they give different facts", ["they are about trees", "they are poems", "they are both maps"], "Each gives a different fact."],
  ["Mom’s story and Dad’s story are both about a snowstorm. How are they alike?", "both are about a snowstorm", ["both are about a beach", "both are songs", "both are maps"], "They share a topic."],
  ["Text: “A frog lays eggs. The eggs hatch into tadpoles. Tadpoles grow legs.” What comes right after the eggs hatch?", "tadpoles", ["the frog lays eggs", "legs fall off", "the pond dries up"], "Use the order in the text."],
  ["The text says, “Wolves howl to talk to each other.” Why do wolves howl?", "to talk to each other", ["to sing a song", "to scare the moon", "to dig a hole"], "The text gives the reason."],
  ["A map shows a lake, a hill and a bridge. Which can the map tell you?", "where the bridge is", ["what the lake tastes like", "who built the hill", "how old the bridge is"], "A map shows places."],
  ["A chart shows a cat is 4 pounds and a dog is 20 pounds. Which is heavier?", "the dog", ["the cat", "they weigh the same", "the chart does not say"], "Compare the numbers.", true],
  ["A character says, “I can’t wait!” and bounces on her toes. How does she feel?", "excited", ["bored", "scared", "sleepy"], "Bouncing shows excitement.", true],
  ["The story says the boy’s hands shook as he walked on stage. He probably felt…", "nervous", ["calm", "sleepy", "angry"], "Shaking hands show nerves.", true],
  ["The author wrote, “Plants need sun, water and soil.” Which sentence is the main idea?", "Plants need three things to grow.", ["Soil is brown.", "The sun is hot.", "Water is wet."], "The main idea covers all details.", true],
  ["Mia thinks the beach is best. Max thinks the mountains are best. How do their views differ?", "they like different places", ["they like the same place", "they dislike every place", "they have no views"], "Compare their opinions.", true],
  ["Which question can the text “Foxes sleep in dens” answer?", "Where do foxes sleep?", ["What do foxes eat?", "How fast do foxes run?", "Why do foxes bark?"], "The text tells where.", true],
  ["A story says the cat hid under the bed during the storm. Why did the cat hide?", "the storm scared it", ["it wanted a snack", "it was sleepy at noon", "it was playing"], "Storms can scare cats.", true],
];

export const EXTRA: Unit[] = [
  bankUnit({
    id: "pa-g2-new-words",
    title: "Words We Learn",
    emoji: "🗣️",
    blurb: "Words that match, words that differ and words with two meanings.",
    parentNote:
      "Pennsylvania’s Grade 2 standards ask children to acquire and use grade-appropriate conversational, general academic and domain-specific words, and to work out the meaning of multiple-meaning words using a range of strategies. Children tap the word that fits the sentence or the definition.",
    standards: ["CC.1.2.2.J; CC.1.3.2.J; CC.1.2.2.K; CC.1.3.2.I", "learning everyday, academic and subject words, and working out multiple-meaning words"],
    items: WORDS,
  }),
  bankUnit({
    id: "pa-g2-writing-moves",
    title: "Topics, Opinions & Stories",
    emoji: "✏️",
    blurb: "Introduce a topic, back up an opinion and order a story.",
    parentNote:
      "Pennsylvania’s Grade 2 writing standards ask children to introduce a topic and develop it with facts and definitions, to state an opinion with reasons and a concluding statement, and to tell a story with characters, feelings and time words. Children are not asked to write here: they tap the sentence that does each job best.",
    standards: ["CC.1.4.2.B; CC.1.4.2.C; CC.1.4.2.D; CC.1.4.2.H; CC.1.4.2.I; CC.1.4.2.J; CC.1.4.2.N; CC.1.4.2.O; CC.1.4.2.P", "introducing a topic with facts and definitions, stating an opinion with reasons, and telling a story in order"],
    items: WRITING,
  }),
  bankUnit({
    id: "pa-g2-prove-it",
    title: "Prove It",
    emoji: "🔍",
    blurb: "Who, what, where, when, why and how, with proof from the text.",
    parentNote:
      "Pennsylvania’s Grade 2 standards ask children to ask and answer who, what, where, when, why and how questions about key details, to describe the connection between a series of events or steps, and to describe how characters respond to challenges. Children read a short passage and choose the answer the text supports.",
    standards: ["CC.1.2.2.B; CC.1.2.2.C; CC.1.3.2.B; CC.1.3.2.C; CC.1.2.2.I", "answering who, what, where, when, why and how questions, connecting events and steps, and how characters respond to challenges"],
    items: PROVE,
  }),
];
