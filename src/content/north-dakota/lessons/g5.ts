import { lesson, type GradeLessons } from "../../lessons";

// Lessons for North Dakota's Grade 5 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with North Dakota examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/nd-g5-earth-water": lesson(
    [
      "Earth has four systems: the geosphere (land), hydrosphere (water), atmosphere (air) and biosphere (life).",
      "Most of Earth's water is salty ocean water, and most fresh water is frozen in ice.",
      "Many North Dakota towns get drinking water from the Missouri River or from wells, and prairie wetlands help clean water.",
    ],
    "Trees take in water and give off water vapour. Which systems interact?",
    [
      "Trees: biosphere. Water: hydrosphere.",
      "The vapour goes into the air: atmosphere.",
    ],
    "biosphere, hydrosphere and atmosphere",
  ),
  "science/nd-g5-ecosystems": lesson(
    [
      "Producers, like prairie grass, make food. Consumers eat other living things.",
      "Decomposers, like worms and fungi, return nutrients to the soil.",
      "Matter moves around an ecosystem again and again.",
    ],
    "Hawks eat mice. Are hawks producers or consumers?",
    [
      "Hawks can't make their own food.",
      "They eat other animals.",
    ],
    "consumers",
  ),
  "science/nd-g5-sun-stars": lesson(
    [
      "The sun looks brighter than other stars because it is much closer to Earth.",
      "Far-off headlights look dim and near ones bright: distance works the same way for stars.",
      "Earth spins once about every 24 hours, giving day and night.",
      "In North Dakota, summer days are long and winter nights are long.",
    ],
    "Some stars are bigger than the sun. Why do they look so small?",
    [
      "Things far away look dimmer and smaller.",
      "Those stars are much farther from Earth.",
    ],
    "they are very far away",
  ),
  "social/nd-g5-explorers": lesson(
    [
      "European explorers sailed to find trade routes and riches, and to claim land for their countries.",
      "Spain, France, England and the Dutch claimed land in the Americas.",
      "French explorers and fur traders like La Vérendrye travelled the rivers of the northern plains.",
    ],
    "Why did many explorers sail west from Europe?",
    [
      "Spices and silk came from Asia.",
      "They hoped to find a faster route there.",
    ],
    "to find a sea route to Asia's riches",
  ),
};
