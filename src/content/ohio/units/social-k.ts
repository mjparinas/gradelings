import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Ohio Kindergarten social studies: Ohio is a state in the United States, with symbols and practices that stand for
// the state and the country (Statement 6). Prompts stay short for little kids.

const SYMBOLS: Q[] = [
  ["What is the name of our state?", "Ohio", ["Lakeland", "Sunnyvale"], "It is named after a big river."],
  ["Ohio is one of the states in the…", "United States", ["ocean", "moon"], "There are 50 states."],
  ["Ohio's capital city is…", "Columbus", ["Toledo", "Akron"], "The state's leaders work there."],
  ["Ohio's state bird is the…", "cardinal", ["robin", "blue jay"], "It is bright red."],
  ["Ohio's state flower is the red…", "carnation", ["tulip", "daisy"], "It is red and frilly."],
  ["Ohio's state tree is the…", "buckeye", ["palm tree", "cactus"], "Its nuts look like a deer's eye."],
  ["Ohio is called the… State.", "Buckeye", ["Sunshine", "Lone Star"], "It is named after a tree."],
  ["Ohio's state animal is the…", "white-tailed deer", ["lion", "penguin"], "It has a white tail."],
  ["Ohio's state bug is the…", "ladybug", ["bee", "ant"], "It is red with black spots."],
  ["Ohio's flag is shaped like…", "a swallow's tail", ["a circle", "a star"], "It has two points on one end."],
  ["How many stars are on Ohio's flag?", "17", ["50", "3"], "Ohio was the 17th state."],
  ["The flag of our country is the…", "Stars and Stripes", ["Maple Leaf", "Rising Sun"], "It has 50 stars."],
  ["How many stars are on the United States flag?", "50", ["17", "13"], "One star for each state."],
  ["Which big lake is next to Ohio?", "Lake Erie", ["Lake Tahoe", "the Dead Sea"], "It is in the north."],
  ["Which river is on Ohio's southern edge?", "the Ohio River", ["the Nile", "the Amazon"], "Our state shares its name."],
  ["Where do Ohio's leaders meet?", "the Statehouse", ["the zoo", "the beach"], "It is in Columbus."],
  ["We say the Pledge of Allegiance to the…", "flag", ["school bus", "cafeteria"], "Hand on heart.", true],
  ["The bald eagle is a symbol of…", "the United States", ["only Ohio", "a sports team"], "It is our national bird.", true],
  ["What do we do on the Fourth of July?", "celebrate our country's birthday", ["start school", "plant snow"], "It is Independence Day.", true],
  ["The Liberty Bell is a symbol of…", "freedom", ["breakfast", "rain"], "It has a crack in it.", true],
  ["The leader of Ohio is the…", "governor", ["king", "captain"], "The leader of our country is the President.", true],
  ["The leader of our country is the…", "President", ["governor", "mayor"], "The President lives in the White House.", true],
  ["Why do states have symbols, like a state bird?", "to show what is special there", ["to make rain", "to count shoes"], "Symbols stand for a place.", true],
  ["Two brothers from Ohio built the first…", "airplane", ["boat", "train"], "They were the Wright brothers.", true],
  ["A cardinal, Ohio's state bird, is a kind of…", "bird", ["fish", "bug"], "It sings in Ohio's trees.", true],
];

export const SOCIAL_K: Unit[] = [
  bankUnit({
    id: "oh-k-ohio-symbols",
    title: "Ohio Symbols",
    emoji: "🌰",
    blurb: "Our state and our country",
    parentNote: "Ohio as one of the United States and its symbols (the cardinal, the red carnation, the buckeye tree, the white-tailed deer, the ladybug and the swallowtail flag with 17 stars), Columbus and the Statehouse, Lake Erie and the Ohio River, and national symbols such as the flag, the bald eagle and the Fourth of July.",
    standards: ["Statement 6", "Ohio is a state in the United States, and both have symbols and practices that represent them"],
    items: SYMBOLS,
  }),
];
