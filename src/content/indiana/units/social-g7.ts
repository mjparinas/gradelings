import type { Unit } from "../../types";
import { units as ALBERTA_SOCIAL_8 } from "../../alberta/g8-social";
import { from, localCopy } from "./kit";

// Indiana's copy of Alberta's Japan unit, without its one question that names Mount Rainier as a wrong answer
// (7.H.9, 7.G.4).

export const SOCIAL_7: Unit[] = [
  localCopy(from(ALBERTA_SOCIAL_8, "japan-land-values-ab"), "in-g7-japan", [
    "7.H.9; 7.G.4",
    "Japan's islands and mountains and the ideas that shaped its culture",
  ]),
];
