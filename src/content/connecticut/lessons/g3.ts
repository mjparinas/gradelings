import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Connecticut's Grade 3 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Connecticut examples where the original named its own state) under its own id.
export const LESSONS: GradeLessons = {
  "science/ct-g3-fossils": lesson(
    [
      "A fossil is what is left of a plant or animal from long ago, kept in rock.",
      "Fossils show what lived in a place and what the place was like.",
      "Dinosaur footprints at Dinosaur State Park show dinosaurs walked in Connecticut long ago.",
    ],
    "Coral fossils are found in a field far from any sea. What does that tell us?",
    [
      "Coral only grows in warm, shallow seas.",
      "So that place was once under a warm sea.",
    ],
    "it was once a warm sea",
  ),
  "science/ct-g3-weather-climate": lesson(
    [
      "Weather is what the air is like today: hot, cold, rainy or windy.",
      "Climate is the usual weather over many years.",
      "Connecticut has warm summers, cold winters, and sometimes nor'easters and hurricanes.",
    ],
    "Is 'Hartford gets snow most winters' about weather or climate?",
    [
      "It talks about many winters, not one day.",
      "A pattern over many years is climate.",
    ],
    "climate",
  ),
  "social/ct-g3-connecticut-government": lesson(
    [
      "Connecticut's government has three branches: the General Assembly makes laws, the governor carries them out, and the courts decide what laws mean.",
      "A bill becomes a law when both houses pass it and the governor signs it.",
      "Taxes pay for services like schools, roads and parks.",
    ],
    "Both houses of the General Assembly pass a bill. What happens next?",
    [
      "The bill goes to the governor.",
      "If the governor signs it, it becomes a law.",
    ],
    "the governor signs it or vetoes it",
  ),
  "social/ct-g3-native-nations": lesson(
    [
      "Many Native nations have lived in Connecticut for thousands of years, and they live here today.",
      "Some, like the Mashantucket Pequot and the Mohegan, are sovereign nations with their own governments.",
      "Many Connecticut place names come from Native languages.",
    ],
    "What does it mean that a Native nation is sovereign?",
    [
      "Sovereign means it governs itself.",
      "It makes its own laws for its people and land.",
    ],
    "it has its own government and makes its own laws",
  ),
  "social/ct-g3-people-of-connecticut": lesson(
    [
      "People from many places have made Connecticut home, from Puerto Rico, Poland, Italy, Jamaica, India and more.",
      "Communities share foods, music, languages and celebrations.",
      "Old letters, photos and newspapers help us learn about people's lives in the past.",
    ],
    "Why do people move to a new place, like Connecticut?",
    [
      "Think about jobs, family and safety.",
      "People move for work, to join family or to find a safer home.",
    ],
    "for jobs, family or a safer life",
  ),
  "social/ct-g3-connecticut-land": lesson(
    [
      "Connecticut has hills in the northwest, the Connecticut River valley in the middle and a coast along Long Island Sound.",
      "Maps show towns, rivers, roads and landforms.",
      "Where people live and work depends on the land and water.",
    ],
    "Why did many towns grow along the Connecticut River?",
    [
      "Rivers give water and a way to travel.",
      "Boats could carry people and goods.",
    ],
    "the river gave water and easy travel",
  ),
  "social/ct-g3-connecticut-industry": lesson(
    [
      "Connecticut industries grew where resources were: fast rivers powered mills, and harbours helped shipping.",
      "Connecticut became known for clocks, guns, helicopters, submarines and insurance.",
      "A timeline puts events in order from earliest to latest.",
    ],
    "Which came first: Connecticut's water-powered mills or its helicopter factories?",
    [
      "Mills came in the 1800s.",
      "Helicopters came in the 1900s.",
    ],
    "the mills",
  ),
};
