import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Texas Grade 4 language unit: tall tales, myths and legends (4.9(A)), the structure of drama (character tags, acts,
// scenes and stage directions, 4.9(C)) and anecdotes (4.10(G)).

const TALL_TALES: Q[] = [
  ["A tall tale is a story that…", "stretches the truth with funny exaggerations", ["only tells true facts", "explains how to build something", "has no characters"], "Tall tales make things much bigger than life."],
  ["Which character most likely comes from a tall tale?", "a lumberjack so big he dug lakes with his boots", ["a scientist measuring rain", "a girl who walks to school", "a mayor at a meeting"], "Look for the impossible exaggeration."],
  ["What do stage directions tell?", "how the actors move or speak", ["the title of a poem", "the moral of a fable", "the meaning of a word"], "They are instructions for the actors."],
  ["In a play, the name before a line of speech is a…", "character tag", ["stage direction", "stanza", "caption"], "It tells who is speaking."],
  ["A play is divided into…", "acts and scenes", ["chapters and pages", "stanzas and lines", "headings and captions"], "Think of how a script is organized."],
  ["Where are stage directions usually written?", "in parentheses or italics", ["in the title", "in the glossary", "on the back cover"], "They are set apart from what characters say."],
  ["“(She tiptoes to the door.)” This line is…", "a stage direction", ["dialogue", "a character tag", "a moral"], "It tells the actor what to do."],
  ["The list of characters at the start of a play is the…", "cast of characters", ["index", "glossary", "bibliography"], "It names everyone in the play."],
  ["A myth often explains…", "something in nature or why the world is as it is", ["how to fix a bike", "today's weather", "a math rule"], "Myths are old stories that explain."],
  ["Legends are usually about…", "heroes whose deeds may be exaggerated", ["made-up recipes", "how-to steps", "today's news"], "Legends may be based on real people."],
  ["What is an anecdote?", "a short, true story about something that happened", ["a list of facts", "a long novel", "a rhyming poem"], "Anecdotes are short personal stories."],
  ["Why might a speaker start with an anecdote?", "to grab the audience's interest with a real example", ["to list sources", "to end the speech", "to confuse listeners"], "A small story draws people in."],
  ["Which is an anecdote?", "When I was seven, I got lost at the fair, and a kind stranger helped me.", ["Fairs happen every summer.", "Fairs have rides and games.", "Tickets cost five dollars."], "Look for a short story about one time something happened."],
  ["Which detail shows the story is a tall tale?", "She lassoed a tornado and rode it across the plains.", ["She fed her horse.", "She lived on a ranch.", "She woke up early."], "Which event could never really happen?"],
  ["Which kind of story ends with a moral stated plainly?", "a fable", ["a tall tale", "a play", "a myth"], "Fables teach a lesson."],
  ["In a script, what is dialogue?", "the words the characters say", ["the description of the setting", "the act number", "the title"], "Dialogue is talking."],
  ["A new scene usually begins when…", "the time or place changes", ["a character sneezes", "a word rhymes", "the reader turns a page"], "Scenes change with the setting."],
  ["Many tall tales were told about…", "heroes of the American frontier", ["modern doctors", "robots", "famous painters"], "Think of lumberjacks and cowhands."],
  ["Which sentence uses exaggeration like a tall tale?", "He was so strong he could lift a mountain with one hand.", ["He lifted a heavy box.", "He was strong for his age.", "He liked to lift weights."], "Which one is impossible?"],
  ["Which genre is usually written to be performed?", "drama", ["fable", "myth", "tall tale"], "Actors perform it on a stage."],
  ["Why does a play include stage directions?", "to help actors and readers picture the action", ["to state the moral", "to list the sources", "to make lines rhyme"], "They show what is happening."],
  ["What do myths and legends have in common?", "They are old stories passed down over time.", ["They are always true.", "They are written as plays.", "They are science reports."], "Both come from long ago."],
  ["Which is a character tag?", "MAYA:", ["(Maya waves.)", "Act 1, Scene 2", "The End"], "It is the speaker's name."],
  ["The narrator of a tall tale often…", "tells every wild event as if it were true", ["admits the story is a science report", "adds footnotes", "writes in stanzas"], "Tall tales are told with a straight face."],
  ["Which story is most likely a myth?", "how the god of the sea made the first horse", ["how to make a sandwich", "a diary from last week", "a map of the town"], "Myths include gods and explain beginnings."],
  ["In an essay, an anecdote is used to…", "show a point with a short story", ["list every source", "define a word", "show a chart"], "A real example makes a point stick."],
  ["How is a script different from a story?", "It shows each speaker's name before their lines.", ["It never has dialogue.", "It has no characters.", "It is always in rhyme."], "Scripts are set out for actors.", true],
  ["Folktales, myths and tall tales are all part of…", "oral tradition", ["science writing", "news reporting", "instruction manuals"], "They were first told aloud.", true],
  ["A play's Act 2 begins in a new town, a year later. What changed?", "the setting and time", ["the title", "the author", "the genre"], "Acts and scenes often change when and where.", true],
];

export const LANGUAGE_4: Unit[] = [
  bankUnit({
    id: "tx-g4-tall-tales-and-plays",
    title: "Tall Tales, Myths & Plays",
    emoji: "🎭",
    blurb: "Tall tales, myths, legends, how plays are built, and anecdotes.",
    parentNote: "Your child tells tall tales, myths and legends apart, reads the parts of a play (character tags, acts, scenes, stage directions) and explains why writers use anecdotes.",
    standards: ["4.9(A); 4.9(C); 4.10(G)", "tall tales, myths, legends, the structure of plays, and anecdotes"],
    items: TALL_TALES,
  }),
];
