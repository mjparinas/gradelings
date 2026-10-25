import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Kentucky's own Grade 1 units, attached in ../g1.ts so they ship in Kentucky's download.
export const LESSONS: GradeLessons = {
  "social/ky-g1-symbols-holidays": lesson(
    ["Symbols stand for our country: the flag and the bald eagle.", "The Liberty Bell and the Statue of Liberty stand for freedom.", "On holidays we remember people and events, like the Fourth of July."],
    "What do we celebrate on the Fourth of July?",
    ["It is in summer, with fireworks.", "It is our country's birthday."],
    "our country's birthday",
  ),
  "social/ky-g1-kentucky-symbols": lesson(
    ["Kentucky is called the Bluegrass State.", "The cardinal is the state bird. The goldenrod is the state flower.", "The Kentucky Derby is a famous horse race in Louisville."],
    "What is Kentucky's nickname?",
    ["It is named for a kind of grass."],
    "the Bluegrass State",
  ),
  "social/ky-g1-kentucky-government": lesson(
    ["The governor leads Kentucky's government.", "Lawmakers meet in Frankfort, our capital, to make laws.", "Laws keep us safe, like riding in a car seat."],
    "What is the capital of Kentucky?",
    ["The governor works there.", "It is on the Kentucky River."],
    "Frankfort",
  ),
  "social/ky-g1-kentucky-regions": lesson(
    ["Kentucky has hills, mountains, caves and big rivers.", "The Ohio River is on Kentucky's north side.", "Some places grow corn. Some raise horses."],
    "Which river is on Kentucky's north side?",
    ["It is a very big river.", "It has the name of a state."],
    "the Ohio River",
  ),
};
