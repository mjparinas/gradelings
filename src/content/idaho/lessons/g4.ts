import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Idaho's Grade 4 units that the shared lesson files don't cover. A copy of another state's unit
// carries a lesson written for Idaho under its own id, and a unit borrowed from another grade carries the lesson it
// has there, word for word.
export const LESSONS: GradeLessons = {
  "science/id-g4-earth-hazards": lesson(
    [
      "Maps show Earth's features: mountains, valleys, rivers and where earthquakes happen.",
      "Many earthquakes and volcanoes happen along the edges of Earth's plates. Idaho has earthquakes too, like the 1983 Borah Peak earthquake.",
      "During an earthquake: drop, cover and hold on.",
      "Wildfire, floods and landslides are hazards too, and planning ahead keeps people safe.",
    ],
    "The ground starts shaking at school. What should you do?",
    [
      "Get low so you don't fall.",
      "Get under a desk and hold on until it stops.",
    ],
    "drop, cover and hold on",
  ),
  "science/id-g4-energy-resources": lesson(
    [
      "Renewable resources, like sunlight, wind and moving water, won't run out.",
      "Dams on Idaho's rivers make electricity from moving water but can block fish like salmon.",
      "Geothermal energy uses heat from inside Earth, like Idaho's hot springs.",
      "Every energy choice has good points and costs for the environment.",
    ],
    "A geothermal power plant makes electricity from what?",
    [
      "“Geo” means Earth and “thermal” means heat.",
    ],
    "heat from inside Earth",
  ),
  "science/id-g4-rocks-erosion": lesson(
    [
      "Weathering breaks rock. Erosion moves it. Running water moves the most.",
      "Glaciers scrape and carry rock. Roots growing in cracks can split rock.",
      "Over a very long time, erosion can carve deep canyons, like Hells Canyon on the Snake River.",
      "Plants and their roots slow erosion on a hillside.",
    ],
    "Which hillside erodes faster in heavy rain: a bare one or a grassy one?",
    [
      "Roots hold soil in place.",
      "A bare hill has nothing to hold the soil.",
    ],
    "the bare hillside",
  ),
  "social/id-g4-idaho-tribes": lesson(
    [
      "Each of the five tribes in Idaho has a homeland, like the Nez Perce Reservation or the Fort Hall Reservation of the Shoshone-Bannock Tribes.",
      "Tribal sovereignty means a tribe has the right to govern itself: it makes laws and runs courts, police and schools.",
      "Tribes keep their cultures strong by teaching their languages, and they work with the state on roads, rivers and wildlife.",
    ],
    "Tribal sovereignty means a tribe…",
    [
      "Sovereign means self-governing.",
      "The tribe makes its own laws.",
    ],
    "has the right to govern itself",
  ),
  "social/id-g4-settling-idaho": lesson(
    [
      "In 1805, Lewis and Clark crossed into what is now Idaho. Sacagawea helped them, and Nez Perce people fed them.",
      "Fur traders came for beaver, and missionaries built missions like the Cataldo Mission.",
      "Gold rushes in the 1860s brought so many people that Congress made Idaho a territory in 1863. Idaho became the 43rd state in 1890.",
    ],
    "How did the gold rushes help create the state of Idaho?",
    [
      "Gold brought thousands of miners.",
      "So many people needed laws and courts.",
    ],
    "they brought so many people that Congress made Idaho a territory",
  ),
  "social/id-g4-land-conflicts": lesson(
    [
      "A treaty is a formal agreement between nations. In treaties, many tribes gave up land but kept a reservation and rights to hunt and fish.",
      "When gold was found on Nez Perce land, an 1863 treaty made their reservation much smaller. In 1877, Nez Perce bands who refused it fled more than 1,000 miles.",
      "Conflicts like the Bear River Massacre and the Bannock War happened because settlers and miners wanted tribal homelands.",
    ],
    "A treaty is…",
    [
      "It is made between nations.",
      "It is a formal agreement.",
    ],
    "a formal agreement between nations",
  ),
  "social/id-g4-regions-economy": lesson(
    [
      "Idaho's regions: the Panhandle in the north, rugged mountains in the middle, and the Snake River Plain across the south.",
      "Each region's resources shape its work: forests and silver in the north, irrigated farms in the south, and tourism in mountain towns.",
      "Scarcity means there is not enough for everyone, so prices go up when few are for sale.",
    ],
    "The narrow northern part of Idaho is called the…",
    [
      "It is shaped like the handle of a pan.",
      "It is the Panhandle.",
    ],
    "Panhandle",
  ),
  "social/id-g4-governing-idaho": lesson(
    [
      "Idaho's government has three branches: the Legislature makes laws, the governor carries them out, and the courts decide cases.",
      "Idaho also has local governments (counties and cities) and tribal governments.",
      "Idaho's nickname is the Gem State. Its state bird is the mountain bluebird, and its state horse is the Appaloosa.",
    ],
    "The head of Idaho's executive branch, who carries out state laws, is the…",
    [
      "The executive branch carries out laws.",
      "The governor leads it.",
    ],
    "governor",
  ),
  "social/id-g4-idaho-timeline": lesson(
    [
      "Put events in order by their years: the smaller the year, the earlier it happened.",
      "Key dates: Lewis and Clark 1805, the first gold rush 1860, Idaho Territory 1863, statehood 1890, women voting 1896.",
      "To find how long between two events, subtract the earlier year from the later one.",
    ],
    "Idaho Territory began in 1863 and statehood came in 1890. How many years apart?",
    [
      "Subtract the earlier year.",
      "1890 − 1863 = 27.",
    ],
    "27",
  ),
};
