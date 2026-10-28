import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Wyoming's Grade 6 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Wyoming examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/wy-g6-design": lesson(
    [
      "Criteria are what a solution must do to succeed. Constraints are limits.",
      "A decision matrix compares designs against the criteria.",
      "A trade-off is giving up some of one thing to get more of another.",
      "After a test fails, improve the design and test again.",
    ],
    "A cheaper filter cleans water less well. Choosing it means accepting a… what?",
    [
      "You give up some cleaning to save money.",
      "Giving up one thing for another is a trade-off.",
    ],
    "a trade-off",
  ),
  "science/wy-g6-growth": lesson(
    [
      "Asexual reproduction needs one parent: bacteria splitting, strawberry runners.",
      "Sexual reproduction needs two parents and creates variation.",
      "Behaviours like nest building and feeding chicks help young survive.",
      "Genes and the environment both affect growth: the same plants grow differently in sun and shade.",
    ],
    "Two identical plants grow in sun and in shade and end up different heights. Why?",
    [
      "Their genes are the same.",
      "So the difference comes from where they grew.",
    ],
    "the environment",
  ),
  "science/wy-g6-weather": lesson(
    [
      "Evaporation turns water into vapour; condensation cools vapour into cloud droplets.",
      "An air mass is a big body of air with the same temperature and moisture.",
      "Where a cold air mass meets a warm one, a front forms and the weather changes, often with storms.",
    ],
    "A cold air mass pushes into warm, moist air over Wyoming. What often happens?",
    [
      "The warm air is pushed up and cools.",
      "Its water vapour condenses into clouds and rain.",
    ],
    "a cold front brings clouds and storms",
  ),
  "science/wy-g6-climate": lesson(
    [
      "Climate is the average weather over many years.",
      "Higher places are cooler: Wyoming is one of the highest states.",
      "Mountains squeeze rain and snow out of the air, so the land beyond them is dry. This is a rain shadow.",
      "Burning fossil fuels adds CO₂ to the air, which traps heat and warms Earth.",
    ],
    "Why is the land east of a big mountain range often dry?",
    [
      "Moist air rises over the mountains and cools.",
      "It drops its rain and snow on the mountains first.",
    ],
    "it is in a rain shadow",
  ),
};
