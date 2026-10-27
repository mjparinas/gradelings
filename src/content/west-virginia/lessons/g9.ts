import { lesson, type GradeLessons } from "../../lessons";

// Lessons for West Virginia's Grade 9 units that the shared lesson files don't cover: West Virginia's own units, and
// units West Virginia teaches in a different grade from the one their shared lesson is written for (copied word for word).
export const LESSONS: GradeLessons = {
  "math/wv-g9-absolute-value": lesson(
    [
      "|x| is the distance of x from 0, so it is never negative.",
      "|x − a| = b means x is b away from a: x = a + b or x = a − b.",
      "|x − a| < b means x is less than b away from a: a − b < x < a + b.",
    ],
    "Solve |x − 3| = 5.",
    [
      "x is 5 away from 3.",
      "x = 3 + 5 = 8 or x = 3 − 5 = −2.",
    ],
    "x = 8 or x = −2",
  ),
  "science/wv-g9-ecosystems": lesson(
    [
      "Carrying capacity is the largest population an ecosystem can support over time.",
      "Only about 10% of the energy at one level passes to the next level.",
      "Ecosystems can recover after disturbances, and people can reduce harm, for example by restoring streams.",
    ],
    "Plants store 10,000 units of energy. About how much reaches the animals that eat them?",
    [
      "About 10% passes on.",
      "10% of 10,000 is 1,000.",
    ],
    "about 1,000 units",
  ),
  "social/ny-g6-classical-china-india": lesson(
    [
      "The Qin united China; the Terracotta Army guarded its first emperor's tomb.",
      "The Han invented paper and chose officials by tests of Confucian teachings. Han China and Rome both had big armies and roads.",
      "India's Maurya and Gupta empires; the Gupta had a golden age of peace, wealth and achievement.",
    ],
    "During which dynasty was paper invented in China?",
    [
      "It came after the Qin.",
      "It was the dynasty that ruled about 400 years.",
    ],
    "the Han",
  ),
};
