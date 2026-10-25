import type { Unit } from "../types";

/**
 * Standards text for a Missouri unit: the Missouri Learning Standards codes ("4.NBT.A.1; 4.NBT.A.4", "4.R.1.A",
 * "4.PS3.A.1", "3.H.3.F.a"), then a short plain description.
 */
export function mos(codes: string, text: string): Unit["standards"] {
  return { "us-mo": `${codes} · ${text}` };
}
