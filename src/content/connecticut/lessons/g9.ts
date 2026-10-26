import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Connecticut's Grade 9 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Connecticut examples where the original named its own state) under its own id.
export const LESSONS: GradeLessons = {
  "math/ct-g9-absolute-value": lesson(
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
  "science/ct-g9-ecosystems": lesson(
    [
      "Carrying capacity is the largest population an environment can support over time.",
      "Only about 10% of energy passes from one trophic level to the next.",
      "Ecosystems recover from disturbance through succession; people can help, as when banning DDT let ospreys return to Connecticut.",
    ],
    "Grasses store 5,000 units of energy. About how much reaches the animals that eat them?",
    [
      "About 10% passes on.",
      "10% of 5,000 is 500.",
    ],
    "500 units",
  ),
  "social/ct-g9-governing-connecticut": lesson(
    [
      "Connecticut's 1965 constitution sets up the General Assembly (36 senators, 151 representatives), the governor and the courts.",
      "Connecticut has 169 towns and no county governments; many small towns hold town meetings.",
      "Town registrars and the secretary of the state run elections; voters can register on Election Day and vote early.",
    ],
    "In a town meeting, who makes the decisions?",
    [
      "A town meeting is direct democracy.",
      "The town's voters decide for themselves.",
    ],
    "the town's voters themselves",
  ),
  "social/ct-g9-us-government": lesson(
    [
      "Article I sets up Congress, Article II the President and Article III the courts.",
      "Each branch checks the others: vetoes, overrides, confirmations and judicial review.",
      "The Bill of Rights and later amendments protect individual rights.",
    ],
    "Which body must confirm a President's nominee to the Supreme Court?",
    [
      "The President nominates.",
      "The Senate confirms.",
    ],
    "the Senate",
  ),
  "social/ct-g9-economics": lesson(
    [
      "When price rises, quantity demanded falls and quantity supplied rises.",
      "A tariff is a tax on imports; it raises prices for buyers and can lead to fewer sales.",
      "GDP, inflation and unemployment show how the economy is doing; trade lets countries specialize.",
    ],
    "Another country puts a tariff on engines made in Connecticut. What most likely happens to sales there?",
    [
      "A tariff raises the price buyers pay.",
      "Higher prices mean buyers purchase fewer.",
    ],
    "they fall",
  ),
};
