import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Washington, DC's Kindergarten units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with DC examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "social/dc-k-my-city": lesson(
    [
      "Our city is Washington, DC. It is the capital of the United States.",
      "The DC flag has three red stars and two red bars.",
      "The mayor leads our city. The president leads our country.",
    ],
    "Who leads the city of Washington, DC?",
    [
      "The president leads the whole country.",
      "The city has its own leader.",
    ],
    "the mayor",
  ),
};
