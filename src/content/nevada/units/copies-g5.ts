import type { Unit } from "../../types";
import { SOCIAL_5 as CALIFORNIA_SOCIAL_5 } from "../../california/units/social-g5";
import { SCIENCE_5 as WASHINGTON_SCIENCE_5 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// Nevada copies of Grade 5 units that fit Nevada except for a few questions naming another state's places (or, for
// the explorers unit, about American Indian nations, which Nevada teaches in its own Eastern Woodland and Grade 4 units).

export const SOCIAL_COPIES: Unit[] = [
  localCopy(
    from(CALIFORNIA_SOCIAL_5, "ca-g5-explorers"),
    "nv-g5-explorers",
    ["SS.5.31; SS.5.14", "how physical geography and resources shaped exploration, and how explorers changed the peoples they met"],
    [
      ["Portuguese sailors used a small, fast ship with triangular sails that could sail into the wind, called a…", "caravel", ["canoe", "steamboat", "submarine"], "Columbus sailed with caravels."],
      ["The astrolabe helped sailors find their…", "latitude by measuring the sun or stars", ["weight", "speed in a storm", "favorite star"], "It measures angles above the horizon."],
      ["Prince Henry the Navigator of Portugal supported…", "voyages and a school for sailors", ["the Pilgrims", "the fur trade", "the Erie Canal"], "Portugal led early sea exploration."],
      ["Explorers looked for a Northwest Passage, a water route through North America to…", "the Pacific Ocean and Asia", ["the North Pole", "Antarctica", "the Great Basin"], "No easy route was found."],
      ["Spanish explorers in the Americas were looking above all for…", "gold, land and new routes", ["snow", "ice for their ships", "dinosaur fossils"], "Spain claimed much of the land west of the Mississippi."],
      ["Fur trappers like Peter Skene Ogden came to the Great Basin in the 1820s looking for…", "beaver furs", ["oil", "coffee", "tea"], "Beaver hats were popular in Europe and the East."],
      ["In 1829, a young scout named Rafael Rivera became one of the first outsiders to see a valley with springs that later grew into…", "Las Vegas", ["Reno", "Carson City", "Elko"], "Las Vegas means the meadows in Spanish.", true],
      ["John C. Frémont explored the West in the 1840s and gave the Great Basin its name because…", "its rivers don't flow to the sea", ["it is shaped like a bowl of soup", "it is the biggest ocean", "it is full of glaciers"], "Water there drains into lakes and sinks.", true],
      ["Kit Carson guided Frémont's expedition. Nevada's capital, Carson City, is named for…", "Kit Carson", ["Rafael Rivera", "Christopher Columbus", "Prince Henry"], "The Carson River carries his name too.", true],
    ],
    {
      parentNote: "The aims, sponsors, routes and obstacles of European explorers, new ships and navigation tools, the land claims of Spain, France, England and the Dutch, and the trappers, scouts and explorers who later crossed the Great Basin.",
    },
  ),
];

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_5, "wa-g5-ecosystems"),
    "nv-g5-ecosystems",
    [
      "5-LS2-1",
      "the movement of matter among plants, animals, decomposers and the environment",
    ],
    [
      [
        "Mushrooms on a fallen pine in a Nevada mountain forest are…",
        "decomposers",
        ["producers", "predators"],
        "They break down dead things.",
      ],
      [
        "A sagebrush plant makes its own food from sunlight. It is a…",
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
