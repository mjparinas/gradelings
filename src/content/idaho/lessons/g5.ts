import { lesson, type GradeLessons } from "../../lessons";

// Lessons for Idaho's Grade 5 units that the shared lesson files don't cover. A copy of another state's unit
// carries a lesson written for Idaho under its own id, and a unit borrowed from another grade carries the lesson it
// has there, word for word.
export const LESSONS: GradeLessons = {
  "science/id-g5-sun-stars": lesson(
    [
      "The sun looks brighter than other stars because it is much closer to Earth.",
      "Far-off headlights look dim and near ones bright: distance works the same way for stars.",
      "Earth spins once about every 24 hours, giving day and night, and shadows change through the day.",
    ],
    "Some stars are bigger than the sun. Why do they look so small?",
    [
      "Things far away look dimmer and smaller.",
      "Those stars are much farther from Earth.",
    ],
    "they are very far away",
  ),
  "science/id-g5-earth-water": lesson(
    [
      "The geosphere is rocks and land; the hydrosphere is water; the atmosphere is air; the biosphere is life.",
      "Most fresh water is frozen in ice caps and glaciers, and only a small part is easy to use.",
      "Melting mountain snow fills Idaho's rivers and reservoirs, and much water is stored underground in aquifers.",
    ],
    "Trees take in water and give off water vapor. Which systems interact?",
    [
      "Trees: biosphere. Water: hydrosphere.",
      "The vapor goes into the air: atmosphere.",
    ],
    "biosphere, hydrosphere and atmosphere",
  ),
  "science/id-g5-fossils": lesson(
    [
      "Fossils are remains or traces of living things from long ago.",
      "Fossils tell us about past places: a fish fossil on dry land means water was once there.",
      "In rock layers, older fossils are usually lower down. The Hagerman horse is Idaho's state fossil.",
    ],
    "In rock layers, are older fossils usually higher or lower?",
    [
      "Layers pile up over time.",
      "The first layers are at the bottom.",
    ],
    "lower down",
  ),
  "science/id-g5-ecosystems": lesson(
    [
      "Producers make food. Consumers eat other living things.",
      "Decomposers, like worms and fungi, return nutrients to the soil.",
      "Matter moves around an ecosystem again and again.",
    ],
    "Bears eat salmon. Are bears producers or consumers?",
    [
      "Bears can't make their own food.",
      "They eat other animals.",
    ],
    "consumers",
  ),
  "social/id-g5-public-lands": lesson(
    [
      "More than half of Idaho's land is owned by the federal government, such as national forests and land run by the Bureau of Land Management.",
      "State endowment lands earn money for public schools. A reservation is land a tribe governs.",
      "Different governments make the rules for each kind of land, so national, state and tribal governments share power.",
    ],
    "About how much of Idaho's land is owned by the federal government?",
    [
      "National forests and BLM land cover much of Idaho.",
      "Together they are more than half.",
    ],
    "more than half",
  ),
  "social/id-g5-money-choices": lesson(
    [
      "Borrowing costs extra because of interest, so ask whether you can pay it back on time.",
      "Saving in a bank earns interest. Investing can grow faster but has more risk.",
      "Taxes pay for things like schools, roads and fire departments. A tariff is a tax on goods from another country.",
    ],
    "You want to buy a $200 bike in 10 weeks. How much should you save each week?",
    [
      "Divide the cost by the number of weeks.",
      "$200 ÷ 10 = $20.",
    ],
    "$20",
  ),
};
