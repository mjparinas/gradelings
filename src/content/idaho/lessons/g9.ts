import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Idaho's Grade 9 units that the shared lesson files don't cover. A copy of another state's unit
// carries a lesson written for Idaho under its own id, and a unit borrowed from another grade carries the lesson it
// has there, word for word.
export const LESSONS: GradeLessons = {
  "math/id-g9-absolute-value": lesson(
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
  "science/id-g9-ecosystems": lesson(
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
  "social/id-g9-governing-idaho": lesson(
    [
      "Idaho's 1889 constitution, still in force, sets up three branches and begins with a Declaration of Rights.",
      "The Legislature has 35 senators and 70 representatives, all serving two-year terms. The governor has a line-item veto on spending bills.",
      "Voters elect the five Idaho Supreme Court justices in nonpartisan elections, and can make laws themselves through initiatives and referendums.",
      "The five federally recognized tribes in Idaho are sovereign nations that govern themselves within the United States.",
    ],
    "How are Idaho Supreme Court justices chosen?",
    [
      "Idaho voters choose them.",
      "The elections name no party.",
    ],
    "by voters in nonpartisan elections",
  ),
  "social/id-g9-us-government": lesson(
    [
      "Separation of powers splits government into three branches: Article I Congress, Article II the president, Article III the courts.",
      "A president serves 4 years. The House impeaches and the Senate holds the trial.",
      "Idaho, like every state, has two US senators; it has two seats in the House.",
    ],
    "Which article of the US Constitution sets up the federal courts?",
    [
      "Article I is Congress; Article II the president.",
      "Article III sets up the courts.",
    ],
    "Article III",
  ),
  "social/id-g9-personal-finance": lesson(
    [
      "Net (take-home) pay = gross pay − what is withheld, including Idaho's state income tax.",
      "Compound interest earns interest on interest. Rule of 72: years to double ≈ 72 ÷ the rate.",
      "Pay bills on time for a good credit score; keep an emergency fund; spread risk.",
    ],
    "You earn $15 an hour for 20 hours, and 10% is withheld. What is your take-home pay?",
    [
      "Gross: $15 × 20 = $300.",
      "10% of $300 is $30.",
      "$300 − $30 = $270.",
    ],
    "$270",
  ),
  "social/id-g9-economics": lesson(
    [
      "When price rises, quantity demanded falls and quantity supplied rises.",
      "A poor harvest cuts supply and raises the price.",
      "Command economies are run by government, market economies by buyers and sellers; most countries, including the US, are mixed.",
    ],
    "A drought cuts the Idaho potato harvest while demand stays the same. What happens to the price?",
    [
      "A poor harvest means fewer potatoes to sell.",
      "Less supply pushes the price up.",
    ],
    "it rises",
  ),
  "social/id-g9-supply-demand": lesson(
    [
      "Demand shifts with what buyers want: rain raises demand for umbrellas; a dry summer lowers it.",
      "Supply shifts with costs: costlier milk cuts ice cream supply; faster machines raise bike supply and lower prices.",
      "Price too low: shortage = demand − supply. Price too high: surplus = supply − demand.",
    ],
    "At $3, buyers want 80 and sellers offer 30. What happens?",
    [
      "Demand is more than supply.",
      "80 − 30 = 50 more wanted than offered.",
    ],
    "a shortage of 50",
  ),
};
