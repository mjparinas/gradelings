import { codeCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// Minnesota's official benchmarks, built from the Minnesota K-12 Academic Standards by
// gradelings-research/minnesota/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("minnesota/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "Minnesota"),
  ownPrefix: "mn-",
  adoptsFrom: ["us-ca", "ca-nb", "ca-ns", "ca-pe", "ca-mb", "us-or", "us-ny", "us-wa"],
  plan: PLAN,
  // George Washington, Washington, D.C., the Oregon Trail and the California Gold Rush are US history. Minnesota's own
  // units (mn-) may name other states where the history calls for it; the 50 states and capitals unit names them all.
  otherStates: { pattern: OTHER_STATE, exempt: ["or-g5-states-capitals"] },
  tribal: { words: /\b(Tribes?|Tribal|treaty|treaties|California Indian)\b|\bNative\b/, from: /^(wa|or|ca|ny)-/ },
};
