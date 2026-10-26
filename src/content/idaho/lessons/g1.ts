import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Idaho's Grade 1 units that the shared lesson files don't cover. A copy of another state's unit
// carries a lesson written for Idaho under its own id, and a unit borrowed from another grade carries the lesson it
// has there, word for word.
export const LESSONS: GradeLessons = {
  "social/id-g1-idaho-places": lesson(
    [
      "Our state is Idaho. Its capital is Boise.",
      "A map key tells what the symbols mean. Blue is water.",
      "A compass rose shows north, south, east and west.",
    ],
    "On a map, a star often marks the…",
    [
      "Look at the map key.",
      "A star stands for the capital city.",
    ],
    "capital city",
  ),
};
