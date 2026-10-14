import type { Unit } from "../types";

/** Standards text for a Texas unit: the TEKS student expectations ("4.4(A); 4.4(B)"), then a short plain description. */
export function tx(codes: string, text: string): Unit["standards"] {
  return { "us-tx": `${codes} · ${text}` };
}
