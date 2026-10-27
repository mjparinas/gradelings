import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Montana's Grade 9 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Montana examples where the original named its own state) under its own id.
export const LESSONS: GradeLessons = {
  "science/mt-g9-ecosystems": lesson(
    [
      "Carrying capacity is the largest population an environment can support over time.",
      "Only about 10% of energy passes from one trophic level to the next.",
      "Ecosystems recover from disturbance through succession; people can help, as when banning DDT let bald eagles return to Montana.",
    ],
    "Grasses store 5,000 units of energy. About how much reaches the animals that eat them?",
    [
      "About 10% passes on.",
      "10% of 5,000 is 500.",
    ],
    "500 units",
  ),
  "social/mt-g9-us-government": lesson(
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
  "social/mt-g9-economics": lesson(
    [
      "When price rises, quantity demanded falls and quantity supplied rises.",
      "A tariff is a tax on imports; it raises prices for buyers and can lead to fewer sales.",
      "GDP, inflation and unemployment show how the economy is doing; trade lets countries specialize.",
    ],
    "Another country puts a tariff on wheat from Montana. What most likely happens to sales there?",
    [
      "A tariff raises the price buyers pay.",
      "Higher prices mean buyers purchase fewer.",
    ],
    "they fall",
  ),
  "social/mt-g9-governing-montana": lesson(
    [
      "The 1972 constitution sets up a 150-member legislature, a governor with amendatory and line-item vetoes, and an elected Supreme Court.",
      "Montanans can make laws directly through initiatives and referendums.",
      "Tribal sovereignty is inherent, recognized in treaties and federal law, and shaped by court cases and compacts.",
    ],
    "Montana citizens gather signatures to put a proposed law on the ballot. What is this called?",
    [
      "Voters, not the legislature, propose the law.",
      "That is an initiative.",
    ],
    "an initiative",
  ),
};
