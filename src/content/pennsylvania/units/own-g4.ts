import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import * as math from "./math-g4";
import * as language from "./language-g4";
import * as science from "./science-g4";
import * as social from "./social-g4";

const mods = { math, language, science, social };

/** Pennsylvania's own Grade 4 units, by subject. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = Object.fromEntries(
  Object.entries(mods)
    .filter(([, m]) => m.UNITS.length)
    .map(([subject, m]) => [subject, { units: m.UNITS, first: m.FIRST }]),
);
