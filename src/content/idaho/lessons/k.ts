import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Idaho's Kindergarten units that the shared lesson files don't cover. A copy of another state's unit
// carries a lesson written for Idaho under its own id, and a unit borrowed from another grade carries the lesson it
// has there, word for word.
export const LESSONS: GradeLessons = {
  "social/id-k-symbols-holidays": lesson(
    [
      "The flag of the United States is red, white and blue.",
      "It has 50 stars, one for each state.",
      "For the Pledge, we face the flag with a hand over our heart.",
      "Holidays help us remember days, like the Fourth of July.",
    ],
    "How many stars are on the flag of the United States?",
    [
      "There is one star for each state.",
      "There are 50 states.",
    ],
    "50",
  ),
};
