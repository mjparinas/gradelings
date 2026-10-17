import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import * as math from "./math-g6";
import * as language from "./language-g6";
import * as science from "./science-g6";
import * as social from "./social-g6";

const mods = { math, language, science, social };

/** Florida's own Grade 6 units, by subject. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = Object.fromEntries(
  Object.entries(mods)
    .filter(([, m]) => m.UNITS.length)
    .map(([subject, m]) => [subject, { units: m.UNITS, first: m.FIRST }]),
);
