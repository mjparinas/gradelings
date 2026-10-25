import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Kentucky's own Grade 9 units, attached in ../g9.ts so they ship in Kentucky's download.
export const LESSONS: GradeLessons = {
  "math/ky-g9-absolute-value": lesson(
    ["|x − a| is the distance between x and a on the number line.", "|x − a| = b means x − a = b or x − a = −b, so there are two answers (none if b is negative).", "|x − a| < b means x is between a − b and a + b. |x − a| > b means x is outside them."],
    "Solve |x − 3| = 5.",
    ["x − 3 = 5, so x = 8.", "x − 3 = −5, so x = −2."],
    "x = −2 or x = 8",
  ),
  "science/ky-g9-ecosystems": lesson(
    ["A population levels off at carrying capacity on a logistic growth curve.", "About 10% of energy passes up each trophic level.", "After disturbances like floods or fire, succession rebuilds the community."],
    "Grass and shrubs grow back on land after a strip mine closes. What is this?",
    ["The community is rebuilding over time.", "Gradual change in a community is succession."],
    "succession",
  ),
  "social/ky-g9-governing-kentucky": lesson(
    ["Kentucky's 1891 constitution splits power among three branches.", "The General Assembly makes laws; the governor can veto; a majority of each house can override.", "Kentucky voters elect their judges and can approve amendments to the constitution."],
    "The governor vetoes a bill. What can the General Assembly do?",
    ["A veto isn't always final.", "Lawmakers can vote again."],
    "override the veto with a majority of each house",
  ),
  "social/ky-g9-kentucky-economy": lesson(
    ["GDP = consumer spending + business investment + government spending + net exports.", "Real GDP adjusts for inflation, so it shows true growth.", "Market structures range from many sellers (restaurants) to one regulated seller (a utility)."],
    "Prices rose 3% and GDP rose 5% in dollars. About how much did real GDP grow?",
    ["Real GDP takes out inflation.", "5% − 3% = 2%."],
    "about 2%",
  ),
  "social/ky-g9-personal-finance": lesson(
    ["Net (take-home) pay = gross pay − what is withheld. Sale price = price − the discount.", "Compound interest earns interest on interest. Rule of 72: years to double ≈ 72 ÷ the rate.", "Pay bills on time for a good credit score; keep an emergency fund; spread risk."],
    "You earn $15 an hour for 20 hours, and 10% is withheld. What is your take-home pay?",
    ["Gross: $15 × 20 = $300.", "10% of $300 is $30.", "$300 − $30 = $270."],
    "$270",
  ),
};
