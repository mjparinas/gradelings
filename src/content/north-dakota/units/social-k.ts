import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// North Dakota Kindergarten social studies, my family: the core values the symbols of the United States stand for
// (C.K_2.4) and rules and the people who lead (C.K_2.1), with the American flag and North Dakota's own flag and symbols,
// and the leaders children meet, from the teacher and principal to the mayor and the governor.

const FLAG: Q[] = [
  ["Our country is the…", "United States", ["North Dakota", "Missouri River", "Bismarck"], "North Dakota is our state."],
  ["Our state is…", "North Dakota", ["the United States", "the Missouri River", "the moon"], "Our state is in our country."],
  ["The American flag has red and white…", "stripes", ["circles", "triangles", "hearts"], "There are 13 of them."],
  ["The American flag has white stars on…", "blue", ["green", "orange", "pink"], "Look at the top corner."],
  ["How many stars are on the American flag?", "50", ["13", "5", "100"], "One star for each state."],
  ["Each star on the flag stands for a…", "state", ["city", "river", "school"], "North Dakota has a star too."],
  ["The flag is a symbol of our…", "country", ["school bus", "lunch", "toys"], "It stands for the United States."],
  ["We say the Pledge of Allegiance to the…", "flag", ["bus", "teacher", "river"], "We stand and face it."],
  ["What colors are on the American flag?", "red, white and blue", ["green and yellow", "pink and purple", "black and orange"], "Think of the stars and stripes."],
  ["Where do you often see the flag?", "at school", ["in the bathtub", "in a sandwich", "in a sock"], "Many schools fly it outside."],
  ["North Dakota's flag shows a big bird called an…", "eagle", ["owl", "duck", "parrot"], "The eagle is on a blue flag."],
  ["North Dakota's flag is mostly…", "blue", ["pink", "green", "orange"], "A bird sits in the middle of the blue."],
  ["North Dakota's state bird sings on the prairie. It is the western…", "meadowlark", ["penguin", "flamingo", "peacock"], "It has a yellow chest."],
  ["North Dakota's state flower is the wild prairie…", "rose", ["cactus", "tulip", "seaweed"], "It is a small pink flower."],
  ["North Dakota is called the Peace… State.", "Garden", ["Ocean", "Desert", "Volcano"], "A big flower garden stands for peace."],
  ["Who leads our classroom?", "the teacher", ["the bus", "a puppy", "the lunch box"], "Teachers help us learn."],
  ["Who leads our whole school?", "the principal", ["the mayor", "a pilot", "a baker"], "The principal helps everyone at school."],
  ["Who leads a city, like Fargo or Bismarck?", "a mayor", ["a pirate", "a clown", "a dentist"], "Voters choose the mayor."],
  ["Who leads our whole state?", "the governor", ["the teacher", "the bus driver", "a farmer"], "The governor works in Bismarck."],
  ["Why do we have rules at school?", "to keep us safe and fair", ["to make us sad", "to stop all play", "to be noisy"], "Rules help everyone."],
  ["We stand up when we say the Pledge because we show…", "respect", ["we are sleepy", "it is lunch", "we are cold"], "Standing shows we care."],
  ["The flag goes up the pole in the…", "morning", ["middle of the night", "bathtub", "sandbox"], "Many schools raise it each day."],
  ["North Dakota's capital city is…", "Bismarck", ["Paris", "the moon", "the ocean"], "State leaders work there.", true],
  ["North Dakota's state tree is the American…", "elm", ["palm", "banana tree", "cactus"], "Elm trees give lots of shade.", true],
  ["The stripes on the flag stand for the first 13…", "colonies", ["rivers", "presidents", "flowers"], "The colonies became states.", true],
  ["The bald eagle is a symbol of the…", "United States", ["moon", "ocean", "winter"], "It is our national bird.", true],
  ["A flag is a symbol. A symbol is something that…", "stands for something else", ["is good to eat", "makes noise", "is a toy"], "The flag stands for our country.", true],
  ["North Dakota's state drink is…", "milk", ["juice", "soup", "soda"], "Dairy farms in the state make it.", true],
  ["The Liberty Bell is a symbol of…", "freedom", ["winter", "lunch", "sleep"], "Liberty means freedom.", true],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "nd-k-flag-and-state",
    title: "Our Flag & Our State",
    emoji: "🇺🇸",
    blurb: "The American flag and North Dakota's symbols",
    parentNote: "The American flag as a symbol of the United States (its stars and stripes and the Pledge of Allegiance), North Dakota as our state, with its blue eagle flag and a few of its symbols (the western meadowlark, the wild prairie rose, the American elm and milk), and the people who lead: the teacher, the principal, the mayor and the governor.",
    standards: ["C.K_2.4; C.K_2.1", "the values the symbols of the United States stand for, and rules and positions of authority"],
    items: FLAG,
  }),
];
