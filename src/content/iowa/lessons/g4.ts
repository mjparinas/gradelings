import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Iowa's Grade 4 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Iowa examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/ia-g4-earth-hazards": lesson(
    [
      "Maps show patterns in Earth's features, like where rivers flood and where storms often strike.",
      "People cannot stop natural hazards, but they can reduce the harm they do.",
      "Warning sirens, levees, strong buildings and safe plans help during tornadoes, floods and storms.",
    ],
    "A tornado warning sounds at school. What helps keep people safe?",
    [
      "Go to the lowest floor, away from windows.",
      "Crouch down and cover your head.",
    ],
    "take shelter in an inside room on the lowest floor",
  ),
  "science/ia-g4-energy-resources": lesson(
    [
      "Renewable resources, like sunlight, wind and moving water, won't run out.",
      "Wind turbines make more than half of Iowa's electricity. Ethanol is a fuel made from corn.",
      "Coal, oil and natural gas are fossil fuels. They will run out, and burning them pollutes the air.",
      "Every energy choice has good points and costs for the environment.",
    ],
    "Is wind a renewable or a nonrenewable resource?",
    [
      "The wind keeps blowing, day after day.",
      "It won't run out.",
    ],
    "renewable",
  ),
  "science/ia-g4-rocks-erosion": lesson(
    [
      "Weathering breaks rock. Erosion moves it. Running water moves the most.",
      "Glaciers scrape and carry rock. Roots growing in cracks can split rock.",
      "Over a very long time, erosion can carve deep canyons.",
      "Plants and their roots slow erosion on a hillside.",
    ],
    "Which hillside erodes faster in heavy rain: a bare one or a grassy one?",
    [
      "Roots hold soil in place.",
      "A bare hill has nothing to hold the soil.",
    ],
    "the bare hillside",
  ),
  "social/ia-g4-settling-iowa": lesson(
    [
      "In the 1830s, most people in the land that is now Iowa were Native Americans. By 1860, most were settlers.",
      "Treaties took Native land, and the Sauk, Meskwaki, Ho-Chunk and other nations were forced to move away.",
      "Cheap, rich land drew settlers. Steel plows, the Homestead Act and railroads helped them settle.",
      "Settlement helped many settlers but cost Native nations their homeland.",
    ],
    "What drew most settlers to Iowa?",
    [
      "Iowa's soil was some of the best in the world.",
      "Land was cheap, so families could own a farm.",
    ],
    "cheap, rich farmland",
  ),
  "social/ia-g4-immigrants": lesson(
    [
      "Push factors make people leave home, like war or hunger. Pull factors draw them, like land and jobs.",
      "Germans, Dutch, Norwegians, Danes, Czechs and Irish settled in Iowa in the 1800s, often in towns together.",
      "Later came Mexican railroad workers, Tai Dam and Bosnian refugees and many Latino families.",
      "Some policies welcomed newcomers; others, like the 1918 Babel Proclamation, restricted them.",
    ],
    "Famine in Ireland made many people leave. Is famine a push or a pull factor?",
    [
      "A push factor makes people leave their home.",
      "Hunger pushed people away from Ireland.",
    ],
    "a push factor",
  ),
};
