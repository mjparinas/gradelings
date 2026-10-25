import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Connecticut's Grade 1 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Connecticut examples where the original named its own state) under its own id.
export const LESSONS: GradeLessons = {
  "social/ct-g1-connecticut-our-state": lesson(
    [
      "Our state is Connecticut. Its capital is Hartford.",
      "The Connecticut River flows south to Long Island Sound.",
      "The robin and the mountain laurel are state symbols.",
    ],
    "What is the capital of Connecticut?",
    [
      "The state's leaders work in the capital.",
      "That city is Hartford.",
    ],
    "Hartford",
  ),
};
