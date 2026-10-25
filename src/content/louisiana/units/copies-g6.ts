import type { Unit } from "../../types";
import { SCIENCE_8 as WASHINGTON_UNITS_SCIENCE_68_SCIENCE_8 } from "../../washington/units/science-68";
import { from, localCopy } from "./kit";

// Louisiana copies of units that fit Louisiana's Grade 6 science except for a few questions naming another state's
// places. Louisiana teaches the solar system in 6th grade.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(from(WASHINGTON_UNITS_SCIENCE_68_SCIENCE_8, "wa-g8-space"), "la-g6-space", ["6-MS-ESS1-1; 6-MS-ESS1-2; 6-MS-ESS1-3", "the Earth-sun-moon system, gravity in the solar system and galaxies, and the scale of the solar system"], [
      ["The moon's phases repeat about every…", "29.5 days", ["365 days", "24 hours"], "About one month."],
      ["A solar eclipse happens when the…", "moon passes between the sun and Earth", ["Earth passes between the sun and moon", "sun passes behind Mars"], "The moon blocks the sun."],
      ["What keeps the planets in orbit around the sun?", "gravity", ["magnetism", "air pressure"], "The sun's pull holds them."],
      ["Which is the largest planet in our solar system?", "Jupiter", ["Earth", "Mars"], "It is a gas giant."],
    ]),
];
