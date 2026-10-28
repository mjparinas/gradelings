import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Wyoming's Kindergarten units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Wyoming examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "social/wy-k-flag-and-state": lesson(
    [
      "Wyoming is our state. The United States is our country.",
      "The flag has 50 stars, one for each state, and 13 stripes.",
      "Wyoming's flag has a white bison on it.",
      "Teachers, principals and the governor are leaders.",
    ],
    "How many stars are on the American flag?",
    [
      "There is one star for each state.",
      "There are 50 states.",
    ],
    "50",
  ),
};
