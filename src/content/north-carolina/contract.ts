import { codeCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// North Carolina's official standards (the North Carolina Standard Course of Study), built by
// docs/research/north-carolina/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("north-carolina/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "North Carolina"),
  ownPrefix: "nc-",
  adoptsFrom: ["us-ca", "us-mn", "ca-nb", "us-al", "us-az", "ca-pe", "ca-mb", "us-tx", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine. North Carolina's own units (nc-) may name other
  // places where North Carolina's story calls for it (the Cherokee removal to Oklahoma), and United States history and
  // civics (Grades 5, 8 and 9) name states where the history does. American symbols names the Grand Canyon as a
  // national landmark; the rhetoric unit quotes the Letter from Birmingham Jail.
  otherStates: { pattern: OTHER_STATE, exempt: ["ny-g1-american-symbols", "ca-g9-rhetoric-and-sources"], historyGrades: ["5", "8", "9"] },
  // North Carolina's own units about the Eastern Band of Cherokee Indians and the state's other tribes are written for
  // North Carolina. Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris).
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/, from: /^(wa|or|ca|me|tx|ny|mn|ak|al|az|ar|fl|il|co|pa|ga)-/ },
};
