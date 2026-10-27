import { lesson, type GradeLessons } from "../../lessons";

// Lessons for South Dakota's Kindergarten units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with South Dakota examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "social/sd-k-our-state": lesson(
    [
      "South Dakota is our state. The United States is our country.",
      "Our country is on the continent of North America.",
      "North Dakota, Nebraska and Minnesota are next to South Dakota.",
      "Mount Rushmore and the flag are symbols of America.",
    ],
    "How many stars are on the American flag?",
    [
      "There is one star for each state.",
      "There are 50 states.",
    ],
    "50",
  ),
};
