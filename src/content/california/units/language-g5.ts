import type { Unit } from "../../types";
import { passage, readingUnit, type R } from "./language-kit";

// California's own Grade 5 English language arts units: reading stories closely (CA CCSS RL.5.1 to RL.5.9), reading
// information texts closely (RI.5.1 to RI.5.9, SL.5.2), and combining sentences, varieties of English and signal words
// (L.5.3, L.5.6). Every story, poem and passage is original.

const TRYOUTS = passage(
  "Tryouts",
  "Jada had practiced her free throws every evening for a month. On the day of tryouts, her first three shots clanged off the rim.",
  "“Shake it off,” she whispered, bouncing the ball twice the way her coach had taught her. Her next seven shots swished through the net.",
  "When the list went up, her name was on it. Jada grinned. “Practice wins,” she said.",
);
const NEW_TOWN = passage(
  "The New Town",
  "From the moment the moving truck pulled away, Omar was sure he would hate Pine Hollow. The streets were too quiet, and nobody waved.",
  "But on Saturday, a girl next door knocked with a plate of lemon bars. “Want to see the creek?” she asked. By sunset, Omar knew every bend of it.",
);
const TWO_SISTERS = passage(
  "Two Sisters",
  "Nora loved loud places: crowded markets, stadiums, birthday parties with a hundred guests. Ivy liked the library, where the only sound was pages turning.",
  "When their grandmother got sick, both sisters wanted to help. Nora organized a big fundraiser concert. Ivy read to Grandma every afternoon.",
);
const STORM_NARRATOR = passage(
  "The Storm (told by Max)",
  "That storm was the most terrifying night of my life. The wind screamed like a train, and I was sure our roof would fly off.",
  "My little brother slept through the whole thing. In the morning, he said it was “a little windy.”",
);
const GRAPHIC = passage(
  "Graphic Novel Page",
  "Panel 1: A wide picture shows a tiny boat on a huge, dark sea. No words.",
  "Panel 2: A close-up of Lin's face, eyes wide. Her speech bubble says: “Is that… land?”",
  "Panel 3: Bright yellow light spreads across the whole panel as the sun rises over an island.",
);
const POEM_SEA = passage(
  "Tide",
  "The ocean is a restless dog\nthat paws the sand all day,\nthen curls up when the moon comes out\nand dreams the night away.",
);
const QUEST_A = passage(
  "Story A: The Mountain Climb",
  "Theo wanted to reach the top of the mountain alone to prove he was brave. Halfway up, he twisted his ankle, and his friends carried him the rest of the way.",
  "At the top, Theo realized that being brave also means letting others help.",
);
const QUEST_B = passage(
  "Story B: The Science Fair",
  "Priya refused help with her robot because she wanted all the credit. The night before the fair, it stopped working.",
  "Her brother helped her find a loose wire. Priya learned that asking for help is a strength, not a weakness.",
);

const STORY_READER: R[] = [
  [TRYOUTS, "Which quotation best shows that Jada did not give up?", "“Shake it off,” she whispered.", ["Her first three shots clanged off the rim.", "When the list went up, her name was on it.", "Jada had practiced every evening."], "Which words show her deciding to keep going after missing?"],
  [TRYOUTS, "What is the theme of “Tryouts”?", "Hard work and staying calm pay off.", ["Basketball is the best sport.", "Coaches are always right.", "Tryouts are unfair."], "Think about how Jada responds to her bad start."],
  [TRYOUTS, "Which is the best summary of “Tryouts”?", "Jada practices hard, misses her first shots at tryouts, stays calm and makes the team.", ["Jada misses three shots.", "Jada's coach teaches her a trick.", "Jada likes basketball."], "A summary tells the beginning, middle and end in a few words."],
  [TRYOUTS, "What can you infer from “her next seven shots swished through the net”?", "She calmed down and shot well.", ["She was tired.", "The hoop was broken.", "She stopped trying."], "Seven makes in a row means she recovered."],
  [NEW_TOWN, "Which quotation shows how Omar felt at the start?", "Omar was sure he would hate Pine Hollow.", ["“Want to see the creek?” she asked.", "By sunset, Omar knew every bend of it.", "A girl next door knocked."], "Look at the first paragraph."],
  [NEW_TOWN, "How does Omar change?", "He goes from expecting to hate the town to exploring it happily.", ["He moves away again.", "He never leaves his house.", "He stays unhappy."], "Compare the first paragraph to the last sentence."],
  [NEW_TOWN, "What can you infer from “By sunset, Omar knew every bend of it”?", "He spent the whole day exploring the creek.", ["He drew a map at school.", "He fell into the creek.", "He was lost all day."], "Knowing every bend means he explored for a long time."],
  [TWO_SISTERS, "How are Nora and Ivy different?", "Nora likes loud, busy places; Ivy likes quiet ones.", ["Nora likes the library; Ivy likes stadiums.", "Both like crowded markets.", "Both dislike their grandmother."], "Read the first paragraph closely."],
  [TWO_SISTERS, "How are Nora and Ivy alike?", "Both want to help their grandmother.", ["Both like big parties.", "Both organize a concert.", "Both read every afternoon."], "Read the second paragraph."],
  [TWO_SISTERS, "Which detail shows how each sister's personality shapes the way she helps?", "Nora plans a big concert; Ivy reads quietly to Grandma.", ["Grandma got sick.", "The library is quiet.", "Markets are crowded."], "Connect their likes to their actions."],
  [STORM_NARRATOR, "How does Max's point of view affect how the storm is described?", "Because Max was scared, the storm sounds terrifying.", ["Max was asleep, so he describes nothing.", "Max is a weather reporter.", "Max describes it calmly with numbers."], "Compare Max's words to his brother's."],
  [STORM_NARRATOR, "How would the story change if the brother told it?", "The storm would sound like no big deal.", ["It would be scarier.", "It would be about a different storm.", "It would not change at all."], "The brother called it “a little windy.”"],
  [STORM_NARRATOR, "What does “the wind screamed like a train” mean?", "The wind was very loud.", ["A train went by.", "Someone screamed.", "The wind was quiet."], "It compares the wind's sound to a loud train."],
  [POEM_SEA, "What does the poet compare the ocean to?", "a restless dog", ["the moon", "a sandcastle", "a dream"], "Read the first line."],
  [POEM_SEA, "What does “paws the sand all day” describe?", "waves moving back and forth on the beach", ["a dog digging", "people walking", "wind blowing"], "Think about how waves touch the sand."],
  [POEM_SEA, "What does it mean that the ocean “curls up” at night?", "The sea becomes calm.", ["The sea freezes.", "The sea disappears.", "A dog goes to sleep."], "A dog curled up is quiet and still."],
  [GRAPHIC, "Why does Panel 1 show a tiny boat on a huge, dark sea?", "to show how alone and in danger Lin is", ["to show the boat is fast", "to show it is daytime", "to show a party"], "Size and darkness create a feeling."],
  [GRAPHIC, "How does the bright yellow in Panel 3 change the tone?", "It makes the moment feel hopeful.", ["It makes it scarier.", "It makes it sadder.", "It makes it confusing."], "Bright light often signals hope."],
  [GRAPHIC, "Why is Panel 2 a close-up of Lin's face?", "to show her surprise and hope", ["to show the island", "to show the weather", "to show the boat's name"], "Close-ups help readers see feelings."],
  [QUEST_A, "What theme do Story A and Story B share?", "Accepting help is a kind of strength.", ["Mountains are dangerous.", "Robots are hard to build.", "Always work alone."], "What do Theo and Priya both learn?"],
  [QUEST_B, "How is Priya's challenge different from Theo's?", "Her robot breaks; he twists his ankle.", ["Both twist an ankle.", "Both climb a mountain.", "Neither needs help."], "Compare what goes wrong in each story."],
  [QUEST_A, "How do both stories approach the theme?", "A character who wants to do it alone faces a setback and learns from it.", ["Two friends race each other.", "A family moves to a new home.", "A teacher gives a test."], "Look at the pattern of events in both."],
  [QUEST_B, "Which quotation states Story B's lesson directly?", "asking for help is a strength, not a weakness", ["she wanted all the credit", "it stopped working", "Her brother helped her"], "Find the sentence that says what Priya learned."],
  [STORM_NARRATOR, "Which word shows Max's point of view is strong and emotional?", "terrifying", ["storm", "morning", "brother"], "Look for a word that shows feeling."],
  [TRYOUTS, "Why does Jada bounce the ball twice?", "It is a calming habit her coach taught her.", ["The ball was flat.", "She was showing off.", "The rules required it."], "Read the second paragraph.", true],
  [NEW_TOWN, "What turns Omar's day around?", "A neighbor's friendly visit and invitation.", ["The moving truck leaves.", "It starts to rain.", "His school starts."], "Who knocks on the door?", true],
  [TWO_SISTERS, "Which statement compares the sisters accurately using the text?", "Both help Grandma, but in ways that match their personalities.", ["Ivy helps more than Nora.", "Nora does not care about Grandma.", "They help in exactly the same way."], "Use details from both paragraphs.", true],
  [POEM_SEA, "What kind of figurative language is the whole poem built on?", "an extended metaphor", ["a list of facts", "onomatopoeia", "a question"], "The ocean is treated as a dog throughout.", true],
];

const VOLCANO_DAY = passage(
  "Two Accounts of the Eruption",
  "Account 1, from a hiker's journal: “The ground shook under my boots. A gray cloud rose over the peak, and ash fell like snow. We ran for the ranger station.”",
  "Account 2, from a science magazine: “The eruption sent ash 15 miles into the air. Scientists had recorded small earthquakes for weeks, so the area was closed before the blast.”",
);
const BRIDGE_A = passage(
  "The Bridge Builders",
  "In the 1930s, workers built a huge bridge across a windy bay. They hung from cables high above the water.",
  "To protect them, the chief engineer had a safety net strung under the bridge. The net saved many workers' lives.",
);
const BRIDGE_B = passage(
  "Safety Nets",
  "A safety net catches a falling worker before they hit the ground or water. Today, many construction sites use nets, harnesses and hard hats.",
);
const MONARCHS = passage(
  "The Monarch's Journey",
  "Each fall, millions of monarch butterflies fly south to warmer places. Some travel more than 2,000 miles.",
  "Monarchs depend on milkweed. Female monarchs lay their eggs only on milkweed, and the caterpillars eat its leaves.",
  "Because milkweed is disappearing from many fields, people are planting it in gardens. This helps monarchs find food and places to lay eggs.",
);
const WATER = passage(
  "Where Does Our Water Go?",
  "Most of Earth's water is salty ocean water. Only a small amount is fresh water that people can drink.",
  "Much of that fresh water is frozen in glaciers and ice caps. That is why saving water matters: the fresh water we can use is limited.",
);
const INVENTOR_A = passage("Text A: An Inventor's Notebook", "Ruth Wakefield ran an inn in the 1930s. She chopped up a chocolate bar and added it to cookie dough.");
const INVENTOR_B = passage("Text B: A Sweet Success", "The chocolate chip cookie became so popular that a chocolate company printed its recipe on its wrappers.");

const INFO_READER: R[] = [
  [VOLCANO_DAY, "How is Account 1 different from Account 2?", "Account 1 tells how it felt to be there; Account 2 gives facts and causes.", ["Account 1 gives exact measurements.", "Account 2 was written by a hiker.", "They describe different volcanoes."], "Who wrote each one, and what does each focus on?"],
  [VOLCANO_DAY, "Which detail appears only in the firsthand account?", "Ash fell like snow on the hiker.", ["Ash rose 15 miles.", "Scientists recorded small earthquakes.", "The area was closed."], "Account 1 is the hiker's journal."],
  [VOLCANO_DAY, "Which quotation shows why the area was closed before the eruption?", "Scientists had recorded small earthquakes for weeks.", ["The ground shook under my boots.", "We ran for the ranger station.", "A gray cloud rose over the peak."], "Look in Account 2 for a cause."],
  [VOLCANO_DAY, "How are the two accounts alike?", "Both describe the same eruption sending up ash.", ["Both are journals.", "Both give a height in miles.", "Both mention a ranger station."], "Find what both accounts tell."],
  [BRIDGE_A, "What was the relationship between the engineer and the workers?", "The engineer's safety net protected the workers.", ["The workers designed the bridge.", "The engineer worked on the cables.", "The workers ignored the engineer."], "What did the engineer do for the workers?"],
  [BRIDGE_A, "Which quotation explains why the safety net mattered?", "The net saved many workers' lives.", ["They hung from cables high above the water.", "In the 1930s, workers built a huge bridge.", "across a windy bay"], "Find the effect of the net."],
  [BRIDGE_B, "Combine both texts. What idea connects them?", "Safety nets, first used on big projects like the bridge, protect workers today.", ["Bridges are always windy.", "Hard hats were invented in the 1930s.", "Nets are used for fishing only."], "Text A gives history; Text B tells about today."],
  [MONARCHS, "What are two main ideas of this passage?", "Monarchs migrate long distances, and they need milkweed to survive.", ["Butterflies are orange, and gardens are pretty.", "Milkweed is a weed, and weeds are bad.", "Fall is cold, and winter is colder."], "Look at the main point of each paragraph."],
  [MONARCHS, "Which is the best summary?", "Monarchs fly south each fall and depend on milkweed, so people plant it to help them.", ["Monarchs fly 2,000 miles.", "Caterpillars eat leaves.", "Gardens are fun to plant."], "A summary includes the main ideas, not every detail."],
  [MONARCHS, "Why are people planting milkweed?", "Because it is disappearing and monarchs depend on it.", ["Because it is pretty.", "Because it keeps bees away.", "Because it grows fast in winter."], "Read the last paragraph."],
  [MONARCHS, "In this passage, what does “depend on” mean?", "need in order to survive", ["fly away from", "are afraid of", "lay eggs near"], "Monarchs can't live without milkweed."],
  [MONARCHS, "Which quotation supports the idea that monarchs need milkweed?", "Female monarchs lay their eggs only on milkweed.", ["Each fall, millions of monarch butterflies fly south.", "Some travel more than 2,000 miles.", "people are planting it in gardens"], "Find the detail about milkweed."],
  [WATER, "What is the main idea of the passage?", "Fresh water people can use is limited, so saving it matters.", ["Oceans are salty.", "Glaciers are cold.", "Water is blue."], "Look at the last sentence."],
  [WATER, "What does “limited” mean in this passage?", "only a small amount is available", ["easy to find", "very salty", "frozen solid"], "The passage says only a small amount is fresh."],
  [WATER, "How does the author connect glaciers to saving water?", "Much fresh water is frozen, so little is left to use.", ["Glaciers make water salty.", "Glaciers are melting into oceans.", "Glaciers are where people live."], "Follow the steps of the explanation."],
  [INVENTOR_A, "Put both texts together. What happened after Ruth Wakefield's idea?", "The cookie became so popular that its recipe was printed on chocolate wrappers.", ["She closed her inn.", "She stopped baking.", "She invented the chocolate bar."], "Text B tells what happened next."],
  [INVENTOR_B, "Which text tells who invented the chocolate chip cookie?", "Text A", ["Text B", "both texts", "neither text"], "Look for a name."],
  [null, "Which word in a science text means animals moving to a new place at the same time each year?", "migration", ["erosion", "evaporation", "condensation"], "Monarchs and many birds do this."],
  [null, "What does “habitat” mean in a science text?", "the natural home of a plant or animal", ["a type of food", "a weather pattern", "a kind of rock"], "Think about where a living thing lives."],
  [null, "A history text says a treaty was signed. What is a treaty?", "a formal agreement between nations or groups", ["a type of boat", "a battle", "a map"], "Treaties end conflicts or set rules."],
  [null, "Why might two people describe the same event differently?", "They saw it from different places or know different facts.", ["One of them must be lying.", "Events never really happen.", "They used different fonts."], "Point of view shapes an account."],
  [null, "You read a summary of a talk your class heard. Which is the best summary?", "It gives the speaker's main points in a few sentences.", ["It repeats every word.", "It gives only your opinion.", "It lists the speaker's clothes."], "Summaries keep only the main ideas."],
  [null, "Which text would give a firsthand account of a hurricane?", "a diary written by someone in the hurricane", ["an encyclopedia entry", "a textbook chapter", "a weather website written later"], "Firsthand means the writer was there."],
  [BRIDGE_A, "What does “strung” mean in “a safety net strung under the bridge”?", "hung or stretched across", ["cut apart", "painted", "tied in a knot"], "The net was spread under the bridge."],
  [VOLCANO_DAY, "Which account would be more useful for a report on how scientists predict eruptions?", "Account 2", ["Account 1", "neither account", "both equally"], "Which one talks about scientists and earthquakes?", true],
  [MONARCHS, "How does the third paragraph relate to the second?", "It describes a solution to the problem that monarchs depend on disappearing milkweed.", ["It repeats the same facts.", "It tells a story about a girl.", "It describes how far monarchs fly."], "Paragraph 2 tells why milkweed matters; paragraph 3 tells what people do.", true],
  [WATER, "Which quotation best supports “saving water matters”?", "the fresh water we can use is limited", ["Most of Earth's water is salty ocean water.", "frozen in glaciers", "people can drink"], "Find the reason given right after the claim.", true],
  [BRIDGE_B, "Which text explains how a safety net works in general?", "Text B", ["Text A", "neither text", "both texts equally"], "Which one gives a general definition?", true],
];

const SENTENCES_SIGNALS: R[] = [
  [null, "Combine: “The puppy was small. The puppy was brown.”", "The puppy was small and brown.", ["The puppy was small the puppy was brown.", "Small puppy brown.", "The puppy, small, the puppy, brown."], "Join the two describing words with and."],
  [null, "Combine: “Lena ran fast. She missed the bus.”", "Lena ran fast, but she missed the bus.", ["Lena ran fast she missed the bus.", "Lena ran fast, and missed she the bus.", "Lena, missed the bus ran fast."], "Use but to show something unexpected."],
  [null, "Which sentence expands “The bird sang” with more detail?", "The tiny yellow bird sang from the top of the fence.", ["The bird sang.", "Bird sang.", "It sang."], "Expanding adds who, where or how."],
  [null, "Which reduces this wordy sentence? “The reason why I was late is because of the fact that I overslept.”", "I was late because I overslept.", ["The reason I was late is because of the fact.", "I overslept the reason why.", "Late because the fact."], "Cut extra words that repeat the meaning."],
  [null, "Which reduces this wordy sentence? “In my personal opinion, I think pizza is great.”", "I think pizza is great.", ["In my opinion, I personally think pizza.", "Pizza opinion great think.", "In my personal opinion, pizza I think."], "“In my personal opinion” and “I think” say the same thing."],
  [null, "A character in a story says, “Y'all come back now.” What does this show?", "a regional way of speaking (dialect)", ["a spelling mistake", "formal English", "a math term"], "Authors use dialect to show where characters are from."],
  [null, "Why might an author write a character's speech the way the character really talks?", "to make the character seem real and show where they are from", ["to confuse readers", "because the author made a mistake", "to make the story shorter"], "Dialect brings characters to life."],
  [null, "Which sentence is written in formal standard English?", "I am going to the library after school.", ["I'm gonna hit up the library after school.", "Library after school, yo.", "Me and him are going to the library."], "Formal English avoids slang."],
  [null, "Which word signals contrast?", "however", ["moreover", "similarly", "in addition"], "Contrast words show a difference."],
  [null, "Which word signals adding another idea?", "moreover", ["however", "although", "nevertheless"], "Moreover means also, in addition."],
  [null, "Which word signals that two things are alike?", "similarly", ["however", "although", "instead"], "Similarly means in a like way."],
  [null, "Which word best fits? “The test was hard; ___, most students passed.”", "nevertheless", ["similarly", "moreover", "for example"], "The second part goes against what you would expect."],
  [null, "Which word best fits? “Bikes are cheap to ride. ___, they cause no pollution.”", "In addition", ["However", "Although", "Instead"], "The second idea adds another good point."],
  [null, "Which word best fits? “___ it was raining, the game went on.”", "Although", ["Moreover", "Similarly", "Therefore"], "Although shows a contrast inside one sentence."],
  [null, "Which word best fits? “Frogs live in wet places. ___, salamanders need moist homes.”", "Similarly", ["However", "Although", "Instead"], "Both animals need wet places."],
  [null, "Which word signals a result?", "therefore", ["however", "similarly", "although"], "Therefore means as a result."],
  [null, "Which word best fits? “We didn't practice. ___, we lost the game.”", "As a result", ["Similarly", "However", "Moreover"], "The loss happened because of not practicing."],
  [null, "Which word signals an example?", "for instance", ["however", "therefore", "although"], "For instance introduces an example."],
  [null, "Combine using who: “I met a girl. She plays the cello.”", "I met a girl who plays the cello.", ["I met a girl, she plays the cello who.", "Who plays the cello I met a girl.", "I met who a girl plays the cello."], "Who joins the information about the girl."],
  [null, "Combine using because: “The road closed. It flooded.”", "The road closed because it flooded.", ["Because the road closed it flooded.", "The road because flooded closed.", "It flooded because the road closed."], "What happened first caused the closing."],
  [null, "Which sentence would a sports announcer most likely say?", "And he slides into home — safe!", ["The aforementioned athlete has arrived.", "Pursuant to the rules, the player ran.", "Kindly observe the runner."], "Different situations use different kinds of English."],
  [null, "Which sentence is best for a science report?", "The plant grew 3 inches in two weeks.", ["The plant got super big, like, really fast.", "OMG the plant grew!", "Plant = big now."], "Reports use clear, formal sentences."],
  [null, "Which word best fits? “I wanted the red bike; ___, I chose the blue one because it was cheaper.”", "however", ["moreover", "similarly", "for example"], "The choice is different from what was wanted."],
  [null, "Which expands the sentence by telling when?", "After dinner, we played a board game.", ["We played a board game.", "We played.", "A board game."], "Add a phrase that answers when.", true],
  [null, "Which sentence best reduces repetition? “The movie was long. The movie was boring. The movie was loud.”", "The movie was long, boring and loud.", ["The movie was long the movie was boring.", "Long boring loud movie movie.", "The movie was long, the movie was boring and loud."], "List the describing words once.", true],
  [null, "Which word signals contrast and fits? “Owls hunt at night, ___ hawks hunt during the day.”", "whereas", ["moreover", "similarly", "therefore"], "Whereas compares two different things.", true],
  [null, "Which word best fits? “The plan was simple; ___, it worked perfectly.”", "moreover", ["however", "although", "instead"], "Moreover adds a second good point.", true],
  [null, "An author writes one character's lines in very formal English and another's in slang. Why?", "to show the two characters are different", ["because of a printing mistake", "to make the book longer", "so readers will skip the slang"], "How people speak shows who they are.", true],
];

export const STORY_READER_5: Unit = readingUnit({
  id: "ca-g5-story-reader",
  title: "Story Reader",
  emoji: "📕",
  blurb: "Quotes, themes and points of view.",
  parentNote:
    "Your child reads short stories, poems and a graphic-novel page to quote the text when explaining and inferring, find themes, compare characters, interpret figurative language, see how a narrator's point of view shapes events and how pictures add meaning, and compare two stories with the same theme.",
  standards: [
    "RL.5.1; RL.5.2; RL.5.3; RL.5.4; RL.5.6; RL.5.7; RL.5.9",
    "quoting to explain and infer, theme and summary, comparing characters, figurative language, narrators' points of view, visual elements and stories with similar themes",
  ],
  items: STORY_READER,
});

export const INFO_READER_5: Unit = readingUnit({
  id: "ca-g5-info-reader",
  title: "Information Reader",
  emoji: "📰",
  blurb: "Main ideas, accounts and sources.",
  parentNote:
    "Your child reads information texts to quote accurately, find two or more main ideas and summarize, explain how people, events and ideas connect, learn subject words, compare firsthand and secondhand accounts of the same event, and combine facts from several texts.",
  standards: [
    "RI.5.1; RI.5.2; RI.5.3; RI.5.4; RI.5.6; RI.5.9; SL.5.2",
    "quoting, main ideas and summaries, relationships between people, events and ideas, subject words, different accounts of one event, and combining texts",
  ],
  items: INFO_READER,
});

export const SENTENCES_SIGNALS_5: Unit = readingUnit({
  id: "ca-g5-sentences-and-signals",
  title: "Sentences and Signal Words",
  emoji: "🧩",
  blurb: "Combine sentences and use signal words.",
  parentNote:
    "Your child expands, combines and trims sentences, notices dialects and formal English in stories, and uses signal words such as however, although, moreover and similarly.",
  standards: [
    "L.5.3; L.5.6",
    "expanding, combining and reducing sentences, varieties of English, and words that signal contrast, addition and other relationships",
  ],
  items: SENTENCES_SIGNALS,
});

export const LANGUAGE_5: Unit[] = [STORY_READER_5, INFO_READER_5, SENTENCES_SIGNALS_5];
