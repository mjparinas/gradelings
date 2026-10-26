import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Kansas's Grade 8 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Kansas examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/ks-g8-earth-history": lesson(
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
  "science/ks-g8-space": lesson(
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
  "social/ks-g8-new-nation": lesson(
    [
      "Washington's Farewell Address warned against political parties and foreign alliances.",
      "In Marbury v. Madison (1803), the Supreme Court gained the power to strike down laws: judicial review.",
      "The Louisiana Purchase (1803) doubled the nation, and westward growth forced Native nations from their homelands.",
    ],
    "Which case gave the Supreme Court the power of judicial review?",
    [
      "It was decided in 1803.",
      "Chief Justice John Marshall wrote it.",
    ],
    "Marbury v. Madison",
  ),
  "social/ks-g8-kansas-and-the-nation": lesson(
    [
      "Most of Kansas became U.S. land in the Louisiana Purchase of 1803, and the Santa Fe and Oregon Trails crossed it.",
      "In the 1830s the government moved many Eastern Native nations to Kansas, then took much of that land again after 1854.",
      "The Kansas-Nebraska Act of 1854 let settlers vote on slavery, which led to Bleeding Kansas. Kansas joined as a free state in 1861.",
      "After the Civil War, homesteaders, cattle drives, the Exodusters and Mennonite wheat farmers changed Kansas.",
    ],
    "Why did the Kansas-Nebraska Act lead to violence?",
    [
      "It let the settlers vote on whether to allow slavery.",
      "People on both sides rushed in to win the vote, and fighting broke out.",
    ],
    "both sides fought to control the vote on slavery",
  ),
};
