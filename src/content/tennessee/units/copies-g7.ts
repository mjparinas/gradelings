import type { Unit } from "../../types";
import { SCIENCE_6 as OREGON_UNITS_SCIENCE_68_SCIENCE_6 } from "../../oregon/units/science-68";
import { from, localCopy } from "./kit";

// Tennessee copies of Grade 7 units that fit Tennessee except for a few questions naming another state's places, with
// Tennessee examples added.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(OREGON_UNITS_SCIENCE_68_SCIENCE_6, "or-g6-growth"), "tn-g7-growth", ["7.LS1.4; 7.LS1.6", "behaviours and structures that help organisms reproduce, what affects growth, and asexual versus sexual reproduction"], [
      ["Bees carrying pollen between Tennessee iris flowers help the plants…", "reproduce", ["stop growing", "make sunlight"], "Pollination makes seeds."],
      ["A tulip poplar seed carried by the wind is spreading by…", "wind dispersal", ["animal teeth", "water only"], "Its seeds have wings."],
      ["Calves of the same breed grow to different sizes partly because of…", "food and environment", ["the color of the barn", "the time of day"], "Genes and environment both matter."],
      ["A strawberry plant sending out runners makes new plants that are…", "genetically the same as the parent", ["a different species", "always taller"], "This is asexual reproduction."],
    ], { parentNote: "Practises how animal behaviors and plant structures help living things reproduce, how genes and the environment both affect growth, and why asexual reproduction makes offspring with the same genes as the parent." }),
];
