import type { Unit } from "../types";

/** Standards text for an Alabama unit: the Alabama Course of Study standard codes ("4.12; 4.13"), then a short plain description. */
export function ala(codes: string, text: string): Unit["standards"] {
  return { "us-al": `${codes} · ${text}` };
}
