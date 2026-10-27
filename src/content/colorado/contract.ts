import { codeCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Colorado's official standards (the Colorado Academic Standards), built by
// docs/research/colorado/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("colorado/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Colorado"),
  ownPrefix: "co-",
  adoptsFrom: ["us-ca", "ca-nb", "ca-ns", "ca-mb", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. Colorado's own units (co-) may name other
  // places where Colorado's story calls for it (the Four Corners, the Grand Canyon), United States history and civics
  // (Grades 5, 8 and 9) name states where the history does (Spanish Florida, the Alaska Purchase, the Montgomery bus
  // boycott), and so does the Grade 9 rhetoric unit's "Letter from Birmingham Jail". The 50 states and capitals unit
  // names every state on purpose.
  otherStates: { pattern: OTHER_STATE, exempt: ["or-g5-states-capitals", "ca-g9-rhetoric-and-sources"], historyGrades: ["5", "8", "9"] },
  // Colorado's own units about the Native nations of Colorado are written for Colorado. Other states' units about their
  // Tribes, treaties or California Indian nations stay theirs.
  tribal: { words: /\b(Tribes?|Tribal|treaty|treaties|Indian(?! Ocean)|Native|missions?|Wabanaki)\b/i, from: /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl)-/, card: true },
};
