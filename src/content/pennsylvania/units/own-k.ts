import type { OwnUnits } from "../../placement";
import type { SubjectId } from "../../types";
import * as math from "./math-k";
import * as language from "./language-k";
import * as science from "./science-k";
import * as social from "./social-k";

const mods = { math, language, science, social };

/** Pennsylvania's own Kindergarten units, by subject. */
export const OWN: Partial<Record<SubjectId, OwnUnits>> = Object.fromEntries(
  Object.entries(mods)
    .filter(([, m]) => m.UNITS.length)
    .map(([subject, m]) => [subject, { units: m.UNITS, first: m.FIRST }]),
);
