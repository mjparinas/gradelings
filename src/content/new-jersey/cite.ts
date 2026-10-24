import type { Unit } from "../types";

/**
 * Standards text for a New Jersey unit: the citation ("4.NBT.A.1; 4.NBT.A.2", "RL.CR.4.1", "4-PS3-2",
 * "6.1.5.HistoryCC.3"), then a short plain description.
 */
export function njs(codes: string, text: string): Unit["standards"] {
  return { "us-nj": `${codes} · ${text}` };
}
