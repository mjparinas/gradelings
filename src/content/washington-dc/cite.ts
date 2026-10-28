import type { Unit } from "../types";

/**
 * Standards text for a Washington, DC unit: the citation ("4.NBT.1; 4.NBT.2", "RL.4.2", "4-PS3-2", "MS-ESS3-3", "3.20",
 * "WH1.16"), then a short plain description.
 */
export function dcs(codes: string, text: string): Unit["standards"] {
  return { "us-dc": `${codes} · ${text}` };
}
