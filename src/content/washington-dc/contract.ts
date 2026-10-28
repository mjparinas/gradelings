import { codeCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Washington, DC's official standards (the Common Core, the Next Generation Science Standards and the DC Social Studies
// Standards of 2023), built from the Achievement Standards Network copies and OSSE's social studies PDF by
// docs/research/washington-dc/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("washington-dc/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Washington, DC"),
  ownPrefix: "dc-",
  adoptsFrom: ["us-az", "us-ca", "us-ga", "ca-nb", "ca-ns", "ca-mb", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
  // George Washington, Martha Washington and Washington, DC itself are fine. The District's own units (dc-) name Maryland
  // and Virginia, which gave the land for the capital, and the places DC's story calls for. The United States history and
  // civics grades (4, from the first Americans to the founding, 5, from westward expansion to the civil rights movement,
  // 7, from Indigenous nations to Reconstruction, and the applied civics of 8, with its court cases) name states where the
  // history does. Two world geography units compare with American places (Lake Michigan's size, Cuba's distance from
  // Florida).
  otherStates: {
    pattern: OTHER_STATE,
    exempt: ["ga-g7-africa", "ga-g6-latin-america"],
    historyGrades: ["4", "5", "7", "8"],
  },
  // The District's own units about the Nacotchtank, Piscataway and Pamunkey peoples are written for DC. Treaties alone
  // aren't a sign (adopted civics units ask about the Treaty of Paris).
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/ },
};
