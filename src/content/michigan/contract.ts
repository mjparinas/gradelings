import { codeCite, preKCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Michigan's official standards, built from the Michigan Department of Education's files by
// gradelings-research/michigan/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("michigan/outcomes.json");

export const contract: FrameworkContract = {
  // Pre-K cites the early-learning document (docs/research/michigan/prek).
  preK: preKCite("michigan", "Michigan"),
  cite: codeCite(OUTCOMES, "Michigan"),
  ownPrefix: "mi-",
  adoptsFrom: ["us-ca", "ca-nb", "ca-ns", "ca-mb", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. Michigan's own units (mi-) may name other
  // places where Michigan's story calls for it (the Toledo War with Ohio, the Erie Canal), United States history and
  // civics (Grades 5, 8 and 9) name states where the history does (Spanish Florida, the Alaska Purchase, the Montgomery
  // bus boycott), and so does the Grade 9 rhetoric unit's "Letter from Birmingham Jail". The 50 states and capitals
  // unit names every state on purpose.
  otherStates: { pattern: OTHER_STATE, exempt: ["or-g5-states-capitals", "ca-g9-rhetoric-and-sources"], historyGrades: ["5", "8", "9"] },
  // Michigan's own units about the Anishinaabek and Michigan's Tribes are written for Michigan. Other states' units
  // about their Tribes, treaties or California Indian nations stay theirs.
  tribal: { words: /\b(Tribes?|Tribal|treaty|treaties|Indian(?! Ocean)|Native|missions?|Wabanaki)\b/i, from: /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co|oh)-/, card: true },
};
