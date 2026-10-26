import type { Unit } from "../types";

/**
 * Standards text for a Nebraska unit: the citation ("MA.4.N.2.b", "LA.4.RP.1", "SC.4.4.2.b", "SS 4.1.1.c"),
 * then a short plain description.
 */
export function nes(codes: string, text: string): Unit["standards"] {
  return { "us-ne": `${codes} · ${text}` };
}
