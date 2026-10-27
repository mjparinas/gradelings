import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Rhode Island's Grade 5 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Rhode Island examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/ri-g5-earth-water": lesson(
    [
      "Earth has four systems: the geosphere (land), hydrosphere (water), atmosphere (air) and biosphere (life).",
      "Most of Earth's water is salty ocean water, and most fresh water is frozen in ice.",
      "Rhode Island gets much of its drinking water from the Scituate Reservoir, and salt marshes help keep Narragansett Bay clean.",
    ],
    "Trees take in water and give off water vapour. Which systems interact?",
    [
      "Trees: biosphere. Water: hydrosphere.",
      "The vapour goes into the air: atmosphere.",
    ],
    "biosphere, hydrosphere and atmosphere",
  ),
  "science/ri-g5-ecosystems": lesson(
    [
      "Producers make food. Consumers eat other living things.",
      "Decomposers, like worms and fungi, return nutrients to the soil.",
      "Matter moves around an ecosystem again and again.",
    ],
    "Orcas eat salmon. Are orcas producers or consumers?",
    [
      "Orcas can't make their own food.",
      "They eat other animals.",
    ],
    "consumers",
  ),
  "science/ri-g5-sun-stars": lesson(
    [
      "The sun looks brighter than other stars because it is much closer to Earth.",
      "Far-off headlights look dim and near ones bright: distance works the same way for stars.",
      "Earth spins once about every 24 hours, giving day and night.",
      "The North Star seems to stay still because it is almost straight above Earth's axis.",
    ],
    "Some stars are bigger than the sun. Why do they look so small?",
    [
      "Things far away look dimmer and smaller.",
      "Those stars are much farther from Earth.",
    ],
    "they are very far away",
  ),
  "social/ri-g5-explorers": lesson(
    [
      "New ships like the caravel and tools like the astrolabe made long sea voyages possible.",
      "Explorers sailed for Spain, Portugal, France, England and the Dutch, looking for riches and routes to Asia.",
      "In 1524 Giovanni da Verrazzano anchored in Narragansett Bay, where Native people already had villages and fields. Adriaen Block followed in 1614.",
    ],
    "What did many explorers hope to find?",
    [
      "They wanted spices and silk from the East.",
      "They looked for a sea route to Asia.",
    ],
    "a sea route to Asia and riches",
  ),
  "social/ri-g5-new-nation": lesson(
    [
      "Washington set precedents, and the first political parties formed around Hamilton and Jefferson.",
      "Marbury v. Madison (1803) gave the Supreme Court the power of judicial review.",
      "The Louisiana Purchase and the war with Mexico stretched the country to the Pacific, and Native nations were forced from their homelands.",
    ],
    "The United States bought the Louisiana Territory from France in 1803. What happened to the size of the country?",
    [
      "The territory stretched from the Mississippi to the Rocky Mountains.",
      "It was about as big as the country already was.",
    ],
    "it about doubled",
  ),
};
