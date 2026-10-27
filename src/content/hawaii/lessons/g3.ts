import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Hawaiʻi's Grade 3 units that the shared lesson files don't cover. A copy of another
// state's unit carries the original's lesson (with Hawaiʻi examples where the original named its own state) under its
// own id, and a unit borrowed from another grade carries the lesson it has there. Lessons are written in Canadian
// spelling, like every lesson file; US families see them in US spelling.
export const LESSONS: GradeLessons = {
  "social/hi-g3-continents-oceans": lesson(
    ["There are 7 continents and 5 oceans. Most of the United States is in North America.", "Hawaiʻi is on no continent: it is a chain of islands in the Pacific Ocean.", "On a globe, blue is water. Green and brown are land."],
    "Which ocean is Hawaiʻi in?",
    ["Find Hawaiʻi on a globe.", "It is in the middle of the biggest ocean, the Pacific."],
    "the Pacific Ocean",
  ),
  "social/hi-g3-world-maps": lesson(
    ["A country is a land with its own government.", "A physical map shows mountains, rivers and other land and water.", "Australia is the smallest continent. Hawaiʻi sits in the Pacific, far from every continent."],
    "Which is the smallest continent?",
    ["Australia is a continent and a country.", "It is the smallest continent."],
    "Australia",
  ),
  "science/hi-g3-fossils": lesson(
    [
      "Fossils are remains or traces of living things from long ago.",
      "Mud covering a leaf can harden into a leaf print in rock.",
      "In rock layers, older fossils are usually lower down.",
    ],
    "In rock layers, are older fossils usually higher or lower?",
    [
      "Layers pile up over time.",
      "The first layers are at the bottom.",
    ],
    "lower down",
  ),
  "science/hi-g3-weather-climate": lesson(
    [
      "Weather is what the air is like today. Climate is the usual weather over many years.",
      "Read temperature and rain data for each season.",
      "Mountains get the most snow in winter.",
    ],
    "Highs of 30 °F, 28 °F and 32 °F. Which season is it?",
    [
      "Those are cold temperatures.",
    ],
    "winter",
  ),
  "social/hi-g3-coming-to-hawaii": lesson(
    [
      "Migration is moving to a new place to live. Push factors make people leave; pull factors draw them in.",
      "Polynesian voyagers came first. Plantation workers came from China, Japan, Portugal, Korea, Puerto Rico and the Philippines.",
      "Families still come today, from Micronesia and around the world.",
      "Newcomers brought foods, languages and celebrations that mixed into Hawaiʻi's local culture.",
    ],
    "Plantations in the 1880s offered jobs, and many workers came from Japan. Push or pull factor?",
    [
      "The jobs drew people to Hawaiʻi.",
      "A reason to come to a place is a pull factor.",
    ],
    "a pull factor",
  ),
  "social/hi-g3-money-and-voting": lesson(
    [
      "Resources can be natural (land, water), human (workers’ skills) or capital (tools and machines).",
      "Needs are things we must have, like food and a home. Wants are nice to have. Saving keeps money for later.",
      "A trade-off means giving up one thing to get another. Taxes pay for services, and citizens take part by voting.",
    ],
    "A farmer uses a tractor. What kind of resource is the tractor?",
    [
      "It isn’t from nature and it isn’t a person.",
      "A tool or machine used to make things is capital.",
    ],
    "a capital resource",
  ),
};
