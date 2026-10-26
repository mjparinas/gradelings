import type { Unit } from "../../types";
import { SCIENCE_2 as WASHINGTON_SCIENCE_2 } from "../../washington/units/science-k2";
import { from, localCopy } from "./kit";

// Nebraska copies of Grade 2 units that fit Nebraska except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_2, "wa-g2-earth-changes"),
    "neb-g2-earth-changes",
    [
      "SC.2.13.3.a; SC.2.13.3.b",
      "Earth events happen quickly or slowly, and ways to stop wind and water from changing land",
    ],
    [
      [
        "Wind and rain slowly wearing down Chimney Rock is a… change.",
        "slow",
        ["fast", "sudden"],
        "It takes a very long time.",
      ],
      [
        "A tornado knocking down a barn is a… change.",
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
        "A flood on the Platte River changes the land…",
        "quickly",
        ["over millions of years", "never"],
        "Floods can move a lot of soil in days.",
      ],
      [
        "Which helps keep wind from blowing farm soil away?",
        "rows of trees beside the field",
        ["removing all plants", "plowing every day"],
        "Windbreaks slow the wind. Many Nebraska farms have them.",
        true,
      ],
      [
        "A river carving a deep valley over thousands of years is a… change.",
        "very slow",
        ["sudden", "one-day"],
        "Valleys form far too slowly to see.",
        true,
      ],
    ],
  ),
];
