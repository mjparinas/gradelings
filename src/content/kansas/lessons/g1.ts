import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Kansas's Grade 1 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Kansas examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "social/ks-g1-local-government": lesson(
    [
      "A town or city has leaders, like a mayor and a city council.",
      "They make laws and run services like trash pickup, roads and parks.",
      "Taxes pay for these services, and everyone can help the community.",
    ],
    "Who takes the trash away each week?",
    [
      "Trash pickup is a service the town runs.",
      "Garbage collectors do this job.",
    ],
    "garbage collectors",
  ),
};
