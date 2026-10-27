import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Montana's Grade 5 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Montana examples where the original named its own state) under its own id.
export const LESSONS: GradeLessons = {
  "science/mt-g5-sun-stars": lesson(
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
  "science/mt-g5-earth-water": lesson(
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
  "science/mt-g5-ecosystems": lesson(
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
  "social/mt-g5-treaties": lesson(
    [
      "A treaty is an agreement between nations; the US Constitution makes treaties the supreme law of the land.",
      "In treaties, Nations gave up land but kept reserved rights, like hunting and fishing.",
      "Tribal Nations and US officials often understood treaties differently, so historians use both sides' accounts.",
    ],
    "What is a reserved right?",
    [
      "Nations gave some things up in a treaty.",
      "What they kept, and never gave away, is a reserved right.",
    ],
    "a right a Nation kept in a treaty",
  ),
  "social/mt-g5-money": lesson(
    [
      "Money makes trade easier than barter, because everyone accepts it.",
      "Interest is what borrowing costs and what saving earns; higher rates make borrowing cost more.",
      "Every choice has an opportunity cost: the next best thing you give up.",
    ],
    "You borrow $200 at 10% interest for a year. How much do you pay back?",
    [
      "10% of $200 is $20.",
      "$200 + $20 = $220.",
    ],
    "$220",
  ),
};
