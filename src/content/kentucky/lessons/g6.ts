import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Kentucky's own Grade 6 units, attached in ../g6.ts so they ship in Kentucky's download.
export const LESSONS: GradeLessons = {
  "science/ky-g6-weather": lesson(
    ["Evaporation: liquid water becomes vapour. Condensation: vapour cools into cloud droplets.", "Where warm, moist air meets cold air at a front, storms often form.", "Most weather in Kentucky moves from west to east.", "Humidity is the amount of water vapour in the air."],
    "A cold front pushes into warm, humid air. What is likely?",
    ["Warm air is pushed up quickly.", "Rising moist air cools and forms clouds."],
    "clouds, rain and storms",
  ),
  "science/ky-g6-climate": lesson(
    ["Climate is the average weather over many years.", "Latitude, oceans, mountains and winds all shape a place's climate.", "Oceans keep coastal temperatures steady, so places far inland have bigger swings.", "The sun heats Earth unevenly, which drives winds and ocean currents."],
    "Why do inland places like Kentucky have hotter summers and colder winters than coasts?",
    ["Ocean water warms and cools slowly.", "Places far from the ocean don't get that steadying effect."],
    "they are far from the ocean",
  ),
  "science/ky-g6-space": lesson(
    ["Gravity keeps planets in orbit around the sun and the moon around Earth.", "The moon's phases come from how much of its lit side we see.", "In a solar eclipse, the moon passes between the sun and Earth, as over Hopkinsville in 2017."],
    "What causes a solar eclipse?",
    ["Something blocks the sun's light.", "The moon lines up between the sun and Earth."],
    "the moon passes between the sun and Earth",
  ),
  "science/ky-g6-design": lesson(
    ["Criteria are what a solution must do to succeed. Constraints are limits.", "A prototype is a first model you build to test.", "Test designs fairly, change one thing at a time, then improve and test again."],
    "A bridge must cost less than $5,000. Is that a criterion or a constraint?",
    ["It is a limit on the design.", "Limits are constraints."],
    "a constraint",
  ),
  "science/ky-g6-earth-surface": lesson(
    ["The rock cycle: igneous, sedimentary and metamorphic rocks change into each other.", "Rivers erode in some places and drop sediment (deposition) in others.", "Matching fossils on far-apart continents show they were once joined."],
    "A river drops mud on its floodplain. What process is this?",
    ["Slow water can't carry as much.", "Dropping sediment is deposition."],
    "deposition",
  ),
  "social/ky-g6-greece-rome-kentucky": lesson(
    ["Athens gave us democracy: citizens voting on laws.", "Rome gave us the republic: citizens elect representatives, like a senate.", "Kentucky's government borrows both ideas, with a Senate and elected leaders."],
    "In a republic, who makes the laws?",
    ["Citizens don't all vote on every law.", "They choose people to do it."],
    "elected representatives",
  ),
};
