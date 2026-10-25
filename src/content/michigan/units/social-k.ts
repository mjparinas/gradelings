import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Michigan Kindergarten social studies, Myself and Others: the American flag as a symbol of the United States
// (K – C2.0.1), with Michigan as the state children live in and a few of its symbols.

const FLAG: Q[] = [
  ["Our country is the…", "United States", ["Michigan", "Lake Huron", "Detroit"], "Michigan is our state."],
  ["Our state is…", "Michigan", ["the United States", "Lake Superior", "Canada"], "Our state is in our country."],
  ["The American flag has red and white…", "stripes", ["circles", "triangles", "hearts"], "There are 13 of them."],
  ["The American flag has white stars on…", "blue", ["green", "orange", "pink"], "Look at the top corner."],
  ["How many stars are on the American flag?", "50", ["13", "5", "100"], "One star for each state."],
  ["Each star on the flag stands for a…", "state", ["city", "lake", "school"], "Michigan has a star too."],
  ["The flag is a symbol of our…", "country", ["school bus", "lunch", "toys"], "It stands for the United States."],
  ["We say the Pledge of Allegiance to the…", "flag", ["bus", "teacher", "lake"], "We stand and face it."],
  ["What colors are on the American flag?", "red, white and blue", ["green and yellow", "pink and purple", "black and orange"], "Think of the stars and stripes."],
  ["Where do you often see the flag?", "at school", ["in the bathtub", "in a sandwich", "in a sock"], "Many schools fly it outside."],
  ["Michigan has many big…", "lakes", ["deserts", "volcanoes", "glaciers"], "It is the Great Lakes State."],
  ["Michigan's state bird is the…", "robin", ["penguin", "parrot", "ostrich"], "It has a red-orange chest."],
  ["Michigan's state flower is the…", "apple blossom", ["cactus flower", "palm leaf", "seaweed"], "It grows on apple trees."],
  ["The shape of Michigan's Lower Peninsula looks like a…", "mitten", ["boot", "star", "fish"], "Hold up your hand!"],
  ["Which is a lake that touches Michigan?", "Lake Michigan", ["the Pacific", "the Nile", "the Amazon"], "It has the same name as our state."],
  ["The big bridge that joins Michigan's two parts is the…", "Mackinac Bridge", ["Golden Gate", "Tower Bridge", "London Bridge"], "Say it MACK-in-aw."],
  ["We stand up when we say the Pledge because we show…", "respect", ["we are sleepy", "it is lunch", "we are cold"], "Standing shows we care."],
  ["The flag goes up the pole in the…", "morning", ["middle of the night", "bathtub", "sandbox"], "Many schools raise it each day."],
  ["Michigan's state tree is the…", "white pine", ["palm tree", "cactus", "banana tree"], "It is a tall evergreen.", true],
  ["Michigan's state fish is the…", "brook trout", ["shark", "goldfish", "whale"], "It lives in cold streams.", true],
  ["The stripes on the flag stand for the first 13…", "colonies", ["lakes", "presidents", "flowers"], "The colonies became states.", true],
  ["Lansing is the capital of…", "Michigan", ["the moon", "the ocean", "Canada"], "State leaders work there.", true],
  ["The bald eagle is a symbol of the…", "United States", ["moon", "ocean", "winter"], "It is our national bird.", true],
  ["A flag is a symbol. A symbol is something that…", "stands for something else", ["is good to eat", "makes noise", "is a toy"], "The flag stands for our country.", true],
  ["Michigan's state stone has the name of a town. It is the…", "Petoskey stone", ["Moon stone", "Lucky stone", "Lake stone"], "It has a pattern like little stars.", true],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "mi-k-flag-and-state",
    title: "Our Flag & Our State",
    emoji: "🇺🇸",
    blurb: "The American flag and Michigan's symbols",
    parentNote: "The American flag as a symbol of the United States (its stars and stripes and the Pledge of Allegiance), and Michigan as our state, with a few of its symbols: the robin, the apple blossom and the mitten-shaped Lower Peninsula.",
    standards: ["K-C2.0.1", "identifying the American flag as an important symbol of the United States"],
    items: FLAG,
  }),
];
