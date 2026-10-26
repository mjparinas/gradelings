import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Nebraska's Grade 8 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Nebraska examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/neb-g8-earth-history": lesson(
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
  "science/neb-g8-space": lesson(
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
  "social/neb-g8-new-nation": lesson(
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
  "social/neb-g8-nebraska-and-the-nation": lesson(
    [
      "Nebraska became U.S. land in the Louisiana Purchase of 1803, and the Oregon, California and Mormon Trails followed the Platte River across it.",
      "The Kansas–Nebraska Act of 1854 created Nebraska Territory and let settlers vote on slavery. Nebraska became the 37th state in 1867.",
      "The Homestead Act and the railroad from Omaha brought settlers, while Native nations such as the Ponca were forced from their lands.",
      "In 1879, Standing Bear's case in Omaha ruled that a Native American is a person under the law, and in 1892 the Populists wrote their platform in Omaha.",
    ],
    "Why did the Kansas–Nebraska Act anger many Northerners?",
    [
      "Slavery had been closed to these lands since 1820.",
      "The act let settlers vote to allow it there.",
    ],
    "it opened the territories to slavery",
  ),
};
