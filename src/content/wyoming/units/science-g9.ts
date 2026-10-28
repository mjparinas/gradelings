import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g9";
import { copyOf, from } from "./kit";

// Wyoming Grade 9 science: a copy of California's ecosystem-dynamics unit without its California places, with Wyoming
// examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_9: Unit[] = [
  copyOf(
    from(CA, "ca-g9-ecosystems"),
    {
      id: "wy-g9-ecosystems",
      title: "Ecosystem Dynamics",
      emoji: "🐟",
      blurb: "Carrying capacity, energy pyramids and human impacts.",
      parentNote:
        "Practices carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and solutions that reduce human impacts, with Wyoming examples like wolves and willows in Yellowstone, forests regrowing after the 1988 fires and cheatgrass in sagebrush.",
      standards: ["HS-LS2-6; HS-LS2-7", "how ecosystems keep or change their balance when conditions change, and solutions that reduce human impacts on biodiversity"],
    },
    [
      ["If sagebrush stores 10,000 units of energy, about how much reaches the jackrabbits that eat it?", "1,000 units", ["10,000 units", "100 units", "5,000 units"], "Only about 10% passes to the next level."],
      ["After wolves returned to Yellowstone in 1995, elk spent less time browsing along streams, and willows…", "grew back in many places", ["all died", "turned into grass", "stopped growing anywhere"], "A change at the top can ripple through an ecosystem."],
      ["The largest elk herd a valley can support through winter is its…", "carrying capacity", ["food web", "biome", "trophic level"], "Limited food, water and space set the limit."],
      ["After the 1988 Yellowstone fires, lodgepole pine seedlings sprouted from cones the heat opened. Over many years this is…", "ecological succession", ["extinction", "photosynthesis", "migration"], "Communities rebuild over time."],
      ["Cheatgrass spreading after a fire makes the next fire come sooner. Which solution would best help sagebrush recover?", "planting native grasses and sagebrush after fires", ["letting cheatgrass spread", "burning more often", "removing all plants"], "Restore natives before invaders take over."],
      ["Fertilizer running off fields into a reservoir can cause algae blooms that…", "use up oxygen fish need", ["add oxygen", "cool the water", "clean the water"], "Too many nutrients upset the balance.", true],
      ["Why do top predators like golden eagles have smaller populations than the rabbits they eat?", "less energy reaches higher trophic levels", ["eagles eat only plants", "rabbits are bigger than eagles", "energy grows at each level"], "Energy is lost at each step.", true],
    ],
  ),
];
