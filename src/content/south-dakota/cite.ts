import type { Unit } from "../types";

/**
 * Standards text for a South Dakota unit: the citation ("4.NBT.1; 4.NBT.2", "4.RL.2", "4-PS3-2", "4.SS.2",
 * "9-12.C.17"), then a short plain description.
 */
export function sds(codes: string, text: string): Unit["standards"] {
  return { "us-sd": `${codes} · ${text}` };
}
