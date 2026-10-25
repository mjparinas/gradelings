import type { Unit } from "../../types";
import { SCIENCE_6 as OREGON_SCIENCE_6 } from "../../oregon/units/science-68";
import { SCIENCE_8 as WASHINGTON_SCIENCE_8 } from "../../washington/units/science-68";
import { from, localCopy } from "./kit";

// Oklahoma copies of middle school units that fit Oklahoma's Grade 8 except for a few questions naming another state's
// places, with Oklahoma examples added.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_SCIENCE_8, "wa-g8-space"), "ok-g8-space", ["8.ESS1.1; 8.ESS1.2; 8.ESS1.3", "models of the Earth-sun-moon system, gravity in the solar system and galaxies, and the scale of solar system objects"], [
    ["In June, Oklahoma has long days because…", "the Northern Hemisphere is tilted toward the sun", ["Earth is closest to the sun", "the moon blocks the night"], "Tilt causes seasons."],
    ["In December, the noon sun in Oklahoma is…", "lower in the sky than in June", ["directly overhead", "never visible"], "Winter sunlight comes at a low angle."],
    ["During a total solar eclipse, like the one seen in southeastern Oklahoma in 2024, the moon…", "passes between Earth and the sun", ["moves behind Earth", "turns dark by itself"], "The moon's shadow falls on Earth."],
    ["A full moon over Oklahoma happens when the moon is…", "on the opposite side of Earth from the sun", ["between Earth and the sun", "inside Earth's shadow every time"], "We see its whole lit side."],
  ]),
  localCopy(from(OREGON_SCIENCE_6, "or-g6-growth"), "ok-g8-growth", ["8.LS1.4; 8.LS1.5; 8.LS3.2", "how animal behaviors and plant structures help reproduction, how genes and environment affect growth, and asexual reproduction"], [
    ["Bees visiting pecan and peach blossoms in Oklahoma help the trees by…", "carrying pollen between flowers", ["eating all the leaves", "watering the roots"], "Pollination leads to fruit and nuts."],
    ["Wheat in a dry year in western Oklahoma grows shorter mainly because of…", "the environment", ["its genes alone", "the color of the soil"], "Water affects growth."],
    ["Prairie chickens in Oklahoma dance and call in spring to…", "attract mates", ["scare off rain", "find water"], "Behaviors help reproduction."],
    ["A strawberry plant that sends out runners makes new plants with…", "the same genes as the parent", ["genes from two parents", "no genes"], "This is asexual reproduction."],
  ], { parentNote: "Practises how animal behaviors and plant structures help living things reproduce, how genes and the environment both affect growth, and why asexual reproduction makes offspring with the same genes as the parent, with Oklahoma examples like wheat in dry years and prairie chickens." }),
];
