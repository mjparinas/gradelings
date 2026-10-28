import { lesson, type GradeLessons } from "../../lessons";

// Lessons for North Dakota's Grade 2 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with North Dakota examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/nd-g2-earth-changes": lesson(
    [
      "Some changes are fast, like landslides and floods.",
      "Some are slow, like wind and water carving the Badlands over many years.",
      "Plant roots and rows of trees help slow these changes.",
    ],
    "Water carves a valley over many years. Fast or slow?",
    [
      "Many years is a long time.",
      "That is a slow change.",
    ],
    "slow",
  ),
  "science/nd-g2-habitats": lesson(
    [
      "A habitat is a place where a living thing lives.",
      "Each habitat has its own life: ducks in prairie potholes, prairie dogs in grassland, cactus in deserts.",
      "Forests and wetlands often have more kinds of animals than deserts.",
    ],
    "Which animal lives in a prairie pothole pond: a duck or a camel?",
    [
      "A camel lives in a dry desert.",
      "A duck needs water.",
    ],
    "a duck",
  ),
  "science/nd-g2-land-water": lesson(
    [
      "Landforms: buttes, valleys, hills and plains.",
      "Bodies of water: rivers, lakes and oceans. The Missouri River flows through North Dakota.",
      "Solid water stays in glaciers on high mountains.",
    ],
    "Low land beside a river, between higher land, is a…?",
    [
      "The land on each side is higher.",
      "The low land between is a valley.",
    ],
    "valley",
  ),
  "social/nd-g2-communities": lesson(
    [
      "A city has many people close together. A town is smaller. Rural land has farms and ranches.",
      "Producers make or grow goods. Consumers buy and use them.",
      "Communities share services, like snowplows, parks and libraries, paid for with taxes.",
    ],
    "A farmer grows wheat and sells it. Producer or consumer?",
    [
      "The farmer grows something to sell.",
      "People who make or grow things are producers.",
    ],
    "producer",
  ),
};
