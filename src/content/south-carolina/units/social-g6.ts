import type { Unit } from "../../types";
import { POOL } from "../pools/social-g6";
import { from, localCopy } from "./kit";

/** South Carolina's own Grade 6 social studies units (`sc-` ids): copies of other states' units without their places. */
export const UNITS: Unit[] = [
  localCopy(from(POOL, "al-g9-cold-war"), "sc-g6-cold-war", ["6.5.P", "the Cold War as a turning point in a connected world"]),
];
