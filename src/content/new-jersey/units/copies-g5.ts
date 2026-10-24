import type { Unit } from "../../types";
import { SCIENCE_5 as WASHINGTON_SCIENCE_5 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// New Jersey copies of Grade 5 units that fit New Jersey except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_5, "wa-g5-ecosystems"),
    "nj-g5-ecosystems",
    [
      "5-LS2-1",
      "the movement of matter among plants, animals, decomposers and the environment",
    ],
    [
      [
        "Mushrooms on a fallen oak in a New Jersey forest are…",
        "decomposers",
        ["producers", "predators"],
        "They break down dead things.",
      ],
      [
        "A pitch pine in the Pine Barrens makes its own food from sunlight. It is a…",
        "producer",
        ["consumer", "decomposer"],
        "Plants are producers.",
      ],
      [
        "A deer that eats forest plants is a…",
        "consumer",
        ["producer", "decomposer"],
        "Consumers eat other living things.",
      ],
      [
        "Decomposers return… to the soil.",
        "nutrients",
        ["plastic", "sunlight"],
        "Plants use the nutrients again.",
      ],
      [
        "Plants get most of the material they need to grow from…",
        "air and water",
        ["soil only", "sunlight only"],
        "They take in carbon dioxide from the air.",
        true,
      ],
      [
        "If all the decomposers in a forest disappeared, dead leaves would…",
        "pile up",
        ["vanish anyway", "turn into rocks"],
        "Decomposers recycle matter.",
        true,
      ],
    ],
    {
      parentNote:
        "Practices how matter moves among plants, animals, decomposers and the environment, from food chains to decomposers that return nutrients to the soil.",
    },
  ),
];
