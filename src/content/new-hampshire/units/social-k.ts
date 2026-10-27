import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// New Hampshire Kindergarten social studies: the documents and symbols of the United States, such as the flag, the bald
// eagle and the Pledge of Allegiance (SS:CV:2:1.2), and national and New Hampshire symbols and celebrations
// (SS:HI:2:1.1), with New Hampshire's own flag and symbols and the leaders children meet.

const FLAG: Q[] = [
  ["Our country is the…", "United States", ["New Hampshire", "Lake Winnipesaukee", "Concord"], "New Hampshire is our state."],
  ["Our state is…", "New Hampshire", ["the United States", "Mount Washington", "the moon"], "Our state is in our country."],
  ["The American flag has red and white…", "stripes", ["circles", "triangles", "hearts"], "There are 13 of them."],
  ["The American flag has white stars on…", "blue", ["green", "orange", "pink"], "Look at the top corner."],
  ["How many stars are on the American flag?", "50", ["13", "5", "100"], "One star for each state."],
  ["Each star on the flag stands for a…", "state", ["city", "river", "school"], "New Hampshire has a star too."],
  ["The flag is a symbol of our…", "country", ["school bus", "lunch", "toys"], "It stands for the United States."],
  ["We say the Pledge of Allegiance to the…", "flag", ["bus", "teacher", "river"], "We stand and face it."],
  ["What colors are on the American flag?", "red, white and blue", ["green and yellow", "pink and purple", "black and orange"], "Think of the stars and stripes."],
  ["Where do you often see the flag?", "at school", ["in the bathtub", "in a sandwich", "in a sock"], "Many schools fly it outside."],
  ["New Hampshire's flag is blue with a picture of a…", "sailing ship", ["fish", "rocket", "car"], "The ship was built in Portsmouth long ago."],
  ["Our state bird is a small, reddish bird. It is the purple…", "finch", ["penguin", "parrot", "ostrich"], "It sings in New Hampshire's woods."],
  ["New Hampshire's state flower smells sweet in spring. It is the purple…", "lilac", ["cactus", "tulip", "seaweed"], "Lilac bushes grow by many old farmhouses."],
  ["New Hampshire's state tree has white bark. It is the white…", "birch", ["palm", "banana", "cactus"], "You can spot it in the woods by its white bark."],
  ["New Hampshire's nickname is the Granite…", "State", ["Ocean", "Desert", "Sock"], "Granite is a hard rock found all over New Hampshire."],
  ["Who leads our classroom?", "the teacher", ["the bus", "a puppy", "the lunch box"], "Teachers help us learn."],
  ["Who leads our whole school?", "the principal", ["the governor", "a pilot", "a baker"], "The principal helps everyone at school."],
  ["Who leads our whole state?", "the governor", ["a pirate", "a clown", "a dentist"], "Voters choose the governor."],
  ["We stand up when we say the Pledge because we show…", "respect", ["we are sleepy", "it is lunch", "we are cold"], "Standing shows we care."],
  ["The flag goes up the pole in the…", "morning", ["middle of the night", "bathtub", "sandbox"], "Many schools raise it each day."],
  ["New Hampshire's state animal is the white-tailed…", "deer", ["shark", "whale", "penguin"], "It lifts its white tail when it runs.", true],
  ["New Hampshire's state insect is red with black spots. It is the…", "ladybug", ["bee", "ant", "fly"], "Ladybugs eat tiny bugs in gardens.", true],
  ["The stripes on the flag stand for the first 13…", "colonies", ["rivers", "presidents", "flowers"], "The colonies became states. New Hampshire was one of them.", true],
  ["Concord is the capital of…", "New Hampshire", ["the moon", "the ocean", "the sun"], "State leaders work there.", true],
  ["The bald eagle is a symbol of the…", "United States", ["moon", "ocean", "winter"], "It is our national bird.", true],
  ["A flag is a symbol. A symbol is something that…", "stands for something else", ["is good to eat", "makes noise", "is a toy"], "The flag stands for our country.", true],
  ["Grown-ups in many towns meet once a year to vote. This is called town…", "meeting", ["parade", "picnic", "recess"], "Grown-ups make decisions together.", true],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "nh-k-flag-and-state",
    title: "Our Flag & Our State",
    emoji: "🇺🇸",
    blurb: "The American flag and New Hampshire's symbols",
    parentNote: "The American flag as a symbol of the United States (its stars and stripes and the Pledge of Allegiance), New Hampshire as our state, with its flag and a few of its symbols (the purple finch, the purple lilac, the white birch and the Granite State), and the leaders children meet, from teachers and principals to the governor.",
    standards: ["SS:CV:2:1.2; SS:HI:2:1.1", "the symbols that stand for the United States, such as the flag and the bald eagle, and national and New Hampshire celebrations and symbols"],
    items: FLAG,
  }),
];
