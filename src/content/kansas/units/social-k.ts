import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Kansas Kindergarten social studies, Sense of Self: the symbols children meet at school and in their state, as the
// Kansas History, Government, and Social Studies Standards' Kindergarten history unit suggests ("They will recognize
// significant Kansas events, symbols, and family customs"), the American flag and Kansas's own flag and symbols.

const FLAG: Q[] = [
  ["Our country is the…", "United States", ["Kansas", "Topeka", "Wichita"], "Kansas is our state."],
  ["Our state is…", "Kansas", ["the United States", "the Flint Hills", "the moon"], "Our state is in our country."],
  ["The American flag has red and white…", "stripes", ["circles", "triangles", "hearts"], "There are 13 of them."],
  ["The American flag has white stars on…", "blue", ["green", "orange", "pink"], "Look at the top corner."],
  ["How many stars are on the American flag?", "50", ["13", "5", "100"], "One star for each state."],
  ["Each star on the flag stands for a…", "state", ["city", "lake", "school"], "Kansas has a star too."],
  ["The flag is a symbol of our…", "country", ["school bus", "lunch", "toys"], "It stands for the United States."],
  ["We say the Pledge of Allegiance to the…", "flag", ["bus", "teacher", "lake"], "We stand and face it."],
  ["What colors are on the American flag?", "red, white and blue", ["green and yellow", "pink and purple", "black and orange"], "Think of the stars and stripes."],
  ["Where do you often see the flag?", "at school", ["in the bathtub", "in a sandwich", "in a sock"], "Many schools fly it outside."],
  ["The Kansas flag is blue with a big yellow…", "sunflower", ["moon", "fish", "heart"], "It sits above the state seal."],
  ["Kansas is called the Sunflower…", "State", ["Ocean", "Moon", "Sock"], "Wild sunflowers grow all over Kansas."],
  ["The Kansas state bird is the western…", "meadowlark", ["penguin", "parrot", "ostrich"], "It has a yellow chest and sings."],
  ["The Kansas state flower is the wild…", "sunflower", ["rose", "palm leaf", "seaweed"], "It turns to face the sun."],
  ["The Kansas state animal is the big, shaggy…", "bison", ["shark", "whale", "penguin"], "Many people call it a buffalo."],
  ["Kansas farms grow lots of…", "wheat", ["coconuts", "bananas", "pineapples"], "Wheat is made into flour for bread."],
  ["We stand up when we say the Pledge because we show…", "respect", ["we are sleepy", "it is lunch", "we are cold"], "Standing shows we care."],
  ["The flag goes up the pole in the…", "morning", ["middle of the night", "bathtub", "sandbox"], "Many schools raise it each day."],
  ["The Kansas state tree is the…", "cottonwood", ["palm", "banana", "apple"], "It grows tall beside rivers.", true],
  ["The Kansas state reptile is the ornate box…", "turtle", ["crocodile", "frog", "dolphin"], "It carries its home on its back.", true],
  ["The stripes on the flag stand for the first 13…", "colonies", ["lakes", "presidents", "flowers"], "The colonies became states.", true],
  ["Topeka is the capital of…", "Kansas", ["the moon", "the ocean", "Mexico"], "State leaders work there.", true],
  ["The bald eagle is a symbol of the…", "United States", ["moon", "ocean", "winter"], "It is our national bird.", true],
  ["A flag is a symbol. A symbol is something that…", "stands for something else", ["is good to eat", "makes noise", "is a toy"], "The flag stands for our country.", true],
  ["On Kansas Day, January 29, we remember when Kansas became a…", "state", ["city", "lake", "school"], "Kansas has a birthday too.", true],
  ["The Kansas state song is Home on the…", "Range", ["Moon", "Beach", "Bus"], "It is about the open prairie.", true],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "ks-k-flag-and-state",
    title: "Our Flag & Our State",
    emoji: "🇺🇸",
    blurb: "The American flag and Kansas's symbols",
    parentNote: "The American flag as a symbol of the United States (its stars and stripes and the Pledge of Allegiance), and Kansas as our state, with its flag and a few of its symbols: the sunflower, the western meadowlark, the bison, the cottonwood and Kansas Day on January 29.",
    standards: ["1.1", "recognizing significant Kansas symbols and events, such as the American flag, Kansas's flag and symbols, and Kansas Day"],
    items: FLAG,
  }),
];
