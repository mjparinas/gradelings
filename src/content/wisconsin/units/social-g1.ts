import type { Unit } from "../../types";
import { bankUnit, type Q } from "../own";

// Wisconsin Grade 1 social studies: the state's symbols, songs and places a first grader meets (SS.PS1.a.K-1 symbols
// and traditions of our state and country, SS.Geog1.b.1-2 places on maps). Prompts stay short for little kids.

const SYMBOLS: Q[] = [
  ["What is the name of our state?", "Wisconsin", ["Lakeland", "Prairieton"], "It is named after a river."],
  ["Wisconsin's capital city is…", "Madison", ["Milwaukee", "Green Bay"], "The state's leaders work there."],
  ["Wisconsin's biggest city is…", "Milwaukee", ["Madison", "Eau Claire"], "It is on Lake Michigan."],
  ["Wisconsin's state bird is the…", "American robin", ["cardinal", "blue jay"], "It has an orange-red chest."],
  ["Wisconsin's state flower is the…", "wood violet", ["rose", "tulip"], "It is small and purple."],
  ["Wisconsin's state tree is the…", "sugar maple", ["palm tree", "cactus"], "Its sap makes maple syrup."],
  ["Wisconsin's state animal is the…", "badger", ["bison", "moose"], "It digs burrows."],
  ["Wisconsin is called the… State.", "Badger", ["Sunshine", "Lone Star"], "Early miners dug homes in hillsides like badgers."],
  ["Wisconsin's state insect is the…", "honeybee", ["ladybug", "monarch butterfly"], "It makes honey."],
  ["Wisconsin's state drink is…", "milk", ["orange juice", "lemonade"], "Wisconsin has many dairy farms."],
  ["Wisconsin's state fruit is the…", "cranberry", ["banana", "pineapple"], "It is small, red and sour."],
  ["Wisconsin's license plates say…", "America's Dairyland", ["Land of Lincoln", "Sunshine State"], "Cows give milk for cheese."],
  ["Which two Great Lakes touch Wisconsin?", "Lake Michigan and Lake Superior", ["Lake Erie and Lake Ontario", "Lake Tahoe and Lake Placid"], "One is east and one is north."],
  ["Which big river runs along Wisconsin's west side?", "the Mississippi River", ["the Nile", "the Amazon"], "It is one of the longest rivers."],
  ["Wisconsin's state motto is one word:", "Forward", ["Stop", "Backward"], "It means always moving ahead."],
  ["Wisconsin's state song is…", "On, Wisconsin!", ["Yankee Doodle", "Happy Birthday"], "Bands play it at games."],
  ["On a map, a star often shows a…", "capital city", ["lake", "farm"], "Madison has a star on Wisconsin maps."],
  ["Wisconsin's state dance is the…", "polka", ["ballet", "tango"], "It is a quick, bouncy dance.", true],
  ["Wisconsin's state fish is the…", "muskellunge", ["shark", "goldfish"], "People call it the muskie.", true],
  ["Wisconsin's state dog is the…", "American water spaniel", ["poodle", "chihuahua"], "It loves to swim and fetch.", true],
  ["Wisconsin's state fossil is the…", "trilobite", ["T. rex", "woolly mammoth"], "It lived in the sea long ago.", true],
  ["Wisconsin became a state in…", "1848", ["1492", "2018"], "That was over 175 years ago.", true],
  ["Which state is next to Wisconsin?", "Minnesota", ["Hawaii", "Florida"], "Minnesota is on the west side.", true],
  ["The Wisconsin state flag has a… on top of its picture.", "badger", ["bear", "eagle"], "It is the state animal.", true],
  ["Why do states have symbols like a state bird?", "to show what is special there", ["to make laws", "to count people"], "Symbols remind us of a place.", true],
  ["Wisconsin farmers make lots of…", "cheese", ["coconuts", "bananas"], "Cheese is made from milk.", true],
];

export const SOCIAL_1: Unit[] = [
  bankUnit({
    id: "wi-g1-wisconsin-symbols",
    title: "Wisconsin Symbols",
    emoji: "🦡",
    blurb: "Our state's symbols, songs and places",
    parentNote: "Wisconsin's symbols (the badger, the robin, the wood violet, the sugar maple, the honeybee and milk), its motto Forward and song On, Wisconsin!, its capital Madison and biggest city Milwaukee, and Lake Michigan, Lake Superior and the Mississippi River.",
    standards: ["SS.PS1.a.K-1; SS.Geog1.b.1-2", "the symbols, songs and traditions of our state, and familiar places on maps"],
    items: SYMBOLS,
  }),
];
