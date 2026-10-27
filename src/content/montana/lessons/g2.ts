import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Montana's Grade 2 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Montana examples where the original named its own state) under its own id.
export const LESSONS: GradeLessons = {
  "science/mt-g2-habitats": lesson(
    [
      "A habitat is a place where a living thing lives.",
      "Elk live in the forest. Pronghorn live on the prairie. Frogs live in wetlands and ponds.",
      "Each habitat gives its animals food, water and shelter.",
    ],
    "Where do frogs and herons live: a wetland or a desert?",
    [
      "A desert is very dry.",
      "Frogs and herons need water, so they live in wetlands.",
    ],
    "a wetland",
  ),
  "science/mt-g2-land-water": lesson(
    [
      "Land can be hills, valleys, plains or islands.",
      "Water can be rivers, ponds, lakes or oceans.",
      "The Missouri River is a river. Flathead Lake is a lake.",
    ],
    "Land with water all around it is an…?",
    [
      "A peninsula has water on three sides.",
      "Land with water all around is an island.",
    ],
    "island",
  ),
  "science/mt-g2-earth-changes": lesson(
    [
      "Some changes are fast, like volcanoes, landslides and floods.",
      "Some are slow, like wind and water wearing away land over years.",
      "Plant roots and rock walls help slow these changes.",
    ],
    "Water carves a canyon over many years. Fast or slow?",
    [
      "Many years is a long time.",
      "That is a slow change.",
    ],
    "slow",
  ),
  "social/mt-g2-reading-maps": lesson(
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
  "social/mt-g2-montana-tribes": lesson(
    [
      "Montana is home to twelve Tribal Nations. Each has its own history, language and government.",
      "Seven reservations are land the Nations govern. A map shows their borders with lines.",
      "Elders share oral histories, stories of the past told out loud and passed down.",
    ],
    "How many Tribal Nations are in Montana?",
    [
      "Montana has seven reservations.",
      "Twelve Nations live on them and in towns across the state.",
    ],
    "twelve",
  ),
};
