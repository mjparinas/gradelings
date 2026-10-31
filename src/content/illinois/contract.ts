import { codeCite, preKCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Illinois's official standards, built from the Illinois State Board of Education's files by
// gradelings-research/illinois/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("illinois/outcomes.json");

export const contract: FrameworkContract = {
  // Pre-K cites the early-learning document (docs/research/illinois/prek).
  preK: preKCite("illinois", "Illinois"),
  cite: codeCite(OUTCOMES, "Illinois"),
  ownPrefix: "il-",
  adoptsFrom: ["us-ca", "ca-nb", "ca-ns", "ca-mb", "us-or", "us-wa"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. Illinois's own units (il-) may name other
  // places where Illinois's story calls for it (New Salem, the Miami nation), United States history and civics (Grades
  // 5, 8 and 9) name states where the history does (Spanish Florida, the Alaska Purchase, the Montgomery bus boycott),
  // and so does the Grade 9 rhetoric unit's "Letter from Birmingham Jail". The 50 states and capitals unit names every
  // state on purpose.
  otherStates: { pattern: OTHER_STATE, exempt: ["or-g5-states-capitals", "ca-g9-rhetoric-and-sources"], historyGrades: ["5", "8", "9"] },
  // Illinois's own units about the Native nations of Illinois are written for Illinois. Other states' units about their
  // Tribes, treaties or California Indian nations stay theirs.
  tribal: { words: /\b(Tribes?|Tribal|treaty|treaties|Indian(?! Ocean)|Native|missions?|Wabanaki)\b/i, from: /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl)-/, card: true },
};
