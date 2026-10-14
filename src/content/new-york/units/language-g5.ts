import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// New York's own Grade 5 language units (`ny-` ids). No shared unit New York can use practises 5R1 (evidence and
// inference), 5R2 (theme, central idea and summary), 5R3 (comparing characters, settings and events), 5R6 (point of
// view and multiple accounts), 5R9 (judging and connecting texts), 5W3 (narrative technique), 5W4 (a creative response)
// or 5W5 (drawing evidence from texts), so these banks do. Every passage is original.

const READ_CLOSELY: Q[] = [
  [
    "“Priya checked the sky again, then packed her umbrella and a towel.” What can you infer?",
    "Priya thinks it might rain.",
    ["Priya is going to sleep.", "Priya does not like towels.", "The sun is shining brightly."],
    "Use the clues: checking the sky, an umbrella.",
  ],
  [
    "“Marcus left his cleats by the door and set three alarms.” What can you infer about tomorrow?",
    "Marcus has an early game he does not want to miss.",
    ["Marcus is going on vacation.", "Marcus lost his shoes.", "Marcus does not play sports."],
    "What do cleats and alarms suggest together?",
  ],
  [
    "“The once-busy store had dusty shelves and a ‘For Rent’ sign.” Which detail best shows the store has closed?",
    "the ‘For Rent’ sign",
    ["the word ‘store’", "the word ‘busy’", "the shelves"],
    "Pick the detail that is the clearest evidence.",
  ],
  [
    "“Even after the third fall, Tia climbed back on her board and pushed off again.” Which trait does the evidence show?",
    "determination",
    ["laziness", "boredom", "carelessness"],
    "She keeps trying after falling.",
  ],
  [
    "A story ends with two rivals sharing their prize. Which theme fits best?",
    "Working together can matter more than winning.",
    ["Never share anything.", "Prizes are made of gold.", "Rivals are always enemies."],
    "A theme is a lesson the story shows.",
  ],
  [
    "“Coral reefs cover a tiny part of the ocean but are home to about a quarter of all sea creatures.” What is the central idea?",
    "Coral reefs are small but support a huge amount of life.",
    ["The ocean is very deep.", "Coral is a kind of rock.", "Sea creatures are colorful."],
    "Which idea do the details support?",
  ],
  [
    "Which is the best summary of a story where a shy boy joins the choir, practices hard and sings a solo at the concert?",
    "A shy boy builds his courage through practice and sings a solo.",
    ["A boy likes music.", "There is a concert in the story.", "The choir wears red robes."],
    "A summary covers the beginning, key events and end.",
  ],
  [
    "Which sentence does NOT belong in a summary?",
    "I think the story was really exciting.",
    ["The team lost its first three games.", "They practiced every day after school.", "They won the final game."],
    "A summary leaves out personal opinions.",
  ],
  [
    "Ana is outgoing and loves crowds. Her twin Bea is quiet and likes reading alone. How are the characters different?",
    "Ana is social; Bea prefers quiet time.",
    ["They are exactly the same.", "Bea loves crowds more than Ana.", "Ana and Bea are not related."],
    "Compare the traits the text gives each twin.",
  ],
  [
    "In the first half of a story, the setting is a busy city. In the second half, it is a quiet farm. How does the change affect the main character?",
    "She feels calmer and has time to think.",
    ["She never changes at all.", "She moves to the moon.", "She forgets who she is."],
    "Settings can shape how characters feel and act.",
  ],
  [
    "Both a mayor and a scientist push for a new bridge, but for different reasons. How are their ideas related?",
    "They share a goal but have different reasons for it.",
    ["They disagree about everything.", "They have the same reasons.", "Neither wants a bridge."],
    "Look at the goal and at the reasons.",
  ],
  [
    "A story is told by a dog who thinks the mail carrier is an enemy. How does this narrator affect the story?",
    "Events seem more dangerous and funny than they really are.",
    ["The facts are always exactly right.", "The story has no point of view.", "The mail carrier tells the story."],
    "A narrator's view shapes how events are described.",
  ],
  [
    "A first-person narrator says, “The test was easy, and I didn't even need to study.” Later she fails. What does this suggest?",
    "The narrator's view of herself was not accurate.",
    ["The narrator is always right.", "The test was impossible.", "There is no narrator."],
    "Compare what she says with what happens.",
  ],
  [
    "One article says a new park is “a beautiful gift.” Another says it “cost too much and took away parking.” What differs?",
    "The point of view each article represents",
    ["the topic of each article", "whether there is a park", "the town the park is in"],
    "Both are about the park, but they see it differently.",
  ],
  [
    "Two accounts of the same storm: a news report gives wind speeds; a diary describes hiding in a closet. What is an important difference?",
    "One gives facts; the other shows personal feelings.",
    ["They are about different storms.", "Both are made up.", "Neither describes the storm."],
    "Compare what each account focuses on.",
  ],
  [
    "Why is it useful to read more than one account of an event?",
    "Each account may show different details and views.",
    ["Accounts are always the same.", "The first account is always wrong.", "It makes reading faster."],
    "Multiple accounts give a fuller picture.",
  ],
  [
    "“Grandpa's hands, rough as tree bark, gently held the baby bird.” What can you infer about Grandpa?",
    "He has worked hard but is gentle and caring.",
    ["He is unkind to animals.", "He has never worked.", "He is afraid of birds."],
    "Use both details: rough hands and a gentle touch.",
    true,
  ],
  [
    "In a story, Leo keeps lying to avoid trouble, and each lie makes things worse. Which theme is supported by these key details?",
    "Honesty is easier than covering up mistakes.",
    ["Lying always works.", "Trouble is fun.", "Never talk to anyone."],
    "Think about what happens each time he lies.",
    true,
  ],
  [
    "Which detail best supports the inference that the team was nervous before the game?",
    "“No one spoke on the bus, and Jamal kept tapping his foot.”",
    ["“The bus was yellow.”", "“The game was on Saturday.”", "“The team wore blue.”"],
    "Look for behavior that shows the feeling.",
    true,
  ],
  [
    "Two characters face the same storm: one panics, the other calmly makes a plan. What does the comparison show?",
    "how differently people can respond to the same challenge",
    ["that storms are not real", "that both characters are the same", "that the setting is a desert"],
    "Compare how each one responds.",
    true,
  ],
  [
    "A story's narrator is a younger sister who thinks her big brother is perfect. How might her point of view shape the story?",
    "She may leave out or excuse his mistakes.",
    ["She will list all his mistakes.", "She will not mention him.", "She will tell only facts about the weather."],
    "Consider what she believes about him.",
    true,
  ],
  [
    "A text explains how a drought led farmers to dig new wells, which lowered the water table. What relationship does it show?",
    "a chain of causes and effects",
    ["two unrelated facts", "a list of opinions", "a made-up story"],
    "Each event leads to the next.",
    true,
  ],
  [
    "Which is the best summary of an article about how honeybees communicate with a “waggle dance”?",
    "Honeybees use a special dance to tell others where to find food.",
    ["Bees are yellow and black.", "I think bees are amazing dancers.", "Some bees live in hives."],
    "Keep the main idea and leave out opinions.",
    true,
  ],
  [
    "A sailor's journal says the voyage was “a triumph.” A crew member's letter calls it “weeks of hunger and fear.” Why might they differ?",
    "They had different roles and experiences on the voyage.",
    ["One of them was not on the ship.", "They describe different voyages.", "Journals are always wrong."],
    "Point of view depends on a person's place in events.",
    true,
  ],
];

const WRITING_CRAFT: Q[] = [
  [
    "Which opening best establishes a narrator and situation?",
    "I had exactly ten minutes to find my lost homework before the bus arrived.",
    ["This story is about homework.", "Homework is given by teachers.", "The end."],
    "A strong opening introduces the narrator and a problem.",
  ],
  [
    "Which sentence uses dialogue to show a character's feeling?",
    "“I can't believe we won!” shouted Rosa, jumping up and down.",
    ["Rosa's team won the game.", "The game ended at noon.", "Rosa played soccer."],
    "Dialogue lets a character show feelings in their own words.",
  ],
  [
    "Which sentence uses pacing to build suspense?",
    "The door creaked. Silence. Then, slowly, a shadow slid across the floor.",
    ["We went to the store and bought milk.", "The door was brown and wooden.", "It was a normal day."],
    "Short sentences and pauses can slow the action and build tension.",
  ],
  [
    "Which transition best signals a shift in time?",
    "Three hours later,",
    ["Because,", "For example,", "In contrast,"],
    "Time transitions show when events happen.",
  ],
  [
    "Which sentence uses a precise, sensory detail?",
    "The campfire hissed and popped, and smoke stung my eyes.",
    ["The campfire was there.", "We had a fire.", "It was nice."],
    "Precise details appeal to the senses.",
  ],
  [
    "Which is the best conclusion for a story about a girl who overcomes her fear of the dark?",
    "That night, Lily turned off her lamp, smiled at the stars outside her window and fell asleep.",
    ["Lily was afraid of the dark.", "Darkness happens at night.", "One night, Lily woke up."],
    "A conclusion shows how the character has changed.",
  ],
  [
    "Which sentence shows a character's reaction instead of just naming it?",
    "Owen's face went pale, and he dropped the letter.",
    ["Owen was shocked.", "Owen read a letter.", "The letter was white."],
    "Show feelings through actions and details.",
  ],
  [
    "After reading a novel about a girl who travels back in time, which is a creative response?",
    "a diary entry from the girl's point of view on her first day in the past",
    ["a list of the novel's page numbers", "the publisher's address", "the book's price"],
    "Creative responses build on the text's ideas.",
  ],
  [
    "Your class reads a poem about the ocean. Which response best explores its theme of change?",
    "a poem comparing the tides to growing up",
    ["a list of fish names", "a recipe for soup", "a map of a city"],
    "Connect your response to the poem's big idea.",
  ],
  [
    "A question asks, “What does the setting show about the character?” Which answer uses text evidence?",
    "The messy room “piled with half-finished projects” shows that Sam starts many things but gets distracted.",
    ["Sam is my favorite character.", "I have a messy room too.", "The setting is in the book."],
    "Quote or describe a detail, then explain it.",
  ],
  [
    "Which sentence best introduces a quote as evidence?",
    "The author explains that “bats use echoes to find food in the dark.”",
    ["Here is a quote.", "Bats.", "I read something about bats."],
    "Name the source, then give the quote.",
  ],
  [
    "Which evidence best supports the claim that the main character is responsible?",
    "She feeds her neighbor's cat every day while the neighbor is away.",
    ["She has a red backpack.", "She likes pizza.", "She lives near a park."],
    "Pick the detail that proves the claim.",
  ],
  [
    "Which criterion is most useful for judging the quality of an informational text?",
    "Are the facts accurate and from reliable sources?",
    ["Does it have a bright cover?", "Is it the longest book?", "Is the author's name short?"],
    "Judge texts by what makes them good of their kind.",
  ],
  [
    "You are sorting texts into fiction and nonfiction. Where does a biography of a famous inventor go?",
    "nonfiction",
    ["fiction", "poetry", "drama"],
    "Biographies tell true life stories.",
  ],
  [
    "Two novels both show kids saving a park. One feels believable; one has characters who never change. Which judgment is fair?",
    "The first is stronger because its characters grow and feel real.",
    ["Both are equally strong.", "The second is stronger because it is shorter.", "Neither can be judged."],
    "Use clear criteria like believable, changing characters.",
  ],
  [
    "A story from the 1930s and a story from today both show families facing hard times. Which connection can you make?",
    "Families in different eras face struggles and support each other.",
    ["Nothing has ever changed.", "The stories have the same characters.", "Only one is about a family."],
    "Connect ideas across eras.",
  ],
  [
    "Which revision adds a better detail? “The dog was big.”",
    "The dog was so tall its head reached the kitchen counter.",
    ["The dog was very big.", "The dog was really, really big.", "The dog was a dog."],
    "Specific details help readers picture it.",
    true,
  ],
  [
    "A story is told in order, but the writer wants to show a memory from years ago. Which technique fits?",
    "a flashback",
    ["a glossary", "a bibliography", "a table of contents"],
    "A flashback jumps to an earlier time.",
    true,
  ],
  [
    "Which sentence best explains how evidence supports an analysis of a character?",
    "When Mia gives away her last ticket, it shows she cares more about her friend than about the show.",
    ["Mia has a ticket.", "The show was at seven.", "I would keep the ticket."],
    "Connect the action to what it reveals.",
    true,
  ],
  [
    "You write a play based on a short story but change the ending. What should you be ready to explain?",
    "why you changed it and how it fits the characters",
    ["nothing at all", "the price of the book", "how many words are in the story"],
    "A response can change the original if you can explain your choice.",
    true,
  ],
  [
    "Which set of criteria works best for judging a poem?",
    "word choice, imagery and how the poem makes you feel",
    ["number of pages and cover color", "the author's age and height", "where the book was printed"],
    "Choose criteria that fit poems.",
    true,
  ],
  [
    "A research question asks how wolves affect a forest. Which source detail is most relevant?",
    "When wolves returned to the park, deer moved more, and young trees grew back.",
    ["Wolves howl at night.", "Wolf pups are born in spring.", "Some wolves are gray."],
    "Pick evidence that answers the research question.",
    true,
  ],
  [
    "Which ending best resolves a story about two friends who argue over a science project?",
    "They combined their ideas, and the project won second place.",
    ["They started arguing.", "The project was due Friday.", "One friend had a dog."],
    "A resolution solves the conflict.",
    true,
  ],
  [
    "A folktale from West Africa and one from Europe both feature a clever trickster. What can a reader conclude?",
    "Different cultures share some storytelling patterns.",
    ["They were written by the same person.", "Trickster tales come from only one place.", "Folktales are true stories."],
    "Look for patterns across cultures.",
    true,
  ],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "ny-g5-read-closely",
    title: "Read Closely",
    emoji: "🔍",
    blurb: "Inferences, themes, summaries, comparing characters and points of view.",
    parentNote:
      "Your child makes inferences from evidence, finds themes and central ideas, picks good summaries, compares characters, settings and events, and explains how a narrator's point of view or different accounts of the same event shape what we learn.",
    standards: ["5R1; 5R2; 5R3; 5R6", "evidence and inferences, theme and summary, comparing characters and events, and point of view across accounts"],
    items: READ_CLOSELY,
  }),
  bankUnit({
    id: "ny-g5-writing-craft",
    title: "Stories, Responses and Evidence",
    emoji: "✏️",
    blurb: "Narrative techniques, creative responses, using text evidence and judging texts.",
    parentNote:
      "Your child chooses narrative techniques (openings, dialogue, pacing, sensory details, transitions, endings), creative responses to texts, evidence that supports an analysis, and criteria for judging and connecting texts.",
    standards: ["5W3; 5W4; 5W5; 5R9", "narrative technique, creative responses, drawing evidence from texts, and judging and connecting texts"],
    items: WRITING_CRAFT,
  }),
];
