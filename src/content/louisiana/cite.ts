import type { Unit } from "../types";

/**
 * Standards text for a Louisiana unit: the citation ("4.NBT.A.1; 4.NBT.A.2", "RL.4.2", "4-PS3-1", "6-MS-PS1-1", "6.10"),
 * then a short plain description.
 */
export function las(codes: string, text: string): Unit["standards"] {
  return { "us-la": `${codes} · ${text}` };
}
