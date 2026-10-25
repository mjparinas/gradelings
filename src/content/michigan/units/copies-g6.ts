import type { Unit } from "../../types";
import { SCIENCE_6 as WASHINGTON_SCIENCE_6 } from "../../washington/units/science-68";
import { UNITS as NEW_YORK_SOCIAL_5 } from "../../new-york/units/social-g5";
import { G6 as WASHINGTON_SOCIAL_6 } from "../../washington/units/social-59-g6";
import { from, localCopy } from "./kit";

// Michigan copies of Grade 6 units that fit Michigan except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_6, "wa-g6-design"),
    "mi-g6-design",
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
        "Engineers building a bridge over the Straits of Mackinac test models to…",
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
        "A design for snowy Upper Peninsula winters must handle…",
        "cold, ice and heavy snow",
        ["only desert heat", "no weather at all"],
        "Conditions are part of the constraints.",
        true,
      ],
    ],
  ),
];

export const SOCIAL_COPIES: Unit[] = [
  localCopy(from(NEW_YORK_SOCIAL_5, "ny-g5-hemisphere-geography"), "mi-g6-landforms-climates", [
    "6-G2.1.1; 6-G2.1.3; 6-G3.2.1",
    "patterns of landforms, climates and ecosystems, and how they affect people",
  ]),
  localCopy(
    from(WASHINGTON_SOCIAL_6, "wa-g6-world-regions"),
    "mi-g6-world-regions",
    [
      "6-G2.2.1; 6-G4.3.3",
      "the major regions of the Earth, their physical features and their countries",
    ],
  ),
];
