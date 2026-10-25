import type { Unit } from "../types";

/**
 * Standards text for a Maryland unit: the citation ("4.NOS.A.1; 4.NOS.A.2", "RL.4.2", "4-PS3-2", "AR.3"), then a short
 * plain description.
 */
export function mar(codes: string, text: string): Unit["standards"] {
  return { "us-md": `${codes} · ${text}` };
}
