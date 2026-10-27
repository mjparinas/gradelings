import type { Unit } from "../types";

/**
 * Standards text for a New Hampshire unit: the citation ("4.NBT.1; 4.NBT.2", "RL.4.2", "4-PS3-2", "MS-ESS3-3",
 * "SS:CV:4:2.1"), then a short plain description.
 */
export function nhs(codes: string, text: string): Unit["standards"] {
  return { "us-nh": `${codes} · ${text}` };
}
