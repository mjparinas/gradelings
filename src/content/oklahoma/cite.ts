import type { Unit } from "../types";

/**
 * Standards text for an Oklahoma unit: the citation ("4.N.2.2; 4.N.2.3", "4.3.R.5", "4.PS3.2", "3.C.2.4"), then a short
 * plain description.
 */
export function oks(codes: string, text: string): Unit["standards"] {
  return { "us-ok": `${codes} · ${text}` };
}
