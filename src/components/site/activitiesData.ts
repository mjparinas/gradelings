import type { AgeBand } from "@/content/types";

// Content for the printable activity packs (/activities/): a 30-day practice calendar, math games to play with a
// grown-up, and conversation cards. Like the other free pages (worksheets, math facts, help at home) they are the
// same for every province and state, so nothing here names a curriculum, place, money or holiday. Games need only
// dice, a deck of cards or paper. Spelling follows the rest of the public site.

export const BANDS: readonly AgeBand[] = ["little", "middle", "big"];

export const BAND_LABEL: Record<AgeBand, string> = {
  little: "Pre-K to Grade 1",
  middle: "Grades 2 to 4",
  big: "Grades 5 to 9",
};

export const BAND_SLUG: Record<AgeBand, string> = { little: "pre-k-to-grade-1", middle: "grades-2-to-4", big: "grades-5-to-9" };

export function bandFromSlug(slug: string): AgeBand | undefined {
  return BANDS.find((b) => BAND_SLUG[b] === slug);
}

export const activitiesPath = {
  hub: () => "/activities/",
  readingLog: () => "/activities/reading-log/",
  talkCards: () => "/activities/talk-cards/",
  calendar: (b: AgeBand) => `/activities/practice-calendar/${BAND_SLUG[b]}/`,
  games: (b: AgeBand) => `/activities/math-games/${BAND_SLUG[b]}/`,
};

/** Thirty tiny challenges for 30 days, mixing math, reading, science and the world around us. Each takes a few minutes. */
export const CALENDAR_DAYS: Record<AgeBand, readonly string[]> = {
  little: [
    "Count 10 things you can see",
    "Find 3 circles at home",
    "Say your name sounds slowly",
    "Hop 5 times and count",
    "Read one picture book",
    "Name 3 animals that fly",
    "Make a pattern with socks",
    "Find something that starts with B",
    "Count your steps to the door",
    "Draw your family",
    "Sort toys by size",
    "Ask: what is the weather today?",
    "Find 2 things that rhyme",
    "Build a tower of 6 blocks",
    "Name 5 colours you can see",
    "Clap the syllables in your name",
    "Find a square and a triangle",
    "Plant a seed or water a plant",
    "Tell a story about your toy",
    "Count backwards from 5",
    "Find the letter of your name",
    "Share 6 snacks between 2 plates",
    "Look at the clouds and describe them",
    "Say 3 things you are good at",
    "Draw a big and a small circle",
    "Point to things that are hot or cold",
    "Read a book to a toy",
    "Count the windows in a room",
    "Make up a silly rhyme",
    "Tell someone one thing you learned",
  ],
  middle: [
    "Read for 10 minutes",
    "Write 5 sentences about your day",
    "Skip count by 2s to 30",
    "Measure something with a ruler",
    "Practice one times table",
    "Draw a map of your room",
    "Tell a story in 3 parts",
    "Find 3 fractions at home",
    "Learn a new word and use it",
    "Add up 3 numbers in your head",
    "Do a floating or sinking test",
    "Write a note to someone you like",
    "Tell the time to the minute",
    "Read a page aloud with feeling",
    "Make 20 using 3 numbers",
    "Ask a grown-up how something works",
    "Sort things into 3 groups",
    "Write down 5 questions you have",
    "Explain a game to someone",
    "Estimate then count a handful of items",
    "Draw and name a shape with 6 sides",
    "Look up one fact about space",
    "Practice spelling 5 tricky words",
    "Make up a math story problem",
    "Talk about who helps your community",
    "Double a recipe amount",
    "Read two pages of a new book",
    "Notice 3 patterns outside",
    "Teach someone a skill",
    "Write what you are proud of this month",
  ],
  big: [
    "Read for 20 minutes",
    "Summarize a chapter in 3 sentences",
    "Estimate a total before adding",
    "Explain a math idea to someone",
    "Write a paragraph with a clear topic sentence",
    "Find a percent in real life",
    "Plan and run a tiny experiment",
    "Compare two sources on one topic",
    "Solve one equation and check it",
    "Learn 5 new words from your reading",
    "Draw a graph of something you track",
    "Read a news article and note the main idea",
    "Write an opinion with 2 reasons",
    "Convert between two units",
    "Make a timeline of your week",
    "Rewrite a long sentence more clearly",
    "Find an angle in 3 places",
    "Explain a science idea out loud",
    "Draw a diagram of a system you use",
    "Make a plan for something you want to learn",
    "Spot a claim and ask for evidence",
    "Work out a unit rate",
    "Read a poem and say what it means",
    "Edit a paragraph for a friend",
    "Find a pattern and write a rule for it",
    "Debate a friendly topic with someone",
    "Estimate the area of a room",
    "Write down what you learned this week",
    "Ask three people a question and graph the answers",
    "Pick something to be better at and plan the next step",
  ],
};

export interface PlayGame {
  name: string;
  skill: string;
  need: string;
  how: string[];
}

/** Games for a grown-up and a child that practice math with only dice, cards or paper. */
export const MATH_GAMES: Record<AgeBand, readonly PlayGame[]> = {
  little: [
    { name: "Roll and count", skill: "Counting to 6 and 12", need: "One die and some small things like buttons or crackers", how: ["Take turns rolling the die.", "Count out that many things into your pile.", "After five turns, line up both piles. Who has more?"] },
    { name: "Hide the treasure", skill: "Numbers that make 5 and 10", need: "10 small things and a cup", how: ["Count 5 things and show them.", "Close your eyes while a grown-up hides some under the cup.", "How many are hidden? Count what is left to find out."] },
    { name: "Shape hunt", skill: "Naming shapes", need: "Paper and a pencil", how: ["Draw a circle, square and triangle.", "Go on a hunt to find something shaped like each one.", "Tick each shape when you find it."] },
    { name: "Bigger or smaller", skill: "Comparing numbers", need: "A deck of cards with the ace to 10", how: ["Each person turns over a card.", "The bigger number wins both cards.", "When the cards run out, count your pile."] },
  ],
  middle: [
    { name: "Race to 100", skill: "Adding and place value", need: "Two dice and paper", how: ["Roll both dice and add them.", "Write the total and keep a running score.", "The first to reach exactly 100 wins. Going over means you lose a turn."] },
    { name: "War with a twist", skill: "Adding and comparing", need: "A deck of cards, aces to 10", how: ["Each player turns over two cards and adds them.", "The bigger total wins the four cards.", "Play until the deck is gone. Who has more cards?"] },
    { name: "Times table roll", skill: "Multiplication facts", need: "Two dice", how: ["Roll both dice and multiply the numbers.", "Say the answer out loud. A grown-up checks it.", "One point for each right answer. First to 10 wins."] },
    { name: "Clock hunt", skill: "Telling time", need: "Paper and a pencil", how: ["A grown-up says a time like 4:15.", "Draw the hands on a clock.", "Swap turns. Try times to the nearest five minutes."] },
  ],
  big: [
    { name: "Closest to 100", skill: "Estimating and multiplying", need: "A deck of cards, aces to 10", how: ["Each player draws two cards and makes a 2-digit number.", "Draw a third card to multiply by.", "Whoever gets closest to 100 scores a point."] },
    { name: "Fraction face-off", skill: "Comparing fractions", need: "A deck of cards, aces to 10", how: ["Each player turns over two cards to make a fraction (smaller on top).", "Whose fraction is bigger?", "Check by finding a common bottom number."] },
    { name: "Integer duel", skill: "Adding positive and negative numbers", need: "A deck of cards: black is positive, red is negative", how: ["Each player draws three cards and adds them.", "The highest total wins the round.", "Play ten rounds. Say why each total makes sense."] },
    { name: "Make the target", skill: "Order of operations", need: "Four dice and paper", how: ["Roll four dice and pick a target between 1 and 24.", "Use each die once with any of + − × ÷.", "Score a point for each way you find."] },
  ],
};

export interface TalkCard {
  subject: "math" | "reading" | "science" | "world";
  q: string;
}

export const TALK_SUBJECT_LABEL: Record<TalkCard["subject"], string> = {
  math: "Math",
  reading: "Reading and writing",
  science: "Science",
  world: "The world around us",
};

/** Open questions for a few minutes of conversation at dinner or in the car. No right answer is needed. */
export const TALK_CARDS: readonly TalkCard[] = [
  { subject: "math", q: "What is the hardest math problem you solved this week? How did you do it?" },
  { subject: "math", q: "Where did you see a number or a shape today?" },
  { subject: "math", q: "If you had to explain adding to a younger child, what would you say?" },
  { subject: "math", q: "What is a quick way to check if an answer makes sense?" },
  { subject: "math", q: "Is there something you can count or measure in this room?" },
  { subject: "math", q: "What is a pattern you noticed lately?" },
  { subject: "math", q: "Which is bigger, half of something or a quarter of it? How do you know?" },
  { subject: "math", q: "What do you wish you understood better in math?" },
  { subject: "reading", q: "What was the best part of the book you are reading?" },
  { subject: "reading", q: "Who is your favourite character, and what would you ask them?" },
  { subject: "reading", q: "How would you change the ending of your story?" },
  { subject: "reading", q: "What new word did you learn this week?" },
  { subject: "reading", q: "If you could write a book, what would it be about?" },
  { subject: "reading", q: "What did the author do to make you want to keep reading?" },
  { subject: "reading", q: "Tell me one thing you read that surprised you." },
  { subject: "reading", q: "What would you tell a friend about the last thing you read?" },
  { subject: "science", q: "What is something you wonder about nature?" },
  { subject: "science", q: "How could we test whether heavy things fall faster?" },
  { subject: "science", q: "What do plants need to grow?" },
  { subject: "science", q: "Why do you think the sky changes colour during the day?" },
  { subject: "science", q: "What is your favourite animal and what makes it special?" },
  { subject: "science", q: "What happens to water when it gets very cold? Very hot?" },
  { subject: "science", q: "What invention do you think made life easier for people?" },
  { subject: "science", q: "How do you think a machine you use every day works?" },
  { subject: "world", q: "What is one thing that makes our family special?" },
  { subject: "world", q: "Who helps keep our community safe and healthy?" },
  { subject: "world", q: "What is a rule that you think is fair, and why?" },
  { subject: "world", q: "What would you like to learn about a place far away?" },
  { subject: "world", q: "What is something kind someone did for you this week?" },
  { subject: "world", q: "What would you change to make school or home better?" },
  { subject: "world", q: "What can people learn from the past?" },
  { subject: "world", q: "What is a job you might want one day, and what would you need to learn?" },
];
