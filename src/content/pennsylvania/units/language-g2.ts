import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { EXTRA } from "./language-extra-g2";

// Pennsylvania's own Grade 2 English language arts units (`pa-` ids). They practice PA Core reading standards the shared
// units leave out: the roles of authors, poems and their parts, arguments and how authors support them, and comparing
// texts. The passages and poems are original. Reading only; writing, speaking and research standards need free work.

const SOUND: Q[] = [
  ["Line endings: moon, night, spoon, light. What is the rhyme pattern?", "ABAB", ["AABB", "ABBA", "ABCD"], "Match the endings: moon–spoon, night–light."],
  ["Line endings: cat, hat, dog, log. What is the rhyme pattern?", "AABB", ["ABAB", "ABBA", "ABCD"], "The first two rhyme, then the last two."],
  ["Line endings: day, sea, play, tree. What is the rhyme pattern?", "ABAB", ["AABB", "ABBA", "ABCD"], "Lines 1 and 3 rhyme; lines 2 and 4 rhyme."],
  ["Line endings: bell, sun, run, well. What is the rhyme pattern?", "ABBA", ["AABB", "ABAB", "ABCD"], "The first and last rhyme; the middle two rhyme.", true],
  ["Line endings: star, far, jar, car. What is the rhyme pattern?", "all four lines rhyme", ["ABAB", "AABB", "ABCD"], "Every line ends with the same sound.", true],
  ["In a poem, a rhyme scheme is…", "the pattern of rhyming line endings", ["the number of pages", "the name of the poet", "a kind of picture"], "It is a pattern."],
  ["In “AABB” the first two lines…", "rhyme with each other", ["do not rhyme", "are the title", "are the last lines"], "Same letter means they rhyme."],
  ["Which pair of line endings rhymes?", "tree, bee", ["tree, tall", "bee, bug", "sea, sand"], "They sound the same at the end."],
  ["Which word rhymes with “light”?", "night", ["lamp", "ride", "late"], "light – night."],
  ["Which word completes the rhyme? “The frog sat on a log / and watched a little ___.”", "dog", ["pond", "bug", "fly"], "Match the sound of log.", true],
  ["“The wind was as cold as ice.” This is a…", "simile", ["rhyme", "title", "question"], "A simile uses like or as."],
  ["Which sentence has a simile?", "She is as quiet as a mouse.", ["She is a quiet girl.", "She spoke softly.", "She was shy."], "Look for “as … as.”"],
  ["Which sentence has a simile?", "The baby slept like a log.", ["The baby slept all night.", "The baby was tired.", "The baby cried."], "Look for the word like."],
  ["“As busy as a bee” means…", "very busy", ["very small", "very sweet", "very quiet"], "Bees keep working."],
  ["“As light as a feather” means…", "very light", ["very loud", "very shiny", "very dark"], "A feather weighs almost nothing."],
  ["“It’s raining cats and dogs” means…", "it is raining very hard", ["pets are falling", "it is raining a little", "it is sunny"], "It is an idiom."],
  ["“That test was a piece of cake” means the test was…", "easy", ["sweet", "long", "hard"], "An idiom does not mean the words."],
  ["“I feel under the weather” means I feel…", "a little sick", ["very hot", "like swimming", "under a cloud"], "An idiom is a special saying."],
  ["“Hit the hay” means…", "go to bed", ["play outside", "feed a horse", "run away"], "Hay is where animals sleep."],
  ["“Break the ice” means…", "start talking to new people", ["crack a frozen pond", "make a snow cone", "feel cold"], "It helps people feel comfortable.", true],
  ["Which sentence has alliteration?", "Sally sells seashells by the seashore.", ["The cat sat on the mat.", "I like to read books.", "The sun is hot."], "Many words start with the same sound."],
  ["Which sentence has alliteration?", "Big bears bounced balls.", ["The bears were big.", "Bears run in the woods.", "A bear ate lunch."], "Look at the first sounds."],
  ["Which words start with the same sound?", "silly snakes slide", ["happy dogs run", "a red kite", "the big tree"], "Say them out loud."],
  ["Which has alliteration?", "Peter Piper picked peppers", ["Peter went to school", "Peppers are red", "Peter and his dog"], "Hear the /p/ sounds.", true],
  ["Which words show alliteration in “Tiny turtles trot”?", "tiny, turtles, trot", ["tiny, trot", "turtles only", "none of them"], "All three start with /t/.", true],
];

const AUTHORS: Q[] = [
  ["A book tells how seeds grow into plants. The author wants to…", "teach you something", ["make you laugh", "sell you a toy", "scare you"], "A purpose is why the author writes."],
  ["A story about a silly dog is meant to…", "entertain you", ["teach you math", "sell a toy", "give directions"], "Stories are often for fun."],
  ["A flyer says, “Come to our school picnic! It will be great fun!” The author wants you to…", "come to the picnic", ["learn about plants", "go to sleep", "buy a hat"], "It asks you to do something."],
  ["An author writes, “Every child should read each day.” The author wants to…", "convince you", ["trick you", "scare you", "rhyme"], "It tells what the author thinks."],
  ["Which is the author’s purpose in a recipe?", "to explain how to make something", ["to scare you", "to tell a joke", "to give a vote"], "Recipes teach steps."],
  ["A sign says, “Please walk. Do not run in the hall.” The author wants you to…", "follow a rule", ["write a poem", "buy a snack", "play a game"], "It tells what to do."],
  ["A book about whales has facts and photos. Its purpose is to…", "inform", ["entertain only", "sell", "scare"], "Inform means to give facts."],
  ["Which word means “to give facts”?", "inform", ["persuade", "entertain", "rhyme"], "Inform means teach."],
  ["Which word means “to try to make you think the same”?", "persuade", ["inform", "describe", "count"], "Persuade means convince."],
  ["The author wrote, “Parks are the best places.” What is the author’s opinion?", "parks are great", ["parks are loud", "parks are small", "parks are closed"], "Read what the author says is best."],
  ["The author wrote, “Dogs are better than cats because they play fetch.” What is the reason?", "dogs play fetch", ["cats are small", "pets are good", "the author has a dog"], "The reason follows “because.”"],
  ["The author wrote, “Recess should be longer because we need to play.” What is the reason?", "we need to play", ["recess is fun", "recess is short", "school is long"], "Find the words after “because.”"],
  ["Which sentence gives a reason for an opinion?", "Pizza is best because it has cheese.", ["Pizza is round.", "I ate pizza.", "Pizza is hot."], "A reason follows “because.”"],
  ["The author thinks libraries are great. Which fact backs that up?", "You can borrow books for free.", ["Libraries are quiet.", "Libraries have doors.", "Some are small."], "Pick the fact that supports the opinion.", true],
  ["The author thinks bikes are the best way to travel. Which fact backs that up?", "Bikes do not need gas.", ["Bikes are red.", "Bikes have two wheels.", "My bike is old."], "Pick the fact that supports the opinion.", true],
  ["The author thinks everyone should recycle. Which is evidence?", "Recycling keeps trash out of landfills.", ["Trash cans are tall.", "Bottles are round.", "I like green."], "Evidence is a fact that supports the idea.", true],
  ["Evidence is…", "facts that back up an idea", ["a kind of rhyme", "a book cover", "a name"], "It supports what an author says."],
  ["Text A: “Frogs live in ponds.” Text B: “Frogs lay eggs in water.” Both tell about…", "frogs", ["birds", "cars", "stars"], "Same topic in both."],
  ["Text A has photos of a farm. Text B has drawings of a farm. How are they alike?", "both are about farms", ["both are drawings", "both are photos", "both rhyme"], "The topic is the same."],
  ["Two books are about the sun. One says it is hot. One says it is a star. They…", "tell different facts about the sun", ["tell the same fact", "are about the moon", "are poems"], "Compare the facts in each."],
  ["Both stories are about a lost puppy. In one, a girl finds it. In the other, a boy finds it. What is different?", "who finds the puppy", ["what is lost", "the topic", "the animal"], "Look at the character.", true],
  ["The main idea of a text is…", "what the whole text is mostly about", ["the last sentence", "the title page", "the author’s name"], "It is the big idea."],
  ["A text says bees make honey, visit flowers and live in hives. The central idea is…", "bees and what they do", ["flowers only", "honey recipes", "hive colors"], "Most details are about bees.", true],
  ["Which detail supports the idea that dogs are helpful?", "Some dogs help people who cannot see.", ["Dogs have fur.", "Dogs are brown.", "Some dogs are small."], "Pick the detail about helping.", true],
  ["An author says, “I think everyone should walk to school.” This shows the author’s…", "opinion", ["address", "title", "fact"], "“I think” signals an opinion."],
];

const OWN: Unit[] = [
  bankUnit({
    id: "pa-g2-rhyme-schemes-and-sayings",
    title: "Rhyme Schemes & Sayings",
    emoji: "🎵",
    blurb: "Rhyme patterns, similes, idioms and sounds that repeat.",
    parentNote:
      "Pennsylvania’s Grade 2 standards ask children to describe how words and phrases supply rhythm and meaning in a story, poem or song, and to work out the meaning of phrases. Children read the line endings of a poem and name the pattern, and they decide what a saying really means.",
    standards: ["CC.1.3.2.F; CC.1.2.2.F", "how words and phrases supply rhythm and meaning in poems, songs and sayings"],
    items: SOUND,
  }),
  bankUnit({
    id: "pa-g2-authors-purpose-and-evidence",
    title: "Why Authors Write",
    emoji: "✍️",
    blurb: "Purpose, opinions, evidence and comparing two texts.",
    parentNote:
      "Pennsylvania’s Grade 2 standards ask children to describe how reasons support specific points an author makes and to compare the most important points of two texts on the same topic. Children choose why an author wrote, find the reason behind an opinion and tell how two texts are alike or different.",
    standards: ["CC.1.2.2.H; CC.1.2.2.I", "how reasons support an author’s points, and comparing two texts on a topic"],
    items: AUTHORS,
  }),
];
export const UNITS: Unit[] = [...OWN, ...EXTRA];
/** Put the own units before the planned ones. */
export const FIRST = false;
