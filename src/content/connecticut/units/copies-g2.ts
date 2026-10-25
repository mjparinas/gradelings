import type { Unit } from "../../types";
import { SCIENCE_2 as WASHINGTON_SCIENCE_2 } from "../../washington/units/science-k2";
import { SOCIAL_2 as CALIFORNIA_SOCIAL_2 } from "../../california/units/social-g2";
import { from, localCopy } from "./kit";

// Connecticut copies of Grade 2 units that fit Connecticut except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_2, "wa-g2-earth-changes"),
    "ct-g2-earth-changes",
    [
      "2-ESS1-1; 2-ESS2-1",
      "Earth events happen quickly or slowly, and ways to stop wind and water from changing land",
    ],
    [
      [
        "The Connecticut River slowly widening its valley is a… change.",
        "slow",
        ["fast", "sudden"],
        "It takes thousands of years.",
      ],
      [
        "A hurricane knocking down trees is a… change.",
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
        "A flood on the Connecticut River changes the land…",
        "quickly",
        ["over millions of years", "never"],
        "Floods can move a lot of soil in days.",
      ],
      [
        "Which helps keep waves from washing away a beach on Long Island Sound?",
        "beach grass and dunes",
        ["removing all plants", "digging up the sand"],
        "Plant roots hold sand in place.",
        true,
      ],
      [
        "Glaciers left big boulders all over Connecticut. That was a… change.",
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
    "ct-g2-reading-maps",
    [
      "2.Geo.1.a; 2.Geo.3.a",
      "using maps, a compass rose and a map key to find local and distant places",
    ],
  ),
];
