import type { Unit } from "../types";

/**
 * Standards text for a Florida unit: the benchmark codes ("MA.4.NSO.1.1; MA.4.NSO.2.2", "ELA.4.R.1.1", "SC.4.L.16.1",
 * "SS.4.A.1.1"), then a short plain description.
 */
export function fl(codes: string, text: string): Unit["standards"] {
  return { "us-fl": `${codes} · ${text}` };
}
