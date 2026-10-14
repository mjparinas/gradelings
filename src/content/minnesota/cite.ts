import type { Unit } from "../types";

/** Standards text for a Minnesota unit: the official benchmark codes ("4.3.5.1; 4.3.5.2"), then a short plain description. */
export function mns(codes: string, text: string): Unit["standards"] {
  return { "us-mn": `${codes} · ${text}` };
}
