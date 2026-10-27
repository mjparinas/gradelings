import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Hawaiʻi's Kindergarten units that the shared lesson files don't cover. A copy of another
// state's unit carries the original's lesson (with Hawaiʻi examples where the original named its own state) under its
// own id, and a unit borrowed from another grade carries the lesson it has there. Lessons are written in Canadian
// spelling, like every lesson file; US families see them in US spelling.
export const LESSONS: GradeLessons = {
  "social/hi-k-island-home": lesson(
    [
      "Hawaiʻi is our state. The United States is our country.",
      "Hawaiʻi is made of islands, with the Pacific Ocean all around.",
      "Mauka means toward the mountains. Makai means toward the sea.",
      "Teachers, lifeguards, fishers and farmers all help our community.",
    ],
    "On a map, what colour usually shows the ocean?",
    [
      "Land is often green or brown.",
      "Water is shown in blue.",
    ],
    "blue",
  ),
};
