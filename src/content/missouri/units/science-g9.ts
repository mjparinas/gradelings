import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g9";
import { copyOf, from } from "./kit";

// Missouri Grade 9 science: a copy of California's ecosystem-dynamics unit without its California places, with Missouri
// examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_9: Unit[] = [
  copyOf(
    from(CA, "ca-g9-ecosystems"),
    {
      id: "mo-g9-ecosystems",
      title: "Ecosystem Dynamics",
      emoji: "🐟",
      blurb: "Carrying capacity, energy pyramids and human impacts.",
      parentNote:
        "Practices carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and solutions that reduce human impacts, with Missouri examples like prairie and glade burns, its big rivers and invasive species.",
      standards: ["9-12.LS2.A.1; 9-12.LS2.B.2; 9-12.LS2.C.1; 9-12.LS2.C.2", "carrying capacity, energy flow, ecosystem stability and solutions that protect biodiversity"],
    },
    [
      ["If prairie grasses store 10,000 units of energy, about how much reaches the grasshoppers that eat them?", "1,000 units", ["10,000 units", "100 units", "5,000 units"], "Only about 10% passes to the next level."],
      ["Controlled burns help a Missouri prairie or glade because fire…", "clears woody plants and recycles nutrients", ["kills every prairie plant", "turns the prairie into forest", "adds plastic to the soil"], "Prairie plants regrow from deep roots."],
      ["The largest population of deer a forest can support over time is its…", "carrying capacity", ["food web", "biome", "trophic level"], "Limited food and space set the limit."],
      ["Invasive carp have spread through Missouri's rivers. Which solution would best protect waters they haven't reached?", "barriers and fishing that stop them moving upstream", ["adding more carp", "draining the rivers", "removing all native fish"], "Stopping spread protects other ecosystems."],
      ["After a flood, plants return to a riverbank in stages. This is…", "ecological succession", ["extinction", "photosynthesis", "migration"], "Communities rebuild over time."],
      ["Fertilizer washing from farm fields down the Mississippi helps cause a low-oxygen dead zone in the…", "Gulf", ["Lake of the Ozarks only", "Arctic", "Pacific"], "Too many nutrients upset the balance.", true],
      ["Why do top predators like bald eagles have smaller populations than the fish they eat?", "less energy reaches higher trophic levels", ["eagles eat only plants", "fish are bigger than eagles", "energy grows at each level"], "Energy is lost at each step.", true],
    ],
  ),
];
