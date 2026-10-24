import type { Unit } from "../types";

/**
 * Standards text for an Indiana unit: the Indiana Academic Standards citation ("4.NS.3; 4.NS.4", "4.RC.2", "4-PS3-1",
 * "4.H.3"), then a short plain description.
 */
export function ind(codes: string, text: string): Unit["standards"] {
  return { "us-in": `${codes} · ${text}` };
}
