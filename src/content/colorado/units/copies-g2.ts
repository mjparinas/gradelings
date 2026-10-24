import type { Unit } from "../../types";
import { SCIENCE_2 as WASHINGTON_SCIENCE_2 } from "../../washington/units/science-k2";
import { SOCIAL_2 as CALIFORNIA_SOCIAL_2 } from "../../california/units/social-g2";
import { from, localCopy } from "./kit";

// Colorado copies of Grade 2 units that fit Colorado except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_2, "wa-g2-earth-changes"),
    "co-g2-earth-changes",
    [
      "ESS3.2.1.a; ESS3.2.2.a",
      "Earth events happen quickly or slowly, and ways to stop wind and water from changing land",
    ],
    [
      ["The Colorado River slowly carving a canyon is a… change.", "slow", ["fast", "sudden"], "It takes thousands of years."],
      ["A rockslide crashing onto a mountain road is a… change.", "fast", ["slow", "very slow"], "It happens in seconds."],
      ["Planting grass on a hill helps stop…", "soil washing away", ["the wind from blowing", "rain from falling"], "Roots hold soil in place."],
      ["A flash flood in a canyon changes the land…", "quickly", ["over millions of years", "never"], "Floods can move a lot of soil in hours."],
      ["Which helps keep wind from blowing farm soil away on the Eastern Plains?", "rows of trees beside the field", ["removing all plants", "plowing every day"], "Windbreaks slow the wind.", true],
      ["Glaciers carved many valleys in the Rocky Mountains. That was a… change.", "very slow", ["sudden", "one-day"], "Glaciers move a few feet a day or less.", true],
    ],
  ),
];

export const SOCIAL_COPIES: Unit[] = [
  localCopy(
    from(CALIFORNIA_SOCIAL_2, "ca-g2-reading-maps"),
    "co-g2-reading-maps",
    [
      "2.G.1.a; 2.G.1.d",
      "using maps, a compass rose and a map key to find local and distant places",
    ],
  ),
];
