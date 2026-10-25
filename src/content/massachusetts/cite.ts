import type { Unit } from "../types";

/**
 * Standards text for a Massachusetts unit: the citation ("4.NBT.A.1; 4.NBT.A.2", "RL.4.2", "4-PS3-1", "3.T4.1"), then a
 * short plain description.
 */
export function mas(codes: string, text: string): Unit["standards"] {
  return { "us-ma": `${codes} · ${text}` };
}
