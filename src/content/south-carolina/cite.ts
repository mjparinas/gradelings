import type { Unit } from "../types";

/**
 * Standards text for a South Carolina unit: the South Carolina College- and Career-Ready Standards codes ("4.NR.1.2",
 * "ELA.4.AOR.1.2", "4-PS3-1", "4.2.CX"), then a short plain description.
 */
export function sca(codes: string, text: string): Unit["standards"] {
  return { "us-sc": `${codes} · ${text}` };
}
