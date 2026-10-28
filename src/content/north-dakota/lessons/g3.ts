import { lesson, type GradeLessons } from "../../lessons";

// Lessons for North Dakota's Grade 3 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with North Dakota examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/nd-g3-fossils": lesson(
    [
      "Fossils are remains or traces of living things from long ago.",
      "Mud covering a leaf can harden into a leaf print in rock.",
      "In rock layers, older fossils are usually lower down. Dinosaur fossils are found in southwestern North Dakota.",
    ],
    "In rock layers, are older fossils usually higher or lower?",
    [
      "Layers pile up over time.",
      "The first layers are at the bottom.",
    ],
    "lower down",
  ),
  "science/nd-g3-weather-climate": lesson(
    [
      "Weather is what the air is like today. Climate is the usual weather over many years.",
      "Read temperature and snow data for each season.",
      "North Dakota has very cold winters, hot summers and spring floods when snow melts.",
    ],
    "Highs of 10 °F, 5 °F and 12 °F. Which season is it?",
    [
      "Those are very cold temperatures.",
    ],
    "winter",
  ),
  "social/nd-g3-city-government": lesson(
    [
      "A mayor leads a city, and a city council or commission makes its laws, called ordinances.",
      "Taxes pay for city services like clean water, snowplows, parks and fire protection.",
      "Citizens take part by voting, going to public meetings and helping their community.",
    ],
    "Who makes a city's laws?",
    [
      "The mayor leads the city.",
      "A group of elected people passes the ordinances.",
    ],
    "the city council or commission",
  ),
  "social/nd-g3-midwest": lesson(
    [
      "North Dakota is in the Midwest, a region in the middle and north of the United States.",
      "Much of the Midwest is the flat, grassy Great Plains, with rich soil for farming.",
      "Its resources shape its jobs: wheat and corn farms, oil, wind power and factories.",
    ],
    "Why is the Midwest called America's breadbasket?",
    [
      "It has flat land and rich soil.",
      "Farms there grow a lot of grain, like wheat.",
    ],
    "it grows much of the country's grain",
  ),
};
