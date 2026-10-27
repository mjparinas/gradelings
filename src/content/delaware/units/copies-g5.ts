import type { Unit } from "../../types";
import { SOCIAL_5 as CALIFORNIA_SOCIAL_5 } from "../../california/units/social-g5";
import { SCIENCE_5 as WASHINGTON_SCIENCE_5 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// Delaware copies of Grade 5 units that fit Delaware except for a few questions naming another state's places
// (or, for the explorers unit, about American Indian nations, which Delaware teaches in its own Eastern Woodland and
// Grade 4 units).

export const SOCIAL_COPIES: Unit[] = [
  localCopy(
    from(CALIFORNIA_SOCIAL_5, "ca-g5-explorers"),
    "de-g5-explorers",
    ["E.3.4-5.a; H.1.4-5.a; H.4.4-5.b", "how explorers' voyages changed the ways goods were produced and traded, putting their voyages in order, and the people who came to America"],
    [
      ["Portuguese sailors used a small, fast ship with triangular sails that could sail into the wind, called a…", "caravel", ["canoe", "steamboat", "submarine"], "Columbus sailed with caravels."],
      ["The astrolabe helped sailors find their…", "latitude by measuring the sun or stars", ["weight", "speed in a storm", "favorite star"], "It measures angles above the horizon."],
      ["Prince Henry the Navigator of Portugal supported…", "voyages and a school for sailors", ["the Pilgrims", "the fur trade", "the Erie Canal"], "Portugal led early sea exploration."],
      ["Explorers looked for a Northwest Passage, a water route through North America to…", "the Pacific Ocean and Asia", ["the North Pole", "Antarctica", "the Amazon"], "No easy route was found."],
      ["Spanish explorers in the Americas were looking above all for…", "gold, land and new routes", ["snow", "ice for their ships", "dinosaur fossils"], "Spain claimed much of the land west of the Mississippi."],
      ["In 1609, Henry Hudson, an English captain sailing for the Dutch, explored…", "Delaware Bay", ["the Pacific Ocean", "the Gulf of Mexico", "the Amazon River"], "He was looking for a route to Asia."],
      ["In 1610, the English captain Samuel Argall named a cape after Lord De La Warr, the governor of…", "Virginia", ["Spain", "Mexico", "Florida"], "The name later spread to the bay, the river and the state."],
      ["When Europeans reached Delaware Bay, the Lenape and Nanticoke people already had…", "villages, farms and trade", ["no homes", "no food", "railroads"], "They had lived there for thousands of years.", true],
      ["Dutch traders sailed up the Delaware River to trade with the Lenape for…", "beaver furs", ["whales", "gold", "coffee"], "Furs were sold in Europe.", true],
    ],
    {
      parentNote: "The aims, sponsors, routes and obstacles of European explorers, new ships and navigation tools, the land claims of Spain, France, England and the Dutch, and the voyages of Henry Hudson and Samuel Argall to Delaware Bay.",
    },
  ),
];

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_5, "wa-g5-ecosystems"),
    "de-g5-ecosystems",
    [
      "5-LS2-1",
      "the movement of matter among plants, animals, decomposers and the environment",
    ],
    [
      [
        "Mushrooms on a fallen pine in a Delaware forest are…",
        "decomposers",
        ["producers", "predators"],
        "They break down dead things.",
      ],
      [
        "A tulip poplar tree makes its own food from sunlight. It is a…",
        "producer",
        ["consumer", "decomposer"],
        "Plants are producers.",
      ],
      [
        "A white-tailed deer that eats leaves and twigs is a…",
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
