import { lesson, type GradeLessons } from "../../lessons";

// Lessons for South Dakota's Grade 3 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with South Dakota examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/sd-g3-fossils": lesson(
    [
      "Fossils are remains or traces of living things from long ago.",
      "Mud covering a leaf can harden into a leaf print in rock.",
      "In rock layers, older fossils are usually lower down.",
    ],
    "In rock layers, are older fossils usually higher or lower?",
    [
      "Layers pile up over time.",
      "The first layers are at the bottom.",
    ],
    "lower down",
  ),
  "science/sd-g3-weather-climate": lesson(
    [
      "Weather is what the air is like today. Climate is the usual weather over many years.",
      "Read temperature and rain data for each season.",
      "Mountains get the most snow in winter.",
    ],
    "Highs of 30 °F, 28 °F and 32 °F. Which season is it?",
    [
      "Those are cold temperatures.",
    ],
    "winter",
  ),
  "social/sd-g3-south-dakota-places": lesson(
    [
      "Pierre is the capital. Sioux Falls is the largest city, and Rapid City is near the Black Hills.",
      "The Missouri River splits the state into East River and West River.",
      "West River has the Black Hills, Black Elk Peak and the Badlands. Nine Tribal Nations have reservations in the state.",
      "The Great Plains, the Great Lakes and the Mississippi River are big features of the United States.",
    ],
    "Which river splits South Dakota into East River and West River?",
    [
      "It flows south through the middle of the state.",
      "Pierre sits beside it.",
    ],
    "the Missouri River",
  ),
};
