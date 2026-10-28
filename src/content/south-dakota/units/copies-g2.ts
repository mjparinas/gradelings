import type { Unit } from "../../types";
import { SCIENCE_2 as WASHINGTON_SCIENCE_2 } from "../../washington/units/science-k2";
import { from, localCopy } from "./kit";

// South Dakota copies of Grade 2 units that fit South Dakota except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_2, "wa-g2-earth-changes"),
    "sd-g2-earth-changes",
    [
      "2-ESS1-1; 2-ESS2-1",
      "Earth events happen quickly or slowly, and ways to stop wind and water from changing land",
    ],
    [
      ["Rain and wind slowly wearing away the hills of the Badlands is a… change.", "slow", ["fast", "sudden"], "It takes a very long time."],
      ["A flood washing away part of a riverbank in one night is a… change.", "fast", ["slow", "very slow"], "It happens in hours."],
      ["Planting grass on a hill helps stop…", "soil washing away", ["the wind from blowing", "rain from falling"], "Roots hold soil in place."],
      ["Rows of trees planted beside a farm field help keep…", "the wind from blowing the soil away", ["the sun from shining", "the rain from falling"], "Trees slow the wind."],
      ["Which helps keep a river from washing its bank away?", "big rocks placed along the bank", ["removing all plants", "digging up the bank"], "Rocks take the force of the water.", true],
      ["Glaciers slowly scraped and shaped eastern South Dakota over thousands of years. That was a… change.", "very slow", ["sudden", "one-day"], "Glaciers move far too slowly to see.", true],
    ],
  ),
];
