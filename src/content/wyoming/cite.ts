import type { Unit } from "../types";

/**
 * Standards text for a Wyoming unit: the citation ("4.NBT.1; 4.NBT.2", "RL.4.2", "4-PS3-2", "MS-ESS3-3",
 * "SS5.4.2"), then a short plain description.
 */
export function wys(codes: string, text: string): Unit["standards"] {
  return { "us-wy": `${codes} · ${text}` };
}
