import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Maryland Grade 1 social studies: the state's symbols and the places a first grader meets, as part of the community
// a child belongs to (C.1, community celebrations and what a community shares) and where Maryland is (G.1). Prompts
// stay short for little kids.

const SYMBOLS: Q[] = [
  ["What is the name of our state?", "Maryland", ["Lakeland", "Shoreland"], "Its capital is Annapolis."],
  ["Maryland's capital city is…", "Annapolis", ["Baltimore", "Frederick"], "The state's leaders work there."],
  ["Maryland's biggest city is…", "Baltimore", ["Annapolis", "Salisbury"], "It has a big harbor."],
  ["Maryland's state bird is the…", "Baltimore oriole", ["robin", "eagle"], "It is orange and black."],
  ["Maryland's state flower is the…", "black-eyed Susan", ["rose", "tulip"], "It is yellow with a dark middle."],
  ["Maryland's state tree is the…", "white oak", ["palm tree", "pine tree"], "It grows acorns."],
  ["Maryland's state crustacean is the…", "blue crab", ["lobster", "shrimp"], "It lives in the Chesapeake Bay."],
  ["Maryland's state dog is the…", "Chesapeake Bay retriever", ["poodle", "husky"], "It loves to swim."],
  ["The big bay in the middle of Maryland is the…", "Chesapeake Bay", ["Hudson Bay", "Monterey Bay"], "Blue crabs live there."],
  ["Which ocean is on Maryland's east side?", "the Atlantic Ocean", ["the Pacific Ocean", "the Arctic Ocean"], "Ocean City is on its beach."],
  ["Maryland is in which country?", "the United States", ["Mexico", "Canada"], "It is one of the 50 states."],
  ["Maryland's flag has black, gold, red and…", "white", ["green", "purple"], "It is made of four parts."],
  ["Which river forms part of Maryland's border?", "the Potomac River", ["the Nile", "the Amazon"], "It flows past Washington, D.C."],
  ["Maryland's state boat is the…", "skipjack", ["canoe", "submarine"], "It is a sailboat for catching oysters."],
  ["Maryland's state sport is…", "jousting", ["surfing", "skiing"], "Riders aim at small rings."],
  ["Maryland's state cat is the…", "calico cat", ["lion", "tiger"], "Its fur has three colors."],
  ["Maryland's state drink is…", "milk", ["lemonade", "juice"], "Dairy farms make it."],
  ["The nation's capital, Washington, D.C., is…", "right next to Maryland", ["far across the ocean", "in Maryland's mountains"], "Maryland gave some of its land."],
  ["Is Maryland closer to the North Pole or the equator?", "about halfway between", ["right at the North Pole", "right on the equator"], "Find it on a globe."],
  ["Maryland's state insect is the Baltimore…", "checkerspot butterfly", ["honeybee", "ladybug"], "It is orange, black and white."],
  ["Maryland's state reptile is the…", "diamondback terrapin", ["alligator", "rattlesnake"], "This turtle lives where the bay is salty.", true],
  ["Maryland's state fish is the…", "rockfish", ["goldfish", "shark"], "It is also called the striped bass.", true],
  ["Maryland's state dessert is the Smith Island…", "cake", ["pie", "cookie"], "It has many thin layers.", true],
  ["One nickname for Maryland is the…", "Old Line State", ["Sunshine State", "Lone Star State"], "It honors soldiers long ago.", true],
  ["Why do states have symbols like a state bird?", "to show what is special there", ["to make laws", "to count people"], "Symbols remind us of a place.", true],
  ["Which word names Maryland's lowland near the bay?", "the Eastern Shore", ["the Rocky Mountains", "the Great Plains"], "It is east of the bay.", true],
  ["Which part of Maryland has mountains?", "the west", ["the beach", "the bay"], "Garrett County is there.", true],
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "md-g1-maryland-symbols",
    title: "Maryland Symbols",
    emoji: "🦀",
    blurb: "Our state's symbols and places",
    parentNote: "Maryland's symbols (the Baltimore oriole, the black-eyed Susan, the white oak, the blue crab, the flag and more), its capital Annapolis and biggest city Baltimore, the Chesapeake Bay, the Atlantic Ocean and the Potomac River, and where Maryland is on a map and a globe.",
    standards: ["C.1; G.1", "what members of a community share and celebrate, and where Maryland is on maps and globes"],
    items: SYMBOLS,
  }),
];
