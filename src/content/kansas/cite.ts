import type { Unit } from "../types";

/**
 * Standards text for a Kansas unit: the citation ("4.NBT.1; 4.NBT.2", "RL.4.2", "4-PS3-2", "5.1; 5.2"),
 * then a short plain description.
 */
export function kss(codes: string, text: string): Unit["standards"] {
  return { "us-ks": `${codes} · ${text}` };
}
