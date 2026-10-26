import { lesson, type GradeLessons } from "../../lessons";

// Lessons for New Mexico's Grade 1 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with New Mexico examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "social/nm-g1-then-and-now": lesson(
    [
      "The past already happened. The present is now. The future comes next.",
      "Long ago, many families lived in adobe homes and went places by wagon.",
      "New Mexico has many cultures, with their own languages, foods and traditions.",
    ],
    "Long ago, what did many New Mexico families build their homes from?",
    [
      "They used bricks of mud and straw.",
      "Those bricks are called adobe.",
    ],
    "adobe",
  ),
};
