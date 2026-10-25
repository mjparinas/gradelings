import type { Unit } from "../../types";
import { SOCIAL_5 as CALIFORNIA_SOCIAL_5 } from "../../california/units/social-g5";
import { SCIENCE_5 as WASHINGTON_SCIENCE_5 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// Kansas copies of Grade 5 units that fit Kansas except for a few questions naming another state's places (or, for
// the explorers unit, about American Indian nations, which Kansas teaches in its own Eastern Woodland and Grade 4 units).

export const SOCIAL_COPIES: Unit[] = [
  localCopy(
    from(CALIFORNIA_SOCIAL_5, "ca-g5-explorers"),
    "ks-g5-explorers",
    ["1.1; 5.1", "the choices explorers made and their consequences, and how geography and resources shaped exploration and the peoples explorers met"],
    [
      ["Portuguese sailors used a small, fast ship with triangular sails that could sail into the wind, called a…", "caravel", ["canoe", "steamboat", "submarine"], "Columbus sailed with caravels."],
      ["The astrolabe helped sailors find their…", "latitude by measuring the sun or stars", ["weight", "speed in a storm", "favorite star"], "It measures angles above the horizon."],
      ["Prince Henry the Navigator of Portugal supported…", "voyages and a school for sailors", ["the Pilgrims", "the fur trade", "the Erie Canal"], "Portugal led early sea exploration."],
      ["Explorers looked for a Northwest Passage, a water route through North America to…", "the Pacific Ocean and Asia", ["the North Pole", "Antarctica", "the Great Plains"], "No easy route was found."],
      ["Spanish explorers in the Americas were looking above all for…", "gold, land and new routes", ["snow", "ice for their ships", "dinosaur fossils"], "Spain claimed much of the land west of the Mississippi."],
      ["In 1541, the Spanish explorer Coronado crossed what is now Kansas looking for a rich land called…", "Quivira", ["Atlantis", "Plymouth", "Jamestown"], "He had heard stories of cities of gold."],
      ["Instead of gold, Coronado found grass houses and farm fields of…", "the people of Quivira, ancestors of the Wichita", ["English colonists", "Vikings", "Dutch traders"], "They grew corn, beans and squash.", true],
      ["French traders came up the Missouri River in the 1700s to trade with the Kansa people for…", "furs and hides", ["oil", "coffee", "gold coins"], "Furs were valuable in Europe.", true],
      ["Coronado's soldiers rode horses. Horses spread across the Great Plains after…", "the Spanish brought them to the Americas", ["they swam from Asia", "the Vikings left them", "the Pilgrims sold them"], "There were no horses in the Americas when Columbus arrived.", true],
    ],
    {
      parentNote: "The aims, sponsors, routes and obstacles of European explorers, new ships and navigation tools, the land claims of Spain, France, England and the Dutch, and Coronado's journey across what is now Kansas in 1541.",
    },
  ),
];

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_5, "wa-g5-ecosystems"),
    "ks-g5-ecosystems",
    [
      "5-LS2-1",
      "the movement of matter among plants, animals, decomposers and the environment",
    ],
    [
      [
        "Mushrooms on a fallen cottonwood along a Kansas creek are…",
        "decomposers",
        ["producers", "predators"],
        "They break down dead things.",
      ],
      [
        "A big bluestem grass plant makes its own food from sunlight. It is a…",
        "producer",
        ["consumer", "decomposer"],
        "Plants are producers.",
      ],
      [
        "A jackrabbit that eats prairie plants is a…",
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
