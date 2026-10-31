import { codeCite, preKCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Connecticut's official standards, built from the State Department of Education's files and the national documents it
// adopted by gradelings-research/connecticut/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("connecticut/outcomes.json");

export const contract: FrameworkContract = {
  // Pre-K cites the early-learning document (docs/research/connecticut/prek).
  preK: preKCite("connecticut", "Connecticut"),
  cite: codeCite(OUTCOMES, "Connecticut"),
  ownPrefix: "ct-",
  adoptsFrom: ["us-ca", "ca-nb", "ca-ns", "ca-mb", "ca-pe", "us-or", "us-wa", "us-ny", "us-tx", "us-az", "us-fl", "us-ga"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. Connecticut's own units (ct-) may name other
  // places where the story calls for it (the regions of the United States, Superstorm Sandy), and the United States
  // geography, history and world regions grades (4 to 9) name states where the lesson does. The Grade 9 rhetoric unit
  // quotes Dr. King's letter from Birmingham.
  otherStates: { pattern: OTHER_STATE, exempt: ["ca-g9-rhetoric-and-sources"], historyGrades: ["4", "5", "6", "7", "8", "9"] },
  // Connecticut's own units about the Native nations of Connecticut are written for Connecticut. Treaties alone aren't
  // a sign (adopted civics units ask about the Treaty of Paris).
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/ },
};
