import type { Unit } from "../types";

/**
 * Standards text for a New Mexico unit: the citation ("4.NBT.1; 4.NBT.2", "RL.4.2", "4-PS3-2", "MS-ESS3-3 NM", "4.12",
 * "9-12.Civ.29"), then a short plain description.
 */
export function nms(codes: string, text: string): Unit["standards"] {
  return { "us-nm": `${codes} · ${text}` };
}
