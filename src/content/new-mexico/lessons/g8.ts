import { lesson, type GradeLessons } from "../../lessons";

// Lessons for New Mexico's Grade 8 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with New Mexico examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/nm-g8-earth-history": lesson(
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
  "science/nm-g8-space": lesson(
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
  "social/nm-g8-new-nation": lesson(
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
  "social/nm-g8-new-mexico-and-the-nation": lesson(
    [
      "New Mexico became part of the United States in 1848, after the war with Mexico.",
      "The Treaty of Guadalupe Hidalgo promised citizenship and property rights, but many land grants were lost.",
      "In the Civil War, Union soldiers stopped a Confederate invasion at Glorieta Pass in 1862.",
      "The Army's Western Campaign forced the Diné and Mescalero Apache on the Long Walk; the Diné returned home under the Treaty of 1868.",
    ],
    "What did the Treaty of Guadalupe Hidalgo promise Mexican citizens who stayed in New Mexico?",
    [
      "The promise was about becoming Americans.",
      "It also covered their land and belongings.",
    ],
    "US citizenship and protection of their property",
  ),
};
