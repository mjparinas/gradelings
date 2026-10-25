import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Nevada's Grade 2 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Nevada examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/nv-g2-earth-changes": lesson(
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
  "science/nv-g2-habitats": lesson(
    [
      "A habitat is a place where a living thing lives.",
      "Each habitat has its own life: bison in grasslands, Joshua trees in deserts.",
      "Forests often have more kinds of animals than deserts.",
    ],
    "Which animal lives in a pond: a frog or a camel?",
    [
      "A camel lives in a dry desert.",
      "A frog needs water.",
    ],
    "a frog",
  ),
  "science/nv-g2-land-water": lesson(
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
  "social/nv-g2-symbols-holidays": lesson(
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
};
