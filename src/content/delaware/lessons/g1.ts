import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Delaware's Grade 1 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Delaware examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "social/de-g1-then-and-now": lesson(
    [
      "The past already happened. The present is now. The future comes next.",
      "Long ago, many families here lived on farms and rode in horse wagons.",
      "Today most people ride in cars and buy food at stores.",
    ],
    "Long ago, how did many Delaware families get from town to town?",
    [
      "There were no cars yet.",
      "Horses pulled them.",
    ],
    "by horse and wagon",
  ),
};
