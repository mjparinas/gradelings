import type { Unit } from "../../types";
import { SOCIAL_5 as CALIFORNIA_SOCIAL_5 } from "../../california/units/social-g5";
import { SCIENCE_5 as WASHINGTON_SCIENCE_5 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// Michigan copies of Grade 5 units that fit Michigan except for a few questions naming another state's places (or, for
// the explorers unit, about American Indian nations, which Michigan teaches in its own Eastern Woodland unit).

export const SOCIAL_COPIES: Unit[] = [
  localCopy(
    from(CALIFORNIA_SOCIAL_5, "ca-g5-explorers"),
    "mi-g5-explorers",
    ["5-U1.2.1; 5-U1.2.2", "the developments that made sea exploration possible, and the goals, obstacles and results of explorers"],
    [
      ["Étienne Brûlé, who may have been the first European to reach Michigan, around 1620, was an explorer from…", "France", ["Spain", "England", "Portugal"], "He came from the French colony on the St. Lawrence River."],
      ["Father Jacques Marquette, a French missionary and explorer, founded a mission at Sault Ste. Marie in…", "1668", ["1492", "1776", "1837"], "It is Michigan's oldest European settlement."],
      ["Portuguese sailors used a small, fast ship with triangular sails that could sail into the wind, called a…", "caravel", ["canoe", "steamboat", "submarine"], "Columbus sailed with caravels."],
      ["The astrolabe helped sailors find their…", "latitude by measuring the sun or stars", ["weight", "speed in a storm", "favorite star"], "It measures angles above the horizon."],
      ["Prince Henry the Navigator of Portugal supported…", "voyages and a school for sailors", ["the Pilgrims", "the fur trade in Michigan", "the Erie Canal"], "Portugal led early sea exploration."],
      ["Explorers looked for a Northwest Passage, a water route through North America to…", "the Pacific Ocean and Asia", ["the North Pole", "Antarctica", "Lake Superior only"], "No easy route was found."],
      ["In 1679 La Salle sailed the Griffon, the first sailing ship on the upper Great Lakes, which was lost on its way back from…", "Green Bay", ["Detroit", "Lisbon", "Havana"], "It disappeared with a load of furs."],
      ["Antoine de la Mothe Cadillac founded a French fort and village in 1701 that became…", "Detroit", ["Lansing", "Chicago", "Montréal"], "It was called Fort Pontchartrain du Détroit."],
      ["French explorers came to the Great Lakes looking for furs and a water route to…", "Asia", ["Antarctica", "Australia", "the Moon"], "They hoped for a shortcut to the riches of the East."],
    ],
    {
      parentNote: "The aims, sponsors, routes and obstacles of European explorers, new ships and navigation tools, the land claims of Spain, France, England and the Dutch, and French explorers on the Great Lakes.",
    },
  ),
];

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_5, "wa-g5-ecosystems"),
    "mi-g5-ecosystems",
    [
      "5-LS2-1",
      "the movement of matter among plants, animals, decomposers and the environment",
    ],
    [
      [
        "Mushrooms on a fallen oak in a Michigan woodland are…",
        "decomposers",
        ["producers", "predators"],
        "They break down dead things.",
      ],
      [
        "A maple tree makes its own food from sunlight. It is a…",
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
