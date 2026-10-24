import type { Unit } from "../../types";
import { SCIENCE_6 as WASHINGTON_SCIENCE_6 } from "../../washington/units/science-68";
import { G6 as WASHINGTON_SOCIAL_6 } from "../../washington/units/social-59-g6";
import { UNITS as NEW_YORK_SOCIAL_5 } from "../../new-york/units/social-g5";
import { from, localCopy } from "./kit";

// Colorado copies of Grade 6 units that fit Colorado except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_6, "wa-g6-design"),
    "co-g6-design",
    [
      "PS1.MS.3.a; ESS3.MS.10.a; LS2.MS.7.b",
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
        "Engineers building a bridge over the Colorado River test models to…",
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
        "A design for snowy Colorado mountain winters must handle…",
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
    "co-g6-world-regions",
    [
      "6.G.1.a; 6.G.2.d",
      "the major regions of the Earth, their physical features and their countries",
    ],
  ),
  localCopy(from(NEW_YORK_SOCIAL_5, "ny-g5-hemisphere-geography"), "co-g6-americas-geography", [
    "6.G.1.a; 6.G.2.b",
    "the mountains, rivers, climates and resources of the Western Hemisphere and how they affect people",
  ]),
  localCopy(from(NEW_YORK_SOCIAL_5, "ny-g5-early-civilizations"), "co-g6-early-americas", [
    "6.H.2.c; 6.H.2.d",
    "the early civilizations of the Americas and their developments",
  ]),
];
