import { codeCite, preKCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Wisconsin's official standards, built from the Department of Public Instruction's standards server by
// docs/research/wisconsin/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("wisconsin/outcomes.json");

export const contract: FrameworkContract = {
  // Pre-K cites the early-learning document (docs/research/wisconsin/prek).
  preK: preKCite("wisconsin", "Wisconsin"),
  cite: codeCite(OUTCOMES, "Wisconsin"),
  ownPrefix: "wi-",
  adoptsFrom: ["us-ca", "us-mn", "ca-nb", "us-al", "us-fl", "us-az", "ca-ns", "ca-pe", "ca-mb", "us-tx", "us-or", "us-ny", "us-ak", "us-wa", "us-me"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. Wisconsin's own units (wi-) may name other
  // places where Wisconsin's story calls for it (its neighbors Illinois and Minnesota), United States history and
  // civics (Grades 5, 8 and 9) name states where the history does (Spanish Florida, the Alaska Purchase, the Montgomery
  // bus boycott), and so does the Grade 9 rhetoric unit's "Letter from Birmingham Jail". The 50 states and capitals
  // unit names every state on purpose.
  otherStates: { pattern: OTHER_STATE, exempt: ["or-g5-states-capitals", "ca-g9-rhetoric-and-sources"], historyGrades: ["5", "8", "9"] },
  // Wisconsin's own units about the First Nations of Wisconsin are written for Wisconsin. Other states' units about
  // their Tribes, treaties or California Indian nations stay theirs.
  tribal: { words: /\b(Tribes?|Tribal|treaty|treaties|Indian(?! Ocean)|Native|missions?|Wabanaki)\b/i, from: /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co|pa|ga|oh|nj|in)-/, card: true },
};
