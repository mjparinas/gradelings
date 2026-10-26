import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Connecticut's Grade 2 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Connecticut examples where the original named its own state) under its own id.
export const LESSONS: GradeLessons = {
  "science/ct-g2-habitats": lesson(
    [
      "A habitat is a place where a living thing lives.",
      "Deer live in the woods. Crabs live by the shore. Frogs live in wetlands and ponds.",
      "Each habitat gives its animals food, water and shelter.",
    ],
    "Where do frogs and herons live: a wetland or a desert?",
    [
      "A desert is very dry.",
      "Frogs and herons need water, so they live in wetlands.",
    ],
    "a wetland",
  ),
  "science/ct-g2-land-water": lesson(
    [
      "Land can be hills, valleys, plains or islands.",
      "Water can be rivers, ponds, lakes or oceans.",
      "The Connecticut River is a river. Long Island Sound is part of the ocean.",
    ],
    "Land with water all around it is an…?",
    [
      "A peninsula has water on three sides.",
      "Land with water all around is an island.",
    ],
    "island",
  ),
  "science/ct-g2-earth-changes": lesson(
    [
      "Some changes are fast, like volcanoes, landslides and floods.",
      "Some are slow, like wind and water wearing away land over years.",
      "Plant roots and stone walls help slow these changes.",
    ],
    "Water carves a canyon over many years. Fast or slow?",
    [
      "Many years is a long time.",
      "That is a slow change.",
    ],
    "slow",
  ),
  "social/ct-g2-reading-maps": lesson(
    [
      "A map is a drawing of a place seen from above. North is usually at the top.",
      "On a grid map, find the column letter, then the row number.",
      "The key explains symbols, like a star for a capital city.",
    ],
    "On a grid map, the park is in square B3. How do you find it?",
    [
      "Find column B first.",
      "Then go to row 3.",
    ],
    "column B, then row 3",
  ),
};
