import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Louisiana's Grade 2 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Louisiana examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/la-g2-earth-changes": lesson(
    [
      "Some changes are fast, like volcanoes, landslides and floods.",
      "Some are slow, like wind and water wearing away land over years.",
      "Plant roots and rock walls help slow these changes.",
    ],
    "Water carves a canyon over many years. Fast or slow?",
    [
      "Many years is a long time.",
      "That is a slow change.",
    ],
    "slow",
  ),
  "science/la-g2-land-water": lesson(
    [
      "Land can be mountains, valleys, hills or plains.",
      "Water can be rivers, lakes, oceans, bayous or ice.",
      "The Gulf is salt water. The Mississippi River and Lake Pontchartrain hold fresh water.",
    ],
    "A slow-moving stream in low, wet land is a…?",
    [
      "Louisiana has many of these.",
      "It is called a bayou.",
    ],
    "bayou",
  ),
  "science/la-g2-habitats": lesson(
    [
      "A habitat is a place where a living thing lives.",
      "Each habitat has its own plants and animals: frogs in ponds, orcas in the ocean.",
      "Forests often have more kinds of animals than deserts.",
    ],
    "Where do orcas live?",
    [
      "Orcas are big sea animals.",
      "They live in salt water.",
    ],
    "the ocean",
  ),
  "social/la-g2-reading-maps": lesson(
    [
      "A map is a drawing of a place seen from above. North is usually at the top.",
      "On a grid map, find the column letter, then the row number.",
      "The key explains symbols, like a star for a capital city.",
    ],
    "On a grid map, the park is in square B3. How do you find it?",
    [
      "Find column B first.",
      "Then go to row 3.",
    ],
    "column B, then row 3",
  ),
  "social/la-g2-founding-fathers": lesson(
    [
      "The thirteen colonies broke away from Great Britain in the American Revolution.",
      "The Declaration of Independence, written mostly by Thomas Jefferson, was approved in 1776.",
      "Founding Fathers like Washington, Franklin, Adams and Madison, and women like Abigail Adams and Phillis Wheatley, helped build the new nation.",
    ],
    "Who wrote most of the Declaration of Independence?",
    [
      "Washington led the army. Franklin was an inventor.",
      "Jefferson did most of the writing.",
    ],
    "Thomas Jefferson",
  ),
  "social/la-g2-landmarks": lesson(
    [
      "Symbols stand for our country, like the flag, the bald eagle and the Liberty Bell.",
      "Landmarks are special places. Some are built, like the Statue of Liberty. Some are natural, like the Grand Canyon.",
      "Holidays remember people and events we share.",
    ],
    "What do the 50 stars on the flag stand for?",
    [
      "There is one star for each state.",
      "There are 50 states.",
    ],
    "the 50 states",
  ),
  "social/la-g2-three-branches": lesson(
    [
      "The legislative branch (Congress) makes laws.",
      "The executive branch (the President) carries out laws.",
      "The judicial branch (the courts) decides what laws mean. Each branch checks the others.",
    ],
    "Which branch makes the laws?",
    [
      "Congress makes laws.",
      "Congress is the legislative branch.",
    ],
    "the legislative branch",
  ),
};
