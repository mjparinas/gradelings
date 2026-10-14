import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// More of New York's own Grade 3 language units (`ny-` ids), added to ./language-g3. No shared unit practises 3R6 (how a
// reader's view can differ from the author's, narrator's or a character's), 3R7 (what illustrations and text features
// add to the words), 3L3 (conversational versus academic English), 3W1 (an argument with reasons), 3W3 (narrative
// technique and order) or 3W4 (a creative response), so these banks do. Every passage is original.

const PICTURES_AND_PERSPECTIVES: Q[] = [
  [
    "A story says the forest was “peaceful.” The picture shows soft sunlight and sleeping deer. What does the picture add?",
    "It helps you feel the calm mood.",
    ["It shows the story is about a city.", "It tells you the ending.", "It shows the author's name."],
    "Pictures can show the mood of a scene.",
  ],
  [
    "A picture in a story shows dark clouds and bent trees. What does it help you know?",
    "A storm is coming.",
    ["It is a sunny picnic day.", "The characters are asleep.", "The story is a fact book."],
    "Look at what the clouds and trees show.",
  ],
  [
    "A text about volcanoes has a diagram with labels. How does it help the words?",
    "It shows the parts of a volcano the words describe.",
    ["It tells a made-up story.", "It lists the author's other books.", "It makes the book longer."],
    "A labeled diagram shows what the words explain.",
  ],
  [
    "A book about the water cycle has arrows from the ocean to the clouds. What do the arrows show?",
    "how water moves from one place to the next",
    ["how big the ocean is", "the weather tomorrow", "where the author lives"],
    "Arrows often show movement or steps.",
  ],
  [
    "A map in a story shows where the treasure is hidden. Which question does it help answer?",
    "Where are the key events happening?",
    ["Why is the main character sad?", "Who wrote the book?", "How long is the story?"],
    "Maps show where things happen.",
  ],
  [
    "A text has a timeline of a frog's life. Which question does it help answer?",
    "When does each change happen?",
    ["What does a frog sound like?", "Who is the author?", "Where is the nearest pond?"],
    "Timelines show when things happen in order.",
  ],
  [
    "The words say, “Theo was not scared at all.” The picture shows Theo hiding behind his mom. What does the picture tell you?",
    "Theo may really be scared.",
    ["Theo is very brave.", "Theo is asleep.", "Theo is not in the story."],
    "Sometimes pictures show more than the words say.",
  ],
  [
    "A caption under a photo says, “A baby panda weighs about as much as a stick of butter.” What does the caption do?",
    "It explains something about the photo.",
    ["It tells a joke.", "It lists the chapters.", "It shows the page number."],
    "Captions explain pictures.",
  ],
  [
    "In a story, the character Mo thinks thunderstorms are exciting. You think storms are scary. What is true?",
    "A reader can feel differently than a character.",
    ["You must feel what Mo feels.", "Mo is wrong.", "You read the story wrong."],
    "Readers and characters can see things differently.",
  ],
  [
    "The narrator says, “Broccoli is the worst food ever!” You love broccoli. What does this show?",
    "Your point of view is different from the narrator's.",
    ["You and the narrator agree.", "The narrator is the author.", "Broccoli is in every story."],
    "Your own view can differ from the narrator's.",
  ],
  [
    "An author writes that winter is the best season because of sledding. Which reader view is different from the author's?",
    "I like summer better because I can swim.",
    ["Sledding makes winter great.", "Winter is the best season.", "I agree that sledding is fun."],
    "Find the view that disagrees with the author.",
  ],
  [
    "In a story, the wolf tells his side: he only wanted to borrow sugar. How might readers feel now?",
    "They might see the wolf differently.",
    ["They must stop reading.", "They will forget the story.", "They will think the wolf is a pig."],
    "A new point of view can change how you see a character.",
  ],
  [
    "Why might two readers feel differently about the same story?",
    "They have different lives and experiences.",
    ["One of them read it wrong.", "Stories can mean only one thing.", "They read different words."],
    "Readers bring their own experiences.",
  ],
  [
    "Which sentence sounds like friendly talk with a friend?",
    "Hey, wanna come over?",
    ["I would like to invite you to my home.", "The meeting will begin at noon.", "Please find the report attached."],
    "Friends talk in a relaxed way.",
  ],
  [
    "Which sentence fits a school report about frogs?",
    "Frogs are amphibians that live on land and in water.",
    ["Frogs are super cool, ya know?", "Ew, frogs are slimy, lol!", "Frogs, like, jump a lot."],
    "School reports use clear, careful language.",
  ],
  [
    "You are giving a talk to the whole school. Which opening fits best?",
    "Good morning, everyone. Today I will tell you about bees.",
    ["Yo, what's up?", "Um, so, bees, I guess.", "Hey guys, bees are awesome, right?"],
    "A talk to an audience uses more formal words.",
  ],
  [
    "Which is the academic way to say “The plant got bigger”?",
    "The plant grew taller.",
    ["The plant got way huge.", "The plant got super big.", "The plant was all grown-up-ish."],
    "Academic language is clear and exact.",
  ],
  [
    "Which would you most likely say to a friend, not write in a report?",
    "That movie was awesome!",
    ["The movie is about two explorers.", "The movie was made in 2020.", "The movie shows how ants live."],
    "Conversational talk is casual and shows feelings.",
  ],
  [
    "A book has a bold word “habitat” and a glossary. How do these features help?",
    "They point out an important word and tell what it means.",
    ["They tell the story's ending.", "They show the setting.", "They make the words harder."],
    "Bold words and glossaries help readers with key words.",
    true,
  ],
  [
    "A picture book shows the main character smaller and smaller on each page as the city gets bigger. What might it show?",
    "how lost and small the character feels",
    ["that the character is growing", "that the city is shrinking", "that the book is ending"],
    "Pictures can show a character's feelings.",
    true,
  ],
  [
    "An article about recess says it should be longer. A reader says, “I think recess is long enough.” What is happening?",
    "The reader's view differs from the author's.",
    ["The reader agrees with the author.", "The reader is the author.", "The article has no point of view."],
    "Compare what the author thinks with what the reader thinks.",
    true,
  ],
  [
    "Which sentence would fit a science journal?",
    "The ice melted in ten minutes in the sun.",
    ["The ice melted crazy fast!", "OMG, the ice was gone!", "The ice was, like, totally melty."],
    "A science journal uses exact, careful words.",
    true,
  ],
  [
    "Your friend says, “Gonna grab a snack.” How would you write that in a story's narration for school?",
    "I am going to get a snack.",
    ["Gonna grab a snack.", "Snack time, yo.", "Grabbin' a snack, k?"],
    "Change casual words into complete, clear ones.",
    true,
  ],
  [
    "In a story, Grandma is happy that it is raining because her garden needs water. Nia is sad because her game is canceled. What does this show?",
    "Characters can see the same event differently.",
    ["Rain makes everyone sad.", "Grandma and Nia agree.", "The story has no characters."],
    "Each character has a point of view.",
    true,
  ],
  [
    "A chart shows how many books each class read. What does it add to an article about a reading contest?",
    "It shows the numbers so you can compare the classes.",
    ["It tells who wrote the article.", "It shows the article's mood.", "It hides the winner."],
    "Charts make numbers easy to compare.",
    true,
  ],
];

const WRITING_CRAFT: Q[] = [
  [
    "Which sentence states a claim?",
    "Our school should have a garden.",
    ["Our school has two floors.", "A garden has plants.", "Some schools are big."],
    "A claim is what the writer wants you to believe or do.",
  ],
  [
    "Claim: “Kids should read every day.” Which reason supports it best?",
    "Reading every day helps kids learn new words.",
    ["Books have covers.", "Some books are long.", "Libraries close at five."],
    "A strong reason explains why the claim is true.",
  ],
  [
    "Claim: “Our class needs a pet fish.” Which is the best evidence?",
    "Caring for a pet teaches responsibility, and fish are easy to feed.",
    ["Fish are orange.", "My uncle has a boat.", "The class has 24 desks."],
    "Evidence is a fact or example that backs up the claim.",
  ],
  [
    "Which words help link a reason to a claim?",
    "because, for example, also",
    ["once upon a time", "the end", "hello, goodbye"],
    "Linking words connect your reasons to your opinion.",
  ],
  [
    "Which is the best concluding sentence for a piece arguing for a longer recess?",
    "For these reasons, recess should be ten minutes longer.",
    ["Recess is at noon.", "I like the slide.", "Once there was a school."],
    "A conclusion restates the claim.",
  ],
  [
    "Which sentence uses dialogue?",
    "“Wait for me!” called Ava.",
    ["Ava waited for her friend.", "Ava was at the park.", "The park was big."],
    "Dialogue shows the exact words a character says, in quotation marks.",
  ],
  [
    "Which sentence uses a descriptive detail?",
    "The old wooden bridge creaked under our feet.",
    ["We crossed a bridge.", "There was a bridge.", "Bridges go over water."],
    "Descriptive details help readers see, hear or feel.",
  ],
  [
    "Which time-order words show a clear event sequence?",
    "First, After that, In the end",
    ["In the end, First, After that", "Because, If, Or", "Red, Blue, Green"],
    "Order words show what happened first, next and last.",
  ],
  [
    "Which sentence shows how a character feels instead of just telling it?",
    "Ruby's hands shook as she stepped onto the stage.",
    ["Ruby was nervous.", "Ruby went on stage.", "There was a stage."],
    "Showing uses actions and details that reveal the feeling.",
  ],
  [
    "Which is the best ending for a story about a lost dog who finds his way home?",
    "Buster curled up in his own bed, happy to be home at last.",
    ["Buster ran out the gate.", "Dogs have good noses.", "It was a Tuesday."],
    "An ending should wrap up the problem.",
  ],
  [
    "A story's problem is that the class hamster escaped. Which event should come next?",
    "The class searched every corner of the room.",
    ["The hamster was born.", "The class went home for summer.", "The teacher bought a fish."],
    "After the problem, characters try to solve it.",
  ],
  [
    "Which opening sentence would hook a reader?",
    "Nobody believed me when I said there was a giant in the garden.",
    ["This is a story.", "I will tell you about a garden.", "Gardens have plants."],
    "A hook makes the reader curious.",
  ],
  [
    "After reading a fable about a greedy dog, which is a creative response?",
    "writing a short play with a new animal who learns the same lesson",
    ["copying the title", "counting the pages", "listing the author's address"],
    "A creative response makes something new from the text.",
  ],
  [
    "Your class read a poem about autumn leaves. Which response fits?",
    "a collage of leaves with a line from the poem",
    ["a list of spelling words", "a math worksheet", "a bus schedule"],
    "Your response should connect to the poem's ideas.",
  ],
  [
    "You loved a story about a brave sister. Which is a response to the theme?",
    "a poem about a time you were brave",
    ["a summary of the book's price", "a list of the chapter numbers", "a drawing of a car"],
    "A theme response connects the big idea to your own ideas.",
  ],
  [
    "Claim: “Students should take a short walk after lunch.” Which reason does NOT support it?",
    "The cafeteria serves soup on Mondays.",
    ["Walking helps students focus in class.", "Fresh air is good for health.", "Moving after eating helps the body."],
    "Find the reason that is not about walking after lunch.",
    true,
  ],
  [
    "Which sentence adds a fact as evidence for “Bikes are good for the environment”?",
    "Bikes do not burn gas, so they make no smoke.",
    ["Bikes are fun to ride.", "My bike is green.", "I got a bike last year."],
    "Evidence should be a fact, not just a feeling.",
    true,
  ],
  [
    "Which is the best way to organize an opinion piece?",
    "opinion, reasons, conclusion",
    ["conclusion, opinion, reasons", "reasons only", "a list of facts with no opinion"],
    "Start with the opinion and end with the conclusion.",
    true,
  ],
  [
    "Which sentence uses a strong verb to describe an action?",
    "The puppy tumbled down the grassy hill.",
    ["The puppy went down the hill.", "The puppy was on the hill.", "The puppy moved."],
    "Strong verbs paint a clear picture.",
    true,
  ],
  [
    "Which sentence best shows a character's thoughts?",
    "I hope nobody notices my muddy shoes, Kip thought.",
    ["Kip had shoes.", "The shoes were muddy.", "Kip walked inside."],
    "Thoughts show what is going on in the character's mind.",
    true,
  ],
  [
    "Which line could start a play based on a story about two friends building a fort?",
    "SAM: Pass me that big branch, please!",
    ["Sam and Jo built a fort.", "Forts are made of sticks.", "The end."],
    "A play shows a character's name and their lines.",
    true,
  ],
  [
    "Which detail would help a reader picture a busy market in a story?",
    "Sellers shouted prices while the smell of fresh bread filled the air.",
    ["There was a market.", "Markets sell things.", "We went to the market on Sunday."],
    "Use sights, sounds and smells.",
    true,
  ],
  [
    "Which sentence would NOT fit a story told in order about baking cookies?",
    "Last week I went to the dentist.",
    ["First, we measured the flour.", "Next, we stirred in the chocolate chips.", "Finally, the cookies came out golden."],
    "Each event should belong to the cookie story.",
    true,
  ],
  [
    "Which sentence connects a reason to a claim most clearly?",
    "Our town should plant trees because trees give shade and clean the air.",
    ["Our town should plant trees.", "Trees are green.", "Shade is nice."],
    "Look for a claim joined to a reason.",
    true,
  ],
];

export const CRAFT_UNITS: Unit[] = [
  bankUnit({
    id: "ny-g3-pictures-and-perspectives",
    title: "Pictures, Features and Points of View",
    emoji: "🖼️",
    blurb: "What pictures and features add, your view and the author's, and school or friendly talk.",
    parentNote:
      "Your child explains what illustrations, diagrams, maps, timelines and captions add to the words, notices when their own view differs from the author's, narrator's or a character's, and tells casual talk from the clearer language used in school writing.",
    standards: ["3R6; 3R7; 3L3", "how illustrations and text features add meaning, comparing a reader's view with an author's or character's, and conversational versus academic English"],
    items: PICTURES_AND_PERSPECTIVES,
  }),
  bankUnit({
    id: "ny-g3-writing-craft",
    title: "Claims, Stories and Responses",
    emoji: "✏️",
    blurb: "Back up a claim, tell a story with detail and order, and respond in creative ways.",
    parentNote:
      "Your child picks claims, reasons and evidence and a fitting conclusion, then the parts of a strong story (a hook, dialogue, descriptive details, showing feelings, order words and an ending) and creative ways to respond to a text.",
    standards: ["3W1; 3W3; 3W4", "claims with reasons and evidence, story techniques, details and event order, and creative responses to texts"],
    items: WRITING_CRAFT,
  }),
];
