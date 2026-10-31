import { codeCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Nebraska's College and Career Ready Standards (mathematics, English language arts, science and social studies), built
// from the Nebraska Department of Education's files by gradelings-research/nebraska/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("nebraska/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Nebraska"),
  ownPrefix: "neb-",
  adoptsFrom: ["us-az", "us-ca", "ca-nb", "ca-ns", "ca-mb", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. Nebraska's own units (neb-) may name other
  // places where Nebraska's story calls for it (its neighbor states, the trails west, the regions of the U.S.), and the
  // United States history and civics grades (5, 8 and 9) name states where the history does. The national symbols unit
  // names national landmarks, and the rhetoric unit quotes Dr. King's letter from Birmingham. The 2nd grade leaders
  // unit tells Ruby Bridges's story in New Orleans.
  otherStates: { pattern: OTHER_STATE, exempt: ["ny-g1-american-symbols", "ca-g2-citizens-and-leaders", "ca-g9-rhetoric-and-sources"], historyGrades: ["5", "8", "9"] },
  // Nebraska's own units about the Omaha, Ponca, Pawnee and other nations in Nebraska are written for Nebraska.
  // Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris).
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/ },
};
