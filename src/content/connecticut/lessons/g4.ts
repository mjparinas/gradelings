import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Connecticut's Grade 4 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Connecticut examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/ct-g4-earth-hazards": lesson(
    [
      "Maps show patterns: volcanoes and earthquakes line up where Earth's plates meet.",
      "Connecticut's biggest hazards are hurricanes, nor'easters and floods.",
      "Warnings, dikes, sea walls, strong buildings and evacuation plans all reduce harm.",
    ],
    "A hurricane is coming and the coast may flood. What should families near the shore do?",
    [
      "Storm surge pushes seawater onto land.",
      "Moving to higher ground keeps people safe.",
    ],
    "follow the warnings and move to higher ground",
  ),
  "science/ct-g4-energy-resources": lesson(
    [
      "Energy comes from natural resources.",
      "Renewable resources like wind, sunlight and moving water don't run out.",
      "Fossil fuels take millions of years to form, and burning them adds pollution.",
    ],
    "Is wind blowing over the ocean renewable or nonrenewable?",
    [
      "The wind keeps blowing.",
      "It will not run out, so it is renewable.",
    ],
    "renewable",
  ),
  "science/ct-g4-rocks-erosion": lesson(
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
  "social/ct-g4-us-regions": lesson(
    [
      "The United States has five regions: the Northeast, Southeast, Midwest, Southwest and West.",
      "Each region has its own landforms and climate, like the Great Plains, the Rocky Mountains and the deserts of the Southwest.",
      "A compass rose shows directions, a key explains symbols and a scale shows distance.",
    ],
    "Connecticut is in which region?",
    [
      "Connecticut is one of the six New England states.",
      "New England is part of the Northeast.",
    ],
    "the Northeast",
  ),
  "social/ct-g4-moving-and-settling": lesson(
    [
      "People settle near resources such as water, good soil, fish or minerals.",
      "Push factors make people leave a place; pull factors draw them to a new one.",
      "Census records, diaries and old maps show where people lived and moved.",
    ],
    "A family moves to a city because there are good jobs there. Is that a push or a pull factor?",
    [
      "The jobs draw the family in.",
      "Something that draws people in is a pull factor.",
    ],
    "a pull factor",
  ),
  "social/ct-g4-hazards-and-climate": lesson(
    [
      "Each region has its own hazards: hurricanes on the coasts, tornadoes on the plains, earthquakes and wildfires in the West.",
      "People prepare with levees, building codes, emergency kits and evacuation plans.",
      "As the climate changes, people adapt, for example by raising homes or saving water.",
    ],
    "Why do some coastal towns raise houses up on posts?",
    [
      "Hurricanes can push seawater onto the shore.",
      "Raised houses let floodwater pass underneath.",
    ],
    "so floodwater can pass underneath",
  ),
  "social/wa-g6-time-sources": lesson(
    [
      "BCE years count down toward year 1; CE years count up. So 500 BCE is earlier than 200 BCE.",
      "An artifact is an object made by people in the past.",
      "A primary source is from the time. A secondary source explains it later.",
    ],
    "Which year is earlier: 300 BCE or 100 BCE?",
    [
      "BCE years count down toward year 1.",
      "The bigger BCE number is longer ago.",
    ],
    "300 BCE",
  ),
  "social/climate-and-ways-of-life": lesson(
    [
      "Climate is the usual weather in a place over many years.",
      "In hot places, people wear light clothes, build shady homes and drink more water.",
      "In snowy places, people plow roads, insulate homes and wear warm clothes.",
    ],
    "In a hot, sunny place, people often wear…",
    [
      "Heavy clothes trap heat.",
      "Light clothes help you stay cool.",
    ],
    "light clothes",
  ),
};
