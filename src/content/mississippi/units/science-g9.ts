import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g9";
import { copyOf, from } from "./kit";

// Mississippi Grade 9 science (Biology): a copy of California's ecosystem-dynamics unit without its California
// places, with Mississippi examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_9: Unit[] = [
  copyOf(
    from(CA, "ca-g9-ecosystems"),
    {
      id: "ms-g9-ecosystems",
      title: "Ecosystem Dynamics",
      emoji: "🐟",
      blurb: "Energy pyramids, limiting factors and succession.",
      parentNote:
        "Practices energy flow and the 10% rule, limiting factors and carrying capacity, succession and how people change ecosystems, with Mississippi examples like longleaf pine forests that need fire, oysters in the Mississippi Sound and the low-oxygen zone in the Gulf of Mexico.",
      standards: ["BIO.5", "the interdependence of living organisms and their environment"],
    },
    [
      ["If marsh grasses store 10,000 units of energy, about how much reaches the insects that eat them?", "1,000 units", ["10,000 units", "100 units", "5,000 units"], "Only about 10% passes to the next level."],
      ["Longleaf pine forests in southern Mississippi need small, regular fires because fire…", "clears brush so young pines and grasses get light", ["kills every pine tree", "turns the forest into a lake", "adds plastic to the soil"], "Longleaf pines are built to survive low fires."],
      ["The largest deer population a Mississippi forest can support over time is its…", "carrying capacity", ["food web", "biome", "trophic level"], "Limited food, water and space set the limit."],
      ["Fertilizer carried down the Mississippi River helps cause a low-oxygen 'dead zone' in the Gulf because…", "extra nutrients feed algae that use up oxygen as they decay", ["fertilizer adds oxygen", "the water freezes", "fish eat the fertilizer"], "Too many nutrients upset the balance."],
      ["When too much fresh river water reaches the Mississippi Sound, oysters can die. Salt level is a…", "limiting factor", ["producer", "biome", "trophic level"], "Oysters need water that is not too fresh."],
      ["After a hurricane flattens a coastal forest, plants return in stages. This is…", "secondary succession", ["primary succession", "extinction", "migration"], "Soil was left, so it is secondary."],
      ["A disease that spreads faster in a crowded deer herd is a…", "density-dependent limiting factor", ["density-independent limiting factor", "producer", "abiotic factor"], "Crowding makes it worse.", true],
      ["Why do top predators like alligators have smaller populations than the fish they eat?", "less energy reaches higher trophic levels", ["alligators eat only plants", "fish are bigger than alligators", "energy grows at each level"], "Energy is lost at each step.", true],
    ],
  ),
];
