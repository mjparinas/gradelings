import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Washington, DC's Grade 2 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with DC examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/dc-g2-earth-changes": lesson(
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
  "science/dc-g2-habitats": lesson(
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
  "science/dc-g2-land-water": lesson(
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
  "social/dc-g2-climate-and-food": lesson(
    [
      "Climate is the usual weather of a place over many years.",
      "It is hot near the Equator and cold near the poles. Deserts are dry; rainforests are wet.",
      "Climate shapes what people wear, how they build homes and which crops they grow.",
      "Most of DC's water comes from the Potomac River, and most of our food comes from farms far away.",
    ],
    "Why do farmers in a dry place dig ditches to their fields?",
    [
      "Crops need water to grow.",
      "Ditches carry river water to the fields. This is irrigation.",
    ],
    "to bring water to their crops",
  ),
  "social/dc-g2-first-civilizations": lesson(
    [
      "Egypt and Kush grew along the Nile. Mesopotamia grew between the Tigris and Euphrates.",
      "Floods left rich soil, and farmers dug canals to water crops.",
      "Egypt and Kush built pyramids, and Mesopotamia built ziggurats.",
      "Egyptians wrote in hieroglyphs. The Olmec of Mexico carved giant stone heads.",
    ],
    "Why did the first civilizations grow beside rivers?",
    [
      "Farms need water.",
      "Floods left rich soil for crops.",
    ],
    "rivers gave water and rich soil",
  ),
  "social/dc-g2-china-rome-americas": lesson(
    [
      "Ancient Rome began in Italy and built roads and aqueducts.",
      "Ancient China built the Great Wall and invented paper and silk.",
      "The Maya, Aztec and Inca grew corn. The Inca grew potatoes on mountain terraces.",
      "Many DC buildings, like the Capitol, borrow columns and domes from Rome.",
    ],
    "Which crop did the Maya, Aztec and Inca all grow?",
    [
      "Think of the crop used to make tortillas.",
      "It is also called maize.",
    ],
    "corn",
  ),
  "social/dc-g2-world-kingdoms": lesson(
    [
      "Mali and Songhai were rich empires in West Africa. Timbuktu was a city of books and schools.",
      "Traders crossed the Sahara on camels, trading salt for gold.",
      "The Aztec built Tenochtitlan on a lake, and the Inca built Machu Picchu in the Andes.",
      "The Ottoman Empire ruled from Istanbul, where Europe and Asia meet.",
    ],
    "Mansa Musa ruled which empire?",
    [
      "He was famous for his gold.",
      "His empire was in West Africa.",
    ],
    "Mali",
  ),
  "social/dc-g2-history-detectives": lesson(
    [
      "Artifacts are objects people made or used long ago, like pots, tools and coins.",
      "A primary source was made at the time, like a letter or photo. A secondary source was made later.",
      "Maps have a title, a legend, a compass rose and a scale. Old and new maps show how places change.",
    ],
    "Is a letter written in 1862 a primary or a secondary source?",
    [
      "It was written at the time.",
      "The writer was there.",
    ],
    "a primary source",
  ),
};
