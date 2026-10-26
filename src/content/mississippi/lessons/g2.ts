import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Mississippi's Grade 2 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson under its own id, and a unit borrowed from another grade carries the lesson it has
// there. Mississippi's own units have lessons written for them.
export const LESSONS: GradeLessons = {
  "science/grouping-living-things": lesson(
    [
      "Scientists sort living things into groups by their features.",
      "Mammals have fur or hair and feed their babies milk. Birds have feathers. Fish have fins and gills.",
      "Biodiversity means the variety of life in a place.",
    ],
    "A bat has fur and feeds its babies milk. Which group is it in?",
    [
      "Fur or hair and milk for babies are mammal features.",
      "Flying does not make it a bird.",
    ],
    "mammal",
  ),
  "science/mb-k-sun-and-moon": lesson(
    [
      "The Sun rises in the morning and sets at night, every day.",
      "At noon the Sun is high in the sky.",
      "The Moon seems to change shape. Never look right at the Sun.",
    ],
    "Where is the Sun at noon?",
    [
      "The Sun rises low in the morning.",
      "By noon it is high up.",
    ],
    "high in the sky",
  ),
  "science/ms-g2-earth-changes": lesson(
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
  "science/tx-g1-food-chains": lesson(
    [
      "A food chain shows who eats what.",
      "Every food chain starts with a plant.",
      "Plants need sunlight, water, air and soil.",
    ],
    "Grass → grasshopper → ___. Who eats the grasshopper?",
    [
      "A bird eats bugs.",
      "The bird comes next.",
    ],
    "a bird",
  ),
  "science/tx-g1-heat": lesson(
    [
      "Heat melts, cooks and dries things.",
      "Some changes go back: melted butter can get hard again.",
      "Some do not: a cooked egg can't go back.",
    ],
    "Can a cooked egg turn back to raw?",
    [
      "Cooking changes the egg for good.",
    ],
    "no",
  ),
  "science/tx-k-earth-materials": lesson(
    [
      "Rocks can be big or small, round or rough.",
      "Wind is moving air. Air is all around us.",
      "We use soil to grow plants and water to drink.",
    ],
    "Why do gardens need soil?",
    [
      "Plant roots grow in soil.",
      "Soil helps plants grow.",
    ],
    "so plants can grow",
  ),
  "social/ms-g2-reading-maps": lesson(
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
