import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { EXTRA } from "./language-extra-g7";

// Pennsylvania's own Grade 7 English language arts units (`pa-` ids). They practice PA Core reading standards the shared
// units leave out: the roles of authors, poems and their parts, arguments and how authors support them, and comparing
// texts. The passages and poems are original. Reading only; writing, speaking and research standards need free work.

const DICTION: Q[] = [
  ["Diction is…", "the author’s choice of words", ["the length of a book", "the cover design", "the rhyme scheme"], "Diction means word choice."],
  ["Syntax is…", "the way words are arranged into sentences", ["the meaning of a word", "the page layout", "a kind of poem"], "Syntax is sentence structure."],
  ["“The kitten stumbled, tumbled and tottered.” The diction makes the kitten seem…", "clumsy", ["graceful", "angry", "enormous"], "The verbs show uneven movement."],
  ["Which word choice makes the scene feel most threatening?", "The shadow loomed over the door.", ["The shadow was by the door.", "The shadow sat near the door.", "A shadow was there."], "Loomed is strong and ominous."],
  ["“She strolled” versus “she stormed.” Which diction shows anger?", "stormed", ["strolled", "both", "neither"], "Stormed is forceful."],
  ["Short sentences in a row can make a passage feel…", "tense or fast", ["slow and dreamy", "silly", "formal"], "Short sentences move quickly."],
  ["Long, flowing sentences can make a passage feel…", "calm or thoughtful", ["tense", "choppy", "rushed"], "Long sentences slow the pace.", true],
  ["“The rain fell. The wind rose. The door slammed.” The syntax creates…", "tension", ["calm", "humor", "confusion"], "Short sentences build suspense.", true],
  ["“The river meandered lazily through the green, sunlit valley, past meadows and slow herds.” The syntax creates…", "a relaxed mood", ["a tense mood", "an angry mood", "a funny mood"], "A long sentence feels slow.", true],
  ["An author writes “Gone. Everything gone.” What does the fragment add?", "emphasis and emotion", ["a rhyme", "a fact", "a definition"], "Fragments stress feeling.", true],
  ["Formal diction would include…", "“commence” and “assist”", ["“start” and “help”", "“gonna” and “yeah”", "“cool” and “awesome”"], "Formal words are polished."],
  ["Informal diction would include…", "“hang out” and “pretty cool”", ["“commence” and “assist”", "“therefore” and “nevertheless”", "“endeavor” and “procure”"], "Informal words are casual."],
  ["Why might an author use formal diction in a speech to a council?", "to show respect and seriousness", ["to be silly", "to save space", "to rhyme"], "Formal words fit a serious setting."],
  ["Why might an author use informal diction in a text to friends?", "to sound friendly and natural", ["to sound distant", "to seem unfriendly", "to sound like a law"], "Casual words fit friends."],
  ["Which sentence has the strongest diction for excitement?", "The crowd erupted in thunderous cheers.", ["The crowd made noise.", "The crowd was there.", "The crowd watched."], "Strong verbs add excitement."],
  ["Which sentence uses a series (three or more items) for effect?", "She came, she saw, she conquered.", ["She came.", "She came and left.", "She came to see."], "A series builds rhythm.", true],
  ["Repeating a sentence pattern for effect is called…", "parallel structure", ["a metaphor", "a rhyme", "a fragment"], "Parallel patterns repeat.", true],
  ["“I came for answers. I stayed for answers. I left with answers.” The repeated pattern stresses…", "determination", ["silence", "humor", "forgetting"], "Repetition adds emphasis.", true],
  ["A question like “Can we really ignore this?” in an essay makes readers…", "think about the issue", ["stop reading", "laugh", "count lines"], "A rhetorical question invites thought."],
  ["An author’s tone is…", "the attitude shown through word choice and style", ["the page number", "the number of chapters", "the cover"], "Tone comes from diction and syntax."],
  ["Words like “brilliant” and “remarkable” give a tone that is…", "admiring", ["critical", "bored", "angry"], "They praise."],
  ["Words like “pathetic” and “worthless” give a tone that is…", "scornful", ["admiring", "calm", "warm"], "They criticize harshly.", true],
  ["How does an author achieve a purpose through diction?", "by choosing words that fit the message and audience", ["by using more words", "by avoiding adjectives", "by using rhyme"], "Word choice supports purpose."],
  ["How does an author achieve a purpose through syntax?", "by shaping sentences to guide pacing and emphasis", ["by listing facts", "by avoiding verbs", "by using only questions"], "Sentence shape matters."],
  ["A writer wants readers to feel urgency. Which would help most?", "short, direct sentences with strong verbs", ["long, slow sentences", "many adjectives", "passive voice only"], "Brisk syntax feels urgent.", true],
];

const SETTING: Q[] = [
  ["Setting includes…", "the time and place of a story", ["only the characters", "the title", "the rhyme"], "Setting is when and where."],
  ["A desert setting might make a character face…", "heat and thirst", ["deep snow", "ocean waves", "tall elevators"], "Setting affects what happens."],
  ["A story set during a blizzard might force the characters to…", "stay indoors and work together", ["go swimming", "plant a garden", "take a picnic"], "Setting shapes plot."],
  ["How can setting affect a character’s feelings?", "a dark, silent house may make a character nervous", ["setting has no effect", "settings only affect weather", "settings only affect titles"], "Place changes mood."],
  ["Maya grows braver after spending a summer on a rugged mountain farm. The setting helped by…", "giving her challenges that built her courage", ["making her tired of books", "giving her a new name", "making it rain words"], "Setting develops character.", true],
  ["A crowded city setting can make a character feel…", "lost or rushed", ["peaceful", "bored of the sea", "close to farm animals"], "Crowds can overwhelm."],
  ["How does setting affect plot in a story about a ship stranded at sea?", "the characters must find a way to survive", ["they go shopping", "they plant a garden", "they go to school"], "Setting limits the choices."],
  ["A story’s setting changes from a quiet village to a busy port. This probably changes…", "the problems and choices the character faces", ["the author", "the title", "the rhyme"], "New setting, new events.", true],
  ["In a story set long ago, a character cannot use a phone. This is an example of setting…", "limiting the plot", ["having no effect", "changing the title", "making a rhyme"], "Time shapes what is possible.", true],
  ["A theme is…", "a central message about life in a text", ["the plot summary", "a character’s name", "the setting"], "Themes are big ideas."],
  ["A text can have more than one theme. Comparing them means…", "looking at how each develops", ["picking the shortest", "ignoring one", "counting pages"], "Track each idea."],
  ["A story shows both “courage matters” and “honesty is hard.” These are two…", "themes", ["settings", "titles", "rhymes"], "Different messages."],
  ["In a story, Ben fears the dark at first, then helps friends find their way. One theme is…", "fear can be overcome", ["the dark is bright", "friends are lost", "Ben is tall"], "Look at how Ben changes.", true],
  ["Two themes: one grows from a character’s mistakes; another from friendship. A reader compares them by…", "tracking where each appears and how it changes", ["counting words", "reading the cover", "picking the longer"], "Follow each theme."],
  ["The central idea of an informational text is…", "its main point, supported by details", ["its title only", "the author’s age", "a quotation"], "Details support the central idea."],
  ["A text has two central ideas: that exercise helps the body and that it helps the mind. A reader compares them by…", "seeing how details support each", ["ignoring details", "reading only the first", "counting nouns"], "Track the details.", true],
  ["Which detail supports the idea that exercise helps the mind?", "Students who exercise before class often focus better.", ["Muscles grow with exercise.", "Sports shoes are popular.", "Gyms open early."], "It links exercise to thinking.", true],
  ["How can two central ideas develop in one text?", "through separate paragraphs with their own details", ["by repeating the title", "by using only pictures", "by skipping details"], "Each idea needs support."],
  ["A text begins with a problem and ends with a possible solution. This helps develop the central idea by…", "showing why it matters", ["hiding the idea", "listing rhymes", "changing the topic"], "Structure supports ideas.", true],
  ["Which question helps you compare two themes?", "How does each theme show up through the characters’ choices?", ["Which theme is longer?", "Which is on the first page?", "Which has the best cover?"], "Look at events and choices."],
  ["Which question helps analyze setting’s impact?", "How would the story change in a different place?", ["How many pages are there?", "What font is used?", "Who printed it?"], "Imagine a different setting."],
  ["Setting can help create mood. A foggy, silent harbor suggests…", "mystery", ["celebration", "comedy", "sports"], "Fog and silence feel mysterious."],
  ["A story takes place only in a small boat for three days. The setting makes the plot feel…", "tight and tense", ["roomy", "careless", "silly"], "Limited space adds tension.", true],
  ["How does time (like wartime or a long drought) affect a character?", "it shapes needs, choices and fears", ["it changes nothing", "it removes the plot", "it changes only the title"], "Time is part of setting."],
  ["Which sentence explains how setting shaped a character?", "Living on the busy dock taught Sam to be quick and alert.", ["Sam was seven.", "Sam liked toast.", "Sam’s name was long."], "It links place to character.", true],
];

const ALLUSION: Q[] = [
  ["An allusion is…", "a brief reference to a well-known person, place, event or story", ["a rhyme", "a title", "a fact"], "Allusions point to something familiar."],
  ["“He opened a Pandora’s box of problems.” The allusion is to…", "a myth about releasing troubles", ["a cooking tip", "a map", "a song"], "Pandora’s box set troubles loose."],
  ["“Her kindness had the Midas touch.” This allusion suggests that everything she touched…", "turned out wonderful", ["turned to dust", "became cold", "got lost"], "Midas turned things to gold.", true],
  ["“That’s his Achilles’ heel.” This means it is his…", "weak spot", ["strength", "gift", "secret treasure"], "Achilles had one weak spot."],
  ["“She was a real Cinderella story.” The allusion suggests…", "going from hardship to a happy change", ["a fashion show", "a cooking contest", "a long trip"], "Cinderella’s life changed for the better.", true],
  ["“He met his Waterloo.” This allusion means he…", "suffered a final defeat", ["won big", "took a trip", "wrote a poem"], "Waterloo was a famous defeat.", true],
  ["“Don’t be a Scrooge about it.” This allusion calls someone…", "stingy", ["generous", "sleepy", "angry"], "Scrooge was famously stingy."],
  ["“We’re entering a Herculean task.” The allusion tells us the task is…", "extremely hard", ["very easy", "short", "silly"], "Hercules did huge tasks."],
  ["“Her voice was a siren’s song.” This allusion suggests a voice that is…", "beautiful but dangerously tempting", ["loud and plain", "soft and sleepy", "quick"], "Sirens lured sailors in myths.", true],
  ["Why do authors use allusions?", "to add meaning by linking to something readers know", ["to avoid details", "to make the text shorter", "to hide the plot"], "They add layers of meaning."],
  ["To understand an allusion, a reader needs…", "background knowledge of what it refers to", ["a dictionary only", "a larger font", "no information"], "Know the original."],
  ["Which sentence contains an allusion?", "Their families’ feud made it a Romeo-and-Juliet romance.", ["Their families were neighbors.", "Their families ate lunch.", "Their families moved."], "It refers to a famous play.", true],
  ["Which sentence contains an allusion?", "The new boss was a real Scrooge.", ["The new boss was kind.", "The new boss arrived.", "The new boss laughed."], "Scrooge is from a famous story."],
  ["“The Trojan horse email tricked the user.” The allusion suggests the email…", "looked harmless but hid something harmful", ["was a gift", "was very large", "was for a farm"], "The Trojan horse was a trick.", true],
  ["How does figurative language add tone to a text?", "word pictures and comparisons set an attitude", ["it makes text shorter", "it removes feelings", "it replaces facts"], "Figurative language shapes feeling."],
  ["“The classroom was an oven.” The tone is…", "uncomfortable", ["joyful", "calm", "silly"], "An oven is hot."],
  ["“Her joy was a firework.” This metaphor adds a tone that is…", "excited", ["bored", "gloomy", "calm"], "Fireworks burst with excitement."],
  ["Two authors write about the same law. One supports it; one doesn’t. They have…", "differing perspectives", ["the same view", "no view", "the same title"], "They disagree."],
  ["Author A calls a new rule “a fair step.” Author B calls it “an unfair burden.” They differ in…", "perspective", ["topic", "genre", "length"], "Their words show different views."],
  ["Two articles on one topic present different facts. A reader should…", "compare evidence and ask why they differ", ["pick the shorter one", "ignore both", "assume both are wrong"], "Compare and evaluate."],
  ["Author A, a farmer, and Author B, a city planner, write about a new road. They may differ because of their…", "experiences and interests", ["spelling", "page count", "cover design"], "Experiences shape views.", true],
  ["How can you tell an author’s perspective?", "by the evidence they choose and the words they use", ["by the cover", "by the font", "by the page number"], "Look at choices."],
  ["Which pair of statements shows differing perspectives?", "“The park should close early.” / “The park should stay open late.”", ["“The park opens at nine.” / “The park has swings.”", "“It rained.” / “It was wet.”", "“Dogs bark.” / “Dogs have fur.”"], "They disagree about the same issue."],
  ["When authors present the same topic with different perspectives, readers learn…", "more than one side", ["only one side", "nothing", "rhymes"], "Comparing adds understanding."],
  ["Allusions often come from…", "myths, stories, history and literature", ["only math books", "only maps", "only weather reports"], "Common cultural references.", true],
  ["An allusion works best when readers…", "recognize what it refers to", ["have never heard of it", "are not paying attention", "read quickly"], "Shared knowledge matters."],
];

const OWN: Unit[] = [
  bankUnit({
    id: "pa-g7-diction-and-syntax",
    title: "Diction & Syntax",
    emoji: "🔤",
    blurb: "How word choice and sentence shape serve an author’s purpose.",
    parentNote:
      "Pennsylvania’s Grade 7 standards ask children to interpret the meaning of words and phrases, including figurative and connotative meanings, and to determine an author’s point of view or purpose. Students read short passages and tell how word choice and sentence length, repetition and structure create tone, pace and emphasis.",
    standards: ["CC.1.2.7.F; CC.1.2.7.D", "how word choice and sentence shape serve an author’s purpose"],
    items: DICTION,
  }),
  bankUnit({
    id: "pa-g7-setting-themes-central-ideas",
    title: "Setting, Themes & Central Ideas",
    emoji: "🏝️",
    blurb: "How place shapes a story, and how to compare two themes or ideas.",
    parentNote:
      "Pennsylvania’s Grade 7 standards ask children to analyze how setting shapes characters and plot and to determine a theme or central idea and how it develops. Students connect setting to character and plot and track more than one theme or idea.",
    standards: ["CC.1.3.7.C; CC.1.3.7.A; CC.1.2.7.A", "how setting shapes a story, themes and central ideas"],
    items: SETTING,
  }),
  bankUnit({
    id: "pa-g7-allusions-and-perspectives",
    title: "Allusions & Perspectives",
    emoji: "🏛️",
    blurb: "References that add meaning, and authors who see a topic differently.",
    parentNote:
      "Pennsylvania’s Grade 7 standards ask children to interpret figurative and connotative meanings and to analyze how two or more authors present and interpret facts on the same topic. Students decode common allusions from myths, stories and history and tell why two authors see a topic differently.",
    standards: ["CC.1.2.7.F; CC.1.2.7.I", "figurative meaning and how two authors present facts on a topic"],
    items: ALLUSION,
  }),
];
export const UNITS: Unit[] = [...OWN, ...EXTRA];
/** Put the own units before the planned ones. */
export const FIRST = false;
