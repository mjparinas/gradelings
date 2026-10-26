import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Nebraska's Grade 2 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Nebraska examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/neb-g2-earth-changes": lesson(
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
  "science/neb-g2-habitats": lesson(
    [
      "A habitat is a place where a living thing lives.",
      "Each habitat has its own life: bison in the prairie, cactus in deserts.",
      "Forests often have more kinds of animals than deserts.",
    ],
    "Which animal lives in a pond: a frog or a camel?",
    [
      "A camel lives in a dry desert.",
      "A frog needs water.",
    ],
    "a frog",
  ),
  "science/neb-g2-land-water": lesson(
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
  "social/neb-g2-symbols-holidays": lesson(
    [
      "Symbols stand for our country: the flag, the bald eagle and the Liberty Bell.",
      "National holidays remember people and events, like the Fourth of July and Presidents' Day.",
      "The President leads the country, signs or vetoes laws and is chosen by voters every four years.",
    ],
    "What do we celebrate on the Fourth of July?",
    [
      "The Declaration of Independence was signed in 1776.",
      "That was the start of the United States.",
    ],
    "the birthday of the United States",
  ),
  "social/neb-g2-difference-makers": lesson(
    [
      "Difference makers solve problems and help others.",
      "Helen Keller spoke out for others. Jackie Robinson broke a barrier in baseball.",
      "Susan La Flesche Picotte, of the Omaha Tribe, became the first Native American woman doctor.",
    ],
    "George Washington Carver found many uses for…",
    [
      "He was a scientist who studied plants.",
      "He worked with peanuts and sweet potatoes.",
    ],
    "peanuts and sweet potatoes",
  ),
  "social/neb-g2-family-journeys": lesson(
    [
      "An immigrant moves to a new country to live.",
      "Families move for jobs, safety or to be near family.",
      "To find how long ago, subtract: this year minus the year it happened.",
    ],
    "A family moved here in 2018. It is 2025 now. How many years ago was that?",
    [
      "2025 − 2018 = 7.",
    ],
    "7",
  ),
  "social/neb-g2-making-trading": lesson(
    [
      "Food is grown on farms and ranches, made ready in factories, shipped and sold in stores.",
      "Every choice has a cost and a benefit, and people trade for what they don't make.",
      "Workers need skills: a rancher knows how to raise cattle.",
    ],
    "Nebraska grows more corn than it can use. What do farmers do with the rest?",
    [
      "People everywhere need flour for bread.",
      "Nebraska corn is shipped and sold to other places.",
    ],
    "sell it to other places",
  ),
};
