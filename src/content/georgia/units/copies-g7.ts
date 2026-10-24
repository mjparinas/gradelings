import type { Unit } from "../../types";
import { UNITS as ALABAMA_SOCIAL_G9 } from "../../alabama/units/social-g9";
import { COPIES_7 as ARIZONA_COPIES_G7 } from "../../arizona/units/copies-g7";
import { SCIENCE_8 as WASHINGTON_SCIENCE_68 } from "../../washington/units/science-68";
import { from, localCopy } from "./kit";

// Georgia copies of Grade 7 units that fit Georgia except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_SCIENCE_68, "wa-g8-earth-history"), "ga-g7-earth-history", ["S7L5.c", "what the fossil record shows about past life"], [
    ["In rock layers that haven't been disturbed, the oldest fossils are usually…", "at the bottom", ["at the top", "in the middle"], "Newer layers settle on top."],
    ["Fossils of sea animals found high on a mountain show that…", "the land was once under the sea", ["fish could climb mountains", "the fossils fell from the sky"], "Land can rise over time."],
    ["Scientists find the age of some rocks and fossils using…", "radioactive dating", ["a thermometer", "a compass"], "Some elements decay at a steady rate."],
  ]),
];

export const SOCIAL_COPIES: Unit[] = [
  localCopy(from(ALABAMA_SOCIAL_G9, "al-g9-cold-war"), "ga-g7-cold-war", ["SS7H3.d; SS7H3.e", "communism in China and foreign involvement in Korea and Vietnam"]),
  localCopy(from(ARIZONA_COPIES_G7, "az-g7-economies"), "ga-g7-economies", ["SS7E1.a; SS7E1.b; SS7E2.a; SS7E2.b", "economic systems, specialization and trade, and trade barriers"]),
  localCopy(from(ARIZONA_COPIES_G7, "az-g7-population"), "ga-g7-population", ["SS7G3.a; SS7G11.a", "how climate and land shape where people live in Africa and Asia"]),
];
