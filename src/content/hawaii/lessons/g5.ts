import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Hawaiʻi's Grade 5 units that the shared lesson files don't cover. A copy of another
// state's unit carries the original's lesson (with Hawaiʻi examples where the original named its own state) under its
// own id, and a unit borrowed from another grade carries the lesson it has there. Lessons are written in Canadian
// spelling, like every lesson file; US families see them in US spelling.
export const LESSONS: GradeLessons = {
  "science/hi-g5-earth-water": lesson(
    [
      "Earth has four systems: the geosphere (land), hydrosphere (water), atmosphere (air) and biosphere (life).",
      "Most of Earth's water is salty ocean water, and most fresh water is frozen in ice.",
      "On Oʻahu, rain soaks through forests into underground aquifers, so people work to protect the forests and keep the water clean.",
    ],
    "Trees take in water and give off water vapour. Which systems interact?",
    [
      "Trees: biosphere. Water: hydrosphere.",
      "The vapour goes into the air: atmosphere.",
    ],
    "biosphere, hydrosphere and atmosphere",
  ),
  "science/hi-g5-ecosystems": lesson(
    [
      "Producers make food. Consumers eat other living things.",
      "Decomposers, like worms and fungi, return nutrients to the soil.",
      "Matter moves around an ecosystem again and again.",
    ],
    "Monk seals eat fish. Are monk seals producers or consumers?",
    [
      "Monk seals can't make their own food.",
      "They eat other animals.",
    ],
    "consumers",
  ),
  "science/hi-g5-sun-stars": lesson(
    [
      "The sun looks brighter than other stars because it is much closer to Earth.",
      "Far-off headlights look dim and near ones bright: distance works the same way for stars.",
      "Earth spins once about every 24 hours, giving day and night.",
      "In Hawaiʻi, the noon sun is straight overhead on a few days each year, so shadows almost vanish.",
    ],
    "Some stars are bigger than the sun. Why do they look so small?",
    [
      "Things far away look dimmer and smaller.",
      "Those stars are much farther from Earth.",
    ],
    "they are very far away",
  ),
  "social/hi-g5-explorers": lesson(
    [
      "New ships like the caravel and tools like the astrolabe made long sea voyages possible.",
      "Explorers sailed for Spain, Portugal, France, England and the Dutch, looking for riches and routes to Asia.",
      "Explorers met peoples who already lived in the Americas and brought diseases that took many lives. In 1778, James Cook reached Hawaiʻi.",
    ],
    "What did many explorers hope to find?",
    [
      "They wanted spices and silk from the East.",
      "They looked for a sea route to Asia.",
    ],
    "a sea route to Asia and riches",
  ),
  "social/hi-g5-native-nations": lesson(
    [
      "North America's land and climate shaped how Native American peoples lived.",
      "Many Woodland peoples grew the Three Sisters (corn, beans and squash), hunted and fished.",
      "Pacific Northwest peoples fished for salmon and built cedar plank houses; Plains peoples followed the bison; Pueblo peoples built with adobe.",
      "Each nation has its own language, government and history, and many live on today.",
    ],
    "Why did Plains peoples live in tipis that were easy to move?",
    [
      "Think about how they got food.",
      "They followed the bison herds.",
    ],
    "they followed the bison herds",
  ),
};
