import type { Unit } from "../types";

/**
 * Standards text for an Alaska unit: the citation ("4.NBT.1; 4.NBT.2", "RL.4.2; L.4.5", "SS.4.1.18.1"), then a short
 * plain description.
 */
export function ak(codes: string, text: string): Unit["standards"] {
  return { "us-ak": `${codes} · ${text}` };
}
