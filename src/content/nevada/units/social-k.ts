import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Nevada Kindergarten social studies, Building Community: symbols children meet at school and in their state
// (SS.K.12), the American flag and Nevada's own flag and symbols.

const FLAG: Q[] = [
  ["Our country is the…", "United States", ["Nevada", "Lake Tahoe", "Las Vegas"], "Nevada is our state."],
  ["Our state is…", "Nevada", ["the United States", "Lake Mead", "the moon"], "Our state is in our country."],
  ["The American flag has red and white…", "stripes", ["circles", "triangles", "hearts"], "There are 13 of them."],
  ["The American flag has white stars on…", "blue", ["green", "orange", "pink"], "Look at the top corner."],
  ["How many stars are on the American flag?", "50", ["13", "5", "100"], "One star for each state."],
  ["Each star on the flag stands for a…", "state", ["city", "lake", "school"], "Nevada has a star too."],
  ["The flag is a symbol of our…", "country", ["school bus", "lunch", "toys"], "It stands for the United States."],
  ["We say the Pledge of Allegiance to the…", "flag", ["bus", "teacher", "lake"], "We stand and face it."],
  ["What colors are on the American flag?", "red, white and blue", ["green and yellow", "pink and purple", "black and orange"], "Think of the stars and stripes."],
  ["Where do you often see the flag?", "at school", ["in the bathtub", "in a sandwich", "in a sock"], "Many schools fly it outside."],
  ["Nevada's flag is blue with a silver…", "star", ["moon", "fish", "heart"], "The word Nevada is under it."],
  ["Nevada's flag says Battle Born. Nevada became a state during a…", "war", ["snowstorm", "party", "parade"], "It joined during the Civil War."],
  ["Nevada's state bird is the mountain…", "bluebird", ["penguin", "parrot", "ostrich"], "It is bright blue."],
  ["Nevada's state flower is the…", "sagebrush", ["rose", "palm leaf", "seaweed"], "It smells fresh after rain."],
  ["Nevada's state animal is the desert bighorn…", "sheep", ["shark", "whale", "penguin"], "It has big curled horns."],
  ["Nevada's nickname is the Silver…", "State", ["Ocean", "Moon", "Sock"], "Silver was found in its hills."],
  ["Much of Nevada is a dry…", "desert", ["jungle", "ocean", "glacier"], "It gets very little rain."],
  ["We stand up when we say the Pledge because we show…", "respect", ["we are sleepy", "it is lunch", "we are cold"], "Standing shows we care."],
  ["The flag goes up the pole in the…", "morning", ["middle of the night", "bathtub", "sandbox"], "Many schools raise it each day."],
  ["Nevada has two state trees. One is the bristlecone…", "pine", ["palm", "banana", "apple"], "Some of them are very, very old.", true],
  ["Nevada's state reptile is the desert…", "tortoise", ["crocodile", "frog", "dolphin"], "It carries its home on its back.", true],
  ["The stripes on the flag stand for the first 13…", "colonies", ["lakes", "presidents", "flowers"], "The colonies became states.", true],
  ["Carson City is the capital of…", "Nevada", ["the moon", "the ocean", "Mexico"], "State leaders work there.", true],
  ["The bald eagle is a symbol of the…", "United States", ["moon", "ocean", "winter"], "It is our national bird.", true],
  ["A flag is a symbol. A symbol is something that…", "stands for something else", ["is good to eat", "makes noise", "is a toy"], "The flag stands for our country.", true],
  ["On Nevada Day in October, we remember when Nevada became a…", "state", ["city", "lake", "school"], "Nevada's birthday is October 31.", true],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "nv-k-flag-and-state",
    title: "Our Flag & Our State",
    emoji: "🇺🇸",
    blurb: "The American flag and Nevada's symbols",
    parentNote: "The American flag as a symbol of the United States (its stars and stripes and the Pledge of Allegiance), and Nevada as our state, with its flag and a few of its symbols: the mountain bluebird, the sagebrush, the desert bighorn sheep and Nevada Day.",
    standards: ["SS.K.12", "identifying cultural events, holidays and symbols, such as the American flag and Nevada's symbols"],
    items: FLAG,
  }),
];
