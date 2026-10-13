import type { GradeId, Unit } from "../../types";
import { RML_1, RML_2, RML_K } from "./language-rml-early";
import { RML_3, RML_4, RML_5 } from "./language-rml-middle";
import { RML_6, RML_7, RML_8, RML_9 } from "./language-rml-upper";
import { SPELLING_4, SPELLING_5, SPELLING_6, SPELLING_7, SPELLING_9 } from "./language-spelling";

// Washington-only language units (`wa-` ids), per grade: a Research and Media Literacy unit in every grade (two from
// Grade 6), and US-spelling units where the shared spelling lessons don't fit US spelling.
export const OWN_LANGUAGE: Partial<Record<GradeId, Unit[]>> = {
  k: [RML_K],
  "1": [RML_1],
  "2": [RML_2],
  "3": [RML_3],
  "4": [RML_4, SPELLING_4],
  "5": [RML_5, SPELLING_5],
  "6": [...RML_6, SPELLING_6],
  "7": [...RML_7, SPELLING_7],
  "8": RML_8,
  "9": [...RML_9, SPELLING_9],
};
