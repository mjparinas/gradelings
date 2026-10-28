import { lesson, type GradeLessons } from "../../lessons";

// Lessons for South Dakota's Grade 5 units that the shared lesson files don't cover. A copy of another state's unit
// carries the original's lesson (with South Dakota examples where the original named its own state) under its own id,
// and a unit borrowed from another grade carries the lesson it has there.
export const LESSONS: GradeLessons = {
  "science/sd-g5-earth-water": lesson(
    [
      "Earth has four systems: the geosphere (land), hydrosphere (water), atmosphere (air) and biosphere (life).",
      "Most of Earth's water is salty ocean water, and most fresh water is frozen in ice.",
      "Many South Dakota towns pump groundwater from wells, and grass along riverbanks helps keep the Missouri River clean.",
    ],
    "Trees take in water and give off water vapour. Which systems interact?",
    [
      "Trees: biosphere. Water: hydrosphere.",
      "The vapour goes into the air: atmosphere.",
    ],
    "biosphere, hydrosphere and atmosphere",
  ),
  "science/sd-g5-ecosystems": lesson(
    [
      "Producers make food. Consumers eat other living things.",
      "Decomposers, like worms and fungi, return nutrients to the soil.",
      "Matter moves around an ecosystem again and again.",
    ],
    "Coyotes eat rabbits. Are coyotes producers or consumers?",
    [
      "Coyotes can't make their own food.",
      "They eat other animals.",
    ],
    "consumers",
  ),
  "science/sd-g5-sun-stars": lesson(
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
  "social/sd-g5-dakota-territory": lesson(
    [
      "Fur traders built Fort Pierre in 1832. Congress created Dakota Territory in 1861, with Yankton as its capital.",
      "The Homestead Act gave settlers 160 acres, and railroads brought immigrants from Europe.",
      "The 1868 treaty promised the Black Hills to the Lakota, but after gold was found they were taken in 1877.",
      "South Dakota became a state on November 2, 1889.",
    ],
    "The Fort Laramie Treaty of 1868 promised the Black Hills to the Lakota. What happened after gold was found there?",
    [
      "Miners rushed in after 1874.",
      "The Agreement of 1877 took the land without the consent the treaty required.",
    ],
    "the Black Hills were taken in 1877",
  ),
  "social/ga-g6-europe": lesson(
    [
      "Key features include the Alps, the Pyrenees, the Ural Mountains and the Rhine River.",
      "Europe has many languages and religions in a small area.",
      "The European Union helps member countries trade and work together.",
    ],
    "Which mountains are often called the line between Europe and Asia?",
    [
      "They run north to south through Russia.",
      "Their name starts with U.",
    ],
    "the Ural Mountains",
  ),
};
