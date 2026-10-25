import type { Unit } from "../types";

/**
 * Standards text for a Utah unit: the citation ("4.NBT.5; 4.NBT.6", "4.R.5", "7-8.W.1", "4.2.1", "BIO.1.2", "4.3.2", "UT.2.1"),
 * then a short plain description.
 */
export function uts(codes: string, text: string): Unit["standards"] {
  return { "us-ut": `${codes} · ${text}` };
}
