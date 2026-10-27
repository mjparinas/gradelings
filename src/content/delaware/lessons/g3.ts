import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Delaware's Grade 3 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Delaware examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/de-g3-fossils": lesson(
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
  "science/de-g3-weather-climate": lesson(
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
  "social/de-g3-people-on-the-move": lesson(
    [
      "Migration is moving to a new place to live. Immigration is moving to a new country.",
      "Push factors make people leave, like war or no jobs. Pull factors draw them in, like jobs, freedom or family.",
      "Newcomers bring foods, languages and traditions. Irish, Italian, Polish, Guatemalan, Mexican and many other communities are part of Delaware's story.",
    ],
    "The mills and factories of Wilmington offered jobs in the 1800s, and many families came. Push or pull factor?",
    [
      "The jobs drew people to Delaware.",
      "A reason to come to a place is a pull factor.",
    ],
    "a pull factor",
  ),
  "social/de-g3-money-and-voting": lesson(
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
  "social/de-g3-regions": lesson(
    [
      "A region is an area that shares something in common, like its land or how people live.",
      "Delaware has three counties: New Castle in the north, Kent in the middle and Sussex in the south.",
      "Most of Delaware is the flat Atlantic Coastal Plain, with rolling Piedmont hills in the far north.",
      "Delaware shares the Delmarva Peninsula with Maryland and Virginia. Pennsylvania is to the north and New Jersey across the bay.",
    ],
    "Which Delaware county has the ocean beaches at Rehoboth and Bethany?",
    [
      "The beaches are in the south of the state.",
      "The southern county is Sussex.",
    ],
    "Sussex County",
  ),
  "social/az-g2-continents-oceans": lesson(
    ["There are 7 continents and 5 oceans. We live in North America.", "On a globe, blue is water. Green and brown are land.", "The Arctic is the smallest ocean."],
    "Which continent do we live on?",
    ["Find the United States on a globe.", "It is on the continent of North America."],
    "North America",
  ),
};
