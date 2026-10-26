import type { Unit } from "../types";

/**
 * Standards text for a Connecticut unit: the citation ("4.NBT.A.1; 4.NBT.A.2", "RL.4.2", "4-PS3-2", "3.Civ.4.b"), then a short
 * plain description.
 */
export function ctcs(codes: string, text: string): Unit["standards"] {
  return { "us-ct": `${codes} · ${text}` };
}
