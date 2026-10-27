import type { Unit } from "../types";

/**
 * Standards text for a Montana unit: the citation ("MT.4.NBT.1; MT.4.NBT.2", "RL.4.2", "4-PS3-2", "SS.CG.4.4"), then a short
 * plain description.
 */
export function mtcs(codes: string, text: string): Unit["standards"] {
  return { "us-mt": `${codes} · ${text}` };
}
