import type { Unit } from "../../types";
import { SCIENCE_6 as WASHINGTON_SCIENCE_6 } from "../../washington/units/science-68";
import { from, localCopy } from "./kit";

// Nebraska copies of Grade 6 units that fit Nebraska except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_6, "wa-g6-design"),
    "neb-g6-design",
    [
      "SC.6.4.1.b",
      "defining the criteria and constraints of a design problem precisely, and testing and improving solutions",
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
        "Engineers designing a new wind turbine for the Nebraska plains tested models to…",
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
        "A storm shelter design for Nebraska must handle…",
        "winds of a strong tornado",
        ["only gentle breezes", "no weather at all"],
        "Conditions are part of the constraints.",
        true,
      ],
    ],
  ),
];
