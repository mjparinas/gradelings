import { lesson, type GradeLessons } from "../../lessons";

// Lessons for West Virginia's Grade 1 units that the shared lesson files don't cover: West Virginia's own units, and
// units West Virginia teaches in a different grade from the one their shared lesson is written for (copied word for word).
export const LESSONS: GradeLessons = {
  "social/wv-g1-our-state": lesson(
    [
      "West Virginia is a state in the east of the United States.",
      "Our state is split into 55 counties. Each town is in a county.",
      "Our motto means 'Mountaineers are always free.'",
    ],
    "Your town is inside a… county or ocean?",
    [
      "Every town in our state is in a county.",
      "So the answer is a county.",
    ],
    "a county",
  ),
};
