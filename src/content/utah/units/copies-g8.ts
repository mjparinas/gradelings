import type { Unit } from "../../types";
import { SCIENCE_7 } from "../../washington/units/science-68";
import { from, localCopy } from "./kit";

// Utah copies of science units that fit Utah's Grade 8 except for a few questions naming another state's places, with
// Utah examples added. Utah teaches Earth's resources (from Grade 7) in Grade 8.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(SCIENCE_7, "wa-g7-resources"), "ut-g8-resources", ["8.4.1; 8.4.5", "why Earth's resources are unevenly spread, and designing ways to reduce human impact on the environment"], [
    ["Copper is mined at Bingham Canyon in Utah because…", "past geologic processes concentrated it there", ["copper falls as rain there", "people put it there"], "Minerals collect in only some places."],
    ["Scientists place sensors along the Wasatch Fault so they can…", "study earthquake risk", ["stop all earthquakes", "make it rain"], "Data helps forecast hazards."],
    ["A design that reduces air pollution during Utah's winter inversions could be…", "driving less and using cleaner transit", ["burning more wood", "leaving cars running longer"], "Less burning means less smog."],
    ["The Great Salt Lake is a source of salt and other minerals because…", "it has no outlet, so minerals build up as water evaporates", ["the ocean flows into it", "the snow that feeds it is salty"], "Evaporating water leaves minerals behind.", true],
    ["Groundwater under Utah's deserts is a resource that…", "can run low if it is used faster than it refills", ["never runs out", "is made by people"], "It refills very slowly.", true],
  ]),
];
