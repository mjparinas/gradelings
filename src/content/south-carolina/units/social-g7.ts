import type { Unit } from "../../types";
import { POOL } from "../pools/social-g7";
import { from, localCopy } from "./kit";

/** South Carolina's own Grade 7 social studies units (`sc-` ids): copies of other frameworks' units without their questions about other states' places. */
export const UNITS: Unit[] = [
  localCopy(from(POOL, "wa-g6-world-regions"), "sc-g7-world-regions", ["7.1.3.HS; 7.4.3.HS", "where people live, and the push and pull factors that make them move"]),
  localCopy(from(POOL, "japan-land-values-ab"), "sc-g7-japan", ["7.2.2.ER; 7.2.4.HS", "Japan's land, resources and culture"]),
  localCopy(from(POOL, "ny-g5-hemisphere-geography"), "sc-g7-americas-geography", ["7.5.1.PR; 7.6.1.PR", "the landforms, rivers and climates of North and South America"]),
];
