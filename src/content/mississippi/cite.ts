import type { Unit } from "../types";

/**
 * Standards text for a Mississippi unit: the citation ("4.NBT.5; 4.NBT.6", "RL.4.2", "P.4.6A.4", "4.MS.3", "MS.10"),
 * then a short plain description.
 */
export function mss(codes: string, text: string): Unit["standards"] {
  return { "us-ms": `${codes} · ${text}` };
}
