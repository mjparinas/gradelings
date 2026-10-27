import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Rhode Island's Grade 2 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Rhode Island examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/ri-g2-earth-changes": lesson(
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
  "science/ri-g2-habitats": lesson(
    [
      "A habitat is a place where a living thing lives.",
      "Each habitat has its own life: crabs in salt marshes, frogs in ponds, cactus in deserts.",
      "Forests often have more kinds of animals than deserts.",
    ],
    "Which animal lives in a pond: a frog or a camel?",
    [
      "A camel lives in a dry desert.",
      "A frog needs water.",
    ],
    "a frog",
  ),
  "science/ri-g2-land-water": lesson(
    [
      "Landforms: mountains, valleys, hills and plains.",
      "Bodies of water: rivers, lakes, oceans and bays. A bay is ocean partly closed in by land.",
      "Solid water stays in glaciers on high mountains.",
    ],
    "Low land between mountains is a…?",
    [
      "Mountains are high.",
      "The low land between them is a valley.",
    ],
    "valley",
  ),
  "social/ri-g2-global-rhode-island": lesson(
    [
      "People move for push reasons (like war or no jobs) and pull reasons (like jobs or family).",
      "Cape Verdean, Portuguese, Dominican and many other families have made homes in Rhode Island.",
      "Ships at the Port of Providence bring goods in (imports) and carry goods out (exports).",
    ],
    "A family moves to Rhode Island to be near their cousins. Push or pull?",
    [
      "Being near family draws them to a new place.",
      "Something that draws people is a pull.",
    ],
    "pull",
  ),
};
