import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Iowa's Grade 2 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Iowa examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/ia-g2-earth-changes": lesson(
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
  "science/ia-g2-habitats": lesson(
    [
      "A habitat is a place where a living thing lives.",
      "Each habitat has its own life: bison on the prairie, frogs in wetlands, deer in the woods.",
      "Some habitats have more kinds of animals than others.",
    ],
    "Which animal lives in a pond: a frog or a camel?",
    [
      "A camel lives in a dry desert.",
      "A frog needs water.",
    ],
    "a frog",
  ),
  "science/ia-g2-land-water": lesson(
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
  "social/ia-g2-native-nations": lesson(
    [
      "Iowa is the homeland of many Native nations, such as the Ioway, Sauk, Meskwaki and Ho-Chunk.",
      "Rivers, prairie and forests gave them water, food, travel and homes.",
      "In the 1830s and 1840s, the United States forced many nations to leave Iowa.",
      "Meskwaki families bought land near Tama in 1857. The Meskwaki Nation governs itself there today.",
    ],
    "Why did many villages sit beside rivers?",
    [
      "Rivers gave water and fish.",
      "Canoes traveled on them like roads.",
    ],
    "rivers gave water, food and a way to travel",
  ),
  "social/ia-g2-iowa-communities": lesson(
    [
      "Iowa became the 29th state in 1846. Its capital moved from Iowa City to Des Moines in 1857.",
      "Railroads helped towns grow. Machines changed farm work.",
      "Iowans like Herbert Hoover, George Washington Carver and Carrie Chapman Catt changed the nation.",
      "Old photos, letters and museums show how life was long ago.",
    ],
    "Long ago, most Iowans lived on farms. Where do most live today?",
    [
      "Farm machines do the work of many people.",
      "Many families moved to towns and cities for jobs.",
    ],
    "in towns and cities",
  ),
  "social/ia-g2-iowa-unique": lesson(
    [
      "Iowa's symbols include the goldfinch, the wild prairie rose, the oak and the geode.",
      "Iowa's land differs: the Loess Hills in the west, steep bluffs in the northeast, flat land in the north.",
      "Rich soil, wind and water are Iowa's natural resources.",
      "Using resources has costs, like soil washing away and less prairie for wildlife.",
    ],
    "Wind turbines on Iowa farms make what?",
    [
      "Turbines turn when the wind blows.",
      "The spinning makes power for homes.",
    ],
    "electricity",
  ),
  "social/ia-g2-who-runs-iowa": lesson(
    [
      "Voters choose leaders in elections.",
      "A mayor and city council run a city. Supervisors run a county.",
      "The governor leads the state, and the General Assembly makes state laws.",
      "Judges decide whether a law was broken.",
    ],
    "Who leads the government of Iowa?",
    [
      "A mayor leads a city.",
      "The state's leader works in Des Moines.",
    ],
    "the governor",
  ),
};
