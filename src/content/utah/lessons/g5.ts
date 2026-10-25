import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Utah's Grade 5 units that the shared lesson files don't cover: Utah's own units, Utah copies of
// other states' units (the original's lesson with Utah examples), and units Utah teaches in a different grade from the
// original (the lesson they have there).
export const LESSONS: GradeLessons = {
  "science/ut-g5-earth-hazards": lesson(
    ["Maps show patterns: mountains form long chains, and many volcanoes and earthquakes are along plate edges.", "Utah's Wasatch Fault can cause earthquakes, and its canyons can flood fast.", "In a strong earthquake, drop, cover and hold on. Bolting shelves down makes homes safer."],
    "You feel a strong earthquake at school. What should you do?",
    ["Get low so you don't fall.", "Take cover under a sturdy desk and hold on."],
    "drop, cover and hold on",
  ),
  "science/ut-g5-earth-water": lesson(
    ["Earth's systems: geosphere (rock and land), hydrosphere (water), atmosphere (air) and biosphere (life).", "Systems interact, like dust from the dry Great Salt Lake shore blowing into the air.", "Only a small part of Earth's water is fresh, so saving it matters in dry Utah."],
    "Plant roots grow into cracks and split a rock. Which systems interact?",
    ["Plants are living: the biosphere.", "Rock is the geosphere."],
    "biosphere and geosphere",
  ),
  "science/ut-g5-ecosystems": lesson(
    ["Producers make food. Consumers eat other living things.", "Decomposers, like worms and fungi, return nutrients to the soil.", "In the Great Salt Lake, algae feed brine shrimp, and brine shrimp feed birds."],
    "Brine shrimp eat algae. Are brine shrimp producers or consumers?",
    ["Brine shrimp can't make their own food.", "They eat algae."],
    "consumers",
  ),
  "science/wind-water-ice": lesson(
    ["Weathering breaks rock into smaller bits.", "Erosion carries those bits to a new place by wind, water or ice.", "Plants and rows of trees (windbreaks) help hold soil in place."],
    "A river carries sand downstream. Weathering or erosion?",
    ["The sand is being moved to a new place.", "Moving it is erosion."],
    "erosion",
  ),
};
