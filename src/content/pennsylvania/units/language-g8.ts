import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { EXTRA } from "./language-extra-g8";

// Pennsylvania's own Grade 8 English language arts units (`pa-` ids). They practice PA Core reading standards the shared
// units leave out: the roles of authors, poems and their parts, arguments and how authors support them, and comparing
// texts. The passages and poems are original. Reading only; writing, speaking and research standards need free work.

const ARCHETYPES: Q[] = [
  ["An archetype is…", "a pattern of character, event or symbol that appears in many stories", ["a one-of-a-kind character", "a type of rhyme", "a page of a book"], "Archetypes repeat across cultures and time."],
  ["The hero archetype is a character who…", "faces danger or challenges for a greater good", ["avoids all trouble", "never changes", "only watches"], "Heroes take on big challenges."],
  ["The mentor archetype is a character who…", "guides and teaches the hero", ["tries to defeat the hero", "never speaks", "hides from the hero"], "Mentors help heroes grow."],
  ["The trickster archetype is a character who…", "uses cleverness and mischief, often breaking rules", ["follows every rule", "never lies", "hides all day"], "Tricksters trick others."],
  ["The villain or shadow archetype is…", "a force or character that opposes the hero", ["the hero’s teacher", "a helper", "the setting"], "It stands in the hero’s way."],
  ["The outsider archetype is a character who…", "does not fit in with the group", ["leads everyone", "knows everyone", "never moves"], "Outsiders stand apart."],
  ["A journey or quest archetype is a story pattern in which a character…", "leaves home to seek something and changes along the way", ["stays home all day", "never faces a problem", "forgets the goal"], "Think of a long trip with a goal."],
  ["An old wizard trains a young farm boy to fight an evil sorcerer. The wizard is the…", "mentor", ["trickster", "villain", "outsider"], "He guides the hero."],
  ["A clever fox fools a lion to escape being eaten. The fox is the…", "trickster", ["mentor", "hero", "shadow"], "It uses cleverness."],
  ["A young girl leaves her village to find a cure for her sick mother. She faces danger and returns changed. This story follows the…", "hero’s journey", ["trickster tale", "mentor tale", "rhyme pattern"], "Leaving, trials, returning."],
  ["A story in which a character falls into despair and then is renewed shows the archetype of…", "death and rebirth (a fresh start)", ["the trickster", "the sidekick", "the setting"], "A change from low to high.", true],
  ["Why do stories across cultures share archetypes?", "they reflect experiences people everywhere understand", ["authors copy each other exactly", "they are required", "they cannot be changed"], "Humans share common experiences.", true],
  ["Two myths from different countries both feature a clever animal who tricks a larger one. The shared pattern is the…", "trickster archetype", ["hero’s journey", "elegy", "limerick"], "Same type of character."],
  ["Comparing archetypes in two texts means noticing…", "how the same pattern appears and differs", ["page numbers", "paper quality", "the print size"], "Compare and contrast."],
  ["A modern movie hero has a wise coach who trains them. This pairing is an archetype of…", "hero and mentor", ["villain and sidekick", "trickster and rule", "poet and reader"], "Many stories pair these."],
  ["A story’s hero returns home changed and shares what they learned. This part of the journey is called…", "the return", ["the call", "the trial", "the rhyme"], "The hero comes back."],
  ["A hero leaves home when something calls them to adventure. This first step is the…", "call to adventure", ["return", "mentor test", "ending"], "The journey begins.", true],
  ["Which character is most like a trickster?", "a raven who plays pranks on everyone", ["a knight who always obeys", "a king who sits still", "a farmer who plants rows"], "Tricksters play pranks."],
  ["Which character is most like a mentor?", "a retired captain who trains a young sailor", ["a thief in the night", "a rock", "a cloud"], "A mentor teaches."],
  ["How does an author make a character’s perspective unique?", "through the character’s thoughts, speech and choices", ["through the page number", "through the cover", "through the paper"], "Voice individualizes characters."],
  ["In a story, two siblings see the same storm very differently: one is thrilled, one is terrified. The author shows this through…", "each sibling’s thoughts and words", ["the title", "the font", "the rhyme"], "Perspective shows in thoughts.", true],
  ["A character who says “I never trust strangers” and another who says “Everyone is a friend” show different…", "perspectives", ["settings", "themes", "titles"], "Their views differ."],
  ["An author gives one character short, clipped speech and another long, flowery speech to show they are…", "different in personality", ["in different books", "the same", "in a poem"], "Speech reveals character.", true],
  ["Why might an author present several characters’ perspectives on one event?", "to give readers a fuller understanding", ["to make the story shorter", "to avoid a theme", "to confuse readers"], "Multiple views deepen understanding."],
  ["An author builds a character’s perspective by showing…", "what they notice, believe and want", ["their height only", "the book’s length", "the cover"], "Perspective is how a character sees."],
];

const POETRY: Q[] = [
  ["Imagery is…", "language that appeals to the senses", ["a rhyme scheme", "a kind of title", "a page"], "Images help us see, hear, feel, smell or taste."],
  ["A symbol is…", "an object, color or action that stands for a larger idea", ["a punctuation mark", "a rhyme", "a book title"], "Symbols carry meaning."],
  ["In a poem, a dove often symbolizes…", "peace", ["war", "hunger", "winter"], "Doves are a common peace symbol."],
  ["A road that splits in two in a poem might symbolize…", "a choice", ["a rhyme", "a map", "a trip to town"], "A split suggests deciding."],
  ["A cracked mirror in a poem might symbolize…", "a broken sense of self", ["a clean window", "bright hope", "a happy day"], "Breaks suggest damage.", true],
  ["A candle that burns down in a poem might symbolize…", "time passing or hope fading", ["a bright new start only", "a wide road", "a cold sea"], "Think about what happens to a candle.", true],
  ["Alliteration in a poem…", "repeats beginning sounds to create music", ["adds page numbers", "removes sound", "lists facts"], "Same first sound."],
  ["Assonance is…", "the repetition of vowel sounds", ["the repetition of consonant sounds at the start", "a kind of rhyme scheme", "a punctuation mark"], "Vowel sounds repeat inside words."],
  ["The sound of “hush,” “shh” and “whisper” in a poem creates a feeling of…", "quiet", ["noise", "speed", "anger"], "Soft sounds are quiet.", true],
  ["Hard sounds like “crack,” “smash” and “bang” create a feeling of…", "force", ["calm", "sleep", "peace"], "Hard sounds feel strong.", true],
  ["A poem’s structure includes…", "its lines, stanzas and rhyme pattern", ["its font size", "its page number", "its paper"], "Structure is how it is built."],
  ["Enjambment is when…", "a sentence runs on past the end of a line", ["a line ends with a period", "every line rhymes", "the poem has a title"], "The meaning carries across lines."],
  ["A poem’s shape on the page, like short lines stacked down, can make it feel…", "slow and deliberate", ["long and tiring", "funny", "like a list of facts"], "Visual shape adds meaning.", true],
  ["“The city was a river of headlights.” This metaphor creates an image of…", "a steady flow of traffic", ["a quiet field", "a snowy mountain", "an empty room"], "Headlights flow like water."],
  ["“The silence was a heavy blanket.” This suggests the silence is…", "thick and smothering", ["light and breezy", "loud", "colorful"], "Blankets are heavy and covering.", true],
  ["“Her laughter was a bell.” This image appeals to…", "hearing", ["taste", "smell", "touch"], "Bells ring."],
  ["“The air smelled of bread and rain.” This image appeals to…", "smell", ["sight", "hearing", "touch"], "It describes scent."],
  ["Which line uses imagery of sight?", "Golden light spilled over the hills.", ["The light was.", "It was a day.", "I went home."], "Golden light is a picture."],
  ["Which line has personification?", "The wind sighed through the empty hall.", ["The wind blew.", "The hall was empty.", "I heard the wind."], "Wind is given a human action."],
  ["Which line has a symbol of hope?", "A single green shoot pushed up through the cracked pavement.", ["The pavement was gray.", "A truck drove by.", "Rain fell."], "New growth suggests hope.", true],
  ["A poem’s tone is…", "the speaker’s attitude toward the subject", ["the paper color", "the number of lines", "the title length"], "Tone is attitude."],
  ["A poem full of short, broken lines and sad images likely has a tone that is…", "mournful", ["joyful", "silly", "proud"], "The shape and images are sad.", true],
  ["A speaker in a poem is…", "the voice that tells the poem", ["always the poet", "the title", "the reader"], "The speaker can be a character."],
  ["How do sound, structure and imagery work together in a poem?", "they build meaning and feeling", ["they distract the reader", "they only fill space", "they stop the theme"], "Each element adds to the message."],
  ["A poet uses a sudden short line after long ones to…", "create emphasis or surprise", ["lengthen the poem", "remove a rhyme", "hide the theme"], "Contrast draws attention.", true],
];

const ARGUMENTS: Q[] = [
  ["Reasoning in an argument is…", "how the author connects evidence to the claim", ["the author’s name", "the cover", "a rhyme"], "It explains why."],
  ["Reasoning by cause and effect says…", "one thing leads to another", ["two things are alike", "an expert agrees", "a story is told"], "Cause leads to effect."],
  ["Reasoning by analogy says…", "two things are alike, so what is true for one is true for the other", ["an expert agrees", "a number proves it", "it feels right"], "It compares."],
  ["Reasoning from authority says…", "experts believe it, so it is true", ["a story proves it", "a rhyme proves it", "a number proves it"], "It relies on experts."],
  ["Reasoning from evidence says…", "facts or data prove the claim", ["feelings prove the claim", "a cover proves it", "length proves it"], "It uses data."],
  ["“The town cut its trash, so the dump now lasts longer.” This reasoning is…", "cause and effect", ["analogy", "authority", "emotion"], "Cutting trash led to a longer-lasting dump."],
  ["“A city is like a body: every part must work.” This reasoning is…", "analogy", ["cause and effect", "authority", "statistics"], "It compares."],
  ["“Dentists say brushing prevents cavities.” This reasoning is from…", "authority", ["analogy", "cause and effect", "emotion"], "It relies on experts."],
  ["An argument is more effective when its evidence is…", "accurate, relevant and from reliable sources", ["very long", "surprising", "funny"], "Quality counts."],
  ["Which is a flaw in an argument?", "a claim supported by only one example", ["a claim supported by many facts", "a claim supported by experts", "a claim supported by data"], "One example is thin."],
  ["“My uncle never wears a seat belt and he’s fine, so seat belts are useless.” What is the flaw?", "one case does not prove a rule", ["it uses data", "it uses an expert", "it uses cause and effect correctly"], "One example is not enough.", true],
  ["“Everyone is buying it, so it must be good.” What is the flaw?", "popularity is not proof of quality", ["it has strong evidence", "it uses an expert", "it uses data"], "Many people can be wrong.", true],
  ["“If we allow a short recess, soon there will be no recess at all.” What is the flaw?", "it assumes one step leads to an extreme result without evidence", ["it uses data", "it cites an expert", "it is a rhyme"], "A slippery slope.", true],
  ["An argument could be improved by…", "adding stronger evidence and addressing counterclaims", ["making it longer", "adding rhymes", "removing the claim"], "Better evidence and fairness help."],
  ["A counterclaim is…", "a view that opposes the author’s claim", ["the author’s main claim", "a rhyme", "a title"], "It is the other side."],
  ["An author who answers a counterclaim is…", "rebutting it", ["ignoring it", "repeating it", "rhyming it"], "A rebuttal responds."],
  ["Claim: Schools should start later. Which evidence is relevant?", "Studies show teens learn better when they sleep more.", ["Bells are loud.", "Buses are yellow.", "Lunch is at noon."], "It must connect to the claim.", true],
  ["Claim: Cities need more parks. Which evidence is relevant?", "Neighborhoods with parks have lower stress and more exercise.", ["Parks have gates.", "Some parks are old.", "Trees are green."], "Link to the claim.", true],
  ["Which would make an argument about recycling stronger?", "data showing how much waste recycling prevents", ["a rhyme about recycling", "a longer title", "a bigger font"], "Data adds strength.", true],
  ["An argument that depends on strong feelings but no facts could be improved by…", "adding facts and sources", ["adding more feeling", "shortening it", "changing the title"], "Evidence is needed."],
  ["Which source is most reliable for health facts?", "a medical journal", ["a random blog", "a friend’s guess", "an ad"], "Experts and research."],
  ["The strongest conclusion for an argument…", "restates the claim and sums up the key reasons", ["introduces a new claim", "apologizes", "changes the topic"], "A conclusion wraps up."],
  ["Which phrase signals a counterclaim?", "Some people argue that…", ["For example,", "First,", "In conclusion,"], "It introduces the other side."],
  ["Which phrase signals a rebuttal?", "However, this view overlooks…", ["For example,", "First,", "Finally,"], "It pushes back."],
  ["Which word is a persuasive device?", "must", ["maybe", "perhaps", "somewhat"], "Strong words persuade.", true],
];

const OWN: Unit[] = [
  bankUnit({
    id: "pa-g8-archetypes-and-perspectives",
    title: "Archetypes & Perspectives",
    emoji: "🗡️",
    blurb: "Heroes, mentors, tricksters and how authors give each character a view.",
    parentNote:
      "Pennsylvania’s Grade 8 standards ask children to analyze how a modern work draws on themes and character types from traditional works, and how differences in points of view create effects. Students name common archetypes in short story summaries and tell how an author shows what a character sees and believes.",
    standards: ["CC.1.3.8.H; CC.1.3.8.D", "character types in modern and traditional stories, and differing points of view"],
    items: ARCHETYPES,
  }),
  bankUnit({
    id: "pa-g8-poetry-craft",
    title: "Poetry Craft",
    emoji: "🪞",
    blurb: "Structure, sound, imagery and symbols.",
    parentNote:
      "Pennsylvania’s Grade 8 standards ask children to analyze how the structure of a text contributes to meaning and how word choice shapes meaning and tone. Students read short original lines and tell what the images, sounds and shapes suggest.",
    standards: ["CC.1.3.8.E; CC.1.3.8.F", "structure, sound, imagery and the influence of word choice in poetry"],
    items: POETRY,
  }),
  bankUnit({
    id: "pa-g8-weighing-arguments",
    title: "Weighing Arguments",
    emoji: "🔬",
    blurb: "Types of reasoning, how well they work and how to improve an argument.",
    parentNote:
      "Pennsylvania’s Grade 8 standards ask children to evaluate an author’s argument, reasoning and claims for soundness and relevance of evidence. Students name the reasoning, spot weak spots and choose better evidence.",
    standards: ["CC.1.2.8.H; CC.1.2.8.I", "judging whether an argument’s reasoning is sound and its evidence relevant"],
    items: ARGUMENTS,
  }),
];
export const UNITS: Unit[] = [...OWN, ...EXTRA];
/** Put the own units before the planned ones. */
export const FIRST = false;
