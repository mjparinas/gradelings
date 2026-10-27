import { codeCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// New Hampshire's official standards (the College and Career Ready Standards and the K-12 Social Studies Curriculum
// Framework), built from the Achievement Standards Network copies by docs/research/new-hampshire/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("new-hampshire/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "New Hampshire"),
  ownPrefix: "nh-",
  adoptsFrom: ["us-az", "us-ca", "ca-nb", "ca-ns", "ca-mb", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. New Hampshire's own units (nh-) may name other
  // places where New Hampshire's story calls for it (its neighbor states, Mount Washington), and the United States
  // history and civics grades (5, 8 and 9) name states where the history does. The national symbols unit names national
  // landmarks, and the rhetoric unit quotes Dr. King's letter from Birmingham. The 2nd grade leaders unit tells Ruby
  // Bridges's story in New Orleans, which New Hampshire's standard on people who changed life in the nation calls for.
  otherStates: { pattern: OTHER_STATE, exempt: ["ny-g1-american-symbols", "ca-g2-citizens-and-leaders", "ca-g9-rhetoric-and-sources"], historyGrades: ["5", "8", "9"] },
  // New Hampshire's own units about the Abenaki and the Eastern Woodland are written for New Hampshire. Treaties alone
  // aren't a sign (adopted civics units ask about the Treaty of Paris).
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/ },
};
