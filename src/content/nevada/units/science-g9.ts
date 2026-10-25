import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g9";
import { copyOf, from } from "./kit";

// Nevada Grade 9 science: a copy of California's ecosystem-dynamics unit without its California places, with Nevada
// examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_9: Unit[] = [
  copyOf(
    from(CA, "ca-g9-ecosystems"),
    {
      id: "nv-g9-ecosystems",
      title: "Ecosystem Dynamics",
      emoji: "🐟",
      blurb: "Carrying capacity, energy pyramids and human impacts.",
      parentNote:
        "Practices carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and solutions that reduce human impacts, with Nevada examples like mule deer on the range, sagebrush after wildfire and the Lahontan cutthroat trout of Pyramid Lake.",
      standards: ["HS-LS2-1; HS-LS2-4; HS-LS2-6; HS-LS2-7", "carrying capacity, energy flow, ecosystem stability and reducing human impacts on biodiversity"],
    },
    [
      ["If meadow grasses store 10,000 units of energy, about how much reaches the grasshoppers that eat them?", "1,000 units", ["10,000 units", "100 units", "5,000 units"], "Only about 10% passes to the next level."],
      ["Small, planned burns in the forests around Lake Tahoe help because fire…", "clears dead wood so later fires are smaller", ["kills every pine tree", "turns the forest into a lake", "adds plastic to the soil"], "Less fuel means smaller fires."],
      ["The largest mule deer herd a Nevada valley can support over time is its…", "carrying capacity", ["food web", "biome", "trophic level"], "Limited food, water and space set the limit."],
      ["Quagga mussels can ride on boats from Lake Mead to other lakes. Which solution would best protect those lakes?", "cleaning and draining boats before they enter new water", ["adding more mussels", "draining Lake Tahoe", "removing all native fish"], "Stopping spread protects other ecosystems."],
      ["After a wildfire, plants return to a sagebrush valley in stages. This is…", "ecological succession", ["extinction", "photosynthesis", "migration"], "Communities rebuild over time."],
      ["Fertilizer running off fields into a lake can cause algae blooms that…", "use up oxygen fish need", ["add oxygen", "cool the water", "clean the water"], "Too many nutrients upset the balance.", true],
      ["Why do top predators like golden eagles have smaller populations than the rabbits they eat?", "less energy reaches higher trophic levels", ["eagles eat only plants", "rabbits are bigger than eagles", "energy grows at each level"], "Energy is lost at each step.", true],
    ],
  ),
];
