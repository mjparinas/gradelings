import { lesson, type GradeLessons } from "../../lessons";

// Lessons for North Dakota's Grade 9 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with North Dakota examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "math/nd-g9-absolute-value": lesson(
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
  "science/nd-g9-ecosystems": lesson(
    [
      "A population levels off at carrying capacity on a logistic growth curve.",
      "About 10% of energy passes up each trophic level.",
      "After disturbances like a prairie fire, succession rebuilds the community; stable ecosystems recover.",
    ],
    "Grasses grow back after a prairie fire. What is this an example of?",
    [
      "The community is rebuilding over time.",
      "Gradual change in a community is succession.",
    ],
    "succession",
  ),
  "social/nd-g9-governing-north-dakota": lesson(
    [
      "Federalism shares power: delegated powers to the nation, reserved powers to the states, concurrent powers to both.",
      "Tribal nations are sovereign and deal with the federal government government to government; states and tribes sign compacts.",
      "Counties, cities, townships and school boards govern locally. Citizens influence all of them by voting, testifying and organizing.",
    ],
    "Which level of government issues driver's licenses?",
    [
      "It isn't a power the Constitution gives to Congress.",
      "States keep reserved powers like this one.",
    ],
    "the state government",
  ),
  "social/nd-g9-personal-finance": lesson(
    [
      "Gross pay is what you earn; net pay is what is left after taxes and deductions.",
      "A budget plans spending and saving. Compound interest helps savings grow, and it makes debt grow too.",
      "Paying bills on time builds a good credit score. Pay more than the minimum on high-interest debt.",
    ],
    "You earn $600 and $90 is taken out for taxes. What is your net pay?",
    [
      "Net pay is what is left.",
      "600 − 90 = 510.",
    ],
    "$510",
  ),
};
