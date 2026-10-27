import type { Unit } from "../types";

/**
 * Standards text for a West Virginia unit: the citation ("M.4.6", "ELA.4.2", "S.4.2", "SS.8.22"), then a short
 * plain description.
 */
export function wvs(codes: string, text: string): Unit["standards"] {
  return { "us-wv": `${codes} · ${text}` };
}
