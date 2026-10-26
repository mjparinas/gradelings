import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Nebraska's Grade 5 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Nebraska examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/neb-g5-earth-water": lesson(
    [
      "Earth has four systems: the geosphere (land), hydrosphere (water), atmosphere (air) and biosphere (life).",
      "Most of Earth's water is salty ocean water, and most fresh water is frozen in ice.",
      "In Nebraska, rivers, lakes and the Ogallala Aquifer under the ground give people fresh water, so people work to save it and keep it clean.",
    ],
    "Trees take in water and give off water vapour. Which systems interact?",
    [
      "Trees: biosphere. Water: hydrosphere.",
      "The vapour goes into the air: atmosphere.",
    ],
    "biosphere, hydrosphere and atmosphere",
  ),
  "science/neb-g5-ecosystems": lesson(
    [
      "Producers make food. Consumers eat other living things.",
      "Decomposers, like worms and fungi, return nutrients to the soil.",
      "Matter moves around an ecosystem again and again.",
    ],
    "Hawks eat prairie mice. Are hawks producers or consumers?",
    [
      "Hawks can't make their own food.",
      "They eat other animals.",
    ],
    "consumers",
  ),
  "science/neb-g5-sun-stars": lesson(
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
  "social/neb-g5-eastern-woodland": lesson(
    [
      "The Eastern Woodland is the land of forests east of the Mississippi River.",
      "Many Woodland peoples grew the Three Sisters (corn, beans and squash), hunted and fished.",
      "Peoples adapted to their land: longhouses and wigwams in the forests, tipis on the Plains, adobe in the Southwest.",
    ],
    "Why did Plains peoples live in tipis that were easy to move?",
    [
      "Think about how they got food.",
      "They followed the bison herds.",
    ],
    "they followed the bison herds",
  ),
  "social/neb-g5-explorers": lesson(
    [
      "New ships like the caravel and tools like the astrolabe made long sea voyages possible.",
      "Explorers sailed for Spain, Portugal, France, England and the Dutch, looking for riches and routes to Asia.",
      "Spanish and French explorers and traders reached the plains of what is now Nebraska, and in 1739 the Mallet brothers named the Platte River.",
    ],
    "What did many explorers hope to find?",
    [
      "They wanted spices and silk from the East.",
      "They looked for a sea route to Asia.",
    ],
    "a sea route to Asia and riches",
  ),
};
