import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Florida's own Grade 5 English language arts units (`fl-` ids): tracking an argument's claim, evidence and
// reasoning, how figurative language and other poetic elements work together in a poem, and primary and secondary
// sources. The passages and poems are original. Reading only.

const ARGUMENT: Q[] = [
  ["An argument in a text has a…", "claim, evidence and reasoning", ["title and cover", "rhyme and rhythm", "plot and setting"], "These are the parts to track."],
  ["The claim is…", "the position the author wants you to accept", ["a fact from a chart", "the first word", "the setting"], "The claim is the main point."],
  ["Evidence is…", "facts, examples or data that support the claim", ["the author’s feelings", "the book’s cover", "the last sentence"], "It backs up the claim."],
  ["Reasoning is…", "the explanation of how the evidence supports the claim", ["a list of titles", "a kind of poem", "the page number"], "It connects evidence to claim."],
  ["“Cities should add more bus lanes. Buses carry many riders at once, so lanes that keep them moving help more people get to work on time.” The claim is…", "cities should add more bus lanes", ["buses carry many riders", "people get to work", "buses are big"], "The claim comes first."],
  ["“Cities should add more bus lanes. Buses carry many riders at once, so lanes that keep them moving help more people get to work on time.” The reasoning is…", "keeping buses moving helps more people arrive on time", ["cities should add lanes", "buses are red", "work is far"], "It explains why."],
  ["“School gardens help students learn. A study found that students who grew plants scored higher on a science quiz.” The evidence is…", "a study found students who grew plants scored higher", ["school gardens are fun", "students like plants", "gardens need water"], "Evidence is a fact."],
  ["“We should limit screen time at night because bright screens can make it harder to fall asleep.” The claim is…", "we should limit screen time at night", ["screens are bright", "it is hard to sleep", "night is long"], "The author wants you to agree."],
  ["Which claim could be supported by evidence about cavities and sugar?", "Eating less sugar helps protect teeth.", ["Teeth are white.", "Sugar is sweet.", "Dentists wear masks."], "The evidence should connect.", true],
  ["Evidence: Test scores rose after a school added a reading hour. Which claim does it support?", "Reading time can help students learn.", ["Tests are hard.", "Recess is short.", "Schools are large."], "Match the evidence to a claim.", true],
  ["Which is stronger evidence for “Trees cool a city”?", "Streets with trees can be several degrees cooler.", ["Trees are green.", "I like trees.", "Some trees are tall."], "Stronger evidence is specific.", true],
  ["Which is the weakest evidence?", "My cousin said so.", ["A scientist’s measurements", "Results from a survey of 500 students", "A report from the city"], "Opinions are weaker than data."],
  ["A strong argument has evidence that is…", "relevant and specific", ["vague and unrelated", "funny", "the same sentence repeated"], "Evidence must fit the claim."],
  ["Which word signals an author is giving a reason?", "because", ["although", "meanwhile", "yesterday"], "Because introduces a reason."],
  ["Which word signals an author is giving evidence?", "for example", ["in conclusion", "once upon a time", "finally"], "Examples are evidence."],
  ["What does “in conclusion” signal?", "the author is wrapping up the argument", ["the argument is starting", "a new topic", "a mistake"], "It signals the end."],
  ["Which sentence is a claim?", "Our town should build a skate park.", ["The park is on Elm Street.", "Skateboards have four wheels.", "It rained last week."], "A claim says what should happen.", true],
  ["Which sentence is reasoning?", "A skate park gives kids a safe place to practice, so fewer will skate in the street.", ["Skateboards are fast.", "The park is big.", "It will cost money."], "It explains why.", true],
  ["An author says, “Everyone knows pizza is best.” What is missing?", "evidence", ["a title", "a topic", "a rhyme"], "No facts back the claim."],
  ["The author’s purpose in an editorial is usually to…", "persuade readers", ["list ingredients", "give a recipe", "tell a bedtime story"], "Editorials argue a position."],
  ["The author’s perspective can show in…", "the words and examples the author chooses", ["the page number", "the cover color", "the paper"], "Word choice matters."],
  ["Two authors discuss the same park. One calls it “crowded.” One calls it “lively.” Why?", "they have different perspectives", ["one made a mistake", "they are not talking about it", "they are poets"], "They see it differently.", true],
  ["Which sentence shows a purpose of persuading?", "Join us and help clean the beach!", ["The beach is sandy.", "The tide came in.", "Waves are made of water."], "It asks the reader to act."],
  ["Which sentence shows a purpose of informing?", "The beach is part of a coastal ecosystem.", ["Join us at the beach!", "You must visit the beach!", "The best beach is here!"], "It gives facts."],
  ["To track an argument, a reader should…", "find the claim, then note the reasons and evidence", ["count the pages", "read only the last line", "skip the evidence"], "Follow how the argument builds."],
];

const POETRY: Q[] = [
  ["Figurative language in a poem…", "uses words in a special way to create images and feelings", ["gives exact facts only", "makes the poem a list", "removes feelings"], "It goes beyond the plain meaning."],
  ["“The moon is a silver coin in the sky.” This is a…", "metaphor", ["simile", "question", "rhyme"], "It says one thing is another."],
  ["“The wind howled like a wolf.” This is a…", "simile", ["metaphor", "rhyme", "fact"], "It uses like."],
  ["“The sun smiled down on us.” This is…", "personification", ["alliteration", "a fact", "a simile"], "The sun is given a human action."],
  ["“Silver streams sing softly.” The repeated s sounds are…", "alliteration", ["rhyme", "simile", "idiom"], "Same beginning sound."],
  ["“Boom! Crash! The thunder rolled.” “Boom” and “crash” are examples of…", "onomatopoeia", ["metaphor", "simile", "rhyme"], "They sound like what they name."],
  ["In a poem, imagery is…", "words that appeal to the senses", ["a rhyme scheme", "a title", "the poet’s name"], "It helps you see, hear or feel."],
  ["“Cold white blankets of snow” appeals to the sense of…", "sight and touch", ["taste only", "smell only", "hearing only"], "Cold and white are what you feel and see."],
  ["Which poetic element repeats a line or phrase?", "repetition", ["rhyme", "stanza", "simile"], "Repetition repeats words or lines."],
  ["Rhythm in a poem is…", "the beat of the words", ["a kind of picture", "the title", "the page"], "Think of the beat."],
  ["A stanza is…", "a group of lines in a poem", ["a rhyme", "a simile", "a title"], "Poems are built from stanzas."],
  ["The poem says, “The dawn tiptoed in.” The poet uses personification to show dawn is…", "quiet and gentle", ["loud and fast", "angry", "hungry"], "Tiptoeing is quiet.", true],
  ["“The classroom was a beehive.” The poet means the classroom was…", "busy and noisy", ["full of honey", "empty", "cold"], "A beehive buzzes with activity.", true],
  ["“Her smile was sunshine.” This metaphor shows her smile was…", "bright and warm", ["cold and dark", "tiny", "loud"], "Sunshine is bright and warm.", true],
  ["Which line uses both a simile and imagery?", "The leaves fell like golden rain.", ["The leaves fell.", "I raked the leaves.", "Leaves are plants."], "Look for like and a picture.", true],
  ["Which line uses alliteration and personification?", "The wind whispered wild wishes.", ["The wind blew hard.", "I felt the wind.", "Wind is moving air."], "Repeated w and a whispering wind.", true],
  ["Short lines and quick rhymes in a poem often create a feeling that is…", "lively", ["gloomy", "confusing", "dull"], "Short lines move fast."],
  ["A poem about a storm uses the words “crashing,” “roaring” and “slashing.” These help create a mood that is…", "wild", ["calm", "sleepy", "silly"], "The words are strong and loud."],
  ["A poem’s mood is…", "the feeling it gives the reader", ["its rhyme scheme", "its length", "its author"], "Mood is feeling."],
  ["Figurative language and imagery work together in a poem to…", "help readers picture and feel the idea", ["make the poem a list", "replace the title", "hide the meaning"], "They build meaning."],
  ["“The river is a ribbon of light.” This is a…", "metaphor", ["simile", "rhyme", "question"], "It says the river is a ribbon."],
  ["Which line is a simile?", "She ran like the wind.", ["She is the wind.", "The wind ran.", "Wind is fast."], "Look for like or as."],
  ["Which line is a metaphor?", "The classroom is a zoo.", ["The classroom is loud like a zoo.", "The classroom is quiet.", "The classroom has desks."], "It says one thing is another."],
  ["Why might a poet use a simile?", "to compare two things in a fresh way", ["to remove feelings", "to add a title", "to count lines"], "A simile creates a picture."],
  ["Which poetic elements are in “Tick, tock, tick, tock, the clock keeps time”?", "repetition and onomatopoeia", ["metaphor and simile", "imagery and a question", "rhyme only"], "Repeated sound words.", true],
];

const SOURCES: Q[] = [
  ["A primary source is…", "a firsthand account from someone who was there", ["a book written years later", "a summary of a summary", "a dictionary"], "Primary means first."],
  ["A secondary source is…", "an account written by someone who was not there", ["a diary from the time", "a photo taken that day", "a letter from a soldier"], "Secondary means second."],
  ["Which is a primary source about a 1969 moon landing?", "an astronaut’s diary from the trip", ["a school textbook chapter", "a movie from 2020", "an encyclopedia article"], "It was written by someone who was there."],
  ["Which is a secondary source about the moon landing?", "an encyclopedia article", ["a photo taken on the moon", "an astronaut’s radio recording", "an astronaut’s diary"], "It was written afterward."],
  ["A letter written by a pioneer on the trail is a…", "primary source", ["secondary source", "fiction", "poem"], "Written by someone who was there."],
  ["A modern book about pioneers is a…", "secondary source", ["primary source", "diary", "map from the time"], "Written later by someone not there."],
  ["A photograph taken during a hurricane is a…", "primary source", ["secondary source", "textbook", "legend"], "Taken at the time."],
  ["A news article written the next day by a reporter who saw the storm is…", "primary", ["secondary", "fiction", "a poem"], "The reporter was there.", true],
  ["A history book that summarizes many sources is…", "secondary", ["primary", "a diary", "a letter"], "It reports what others found."],
  ["Which pair are both primary sources?", "a diary and a photo from the day", ["a textbook and an encyclopedia", "a diary and a textbook", "a photo and a summary"], "Both come from the time.", true],
  ["Which pair are both secondary sources?", "a textbook and an encyclopedia", ["a diary and a letter", "a photo and a diary", "a letter and a map from the time"], "Both were written later.", true],
  ["Why are primary sources useful?", "they show what people saw and felt at the time", ["they are always longer", "they are always right", "they have no author"], "They are firsthand."],
  ["Why are secondary sources useful?", "they gather and explain information from many sources", ["they were there", "they are always shorter", "they contain no facts"], "They explain the big picture."],
  ["Two accounts of a flood disagree on the water’s height. A reader should…", "check more sources", ["pick one at random", "stop reading", "believe the longer one"], "Compare sources.", true],
  ["An account by a person who was not there is most likely to…", "include details gathered from others", ["include only what the writer saw", "be a diary", "be a photo"], "It is secondhand.", true],
  ["How could a primary source be biased?", "the writer may tell only their own view", ["it has no words", "it has no author", "it is too old"], "People see events differently.", true],
  ["To compare a primary and a secondary source about the same event, look for…", "what is the same and what is different", ["only the title", "the page count", "the cover"], "Compare details."],
  ["A secondary source usually has been written…", "after the event", ["during the event", "before the event", "while the writer was there"], "Later."],
  ["A museum shows a soldier’s uniform from long ago. It is…", "a primary source", ["a secondary source", "a poem", "a rumor"], "It is an object from the time."],
  ["An interview with a person who lived through an event is a…", "primary source", ["secondary source", "textbook", "legend"], "The person was there."],
  ["A website that explains an event for students is probably…", "a secondary source", ["a primary source", "a diary", "a letter"], "It is written by someone later."],
  ["Which question helps decide if a source is primary?", "Was the writer there?", ["Is the text long?", "Is it in color?", "Is it a book?"], "Primary means firsthand."],
  ["Both a diary and a textbook describe a storm. The diary may include…", "personal feelings", ["a bibliography", "an index", "page numbers"], "Diaries share personal thoughts."],
  ["Both sources agree that the storm began at night. This makes the information…", "more trustworthy", ["less trustworthy", "fiction", "irrelevant"], "Agreement adds confidence.", true],
  ["A reader compares a primary and a secondary source to…", "get a fuller picture of the topic", ["avoid facts", "shorten the text", "choose a title"], "Each adds something."],
];

export const UNITS: Unit[] = [
  bankUnit({
    id: "fl-g5-tracking-arguments",
    title: "Tracking an Argument",
    emoji: "⚖️",
    blurb: "Find the claim, the evidence and the reasoning.",
    parentNote:
      "Florida’s Grade 5 standards ask children to track the development of an argument, identifying the specific claim, evidence and reasoning, and to analyze an author’s purpose and perspective. Children read short arguments and name each part and judge how strong the evidence is.",
    standards: ["ELA.5.R.2.4; ELA.5.R.2.3", "an argument’s claim, evidence and reasoning, and an author’s purpose and perspective"],
    items: ARGUMENT,
  }),
  bankUnit({
    id: "fl-g5-poetic-elements",
    title: "Poetic Elements",
    emoji: "🌙",
    blurb: "Figurative language, imagery, rhythm and mood in poems.",
    parentNote:
      "Florida’s Grade 5 standards ask children to explain how figurative language and other poetic elements work together in a poem. Children read short original lines and name the simile, metaphor, personification, alliteration or imagery and what it makes them see and feel.",
    standards: ["ELA.5.R.1.4; ELA.5.R.3.1", "figurative language and poetic elements working together in a poem"],
    items: POETRY,
  }),
  bankUnit({
    id: "fl-g5-primary-and-secondary",
    title: "Primary & Secondary Sources",
    emoji: "📜",
    blurb: "Who was there, and who wrote about it later.",
    parentNote:
      "Florida’s Grade 5 standards ask children to compare and contrast primary and secondary sources related to the same topic. Children decide whether a source is firsthand or secondhand and tell why each kind is useful.",
    standards: ["ELA.5.R.3.3", "comparing and contrasting primary and secondary sources on the same topic"],
    items: SOURCES,
  }),
];
/** Put the own units before the planned ones. */
export const FIRST = false;
