import type { Unit } from "../types";

/**
 * Standards text for an Iowa unit: the citation ("4.NBT.A.1; 4.NBT.A.2", "RL.4.2", "4-PS3-2", "7-LS2-1", "SS.4.14"),
 * then a short plain description.
 */
export function ias(codes: string, text: string): Unit["standards"] {
  return { "us-ia": `${codes} · ${text}` };
}
