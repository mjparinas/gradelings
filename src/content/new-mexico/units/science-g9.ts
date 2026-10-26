import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g9";
import { copyOf, from } from "./kit";

// New Mexico Grade 9 science: a copy of California's ecosystem-dynamics unit without its California places, with New
// Mexico examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_9: Unit[] = [
  copyOf(
    from(CA, "ca-g9-ecosystems"),
    {
      id: "nm-g9-ecosystems",
      title: "Ecosystem Dynamics",
      emoji: "🐟",
      blurb: "Carrying capacity, energy pyramids and human impacts.",
      parentNote:
        "Practices carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and solutions that reduce human impacts, with New Mexico examples like elk in the mountains, ponderosa pine forests after wildfire and salt cedar along the rivers.",
      standards: ["HS-LS2-1; HS-LS2-4; HS-LS2-6; HS-LS2-7; HS-LS2-7 NM", "carrying capacity, energy flow, ecosystem stability and reducing human impacts on biodiversity, including a local issue"],
    },
    [
      ["If meadow grasses store 10,000 units of energy, about how much reaches the grasshoppers that eat them?", "1,000 units", ["10,000 units", "100 units", "5,000 units"], "Only about 10% passes to the next level."],
      ["Small, planned burns in New Mexico's ponderosa pine forests help because fire…", "clears dead wood so later fires are smaller", ["kills every pine tree", "turns the forest into a lake", "adds plastic to the soil"], "Less fuel means smaller fires."],
      ["The largest elk herd a mountain valley can support over time is its…", "carrying capacity", ["food web", "biome", "trophic level"], "Limited food, water and space set the limit."],
      ["Salt cedar spreads along the Pecos River and crowds out cottonwoods. Which solution would best help?", "removing salt cedar and replanting native trees", ["planting more salt cedar", "draining the river", "removing all native fish"], "Restoring native plants helps the whole ecosystem."],
      ["After a wildfire, plants return to a burned forest in stages. This is…", "ecological succession", ["extinction", "photosynthesis", "migration"], "Communities rebuild over time."],
      ["Fertilizer running off fields into a lake can cause algae blooms that…", "use up oxygen fish need", ["add oxygen", "cool the water", "clean the water"], "Too many nutrients upset the balance.", true],
      ["Why do top predators like golden eagles have smaller populations than the rabbits they eat?", "less energy reaches higher trophic levels", ["eagles eat only plants", "rabbits are bigger than eagles", "energy grows at each level"], "Energy is lost at each step.", true],
    ],
  ),
];
