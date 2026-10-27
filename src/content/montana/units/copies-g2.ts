import type { Unit } from "../../types";
import { SCIENCE_2 as WASHINGTON_SCIENCE_2 } from "../../washington/units/science-k2";
import { SOCIAL_2 as CALIFORNIA_SOCIAL_2 } from "../../california/units/social-g2";
import { from, localCopy } from "./kit";

// Montana copies of Grade 2 units that fit Montana except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_2, "wa-g2-earth-changes"),
    "mt-g2-earth-changes",
    [
      "2-ESS1-1; 2-ESS2-1",
      "Earth events happen quickly or slowly, and ways to stop wind and water from changing land",
    ],
    [
      [
        "The Missouri River slowly widening its valley is a… change.",
        "slow",
        ["fast", "sudden"],
        "It takes thousands of years.",
      ],
      [
        "A windstorm knocking down trees is a… change.",
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
        "A spring flood on the Yellowstone River changes the land…",
        "quickly",
        ["over millions of years", "never"],
        "Floods can move a lot of soil in days.",
      ],
      [
        "Which helps keep a riverbank from washing away?",
        "willows and grasses along the bank",
        ["removing all plants", "digging up the soil"],
        "Plant roots hold soil in place.",
        true,
      ],
      [
        "Glaciers carved the valleys of Glacier National Park. That was a… change.",
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
    "mt-g2-reading-maps",
    [
      "SS.G.2.1",
      "using maps, a compass rose and a map key to find local and distant places",
    ],
  ),
];
