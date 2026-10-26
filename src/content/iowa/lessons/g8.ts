import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Iowa's Grade 8 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Iowa examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/plant-parts-ab": lesson(
    [
      "Roots take in water, stems hold the plant up, leaves make food, flowers make seeds.",
      "Xylem carries water up from the roots. Phloem carries sugar from the leaves.",
      "Stomata are tiny leaf openings that let carbon dioxide in and oxygen and water vapour out.",
    ],
    "Which tubes carry water from the roots to the leaves?",
    [
      "Phloem carries sugar.",
      "The water tubes are the other kind.",
    ],
    "xylem",
  ),
  "science/ia-g8-weather": lesson(
    [
      "Evaporation turns water into vapour; condensation cools vapour into cloud droplets.",
      "An air mass is a big body of air with the same temperature and moisture.",
      "Where a cold air mass meets a warm one, a front forms and the weather changes, often with storms.",
    ],
    "A cold air mass pushes into warm, moist air over Iowa. What often happens?",
    [
      "The warm air is pushed up and cools.",
      "Its water vapour condenses into clouds and rain.",
    ],
    "a cold front brings clouds and storms",
  ),
  "science/ia-g8-climate": lesson(
    [
      "Climate is the average weather over many years.",
      "Oceans keep coastal temperatures steady, so places far inland, like Iowa, have hotter summers and colder winters.",
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
  "science/ia-g8-growth": lesson(
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
  "social/ia-g8-iowa-and-the-nation": lesson(
    [
      "Iowa came to the United States in the Louisiana Purchase, became a territory in 1838 and a state on December 28, 1846.",
      "It joined as a free state, soon after Florida joined as a slave state.",
      "Iowa's 1857 constitution sets up three branches and begins with a Bill of Rights.",
      "About 76,000 Iowans fought for the Union, and Iowans in Tabor, Grinnell and Salem helped freedom seekers.",
    ],
    "Iowa was admitted as a free state. Which slave state joined at about the same time?",
    [
      "Free and slave states were often admitted in pairs.",
      "The slave state joined in 1845.",
    ],
    "Florida",
  ),
};
