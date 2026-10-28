import { lesson, type GradeLessons } from "../../lessons";

// Lessons for North Dakota's Grade 4 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with North Dakota examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/nd-g4-earth-hazards": lesson(
    [
      "Maps show patterns: many mountains, volcanoes and earthquakes are along the edges of Earth's plates.",
      "People cannot stop natural hazards, but they can reduce the harm they do.",
      "Along the Red River, spring floods come when snow melts, so towns build dikes, raise houses and fill sandbags.",
    ],
    "The Red River is rising in spring. What helps keep a town safe?",
    [
      "Forecasters warn people days ahead.",
      "Dikes and sandbag walls hold the water back.",
    ],
    "warnings, dikes and sandbags",
  ),
  "science/nd-g4-energy-resources": lesson(
    [
      "Renewable resources, like sunlight, wind and moving water, won't run out.",
      "Oil, natural gas and coal are fossil fuels. They will run out, and burning them pollutes the air.",
      "North Dakota gets energy from Bakken oil, lignite coal, wind farms and the Garrison Dam.",
      "Every energy choice has good points and costs for the environment.",
    ],
    "Is wind a renewable or a nonrenewable resource?",
    [
      "The wind keeps blowing day after day.",
      "It will not run out.",
    ],
    "renewable",
  ),
  "science/nd-g4-rocks-erosion": lesson(
    [
      "Weathering breaks rock. Erosion moves it. Running water moves the most.",
      "Glaciers scrape and carry rock. Roots growing in cracks can split rock.",
      "Over a very long time, wind and water carved the buttes of the Badlands.",
      "Plants and their roots slow erosion on a hillside.",
    ],
    "Which hillside erodes faster in heavy rain: a bare one or a grassy one?",
    [
      "Roots hold soil in place.",
      "A bare hill has nothing to hold the soil.",
    ],
    "the bare hillside",
  ),
  "social/nd-g4-land": lesson(
    [
      "North Dakota has three landscape regions: the Red River Valley, the Drift Prairie and the Missouri Plateau.",
      "The flat Red River Valley was the bottom of glacial Lake Agassiz. Glaciers left rocks and prairie potholes on the Drift Prairie.",
      "The Missouri Plateau in the west is higher and drier, with buttes and the Badlands.",
    ],
    "Which region was once the bottom of a giant glacial lake?",
    [
      "Lake Agassiz left very flat land.",
      "That flat land is along the Red River.",
    ],
    "the Red River Valley",
  ),
  "social/nd-g4-nations": lesson(
    [
      "Five tribal nations share their homelands with North Dakota, each with its own language, history and government.",
      "Mandan, Hidatsa and Arikara farmers lived in earthlodge villages by the Missouri River. Many Lakota and Dakota families hunted bison.",
      "Tribal nations are sovereign: they govern themselves today. The Essential Understandings share Native views.",
    ],
    "What does it mean that tribal nations are sovereign?",
    [
      "They have their own governments.",
      "They make their own laws.",
    ],
    "they govern themselves",
  ),
  "social/nd-g4-explorers": lesson(
    [
      "In 1738, the French explorer La Vérendrye visited the Mandan villages.",
      "In 1803 the United States bought the Louisiana Purchase. Lewis and Clark spent the winter of 1804 to 1805 at Fort Mandan.",
      "Fur traders traded with Native nations at posts like Fort Union. The fur trade brought new goods and also smallpox.",
    ],
    "Where did Lewis and Clark spend the winter of 1804 to 1805?",
    [
      "They built a fort near the Mandan and Hidatsa villages.",
      "They named it after the Mandan.",
    ],
    "Fort Mandan",
  ),
  "social/nd-g4-settlers": lesson(
    [
      "The Homestead Act of 1862 gave settlers 160 acres if they lived on the land and farmed it for five years.",
      "Railroads crossed the prairie, and towns grew up beside the tracks.",
      "Settlers came from Norway, Germany, Russia and many other places, and from other states.",
    ],
    "How did a homesteader get to own the land?",
    [
      "The land was not bought with money.",
      "They had to live on it and farm it.",
    ],
    "live on it and farm it for five years",
  ),
  "social/nd-g4-statehood": lesson(
    [
      "Dakota Territory was created in 1861, and Bismarck became its capital in 1883.",
      "As settlers arrived, people wrote a constitution and asked to become a state.",
      "North Dakota became a state on November 2, 1889, the same day as South Dakota.",
    ],
    "In what year did North Dakota become a state?",
    [
      "It was the same day as South Dakota.",
      "The year was in the late 1800s.",
    ],
    "1889",
  ),
  "social/nd-g4-governing": lesson(
    [
      "The Legislative Assembly makes the state's laws. It has a Senate and a House of Representatives.",
      "The governor leads the executive branch and carries out the laws.",
      "The North Dakota Supreme Court decides what laws mean. The Capitol is in Bismarck.",
    ],
    "Which branch of North Dakota's government makes laws?",
    [
      "It has a Senate and a House of Representatives.",
      "It is called the Legislative Assembly.",
    ],
    "the Legislative Assembly",
  ),
  "social/nd-g4-economy": lesson(
    [
      "Agriculture is the biggest part of North Dakota's economy: spring wheat, durum, sunflowers, canola, cattle and honey.",
      "Western North Dakota produces oil from the Bakken and lignite coal for electricity.",
      "Goods are produced, then trains and trucks carry them to people far away.",
    ],
    "Durum wheat from North Dakota is used to make what food?",
    [
      "Durum is a hard kind of wheat.",
      "Spaghetti is made from it.",
    ],
    "pasta",
  ),
  "social/nd-g4-symbols-people": lesson(
    [
      "Symbols stand for ideas: the western meadowlark, the wild prairie rose and the state flag.",
      "North Dakota's nicknames include the Peace Garden State and the Roughrider State.",
      "Many people helped build North Dakota, from tribal leaders to homesteaders and lawmakers.",
    ],
    "Which nickname honors a garden that stands for peace?",
    [
      "The International Peace Garden is on the northern border.",
      "The nickname uses the word Garden.",
    ],
    "the Peace Garden State",
  ),
  "social/nd-g4-timeline": lesson(
    [
      "A timeline shows events in order, from earliest to latest.",
      "Subtract years to find how long apart two events were.",
      "Statehood in 1889 comes after Lewis and Clark (1804) and before the Garrison Dam (1953).",
    ],
    "How many years after statehood (1889) did the Bank of North Dakota open (1919)?",
    [
      "Subtract: 1919 − 1889.",
      "That is 30.",
    ],
    "30 years",
  ),
};
