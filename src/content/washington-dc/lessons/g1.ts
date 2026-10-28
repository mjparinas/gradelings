import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Washington, DC's Grade 1 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with DC examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "social/dc-g1-leaders-and-symbols": lesson(
    [
      "The president leads the United States. The mayor leads Washington, DC.",
      "Grown-ups vote in elections to choose them.",
      "DC has 8 wards. DC is in the United States, on the continent of North America.",
      "Flags, songs and holidays are symbols that bring people together.",
    ],
    "How do people choose the mayor of DC?",
    [
      "Grown-ups vote in an election.",
      "The person with the most votes wins.",
    ],
    "they vote",
  ),
};
