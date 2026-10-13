import type { Unit } from "../types";

/** Standards text for an Oregon unit: the official codes ("4.NBT.A.1; 4.NBT.A.2"), then a short plain description. */
export function ore(codes: string, text: string): Unit["standards"] {
  return { "us-or": `${codes} · ${text}` };
}
