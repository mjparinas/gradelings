import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Washington, DC's Grade 4 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with DC examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/dc-g4-earth-hazards": lesson(
    [
      "Maps show patterns: many mountains, volcanoes and earthquakes are along the edges of Earth's plates.",
      "People cannot stop natural hazards, but they can reduce the harm they do.",
      "Warning systems, strong buildings and safe plans help during storms, floods and earthquakes.",
    ],
    "The ground starts shaking at school. What helps keep people safe?",
    [
      "Stay inside and away from windows.",
      "Get under a sturdy desk and hold on.",
    ],
    "drop, cover and hold on",
  ),
  "science/dc-g4-energy-resources": lesson(
    [
      "Renewable resources, like sunlight, wind and moving water, won't run out.",
      "Solar farms use sunlight. Geothermal plants use heat from inside Earth.",
      "Dams make electricity from moving water but can block fish like salmon.",
      "Every energy choice has good points and costs for the environment.",
    ],
    "A geothermal power plant makes electricity from what?",
    [
      "“Geo” means Earth and “thermal” means heat.",
    ],
    "heat from inside Earth",
  ),
  "science/dc-g4-rocks-erosion": lesson(
    [
      "Weathering breaks rock. Erosion moves it. Running water moves the most.",
      "Glaciers scrape and carry rock. Roots growing in cracks can split rock.",
      "Over a very long time, erosion can carve deep canyons.",
      "Plants and their roots slow erosion on a hillside.",
    ],
    "Which hillside erodes faster in heavy rain: a bare one or a grassy one?",
    [
      "Roots hold soil in place.",
      "A bare hill has nothing to hold the soil.",
    ],
    "the bare hillside",
  ),
  "social/dc-g4-first-americans": lesson(
    [
      "Many scientists think the first people came from Asia, across Beringia or along the coast.",
      "Many Indigenous farmers grew the Three Sisters: corn, beans and squash.",
      "The Mississippian people built mounds and the city of Cahokia.",
      "The Haudenosaunee Confederacy unites six Nations, and Clan Mothers choose its chiefs.",
    ],
    "Why plant corn, beans and squash together?",
    [
      "Beans climb the corn, and squash leaves shade the soil.",
      "Beans also add nutrients to the soil.",
    ],
    "the plants help each other grow",
  ),
  "social/dc-g4-europeans-arrive": lesson(
    [
      "Columbus reached the Caribbean in 1492, and his men forced the Taíno to work.",
      "The Columbian Exchange moved foods, animals and diseases between the Americas and Europe.",
      "Jamestown (1607) was built in Powhatan lands, and in 1619 enslaved Africans were brought to Virginia.",
      "Indigenous nations resisted by fighting, moving and protecting their land.",
    ],
    "Potatoes went from the Americas to Europe. What is this exchange called?",
    [
      "It is named after the explorer of 1492.",
      "It moved plants, animals and diseases both ways.",
    ],
    "the Columbian Exchange",
  ),
  "social/dc-g4-three-branches": lesson(
    [
      "Congress (the Senate and the House) makes laws. The president carries them out. Courts decide what they mean.",
      "Checks and balances let each branch limit the others, like the president's veto.",
      "The Bill of Rights is the first ten amendments and protects freedoms like speech and religion.",
      "The Constitution put the capital in a district run by Congress.",
    ],
    "Which branch makes laws?",
    [
      "Congress meets in the Capitol.",
      "Congress is the legislative branch.",
    ],
    "the legislative branch",
  ),
};
