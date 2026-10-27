import type { Unit } from "../../types";
import { SCIENCE_2 as WASHINGTON_SCIENCE_2 } from "../../washington/units/science-k2";
import { from, localCopy } from "./kit";

// Delaware copies of Grade 2 units that fit Delaware except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_2, "wa-g2-earth-changes"),
    "de-g2-earth-changes",
    [
      "2-ESS1-1; 2-ESS2-1",
      "Earth events happen quickly or slowly, and ways to stop wind and water from changing land",
    ],
    [
      [
        "A creek slowly wearing a deep valley into rock, like the Brandywine in northern Delaware, is a… change.",
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
        "Wind slowly piled sand into the tall dunes at Cape Henlopen over many years. That was a… change.",
        "very slow",
        ["sudden", "one-day"],
        "Dunes grow far too slowly to see.",
        true,
      ],
    ],
  ),
];
