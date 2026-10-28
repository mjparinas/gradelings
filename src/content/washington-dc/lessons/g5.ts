import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Washington, DC's Grade 5 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with DC examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/dc-g5-earth-water": lesson(
    [
      "Earth has four systems: the geosphere (land), hydrosphere (water), atmosphere (air) and biosphere (life).",
      "Most of Earth's water is salty ocean water, and most fresh water is frozen in ice.",
      "In Washington, DC, most drinking water comes from the Potomac River, so people work to keep the river clean.",
    ],
    "Trees take in water and give off water vapour. Which systems interact?",
    [
      "Trees: biosphere. Water: hydrosphere.",
      "The vapour goes into the air: atmosphere.",
    ],
    "biosphere, hydrosphere and atmosphere",
  ),
  "science/dc-g5-ecosystems": lesson(
    [
      "Producers make food. Consumers eat other living things.",
      "Decomposers, like worms and fungi, return nutrients to the soil.",
      "Matter moves around an ecosystem again and again.",
    ],
    "Orcas eat salmon. Are orcas producers or consumers?",
    [
      "Orcas can't make their own food.",
      "They eat other animals.",
    ],
    "consumers",
  ),
  "science/dc-g5-sun-stars": lesson(
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
  "social/dc-g5-great-migration": lesson(
    [
      "From about 1910 to 1970, about 6 million Black Americans moved from the South to cities in the North and West.",
      "They left Jim Crow laws and violence and looked for factory jobs.",
      "A flowering of Black art, music and writing followed, in Harlem and on DC's U Street.",
      "Langston Hughes, Duke Ellington and Zora Neale Hurston were part of it.",
    ],
    "Give one reason families moved north in the Great Migration.",
    [
      "Think about life under Jim Crow laws.",
      "Think about the jobs in Northern factories.",
    ],
    "to escape segregation and find jobs",
  ),
  "social/dc-g5-voices-for-justice": lesson(
    [
      "Ida B. Wells, W.E.B. Du Bois and A. Philip Randolph fought for civil rights.",
      "Plessy v. Ferguson (1896) allowed segregation. Brown v. Board (1954) ended it in public schools.",
      "Bolling v. Sharpe, decided the same day, ended school segregation in DC.",
      "Boycotts, sit-ins and marches led to the Civil Rights Act and the Voting Rights Act.",
    ],
    "Why did DC need its own case, Bolling v. Sharpe?",
    [
      "Brown used the 14th Amendment, which speaks to states.",
      "DC is not a state.",
    ],
    "the rule for states didn't fit DC",
  ),
};
