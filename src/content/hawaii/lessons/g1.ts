import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Hawaiʻi's Grade 1 units that the shared lesson files don't cover. A copy of another
// state's unit carries the original's lesson (with Hawaiʻi examples where the original named its own state) under its
// own id, and a unit borrowed from another grade carries the lesson it has there. Lessons are written in Canadian
// spelling, like every lesson file; US families see them in US spelling.
export const LESSONS: GradeLessons = {
  "social/hi-g1-island-community": lesson(
    [
      "A community is where people live, work and play together.",
      "Reefs, beaches, rain forests and loʻi kalo make our islands special.",
      "Tsunamis, storms and volcanoes can affect us, so families plan ahead.",
      "We help by cleaning beaches, saving water and buying local.",
    ],
    "Tsunami sirens sound. Where should people near the beach go?",
    [
      "Tsunamis are giant ocean waves.",
      "Go up and away from the water.",
    ],
    "to high ground",
  ),
};
