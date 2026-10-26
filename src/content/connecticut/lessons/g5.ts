import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Connecticut's Grade 5 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Connecticut examples where the original named its own state) under its own id.
export const LESSONS: GradeLessons = {
  "science/ct-g5-sun-stars": lesson(
    [
      "The sun is a star. It looks bigger and brighter because it is much closer than other stars.",
      "Earth spins once a day, so shadows change from morning to noon to evening.",
      "Earth moves around the sun, so we see different stars in different seasons.",
    ],
    "When is your shadow shortest: at noon or early morning?",
    [
      "At noon the sun is highest.",
      "A high sun makes a short shadow.",
    ],
    "at noon",
  ),
  "science/ct-g5-earth-water": lesson(
    [
      "Earth has four systems: the geosphere (rock and soil), hydrosphere (water), atmosphere (air) and biosphere (living things).",
      "They interact: rain wears away soil, and plants put water vapour into the air.",
      "Almost all of Earth's water is salty ocean water; very little is fresh and easy to use.",
    ],
    "Rain washes soil into a river. Which two systems interact?",
    [
      "Rain and rivers are water.",
      "Soil is part of the geosphere.",
    ],
    "the hydrosphere and the geosphere",
  ),
  "science/ct-g5-ecosystems": lesson(
    [
      "Producers (plants) make food. Consumers eat plants or other animals.",
      "Decomposers, like mushrooms, worms and bacteria, break down dead things.",
      "They return matter to the soil so plants can use it again.",
      "Without decomposers, dead things would pile up.",
    ],
    "Which is a decomposer: a hawk, a mushroom or a fern?",
    [
      "A hawk is a consumer and a fern is a producer.",
      "A mushroom breaks down dead matter.",
    ],
    "a mushroom",
  ),
  "social/ct-g5-colonial-connecticut": lesson(
    [
      "In 1636, Thomas Hooker led settlers to Hartford, near Native nations who already lived there.",
      "In 1639, the river towns wrote the Fundamental Orders, a plan for government based on the people's consent.",
      "Colonists farmed, built ships and traded food and animals to the Caribbean.",
    ],
    "Why is Connecticut called the Constitution State?",
    [
      "Early Connecticut wrote down a plan for its government.",
      "The Fundamental Orders of 1639 were one of the first.",
    ],
    "because of the Fundamental Orders of 1639",
  ),
  "social/ct-g5-connecticut-revolution": lesson(
    [
      "Connecticut was the Provision State: its farms sent food and supplies to the Continental Army.",
      "Nathan Hale, Israel Putnam and Black soldiers from Connecticut fought for independence.",
      "Patriots wanted independence; Loyalists stayed loyal to the king.",
    ],
    "Why was Connecticut called the Provision State?",
    [
      "Provisions are food and supplies.",
      "Connecticut sent them to George Washington's army.",
    ],
    "it sent food and supplies to the army",
  ),
};
