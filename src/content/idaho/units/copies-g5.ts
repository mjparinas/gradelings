import type { Unit } from "../../types";
import { SCIENCE_5 as WASHINGTON_SCIENCE_5 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// Idaho copies of Grade 5 units that fit Idaho except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_5, "wa-g5-ecosystems"),
    "id-g5-ecosystems",
    ["5-LS-2.4", "the movement of matter among plants, animals, decomposers and the environment"],
    [
      ["Mushrooms on a fallen pine in an Idaho forest are…", "decomposers", ["producers", "predators"], "They break down dead things."],
      ["Sagebrush makes its own food from sunlight. It is a…", "producer", ["consumer", "decomposer"], "Plants are producers."],
      ["A pronghorn that eats sagebrush is a…", "consumer", ["producer", "decomposer"], "Consumers eat other living things."],
      ["Decomposers return… to the soil.", "nutrients", ["plastic", "sunlight"], "Plants use the nutrients again."],
      ["Plants get most of the material they need to grow from…", "air and water", ["soil only", "sunlight only"], "They take in carbon dioxide from the air.", true],
      ["Salmon die after laying their eggs in Idaho streams. Their bodies…", "add nutrients to the stream and the land nearby", ["turn into rocks", "make the water salty"], "Matter moves from animals back into the environment.", true],
    ],
    {
      parentNote:
        "Practices how matter moves among plants, animals, decomposers and the environment, from food chains to decomposers that return nutrients to the soil.",
    },
  ),
];
