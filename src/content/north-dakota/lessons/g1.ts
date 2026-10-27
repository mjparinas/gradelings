import { lesson, type GradeLessons } from "../../lessons";

// Lessons for North Dakota's Grade 1 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with North Dakota examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "social/nd-g1-then-and-now": lesson(
    [
      "The past already happened. The present is now. The future comes next.",
      "Long ago, many North Dakota children went to one-room schools.",
      "Some prairie families built houses of sod, because there were few trees.",
    ],
    "Long ago, what did some prairie families build houses from?",
    [
      "The prairie had lots of grass and few trees.",
      "Blocks of grass and dirt are called sod.",
    ],
    "sod",
  ),
};
