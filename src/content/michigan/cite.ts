import type { Unit } from "../types";

/**
 * Standards text for a Michigan unit: the citation ("4.NBT.1; 4.NBT.2", "RL.4.2", "4-PS3-2", "3-H3.0.9"), then a short
 * plain description.
 */
export function mic(codes: string, text: string): Unit["standards"] {
  return { "us-mi": `${codes} · ${text}` };
}
