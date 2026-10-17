import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Florida's own Grade 4 English language arts units (`fl-` ids): the text structures problem and solution, sequence
// and description, an author's perspective, claim, reasons and evidence, and how rhyme and structure shape a poem and
// a theme. Passages are original. Reading only.

const STRUCTURES: Q[] = [
  ["A text tells what happens first, next and last. Its structure is…", "sequence", ["description", "problem and solution", "comparison"], "Time-order words signal sequence."],
  ["A text names a trouble and then tells how it was fixed. Its structure is…", "problem and solution", ["sequence", "description", "cause and effect"], "There is a problem, then an answer."],
  ["A text tells how something looks, sounds, feels and smells. Its structure is…", "description", ["sequence", "problem and solution", "comparison"], "It paints a picture with details."],
  ["Which words signal sequence?", "first, next, then, finally", ["because, so, therefore", "like, unlike, both", "for example, such as"], "They show the order of steps."],
  ["Which words signal a problem and solution?", "the problem is, one answer is", ["first, next, last", "looks like, feels like", "once, long ago"], "They name the trouble and the fix."],
  ["Which words signal description?", "looks like, feels like, is covered with", ["first, then, finally", "the problem is", "as a result"], "They tell what something is like."],
  ["“First, mix the flour and eggs. Next, pour the batter. Then bake it.” The structure is…", "sequence", ["description", "problem and solution", "comparison"], "Steps in order."],
  ["“Our class had too much litter on the playground. We solved it by adding more bins.” The structure is…", "problem and solution", ["sequence", "description", "cause and effect"], "A trouble and its fix."],
  ["“The cave was dark and cool. Water dripped from the ceiling, and bats hung overhead.” The structure is…", "description", ["sequence", "problem and solution", "comparison"], "It tells how the cave is."],
  ["“Mia could not reach the top shelf. She found a step stool and climbed up.” The problem is…", "she could not reach the top shelf", ["she found a step stool", "she climbed up", "the shelf was tall"], "The trouble comes first."],
  ["“Mia could not reach the top shelf. She found a step stool and climbed up.” The solution is…", "she used a step stool", ["she could not reach", "the shelf was high", "she was tired"], "The fix comes after the trouble."],
  ["“The lake was drying up. The town built a pipeline to bring in water.” The solution is…", "building a pipeline", ["the lake drying up", "the town’s size", "the lake’s shape"], "The solution fixes the problem."],
  ["Which structure would a recipe most likely use?", "sequence", ["description", "problem and solution", "comparison"], "Recipes list steps in order."],
  ["Which structure would a nature article about a rainforest’s plants and animals likely use?", "description", ["sequence", "problem and solution", "story"], "It tells what things are like."],
  ["Which structure would an article about stopping a flood most likely use?", "problem and solution", ["sequence", "description", "poem"], "It gives trouble and fixes."],
  ["A heading in an article tells…", "what the next part is about", ["who wrote it", "the page count", "the cover color"], "Headings label sections.", true],
  ["A timeline is a text feature that shows…", "events in order", ["what a place looks like", "a problem", "a word’s meaning"], "It supports sequence.", true],
  ["A diagram helps a reader…", "see the parts of something", ["rhyme words", "find the author", "count pages"], "It supports description.", true],
  ["A caption under a photo of a coral reef explains…", "what the photo shows", ["who is reading", "how long the book is", "the page number"], "It adds to the meaning."],
  ["A bold word in a text usually means…", "it is a key word you may find in the glossary", ["it is the author’s name", "it is a rhyme", "it is wrong"], "Bold words are important.", true],
  ["In a text about the water cycle, “first, the sun heats water; then it rises; later it cools” is…", "sequence", ["description", "problem and solution", "poetry"], "Steps happen in order.", true],
  ["Which sentence describes?", "The desert sand felt hot and dry.", ["First, we packed our bags.", "The problem is the sun.", "We fixed it with shade."], "It tells how something is.", true],
  ["Which sentence shows a problem?", "The bridge was too weak for heavy trucks.", ["First, they built the road.", "The bridge was long and gray.", "Workers added steel beams."], "It names a trouble."],
  ["Which sentence gives a solution?", "Workers added steel beams to make it stronger.", ["The bridge was too weak.", "The bridge was long.", "Trucks are heavy."], "It fixes a trouble."],
  ["Why do authors choose a text structure?", "to organize ideas so readers can follow them", ["to make the text longer", "to hide the main idea", "to avoid facts"], "Structure helps readers."],
];

const CLAIMS: Q[] = [
  ["An author’s perspective is…", "how the author thinks or feels about a topic", ["the title page", "the size of the book", "the number of chapters"], "It is the author’s point of view."],
  ["“Recycling is easy and everyone should do it.” The author’s perspective is that recycling is…", "good and important", ["hard", "boring", "unnecessary"], "Everyone should do it."],
  ["“Zoos can protect animals that are in danger.” The author’s perspective on zoos is…", "positive", ["negative", "unsure", "angry"], "The author names a good thing."],
  ["“Video games waste time and hurt grades.” The author’s perspective is…", "negative", ["positive", "excited", "neutral"], "The author names bad effects."],
  ["Which words show a positive perspective?", "wonderful, helpful, amazing", ["harmful, awful, dull", "square, round, flat", "Monday, Friday, May"], "Look at the feeling in the words."],
  ["Which words show a negative perspective?", "terrible, harmful, boring", ["wonderful, great, kind", "one, two, three", "red, blue, green"], "Look at the feeling in the words."],
  ["A claim is…", "a statement the author wants you to accept", ["a kind of poem", "a page number", "a caption"], "Authors back claims with reasons."],
  ["A reason is…", "why the claim is true", ["the title", "the cover", "a kind of rhyme"], "Reasons explain the claim."],
  ["Evidence is…", "facts, examples or details that back up a reason", ["a funny joke", "a list of titles", "the author’s name"], "It proves the reason."],
  ["Claim: Schools should have gardens. Which is a reason?", "Gardens teach students about plants.", ["Schools have doors.", "Plants are green.", "Gardens exist."], "A reason supports the claim."],
  ["Claim: Schools should have gardens. Which is evidence for the reason that gardens teach about plants?", "Students track how a seed becomes a plant.", ["Some gardens are big.", "I like carrots.", "Soil is brown."], "It gives a fact or example.", true],
  ["Claim: People should walk more. Reason: Walking helps your heart. Which is evidence?", "Doctors say 30 minutes of walking helps hearts stay strong.", ["Walking is fun.", "I walk my dog.", "Shoes cost money."], "It is a fact from experts.", true],
  ["Claim: Libraries are important. Which reason supports it?", "They give everyone free access to books.", ["They have chairs.", "Some are old.", "I read at night."], "Pick a reason that supports the claim."],
  ["Claim: We need more bike lanes. Which reason supports it?", "Bike lanes keep riders away from cars.", ["Bikes have bells.", "Roads are long.", "I own a bike."], "A reason explains why."],
  ["Claim: Homework should be shorter. Which reason supports it?", "Students need time to rest and play.", ["Homework is paper.", "Teachers wear glasses.", "Pencils are yellow."], "Pick the reason that supports."],
  ["“A good park needs shade, clean water and safe play spaces.” Which word shows the author’s opinion?", "good", ["needs", "water", "play"], "Good is a judgment.", true],
  ["An author wrote, “It is clear that parks improve neighborhoods.” The claim is that parks…", "improve neighborhoods", ["are clear", "are far", "are noisy"], "Find what the author wants you to accept."],
  ["Which sentence is a reason, not a claim?", "Trees give shade, so parks stay cooler.", ["We should plant more trees.", "Trees are tall.", "Planting trees is great."], "A reason uses “so,” “because” or a fact.", true],
  ["Which statement is an opinion the author must support?", "Our town needs a new library.", ["The library opens at nine.", "The library has two floors.", "The library is on Main Street."], "An opinion needs reasons."],
  ["An author gives three reasons and a fact for each. The author wants you to…", "agree with the claim", ["forget the topic", "ignore the reasons", "stop reading"], "Reasons and evidence persuade."],
  ["“Without enough sleep, students cannot focus.” This is a reason for the claim that…", "students need enough sleep", ["students should skip school", "school is too short", "pillows are soft"], "It supports a need for sleep.", true],
  ["An author is excited about space travel. How can you tell?", "the author uses words like thrilling and amazing", ["the text has a table", "the title has five words", "there are pictures"], "Word choice shows feeling.", true],
  ["Two authors write about wolves. One calls them “dangerous.” One calls them “helpful.” What differs?", "their perspectives", ["the topic", "the grade level", "the page count"], "They feel differently about wolves.", true],
  ["Why do authors give evidence?", "so readers can trust the claim", ["to fill space", "to change the topic", "to avoid reasons"], "Evidence makes a claim stronger."],
  ["A reason without evidence is…", "less convincing", ["more convincing", "a poem", "a fact"], "Evidence makes it stronger."],
];

const THEMES: Q[] = [
  ["A theme is…", "the big message of a story", ["the cover", "the setting", "a character’s name"], "It is what the story is really about."],
  ["A stated theme is…", "told directly in the text", ["only hinted at", "found in the title page", "left out"], "The text says it."],
  ["An implied theme is…", "shown through events and must be figured out", ["told in words", "found in the glossary", "a kind of rhyme"], "You infer it."],
  ["A boy shares his lunch with a friend who forgot hers. A theme is…", "kindness matters", ["lunch is round", "friends are late", "forgetting is fun"], "What lesson does the story teach?"],
  ["A girl keeps practicing the violin until she plays a song well. A theme is…", "practice leads to success", ["violins are loud", "songs are short", "girls are tired"], "What lesson does the story teach?"],
  ["A fox tricks a crow, but the crow later learns not to trust flattery. A theme is…", "do not be fooled by flattery", ["foxes are sly", "crows are black", "trees are tall"], "What does the crow learn?"],
  ["Which sentence states a theme?", "True friends help each other.", ["The dog ran fast.", "The story is at a park.", "Maya has a red hat."], "A theme is a big lesson."],
  ["Which title most likely goes with the theme “never give up”?", "The Little Engine That Kept Trying", ["The Quiet Room", "A Day at the Lake", "Blue Socks"], "Think about the message."],
  ["Details that help show a theme are found in…", "the characters’ actions and choices", ["the page numbers", "the cover color", "the author’s age"], "Actions reveal themes."],
  ["A character learns that telling the truth is hard but right. This shows the theme…", "honesty", ["speed", "weather", "colors"], "What did the character learn?"],
  ["A poem’s rhyme can…", "make it sound musical and easy to remember", ["hide the meaning", "make it a fact book", "remove the lines"], "Rhyme creates sound patterns."],
  ["Short lines in a poem can…", "make the poem feel quick or quiet", ["make it longer", "make it a recipe", "remove the meaning"], "Structure creates feeling."],
  ["“Run, run, run, / chase the sun.” The short rhyming lines make the poem feel…", "quick and playful", ["slow and sad", "angry", "serious"], "Short lines move fast.", true],
  ["“Slowly the snow / settles down / on the sleeping town.” The long soft sounds make the poem feel…", "calm", ["fast", "scary", "silly"], "Soft sounds feel quiet.", true],
  ["A poem’s structure is…", "how its lines and stanzas are arranged", ["the poet’s name", "the paper", "the page count"], "Structure is the poem’s shape."],
  ["A poet repeats a line at the end of each stanza. This helps show…", "an idea the poet wants to stress", ["a mistake", "the poet’s age", "the setting"], "Repetition adds emphasis.", true],
  ["Rhyme and rhythm in a lullaby help make it…", "soothing", ["scary", "loud", "confusing"], "A steady beat is calming."],
  ["A poem with a stanza break after each idea helps readers…", "pause and think about each idea", ["skip lines", "ignore the poem", "read faster"], "Breaks separate ideas.", true],
  ["In a poem about a storm, quick short lines and loud sound words make the storm feel…", "wild", ["calm", "sleepy", "tiny"], "Sound and shape add meaning.", true],
  ["Which is a theme of a story about a lost puppy that finds its way home because of a kind stranger?", "kindness helps others", ["puppies are small", "strangers are scary", "home is far"], "What message is about the stranger?"],
  ["A theme is usually…", "a message about life that applies to many people", ["a character’s name", "one sentence of dialogue", "the title"], "Themes are big ideas."],
  ["“The brave little boat sailed through the storm.” What might the poem’s theme be?", "courage", ["boredom", "fashion", "rest"], "Think about the boat’s action.", true],
  ["How can a reader find an implied theme?", "think about what the characters learn", ["count the words", "check the cover", "look at the page number"], "Look at the characters’ changes."],
  ["Which poem structure has four-line stanzas?", "quatrain", ["haiku", "limerick", "ode"], "A quatrain has four lines.", true],
  ["Two lines that rhyme and go together are called a…", "couplet", ["quatrain", "haiku", "ode"], "Couplet means pair.", true],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "fl-g4-text-structures",
    title: "Problem, Sequence & Description",
    emoji: "🧱",
    blurb: "How information texts are built.",
    parentNote:
      "Florida’s Grade 4 standards ask children to explain how text features contribute to meaning and to identify the text structures of problem and solution, sequence, and description. Children read short passages and name how each is organized.",
    standards: ["ELA.4.R.2.1", "text features, and the text structures of problem and solution, sequence and description"],
    items: STRUCTURES,
  }),
  bankUnit({
    id: "fl-g4-claims-reasons-perspective",
    title: "Claims, Reasons & Perspective",
    emoji: "📣",
    blurb: "What the author believes and how they back it up.",
    parentNote:
      "Florida’s Grade 4 standards ask children to explain an author’s perspective toward a topic and an author’s claim, with the reasons and evidence used to support it. Children pick out the claim, the reason and the evidence and notice how word choice shows feeling.",
    standards: ["ELA.4.R.2.3; ELA.4.R.2.4", "an author’s perspective toward a topic, and the claim, reasons and evidence"],
    items: CLAIMS,
  }),
  bankUnit({
    id: "fl-g4-theme-and-poetry",
    title: "Theme & Poem Shapes",
    emoji: "🎭",
    blurb: "The message of a story and how a poem’s sound and shape add meaning.",
    parentNote:
      "Florida’s Grade 4 standards ask children to explain a stated or implied theme and how it develops, and to explain how rhyme and structure create meaning in a poem. Children name a theme from short story summaries and tell how a poem’s lines and sounds change how it feels.",
    standards: ["ELA.4.R.1.2; ELA.4.R.1.4", "stated and implied theme, and how rhyme and structure create meaning in a poem"],
    items: THEMES,
  }),
];
/** Put the own units before the planned ones. */
export const FIRST = false;
