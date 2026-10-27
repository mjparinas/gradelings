import { lesson, type GradeLessons } from "../../lessons";

// Lessons for New Hampshire's Grade 8 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with New Hampshire examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/nh-g8-earth-history": lesson(
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
  "science/nh-g8-space": lesson(
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
  "social/nh-g8-new-nation": lesson(
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
  "social/nh-g8-new-hampshire-and-the-nation": lesson(
    [
      "New Hampshire set up the first independent colonial government in 1776 and was the ninth state to ratify the Constitution in 1788.",
      "Daniel Webster defended the Union against states that wanted to ignore national laws.",
      "Since 1920, New Hampshire has held the nation's first presidential primary.",
      "The Amoskeag mills in Manchester drew thousands of workers, and a long strike in 1922 fought pay cuts.",
    ],
    "What election is New Hampshire famous for holding first?",
    [
      "Each party picks its candidate for President.",
      "New Hampshire votes before other states.",
    ],
    "the presidential primary",
  ),
};
