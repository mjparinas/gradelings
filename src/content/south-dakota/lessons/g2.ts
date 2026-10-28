import { lesson, type GradeLessons } from "../../lessons";

// Lessons for South Dakota's Grade 2 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with South Dakota examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/sd-g2-earth-changes": lesson(
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
  "science/sd-g2-habitats": lesson(
    [
      "A habitat is a place where a living thing lives.",
      "Each habitat has its own life: prairie dogs on the prairie, frogs in ponds, cactus in deserts.",
      "Forests often have more kinds of animals than deserts.",
    ],
    "Which animal lives in a pond: a frog or a camel?",
    [
      "A camel lives in a dry desert.",
      "A frog needs water.",
    ],
    "a frog",
  ),
  "science/sd-g2-land-water": lesson(
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
  "social/sd-g2-middle-ages": lesson(
    [
      "After Rome fell in the West, Europe entered the Middle Ages.",
      "Lords lived in castles, knights fought for them, and serfs farmed their land.",
      "The Magna Carta (1215) said even a king must obey the law.",
      "The Renaissance brought new art, and the printing press made books easier to get.",
    ],
    "What did the Magna Carta say about the king?",
    [
      "Nobles made King John agree to it in 1215.",
      "It put the king under the law.",
    ],
    "even the king must obey the law",
  ),
  "social/sd-g2-growing-nation": lesson(
    [
      "George Washington was the first president.",
      "In 1803 the Louisiana Purchase doubled the country, and Lewis and Clark paddled up the Missouri River through South Dakota.",
      "Frederick Douglass and Harriet Tubman worked to end slavery.",
      "Abraham Lincoln led the country through the Civil War (1861 to 1865).",
    ],
    "Which river did Lewis and Clark follow through South Dakota?",
    [
      "They went upstream in 1804.",
      "It runs through the middle of the state.",
    ],
    "the Missouri River",
  ),
};
