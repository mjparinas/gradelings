import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Iowa's Grade 5 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with Iowa examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/ia-g5-earth-water": lesson(
    [
      "Earth has four systems: the geosphere (land), hydrosphere (water), atmosphere (air) and biosphere (life).",
      "Most of Earth's water is salty ocean water, and most fresh water is frozen in ice.",
      "Iowa's rivers, lakes and groundwater give people fresh water, so people work to keep them clean.",
    ],
    "Trees take in water and give off water vapour. Which systems interact?",
    [
      "Trees: biosphere. Water: hydrosphere.",
      "The vapour goes into the air: atmosphere.",
    ],
    "biosphere, hydrosphere and atmosphere",
  ),
  "science/ia-g5-ecosystems": lesson(
    [
      "Producers make food. Consumers eat other living things.",
      "Decomposers, like worms and fungi, return nutrients to the soil.",
      "Matter moves around an ecosystem again and again.",
    ],
    "Hawks eat cottontail rabbits. Are hawks producers or consumers?",
    [
      "Hawks can't make their own food.",
      "They eat other animals.",
    ],
    "consumers",
  ),
  "science/ia-g5-sun-stars": lesson(
    [
      "The sun looks brighter than other stars because it is much closer to Earth.",
      "Far-off headlights look dim and near ones bright: distance works the same way for stars.",
      "Earth spins once about every 24 hours, giving day and night.",
      "The North Star seems to stay still because it is almost straight above Earth's axis.",
    ],
    "Some stars are bigger than the sun. Why do they look so small?",
    [
      "Things far away look dimmer and smaller.",
      "Those stars are much farther from Earth.",
    ],
    "they are very far away",
  ),
  "social/ia-g5-iowa-and-change": lesson(
    [
      "Railroads crossed Iowa by 1870. Towns grew along them, and crops reached faraway cities.",
      "Machines like tractors and washing machines changed work, and many people moved from farms to cities.",
      "Iowa courts and laws widened rights: Susan Clark's school case and the vote for Black men in 1868.",
      "Young Iowans spoke up too: the Tinker students won free speech at school in 1969.",
    ],
    "What did the Supreme Court decide in Tinker v. Des Moines?",
    [
      "The students wore armbands to protest a war.",
      "The Court said rights don't stop at the schoolhouse gate.",
    ],
    "students keep their right to free speech at school",
  ),
  "social/ia-g5-money-choices": lesson(
    [
      "Borrowing costs money: you pay back the loan plus interest.",
      "Saving is safe and earns a little interest. Investing can grow more but has risk.",
      "Long-term goals, like college, need regular saving over years.",
      "Taxes pay for public services: sales tax, income tax and property tax.",
    ],
    "You borrow $100 and pay $10 interest. How much do you pay back?",
    [
      "Add the interest to the amount borrowed.",
      "100 + 10 = 110.",
    ],
    "$110",
  ),
};
