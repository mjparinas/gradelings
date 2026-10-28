import { lesson, type GradeLessons } from "../../lessons";

// Lessons for South Dakota's Grade 9 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with South Dakota examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "math/sd-g9-absolute-value": lesson(
    [
      "|x − a| is the distance between x and a on the number line.",
      "|x − a| = b means x − a = b or x − a = −b, so there are two answers (none if b is negative).",
      "|x − a| < b means x is between a − b and a + b. |x − a| > b means x is outside them.",
    ],
    "Solve |x − 3| = 5.",
    [
      "x − 3 = 5, so x = 8.",
      "x − 3 = −5, so x = −2.",
    ],
    "x = −2 or x = 8",
  ),
  "science/sd-g9-ecosystems": lesson(
    [
      "A population levels off at carrying capacity on a logistic growth curve.",
      "About 10% of energy passes up each trophic level.",
      "After disturbances like wildfire, succession rebuilds the community; stable ecosystems recover.",
    ],
    "Shrubs sprout again after a wildfire. What is this an example of?",
    [
      "The community is rebuilding over time.",
      "Gradual change in a community is succession.",
    ],
    "succession",
  ),
  "social/sd-g9-governing-south-dakota": lesson(
    [
      "South Dakota's 1889 constitution sets up three branches: the Legislature (35 senators, 70 representatives), the governor and the courts.",
      "In 1898 South Dakota was the first state to adopt the initiative and referendum, so voters can make laws directly.",
      "The nine Tribal Nations are sovereign, with their own constitutions, councils and courts, and deal with the United States nation to nation.",
    ],
    "Voters gather signatures to put a proposed law on the ballot. What is this called?",
    [
      "The people start the law themselves.",
      "South Dakota adopted this in 1898.",
    ],
    "an initiative (initiated measure)",
  ),
};
