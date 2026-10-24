import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g9";
import { copyOf, from } from "./kit";

// New Jersey Grade 9 science: a copy of California's ecosystem-dynamics unit without its California places, with New
// Jersey examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_9: Unit[] = [
  copyOf(
    from(CA, "ca-g9-ecosystems"),
    {
      id: "nj-g9-ecosystems",
      title: "Ecosystem Dynamics",
      emoji: "🐟",
      blurb: "Carrying capacity, energy pyramids and human impacts.",
      parentNote:
        "Practices carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and solutions that reduce human impacts, with New Jersey examples like fire in the Pine Barrens, Barnegat Bay and invasive species.",
      standards: ["HS-LS2-1; HS-LS2-4; HS-LS2-6; HS-LS2-7", "carrying capacity, energy flow, ecosystem stability and reducing human impacts on biodiversity"],
    },
    [
      ["If salt marsh grasses store 10,000 units of energy, about how much reaches the insects that eat them?", "1,000 units", ["10,000 units", "100 units", "5,000 units"], "Only about 10% passes to the next level."],
      ["Controlled burns help the Pine Barrens because fire…", "clears brush and helps pitch pines spread seeds", ["kills every pine", "turns the forest into a lake", "adds plastic to the soil"], "Some pine cones open best after fire."],
      ["The largest population of deer a woodland can support over time is its…", "carrying capacity", ["food web", "biome", "trophic level"], "Limited food and space set the limit."],
      ["Spotted lanternflies spread across New Jersey on cars and firewood. Which solution would best slow them?", "checking vehicles and not moving firewood", ["releasing more lanternflies", "cutting down every tree", "removing all native insects"], "Stopping spread protects other ecosystems."],
      ["After a flood, plants return to a riverbank in stages. This is…", "ecological succession", ["extinction", "photosynthesis", "migration"], "Communities rebuild over time."],
      ["Fertilizer running off lawns into Barnegat Bay can cause algae blooms that…", "use up oxygen fish need", ["add oxygen", "cool the water", "clean the water"], "Too many nutrients upset the balance.", true],
      ["Why do top predators like bald eagles have smaller populations than the fish they eat?", "less energy reaches higher trophic levels", ["eagles eat only plants", "fish are bigger than eagles", "energy grows at each level"], "Energy is lost at each step.", true],
    ],
  ),
];
