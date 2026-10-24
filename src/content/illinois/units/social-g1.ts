import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Illinois Grade 1 social studies: the state's symbols and places a first grader meets, as part of Living, Learning, and
// Working Together (SS.1.G.1, SS.1.H.2). Prompts stay short for little kids.

const SYMBOLS: Q[] = [
  ["What is the name of our state?", "Illinois", ["Lakeland", "Prairieton"], "It is named after a river."],
  ["Illinois's capital city is…", "Springfield", ["Chicago", "Peoria"], "The state's leaders work there."],
  ["Illinois's biggest city is…", "Chicago", ["Springfield", "Rockford"], "It is on Lake Michigan."],
  ["Illinois's state bird is the…", "northern cardinal", ["robin", "blue jay"], "It is bright red."],
  ["Illinois's state flower is the…", "violet", ["rose", "tulip"], "It is small and purple."],
  ["Illinois's state tree is the…", "white oak", ["palm tree", "pine tree"], "It grows acorns."],
  ["Illinois's state animal is the…", "white-tailed deer", ["bison", "black bear"], "It lifts its white tail when it runs."],
  ["Illinois's state insect is the…", "monarch butterfly", ["ladybug", "honeybee"], "It is orange and black."],
  ["Illinois's state snack is…", "popcorn", ["pretzels", "apples"], "Lots of corn grows here."],
  ["Illinois is called the Prairie State. A prairie is…", "land of tall grass", ["a big mountain", "a sandy beach"], "Prairies have grass and flowers."],
  ["Which big lake touches Illinois?", "Lake Michigan", ["Lake Tahoe", "Lake Victoria"], "It is one of the Great Lakes."],
  ["Which big river runs along Illinois's west side?", "the Mississippi River", ["the Nile", "the Amazon"], "It is one of the longest rivers."],
  ["Illinois is called the Land of…", "Lincoln", ["Lakes", "Mountains"], "Abraham Lincoln lived here."],
  ["Abraham Lincoln was a…", "president of the United States", ["king", "baseball player"], "He lived in Springfield."],
  ["Lincoln's face is on the…", "penny", ["quarter", "dime"], "It is a copper-colored coin."],
  ["On a map, a star in a circle often shows a…", "capital city", ["lake", "farm"], "Springfield has a star on Illinois maps."],
  ["The state flag of Illinois shows an…", "eagle", ["owl", "otter"], "The eagle holds a banner."],
  ["Illinois farmers grow lots of…", "corn and soybeans", ["bananas", "coconuts"], "They grow in rich soil."],
  ["Which town in Illinois grows lots of pumpkins?", "Morton", ["Rockford", "Cairo"], "Morton has a pumpkin festival.", true],
  ["Illinois's state fish is the…", "bluegill", ["shark", "goldfish"], "It is a small lake fish.", true],
  ["Illinois's state fossil is the…", "Tully monster", ["T. rex", "woolly mammoth"], "It lived in water long ago.", true],
  ["Illinois became a state in…", "1818", ["1492", "2018"], "That was over 200 years ago.", true],
  ["Which state is next to Illinois?", "Indiana", ["Hawaii", "Vermont"], "Indiana is on the east side.", true],
  ["The tall Willis Tower is in…", "Chicago", ["Springfield", "Galena"], "It is one of the tallest buildings in the US.", true],
  ["Why do states have symbols like a state bird?", "to show what is special there", ["to make laws", "to count people"], "Symbols remind us of a place.", true],
  ["Illinois's state reptile is the…", "painted turtle", ["alligator", "rattlesnake"], "Its shell has red and yellow marks.", true],
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "il-g1-illinois-symbols",
    title: "Illinois Symbols",
    emoji: "🌽",
    blurb: "Our state's symbols, places and people",
    parentNote: "Illinois's symbols (the cardinal, the violet, the white oak, the monarch and popcorn), its capital Springfield and biggest city Chicago, Lake Michigan and the Mississippi River, and Abraham Lincoln, the reason it is called the Land of Lincoln.",
    standards: ["SS.1.G.1; SS.1.H.2", "familiar places on maps, and people and symbols that shaped Illinois"],
    items: SYMBOLS,
  }),
];
