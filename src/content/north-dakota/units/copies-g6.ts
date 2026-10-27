import type { Unit } from "../../types";
import { SCIENCE_6 as WASHINGTON_SCIENCE_6 } from "../../washington/units/science-68";
import { from, localCopy } from "./kit";

// North Dakota copies of Grade 6 units that fit North Dakota except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_6, "wa-g6-design"),
    "nd-g6-design",
    [
      "MS-ET1-1; MS-ET1-2; MS-ET1-3; MS-ET1-4",
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
        "Engineers building a new bridge over the Missouri River test models to…",
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
        "A design for a house on the North Dakota prairie must handle…",
        "strong winds and very cold winters",
        ["only desert heat", "no weather at all"],
        "Conditions are part of the constraints.",
        true,
      ],
    ],
  ),
];
