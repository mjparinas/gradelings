import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Mississippi's Kindergarten units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson under its own id, and a unit borrowed from another grade carries the lesson it has
// there. Mississippi's own units have lessons written for them.
export const LESSONS: GradeLessons = {
  "social/ms-k-symbols": lesson(
    [
      "A symbol stands for something else.",
      "The flag stands for our country, the United States.",
      "The magnolia is Mississippi's flower. It is on our state flag.",
      "Jackson is the capital of Mississippi.",
    ],
    "What flower is on Mississippi's flag?",
    [
      "Look at the middle of the flag.",
      "It is big and white.",
    ],
    "the magnolia",
  ),
};
