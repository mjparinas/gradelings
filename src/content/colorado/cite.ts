import type { Unit } from "../types";

/**
 * Standards text for a Colorado unit: the citation ("4.NBT.A.1; 4.NBT.A.2", "4.2.1.a.ii", "PS1.4.1.a", "4.H.2.a"),
 * then a short plain description.
 */
export function col(codes: string, text: string): Unit["standards"] {
  return { "us-co": `${codes} · ${text}` };
}
