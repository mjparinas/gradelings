import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Wyoming's Grade 8 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Wyoming examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/wy-g8-space": lesson(
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
  "social/wy-g8-new-nation": lesson(
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
  "science/wy-g8-earth-history": lesson(
    [
      "Rock layers and fossils order Earth’s 4.6-billion-year history; lower layers are older.",
      "The fossil record shows that kinds of living things appeared, changed and died out over time.",
      "Wyoming's rocks hold dinosaur bones and fossil fish from an ancient lake.",
    ],
    "Fossils in a lower rock layer are older or younger than fossils above them?",
    [
      "Layers pile up over time.",
      "The lower layers formed first.",
    ],
    "older",
  ),
  "social/wy-g8-wyoming-and-the-west": lesson(
    [
      "The Union Pacific Railroad crossed southern Wyoming in 1867 and 1868, and Wyoming Territory followed in 1868.",
      "In 1869 Wyoming gave women the vote, and in 1890 it became the 44th state.",
      "The Fort Bridger Treaty of 1868 set aside the Wind River Reservation, and later federal policies took land and tried to erase Native cultures.",
      "Rock Springs in 1885, the Johnson County War and Heart Mountain show tensions between groups.",
    ],
    "Which treaty set aside the Wind River Reservation for the Eastern Shoshone?",
    [
      "It was signed in 1868.",
      "It is named for a fort in southwest Wyoming.",
    ],
    "the Fort Bridger Treaty",
  ),
};
