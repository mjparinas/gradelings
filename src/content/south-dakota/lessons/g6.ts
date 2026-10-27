import { lesson, type GradeLessons } from "../../lessons";

// Lessons for South Dakota's Grade 6 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with South Dakota examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/sd-g6-climate": lesson(
    [
      "Climate is the average weather over many years.",
      "Oceans keep coastal temperatures steady, so coastal cities have mild winters.",
      "People burn much more fossil fuel than 200 years ago, so there is more CO₂ in the air.",
      "We can use less energy, like walking short trips, and adapt, like planting shade trees.",
    ],
    "Why does a coastal city have milder winters than a city far inland?",
    [
      "Ocean water warms and cools slowly.",
      "It keeps nearby temperatures steady.",
    ],
    "the ocean keeps temperatures steady",
  ),
  "science/sd-g6-design": lesson(
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
  "science/sd-g6-growth": lesson(
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
  "science/sd-g6-weather": lesson(
    [
      "Evaporation turns water into vapour; condensation cools vapour into cloud droplets.",
      "An air mass is a big body of air with the same temperature and moisture.",
      "Where a cold air mass meets a warm one, a front forms and the weather changes, often with storms.",
    ],
    "A cold air mass pushes into warm, moist air over South Dakota. What often happens?",
    [
      "The warm air is pushed up and cools.",
      "Its water vapour condenses into clouds and rain.",
    ],
    "a cold front brings clouds and storms",
  ),
  "social/or-g7-age-of-revolutions": lesson(
    [
      "The Scientific Revolution used observation: Copernicus said Earth moves around the Sun; Galileo used a telescope.",
      "Enlightenment thinkers argued for rights and limits on power: Montesquieu proposed separate branches; Wollstonecraft argued for women’s rights.",
      "Revolutions followed: America (1775), France (1789), Haiti (1791–1804) and Latin America.",
    ],
    "Montesquieu proposed what idea about government?",
    [
      "He worried about one ruler holding all power.",
      "He suggested splitting power among separate branches.",
    ],
    "separating government into branches",
  ),
};
