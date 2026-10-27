import type { Unit } from "../../types";
import { SOCIAL_5 as CALIFORNIA_SOCIAL_5 } from "../../california/units/social-g5";
import { SCIENCE_5 as WASHINGTON_SCIENCE_5 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// New Hampshire copies of Grade 5 units that fit New Hampshire except for a few questions naming another state's places
// (or, for the explorers unit, about American Indian nations, which New Hampshire teaches in its own Eastern Woodland and
// Grade 4 units).

export const SOCIAL_COPIES: Unit[] = [
  localCopy(
    from(CALIFORNIA_SOCIAL_5, "ca-g5-explorers"),
    "nh-g5-explorers",
    ["SS:WH:6:2.4; SS:GE:6:1.2", "how explorers' encounters led to exchanges between peoples, and using location, direction and distance to follow their routes"],
    [
      ["Portuguese sailors used a small, fast ship with triangular sails that could sail into the wind, called a…", "caravel", ["canoe", "steamboat", "submarine"], "Columbus sailed with caravels."],
      ["The astrolabe helped sailors find their…", "latitude by measuring the sun or stars", ["weight", "speed in a storm", "favorite star"], "It measures angles above the horizon."],
      ["Prince Henry the Navigator of Portugal supported…", "voyages and a school for sailors", ["the Pilgrims", "the fur trade", "the Erie Canal"], "Portugal led early sea exploration."],
      ["Explorers looked for a Northwest Passage, a water route through North America to…", "the Pacific Ocean and Asia", ["the North Pole", "Antarctica", "the Amazon"], "No easy route was found."],
      ["Spanish explorers in the Americas were looking above all for…", "gold, land and new routes", ["snow", "ice for their ships", "dinosaur fossils"], "Spain claimed much of the land west of the Mississippi."],
      ["In 1603, the English captain Martin Pring sailed up the Piscataqua River looking for…", "sassafras and other goods to sell", ["a route to the Moon", "ice for his ships", "dinosaur fossils"], "Sassafras was valuable in Europe."],
      ["In 1614, John Smith mapped the coast north of Cape Cod and named the region…", "New England", ["New Spain", "New France", "New Amsterdam"], "His map drew English settlers."],
      ["When Europeans reached the New Hampshire coast, the Abenaki and Pennacook people already had…", "villages, farms and trade", ["no homes", "no food", "railroads"], "They had lived there for thousands of years.", true],
      ["Fishing crews from England came to the Isles of Shoals, off New Hampshire's coast, to catch…", "cod", ["whales only", "gold", "beavers"], "Dried cod was sold in Europe.", true],
    ],
    {
      parentNote: "The aims, sponsors, routes and obstacles of European explorers, new ships and navigation tools, the land claims of Spain, France, England and the Dutch, and and the English voyages of Martin Pring and John Smith along the New Hampshire coast.",
    },
  ),
];

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_5, "wa-g5-ecosystems"),
    "nh-g5-ecosystems",
    [
      "5-LS2-1",
      "the movement of matter among plants, animals, decomposers and the environment",
    ],
    [
      [
        "Mushrooms on a fallen pine in a New Hampshire forest are…",
        "decomposers",
        ["producers", "predators"],
        "They break down dead things.",
      ],
      [
        "A sugar maple makes its own food from sunlight. It is a…",
        "producer",
        ["consumer", "decomposer"],
        "Plants are producers.",
      ],
      [
        "A moose that eats leaves and twigs is a…",
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
