import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Wyoming's Grade 3 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Wyoming examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "social/wy-g3-money-and-voting": lesson(
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
  "science/wy-g3-weather-hazards": lesson(
    [
      "Weather hazards are weather that can harm people: blizzards, strong wind, hail, lightning, floods, drought and wildfire.",
      "People can't stop the weather, but designs like snow fences, windbreaks and dams lower the harm.",
      "A good design meets its criteria (what it must do) within its constraints (limits like cost).",
    ],
    "Blowing snow keeps covering a highway. Which design helps: a snow fence or a taller sign?",
    [
      "The problem is snow drifting onto the road.",
      "A fence catches the snow before it reaches the road.",
    ],
    "a snow fence",
  ),
  "social/wy-g3-people-on-the-move": lesson(
    [
      "Migration is moving to a new place to live. Immigration is moving to a new country.",
      "Push factors make people leave, like war or no jobs. Pull factors draw them in, like jobs, land or family.",
      "Newcomers bring foods, languages and traditions. Miners in Rock Springs came from dozens of countries.",
    ],
    "The railroad and coal mines offered jobs, and many families came to Wyoming. Push or pull factor?",
    [
      "The jobs drew people to Wyoming.",
      "A reason to come to a place is a pull factor.",
    ],
    "a pull factor",
  ),
  "social/wy-g3-regions": lesson(
    [
      "A region is an area that shares something in common, like its land or how people live.",
      "Wyoming has the Great Plains in the east, mountain ranges, wide basins between them, and the Yellowstone country.",
      "Wyoming shares borders with six states. Cheyenne, in the southeast, is the capital.",
    ],
    "Which Wyoming region is flat grassland in the east of the state?",
    [
      "It covers the eastern part of the state.",
      "It is part of a huge region across the middle of the country.",
    ],
    "the Great Plains",
  ),
};
