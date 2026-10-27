import type { Unit } from "../types";

/**
 * Standards text for a Hawaiʻi unit: the citation ("4.NBT.1; 4.NBT.2", "4.RL.2", "4-PS3-2", "4.7.14.1",
 * "7HHK.2.9.3", "A1.3.2"), then a short plain description.
 */
export function his(codes: string, text: string): Unit["standards"] {
  return { "us-hi": `${codes} · ${text}` };
}
