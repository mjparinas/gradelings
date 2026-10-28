import type { Unit } from "../../types";
import { SOCIAL_5 as CALIFORNIA_SOCIAL_5 } from "../../california/units/social-g5";
import { SCIENCE_5 as WASHINGTON_SCIENCE_5 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// Wyoming copies of Grade 5 units that fit Wyoming except for a few questions naming another state's places
// (or, for the explorers unit, about American Indian nations, which Wyoming teaches in its own Grade 4 and Grade 5
// units).

export const SOCIAL_COPIES: Unit[] = [
  localCopy(
    from(CALIFORNIA_SOCIAL_5, "ca-g5-explorers"),
    "wy-g5-explorers",
    ["SS5.4.2; SS5.5.1", "how tools and technology such as new ships and navigation tools changed history, and using maps to follow explorers' routes"],
    [
      ["Portuguese sailors used a small, fast ship with triangular sails that could sail into the wind, called a…", "caravel", ["canoe", "steamboat", "submarine"], "Columbus sailed with caravels."],
      ["The astrolabe helped sailors find their…", "latitude by measuring the sun or stars", ["weight", "speed in a storm", "favorite star"], "It measures angles above the horizon."],
      ["Prince Henry the Navigator of Portugal supported…", "voyages and a school for sailors", ["the Pilgrims", "the fur trade", "the railroad"], "Portugal led early sea exploration."],
      ["Explorers looked for a Northwest Passage, a water route through North America to…", "the Pacific Ocean and Asia", ["the North Pole", "Antarctica", "the Amazon"], "No easy route was found."],
      ["Spanish explorers in the Americas were looking above all for…", "gold, land and new routes", ["snow", "ice for their ships", "dinosaur fossils"], "Spain claimed much of the land west of the Mississippi."],
      ["John Colter, who had traveled with Lewis and Clark, was one of the first explorers of European descent to see the area that became…", "Yellowstone", ["Cheyenne", "Casper", "the Black Hills"], "He explored it in 1807 and 1808."],
      ["In 1812, Robert Stuart and his party crossed the Rockies at a low, wide pass in Wyoming later called…", "South Pass", ["North Gate", "Teton Pass", "Bighorn Gap"], "Wagons would later use it."],
      ["In 1842, John C. Frémont mapped the trail route across Wyoming so that…", "wagon trains could follow it west", ["ships could sail it", "trains could fly", "it could be kept secret"], "Kit Carson was his guide.", true],
      ["Mountain men like Jedediah Smith learned the way through the Rockies with help from…", "Native guides and traders", ["satellites", "the railroad", "road signs"], "Native nations knew the land well.", true],
    ],
    {
      parentNote: "The aims, sponsors, routes and obstacles of European explorers, new ships and navigation tools, the land claims of Spain, France, England and the Dutch, and explorers of the West who crossed Wyoming, from John Colter and Robert Stuart to John C. Frémont.",
    },
  ),
];

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_5, "wa-g5-ecosystems"),
    "wy-g5-ecosystems",
    ["5-LS2-1", "the movement of matter among plants, animals, decomposers and the environment"],
    [
      ["Mushrooms on a fallen lodgepole pine in a Wyoming forest are…", "decomposers", ["producers", "predators"], "They break down dead things."],
      ["Sagebrush makes its own food from sunlight. It is a…", "producer", ["consumer", "decomposer"], "Plants are producers."],
      ["A pronghorn that eats sagebrush and grass is a…", "consumer", ["producer", "decomposer"], "Consumers eat other living things."],
      ["Decomposers return… to the soil.", "nutrients", ["plastic", "sunlight"], "Plants use the nutrients again."],
      ["Plants get most of the material they need to grow from…", "air and water", ["soil only", "sunlight only"], "They take in carbon dioxide from the air.", true],
      ["If all the decomposers in a forest disappeared, dead leaves would…", "pile up", ["vanish anyway", "turn into rocks"], "Decomposers recycle matter.", true],
    ],
    {
      parentNote:
        "Practices how matter moves among plants, animals, decomposers and the environment, from food chains to decomposers that return nutrients to the soil.",
    },
  ),
];
