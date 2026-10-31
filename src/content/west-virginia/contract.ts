import { codeCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// West Virginia's official standards, built from the West Virginia Board of Education's standards policies by
// gradelings-research/west-virginia/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("west-virginia/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "West Virginia"),
  ownPrefix: "wv-",
  adoptsFrom: ["us-al", "us-az", "us-ca", "ca-mb", "ca-nb", "ca-ns", "ca-pe", "us-fl", "us-ga", "us-ny", "us-or", "us-tx", "us-wa"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine, and so is Virginia, which West Virginia was
  // part of. West Virginia's own units (wv-) are written for it, and the United States and world history and geography
  // grades (4 to 9) name states where the lesson does. The Grade 9 rhetoric unit quotes Dr. King's letter from
  // Birmingham.
  otherStates: { pattern: OTHER_STATE, exempt: ["ca-g9-rhetoric-and-sources"], historyGrades: ["4", "5", "6", "7", "8", "9"] },
  // Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris).
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/ },
};
