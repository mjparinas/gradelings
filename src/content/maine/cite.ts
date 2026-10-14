import type { Unit } from "../types";

/**
 * Standards text for a Maine unit: the citation ("4.NBT.A.1; 4.NBT.A.2", "Reading 4; Language 2", "History 1"), then a
 * short plain description.
 */
export function mai(codes: string, text: string): Unit["standards"] {
  return { "us-me": `${codes} · ${text}` };
}
