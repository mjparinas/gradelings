import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Rhode Island Kindergarten social studies: shared holidays, traditions and symbols (SSK.2.4) and roles in the community
// and community citizenship (SSK.3.2), with the American flag and Rhode Island's own flag and symbols, and the leaders
// children meet, from the teacher and principal to the mayor and town council.

const FLAG: Q[] = [
  ["Our country is the…", "United States", ["Rhode Island", "Narragansett Bay", "Providence"], "Rhode Island is our state."],
  ["Our state is…", "Rhode Island", ["the United States", "Narragansett Bay", "the moon"], "Our state is in our country."],
  ["The American flag has red and white…", "stripes", ["circles", "triangles", "hearts"], "There are 13 of them."],
  ["The American flag has white stars on…", "blue", ["green", "orange", "pink"], "Look at the top corner."],
  ["How many stars are on the American flag?", "50", ["13", "5", "100"], "One star for each state."],
  ["Each star on the flag stands for a…", "state", ["city", "river", "school"], "Rhode Island has a star too."],
  ["The flag is a symbol of our…", "country", ["school bus", "lunch", "toys"], "It stands for the United States."],
  ["We say the Pledge of Allegiance to the…", "flag", ["bus", "teacher", "river"], "We stand and face it."],
  ["What colors are on the American flag?", "red, white and blue", ["green and yellow", "pink and purple", "black and orange"], "Think of the stars and stripes."],
  ["Where do you often see the flag?", "at school", ["in the bathtub", "in a sandwich", "in a sock"], "Many schools fly it outside."],
  ["Rhode Island's flag shows a gold…", "anchor", ["fish", "heart", "car"], "Ships use anchors to stay in place."],
  ["The word on Rhode Island's flag is…", "Hope", ["Stop", "Go", "Hello"], "Hope is the state's motto."],
  ["Rhode Island's state bird is a chicken called the Rhode Island…", "Red", ["Blue", "Green", "Purple"], "It is named for its red-brown feathers."],
  ["Rhode Island's state flower is the…", "violet", ["cactus", "sunflower", "seaweed"], "It is a small purple flower."],
  ["Rhode Island's nickname is the… State.", "Ocean", ["Desert", "Mountain", "Snow"], "Rhode Island has lots of coast."],
  ["Who leads our classroom?", "the teacher", ["the bus", "a puppy", "the lunch box"], "Teachers help us learn."],
  ["Who leads our whole school?", "the principal", ["the mayor", "a pilot", "a baker"], "The principal helps everyone at school."],
  ["Who leads many cities, like Providence?", "a mayor", ["a pirate", "a clown", "a dentist"], "Voters choose the mayor."],
  ["We stand up when we say the Pledge because we show…", "respect", ["we are sleepy", "it is lunch", "we are cold"], "Standing shows we care."],
  ["The flag goes up the pole in the…", "morning", ["middle of the night", "bathtub", "sandbox"], "Many schools raise it each day."],
  ["Many Rhode Island towns are led by a group of people called a town…", "council", ["band", "team", "orchestra"], "Voters choose the council members.", true],
  ["Rhode Island's state tree is the red…", "maple", ["palm", "banana", "cactus"], "Its leaves turn red in the fall.", true],
  ["The stripes on the flag stand for the first 13…", "colonies", ["rivers", "presidents", "flowers"], "The colonies became states.", true],
  ["Providence is the capital of…", "Rhode Island", ["the moon", "the ocean", "Canada"], "State leaders work there.", true],
  ["The bald eagle is a symbol of the…", "United States", ["moon", "ocean", "winter"], "It is our national bird.", true],
  ["A flag is a symbol. A symbol is something that…", "stands for something else", ["is good to eat", "makes noise", "is a toy"], "The flag stands for our country.", true],
  ["Rhode Island's state drink is coffee…", "milk", ["juice", "soup", "soda"], "It is milk mixed with sweet coffee syrup.", true],
  ["The 13 gold stars on Rhode Island's flag stand for the first 13…", "states", ["oceans", "teachers", "birds"], "Rhode Island was one of the first 13.", true],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "ri-k-flag-and-state",
    title: "Our Flag & Our State",
    emoji: "🇺🇸",
    blurb: "The American flag and Rhode Island's symbols",
    parentNote: "The American flag as a symbol of the United States (its stars and stripes and the Pledge of Allegiance), Rhode Island as our state, with its anchor flag, the motto Hope and a few of its symbols (the Rhode Island Red, the violet, the red maple and coffee milk), and the leaders children meet, from teachers and principals to mayors and town councils.",
    standards: ["SSK.2.4; SSK.3.2", "shared holidays, traditions and symbols, and roles in the community and community citizenship"],
    items: FLAG,
  }),
];
