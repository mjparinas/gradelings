import type { Unit } from "../../types";
import { SOCIAL_5 as CALIFORNIA_SOCIAL_5 } from "../../california/units/social-g5";
import { SCIENCE_5 as WASHINGTON_SCIENCE_5 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// New Mexico copies of Grade 5 units that fit New Mexico except for a few questions naming another state's places (or,
// for the explorers unit, about American Indian nations, which New Mexico teaches in its own Eastern Woodland and Grade 4
// units).

export const SOCIAL_COPIES: Unit[] = [
  localCopy(
    from(CALIFORNIA_SOCIAL_5, "ca-g5-explorers"),
    "nm-g5-explorers",
    ["5.18; 5.24", "explorers' purposes and perspectives in their time, and the regions of the Western Hemisphere they reached"],
    [
      ["Portuguese sailors used a small, fast ship with triangular sails that could sail into the wind, called a…", "caravel", ["canoe", "steamboat", "submarine"], "Columbus sailed with caravels."],
      ["The astrolabe helped sailors find their…", "latitude by measuring the sun or stars", ["weight", "speed in a storm", "favorite star"], "It measures angles above the horizon."],
      ["Prince Henry the Navigator of Portugal supported…", "voyages and a school for sailors", ["the Pilgrims", "the fur trade", "the Erie Canal"], "Portugal led early sea exploration."],
      ["Explorers looked for a Northwest Passage, a water route through North America to…", "the Pacific Ocean and Asia", ["the North Pole", "Antarctica", "the Rio Grande"], "No easy route was found."],
      ["Spanish explorers in the Americas were looking above all for…", "gold, land and new routes", ["snow", "ice for their ships", "dinosaur fossils"], "Spain claimed much of the land west of the Mississippi."],
      ["In 1540, Francisco Vázquez de Coronado led an army north from Mexico into New Mexico looking for…", "cities of gold", ["a route to the Moon", "ice for his ships", "dinosaur fossils"], "He found Pueblo villages, not gold."],
      ["Coronado's expedition met the people of Zuni and other Pueblos, who already had…", "towns, farms and trade", ["no homes", "no food", "railroads"], "The Pueblos had lived there for centuries.", true],
      ["In 1598, Juan de Oñate led settlers north to found a Spanish colony along the…", "Rio Grande", ["Mississippi", "Amazon", "Hudson"], "It was the start of Spanish New Mexico.", true],
      ["Cabeza de Vaca walked across the Southwest in the 1530s after his ship was wrecked. His stories led Spain to send…", "more explorers north", ["no one ever again", "a railroad", "astronauts"], "He told of rich cities to the north.", true],
    ],
    {
      parentNote: "The aims, sponsors, routes and obstacles of European explorers, new ships and navigation tools, the land claims of Spain, France, England and the Dutch, and the Spanish expeditions of Cabeza de Vaca, Coronado and Oñate into the Southwest.",
    },
  ),
];

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_5, "wa-g5-ecosystems"),
    "nm-g5-ecosystems",
    [
      "5-LS2-1",
      "the movement of matter among plants, animals, decomposers and the environment",
    ],
    [
      [
        "Mushrooms on a fallen pine in a New Mexico mountain forest are…",
        "decomposers",
        ["producers", "predators"],
        "They break down dead things.",
      ],
      [
        "A yucca plant makes its own food from sunlight. It is a…",
        "producer",
        ["consumer", "decomposer"],
        "Plants are producers.",
      ],
      [
        "A jackrabbit that eats desert plants is a…",
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
