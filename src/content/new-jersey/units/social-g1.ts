import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// New Jersey Grade 1 social studies: the state's symbols and places a first grader meets, as part of the K-2 band's
// national and state symbols (6.1.2.CivicsDP.1, 6.1.2.CivicsDP.3) and maps of familiar places (6.1.2.Geo.SV.2).
// Prompts stay short for little kids.

const SYMBOLS: Q[] = [
  ["What is the name of our state?", "New Jersey", ["Lakeland", "Seaside"], "It is named after an island called Jersey."],
  ["New Jersey's capital city is…", "Trenton", ["Newark", "Cape May"], "The state's leaders work there."],
  ["New Jersey's biggest city is…", "Newark", ["Trenton", "Princeton"], "It has a big airport."],
  ["New Jersey is called the…", "Garden State", ["Sunshine State", "Lone Star State"], "Lots of fruits and vegetables grow here."],
  ["New Jersey's state bird is the…", "eastern goldfinch", ["robin", "blue jay"], "It is small and bright yellow."],
  ["New Jersey's state flower is the…", "violet", ["rose", "sunflower"], "It is small and purple."],
  ["New Jersey's state tree is the…", "red oak", ["palm tree", "apple tree"], "It grows acorns."],
  ["New Jersey's state animal is the…", "horse", ["bear", "beaver"], "There is a horse's head on the state flag."],
  ["New Jersey's state insect is the…", "honeybee", ["ladybug", "ant"], "It makes honey."],
  ["New Jersey's state fruit is the…", "blueberry", ["banana", "orange"], "It is small, round and blue."],
  ["Which ocean is on New Jersey's east side?", "the Atlantic Ocean", ["the Pacific Ocean", "the Arctic Ocean"], "Its beaches are called the Jersey Shore."],
  ["Which big river runs along New Jersey's west side?", "the Delaware River", ["the Nile", "the Amazon"], "Pennsylvania is across it."],
  ["The beaches along New Jersey's coast are called the…", "Jersey Shore", ["Big Sand", "Ocean Hill"], "Families go there in summer."],
  ["New Jersey's state motto is…", "Liberty and Prosperity", ["Live Free", "Go Big"], "Liberty means freedom."],
  ["On a map, a star in a circle often shows a…", "capital city", ["lake", "farm"], "Trenton has a star on New Jersey maps."],
  ["New Jersey's flag has a light brown color called…", "buff", ["pink", "green"], "It is the color of soldiers' coats long ago."],
  ["New Jersey farmers grow lots of…", "tomatoes and blueberries", ["bananas", "coconuts"], "That is why it is the Garden State."],
  ["The state flag shows two women and a…", "horse's head", ["lion", "bear"], "The horse is the state animal.", true],
  ["New Jersey's state dinosaur is…", "Hadrosaurus", ["T. rex", "Stegosaurus"], "Its bones were found in Haddonfield.", true],
  ["New Jersey's state fish is the…", "brook trout", ["shark", "goldfish"], "It lives in cool streams.", true],
  ["New Jersey's state shell is the…", "knobbed whelk", ["clam", "sand dollar"], "It washes up on the Jersey Shore.", true],
  ["New Jersey became a state in…", "1787", ["1492", "2020"], "It was the third state.", true],
  ["Which state is across the river from Trenton?", "Pennsylvania", ["Hawaii", "Texas"], "The Delaware River is between them.", true],
  ["Why do states have symbols like a state bird?", "to show what is special there", ["to make laws", "to count people"], "Symbols remind us of a place.", true],
  ["New Jersey's state vegetable is the…", "Jersey tomato", ["carrot", "potato"], "It is red and juicy in summer.", true],
  ["Which lighthouse stands on the Jersey Shore?", "Barnegat Lighthouse", ["Big Ben", "the Eiffel Tower"], "People call it Old Barney.", true],
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "nj-g1-new-jersey-symbols",
    title: "New Jersey Symbols",
    emoji: "🫐",
    blurb: "Our state's symbols, places and name",
    parentNote: "New Jersey's symbols (the eastern goldfinch, the violet, the red oak, the horse, the honeybee and the blueberry), its capital Trenton and biggest city Newark, the Atlantic Ocean, the Delaware River and the Jersey Shore, the flag and the motto \"Liberty and Prosperity\", and why it is called the Garden State.",
    standards: ["6.1.2.CivicsDP.1; 6.1.2.CivicsDP.3; 6.1.2.Geo.SV.2", "the symbols that stand for our nation and state, and maps of familiar places in New Jersey"],
    items: SYMBOLS,
  }),
];
