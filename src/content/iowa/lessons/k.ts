import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Iowa's Kindergarten units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Iowa examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "social/ia-k-rules-here-and-there": lesson(
    [
      "Rules keep us safe and fair.",
      "Each place has its own rules: walk at school, run at the park.",
      "Some rules are the same in every state. Some are different.",
      "To borrow is to use it and give it back. To buy is to keep it.",
    ],
    "You borrow a library book. What do you do when you finish?",
    [
      "Borrow means use it for a while.",
      "Then it goes back.",
    ],
    "give it back",
  ),
};
