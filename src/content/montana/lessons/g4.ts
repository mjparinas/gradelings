import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Montana's Grade 4 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Montana examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/mt-g4-earth-hazards": lesson(
    [
      "Maps show patterns: volcanoes and earthquakes line up where Earth's plates meet.",
      "Montana's biggest hazards are wildfires, floods, blizzards and earthquakes.",
      "Warnings, levees, cleared brush, strong buildings and evacuation plans all reduce harm.",
    ],
    "Snowmelt is making a river rise fast. What should families in the low land beside it do?",
    [
      "Flood water fills the lowest places first.",
      "Moving to higher ground keeps people safe.",
    ],
    "follow the warnings and move to higher ground",
  ),
  "science/mt-g4-energy-resources": lesson(
    [
      "Energy comes from natural resources.",
      "Renewable resources like wind, sunlight and moving water don't run out.",
      "Fossil fuels take millions of years to form, and burning them adds pollution.",
    ],
    "Is wind blowing over the plains renewable or nonrenewable?",
    [
      "The wind keeps blowing.",
      "It will not run out, so it is renewable.",
    ],
    "renewable",
  ),
  "science/mt-g4-rocks-erosion": lesson(
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
  "social/mt-g4-tribal-nations": lesson(
    [
      "Each Tribal Nation in Montana has its own homeland, language and history.",
      "Treaties in 1851 and 1855 set out reservations, and later laws like the Dawes Act took much of that land.",
      "Boarding schools, citizenship in 1924 and the Little Shell recognition in 2019 also shaped the Nations.",
    ],
    "Which treaty created the Flathead Reservation in 1855?",
    [
      "Salish, Pend d'Oreille and Kootenai leaders signed it.",
      "It was signed at Hellgate, near Missoula.",
    ],
    "the Hellgate Treaty",
  ),
  "social/mt-g4-governing-montana": lesson(
    [
      "Montana became the 41st state in 1889; its constitution today dates from 1972.",
      "The legislature (100 representatives, 50 senators) makes laws, the governor carries them out and courts decide what they mean.",
      "Tribal Nations are sovereign: they govern themselves under their own laws.",
    ],
    "What does sovereignty mean for a Tribal Nation?",
    [
      "Sovereign nations make and enforce their own laws.",
      "So a sovereign Nation governs itself.",
    ],
    "the right to govern itself",
  ),
  "social/mt-g4-land-and-work": lesson(
    [
      "Western Montana has mountains and forests; eastern Montana has plains and prairie.",
      "Agriculture is the biggest industry; mining, energy, timber and tourism matter too.",
      "Workers and natural resources make goods and services, and trade links Montana with the world.",
    ],
    "What is Montana's biggest industry?",
    [
      "Farms and ranches cover much of the state.",
      "Wheat and cattle are its main products.",
    ],
    "agriculture",
  ),
  "social/mt-g4-montana-history": lesson(
    [
      "Lewis and Clark crossed Montana in 1805 and 1806, with help from Sacagawea.",
      "Fur traders, then gold miners, then railroads and homesteaders brought new people.",
      "Drought, mining and dams changed the land, and the land changed where people lived.",
    ],
    "What drew miners to Bannack in 1862?",
    [
      "Miners came quickly wherever a strike was found.",
      "Gold was found at Grasshopper Creek.",
    ],
    "gold",
  ),
  "social/mt-g4-timeline": lesson(
    [
      "Put events in order by year, earliest first.",
      "Lewis and Clark (1805), Montana Territory (1864), statehood (1889), the new constitution (1972).",
      "Subtract years to find how far apart two events are.",
    ],
    "Montana Territory was created in 1864 and Montana became a state in 1889. How many years apart?",
    [
      "Subtract the earlier year from the later one.",
      "1889 − 1864 = 25.",
    ],
    "25 years",
  ),
};
