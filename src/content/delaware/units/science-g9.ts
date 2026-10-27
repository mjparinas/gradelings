import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g9";
import { copyOf, from } from "./kit";

// Delaware Grade 9 science: a copy of California's ecosystem-dynamics unit without its California places, with
// Delaware examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_9: Unit[] = [
  copyOf(
    from(CA, "ca-g9-ecosystems"),
    {
      id: "de-g9-ecosystems",
      title: "Ecosystem Dynamics",
      emoji: "🐟",
      blurb: "Carrying capacity, energy pyramids and human impacts.",
      parentNote:
        "Practices carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and solutions that reduce human impacts, with Delaware examples like horseshoe crabs and red knots, forests regrowing on old farm fields and algae in the Inland Bays.",
      standards: ["HS-LS2-1; HS-LS2-4; HS-LS2-6; HS-LS2-7", "carrying capacity, energy flow, ecosystem stability and reducing human impacts on biodiversity"],
    },
    [
      ["If meadow grasses store 10,000 units of energy, about how much reaches the grasshoppers that eat them?", "1,000 units", ["10,000 units", "100 units", "5,000 units"], "Only about 10% passes to the next level."],
      ["When too many horseshoe crabs were caught for bait in the 1990s, there were fewer eggs for…", "red knots, the shorebirds that eat them", ["oak trees", "earthworms", "sand dunes"], "A change in one population affects the species that depend on it."],
      ["The largest deer herd a forest can support over time is its…", "carrying capacity", ["food web", "biome", "trophic level"], "Limited food, water and space set the limit."],
      ["Too much nitrogen from farms and septic systems feeds algae in Delaware's Inland Bays. Which solution would best help?", "reducing nutrient runoff into the bays", ["adding more fertilizer", "dredging all the sea grass", "removing all fish"], "Cleaner water lets sea grass grow back."],
      ["A Delaware farm field left unplowed slowly fills with shrubs and then trees. This is…", "ecological succession", ["extinction", "photosynthesis", "migration"], "Communities rebuild over time."],
      ["Fertilizer running off lawns into a lake can cause algae blooms that…", "use up oxygen fish need", ["add oxygen", "cool the water", "clean the water"], "Too many nutrients upset the balance.", true],
      ["Why do top predators like bald eagles have smaller populations than the fish they eat?", "less energy reaches higher trophic levels", ["eagles eat only plants", "fish are bigger than eagles", "energy grows at each level"], "Energy is lost at each step.", true],
    ],
  ),
];
