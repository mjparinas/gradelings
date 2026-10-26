import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Connecticut's Grade 6 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Connecticut examples where the original named its own state) under its own id.
export const LESSONS: GradeLessons = {
  "science/ct-g6-weather": lesson(
    [
      "An air mass is a huge body of air with the same temperature and moisture.",
      "Where two air masses meet is a front; fronts often bring storms.",
      "Sunlight drives evaporation, and gravity brings rain and snow back down.",
    ],
    "A cold front passes. What usually happens to the temperature?",
    [
      "Cold air pushes in behind the front.",
      "So the temperature drops.",
    ],
    "it drops",
  ),
  "science/ct-g6-climate": lesson(
    [
      "Climate depends on latitude, nearness to large bodies of water, mountains and winds.",
      "Coastal Connecticut has milder winters than the hills of the northwest, because the ocean warms and cools slowly.",
      "Greenhouse gases like carbon dioxide trap heat and are warming Earth.",
    ],
    "Why are winters milder on the coast than inland?",
    [
      "Water changes temperature slowly.",
      "The ocean keeps the coast from getting as cold.",
    ],
    "the ocean warms and cools slowly",
  ),
  "science/ct-g6-growth": lesson(
    [
      "Animals use behaviours like songs and nests to help them reproduce.",
      "Plants use flowers, scents and wind to spread pollen and seeds.",
      "Growth depends on genes and the environment (water, food, light). Sexual reproduction mixes genes from two parents; asexual makes copies of one.",
    ],
    "A potato grows from a piece of potato. Sexual or asexual reproduction?",
    [
      "There is only one parent.",
      "The new plant is a copy, so it is asexual.",
    ],
    "asexual",
  ),
  "science/ct-g6-design": lesson(
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
  "social/ct-g6-world-regions": lesson(
    [
      "World regions share features like climate, landforms and culture. Know which countries are in which region: India in Asia, New Zealand in Oceania.",
      "People adapt to climate, like warm clothing and insulated homes in the cold.",
      "The Ring of Fire around the Pacific has many volcanoes and earthquakes. Trade connects regions.",
    ],
    "The Amazon rainforest is mostly in which country?",
    [
      "The Amazon is in South America.",
      "Most of it lies in the largest South American country.",
    ],
    "Brazil",
  ),
};
