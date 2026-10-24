import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g9";
import { copyOf, from } from "./kit";

// Colorado Grade 9 science: a copy of California's ecosystem-dynamics unit without its California places, with Colorado
// examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_9: Unit[] = [
  copyOf(
    from(CA, "ca-g9-ecosystems"),
    {
      id: "co-g9-ecosystems",
      title: "Ecosystem Dynamics",
      emoji: "🐟",
      blurb: "Carrying capacity, energy pyramids and human impacts.",
      parentNote:
        "Practices carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and solutions that reduce human impacts, with Colorado examples like forest fires, bark beetles, the Colorado River and invasive species.",
      standards: ["LS2.HS.4.a; LS2.HS.5.b; LS2.HS.6.a; LS2.HS.6.b", "carrying capacity, energy flow, ecosystem stability and reducing human impacts on biodiversity"],
    },
    [
      ["If grasses on the plains store 10,000 units of energy, about how much reaches the grasshoppers that eat them?", "1,000 units", ["10,000 units", "100 units", "5,000 units"], "Only about 10% passes to the next level."],
      ["Controlled burns can help a Colorado ponderosa pine forest because fire…", "clears dead brush and recycles nutrients", ["kills every tree", "turns the forest into a lake", "adds plastic to the soil"], "Small fires lower the fuel for big ones."],
      ["The largest elk herd a mountain valley can support over time is its…", "carrying capacity", ["food web", "biome", "trophic level"], "Limited food and space set the limit."],
      ["Zebra mussels can ride on boats from lake to lake. Which solution best protects Colorado's reservoirs?", "inspecting and cleaning boats before launch", ["adding more mussels", "draining every reservoir", "removing all native fish"], "Stopping spread protects other ecosystems."],
      ["After a forest fire, plants return to a burned slope in stages. This is…", "ecological succession", ["extinction", "photosynthesis", "migration"], "Communities rebuild over time."],
      ["Fertilizer running off farm fields can cause algae blooms that…", "use up oxygen fish need", ["add oxygen", "cool the water", "clean the water"], "Too many nutrients upset the balance.", true],
      ["Why do top predators like mountain lions have smaller populations than the deer they eat?", "less energy reaches higher trophic levels", ["mountain lions eat only plants", "deer are bigger than mountain lions", "energy grows at each level"], "Energy is lost at each step.", true],
    ],
  ),
];
