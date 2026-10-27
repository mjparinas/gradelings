import { codeCite, research, type FrameworkContract } from "../contract";
import { OTHER_STATE } from "./units/kit";
import { PLAN } from "./plan";

// New York's official standards, built from NYSED's files by docs/research/new-york/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("new-york/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "New York"),
  ownPrefix: "ny-",
  adoptsFrom: ["us-ca", "ca-nb", "ca-ns", "ca-pe", "ca-mb", "us-or", "us-wa"],
  plan: PLAN,
  // George Washington, Washington, D.C., the Oregon Trail and the California Gold Rush are US history. New York's own
  // units (ny-) may name other states where the history calls for it; the 50 states and capitals unit names them all.
  otherStates: { pattern: OTHER_STATE, exempt: ["or-g5-states-capitals"] },
  tribal: { words: /\b(Tribes?|Tribal|treaty|treaties|California Indian)\b|\bNative\b/, from: /^(wa|or|ca)-/ },
};
