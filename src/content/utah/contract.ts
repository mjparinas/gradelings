import { codeCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Utah's official standards (the Utah Student Standards), built by docs/research/utah/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("utah/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Utah"),
  ownPrefix: "ut-",
  adoptsFrom: ["us-al", "us-az", "us-ca", "us-co", "us-ga", "ca-mb", "us-mn", "ca-nb", "us-ny", "us-or", "ca-pe", "us-tx", "us-wa"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. Utah's own units (ut-) may name other places
  // where the story calls for it (the Four Corners, the trails west), and the United States and world history and
  // geography grades (5, 6, 8 and 9) name states where the history does. The national symbols and landmarks unit and
  // the American symbols units name the Golden Gate Bridge and the Liberty Bell's Pennsylvania; Ruby Bridges's New
  // Orleans school and the Constitution's Philadelphia are national history.
  otherStates: { pattern: OTHER_STATE, exempt: ["ca-g1-american-symbols", "ny-g1-american-symbols", "ca-g2-citizens-and-leaders", "ca-g5-constitution"], historyGrades: ["5", "6", "8", "9"] },
  // Utah's own units about its Tribal nations are written for Utah. Treaties alone aren't a sign (adopted units ask
  // about the Treaty of Paris).
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/ },
};
