import type { Unit } from "../../types";
import { OWN_SCIENCE, SCIENCE_COPIES } from "../../california/units/science-g9";
import { copyOf, from } from "./kit";

// Hawaiʻi Grade 9 science: a copy of California's ecosystem-dynamics unit without its California places, with Hawaiʻi
// examples added.

const CA = [...SCIENCE_COPIES, ...OWN_SCIENCE];

export const SCIENCE_9: Unit[] = [
  copyOf(
    from(CA, "ca-g9-ecosystems"),
    {
      id: "hi-g9-ecosystems",
      title: "Ecosystem Dynamics",
      emoji: "🐟",
      blurb: "Carrying capacity, energy pyramids and human impacts.",
      parentNote:
        "Practices carrying capacity, energy flow and the 10% rule, how ecosystems respond to disturbance, and solutions that reduce human impacts, with Hawaiʻi examples like reef fish and herbivore protection, new lava flows being colonized, invasive species and traditional fishpond management.",
      standards: ["HS-LS2-1; HS-LS2-4; HS-LS2-6; HS-LS2-7", "carrying capacity, energy flow, ecosystem stability and reducing human impacts on biodiversity"],
    },
    [
      ["Fresh lava flows on Hawaiʻi Island are first colonized by ferns and ʻōhiʻa seedlings. This process is called…", "primary succession", ["secondary succession", "extinction", "eutrophication"], "Life builds a new ecosystem on bare rock."],
      ["Protecting plant-eating reef fish like parrotfish and surgeonfish helps reefs because these fish…", "keep seaweed from smothering coral", ["eat all the coral", "warm the water", "bring in sharks"], "Herbivores keep the balance."],
      ["A fishpond that holds more fish than its algae can feed has passed its…", "carrying capacity", ["energy pyramid", "trophic level", "food web"], "Limited food limits population."],
      ["Only about 10 percent of the energy in limu passes to the fish that eat it, because most energy is…", "used for life processes or lost as heat", ["stored forever", "turned into sand", "given back to the sun"], "Energy pyramids narrow at each level."],
      ["Invasive seaweed that overgrows reefs in Kāneʻohe Bay is removed by divers and…", "a barge that vacuums it up", ["dynamite", "more invasive fish", "pouring oil"], "People test solutions to protect reefs."],
      ["Mongooses brought to eat rats on sugar plantations ended up eating…", "the eggs of native ground-nesting birds", ["only rats", "only sugarcane", "coral"], "Introduced predators can upset ecosystems."],
      ["Some communities set rules for when and how much fishing is allowed in their waters, based on traditional knowledge. This is a way to…", "manage resources so fish populations stay healthy", ["catch every fish at once", "stop all fishing forever", "bring in new species"], "Hawaiʻi calls these community-based fishing areas.", true],
      ["After a wildfire burns a dry leeward forest, fast-growing invasive grasses often move in. This makes future fires…", "more likely", ["impossible", "less likely", "colder"], "Disturbance can shift an ecosystem.", true],
    ],
  ),
];
