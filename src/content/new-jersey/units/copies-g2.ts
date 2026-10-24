import type { Unit } from "../../types";
import { SCIENCE_2 as WASHINGTON_SCIENCE_2 } from "../../washington/units/science-k2";
import { SOCIAL_2 as CALIFORNIA_SOCIAL_2 } from "../../california/units/social-g2";
import { from, localCopy } from "./kit";

// New Jersey copies of Grade 2 units that fit New Jersey except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_2, "wa-g2-earth-changes"),
    "nj-g2-earth-changes",
    [
      "2-ESS1-1; 2-ESS2-1",
      "Earth events happen quickly or slowly, and ways to stop wind and water from changing land",
    ],
    [
      [
        "The Delaware River slowly cutting the Delaware Water Gap is a… change.",
        "slow",
        ["fast", "sudden"],
        "It takes thousands of years.",
      ],
      [
        "A storm knocking down trees is a… change.",
        "fast",
        ["slow", "very slow"],
        "It happens in minutes.",
      ],
      [
        "Planting grass on a hill helps stop…",
        "soil washing away",
        ["the wind from blowing", "rain from falling"],
        "Roots hold soil in place.",
      ],
      [
        "A flood on the Passaic River changes the land…",
        "quickly",
        ["over millions of years", "never"],
        "Floods can move a lot of soil in days.",
      ],
      [
        "Which helps keep wind from blowing farm soil away?",
        "rows of trees beside the field",
        ["removing all plants", "plowing every day"],
        "Windbreaks slow the wind.",
        true,
      ],
      [
        "Long ago, a glacier covered northern New Jersey. That was a… change.",
        "very slow",
        ["sudden", "one-day"],
        "Glaciers move a few feet a day or less.",
        true,
      ],
    ],
  ),
];

export const SOCIAL_COPIES: Unit[] = [
  localCopy(
    from(CALIFORNIA_SOCIAL_2, "ca-g2-reading-maps"),
    "nj-g2-reading-maps",
    [
      "6.1.2.Geo.SV.1; 6.1.2.Geo.SV.2",
      "using maps, a compass rose and a map key to find local and distant places",
    ],
  ),
];
