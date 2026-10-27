import type { Unit } from "../types";

/**
 * Standards text for a North Dakota unit: the citation ("4.NBT.1; 4.NBT.2", "RL.4.2", "4-PS3-2", "H.3_5.10",
 * "ND.6_12.4.1"), then a short plain description.
 */
export function nds(codes: string, text: string): Unit["standards"] {
  return { "us-nd": `${codes} · ${text}` };
}
