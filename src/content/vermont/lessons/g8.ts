import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Vermont's Grade 8 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Vermont examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/vt-g8-earth-history": lesson(
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
  "science/vt-g8-space": lesson(
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
  "social/vt-g8-vermont-in-action": lesson(
    [
      "At town meeting, voters debate and decide on budgets face to face: direct democracy. Vermont's General Assembly is a part-time citizen legislature.",
      "Citizens can testify at committee hearings, vote and contact lawmakers. A two-thirds vote in each chamber can override a veto.",
      "Policies answer public problems: the bottle bill cuts litter, Act 250 weighs growth against land and water, and Act 60 made school funding fairer.",
    ],
    "When voters decide the town budget themselves at town meeting, what kind of democracy is that?",
    [
      "They don't elect someone to decide for them.",
      "Citizens vote directly.",
    ],
    "direct democracy",
  ),
};
