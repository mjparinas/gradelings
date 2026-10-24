import type { Unit } from "../types";

/**
 * Standards text for a Georgia unit: the Georgia citation ("4.NR.2.3; 4.NR.2.4", "4.T.T.1", "S4P3.c", "SS4H1.a"),
 * then a short plain description.
 */
export function geo(codes: string, text: string): Unit["standards"] {
  return { "us-ga": `${codes} · ${text}` };
}
