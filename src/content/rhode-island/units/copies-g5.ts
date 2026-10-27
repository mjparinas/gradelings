import type { Unit } from "../../types";
import { SOCIAL_5 as CALIFORNIA_SOCIAL_5 } from "../../california/units/social-g5";
import { SCIENCE_5 as WASHINGTON_SCIENCE_5 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// Rhode Island copies of Grade 5 units that fit Rhode Island except for a few questions naming another state's places (or,
// for the explorers unit, about American Indian nations, which Rhode Island teaches in its own units).

export const SOCIAL_COPIES: Unit[] = [
  localCopy(
    from(CALIFORNIA_SOCIAL_5, "ca-g5-explorers"),
    "ri-g5-explorers",
    ["SS5.2.1", "European colonization: why explorers came to the Americas, the routes they sailed and the lands their countries claimed"],
    [
      ["Portuguese sailors used a small, fast ship with triangular sails that could sail into the wind, called a…", "caravel", ["canoe", "steamboat", "submarine"], "Columbus sailed with caravels."],
      ["The astrolabe helped sailors find their…", "latitude by measuring the sun or stars", ["weight", "speed in a storm", "favorite star"], "It measures angles above the horizon."],
      ["Prince Henry the Navigator of Portugal supported…", "voyages and a school for sailors", ["the Pilgrims", "the fur trade", "the Erie Canal"], "Portugal led early sea exploration."],
      ["Explorers looked for a Northwest Passage, a water route through North America to…", "the Pacific Ocean and Asia", ["the North Pole", "Antarctica", "the Amazon River"], "No easy route was found."],
      ["Spanish explorers in the Americas were looking above all for…", "gold, land and new routes", ["snow", "ice for their ships", "dinosaur fossils"], "Spain claimed much of the land west of the Mississippi."],
      ["In 1524, the Italian explorer Giovanni da Verrazzano, sailing for France, anchored in…", "Narragansett Bay", ["the Gulf of Mexico", "Hudson Bay", "the Caribbean Sea"], "He wrote about the bay and the people he met there."],
      ["The Dutch explorer Adriaen Block sailed along the New England coast in 1614. An island off Rhode Island is named…", "Block Island", ["Long Island", "Prince Edward Island", "Ellis Island"], "The island still carries his name.", true],
      ["Verrazzano wrote that the people he met at Narragansett Bay already had…", "villages, fields and boats", ["no homes", "no food", "railroads"], "People had lived there for thousands of years.", true],
    ],
    {
      parentNote: "The aims, sponsors, routes and obstacles of European explorers, new ships and navigation tools, the land claims of Spain, France, England and the Dutch, and the voyages of Verrazzano and Adriaen Block along the New England coast.",
    },
  ),
];

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_5, "wa-g5-ecosystems"),
    "ri-g5-ecosystems",
    [
      "5-LS2-1",
      "the movement of matter among plants, animals, decomposers and the environment",
    ],
    [
      [
        "Mushrooms on a fallen oak in a Rhode Island forest are…",
        "decomposers",
        ["producers", "predators"],
        "They break down dead things.",
      ],
      [
        "Eelgrass in Narragansett Bay makes its own food from sunlight. It is a…",
        "producer",
        ["consumer", "decomposer"],
        "Plants are producers.",
      ],
      [
        "A rabbit that eats clover in a field is a…",
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
