import { lesson, type GradeLessons } from "../../lessons";

// Lessons for New Hampshire's Grade 3 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with New Hampshire examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/nh-g3-fossils": lesson(
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
  "science/nh-g3-weather-climate": lesson(
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
  "social/nh-g3-people-on-the-move": lesson(
    [
      "Migration is moving to a new place to live. Immigration is moving to a new country.",
      "Push factors make people leave, like war or no jobs. Pull factors draw them in, like jobs, freedom or family.",
      "Newcomers bring foods, languages and traditions. French Canadian, Irish, Greek and many other communities are part of New Hampshire's story.",
    ],
    "The mills in Manchester offered jobs around 1900, and many families came. Push or pull factor?",
    [
      "The jobs drew people to New Hampshire.",
      "A reason to come to a place is a pull factor.",
    ],
    "a pull factor",
  ),
  "social/nh-g3-money-and-voting": lesson(
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
  "social/nh-g3-regions": lesson(
    [
      "A region is an area that shares something in common, like its land or how people live.",
      "New Hampshire's regions include the Seacoast, the Merrimack Valley, the Lakes Region, the White Mountains and the Great North Woods.",
      "New Hampshire is one of the six New England states. Massachusetts is to the south, Maine to the east and Vermont to the west.",
    ],
    "Which New Hampshire region has a harbor and fishing boats?",
    [
      "It is beside the Atlantic Ocean.",
      "Portsmouth is there.",
    ],
    "the Seacoast",
  ),
};
