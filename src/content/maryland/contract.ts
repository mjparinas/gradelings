import { codeCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Maryland's official standards, the Maryland College and Career Ready Standards, the Next Generation Science Standards and the Maryland Social
// Studies Framework, built by
// gradelings-research/maryland/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("maryland/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Maryland"),
  ownPrefix: "md-",
  adoptsFrom: ["us-ca", "us-mn", "ca-nb", "us-al", "us-fl", "us-az", "ca-ns", "ca-pe", "ca-mb", "us-tx", "us-or", "us-ny", "us-ak", "us-wa", "us-me"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. Maryland's own units (md-) may name other
  // places where Maryland's story calls for it (the Mason-Dixon Line with Pennsylvania, Douglass's paper in New York),
  // and United States history and civics (Grades 4, 5, 8 and 9) name states where the history does (the colony of
  // Georgia, the Alamo, the Montgomery bus boycott), and so does the Grade 9 rhetoric unit's "Letter from Birmingham
  // Jail". The 50 states and capitals unit names every state on purpose.
  otherStates: { pattern: OTHER_STATE, exempt: ["or-g5-states-capitals", "ca-g9-rhetoric-and-sources"], historyGrades: ["4", "5", "8", "9"] },
  // Maryland's own units about the Native nations of Maryland are written for Maryland. Other states' units about their
  // Tribes, treaties or California Indian nations stay theirs.
  tribal: { words: /\b(Tribes?|Tribal|treaty|treaties|Indian(?! Ocean)|Native|missions?|Wabanaki)\b/i, from: /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co|pa|ga|oh|nj|in)-/, card: true },
};
