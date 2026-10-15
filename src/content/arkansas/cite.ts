import type { Unit } from "../types";

/**
 * Standards text for an Arkansas unit: the Arkansas Academic Standards codes ("4.NPV.3; 4.CAR.2", "4.RC.8.RL",
 * "4-PS3-1", "H.1.4.1"), then a short plain description.
 */
export function ark(codes: string, text: string): Unit["standards"] {
  return { "us-ar": `${codes} · ${text}` };
}
