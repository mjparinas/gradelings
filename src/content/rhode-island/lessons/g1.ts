import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Rhode Island's Grade 1 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Rhode Island examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "social/ri-g1-then-and-now": lesson(
    [
      "The past already happened. The present is now. The future comes next.",
      "Long ago, many Rhode Islanders worked in mills and rode trolleys.",
      "Old buildings can get new uses, like a mill that becomes homes.",
    ],
    "Long ago, where did many Rhode Island families work?",
    [
      "Rivers turned big wheels to run machines.",
      "Those buildings were called mills.",
    ],
    "in mills",
  ),
};
