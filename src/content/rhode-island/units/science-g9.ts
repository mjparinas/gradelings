import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g9";
import { copyOf, from } from "./kit";

// Rhode Island Grade 9 science: a copy of California's ecosystem-dynamics unit without its California places, with Rhode
// Island examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_9: Unit[] = [
  copyOf(
    from(CA, "ca-g9-ecosystems"),
    {
      id: "ri-g9-ecosystems",
      title: "Ecosystem Dynamics",
      emoji: "🐟",
      blurb: "Carrying capacity, energy pyramids and human impacts.",
      parentNote:
        "Practices carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and solutions that reduce human impacts, with Rhode Island examples like deer on Block Island, low oxygen in the upper bay and restoring salt marshes.",
      standards: ["HS-LS2-1; HS-LS2-4; HS-LS2-6; HS-LS2-7", "carrying capacity, energy flow, ecosystem stability and reducing human impacts on biodiversity"],
    },
    [
      ["If marsh grasses store 10,000 units of energy, about how much reaches the insects that eat them?", "1,000 units", ["10,000 units", "100 units", "5,000 units"], "Only about 10% passes to the next level."],
      ["Deer on Block Island have no large predators, so their numbers can grow until they reach the island's…", "carrying capacity", ["food web", "biome", "trophic level"], "Limited food and space set the limit."],
      ["Too much nitrogen from wastewater in the upper bay can cause algae blooms that…", "use up oxygen fish need", ["add oxygen", "cool the water", "clean the water"], "Too many nutrients upset the balance."],
      ["Upgrading sewage treatment plants that drain into Narragansett Bay helps because it…", "cuts the nutrients that feed algae blooms", ["makes the water saltier", "removes all fish", "stops the tides"], "Less nitrogen means fewer blooms."],
      ["After a storm washes over a salt marsh, plants come back in stages. This is…", "ecological succession", ["extinction", "photosynthesis", "migration"], "Communities rebuild over time."],
      ["Common reed spreads into a salt marsh and crowds out native grasses. Which solution would best help?", "removing the reed and restoring the tides that kept it out", ["planting more common reed", "draining the marsh", "removing all native birds"], "Restoring native conditions helps the whole ecosystem.", true],
      ["Why do top predators like striped bass have smaller populations than the small fish they eat?", "less energy reaches higher trophic levels", ["striped bass eat only plants", "small fish are bigger", "energy grows at each level"], "Energy is lost at each step.", true],
    ],
  ),
];
