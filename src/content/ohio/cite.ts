import type { Unit } from "../types";

/**
 * Standards text for an Ohio unit: the citation ("4.NBT.1; 4.NBT.2", "RL.4.2", "4.PS.2", "Statement 6"), then a short
 * plain description.
 */
export function ohi(codes: string, text: string): Unit["standards"] {
  return { "us-oh": `${codes} · ${text}` };
}
