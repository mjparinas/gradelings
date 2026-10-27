import type { Unit } from "../../types";
import { SCIENCE_6 as WASHINGTON_SCIENCE_6 } from "../../washington/units/science-68";
import { from, localCopy } from "./kit";

// West Virginia copies of Grade 6 units that fit West Virginia except for a few questions naming another state's places.

export const SCIENCE_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SCIENCE_6, "wa-g6-design"),
    "wv-g6-design",
    ["S.6.20; S.6.21", "defining design problems precisely, and analyzing test data to find the best parts of several designs"],
    [
      ["A limit on a design, like cost or size, is a…", "constraint", ["criterion", "prototype"], "Constraints limit what you can do."],
      ["What a design must do to succeed is its…", "criteria", ["constraints", "materials"], "Criteria say what success looks like."],
      ["A first model you build to test an idea is a…", "prototype", ["criterion", "conclusion"], "Prototypes are tested and improved."],
      ["Engineers planning a bridge across a deep gorge like the New River Gorge test models to…", "find weak points before building", ["make it cost more", "skip the design"], "Testing shows what to improve."],
      ["Why compare two designs with the same test?", "to see fairly which works better", ["to make both fail", "to save no data"], "Change one thing at a time.", true],
      ["A road design for West Virginia's steep mountains must handle…", "sharp curves, steep grades, ice and snow", ["only desert heat", "no weather at all"], "Conditions are part of the constraints.", true],
    ],
  ),
];
