import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Idaho's Grade 8 units that the shared lesson files don't cover. A copy of another state's unit
// carries a lesson written for Idaho under its own id, and a unit borrowed from another grade carries the lesson it
// has there, word for word.
export const LESSONS: GradeLessons = {
  "science/id-g8-weather": lesson(
    [
      "Evaporation: liquid water becomes vapor. Condensation: vapor cools into cloud droplets.",
      "Air masses meet at fronts, and a cold front often brings storms and cooler air.",
      "Moist air rises up mountains, cools and drops rain or snow, so the windward side of a range is wetter.",
    ],
    "Why is one side of a mountain range wetter than the other?",
    [
      "Moist air hits the windward side first.",
      "It rises, cools and drops its rain there.",
    ],
    "moist air rains as it rises on the windward side",
  ),
  "science/id-g8-climate": lesson(
    [
      "Climate is the average weather over many years.",
      "Oceans keep coastal temperatures steady, so places far inland, like Idaho, have bigger swings between summer and winter.",
      "People burn much more fossil fuel than 200 years ago, so there is more CO₂ in the air.",
      "We can use less energy, like walking short trips, and adapt, like planting shade trees.",
    ],
    "Why does a coastal city have milder winters than a city far inland?",
    [
      "Ocean water warms and cools slowly.",
      "It keeps nearby temperatures steady.",
    ],
    "the ocean keeps temperatures steady",
  ),
  "science/id-g8-growth": lesson(
    [
      "Asexual reproduction needs one parent: a potato sprouting from a piece of potato, strawberry runners.",
      "Sexual reproduction needs two parents and creates variation.",
      "Genes and the environment both affect growth: the same plants grow differently in sun and shade.",
    ],
    "Two identical plants grow in sun and in shade and end up different heights. Why?",
    [
      "Their genes are the same.",
      "So the difference comes from where they grew.",
    ],
    "the environment",
  ),
  "social/id-g8-idaho-territory": lesson(
    [
      "Gold rushes brought thousands of miners, so Congress created Idaho Territory in 1863.",
      "Idaho wrote its constitution in 1889 and became the 43rd state on July 3, 1890.",
      "The Homestead Act and irrigation projects like the Carey Act opened land to settlers, while tribes lost land through treaties and allotment.",
      "Tribal sovereignty was reduced, then strengthened when tribes wrote their own constitutions.",
    ],
    "Idaho became a state in which year?",
    [
      "The constitution was written in 1889.",
      "Statehood came the next year.",
    ],
    "1890",
  ),
  "science/plant-parts-ab": lesson(
    [
      "Roots take in water, stems hold the plant up, leaves make food, flowers make seeds.",
      "Xylem carries water up from the roots. Phloem carries sugar from the leaves.",
      "Stomata are tiny leaf openings that let carbon dioxide in and oxygen and water vapour out.",
    ],
    "Which tubes carry water from the roots to the leaves?",
    [
      "Phloem carries sugar.",
      "The water tubes are the other kind.",
    ],
    "xylem",
  ),
};
