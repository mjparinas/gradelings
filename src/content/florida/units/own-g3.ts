import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import * as math from "./math-g3";
import * as language from "./language-g3";
import * as science from "./science-g3";
import * as social from "./social-g3";

const mods = { math, language, science, social };

/** Florida's own Grade 3 units, by subject. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = Object.fromEntries(
  Object.entries(mods)
    .filter(([, m]) => m.UNITS.length)
    .map(([subject, m]) => [subject, { units: m.UNITS, first: m.FIRST }]),
);
