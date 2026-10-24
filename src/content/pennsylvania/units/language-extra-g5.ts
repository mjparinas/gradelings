import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Pennsylvania's extra Grade 5 English language arts units (`pa-` ids): academic and subject words, the thinking behind
// informative, opinion and narrative writing (tapped, not written), and quoting and comparing from a short passage. The
// passages are original. Reading only.

const WORDS: Q[] = [
  ["Which word means “to make something clear by giving details”?", "explain", ["borrow", "hide", "pause"], "Explain is a common school word."],
  ["Which word means “to put things in a group by how they are alike”?", "classify", ["ignore", "erase", "fold"], "Classify means sort into groups."],
  ["“The author’s purpose was to inform.” To inform means to…", "give information", ["tell a joke", "scare readers", "make a rhyme"], "An informing text teaches."],
  ["“Compare the two stories.” Compare means to…", "tell how things are alike and different", ["rewrite them", "forget them", "count the pages"], "Look at likeness and difference."],
  ["“The scientist recorded her observations.” Observations are…", "things noticed and written down", ["guesses", "jokes", "mistakes"], "Observe means notice carefully."],
  ["“The population of the town grew.” Population means…", "the number of people living there", ["the size of the streets", "the weather", "the shops"], "Population counts people."],
  ["“The treaty ended the conflict.” Conflict means…", "a struggle or disagreement", ["a feast", "a kind of map", "a language"], "A conflict is a clash."],
  ["“The author uses a metaphor.” Which is a metaphor?", "Time is a thief.", ["Time passes slowly.", "The clock is on the wall.", "I have time."], "A metaphor says one thing is another."],
  ["“Her smile was as bright as the sun.” This is a…", "simile", ["metaphor", "fact", "question"], "It uses as."],
  ["“It’s a piece of cake” means…", "it is easy", ["it is sweet", "it is a party", "it is small"], "It is an idiom."],
  ["“He let the cat out of the bag.” This means he…", "gave away a secret", ["lost a cat", "bought a bag", "cleaned a room"], "It is an idiom."],
  ["The Greek root “bio” means life. “Biology” is the study of…", "living things", ["rocks", "stars", "numbers"], "Bio means life."],
  ["The Latin root “struct” means build. “Construct” means…", "to build", ["to break", "to paint", "to lose"], "Struct means build."],
  ["The suffix “-able” means able to be. “Washable” means…", "able to be washed", ["not washed", "washed twice", "washing now"], "-able means able to be."],
  ["The prefix “pre-” means before. “Preview” means…", "look at before", ["look at again", "not look", "look away"], "Pre- means before."],
  ["“The marine biologist studied ocean life.” Marine means…", "of the sea", ["of the sky", "of the desert", "of the city"], "Marine relates to the sea."],
  ["Which signal words show a contrast?", "however, on the other hand", ["first, next", "for example, such as", "meanwhile, then"], "They show something different."],
  ["Which signal words show a cause?", "because, since, as a result", ["however, but", "first, then", "in addition, also"], "They show why."],
  ["Which word is a better choice than “good” for a very tasty meal?", "delicious", ["fine", "okay", "nice"], "Choose a more exact word."],
  ["“The explorers were determined.” Determined means…", "firmly set on doing something", ["sleepy", "lost", "angry"], "They would not give up."],
  ["“The new law was controversial.” Controversial means…", "people disagreed about it", ["everyone liked it", "no one heard it", "it was old"], "A controversy is an argument.", true],
  ["“The author’s tone is sarcastic.” Sarcastic means…", "saying the opposite to mock", ["very gentle", "full of facts", "sleepy"], "Sarcasm mocks.", true],
  ["Which word is most precise? “The clouds ___ across the sky.”", "drifted", ["went", "did", "moved to"], "Drifted shows slow movement.", true],
  ["Which pair are synonyms?", "reluctant and unwilling", ["brave and timid", "hot and cold", "start and end"], "Synonyms mean nearly the same.", true],
  ["“Photosynthesis” has the root photo. Photo means…", "light", ["water", "earth", "wind"], "Photo means light.", true],
  ["“The dam prevented flooding.” Prevented means…", "stopped from happening", ["caused", "described", "welcomed"], "Prevent means stop.", true],
];

const WRITING: Q[] = [
  ["Which sentence introduces a report on the human heart clearly?", "The heart is a muscle that pumps blood to every part of your body.", ["Hearts are red.", "I felt my heart once.", "Blood is in a story."], "A clear introduction names the topic."],
  ["Which fact belongs in a report on the planet Mars?", "Mars has the tallest volcano in our solar system.", ["Neptune is a giant.", "Moon cheese is a story.", "Bananas grow in tropical places."], "Stay on the topic."],
  ["Which source is the best for a report on Mars?", "a science encyclopedia", ["a cartoon", "a menu", "a joke book"], "Use a reliable source."],
  ["Which sentence adds a quotation that supports the topic of space travel?", "“The Earth looked like a blue marble,” said astronaut Ana Reyes.", ["“I like toast,” said Sam.", "“Look at that dog,” said Jo.", "“We are late,” said Lee."], "Use a quotation that fits."],
  ["How should related ideas be grouped in a report on frogs?", "life cycle in one section, habitat in another", ["mix facts at random", "put one fact per page", "list facts alphabetically"], "Group related information."],
  ["Which transition links a fact to an added fact?", "In addition", ["Meanwhile", "Suddenly", "However"], "In addition adds more."],
  ["Which sentence ends a report on recycling well?", "By recycling, each of us can help protect Earth for the future.", ["Recycling is a word.", "Paper is thin.", "Cans are metal."], "A conclusion ties the ideas together."],
  ["Which sentence clearly states an opinion?", "Our school should start a recycling club.", ["Some schools have clubs.", "Recycling uses bins.", "Clubs meet after school."], "An opinion says what someone thinks should happen."],
  ["Which reason is supported by a fact?", "Recycling one ton of paper saves about 17 trees.", ["Recycling is neat.", "My friend likes it.", "It sounds fun."], "A good reason includes evidence."],
  ["Which sentence presents a counterargument that is answered?", "Some say recycling takes time, but sorting can take just a minute a day.", ["Some say recycling.", "Time is a word.", "Recycling is good."], "A counterargument gets a response."],
  ["Which transition introduces a reason?", "One reason is that", ["Once upon a time", "In the end", "Meanwhile"], "It signals a reason."],
  ["Which closing sentence best supports the opinion “Every child should learn to swim”?", "Learning to swim keeps children safe and builds healthy habits for life.", ["Pools are blue.", "Swimming is a word.", "Water is wet."], "A closing connects back to the opinion."],
  ["Which sentence orients the reader at the start of a story?", "Late one foggy night, Nora tiptoed down the stairs, certain she had heard a sound.", ["Nights are dark.", "Stairs have steps.", "A sound is a noise."], "Set the scene and character."],
  ["Which sentence shows a character’s response with sensory details?", "Nora’s heart pounded, and the cold floor made her toes curl.", ["Nora was a girl.", "There was a floor.", "It was night."], "Use details that show feelings."],
  ["Which sentence uses dialogue and action together?", "“Who’s there?” Nora whispered, gripping the rail.", ["Nora whispered.", "The rail was wooden.", "Someone was there."], "Dialogue plus action shows character."],
  ["Which transition moves the story forward in time?", "A moment later", ["For example", "In conclusion", "On the other hand"], "It shows the next event."],
  ["Which ending best resolves a story about a missing kitten?", "Finally, the kitten tumbled out of the laundry basket, and Nora laughed with relief.", ["The kitten had fur.", "Laundry baskets are big.", "Nora had a kitten."], "A conclusion resolves the problem."],
  ["Which sentence has the most precise language?", "The tiny hummingbird hovered above the crimson blossom.", ["A bird was near a thing.", "The animal was there.", "It was a flower place."], "Precise words help readers picture it.", true],
  ["Which word choice conveys excitement most precisely?", "exhilarated", ["fine", "okay", "present"], "Exhilarated shows strong excitement.", true],
  ["Which sentence varies sentence length for effect?", "Silence. Then a branch snapped, and every one of us froze in place.", ["Silence. Silence. Silence.", "Silence then a branch snapped and every one of us froze and held our breath and did not move.", "Branch. Snap. Freeze."], "Short and long sentences create rhythm.", true],
  ["Which sentence draws evidence from a text? Text: “Penguins huddle in groups to stay warm in freezing winds.”", "The text shows penguins work together, since they huddle to stay warm.", ["Penguins are cute.", "I like penguins.", "Penguins swim."], "Use evidence to support an idea.", true],
  ["Which would be the best opening hook for a report on sharks?", "Did you know that sharks have been around longer than trees?", ["Sharks are fish.", "I like sharks.", "Water is deep."], "A surprising fact hooks the reader.", true],
  ["Which sentence gives a reason AND uses a linking word?", "Students should have longer recess because exercise helps them concentrate.", ["Students should have recess.", "Recess is long.", "Concentrate."], "Because links the reason to the opinion.", true],
  ["Which sentence correctly punctuates dialogue?", "“We can win,” said Kai, “if we work together.”", ["“We can win said Kai if we work together.”", "“We can win,” said Kai “if we work together”.", "We can win, said Kai, “if we work together.”"], "Commas and quotation marks set off speech.", true],
  ["Which of these would make the writer’s voice more formal in a report?", "Scientists have observed that…", ["So like, scientists saw…", "Dudes in labs say…", "It’s totally obvious that…"], "Report writing uses formal language.", true],
];

const PROVE: Q[] = [
  ["Text: “The monarch butterfly migrates thousands of miles to Mexico each fall.” Which quote shows how far they travel?", "“thousands of miles”", ["“butterfly”", "“each fall”", "“to Mexico”"], "Quote the exact words."],
  ["Text: “Ana held the door for her grandmother and carried her bag.” Which detail shows Ana is thoughtful?", "carried her bag", ["each day", "the door’s color", "her age"], "Her actions show thoughtfulness."],
  ["Text: “Dry weather made the fields brittle. When lightning struck, the grass caught fire.” How are the events connected?", "dry weather helped the fire spread", ["lightning made the weather dry", "the fire ended the weather", "they are not connected"], "Explain the relationship."],
  ["Text: “Ben was nervous about his speech. He practiced each night. On the day, he spoke clearly and smiled.” What does Ben’s practice show?", "it helped him succeed", ["he forgot his speech", "he disliked speeches", "he skipped class"], "Connect the events."],
  ["Text: “A beaver’s dam creates a pond. The pond protects the beaver’s home from predators.” How do the ideas interact?", "the dam makes a pond that protects the home", ["the pond builds the dam", "the home blocks the dam", "predators build the pond"], "Explain the relationship between ideas."],
  ["Compare: Mia faces a storm alone; Leo faces a storm with friends. How are the settings alike?", "both include a storm", ["both are in a cave", "both are in the desert", "both are at school"], "Look for what is the same."],
  ["Compare: Mia gives up, but Leo keeps trying. How are the characters different?", "Leo is more persistent", ["Mia is more persistent", "they act the same", "neither tries"], "Compare their actions."],
  ["Text: “The ship sank near the reef, but the crew reached shore in a lifeboat.” How are the two events different?", "the ship was lost, but the people were saved", ["both were safe", "both were lost", "neither happened"], "Compare the events."],
  ["Which quote supports the claim that the pioneers were brave? Text: “They crossed rivers and mountains with little food, yet they pressed on.”", "“yet they pressed on”", ["“rivers”", "“little”", "“mountains”"], "Pick words showing courage."],
  ["Which inference is supported? “Sara packed sunscreen, a towel and a bucket.”", "She is going to the beach.", ["She is going to school.", "She is going skiing.", "She is going to bed."], "The items are clues."],
  ["Text: “The snowfall was the heaviest in twenty years, so the town closed its schools.” What is the cause of the schools closing?", "the heavy snowfall", ["twenty years", "the town", "a holiday"], "So points to the effect."],
  ["Text: “Rosa noticed the dog limping, so she called her mother.” What does this show about Rosa?", "she cares", ["she is afraid of dogs", "she is lost", "she is bored"], "Her action shows care."],
  ["Which statement is a main idea? “Elephants live in herds. Older females lead the herd. Calves are protected by the group.”", "Elephant herds work together.", ["Elephants are gray.", "Calves are small.", "Africa is a continent."], "The details support this idea."],
  ["Which two ideas does the passage connect? “As the Earth warms, glaciers melt and sea levels rise.”", "warming and rising seas", ["glaciers and mittens", "seas and sand", "ice and cream"], "The passage links cause and effect."],
  ["Which detail would an author include to describe a character’s kindness?", "He shared his lunch with a classmate who had forgotten his.", ["He wore a blue coat.", "He walked to school.", "He had a pencil."], "Actions show kindness."],
  ["Which two settings are compared? Story 1: a desert village. Story 2: a mountain village.", "desert and mountain", ["two oceans", "two schools", "two cities in snow"], "Name the settings."],
  ["Which sentence quotes accurately from the text? Text: “Bees communicate through dance.”", "The author says, “Bees communicate through dance.”", ["The author says, Bees talk by singing.", "The author says, “Bees can fly very high.”", "The author says, “Birds dance.”"], "Quote exactly.", true],
  ["Text: “The experiment failed twice. The team changed one thing each time and tried again.” What can you infer about the team?", "they are persistent", ["they quit quickly", "they did not care", "they cheated"], "They kept trying.", true],
  ["Text: “Before the railroad, a trip took weeks. After the railroad, it took days.” What was the effect of the railroad?", "travel became faster", ["trips became longer", "towns disappeared", "weeks grew shorter"], "Compare before and after.", true],
  ["Compare two accounts of a snowstorm: one says “a gentle snowfall,” another says “a blizzard.” What may explain the difference?", "the writers saw it at different times or places", ["snow does not exist", "they are the same word", "one is a map"], "Points of view may differ.", true],
  ["Text: “Kenji’s grin faded when he saw the empty shelf.” What can you infer?", "something he wanted was gone", ["he found a treasure", "he was sleepy", "he was proud"], "The grin faded at the empty shelf.", true],
  ["Which relationship does the text show? “Because the soil lacked water, the crops withered.”", "cause and effect", ["compare and contrast", "problem and solution", "description"], "Because points to a cause.", true],
  ["Text: “The mayor listened, nodded and then changed the plan.” What does this show?", "the mayor is open to ideas", ["the mayor ignored everyone", "the mayor is asleep", "the mayor left"], "Actions show attitude.", true],
  ["Which detail shows the narrator’s point of view? “I thought the hill looked steep and scary.”", "“steep and scary”", ["“the hill”", "“I thought”", "“looked”"], "Opinion words show viewpoint.", true],
  ["Text: “Wind turbines make electricity without burning fuel. That keeps the air cleaner.” How are the ideas related?", "no fuel burned means cleaner air", ["clean air makes wind", "fuel makes turbines", "air makes fuel"], "The second idea follows from the first.", true],
];

export const EXTRA: Unit[] = [
  bankUnit({
    id: "pa-g5-new-words",
    title: "Academic Words & Word Parts",
    emoji: "🧭",
    blurb: "Words used across school subjects, roots, and figurative language.",
    parentNote:
      "Pennsylvania’s Grade 5 standards ask children to acquire and use accurately academic and subject words, including words that signal contrast, addition and other relationships, and to work out unknown words from context and word parts. Children tap the word or meaning that fits.",
    standards: ["CC.1.2.5.J; CC.1.3.5.J; CC.1.2.5.K; CC.1.3.5.I; CC.1.2.5.F", "academic and subject words, words that signal relationships, word parts and figurative language"],
    items: WORDS,
  }),
  bankUnit({
    id: "pa-g5-writing-moves",
    title: "Reports, Opinions & Stories",
    emoji: "✏️",
    blurb: "Pick the sentence that introduces, supports, links and wraps up.",
    parentNote:
      "Pennsylvania’s Grade 5 writing standards ask children to introduce a topic and develop it with facts, definitions and quotations, to support an opinion with reasons linked by words and phrases, and to tell a story with dialogue, description and transitions. Children are not asked to write here: they tap the sentence that does each job best.",
    standards: ["CC.1.4.5.B; CC.1.4.5.C; CC.1.4.5.D; CC.1.4.5.E; CC.1.4.5.H; CC.1.4.5.I; CC.1.4.5.J; CC.1.4.5.N; CC.1.4.5.O; CC.1.4.5.P; CC.1.4.5.Q", "introducing a topic with facts and quotations, supporting an opinion with linked reasons, telling a story with dialogue and transitions, and choosing precise words"],
    items: WRITING,
  }),
  bankUnit({
    id: "pa-g5-prove-it",
    title: "Prove It",
    emoji: "🔍",
    blurb: "Quote exactly, compare and explain how ideas connect.",
    parentNote:
      "Pennsylvania’s Grade 5 standards ask children to quote accurately from a text to explain what it says and to make inferences, to explain the relationships or interactions between individuals, events and ideas, and to compare and contrast characters, settings and events. Children read a short passage and choose the answer the text supports.",
    standards: ["CC.1.2.5.B; CC.1.2.5.C; CC.1.3.5.B; CC.1.3.5.C; CC.1.4.5.S", "quoting accurately and making inferences, explaining how events and ideas connect, comparing characters and settings, and drawing evidence from a text"],
    items: PROVE,
  }),
];
