import type { Unit } from "../../types";
import { SCIENCE_6 as WASHINGTON_SCIENCE_6 } from "../../washington/units/science-68";
import { G6 as WASHINGTON_SOCIAL_6 } from "../../washington/units/social-59-g6";
import { from, localCopy } from "./kit";

// Illinois copies of Grade 6 units that fit Illinois except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_6, "wa-g6-design"),
    "il-g6-design",
    [
      "MS-ETS1-1; MS-ETS1-2; MS-ETS1-3; MS-ETS1-4",
      "defining design problems, evaluating and testing solutions, and improving designs",
    ],
    [
      [
        "A limit on a design, like cost or size, is a…",
        "constraint",
        ["criterion", "prototype"],
        "Constraints limit what you can do.",
      ],
      [
        "What a design must do to succeed is its…",
        "criteria",
        ["constraints", "materials"],
        "Criteria say what success looks like.",
      ],
      [
        "A first model you build to test an idea is a…",
        "prototype",
        ["criterion", "conclusion"],
        "Prototypes are tested and improved.",
      ],
      [
        "Engineers building a bridge over the Illinois River test models to…",
        "find weak points before building",
        ["make it cost more", "skip the design"],
        "Testing shows what to improve.",
      ],
      [
        "Why compare two designs with the same test?",
        "to see fairly which works better",
        ["to make both fail", "to save no data"],
        "Change one thing at a time.",
        true,
      ],
      [
        "A design for snowy Chicago winters must handle…",
        "cold, ice and heavy snow",
        ["only desert heat", "no weather at all"],
        "Conditions are part of the constraints.",
        true,
      ],
    ],
  ),
];

export const SOCIAL_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SOCIAL_6, "wa-g6-world-regions"),
    "il-g6-world-regions",
    [
      "SS.6-8.G.4.LC",
      "the major regions of the Earth, their physical features and their countries",
    ],
  ),
];
