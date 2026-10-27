import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Rhode Island's Grade 8 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Rhode Island examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/ri-g8-earth-history": lesson(
    [
      "Rock layers and fossils order Earth’s 4.6-billion-year history; lower layers are older.",
      "Most of that history is the Precambrian. We live in the Cenozoic Era.",
      "Homologous structures show that living things share ancestors.",
    ],
    "In which era do we live today?",
    [
      "The eras go Paleozoic, Mesozoic, Cenozoic.",
      "The latest is the Cenozoic.",
    ],
    "the Cenozoic Era",
  ),
  "science/ri-g8-space": lesson(
    [
      "Mercury is closest to the Sun. Gravity keeps planets in orbit.",
      "Seasons happen because Earth’s axis is tilted.",
      "Tides are caused mostly by the Moon’s gravity. A solar eclipse is when the Moon passes between the Sun and Earth.",
    ],
    "Why does Earth have seasons?",
    [
      "It isn’t because Earth gets much closer to the Sun.",
      "Earth’s tilt changes how direct the sunlight is.",
    ],
    "Earth’s axis is tilted",
  ),
  "social/ri-g8-governing-rhode-island": lesson(
    [
      "The General Assembly (38 senators and 75 representatives) makes Rhode Island's laws at the State House in Providence.",
      "The governor, elected for four years, leads the executive branch with four other general officers. The Supreme Court leads the judicial branch.",
      "Rhode Island has 39 cities and towns and no county governments. The Narragansett Indian Tribe has its own sovereign government.",
    ],
    "Who issues driver's licenses in Rhode Island: the town, the state or the national government?",
    [
      "Licenses work the same across the whole state.",
      "The state's Division of Motor Vehicles gives them out.",
    ],
    "the state government",
  ),
};
