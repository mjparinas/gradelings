import type { Unit } from "../types";

/**
 * Standards text for a Kentucky unit: the citation ("KY.4.NBT.1", "RL.4.2", "4-PS3-2", "4.H.CH.1"), then a short
 * plain description.
 */
export function kyc(codes: string, text: string): Unit["standards"] {
  return { "us-ky": `${codes} · ${text}` };
}
