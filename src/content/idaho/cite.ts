import type { Unit } from "../types";

/**
 * Standards text for an Idaho unit: the citation ("4.NBT.A.1; 4.NBT.A.2", "4.RC.L.5a", "4-PS-1.1", "MS-LS-2.1", "4.SS.1.3"),
 * then a short plain description.
 */
export function ics(codes: string, text: string): Unit["standards"] {
  return { "us-id": `${codes} · ${text}` };
}
