import type { Unit } from "../types";

/**
 * Standards text for a Nevada unit: the citation ("4.NBT.1; 4.NBT.2", "RL.4.2", "4-PS3-2", "SS.4.11", "SS.6-8.EWC.18"),
 * then a short plain description.
 */
export function nvs(codes: string, text: string): Unit["standards"] {
  return { "us-nv": `${codes} · ${text}` };
}
