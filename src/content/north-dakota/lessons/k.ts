import { lesson, type GradeLessons } from "../../lessons";

// Lessons for North Dakota's Kindergarten units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with North Dakota examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "social/nd-k-flag-and-state": lesson(
    [
      "North Dakota is our state. The United States is our country.",
      "The American flag has 50 stars, one for each state, and 13 stripes.",
      "North Dakota's flag is blue with an eagle. Our state bird is the meadowlark.",
      "Teachers, principals, mayors and the governor are leaders.",
    ],
    "How many stars are on the American flag?",
    [
      "There is one star for each state.",
      "There are 50 states.",
    ],
    "50",
  ),
};
