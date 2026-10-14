import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";
import { CRAFT_UNITS } from "./language-g4-craft";

// New York's own Grade 4 language units (`ny-` ids). New York's 4R5 names the parts of poems and plays children should
// use when they talk about literary texts (verse, rhythm, meter, characters, settings, dialogue, stage directions); no
// shared unit practises them, so this bank does. Every poem line and script line is original.

const POEMS_AND_PLAYS: Q[] = [
  [
    "What is a group of lines in a poem called?",
    "A stanza",
    ["A chapter", "A scene", "A caption"],
    "Poems are split into stanzas, the way stories are split into paragraphs.",
  ],
  [
    "What is writing that is arranged in lines with rhythm called?",
    "Verse",
    ["Prose", "A glossary", "An index"],
    "Verse is the language of poems. Prose is ordinary sentences and paragraphs.",
  ],
  [
    "Stories and articles written in ordinary sentences and paragraphs are called…",
    "Prose",
    ["Verse", "Stanzas", "Stage directions"],
    "If it is not broken into poetic lines, it is prose.",
  ],
  [
    "What is the beat you hear when you read a poem aloud?",
    "Rhythm",
    ["Setting", "Dialogue", "Glossary"],
    "Clap as you read a poem: the pattern you clap is its rhythm.",
  ],
  [
    "What is a regular pattern of stressed and unstressed syllables in a poem called?",
    "Meter",
    ["Stanza", "Narrator", "Scene"],
    "Meter is a steady, counted rhythm, like da-DUM da-DUM da-DUM.",
    true,
  ],
  [
    "\"The cat sat down upon the mat, / And there it stayed, as round and flat.\" Which words rhyme?",
    "mat and flat",
    ["cat and down", "sat and stayed", "round and there"],
    "Rhyming words end with the same sound.",
  ],
  [
    "In a play, what are the words the characters say to each other called?",
    "Dialogue",
    ["Stage directions", "A stanza", "A caption"],
    "Dialogue is the talking between characters.",
  ],
  [
    "In a play, what tells the actors how to move, where to stand or how to speak?",
    "Stage directions",
    ["Dialogue", "Rhyme", "A stanza"],
    "Stage directions are often in italics or brackets, and are not spoken aloud.",
  ],
  [
    "\"(Rosa tiptoes to the door and peeks outside.)\" What is this line from a play?",
    "A stage direction",
    ["Dialogue", "A stanza", "A rhyme"],
    "It tells the actor what to do, not what to say.",
  ],
  [
    "\"SAM: Did anyone see my blue backpack?\" What is this line from a play?",
    "Dialogue",
    ["A stage direction", "A stanza", "The cast list"],
    "It shows what the character Sam says.",
  ],
  [
    "What is the list of characters at the start of a play called?",
    "The cast of characters",
    ["The glossary", "The stanza", "The index"],
    "It names everyone who appears in the play.",
  ],
  [
    "A play is divided into parts that happen in one place and time. What are they called?",
    "Scenes",
    ["Stanzas", "Verses", "Captions"],
    "A new scene often means a new place or time.",
  ],
  [
    "A chapter book is divided into…",
    "Chapters",
    ["Stanzas", "Scenes", "Stage directions"],
    "Stories are divided into chapters; plays into scenes; poems into stanzas.",
  ],
  [
    "A play begins: \"A busy city park on a windy autumn morning.\" What does this tell you?",
    "The setting",
    ["The dialogue", "The rhyme", "The meter"],
    "Setting is where and when a story or play takes place.",
  ],
  [
    "What is the main difference between a play and a story?",
    "A play is written to be acted out, with dialogue and stage directions",
    ["A play always rhymes", "A play has no characters", "A play has stanzas instead of scenes"],
    "Plays are written for actors to perform on a stage.",
  ],
  [
    "Which feature is found in poems but usually NOT in news articles?",
    "Stanzas",
    ["Facts", "Dates", "Headlines"],
    "Think of how a poem looks on the page.",
  ],
  [
    "Which feature is found in plays but usually NOT in poems?",
    "Stage directions",
    ["Lines", "Rhythm", "Word choice"],
    "Only plays need to tell actors how to move.",
  ],
  [
    "\"Whisper, whisper, goes the breeze, / Rustling softly through the trees.\" How many lines does this poem have?",
    "Two",
    ["One", "Three", "Four"],
    "The slash (/) shows where a new line begins.",
  ],
  [
    "A poem has three stanzas with four lines each. How many lines does it have?",
    "12",
    ["7", "3", "16"],
    "Three groups of four lines: 3 × 4.",
  ],
  [
    "A poem that does not rhyme and has no regular rhythm is called…",
    "Free verse",
    ["A stanza", "A stage direction", "A scene"],
    "Free verse is free of set patterns of rhyme and meter.",
    true,
  ],
  [
    "\"Buzz, hiss, crack, splash!\" Which poetry tool do these words use?",
    "Onomatopoeia (words that sound like what they mean)",
    ["Stage directions", "Meter", "A cast list"],
    "Say them aloud: they sound like the noises they name.",
    true,
  ],
  [
    "\"Silver snakes slid slowly south.\" Which sound pattern does this line use?",
    "Alliteration (repeating the first sound)",
    ["Rhyme at the end of lines", "Dialogue", "Free verse"],
    "Look at the first letter of each word.",
    true,
  ],
  [
    "Who speaks in a poem?",
    "The speaker, the voice telling the poem",
    ["The stage manager", "The cast list", "The index"],
    "In a poem, the voice is called the speaker. In a story, it is the narrator.",
    true,
  ],
  [
    "Why might a playwright write \"(angrily)\" before a line?",
    "To tell the actor how to say the line",
    ["To show where the scene takes place", "To make the line rhyme", "To name a new chapter"],
    "Stage directions can show a character's feelings.",
    true,
  ],
  [
    "Why do poets often repeat a line at the end of each stanza?",
    "To build rhythm and point to an important idea",
    ["To list the characters", "To tell actors where to stand", "To add a heading"],
    "A repeated line is called a refrain. It sticks in the reader's mind.",
    true,
  ],
  [
    "A poem has the pattern da-DUM da-DUM da-DUM in every line. What does it have?",
    "A regular meter",
    ["Free verse", "Stage directions", "No rhythm at all"],
    "A steady beat that repeats in every line is a meter.",
    true,
  ],
  [
    "In a script, where do you usually find the name of the character who speaks?",
    "Before the line, often in capital letters",
    ["At the end of the play", "In the glossary", "In the stanza break"],
    "Scripts look like: MIA: Let's go!",
  ],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "ny-g4-poems-and-plays",
    title: "Poems and Plays",
    emoji: "🎭",
    blurb: "Stanzas, rhythm, meter, dialogue and stage directions.",
    parentNote:
      "Your child names the parts of poems and plays (verse, stanza, rhythm, meter, cast, scene, dialogue, stage directions) and explains how they differ from stories.",
    standards: ["4R5", "the parts of poems and plays: verse, rhythm, meter, characters, setting, dialogue and stage directions"],
    items: POEMS_AND_PLAYS,
  }),
  ...CRAFT_UNITS,
];
