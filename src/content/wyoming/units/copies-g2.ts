import type { Unit } from "../../types";
import { SCIENCE_2 as WASHINGTON_SCIENCE_2 } from "../../washington/units/science-k2";
import { from, localCopy } from "./kit";

// Wyoming copies of Grade 2 units that fit Wyoming except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_2, "wa-g2-earth-changes"),
    "wy-g2-earth-changes",
    ["2-ESS2-1", "comparing ways to slow or stop wind and water from changing the shape of the land"],
    [
      [
        "The Wind River slowly cutting a deep canyon through rock is a… change.",
        "slow",
        ["fast", "sudden"],
        "It takes a very long time.",
      ],
      [
        "A spring flood after mountain snow melts fast is a… change.",
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
        "Wyoming's strong winds can blow dry soil off a bare field. Which helps most?",
        "keeping plants growing on the field",
        ["plowing it every day", "taking all the plants away"],
        "Plants cover and hold the soil.",
      ],
      [
        "Which helps keep wind from blowing farm soil away?",
        "rows of trees beside the field",
        ["removing all plants", "plowing every day"],
        "Windbreaks slow the wind.",
        true,
      ],
      [
        "Huge sheets of ice slowly carved the valleys of the Teton Range long ago. That was a… change.",
        "very slow",
        ["sudden", "one-day"],
        "Glaciers move far too slowly to see.",
        true,
      ],
    ],
  ),
];
