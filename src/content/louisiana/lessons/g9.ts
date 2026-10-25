import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Louisiana's Grade 9 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Louisiana examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/la-g9-ecosystems": lesson(
    [
      "A population grows until limits stop it at the carrying capacity, so a logistic curve levels off.",
      "Density-dependent factors, like disease, grow stronger in crowds; density-independent ones, like storms, don’t.",
      "Only about 10% of energy passes to each next trophic level. Producers are the first level.",
    ],
    "Disease spreads faster in a crowded population. Density-dependent or density-independent?",
    [
      "Its effect grows with crowding.",
      "That makes it density-dependent.",
    ],
    "density-dependent",
  ),
  "social/la-g9-louisiana-government": lesson(
    [
      "Louisiana has a Legislature (a Senate of 39 and a House of 105), a governor and a Supreme Court.",
      "Louisiana has parishes, governed by police juries or home rule councils, and its civil law grew from French and Spanish law.",
      "Four federally recognized Tribes in Louisiana govern their own nations and work with state and federal governments.",
    ],
    "How many members are in the Louisiana Senate?",
    [
      "The House has 105 members.",
      "The Senate has 39.",
    ],
    "39",
  ),
};
