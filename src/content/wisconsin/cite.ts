import type { Unit } from "../types";

/**
 * Standards text for a Wisconsin unit: the citation ("M.4.NBT.A.1; M.4.NBT.A.2", "ELA.4.R.2", "SCI.4.PS.3",
 * "SS.Hist1.a.i"), then a short plain description.
 */
export function wis(codes: string, text: string): Unit["standards"] {
  return { "us-wi": `${codes} · ${text}` };
}
