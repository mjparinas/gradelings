import { codeCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Alabama's content standards, built from the Alabama Courses of Study (Mathematics 2019, English Language Arts 2021,
// Science 2023, Social Studies 2024) by docs/research/alabama/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("alabama/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Alabama"),
  ownPrefix: "al-",
  adoptsFrom: ["us-ca", "ca-nb", "ca-ns", "ca-pe", "ca-mb", "us-tx", "us-or", "us-ny", "us-wa", "us-me"],
  plan: PLAN,
  // George Washington, Washington, D.C., the Oregon Trail and the California Gold Rush are US history. Alabama's own
  // units (al-) may name other states where the history calls for it; the 50 states and capitals unit names them all.
  otherStates: { pattern: OTHER_STATE, exempt: ["or-g5-states-capitals"], ownNotesOnly: true },
  // Treaties alone aren't a sign (adopted civics units ask about the Treaty of Paris), and neither is "Native
  // Americans" in a general US history unit such as the Columbian Exchange.
  tribal: { words: /\b(Tribes?|Tribal)\b|California Indian/, from: /^(wa|or|ca|ny|tx)-/ },
};
