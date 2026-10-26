import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Idaho's Grade 2 units that the shared lesson files don't cover. A copy of another state's unit
// carries a lesson written for Idaho under its own id, and a unit borrowed from another grade carries the lesson it
// has there, word for word.
export const LESSONS: GradeLessons = {
  "science/id-g2-habitats": lesson(
    [
      "A habitat is a place where a living thing lives.",
      "Each habitat has its own life: sage grouse in sagebrush, moose in mountain forests, trout in cold rivers.",
      "Plants and animals in a habitat have what they need: food, water and shelter.",
    ],
    "Which animal lives in a pond: a frog or a camel?",
    [
      "A camel lives in a dry desert.",
      "A frog needs water.",
    ],
    "a frog",
  ),
  "science/id-g2-land-water": lesson(
    [
      "Landforms: mountains, valleys, hills, plains and canyons.",
      "Bodies of water: rivers, lakes and oceans. Maps show them in blue.",
      "Solid water stays as snow and ice on high mountains, then melts into rivers.",
    ],
    "Low land between mountains is a…?",
    [
      "Mountains are high.",
      "The low land between them is a valley.",
    ],
    "valley",
  ),
  "science/id-g2-earth-changes": lesson(
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
  "social/id-g2-idaho-tribes": lesson(
    [
      "Five federally recognized tribes are in Idaho: the Coeur d'Alene, Kootenai, Nez Perce, Shoshone-Bannock and Shoshone-Paiute.",
      "Each tribe has its own homeland and its own government, led by a tribal council its members vote for.",
      "Rivers and salmon have long mattered to many tribes, and tribes today run schools, clinics and fish hatcheries.",
    ],
    "Tribal members vote for leaders who serve on a…",
    [
      "Each tribe governs itself.",
      "Its leaders meet as a council.",
    ],
    "tribal council",
  ),
  "social/id-g2-idaho-land": lesson(
    [
      "Natural resources come from nature: water, soil, forests and rocks.",
      "Idaho's resources shape its work: potato and dairy farms, lumber from forests, silver mines and river trips for visitors.",
      "A city has many people close together. A rural area is countryside with farms and open land.",
    ],
    "Idaho grows more of this vegetable than any other state:",
    [
      "Think of what Idaho is famous for.",
      "Idaho potatoes are sold all over the country.",
    ],
    "potatoes",
  ),
  "social/id-g2-who-runs-idaho": lesson(
    [
      "Idaho's constitution is the plan its laws are built on.",
      "Voters choose many leaders: a mayor and city council for a city, and the governor for the state.",
      "The Idaho Legislature makes state laws. Police enforce laws, and judges decide cases.",
    ],
    "How do people choose a mayor?",
    [
      "Leaders are chosen in elections.",
      "People vote.",
    ],
    "they vote",
  ),
};
