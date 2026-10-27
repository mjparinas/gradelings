import { lesson, type GradeLessons } from "../../lessons";

// Lessons for West Virginia's Kindergarten units that the shared lesson files don't cover: West Virginia's own units, and
// units West Virginia teaches in a different grade from the one their shared lesson is written for (copied word for word).
export const LESSONS: GradeLessons = {
  "social/wv-k-our-state": lesson(
    [
      "Our state is West Virginia, the Mountain State.",
      "Our state bird is the cardinal. Our state animal is the black bear.",
      "West Virginia Day, our state's birthday, is June 20.",
    ],
    "Which bird is our state bird?",
    [
      "It is bright red.",
      "It is the cardinal.",
    ],
    "the cardinal",
  ),
};
