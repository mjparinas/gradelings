import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Wyoming's Grade 1 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Wyoming examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "social/wy-g1-then-and-now": lesson(
    [
      "The past already happened. The present is now. The future comes next.",
      "Long ago, many families here lived on ranches and rode horses or wagons.",
      "Today most people ride in cars and buy food at stores.",
    ],
    "Long ago, how did many Wyoming families get from town to town?",
    [
      "There were no cars yet.",
      "Horses pulled them.",
    ],
    "by horse and wagon",
  ),
};
