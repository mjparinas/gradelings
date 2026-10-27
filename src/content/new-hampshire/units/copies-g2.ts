import type { Unit } from "../../types";
import { SCIENCE_2 as WASHINGTON_SCIENCE_2 } from "../../washington/units/science-k2";
import { from, localCopy } from "./kit";

// New Hampshire copies of Grade 2 units that fit New Hampshire except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_2, "wa-g2-earth-changes"),
    "nh-g2-earth-changes",
    [
      "2-ESS1-1; 2-ESS2-1",
      "Earth events happen quickly or slowly, and ways to stop wind and water from changing land",
    ],
    [
      [
        "A river slowly wearing a deep gorge into rock, like the Flume in Franconia Notch, is a… change.",
        "slow",
        ["fast", "sudden"],
        "It takes a very long time.",
      ],
      [
        "A spring flood after snow melts fast is a… change.",
        "fast",
        ["slow", "very slow"],
        "It happens in hours or days.",
      ],
      [
        "Planting grass on a hill helps stop…",
        "soil washing away",
        ["the wind from blowing", "rain from falling"],
        "Roots hold soil in place.",
      ],
      [
        "A rockslide on a steep mountainside changes the land…",
        "quickly",
        ["over millions of years", "never"],
        "Rocks can slide down in seconds.",
      ],
      [
        "Which helps keep wind from blowing farm soil away?",
        "rows of trees beside the field",
        ["removing all plants", "plowing every day"],
        "Windbreaks slow the wind.",
        true,
      ],
      [
        "Huge sheets of ice slowly carved New Hampshire's mountain notches long ago. That was a… change.",
        "very slow",
        ["sudden", "one-day"],
        "Glaciers move far too slowly to see.",
        true,
      ],
    ],
  ),
];
