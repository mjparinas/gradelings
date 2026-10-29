import { codeCite, preKCite, research, type FrameworkContract } from "../contract";
import { PLAN } from "./plan";

// California's official standards, built from CDE's files by docs/research/california/build_outcomes.py.
const OUTCOMES = research<Record<string, { idx: string }[]>>("california/outcomes.json");

export const contract: FrameworkContract = {
  cite: codeCite(OUTCOMES, "California"),
  // Transitional Kindergarten cites the Preschool/TK Learning Foundations (docs/research/california/prek).
  preK: preKCite("california", "California"),
  ownPrefix: "ca-",
  adoptsFrom: ["ca-nb", "ca-ns", "ca-mb", "us-or", "us-wa"],
  // Other states may adopt the ones that name no California place; no Canadian framework ever gets them.
  plan: PLAN,
  // George Washington, Martha Washington and Washington, D.C. are fine, and so is the Oregon Trail as US history. The
  // 50 states and capitals unit names every state, Washington and Oregon among them.
  otherStates: { pattern: /Washington(?!,? D\.?C\.?)|Oregon(?! Trail)/, exempt: ["or-g5-states-capitals"], includeOwn: true },
  // California's own units about California Indian nations are written for California; Washington's and Oregon's Tribal
  // units (and any of their units about Tribes or treaties) stay theirs.
  tribal: { words: /\b(Tribes?|Tribal|treaty|treaties)\b|\bNative\b/, from: /^(wa|or)-/ },
};
