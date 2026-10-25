import type { Unit } from "../types";

/**
 * Standards text for a North Carolina unit: the North Carolina citation ("NC.4.NBT.5", "RL.4.1", "PS.4.2.2",
 * "4.H.1.3"), then a short plain description.
 */
export function nca(codes: string, text: string): Unit["standards"] {
  return { "us-nc": `${codes} · ${text}` };
}
