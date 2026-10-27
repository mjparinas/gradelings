import { codeCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// New Mexico's official standards (the New Mexico Content Standards), built from the Public Education Department's
// files by docs/research/new-mexico/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("new-mexico/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "New Mexico"),
  ownPrefix: "nm-",
  adoptsFrom: ["us-az", "us-ca", "ca-nb", "ca-ns", "ca-mb", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. New Mexico's own units (nm-) may name other
  // places where New Mexico's story calls for it (its neighbor states, Texas in its history, the trails west), and the
  // United States history and civics grades (5, 8 and 9) name states where the history does. The national symbols unit
  // names national landmarks, and the rhetoric unit quotes Dr. King's letter from Birmingham. The 2nd grade leaders
  // unit tells Ruby Bridges's story in New Orleans, which New Mexico's national identity standard (2.9) calls for.
  otherStates: { pattern: OTHER_STATE, exempt: ["ny-g1-american-symbols", "ca-g2-citizens-and-leaders", "ca-g9-rhetoric-and-sources"], historyGrades: ["5", "8", "9"] },
  // New Mexico's own units about the Pueblos, the Diné and Apache peoples and New Mexico's Tribes are written for New
  // Mexico. Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris).
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/ },
};
