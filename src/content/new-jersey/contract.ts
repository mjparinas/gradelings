import { codeCite, preKCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// New Jersey's official standards (the New Jersey Student Learning Standards), built by
// gradelings-research/new-jersey/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("new-jersey/outcomes.json");

export const contract: FrameworkContract = {
  // Pre-K cites the early-learning document (docs/research/new-jersey/prek).
  preK: preKCite("new-jersey", "New Jersey"),
  cite: codeCite(OUTCOMES, "New Jersey"),
  ownPrefix: "nj-",
  adoptsFrom: ["us-ca", "us-mn", "ca-nb", "us-al", "us-fl", "us-az", "ca-ns", "ca-pe", "ca-mb", "us-tx", "us-or", "us-ny", "us-ak", "us-wa", "us-me"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. New Jersey's own units (nj-) may name other
  // places where New Jersey's story calls for it (New York City across the Hudson, Philadelphia across the Delaware,
  // Salem County), United States history and civics (Grades 5, 8 and 9) name states where the history does, and so does
  // the Grade 9 rhetoric unit's "Letter from Birmingham Jail". The 50 states and capitals unit names every state on
  // purpose.
  otherStates: { pattern: OTHER_STATE, exempt: ["or-g5-states-capitals", "ca-g9-rhetoric-and-sources"], historyGrades: ["5", "8", "9"] },
  // New Jersey's own units about the Lenape are written for New Jersey. Other states' units about their Tribes,
  // treaties or California Indian nations stay theirs.
  tribal: { words: /\b(Tribes?|Tribal|treaty|treaties|Indian(?! Ocean)|Native|missions?|Wabanaki)\b/i, from: /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co|pa|ga)-/, card: true },
};
