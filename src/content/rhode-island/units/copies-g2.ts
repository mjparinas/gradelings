import type { Unit } from "../../types";
import { SCIENCE_2 as WASHINGTON_SCIENCE_2 } from "../../washington/units/science-k2";
import { from, localCopy } from "./kit";

// Rhode Island copies of Grade 2 units that fit Rhode Island except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_2, "wa-g2-earth-changes"),
    "ri-g2-earth-changes",
    [
      "2-ESS1-1; 2-ESS2-1",
      "Earth events happen quickly or slowly, and ways to stop wind and water from changing land",
    ],
    [
      ["Waves slowly wearing down the rocky cliffs at Newport is a… change.", "slow", ["fast", "sudden"], "It takes a very long time."],
      ["A hurricane washing away part of a beach in one night is a… change.", "fast", ["slow", "very slow"], "It happens in hours."],
      ["Planting grass on a hill helps stop…", "soil washing away", ["the wind from blowing", "rain from falling"], "Roots hold soil in place."],
      ["Beach grass planted on sand dunes helps keep…", "the sand from blowing away", ["the sun from shining", "the tide from coming in"], "Roots hold the sand in place."],
      ["Which helps keep ocean waves from washing a beach away?", "a wall of rocks along the shore", ["removing all plants", "digging up the dunes"], "Rocks take the force of the waves.", true],
      ["Glaciers slowly scraped and shaped Rhode Island's land over thousands of years. That was a… change.", "very slow", ["sudden", "one-day"], "Glaciers move far too slowly to see.", true],
    ],
  ),
];
