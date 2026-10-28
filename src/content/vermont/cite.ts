import type { Unit } from "../types";

/**
 * Standards text for a Vermont unit: the citation ("4.NBT.1; 4.NBT.2", "RL.4.2", "4-PS3-2", "MS-ESS3-3",
 * "D2.Civ.1.3-5"), then a short plain description.
 */
export function vts(codes: string, text: string): Unit["standards"] {
  return { "us-vt": `${codes} · ${text}` };
}
