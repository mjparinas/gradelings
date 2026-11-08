import type { Q } from "../own";

// Extra Grade 2 language arts questions, added to the banks in g2-more-language.ts so a child sees fewer repeats.

export const LETTERS_DEEP: Q[] = [
  ["Which is the capital letter that goes with k?", "K", ["X", "H"], "K is the capital form of k."],
  ["Which is the capital letter that goes with t?", "T", ["I", "L"], "T is the capital form of t."],
  ["Which is the lowercase letter that goes with M?", "m", ["n", "w"], "m is the lowercase form of M."],
  ["Which is the lowercase letter that goes with S?", "s", ["z", "c"], "s is the lowercase form of S."],
  ["Which letter has a tail that drops below the line?", "y", ["x", "v"], "The letters g, j, p, q and y drop below the line."],
  ["Which letter is tall and reaches the top line?", "h", ["n", "u"], "The letters b, d, h, k and l are tall."],
  ["Which sentence starts the right way?", "My cat is soft.", ["my cat is soft.", "mY cat is soft."], "Start with one capital letter."],
  ["Which sentence needs a capital letter changed?", "the bus is late.", ["The bus is late.", "Our bus is late."], "The first word must start with a capital."],
  ["Which name is written correctly?", "Priya", ["priya", "pRiya"], "Names begin with a capital letter."],
  ["Which month name is written correctly?", "March", ["march", "mARch"], "Months begin with a capital letter."],
  ["Which sentence has good spacing?", "We play outside.", ["Weplay outside.", "We play outs ide."], "Leave a finger space between words."],
  ["Which word should be typed with a capital letter at the start of a sentence?", "Today", ["today", "tODAY"], "Press Shift for the first letter.", true],
];

export const SIGHT_DEEP: Q[] = [
  ["Read the word: “friend”. Which word is it?", "friend", ["fiend", "fried"], "Look at every letter."],
  ["Read the word: “their”. Which word is it?", "their", ["there", "three"], "Their shows that it belongs to them."],
  ["Which word fits? “I have ___ books.”", "two", ["too", "to"], "Two is the number 2."],
  ["Which word fits? “She went ___ the store.”", "to", ["too", "two"], "To tells where she went."],
  ["Which word fits? “I want a cookie ___.”", "too", ["to", "two"], "Too means also."],
  ["Which word is a common word you see in many stories?", "was", ["giraffe", "umbrella"], "Was is in almost every story."],
  ["Which word means the same as “little”?", "small", ["loud", "warm"], "Little and small mean almost the same."],
  ["Which word is spelled correctly?", "people", ["peple", "peeple"], "Peo-ple."],
  ["Which mark shows a sentence is asking something?", "a question mark", ["a comma", "a period"], "Your voice goes up at the end."],
  ["How should you read “Stop!”?", "loudly and strongly", ["in a whisper", "slowly and sleepily"], "The exclamation mark shows strong feeling."],
  ["When reading aloud, how do you read “Where is my hat?”", "your voice goes up at the end", ["you whisper the whole thing", "you skip the last word"], "Questions rise at the end."],
  ["Which sentence has a pause after “Next”?", "Next, we clean up.", ["Next we, clean up.", "Next we clean, up."], "A comma tells you to pause.", true],
];

export const RESPOND_DEEP: Q[] = [
  ["A story is about a girl learning to ride a bike. You learned to ride last summer. This is a…", "text-to-self connection", ["spelling rule", "kind of song"], "You connected it to your life."],
  ["Which sentence gives an opinion with a reason?", "I liked the story because the dog was funny.", ["I liked.", "The story is a story."], "Because gives a reason."],
  ["Which sentence tells how a character feels?", "Sam felt proud of his drawing.", ["Sam is a boy.", "The drawing is on the wall."], "Feeling words tell how someone feels."],
  ["Two friends read the same book. One likes it. One does not. This means…", "people can feel different ways about the same book", ["one friend is wrong", "the book is broken"], "Opinions can be different."],
  ["Which word tells how someone might feel if a toy breaks?", "sad", ["sleepy", "round"], "A broken toy can make you sad."],
  ["After reading, which question can you ask yourself?", "What was my favourite part?", ["What is the page number?", "What colour is the cover?"], "Think about the story."],
  ["You read two books about frogs. This connects…", "one book to another book", ["a book to a shoe", "nothing at all"], "That is a text-to-text connection."],
  ["Which is a good reason for liking a story?", "It made me laugh.", ["It is a story.", "I do not know."], "Give a reason."],
  ["A character shares her lunch with a new student. What does this show?", "She is kind.", ["She is hungry.", "She is tall."], "Actions show what a character is like.", true],
  ["You read about a storm and remember a storm you saw. You are…", "making a connection", ["skipping the story", "changing the ending"], "Connections help understanding.", true],
];

export const FINDING_DEEP: Q[] = [
  ["Which question could you ask to learn about penguins?", "What do penguins eat?", ["Penguins.", "Cold."], "A question uses a question word."],
  ["Which word starts a question about a place?", "Where", ["Because", "Then"], "Where asks about places."],
  ["Which word starts a question about a person?", "Who", ["When", "Why"], "Who asks about people."],
  ["Which word starts a question about time?", "When", ["Where", "Who"], "When asks about time."],
  ["You want to learn how bees make honey. Which book is best?", "A nonfiction book about bees", ["A story about a talking cat", "A cookbook about soup"], "Pick a book that matches your question."],
  ["A heading in a book tells you…", "what that part is about", ["who the author is", "how many pages there are"], "Headings help you find information."],
  ["A picture in a book about whales helps you…", "see what whales look like", ["learn to spell", "hear a song"], "Pictures give information."],
  ["Which is a fact?", "Bees have six legs.", ["Bees are scary.", "Bees are the best."], "A fact can be checked."],
  ["Before reading about turtles, you can…", "think about what you already know", ["close the book", "skip every page"], "Prior knowledge helps."],
  ["Which topic word belongs with a book about the ocean?", "waves", ["engine", "mittens"], "Topic words match the topic.", true],
  ["Who could you ask to learn about gardens?", "A gardener", ["A shoe", "A rock"], "People who know a topic can help.", true],
];

export const PLAN_DEEP: Q[] = [
  ["What are the three parts of a story?", "beginning, middle and end", ["top, side and bottom", "red, blue and green"], "Every story has three parts."],
  ["Which words show the order of events?", "first, next, last", ["big, bigger, biggest", "up, down, around"], "Order words help the reader."],
  ["A writer wants to tell how to make a sandwich. Which comes first?", "Get the bread", ["Eat the sandwich", "Wash the plate"], "Steps go in order."],
  ["Who might read a note you write to your teacher?", "your teacher", ["a bird", "a puddle"], "Think about who will read it."],
  ["Which is a good topic for a story?", "A day at the beach", ["The", "Because"], "A topic is what the writing is about."],
  ["Which sentence tells what a paragraph is about?", "My family likes to bake.", ["Bake.", "Family."], "A topic sentence says the main idea."],
  ["After you write, what can you do to make it better?", "Read it again and fix mistakes", ["Throw it away", "Never look at it"], "Revising makes writing better."],
  ["Which sentence adds a describing word?", "The fluffy cat slept.", ["The cat slept.", "Cat slept."], "A describing word tells more."],
  ["Two short sentences can be joined with…", "and", ["or not", "never"], "Join like this: I like soccer and I like hockey.", true],
  ["Which idea does NOT belong in a story about a rainy day?", "A hot sunny desert", ["Wet boots", "Puddles"], "Keep to your topic.", true],
];

export const MEDIA_DEEP: Q[] = [
  ["Which of these is media?", "a video", ["a spoon", "a leaf"], "Videos share messages."],
  ["Which of these is media?", "a book", ["a sock", "a stone"], "Books share messages."],
  ["A poster about washing hands wants you to…", "wash your hands", ["buy a toy", "go to sleep"], "Posters send a message."],
  ["Who makes a message in a video?", "people", ["trees", "clouds"], "People create media."],
  ["Who might a cartoon be made for?", "children", ["only machines", "nobody"], "Creators think of an audience."],
  ["A character in a story always tells the truth. You can…", "trust what they say", ["never believe them", "ignore them"], "Characters can be trustworthy."],
  ["Which person would you trust to tell you about a doctor’s visit?", "a doctor", ["a stranger online", "a talking toy"], "Trust people who know the topic."],
  ["A story only shows boys playing sports. What might a thoughtful reader say?", "Girls can play sports too", ["Only boys play", "Sports are boring"], "Notice who is shown and who is left out."],
  ["A picture book shows children from many families. This is good because…", "everyone can see themselves", ["it is longer", "it is quieter"], "Many kinds of people should be shown.", true],
  ["An ad says a toy is “the best in the world”. What should you do?", "Ask a grown-up what they think", ["Believe it right away", "Buy it"], "Ads want you to like something.", true],
];

export const LISTEN_DEEP: Q[] = [
  ["Which shows you are listening?", "eyes on the speaker", ["looking at the floor", "talking to a friend"], "Eyes show you are listening."],
  ["What can you do if you did not understand?", "Politely ask a question", ["Say nothing", "Walk away"], "It is okay to ask."],
  ["Which question asks for more information?", "Can you tell me more?", ["Is it lunch?", "Who sneezed?"], "Asking helps you learn."],
  ["How should you talk to a younger child?", "With a kind, gentle voice", ["Very loudly", "In a whisper only"], "Change your voice for your listener."],
  ["How should you talk when someone is sleeping?", "Quietly", ["Loudly", "By shouting"], "Match your voice to the place."],
  ["Which is a polite way to join a talk?", "Wait for a pause, then say “Can I add something?”", ["Shout over them", "Grab their paper"], "Wait for your turn."],
  ["Your friend shares an idea. A kind way to add yours is…", "I like that idea, and I also think…", ["That is silly.", "No."], "Add to ideas kindly."],
  ["Which body language shows you are listening to a story?", "A still body and calm face", ["Spinning around", "Turning your back"], "Show you are interested."],
  ["Which words are polite when you ask for help?", "Please can you help me?", ["Help now.", "Give it."], "Please is polite.", true],
  ["After a friend speaks, which shows you listened?", "Saying one thing you heard", ["Starting a new topic", "Looking away"], "Repeat a part you heard.", true],
];
