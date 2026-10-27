import type { Unit } from "../../types";
import { SCIENCE_2 as WASHINGTON_SCIENCE_2 } from "../../washington/units/science-k2";
import { SOCIAL_2 as CALIFORNIA_SOCIAL_2 } from "../../california/units/social-g2";
import { from, localCopy } from "./kit";

// West Virginia copies of Grade 2 units that fit West Virginia except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_2, "wa-g2-earth-changes"),
    "wv-g2-earth-changes",
    ["S.2.8; S.2.9", "Earth events happen quickly or slowly, and ways to stop wind and water from changing land"],
    [
      ["The New River slowly cutting its deep gorge is a… change.", "slow", ["fast", "sudden"], "It takes many thousands of years."],
      ["A flash flood washing away part of a road is a… change.", "fast", ["slow", "very slow"], "It happens in hours."],
      ["Planting grass on a hill helps stop…", "soil washing away", ["the wind from blowing", "rain from falling"], "Roots hold soil in place."],
      ["A landslide sliding down a steep hillside after heavy rain changes the land…", "quickly", ["over millions of years", "never"], "Landslides can happen in minutes."],
      ["Which helps keep a steep hillside from sliding after the trees are cut?", "planting new trees and grass", ["removing all plants", "digging away the bottom of the hill"], "Plant roots hold soil in place.", true],
      ["Rivers wearing down the old Appalachian Mountains over millions of years is a… change.", "very slow", ["sudden", "one-day"], "The mountains were once much taller.", true],
    ],
  ),
];

export const SOCIAL_COPIES: Unit[] = [
  localCopy(
    from(CALIFORNIA_SOCIAL_2, "ca-g2-reading-maps"),
    "wv-g2-reading-maps",
    ["SS.2.9; SS.2.13", "using maps, a compass rose and a map key to find places, and what maps, globes and other geographic tools are for"],
  ),
];
