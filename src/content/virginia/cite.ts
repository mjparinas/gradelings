import type { Unit } from "../types";

/**
 * Standards text for a Virginia unit: the Standards of Learning citation ("4.NS.3; 4.CE.1", "4.RL.1", "4.4", "VS.5"),
 * then a short plain description.
 */
export function va(codes: string, text: string): Unit["standards"] {
  return { "us-va": `${codes} · ${text}` };
}
