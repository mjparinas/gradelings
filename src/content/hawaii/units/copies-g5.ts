import type { Unit } from "../../types";
import { SOCIAL_5 as CALIFORNIA_SOCIAL_5 } from "../../california/units/social-g5";
import { SCIENCE_5 as WASHINGTON_SCIENCE_5 } from "../../washington/units/science-35";
import { from, localCopy } from "./kit";

// Hawaiʻi copies of Grade 5 units that fit Hawaiʻi except for a few questions naming another state's places (or, for
// the explorers unit, about American Indian nations, which Hawaiʻi teaches in its own Grade 5 unit).

export const SOCIAL_COPIES: Unit[] = [
  localCopy(
    from(CALIFORNIA_SOCIAL_5, "ca-g5-explorers"),
    "hi-g5-explorers",
    ["SS.5.2.19.1; SS.5.2.19.2", "the motives of European powers in exploring the Americas, and the impact of European arrival on Native Americans"],
    [
      ["Portuguese sailors used a small, fast ship with triangular sails that could sail into the wind, called a…", "caravel", ["canoe", "steamboat", "submarine"], "Columbus sailed with caravels."],
      ["The astrolabe helped sailors find their…", "latitude by measuring the sun or stars", ["weight", "speed in a storm", "favorite star"], "It measures angles above the horizon."],
      ["Prince Henry the Navigator of Portugal supported…", "voyages and a school for sailors", ["the Pilgrims", "the fur trade", "the Erie Canal"], "Portugal led early sea exploration."],
      ["Explorers looked for a Northwest Passage, a water route through North America to…", "the Pacific Ocean and Asia", ["the North Pole", "Antarctica", "the Gulf of Mexico"], "No easy route was found."],
      ["Spanish explorers in the Americas were looking above all for…", "gold, land and new routes", ["snow", "ice for their ships", "dinosaur fossils"], "Spain claimed huge parts of the Americas."],
      ["Juan Ponce de León sailed from Puerto Rico in 1513 and claimed a land he named for its…", "flowers", ["gold mines", "snow", "camels"], "He named it in spring, at Easter time."],
      ["European explorers measured success by gold and land, while the peoples already living in the Americas often saw the newcomers as…", "visitors who could become trading partners or a threat", ["monsters", "relatives", "no one important"], "Each side saw the meeting differently.", true],
      ["Diseases such as smallpox, carried by Europeans, harmed Native Americans because…", "they had no immunity to them", ["they caught them from animals only", "the diseases were mild", "medicine was free"], "Many communities lost a large share of their people.", true],
      ["In 1778, the British explorer James Cook became the first known European to reach…", "Hawaiʻi", ["Asia", "Africa", "the North Pole"], "He was looking for the Northwest Passage.", true],
    ],
    {
      parentNote: "The aims, sponsors, routes and obstacles of European explorers, new ships and navigation tools, the land claims of Spain, France, England and the Dutch, how the peoples of the Americas saw the newcomers, the diseases explorers carried, and James Cook's arrival in Hawaiʻi in 1778.",
    },
  ),
];

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_5, "wa-g5-ecosystems"),
    "hi-g5-ecosystems",
    [
      "5-LS2-1",
      "the movement of matter among plants, animals, decomposers and the environment",
    ],
    [
      [
        "Mushrooms on a fallen koa log in a Hawaiʻi forest are…",
        "decomposers",
        ["producers", "predators"],
        "They break down dead things.",
      ],
      [
        "A kalo plant makes its own food from sunlight. It is a…",
        "producer",
        ["consumer", "decomposer"],
        "Plants are producers.",
      ],
      [
        "A nēnē that eats grasses and berries is a…",
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
