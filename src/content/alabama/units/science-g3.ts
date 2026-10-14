import type { Unit } from "../../types";
import { SCIENCE_3 as washingtonScience3 } from "../../washington/units/science-35";
import { copyOf, from } from "./kit";

/** Alabama's own Grade 3 science units (`al-` ids): copies of Washington's units without its places, plus Alabama items. */
export const UNITS: Unit[] = [
  copyOf(
    from(washingtonScience3, "wa-g3-fossils"),
    {
      id: "al-g3-fossils",
      title: "Fossils & Long Ago",
      emoji: "🦴",
      blurb: "What fossils tell us about living things and places long ago.",
      parentNote: "Your child uses fossils as evidence of organisms that lived long ago and of the environments they lived in, including Alabama's fossil whale.",
      standards: ["3.8", "using fossils as evidence of past organisms and the environments they lived in"],
    },
    [
      ["Alabama's state fossil, Basilosaurus, was an ancient…", "whale", ["dinosaur that flew", "tree", "bird"], "It swam in the sea long ago."],
      ["Fossil whales are found on land in Alabama. This shows the land was once…", "covered by the sea", ["a desert", "covered by ice", "a mountain top"], "Whales live in the ocean."],
      ["Sea shell fossils are found in Alabama rocks far from the coast. What does this tell us?", "A sea once covered that land", ["Shells can walk", "People lost the shells", "Birds dropped them all"], "Shells come from sea animals."],
      ["Coal in Alabama formed from…", "plants in ancient swamps", ["melted ice", "sea salt", "volcano ash only"], "Coal is made of plant remains pressed for a very long time.", true],
      ["Fossil leaves of ferns tell us the place was once…", "warm and wet enough for plants", ["always frozen", "under deep ocean", "a sandy desert"], "Ferns need water to grow.", true],
    ],
  ),
  copyOf(
    from(washingtonScience3, "wa-g3-weather-climate"),
    {
      id: "al-g3-weather-climate",
      title: "Weather & Climate",
      emoji: "🌦️",
      blurb: "Weather data in tables and graphs, and climates around the world.",
      parentNote: "Your child reads weather data to find patterns in a season and compares climates in different regions of the world, including Alabama's.",
      standards: ["3.13; 3.14", "showing seasonal weather data in tables and graphs, and describing climates in different regions"],
    },
    [
      ["Summers in Alabama are usually…", "hot and humid", ["cold and snowy", "dry and freezing", "icy all day"], "Think of a July day in Alabama."],
      ["Hurricanes that reach Alabama's coast form over…", "warm ocean water", ["cold mountains", "dry deserts", "frozen lakes"], "Hurricanes get their energy from warm seas."],
      ["Compared with the coast, winters in north Alabama are usually…", "colder", ["hotter", "exactly the same", "snowy all winter"], "The north is farther from the warm Gulf."],
      ["Alabama's main tornado season is in…", "spring", ["midsummer", "there are never tornadoes in Alabama", "only in July"], "Warm and cold air often meet in March to May."],
      ["A table shows Alabama's rain each month. Which tool collected the data?", "A rain gauge", ["A thermometer", "A ruler for plants", "A compass"], "This tool catches and measures rain.", true],
    ],
  ),
];
