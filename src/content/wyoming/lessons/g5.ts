import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Wyoming's Grade 5 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Wyoming examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/wy-g5-earth-water": lesson(
    [
      "Earth has four systems: the geosphere (land), hydrosphere (water), atmosphere (air) and biosphere (life).",
      "Most of Wyoming's river water starts as mountain snow, and many ranches and towns use wells.",
      "Communities protect water by keeping streams clean, storing water in reservoirs and using it wisely.",
    ],
    "Trees take in water and give off water vapour. Which systems interact?",
    [
      "Trees: biosphere. Water: hydrosphere.",
      "The vapour goes into the air: atmosphere.",
    ],
    "biosphere, hydrosphere and atmosphere",
  ),
  "science/wy-g5-ecosystems": lesson(
    [
      "Producers make food. Consumers eat other living things.",
      "Decomposers, like worms and fungi, return nutrients to the soil.",
      "Matter moves around an ecosystem again and again.",
    ],
    "Pronghorn eat sagebrush. Are pronghorn producers or consumers?",
    [
      "Pronghorn can't make their own food.",
      "They eat plants.",
    ],
    "consumers",
  ),
  "science/wy-g5-sun-stars": lesson(
    [
      "Earth spins once about every 24 hours, giving day and night.",
      "Shadows are long in the morning and evening and shortest near noon, when the sun is highest.",
      "Days are longest in June and shortest in December.",
      "As Earth moves around the sun, we see different stars in different seasons.",
    ],
    "When is your shadow shortest on a sunny day?",
    [
      "Shadows are shortest when the sun is highest.",
      "The sun is highest near the middle of the day.",
    ],
    "near noon",
  ),
  "social/wy-g5-trails-west": lesson(
    [
      "Wagon trails crossed Wyoming at South Pass, an easy way over the Rocky Mountains.",
      "The Pony Express carried mail on horseback until the telegraph replaced it in 1861.",
      "The Union Pacific Railroad crossed Wyoming in 1867 and 1868, and towns like Cheyenne grew along it.",
      "These changes crossed the homelands of the Shoshone, Arapaho, Lakota and Cheyenne and changed their lives.",
    ],
    "Why did the telegraph end the Pony Express?",
    [
      "A rider took about ten days to cross the West.",
      "A telegraph message went by wire almost at once.",
    ],
    "it sent messages much faster",
  ),
  "social/wy-g5-explorers": lesson(
    [
      "New ships like the caravel and tools like the astrolabe made long sea voyages possible.",
      "Explorers sailed for Spain, Portugal, France, England and the Dutch, looking for riches and routes to Asia.",
      "Later, explorers and fur trappers such as John Colter and Robert Stuart crossed what is now Wyoming, where Native nations already lived.",
    ],
    "What did many explorers hope to find?",
    [
      "They wanted spices and silk from the East.",
      "They looked for a sea route to Asia.",
    ],
    "a sea route to Asia and riches",
  ),
};
