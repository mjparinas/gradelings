import { codeCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Vermont's official standards (the Common Core, the Next Generation Science Standards and the C3 Framework for social
// studies), built from the Achievement Standards Network copies by docs/research/vermont/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("vermont/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Vermont"),
  ownPrefix: "vt-",
  adoptsFrom: ["us-az", "us-ca", "us-ga", "ca-nb", "ca-ns", "ca-mb", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. Vermont's own units (vt-) may name other places
  // where Vermont's story calls for it (its neighbor states, Fort Ticonderoga), and the United States history and civics
  // grades (4, where the Revolution, the Constitution and the Civil War are taught, 7, from Reconstruction to the civil
  // rights movement, and the civics of 8 and 9, with its court cases) name states where the history does. The 2nd grade
  // leaders unit tells Ruby Bridges's story in New Orleans, which the C3 indicator on people who tried to improve their
  // communities calls for; the rhetoric unit quotes Dr. King's letter from Birmingham; and two world geography units
  // compare with American places (Lake Michigan's size, Cuba's distance from Florida).
  otherStates: {
    pattern: OTHER_STATE,
    exempt: ["ca-g2-citizens-and-leaders", "ca-g9-rhetoric-and-sources", "ga-g7-africa", "ga-g6-latin-america"],
    historyGrades: ["4", "7", "8", "9"],
  },
  // Vermont's own units about the Abenaki are written for Vermont. Treaties alone aren't a sign (adopted civics units
  // ask about the Treaty of Paris).
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/ },
};
