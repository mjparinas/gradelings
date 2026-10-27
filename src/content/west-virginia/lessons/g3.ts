import { lesson, type GradeLessons } from "../../lessons";

// Lessons for West Virginia's Grade 3 units that the shared lesson files don't cover: West Virginia's own units, and
// units West Virginia teaches in a different grade from the one their shared lesson is written for (copied word for word).
export const LESSONS: GradeLessons = {
  "science/wv-g3-weather-climate": lesson(
    [
      "Weather is what the air is like today: hot, cold, rainy or windy.",
      "Climate is the usual weather over many years.",
      "Floodwalls, warnings and building on high ground reduce harm from storms and floods.",
    ],
    "Is 'Charleston gets snow most winters' about weather or climate?",
    [
      "It talks about many winters, not one day.",
      "A pattern over many years is climate.",
    ],
    "climate",
  ),
  "social/wv-g3-wv-regions": lesson(
    [
      "Most of West Virginia is the Appalachian Plateau, cut into steep hills and valleys.",
      "The east has the long ridges of the Ridge and Valley, and a bit of the Blue Ridge.",
      "The state also has nine travel regions, like the Eastern Panhandle and Mountain Lakes.",
    ],
    "Harpers Ferry is in which travel region?",
    [
      "Harpers Ferry is in Jefferson County, near Maryland and Virginia.",
      "That is the Eastern Panhandle.",
    ],
    "the Eastern Panhandle",
  ),
  "social/wv-g3-wv-at-work": lesson(
    [
      "People's jobs often follow a place's resources: coal mining where there is coal.",
      "A raw material, like a log, becomes a product, like a table, step by step.",
      "SMART529 helps families save for college or training after high school.",
    ],
    "A log goes to a sawmill and becomes boards. What could the boards become next?",
    [
      "Boards are lumber for building.",
      "They could become a table.",
    ],
    "a table",
  ),
};
