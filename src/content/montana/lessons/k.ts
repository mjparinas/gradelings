import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Montana's Kindergarten units that the shared lesson files don't cover.
export const LESSONS: GradeLessons = {
  "social/mt-k-made-in-montana": lesson(
    [
      "Montana farms grow wheat. Ranches raise cattle and sheep.",
      "A good is a thing you can hold, like bread or a hat.",
      "A service is help someone gives you, like a haircut.",
    ],
    "Is a haircut a good or a service?",
    [
      "You can't hold a haircut.",
      "Someone helps you, so it is a service.",
    ],
    "a service",
  ),
};
