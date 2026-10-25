import type { Unit } from "../types";

/**
 * Standards text for a Tennessee unit: the citation ("4.NBT.A.1; 4.NBT.A.2", "4.RL.KID.2", "4.PS3.1", "4.12"), then a short
 * plain description.
 */
export function tns(codes: string, text: string): Unit["standards"] {
  return { "us-tn": `${codes} · ${text}` };
}
