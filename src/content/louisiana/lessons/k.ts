import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Louisiana's Kindergarten units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Louisiana examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "social/la-k-louisiana-traditions": lesson(
    [
      "Symbols stand for a place. The brown pelican is on the Louisiana flag.",
      "The bald eagle stands for our country.",
      "Holidays help us remember people and events, like July 4th.",
      "Louisiana has Mardi Gras, king cake, jazz and zydeco.",
    ],
    "Which bird is on the Louisiana flag?",
    [
      "The flag shows a bird feeding its chicks.",
      "That bird is the brown pelican.",
    ],
    "the brown pelican",
  ),
  "social/la-k-land-water-weather": lesson(
    [
      "Land can be high, like mountains and hills, or flat.",
      "Water can be a river, a lake, or the sea at the coast.",
      "Weather changes what we wear. Rain means an umbrella.",
    ],
    "It is raining. What should you take?",
    [
      "Rain makes us wet.",
      "An umbrella keeps us dry.",
    ],
    "an umbrella",
  ),
};
