import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Vermont's Grade 2 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Vermont examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/vt-g2-earth-changes": lesson(
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
  "science/vt-g2-habitats": lesson(
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
  "science/vt-g2-land-water": lesson(
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
  "social/vt-g2-difference-makers": lesson(
    [
      "Difference makers solve problems and help others.",
      "Helen Keller spoke out for others. Jackie Robinson broke a barrier in baseball.",
      "Wilson Bentley of Jericho was the first person to photograph a single snowflake.",
    ],
    "George Washington Carver found many uses for…",
    [
      "He was a scientist who studied plants.",
      "He worked with peanuts and sweet potatoes.",
    ],
    "peanuts and sweet potatoes",
  ),
  "social/vt-g2-family-journeys": lesson(
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
  "social/vt-g2-making-trading": lesson(
    [
      "Food is grown on farms, made ready in factories, shipped and sold in stores.",
      "Every choice has a cost and a benefit, and people trade for what they don't make.",
      "Workers need skills: a maple farmer knows how to boil sap into syrup.",
    ],
    "Why does Vermont trade for bananas?",
    [
      "Bananas need a warm, wet place to grow.",
      "Vermont's winters are too cold, so bananas come from other places.",
    ],
    "they can't grow in Vermont's cold climate",
  ),
  "social/vt-g2-the-americas": lesson(
    [
      "North America and South America are two continents. Together they are called the Americas.",
      "Canada is north of the United States, and Mexico is to the south. Many other countries are in South America and the Caribbean.",
      "The Amazon rainforest, the Andes mountains and the Rocky Mountains are big landforms of the Americas.",
    ],
    "Which country is just north of Vermont?",
    [
      "Vermont is on the northern border of the United States.",
      "People there speak English and French.",
    ],
    "Canada",
  ),
};
