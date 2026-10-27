import type { Unit } from "../../types";
import { SCIENCE_5 as WASHINGTON_SCIENCE_5 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// West Virginia copies of Grade 5 units that fit West Virginia except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_5, "wa-g5-ecosystems"),
    "wv-g5-ecosystems",
    ["S.5.7; S.5.6", "the movement of matter among plants, animals, decomposers and the environment, and the sun's energy in food"],
    [
      ["Mushrooms on a fallen oak in a West Virginia forest are…", "decomposers", ["producers", "predators"], "They break down dead things."],
      ["A sugar maple makes its own food from sunlight. It is a…", "producer", ["consumer", "decomposer"], "Plants are producers."],
      ["A white-tailed deer that eats forest plants is a…", "consumer", ["producer", "decomposer"], "Consumers eat other living things."],
      ["Decomposers return… to the soil.", "nutrients", ["plastic", "sunlight"], "Plants use the nutrients again."],
      ["The energy in a black bear's berries first came from…", "the sun", ["the soil", "the rain"], "Plants store the sun's energy as food.", true],
      ["If all the decomposers in a forest disappeared, dead leaves would…", "pile up", ["vanish anyway", "turn into rocks"], "Decomposers recycle matter.", true],
    ],
    {
      parentNote:
        "Practices how matter moves among plants, animals, decomposers and the environment, from food chains to decomposers that return nutrients to the soil, and how the energy in food first came from the sun.",
    },
  ),
];
