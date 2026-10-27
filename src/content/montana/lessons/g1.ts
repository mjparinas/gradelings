import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Montana's Grade 1 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Montana examples where the original named its own state) under its own id.
export const LESSONS: GradeLessons = {
  "social/mt-g1-montana-on-the-map": lesson(
    [
      "Our state is Montana. Its capital is Helena.",
      "Tall mountains are in the west. Flat plains are in the east.",
      "A map key tells what the pictures on a map mean.",
    ],
    "What is the capital of Montana?",
    [
      "The state's leaders work in the capital.",
      "That city is Helena.",
    ],
    "Helena",
  ),
};
