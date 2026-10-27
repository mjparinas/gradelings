import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Rhode Island's Grade 9 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Rhode Island examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "math/ri-g9-absolute-value": lesson(
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
  "science/ri-g9-ecosystems": lesson(
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
  "social/ri-g9-us-government": lesson(
    [
      "Separation of powers splits government into three branches: Article I Congress, Article II the president, Article III the courts.",
      "A president serves 4 years. The House impeaches and the Senate holds the trial.",
      "Unlike a parliamentary system, the US elects its president separately from Congress.",
    ],
    "Which article of the US Constitution sets up the federal courts?",
    [
      "Article I is Congress; Article II the president.",
      "Article III sets up the courts.",
    ],
    "Article III",
  ),
  "social/ri-g9-voting-rights": lesson(
    [
      "Under Rhode Island's royal charter only landowners could vote. The Dorr Rebellion of 1841 and 1842 pushed for more voters and led to the 1843 constitution.",
      "Amendments widened the vote: the 15th (race, 1870), the 19th (women, 1920), the 24th (no poll taxes, 1964) and the 26th (age 18, 1971).",
      "The Voting Rights Act of 1965 banned literacy tests and protected Black voters after marches like Selma to Montgomery.",
    ],
    "Which amendment lowered the voting age from 21 to 18?",
    [
      "It was ratified in 1971, during the Vietnam War.",
      "It is the 26th Amendment.",
    ],
    "the 26th Amendment",
  ),
};
