import type { Unit } from "../types";

/** Standards text for a New York unit: the official codes ("NY-4.NBT.1; NY-4.NBT.2"), then a short plain description. */
export function nys(codes: string, text: string): Unit["standards"] {
  return { "us-ny": `${codes} · ${text}` };
}
