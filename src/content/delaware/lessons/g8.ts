import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Delaware's Grade 8 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Delaware examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/de-g8-earth-history": lesson(
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
  "science/de-g8-space": lesson(
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
  "social/de-g8-new-nation": lesson(
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
  "social/de-g8-delaware-and-the-nation": lesson(
    [
      "On June 15, 1776, Delaware separated from Britain and Pennsylvania, and Caesar Rodney's ride put its vote on the side of independence.",
      "Delaware's delegates fought for an equal vote for small states, and on December 7, 1787, Delaware was the first state to ratify the Constitution.",
      "The du Pont mills on the Brandywine and the Chesapeake and Delaware Canal tied Delaware to the growing nation's economy.",
      "Delaware was a slave state that stayed in the Union. Thomas Garrett and Harriet Tubman led people to freedom through Wilmington.",
    ],
    "Why did small states like Delaware want an equal vote in the Senate?",
    [
      "Large states had many more people.",
      "In a vote by population, large states could outvote small ones every time.",
    ],
    "so large states could not outvote them on everything",
  ),
};
