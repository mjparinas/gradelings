import type { Unit } from "../types";

/** Standards text for a California unit: the official codes ("4.NBT.1; 4.NBT.2"), then a short plain description. */
export function cal(codes: string, text: string): Unit["standards"] {
  return { "us-ca": `${codes} · ${text}` };
}
