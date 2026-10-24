import type { Unit } from "../types";

/**
 * Standards text for a Pennsylvania unit: the standard codes ("CC.2.1.4.B.1; CC.2.1.4.B.2", "CC.1.2.4.A", "3.1.4.A",
 * "8.1.4.A"), then a short plain description.
 */
export function pa(codes: string, text: string): Unit["standards"] {
  return { "us-pa": `${codes} · ${text}` };
}
