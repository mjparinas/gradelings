import type { Unit } from "../types";

/** Standards text for a Washington unit: the official codes ("M.4.Q.NBT.2; M.4.Q.NBT.3"), then a short plain description. */
export function wa(codes: string, text: string): Unit["standards"] {
  return { "us-wa": `${codes} · ${text}` };
}
