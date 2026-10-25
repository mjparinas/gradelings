import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Nevada's Kindergarten units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Nevada examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "social/nv-k-flag-and-state": lesson(
    [
      "Nevada is our state. The United States is our country.",
      "The flag has 50 stars, one for each state, and 13 stripes.",
      "Nevada's state bird is the mountain bluebird.",
    ],
    "How many stars are on the American flag?",
    [
      "There is one star for each state.",
      "There are 50 states.",
    ],
    "50",
  ),
};
