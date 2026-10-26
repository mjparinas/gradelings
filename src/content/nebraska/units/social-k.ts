import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Nebraska Kindergarten social studies, Myself and Others: the patriotic symbols children meet at school (SS K.1.2.b,
// the U.S. flag and the Pledge of Allegiance; SS K.4.3.b, symbols of the United States) and Nebraska as their own
// state, with its capital and a few of its symbols.

const FLAG: Q[] = [
  ["Our country is the…", "United States", ["Nebraska", "Lincoln", "Omaha"], "Nebraska is our state."],
  ["Our state is…", "Nebraska", ["the United States", "the Sandhills", "the moon"], "Our state is in our country."],
  ["The American flag has red and white…", "stripes", ["circles", "triangles", "hearts"], "There are 13 of them."],
  ["The American flag has white stars on…", "blue", ["green", "orange", "pink"], "Look at the top corner."],
  ["How many stars are on the American flag?", "50", ["13", "5", "100"], "One star for each state."],
  ["Each star on the flag stands for a…", "state", ["city", "lake", "school"], "Nebraska has a star too."],
  ["The flag is a symbol of our…", "country", ["school bus", "lunch", "toys"], "It stands for the United States."],
  ["We say the Pledge of Allegiance to the…", "flag", ["bus", "teacher", "lake"], "We stand and face it."],
  ["What colors are on the American flag?", "red, white and blue", ["green and yellow", "pink and purple", "black and orange"], "Think of the stars and stripes."],
  ["Where do you often see the flag?", "at school", ["in the bathtub", "in a sandwich", "in a sock"], "Many schools fly it outside."],
  ["The Nebraska flag is blue with the state… in the middle.", "seal", ["fish", "moon", "heart"], "The seal is gold and silver."],
  ["Nebraska is called the Cornhusker…", "State", ["Ocean", "Moon", "Sock"], "Husking means pulling the leaves off corn."],
  ["The Nebraska state bird is the western…", "meadowlark", ["penguin", "parrot", "ostrich"], "It has a yellow chest and sings."],
  ["The Nebraska state flower is the yellow…", "goldenrod", ["rose", "palm leaf", "seaweed"], "It blooms in late summer."],
  ["Nebraska farms grow lots of…", "corn", ["coconuts", "bananas", "pineapples"], "Corn grows tall in summer."],
  ["Many Nebraska ranches raise…", "cattle", ["penguins", "camels", "sharks"], "Cows eat grass on the ranch."],
  ["We stand up when we say the Pledge because we show…", "respect", ["we are sleepy", "it is lunch", "we are cold"], "Standing shows we care."],
  ["The flag goes up the pole in the…", "morning", ["middle of the night", "bathtub", "sandbox"], "Many schools raise it each day."],
  ["The Nebraska state tree is the…", "cottonwood", ["palm", "banana", "apple"], "It grows tall beside rivers.", true],
  ["The Nebraska state insect is the busy…", "honeybee", ["mosquito", "housefly", "ant"], "It makes honey.", true],
  ["The stripes on the flag stand for the first 13…", "colonies", ["lakes", "presidents", "flowers"], "The colonies became states.", true],
  ["Lincoln is the capital of…", "Nebraska", ["the moon", "the ocean", "Mexico"], "State leaders work there.", true],
  ["The bald eagle is a symbol of the…", "United States", ["moon", "ocean", "winter"], "It is our national bird.", true],
  ["A flag is a symbol. A symbol is something that…", "stands for something else", ["is good to eat", "makes noise", "is a toy"], "The flag stands for our country.", true],
  ["On Arbor Day, which began in Nebraska, people plant…", "trees", ["candy", "rocks", "toys"], "Trees give shade and homes for birds.", true],
  ["The Nebraska state song is Beautiful…", "Nebraska", ["Moon", "Beach", "Bus"], "It is about our state.", true],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "neb-k-flag-and-state",
    title: "Our Flag & Our State",
    emoji: "🇺🇸",
    blurb: "The American flag and Nebraska's symbols",
    parentNote: "The American flag as a symbol of the United States (its stars and stripes and the Pledge of Allegiance), and Nebraska as our state, with its flag, its capital, Lincoln, and a few of its symbols: the western meadowlark, the goldenrod, the cottonwood, the honeybee and Arbor Day, which began in Nebraska.",
    standards: ["SS K.1.2.b; SS K.4.3.b", "patriotic symbols, songs and actions, such as the U.S. flag and the Pledge of Allegiance, and symbols of the United States and of Nebraska"],
    items: FLAG,
  }),
];
