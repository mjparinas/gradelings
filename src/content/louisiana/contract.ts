import { codeCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Louisiana's official standards (the Louisiana Student Standards), built by docs/research/louisiana/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("louisiana/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Louisiana"),
  ownPrefix: "la-",
  adoptsFrom: ["us-al", "us-az", "us-ca", "ca-mb", "ca-nb", "us-ny", "us-or", "ca-pe", "us-wa"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. Louisiana's own units (la-) may name other
  // places where the story calls for it (its neighbor states, national landmarks), and the United States history and
  // civics grades (3, 6, 7, 8 and 9) name states where the history does. Louisiana's standards name the national
  // landmarks (2.7) and the land bridge from Asia (4.19); Memphis in the ancient world is Egypt's; the rhetoric unit
  // quotes Dr. King's letter from Birmingham.
  otherStates: { pattern: OTHER_STATE, exempt: ["ny-g1-american-symbols", "ny-g5-early-civilizations", "ca-g6-hebrews-kush", "ca-g9-rhetoric-and-sources"], historyGrades: ["3", "6", "7", "8", "9"] },
  // Louisiana's own units about its four federally recognized Tribes are written for Louisiana. Treaties alone aren't a
  // sign (adopted civics units ask about the Treaty of Paris).
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/ },
};
