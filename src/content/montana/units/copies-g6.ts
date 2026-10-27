import type { Unit } from "../../types";
import { G6 as WASHINGTON_SOCIAL_6 } from "../../washington/units/social-59-g6";
import { from, localCopy } from "./kit";

// Montana copies of Grade 6 units that fit Montana except for a few questions naming another state's places.

export const SOCIAL_COPIES: Unit[] = [
  localCopy(
    from(WASHINGTON_SOCIAL_6, "wa-g6-world-regions"),
    "mt-g6-world-regions",
    [
      "SS.G.6-8.1; SS.G.6-8.2",
      "maps of the world's regions, their physical features and countries, and how mountains, seas and rivers shape borders",
    ],
  ),
];
